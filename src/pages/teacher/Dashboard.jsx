// src/pages/teacher/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import TeacherHome  from './TeacherHome'
import Plans        from './Plans'
import Records      from './Records'
import Assessments  from './Assessments'
import ReportCards  from './ReportCards'
import ComingSoon   from '@/components/ui/ComingSoon'
import { HomeIcon, FileTextIcon, ClipboardIcon, CheckSquareIcon, BookOpenIcon, UserIcon } from '@/components/ui/Icons'

const nav = [
  { path:'/teacher',             label:'Dashboard',       icon:<HomeIcon />,        end:true },
  { path:'/teacher/plans',       label:'Teaching Plans',  icon:<FileTextIcon /> },
  { path:'/teacher/records',     label:'Records of Work', icon:<ClipboardIcon /> },
  { path:'/teacher/assessments', label:'Assessments',     icon:<CheckSquareIcon /> },
  { path:'/teacher/reports',     label:'Report Cards',    icon:<BookOpenIcon /> },
  { path:'/teacher/students',    label:'My Students',     icon:<UserIcon /> },
]

export default function TeacherDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Teacher Portal">
      <Routes>
        <Route index              element={<TeacherHome />} />
        <Route path="plans"       element={<Plans />} />
        <Route path="records"     element={<Records />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="reports"     element={<ReportCards />} />
        <Route path="students"    element={<ComingSoon label="My Students" phase="3" />} />
      </Routes>
    </DashboardLayout>
  )
}
