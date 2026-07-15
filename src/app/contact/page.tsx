import React from "react";
import ContactRedesign from '../../components/ContactRedesign';
import { CurtainFooter } from '@/components/curtain-footer';

export const metadata = {
  title: 'Contact - KS School',
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111]">

        <main className=" pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <ContactRedesign />
        </main>

        <CurtainFooter />
    </div>
  );
}
