// src/pages/student/Dashboard.jsx
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
  { path: '/student',          label: 'My Dashboard', icon: <I d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>, end: true },
  { path: '/student/reports',  label: 'My Reports',   icon: <I d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> },
  { path: '/student/progress', label: 'My Progress',  icon: <I d="M18 20V10 M12 20V4 M6 20v-6"/> },
]

function StudentHome() {
  const { profile } = useAuth()
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <h2 className="text-2xl font-display">Hello, {profile?.displayName?.split(' ')[0] ?? 'Learner'} 👋</h2>
        <p className="text-primary-200 text-sm mt-1">View your CBC report cards and progress here.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">My CBC Grades</h3>
          <p className="text-sm text-gray-400">Your assessment results will appear here once your teacher enters them.</p>
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Reports</h3>
          <p className="text-sm text-gray-400">Your report cards will appear here at the end of each term.</p>
        </div>
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Learner Portal">
      <Routes>
        <Route index element={<StudentHome />} />
        <Route path="reports"  element={<ComingSoon label="My Reports" phase="7" />} />
        <Route path="progress" element={<ComingSoon label="My Progress" phase="7" />} />
      </Routes>
    </DashboardLayout>
  )
}
