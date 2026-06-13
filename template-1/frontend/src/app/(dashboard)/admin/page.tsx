"use client"
import React from "react"
import { motion } from "framer-motion"
import { ADMIN_STATS, MOCK_CLINICS, MOCK_DOCTORS } from "@/lib/mockData"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/Button"

export default function AdminPanelPage() {
  const [clinics, setClinics] = React.useState(MOCK_CLINICS)
  const [doctors, setDoctors] = React.useState(MOCK_DOCTORS)

  // Placeholder CRUD actions – would POST to backend in real app
  const addClinic = () => {
    const newClinic = { id: `clinic_${Date.now()}`, name: "New Clinic", address: "", area: "", lat:0, lng:0, specialties: [], workingHours:"", phone:"", distance:"0 km", doctors: [], rating: 0 }
    setClinics(prev=>[newClinic,...prev])
  }

  const addDoctor = () => {
    const newDoctor = { id: `doc_${Date.now()}`, name: "New Doctor", specialty:"General Medicine", clinicId:"", qualification:"", avatar:"ND", availableSlots: [] }
    setDoctors(prev=>[newDoctor,...prev])
  }

  const chartData = ADMIN_STATS.weekLabels.map((day,i)=>({ day, appointments: ADMIN_STATS.appointmentsThisWeek[i] }))

  return (
    <div className="min-h-screen bg-[#020c0b] text-white font-sans p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Stats */}
        <div className="glass-panel p-4 rounded-xl border border-teal-900/30">
          <h2 className="text-lg font-semibold mb-3">Platform Stats</h2>
          <ul className="space-y-2 text-teal-300/80">
            <li>Total Clinics: {ADMIN_STATS.totalClinics}</li>
            <li>Total Doctors: {ADMIN_STATS.totalDoctors}</li>
            <li>Appointments Today: {ADMIN_STATS.appointmentsToday}</li>
            <li>Active Patients: {ADMIN_STATS.activePatients}</li>
          </ul>
        </div>
        {/* Appointment Chart */}
        <div className="glass-panel p-4 rounded-xl border border-teal-900/30">
          <h2 className="text-lg font-semibold mb-3">Weekly Appointments</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
              <XAxis dataKey="day" stroke="#a7f3d0"/>
              <YAxis stroke="#a7f3d0"/>
              <Tooltip contentStyle={{backgroundColor:"#111827",borderColor:"#374151",color:"#fff"}}/>
              <Bar dataKey="appointments" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Clinic Management */}
        <div className="glass-panel p-4 rounded-xl border border-teal-900/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Clinics</h2>
            <Button onClick={addClinic} variant="primary" size="sm">Add Clinic</Button>
          </div>
          <ul className="space-y-2 text-teal-300/80 max-h-48 overflow-y-auto">
            {clinics.map(c=> <li key={c.id}>{c.name} – {c.area}</li>)}
          </ul>
        </div>
        {/* Doctor Management */}
        <div className="glass-panel p-4 rounded-xl border border-teal-900/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Doctors</h2>
            <Button onClick={addDoctor} variant="primary" size="sm">Add Doctor</Button>
          </div>
          <ul className="space-y-2 text-teal-300/80 max-h-48 overflow-y-auto">
            {doctors.map(d=> <li key={d.id}>{d.name} – {d.specialty}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
