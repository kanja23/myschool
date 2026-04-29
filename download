// src/pages/superadmin/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/context/AuthContext'
import ComingSoon from '@/components/ui/ComingSoon'
import {
  HomeIcon, BookIcon, UsersIcon,
  FileTextIcon, CreditCardIcon, BarChartIcon,
} from '@/components/ui/Icons'

const nav = [
  { path: '/superadmin',            label: 'Platform Overview', icon: <HomeIcon />,       end: true },
  { path: '/superadmin/schools',    label: 'All Schools',       icon: <BookIcon /> },
  { path: '/superadmin/users',      label: 'All Users',         icon: <UsersIcon /> },
  { path: '/superadmin/curriculum', label: 'CBC Curriculum',    icon: <FileTextIcon /> },
  { path: '/superadmin/billing',    label: 'Billing',           icon: <CreditCardIcon /> },
  { path: '/superadmin/analytics',  label: 'Analytics',         icon: <BarChartIcon /> },
]

function SuperAdminHome() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-purple-900 to-purple-800 p-6 text-white">
        <span className="inline-flex items-center px-2.5 py-1 bg-purple-700/60 rounded-full text-xs font-medium text-purple-200 mb-3">
          ⚡ Super Admin
        </span>
        <h2 className="text-2xl font-display">Platform Overview</h2>
        <p className="text-purple-300 text-sm mt-1">MySchool CBC Platform · Kenya</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Schools',      value: '0', color: 'bg-purple-50 border-purple-200', icon: '🏫' },
          { label: 'Total Users',  value: '1', color: 'bg-blue-50   border-blue-200',   icon: '👥' },
          { label: 'Active Trials',value: '0', color: 'bg-amber-50  border-amber-200',  icon: '⏳' },
          { label: 'Paid Schools', value: '0', color: 'bg-green-50  border-green-200',  icon: '✅' },
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
                  No schools onboarded yet. Phase 2 adds school creation.
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
        <Route index             element={<SuperAdminHome />} />
        <Route path="schools"    element={<ComingSoon label="All Schools" phase="2" />} />
        <Route path="users"      element={<ComingSoon label="All Users" phase="2" />} />
        <Route path="curriculum" element={<ComingSoon label="CBC Curriculum Manager" phase="3" />} />
        <Route path="billing"    element={<ComingSoon label="Billing" phase="10" />} />
        <Route path="analytics"  element={<ComingSoon label="Analytics" phase="10" />} />
      </Routes>
    </DashboardLayout>
  )
}
