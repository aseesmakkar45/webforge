"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock Performance Metrics
const conversionData = [
  { name: "Jan", tutor: 45, fitness: 30, coach: 20 },
  { name: "Feb", tutor: 80, fitness: 65, coach: 45 },
  { name: "Mar", tutor: 120, fitness: 90, coach: 60 },
  { name: "Apr", tutor: 160, fitness: 130, coach: 95 },
  { name: "May", tutor: 210, fitness: 180, coach: 140 },
  { name: "Jun", tutor: 340, fitness: 290, coach: 210 },
];

const templateBreakdown = [
  { name: "AI Tutor Project", count: "120 Sessions", uptime: "99.92%", cost: "$4.12", status: "Active" },
  { name: "Healthcare Companion", count: "48 Sessions", uptime: "99.85%", cost: "$1.95", status: "Active" },
  { name: "Resume Analyzer System", count: "310 Sessions", uptime: "100.00%", cost: "$9.42", status: "Active" },
  { name: "Study Planner", count: "0 Sessions", uptime: "--", cost: "$0.00", status: "Draft" },
];

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

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

  return (
    <Sidebar>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Analytics Insights</h1>
          <p className="text-sm text-text-secondary mt-1">
            Deep dive into resource allocations, operation costs, and templates runtime parameters.
          </p>
        </div>

        {/* Charts Section */}
        <div className="glass-panel p-6 rounded-xl border border-zinc-900">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">Monthly Active Sessions by Template</h3>
            <p className="text-xs text-text-secondary mt-0.5">Interactive bar distributions across SaaS configurations</p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar dataKey="tutor" fill="#6366f1" name="AI Tutor" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fitness" fill="#a855f7" name="Fitness Planner" radius={[4, 4, 0, 0]} />
                <Bar dataKey="coach" fill="#10b981" name="Career Coach" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Module */}
        <div className="glass-panel rounded-xl border border-zinc-900 overflow-hidden">
          <div className="p-6 border-b border-zinc-900">
            <h3 className="text-lg font-semibold text-white">Template Resources Metrics</h3>
            <p className="text-xs text-text-secondary mt-0.5">Summary of costs and transaction stats per active deployment</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/40 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-zinc-900">
                <tr>
                  <th className="px-6 py-4">Template Title</th>
                  <th className="px-6 py-4">Sessions Run</th>
                  <th className="px-6 py-4">Average Uptime</th>
                  <th className="px-6 py-4">Est. Model Cost</th>
                  <th className="px-6 py-4">Deployment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {templateBreakdown.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                    <td className="px-6 py-4 text-text-secondary">{row.count}</td>
                    <td className="px-6 py-4 text-text-secondary">{row.uptime}</td>
                    <td className="px-6 py-4 text-text-secondary">{row.cost}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        row.status === "Active" ? "bg-success/10 text-success border border-success/20" : "bg-zinc-900 text-text-muted border border-zinc-800"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </Sidebar>
  );
}
