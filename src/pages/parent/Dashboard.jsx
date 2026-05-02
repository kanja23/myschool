// src/pages/parent/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/context/AuthContext'
import ComingSoon from '@/components/ui/ComingSoon'
import { HomeIcon, BookOpenIcon, BarChartIcon, BellIcon } from '@/components/ui/Icons'
import toast from 'react-hot-toast'

const nav = [
  { path:'/parent',              label:'Overview',       icon:<HomeIcon />, end:true },
  { path:'/parent/reports',      label:'Report Cards',   icon:<BookOpenIcon /> },
  { path:'/parent/progress',     label:'Child Progress', icon:<BarChartIcon /> },
  { path:'/parent/announcements',label:'Announcements',  icon:<BellIcon /> },
]

// ── Link child by admission number ─────────────────────────────────────────
function LinkChild({ schoolId, parentId, onLinked }) {
  const [admNo,   setAdmNo]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLink(e) {
    e.preventDefault()
    if (!admNo.trim()) return
    setLoading(true)
    try {
      // Search students across all schools for this admission number
      const q = query(
        collection(db, 'schools', schoolId, 'students'),
        where('admissionNo', '==', admNo.trim().toUpperCase())
      )
      const snap = await getDocs(q)
      if (snap.empty) {
        toast.error('No student found with that admission number. Check and try again.')
        setLoading(false)
        return
      }
      const student = { id: snap.docs[0].id, ...snap.docs[0].data() }

      // Link student to parent
      await updateDoc(doc(db, 'schools', schoolId, 'students', student.id), {
        parentId:    parentId,
        parentLinked: true,
        updatedAt:   serverTimestamp(),
      })
      // Store child info on parent profile
      await updateDoc(doc(db, 'users', parentId), {
        childId:      student.id,
        childName:    student.fullName,
        childAdmNo:   student.admissionNo,
        childClass:   student.className,
        childGrade:   student.grade,
        schoolId,
        updatedAt:    serverTimestamp(),
      })
      toast.success(`Linked to ${student.fullName} successfully!`)
      onLinked(student)
    } catch (err) {
      toast.error('Failed to link. Please try again.')
      console.error(err)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:52, marginBottom:12 }}>👧🏾</div>
          <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#111', margin:'0 0 8px', fontWeight:400 }}>Link your child</h2>
          <p style={{ fontSize:14, color:'#6b7280', margin:0, lineHeight:1.6 }}>
            Enter your child's admission number to link their account. You can find this on their school ID card or previous report card.
          </p>
        </div>

        <div style={{ background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(0,0,0,0.06)', border:'1px solid #e5e7eb' }}>
          <form onSubmit={handleLink} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Admission Number</label>
              <input
                value={admNo}
                onChange={e => setAdmNo(e.target.value.toUpperCase())}
                placeholder="e.g. GRADE4/12345"
                style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #e5e7eb', fontSize:15, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:'monospace', letterSpacing:1, textTransform:'uppercase', background:'white' }}
                onFocus={e => e.target.style.borderColor='#1e7852'}
                onBlur={e => e.target.style.borderColor='#e5e7eb'}
                required
              />
              <p style={{ margin:'6px 0 0', fontSize:12, color:'#9ca3af' }}>Case-insensitive. Found on school ID or report card.</p>
            </div>

            <div style={{ padding:14, borderRadius:12, background:'#f0f9f4', border:'1px solid #bbf7d0' }}>
              <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.6 }}>
                💡 <strong>Don't have the admission number?</strong> Contact your school admin or class teacher.
              </p>
            </div>

            <button type="submit" disabled={loading || !admNo.trim()}
              style={{ padding:'13px', borderRadius:14, border:'none', cursor: loading||!admNo.trim() ? 'not-allowed' : 'pointer', fontWeight:700, fontSize:15, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', fontFamily:'inherit', opacity: loading||!admNo.trim() ? 0.7 : 1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {loading && <span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
              {loading ? 'Searching…' : 'Link My Child'}
            </button>
          </form>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ── Parent Home — shows child info after linking ───────────────────────────
function ParentHome() {
  const { profile, schoolId } = useAuth()
  const [child, setChild]   = useState(null)
  const [linked, setLinked] = useState(false)

  useEffect(() => {
    if (profile?.childId) {
      setChild({
        id:        profile.childId,
        fullName:  profile.childName,
        admissionNo: profile.childAdmNo,
        className: profile.childClass,
        grade:     profile.childGrade,
      })
      setLinked(true)
    }
  }, [profile])

  if (!linked) {
    return <LinkChild schoolId={schoolId} parentId={profile?.uid} onLinked={s => { setChild(s); setLinked(true) }} />
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Banner */}
      <div style={{ borderRadius:20, background:'linear-gradient(135deg,#0a2419,#14402e,#1e7852)', padding:'20px 16px' }}>
        <p style={{ color:'rgba(167,216,190,0.75)', fontSize:13, margin:'0 0 4px' }}>Parent Portal</p>
        <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'white', margin:'0 0 4px', fontWeight:400 }}>
          Welcome, {profile?.displayName?.split(' ')[0] ?? 'Parent'}
        </h2>
        <p style={{ color:'rgba(167,216,190,0.7)', fontSize:14, margin:0 }}>Tracking your child's CBC progress</p>
      </div>

      {/* Child card */}
      <div style={{ background:'white', borderRadius:16, border:'1.5px solid #bbf7d0', padding:20, display:'flex', gap:14, alignItems:'center' }}>
        <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }}>
          👧🏾
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ margin:'0 0 2px', fontSize:16, fontWeight:700, color:'#111' }}>{child?.fullName}</p>
          <p style={{ margin:'0 0 4px', fontSize:13, color:'#6b7280' }}>{child?.className} · {child?.grade}</p>
          <span style={{ fontSize:11, fontFamily:'monospace', background:'#f5f5f5', padding:'3px 10px', borderRadius:6, color:'#374151', fontWeight:600 }}>
            Adm: {child?.admissionNo}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
        {[
          { label:"Child's Grade",     value: child?.grade ?? '—',   icon:'🏫' },
          { label:'Current Term',      value: '1',                   icon:'📅' },
          { label:'Reports Available', value: '0',                   icon:'📄' },
        ].map(s => (
          <div key={s.label} style={{ padding:14, borderRadius:14, border:'1px solid #e5e7eb', background:'#fafafa', textAlign:'center' }}>
            <span style={{ fontSize:22 }}>{s.icon}</span>
            <div style={{ fontSize:20, fontWeight:700, color:'#111', fontFamily:'Georgia,serif', margin:'4px 0 2px' }}>{s.value}</div>
            <div style={{ fontSize:11, color:'#6b7280', lineHeight:1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CBC explainer — mobile friendly */}
      <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:16 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:'#111', margin:'0 0 12px' }}>Understanding CBC Grades</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[
            { code:'EE', label:'Exceeding Expectations',  color:'#16a34a', bg:'#f0fdf4', range:'80–100%' },
            { code:'ME', label:'Meeting Expectations',    color:'#2563eb', bg:'#eff6ff', range:'65–79%'  },
            { code:'AE', label:'Approaching Expectations',color:'#d97706', bg:'#fffbeb', range:'50–64%'  },
            { code:'BE', label:'Below Expectations',      color:'#dc2626', bg:'#fef2f2', range:'0–49%'   },
          ].map(g => (
            <div key={g.code} style={{ padding:'10px 12px', borderRadius:10, background:g.bg, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:30, height:30, borderRadius:8, background:g.color, color:'white', fontWeight:700, fontSize:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{g.code}</span>
              <div style={{ minWidth:0 }}>
                <p style={{ margin:'0 0 1px', fontSize:11, fontWeight:700, color:'#111', lineHeight:1.2 }}>{g.code}</p>
                <p style={{ margin:0, fontSize:10, color:'#9ca3af' }}>{g.range}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:12, color:'#9ca3af', margin:'12px 0 0', lineHeight:1.5 }}>
          Your child is assessed per strand in each subject — not by a single percentage mark.
        </p>
      </div>

      {/* Unlink button */}
      <button
        onClick={async () => {
          try {
            await updateDoc(doc(db, 'users', profile.uid), { childId:null, childName:null, childAdmNo:null, childClass:null, childGrade:null, updatedAt:serverTimestamp() })
            setLinked(false); setChild(null)
            toast.success('Child unlinked')
          } catch { toast.error('Failed to unlink') }
        }}
        style={{ padding:'10px', borderRadius:12, border:'1px solid #e5e7eb', background:'white', color:'#9ca3af', fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
        Link a different child
      </button>
    </div>
  )
}

export default function ParentDashboard() {
  return (
    <DashboardLayout navItems={nav} title="Parent Portal">
      <Routes>
        <Route index              element={<ParentHome />} />
        <Route path="reports"     element={<ComingSoon label="Report Cards" phase="6" />} />
        <Route path="progress"    element={<ComingSoon label="Child Progress" phase="6" />} />
        <Route path="announcements" element={<ComingSoon label="Announcements" phase="6" />} />
      </Routes>
    </DashboardLayout>
  )
}
