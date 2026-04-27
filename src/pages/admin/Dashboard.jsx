// src/pages/admin/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AdminHome from './AdminHome'
import ComingSoon from '@/components/ui/ComingSoon'

const nav = [
  { path: '/admin',             label: 'Dashboard',       icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>, end: true },
  { path: '/admin/classes',     label: 'Classes',          icon: <Icon d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/> },
  { path: '/admin/teachers',    label: 'Teachers',         icon: <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"/> },
  { path: '/admin/students',    label: 'Students',         icon: <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/> },
  { path: '/admin/schemes',     label: 'Schemes of Work',  icon: <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/> },
  { path: '/admin/assessments', label: 'Assessments',      icon: <Icon d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/> },
  { path: '/admin/reports',     label: 'Report Cards',     icon: <Icon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> },
  { path: '/admin/tenders',     label: 'Tenders',          icon: <Icon d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0"/> },
  { path: '/admin/settings',    label: 'Settings',         icon: <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/> },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout navItems={nav} title="School Admin">
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="classes"     element={<ComingSoon label="Classes" phase="2" />} />
        <Route path="teachers"    element={<ComingSoon label="Teachers" phase="2" />} />
        <Route path="students"    element={<ComingSoon label="Students" phase="2" />} />
        <Route path="schemes"     element={<ComingSoon label="Schemes of Work" phase="4" />} />
        <Route path="assessments" element={<ComingSoon label="Assessments" phase="6" />} />
        <Route path="reports"     element={<ComingSoon label="Report Cards" phase="7" />} />
        <Route path="tenders"     element={<ComingSoon label="Tenders" phase="9" />} />
        <Route path="settings"    element={<ComingSoon label="School Settings" phase="2" />} />
      </Routes>
    </DashboardLayout>
  )
}

function Icon({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d.split(' M').filter(Boolean).map((seg, i) => (
        <path key={i} d={'M' + seg} />
      ))}
    </svg>
  )
}
