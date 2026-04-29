// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '@/services/auth.service'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch {
      toast.error('Could not send reset email. Check the address and try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#f8faf8,#f0f9f4)', fontFamily:"'DM Sans',sans-serif", padding:20 }}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0' }}>
              <span style={{ color:'white', fontWeight:700, fontSize:16 }}>M</span>
            </div>
            <span style={{ fontFamily:'Georgia,serif', fontSize:18, color:'#111', fontWeight:600 }}>MySchool</span>
          </Link>
        </div>

        <div style={{ background:'white', borderRadius:24, padding:36, boxShadow:'0 4px 24px rgba(0,0,0,0.07)', border:'1px solid #e5e7eb' }}>
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'#f0f9f4', border:'2px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:24 }}>🔑</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:24, color:'#111', margin:'0 0 6px', fontWeight:400 }}>Reset your password</h2>
            <p style={{ color:'#9ca3af', fontSize:14, margin:0 }}>We'll send a reset link to your email</p>
          </div>

          {sent ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ padding:16, borderRadius:12, background:'#f0fdf4', border:'1px solid #bbf7d0', marginBottom:20 }}>
                <p style={{ fontSize:14, color:'#15803d', margin:0, lineHeight:1.6 }}>✅ Reset email sent! Check your inbox and follow the link to set a new password.</p>
              </div>
              <Link to="/login" style={{ display:'block', padding:'12px', borderRadius:14, background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, textDecoration:'none', textAlign:'center' }}>
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@school.ac.ke"
                  style={{ width:'100%', padding:'11px 14px', borderRadius:12, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}
                  onFocus={e => e.target.style.borderColor='#1e7852'}
                  onBlur={e => e.target.style.borderColor='#e5e7eb'} />
              </div>
              <button type="submit" disabled={loading}
                style={{ padding:'12px', borderRadius:14, border:'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight:700, fontSize:14, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                {loading && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
              <Link to="/login" style={{ textAlign:'center', fontSize:14, color:'#9ca3af', textDecoration:'none' }}>← Back to sign in</Link>
            </form>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
