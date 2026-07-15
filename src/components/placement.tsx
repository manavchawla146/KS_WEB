"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Building2, Globe, Award, ArrowRight } from "lucide-react";

const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Deloitte", "Infosys", "TCS",
  "HDFC Bank", "Accenture", "Wipro", "Cognizant", "Capgemini", "IBM",
];

const STATS = [
  { value: "100%", label: "Placement Rate", icon: Award },
  { value: "42 LPA", label: "Highest Package", icon: TrendingUp },
  { value: "200+", label: "Recruiters", icon: Building2 },
  { value: "15+", label: "International", icon: Globe },
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
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const PlacementReveal = () => (
  <motion.div 
    className="h-full w-full bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4 sm:px-6 md:px-16 py-6 md:py-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="max-w-6xl w-full h-full flex flex-col justify-center">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award size={14} className="text-amber-500" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-500">
              Career Success
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Placements & <span className="text-gray-400">Recruiters</span>
          </h2>
        </div>
        <div className="flex gap-6 lg:gap-10">
          <div className="text-center lg:text-right">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">1,200+</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Offers</p>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">8.5 LPA</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Average</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - Compact */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 rounded-2xl p-4 text-center group transition-all cursor-pointer shadow-sm"
            whileHover={{ y: -2 }}
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <stat.icon size={18} className="text-gray-600" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 flex-1 min-h-0">
        {/* Hero Image - Takes 3 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-3 relative rounded-3xl overflow-hidden group shadow-lg shadow-gray-200">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Placement Drive"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
            <div className="flex items-baseline gap-3 mb-3">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">100%</h3>
              <span className="text-sm sm:text-base text-gray-300">Placed</span>
            </div>
            <button className="w-fit flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              View Report
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Companies List - Takes 2 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col bg-white rounded-3xl p-5 shadow-lg shadow-gray-200 border border-gray-100">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-3">Top Recruiters</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {COMPANIES.map((company, i) => (
              <motion.span
                key={i}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-[11px] font-medium rounded-lg transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                {company}
              </motion.span>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-gray-500">Companies</span>
              <span className="text-sm font-semibold text-gray-900">50+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-gray-500">PPOs</span>
              <span className="text-sm font-semibold text-gray-900">180+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-gray-500">Internships</span>
              <span className="text-sm font-semibold text-gray-900">75%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);
