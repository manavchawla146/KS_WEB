"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   CURTAIN LOADER
   Two dark panels (top + bottom) cover the screen.
   Logo + text animate in on the curtain. When
   ready, the panels split apart vertically like
   a theater curtain opening, revealing the site.
   ────────────────────────────────────────────── */

const CURTAIN_OPEN_MS = 1600;
const LOADER_TOTAL_MS = 2400;

export const CinematicLoader = () => {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), CURTAIN_OPEN_MS);
    const t2 = setTimeout(() => setPhase("done"), LOADER_TOTAL_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[90] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
        >
          {/* ── Top curtain panel ── */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[#0a0a0a]"
            style={{ height: "52%" }}
            animate={
              phase === "exit"
                ? { y: "-105%" }
                : { y: 0 }
            }
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Subtle grain */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </motion.div>

          {/* ── Bottom curtain panel ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]"
            style={{ height: "52%" }}
            animate={
              phase === "exit"
                ? { y: "105%" }
                : { y: 0 }
            }
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Subtle grain */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </motion.div>

          {/* ── Center content (sits in the gap between panels) ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[91]">
            <motion.div
              className="flex flex-col items-center"
              animate={
                phase === "exit"
                  ? { opacity: 0, scale: 0.9 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src="/ks-logo.png"
                alt="KS School"
                className="h-16 w-auto md:h-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="mt-5 text-center">
                <motion.p
                  className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500 md:text-[11px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  KS School of
                </motion.p>
                <motion.p
                  className="mt-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-300 md:text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Business Management
                </motion.p>
                <motion.p
                  className="text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-300 md:text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  &amp; Information Technology
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* ── Thin center line accent ── */}
          <motion.div
            className="absolute top-1/2 left-1/2 h-[1px] -translate-y-1/2 -translate-x-1/2 z-[92] pointer-events-none"
            initial={{ width: 0, opacity: 0 }}
            animate={
              phase === "exit"
                ? { width: 0, opacity: 0 }
                : { width: 60, opacity: 1 }
            }
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
