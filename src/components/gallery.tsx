"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import GalleryModal from "./gallery-modal";
import { GALLERY_ITEMS, type GalleryItem } from "./gallery-data";

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------------------------
   GALLERY - CAMPUS LIFE
   Desktop: Images start at screen corners/edges
   with center event text. On scroll they
   smoothly assemble into a bento grid.
   Mobile: Simple bento grid with staggered fade-in.
   Hover shows tooltip with event info + CTA.
   ----------------------------------------------- */

export const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(".gal-item", { y: 50, opacity: 0, scale: 0.92 });
        gsap.to(".gal-item", {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
        return;
      }

      // Desktop: images start at corners, center text fades out, bento forms
      gsap.set(".gal-item", {
        opacity: 0,
        scale: 0.6,
        x: "48%",
        y: "48%",
        rotation: 15,
      });

      gsap.set(".gal-item:nth-child(1)", { x: "-48%", y: "-48%", rotation: -12, scale: 0.6 });
      gsap.set(".gal-item:nth-child(2)", { x: "48%", y: "-48%", rotation: 8, scale: 0.65 });
      gsap.set(".gal-item:nth-child(3)", { x: "-48%", y: "48%", rotation: 6, scale: 0.6 });
      gsap.set(".gal-item:nth-child(4)", { x: "48%", y: "48%", rotation: -8, scale: 0.65 });
      gsap.set(".gal-item:nth-child(5)", { x: "-48%", y: "0%", rotation: -4, scale: 0.55 });
      gsap.set(".gal-item:nth-child(6)", { x: "48%", y: "0%", rotation: 4, scale: 0.55 });

      gsap.set(".gal-center-text", { opacity: 1, scale: 1 });
      gsap.set(".gal-bento-grid", { opacity: 0, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Phase 1: Center text fades out
      tl.to(".gal-center-text", {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.in",
      });

      // Phase 2: Images fly to their bento positions (staggered)
      tl.to(
        ".gal-item",
        {
          x: "0%",
          y: "0%",
          rotation: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // Phase 3: Bento grid fades in (it's behind the items)
      tl.to(
        ".gal-bento-grid",
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 px-6 md:py-0">
      {/* Mobile heading */}
      <motion.div
        className="mb-12 md:hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-xs font-light uppercase tracking-[0.5em] text-zinc-400">Captured</p>
        <h2 className="editorial-title text-ink">Campus Life.</h2>
      </motion.div>

      {/* Mobile: Simple bento grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            onClick={() => setOpenIndex(i)}
            className={`gal-item rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-[4/3]"}`}
          >
            <GalleryCard item={item} onOpen={() => setOpenIndex(i)} />
          </div>
        ))}
      </div>

      {/* Desktop: Pinned corner-to-bento animation */}
      <div className="hidden md:block" style={{ height: "300vh" }}>
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
          {/* Center text */}
          <div className="gal-center-text absolute flex flex-col items-center gap-6 text-center z-10 pointer-events-none">
            <p className="text-xs font-light uppercase tracking-[0.5em] text-zinc-400">Captured</p>
            <h2 className="editorial-title text-ink">Campus Life.</h2>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Every event tells a story. Scroll to explore the moments that make KS School
              unforgettable.
            </p>
          </div>

          {/* Bento grid (visual structure behind items) */}
          <div className="gal-bento-grid absolute inset-x-6 top-1/2 -translate-y-1/2 h-[500px] max-w-5xl mx-auto w-full pointer-events-none opacity-0">
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-3">
              <div className="gal-bento-1 col-span-2 row-span-2 rounded-2xl bg-zinc-100" />
              <div className="gal-bento-2 col-span-1 row-span-1 rounded-2xl bg-zinc-100" />
              <div className="gal-bento-3 col-span-1 row-span-1 rounded-2xl bg-zinc-100" />
              <div className="gal-bento-4 col-span-1 row-span-1 rounded-2xl bg-zinc-100" />
              <div className="gal-bento-5 col-span-1 row-span-1 rounded-2xl bg-zinc-100" />
              <div className="gal-bento-6 col-span-1 row-span-1 rounded-2xl bg-zinc-100" />
            </div>
          </div>

          {/* Actual gallery items - start at corners, animate to bento */}
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[500px] max-w-5xl mx-auto w-full">
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-3">
              <div
                className="gal-item gal-bento-1 col-span-2 row-span-2 rounded-2xl overflow-hidden"
                onClick={() => setOpenIndex(0)}
              >
                <GalleryCard item={GALLERY_ITEMS[0]} onOpen={() => setOpenIndex(0)} />
              </div>
              <div className="gal-item gal-bento-2 col-span-1 row-span-1 rounded-2xl overflow-hidden">
                <GalleryCard item={GALLERY_ITEMS[1]} onOpen={() => setOpenIndex(1)} />
              </div>
              <div className="gal-item gal-bento-3 col-span-1 row-span-1 rounded-2xl overflow-hidden">
                <GalleryCard item={GALLERY_ITEMS[2]} onOpen={() => setOpenIndex(2)} />
              </div>
              <div className="gal-item gal-bento-4 col-span-1 row-span-1 rounded-2xl overflow-hidden">
                <GalleryCard item={GALLERY_ITEMS[3]} onOpen={() => setOpenIndex(3)} />
              </div>
              <div className="gal-item gal-bento-5 col-span-1 row-span-1 rounded-2xl overflow-hidden">
                <GalleryCard item={GALLERY_ITEMS[4]} onOpen={() => setOpenIndex(4)} />
              </div>
              <div className="gal-item gal-bento-6 col-span-1 row-span-1 rounded-2xl overflow-hidden">
                <GalleryCard item={GALLERY_ITEMS[5]} onOpen={() => setOpenIndex(5)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery modal (route-less overlay) — receives the whole item,
          so its own `images` array drives the carousel */}
      {openIndex !== null && (
        <GalleryModal
          isOpen={openIndex !== null}
          onClose={() => setOpenIndex(null)}
          item={GALLERY_ITEMS[openIndex]}
        />
      )}
    </section>
  );
};

/* Gallery Card with hover tooltip */
const GalleryCard = ({ item, onOpen }: { item: GalleryItem; onOpen?: () => void }) => {
  return (
    <div className="gal-card group relative h-full w-full cursor-pointer">
      <img
        src={item.img}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      {/* Tag pill */}
      {item.tag && (
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
            {item.tag}
          </span>
        </div>
      )}

      {/* Hover tooltip overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="px-4">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/60">
            {item.date}
          </p>
          <p className="text-sm font-semibold text-white mt-0.5 leading-tight">{item.title}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
            className="mt-3 flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            View Photos
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};