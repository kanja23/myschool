// src/pages/teacher/ReportCards.jsx
import { useState, useRef } from 'react'
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useClasses } from '@/hooks/useSchool'
import { getStrandsForSubject, getSubjectsForGrade } from '@/data/cbcCurriculum'
import toast from 'react-hot-toast'

const GRADE_STYLE = {
  EE:{ color:'#16a34a', bg:'#f0fdf4', label:'Exceeding Expectations'  },
  ME:{ color:'#2563eb', bg:'#eff6ff', label:'Meeting Expectations'    },
  AE:{ color:'#d97706', bg:'#fffbeb', label:'Approaching Expectations' },
  BE:{ color:'#dc2626', bg:'#fef2f2', label:'Below Expectations'      },
}

export default function ReportCards() {
  const { schoolId, profile } = useAuth()
  const { classes }           = useClasses()
  const [classId,  setClassId] = useState('')
  const [grade,    setGrade]   = useState('Grade 4')
  const [term,     setTerm]    = useState('1')
  const [students, setStudents]= useState([])
  const [reports,  setReports] = useState({}) // studentId → { subject → { strandCode → grade } }
  const [selected, setSelected]= useState(null)
  const [loading,  setLoading] = useState(false)
  const reportRef = useRef(null)

  const subjects = getSubjectsForGrade(grade)
  const SI = { width:'100%', padding:'9px 12px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white', appearance:'none' }
  const focus = e => e.target.style.borderColor='#1e7852'
  const blur  = e => e.target.style.borderColor='#e5e7eb'

  async function handleLoad() {
    if (!classId) { toast.error('Select a class'); return }
    setLoading(true)
    try {
      // Load students
      const sq = query(collection(db,'schools',schoolId,'students'), where('classId','==',classId))
      const sSnap = await getDocs(sq)
      const studs = sSnap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>a.surname?.localeCompare(b.surname))
      setStudents(studs)

      // Load assessments for each subject
      const allReports = {}
      for (const student of studs) {
        allReports[student.id] = {}
        for (const subj of subjects) {
          const assessId = `${classId}_${grade.replace(/\s/g,'')}_${subj.replace(/\s/g,'')}_T${term}`
          const aSnap = await getDoc(doc(db,'schools',schoolId,'assessments',assessId))
          if (aSnap.exists()) {
            allReports[student.id][subj] = aSnap.data().scores?.[student.id] ?? {}
          }
        }
      }
      setReports(allReports)
      toast.success(`Loaded ${studs.length} learner${studs.length!==1?'s':''}`)
    } catch { toast.error('Failed to load reports') }
    finally  { setLoading(false) }
  }

  async function handlePrint() {
    window.print()
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <h2 className="page-title">Report Cards</h2>
        <p className="page-subtitle">Generate and download CBC report cards per class</p>
      </div>

      {/* Controls */}
      <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Grade</label>
            <select value={grade} onChange={e=>setGrade(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
              {['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6'].map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Term</label>
            <select value={term} onChange={e=>setTerm(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
              {['1','2','3'].map(t=><option key={t} value={t}>Term {t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Class</label>
          <select value={classId} onChange={e=>setClassId(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
            <option value="">Select class…</option>
            {classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <button onClick={handleLoad} disabled={loading||!classId}
          style={{ padding:'11px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:loading||!classId?'not-allowed':'pointer', fontFamily:'inherit', opacity:loading||!classId?0.7:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          {loading && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
          {loading?'Loading…':'Load Report Cards'}
        </button>
      </div>

      {/* Student list */}
      {students.length > 0 && !selected && (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:'#111', margin:0 }}>{students.length} Learners — {grade} · Term {term}</h3>
            <button onClick={handlePrint}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:6 }}>
              🖨️ Print All
            </button>
          </div>
          {students.map(s=>{
            const sReports = reports[s.id] ?? {}
            const hasData   = Object.values(sReports).some(sub=>Object.keys(sub).length>0)
            return (
              <div key={s.id} style={{ background:'white', borderRadius:14, border:'1px solid #e5e7eb', padding:14, display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}
                onClick={()=>setSelected(s)}>
                <div style={{ width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                  {s.gender==='Female'?'👧':'👦'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:'0 0 2px', fontSize:14, fontWeight:700, color:'#111' }}>{s.fullName}</p>
                  <p style={{ margin:0, fontSize:11, color:'#9ca3af', fontFamily:'monospace' }}>{s.admissionNo}</p>
                </div>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  {hasData
                    ? <span style={{ fontSize:11, fontWeight:600, color:'#1e7852', background:'#f0f9f4', padding:'3px 10px', borderRadius:8 }}>View →</span>
                    : <span style={{ fontSize:11, color:'#9ca3af', background:'#f5f5f5', padding:'3px 10px', borderRadius:8 }}>No data</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Individual report card */}
      {selected && (
        <ReportCardView
          student={selected}
          grade={grade}
          term={term}
          subjects={subjects}
          scores={reports[selected.id] ?? {}}
          profile={profile}
          onBack={()=>setSelected(null)}
        />
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ── Report Card View + Print ───────────────────────────────────────────────
function ReportCardView({ student, grade, term, subjects, scores, profile, onBack }) {
  const year = new Date().getFullYear()

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        <button onClick={onBack}
          style={{ padding:'8px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
          ← Back
        </button>
        <button onClick={()=>window.print()}
          style={{ padding:'8px 16px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:6 }}>
          🖨️ Print / Download PDF
        </button>
      </div>

      {/* ── REPORT CARD (print-ready) ── */}
      <div id="report-card" style={{ background:'white', borderRadius:16, border:'2px solid #1e7852', overflow:'hidden', maxWidth:700, margin:'0 auto', width:'100%' }}>

        {/* Header */}
        <div style={{ background:'linear-gradient(135deg,#0a2419,#1e7852)', padding:'20px 24px', color:'white', textAlign:'center' }}>
          <p style={{ margin:'0 0 4px', fontSize:11, color:'rgba(167,216,190,0.7)', textTransform:'uppercase', letterSpacing:2 }}>Kenya Competency Based Curriculum</p>
          <h2 style={{ margin:'0 0 4px', fontFamily:'Georgia,serif', fontSize:22, fontWeight:400 }}>LEARNER PROGRESS REPORT</h2>
          <p style={{ margin:0, fontSize:13, color:'rgba(167,216,190,0.8)' }}>Term {term} · {year} · {grade}</p>
        </div>

        {/* Student info */}
        <div style={{ padding:'16px 20px', background:'#f8faf8', borderBottom:'1px solid #e5e7eb', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[
            { label:'Learner Name',    value: student.fullName },
            { label:'Admission No.',   value: student.admissionNo },
            { label:'Class',           value: student.className },
            { label:'Grade',           value: grade },
          ].map(r=>(
            <div key={r.label}>
              <p style={{ margin:'0 0 1px', fontSize:10, color:'#9ca3af', textTransform:'uppercase', letterSpacing:0.5, fontWeight:700 }}>{r.label}</p>
              <p style={{ margin:0, fontSize:14, fontWeight:700, color:'#111' }}>{r.value}</p>
            </div>
          ))}
        </div>

        {/* Subjects and strands */}
        <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:16 }}>
          {subjects.map(subj => {
            const subjScores = scores[subj] ?? {}
            const strands    = getStrandsForSubject(grade, subj)
            if (!strands.length) return null
            return (
              <div key={subj} style={{ border:'1px solid #e5e7eb', borderRadius:12, overflow:'hidden' }}>
                {/* Subject header */}
                <div style={{ padding:'10px 14px', background:'#f0f9f4', borderBottom:'1px solid #e5e7eb' }}>
                  <p style={{ margin:0, fontSize:14, fontWeight:700, color:'#1e7852' }}>{subj}</p>
                </div>
                {/* Strands */}
                <div style={{ padding:'8px 14px', display:'flex', flexDirection:'column', gap:6 }}>
                  {strands.map(strand => (
                    <div key={strand.strand}>
                      <p style={{ margin:'4px 0 4px', fontSize:10, color:'#9ca3af', fontWeight:700, textTransform:'uppercase', letterSpacing:0.5 }}>{strand.strand}</p>
                      {strand.subStrands.map(ss => {
                        const g = subjScores[ss.code]
                        const s = g ? GRADE_STYLE[g] : null
                        return (
                          <div key={ss.code} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:'1px solid #f5f5f5' }}>
                            <p style={{ margin:0, fontSize:12, color:'#374151', flex:1, paddingRight:8 }}>{ss.code} — {ss.title}</p>
                            {g ? (
                              <span style={{ fontSize:12, fontWeight:700, padding:'3px 10px', borderRadius:6, color:s.color, background:s.bg, flexShrink:0 }}>{g}</span>
                            ) : (
                              <span style={{ fontSize:11, color:'#d1d5db', flexShrink:0 }}>—</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Grade key */}
        <div style={{ margin:'0 20px 16px', padding:12, borderRadius:12, background:'#f8faf8', border:'1px solid #e5e7eb' }}>
          <p style={{ margin:'0 0 8px', fontSize:11, fontWeight:700, color:'#374151', textTransform:'uppercase', letterSpacing:0.5 }}>Grade Key</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
            {Object.entries(GRADE_STYLE).map(([code,s])=>(
              <div key={code} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:11, fontWeight:700, padding:'2px 7px', borderRadius:5, color:s.color, background:s.bg }}>{code}</span>
                <span style={{ fontSize:11, color:'#6b7280' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div style={{ padding:'16px 20px', borderTop:'1px solid #e5e7eb', display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {['Class Teacher','Head Teacher'].map(role=>(
            <div key={role} style={{ textAlign:'center' }}>
              <div style={{ height:40, borderBottom:'1px solid #374151', marginBottom:6 }}/>
              <p style={{ margin:0, fontSize:11, color:'#6b7280' }}>{role}'s Signature</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding:'10px 20px', background:'#0a2419', textAlign:'center' }}>
          <p style={{ margin:0, fontSize:10, color:'rgba(167,216,190,0.6)' }}>Generated by MySchool · CBC Platform · {year}</p>
        </div>
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @media print {
          body * { visibility: hidden !important; }
          #report-card, #report-card * { visibility: visible !important; }
          #report-card { position: fixed; left: 0; top: 0; width: 100%; border-radius: 0 !important; border: none !important; }
        }
      `}</style>
    </div>
  )
}
