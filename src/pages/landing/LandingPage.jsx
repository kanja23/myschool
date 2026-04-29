// src/pages/landing/LandingPage.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function StatCounter({ value, suffix, label, inView }) {
  const count = useCounter(value, 2200, inView)
  return (
    <div className="text-center">
      <div className="text-5xl font-display font-bold text-white">
        {count.toLocaleString()}<span style={{color:'#fbbf24'}}>{suffix}</span>
      </div>
      <div className="text-green-200 text-sm mt-2">{label}</div>
    </div>
  )
}

const FEATURES = [
  { icon:'📋', title:'Teaching Plans', desc:'Generate CBC-aligned teaching plans in minutes. Scheme of work, lesson plans, and records of work — unified into one smart document.', color:'#1e7852', bg:'#f0f9f4', tags:['Auto-generated','CBC aligned','Editable'] },
  { icon:'📊', title:'CBC Report Cards', desc:'Professional EE/ME/AE/BE report cards per strand, per subject. Download as PDF instantly.', color:'#2563eb', bg:'#eff6ff', tags:['PDF download','Per strand','EE/ME/AE/BE'] },
  { icon:'👨‍👩‍👧', title:'Parent Portal', desc:"Parents log in to see their child's CBC progress, download report cards, and receive school announcements — anytime.", color:'#d97706', bg:'#fffbeb', tags:['Mobile friendly','Secure','Real-time'] },
  { icon:'📈', title:'Syllabus Tracking', desc:'See exactly what % of the CBC syllabus has been taught per class, per subject, per term.', color:'#7c3aed', bg:'#f5f3ff', tags:['Live dashboard','Per teacher','Per grade'] },
  { icon:'📢', title:'Announcements', desc:'Post school announcements that appear as live notifications in every portal — teachers, parents, and students.', color:'#0891b2', bg:'#ecfeff', tags:['Real-time','Role-targeted','Push alerts'] },
  { icon:'🏪', title:'Tender Board', desc:'Schools post supplier tenders. Verified suppliers browse and apply. Transparent digital procurement.', color:'#be185d', bg:'#fdf2f8', tags:['For suppliers','Transparent','Digital'] },
]

const ROLES = [
  { role:'School Admin', emoji:'🏫', color:'#1e7852', bg:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', perks:['Full school dashboard','Approve & manage users','View all reports','Post announcements','Manage tenders'] },
  { role:'Teachers', emoji:'👩‍🏫', color:'#2563eb', bg:'linear-gradient(135deg,#eff6ff,#dbeafe)', perks:['Generate teaching plans','Record lessons taught','Enter CBC assessments','Generate class reports','Track syllabus %'] },
  { role:'Parents', emoji:'👨‍👩‍👧', color:'#d97706', bg:'linear-gradient(135deg,#fffbeb,#fef3c7)', perks:["View child's CBC report","See class performance","Download PDF reports","Receive announcements","Track progress by term"] },
  { role:'Students', emoji:'👧🏾', color:'#7c3aed', bg:'linear-gradient(135deg,#f5f3ff,#ede9fe)', perks:['View own report cards','See CBC grades by strand','Track academic progress','View school announcements'] },
  { role:'Suppliers', emoji:'📦', color:'#0891b2', bg:'linear-gradient(135deg,#ecfeff,#cffafe)', perks:['Browse open tenders','Submit expressions of interest','Download tender documents','Track application status'] },
  { role:'Super Admin', emoji:'⚡', color:'#7c3aed', bg:'linear-gradient(135deg,#faf5ff,#f3e8ff)', perks:['Manage all schools','Platform analytics','Subscription billing','Seed CBC curriculum','System configuration'] },
]

const GRADES = [
  { code:'EE', full:'Exceeding Expectations', range:'80–100%', color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0', desc:'Learner demonstrates mastery beyond expected level' },
  { code:'ME', full:'Meeting Expectations', range:'65–79%', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe', desc:'Learner demonstrates the expected competency level' },
  { code:'AE', full:'Approaching Expectations', range:'50–64%', color:'#d97706', bg:'#fffbeb', border:'#fde68a', desc:'Learner is progressing but needs more support' },
  { code:'BE', full:'Below Expectations', range:'0–49%', color:'#dc2626', bg:'#fef2f2', border:'#fecaca', desc:'Learner requires significant intervention' },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [statsRef, statsInView] = useInView()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:'hidden' }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, transition:'all 0.3s',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10v2h24v-2L16 4z" fill="white" fillOpacity=".95"/>
                <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
                <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
              </svg>
            </div>
            <span style={{ fontSize:18, fontWeight:700, color: scrolled ? '#111' : 'white', fontFamily:'Georgia,serif' }}>MySchool</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link to="/login" style={{ fontSize:14, fontWeight:500, color: scrolled ? '#555' : 'rgba(255,255,255,0.85)', textDecoration:'none', padding:'8px 16px' }}>Sign in</Link>
            <Link to="/signup" style={{ fontSize:14, fontWeight:700, padding:'10px 22px', borderRadius:12, color:'white', textDecoration:'none', background:'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow:'0 4px 16px rgba(245,158,11,0.3)' }}>Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#0a2419 0%,#14402e 40%,#1e7852 70%,#196043 100%)' }}>
        {/* BG effects */}
        <div style={{ position:'absolute', top:-120, right:-120, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.2),transparent)', filter:'blur(60px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(46,148,104,0.25),transparent)', filter:'blur(80px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'100px 20px 80px', width:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>

            {/* Left text */}
            <div style={{ animation:'slideUp 0.6s ease-out' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:999, border:'1px solid rgba(46,148,104,0.4)', background:'rgba(46,148,104,0.15)', marginBottom:24 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#fbbf24', display:'inline-block', animation:'pulse 2s infinite' }}/>
                <span style={{ color:'#a7d8be', fontSize:12, fontWeight:500 }}>Kenya CBC · PP1 to Grade 6 · KICD 2025 Aligned</span>
              </div>

              <h1 style={{ fontSize:'clamp(2.5rem,5vw,3.75rem)', fontFamily:'Georgia,serif', color:'white', lineHeight:1.15, margin:'0 0 24px', fontWeight:400 }}>
                The smarter way to<br/>
                <span style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b,#fcd34d)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  run your school
                </span>
              </h1>

              <p style={{ color:'#a7d8be', fontSize:18, lineHeight:1.7, marginBottom:32, maxWidth:480 }}>
                MySchool is Kenya's first CBC-native school management platform. Generate teaching plans, produce report cards, track learner progress — aligned to KICD 2025.
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 }}>
                {[{code:'EE',color:'#16a34a'},{code:'ME',color:'#2563eb'},{code:'AE',color:'#d97706'},{code:'BE',color:'#dc2626'}].map(g => (
                  <div key={g.code} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:999, border:`1px solid ${g.color}40`, background:g.color+'18', backdropFilter:'blur(8px)' }}>
                    <span style={{ fontSize:12, fontWeight:700, color:g.color }}>{g.code}</span>
                  </div>
                ))}
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12, alignSelf:'center' }}>CBC grade system built in</span>
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
                <Link to="/signup" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:14, color:'white', fontWeight:700, fontSize:15, textDecoration:'none', background:'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow:'0 8px 32px rgba(245,158,11,0.35)', transition:'transform 0.2s' }}>
                  Start Free Trial →
                </Link>
                <a href="#features" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:14, color:'white', fontWeight:500, fontSize:15, textDecoration:'none', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(8px)' }}>
                  See how it works
                </a>
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:24, marginTop:28, paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.1)' }}>
                {['✅ No credit card required','🏫 Free for 1 full term','📋 KICD 2025 aligned'].map(t => (
                  <span key={t} style={{ color:'rgba(167,216,190,0.8)', fontSize:13 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right photo */}
            <div style={{ position:'relative', display:'flex', justifyContent:'flex-end' }}>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at center,rgba(46,148,104,0.3),transparent)', filter:'blur(40px)', borderRadius:'50%', transform:'scale(0.85)' }}/>

              <div style={{ position:'relative', width:380 }}>
                {/* Main photo card */}
                <div style={{ borderRadius:28, overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}>
                  <img
                    src="/images/hero-child.jpg"
                    alt="Happy learner in school uniform"
                    style={{ width:'100%', height:460, objectFit:'cover', objectPosition:'top', display:'block' }}
                    onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                  />
                  {/* Fallback */}
                  <div style={{ width:'100%', height:460, display:'none', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, background:'linear-gradient(160deg,#196043,#1e7852,#2e9468)', padding:32, textAlign:'center' }}>
                    <div style={{ width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:52 }}>👧🏾</div>
                    <div>
                      <p style={{ color:'white', fontWeight:600, fontSize:14, margin:'0 0 6px' }}>Add your school photo here</p>
                      <p style={{ color:'rgba(255,255,255,0.6)', fontSize:12, margin:'0 0 4px' }}>Save it as <code style={{ background:'rgba(255,255,255,0.15)', padding:'2px 6px', borderRadius:4, color:'#fbbf24' }}>hero-child.jpeg</code></p>
                      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:12, margin:0 }}>into the <code style={{ background:'rgba(255,255,255,0.15)', padding:'2px 6px', borderRadius:4, color:'#fbbf24' }}>public/images/</code> folder</p>
                    </div>
                    <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>A smiling child in school uniform works best</p>
                  </div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to top,rgba(10,36,25,0.8),transparent)' }}/>
                </div>

                {/* Floating report card */}
                <div style={{ position:'absolute', left:-72, top:40, background:'rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', borderRadius:16, padding:16, border:'1px solid rgba(255,255,255,0.15)', minWidth:160, boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
                  <p style={{ color:'rgba(255,255,255,0.5)', fontSize:10, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Term 1 Report</p>
                  {[{sub:'Mathematics',grade:'EE',color:'#16a34a'},{sub:'English',grade:'ME',color:'#2563eb'},{sub:'Science',grade:'EE',color:'#16a34a'}].map(r => (
                    <div key={r.sub} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:6 }}>
                      <span style={{ color:'rgba(255,255,255,0.75)', fontSize:11 }}>{r.sub}</span>
                      <span style={{ fontSize:11, fontWeight:700, padding:'2px 7px', borderRadius:6, color:r.color, background:r.color+'25' }}>{r.grade}</span>
                    </div>
                  ))}
                </div>

                {/* Floating plan badge */}
                <div style={{ position:'absolute', right:-48, bottom:80, background:'rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', borderRadius:16, padding:16, border:'1px solid rgba(255,255,255,0.15)', minWidth:155, boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                    <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:14 }}>📋</span>
                    </div>
                    <span style={{ color:'white', fontSize:12, fontWeight:600 }}>Teaching Plan</span>
                  </div>
                  <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:999, height:6, marginBottom:6 }}>
                    <div style={{ width:'72%', height:6, borderRadius:999, background:'linear-gradient(90deg,#2e9468,#52b286)' }}/>
                  </div>
                  <p style={{ color:'rgba(167,216,190,0.8)', fontSize:11 }}>72% syllabus covered</p>
                </div>

                {/* Live badge */}
                <div style={{ position:'absolute', top:20, right:16, display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:999, background:'rgba(22,163,74,0.2)', border:'1px solid rgba(34,197,94,0.3)', backdropFilter:'blur(8px)' }}>
                  <span style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', display:'inline-block', animation:'pulse 2s infinite' }}/>
                  <span style={{ color:'#86efac', fontSize:11, fontWeight:600 }}>CBC 2025 Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <path d="M0 80L48 69.3C96 59 192 37 288 32C384 27 480 37 576 48C672 59 768 69 864 69.3C960 69 1056 59 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding:'96px 0', background:'white' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:16 }}>What MySchool Does</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,2.75rem)', fontFamily:'Georgia,serif', color:'#111', margin:'0 0 16px' }}>Everything your school needs.<br/><span style={{ color:'#1e7852' }}>Nothing you don't.</span></h2>
            <p style={{ color:'#6b7280', fontSize:18, maxWidth:600, margin:'0 auto' }}>Built specifically for Kenya's CBC curriculum — from PP1 to Grade 6 — with real KICD strand data baked in.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ borderRadius:20, padding:24, border:'1px solid #e5e7eb', background:f.bg, transition:'all 0.2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
                <div style={{ width:48, height:48, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:16, background:f.color+'18', border:`1px solid ${f.color}20` }}>{f.icon}</div>
                <h3 style={{ fontSize:17, fontWeight:600, color:'#111', margin:'0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize:14, color:'#6b7280', lineHeight:1.65, margin:'0 0 16px' }}>{f.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {f.tags.map(t => <span key={t} style={{ fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:999, color:f.color, background:f.color+'18' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="whoitsfor" style={{ padding:'96px 0', background:'linear-gradient(180deg,#f8faf8,#f0f9f4)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:16 }}>Who It's For</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,2.75rem)', fontFamily:'Georgia,serif', color:'#111', margin:'0 0 12px' }}>One platform. Every role in school.</h2>
            <p style={{ color:'#6b7280', fontSize:18 }}>Each person gets their own portal — built for exactly what they need.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
            {ROLES.map(r => (
              <div key={r.role} style={{ borderRadius:20, padding:24, border:'1px solid rgba(255,255,255,0.8)', background:r.bg, boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <span style={{ fontSize:28 }}>{r.emoji}</span>
                  <h3 style={{ fontSize:15, fontWeight:600, color:'#111', margin:0 }}>{r.role}</h3>
                </div>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8 }}>
                  {r.perks.map(p => (
                    <li key={p} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'#4b5563' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth="2.5" style={{ flexShrink:0, marginTop:1 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ padding:'96px 0', background:'linear-gradient(135deg,#0a2419,#14402e,#1e7852)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <h2 style={{ fontSize:'clamp(2rem,4vw,2.75rem)', fontFamily:'Georgia,serif', color:'white', margin:'0 0 12px' }}>Kenya's CBC platform, built for scale</h2>
            <p style={{ color:'rgba(167,216,190,0.8)', fontSize:18 }}>Designed to serve every primary school in Kenya</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40 }}>
            <StatCounter value={23000} suffix="+" label="Public primary schools in Kenya" inView={statsInView}/>
            <StatCounter value={8} suffix="" label="CBC learning areas (Gr 4–6)" inView={statsInView}/>
            <StatCounter value={120} suffix="+" label="Sub-strands seeded per grade" inView={statsInView}/>
            <StatCounter value={100} suffix="%" label="KICD 2025 curriculum aligned" inView={statsInView}/>
          </div>
        </div>
      </section>

      {/* CBC EXPLAINER */}
      <section style={{ padding:'96px 0', background:'white' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:20 }}>CBC Made Simple</span>
              <h2 style={{ fontSize:'clamp(1.75rem,3.5vw,2.5rem)', fontFamily:'Georgia,serif', color:'#111', margin:'0 0 20px', lineHeight:1.3 }}>No more percentage marks.<br/><span style={{ color:'#1e7852' }}>CBC grades, done right.</span></h2>
              <p style={{ color:'#6b7280', lineHeight:1.75, marginBottom:16, fontSize:15 }}>Under Kenya's CBC, learners are no longer ranked by percentages. Each subject is broken into strands — and each strand gets one of four competency ratings.</p>
              <p style={{ color:'#6b7280', lineHeight:1.75, fontSize:15 }}>Teachers enter results per strand. MySchool generates a beautiful, KICD-compliant report card — ready to print or share with parents digitally.</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {GRADES.map(g => (
                <div key={g.code} style={{ display:'flex', alignItems:'flex-start', gap:16, padding:16, borderRadius:16, border:`1px solid ${g.border}`, background:g.bg, transition:'box-shadow 0.2s' }}>
                  <div style={{ flexShrink:0, width:48, height:48, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, color:'white', background:g.color }}>{g.code}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontWeight:600, color:'#111', fontSize:14 }}>{g.full}</span>
                      <span style={{ fontSize:12, fontWeight:600, padding:'3px 10px', borderRadius:999, color:g.color, background:g.color+'18' }}>{g.range}</span>
                    </div>
                    <p style={{ fontSize:12, color:'#9ca3af', margin:0 }}>{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding:'96px 0', background:'linear-gradient(180deg,#f8faf8,#f0f9f4)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:16 }}>Simple Pricing</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,2.75rem)', fontFamily:'Georgia,serif', color:'#111', margin:'0 0 12px' }}>Start free. Grow with your school.</h2>
            <p style={{ color:'#6b7280', fontSize:18 }}>One flat price per school. No per-user fees. No surprises.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:700, margin:'0 auto' }}>
            {[
              { name:'Free Trial', price:'KES 0', period:'for 1 full term', featured:false, features:['All features included','Unlimited teachers & students','CBC report card generation','Parent portal access','Email support'], cta:'Start Free Trial' },
              { name:'School Plan', price:'KES 2,500', period:'per month', featured:true, badge:'Most Popular', features:['Everything in Free Trial','Unlimited terms','Priority support','Custom school branding','Annual: KES 25,000 (save 2 months)','Bulk student import'], cta:'Get Started' },
            ].map(p => (
              <div key={p.name} style={{ borderRadius:24, padding:32, border: p.featured ? '2px solid #2e9468' : '2px solid #e5e7eb', background: p.featured ? 'linear-gradient(160deg,#f0f9f4,white)' : 'white', boxShadow: p.featured ? '0 8px 40px rgba(30,120,82,0.12)' : 'none', position:'relative' }}>
                {p.badge && <div style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', padding:'4px 20px', borderRadius:999, fontSize:12, fontWeight:700, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', whiteSpace:'nowrap' }}>{p.badge}</div>}
                <h3 style={{ fontSize:17, fontWeight:600, color:'#111', margin:'0 0 8px' }}>{p.name}</h3>
                <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:24 }}>
                  <span style={{ fontSize:36, fontWeight:700, color:'#111', fontFamily:'Georgia,serif' }}>{p.price}</span>
                  <span style={{ color:'#9ca3af', fontSize:14 }}>{p.period}</span>
                </div>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#4b5563' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e7852" strokeWidth="2.5" style={{ flexShrink:0, marginTop:2 }}><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" style={{ display:'block', textAlign:'center', padding:'12px', borderRadius:14, fontWeight:700, fontSize:14, textDecoration:'none', color: p.featured ? 'white' : '#1e7852', background: p.featured ? 'linear-gradient(135deg,#1e7852,#2e9468)' : '#f0f9f4', border: p.featured ? 'none' : '2px solid #2e9468', boxShadow: p.featured ? '0 4px 16px rgba(30,120,82,0.25)' : 'none' }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding:'80px 20px', background:'linear-gradient(135deg,#0a2419,#1e7852)', textAlign:'center' }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <div style={{ fontSize:52, marginBottom:20 }}>🏫</div>
          <h2 style={{ fontSize:'clamp(2rem,4vw,2.75rem)', fontFamily:'Georgia,serif', color:'white', margin:'0 0 16px' }}>Ready to transform your school?</h2>
          <p style={{ color:'rgba(167,216,190,0.85)', fontSize:17, margin:'0 0 36px', lineHeight:1.7 }}>Join schools across Kenya using MySchool to simplify CBC management. Start your free 1-term trial today — no credit card needed.</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center' }}>
            <Link to="/signup" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', borderRadius:14, color:'white', fontWeight:700, fontSize:15, textDecoration:'none', background:'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow:'0 8px 32px rgba(245,158,11,0.3)' }}>Start Free Trial →</Link>
            <Link to="/login" style={{ display:'inline-flex', alignItems:'center', padding:'14px 28px', borderRadius:14, color:'white', fontWeight:500, fontSize:15, textDecoration:'none', border:'1px solid rgba(255,255,255,0.25)' }}>Already have an account? Sign in</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#0a2419', padding:'48px 20px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:40, marginBottom:40 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ color:'white', fontWeight:700, fontSize:14 }}>M</span>
                </div>
                <span style={{ color:'white', fontFamily:'Georgia,serif', fontSize:18 }}>MySchool</span>
              </div>
              <p style={{ color:'rgba(167,216,190,0.7)', fontSize:14, lineHeight:1.6, maxWidth:280 }}>Kenya's CBC-native school management platform. PP1 to Grade 6. KICD 2025 aligned.</p>
            </div>
            <div>
              <h4 style={{ color:'white', fontSize:14, fontWeight:600, margin:'0 0 16px' }}>Platform</h4>
              {['Features','Pricing','How It Works','CBC Explained'].map(l => (
                <div key={l} style={{ marginBottom:8 }}><a href="#" style={{ color:'rgba(167,216,190,0.6)', fontSize:14, textDecoration:'none' }}>{l}</a></div>
              ))}
            </div>
            <div>
              <h4 style={{ color:'white', fontSize:14, fontWeight:600, margin:'0 0 16px' }}>Support</h4>
              {['Contact Us','Privacy Policy','Terms of Service'].map(l => (
                <div key={l} style={{ marginBottom:8 }}><a href="#" style={{ color:'rgba(167,216,190,0.6)', fontSize:14, textDecoration:'none' }}>{l}</a></div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(46,148,104,0.25)', paddingTop:24, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <p style={{ color:'rgba(167,216,190,0.4)', fontSize:12, margin:0 }}>© {new Date().getFullYear()} MySchool. Built for Kenya's CBC schools.</p>
            <p style={{ color:'rgba(167,216,190,0.4)', fontSize:12, margin:0 }}>Aligned with KICD CBC 2024/2025 · PP1 to Grade 6</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
      `}</style>
    </div>
  )
}
