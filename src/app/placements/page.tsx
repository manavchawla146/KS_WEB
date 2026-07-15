"use client";

import React from "react";
import { CurtainFooter } from "@/components/curtain-footer";
import { PlacementReveal } from "@/components/placement";

export default function PlacementsPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111] flex flex-col">
        
        {/* Main Content Section */}
        <main className="flex-grow pt-32 pb-24 relative z-10 flex flex-col min-h-screen">
          <PlacementReveal />
        </main>

        <CurtainFooter />
    </div>
  );
}
