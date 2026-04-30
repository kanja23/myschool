// src/pages/admin/AdminHome.jsx
import { useState, useEffect } from 'react'
import { collection, query, where, getCountFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useSchool, useClasses } from '@/hooks/useSchool'
import { Link } from 'react-router-dom'

const QUICK = [
  { label:'Add Teacher',       to:'/admin/teachers',     emoji:'👩‍🏫' },
  { label:'Enrol Student',     to:'/admin/students',     emoji:'👧🏾' },
  { label:'Add Class',         to:'/admin/classes',      emoji:'🏫'  },
  { label:'Post Announcement', to:'/admin/announcements',emoji:'📢'  },
]

const CBC_SUBJECTS = [
  { subject:'English',             lessons:5 },
  { subject:'Kiswahili',           lessons:4 },
  { subject:'Mathematics',         lessons:5 },
  { subject:'Science & Technology',lessons:4 },
  { subject:'Social Studies',      lessons:3 },
  { subject:'Agriculture',         lessons:4 },
  { subject:'Creative Arts',       lessons:6 },
  { subject:'Religious Education', lessons:3 },
]

export default function AdminHome() {
  const { profile, schoolId } = useAuth()
  const { school }  = useSchool()
  const { classes } = useClasses()
  const [counts, setCounts] = useState({ students:0, teachers:0, pending:0 })

  useEffect(() => {
    if (!schoolId) return
    async function load() {
      try {
        const [s,t,p] = await Promise.all([
          getCountFromServer(collection(db,'schools',schoolId,'students')),
          getCountFromServer(query(collection(db,'users'),where('schoolId','==',schoolId),where('role','==','teacher'))),
          getCountFromServer(query(collection(db,'users'),where('status','==','pending'))),
        ])
        setCounts({ students:s.data().count, teachers:t.data().count, pending:p.data().count })
      } catch {}
    }
    load()
  }, [schoolId])

  const setupSteps = [
    { step:'School profile complete',   done: !!school?.setupComplete },
    { step:'Classes added',             done: classes.length > 0 },
    { step:'Teachers approved',         done: counts.teachers > 0 },
    { step:'Students enrolled',         done: counts.students > 0 },
    { step:'First announcement posted', done: false },
  ]
  const progress = Math.round((setupSteps.filter(s=>s.done).length / setupSteps.length)*100)

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Banner */}
      <div style={{ borderRadius:20, background:'linear-gradient(135deg,#0a2419,#14402e,#1e7852)', padding:28, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.15),transparent)', filter:'blur(40px)', pointerEvents:'none' }}/>
        <p style={{ color:'rgba(167,216,190,0.75)', fontSize:13, margin:'0 0 4px' }}>Term {school?.currentTerm ?? 1} · {school?.currentYear ?? new Date().getFullYear()}</p>
        <h2 style={{ fontFamily:'Georgia,serif', fontSize:26, color:'white', margin:'0 0 6px', fontWeight:400 }}>Welcome, {profile?.displayName?.split(' ')[0] ?? 'Admin'} 👋</h2>
        <p style={{ color:'rgba(167,216,190,0.65)', fontSize:14, margin:'0 0 20px' }}>{school?.name ?? 'Your school'} · CBC Platform</p>
        {counts.pending > 0 && (
          <Link to="/admin/teachers" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:10, background:'rgba(245,158,11,0.2)', border:'1px solid rgba(245,158,11,0.4)', color:'#fbbf24', fontSize:13, fontWeight:600, textDecoration:'none', marginBottom:16 }}>
            ⏳ {counts.pending} user{counts.pending!==1?'s':''} awaiting approval →
          </Link>
        )}
        <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
          {QUICK.map(a => (
            <Link key={a.label} to={a.to} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:10, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', color:'white', fontSize:13, fontWeight:500, textDecoration:'none' }}>
              {a.emoji} {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12 }}>
        {[
          { label:'Students', value:counts.students, icon:'👥', color:'#1e7852', bg:'#f0f9f4', border:'#bbf7d0', to:'/admin/students' },
          { label:'Teachers', value:counts.teachers, icon:'👩‍🏫', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe', to:'/admin/teachers' },
          { label:'Classes',  value:classes.length,  icon:'🏫', color:'#d97706', bg:'#fffbeb', border:'#fde68a', to:'/admin/classes'  },
          { label:'Pending',  value:counts.pending,  icon:'⏳', color:counts.pending>0?'#dc2626':'#9ca3af', bg:counts.pending>0?'#fff5f5':'#f9fafb', border:counts.pending>0?'#fecaca':'#e5e7eb', to:'/admin/teachers' },
        ].map(s => (
          <Link key={s.label} to={s.to} style={{ textDecoration:'none' }}>
            <div style={{ padding:18, borderRadius:16, border:`1px solid ${s.border}`, background:s.bg }}>
              <span style={{ fontSize:22 }}>{s.icon}</span>
              <div style={{ fontSize:28, fontWeight:700, color:s.color, fontFamily:'Georgia,serif', margin:'6px 0 2px' }}>{s.value}</div>
              <div style={{ fontSize:12, color:'#6b7280' }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Two col */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="card p-5">
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:'#111', margin:0 }}>Setup Progress</h3>
            <span style={{ fontSize:13, fontWeight:700, color:'#1e7852' }}>{progress}%</span>
          </div>
          <div style={{ background:'#f0f0f0', borderRadius:999, height:6, marginBottom:18 }}>
            <div style={{ width:`${progress}%`, height:6, borderRadius:999, background:'linear-gradient(90deg,#1e7852,#2e9468)', transition:'width 0.6s' }}/>
          </div>
          {setupSteps.map(({ step, done }) => (
            <div key={step} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid #f5f5f5' }}>
              <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:done?'#1e7852':'#e5e7eb' }}>
                {done && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize:13, color:done?'#9ca3af':'#374151', textDecoration:done?'line-through':'' }}>{step}</span>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <h3 style={{ fontSize:14, fontWeight:700, color:'#111', margin:'0 0 4px' }}>CBC Learning Areas · Gr 4–6</h3>
          <p style={{ fontSize:12, color:'#9ca3af', margin:'0 0 16px' }}>35 lessons/week · KICD 2025</p>
          {CBC_SUBJECTS.map(s => (
            <div key={s.subject} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:9 }}>
              <span style={{ fontSize:12, color:'#6b7280', width:155, flexShrink:0 }}>{s.subject}</span>
              <div style={{ flex:1, background:'#f0f0f0', borderRadius:999, height:5 }}>
                <div style={{ width:`${(s.lessons/6)*100}%`, height:5, borderRadius:999, background:'linear-gradient(90deg,#1e7852,#2e9468)' }}/>
              </div>
              <span style={{ fontSize:11, color:'#9ca3af', width:40, textAlign:'right' }}>{s.lessons}lw</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
