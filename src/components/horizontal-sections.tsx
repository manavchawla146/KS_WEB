"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SeminarContent } from "./seminars";
import { EventsContent } from "./events";
import { PlacementReveal } from "./placement";

export const HorizontalSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move horizontal as user scrolls vertically (3 cards = 0% to -200%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <div ref={containerRef} className=" h-[400vh] hidden md:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Progress indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          <ProgressBar progress={scrollYProgress} range={[0, 0.33]} />
          <ProgressBar progress={scrollYProgress} range={[0.33, 0.66]} />
          <ProgressBar progress={scrollYProgress} range={[0.66, 1]} />
        </div>

        {/* Horizontal sliding container */}
        <motion.div
          style={{ x }}
          className="flex h-full"
        >
          {/* Card 1: Seminars */}
          <div className="w-screen h-full shrink-0">
            <SeminarContent />
          </div>

          {/* Card 2: Events */}
          <div className="w-screen h-full shrink-0">
            <EventsContent />
          </div>

          {/* Card 3: Placements */}
          <div className="w-screen h-full shrink-0">
            <PlacementReveal />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Progress bar component
const ProgressBar = ({
  progress,
  range,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) => {
  const width = useTransform(
    progress,
    [range[0], range[1]],
    ["0%", "100%"]
  );

  return (
    <div className="w-12 h-0.5 bg-zinc-700 rounded-full overflow-hidden">
      <motion.div className="h-full bg-white" style={{ width }} />
    </div>
  );
};
