// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

// Public
import LandingPage    from '@/pages/landing/LandingPage'
import LoginPage      from '@/pages/auth/LoginPage'
import SignupPage     from '@/pages/auth/SignupPage'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import PendingApproval from '@/pages/auth/PendingApproval'
import Unauthorised   from '@/pages/auth/Unauthorised'

// Role dashboards
import SuperAdminDashboard from '@/pages/superadmin/Dashboard'
import AdminDashboard      from '@/pages/admin/Dashboard'
import TeacherDashboard    from '@/pages/teacher/Dashboard'
import StudentDashboard    from '@/pages/student/Dashboard'
import ParentDashboard     from '@/pages/parent/Dashboard'
import SupplierDashboard   from '@/pages/supplier/Dashboard'

// Guards
import { ProtectedRoute, RoleRoute } from './guards'

const ROLE_HOME = { superadmin:'/superadmin', admin:'/admin', teacher:'/teacher', student:'/student', parent:'/parent', supplier:'/supplier' }

function RootRedirect() {
  const { isAuthenticated, isPending, role, loading } = useAuth()
  if (loading) return null
  if (isPending)       return <Navigate to="/pending"            replace />
  if (!isAuthenticated) return <Navigate to="/"                  replace />
  return                       <Navigate to={ROLE_HOME[role] ?? '/login'} replace />
}

export default function AppRouter() {
  return (
    <Routes>
      {/* ── Public ──────────────────────────────────────── */}
      <Route path="/"        element={<LandingPage />} />
      <Route path="/login"   element={<LoginPage />} />
      <Route path="/signup"  element={<SignupPage />} />
      <Route path="/forgot"  element={<ForgotPassword />} />
      <Route path="/pending" element={<PendingApproval />} />
      <Route path="/unauthorised" element={<Unauthorised />} />
      <Route path="/dashboard"    element={<RootRedirect />} />

      {/* ── Protected roles ─────────────────────────────── */}
      <Route path="/superadmin/*" element={<RoleRoute roles={['superadmin']}><SuperAdminDashboard /></RoleRoute>} />
      <Route path="/admin/*"      element={<RoleRoute roles={['admin']}><AdminDashboard /></RoleRoute>} />
      <Route path="/teacher/*"    element={<RoleRoute roles={['teacher','admin']}><TeacherDashboard /></RoleRoute>} />
      <Route path="/student/*"    element={<RoleRoute roles={['student']}><StudentDashboard /></RoleRoute>} />
      <Route path="/parent/*"     element={<RoleRoute roles={['parent']}><ParentDashboard /></RoleRoute>} />
      <Route path="/supplier/*"   element={<RoleRoute roles={['supplier']}><SupplierDashboard /></RoleRoute>} />

      {/* ── Catch-all ───────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
