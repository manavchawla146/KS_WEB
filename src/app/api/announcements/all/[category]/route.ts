import { NextResponse } from 'next/server';

const REMOTE_API_BASE_URL = process.env.REMOTE_API_BASE_URL;

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    if (!REMOTE_API_BASE_URL) {
      console.error('REMOTE_API_BASE_URL is not configured');
      return NextResponse.json({ success: false, announcement: [] }, { status: 500 });
    }

    const { category } = await params;
    const remoteUrl = `${REMOTE_API_BASE_URL.replace(/\/$/, '')}/api/announcements/all/${encodeURIComponent(category)}`;

    const res = await fetch(remoteUrl, { method: 'GET' });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn('Announcements proxy: remote responded non-OK', res.status, text);
      return NextResponse.json({ success: false, announcement: [] }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Announcements proxy error:', err);
    return NextResponse.json({ success: false, announcement: [] }, { status: 500 });
  }
}
