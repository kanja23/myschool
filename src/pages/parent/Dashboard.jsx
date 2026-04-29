// src/pages/parent/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/context/AuthContext'
import ComingSoon from '@/components/ui/ComingSoon'
import { HomeIcon, BookOpenIcon, BarChartIcon, BellIcon } from '@/components/ui/Icons'

const nav = [
  { path: '/parent',              label: 'Overview',      icon: <HomeIcon />, end: true },
  { path: '/parent/reports',      label: 'Report Cards',  icon: <BookOpenIcon /> },
  { path: '/parent/progress',     label: 'Child Progress',icon: <BarChartIcon /> },
  { path: '/parent/announcements',label: 'Announcements', icon: <BellIcon /> },
]

function ParentHome() {
  const { profile } = useAuth()
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <h2 className="text-2xl font-display">
          Welcome, {profile?.displayName?.split(' ')[0] ?? 'Parent'}
        </h2>
        <p className="text-primary-200 text-sm mt-1">
          Track your child's CBC progress and download report cards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Child's Grade",     value: '—', icon: '🏫' },
          { label: 'Current Term',      value: '1', icon: '📅' },
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
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Understanding CBC Report Cards</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Under the Competency Based Curriculum (CBC), your child is assessed per <strong>strand</strong> in each subject — not by a single percentage mark. Each strand receives one of four ratings:
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { code: 'EE', label: 'Exceeding Expectations',  cls: 'badge-ee' },
            { code: 'ME', label: 'Meeting Expectations',    cls: 'badge-me' },
            { code: 'AE', label: 'Approaching Expectations',cls: 'badge-ae' },
            { code: 'BE', label: 'Below Expectations',      cls: 'badge-be' },
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
        <Route index              element={<ParentHome />} />
        <Route path="reports"     element={<ComingSoon label="Report Cards" phase="8" />} />
        <Route path="progress"    element={<ComingSoon label="Child Progress" phase="8" />} />
        <Route path="announcements" element={<ComingSoon label="Announcements" phase="8" />} />
      </Routes>
    </DashboardLayout>
  )
}
