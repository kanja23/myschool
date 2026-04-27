// src/pages/supplier/Dashboard.jsx
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
  { path: '/supplier',          label: 'Overview',      icon: <I d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>, end: true },
  { path: '/supplier/tenders',  label: 'Open Tenders',  icon: <I d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0"/> },
  { path: '/supplier/applied',  label: 'My Applications', icon: <I d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/> },
  { path: '/supplier/profile',  label: 'My Profile',    icon: <I d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/> },
]

function SupplierHome() {
  const { profile } = useAuth()
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <h2 className="text-2xl font-display">Welcome, {profile?.displayName?.split(' ')[0] ?? 'Supplier'}</h2>
        <p className="text-primary-200 text-sm mt-1">Browse open tenders from schools and submit expressions of interest.</p>
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Open Tenders</h3>
        <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400">
          <span className="text-3xl">📦</span>
          <p className="text-sm">No open tenders yet.</p>
          <p className="text-xs">Check back when schools post procurement opportunities.</p>
        </div>
      </div>
    </div>
  )
}

export default function SupplierDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Supplier Portal">
      <Routes>
        <Route index element={<SupplierHome />} />
        <Route path="tenders" element={<ComingSoon label="Open Tenders" phase="9" />} />
        <Route path="applied" element={<ComingSoon label="My Applications" phase="9" />} />
        <Route path="profile" element={<ComingSoon label="My Profile" phase="9" />} />
      </Routes>
    </DashboardLayout>
  )
}
