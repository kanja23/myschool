// src/pages/auth/Unauthorised.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const ROLE_HOME = {
  superadmin: '/superadmin', admin: '/admin', teacher: '/teacher',
  student: '/student', parent: '/parent', supplier: '/supplier',
}

export default function Unauthorised() {
  const { role } = useAuth()
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-100 px-4">
      <div className="text-center max-w-sm animate-fade-in">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 className="text-xl font-display text-gray-900 mb-2">Access Denied</h2>
        <p className="text-sm text-gray-500 mb-6">
          You don't have permission to view this page. Please contact your school administrator.
        </p>
        <Link
          to={ROLE_HOME[role] ?? '/login'}
          className="btn-md btn-primary inline-flex"
        >
          Go to my dashboard
        </Link>
      </div>
    </div>
  )
}
