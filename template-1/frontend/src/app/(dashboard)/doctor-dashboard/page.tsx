"use client"
import React from "react"
import { motion } from "framer-motion"
import { DOCTOR_TODAY_QUEUE } from "@/lib/mockData"
import { Button } from "@/components/ui/Button"

export default function DoctorDashboardPage() {
  const markDone = (id:string) => {
    const entry = DOCTOR_TODAY_QUEUE.find(a=>a.id===id)
    if(entry) entry.status = "done"
  }

  return (
    <div className="min-h-screen bg-[#020c0b] text-white font-sans p-6">
      <h1 className="text-2xl font-bold mb-6">Today's Appointments</h1>
      <div className="space-y-4">
        {DOCTOR_TODAY_QUEUE.map(appt => (
          <motion.div key={appt.id} whileHover={{ y: -2 }} className="glass-panel p-4 rounded-xl border border-teal-900/30 flex justify-between items-center">
            <div>
              <p className="font-medium text-white">{appt.patientName}</p>
              <p className="text-sm text-teal-300/70">{appt.timeSlot} – {appt.specialty}</p>
              <p className={`text-xs ${appt.status==='done'?'text-success':appt.status==='pending'?'text-primary':'text-text-muted'}`}>Status: {appt.status}</p>
            </div>
            {appt.status !== "done" && (
              <Button onClick={() => markDone(appt.id)} variant="outline" size="sm">Mark Done</Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
