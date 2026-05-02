// src/pages/teacher/Plans.jsx
import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useClasses } from '@/hooks/useSchool'
import { createPlan, deletePlan, markSubStrandComplete } from '@/services/plans.service'
import { generatePlanContent } from '@/services/plans.service'
import { CBC_CURRICULUM, getSubjectsForGrade, ALL_GRADES } from '@/data/cbcCurriculum'
import Modal from '@/components/ui/Modal'
import toast from 'react-hot-toast'

const TERMS = ['1','2','3']
const SI = { width:'100%', padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white' }
const focus = e => { e.target.style.borderColor='#1e7852' }
const blur  = e => { e.target.style.borderColor='#e5e7eb' }

const STATUS_STYLE = {
  draft:     { color:'#6b7280', bg:'#f5f5f5',   label:'Draft'     },
  active:    { color:'#2563eb', bg:'#eff6ff',   label:'Active'    },
  completed: { color:'#16a34a', bg:'#f0fdf4',   label:'Completed' },
}

export default function Plans() {
  const { schoolId, profile } = useAuth()
  const { classes }           = useClasses()
  const [plans,    setPlans]  = useState([])
  const [loading,  setLoading]= useState(true)
  const [modal,    setModal]  = useState(false)   // create modal
  const [viewPlan, setViewPlan]= useState(null)   // plan detail view
  const [saving,   setSaving] = useState(false)
  const [deleting, setDeleting]= useState(null)

  // Generator form state
  const [grade,    setGrade]   = useState('Grade 4')
  const [subject,  setSubject] = useState('')
  const [term,     setTerm]    = useState('1')
  const [classId,  setClassId] = useState('')
  const [preview,  setPreview] = useState(null)

  // Subjects for selected grade
  const subjects = getSubjectsForGrade(grade)

  useEffect(() => {
    if (subjects.length && !subjects.includes(subject)) setSubject(subjects[0])
  }, [grade])

  useEffect(() => {
    if (!schoolId) return
    const q = query(
      collection(db, 'schools', schoolId, 'schemes'),
      where('teacherId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    )
    return onSnapshot(q, snap => {
      setPlans(snap.docs.map(d => ({ id:d.id, ...d.data() })))
      setLoading(false)
    })
  }, [schoolId, profile.uid])

  function handleGenerate() {
    if (!subject) { toast.error('Please select a subject'); return }
    const cls     = classes.find(c => c.id === classId)
    const content = generatePlanContent(grade, subject, term, cls)
    if (!content) { toast.error('No curriculum data found for this selection'); return }
    setPreview(content)
  }

  async function handleSave() {
    if (!preview) return
    setSaving(true)
    try {
      await createPlan(schoolId, profile, preview)
      toast.success('Teaching plan saved!')
      setModal(false)
      setPreview(null)
    } catch { toast.error('Failed to save plan') }
    finally  { setSaving(false) }
  }

  async function handleDelete(plan) {
    if (!window.confirm(`Delete "${plan.subject} – Term ${plan.term}" plan?`)) return
    setDeleting(plan.id)
    try {
      await deletePlan(schoolId, plan.id)
      toast.success('Plan deleted')
      if (viewPlan?.id === plan.id) setViewPlan(null)
    } catch { toast.error('Failed to delete') }
    finally  { setDeleting(null) }
  }

  async function handleToggleSubStrand(planId, code, total) {
    try {
      await markSubStrandComplete(schoolId, planId, code, total)
    } catch { toast.error('Failed to update') }
  }

  // If viewing a plan detail
  if (viewPlan) return (
    <PlanDetail
      plan={viewPlan}
      onBack={() => setViewPlan(null)}
      onToggle={(code) => handleToggleSubStrand(viewPlan.id, code, viewPlan.totalSubStrands)}
      onDelete={() => { handleDelete(viewPlan); setViewPlan(null) }}
    />
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 className="page-title">Teaching Plans</h2>
          <p className="page-subtitle">{plans.length} plan{plans.length!==1?'s':''} · CBC-aligned, auto-generated</p>
        </div>
        <button onClick={() => { setModal(true); setPreview(null) }}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
          + Generate Plan
        </button>
      </div>

      {/* Info banner */}
      <div style={{ padding:14, borderRadius:14, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', gap:12, alignItems:'flex-start' }}>
        <span style={{ fontSize:20, flexShrink:0 }}>⚡</span>
        <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.6 }}>
          Select a grade, subject and term — MySchool generates a complete CBC-aligned teaching plan instantly using real KICD 2025 strand data. Mark sub-strands as complete to track your syllabus coverage.
        </p>
      </div>

      {/* Plans list */}
      {loading ? (
        <div className="card p-10 text-center text-gray-400">Loading plans…</div>
      ) : plans.length === 0 ? (
        <div className="card p-12 text-center">
          <div style={{ fontSize:52, marginBottom:12 }}>📋</div>
          <p style={{ fontSize:16, fontWeight:600, color:'#374151', margin:'0 0 6px' }}>No plans yet</p>
          <p style={{ fontSize:14, color:'#9ca3af', margin:'0 0 20px' }}>Generate your first CBC teaching plan in seconds</p>
          <button onClick={() => setModal(true)}
            style={{ padding:'10px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
            + Generate First Plan
          </button>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:14 }}>
          {plans.map(plan => {
            const st = STATUS_STYLE[plan.status] ?? STATUS_STYLE.draft
            return (
              <div key={plan.id} style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:20, boxShadow:'0 1px 4px rgba(0,0,0,0.04)', display:'flex', flexDirection:'column', gap:14 }}>
                {/* Plan header */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ margin:'0 0 4px', fontSize:15, fontWeight:700, color:'#111', lineHeight:1.3 }}>{plan.subject}</p>
                    <p style={{ margin:0, fontSize:12, color:'#9ca3af' }}>{plan.grade} · Term {plan.term} · {plan.className || 'No class'}</p>
                  </div>
                  <span style={{ fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999, color:st.color, background:st.bg, flexShrink:0 }}>{st.label}</span>
                </div>

                {/* Coverage bar */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:12, color:'#6b7280' }}>Syllabus coverage</span>
                    <span style={{ fontSize:12, fontWeight:700, color:'#1e7852' }}>{plan.coveragePercent ?? 0}%</span>
                  </div>
                  <div style={{ background:'#f0f0f0', borderRadius:999, height:6 }}>
                    <div style={{ width:`${plan.coveragePercent ?? 0}%`, height:6, borderRadius:999, background:'linear-gradient(90deg,#1e7852,#2e9468)', transition:'width 0.5s' }}/>
                  </div>
                </div>

                {/* Sub-strand count */}
                <div style={{ display:'flex', gap:12 }}>
                  <div style={{ flex:1, padding:'8px 10px', borderRadius:10, background:'#f8faf8', textAlign:'center' }}>
                    <p style={{ margin:0, fontSize:18, fontWeight:700, color:'#1e7852' }}>{plan.completedSubStrands?.length ?? 0}</p>
                    <p style={{ margin:0, fontSize:10, color:'#9ca3af' }}>Done</p>
                  </div>
                  <div style={{ flex:1, padding:'8px 10px', borderRadius:10, background:'#f8faf8', textAlign:'center' }}>
                    <p style={{ margin:0, fontSize:18, fontWeight:700, color:'#374151' }}>{plan.totalSubStrands ?? 0}</p>
                    <p style={{ margin:0, fontSize:10, color:'#9ca3af' }}>Total</p>
                  </div>
                  <div style={{ flex:1, padding:'8px 10px', borderRadius:10, background:'#f8faf8', textAlign:'center' }}>
                    <p style={{ margin:0, fontSize:18, fontWeight:700, color:'#d97706' }}>{plan.lessonsPerWeek ?? 0}</p>
                    <p style={{ margin:0, fontSize:10, color:'#9ca3af' }}>L/Week</p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
                  <button onClick={() => setViewPlan(plan)}
                    style={{ flex:2, padding:'9px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                    View Plan
                  </button>
                  <button onClick={() => handleDelete(plan)} disabled={deleting===plan.id}
                    style={{ flex:1, padding:'9px', borderRadius:10, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                    {deleting===plan.id ? '…' : 'Delete'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Generate Plan Modal */}
      <Modal open={modal} onClose={() => { setModal(false); setPreview(null) }} title="Generate Teaching Plan" width={600}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {!preview ? (
            <>
              <p style={{ fontSize:14, color:'#6b7280', margin:0 }}>Select grade, subject and term — a full CBC plan will be generated instantly.</p>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Grade</label>
                  <select value={grade} onChange={e => setGrade(e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                    {ALL_GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Term</label>
                  <select value={term} onChange={e => setTerm(e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                    {TERMS.map(t => <option key={t} value={t}>Term {t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  {subjects.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Class <span style={{ color:'#9ca3af', fontWeight:400 }}>(optional)</span></label>
                <select value={classId} onChange={e => setClassId(e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  <option value="">Select class…</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Preview of what will be generated */}
              {subject && CBC_CURRICULUM[grade]?.[subject] && (
                <div style={{ padding:14, borderRadius:12, background:'#f8faf8', border:'1px solid #e5e7eb' }}>
                  <p style={{ fontSize:12, fontWeight:700, color:'#374151', margin:'0 0 8px', textTransform:'uppercase', letterSpacing:0.5 }}>Plan Preview</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
                    {[
                      { label:'Strands', value: CBC_CURRICULUM[grade][subject].strands.length },
                      { label:'Sub-strands', value: CBC_CURRICULUM[grade][subject].strands.reduce((s,x) => s+x.subStrands.length,0) },
                      { label:'Lessons/week', value: CBC_CURRICULUM[grade][subject].lessonsPerWeek },
                      { label:'Weeks', value: 13 },
                    ].map(i => (
                      <div key={i.label} style={{ textAlign:'center' }}>
                        <p style={{ margin:0, fontSize:20, fontWeight:700, color:'#1e7852' }}>{i.value}</p>
                        <p style={{ margin:0, fontSize:11, color:'#9ca3af' }}>{i.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={handleGenerate}
                style={{ padding:'12px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
                ⚡ Generate Plan
              </button>
            </>
          ) : (
            <>
              {/* Preview generated plan */}
              <div style={{ padding:16, borderRadius:14, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0' }}>
                <p style={{ margin:'0 0 4px', fontSize:15, fontWeight:700, color:'#1e7852' }}>✅ Plan Generated Successfully!</p>
                <p style={{ margin:0, fontSize:13, color:'#166534' }}>{preview.subject} · {preview.grade} · Term {preview.term}</p>
              </div>

              <div style={{ maxHeight:280, overflowY:'auto', display:'flex', flexDirection:'column', gap:8 }}>
                {preview.weeks.slice(0,5).map((w,i) => (
                  <div key={i} style={{ padding:12, borderRadius:10, background:'white', border:'1px solid #e5e7eb' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:'#1e7852' }}>{w.weekRange}</span>
                      <span style={{ fontSize:11, color:'#9ca3af' }}>{w.lessons} lessons</span>
                    </div>
                    <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:600, color:'#111' }}>{w.subStrandTitle}</p>
                    <p style={{ margin:0, fontSize:11, color:'#9ca3af', lineHeight:1.4 }}>{w.outcomes[0]}</p>
                  </div>
                ))}
                {preview.weeks.length > 5 && (
                  <p style={{ textAlign:'center', fontSize:12, color:'#9ca3af', margin:0 }}>+ {preview.weeks.length - 5} more weeks…</p>
                )}
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => setPreview(null)}
                  style={{ flex:1, padding:'11px', borderRadius:12, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
                  ← Back
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{ flex:2, padding:'11px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:saving?'not-allowed':'pointer', fontFamily:'inherit', opacity:saving?0.75:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  {saving && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
                  {saving ? 'Saving…' : '💾 Save Plan'}
                </button>
              </div>
            </>
          )}
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </Modal>
    </div>
  )
}

// ── Plan Detail View ────────────────────────────────────────────────────────
function PlanDetail({ plan, onBack, onToggle, onDelete }) {
  const [toggling, setToggling] = useState(null)

  async function handleToggle(code) {
    setToggling(code)
    await onToggle(code)
    setToggling(null)
  }

  const completed = plan.completedSubStrands ?? []
  const total     = plan.totalSubStrands ?? 0
  const coverage  = plan.coveragePercent ?? 0

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Back button */}
      <button onClick={onBack}
        style={{ alignSelf:'flex-start', display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
        ← Back to Plans
      </button>

      {/* Plan header */}
      <div style={{ background:'linear-gradient(135deg,#0a2419,#1e7852)', borderRadius:20, padding:24, color:'white' }}>
        <p style={{ margin:'0 0 4px', fontSize:13, color:'rgba(167,216,190,0.8)' }}>{plan.grade} · Term {plan.term} · {plan.className || 'All classes'}</p>
        <h2 style={{ margin:'0 0 16px', fontFamily:'Georgia,serif', fontSize:22, fontWeight:400 }}>{plan.subject}</h2>
        <div style={{ display:'flex', flexWrap:'wrap', gap:20, marginBottom:16 }}>
          {[
            { label:'Coverage', value:`${coverage}%` },
            { label:'Completed', value:`${completed.length}/${total}` },
            { label:'Lessons/week', value: plan.lessonsPerWeek },
            { label:'Weeks', value: 13 },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <p style={{ margin:'0 0 2px', fontSize:22, fontWeight:700 }}>{s.value}</p>
              <p style={{ margin:0, fontSize:11, color:'rgba(167,216,190,0.7)' }}>{s.label}</p>
            </div>
          ))}
        </div>
        {/* Coverage bar */}
        <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:999, height:8 }}>
          <div style={{ width:`${coverage}%`, height:8, borderRadius:999, background:'linear-gradient(90deg,#fbbf24,#f59e0b)', transition:'width 0.6s' }}/>
        </div>
      </div>

      {/* Weekly plan */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#111', margin:0 }}>Weekly Teaching Plan</h3>

        {(plan.weeks ?? []).map((week, i) => {
          const isDone = completed.includes(week.subStrandCode)
          return (
            <div key={i} style={{ background:'white', borderRadius:14, border:`1.5px solid ${isDone ? '#bbf7d0' : '#e5e7eb'}`, padding:16, transition:'all 0.2s' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                {/* Checkbox */}
                <button onClick={() => handleToggle(week.subStrandCode)} disabled={toggling===week.subStrandCode}
                  style={{ width:24, height:24, borderRadius:6, border:`2px solid ${isDone?'#1e7852':'#d1d5db'}`, background: isDone?'#1e7852':'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, marginTop:2, transition:'all 0.2s' }}>
                  {toggling===week.subStrandCode
                    ? <span style={{ width:10, height:10, border:'1.5px solid rgba(255,255,255,0.4)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>
                    : isDone && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  }
                </button>

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#1e7852', background:'#f0f9f4', padding:'2px 8px', borderRadius:6 }}>{week.weekRange}</span>
                    <span style={{ fontSize:11, color:'#9ca3af' }}>{week.lessons} lessons</span>
                    <span style={{ fontSize:11, color:'#9ca3af', flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{week.strandCode}</span>
                  </div>
                  <p style={{ margin:'0 0 6px', fontSize:14, fontWeight:700, color: isDone?'#6b7280':'#111', textDecoration: isDone?'line-through':'' }}>
                    {week.subStrandCode} — {week.subStrandTitle}
                  </p>

                  {/* Learning outcomes */}
                  <div style={{ display:'flex', flexDirection:'column', gap:3, marginBottom:8 }}>
                    {week.outcomes?.slice(0,2).map((o,oi) => (
                      <p key={oi} style={{ margin:0, fontSize:12, color:'#6b7280', lineHeight:1.4, paddingLeft:12, borderLeft:`2px solid ${isDone?'#bbf7d0':'#e5e7eb'}` }}>{o}</p>
                    ))}
                  </div>

                  {/* Activities and resources - collapsed on mobile */}
                  <details style={{ marginTop:6 }}>
                    <summary style={{ fontSize:12, color:'#1e7852', fontWeight:600, cursor:'pointer', userSelect:'none' }}>View activities & resources</summary>
                    <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:8 }}>
                      <div>
                        <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:700, color:'#374151', textTransform:'uppercase', letterSpacing:0.5 }}>Activities</p>
                        {week.activities?.map((a,ai) => (
                          <p key={ai} style={{ margin:'0 0 2px', fontSize:12, color:'#6b7280', paddingLeft:12 }}>• {a}</p>
                        ))}
                      </div>
                      <div>
                        <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:700, color:'#374151', textTransform:'uppercase', letterSpacing:0.5 }}>Resources</p>
                        <p style={{ margin:0, fontSize:12, color:'#6b7280', paddingLeft:12 }}>{week.resources?.join(', ')}</p>
                      </div>
                      <div>
                        <p style={{ margin:'0 0 2px', fontSize:11, fontWeight:700, color:'#374151', textTransform:'uppercase', letterSpacing:0.5 }}>Assessment</p>
                        <p style={{ margin:0, fontSize:12, color:'#6b7280', paddingLeft:12 }}>{week.assessment}</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Delete */}
      <button onClick={onDelete}
        style={{ padding:'11px', borderRadius:12, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
        Delete This Plan
      </button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
