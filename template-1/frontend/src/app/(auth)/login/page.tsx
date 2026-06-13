"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState<UserRole>("patient");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    if (!email || !password) { setError("Please fill in all fields."); setLoading(false); return; }
    const ok = await login(email, password, role);
    if (!ok) setError("Invalid credentials.");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020c0b] px-4 text-white font-sans">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-teal-500/8 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/6 blur-[130px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        className="glass-panel w-full max-w-md rounded-2xl p-8 md:p-10">

        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🏥</span>
            <span><span className="text-teal-400">Care</span>Connect</span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold">Welcome back</h2>
          <p className="mt-1 text-sm text-teal-300/60">Sign in to access your health dashboard</p>
        </div>

        {/* Role Toggle */}
        <div className="flex rounded-lg bg-teal-950/50 border border-teal-900/40 p-1 mb-6 gap-1">
          {(["patient", "doctor", "admin"] as UserRole[]).map(r => (
            <button key={r} type="button" onClick={() => setRole(r)}
              className={`flex-1 rounded-md py-2 text-xs font-semibold capitalize transition-colors ${
                role === r ? "bg-primary text-white shadow" : "text-teal-400 hover:text-white"
              }`}>
              {r === "patient" ? "🧑 Patient" : r === "doctor" ? "👨‍⚕️ Doctor" : "🛡️ Admin"}
            </button>
          ))}
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-4 rounded-lg bg-error/10 border border-error/20 px-4 py-2.5 text-sm text-error">
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-teal-400/70 mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-3 text-sm text-white placeholder-teal-700 focus:border-primary focus:outline-none transition-colors"
              placeholder="you@example.com" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold tracking-wider uppercase text-teal-400/70">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary hover:text-primary-hover transition-colors">Forgot?</Link>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-4 py-3 text-sm text-white placeholder-teal-700 focus:border-primary focus:outline-none transition-colors"
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-primary hover:bg-primary-hover py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary-glow">
            {loading ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
        </form>

        <p className="mt-7 text-center text-xs text-teal-500">
          No account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:text-primary-hover transition-colors">Create one free</Link>
        </p>
      </motion.div>
    </div>
  );
}
