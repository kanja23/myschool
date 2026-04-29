// src/pages/auth/SignupPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import toast from 'react-hot-toast'

const ROLES = [
  { id:'admin',    label:'School Admin',      emoji:'🏫', desc:'I manage a school — set up classes, teachers, and view all reports.', color:'#1e7852', border:'#2e9468', bg:'linear-gradient(135deg,#f0f9f4,#dcf1e6)' },
  { id:'teacher',  label:'Teacher',            emoji:'👩‍🏫', desc:'I teach classes — generate teaching plans and enter CBC assessments.', color:'#2563eb', border:'#3b82f6', bg:'linear-gradient(135deg,#eff6ff,#dbeafe)' },
  { id:'parent',   label:'Parent / Guardian',  emoji:'👨‍👩‍👧', desc:"I want to see my child's CBC report cards and school announcements.", color:'#d97706', border:'#f59e0b', bg:'linear-gradient(135deg,#fffbeb,#fef3c7)' },
  { id:'supplier', label:'Supplier',            emoji:'📦', desc:'I supply goods or services to schools — I want to browse open tenders.', color:'#0891b2', border:'#06b6d4', bg:'linear-gradient(135deg,#ecfeff,#cffafe)' },
]

const S = {
  page:    { minHeight:'100vh', background:'linear-gradient(135deg,#f8faf8,#f0f9f4)', fontFamily:"'DM Sans',sans-serif" },
  topbar:  { padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' },
  logo:    { display:'flex', alignItems:'center', gap:10, textDecoration:'none' },
  logoBox: { width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' },
  logoTxt: { fontFamily:'Georgia,serif', fontSize:18, color:'#111', fontWeight:600 },
  wrap:    { maxWidth:820, margin:'0 auto', padding:'32px 20px 80px' },
  input:   { width:'100%', padding:'11px 14px', borderRadius:12, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:'inherit', background:'white' },
}

export default function SignupPage() {
  const [step, setStep]         = useState(1)
  const [role, setRole]         = useState(null)
  const [form, setForm]         = useState({ name:'', email:'', password:'', schoolCode:'' })
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const focus = e => { e.target.style.borderColor = '#1e7852' }
  const blur  = e => { e.target.style.borderColor = '#e5e7eb' }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: form.name })
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid, email: form.email, displayName: form.name,
        role: role.id, schoolId: null,
        schoolCode: form.schoolCode?.toUpperCase() || null,
        status: 'pending', active: false,
        createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
      })
      navigate('/pending')
    } catch (err) {
      toast.error(
        err.code === 'auth/email-already-in-use' ? 'An account with this email already exists.' :
        err.code === 'auth/weak-password'         ? 'Password must be at least 8 characters.' :
        'Sign up failed. Please try again.'
      )
    } finally { setLoading(false) }
  }

  return (
    <div style={S.page}>
      {/* Top bar */}
      <div style={S.topbar}>
        <Link to="/" style={S.logo}>
          <div style={S.logoBox}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 10v2h24v-2L16 4z" fill="white" fillOpacity=".95"/>
              <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
              <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
            </svg>
          </div>
          <span style={S.logoTxt}>MySchool</span>
        </Link>
        <Link to="/login" style={{ fontSize:14, color:'#1e7852', fontWeight:500, textDecoration:'none' }}>
          Already have an account? <strong>Sign in</strong>
        </Link>
      </div>

      <div style={{ ...S.wrap, maxWidth: step === 1 ? 820 : 500 }}>
        {/* Step dots */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:40 }}>
          {['Choose your role','Your details'].map((label, i) => {
            const s = i + 1
            const active = step >= s
            return (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color: active ? 'white' : '#9ca3af', background: active ? '#1e7852' : '#e5e7eb', transition:'all 0.3s' }}>
                  {step > s ? '✓' : s}
                </div>
                <span style={{ fontSize:13, color: active ? '#1e7852' : '#9ca3af', fontWeight: active ? 600 : 400 }}>{label}</span>
                {s < 2 && <div style={{ width:40, height:2, background: step > s ? '#1e7852' : '#e5e7eb', borderRadius:1 }}/>}
              </div>
            )
          })}
        </div>

        {/* STEP 1 — Role cards */}
        {step === 1 && (
          <div style={{ animation:'fadeIn 0.3s ease-out' }}>
            <h1 style={{ textAlign:'center', fontFamily:'Georgia,serif', fontSize:32, color:'#111', margin:'0 0 8px', fontWeight:400 }}>How would you like to join?</h1>
            <p style={{ textAlign:'center', color:'#6b7280', fontSize:15, margin:'0 0 40px' }}>Select your role. Your account will be reviewed by a school admin before access is granted.</p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
              {ROLES.map(r => (
                <button key={r.id} onClick={() => { setRole(r); setStep(2) }}
                  style={{ textAlign:'left', padding:24, borderRadius:20, border:`2px solid ${r.border}30`, background:r.bg, cursor:'pointer', transition:'all 0.2s', outline:'none', fontFamily:'inherit' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = r.border; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 8px 28px ${r.border}25` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = r.border+'30'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
                  <div style={{ fontSize:36, marginBottom:12 }}>{r.emoji}</div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:'#111', margin:'0 0 8px' }}>{r.label}</h3>
                  <p style={{ fontSize:13, color:'#6b7280', margin:0, lineHeight:1.55 }}>{r.desc}</p>
                  <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:6, color:r.color, fontSize:13, fontWeight:600 }}>
                    Select <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </button>
              ))}
            </div>
            <p style={{ textAlign:'center', color:'#9ca3af', fontSize:13, marginTop:24 }}>
              I am none of these — <a href="#" style={{ color:'#1e7852', textDecoration:'none', fontWeight:600 }}>Contact us</a>
            </p>
          </div>
        )}

        {/* STEP 2 — Details */}
        {step === 2 && role && (
          <div style={{ animation:'fadeIn 0.3s ease-out' }}>
            {/* Role banner */}
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:16, borderRadius:16, border:`1px solid ${role.border}30`, background:role.bg, marginBottom:28 }}>
              <span style={{ fontSize:28 }}>{role.emoji}</span>
              <div style={{ flex:1 }}>
                <p style={{ margin:0, fontSize:11, color:'#9ca3af', fontWeight:500, textTransform:'uppercase', letterSpacing:1 }}>Signing up as</p>
                <p style={{ margin:0, fontSize:16, fontWeight:700, color:'#111' }}>{role.label}</p>
              </div>
              <button onClick={() => setStep(1)} style={{ fontSize:13, color:'#1e7852', fontWeight:600, background:'none', border:'1px solid #2e9468', borderRadius:8, padding:'6px 12px', cursor:'pointer', fontFamily:'inherit' }}>
                Change
              </button>
            </div>

            <div style={{ background:'white', borderRadius:24, padding:32, boxShadow:'0 4px 24px rgba(0,0,0,0.06)', border:'1px solid #e5e7eb' }}>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:24, color:'#111', margin:'0 0 4px', fontWeight:400 }}>Create your account</h2>
              <p style={{ color:'#9ca3af', fontSize:14, margin:'0 0 28px' }}>Your account will be approved by a school admin before you can log in.</p>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Full name</label>
                  <input value={form.name} onChange={set('name')} required placeholder="e.g. Jane Wanjiku" style={S.input} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Email address</label>
                  <input type="email" value={form.email} onChange={set('email')} required placeholder="you@school.ac.ke" style={S.input} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Password</label>
                  <div style={{ position:'relative' }}>
                    <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} required placeholder="At least 8 characters" style={{ ...S.input, paddingRight:44 }} onFocus={focus} onBlur={blur} />
                    <button type="button" onClick={() => setShowPass(v => !v)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16 }}>
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {(role.id === 'teacher' || role.id === 'parent') && (
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>
                      School Code <span style={{ color:'#9ca3af', fontWeight:400 }}>(optional — ask your school admin)</span>
                    </label>
                    <input value={form.schoolCode} onChange={set('schoolCode')} placeholder="e.g. SCHOOL001" style={{ ...S.input, textTransform:'uppercase' }} onFocus={focus} onBlur={blur} />
                  </div>
                )}

                {/* Approval notice */}
                <div style={{ padding:16, borderRadius:12, background:'#fffbeb', border:'1px solid #fde68a', display:'flex', gap:12 }}>
                  <span style={{ fontSize:18, flexShrink:0 }}>⏳</span>
                  <div>
                    <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:600, color:'#92400e' }}>Account approval required</p>
                    <p style={{ margin:0, fontSize:12, color:'#b45309', lineHeight:1.5 }}>After signing up, a school admin will review and approve your account. You'll be notified once approved.</p>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  style={{ padding:'13px', borderRadius:14, border:'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight:700, fontSize:15, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', boxShadow:'0 4px 16px rgba(30,120,82,0.3)', opacity: loading ? 0.75 : 1, fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  {loading && <span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.35)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
                  {loading ? 'Creating account…' : 'Create account →'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
