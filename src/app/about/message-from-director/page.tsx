"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { CurtainFooter } from "@/components/curtain-footer";
import { motion } from "framer-motion";

export default function DirectorMessagePage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);
  const image = encodeURI('/assets/Dr._Paavan_Pandit.jpg');

  return (
    <div className="bg-white min-h-screen text-[#111111]">
      <ReactLenis root options={{ lerp: 0.05 }}>

        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Message</p>
            <h1 className="editorial-title text-[#111111] mb-6">Message from Director's Desk</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-4 order-1">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt="Dr. Paavan Pandit"
                  className="w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/seed/director/1200/1200";
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-8 order-2">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-[#e31e24] font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Greetings!!!</p>

                <div className="prose prose-lg text-zinc-700 leading-relaxed space-y-6">
                  <p>
                    Welcome to K S School of Business Management and Information Technology, and I am thankful to you for showing interest in us. Established in 1993, KSSBM&IT is a premier campus setup at Gujarat University.
                  </p>

                  <p>
                    As a pioneer institute in Gujarat in the field of Integrated programs in Management and Computer Technology, its fragrance is spread all over the world due to its quality of education, placement, and personality development of the youth.
                  </p>

                  <p>
                    We are living in a fast-changing world, especially in recent situations, many changes have occurred in the teaching-learning process as well in the corporate sector. New opportunities have been immense in some sectors, while opportunities have been diminished in sectors that were desired before. We must identify new opportunities and get trained in accordance. With this in mind, we continue to train students with the new trends and technologies.
                  </p>

                  <p>
                    We also believe in corporate interaction, including corporate projects undertaken by our students under the continuous guidance of our faculty. These strategies / priorities are the core of our efforts, which has resulted in being one of the premier institutions.
                  </p>

                  <p>
                    Once again, we warmly welcome you to explore the great and exciting opportunities in the Integrated MBA and MSc(CA&IT) programs that offer developing and growing your leadership and technical skills, abilities and talents that will enable you to achieve your life's purpose.
                  </p>
                </div>

                <div className="mt-8 flex justify-end text-right">
                  <div>
                    <p className="font-semibold">Thank You</p>
                    <p className="mt-4 font-bold">- Dr. Paavan Pandit</p>
                    <p>Director,</p>
                    <p>K. S. School of Business Management and Information Technology.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <CurtainFooter />
      </ReactLenis>
    </div>
  );
}
