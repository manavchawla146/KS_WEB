"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Award, BookOpen, GraduationCap, Briefcase, FileText, Globe } from "lucide-react";
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
  bio?: string;
  teachingExperience?: number;
  researchExperience?: number;
  subjects?: string[];
  researchInterest?: string[];
}

const FacultyProfile = ({ id }: { id?: string }) => {
  const [member, setMember] = useState<FacultyMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        console.log('[debug] FacultyProfile fetching id:', id);
        const res = await fetch(`/api/faculty/${id}`);
        const data = await res.json();
        console.log('[debug] FacultyProfile response:', data);
        setMember(data.faculty || null);
      } catch (err) {
        console.error('Error fetching faculty details:', err);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    if (id) fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-48 pb-24 flex justify-center"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-48 pb-24 text-center"><h1 className="text-4xl font-display font-bold text-ink">Faculty member not found</h1><Link href="/" className="text-accent mt-4 inline-block font-bold uppercase tracking-widest text-xs">Back to Home</Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <Link href={`/faculty/${member.category.toLowerCase() === 'mscit' ? 'msc-it' : 'mba'}`} className="inline-flex items-center gap-2 text-ink/60 hover:text-accent transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Directory</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="bento-card !p-0 overflow-hidden rounded-[2.5rem] sticky top-32">
              <div className="aspect-[4/5]">
                {member.profileImage ? (
                  <img src={`${process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL?.replace(/\/$/, '')}/${member.profileImage}`} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted/20 flex items-center justify-center text-ink/10"><Briefcase size={120} /></div>
                )}
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-ink">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Email Address</p>
                    <p className="text-sm font-medium font-mono">{member.email}</p>
                  </div>
                </div>
                {member.department && (
                   <div className="flex items-center gap-4 text-ink">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Globe size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Department</p>
                      <p className="text-sm font-medium">{member.department}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-12">
              <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Faculty Profile</p>
              <h1 className="editorial-title text-ink mb-4">{member.name}</h1>
              <p className="text-2xl text-ink/60 font-medium italic">{member.designation}</p>
            </div>

            <div className="space-y-16">
              {member.bio && (
                <section>
                  <h3 className="section-title text-xl mb-6 flex items-center gap-3"><FileText size={20} className="text-accent" /> Biography</h3>
                  <p className="text-lg text-ink/70 leading-relaxed font-medium">{member.bio}</p>
                </section>
              )}

              {member.qualification && (
                <section>
                  <h3 className="section-title text-xl mb-6 flex items-center gap-3"><GraduationCap size={20} className="text-accent" /> Academic Background</h3>
                  <div className="bento-card border-none bg-muted/30 p-8"><p className="text-lg font-bold text-ink">{member.qualification}</p></div>
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bento-card border-none bg-ink text-white p-8"><Briefcase size={32} className="text-accent mb-4" /><p className="text-4xl font-display font-bold mb-1 text-black">{member.teachingExperience || 0} Years</p><p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Teaching Experience</p></div>
                <div className="bento-card border-none bg-muted p-8"><Award size={32} className="text-accent mb-4" /><p className="text-4xl font-display font-bold mb-1 text-ink">{member.researchExperience || 0} Years</p><p className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Research Experience</p></div>
              </div>

              {member.subjects && member.subjects.length > 0 && (
                <section>
                  <h3 className="section-title text-xl mb-6 flex items-center gap-3"><BookOpen size={20} className="text-accent" /> Subjects Taught</h3>
                  <div className="flex flex-wrap gap-3">{member.subjects.map((sub, i) => (<span key={i} className="px-5 py-3 rounded-full bg-muted text-ink text-xs font-bold uppercase tracking-widest border border-black/5">{sub}</span>))}</div>
                </section>
              )}

              {member.researchInterest && member.researchInterest.length > 0 && (
                <section>
                  <h3 className="section-title text-xl mb-6 flex items-center gap-3"><Globe size={20} className="text-accent" /> Research Interests</h3>
                  <div className="flex flex-wrap gap-3">{member.researchInterest.map((interest, i) => (<span key={i} className="px-5 py-3 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/20">{interest}</span>))}</div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      <CurtainFooter />
    </div>
  );
};

export default FacultyProfile;
