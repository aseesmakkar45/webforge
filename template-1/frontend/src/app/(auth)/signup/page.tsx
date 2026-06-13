"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]       = useState<UserRole>("patient");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    if (!name || !email || !password) { setError("All fields are required."); setLoading(false); return; }
    const ok = await signup(name, email, password, role, location);
    if (!ok) setError("Signup failed. Please try again.");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020c0b] font-sans text-white px-4">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-teal-500/8 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/6 blur-[130px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        className="glass-panel w-full max-w-md rounded-2xl p-8 md:p-10">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🏥</span>
            <span><span className="text-teal-400">Care</span>Connect</span>
          </Link>
          <h2 className="mt-3 text-2xl font-semibold">Create your account</h2>
          <p className="mt-1 text-sm text-teal-300/60">Choose your role and start using CareConnect</p>
        </div>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-4 rounded-lg bg-error/10 border border-error/20 px-4 py-2.5 text-sm text-error">{error}</motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-teal-400/70 mb-2">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-3 text-sm text-white placeholder-teal-700 focus:border-primary focus:outline-none transition-colors" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-teal-400/70 mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-3 text-sm text-white placeholder-teal-700 focus:border-primary focus:outline-none transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-teal-400/70 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-3 text-sm text-white placeholder-teal-700 focus:border-primary focus:outline-none transition-colors" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-teal-400/70 mb-2">Role</label>
            <select value={role} onChange={e => setRole(e.target.value as UserRole)} className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors">
              <option value="patient">🧑 Patient</option>
              <option value="doctor">👨‍⚕️ Doctor</option>
              <option value="admin">🛡️ Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-teal-400/70 mb-2">Location (city, state)</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Barabanki, UP"
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-3 text-sm text-white placeholder-teal-700 focus:border-primary focus:outline-none transition-colors" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-primary hover:bg-primary-hover py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary-glow">
            {loading ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : "Create Account"}
          </button>
        </form>
        <p className="mt-7 text-center text-xs text-teal-500">
          Already have an account? <Link href="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
