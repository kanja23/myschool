// src/pages/teacher/TeacherHome.jsx
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const CBC_GRADES = ['Grade 4', 'Grade 5', 'Grade 6']
const QUICK_ACTIONS = [
  { label: 'New Scheme of Work',  to: '/teacher/schemes',     emoji: '📋' },
  { label: 'Record of Work',      to: '/teacher/records',     emoji: '📝' },
  { label: 'Enter Assessment',    to: '/teacher/assessments', emoji: '✅' },
  { label: 'Generate Report',     to: '/teacher/reports',     emoji: '📄' },
]

export default function TeacherHome() {
  const { profile } = useAuth()

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Banner */}
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <p className="text-primary-200 text-sm">Term {profile?.currentTerm ?? 1} · {new Date().getFullYear()}</p>
        <h2 className="text-2xl font-display mt-1">
          Hello, {profile?.displayName?.split(' ')[0] ?? 'Teacher'} 👋
        </h2>
        <p className="text-primary-200 text-sm mt-1">
          Manage your classes, schemes, and CBC assessments from here.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map(a => (
          <Link
            key={a.label}
            to={a.to}
            className="card p-4 flex flex-col items-center gap-2 text-center hover:shadow-card-md transition-shadow group"
          >
            <span className="text-2xl">{a.emoji}</span>
            <span className="text-xs font-medium text-gray-600 group-hover:text-primary-700">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* This week summary */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">This Week's Classes</h3>
          <div className="space-y-2">
            {['Monday','Tuesday','Wednesday','Thursday','Friday'].map(day => (
              <div key={day} className="flex items-center gap-3 py-2 border-b border-surface-100 last:border-0">
                <span className="text-xs text-gray-400 w-20">{day}</span>
                <span className="text-xs text-gray-400 italic">No lessons scheduled yet</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">CBC Assessment Grades</h3>
          <p className="text-xs text-gray-400 mb-4">Per-competency rating system</p>
          <div className="space-y-3">
            {[
              { code: 'EE', label: 'Exceeding Expectations', cls: 'badge-ee', range: '80–100%' },
              { code: 'ME', label: 'Meeting Expectations',   cls: 'badge-me', range: '65–79%' },
              { code: 'AE', label: 'Approaching Expectations',cls:'badge-ae', range: '50–64%' },
              { code: 'BE', label: 'Below Expectations',     cls: 'badge-be', range: '0–49%'  },
            ].map(g => (
              <div key={g.code} className="flex items-center gap-3">
                <span className={`badge ${g.cls} w-8 justify-center`}>{g.code}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700">{g.label}</p>
                </div>
                <span className="text-2xs text-gray-400">{g.range}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-xs text-primary-700">
              CBC grades are per <strong>strand</strong>, not a single subject mark. Each sub-strand gets its own EE/ME/AE/BE rating.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
