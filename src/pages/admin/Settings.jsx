// src/pages/admin/Settings.jsx
import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { updateSchool } from '@/services/school.service'
import toast from 'react-hot-toast'

const COUNTIES = ['Nairobi','Mombasa','Kisumu','Nakuru','Uasin Gishu','Eldoret','Thika','Nyeri','Meru','Kakamega','Kisii','Machakos','Kitui','Garissa','Malindi','Kiambu','Murang\'a','Kirinyaga','Nyandarua','Laikipia','Kajiado','Makueni','Embu','Tharaka-Nithi','Isiolo','Meru','Marsabit','Turkana','West Pokot','Trans Nzoia','Elgeyo-Marakwet','Nandi','Baringo','Samburu','Kwale','Kilifi','Tana River','Taita-Taveta','Lamu','Siaya','Kisumu','Homa Bay','Migori','Nyamira','Kericho','Bomet','Vihiga','Bungoma','Busia','Wajir','Mandera'].sort()
const SI = { width:'100%', padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#111', outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", background:'white' }

export default function Settings() {
  const { schoolId } = useAuth()
  const [school, setSchool] = useState(null)
  const [form,   setForm]   = useState({})
  const [saving, setSaving] = useState(false)
  const [tab,    setTab]    = useState('profile')

  useEffect(() => {
    if (!schoolId) return
    return onSnapshot(doc(db, 'schools', schoolId), snap => {
      if (snap.exists()) {
        const d = { id: snap.id, ...snap.data() }
        setSchool(d)
        setForm({
          name:          d.name ?? '',
          type:          d.type ?? 'Public Primary',
          county:        d.county ?? '',
          address:       d.address ?? '',
          phone:         d.phone ?? '',
          email:         d.email ?? '',
          motto:         d.motto ?? '',
          principalName: d.principalName ?? '',
          currentTerm:   String(d.currentTerm ?? '1'),
          currentYear:   String(d.currentYear ?? new Date().getFullYear()),
        })
      }
    })
  }, [schoolId])

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }))
  const focus = e => { e.target.style.borderColor='#1e7852' }
  const blur  = e => { e.target.style.borderColor='#e5e7eb' }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSchool(schoolId, form)
      toast.success('School settings saved!')
    } catch { toast.error('Failed to save settings') }
    finally   { setSaving(false) }
  }

  if (!school) return <div className="card p-10 text-center text-gray-400">Loading settings…</div>

  const TABS = [
    { key:'profile', label:'School Profile', icon:'🏫' },
    { key:'academic',label:'Academic',        icon:'📚' },
    { key:'info',    label:'School Code',     icon:'🔑' },
  ]

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="page-title">School Settings</h2>
        <p className="page-subtitle">Manage your school profile and academic configuration</p>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:4, padding:4, background:'#f5f5f5', borderRadius:12, width:'fit-content' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:10, border:'none', fontWeight: tab===t.key?700:500, fontSize:13, cursor:'pointer', fontFamily:'inherit', background: tab===t.key?'white':'transparent', color: tab===t.key?'#111':'#6b7280', boxShadow: tab===t.key?'0 1px 4px rgba(0,0,0,0.08)':'none', transition:'all 0.15s' }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {/* Profile tab */}
        {tab === 'profile' && (
          <div className="card p-6" style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:'#111', margin:0 }}>School Profile</h3>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School name</label>
              <input value={form.name||''} onChange={e=>set('name',e.target.value)} style={SI} onFocus={focus} onBlur={blur} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School type</label>
                <select value={form.type||''} onChange={e=>set('type',e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  {['Public Primary','Private Primary','Public Secondary','Private Secondary','Special Needs School'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>County</label>
                <select value={form.county||''} onChange={e=>set('county',e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  <option value="">Select county…</option>
                  {COUNTIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Phone</label>
                <input value={form.phone||''} onChange={e=>set('phone',e.target.value)} placeholder="+254 7XX XXX XXX" style={SI} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School email</label>
                <input type="email" value={form.email||''} onChange={e=>set('email',e.target.value)} style={SI} onFocus={focus} onBlur={blur} />
              </div>
            </div>
            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Physical address</label>
              <input value={form.address||''} onChange={e=>set('address',e.target.value)} style={SI} onFocus={focus} onBlur={blur} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Principal / Head Teacher</label>
                <input value={form.principalName||''} onChange={e=>set('principalName',e.target.value)} style={SI} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School motto</label>
                <input value={form.motto||''} onChange={e=>set('motto',e.target.value)} placeholder="e.g. Excellence in Education" style={SI} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          </div>
        )}

        {/* Academic tab */}
        {tab === 'academic' && (
          <div className="card p-6" style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:'#111', margin:0 }}>Academic Configuration</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Current term</label>
                <select value={form.currentTerm||'1'} onChange={e=>set('currentTerm',e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  <option value="1">Term 1</option>
                  <option value="2">Term 2</option>
                  <option value="3">Term 3</option>
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Current year</label>
                <select value={form.currentYear||''} onChange={e=>set('currentYear',e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  {[2024,2025,2026,2027].map(y=><option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding:16, borderRadius:12, background:'#f0f9f4', border:'1px solid #bbf7d0' }}>
              <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.6 }}>
                💡 Changing the current term affects scheme of work generation and report cards across the platform. Make sure to update this at the start of each new term.
              </p>
            </div>
          </div>
        )}

        {/* School code tab */}
        {tab === 'info' && (
          <div className="card p-6" style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:'#111', margin:0 }}>School Code</h3>
            <p style={{ fontSize:14, color:'#6b7280', margin:0 }}>Share this code with teachers and parents so they can link their accounts to your school during signup.</p>
            <div style={{ padding:24, borderRadius:16, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'2px dashed #2e9468', textAlign:'center' }}>
              <p style={{ fontSize:12, color:'#6b7280', margin:'0 0 8px', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Your School Code</p>
              <p style={{ fontSize:36, fontWeight:700, color:'#1e7852', fontFamily:'monospace', margin:'0 0 8px', letterSpacing:4 }}>{school.schoolCode ?? '—'}</p>
              <button type="button" onClick={() => { navigator.clipboard.writeText(school.schoolCode ?? ''); toast.success('Copied!') }}
                style={{ padding:'8px 20px', borderRadius:10, border:'none', background:'#1e7852', color:'white', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                📋 Copy Code
              </button>
            </div>
            <div style={{ padding:16, borderRadius:12, background:'#fffbeb', border:'1px solid #fde68a' }}>
              <p style={{ margin:0, fontSize:13, color:'#92400e', lineHeight:1.6 }}>
                ⚠️ <strong>Keep this code safe.</strong> Anyone with this code can request to join your school. You still approve all users before they get access.
              </p>
            </div>
          </div>
        )}

        {/* Save button — show for profile and academic tabs */}
        {tab !== 'info' && (
          <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
            <button type="submit" disabled={saving}
              style={{ padding:'11px 28px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:saving?'not-allowed':'pointer', fontFamily:'inherit', opacity:saving?0.75:1, display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
              {saving && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
