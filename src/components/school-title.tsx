"use client";

import { motion } from "framer-motion";
import { ScrollFloat } from "./scroll-float";

export const SchoolTitle = () => {
  return (
    <section id="intro-reveal" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6">
        <motion.p
          className="mb-6 text-center text-sm md:text-base font-medium uppercase tracking-[0.4em] text-zinc-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Welcome to
        </motion.p>

        <ScrollFloat
          className="mb-3 text-center font-black uppercase tracking-[-0.02em] text-zinc-900 leading-[1.05] text-5xl md:text-6xl lg:text-7xl"
          stagger={0.015}
        >
          KS School of Business
        </ScrollFloat>

        <ScrollFloat
          className="mb-3 text-center font-black uppercase tracking-[-0.02em] text-zinc-900 leading-[1.05] text-5xl md:text-6xl lg:text-7xl"
          stagger={0.015}
        >
          Management &amp;
        </ScrollFloat>

        <ScrollFloat
          className="text-center font-black uppercase tracking-[-0.02em] text-zinc-900 leading-[1.05] text-5xl md:text-6xl lg:text-7xl"
          stagger={0.015}
        >
          Information Technology
        </ScrollFloat>

        <motion.div
          className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mx-auto mt-8 max-w-2xl px-6 text-center text-lg md:text-xl font-medium leading-relaxed text-zinc-600"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Empowering minds through business excellence and cutting-edge technology education.
        </motion.p>
      </div>
    </section>
  );
};