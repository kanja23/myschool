// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ProtectedRoute, RoleRoute } from './guards'

// Auth pages
import LoginPage       from '@/pages/auth/LoginPage'
import ForgotPassword  from '@/pages/auth/ForgotPassword'
import Unauthorised    from '@/pages/auth/Unauthorised'

// Role dashboards
import SuperAdminDashboard from '@/pages/superadmin/Dashboard'
import AdminDashboard      from '@/pages/admin/Dashboard'
import TeacherDashboard    from '@/pages/teacher/Dashboard'
import StudentDashboard    from '@/pages/student/Dashboard'
import ParentDashboard     from '@/pages/parent/Dashboard'
import SupplierDashboard   from '@/pages/supplier/Dashboard'

// Role → default route map
const ROLE_HOME = {
  superadmin: '/superadmin',
  admin:      '/admin',
  teacher:    '/teacher',
  student:    '/student',
  parent:     '/parent',
  supplier:   '/supplier',
}

function RootRedirect() {
  const { isAuthenticated, role, loading } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={ROLE_HOME[role] ?? '/login'} replace />
}

export default function AppRouter() {
  return (
    <Routes>
      {/* ── Public ───────────────────────────────────────────── */}
      <Route path="/"             element={<RootRedirect />} />
      <Route path="/login"        element={<LoginPage />} />
      <Route path="/forgot"       element={<ForgotPassword />} />
      <Route path="/unauthorised" element={<Unauthorised />} />

      {/* ── Super Admin ──────────────────────────────────────── */}
      <Route
        path="/superadmin/*"
        element={
          <RoleRoute roles={['superadmin']}>
            <SuperAdminDashboard />
          </RoleRoute>
        }
      />

      {/* ── School Admin ─────────────────────────────────────── */}
      <Route
        path="/admin/*"
        element={
          <RoleRoute roles={['admin']}>
            <AdminDashboard />
          </RoleRoute>
        }
      />

      {/* ── Teacher ──────────────────────────────────────────── */}
      <Route
        path="/teacher/*"
        element={
          <RoleRoute roles={['teacher', 'admin']}>
            <TeacherDashboard />
          </RoleRoute>
        }
      />

      {/* ── Student ──────────────────────────────────────────── */}
      <Route
        path="/student/*"
        element={
          <RoleRoute roles={['student']}>
            <StudentDashboard />
          </RoleRoute>
        }
      />

      {/* ── Parent ───────────────────────────────────────────── */}
      <Route
        path="/parent/*"
        element={
          <RoleRoute roles={['parent']}>
            <ParentDashboard />
          </RoleRoute>
        }
      />

      {/* ── Supplier ─────────────────────────────────────────── */}
      <Route
        path="/supplier/*"
        element={
          <RoleRoute roles={['supplier']}>
            <SupplierDashboard />
          </RoleRoute>
        }
      />

      {/* ── Catch-all ────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
