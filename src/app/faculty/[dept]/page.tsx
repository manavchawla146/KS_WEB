import Faculty from "@/components/Faculty";

export default async function FacultyDeptPage({ params }: { params: Promise<{ dept: string }> }) {
  const resolved = await params;
  const dept = resolved?.dept;
  return <Faculty dept={dept} />;
}
