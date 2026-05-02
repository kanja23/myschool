// src/pages/teacher/Records.jsx
import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'

export default function Records() {
  const { schoolId, profile } = useAuth()
  const [plans,   setPlans]   = useState([])
  const [selected,setSelected]= useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!schoolId) return
    const q = query(
      collection(db,'schools',schoolId,'schemes'),
      where('teacherId','==',profile.uid)
    )
    return onSnapshot(q, snap => {
      setPlans(snap.docs.map(d=>({id:d.id,...d.data()})).filter(p=>p.completedSubStrands?.length>0))
      setLoading(false)
    })
  }, [schoolId, profile.uid])

  const plan = selected ? plans.find(p=>p.id===selected) : null

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <h2 className="page-title">Records of Work</h2>
        <p className="page-subtitle">Auto-generated from your completed teaching plan sub-strands</p>
      </div>

      <div style={{ padding:14, borderRadius:14, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', gap:12 }}>
        <span style={{ fontSize:20, flexShrink:0 }}>💡</span>
        <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.6 }}>
          Records of Work are automatically generated from your Teaching Plans. Mark sub-strands as complete in your plans, and they appear here as your official record of work.
        </p>
      </div>

      {loading ? (
        <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:40, textAlign:'center', color:'#9ca3af', fontSize:14 }}>Loading…</div>
      ) : plans.length === 0 ? (
        <div style={{ background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:40, textAlign:'center' }}>
          <div style={{ fontSize:40, marginBottom:10 }}>📝</div>
          <p style={{ fontSize:14, color:'#374151', margin:'0 0 6px', fontWeight:600 }}>No records yet</p>
          <p style={{ fontSize:13, color:'#9ca3af' }}>Complete sub-strands in your Teaching Plans to generate records automatically.</p>
        </div>
      ) : !plan ? (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {plans.map(p=>(
            <div key={p.id} style={{ background:'white', borderRadius:14, border:'1px solid #e5e7eb', padding:16, cursor:'pointer', display:'flex', alignItems:'center', gap:14 }}
              onClick={()=>setSelected(p.id)}>
              <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>📝</div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ margin:'0 0 3px', fontSize:14, fontWeight:700, color:'#111' }}>{p.subject}</p>
                <p style={{ margin:0, fontSize:12, color:'#9ca3af' }}>{p.grade} · Term {p.term} · {p.className||'All classes'}</p>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <p style={{ margin:'0 0 2px', fontSize:14, fontWeight:700, color:'#1e7852' }}>{p.completedSubStrands?.length ?? 0} taught</p>
                <p style={{ margin:0, fontSize:11, color:'#9ca3af' }}>of {p.totalSubStrands} sub-strands</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <button onClick={()=>setSelected(null)}
            style={{ alignSelf:'flex-start', padding:'8px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
            ← Back
          </button>

          <div style={{ background:'linear-gradient(135deg,#0a2419,#1e7852)', borderRadius:16, padding:20, color:'white' }}>
            <p style={{ margin:'0 0 2px', fontSize:12, color:'rgba(167,216,190,0.75)' }}>{plan.grade} · Term {plan.term}</p>
            <h3 style={{ margin:'0 0 4px', fontFamily:'Georgia,serif', fontSize:20, fontWeight:400 }}>{plan.subject} — Record of Work</h3>
            <p style={{ margin:0, fontSize:13, color:'rgba(167,216,190,0.7)' }}>{plan.completedSubStrands?.length ?? 0} of {plan.totalSubStrands} sub-strands taught</p>
          </div>

          {/* Print button */}
          <button onClick={()=>window.print()}
            style={{ padding:'10px', borderRadius:12, border:'1px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
            🖨️ Print Record of Work
          </button>

          <div id="record-print" style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {(plan.weeks??[]).map((week,i)=>{
              const done = plan.completedSubStrands?.includes(week.subStrandCode)
              return (
                <div key={i} style={{ background:'white', borderRadius:12, border:`1.5px solid ${done?'#bbf7d0':'#e5e7eb'}`, padding:14, opacity: done?1:0.5 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#1e7852', background:'#f0f9f4', padding:'2px 8px', borderRadius:6 }}>{week.weekRange}</span>
                    <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:6, color: done?'#16a34a':'#9ca3af', background: done?'#f0fdf4':'#f5f5f5' }}>
                      {done ? '✓ Taught' : 'Not yet taught'}
                    </span>
                  </div>
                  <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:700, color:'#111' }}>{week.subStrandCode} — {week.subStrandTitle}</p>
                  <p style={{ margin:0, fontSize:11, color:'#9ca3af', lineHeight:1.4 }}>{week.outcomes?.[0]}</p>
                </div>
              )
            })}
          </div>
          <style>{`
            @media print {
              body * { visibility: hidden !important; }
              #record-print, #record-print * { visibility: visible !important; }
              #record-print { position: fixed; left: 0; top: 0; width: 100%; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
