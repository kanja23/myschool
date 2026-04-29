// src/pages/supplier/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/context/AuthContext'
import ComingSoon from '@/components/ui/ComingSoon'
import { HomeIcon, ShoppingBagIcon, CheckSquareIcon, UserIcon } from '@/components/ui/Icons'

const nav = [
  { path: '/supplier',          label: 'Overview',        icon: <HomeIcon />, end: true },
  { path: '/supplier/tenders',  label: 'Open Tenders',    icon: <ShoppingBagIcon /> },
  { path: '/supplier/applied',  label: 'My Applications', icon: <CheckSquareIcon /> },
  { path: '/supplier/profile',  label: 'My Profile',      icon: <UserIcon /> },
]

function SupplierHome() {
  const { profile } = useAuth()
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <h2 className="text-2xl font-display">
          Welcome, {profile?.displayName?.split(' ')[0] ?? 'Supplier'}
        </h2>
        <p className="text-primary-200 text-sm mt-1">
          Browse open tenders from schools and submit expressions of interest.
        </p>
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
        <Route index          element={<SupplierHome />} />
        <Route path="tenders" element={<ComingSoon label="Open Tenders" phase="9" />} />
        <Route path="applied" element={<ComingSoon label="My Applications" phase="9" />} />
        <Route path="profile" element={<ComingSoon label="My Profile" phase="9" />} />
      </Routes>
    </DashboardLayout>
  )
}
