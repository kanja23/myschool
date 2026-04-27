// src/components/layout/DashboardLayout.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { SchoolIcon, LogOutIcon, MenuIcon } from '@/components/ui/Icons'
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
  superadmin: 'bg-purple-100 text-purple-800',
  admin:      'bg-primary-100 text-primary-800',
  teacher:    'bg-blue-100 text-blue-800',
  student:    'bg-amber-100 text-amber-800',
  parent:     'bg-pink-100 text-pink-800',
  supplier:   'bg-gray-100 text-gray-700',
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
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 bg-primary-900 flex flex-col transition-transform duration-300',
        'lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-primary-800 flex items-center gap-3">
          <SchoolIcon size={32} />
          <div>
            <p className="text-white font-display text-base leading-tight">MySchool</p>
            <p className="text-primary-400 text-2xs">CBC Platform</p>
          </div>
        </div>

        {/* Nav */}
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
              {item.badge && (
                <span className="ml-auto bg-accent-500 text-white text-2xs font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + sign out */}
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
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary-200 hover:bg-primary-800 hover:text-white transition-colors border border-primary-700"
          >
            <LogOutIcon size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-surface-200 px-5 h-14 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-surface-100 text-gray-500"
              onClick={() => setSidebarOpen(v => !v)}
            >
              <MenuIcon size={18} />
            </button>
            <h1 className="text-base font-semibold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-100 rounded-lg">
              <span className="text-xs text-gray-500">Term</span>
              <span className="text-xs font-semibold text-gray-700">
                {profile?.currentTerm ?? 1} · {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}
