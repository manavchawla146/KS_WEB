"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTION_HEIGHT = 2000;

export const Hero = () => {
  return (
    <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-white/0 to-white" />
    </div>
  );
};

/* ----------------------------------------------- CENTER VIDEO ----------------------------------------------- */
const CenterImage = () => {
  const { scrollY } = useScroll();
  
  const scale = useTransform(scrollY, [0, 1200], [1.4, 1]);
  const videoOpacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 400], [1, 0]);

  // Stronger effect
  const brightness = useTransform(scrollY, [400, 1100], [100, 65]);   // Video dark ho jayegi
  const videoScale = useTransform(scrollY, [400, 1100], [1, 0.92]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
      <motion.video
        src="/clg.mp4"
        className="h-full w-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
        style={{ 
          scale: videoScale,
          opacity: videoOpacity,
          filter: `brightness(${brightness}%)` 
        }}
      />

      {/* Strong Overlay when images appear */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none"
        style={{ 
          opacity: useTransform(scrollY, [300, 1000], [0.2, 0.85]) 
        }}
      />

      {/* Extra blue tint for distinction */}
      <motion.div 
        className="absolute inset-0 bg-blue-950/30 pointer-events-none mix-blend-multiply"
        style={{ 
          opacity: useTransform(scrollY, [500, 1100], [0, 0.4]) 
        }}
      />
    </div>
  );
};

/* ----------------------------------------------- PARALLAX IMAGES ----------------------------------------------- */
const ParallaxImages = () => {
  return (
    <>
      {/* === DESKTOP VIEW - 4 Images Overlapping (Original Style) === */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-5xl px-4 pt-[200px]">
          <ParallaxImg 
            src="https://i.pinimg.com/736x/3a/7d/08/3a7d084a604f586932598e6d7251f255.jpg" 
            alt="Students studying" 
            start={-200} 
            end={200} 
            className="w-1/3" 
          />
          <ParallaxImg 
            src="https://i.pinimg.com/736x/7f/d4/1f/7fd41fc5bf889c5ea953649ade847942.jpg" 
            alt="Modern campus" 
            start={200} 
            end={-250} 
            className="mx-auto w-2/3" 
          />
          <ParallaxImg 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2670&auto=format&fit=crop" 
            alt="Graduation ceremony" 
            start={-200} 
            end={200} 
            className="ml-auto w-1/3" 
          />
          <ParallaxImg 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" 
            alt="Classroom session" 
            start={0} 
            end={-500} 
            className="ml-24 w-5/12" 
          />
        </div>
      </div>

      {/* === MOBILE VIEW - Stacked Vertical Images === */}
      <div className="md:hidden">
        <MobileStackedImages />
      </div>
    </>
  );
};

/* ===================== MOBILE STACKED ===================== */
const MobileStackedImages = () => {
  return (
    <div className="px-4 pt-12 pb-20 space-y-20">
      <MobileStackedImage
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn31BkC9SOnTNgYFS1WqCV8m_qXQpUiW9_W0IsxWNqjw&s=10" 
        alt="Students in class"
      />
      <MobileStackedImage
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT51Nwg4nQDnjy8nG7urxVSPVln_-18NuHW1SNOi1q2Q&s=10"
        alt="Campus life"
      />
      <MobileStackedImage
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&fit=crop"
        alt="Graduation moment"
      />
      <MobileStackedImage
        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&fit=crop"
        alt="Classroom"
      />
    </div>
  );
};

const MobileStackedImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1]);

return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className="w-full">
      {/* Force portrait feel */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-3xl shadow-2xl object-cover aspect-[4/5]"
        loading="lazy"
      />
    </motion.div>
  );
};


/* ===================== ParallaxImg Component (Desktop) ===================== */
interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  return (
    <motion.div className={className} ref={ref} style={{ y, scale, opacity }}>
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    </motion.div>
  );
};