// src/pages/auth/LoginPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { signIn } from '@/services/auth.service'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const ROLE_HOME = {
  superadmin: '/superadmin',
  admin:      '/admin',
  teacher:    '/teacher',
  student:    '/student',
  parent:     '/parent',
  supplier:   '/supplier',
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const { profile } = useAuth()

  // If already logged in, redirect
  if (profile) {
    navigate(ROLE_HOME[profile.role] ?? '/', { replace: true })
    return null
  }

  const from = location.state?.from?.pathname

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter your email and password')
      return
    }
    setLoading(true)
    try {
      await signIn(email, password)
      // AuthContext will update — RootRedirect handles navigation
      // but we can push to 'from' if it exists
      navigate(from ?? '/', { replace: true })
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Incorrect email or password.'
        : err.code === 'auth/too-many-requests'
        ? 'Too many attempts. Try again later.'
        : 'Sign in failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — branding ──────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] auth-bg flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <SchoolIcon />
          <span className="text-white text-xl font-display tracking-wide">MySchool</span>
        </div>

        {/* Main copy */}
        <div className="space-y-6 max-w-sm">
          <h1 className="text-4xl font-display text-white leading-tight">
            Kenya's CBC school management platform
          </h1>
          <p className="text-primary-200 text-base leading-relaxed">
            Scheme of work generation, CBC report cards, assessments, and parent communication — all in one place.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['PP1 – Grade 6', 'CBC compliant', 'EE / ME / AE / BE', 'PDF reports', 'Parent portal'].map(f => (
              <span key={f} className="px-3 py-1 rounded-full bg-primary-800/60 text-primary-100 text-xs font-medium border border-primary-700/50">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <p className="text-primary-400 text-xs">
          "Nurturing every learner's potential" — aligned with KICD CBC 2024/25
        </p>
      </div>

      {/* ── Right panel — form ─────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <SchoolIcon size={28} />
            <span className="text-gray-900 text-lg font-display">MySchool</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display text-gray-900">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to your school account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="input"
                placeholder="you@school.ac.ke"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="input pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <Link to="/forgot" className="text-xs text-primary-700 hover:text-primary-900 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-md btn-primary w-full mt-2"
            >
              {loading ? <span className="spinner" /> : null}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Role hint */}
          <div className="mt-8 p-4 bg-surface-100 rounded-xl border border-surface-200">
            <p className="text-xs text-gray-500 font-medium mb-2">Who can sign in?</p>
            <div className="flex flex-wrap gap-1.5">
              {['School Admin', 'Teacher', 'Student', 'Parent', 'Supplier'].map(r => (
                <span key={r} className="badge bg-surface-200 text-gray-600">{r}</span>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} MySchool · CBC Platform for Kenya
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Inline micro-icons (no extra deps) ────────────────
function SchoolIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1e7852"/>
      <path d="M16 7L6 12v1h20v-1L16 7z" fill="white" fillOpacity=".9"/>
      <rect x="8"  y="13" width="3" height="8" rx="1" fill="white" fillOpacity=".8"/>
      <rect x="14.5" y="13" width="3" height="8" rx="1" fill="white" fillOpacity=".8"/>
      <rect x="21" y="13" width="3" height="8" rx="1" fill="white" fillOpacity=".8"/>
      <rect x="6"  y="21" width="20" height="2" rx="1" fill="white"/>
      <rect x="13" y="16" width="6" height="7" rx="1" fill="#f59e0b"/>
    </svg>
  )
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
