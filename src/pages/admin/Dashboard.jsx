// src/pages/admin/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import DashboardLayout  from '@/components/layout/DashboardLayout'
import { useSchool }    from '@/hooks/useSchool'
import SchoolSetup      from './SchoolSetup'
import AdminHome        from './AdminHome'
import Classes          from './Classes'
import Teachers         from './Teachers'
import Students         from './Students'
import Announcements    from './Announcements'
import Settings         from './Settings'
import ComingSoon       from '@/components/ui/ComingSoon'
import {
  HomeIcon, BookIcon, UsersIcon, UserIcon,
  FileTextIcon, CheckSquareIcon, BookOpenIcon,
  ShoppingBagIcon, SettingsIcon, BellIcon,
} from '@/components/ui/Icons'

const nav = [
  { path:'/admin',              label:'Dashboard',         icon:<HomeIcon />,        end:true },
  { path:'/admin/classes',      label:'Classes',            icon:<BookIcon /> },
  { path:'/admin/teachers',     label:'Teachers & Users',   icon:<UsersIcon /> },
  { path:'/admin/students',     label:'Students',           icon:<UserIcon /> },
  { path:'/admin/schemes',      label:'Teaching Plans',     icon:<FileTextIcon /> },
  { path:'/admin/assessments',  label:'Assessments',        icon:<CheckSquareIcon /> },
  { path:'/admin/reports',      label:'Report Cards',       icon:<BookOpenIcon /> },
  { path:'/admin/announcements',label:'Announcements',      icon:<BellIcon /> },
  { path:'/admin/tenders',      label:'Tenders',            icon:<ShoppingBagIcon /> },
  { path:'/admin/settings',     label:'Settings',           icon:<SettingsIcon /> },
]

export default function AdminDashboard() {
  const { school, loading } = useSchool()

  if (!loading && school && !school.setupComplete) {
    return <SchoolSetup onComplete={() => {}} />
  }

  return (
    <DashboardLayout navItems={nav} title="School Admin">
      <Routes>
        <Route index                element={<AdminHome />} />
        <Route path="classes"       element={<Classes />} />
        <Route path="teachers"      element={<Teachers />} />
        <Route path="students"      element={<Students />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="settings"      element={<Settings />} />
        <Route path="schemes"       element={<ComingSoon label="Teaching Plans (Admin View)" phase="4" />} />
        <Route path="assessments"   element={<ComingSoon label="Assessments Overview" phase="5" />} />
        <Route path="reports"       element={<ComingSoon label="Report Cards Overview" phase="6" />} />
        <Route path="tenders"       element={<ComingSoon label="Tenders" phase="9" />} />
      </Routes>
    </DashboardLayout>
  )
}
