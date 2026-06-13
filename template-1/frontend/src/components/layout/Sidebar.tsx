"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps { children: React.ReactNode; }

const patientNav = [
  { name: "Dashboard",         href: "/dashboard",          icon: "🏠" },
  { name: "Find Clinic",       href: "/dashboard/clinic-finder",      icon: "🗺️" },
  { name: "Book Appointment",  href: "/dashboard/book-appointment",   icon: "📅" },
  { name: "Symptom Logger",    href: "/dashboard/symptom-logger",     icon: "📋" },
  { name: "Settings",          href: "/settings",           icon: "⚙️" },
];

const doctorNav = [
  { name: "My Dashboard",      href: "/dashboard",          icon: "🏠" },
  { name: "Today's Queue",     href: "/dashboard/doctor-dashboard",   icon: "👨‍⚕️" },
  { name: "Settings",          href: "/settings",           icon: "⚙️" },
];

const adminNav = [
  { name: "Dashboard",         href: "/dashboard",          icon: "🏠" },
  { name: "Admin Panel",       href: "/admin",          icon: "🛡️" },
  { name: "Find Clinic",       href: "/dashboard/clinic-finder",      icon: "🗺️" },
  { name: "Settings",          href: "/settings",           icon: "⚙️" },
];

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname   = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems =
    user?.role === "doctor" ? doctorNav :
    user?.role === "admin"  ? adminNav  :
    patientNav;

  const NavLink = ({ item }: { item: typeof patientNav[0] }) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} className="relative block" onClick={() => setMobileOpen(false)}>
        <div className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
          isActive ? "text-white" : "text-teal-300/70 hover:text-white hover:bg-teal-900/20"
        }`}>
          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 rounded-lg bg-teal-900/40 border border-teal-700/30"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 text-base">{item.icon}</span>
          <span className="relative z-10">{item.name}</span>
        </div>
      </Link>
    );
  };

  const UserFooter = () => (
    <div className="border-t border-teal-900/40 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-teal-300 uppercase">
            {user?.name?.[0] || "?"}
          </div>
          <div className="max-w-[110px] overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
            <p className="text-[10px] text-teal-400/60 capitalize">{user?.role || "patient"}</p>
          </div>
        </div>
        <button onClick={logout} className="text-xs text-teal-500 hover:text-error transition-colors" title="Sign out">
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020c0b] text-white font-sans">

      {/* Mobile top bar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-teal-900/40 bg-[#020c0b]/90 px-5 backdrop-blur-md md:hidden fixed top-0 left-0 right-0 z-40">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-2xl">🏥</span> <span className="text-teal-300">Care</span>Connect
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg border border-teal-900/40 p-2 text-teal-400 hover:text-white">
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-teal-900/30 bg-[#020c0b]/80 backdrop-blur-sm p-5 fixed h-screen top-0 left-0 z-30">
        <Link href="/dashboard" className="flex items-center gap-2 mb-8 font-bold text-lg tracking-tight">
          <span className="text-2xl">🏥</span>
          <span><span className="text-teal-400">Care</span>Connect</span>
        </Link>

        <p className="px-4 mb-2 text-[10px] font-semibold tracking-widest text-teal-700 uppercase">
          {user?.role === "doctor" ? "Doctor" : user?.role === "admin" ? "Admin" : "Patient"} Menu
        </p>
        <nav className="flex-1 space-y-0.5">
          {navItems.map(item => <NavLink key={item.href} item={item} />)}
        </nav>
        <UserFooter />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden" />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#020c0b] border-r border-teal-900/40 p-5 flex flex-col md:hidden"
            >
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 mb-8 font-bold text-lg">
                <span className="text-2xl">🏥</span>
                <span><span className="text-teal-400">Care</span>Connect</span>
              </Link>
              <nav className="flex-1 space-y-0.5">
                {navItems.map(item => <NavLink key={item.href} item={item} />)}
              </nav>
              <UserFooter />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:pl-60 min-h-screen pt-16 md:pt-0">
        <div className="flex-1 p-5 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
