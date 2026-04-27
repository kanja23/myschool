// src/pages/superadmin/Dashboard.jsx
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
  { path: '/superadmin',           label: 'Platform Overview', icon: <I d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>, end: true },
  { path: '/superadmin/schools',   label: 'All Schools',       icon: <I d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/> },
  { path: '/superadmin/users',     label: 'All Users',         icon: <I d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"/> },
  { path: '/superadmin/curriculum', label: 'CBC Curriculum',   icon: <I d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8"/> },
  { path: '/superadmin/billing',   label: 'Billing',           icon: <I d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M1 10h22"/> },
  { path: '/superadmin/analytics', label: 'Analytics',         icon: <I d="M18 20V10 M12 20V4 M6 20v-6"/> },
]

function SuperAdminHome() {
  const { profile } = useAuth()
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-purple-900 to-purple-800 p-6 text-white">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-700/60 rounded-full text-xs font-medium text-purple-200 mb-3">
          ⚡ Super Admin
        </span>
        <h2 className="text-2xl font-display">Platform Overview</h2>
        <p className="text-purple-300 text-sm mt-1">MySchool CBC Platform · Kenya</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Schools',         value: '1',   color: 'bg-purple-50 border-purple-200', icon: '🏫' },
          { label: 'Total Users',     value: '1',   color: 'bg-blue-50 border-blue-200',     icon: '👥' },
          { label: 'Active Trials',   value: '1',   color: 'bg-amber-50 border-amber-200',   icon: '⏳' },
          { label: 'Paid Schools',    value: '0',   color: 'bg-green-50 border-green-200',   icon: '✅' },
        ].map(s => (
          <div key={s.label} className={`stat-card border ${s.color}`}>
            <span className="text-xl">{s.icon}</span>
            <span className="stat-value text-2xl">{s.value}</span>
            <span className="stat-label text-xs">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Schools</h3>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th>County</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400 text-sm">
                  No schools onboarded yet. Create your first school to begin.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Super Admin">
      <Routes>
        <Route index element={<SuperAdminHome />} />
        <Route path="schools"    element={<ComingSoon label="All Schools" phase="2" />} />
        <Route path="users"      element={<ComingSoon label="All Users" phase="2" />} />
        <Route path="curriculum" element={<ComingSoon label="CBC Curriculum Manager" phase="3" />} />
        <Route path="billing"    element={<ComingSoon label="Billing" phase="10" />} />
        <Route path="analytics"  element={<ComingSoon label="Analytics" phase="10" />} />
      </Routes>
    </DashboardLayout>
  )
}
