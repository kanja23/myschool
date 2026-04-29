// src/pages/auth/LoginPage.jsx
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signIn } from '@/services/auth.service'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const ROLE_HOME = { superadmin:'/superadmin', admin:'/admin', teacher:'/teacher', student:'/student', parent:'/parent', supplier:'/supplier' }

const S = {
  input: { width:'100%', padding:'11px 14px', borderRadius:12, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:'inherit', background:'white' },
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const { profile } = useAuth()

  if (profile?.active) {
    navigate(ROLE_HOME[profile.role] ?? '/', { replace: true })
    return null
  }
  if (profile && !profile.active) {
    navigate('/pending', { replace: true })
    return null
  }

  const from = location.state?.from?.pathname ?? '/'

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { toast.error('Please enter your email and password'); return }
    setLoading(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(
        err.code === 'auth/invalid-credential'  ? 'Incorrect email or password.' :
        err.code === 'auth/too-many-requests'    ? 'Too many attempts. Try again later.' :
        'Sign in failed. Please try again.'
      )
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', fontFamily:"'DM Sans',sans-serif" }}>
      {/* Left — branding */}
      <div style={{ display:'none', width:'52%', flexDirection:'column', justifyContent:'space-between', padding:48, background:'linear-gradient(135deg,#0a2419,#14402e,#1e7852)', position:'relative', overflow:'hidden' }}
        className="lg-flex">
        <style>{`@media(min-width:1024px){.lg-flex{display:flex!important}}`}</style>

        {/* BG orb */}
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.2),transparent)', filter:'blur(60px)', pointerEvents:'none' }}/>

        <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative' }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 10v2h24v-2L16 4z" fill="white" fillOpacity=".95"/>
              <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
              <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
            </svg>
          </div>
          <span style={{ fontFamily:'Georgia,serif', fontSize:20, color:'white', fontWeight:600 }}>MySchool</span>
        </div>

        <div style={{ position:'relative', maxWidth:380 }}>
          <h2 style={{ fontFamily:'Georgia,serif', fontSize:40, color:'white', lineHeight:1.2, margin:'0 0 20px', fontWeight:400 }}>
            Kenya's CBC school management platform
          </h2>
          <p style={{ color:'rgba(167,216,190,0.8)', fontSize:16, lineHeight:1.7, margin:'0 0 32px' }}>
            Teaching plans, report cards, parent portal — all CBC compliant and KICD 2025 aligned.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['PP1 – Grade 6','CBC KICD 2025','EE / ME / AE / BE','PDF reports','Multi-school'].map(f => (
              <span key={f} style={{ padding:'6px 14px', borderRadius:999, fontSize:12, fontWeight:500, color:'rgba(167,216,190,0.9)', border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.07)' }}>{f}</span>
            ))}
          </div>
        </div>

        <p style={{ color:'rgba(167,216,190,0.4)', fontSize:12, position:'relative' }}>Aligned with KICD CBC 2024/2025 · PP1 to Grade 6</p>
      </div>

      {/* Right — form */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'white', padding:'40px 24px' }}>
        <div style={{ width:'100%', maxWidth:380, animation:'fadeIn 0.4s ease-out' }}>
          {/* Mobile logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:32 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10v2h24v-2L16 4z" fill="white" fillOpacity=".95"/>
                <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
                <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
              </svg>
            </div>
            <span style={{ fontFamily:'Georgia,serif', fontSize:18, color:'#111', fontWeight:600 }}>MySchool</span>
          </div>

          <h1 style={{ fontFamily:'Georgia,serif', fontSize:28, color:'#111', margin:'0 0 6px', fontWeight:400 }}>Welcome back</h1>
          <p style={{ color:'#9ca3af', fontSize:14, margin:'0 0 32px' }}>Sign in to your school account</p>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@school.ac.ke"
                style={S.input}
                onFocus={e => e.target.style.borderColor='#1e7852'}
                onBlur={e => e.target.style.borderColor='#e5e7eb'} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Password</label>
              <div style={{ position:'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password"
                  style={{ ...S.input, paddingRight:44 }}
                  onFocus={e => e.target.style.borderColor='#1e7852'}
                  onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16 }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              <div style={{ textAlign:'right', marginTop:6 }}>
                <Link to="/forgot" style={{ fontSize:12, color:'#1e7852', fontWeight:600, textDecoration:'none' }}>Forgot password?</Link>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ padding:'13px', borderRadius:14, border:'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight:700, fontSize:15, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', boxShadow:'0 4px 16px rgba(30,120,82,0.3)', opacity: loading ? 0.75 : 1, fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {loading && <span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.35)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div style={{ marginTop:28, padding:16, borderRadius:14, background:'#f8faf8', border:'1px solid #e5e7eb' }}>
            <p style={{ fontSize:12, color:'#9ca3af', fontWeight:600, marginBottom:8, textTransform:'uppercase', letterSpacing:0.5 }}>Who can sign in</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {['School Admin','Teacher','Student','Parent','Supplier'].map(r => (
                <span key={r} style={{ fontSize:12, padding:'4px 10px', borderRadius:999, background:'#e5e7eb', color:'#4b5563', fontWeight:500 }}>{r}</span>
              ))}
            </div>
          </div>

          <p style={{ textAlign:'center', marginTop:24, fontSize:14, color:'#9ca3af' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color:'#1e7852', fontWeight:700, textDecoration:'none' }}>Sign up free</Link>
          </p>
          <p style={{ textAlign:'center', marginTop:12, fontSize:12, color:'#d1d5db' }}>© {new Date().getFullYear()} MySchool · CBC Platform for Kenya</p>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
