"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOCK_CLINICS } from "@/lib/mockData";

export default function ClinicFinderPage() {
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  const filtered = MOCK_CLINICS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.area.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = specialtyFilter ? c.specialties.includes(specialtyFilter) : true;
    return matchesSearch && matchesSpec;
  });

  const allSpecialties = Array.from(new Set(MOCK_CLINICS.flatMap(c => c.specialties)));

  return (
    <div className="min-h-screen bg-[#020c0b] text-white font-sans p-6">
      <motion.h1 className="text-3xl font-bold mb-6" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Find a Clinic Near You
      </motion.h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder="Search by name or location..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-2.5 text-sm text-white placeholder-teal-700 focus:border-primary" />
        <select value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}
          className="rounded-lg bg-teal-950/40 border border-teal-900/50 px-3 py-2.5 text-sm text-white focus:border-primary">
          <option value="">All Specialties</option>
          {allSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(clinic => (
          <motion.div key={clinic.id} whileHover={{ y: -3, scale: 1.02 }} className="glass-panel p-5 rounded-xl border border-teal-900/30">
            <h2 className="text-lg font-semibold text-white mb-1">{clinic.name}</h2>
            <p className="text-sm text-teal-300/70">{clinic.address}, {clinic.area}</p>
            <p className="mt-2 text-xs text-teal-400">Specialties: {clinic.specialties.join(", ")}</p>
            <p className="mt-1 text-xs text-teal-400">Hours: {clinic.workingHours}</p>
            <p className="mt-1 text-xs text-teal-400">Distance: {clinic.distance}</p>
            <Link href={`/book-appointment?clinicId=${clinic.id}`} className="mt-3 inline-block text-sm text-primary hover:underline">
              Book an appointment →
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-teal-300/60">No clinics match your criteria.</p>
        )}
      </div>
    </div>
  );
}
