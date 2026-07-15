import { NextResponse } from "next/server";

const REMOTE_API_BASE_URL = process.env.REMOTE_API_BASE_URL;
const REMOTE_FACULTY_URL = REMOTE_API_BASE_URL ? `${REMOTE_API_BASE_URL.replace(/\/$/, '')}/api/faculty` : undefined;
const REMOTE_BEARER_TOKEN = process.env.REMOTE_FACULTY_BEARER_TOKEN || process.env.FACULTY_BEARER_TOKEN;

function buildFacultyProxyHeaders(request: Request) {
  const headers = new Headers(request.headers);
  const forwardedHeaders = new Headers();
  ['authorization', 'cookie', 'x-auth-token', 'x-forwarded-for'].forEach((header) => {
    const value = headers.get(header);
    if (value) forwardedHeaders.set(header, value);
  });

  if (!forwardedHeaders.has('authorization') && REMOTE_BEARER_TOKEN) {
    forwardedHeaders.set('authorization', `Bearer ${REMOTE_BEARER_TOKEN}`);
    console.log('Faculty proxy: using fallback bearer JWT from env.');
  }

  return forwardedHeaders;
}

export async function GET(request: Request) {
  try {
    const forwardedHeaders = buildFacultyProxyHeaders(request);
    if (!forwardedHeaders.has('authorization') && !forwardedHeaders.has('x-auth-token')) {
      const message = 'No faculty auth token available. Set REMOTE_FACULTY_BEARER_TOKEN or forward authorization/x-auth-token from client.';
      console.warn(message);
      return NextResponse.json({ success: false, error: message, faculty: [] }, { status: 401 });
    }

    const res = await fetch(REMOTE_FACULTY_URL, {
      method: 'GET',
      headers: forwardedHeaders,
      cache: 'no-store',
    });

    if (!res.ok) {
      const remoteText = await res.text().catch(() => 'unable to read remote body');
      const message = `remote responded ${res.status}: ${remoteText}`;
      console.warn('Failed to fetch remote faculty', message);
      return NextResponse.json({ success: false, error: message, faculty: [] }, { status: 502 });
    }

    const json = await res.json();
    const faculty = json.faculty || json || [];
    if (!Array.isArray(faculty)) {
      const message = 'remote faculty endpoint returned invalid data';
      console.warn(message, json);
      return NextResponse.json({ success: false, error: message, faculty: [] }, { status: 502 });
    }

    return NextResponse.json({ success: true, faculty });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    console.warn('Failed to fetch remote faculty', message, err);
    return NextResponse.json({ success: false, error: message, faculty: [] }, { status: 502 });
  }
}
