// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '@/services/auth.service'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch {
      toast.error('Could not send reset email. Check the address and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-100 px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="card p-8">
          <div className="mb-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e7852" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 className="text-xl font-display text-gray-900">Reset your password</h2>
            <p className="text-sm text-gray-500 mt-1">We'll send a reset link to your email</p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Reset email sent! Check your inbox and follow the link to set a new password.
                </p>
              </div>
              <Link to="/login" className="btn-md btn-primary w-full block text-center">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email address</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@school.ac.ke"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-md btn-primary w-full">
                {loading ? <span className="spinner" /> : null}
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
              <Link to="/login" className="block text-center text-sm text-gray-500 hover:text-gray-700">
                ← Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
