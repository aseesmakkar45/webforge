"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Button } from "@/components/ui/Button";

const features = [
  { icon: "🗺️", title: "Clinic Finder", desc: "Discover government health centres and PHCs near you with filters for specialty, working hours, and distance." },
  { icon: "📅", title: "Instant Booking", desc: "Book appointments with verified doctors. Pick your date and time slot — no queues, no confusion." },
  { icon: "📋", title: "Symptom Diary", desc: "Log daily symptoms and mood. Track patterns over time with visual charts to share with your doctor." },
  { icon: "👨‍⚕️", title: "Doctor Dashboard", desc: "Doctors manage their daily queue, view patient history, and mark appointments as done — all in one place." },
  { icon: "🛡️", title: "Admin Control", desc: "Health admins manage clinics, onboard doctors, and monitor platform statistics effortlessly." },
  { icon: "📱", title: "Low-Bandwidth Friendly", desc: "Designed for semi-urban India — fast loading, minimal data usage, and offline-ready architecture." },
];

const stats = [
  { val: "240+", label: "Active Patients" },
  { val: "4", label: "Community Clinics" },
  { val: "5", label: "Verified Doctors" },
  { val: "98%", label: "Appointment Rate" },
];

const faqs = [
  { q: "Is CareConnect free to use?", a: "Yes — CareConnect is a free platform built to improve healthcare access in underserved communities. No fees for patients." },
  { q: "How do I find a clinic near me?", a: "Use the Clinic Finder after logging in. It shows all registered government health centres with filters for specialty and working hours." },
  { q: "Can I cancel an appointment?", a: "Yes, patients can cancel upcoming appointments from their Dashboard up to 2 hours before the scheduled time." },
];

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen bg-[#020c0b] text-white font-sans overflow-hidden">
      <AuroraBackground />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-teal-900/40 bg-[#020c0b]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-2xl">🏥</span>
            <span><span className="text-teal-400">Care</span>Connect</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-teal-300/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-white transition-colors">Impact</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/signup"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center rounded-full bg-teal-500/10 border border-teal-500/25 px-3 py-1 text-xs font-semibold text-teal-300">
            🇮🇳 Built for Rural & Semi-Urban India
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Healthcare Access,<br />
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Right at Your Doorstep
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-teal-200/60 leading-relaxed">
            Find nearby government clinics, book appointments with verified doctors, and track your health — all in one simple platform.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/signup"><Button size="lg">Find a Clinic Near Me</Button></Link>
            <Link href="/login"><Button variant="outline" size="lg">Sign In as Doctor</Button></Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-teal-900/30 bg-teal-950/20 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl font-extrabold text-teal-300">{s.val}</p>
                <p className="text-sm text-teal-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight">Everything You Need, Nothing You Don't</h2>
            <p className="mt-3 text-teal-300/60 max-w-xl mx-auto">Designed for patients, doctors, and administrators — one platform, three powerful views.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -4, borderColor: "rgba(20,184,166,0.35)" }}
                className="glass-panel p-6 rounded-xl border border-teal-900/30 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-teal-300/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-teal-900/30 bg-teal-950/10">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-teal-900/40 pb-4">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full justify-between py-3 text-left font-medium text-white hover:text-teal-300 transition-colors focus:outline-none">
                  <span>{f.q}</span>
                  <span className="text-teal-600 ml-4">{activeFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <p className="pr-10 text-sm text-teal-300/60 leading-relaxed mt-1">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-teal-900/30 bg-black/40 py-10 text-center text-xs text-teal-700">
        <p>© {new Date().getFullYear()} CareConnect — Built for Bharat 🇮🇳</p>
        <div className="mt-3 flex justify-center gap-6">
          <a href="#" className="hover:text-teal-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-teal-300 transition-colors">Terms</a>
          <a href="https://github.com" className="hover:text-teal-300 transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
