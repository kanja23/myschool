// src/pages/auth/LoginPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { signIn } from '@/services/auth.service'
import { useAuth } from '@/context/AuthContext'
import { SchoolIcon, EyeIcon, EyeOffIcon } from '@/components/ui/Icons'
import toast from 'react-hot-toast'

const ROLE_HOME = {
  superadmin: '/superadmin', admin: '/admin', teacher: '/teacher',
  student: '/student', parent: '/parent', supplier: '/supplier',
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const { profile } = useAuth()

  if (profile) {
    navigate(ROLE_HOME[profile.role] ?? '/', { replace: true })
    return null
  }

  const from = location.state?.from?.pathname

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { toast.error('Please enter your email and password'); return }
    setLoading(true)
    try {
      await signIn(email, password)
      navigate(from ?? '/', { replace: true })
    } catch (err) {
      const msg =
        err.code === 'auth/invalid-credential'   ? 'Incorrect email or password.' :
        err.code === 'auth/too-many-requests'     ? 'Too many attempts. Try again later.' :
        'Sign in failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — branding */}
      <div className="hidden lg:flex lg:w-[52%] auth-bg flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <SchoolIcon size={36} />
          <span className="text-white text-xl font-display tracking-wide">MySchool</span>
        </div>

        <div className="space-y-6 max-w-sm">
          <h1 className="text-4xl font-display text-white leading-tight">
            Kenya's CBC school management platform
          </h1>
          <p className="text-primary-200 text-base leading-relaxed">
            Scheme of work generation, CBC report cards, assessments, and parent communication — all in one place.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['PP1 – Grade 6','CBC compliant','EE / ME / AE / BE','PDF reports','Parent portal'].map(f => (
              <span key={f} className="px-3 py-1 rounded-full bg-primary-800/60 text-primary-100 text-xs font-medium border border-primary-700/50">
                {f}
              </span>
            ))}
          </div>
        </div>

        <p className="text-primary-400 text-xs">
          Aligned with KICD CBC 2024/25 · PP1 to Grade 6
        </p>
      </div>

      {/* Right — form */}
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
            <div>
              <label className="label" htmlFor="email">Email address</label>
              <input
                id="email" type="email" autoComplete="email"
                className="input" placeholder="you@school.ac.ke"
                value={email} onChange={e => setEmail(e.target.value)} required
              />
            </div>

            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password" type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="input pr-10" placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)} required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot" className="text-xs text-primary-700 hover:text-primary-900 font-medium">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="btn-md btn-primary w-full mt-2">
              {loading && <span className="spinner" />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-surface-100 rounded-xl border border-surface-200">
            <p className="text-xs text-gray-500 font-medium mb-2">Who can sign in?</p>
            <div className="flex flex-wrap gap-1.5">
              {['School Admin','Teacher','Student','Parent','Supplier'].map(r => (
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
