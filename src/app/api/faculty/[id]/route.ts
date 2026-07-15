import { NextResponse } from "next/server";

const REMOTE_API_BASE_URL = process.env.REMOTE_API_BASE_URL;
const REMOTE_FACULTY_URL = REMOTE_API_BASE_URL ? `${REMOTE_API_BASE_URL.replace(/\/$/, '')}/api/faculty` : undefined;
const REMOTE_BEARER_TOKEN = process.env.REMOTE_FACULTY_BEARER_TOKEN || process.env.FACULTY_BEARER_TOKEN;

const sampleMember = {
  _id: "f1",
  name: "Dr. Alice Example",
  designation: "Assistant Professor",
  department: "Computer Science",
  qualification: "Ph.D. Computer Science",
  email: "alice@example.com",
  profileImage: "Public/Faculty/default.jpg",
  category: "MSCIT",
};

function buildFacultyProxyHeaders(request: Request) {
  const headers = new Headers(request.headers);
  const forwardedHeaders = new Headers();
  ['authorization', 'cookie', 'x-auth-token', 'x-forwarded-for'].forEach((header) => {
    const value = headers.get(header);
    if (value) forwardedHeaders.set(header, value);
  });

  if (!forwardedHeaders.has('authorization') && REMOTE_BEARER_TOKEN) {
    forwardedHeaders.set('authorization', `Bearer ${REMOTE_BEARER_TOKEN}`);
    console.log('Faculty member proxy: using fallback bearer token from env.');
  }

  return forwardedHeaders;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const headers = buildFacultyProxyHeaders(request);
    if (!headers.has('authorization') && !headers.has('x-auth-token')) {
      const message = 'No faculty auth token available. Set REMOTE_FACULTY_BEARER_TOKEN or forward authorization/x-auth-token from client.';
      console.warn(message);
      return NextResponse.json({ success: false, error: message, faculty: null }, { status: 401 });
    }

    const res = await fetch(`${REMOTE_FACULTY_URL}/${id}`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text().catch(() => 'unable to read body');
      const message = `remote responded ${res.status}: ${text}`;
      console.warn('Remote faculty fetch failed', message);
      return NextResponse.json({ success: false, error: message, faculty: null }, { status: 502 });
    }
    const json = await res.json();
    const member = json.faculty || json || null;
    return NextResponse.json({ success: true, faculty: member });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    console.warn('Failed to fetch remote faculty member', message, err);
    return NextResponse.json({ success: false, error: message, faculty: null }, { status: 502 });
  }
}
