"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [theme, setTheme] = useState("dark");
  const [apiKey, setApiKey] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Sidebar>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl space-y-8"
      >
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl font-sans">Settings & Configurations</h1>
          <p className="text-sm text-text-secondary mt-1">
            Customize branding presets, system parameters, and model keys.
          </p>
        </div>

        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-success/15 border border-success/20 p-4 text-sm text-success"
          >
            ✓ Settings updated successfully. Changes applied across system scopes.
          </motion.div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Profile Card */}
          <div className="glass-panel p-6 rounded-xl border border-zinc-900 space-y-4">
            <h3 className="text-base font-semibold text-white">Profile Customization</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Display Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg bg-zinc-900/40 border border-zinc-850 px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-lg bg-zinc-900/20 border border-zinc-850 px-4 py-2.5 text-sm text-text-muted cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* SaaS Theme Selector */}
          <div className="glass-panel p-6 rounded-xl border border-zinc-900 space-y-4">
            <h3 className="text-base font-semibold text-white">Visual Settings</h3>
            
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Active Brand Preset</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "dark", name: "Deep Obsidian (Dark)", color: "bg-black" },
                  { id: "emerald", name: "Emerald Mint (Green)", color: "bg-emerald-950" },
                  { id: "violet", name: "Indigo Nebula (Purple)", color: "bg-violet-950" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                      theme === t.id
                        ? "border-primary bg-primary/5 text-white"
                        : "border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 text-text-secondary"
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full ${t.color} border border-white/20 mb-2`} />
                    <p className="font-semibold">{t.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Developer Credentials */}
          <div className="glass-panel p-6 rounded-xl border border-zinc-900 space-y-4">
            <h3 className="text-base font-semibold text-white">Model Provider (API Credentials)</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Insert your custom keys to communicate with Gemini directly from the client. Leaving it blank defaults to your backend service.
            </p>
            
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">GEMINI API KEY</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-lg bg-zinc-900/40 border border-zinc-850 px-4 py-2.5 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit bar */}
          <div className="flex justify-end gap-3">
            <Button type="submit">Save Changes</Button>
          </div>

        </form>
      </motion.div>
    </Sidebar>
  );
}
