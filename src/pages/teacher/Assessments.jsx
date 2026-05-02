// src/pages/teacher/Assessments.jsx
import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useClasses } from '@/hooks/useSchool'
import { getStrandsForSubject, getSubjectsForGrade, ALL_GRADES } from '@/data/cbcCurriculum'
import toast from 'react-hot-toast'

const GRADES_MAP = { EE:4, ME:3, AE:2, BE:1 }
const GRADE_STYLE = {
  EE: { color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0', label:'Exceeding' },
  ME: { color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe', label:'Meeting'   },
  AE: { color:'#d97706', bg:'#fffbeb', border:'#fde68a', label:'Approaching'},
  BE: { color:'#dc2626', bg:'#fef2f2', border:'#fecaca', label:'Below'     },
}
const SI = { width:'100%', padding:'9px 12px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white', appearance:'none' }

export default function Assessments() {
  const { schoolId, profile } = useAuth()
  const { classes }           = useClasses()
  const [grade,    setGrade]   = useState('Grade 4')
  const [subject,  setSubject] = useState('')
  const [term,     setTerm]    = useState('1')
  const [classId,  setClassId] = useState('')
  const [students, setStudents]= useState([])
  const [scores,   setScores]  = useState({})   // { studentId: { strandCode: 'EE'|'ME'|'AE'|'BE' } }
  const [saving,   setSaving]  = useState(false)
  const [loadingStu, setLoadingStu] = useState(false)

  const subjects = getSubjectsForGrade(grade)
  const strands  = subject ? getStrandsForSubject(grade, subject) : []

  useEffect(() => { if (subjects.length && !subjects.includes(subject)) setSubject(subjects[0]) }, [grade])

  // Load students for selected class
  useEffect(() => {
    if (!classId || !schoolId) { setStudents([]); return }
    setLoadingStu(true)
    const q = query(collection(db,'schools',schoolId,'students'), where('classId','==',classId))
    return onSnapshot(q, snap => {
      setStudents(snap.docs.map(d => ({ id:d.id, ...d.data() })).sort((a,b) => a.surname?.localeCompare(b.surname)))
      setLoadingStu(false)
    })
  }, [classId, schoolId])

  // Load existing scores
  useEffect(() => {
    if (!classId || !subject || !schoolId) return
    const assessId = `${classId}_${grade.replace(/\s/g,'')}_${subject.replace(/\s/g,'')}_T${term}`
    getDoc(doc(db,'schools',schoolId,'assessments',assessId)).then(snap => {
      if (snap.exists()) setScores(snap.data().scores ?? {})
      else setScores({})
    })
  }, [classId, subject, grade, term, schoolId])

  function setScore(studentId, strandCode, value) {
    setScores(prev => ({
      ...prev,
      [studentId]: { ...(prev[studentId] ?? {}), [strandCode]: value }
    }))
  }

  async function handleSave() {
    if (!classId || !subject) { toast.error('Select a class and subject first'); return }
    setSaving(true)
    try {
      const assessId = `${classId}_${grade.replace(/\s/g,'')}_${subject.replace(/\s/g,'')}_T${term}`
      await setDoc(doc(db,'schools',schoolId,'assessments',assessId), {
        classId, grade, subject, term,
        schoolId,
        teacherId:    profile.uid,
        teacherName:  profile.displayName,
        scores,
        updatedAt:    serverTimestamp(),
        createdAt:    serverTimestamp(),
      }, { merge: true })
      toast.success('Assessment saved!')
    } catch { toast.error('Failed to save') }
    finally  { setSaving(false) }
  }

  const focus = e => e.target.style.borderColor='#1e7852'
  const blur  = e => e.target.style.borderColor='#e5e7eb'

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <h2 className="page-title">Assessments</h2>
        <p className="page-subtitle">Enter CBC competency ratings per strand for each learner</p>
      </div>

      {/* Filters */}
      <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Grade</label>
            <select value={grade} onChange={e=>setGrade(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
              {ALL_GRADES.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Term</label>
            <select value={term} onChange={e=>setTerm(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
              {['1','2','3'].map(t=><option key={t} value={t}>Term {t}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Subject</label>
            <select value={subject} onChange={e=>setSubject(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
              {subjects.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:5 }}>Class</label>
            <select value={classId} onChange={e=>setClassId(e.target.value)} style={SI} onFocus={focus} onBlur={blur}>
              <option value="">Select class…</option>
              {classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grade legend */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {Object.entries(GRADE_STYLE).map(([code,s])=>(
          <div key={code} style={{ display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:8, background:s.bg, border:`1px solid ${s.border}` }}>
            <span style={{ fontSize:11, fontWeight:700, color:s.color }}>{code}</span>
            <span style={{ fontSize:11, color:'#6b7280' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Assessment table */}
      {!classId ? (
        <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:40, textAlign:'center', color:'#9ca3af' }}>
          <div style={{ fontSize:40, marginBottom:10 }}>✅</div>
          <p style={{ fontSize:14 }}>Select a class to start entering assessments</p>
        </div>
      ) : loadingStu ? (
        <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:40, textAlign:'center', color:'#9ca3af', fontSize:14 }}>Loading students…</div>
      ) : students.length === 0 ? (
        <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:40, textAlign:'center', color:'#9ca3af' }}>
          <p style={{ fontSize:14 }}>No students in this class yet. Enrol students first.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {students.map(student => {
            const studentScores = scores[student.id] ?? {}
            const filledStrands = Object.keys(studentScores).length
            const totalStrands  = strands.reduce((s,st)=>s+st.subStrands.length,0)
            return (
              <div key={student.id} style={{ background:'white', borderRadius:14, border:'1px solid #e5e7eb', overflow:'hidden' }}>
                {/* Student header */}
                <div style={{ padding:'12px 14px', background:'#f8faf8', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:8, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>
                      {student.gender==='Female'?'👧':'👦'}
                    </div>
                    <div>
                      <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#111' }}>{student.fullName}</p>
                      <p style={{ margin:0, fontSize:11, color:'#9ca3af', fontFamily:'monospace' }}>{student.admissionNo}</p>
                    </div>
                  </div>
                  <span style={{ fontSize:11, color:'#6b7280', background:'#e5e7eb', padding:'3px 8px', borderRadius:6 }}>
                    {filledStrands}/{totalStrands}
                  </span>
                </div>

                {/* Strands */}
                <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', gap:10 }}>
                  {strands.map(strand => (
                    <div key={strand.strand}>
                      <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:0.5 }}>{strand.strand}</p>
                      {strand.subStrands.map(ss => {
                        const current = studentScores[ss.code]
                        return (
                          <div key={ss.code} style={{ marginBottom:8 }}>
                            <p style={{ margin:'0 0 5px', fontSize:12, color:'#374151', fontWeight:500 }}>{ss.code} — {ss.title}</p>
                            <div style={{ display:'flex', gap:6 }}>
                              {['EE','ME','AE','BE'].map(grade => {
                                const s = GRADE_STYLE[grade]
                                const selected = current === grade
                                return (
                                  <button key={grade} onClick={()=>setScore(student.id, ss.code, grade)}
                                    style={{ flex:1, padding:'7px 4px', borderRadius:8, border:`2px solid ${selected?s.color:s.border}`, background: selected?s.color:'white', color: selected?'white':s.color, fontWeight:700, fontSize:12, cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                                    {grade}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Save button */}
          <button onClick={handleSave} disabled={saving}
            style={{ padding:'13px', borderRadius:14, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:15, cursor:saving?'not-allowed':'pointer', fontFamily:'inherit', opacity:saving?0.75:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 4px 14px rgba(30,120,82,0.3)' }}>
            {saving && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
            {saving ? 'Saving…' : '💾 Save All Assessments'}
          </button>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
