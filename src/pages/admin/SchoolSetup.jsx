// src/pages/admin/SchoolSetup.jsx
// Shown to admin when school profile is incomplete
import { useState } from 'react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const COUNTIES = ['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Nyeri','Meru','Kakamega','Kisii','Machakos','Kitui','Garissa','Malindi','Lamu','Isiolo','Marsabit','Wajir','Mandera','Turkana','West Pokot','Trans Nzoia','Uasin Gishu','Elgeyo-Marakwet','Nandi','Baringo','Laikipia','Samburu','Isiolo','Meru','Tharaka-Nithi','Embu','Kirinyaga','Murang\'a','Kiambu','Kwale','Kilifi','Tana River','Taita-Taveta','Kajiado','Makueni','Nyandarua','Nyeri','Kericho','Bomet','Kakamega','Vihiga','Bungoma','Busia','Siaya','Kisumu','Homa Bay','Migori','Kisii','Nyamira']
const TYPES   = ['Public Primary','Private Primary','Public Secondary','Private Secondary','Special Needs School']
const GRADES  = ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6']

const SI = { // style input
  width:'100%', padding:'11px 14px', borderRadius:12, border:'1.5px solid #e5e7eb',
  fontSize:14, color:'#111', outline:'none', boxSizing:'border-box',
  fontFamily:"'DM Sans',sans-serif", background:'white',
}

export default function SchoolSetup({ onComplete }) {
  const { schoolId, profile } = useAuth()
  const [step, setStep]     = useState(1)
  const [saving, setSaving] = useState(false)
  const [data, setData]     = useState({
    name: '', county: '', type: 'Public Primary', phone: '', email: '',
    address: '', motto: '', principalName: profile?.displayName ?? '',
    gradeLevels: ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6'],
    currentTerm: '1', currentYear: String(new Date().getFullYear()),
    schoolCode: '',
  })

  const set = (k, v) => setData(d => ({ ...d, [k]: v }))
  const focus = e => { e.target.style.borderColor = '#1e7852' }
  const blur  = e => { e.target.style.borderColor = '#e5e7eb' }

  function toggleGrade(g) {
    setData(d => ({
      ...d,
      gradeLevels: d.gradeLevels.includes(g)
        ? d.gradeLevels.filter(x => x !== g)
        : [...d.gradeLevels, g],
    }))
  }

  async function handleFinish() {
    if (!data.name) { toast.error('School name is required'); return }
    setSaving(true)
    try {
      // Generate a simple school code from name
      const code = data.schoolCode || data.name.replace(/[^a-zA-Z]/g,'').toUpperCase().slice(0,8) + Math.floor(Math.random()*100)
      await updateDoc(doc(db, 'schools', schoolId), {
        ...data,
        schoolCode: code,
        setupComplete: true,
        updatedAt: serverTimestamp(),
      })
      // Also update the admin user's schoolName
      await updateDoc(doc(db, 'users', profile.uid), {
        schoolName: data.name,
        schoolCode: code,
        updatedAt: serverTimestamp(),
      })
      toast.success('School setup complete!')
      onComplete?.()
    } catch (err) {
      toast.error('Failed to save. Please try again.')
      console.error(err)
    } finally { setSaving(false) }
  }

  const steps = [
    { num:1, label:'School Info' },
    { num:2, label:'Location' },
    { num:3, label:'Academic Setup' },
    { num:4, label:'Confirm' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#f8faf8,#f0f9f4)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ width:'100%', maxWidth:620 }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:52, height:52, borderRadius:16, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:24 }}>🏫</div>
          <h1 style={{ fontFamily:'Georgia,serif', fontSize:28, color:'#111', margin:'0 0 6px', fontWeight:400 }}>Set up your school</h1>
          <p style={{ color:'#9ca3af', fontSize:15, margin:0 }}>Takes about 3 minutes. You can edit everything later.</p>
        </div>

        {/* Step indicators */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, marginBottom:32 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, transition:'all 0.3s',
                  background: step > s.num ? '#1e7852' : step === s.num ? 'linear-gradient(135deg,#1e7852,#2e9468)' : '#e5e7eb',
                  color: step >= s.num ? 'white' : '#9ca3af',
                  boxShadow: step === s.num ? '0 4px 12px rgba(30,120,82,0.35)' : 'none',
                }}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span style={{ fontSize:10, color: step >= s.num ? '#1e7852' : '#9ca3af', fontWeight: step >= s.num ? 600 : 400, whiteSpace:'nowrap' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width:48, height:2, background: step > s.num ? '#1e7852' : '#e5e7eb', borderRadius:1, marginBottom:18 }}/>}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{ background:'white', borderRadius:24, padding:32, boxShadow:'0 4px 24px rgba(0,0,0,0.06)', border:'1px solid #e5e7eb', animation:'fadeIn 0.3s ease-out' }}>

          {/* STEP 1 — School Info */}
          {step === 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#111', margin:'0 0 4px', fontWeight:400 }}>School information</h2>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School name <span style={{ color:'#dc2626' }}>*</span></label>
                <input value={data.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Sunshine Primary School" style={SI} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School type</label>
                  <select value={data.type} onChange={e => set('type', e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Principal / Head Teacher</label>
                  <input value={data.principalName} onChange={e => set('principalName', e.target.value)} placeholder="Full name" style={SI} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Phone number</label>
                  <input value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+254 7XX XXX XXX" style={SI} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School email</label>
                  <input type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="school@example.com" style={SI} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>School motto <span style={{ color:'#9ca3af', fontWeight:400 }}>(optional)</span></label>
                <input value={data.motto} onChange={e => set('motto', e.target.value)} placeholder="e.g. Excellence in Education" style={SI} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          )}

          {/* STEP 2 — Location */}
          {step === 2 && (
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#111', margin:'0 0 4px', fontWeight:400 }}>Location details</h2>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>County <span style={{ color:'#dc2626' }}>*</span></label>
                <select value={data.county} onChange={e => set('county', e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                  <option value="">Select county…</option>
                  {COUNTIES.sort().map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Physical address</label>
                <input value={data.address} onChange={e => set('address', e.target.value)} placeholder="e.g. P.O Box 123, Off Ngong Road, Nairobi" style={SI} onFocus={focus} onBlur={blur} />
              </div>
              {/* Map placeholder */}
              <div style={{ height:120, borderRadius:16, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
                <span style={{ fontSize:28 }}>📍</span>
                <p style={{ fontSize:13, color:'#6b7280', margin:0 }}>Map integration coming in a future update</p>
              </div>
            </div>
          )}

          {/* STEP 3 — Academic Setup */}
          {step === 3 && (
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#111', margin:'0 0 4px', fontWeight:400 }}>Academic setup</h2>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Current term</label>
                  <select value={data.currentTerm} onChange={e => set('currentTerm', e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                    <option value="1">Term 1</option>
                    <option value="2">Term 2</option>
                    <option value="3">Term 3</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Current year</label>
                  <select value={data.currentYear} onChange={e => set('currentYear', e.target.value)} style={{ ...SI, appearance:'none' }} onFocus={focus} onBlur={blur}>
                    {[2024,2025,2026,2027].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:10 }}>Grade levels offered <span style={{ color:'#9ca3af', fontWeight:400 }}>(select all that apply)</span></label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {GRADES.map(g => {
                    const selected = data.gradeLevels.includes(g)
                    return (
                      <button key={g} type="button" onClick={() => toggleGrade(g)}
                        style={{ padding:'8px 16px', borderRadius:10, border:`2px solid ${selected ? '#1e7852' : '#e5e7eb'}`, background: selected ? '#f0f9f4' : 'white', color: selected ? '#1e7852' : '#6b7280', fontWeight: selected ? 700 : 400, fontSize:13, cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                        {selected ? '✓ ' : ''}{g}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div style={{ padding:16, borderRadius:12, background:'#f0f9f4', border:'1px solid #bbf7d0' }}>
                <p style={{ margin:0, fontSize:13, color:'#166534', lineHeight:1.6 }}>
                  💡 <strong>Tip:</strong> You can add individual classes (e.g. Grade 4 North, Grade 4 South) in the Classes section after setup is complete.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4 — Confirm */}
          {step === 4 && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#111', margin:'0 0 4px', fontWeight:400 }}>Confirm your details</h2>
              <p style={{ color:'#9ca3af', fontSize:14, margin:'0 0 8px' }}>Review and confirm before finishing setup.</p>

              {[
                { label:'School name',    value: data.name || '—' },
                { label:'Type',           value: data.type },
                { label:'County',         value: data.county || '—' },
                { label:'Principal',      value: data.principalName || '—' },
                { label:'Phone',          value: data.phone || '—' },
                { label:'Current term',   value: `Term ${data.currentTerm} · ${data.currentYear}` },
                { label:'Grade levels',   value: data.gradeLevels.join(', ') || '—' },
              ].map(r => (
                <div key={r.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'10px 0', borderBottom:'1px solid #f5f5f5' }}>
                  <span style={{ fontSize:13, color:'#9ca3af', fontWeight:500 }}>{r.label}</span>
                  <span style={{ fontSize:13, color:'#111', fontWeight:600, textAlign:'right', maxWidth:'60%' }}>{r.value}</span>
                </div>
              ))}

              <div style={{ marginTop:8, padding:16, borderRadius:12, background:'#fffbeb', border:'1px solid #fde68a' }}>
                <p style={{ margin:0, fontSize:13, color:'#92400e', lineHeight:1.6 }}>
                  ✅ You can update any of these details later in <strong>School Settings</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display:'flex', gap:12, marginTop:28, justifyContent:'space-between' }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)}
                style={{ padding:'11px 24px', borderRadius:12, border:'1.5px solid #e5e7eb', background:'white', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
                ← Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button onClick={() => {
                if (step === 1 && !data.name) { toast.error('Please enter your school name'); return }
                if (step === 2 && !data.county) { toast.error('Please select your county'); return }
                setStep(s => s + 1)
              }}
                style={{ padding:'11px 28px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
                Continue →
              </button>
            ) : (
              <button onClick={handleFinish} disabled={saving}
                style={{ padding:'11px 28px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:14, cursor: saving ? 'not-allowed' : 'pointer', fontFamily:'inherit', opacity: saving ? 0.75 : 1, display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 12px rgba(30,120,82,0.25)' }}>
                {saving && <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>}
                {saving ? 'Saving…' : '🎉 Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
