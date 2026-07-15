// src/app/programs/[type]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CurtainFooter } from "@/components/curtain-footer";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Users,
  BookOpen,
  Target,
  Layers,
  Rocket,
  Wallet,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Code2,
  Server,
  ShieldCheck,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

// --- DATA ---
const programsData: Record<string, any> = {
  "integrated-mba": {
    title: "Integrated MBA",
    accentTitle: "MBA",
    subtitle: "Five-Year Program",
    tagline: "Master of Business Administration",
    hero: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop",
    icon: Briefcase,
    highlights: [
      { icon: CalendarDays, label: "Duration", value: "5 Years" },
      { icon: Award, label: "Degree Awarded", value: "BBA + MBA" },
    ],
    objective: "The Integrated MBA program aims to build a solid foundation in business management from day one. Instead of pursuing a traditional three-year bachelor's degree followed by a two-year MBA, this unified path provides continuous learning, professional grooming, and direct corporate exposure.",
    specializations: [
      { title: "Finance", desc: "Corporate finance, investment banking, risk management, and financial markets.", icon: Wallet },
      { title: "Marketing", desc: "Brand management, digital marketing, consumer behavior, and sales strategy.", icon: Target },
      { title: "Human Resource Management", desc: "Talent acquisition, organizational development, and labor laws.", icon: Users },
    ],
    structure: [
      { phase: "Years 1 & 2", sub: "Foundation", desc: "Principles of Management, Micro & Macro Economics, Business Mathematics, Financial Accounting, and Business Communication." },
      { phase: "Year 3", sub: "Core Management", desc: "Marketing Management, Human Resource Management, Operations Research, Management Accounting, and Cost Systems." },
      { phase: "Years 4 & 5", sub: "Advanced & Specialisation", desc: "Strategic Management, Specialized Core Electives, Summer Internships, and Grand Corporate Projects." },
    ],
    careers: ["Management Trainee", "Financial Analyst", "Marketing Executive", "HR Generalist", "Business Development Manager"],
  },
  "m-sc-ca-it": {
    title: "Integrated M.Sc.",
    accentTitle: "CA & IT",
    subtitle: "Five-Year Program",
    tagline: "Computer Applications & Information Technology",
    hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    icon: Code2,
    highlights: [
      { icon: CalendarDays, label: "Duration", value: "5 Years" },
      { icon: Award, label: "Degree Awarded", value: "BSc + MSc" },
    ],
    objective: "The Integrated M.Sc. (CA & IT) program is engineered to address the fast-evolving demands of the global software and technology industry. It merges foundational computer science theory with cutting-edge software development practices to create agile tech professionals.",
    specializations: [
      { title: "Software Development", desc: "Full-stack development, object-oriented programming, and mobile app architecture.", icon: Code2 },
      { title: "Data & Cloud Systems", desc: "Database management (DBMS/RDBMS), cloud computing frameworks, and data analytics.", icon: Server },
      { title: "Networking & Security", desc: "Advanced computer networks, system administration, and cyber security principles.", icon: ShieldCheck },
    ],
    structure: [
      { phase: "Years 1 & 2", sub: "Foundational Computing", desc: "Programming in C/C++, Web Designing (HTML/CSS/JavaScript), Digital Electronics, Data Structures, and Mathematical Foundations." },
      { phase: "Year 3", sub: "Advanced Systems", desc: "Java Programming, Database Management Systems (DBMS), Operating Systems, and Software Engineering." },
      { phase: "Years 4 & 5", sub: "Enterprise & Emerging Tech", desc: "Advanced Java/Python, Web Frameworks, Mobile Application Development, Software Project Management, and a mandatory 6-month Live Industrial Project." },
    ],
    careers: ["Software Engineer", "Full-Stack Developer", "Systems Analyst", "UI/UX Designer", "IT Consultant", "Database Administrator"],
  },
};

const whyChooseKSSBM = [
  { icon: Layers, title: "Dual Degree Edge", desc: "Saves transition time between undergraduate and postgraduate degrees with an uninterrupted 5-year curriculum." },
  { icon: Wallet, title: "Affordable Excellence", desc: "Premium government-aided education at a fraction of private university costs." },
  { icon: FlaskConical, title: "Experiential Learning", desc: "Mandatory summer internships for MBA and full-semester live corporate IT projects for M.Sc. students." },
  { icon: Sparkles, title: "Holistic Development", desc: "Active student clubs, management fests, tech symposiums, and sports events." },
];

export default function ProgramDynamicPage({ params }: { params: Promise<{ type: string }> }) {
  const [type, setType] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    params.then((res) => setType(res.type));
    setMounted(true);
  }, [params]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = programsData[type];

  if (!mounted || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-zinc-500 font-mono text-sm">LOADING PROGRAM DATA...</div>
      </div>
    );
  }

  const ProgramIcon = data.icon;

  return (
    <div className="bg-[#fafafa] min-h-screen text-[#111111] overflow-x-hidden font-sans selection:bg-[#e31e24] selection:text-white">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-12 border-b border-zinc-200">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-zinc-100 to-transparent opacity-50" />
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#e31e24]/5 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-end pb-6 lg:pb-12">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-end h-full"
          >
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <span className="h-px w-8 lg:w-12 bg-[#e31e24]"></span>
              <span className="text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-[#e31e24]">{data.subtitle}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-[#111111] mb-6 lg:mb-8">
              {data.title.split(data.accentTitle)[0]}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e31e24] to-[#ff4d52] italic font-serif pl-2 lg:pl-4 mt-2">
                {data.accentTitle}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-500 font-light max-w-2xl leading-relaxed mb-8 lg:mb-12">
              {data.tagline}. A rigorous pathway designed to transform ambition into expertise.
            </p>

          </motion.div>

          {/* Right Image / Stats */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="lg:col-span-5 relative w-full"
          >
             <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-200">
                <img src={data.hero} alt="Program Hero" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
                   <div className="grid grid-cols-2 items-center divide-x divide-white/20 md:items-start">
                      {data.highlights.map((h: any, i: number) => (
                        <div key={i} className="px-4 text-center">
                           <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-70 mb-1">{h.label}</p>
                           <p className="font-semibold text-xs sm:text-sm md:text-base">{h.value}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== OBJECTIVE MARQUEE ===================== */}
      <div className="py-8 lg:py-12 bg-[#111111] overflow-hidden whitespace-nowrap border-y border-zinc-800">
         <div className="inline-flex animate-marquee items-center gap-8">
            {[...Array(4)].map((_, i) => (
               <React.Fragment key={i}>
                  <span className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-zinc-500 opacity-50 mx-4">
                     {data.objective.substring(0, 60)}...
                  </span>
                  <Sparkles className="text-[#e31e24] w-6 h-6 sm:w-8 sm:h-8" />
               </React.Fragment>
            ))}
         </div>
      </div>

      {/* ===================== SPECIALIZATIONS GRID ===================== */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 gap-6">
           <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#e31e24] tracking-[0.3em] uppercase mb-4">Academic Focus</h2>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] tracking-tight">Specializations <br/> Offered</h3>
           </div>
           <p className="text-zinc-500 max-w-md text-base sm:text-lg font-light">
              Tailor your degree with industry-relevant concentrations designed to meet modern market demands.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
           {data.specializations.map((spec: any, i: number) => {
              const Icon = spec.icon;
              return (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative p-6 sm:p-8 lg:p-10 bg-white border border-zinc-100 rounded-[2rem] hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500"
                 >
                    <div className="absolute top-6 right-6 sm:top-10 sm:right-10 opacity-10 group-hover:opacity-100 group-hover:text-[#e31e24] transition-all duration-500">
                       <Icon className="w-16 h-16 sm:w-24 sm:h-24 -rotate-12" strokeWidth={1} />
                    </div>
                    
                    <div className="relative z-10">
                       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-6 lg:mb-8 group-hover:bg-[#e31e24] group-hover:text-white transition-colors duration-300">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                       </div>
                       <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#111111]">{spec.title}</h4>
                       <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-light">{spec.desc}</p>
                    </div>
                 </motion.div>
              )
           })}
        </div>
      </section>

      {/* ===================== CURRICULUM TIMELINE ===================== */}
      <section id="curriculum" className="py-16 sm:py-24 lg:py-32 bg-zinc-50 relative">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
               
               {/* Sticky Sidebar */}
               <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                     <h2 className="text-4xl sm:text-5xl font-bold text-[#111111] tracking-tight mb-4 lg:mb-6">
                        The <br/> Roadmap
                     </h2>
                     <p className="text-zinc-500 text-base lg:text-lg mb-6 lg:mb-8 font-light">
                        A structured journey from foundational concepts to advanced corporate mastery.
                     </p>
                     <div className="h-1 w-20 bg-[#e31e24] rounded-full"></div>
                  </div>
               </div>

               {/* Timeline Items */}
               <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                  {data.structure.map((step: any, i: number) => (
                     <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-6 sm:pl-8 md:pl-0"
                     >
                        {/* Connector Line for Mobile */}
                        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-zinc-200"></div>
                        
                        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                           <div className="absolute top-4 right-4 sm:top-8 sm:right-8 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                              <span className="text-6xl sm:text-9xl font-black text-zinc-900">{i + 1}</span>
                           </div>

                           <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-zinc-100 text-[#111111] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full w-fit">
                                 Phase {i + 1}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">{step.phase}</h3>
                           </div>
                           
                           <h4 className="text-base sm:text-lg font-medium text-[#e31e24] mb-3 sm:mb-4">{step.sub}</h4>
                           <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                              {step.desc}
                           </p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ===================== CAREERS TICKER ===================== */}
      <section className="py-16 sm:py-24 bg-[#111111] text-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Career Outcomes</h2>
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-[#e31e24]" />
         </div>
         
         <div className="relative flex overflow-x-hidden group">
            <div className="py-4 animate-marquee-reverse whitespace-nowrap flex gap-4 sm:gap-6">
               {[...data.careers, ...data.careers, ...data.careers].map((role, i) => (
                  <span key={i} className="mx-2 sm:mx-4 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 text-sm sm:text-base hover:text-white hover:border-[#e31e24] transition-colors cursor-default">
                     <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e31e24]"></span>
                     {role}
                  </span>
               ))}
            </div>
         </div>
      </section>

      {/* ===================== WHY KSSBM (BENTO GRID) ===================== */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
         <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-4">Why Choose KSSBM&IT?</h2>
            <p className="text-zinc-500 text-sm sm:text-base">Distinct advantages that set our integrated programs apart.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
            {whyChooseKSSBM.map((item, i) => {
               const Icon = item.icon;
               return (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-100 flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-300 shadow-sm"
                  >
                     <div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#111111] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                           <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#111111]">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                     </div>
                  </motion.div>
               )
            })}
         </div>
      </section>

      {/* ===================== ADMISSION CTA ===================== */}
      <section id="admissions" className="py-16 sm:py-24 px-4 sm:px-6">
         <div className="max-w-5xl mx-auto">
            <div className="relative bg-[#e31e24] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 overflow-hidden text-white text-center md:text-left">
               {/* Decorative Circles */}
               <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
               <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>

               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div>
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">Ready to Start?</h2>
                     <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8 font-light">
                        Admissions are merit-based through the Gujarat State Admission Committee (GCAS). Secure your future today.
                     </p>
                     
                     <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left inline-block">
                        <div className="flex items-center gap-3 text-white/90">
                           <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                           <span className="text-sm sm:text-base">Centralized Admission Process</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
                     <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h3>
                     <a 
                        href="https://gujacpc.admissions.nic.in/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between w-full bg-white text-[#e31e24] px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold hover:bg-zinc-100 transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
                     >
                        Visit GCAS Portal <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                     </a>
                     <button className="flex items-center justify-between w-full bg-transparent border border-white/30 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium hover:bg-white/10 transition-colors text-sm sm:text-base">
                        Contact Admissions Office
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <CurtainFooter />
    </div>
  );
} 