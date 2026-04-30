// src/pages/admin/Students.jsx
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useClasses, useStudents } from '@/hooks/useSchool'
import { createStudent, deleteStudent } from '@/services/school.service'
import Modal from '@/components/ui/Modal'
import toast from 'react-hot-toast'

const SI = { width:'100%', padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white' }
const GENDERS = ['Male','Female']

export default function Students() {
  const { schoolId } = useAuth()
  const { classes }  = useClasses()
  const [filterClass, setFilterClass] = useState('')
  const { students, loading } = useStudents(filterClass || null)
  const [modal,   setModal]   = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [deleting,setDeleting]= useState(null)
  const [search,  setSearch]  = useState('')
  const [form, setForm] = useState({
    surname:'', firstName:'', otherName:'', gender:'Male',
    dob:'', classId:'', grade:'', parentName:'', parentPhone:'', parentEmail:'',
  })

  const set = (k,v) => setForm(f => ({ ...f, [k]: v }))
  const focus = e => { e.target.style.borderColor='#1e7852' }
  const blur  = e => { e.target.style.borderColor='#e5e7eb' }

  function handleClassChange(classId) {
    const cls = classes.find(c => c.id === classId)
    setForm(f => ({ ...f, classId, grade: cls?.grade ?? '', className: cls?.name ?? '' }))
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.surname || !form.firstName || !form.classId) {
      toast.error('Please fill in surname, first name, and class')
      return
    }
    setSaving(true)
    try {
      const { admissionNo } = await createStudent(schoolId, {
        surname:      form.surname.trim(),
        firstName:    form.firstName.trim(),
        otherName:    form.otherName.trim(),
        fullName:     `${form.surname.trim()} ${form.firstName.trim()} ${form.otherName.trim()}`.trim(),
        gender:       form.gender,
        dob:          form.dob,
        classId:      form.classId,
        grade:        form.grade,
        className:    form.className,
        parentName:   form.parentName.trim(),
        parentPhone:  form.parentPhone.trim(),
        parentEmail:  form.parentEmail.trim(),
      })
      toast.success(`${form.firstName} enrolled! Adm No: ${admissionNo}`)
      setModal(false)
      setForm({ surname:'', firstName:'', otherName:'', gender:'Male', dob:'', classId:'', grade:'', parentName:'', parentPhone:'', parentEmail:'' })
    } catch (err) {
      toast.error('Failed to enrol student')
    } finally { setSaving(false) }
  }

  async function handleDelete(s) {
    if (!window.confirm(`Remove ${s.fullName} from the system?`)) return
    setDeleting(s.id)
    try {
      await deleteStudent(schoolId, s.id)
      toast.success(`${s.fullName} removed`)
    } catch { toast.error('Failed to remove student') }
    finally  { setDeleting(null) }
  }

  const filtered = students.filter(s =>
    !search || s.fullName?.toLowerCase().includes(search.toLowerCase()) || s.admissionNo?.includes(search)
  )

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 className="page-title">Students</h2>
          <p className="page-subtitle">{students.length} learner{students.length!==1?'s':''} enrolled</p>
        </div>
        <button onClick={() => setModal(true)}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
          + Enrol Student
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or admission no…"
          style={{ ...SI, maxWidth:280 }} onFocus={focus} onBlur={blur} />
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)}
          style={{ ...SI, maxWidth:200, appearance:'none' }} onFocus={focus} onBlur={blur}>
          <option value="">All classes</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12 }}>
        {[
          { label:'Total Students', value: students.length, color:'#1e7852', bg:'#f0f9f4', icon:'👥' },
          { label:'Classes',        value: classes.length,  color:'#2563eb', bg:'#eff6ff', icon:'🏫' },
          { label:'Girls',          value: students.filter(s=>s.gender==='Female').length, color:'#be185d', bg:'#fdf2f8', icon:'👧' },
          { label:'Boys',           value: students.filter(s=>s.gender==='Male').length,   color:'#0891b2', bg:'#ecfeff', icon:'👦' },
        ].map(s => (
          <div key={s.label} style={{ padding:16, borderRadius:14, border:`1px solid ${s.color}20`, background:s.bg }}>
            <span style={{ fontSize:22 }}>{s.icon}</span>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:'Georgia,serif', margin:'4px 0 2px' }}>{s.value}</div>
            <div style={{ fontSize:12, color:'#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="card p-10 text-center text-gray-400">Loading students…</div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <div style={{ fontSize:48, marginBottom:12 }}>👧🏾</div>
          <p style={{ fontSize:16, fontWeight:600, color:'#374151', margin:'0 0 6px' }}>{search ? 'No students found' : 'No students enrolled yet'}</p>
          <p style={{ fontSize:14, color:'#9ca3af', margin:'0 0 20px' }}>{search ? 'Try a different search term' : 'Enrol your first student to get started'}</p>
          {!search && (
            <button onClick={() => setModal(true)} style={{ padding:'10px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
              + Enrol First Student
            </button>
          )}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Adm No.</th><th>Full Name</th><th>Class</th><th>Gender</th><th>Parent Contact</th><th>Action</th></tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td><span style={{ fontFamily:'monospace', fontSize:12, background:'#f5f5f5', padding:'3px 8px', borderRadius:6 }}>{s.admissionNo}</span></td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:8, background: s.gender==='Female' ? 'linear-gradient(135deg,#fdf2f8,#fce7f3)' : 'linear-gradient(135deg,#ecfeff,#cffafe)', border:`1px solid ${s.gender==='Female'?'#fbcfe8':'#a5f3fc'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>
                          {s.gender==='Female' ? '👧' : '👦'}
                        </div>
                        <span style={{ fontSize:14, fontWeight:600, color:'#111' }}>{s.fullName}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', padding:'3px 10px', borderRadius:8 }}>{s.className}</span></td>
                    <td><span style={{ fontSize:12, color:'#6b7280' }}>{s.gender}</span></td>
                    <td>
                      <div>
                        <p style={{ margin:'0 0 1px', fontSize:12, fontWeight:500, color:'#374151' }}>{s.parentName || '—'}</p>
                        <p style={{ margin:0, fontSize:11, color:'#9ca3af' }}>{s.parentPhone || ''}</p>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(s)} disabled={deleting===s.id}
                        style={{ fontSize:12, color:'#dc2626', background:'#fff5f5', border:'1px solid #fecaca', padding:'4px 10px', borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                        {deleting===s.id ? '…' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enrol Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Enrol New Student" width={580}>
        <form onSubmit={handleCreate} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Name */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Surname <span style={{ color:'#dc2626' }}>*</span></label>
              <input value={form.surname} onChange={e => set('surname',e.target.value)} placeholder="Kamau" style={SI} onFocus={focus} onBlur={blur} required />
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>First name <span style={{ color:'#dc2626' }}>*</span></label>
              <input value={form.firstName} onChange={e => set('firstName',e.target.value)} placeholder="Jane" style={SI} onFocus={focus} onBlur={blur} required />
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Other name</label>
              <input value={form.otherName} onChange={e => set('otherName',e.target.value)} placeholder="Wanjiku" style={SI} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Gender</label>
              <select value={form.gender} onChange={e => set('gender',e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                {GENDERS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Date of birth</label>
              <input type="date" value={form.dob} onChange={e => set('dob',e.target.value)} style={SI} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Class <span style={{ color:'#dc2626' }}>*</span></label>
              <select value={form.classId} onChange={e => handleClassChange(e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur} required>
                <option value="">Select class…</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ borderTop:'1px solid #f0f0f0', paddingTop:16 }}>
            <p style={{ fontSize:13, fontWeight:700, color:'#374151', margin:'0 0 12px' }}>Parent / Guardian details</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Parent name</label>
                <input value={form.parentName} onChange={e => set('parentName',e.target.value)} placeholder="Full name" style={SI} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Parent phone</label>
                <input value={form.parentPhone} onChange={e => set('parentPhone',e.target.value)} placeholder="+254 7XX XXX XXX" style={SI} onFocus={focus} onBlur={blur} />
              </div>
            </div>
            <div style={{ marginTop:12 }}>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Parent email <span style={{ color:'#9ca3af', fontWeight:400 }}>(optional)</span></label>
              <input type="email" value={form.parentEmail} onChange={e => set('parentEmail',e.target.value)} placeholder="parent@example.com" style={SI} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          <div style={{ display:'flex', gap:10, marginTop:4 }}>
            <button type="button" onClick={() => setModal(false)}
              style={{ flex:1, padding:'11px', borderRadius:12, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving}
              style={{ flex:2, padding:'11px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:saving?'not-allowed':'pointer', fontFamily:'inherit', opacity:saving?0.75:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {saving && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
              {saving ? 'Enrolling…' : 'Enrol Student'}
            </button>
          </div>
        </form>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </Modal>
    </div>
  )
}
