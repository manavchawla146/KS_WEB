"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------------------------
   SCROLL FLOAT - word-aware per-character reveal
   Splits text into words first, then characters
   within each word. Words stay together - no
   random mid-word line breaks.
   ----------------------------------------------- */
export const ScrollFloat = ({
  children,
  className = "",
  stagger = 0.018,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const words = useMemo(() => {
    return children.split(/(\s+)/).map((segment, i) => {
      if (/\s+/.test(segment)) {
        return <span key={i}>{"\u00A0"}</span>;
      }
      // Each word wrapped in inline-block so it won't break
      const chars = segment.split("").map((char, j) => (
        <span className="sf-char" key={`${i}-${j}`}>
          {char}
        </span>
      ));
      return <span className="sf-word" key={i}>{chars}</span>;
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charEls = el.querySelectorAll(".sf-char");

    gsap.set(charEls, { y: 18 });

    const tween = gsap.to(charEls, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [stagger]);

  return (
    <h2 ref={containerRef} className={`sf-container ${className}`}>
      <span className="sf-text">{words}</span>
    </h2>
  );
};
