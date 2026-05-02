// src/pages/teacher/TeacherHome.jsx
import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const QUICK = [
  { label:'Generate Plan', to:'/teacher/plans',       emoji:'📋' },
  { label:'Record Work',   to:'/teacher/records',     emoji:'📝' },
  { label:'Assessment',    to:'/teacher/assessments', emoji:'✅' },
  { label:'Report Cards',  to:'/teacher/reports',     emoji:'📄' },
]

export default function TeacherHome() {
  const { profile, schoolId } = useAuth()
  const [plans,   setPlans]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!schoolId || !profile?.uid) return
    const q = query(
      collection(db, 'schools', schoolId, 'schemes'),
      where('teacherId', '==', profile.uid)
    )
    return onSnapshot(q, snap => {
      setPlans(snap.docs.map(d => ({ id:d.id, ...d.data() })))
      setLoading(false)
    })
  }, [schoolId, profile?.uid])

  const activePlans    = plans.filter(p => p.status === 'active')
  const completedPlans = plans.filter(p => p.status === 'completed')
  const avgCoverage    = plans.length
    ? Math.round(plans.reduce((s,p) => s + (p.coveragePercent??0), 0) / plans.length)
    : 0

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Banner */}
      <div style={{ borderRadius:20, background:'linear-gradient(135deg,#0a2419,#14402e,#1e7852)', padding:'24px 20px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:150, height:150, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.15),transparent)', filter:'blur(30px)', pointerEvents:'none' }}/>
        <p style={{ color:'rgba(167,216,190,0.75)', fontSize:13, margin:'0 0 4px' }}>
          {profile?.schoolName ?? 'My School'} · {new Date().getFullYear()}
        </p>
        <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'white', margin:'0 0 16px', fontWeight:400 }}>
          Hello, {profile?.displayName?.split(' ')[0] ?? 'Teacher'} 👋
        </h2>
        {/* Quick actions grid — 2 cols on mobile */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {QUICK.map(a => (
            <Link key={a.label} to={a.to}
              style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', borderRadius:12, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', color:'white', fontSize:13, fontWeight:600, textDecoration:'none' }}>
              <span style={{ fontSize:18 }}>{a.emoji}</span>
              <span style={{ fontSize:12 }}>{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats — 2 cols on mobile */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {[
          { label:'Total Plans',    value: plans.length,         icon:'📋', color:'#1e7852', bg:'#f0f9f4', border:'#bbf7d0' },
          { label:'Active',         value: activePlans.length,   icon:'🔄', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe' },
          { label:'Completed',      value: completedPlans.length,icon:'✅', color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0' },
          { label:'Avg Coverage',   value:`${avgCoverage}%`,     icon:'📈', color:'#d97706', bg:'#fffbeb', border:'#fde68a' },
        ].map(s => (
          <div key={s.label} style={{ padding:16, borderRadius:14, border:`1px solid ${s.border}`, background:s.bg }}>
            <span style={{ fontSize:20 }}>{s.icon}</span>
            <div style={{ fontSize:24, fontWeight:700, color:s.color, fontFamily:'Georgia,serif', margin:'4px 0 2px' }}>{s.value}</div>
            <div style={{ fontSize:11, color:'#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent plans */}
      <div className="card p-4">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#111', margin:0 }}>Recent Plans</h3>
          <Link to="/teacher/plans" style={{ fontSize:12, color:'#1e7852', fontWeight:600, textDecoration:'none' }}>View all →</Link>
        </div>

        {loading ? (
          <p style={{ fontSize:13, color:'#9ca3af', textAlign:'center', padding:'16px 0' }}>Loading…</p>
        ) : plans.length === 0 ? (
          <div style={{ textAlign:'center', padding:'16px 0' }}>
            <p style={{ fontSize:13, color:'#9ca3af', margin:'0 0 12px' }}>No plans yet. Generate your first CBC teaching plan.</p>
            <Link to="/teacher/plans"
              style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 18px', borderRadius:10, background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
              + Generate Plan
            </Link>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {plans.slice(0,4).map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid #f5f5f5' }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>📋</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:600, color:'#111', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.subject}</p>
                  <p style={{ margin:0, fontSize:11, color:'#9ca3af' }}>{p.grade} · Term {p.term}</p>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:700, color:'#1e7852' }}>{p.coveragePercent ?? 0}%</p>
                  <div style={{ width:60, background:'#f0f0f0', borderRadius:999, height:4 }}>
                    <div style={{ width:`${p.coveragePercent??0}%`, height:4, borderRadius:999, background:'linear-gradient(90deg,#1e7852,#2e9468)' }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CBC grades reference — mobile friendly */}
      <div className="card p-4">
        <h3 style={{ fontSize:14, fontWeight:700, color:'#111', margin:'0 0 12px' }}>CBC Assessment Reference</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[
            { code:'EE', label:'Exceeding',   color:'#16a34a', bg:'#f0fdf4', range:'80–100%' },
            { code:'ME', label:'Meeting',     color:'#2563eb', bg:'#eff6ff', range:'65–79%'  },
            { code:'AE', label:'Approaching', color:'#d97706', bg:'#fffbeb', range:'50–64%'  },
            { code:'BE', label:'Below',       color:'#dc2626', bg:'#fef2f2', range:'0–49%'   },
          ].map(g => (
            <div key={g.code} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', borderRadius:10, background:g.bg }}>
              <span style={{ width:32, height:32, borderRadius:8, background:g.color, color:'white', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{g.code}</span>
              <div>
                <p style={{ margin:'0 0 1px', fontSize:12, fontWeight:600, color:'#111' }}>{g.label}</p>
                <p style={{ margin:0, fontSize:11, color:'#9ca3af' }}>{g.range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
