import { NextResponse } from "next/server";

const REMOTE_API_BASE_URL = process.env.REMOTE_API_BASE_URL;
const REMOTE_URL = REMOTE_API_BASE_URL
  ? `${REMOTE_API_BASE_URL.replace(/\/$/, '')}/api/oldPapers/getByCategory/All`
  : undefined;

const samplePapers = [
  {
    _id: "p1",
    url: "papers/sample-1.pdf",
    category: "Computer Science",
    year: "2023",
    semester: "4",
    examType: "End Semester",
    title: "Data Structures - Question Paper",
    code: "CS401",
  },
];

export async function GET(request: Request) {
  try {
    const res = await fetch(REMOTE_URL, { method: 'GET' });
    if (!res.ok) throw new Error(`remote responded ${res.status}`);
    const json = await res.json();
    // Normalize shape: remote uses `oldPaper` key
    const papers = json.oldPaper || json.oldPapers || json.papers || [];
    return NextResponse.json({ success: true, oldPaper: papers });
  } catch (err) {
    console.warn('Failed to fetch remote papers, returning sample data.', err);
    return NextResponse.json({ success: true, oldPaper: samplePapers });
  }
}
