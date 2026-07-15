import FacultyProfile from "@/components/FacultyProfile";

export default async function FacultyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  const id = resolved?.id;
  return <FacultyProfile id={id} />;
}
