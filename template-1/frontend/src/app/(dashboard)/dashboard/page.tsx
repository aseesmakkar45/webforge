"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock Chart Data
const chartData = [
  { name: "Mon", usage: 120 },
  { name: "Tue", usage: 280 },
  { name: "Wed", usage: 190 },
  { name: "Thu", usage: 320 },
  { name: "Fri", usage: 450 },
  { name: "Sat", usage: 300 },
  { name: "Sun", usage: 520 },
];

const mockActivities = [
  { id: 1, action: "AI Response generated", detail: "Optimized marketing copy outline", time: "10 mins ago", status: "success" },
  { id: 2, action: "File parsed successfully", detail: "Resume_Analysis_v2.pdf", time: "1 hour ago", status: "success" },
  { id: 3, action: "API quota threshold alert", detail: "Monthly usage reached 68%", time: "3 hours ago", status: "warning" },
  { id: 4, action: "Settings updated", detail: "Swapped profile theme to Emerald", time: "1 day ago", status: "neutral" },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-sans">
        <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <Sidebar>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Header Greeting */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Welcome back, {user?.name || "Builder"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Here's a summary of your application templates and AI models.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Operations", val: "14,820", change: "+12.4%", desc: "vs last week", color: "indigo" },
            { label: "AI Tokens Used", val: "348.5k", change: "+8.1%", desc: "vs last month", color: "purple" },
            { label: "System Accuracy", val: "99.8%", change: "+0.2%", desc: "stable uptime", color: "emerald" },
            { label: "Active Integrations", val: "9 / 12", change: "80%", desc: "api key status", color: "amber" },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="glass-panel p-6 rounded-xl border border-zinc-900"
            >
              <p className="text-xs font-semibold tracking-wider text-text-muted uppercase">{card.label}</p>
              <div className="flex items-baseline gap-2.5 mt-3">
                <span className="text-3xl font-bold tracking-tight text-white">{card.val}</span>
                <span className={`text-xs font-medium ${
                  card.change.startsWith("+") ? "text-success" : "text-text-muted"
                }`}>
                  {card.change}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-2">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts and Feeds Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Column */}
          <div className="glass-panel p-6 rounded-xl border border-zinc-900 lg:col-span-2 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">API Usage Volume</h3>
                <p className="text-xs text-text-secondary mt-0.5">Track daily request distribution</p>
              </div>
            </div>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#09090b", 
                      borderColor: "rgba(39, 39, 42, 0.6)",
                      borderRadius: "8px",
                      color: "#fff"
                    }} 
                  />
                  <Area type="monotone" dataKey="usage" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorUsage)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Column */}
          <div className="glass-panel p-6 rounded-xl border border-zinc-900 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <p className="text-xs text-text-secondary mt-0.5">Real-time system events logging</p>
              
              <div className="mt-6 space-y-5">
                {mockActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 text-base">
                      {act.status === "success" && "🟢"}
                      {act.status === "warning" && "🟡"}
                      {act.status === "neutral" && "🔵"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{act.action}</p>
                      <p className="text-xs text-text-muted mt-0.5 truncate">{act.detail}</p>
                    </div>
                    <span className="text-xs text-text-muted flex-shrink-0 mt-0.5">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Sidebar>
  );
}
