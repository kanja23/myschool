// src/pages/admin/Teachers.jsx
import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useClasses } from '@/hooks/useSchool'
import { approveUser, rejectUser, assignTeacherToClass } from '@/services/school.service'
import Modal from '@/components/ui/Modal'
import toast from 'react-hot-toast'

export default function Teachers() {
  const { schoolId, profile } = useAuth()
  const { classes } = useClasses()
  const [teachers, setTeachers]   = useState([])
  const [pending,  setPending]    = useState([])
  const [loading,  setLoading]    = useState(true)
  const [assignModal, setAssignModal] = useState(null) // teacher object
  const [selectedClass, setSelectedClass] = useState('')
  const [working, setWorking] = useState(null)
  const [tab, setTab] = useState('active') // 'active' | 'pending'

  useEffect(() => {
    if (!schoolId) return
    // Active teachers in this school
    const qT = query(collection(db, 'users'), where('schoolId','==',schoolId), where('role','==','teacher'))
    const unsubT = onSnapshot(qT, snap => {
      setTeachers(snap.docs.map(d => ({ id:d.id, ...d.data() })))
      setLoading(false)
    })
    // Pending users (any role, status pending)
    const qP = query(collection(db, 'users'), where('status','==','pending'), where('role','!=','superadmin'))
    const unsubP = onSnapshot(qP, snap => {
      setPending(snap.docs.map(d => ({ id:d.id, ...d.data() })))
    })
    return () => { unsubT(); unsubP() }
  }, [schoolId])

  async function handleApprove(user) {
    setWorking(user.id)
    try {
      await approveUser(user.id, schoolId, profile.schoolName ?? '')
      toast.success(`${user.displayName} approved!`)
    } catch { toast.error('Failed to approve user') }
    finally { setWorking(null) }
  }

  async function handleReject(user) {
    if (!window.confirm(`Reject ${user.displayName}? They will not be able to access the platform.`)) return
    setWorking(user.id)
    try {
      await rejectUser(user.id)
      toast.success(`${user.displayName} rejected`)
    } catch { toast.error('Failed to reject user') }
    finally { setWorking(null) }
  }

  async function handleAssign() {
    if (!selectedClass || !assignModal) return
    const cls = classes.find(c => c.id === selectedClass)
    setWorking(assignModal.id)
    try {
      await assignTeacherToClass(schoolId, selectedClass, assignModal.id, assignModal.displayName)
      toast.success(`${assignModal.displayName} assigned to ${cls?.name}`)
      setAssignModal(null)
    } catch { toast.error('Failed to assign teacher') }
    finally { setWorking(null) }
  }

  const ROLE_COLORS = { teacher:'#2563eb', parent:'#d97706', admin:'#1e7852', supplier:'#0891b2', student:'#7c3aed' }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 className="page-title">Teachers & Users</h2>
          <p className="page-subtitle">{teachers.length} active teacher{teachers.length!==1?'s':''} · {pending.length} pending approval</p>
        </div>
        {pending.length > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:12, background:'#fffbeb', border:'1px solid #fde68a' }}>
            <span style={{ fontSize:16 }}>⏳</span>
            <span style={{ fontSize:13, fontWeight:600, color:'#92400e' }}>{pending.length} awaiting approval</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, padding:4, background:'#f5f5f5', borderRadius:12, width:'fit-content' }}>
        {[
          { key:'active',  label:`Active (${teachers.length})` },
          { key:'pending', label:`Pending (${pending.length})`, alert: pending.length > 0 },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:'8px 20px', borderRadius:10, border:'none', fontWeight: tab===t.key ? 700 : 500, fontSize:13, cursor:'pointer', fontFamily:'inherit', background: tab===t.key ? 'white' : 'transparent', color: tab===t.key ? '#111' : '#6b7280', boxShadow: tab===t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', position:'relative', transition:'all 0.15s' }}>
            {t.label}
            {t.alert && tab !== 'pending' && <span style={{ position:'absolute', top:4, right:4, width:8, height:8, borderRadius:'50%', background:'#f59e0b' }}/>}
          </button>
        ))}
      </div>

      {/* Active teachers */}
      {tab === 'active' && (
        loading ? <div className="card p-10 text-center text-gray-400">Loading…</div> :
        teachers.length === 0 ? (
          <div className="card p-12 text-center">
            <div style={{ fontSize:48, marginBottom:12 }}>👩‍🏫</div>
            <p style={{ fontSize:16, fontWeight:600, color:'#374151', margin:'0 0 6px' }}>No teachers yet</p>
            <p style={{ fontSize:14, color:'#9ca3af' }}>Teachers who sign up and are approved will appear here.</p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Teacher</th><th>Email</th><th>Assigned Class</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {teachers.map(t => {
                    const assignedClass = classes.find(c => c.teacherId === t.id)
                    return (
                      <tr key={t.id}>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#eff6ff,#dbeafe)', border:'1px solid #bfdbfe', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, color:'#2563eb', flexShrink:0 }}>
                              {t.displayName?.[0]?.toUpperCase()}
                            </div>
                            <span style={{ fontSize:14, fontWeight:600, color:'#111' }}>{t.displayName}</span>
                          </div>
                        </td>
                        <td style={{ fontSize:13, color:'#6b7280' }}>{t.email}</td>
                        <td>
                          {assignedClass
                            ? <span style={{ fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', padding:'4px 10px', borderRadius:8 }}>{assignedClass.name}</span>
                            : <span style={{ fontSize:12, color:'#f59e0b', background:'#fffbeb', border:'1px solid #fde68a', padding:'4px 10px', borderRadius:8 }}>Unassigned</span>
                          }
                        </td>
                        <td><span style={{ fontSize:12, fontWeight:600, color:'#16a34a', background:'#f0fdf4', border:'1px solid #bbf7d0', padding:'3px 10px', borderRadius:999 }}>Active</span></td>
                        <td>
                          <button onClick={() => { setAssignModal(t); setSelectedClass(assignedClass?.id ?? '') }}
                            style={{ fontSize:12, fontWeight:600, color:'#2563eb', background:'#eff6ff', border:'1px solid #bfdbfe', padding:'5px 12px', borderRadius:8, cursor:'pointer', fontFamily:'inherit' }}>
                            {assignedClass ? 'Reassign' : 'Assign Class'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* Pending approvals */}
      {tab === 'pending' && (
        pending.length === 0 ? (
          <div className="card p-12 text-center">
            <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
            <p style={{ fontSize:16, fontWeight:600, color:'#374151', margin:'0 0 6px' }}>No pending approvals</p>
            <p style={{ fontSize:14, color:'#9ca3af' }}>All signup requests have been processed.</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {pending.map(u => (
              <div key={u.id} style={{ background:'white', borderRadius:16, padding:20, border:'1.5px solid #fde68a', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'#fffbeb', border:'1px solid #fde68a', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:18, color:'#d97706', flexShrink:0 }}>
                  {u.displayName?.[0]?.toUpperCase()}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:'0 0 3px', fontSize:15, fontWeight:700, color:'#111' }}>{u.displayName}</p>
                  <p style={{ margin:'0 0 4px', fontSize:13, color:'#6b7280' }}>{u.email}</p>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, color: ROLE_COLORS[u.role] ?? '#374151', background:(ROLE_COLORS[u.role]??'#374151')+'15', border:`1px solid ${ROLE_COLORS[u.role]??'#374151'}30`, textTransform:'capitalize' }}>{u.role}</span>
                    {u.schoolCode && <span style={{ fontSize:11, color:'#9ca3af', padding:'3px 10px', borderRadius:999, background:'#f5f5f5' }}>Code: {u.schoolCode}</span>}
                  </div>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={() => handleReject(u)} disabled={working===u.id}
                    style={{ padding:'8px 16px', borderRadius:10, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                    Reject
                  </button>
                  <button onClick={() => handleApprove(u)} disabled={working===u.id}
                    style={{ padding:'8px 20px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:13, cursor: working===u.id?'not-allowed':'pointer', fontFamily:'inherit', opacity: working===u.id ? 0.75 : 1, display:'flex', alignItems:'center', gap:6 }}>
                    {working===u.id && <span style={{ width:12, height:12, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
                    ✓ Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Assign class modal */}
      <Modal open={!!assignModal} onClose={() => setAssignModal(null)} title={`Assign Class — ${assignModal?.displayName}`}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <p style={{ fontSize:14, color:'#6b7280', margin:0 }}>Select which class this teacher will be responsible for.</p>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Class</label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              style={{ width:'100%', padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', fontFamily:'inherit', appearance:'none' }}
              onFocus={e => e.target.style.borderColor='#1e7852'}
              onBlur={e => e.target.style.borderColor='#e5e7eb'}>
              <option value="">Select a class…</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name} {c.teacherName ? `(${c.teacherName})` : ''}</option>)}
            </select>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setAssignModal(null)}
              style={{ flex:1, padding:'11px', borderRadius:12, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
              Cancel
            </button>
            <button onClick={handleAssign} disabled={!selectedClass || working===assignModal?.id}
              style={{ flex:2, padding:'11px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:!selectedClass?'not-allowed':'pointer', fontFamily:'inherit', opacity:!selectedClass?0.5:1 }}>
              Assign Class
            </button>
          </div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </Modal>
    </div>
  )
}
