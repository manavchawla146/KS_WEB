"use client";

import { ReactLenis } from "lenis/dist/lenis-react";
import { Hero } from "./hero";
import { SchoolTitle } from "./school-title";
import { Programs } from "./programs";
import { HODs } from "./hods";
import { Gallery } from "./gallery";
import  Infrastructure  from "./infrastructure";
import { HorizontalSections } from "./horizontal-sections";
import { CurtainFooter } from "./curtain-footer";
import { SeminarContent } from "./seminars";
import { EventsContent } from "./events";
import { PlacementReveal } from "./placement";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-white">
<ReactLenis 
  root 
  options={{ 
    lerp: 0.05,           // pehle 0.05 tha → ab thoda slow
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5
  }}
>        <Hero />
        <SchoolTitle />
        <Programs />
        <HODs />
        <Gallery />
        <Infrastructure />
        {/* Desktop: Horizontal scroll */}
        <HorizontalSections />
        {/* Mobile: Vertical stack */}
        <div className="md:hidden">
          <section className="min-h-screen py-16"><SeminarContent /></section>
          <section className="min-h-screen py-16"><EventsContent /></section>
          <section className="min-h-screen py-16"><PlacementReveal /></section>
        </div>
        <CurtainFooter />
      </ReactLenis>
    </div>
  );
};
