// src/pages/admin/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AdminHome from './AdminHome'
import ComingSoon from '@/components/ui/ComingSoon'
import {
  HomeIcon, BookIcon, UsersIcon, UserIcon,
  FileTextIcon, CheckSquareIcon, BookOpenIcon,
  ShoppingBagIcon, SettingsIcon,
} from '@/components/ui/Icons'

const nav = [
  { path: '/admin',             label: 'Dashboard',       icon: <HomeIcon />,        end: true },
  { path: '/admin/classes',     label: 'Classes',          icon: <BookIcon /> },
  { path: '/admin/teachers',    label: 'Teachers',         icon: <UsersIcon /> },
  { path: '/admin/students',    label: 'Students',         icon: <UserIcon /> },
  { path: '/admin/schemes',     label: 'Schemes of Work',  icon: <FileTextIcon /> },
  { path: '/admin/assessments', label: 'Assessments',      icon: <CheckSquareIcon /> },
  { path: '/admin/reports',     label: 'Report Cards',     icon: <BookOpenIcon /> },
  { path: '/admin/tenders',     label: 'Tenders',          icon: <ShoppingBagIcon /> },
  { path: '/admin/settings',    label: 'Settings',         icon: <SettingsIcon /> },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout navItems={nav} title="School Admin">
      <Routes>
        <Route index                element={<AdminHome />} />
        <Route path="classes"       element={<ComingSoon label="Classes" phase="2" />} />
        <Route path="teachers"      element={<ComingSoon label="Teachers" phase="2" />} />
        <Route path="students"      element={<ComingSoon label="Students" phase="2" />} />
        <Route path="schemes"       element={<ComingSoon label="Schemes of Work" phase="4" />} />
        <Route path="assessments"   element={<ComingSoon label="Assessments" phase="6" />} />
        <Route path="reports"       element={<ComingSoon label="Report Cards" phase="7" />} />
        <Route path="tenders"       element={<ComingSoon label="Tenders" phase="9" />} />
        <Route path="settings"      element={<ComingSoon label="Settings" phase="2" />} />
      </Routes>
    </DashboardLayout>
  )
}
