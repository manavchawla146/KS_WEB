"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Music, Trophy, Users } from "lucide-react";

interface EventTile {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  color: string;
  date?: string;
}

const DEFAULT_EVENTS: EventTile[] = [
  {
    title: "Technomantra",
    subtitle: "Annual Tech Fest",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    tag: "Flagship",
    color: "bg-rose-500",
    date: "Aug 2024",
  },
  {
    title: "M.Sc. (CA & IT)",
    subtitle: "Athletics Championship",
    image: "https://i.pinimg.com/736x/bf/20/91/bf20914d328a1beaee5eab4dee75d334.jpg",
    tag: "Sports",
    color: "bg-emerald-500",
  },
  {
    title: "Integrated MBA",
    subtitle: "Annual Tech Fest",
    image: "https://i.pinimg.com/736x/52/09/ea/5209ead76e6cdccdf61a48397fd7b565.jpg",
    tag: "Tech",
    color: "bg-blue-500",
  },
  {
    title: "Advent",
    subtitle: "Annual Management Fest",
    image: "https://i.pinimg.com/736x/a9/fc/1f/a9fc1fa3a5aaa2d11cf9d681d1cc9554.jpg",
    tag: "Community",
    color: "bg-amber-500",
    date: "Aug 2024",
  },
];

const AVAILABLE_COLORS = [
  "bg-rose-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-fuchsia-500",
];

const getRemoteCoverImage = (activity: any): string => {
  const baseUrl = process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL?.replace(/\/$/, '') || '';
  const rawImage = activity.coverImage || activity.image || activity.banner || activity.photo || activity.imageUrl || activity.url || "";

  if (!rawImage) {
    return "";
  }

  return rawImage.startsWith("http")
    ? rawImage
    : `${baseUrl}/${rawImage.replace(/^\/+/, "")}`;
};

const padToFour = (tiles: EventTile[]) => {
  const padded = [...tiles];
  while (padded.length < 4) {
    padded.push(DEFAULT_EVENTS[padded.length]);
  }
  return padded.slice(0, 4);
};

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

export const EventsContent = () => {
  const [tiles, setTiles] = useState<EventTile[]>(DEFAULT_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/activities');
        if (!res.ok) {
          throw new Error(`Activities request failed with ${res.status}`);
        }

        const data = await res.json();
        const rawActivities = Array.isArray(data.activities)
          ? data.activities
          : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.activity)
          ? data.activity
          : Array.isArray(data)
          ? data
          : [];

        if (rawActivities.length > 0) {
          const defaultHeroImage = DEFAULT_EVENTS[0].image;
          const firstImage = getRemoteCoverImage(rawActivities[0]) || defaultHeroImage;
          setTiles((current) => {
            const updated = [...current];
            updated[0] = { ...updated[0], image: firstImage };
            return updated;
          });
        }
      } catch (error) {
        console.error("Failed to load activities", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const displayTiles = useMemo(() => padToFour(tiles), [tiles]);
  const [hero, smallA, smallB, wide] = displayTiles;

  return (
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
              <Sparkles size={14} className="text-rose-500" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-500">
                Campus Life
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Events That <span className="text-gray-400">Define Us</span>
            </h2>
          </div>
          <div className="flex gap-6 lg:gap-10">
            <div className="text-center lg:text-right">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">50+</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Events/Year</p>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">15+</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">Active Clubs</p>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid - More Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 min-h-0">
          <motion.div
            variants={itemVariants}
            className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={hero.image}
              alt={hero.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`${hero.color} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg`}>
                {hero.tag}
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{hero.title}</h3>
              <p className="text-sm text-gray-200 mt-1">{hero.subtitle}</p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={smallA.image}
              alt={smallA.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`${smallA.color} text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>
                {smallA.tag}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{smallA.title}</h3>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={smallB.image}
              alt={smallB.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`${smallB.color} text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>
                {smallB.tag}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{smallB.title}</h3>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-gray-200"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={wide.image}
              alt={wide.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`${wide.color} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg`}>
                {wide.tag}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{wide.title}</h3>
              <p className="text-sm text-gray-200 mt-0.5">{wide.subtitle}</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Sparkles, value: "8", label: "Cultural", color: "text-rose-500" },
            { icon: Music, value: "12", label: "Music", color: "text-blue-500" },
            { icon: Trophy, value: "6", label: "Competitions", color: "text-emerald-500" },
            { icon: Users, value: "2,000+", label: "Participants", color: "text-amber-500" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <stat.icon size={14} className={stat.color} />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
