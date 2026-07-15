// src/components/ui/Marquee.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIME_PER_LOOP = 29;
const SCROLL_POWER = 0.003;
const BRAKE_DURATION = 0.8;

interface MarqueeProps {
  logos: string[];
  className?: string;
}

export default function Marquee({ logos, className = "" }: MarqueeProps) {
  const marqueeRowRef = useRef<HTMLDivElement>(null);
  const firstLogoRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const row = marqueeRowRef.current;
  const firstLogo = firstLogoRef.current;
  if (!row || !firstLogo) return;

  let marqueeTl: gsap.core.Timeline | null = null;
  let trigger: ScrollTrigger | null = null;

  function populateMarquee() {
    const content = firstLogo.outerHTML;
    let currentWidth = firstLogo.offsetWidth;
    const targetWidth = window.innerWidth * 3;

    while (currentWidth < targetWidth) {
      row.insertAdjacentHTML("beforeend", content);
      currentWidth += firstLogo.offsetWidth;
    }
  }
  populateMarquee();

  function roll(targets: any, vars: any, reverse: boolean) {
    vars = vars || { ease: "none" };

    const tl = gsap.timeline({ repeat: -1 });
    const elements = gsap.utils.toArray(targets);
    const clones = elements.map((el: any) => {
      const clone = el.cloneNode(true);
      el.parentNode.appendChild(clone);
      return clone;
    });

    const positionClones = () => {
      elements.forEach((el: any, i: number) => {
        gsap.set(clones[i], {
          position: "absolute",
          top: el.offsetTop,
          left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
        });
      });
    };

    positionClones();

    elements.forEach((el: any, i: number) => {
      tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0);
    });

    return tl;
  }

  marqueeTl = roll(row, { duration: TIME_PER_LOOP }, true);

  let direction = 1;
  let scrollTimeout: NodeJS.Timeout;

  trigger = ScrollTrigger.create({
    onUpdate(self) {
      const velocity = self.getVelocity();
      if (Math.abs(velocity) > 8) {
        direction = velocity > 0 ? 1 : -1;
      }

      const velocityFactor = 1 + Math.abs(velocity) * SCROLL_POWER;
      gsap.to(marqueeTl!, {
        timeScale: velocityFactor * direction,
        duration: 0.1,
        overwrite: true
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(marqueeTl!, {
          timeScale: direction,
          duration: BRAKE_DURATION,
          overwrite: true
        });
      }, 100);
    }
  });

  return () => {
    clearTimeout(scrollTimeout);
    if (trigger) trigger.kill();
    if (marqueeTl) marqueeTl.kill();
    ScrollTrigger.getAll().forEach(t => t.kill()); // Strong cleanup
    if (row) row.innerHTML = "";
  };
}, [logos]);

  return (
    <div className={`relative overflow-hidden h-20 ${className}`}>
      <div
        className="flex gap-8 items-center h-20 absolute top-0 left-0"
        ref={marqueeRowRef}
      >
        {logos.map((src, i) => (
          <div
            key={i}
            className="w-40 h-20 flex items-center justify-center shrink-0"
            ref={i === 0 ? firstLogoRef : null}
          >
            <img src={src} alt={`logo-${i}`} className="max-h-12 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}