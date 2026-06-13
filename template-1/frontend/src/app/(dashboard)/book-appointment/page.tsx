"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOCK_CLINICS, MOCK_DOCTORS, MOCK_APPOINTMENTS } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";

export default function BookAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClinicId = searchParams.get("clinicId");

  const [step, setStep] = useState(1);
  const [clinicId, setClinicId] = useState(preselectedClinicId || "");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [availableDoctors, setAvailableDoctors] = useState([] as typeof MOCK_DOCTORS);
  const [availableSlots, setAvailableSlots] = useState([] as any[]);

  // Step 2 – load doctors for selected clinic
  useEffect(() => {
    if (clinicId) {
      const docs = MOCK_DOCTORS.filter(d => d.clinicId === clinicId);
      setAvailableDoctors(docs);
    }
  }, [clinicId]);

  // Step 3 – load time slots for selected doctor
  useEffect(() => {
    if (doctorId) {
      const doc = MOCK_DOCTORS.find(d => d.id === doctorId);
      setAvailableSlots(doc?.availableSlots || []);
    }
  }, [doctorId]);

  const handleConfirm = () => {
    // In the real app this would POST to /api/appointments – we push to mock array for demo
    const clinic = MOCK_CLINICS.find(c => c.id === clinicId);
    const doc = MOCK_DOCTORS.find(d => d.id === doctorId);
    const newAppt = {
      id: `apt_${Date.now()}`,
      patientId: "usr_patient",
      patientName: "You",
      doctorId: doc?.id || "",
      doctorName: doc?.name || "",
      clinicId: clinic?.id || "",
      clinicName: clinic?.name || "",
      date,
      timeSlot,
      status: "pending" as const,
      specialty: doc?.specialty || "",
    };
    MOCK_APPOINTMENTS.push(newAppt);
    router.push("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Select a Clinic</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {MOCK_CLINICS.map(c => (
                <motion.button key={c.id} whileHover={{ scale: 1.03 }}
                  className={`glass-panel p-4 rounded-xl border border-teal-900/30 text-left ${clinicId === c.id ? "border-primary" : ""}`}
                  onClick={() => { setClinicId(c.id); setStep(2); }}>
                  <p className="font-medium text-white">{c.name}</p>
                  <p className="text-sm text-teal-300/70">{c.area}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Select a Doctor</h2>
            {availableDoctors.length === 0 && <p className="text-teal-300/60">No doctors for this clinic.</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              {availableDoctors.map(d => (
                <motion.button key={d.id} whileHover={{ scale: 1.03 }}
                  className={`glass-panel p-4 rounded-xl border border-teal-900/30 text-left ${doctorId === d.id ? "border-primary" : ""}`}
                  onClick={() => { setDoctorId(d.id); setStep(3); }}>
                  <p className="font-medium text-white">{d.name}</p>
                  <p className="text-sm text-teal-300/70">{d.specialty}</p>
                </motion.button>
              ))}
            </div>
            <button className="mt-2 text-sm text-primary" onClick={() => setStep(1)}>← Change Clinic</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Pick a Date</h2>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-lg bg-teal-950/40 border border-teal-900/50 px-3 py-2 text-white" />
            <button className="mt-2 text-sm text-primary" onClick={() => setStep(2)}>← Change Doctor</button>
            {date && (
              <Button onClick={() => setStep(4)} variant="primary">Next: Choose Time Slot →</Button>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Select a Time Slot</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {availableSlots.filter(s => s.available).map(s => (
                <motion.button key={s.id} whileHover={{ scale: 1.05 }}
                  className={`glass-panel p-3 rounded-lg text-center ${timeSlot === s.label ? "border-primary" : ""}`}
                  onClick={() => { setTimeSlot(s.label); setStep(5); }}>
                  {s.label}
                </motion.button>
              ))}
            </div>
            <button className="mt-2 text-sm text-primary" onClick={() => setStep(3)}>← Change Date</button>
          </div>
        );
      case 5:
        const clinic = MOCK_CLINICS.find(c => c.id === clinicId);
        const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Confirm Your Appointment</h2>
            <ul className="space-y-2 text-teal-300/80">
              <li><strong>Clinic:</strong> {clinic?.name}</li>
              <li><strong>Doctor:</strong> {doctor?.name} ({doctor?.specialty})</li>
              <li><strong>Date:</strong> {date}</li>
              <li><strong>Time:</strong> {timeSlot}</li>
            </ul>
            <div className="flex gap-4">
              <Button onClick={handleConfirm} variant="primary">Confirm Booking</Button>
              <Button onClick={() => setStep(4)} variant="outline">Back</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020c0b] text-white font-sans p-6">
      <Link href="/dashboard" className="text-sm text-primary hover:underline">← Back to Dashboard</Link>
      <div className="mt-6 max-w-2xl mx-auto glass-panel p-6 rounded-xl border border-teal-900/30">
        {renderStep()}
      </div>
    </div>
  );
}
