// src/pages/admin/Classes.jsx
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useClasses } from '@/hooks/useSchool'
import { createClass, deleteClass } from '@/services/school.service'
import Modal from '@/components/ui/Modal'
import toast from 'react-hot-toast'

const GRADES = ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6']
const GRADE_ORDER = { 'PP1':0,'PP2':1,'Grade 1':2,'Grade 2':3,'Grade 3':4,'Grade 4':5,'Grade 5':6,'Grade 6':7 }
const SI = { width:'100%', padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white' }

export default function Classes() {
  const { schoolId } = useAuth()
  const { classes, loading } = useClasses()
  const [modal, setModal]   = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm]     = useState({ grade:'Grade 4', stream:'', capacity:40 })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const focus = e => { e.target.style.borderColor='#1e7852' }
  const blur  = e => { e.target.style.borderColor='#e5e7eb' }

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.stream) { toast.error('Please enter a stream name'); return }
    setSaving(true)
    try {
      await createClass(schoolId, {
        grade:      form.grade,
        stream:     form.stream.trim(),
        name:       `${form.grade} ${form.stream.trim()}`,
        capacity:   Number(form.capacity),
        gradeOrder: GRADE_ORDER[form.grade] ?? 99,
        teacherId:  null,
        teacherName: null,
        studentCount: 0,
      })
      toast.success(`${form.grade} ${form.stream} created!`)
      setModal(false)
      setForm({ grade:'Grade 4', stream:'', capacity:40 })
    } catch { toast.error('Failed to create class') }
    finally  { setSaving(false) }
  }

  async function handleDelete(cls) {
    if (!window.confirm(`Delete ${cls.name}? This cannot be undone.`)) return
    setDeleting(cls.id)
    try {
      await deleteClass(schoolId, cls.id)
      toast.success(`${cls.name} deleted`)
    } catch { toast.error('Failed to delete class') }
    finally  { setDeleting(null) }
  }

  // Group by grade
  const grouped = GRADES.reduce((acc, g) => {
    const list = classes.filter(c => c.grade === g)
    if (list.length) acc[g] = list
    return acc
  }, {})

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 className="page-title">Classes</h2>
          <p className="page-subtitle">{classes.length} class{classes.length !== 1 ? 'es' : ''} · Manage streams and assign teachers</p>
        </div>
        <button onClick={() => setModal(true)}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
          + Add Class
        </button>
      </div>

      {loading ? (
        <div className="card p-12 text-center text-gray-400">Loading classes…</div>
      ) : classes.length === 0 ? (
        <div className="card p-12 text-center">
          <div style={{ fontSize:48, marginBottom:12 }}>🏫</div>
          <p style={{ fontSize:16, fontWeight:600, color:'#374151', margin:'0 0 6px' }}>No classes yet</p>
          <p style={{ fontSize:14, color:'#9ca3af', margin:'0 0 20px' }}>Add your first class to get started</p>
          <button onClick={() => setModal(true)}
            style={{ padding:'10px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
            + Add First Class
          </button>
        </div>
      ) : (
        Object.entries(grouped).map(([grade, list]) => (
          <div key={grade} className="card p-5">
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <span style={{ fontSize:20 }}>📚</span>
              <h3 style={{ fontSize:15, fontWeight:700, color:'#111', margin:0 }}>{grade}</h3>
              <span style={{ fontSize:12, color:'#9ca3af', background:'#f5f5f5', padding:'2px 10px', borderRadius:999 }}>{list.length} stream{list.length !== 1 ? 's':''}</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
              {list.map(cls => (
                <div key={cls.id} style={{ padding:16, borderRadius:14, border:'1.5px solid #e5e7eb', background:'#fafafa', position:'relative' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                    <div>
                      <p style={{ margin:'0 0 2px', fontSize:15, fontWeight:700, color:'#111' }}>{cls.name}</p>
                      <p style={{ margin:0, fontSize:12, color:'#9ca3af' }}>Capacity: {cls.capacity ?? '—'} learners</p>
                    </div>
                    <button onClick={() => handleDelete(cls)} disabled={deleting === cls.id}
                      style={{ padding:'4px 8px', borderRadius:8, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                      {deleting === cls.id ? '…' : 'Delete'}
                    </button>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    {cls.teacherName ? (
                      <span style={{ fontSize:12, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', padding:'3px 10px', borderRadius:999, fontWeight:600 }}>
                        👩‍🏫 {cls.teacherName}
                      </span>
                    ) : (
                      <span style={{ fontSize:12, color:'#f59e0b', background:'#fffbeb', border:'1px solid #fde68a', padding:'3px 10px', borderRadius:999 }}>
                        No teacher assigned
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Add Class Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Add New Class">
        <form onSubmit={handleCreate} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Grade level</label>
            <select value={form.grade} onChange={e => set('grade', e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
              {GRADES.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Stream name <span style={{ color:'#dc2626' }}>*</span></label>
            <input value={form.stream} onChange={e => set('stream', e.target.value)} placeholder="e.g. North, South, A, B, Red, Blue" style={SI} onFocus={focus} onBlur={blur} required />
            <p style={{ fontSize:12, color:'#9ca3af', margin:'6px 0 0' }}>This creates "{form.grade} {form.stream || 'North'}"</p>
          </div>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Class capacity</label>
            <input type="number" value={form.capacity} onChange={e => set('capacity', e.target.value)} min={1} max={100} style={SI} onFocus={focus} onBlur={blur} />
          </div>
          <div style={{ display:'flex', gap:12, marginTop:8 }}>
            <button type="button" onClick={() => setModal(false)}
              style={{ flex:1, padding:'11px', borderRadius:12, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving}
              style={{ flex:2, padding:'11px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor: saving ? 'not-allowed' : 'pointer', fontFamily:'inherit', opacity: saving ? 0.75 : 1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {saving && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
              {saving ? 'Creating…' : 'Create Class'}
            </button>
          </div>
        </form>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </Modal>
    </div>
  )
}
