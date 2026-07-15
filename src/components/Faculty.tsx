"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { ArrowLeft, User, Mail, Award, BookOpen } from "lucide-react";
import { CurtainFooter } from "./curtain-footer";

interface FacultyMember {
  _id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  email: string;
  profileImage?: string;
  category: "MSCIT" | "MBA" | string;
}

const deptMapping: Record<string, { dbCategory: string; title: string; description: string }> = {
  'msc-it': { dbCategory: 'MSCIT', title: 'MSc IT Faculty', description: 'Our information technology experts leading the way in computer science and software innovation.' },
  'mba': { dbCategory: 'MBA', title: 'MBA Faculty', description: 'Strategic management experts and industry veterans who shape the business leaders of tomorrow.' },
};

const Faculty = ({ dept }: { dept?: string }) => {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If the server didn't pass a dept prop, derive it from the pathname (client-side fallback)
  const pathname = usePathname();
  const derivedDept = React.useMemo(() => {
    if (dept) return dept;
    if (!pathname) return undefined;
    const parts = pathname.split('/').filter(Boolean); // ['faculty', 'mba']
    if (parts.length >= 2 && parts[0] === 'faculty') return parts[1];
    return undefined;
  }, [dept, pathname]);

  const currentDept = derivedDept && deptMapping[derivedDept] ? deptMapping[derivedDept] : deptMapping['msc-it'];

  // Debug logs to inspect incoming prop and resolved mapping
  useEffect(() => {
    console.log('[debug] Faculty component dept prop:', dept);
    console.log('[debug] Faculty component pathname-derived dept:', derivedDept);
    console.log('[debug] Faculty component currentDept:', currentDept);
  }, [dept, derivedDept, currentDept]);

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/faculty');
        if (!res.ok) {
          const text = await res.text().catch(() => 'unable to read response');
          throw new Error(`Faculty API fetch failed: ${res.status} ${text}`);
        }

        const data = await res.json();
        if (!data.success) {
          throw new Error(`Faculty API responded with error: ${data.error || 'unknown error'}`);
        }

        const allFaculty = Array.isArray(data.faculty) ? data.faculty : [];
        if (!Array.isArray(data.faculty)) {
          throw new Error(`Faculty API returned invalid faculty payload: ${JSON.stringify(data.faculty)}`);
        }

        const filtered = allFaculty.filter((f: FacultyMember) => f.category === currentDept.dbCategory);
        console.log('[debug] fetched faculty count', allFaculty.length, 'filtered count', filtered.length);
        setFaculty(filtered);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown faculty fetch error';
        console.error('Error fetching faculty:', message, err);
        setError(message);
        setFaculty([]);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchFaculty();
  }, [dept, currentDept.dbCategory]);

  return (
    <div className="min-h-screen bg-white">

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-ink/60 hover:text-accent transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
        </Link>

        <div className="mb-20">
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Department Faculty</p>
          <h1 className="editorial-title text-ink mb-6">{currentDept.title}</h1>
          <p className="text-xl text-ink/60 max-w-2xl font-medium">{currentDept.description}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="bento-card bg-muted/30 h-[500px] animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : error ? (
          <div className="py-24 text-center bento-card border-dashed">
            <User size={40} className="mx-auto mb-4 text-ink/20" />
            <p className="text-ink/40 font-mono text-xs uppercase tracking-widest mb-4">Failed to load faculty data.</p>
            <p className="text-ink/60 text-sm">{error}</p>
          </div>
        ) : faculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {faculty.map((member) => (
              <div key={member._id} className="bento-card group hover:bg-muted/50 border-none transition-all duration-500 overflow-hidden !p-0">
                <Link href={`/faculty-profile/${member._id}`} className="h-[300px] overflow-hidden bg-muted/20 block">
                  {member.profileImage ? (
                    // remote images served from ks server
                    <img src={`${process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL?.replace(/\/$/, '')}/${member.profileImage}`} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink/10"><User size={80} /></div>
                  )}
                </Link>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-ink mb-1">{member.name}</h3>
                      <p className="text-accent text-[10px] font-bold uppercase tracking-widest">{member.designation}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:text-accent"><User size={20} /></div>
                  </div>

                  <div className="space-y-4 mt-8 pb-4 border-b border-black/5">
                    {member.qualification && (
                      <div className="flex items-center gap-3 text-ink/70"><Award size={16} className="text-accent" /><span className="text-xs font-medium uppercase tracking-wider">{member.qualification}</span></div>
                    )}
                    {member.email && (
                      <div className="flex items-center gap-3 text-ink/70"><Mail size={16} className="text-accent" /><span className="text-xs font-medium font-mono">{member.email}</span></div>
                    )}
                  </div>

                  <Link href={`/faculty-profile/${member._id}`} className="mt-8 text-xs font-bold uppercase tracking-widest text-ink/40 hover:text-accent group-hover:text-accent transition-colors flex items-center gap-2">View Full Profile <BookOpen size={14} /></Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bento-card border-dashed">
            <User size={40} className="mx-auto mb-4 text-ink/20" />
            <p className="text-ink/40 font-mono text-xs uppercase tracking-widest">No faculty member found in this directory.</p>
          </div>
        )}
      </main>

      <CurtainFooter />
    </div>
  );
};

export default Faculty;
