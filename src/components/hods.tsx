"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------------------------
   HODs - LEADERSHIP SECTION (REVISED V3)
   
   Fixes:
   1. Text is now darker (more visible).
   2. Images are layered ON TOP of text during scroll.
   ----------------------------------------------- */
export const HODs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple stagger
        gsap.set('.hod-card-item', { y: 40, opacity: 0 });
        gsap.to('.hod-card-item', {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
          },
        });
        return;
      }

      // Desktop: Complex Animation Sequence
      
      // --- INITIAL STATES ---
      
      gsap.set('.hero-text', { scale: 1, opacity: 1 });
      
      // 2. Dean starts LOWER than center (below viewport)
      gsap.set('.hod-main', { y: '60vh', opacity: 0 });
      
      // 3. Side cards start at center, but INVISIBLE and small
      gsap.set('.hod-side-left', { opacity: 0, scale: 0.8 });
      gsap.set('.hod-side-right', { opacity: 0, scale: 0.8 });
      
      // 4. Info cards start hidden
      gsap.set('.hod-card-info', { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=2500',
          scrub: 1,
          pin: true,
        },
      });

      // --- ANIMATION SEQUENCE ---

      // Phase 1: Text shrinks to Top + Dean Rises to Center (Happens together)
      tl.to('.hero-text', {
        scale: 0.15,     
        y: '-35vh',      
        opacity: 1,
        duration: 2
      }, 0);

      tl.to('.hod-main', {
        y: 0,           
        opacity: 1,
        ease: 'power2.out',
        duration: 2
      }, 0); 

      // Phase 2: Side Cards Emerge
      tl.to('.hod-side-left', {
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.7)', 
        duration: 1.5
      }, 1.2);

      tl.to('.hod-side-right', {
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.7)',
        duration: 1.5
      }, 1.2); 

      // Phase 3: Info Text appears
      tl.to('.hod-card-info', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1
      }, 2); 

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-zinc-50 via-white to-zinc-100 overflow-hidden"
    >
      {/* Decorative SVG Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute h-full w-full" preserveAspectRatio="none">
          <path
            d="M0,200 Q300,100 600,300 T1200,200"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M0,400 Q400,500 800,300 T1200,450"
            fill="none"
            stroke="url(#lineGrad2)"
            strokeWidth="0.3"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a373" stopOpacity="0" />
              <stop offset="50%" stopColor="#d4a373" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4a373" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-amber-200/15 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-purple-200/15 blur-3xl" />
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="relative flex flex-col items-center gap-8 py-20 md:hidden">
        <motion.p
          className="relative mb-6 text-center text-xs font-light uppercase tracking-[0.5em] text-zinc-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="relative inline-block">
            The People Behind
            <span className="absolute -bottom-2 left-1/2 h-px w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          </span>
        </motion.p>
        <HODCard
          name="Dr. Neerja A. Gupta"
          role={<>Vice Chancellor<br/>(Gujarat University)</>}
          img={encodeURI('/assets/Dr. Neerja A. Gupta.jpg')}
          mobile
        />
        <HODCard
          name="Dr. Paavan Pandit"
          role="Dean & Director"
          img={encodeURI('/assets/Dr._Paavan_Pandit.jpg')}
          isMain
          mobile
        />
        <HODCard
          name="Dr. Piyush M Patel"
          role="Registrar (I/C)"
          img={encodeURI('/assets/Dr. Piyush M Patel.jpg')}
          mobile
        />
        
      </div>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:block h-screen w-full relative">
        
        {/* 
           The "Hero" Text 
           z-10: Lower than cards
           Darker Gradient: from-zinc-500 to-zinc-300
        */}
        <div className="hero-text absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1 className="text-[9vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-500 to-zinc-300 tracking-tighter leading-none select-none w-full text-center">
            THE PEOPLE BEHIND
          </h1>
        </div>

        {/* 
           The Cards Container 
           z-30: Higher than text (z-10), ensuring images are ON TOP during scroll
        */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          
          <div className="relative h-full w-full flex items-center justify-center">
            
            {/* Left: M.Sc IT HOD */}
            <div
              className="hod-side-left hod-card-item absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2"
              style={{ marginLeft: '-310px', zIndex: 5 }}
            >
              <HODCard
                name="Dr. Neerja A. Gupta"
                role={<>Vice Chancellor<br/>(Gujarat University)</>}
                img={encodeURI('/assets/Dr. Neerja A. Gupta.jpg')}
              />
            </div>

            {/* Center: Dean & Director */}
            <div
              className="hod-main hod-card-item absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 10 }}
            >
              <HODCard
                name="Dr. Paavan Pandit"
                role="Dean & Director"
                img={encodeURI('/assets/Dr._Paavan_Pandit.jpg')}
                isMain
              />
            </div>

            {/* Right: MBA HOD */}
            <div
              className="hod-side-right hod-card-item absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2"
              style={{ marginLeft: '310px', zIndex: 5 }}
            >
              <HODCard
                name="Dr. Piyush M Patel"
                role="Registrar (I/C)"
                img={encodeURI('/assets/Dr. Piyush M Patel.jpg')}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* -----------------------------------------------
   HOD CARD
   ----------------------------------------------- */
const HODCard = ({
  name,
  role,
  img,
  isMain = false,
  mobile = false,
}: {
  name: string;
  role: ReactNode;
  img: string;
  isMain?: boolean;
  mobile?: boolean;
}) => (
  <div className="hod-card-wrapper hod-card-item group text-center">
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isMain
          ? 'shadow-2xl shadow-amber-100/40 ring-1 ring-amber-200/30'
          : 'shadow-xl shadow-zinc-200/30 ring-1 ring-zinc-200/30'
      }`}
    >
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-amber-300/0 via-amber-300/0 to-amber-300/0 transition-all duration-500 group-hover:from-amber-300/20 group-hover:via-transparent group-hover:to-purple-300/20" />
      
      <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-amber-300/0 transition-all duration-300 group-hover:border-amber-300/40" />
      
      <img
        src={img}
        alt={name}
        className={`hod-card-photo w-full object-cover transition-all duration-700 group-hover:scale-105 aspect-[3/4]`}
        style={mobile ? { width: isMain ? '240px' : '200px' } : undefined}
        referrerPolicy="no-referrer"
      />
      
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </div>
    
    <div className="hod-card-info mt-5 px-3">
      <div className="relative mx-auto mb-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent transition-all duration-300 group-hover:w-12" />
        <div className="absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
      </div>
      
      <p
        className={`relative font-semibold tracking-tight text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900 ${
          isMain ? 'text-base' : 'text-sm'
        }`}
      >
        <span className="relative inline-block">
          {name}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500 group-hover:w-full" />
        </span>
      </p>
      
      <p className="mt-1 text-[9px] font-light uppercase tracking-[0.18em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500">
        {role}
      </p>
    </div>
  </div>
);