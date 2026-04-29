// src/pages/auth/PendingApproval.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function PendingApproval() {
  const { signOut, profile } = useAuth()

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#f8faf8,#f0f9f4)', fontFamily:"'DM Sans',sans-serif", padding:20 }}>
      <div style={{ maxWidth:480, width:'100%', textAlign:'center' }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:40 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 10v2h24v-2L16 4z" fill="white" fillOpacity=".95"/>
              <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
              <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
              <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
            </svg>
          </div>
          <span style={{ fontFamily:'Georgia,serif', fontSize:20, color:'#111', fontWeight:600 }}>MySchool</span>
        </div>

        <div style={{ background:'white', borderRadius:28, padding:40, boxShadow:'0 8px 40px rgba(0,0,0,0.08)', border:'1px solid #e5e7eb' }}>
          {/* Animated clock icon */}
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#fffbeb,#fef3c7)', border:'3px solid #fde68a', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:36 }}>
            ⏳
          </div>

          <h1 style={{ fontFamily:'Georgia,serif', fontSize:26, color:'#111', margin:'0 0 12px', fontWeight:400 }}>
            Account under review
          </h1>

          <p style={{ color:'#6b7280', fontSize:15, lineHeight:1.7, margin:'0 0 24px' }}>
            Thank you for signing up{profile?.displayName ? `, <strong>${profile.displayName}</strong>` : ''}! Your account is currently being reviewed by a school administrator.
          </p>

          {/* Steps */}
          <div style={{ background:'#f8faf8', borderRadius:16, padding:20, marginBottom:28, textAlign:'left' }}>
            <p style={{ fontSize:13, fontWeight:700, color:'#374151', margin:'0 0 14px', textTransform:'uppercase', letterSpacing:0.5 }}>What happens next</p>
            {[
              { step:'1', text:'A school admin receives your signup request', done: true },
              { step:'2', text:'They review your details and approve your account', done: false },
              { step:'3', text:'You\'ll receive an email notification when approved', done: false },
              { step:'4', text:'Sign in and access your dashboard', done: false },
            ].map(s => (
              <div key={s.step} style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:12, opacity: s.done ? 1 : 0.6 }}>
                <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, background: s.done ? '#1e7852' : '#e5e7eb', color: s.done ? 'white' : '#9ca3af' }}>
                  {s.done ? '✓' : s.step}
                </div>
                <span style={{ fontSize:13, color:'#4b5563', lineHeight:1.55, paddingTop:2 }}>{s.text}</span>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div style={{ padding:16, borderRadius:12, background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:28, textAlign:'left' }}>
            <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.6 }}>
              💡 <strong>Tip:</strong> Share your school code with your admin so they can link your account to the right school faster.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <button onClick={() => window.location.reload()}
              style={{ padding:'12px', borderRadius:14, border:'none', cursor:'pointer', fontWeight:700, fontSize:14, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', fontFamily:'inherit' }}>
              Refresh status
            </button>
            <button onClick={signOut}
              style={{ padding:'12px', borderRadius:14, border:'1.5px solid #e5e7eb', cursor:'pointer', fontWeight:600, fontSize:14, color:'#6b7280', background:'white', fontFamily:'inherit' }}>
              Sign out
            </button>
          </div>
        </div>

        <p style={{ marginTop:20, fontSize:12, color:'#9ca3af' }}>
          Questions? Contact your school admin or email <a href="mailto:support@myschool.co.ke" style={{ color:'#1e7852', textDecoration:'none' }}>support@myschool.co.ke</a>
        </p>
      </div>
    </div>
  )
}
