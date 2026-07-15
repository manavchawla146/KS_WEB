"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* -----------------------------------------------
   PROGRAMS OF DISTINCTION
   Mouse-following image hover, editorial
   layout, premium typography.
   ----------------------------------------------- */
const PROGRAMS = [
  {
    title: "M.Sc. (CA & IT)",
    slug: "m-sc-ca-it",
    img: "https://source.unsplash.com/1200x800/?technology,computer,code",
    desc: "A 5-year integrated path to mastering computer applications and information technology.",
    duration: "5 Years Course"
  },
  {
    title: "Integrated MBA",
    slug: "integrated-mba",
    img: "https://source.unsplash.com/1200x800/?business,meeting,leadership",
    desc: "A 5-year comprehensive leadership journey blending management theory with real-world practice.",
    duration: "5 Years Course"
  },
];

export const Programs = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      id="programs"
      className="bg-white py-20 px-6 md:py-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between items-start gap-8 md:flex-row md:items-end">
          <h2 className="editorial-title text-ink">
            Programs of{" "}
            <br className="hidden md:block" />
            <span className="italic text-accent">Distinction</span>.
          </h2>
          <div className="max-w-md">
            <p className="text-ink/80 mb-8 text-[15px] font-medium leading-relaxed">
              Our curriculum is designed to evolve with the industry, ensuring
              our students are always ahead of the curve.
            </p>
            <button className="group flex items-center gap-2 font-bold uppercase tracking-widest text-xs text-ink">
              View All Details
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 transition-all duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                <ArrowRight size={14} />
              </div>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="border-t border-zinc-100">
          {PROGRAMS.map((prog, i) => (
            <Link key={i} href={`/programs/${prog.slug}`} className="block">
              <div className="service-tile group">
              {/* Floating image on hover */}
              <div
                className="service-image-hover"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                }}
              >
                <img
                  src={prog.img}
                  alt={prog.title}
                  className="h-full w-full rounded-2xl object-cover shadow-2xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // fallback to Picsum seeded image if Unsplash fails
                    (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${prog.slug}/1200/800`;
                  }}
                />
              </div>

              {/* Title row */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-6">
                  <span className="text-sm font-bold text-accent">0{i + 1}</span>
                  <h3 className="program-title font-display text-3xl text-ink md:text-6xl">
                    {prog.title}
                  </h3>
                </div>
                <div className="ml-0 flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400 md:ml-12">
                  <span>{prog.duration}</span>
                </div>
              </div>

              {/* Description (desktop) */}
              <div className="hidden max-w-sm text-sm leading-relaxed text-zinc-500 opacity-0 transition-opacity duration-500 lg:block group-hover:opacity-100">
                {prog.desc}
              </div>

              {/* Arrow */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 transition-all duration-500 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                <ArrowUpRight size={22} />
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
