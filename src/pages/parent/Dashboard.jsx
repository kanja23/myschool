// src/pages/parent/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/context/AuthContext'
import ComingSoon from '@/components/ui/ComingSoon'

function I({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d.split(' M').filter(Boolean).map((seg, i) => <path key={i} d={'M' + seg} />)}
    </svg>
  )
}

const nav = [
  { path: '/parent',             label: 'Overview',         icon: <I d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>, end: true },
  { path: '/parent/reports',     label: 'Report Cards',     icon: <I d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> },
  { path: '/parent/progress',    label: 'Child Progress',   icon: <I d="M18 20V10 M12 20V4 M6 20v-6"/> },
  { path: '/parent/announcements',label:'Announcements',    icon: <I d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0"/> },
]

function ParentHome() {
  const { profile } = useAuth()
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <h2 className="text-2xl font-display">Welcome, {profile?.displayName?.split(' ')[0] ?? 'Parent'}</h2>
        <p className="text-primary-200 text-sm mt-1">Track your child's CBC progress and download report cards.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Child's Grade",    value: '—', icon: '🏫' },
          { label: 'Current Term',     value: '1', icon: '📅' },
          { label: 'Reports Available', value: '0', icon: '📄' },
        ].map(s => (
          <div key={s.label} className="stat-card border border-surface-200">
            <span className="text-xl">{s.icon}</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label text-xs">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">About CBC Report Cards</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Under the Competency Based Curriculum (CBC), your child is assessed per <strong>strand</strong> in each subject — not by a single percentage mark. Each strand receives one of four ratings:
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { code: 'EE', label: 'Exceeding Expectations', cls: 'badge-ee' },
            { code: 'ME', label: 'Meeting Expectations',   cls: 'badge-me' },
            { code: 'AE', label: 'Approaching Expectations',cls:'badge-ae' },
            { code: 'BE', label: 'Below Expectations',     cls: 'badge-be' },
          ].map(g => (
            <div key={g.code} className="flex items-center gap-2 p-2 rounded-lg bg-surface-50">
              <span className={`badge ${g.cls}`}>{g.code}</span>
              <span className="text-xs text-gray-600">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Parent Portal">
      <Routes>
        <Route index element={<ParentHome />} />
        <Route path="reports"       element={<ComingSoon label="Report Cards" phase="8" />} />
        <Route path="progress"      element={<ComingSoon label="Child Progress" phase="8" />} />
        <Route path="announcements" element={<ComingSoon label="Announcements" phase="8" />} />
      </Routes>
    </DashboardLayout>
  )
}
