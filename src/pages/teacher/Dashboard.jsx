// src/pages/teacher/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import TeacherHome from './TeacherHome'
import ComingSoon from '@/components/ui/ComingSoon'

function I({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d.split(' M').filter(Boolean).map((seg, i) => <path key={i} d={'M' + seg} />)}
    </svg>
  )
}

const nav = [
  { path: '/teacher',              label: 'Dashboard',       icon: <I d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>, end: true },
  { path: '/teacher/schemes',      label: 'Schemes of Work', icon: <I d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8"/> },
  { path: '/teacher/records',      label: 'Records of Work', icon: <I d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 M12 12h.01 M12 16h.01"/> },
  { path: '/teacher/assessments',  label: 'Assessments',     icon: <I d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/> },
  { path: '/teacher/reports',      label: 'Report Cards',    icon: <I d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> },
  { path: '/teacher/students',     label: 'My Students',     icon: <I d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/> },
]

export default function TeacherDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Teacher Portal">
      <Routes>
        <Route index element={<TeacherHome />} />
        <Route path="schemes"     element={<ComingSoon label="Schemes of Work" phase="4" />} />
        <Route path="records"     element={<ComingSoon label="Records of Work" phase="5" />} />
        <Route path="assessments" element={<ComingSoon label="Assessments" phase="6" />} />
        <Route path="reports"     element={<ComingSoon label="Report Cards" phase="7" />} />
        <Route path="students"    element={<ComingSoon label="My Students" phase="2" />} />
      </Routes>
    </DashboardLayout>
  )
}
