"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Download, Filter, Calendar, GraduationCap, Briefcase, ArrowLeft } from "lucide-react";
import { CurtainFooter } from "./curtain-footer";

interface Paper {
  _id: string;
  url: string;
  category: string;
  year: string;
  semester: string;
  examType: string;
  title?: string;
  code?: string;
}

const Papers = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedSem, setSelectedSem] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedExamType, setSelectedExamType] = useState("All");

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/oldPapers/getByCategory/All");
        const data = await res.json();
        const allPapers = data.oldPaper || data.oldPapers || data.papers || [];
        setPapers(Array.isArray(allPapers) ? allPapers : []);
      } catch (err) {
        console.error("Error fetching papers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
    window.scrollTo(0, 0);
  }, []);

  const departments = ["All", ...Array.from(new Set(papers.map(p => p.category))).filter(Boolean)];
  const deptFiltered = papers.filter(p => selectedDept === "All" || p.category === selectedDept);

  const semesters = ["All", ...Array.from(new Set(deptFiltered.map(p => p.semester?.toString()))).filter(Boolean).sort()];
  const years = ["All", ...Array.from(new Set(deptFiltered.map(p => p.year?.toString()))).filter(Boolean).sort((a: string, b: string) => b.localeCompare(a))];
  const examTypes = ["All", ...Array.from(new Set(deptFiltered.map(p => p.examType))).filter(Boolean).sort()];

  const filteredPapers = deptFiltered.filter(paper => {
    const matchSem = selectedSem === "All" || paper.semester?.toString() === selectedSem;
    const matchYear = selectedYear === "All" || paper.year?.toString() === selectedYear;
    const matchExam = selectedExamType === "All" || paper.examType === selectedExamType;
    return matchSem && matchYear && matchExam;
  });

  const PAPERS_HOST = process.env.NEXT_PUBLIC_PAPERS_HOST || process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL || '';

  return (
    <div className="min-h-screen bg-white">

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-ink/60 hover:text-accent transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
        </Link>

        <div className="mb-16">
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Central Library</p>
          <h1 className="editorial-title text-ink mb-6">Past Examination Papers</h1>
          <p className="text-xl text-ink/60 max-w-2xl font-medium">Access our comprehensive archive of previous year examination papers across all departments.</p>
        </div>

        <div className="bento-card !bg-muted border-none p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2">
                <Briefcase size={14} /> Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => { setSelectedDept(e.target.value); setSelectedSem('All'); setSelectedYear('All'); }}
                className="bg-white border border-black/5 rounded-2xl px-6 py-3 text-sm font-bold text-ink outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2">
                <GraduationCap size={14} /> Semester
              </label>
              <select value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)} className="bg-white border border-black/5 rounded-2xl px-6 py-3 text-sm font-bold text-ink outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>{sem === 'All' ? 'All Semesters' : `Semester ${sem}`}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2">
                <Calendar size={14} /> Academic Year
              </label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-white border border-black/5 rounded-2xl px-6 py-3 text-sm font-bold text-ink outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                {years.map((year) => (
                  <option key={year} value={year}>{year === 'All' ? 'All Years' : year}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2">
                <Filter size={14} /> Exam Type
              </label>
              <select value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)} className="bg-white border border-black/5 rounded-2xl px-6 py-3 text-sm font-bold text-ink outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                {examTypes.map((type) => (
                  <option key={type} value={type}>{type === 'All' ? 'All Exam Types' : type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} className="bento-card bg-muted/30 h-32 animate-pulse rounded-2xl" />
            ))
          ) : filteredPapers.length > 0 ? (
            filteredPapers.map((paper) => (
              <div key={paper._id} className="bento-card group hover:bg-white border-black/5 transition-all duration-500 flex items-center justify-between p-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center transition-transform group-hover:scale-110">
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{paper.category}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/20" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">{paper.examType} Exam</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-ink group-hover:text-accent transition-colors">{paper.title || `${paper.category} - Sem ${paper.semester} (${paper.year})`}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-muted px-2 py-1 rounded-md text-ink/40">Code: {paper.code || 'N/A'}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-muted px-2 py-1 rounded-md text-ink/40">Year: {paper.year}</span>
                    </div>
                  </div>
                </div>
                <a href={paper.url.startsWith('http') ? paper.url : `${PAPERS_HOST}/${paper.url}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-ink hover:bg-accent hover:border-accent hover:text-white transition-all group-hover:shadow-xl group-hover:shadow-accent/20">
                  <Download size={20} />
                </a>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 py-24 text-center bento-card border-dashed">
              <FileText size={40} className="mx-auto mb-4 text-ink/20" />
              <p className="text-ink/40 font-mono text-xs uppercase tracking-widest">No papers found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <CurtainFooter />
    </div>
  );
};

export default Papers;
