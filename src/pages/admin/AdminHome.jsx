// src/pages/admin/AdminHome.jsx
import { useAuth } from '@/context/AuthContext'

const GRADE_LEVELS = ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6']

const CBC_SUBJECTS = [
  { subject: 'English',             lessons: 5 },
  { subject: 'Kiswahili',            lessons: 4 },
  { subject: 'Mathematics',          lessons: 5 },
  { subject: 'Science & Technology', lessons: 4 },
  { subject: 'Social Studies',       lessons: 3 },
  { subject: 'Agriculture',          lessons: 4 },
  { subject: 'Creative Arts',        lessons: 6 },
  { subject: 'Religious Education',  lessons: 3 },
]

const SETUP_STEPS = [
  { step: 'School profile complete',           done: true  },
  { step: 'Add at least one class',            done: false },
  { step: 'Add teachers to their classes',     done: false },
  { step: 'Enrol students',                    done: false },
  { step: 'Generate Term 1 Scheme of Work',    done: false },
  { step: 'Enter first assessment results',    done: false },
]

export default function AdminHome() {
  const { profile } = useAuth()

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Welcome banner */}
      <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-700 p-6 text-white">
        <p className="text-primary-200 text-sm mb-1">
          Term {profile?.currentTerm ?? 1} · {new Date().getFullYear()}
        </p>
        <h2 className="text-2xl font-display">
          Welcome, {profile?.displayName?.split(' ')[0] ?? 'Admin'} 👋
        </h2>
        <p className="text-primary-200 text-sm mt-1">
          CBC school management — PP1 to Grade 6
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {['Add Teacher', 'Add Student', 'Generate Scheme', 'View Reports'].map(a => (
            <button
              key={a}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-medium transition-colors"
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Students',        value: '—', color: 'border-primary-200 bg-primary-50', icon: '👥' },
          { label: 'Teachers',        value: '—', color: 'border-blue-200 bg-blue-50',        icon: '🎓' },
          { label: 'Classes',         value: '—', color: 'border-amber-200 bg-amber-50',      icon: '🏫' },
          { label: 'Scheme Coverage', value: '0%',color: 'border-green-200 bg-green-50',      icon: '📋' },
        ].map(s => (
          <div key={s.label} className={`stat-card border ${s.color}`}>
            <span className="text-xl">{s.icon}</span>
            <span className="stat-value text-2xl">{s.value}</span>
            <span className="stat-label text-xs">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Two column */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Grade levels */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Grade Levels</h3>
          <div className="grid grid-cols-2 gap-2">
            {GRADE_LEVELS.map(g => (
              <div key={g} className="flex items-center justify-between px-3 py-2 bg-surface-50 rounded-lg border border-surface-200">
                <span className="text-sm text-gray-700">{g}</span>
                <span className="text-2xs text-gray-400 bg-surface-200 px-1.5 py-0.5 rounded-full">0 learners</span>
              </div>
            ))}
          </div>
        </div>

        {/* CBC subjects */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">CBC Learning Areas · Grade 4–6</h3>
          <p className="text-xs text-gray-400 mb-4">35 lessons/week · KICD 2024 rationalised</p>
          <div className="space-y-2.5">
            {CBC_SUBJECTS.map(s => (
              <div key={s.subject} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-44 flex-shrink-0">{s.subject}</span>
                <div className="flex-1 bg-surface-200 rounded-full h-1.5">
                  <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${(s.lessons / 6) * 100}%` }} />
                </div>
                <span className="text-2xs text-gray-400 w-14 text-right">{s.lessons} lessons</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup checklist */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Setup Checklist</h3>
        <div className="space-y-1">
          {SETUP_STEPS.map(({ step, done }) => (
            <div key={step} className="flex items-center gap-3 py-2.5 border-b border-surface-100 last:border-0">
              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${done ? 'bg-primary-600' : 'border-2 border-surface-300'}`}>
                {done && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
