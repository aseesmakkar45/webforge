// ─────────────────────────────────────────────────────────────────────────────
// CareConnect — Central Mock Data Layer
// Swap any array below with a real Axios call when the backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

export interface Clinic {
  id: string;
  name: string;
  address: string;
  area: string;
  lat: number;
  lng: number;
  specialties: string[];
  workingHours: string;
  phone: string;
  distance: string; // km from user (mock)
  doctors: Doctor[];
  rating: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinicId: string;
  qualification: string;
  availableSlots: TimeSlot[];
  avatar: string; // initials placeholder
}

export interface TimeSlot {
  id: string;
  label: string;
  period: "morning" | "afternoon" | "evening";
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  clinicId: string;
  clinicName: string;
  date: string;       // ISO date string
  timeSlot: string;
  status: "pending" | "confirmed" | "done" | "cancelled";
  specialty: string;
  notes?: string;
}

export interface SymptomLog {
  id: string;
  userId: string;
  date: string;
  symptoms: string[];
  mood: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

// ─── Clinics ──────────────────────────────────────────────────────────────────
export const MOCK_CLINICS: Clinic[] = [
  {
    id: "clinic_1",
    name: "Rajiv Gandhi Community Health Centre",
    address: "Near Bus Stand, Sector 4",
    area: "Barabanki",
    lat: 26.9255,
    lng: 81.1854,
    specialties: ["General Medicine", "Paediatrics", "Gynaecology"],
    workingHours: "Mon–Sat · 8 AM – 2 PM",
    phone: "+91 99999 11111",
    distance: "1.2 km",
    rating: 4.3,
    doctors: [],
  },
  {
    id: "clinic_2",
    name: "Primary Health Centre Lucknow Road",
    address: "Lucknow Road, Block A",
    area: "Sitapur",
    lat: 27.5615,
    lng: 80.6789,
    specialties: ["General Medicine", "Dentistry", "Eye Care"],
    workingHours: "Mon–Fri · 9 AM – 4 PM",
    phone: "+91 99999 22222",
    distance: "2.8 km",
    rating: 4.0,
    doctors: [],
  },
  {
    id: "clinic_3",
    name: "Mata Rani Urban Health Post",
    address: "Gandhi Chowk, Ward 12",
    area: "Hardoi",
    lat: 27.3961,
    lng: 80.1322,
    specialties: ["Gynaecology", "Paediatrics", "Nutrition"],
    workingHours: "Mon–Sat · 7 AM – 1 PM",
    phone: "+91 99999 33333",
    distance: "4.5 km",
    rating: 4.6,
    doctors: [],
  },
  {
    id: "clinic_4",
    name: "Sub-District Hospital Unnao",
    address: "Civil Lines, Near Collectorate",
    area: "Unnao",
    lat: 26.5466,
    lng: 80.4852,
    specialties: ["General Medicine", "Orthopaedics", "Cardiology", "ENT"],
    workingHours: "Mon–Sun · 24 hrs",
    phone: "+91 99999 44444",
    distance: "6.1 km",
    rating: 3.8,
    doctors: [],
  },
];

// ─── Doctors ──────────────────────────────────────────────────────────────────
export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc_1",
    name: "Dr. Priya Sharma",
    specialty: "General Medicine",
    clinicId: "clinic_1",
    qualification: "MBBS, MD",
    avatar: "PS",
    availableSlots: [
      { id: "s1", label: "8:00 AM", period: "morning", available: true },
      { id: "s2", label: "9:00 AM", period: "morning", available: false },
      { id: "s3", label: "10:00 AM", period: "morning", available: true },
      { id: "s4", label: "11:00 AM", period: "morning", available: true },
    ],
  },
  {
    id: "doc_2",
    name: "Dr. Ramesh Verma",
    specialty: "Paediatrics",
    clinicId: "clinic_1",
    qualification: "MBBS, DCH",
    avatar: "RV",
    availableSlots: [
      { id: "s5", label: "8:30 AM", period: "morning", available: true },
      { id: "s6", label: "10:30 AM", period: "morning", available: true },
      { id: "s7", label: "12:00 PM", period: "afternoon", available: false },
    ],
  },
  {
    id: "doc_3",
    name: "Dr. Meena Gupta",
    specialty: "Gynaecology",
    clinicId: "clinic_3",
    qualification: "MBBS, MS (OBG)",
    avatar: "MG",
    availableSlots: [
      { id: "s8", label: "7:00 AM", period: "morning", available: true },
      { id: "s9", label: "9:00 AM", period: "morning", available: true },
      { id: "s10", label: "11:30 AM", period: "morning", available: true },
    ],
  },
  {
    id: "doc_4",
    name: "Dr. Anil Tiwari",
    specialty: "General Medicine",
    clinicId: "clinic_2",
    qualification: "MBBS",
    avatar: "AT",
    availableSlots: [
      { id: "s11", label: "9:30 AM", period: "morning", available: false },
      { id: "s12", label: "2:00 PM", period: "afternoon", available: true },
      { id: "s13", label: "3:30 PM", period: "afternoon", available: true },
    ],
  },
  {
    id: "doc_5",
    name: "Dr. Sunita Yadav",
    specialty: "Cardiology",
    clinicId: "clinic_4",
    qualification: "MBBS, MD, DM",
    avatar: "SY",
    availableSlots: [
      { id: "s14", label: "10:00 AM", period: "morning", available: true },
      { id: "s15", label: "4:00 PM", period: "afternoon", available: true },
      { id: "s16", label: "6:00 PM", period: "evening", available: true },
    ],
  },
];

// ─── Appointments ─────────────────────────────────────────────────────────────
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt_1",
    patientId: "usr_patient",
    patientName: "Rahul Mishra",
    doctorId: "doc_1",
    doctorName: "Dr. Priya Sharma",
    clinicId: "clinic_1",
    clinicName: "Rajiv Gandhi Community Health Centre",
    date: "2026-06-12",
    timeSlot: "10:00 AM",
    status: "confirmed",
    specialty: "General Medicine",
    notes: "Recurring fever for 3 days",
  },
  {
    id: "apt_2",
    patientId: "usr_patient",
    patientName: "Rahul Mishra",
    doctorId: "doc_3",
    doctorName: "Dr. Meena Gupta",
    clinicId: "clinic_3",
    clinicName: "Mata Rani Urban Health Post",
    date: "2026-06-15",
    timeSlot: "9:00 AM",
    status: "pending",
    specialty: "Gynaecology",
  },
  {
    id: "apt_3",
    patientId: "usr_patient",
    patientName: "Priya Singh",
    doctorId: "doc_2",
    doctorName: "Dr. Ramesh Verma",
    clinicId: "clinic_1",
    clinicName: "Rajiv Gandhi Community Health Centre",
    date: "2026-06-10",
    timeSlot: "8:30 AM",
    status: "done",
    specialty: "Paediatrics",
  },
];

// ─── Doctor View — Today's Queue ──────────────────────────────────────────────
export const DOCTOR_TODAY_QUEUE: Appointment[] = [
  {
    id: "q_1",
    patientId: "p1",
    patientName: "Kavita Devi",
    doctorId: "doc_1",
    doctorName: "Dr. Priya Sharma",
    clinicId: "clinic_1",
    clinicName: "Rajiv Gandhi Community Health Centre",
    date: "2026-06-10",
    timeSlot: "8:00 AM",
    status: "done",
    specialty: "General Medicine",
    notes: "Hypertension follow-up",
  },
  {
    id: "q_2",
    patientId: "p2",
    patientName: "Mohan Lal",
    doctorId: "doc_1",
    doctorName: "Dr. Priya Sharma",
    clinicId: "clinic_1",
    clinicName: "Rajiv Gandhi Community Health Centre",
    date: "2026-06-10",
    timeSlot: "9:00 AM",
    status: "confirmed",
    specialty: "General Medicine",
    notes: "Fever and cough since Monday",
  },
  {
    id: "q_3",
    patientId: "p3",
    patientName: "Sunita Yadav",
    doctorId: "doc_1",
    doctorName: "Dr. Priya Sharma",
    clinicId: "clinic_1",
    clinicName: "Rajiv Gandhi Community Health Centre",
    date: "2026-06-10",
    timeSlot: "10:00 AM",
    status: "pending",
    specialty: "General Medicine",
    notes: "Post-surgery check",
  },
  {
    id: "q_4",
    patientId: "p4",
    patientName: "Raju Kumar",
    doctorId: "doc_1",
    doctorName: "Dr. Priya Sharma",
    clinicId: "clinic_1",
    clinicName: "Rajiv Gandhi Community Health Centre",
    date: "2026-06-10",
    timeSlot: "11:00 AM",
    status: "pending",
    specialty: "General Medicine",
  },
];

// ─── Symptom Logs ─────────────────────────────────────────────────────────────
export const COMMON_SYMPTOMS = [
  "Fever", "Cough", "Headache", "Fatigue", "Nausea",
  "Chest Pain", "Shortness of Breath", "Body Ache",
  "Dizziness", "Loss of Appetite", "Vomiting", "Diarrhoea",
];

export const MOCK_SYMPTOM_LOGS: SymptomLog[] = [
  { id: "log_1", userId: "usr_patient", date: "2026-06-04", symptoms: ["Headache"], mood: 3, notes: "Mild headache in the evening." },
  { id: "log_2", userId: "usr_patient", date: "2026-06-05", symptoms: ["Fever", "Body Ache"], mood: 2, notes: "Fever started at night." },
  { id: "log_3", userId: "usr_patient", date: "2026-06-06", symptoms: ["Fever", "Fatigue", "Cough"], mood: 1, notes: "Feeling very weak." },
  { id: "log_4", userId: "usr_patient", date: "2026-06-07", symptoms: ["Cough", "Fatigue"], mood: 2, notes: "Fever reduced, still coughing." },
  { id: "log_5", userId: "usr_patient", date: "2026-06-08", symptoms: ["Cough"], mood: 3, notes: "Better today." },
  { id: "log_6", userId: "usr_patient", date: "2026-06-09", symptoms: [], mood: 4, notes: "Feeling mostly fine." },
  { id: "log_7", userId: "usr_patient", date: "2026-06-10", symptoms: [], mood: 5, notes: "All good!" },
];

// ─── Admin Stats ─────────────────────────────────────────────────────────────
export const ADMIN_STATS = {
  totalClinics: 4,
  totalDoctors: 5,
  appointmentsToday: 14,
  activePatients: 238,
  appointmentsThisWeek: [12, 18, 14, 20, 16, 22, 14],
  weekLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};
