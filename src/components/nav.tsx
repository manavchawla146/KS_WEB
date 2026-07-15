"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Faculty", href: "/faculty" },
  { label: "Programs", href: "/programs" },
  { label: "Announcements", href: "/announcements" },
  { label: "Placements", href: "/placements" },
  { label: "Papers", href: "/papers" },
  { label: "Contact", href: "/contact" },
];

const ABOUT_LINKS = [{ label: "Message from Director's Desk", href: "/about/message-from-director" }];
const PROGRAMS_LINKS = [{ label: "M.Sc.(CA & IT)", href: "/programs/m-sc-ca-it" }, { label: "Integrated MBA", href: "/programs/integrated-mba" }];
const PLACEMENTS_LINKS = [{ label: "M.Sc.(CA & IT) Placements", href: "/placements/m-sc-ca-it" }, { label: "Integrated MBA Placements", href: "/placements/mba" }];
const FACULTY_LINKS = [{ label: "M.Sc.(CA & IT) Faculty", href: "/faculty/msc-it" }, { label: "Integrated MBA Faculty", href: "/faculty/mba" }];

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/ks-logo.png" alt="KS School" className="h-10 w-auto" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              if (link.label === "Home" || link.label === "Announcements" || link.label === "Papers" || link.label === "Contact") {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-colors duration-300 hover:text-zinc-600 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-zinc-900 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                );
              }

              if (link.label === "About") {
                return <DesktopDropdown key="about" label="About" links={ABOUT_LINKS} extraLink={{ label: "About K.S. School", href: "/about" }} />;
              }

              if (link.label === "Faculty") {
                return <DesktopDropdown key="faculty" label="Faculty" links={FACULTY_LINKS} />;
              }

              if (link.label === "Programs") {
                return <DesktopDropdown key="programs" label="Programs" links={PROGRAMS_LINKS} />;
              }

              if (link.label === "Placements") {
                return <DesktopDropdown key="placements" label="Placements" links={PLACEMENTS_LINKS} />;
              }

              return null;
            })}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-zinc-900 md:hidden" aria-label="Toggle menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

const DesktopDropdown = ({ label, links, extraLink }: any) => (
  <div className="relative group py-2">
    <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-colors duration-300 hover:text-zinc-600 cursor-pointer">
      {label} <FiChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
    </button>
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-zinc-200 rounded-md shadow-lg p-2 mt-2 transition-all duration-300 origin-top scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible z-50">
      {[...links, ...(extraLink ? [extraLink] : [])].map((sublink: any) => (
        <Link key={sublink.label} href={sublink.href} className="block p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 rounded-sm transition-all">
          {sublink.label}
        </Link>
      ))}
    </div>
  </div>
);

const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white/95 backdrop-blur-lg md:hidden py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {NAV_LINKS.map((link) => {
          if (link.label === "Programs" || link.label === "Placements") {
            return (
              <span key={link.label} className="text-lg font-bold uppercase tracking-[0.3em] text-zinc-900">
                {link.label}
              </span>
            );
          }

          return (
            <Link key={link.label} href={link.href} onClick={onClose} className="text-lg font-bold uppercase tracking-[0.3em] text-zinc-900 hover:text-zinc-600">
              {link.label}
            </Link>
          );
        })}
      </motion.div>
    )}
  </AnimatePresence>
);