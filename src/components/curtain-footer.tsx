// src/components/curtain-footer.tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/* -----------------------------------------------
   CURTAIN FOOTER - Clean & Fixed Layout
   ----------------------------------------------- */
export const CurtainFooter = () => {
  return (
    <div
      className="relative md:h-[800px] h-auto"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="w-full md:fixed md:bottom-0 md:h-[700px]">
        <div className="bg-[#0a0a0a] text-[#a1a1aa] h-full flex flex-col justify-between p-8 md:p-16 lg:p-24">

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />

          {/* Top Section */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col items-start">
              {/* <img src="/ks-logo.png" alt="KS School" className="h-10 w-auto mb-6 opacity-80" /> */}
              <div className="text-4xl md:text-6xl font-bold text-white leading-none">
                KS
              </div>
              <div className="text-sm md:text-base text-zinc-400 mt-2">
                School of Business Management &amp;<br />Information Technology
              </div>
            </div>

            <div className="hidden md:block text-right space-y-1">
              <p className="text-zinc-400">Gujarat University Campus</p>
              <p className="text-zinc-400">Navrangpura, Ahmedabad</p>
              <p className="text-zinc-500 text-sm mt-4">Gujarat, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Programs</p>
              <div className="space-y-3">
                <Link href="/programs/integrated-mba" className="block text-base text-zinc-400 hover:text-white transition-colors">Integrated MBA</Link>
                <Link href="/programs/m-sc-ca-it" className="block text-base text-zinc-400 hover:text-white transition-colors">M.Sc. (CA & IT)</Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Campus</p>
              <div className="space-y-3">
                <a href="#infrastructure" className="block text-base text-zinc-400 hover:text-white transition-colors">Infrastructure</a>
                <a href="#infrastructure" className="block text-base text-zinc-400 hover:text-white transition-colors">Labs</a>
                <a href="#infrastructure" className="block text-base text-zinc-400 hover:text-white transition-colors">Auditorium</a>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-4">Connect</p>
              <div className="space-y-3">
                <Link href="/contact" className="block text-base text-zinc-400 hover:text-white transition-colors">Contact Us</Link>
                <Link href="/placements" className="block text-base text-zinc-400 hover:text-white transition-colors">Placements</Link>
                <Link href="/announcements" className="block text-base text-zinc-400 hover:text-white transition-colors">Announcements</Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              &copy; 2026 KS School of Business Management &amp; IT. All rights reserved.
            </p>
          <p className="text-sm md:text-base text-zinc-400 mt-2 font-medium">
                  Made by <span className="text-white">MANAV &amp; RAJ</span>
                </p>
            <div className="flex gap-6 text-xl">
              {["Instagram", "LinkedIn", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="group hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  {s}
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};