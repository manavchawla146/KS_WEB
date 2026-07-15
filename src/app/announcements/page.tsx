// src/app/announcements/page.tsx
import React from "react";
import { CurtainFooter } from '@/components/curtain-footer';
import AnnouncementsSection from '@/components/AnnouncementsSection';

export const metadata = {
  title: 'Announcements - KS School',
};

export default function AnnouncementsPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <main className="pt-0 pb-24 px-6 max-w-7xl mx-auto relative z-10">   {/* pt-20 kiya (kam kiya) */}
        <AnnouncementsSection />
      </main>

      <CurtainFooter />
    </div>
  );
}