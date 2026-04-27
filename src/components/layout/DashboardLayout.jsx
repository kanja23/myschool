// src/components/layout/DashboardLayout.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const ROLE_LABEL = {
  superadmin: 'Super Admin',
  admin:      'School Admin',
  teacher:    'Teacher',
  student:    'Student',
  parent:     'Parent',
  supplier:   'Supplier',
}

const ROLE_COLOR = {
  superadmin: 'role-superadmin',
  admin:      'role-admin',
  teacher:    'role-teacher',
  student:    'role-student',
  parent:     'role-parent',
  supplier:   'role-supplier',
}

export default function DashboardLayout({ navItems, children, title }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch {
      toast.error('Sign out failed')
    }
  }

  return (
    <div className="min-h-screen flex bg-surface-100">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 bg-primary-900 flex flex-col transition-transform duration-300',
        'lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-primary-800 flex items-center gap-3">
          <SchoolLogoSmall />
          <div>
            <p className="text-white font-display text-base leading-tight">MySchool</p>
            <p className="text-primary-400 text-2xs">CBC Platform</p>
          </div>
        </div>

        {/* School name (for non-superadmin) */}
        {profile?.schoolName && (
          <div className="px-5 py-3 border-b border-primary-800">
            <p className="text-primary-300 text-xs truncate">{profile.schoolName}</p>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                clsx('nav-item', isActive ? 'nav-item-active' : 'nav-item-inactive')
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto bg-accent-500 text-white text-2xs font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        {/* User info + sign out */}
        <div className="px-4 py-4 border-t border-primary-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {profile?.displayName?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.displayName}</p>
              <span className={clsx('badge text-2xs mt-0.5', ROLE_COLOR[profile?.role])}>
                {ROLE_LABEL[profile?.role]}
              </span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full nav-item nav-item-inactive text-sm justify-center border border-primary-700 rounded-lg"
          >
            <SignOutIcon />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-surface-200 px-5 h-14 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-surface-100 text-gray-500"
              onClick={() => setSidebarOpen(v => !v)}
            >
              <HamburgerIcon />
            </button>
            <h1 className="text-base font-semibold text-gray-800">{title}</h1>
          </div>

          {/* Header right */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-100 rounded-lg">
              <span className="text-xs text-gray-500">Term</span>
              <span className="text-xs font-semibold text-gray-700">
                {profile?.currentTerm ?? 1} · {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}

// ── Icons ───────────────────────────────────────────────
function SchoolLogoSmall() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#2e9468"/>
      <path d="M16 7L6 12v1h20v-1L16 7z" fill="white" fillOpacity=".9"/>
      <rect x="8"  y="13" width="3" height="8" rx="1" fill="white" fillOpacity=".8"/>
      <rect x="14.5" y="13" width="3" height="8" rx="1" fill="white" fillOpacity=".8"/>
      <rect x="21" y="13" width="3" height="8" rx="1" fill="white" fillOpacity=".8"/>
      <rect x="6"  y="21" width="20" height="2" rx="1" fill="white"/>
      <rect x="13" y="16" width="6" height="7" rx="1" fill="#f59e0b"/>
    </svg>
  )
}
function SignOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
function HamburgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
