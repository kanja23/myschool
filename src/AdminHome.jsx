// src/pages/teacher/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import TeacherHome from './TeacherHome'
import ComingSoon from '@/components/ui/ComingSoon'
import {
  HomeIcon, FileTextIcon, ClipboardIcon,
  CheckSquareIcon, BookOpenIcon, UserIcon,
} from '@/components/ui/Icons'

const nav = [
  { path: '/teacher',              label: 'Dashboard',       icon: <HomeIcon />,        end: true },
  { path: '/teacher/schemes',      label: 'Schemes of Work', icon: <FileTextIcon /> },
  { path: '/teacher/records',      label: 'Records of Work', icon: <ClipboardIcon /> },
  { path: '/teacher/assessments',  label: 'Assessments',     icon: <CheckSquareIcon /> },
  { path: '/teacher/reports',      label: 'Report Cards',    icon: <BookOpenIcon /> },
  { path: '/teacher/students',     label: 'My Students',     icon: <UserIcon /> },
]

export default function TeacherDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Teacher Portal">
      <Routes>
        <Route index            element={<TeacherHome />} />
        <Route path="schemes"   element={<ComingSoon label="Schemes of Work" phase="4" />} />
        <Route path="records"   element={<ComingSoon label="Records of Work" phase="5" />} />
        <Route path="assessments" element={<ComingSoon label="Assessments" phase="6" />} />
        <Route path="reports"   element={<ComingSoon label="Report Cards" phase="7" />} />
        <Route path="students"  element={<ComingSoon label="My Students" phase="2" />} />
      </Routes>
    </DashboardLayout>
  )
}
