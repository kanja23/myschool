// src/routes/guards.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

function LoadingScreen() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8faf8' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
        <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid #dcf1e6', borderTopColor:'#1e7852', animation:'spin 0.8s linear infinite' }}/>
        <p style={{ fontSize:14, color:'#9ca3af', fontFamily:"'DM Sans',sans-serif" }}>Loading…</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isPending, loading } = useAuth()
  const location = useLocation()
  if (loading)          return <LoadingScreen />
  if (isPending)        return <Navigate to="/pending" replace />
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export function RoleRoute({ children, roles }) {
  const { isAuthenticated, isPending, loading, role } = useAuth()
  const location = useLocation()
  if (loading)               return <LoadingScreen />
  if (isPending)             return <Navigate to="/pending" replace />
  if (!isAuthenticated)      return <Navigate to="/login" state={{ from: location }} replace />
  if (!roles.includes(role)) return <Navigate to="/unauthorised" replace />
  return children
}
