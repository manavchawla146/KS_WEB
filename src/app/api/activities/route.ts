import { NextResponse } from 'next/server';

const REMOTE_API_BASE_URL = process.env.REMOTE_API_BASE_URL;
const REMOTE_API_BEARER_TOKEN =
  process.env.REMOTE_API_BEARER_TOKEN ||
  process.env.REMOTE_FACULTY_BEARER_TOKEN ||
  process.env.FACULTY_BEARER_TOKEN;

function buildProxyHeaders(request: Request) {
  const headers = new Headers(request.headers);
  const forwardedHeaders = new Headers();

  ['authorization', 'cookie', 'x-auth-token', 'x-forwarded-for'].forEach((header) => {
    const value = headers.get(header);
    if (value) forwardedHeaders.set(header, value);
  });

  if (!forwardedHeaders.has('authorization') && REMOTE_API_BEARER_TOKEN) {
    forwardedHeaders.set('authorization', `Bearer ${REMOTE_API_BEARER_TOKEN}`);
    console.log('Activities proxy: using fallback bearer JWT from env.');
  }

  return forwardedHeaders;
}

export async function GET(request: Request) {
  if (!REMOTE_API_BASE_URL) {
    console.error('REMOTE_API_BASE_URL is not configured');
    return NextResponse.json({ success: false, activities: [] }, { status: 500 });
  }

  try {
    const remoteUrl = `${REMOTE_API_BASE_URL.replace(/\/$/, '')}/api/activities`;
    const res = await fetch(remoteUrl, {
      method: 'GET',
      headers: buildProxyHeaders(request),
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => 'unable to read remote body');
      console.warn('Activities proxy: remote responded non-OK', res.status, text);
      return NextResponse.json({ success: false, activities: [] }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Activities proxy error:', err);
    return NextResponse.json({ success: false, activities: [] }, { status: 502 });
  }
}
