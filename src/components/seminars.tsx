"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Building2, Calendar, Sparkles } from "lucide-react";

const SEMINARS = [
  { code: "AI", title: "Generative AI in Enterprise", company: "Google", date: "Feb 2025", color: "from-blue-500 to-indigo-500" },
  { code: "FN", title: "FinTech & Blockchain Revolution", company: "HDFC Bank", date: "Jan 2025", color: "from-emerald-500 to-teal-500" },
  { code: "CY", title: "Cybersecurity in Modern Business", company: "Deloitte", date: "Dec 2024", color: "from-purple-500 to-pink-500" },
  { code: "CL", title: "Cloud Architecture at Scale", company: "AWS", date: "Nov 2024", color: "from-orange-500 to-amber-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const SeminarContent = () => (
  <motion.div 
    className="h-full w-full bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4 sm:px-6 md:px-16 py-6 md:py-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="max-w-6xl w-full h-full flex flex-col justify-center">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-4 md:mb-8 gap-3 md:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Sparkles size={12} className="text-amber-500" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-500">
              Industry Insights
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Seminars & <span className="text-gray-400">Workshops</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 md:mt-3 max-w-md hidden sm:block">
            Learn from industry leaders through hands-on workshops and expert-led seminars
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6 lg:gap-10">
          <div className="text-center lg:text-right">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">40+</p>
            <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Yearly</p>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">120+</p>
            <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Speakers</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 flex-1 min-h-0">
        {/* Featured Card - Takes 3 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-3 relative rounded-2xl md:rounded-3xl overflow-hidden group h-48 sm:h-64 lg:h-auto shadow-lg shadow-gray-200">
          <img
            src="https://i.pinimg.com/736x/06/ee/ec/06eeec82850b17bb073a5b5fad2b1524.jpg"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Upcoming Seminar"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                Featured
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-300 bg-white/20 backdrop-blur-sm px-2 py-0.5 md:py-1 rounded-full">
                <Calendar size={10} />
                March 15
              </span>
            </div>
            <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white max-w-lg">
              AI & Machine Learning — Industry Perspectives
            </h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 md:mt-3 text-[10px] text-gray-300">
              <span className="flex items-center gap-1">
                <Building2 size={10} />
                Google Experts
              </span>
              <span>Main Auditorium · 2:00 PM</span>
            </div>
          </div>
        </motion.div>

        {/* Seminar List - Takes 2 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-2 md:gap-3">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-0 md:mb-1">Recent Sessions</p>
          {SEMINARS.map((seminar, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex items-center gap-2 md:gap-3 bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 rounded-xl md:rounded-2xl p-2.5 md:p-3.5 transition-all cursor-pointer flex-shrink-0 shadow-sm"
              whileHover={{ x: 4 }}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${seminar.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <span className="text-[10px] md:text-xs font-bold text-white">{seminar.code}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-[13px] font-medium text-gray-900 truncate">{seminar.title}</p>
                <div className="flex items-center gap-2 md:gap-3 mt-0.5">
                  <span className="text-[9px] md:text-[10px] text-gray-500">{seminar.company}</span>
                  <span className="text-[9px] md:text-[10px] text-gray-300">·</span>
                  <span className="text-[9px] md:text-[10px] text-gray-500">{seminar.date}</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0 hidden sm:block" />
            </motion.div>
          ))}
          <button className="mt-auto py-2.5 md:py-3 px-3 md:px-4 bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-medium uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-all flex items-center justify-center gap-2">
            View All
            <ArrowRight size={12} />
          </button>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <motion.div variants={itemVariants} className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 grid grid-cols-3 gap-2 md:gap-4">
        {[ 
          { icon: Users, value: "5,000+", label: "Students" },
          { icon: Building2, value: "50+", label: "Companies" },
          { icon: Calendar, value: "Weekly", label: "Sessions" },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-9 md:h-9 bg-gray-100 rounded-lg md:rounded-xl flex items-center justify-center">
              <stat.icon size={14} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm md:text-lg font-semibold text-gray-900">{stat.value}</p>
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.15em] text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);
