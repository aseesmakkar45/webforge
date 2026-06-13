"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { COMMON_SYMPTOMS, MOCK_SYMPTOM_LOGS } from "@/lib/mockData"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/Button"

export default function SymptomLoggerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [mood, setMood] = useState(3)
  const [notes, setNotes] = useState("")
  const [logs, setLogs] = useState(MOCK_SYMPTOM_LOGS)

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    )
  }

  const handleSubmit = () => {
    const today = new Date().toISOString().split('T')[0]
    const newLog = {
      id: `log_${Date.now()}`,
      userId: "usr_patient",
      date: today,
      symptoms: selectedSymptoms,
      mood,
      notes,
    }
    setLogs(prev => [newLog, ...prev])
    // reset UI
    setSelectedSymptoms([])
    setMood(3)
    setNotes("")
  }

  const chartData = logs.map(l => ({ date: l.date, mood: l.mood }))

  return (
    <div className="min-h-screen bg-[#020c0b] text-white font-sans p-6">
      <h1 className="text-2xl font-bold mb-6">Daily Symptom & Mood Tracker</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form */}
        <div className="glass-panel p-5 rounded-xl border border-teal-900/30">
          <h2 className="text-lg font-semibold mb-4">Log for Today</h2>
          <div className="mb-4">
            <p className="mb-2">Mood (1‑5)</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(v => (
                <button key={v} type="button"
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${mood===v?"bg-primary text-white":"bg-teal-950/40 text-teal-400"}`}
                  onClick={() => setMood(v)}>{v}</button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">Symptoms</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map(sym => (
                <button key={sym} type="button"
                  className={`px-3 py-1 rounded-full text-sm ${selectedSymptoms.includes(sym)?"bg-primary text-white":"bg-teal-950/40 text-teal-300"}`}
                  onClick={() => toggleSymptom(sym)}>{sym}</button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Notes</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4}
              className="w-full rounded-lg bg-teal-950/40 border border-teal-900/50 px-3 py-2 text-white placeholder-teal-700 focus:border-primary"/>
          </div>
          <Button onClick={handleSubmit} variant="primary">Add Log</Button>
        </div>

        {/* Chart */}
        <div className="glass-panel p-5 rounded-xl border border-teal-900/30">
          <h2 className="text-lg font-semibold mb-4">Mood Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#a7f3d0" />
              <YAxis domain={[1,5]} tickCount={5} stroke="#a7f3d0" />
              <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#fff" }} />
              <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold mb-4">Past Logs</h2>
      <div className="space-y-3">
        {logs.map(l => (
          <div key={l.id} className="glass-panel p-3 rounded-md border border-teal-900/30">
            <p className="text-sm text-teal-400">{l.date} – Mood: {l.mood}</p>
            {l.symptoms.length > 0 && <p className="text-xs">Symptoms: {l.symptoms.join(", ")}</p>}
            {l.notes && <p className="text-xs text-teal-300 mt-1">{l.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
