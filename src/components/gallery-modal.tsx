"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "./gallery-data";

export default function GalleryModal({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Each category carries its own images array — this is what makes the
  // carousel dynamic. Falls back to the single cover image if a category
  // hasn't been given a full set yet.
  const images = item.images?.length ? item.images : [item.img];

  useEffect(() => {
    if (isOpen) {
      setIndex(0);
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, item]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, images.length, onClose]);

  // Auto-advance, paused on hover
  useEffect(() => {
    if (!isOpen || hovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen, hovered, images.length]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:p-8"
        onMouseDown={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      >
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          style={{ height: "82vh", maxHeight: "82vh" }}
        >
          <div className="relative flex h-full flex-col md:flex-row">
            {/* Left: Carousel */}
            <div
              className="relative w-full md:w-2/3 bg-zinc-900"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="relative h-64 w-full overflow-hidden md:h-full">
                {images.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt={`${item.title} - photo ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      i === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {images.length > 1 && (
                  <>
                    <button
                      aria-label="Previous photo"
                      onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      aria-label="Next photo"
                      onClick={() => setIndex((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 bg-zinc-900 py-3">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to photo ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        i === index ? "scale-110 bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/3 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-light uppercase tracking-wider text-zinc-400">
                    {item.date}
                  </p>
                  {item.tag && (
                    <span className="mt-2 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                      {item.tag}
                    </span>
                  )}
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full bg-zinc-100 p-2 shadow hover:bg-zinc-200"
                >
                  <X size={18} />
                </button>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-zinc-900">{item.title}</h3>

              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
              )}

              {item.highlights?.length ? (
                <div className="mt-6">
                  <h4 className="mb-2 text-sm font-semibold text-zinc-800">Key Highlights</h4>
                  <ul className="space-y-2 text-sm text-zinc-600">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-zinc-400">•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-auto pt-6 text-xs text-zinc-400">
                {images.length} photo{images.length !== 1 ? "s" : ""} in this set
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}