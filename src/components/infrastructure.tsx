"use client";

import React, { useState, useEffect, startTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Data Configuration
const ITEMS = [
  {
    id: "lab",
    label: "Innovation",
    title: "Laboratory",
    desc: "Advanced labs designed for innovation, scientific discovery, and hands-on learning with state-of-the-art equipment.",
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200",
  },
  {
    id: "library",
    label: "Resource",
    title: "The Library",
    desc: "A vast collection of knowledge, digital archives, and peaceful study spaces designed for deep focus.",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200",
  },
  {
    id: "auditorium",
    label: "Community",
    title: "Auditorium",
    desc: "A grand architectural space hosting guest lectures, cultural programs, and student gatherings.",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200",
  },
  {
    id: "classroom",
    label: "Academics",
    title: "Smart Classrooms",
    desc: "Modern, tech-enabled classrooms built for interactive learning and collaborative problem solving.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
  },
];

// Sub-components
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Infrastructure = () => {
  const [active, setActive] = useState<any>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const openFromUrl = () => {
      try {
        const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
        const openParam = searchParams ? searchParams.get("open") : null;
        const open = openParam || hash || null;
        if (open) {
          const found = ITEMS.find((it) => it.id === open || it.label.toLowerCase().includes(open.toLowerCase()));
          if (found) startTransition(() => setActive(found));
        }
      } catch (e) {
        // ignore
      }
    };

    openFromUrl();
    const onHashOrPop = () => openFromUrl();
    window.addEventListener("hashchange", onHashOrPop);
    window.addEventListener("popstate", onHashOrPop);
    return () => {
      window.removeEventListener("hashchange", onHashOrPop);
      window.removeEventListener("popstate", onHashOrPop);
    };
  }, [searchParams]);

  // Listen for custom open events dispatched by other components (footer) to open an item immediately
  useEffect(() => {
    const handler = (ev: any) => {
      try {
        const open = ev?.detail?.open;
        if (!open) return;
        const found = ITEMS.find((it) => it.id === open || it.label.toLowerCase().includes(open.toLowerCase()));
        if (found) startTransition(() => setActive(found));
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener("openInfrastructure", handler as EventListener);
    return () => window.removeEventListener("openInfrastructure", handler as EventListener);
  }, []);

  // Listen for a close event to ensure Infrastructure closes when requested
  useEffect(() => {
    const closeHandler = () => {
      try {
        startTransition(() => setActive(null));
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener("closeInfrastructure", closeHandler as EventListener);
    return () => window.removeEventListener("closeInfrastructure", closeHandler as EventListener);
  }, []);

  return (
    <LayoutGroup>
      <section id="infrastructure" className="relative w-full h-[85vh] bg-black overflow-hidden text-white selection:bg-white/20">
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://ksschool.org.in/img/slides/1_Updated.jpg" 
                alt="Campus Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" /> 
        </div>

        {/* HEADER / TOP LEFT */}
        <div className="absolute top-0 left-0 w-full p-5 md:p-10 z-20 flex justify-between items-start pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto"
          >
            <span className="block text-[10px] md:text-xs font-semibold tracking-[0.2em] text-neutral-400 mb-1 uppercase font-['Inter']">
              Our Facilities
            </span>
            <h1 className="text-xl md:text-3xl font-['Playfair_Display'] font-bold">Excellence in Every Corner</h1>
          </motion.div>
          
          {/* Decorative visual element (Desktop only) */}
          <div className="hidden md:block w-24 h-[1px] bg-white/20"></div>
        </div>

        {/* PREVIEW TEXT (Desktop only) */}
        <AnimatePresence>
          {!active && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 z-10 pointer-events-none hidden md:block"
            >
              <p className="text-neutral-400 max-w-sm text-lg leading-relaxed font-['Inter']">
                Discover the spaces where ideas are born and futures are shaped.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================
            BOTTOM LAYOUT CONTAINER
            Mobile: Grid Layout (2x2)
            Desktop: Flex Row (Title Left, List Right)
        ========================================== */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 z-30 pointer-events-none">
          
          <div className="flex flex-col md:flex-row items-end md:items-end justify-between gap-6 w-full">
            
            {/* LEFT SIDE: MAIN TITLE */}
            {/* Mobile: Small Text, Desktop: Huge Text */}
            <div className={`pointer-events-auto transition-opacity duration-500 ${active ? 'opacity-0 pointer-events-none' : 'opacity-100'} w-full md:w-auto`}>
              <h2 className="text-3xl md:text-8xl font-['Playfair_Display'] font-bold tracking-tighter leading-none mix-blend-difference">
                EXPLORE <br/> CAMPUS
              </h2>
            </div>

            {/* RIGHT SIDE / BOTTOM: NAVIGATION AREA */}
            {/* Desktop: Vertical Stack | Mobile: 2x2 Grid */}
            <div className={`pointer-events-auto transition-opacity duration-500 w-full md:w-auto ${active ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              
              {/* --- MOBILE: 2x2 GRID --- */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                {ITEMS.map((item) => (
                  <motion.div
                    id={item.id}
                    key={item.id}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/10 bg-neutral-900"
                    onClick={() => setActive(item)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 left-2">
                       <span className="block text-[9px] uppercase tracking-widest text-white/60 mb-0.5">{item.label}</span>
                       <span className="text-xs font-bold text-white leading-none">{item.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* --- DESKTOP: VERTICAL STACK --- */}
              <div className="hidden md:flex flex-col gap-3 items-end">
                {ITEMS.map((item, index) => (
                  <motion.div
                    id={item.id}
                    key={item.id}
                    layoutId={`card-${item.id}`} 
                    className={`
                      relative flex items-center gap-4 cursor-pointer group
                      transition-all duration-500
                      ${active?.id === item.id ? 'w-[400px]' : 'w-[300px]'}
                    `}
                    onClick={() => setActive(item)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Label Background Pill */}
                    <div className={`h-12 bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-lg flex items-center px-4 overflow-hidden relative z-10 transition-colors group-hover:border-white/30 ${active?.id === item.id ? 'bg-neutral-800' : ''}`}>
                        <span className="text-xs uppercase tracking-[0.15em] font-semibold whitespace-nowrap font-['Inter']">
                          {item.label}
                        </span>
                        <div className={`ml-auto w-6 h-6 rounded-full border border-white/30 flex items-center justify-center transition-all ${active?.id === item.id ? 'bg-white text-black' : ''}`}>
                          <span className="text-[10px]">{index + 1}</span>
                        </div>
                    </div>

                    {/* Thumbnail Image */}
                    <motion.div 
                      className="relative w-20 h-12 rounded-lg overflow-hidden"
                      animate={{ opacity: active ? 0 : 1 }}
                    >
                      <img src={item.img} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* =========================================
            EXPANDED OVERLAY (The Magic)
        ========================================== */}
        <AnimatePresence>
          {active && (
            <motion.div 
              className="absolute inset-0 z-40 flex flex-col md:flex-row bg-white overflow-hidden"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0, 0.15, 1] }}
            >
              {/* IMAGE CONTAINER */}
              <motion.div
                layoutId={`card-${active.id}`}
                className="relative w-full md:w-2/3 h-[50vh] md:h-full bg-neutral-900" // Mobile height reduced slightly
              >
                <img 
                  src={active.img} 
                  className="w-full h-full object-cover"
                  alt={active.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              </motion.div>

              {/* CONTENT CONTAINER */}
              <div className="absolute bottom-24 left-6 right-6 md:static md:w-1/3 md:h-full md:bg-white md:flex md:flex-col md:justify-center md:px-16 md:py-10 pointer-events-none">
                
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  className="pointer-events-auto text-white md:text-black"
                >
                  <span className="inline-block py-1 px-3 rounded-full border border-black/10 bg-neutral-100 text-[10px] uppercase tracking-widest text-neutral-600 mb-6 backdrop-blur-sm font-['Inter']">
                      {active.label}
                  </span>
                  
                  <h3 className="text-3xl md:text-6xl font-['Playfair_Display'] font-bold text-white md:text-black mb-6 leading-tight">
                    {active.title}
                  </h3>
                  
                  <p className="text-white md:text-neutral-600 text-sm md:text-lg leading-relaxed mb-8 font-light border-l-2 border-black/20 pl-6 font-['Inter']">
                    {active.desc}
                  </p>

                  <button
                    onClick={() => setActive(null)}
                    className="group flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-neutral-800 transition-colors font-['Inter'] shadow-lg"
                  >
                    <span>Back to Campus</span>
                    <CloseIcon />
                  </button>
                </motion.div>
              </div>
              
              {/* Close Button (Mobile only) */}
              <button 
                onClick={() => setActive(null)}
                className="md:hidden absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black border border-black/10 z-50 shadow-lg"
              >
                <CloseIcon />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </LayoutGroup>
  );
};

// Wrapped in Suspense because Infrastructure uses useSearchParams(),
// which Next.js requires to be inside a Suspense boundary so the
// route doesn't fail static prerendering.
const InfrastructurePage = () => (
  <Suspense fallback={null}>
    <Infrastructure />
  </Suspense>
);

export default InfrastructurePage;

/*
      />*/