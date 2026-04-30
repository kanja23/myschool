// src/pages/admin/Announcements.jsx
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { createAnnouncement } from '@/services/school.service'
import Modal from '@/components/ui/Modal'
import toast from 'react-hot-toast'

const EMOJIS  = ['📢','📌','⚠️','🎉','📅','📝','🏫','✅','🔔','💡']
const TARGETS  = [
  { value:'all',      label:'Everyone' },
  { value:'teacher',  label:'Teachers only' },
  { value:'parent',   label:'Parents only' },
  { value:'student',  label:'Students only' },
]
const SI = { width:'100%', padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white' }

function timeAgo(ts) {
  if (!ts) return ''
  const ms = Date.now() - (ts.toMillis?.() ?? new Date(ts).getTime())
  const m = Math.floor(ms/60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m/60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h/24)}d ago`
}

export default function Announcements() {
  const { schoolId, profile } = useAuth()
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [deleting,setDeleting]= useState(null)
  const [form, setForm] = useState({ title:'', message:'', emoji:'📢', targetRoles:['all'] })

  useEffect(() => {
    if (!schoolId) return
    const q = query(collection(db,'schools',schoolId,'announcements'), orderBy('createdAt','desc'))
    return onSnapshot(q, snap => {
      setItems(snap.docs.map(d => ({ id:d.id, ...d.data() })))
      setLoading(false)
    })
  }, [schoolId])

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }))
  const focus = e => { e.target.style.borderColor='#1e7852' }
  const blur  = e => { e.target.style.borderColor='#e5e7eb' }

  async function handlePost(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.message.trim()) { toast.error('Please fill in title and message'); return }
    setSaving(true)
    try {
      await createAnnouncement(schoolId, {
        title:       form.title.trim(),
        message:     form.message.trim(),
        emoji:       form.emoji,
        targetRoles: form.targetRoles,
        body:        form.message.trim(),
      }, profile)
      toast.success('Announcement posted!')
      setModal(false)
      setForm({ title:'', message:'', emoji:'📢', targetRoles:['all'] })
    } catch { toast.error('Failed to post announcement') }
    finally { setSaving(false) }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this announcement?')) return
    setDeleting(id)
    try {
      await deleteDoc(doc(db,'schools',schoolId,'announcements',id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  const TARGET_LABEL = { all:'Everyone', teacher:'Teachers', parent:'Parents', student:'Students' }
  const TARGET_COLOR = { all:'#1e7852', teacher:'#2563eb', parent:'#d97706', student:'#7c3aed' }

  return (
    <div className="space-y-6 animate-slide-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 className="page-title">Announcements</h2>
          <p className="page-subtitle">Post school-wide notifications — appear in real-time for all users</p>
        </div>
        <button onClick={() => setModal(true)}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
          📢 Post Announcement
        </button>
      </div>

      {/* How it works */}
      <div style={{ padding:16, borderRadius:14, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', gap:12, alignItems:'flex-start' }}>
        <span style={{ fontSize:20, flexShrink:0 }}>⚡</span>
        <div>
          <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:700, color:'#1e7852' }}>Real-time notifications</p>
          <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.55 }}>Announcements appear instantly as slide-in popups in the sidebar bell for all targeted users — no refresh needed.</p>
        </div>
      </div>

      {loading ? (
        <div className="card p-10 text-center text-gray-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center">
          <div style={{ fontSize:48, marginBottom:12 }}>📢</div>
          <p style={{ fontSize:16, fontWeight:600, color:'#374151', margin:'0 0 6px' }}>No announcements yet</p>
          <p style={{ fontSize:14, color:'#9ca3af', margin:'0 0 20px' }}>Post your first school announcement</p>
          <button onClick={() => setModal(true)}
            style={{ padding:'10px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
            Post First Announcement
          </button>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {items.map(item => (
            <div key={item.id} style={{ background:'white', borderRadius:16, padding:20, border:'1px solid #e5e7eb', display:'flex', gap:14, alignItems:'flex-start', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', borderLeft:`4px solid ${TARGET_COLOR[item.targetRoles?.[0]] ?? '#1e7852'}` }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'#f0f9f4', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                {item.emoji ?? '📢'}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:4 }}>
                  <p style={{ margin:0, fontSize:15, fontWeight:700, color:'#111' }}>{item.title}</p>
                  <button onClick={() => handleDelete(item.id)} disabled={deleting===item.id}
                    style={{ fontSize:11, color:'#dc2626', background:'#fff5f5', border:'1px solid #fecaca', padding:'3px 10px', borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontWeight:600, flexShrink:0 }}>
                    {deleting===item.id ? '…' : 'Delete'}
                  </button>
                </div>
                <p style={{ margin:'0 0 10px', fontSize:13, color:'#6b7280', lineHeight:1.6 }}>{item.message}</p>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, color: TARGET_COLOR[item.targetRoles?.[0]] ?? '#1e7852', background:(TARGET_COLOR[item.targetRoles?.[0]]??'#1e7852')+'15', border:`1px solid ${TARGET_COLOR[item.targetRoles?.[0]]??'#1e7852'}30` }}>
                    {item.targetRoles?.map(r => TARGET_LABEL[r]).join(', ')}
                  </span>
                  <span style={{ fontSize:11, color:'#9ca3af' }}>by {item.authorName}</span>
                  <span style={{ fontSize:11, color:'#9ca3af' }}>· {timeAgo(item.createdAt)}</span>
                  {item.readBy?.length > 0 && (
                    <span style={{ fontSize:11, color:'#9ca3af' }}>· {item.readBy.length} read</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Post Announcement" width={520}>
        <form onSubmit={handlePost} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Emoji picker */}
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:8 }}>Icon</label>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {EMOJIS.map(e => (
                <button key={e} type="button" onClick={() => set('emoji', e)}
                  style={{ width:38, height:38, borderRadius:10, border:`2px solid ${form.emoji===e?'#1e7852':'#e5e7eb'}`, background: form.emoji===e?'#f0f9f4':'white', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Title <span style={{ color:'#dc2626' }}>*</span></label>
            <input value={form.title} onChange={e=>set('title',e.target.value)} placeholder="e.g. Parent-Teacher Meeting — Friday 3rd" style={SI} onFocus={focus} onBlur={blur} required />
          </div>

          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Message <span style={{ color:'#dc2626' }}>*</span></label>
            <textarea value={form.message} onChange={e=>set('message',e.target.value)} placeholder="Write the full announcement here…" rows={4}
              style={{ ...SI, resize:'vertical', lineHeight:1.6 }} onFocus={focus} onBlur={blur} required />
          </div>

          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:8 }}>Send to</label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {TARGETS.map(t => {
                const selected = form.targetRoles.includes(t.value)
                return (
                  <button key={t.value} type="button"
                    onClick={() => set('targetRoles', [t.value])}
                    style={{ padding:'10px 14px', borderRadius:10, border:`2px solid ${selected?'#1e7852':'#e5e7eb'}`, background: selected?'#f0f9f4':'white', color: selected?'#1e7852':'#6b7280', fontWeight: selected?700:400, fontSize:13, cursor:'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
                    {selected ? '✓ ' : ''}{t.label}
                  </button>
                )
              })}
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
              {saving ? 'Posting…' : '📢 Post Now'}
            </button>
          </div>
        </form>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </Modal>
    </div>
  )
}
