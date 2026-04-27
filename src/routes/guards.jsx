// src/routes/guards.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

// Shows a full-screen loader while auth state resolves
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary-200 border-t-primary-700 animate-spin" />
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    </div>
  )
}

// Requires any authenticated user
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

// Requires specific role(s)
export function RoleRoute({ children, roles }) {
  const { isAuthenticated, loading, role } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  if (!roles.includes(role)) return <Navigate to="/unauthorised" replace />
  return children
}
