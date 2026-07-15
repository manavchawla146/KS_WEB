// src/app/placements/[type]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CurtainFooter } from "@/components/curtain-footer";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/Marquee";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  Users,
  CheckCircle2,
  FileText,
  ClipboardList,
  UserCheck,
  Handshake,
  Quote,
} from "lucide-react";

type PlacementType = "mba" | "m-sc-ca-it";

interface ProgramData {
  title: string;
  shortTitle: string;
  icon: typeof GraduationCap;
  tagline: string;
  hero: string;
  intro: string;
  specializations: string[];
  curriculumFocus: string[];
  keySkills: string[];
  rolesOffered: string[];
}

const programData: Record<PlacementType, ProgramData> = {
  mba: {
    title: "Five-Year Integrated MBA",
    shortTitle: "MBA",
    icon: Briefcase,
    tagline: "Management Excellence Since 1993",
    hero: "https://picsum.photos/seed/mba-placement-hero/1400/900",
    intro:
      "Our Management graduates specialize in core business functions and are trained through real-world case studies, corporate presentations, and continuous industry exposure.",
    specializations: ["Finance", "Marketing", "Human Resources (HR)"],
    curriculumFocus: [
      "Real-world Case Studies",
      "Corporate Presentations",
      "Continuous Industry Exposure",
      "Strategic Management",
    ],
    keySkills: [
      "Strategic Planning",
      "Financial Analysis",
      "Brand Management",
      "Consumer Behavior",
      "Corporate Communication",
    ],
    rolesOffered: [
      "Management Trainee",
      "Financial Analyst",
      "Sales Executive",
      "HR Specialist",
      "Marketing Associate",
    ],
  },
  "m-sc-ca-it": {
    title: "Five-Year Integrated M.Sc. (CA & IT)",
    shortTitle: "M.Sc. (CA & IT)",
    icon: GraduationCap,
    tagline: "Technology Leaders of Tomorrow",
    hero: "https://picsum.photos/seed/msc-placement-hero/1400/900",
    intro:
      "Our Tech graduates undergo rigorous practical training, mastering foundational technologies, advanced networking, and hands-on software development.",
    specializations: [
      "Computer Applications",
      "Information Technology",
      "IoT & Cloud Frameworks",
    ],
    curriculumFocus: [
      "Software Engineering",
      "Advanced Networking",
      "Software Project Management",
      "Live IoT Projects",
    ],
    keySkills: [
      "Full-Stack Development",
      "Database Administration",
      "Systems Analysis",
      "Data Science",
      "Cloud Frameworks",
    ],
    rolesOffered: [
      "Software Engineer",
      "Web Developer",
      "IT Consultant",
      "Systems Analyst",
      "Network Administrator",
    ],
  },
};

const highlights = [
  { label: "Average Package", value: "₹6.00", suffix: "LPA", icon: TrendingUp },
  { label: "Highest Package", value: "₹18-19", suffix: "LPA", icon: Award },
  { label: "Placement Success", value: "70-85", suffix: "%", icon: Users },
  { label: "Recruitment Partners", value: "50", suffix: "+", icon: Building2 },
];

const placementProcess = [
  {
    step: "01",
    icon: Mail,
    title: "Corporate Invitation",
    description:
      "The Placement Cell reaches out to corporate partners with the annual Placement Brochure.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Pre-Placement Talk (PPT)",
    description:
      "Companies interact with students to brief them about profiles, career growth, and expectations.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Student Profiling",
    description:
      "Interested students submit their verified resumes to the placement portal.",
  },
  {
    step: "04",
    icon: UserCheck,
    title: "Screening & Selection",
    description:
      "Recruitment drives are conducted on/off-campus involving Aptitude Tests, Group Discussions, and Technical/HR Interviews.",
  },
  {
    step: "05",
    icon: Handshake,
    title: "Final Offer",
    description:
      "Selected students receive formal employment offers through the campus cell.",
  },
];

const recruiterCategories = [
  {
    category: "Banking & Finance",
    companies: ["HDFC Bank", "Kotak Securities", "ICICI Bank", "SBI Life Insurance"],
  },
  {
    category: "Consulting & Professional Services",
    companies: ["Deloitte", "KPMG"],
  },
  {
    category: "Retail & FMCG",
    companies: ["Amul", "Pantaloons", "Coca-Cola"],
  },
  {
    category: "Media & Infrastructure",
    companies: ["The Times of India", "Adani Group", "Torrent Power"],
  },
];

const marqueeLogos = [
  "https://picsum.photos/seed/company1/300/120",
  "https://picsum.photos/seed/company2/300/120",
  "https://picsum.photos/seed/company3/300/120",
  "https://picsum.photos/seed/company4/300/120",
  "https://picsum.photos/seed/company5/300/120",
  "https://picsum.photos/seed/company6/300/120",
  "https://picsum.photos/seed/company7/300/120",
  "https://picsum.photos/seed/company8/300/120",
];

const contactInfo = {
  officer: "Placement Officer",
  emails: ["placement@ksschool.org.in", "ksschool31@yahoo.co.in"],
  phones: ["+91-79-26305972", "+91-79-26302119"],
  address:
    "K. S. School of Business Management, Gujarat University Campus, Navrangpura, Ahmedabad - 380009",
};

export default function PlacementsDynamicPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const [type, setType] = useState<string>("");

  useEffect(() => {
    params.then((resolvedParams) => setType(resolvedParams.type));
  }, [params]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isValidType = type === "mba" || type === "m-sc-ca-it";
  const data = isValidType ? programData[type as PlacementType] : null;

  if (!isValidType || !data) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-white flex items-center justify-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-[#111111]">
            Placement type not found
          </h1>
          <p className="text-zinc-600 mb-8">
            Available paths: /placements/mba or /placements/m-sc-ca-it
          </p>
          <a
            href="/placements/mba"
            className="inline-block px-6 py-3 bg-[#e31e24] text-white rounded-lg hover:bg-[#c01a20] transition-colors"
          >
            Go to MBA Placements
          </a>
        </div>
      </div>
    );
  }

  const ProgramIcon = data.icon;

  return (
    <div className="bg-white min-h-screen text-[#111111] overflow-hidden font-sans">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-white pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#e31e24]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full shadow-sm mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#e31e24] animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wide text-zinc-600 uppercase">
                  Training & Placement Cell
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] mb-8 tracking-tight leading-[1.05]">
                {data.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[#e31e24] italic font-serif">
                  {data.title.split(" ").slice(-1)}
                </span>
              </h1>

              <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl mb-10 font-light">
                Welcome to the Training & Placement Cell of K.S. School of
                Business Management (KSSBM), Gujarat University. Since 1993, our
                institute has been bridging the gap between industry requirements
                and academic excellence. We nurture future-ready professionals
                who possess strong ethical values, practical problem-solving
                skills, and a commitment to teamwork.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#highlights"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-sm font-medium rounded-full hover:bg-[#e31e24] transition-all duration-300 hover:shadow-xl hover:shadow-[#e31e24]/20"
                >
                  View Highlights
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-zinc-200 text-[#111111] text-sm font-medium rounded-full hover:border-zinc-900 hover:bg-zinc-50 transition-colors duration-300"
                >
                  Contact Placement Cell
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#e31e24]/20 to-transparent rounded-[2rem] blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white">
                  <img
                    src={data.hero}
                    alt={`${data.shortTitle} Placements`}
                    className="w-full h-[520px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Info Card over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-[#e31e24] rounded-xl">
                        <ProgramIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg leading-tight">{data.shortTitle} Placements</p>
                        <p className="text-white/70 text-xs mt-1 tracking-wider uppercase">Gujarat University · Ahmedabad</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== HIGHLIGHTS / QUICK FACTS ===================== */}
      {/* Dark sleek strip right after hero */}
      <section id="highlights" className="bg-[#111111] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[11px] mb-4">
                Placement Highlights
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Numbers That Speak
              </h2>
            </div>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
              Our dedication to bridging academics and industry needs is reflected in our consistent placement record.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#111111] p-8 lg:p-10 hover:bg-[#1a1a1a] transition-colors duration-300 group"
                >
                  <Icon className="w-7 h-7 text-[#e31e24] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-xl font-semibold text-[#e31e24]">
                      {item.suffix}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== PROGRAM & TALENT POOL ===================== */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-4xl"
          >
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[11px] mb-4">
              Our Programs & Talent Pool
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight">
              {data.title}
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-light">
              {data.intro}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specializations - Dark Premium Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-[#111111] to-[#222] rounded-3xl p-10 text-white relative overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#e31e24]/10 rounded-full blur-3xl group-hover:bg-[#e31e24]/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit mb-8">
                  <Award className="w-6 h-6 text-[#e31e24]" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-8 tracking-tight">Specializations</h3>
                <ul className="space-y-5">
                  {data.specializations.map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-white/90 text-base font-light border-b border-white/5 pb-4 last:border-0"
                    >
                      <span className="text-[#e31e24] font-mono text-sm">0{i+1}</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Curriculum & Skills - Clean Minimalist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-zinc-50 rounded-3xl p-10 border border-zinc-100"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="p-3 bg-[#e31e24]/10 rounded-xl w-fit mb-6">
                    <FileText className="w-6 h-6 text-[#e31e24]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-[#111111] tracking-tight">
                    Curriculum Focus
                  </h3>
                  <ul className="space-y-4">
                    {data.curriculumFocus.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-zinc-700 text-sm leading-relaxed"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#e31e24] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="p-3 bg-[#111111] rounded-xl w-fit mb-6">
                    <TrendingUp className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-[#111111] tracking-tight">
                    Key Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.keySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Roles Offered - Full width inside this card */}
              <div className="mt-10 pt-8 border-t border-zinc-200">
                <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4 font-semibold">Roles Offered</h4>
                <div className="flex flex-wrap gap-3">
                  {data.rolesOffered.map((role, i) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 border border-[#e31e24]/20 bg-[#e31e24]/5 rounded-full text-sm font-medium text-[#e31e24] hover:bg-[#e31e24] hover:text-white transition-all duration-300 cursor-default"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== PLACEMENT PROCESS ===================== */}
      <section className="py-28 px-6 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[11px] mb-4">
              Placement Process
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-6">
              A Seamless Recruitment Journey
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              A structured, transparent, and efficient recruitment journey
              designed to connect the right talent with the right opportunities.
            </p>
          </motion.div>

          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-zinc-200 -translate-y-1/2 mx-32"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {placementProcess.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-[#e31e24]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#e31e24]">
                      <Icon className="w-7 h-7 text-[#e31e24]" strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold border-4 border-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-3 text-[#111111] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== KEY RECRUITERS ===================== */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[11px] mb-4">
              Our Key Recruiters
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight">
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          {/* Categorized Recruiters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {recruiterCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-zinc-100 rounded-2xl p-8 hover:border-zinc-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-100">
                  <div className="w-10 h-10 rounded-lg bg-[#e31e24]/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#e31e24]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] tracking-tight">
                    {cat.category}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {cat.companies.map((company, j) => (
                    <span
                      key={j}
                      className="text-xl text-zinc-300 font-bold tracking-tight hover:text-[#111111] transition-colors duration-300 cursor-default"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-y border-zinc-100 py-10"
          >
            <p className="text-center text-xs text-zinc-400 mb-8 uppercase tracking-[0.3em] font-medium">
              &amp; many more past recruiters
            </p>
            <Marquee logos={marqueeLogos} />
          </motion.div>
        </div>
      </section>

      {/* ===================== MESSAGE FOR RECRUITERS ===================== */}
      <section className="py-28 px-6 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#e31e24] blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white blur-[150px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex p-5 bg-[#e31e24] rounded-2xl mb-10 shadow-lg shadow-[#e31e24]/30">
              <Quote className="w-10 h-10 text-white" fill="currentColor" strokeWidth={0} />
            </div>

            <blockquote className="text-3xl md:text-4xl font-serif italic text-white leading-relaxed mb-10 tracking-tight">
              KSSBM&IT takes pride in developing a diverse talent pool capable of
              adding value to organizations from day one. We invite esteemed
              organizations to collaborate with us for final placements and
              summer internships. Experience the dedication and competence of
              Gujarat University&apos;s top minds.
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#111111] text-sm font-bold rounded-full hover:bg-[#e31e24] hover:text-white transition-all duration-300 uppercase tracking-wider"
              >
                <Download className="w-4 h-4" />
                Download Placement Brochure
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-all duration-300 uppercase tracking-wider"
              >
                Connect With Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section id="contact" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[11px] mb-4">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight">
              Contact Placement Cell
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Officer Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-50 rounded-3xl p-10 border border-zinc-100 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-8 shadow-sm">
                  <Users className="w-6 h-6 text-[#e31e24]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  Placement Officer
                </h3>
                <p className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">{contactInfo.officer}</p>
                <p className="text-zinc-500 text-sm font-light">
                  Training &amp; Placement Cell
                </p>
              </div>
            </motion.div>

            {/* Email & Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-zinc-50 rounded-3xl p-10 border border-zinc-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-8 shadow-sm">
                <Mail className="w-6 h-6 text-[#e31e24]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                Email &amp; Phone
              </h3>
              <div className="space-y-3 mb-6">
                {contactInfo.emails.map((email, i) => (
                  <a
                    key={i}
                    href={`mailto:${email}`}
                    className="block text-base font-medium text-[#111111] hover:text-[#e31e24] transition-colors"
                  >
                    {email}
                  </a>
                ))}
              </div>
              <div className="pt-6 border-t border-zinc-200 space-y-3">
                {contactInfo.phones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-zinc-600 hover:text-[#e31e24] transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4 text-[#e31e24]" strokeWidth={1.5} />
                    {phone}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-50 rounded-3xl p-10 border border-zinc-100 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-8 shadow-sm">
                  <MapPin className="w-6 h-6 text-[#e31e24]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  Address
                </h3>
                <p className="text-base text-[#111111] leading-relaxed font-light">
                  {contactInfo.address}
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=K.S.School+of+Business+Management+Gujarat+University+Ahmedabad"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 group inline-flex items-center gap-2 text-sm font-bold text-[#111111] uppercase tracking-wider hover:text-[#e31e24] transition-colors"
              >
                View on Map
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-zinc-200 group-hover:bg-[#e31e24] group-hover:border-[#e31e24] group-hover:text-white transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <CurtainFooter />
    </div>
  );
}