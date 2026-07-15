"use client";

import React, { useEffect, useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Announcement {
  _id: string;
  title: string;
  description?: string;
  category: string;
  url?: string;
  isNewAnnouncement: boolean;
  createdAt: string;
}

const AnnouncementCard = ({ item }: { item: Announcement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const serverBaseUrl = process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL?.replace(/\/$/, '') || '';
  const fileUrl = item.url ? 
    (item.url.startsWith('http') ? item.url : `${serverBaseUrl}/${item.url.replace(/^\//, '')}`) 
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group bg-white p-6 border border-black/10 rounded-2xl hover:border-black/20 hover:shadow-md transition-all duration-300 flex flex-col relative"
    >
      {item.isNewAnnouncement && (
        <div className="absolute top-4 right-4 bg-[#e31e24] text-white text-[9px] font-bold uppercase px-3 py-0.5 rounded-full tracking-wider">
          NEW
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-black/40">{formatDate(item.createdAt)}</span>
            <span className="text-[#e31e24] font-bold uppercase text-xs tracking-widest">{item.category}</span>
          </div>
          <h4 className="text-lg font-semibold leading-tight pr-8">{item.title}</h4>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && item.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-600 leading-relaxed border-t border-black/5 pt-4 mt-2">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
        {item.description && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium flex items-center gap-1 text-black/60 hover:text-black"
          >
            {isExpanded ? "Hide" : "Read More"}
            <ChevronDown size={14} className={isExpanded ? "rotate-180" : ""} />
          </button>
        )}

        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#e31e24] hover:text-black text-sm font-medium"
          >
            View Document <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const AnnouncementsSection = () => {
  const [generalItems, setGeneralItems] = useState<Announcement[]>([]);
  const [mbaItems, setMbaItems] = useState<Announcement[]>([]);
  const [mscItems, setMscItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [gen, mba, msc] = await Promise.all([
          fetch('/api/announcements/all/General'),
          fetch('/api/announcements/all/MBA'),
          fetch('/api/announcements/all/MSCIT')
        ]);

        const genData = await gen.json();
        const mbaData = await mba.json();
        const mscData = await msc.json();

        setGeneralItems(Array.isArray(genData) ? genData : genData.announcement || genData.announcements || genData.data || []);
        setMbaItems(Array.isArray(mbaData) ? mbaData : mbaData.announcement || mbaData.announcements || mbaData.data || []);
        setMscItems(Array.isArray(mscData) ? mscData : mscData.announcement || mscData.announcements || mscData.data || []);
      } catch (err) {
        console.error("Announcements fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const sortItems = (items: Announcement[]) => 
    [...items].sort((a, b) => 
      (b.isNewAnnouncement ? 1 : 0) - (a.isNewAnnouncement ? 1 : 0) || 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const renderColumn = (title: string, items: Announcement[], emptyText: string) => (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/10">
        <h3 className="font-semibold text-xl">{title}</h3>
        <span className="text-xs text-black/40 font-mono">{items.length} updates</span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2" style={{ maxHeight: '620px' }}>
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-40 bg-black/5 rounded-2xl animate-pulse" />
          ))
        ) : items.length > 0 ? (
          sortItems(items).map(item => <AnnouncementCard key={item._id} item={item} />)
        ) : (
          <div className="h-40 flex items-center justify-center border border-dashed border-black/10 rounded-2xl">
            <p className="text-black/30 text-sm">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-[#FDFDFD] py-24 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Improved Heading */}
      {/* Improved Heading - Less Gap */}
<div className="mb-16">
  <div className="uppercase tracking-[0.4em] text-xs text-[#e31e24] font-bold mb-3">Intelligence Hub</div>
  <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">Latest<br />Notifications</h2>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {renderColumn("General Updates", generalItems, "No general announcements")}
          {renderColumn("M.Sc. (CA & IT)", mscItems, "No M.Sc announcements")}
          {renderColumn("MBA", mbaItems, "No MBA announcements")}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #00000030; 
          border-radius: 20px; 
        }
      `}</style>
    </section>
  );
};

export default AnnouncementsSection;