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
    <div style={{ textAlign:'center', padding:'0 8px' }}>
      <div style={{ fontSize:'clamp(2rem,6vw,3rem)', fontFamily:'Georgia,serif', fontWeight:700, color:'white' }}>
        {count.toLocaleString()}<span style={{ color:'#fbbf24' }}>{suffix}</span>
      </div>
      <div style={{ color:'rgba(167,216,190,0.8)', fontSize:'clamp(11px,2.5vw,13px)', marginTop:6, lineHeight:1.4 }}>{label}</div>
    </div>
  )
}

const FEATURES = [
  { icon:'📋', title:'Teaching Plans',    desc:'Generate CBC-aligned plans in minutes. Scheme of work, lesson plans and records unified into one document.', color:'#1e7852', bg:'#f0f9f4' },
  { icon:'📊', title:'CBC Report Cards',  desc:'Professional EE/ME/AE/BE report cards per strand. Download as PDF instantly.', color:'#2563eb', bg:'#eff6ff' },
  { icon:'👨‍👩‍👧', title:'Parent Portal',    desc:"Parents log in to see their child's CBC progress and download report cards anytime.", color:'#d97706', bg:'#fffbeb' },
  { icon:'📈', title:'Syllabus Tracking', desc:'See exactly what % of the CBC syllabus has been taught per class per term.', color:'#7c3aed', bg:'#f5f3ff' },
  { icon:'📢', title:'Announcements',     desc:'Post school announcements that appear as real-time notifications for all users.', color:'#0891b2', bg:'#ecfeff' },
  { icon:'🏪', title:'Tender Board',      desc:'Schools post supplier tenders. Verified suppliers browse and apply digitally.', color:'#be185d', bg:'#fdf2f8' },
]

const GRADES = [
  { code:'EE', full:'Exceeding Expectations',   range:'80–100%', color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0' },
  { code:'ME', full:'Meeting Expectations',     range:'65–79%',  color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe' },
  { code:'AE', full:'Approaching Expectations', range:'50–64%',  color:'#d97706', bg:'#fffbeb', border:'#fde68a' },
  { code:'BE', full:'Below Expectations',       range:'0–49%',   color:'#dc2626', bg:'#fef2f2', border:'#fecaca' },
]

const F = { fontFamily:"'DM Sans',sans-serif" }

export default function LandingPage() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [statsRef, statsInView]   = useInView()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div style={{ ...F, overflowX:'hidden', background:'white' }}>

      {/* ── NAV ── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
        transition:'all 0.3s',
      }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 16px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10v2h24v-2L16 4z" fill="white" fillOpacity=".95"/>
                <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
                <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
              </svg>
            </div>
            <span style={{ fontFamily:'Georgia,serif', fontSize:17, fontWeight:600, color: scrolled ? '#111' : 'white' }}>MySchool</span>
          </div>

          {/* Desktop nav links */}
          <div style={{ display:'none', alignItems:'center', gap:28 }} className="md-flex">
            <style>{`@media(min-width:768px){.md-flex{display:flex!important}}.md-hidden{display:none}`}</style>
            {['Features','Pricing'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ fontSize:14, fontWeight:500, color: scrolled ? '#555' : 'rgba(255,255,255,0.85)', textDecoration:'none' }}>{l}</a>
            ))}
            <Link to="/login" style={{ fontSize:14, fontWeight:500, color: scrolled ? '#555' : 'rgba(255,255,255,0.85)', textDecoration:'none' }}>Sign in</Link>
            <Link to="/signup" style={{ fontSize:14, fontWeight:700, padding:'9px 20px', borderRadius:10, color:'white', textDecoration:'none', background:'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow:'0 4px 12px rgba(245,158,11,0.3)' }}>
              Free Trial
            </Link>
          </div>

          {/* Mobile — CTA + hamburger */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }} className="md-hidden">
            <Link to="/signup" style={{ fontSize:13, fontWeight:700, padding:'8px 16px', borderRadius:9, color:'white', textDecoration:'none', background:'linear-gradient(135deg,#f59e0b,#d97706)' }}>
              Start Free
            </Link>
            <button onClick={() => setMenuOpen(v=>!v)}
              style={{ width:38, height:38, borderRadius:9, border:'none', background: scrolled?'#f5f5f5':'rgba(255,255,255,0.15)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: scrolled?'#374151':'white' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background:'white', borderTop:'1px solid #f0f0f0', padding:'12px 16px', display:'flex', flexDirection:'column', gap:4 }}>
            {[
              { label:'Features', href:'#features' },
              { label:'Pricing',  href:'#pricing'  },
            ].map(l => (
              <a key={l.label} href={l.href} onClick={()=>setMenuOpen(false)}
                style={{ padding:'12px 8px', fontSize:15, color:'#374151', fontWeight:500, textDecoration:'none', borderRadius:8, display:'block' }}>
                {l.label}
              </a>
            ))}
            <Link to="/login" onClick={()=>setMenuOpen(false)}
              style={{ padding:'12px 8px', fontSize:15, color:'#374151', fontWeight:500, textDecoration:'none', borderRadius:8, display:'block' }}>
              Sign in
            </Link>
            <Link to="/signup" onClick={()=>setMenuOpen(false)}
              style={{ margin:'8px 0 4px', padding:'13px', borderRadius:12, background:'linear-gradient(135deg,#1e7852,#2e9468)', color:'white', fontWeight:700, fontSize:15, textDecoration:'none', textAlign:'center', display:'block' }}>
              Start Free Trial
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh', display:'flex', alignItems:'center',
        background:'linear-gradient(160deg,#0a2419 0%,#14402e 45%,#1e7852 100%)',
        position:'relative', overflow:'hidden',
        paddingTop:60,
      }}>
        {/* BG glow */}
        <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.18),transparent)', filter:'blur(60px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(46,148,104,0.2),transparent)', filter:'blur(70px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }}/>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 20px 60px', width:'100%' }}>
          {/* Stack on mobile, side by side on desktop */}
          <div style={{ display:'flex', flexDirection:'column', gap:40, alignItems:'center' }}>

            {/* Text block */}
            <div style={{ textAlign:'center', maxWidth:640 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:999, border:'1px solid rgba(46,148,104,0.4)', background:'rgba(46,148,104,0.15)', marginBottom:20 }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#fbbf24', display:'inline-block', animation:'pulse 2s infinite' }}/>
                <span style={{ color:'#a7d8be', fontSize:12, fontWeight:500 }}>Kenya CBC · PP1–Grade 6 · KICD 2025</span>
              </div>

              <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(2rem,7vw,3.5rem)', color:'white', lineHeight:1.15, margin:'0 0 20px', fontWeight:400 }}>
                The smarter way to<br/>
                <span style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  run your school
                </span>
              </h1>

              <p style={{ color:'#a7d8be', fontSize:'clamp(15px,3vw,18px)', lineHeight:1.7, margin:'0 0 28px', maxWidth:520, marginLeft:'auto', marginRight:'auto' }}>
                Kenya's first CBC-native school management platform. Teaching plans, report cards, parent portal — all KICD 2025 aligned.
              </p>

              {/* CBC grade pills */}
              <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:8, marginBottom:28 }}>
                {[{code:'EE',color:'#16a34a'},{code:'ME',color:'#2563eb'},{code:'AE',color:'#d97706'},{code:'BE',color:'#dc2626'}].map(g => (
                  <div key={g.code} style={{ padding:'6px 14px', borderRadius:999, border:`1px solid ${g.color}40`, background:g.color+'18' }}>
                    <span style={{ fontSize:12, fontWeight:700, color:g.color }}>{g.code}</span>
                  </div>
                ))}
                <span style={{ color:'rgba(255,255,255,0.45)', fontSize:12, alignSelf:'center' }}>CBC grades built in</span>
              </div>

              {/* CTAs */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
                <Link to="/signup" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'14px 28px', borderRadius:14, color:'white', fontWeight:700, fontSize:15, textDecoration:'none',
                  background:'linear-gradient(135deg,#f59e0b,#d97706)',
                  boxShadow:'0 8px 24px rgba(245,158,11,0.35)',
                  width:'100%', justifyContent:'center', maxWidth:260,
                }}>
                  Start Free Trial →
                </Link>
                <a href="#features" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'14px 24px', borderRadius:14, color:'white', fontWeight:500, fontSize:15, textDecoration:'none',
                  border:'1px solid rgba(255,255,255,0.25)',
                  width:'100%', justifyContent:'center', maxWidth:200,
                }}>
                  See features
                </a>
              </div>

              {/* Trust signals */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center', marginTop:24, paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.1)' }}>
                {['✅ Free for 1 term','🏫 No credit card','📋 KICD 2025'].map(t => (
                  <span key={t} style={{ color:'rgba(167,216,190,0.75)', fontSize:13 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Hero image — full width on mobile, 380px on desktop */}
            <div style={{ position:'relative', width:'100%', maxWidth:380 }}>
              <div style={{ borderRadius:24, overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)', position:'relative' }}>
                <img
                  src="/images/hero-child.jpeg"
                  alt="Happy learner in school uniform"
                  style={{ width:'100%', height:'clamp(260px,60vw,420px)', objectFit:'cover', objectPosition:'top center', display:'block' }}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                />
                {/* Fallback */}
                <div style={{ width:'100%', height:320, display:'none', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, background:'linear-gradient(160deg,#196043,#2e9468)', padding:24, textAlign:'center' }}>
                  <div style={{ fontSize:64 }}>👧🏾</div>
                  <div>
                    <p style={{ color:'white', fontWeight:600, fontSize:14, margin:'0 0 4px' }}>Add your school photo</p>
                    <p style={{ color:'rgba(255,255,255,0.6)', fontSize:12, margin:0 }}>
                      Save as <code style={{ background:'rgba(255,255,255,0.15)', padding:'2px 6px', borderRadius:4, color:'#fbbf24' }}>hero-child.jpeg</code>
                    </p>
                    <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, margin:'4px 0 0' }}>in <code style={{ color:'#fbbf24' }}>public/images/</code></p>
                  </div>
                </div>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to top,rgba(10,36,25,0.8),transparent)' }}/>
              </div>

              {/* Floating report card */}
              <div style={{ position:'absolute', left:-16, top:32, background:'rgba(255,255,255,0.12)', backdropFilter:'blur(16px)', borderRadius:14, padding:14, border:'1px solid rgba(255,255,255,0.15)', minWidth:150, boxShadow:'0 8px 24px rgba(0,0,0,0.25)' }}>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:9, textTransform:'uppercase', letterSpacing:1, margin:'0 0 8px' }}>Term 1 Report</p>
                {[{sub:'Maths',grade:'EE',color:'#16a34a'},{sub:'English',grade:'ME',color:'#2563eb'},{sub:'Science',grade:'EE',color:'#16a34a'}].map(r=>(
                  <div key={r.sub} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginBottom:5 }}>
                    <span style={{ color:'rgba(255,255,255,0.75)', fontSize:11 }}>{r.sub}</span>
                    <span style={{ fontSize:11, fontWeight:700, padding:'2px 6px', borderRadius:5, color:r.color, background:r.color+'25' }}>{r.grade}</span>
                  </div>
                ))}
              </div>

              {/* CBC Live badge */}
              <div style={{ position:'absolute', top:16, right:16, display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:999, background:'rgba(22,163,74,0.2)', border:'1px solid rgba(34,197,94,0.3)' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', display:'inline-block', animation:'pulse 2s infinite' }}/>
                <span style={{ color:'#86efac', fontSize:10, fontWeight:600 }}>CBC 2025 Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 36C672 44 768 52 864 52C960 52 1056 44 1152 40C1248 36 1344 36 1392 36L1440 36V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding:'64px 0', background:'white' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 16px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:14 }}>What MySchool Does</span>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.75rem,5vw,2.5rem)', color:'#111', margin:'0 0 12px' }}>
              Everything your school needs.
            </h2>
            <p style={{ color:'#6b7280', fontSize:'clamp(14px,3vw,17px)', maxWidth:520, margin:'0 auto' }}>
              Built for Kenya's CBC from PP1 to Grade 6 — with real KICD strand data.
            </p>
          </div>

          {/* Features grid — 1 col mobile, 2 col tablet, 3 col desktop */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap:16 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ borderRadius:18, padding:20, border:'1px solid #e5e7eb', background:f.bg }}>
                <div style={{ width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:14, background:f.color+'18' }}>{f.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:700, color:'#111', margin:'0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize:13, color:'#6b7280', lineHeight:1.65, margin:0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ padding:'60px 0', background:'linear-gradient(135deg,#0a2419,#1e7852)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'0 16px' }}>
          <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.5rem,5vw,2.25rem)', color:'white', textAlign:'center', margin:'0 0 48px' }}>
            Built for Kenya's schools
          </h2>
          {/* 2x2 grid on mobile */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px 16px' }}>
            <StatCounter value={23000} suffix="+" label="Public primary schools in Kenya" inView={statsInView}/>
            <StatCounter value={8}     suffix=""  label="CBC learning areas (Gr 4–6)" inView={statsInView}/>
            <StatCounter value={120}   suffix="+" label="Sub-strands seeded per grade" inView={statsInView}/>
            <StatCounter value={100}   suffix="%" label="KICD 2025 aligned" inView={statsInView}/>
          </div>
        </div>
      </section>

      {/* ── CBC EXPLAINER ── */}
      <section style={{ padding:'64px 0', background:'white' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 16px' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:14 }}>CBC Made Simple</span>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.75rem,5vw,2.5rem)', color:'#111', margin:'0 0 12px' }}>
              No more percentage marks.
            </h2>
            <p style={{ color:'#6b7280', fontSize:'clamp(14px,3vw,16px)', maxWidth:520, margin:'0 auto' }}>
              Under Kenya's CBC each strand gets one of four competency ratings. MySchool handles all of this automatically.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:600, margin:'0 auto' }}>
            {GRADES.map(g => (
              <div key={g.code} style={{ display:'flex', alignItems:'center', gap:14, padding:16, borderRadius:14, border:`1px solid ${g.border}`, background:g.bg }}>
                <div style={{ width:48, height:48, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, color:'white', background:g.color, flexShrink:0 }}>{g.code}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:6 }}>
                    <span style={{ fontWeight:700, color:'#111', fontSize:14 }}>{g.full}</span>
                    <span style={{ fontSize:12, fontWeight:600, padding:'3px 10px', borderRadius:999, color:g.color, background:g.color+'18' }}>{g.range}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding:'64px 0', background:'#f8faf8' }}>
        <div style={{ maxWidth:700, margin:'0 auto', padding:'0 16px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:600, color:'#1e7852', background:'#f0f9f4', border:'1px solid #bbf7d0', marginBottom:14 }}>Simple Pricing</span>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.75rem,5vw,2.5rem)', color:'#111', margin:'0 0 10px' }}>Start free. Grow with your school.</h2>
            <p style={{ color:'#6b7280', fontSize:'clamp(14px,3vw,17px)', margin:0 }}>One flat price. No per-user fees. No surprises.</p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { name:'Free Trial', price:'KES 0', period:'for 1 full term', featured:false, features:['All features included','Unlimited teachers & students','CBC report card generation','Parent portal access','Email support'], cta:'Start Free Trial' },
              { name:'School Plan', price:'KES 2,500', period:'per month', featured:true, badge:'Most Popular', features:['Everything in Free Trial','Unlimited terms','Priority support','Custom school branding','Annual: KES 25,000 (save 2 months)'], cta:'Get Started' },
            ].map(p => (
              <div key={p.name} style={{ borderRadius:20, padding:24, border: p.featured?'2px solid #2e9468':'2px solid #e5e7eb', background: p.featured?'linear-gradient(160deg,#f0f9f4,white)':'white', position:'relative', boxShadow: p.featured?'0 8px 32px rgba(30,120,82,0.12)':'none' }}>
                {p.badge && <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', padding:'4px 18px', borderRadius:999, fontSize:12, fontWeight:700, color:'white', background:'linear-gradient(135deg,#1e7852,#2e9468)', whiteSpace:'nowrap' }}>{p.badge}</div>}
                <h3 style={{ fontSize:17, fontWeight:700, color:'#111', margin:'0 0 6px' }}>{p.name}</h3>
                <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:20 }}>
                  <span style={{ fontSize:32, fontWeight:700, color:'#111', fontFamily:'Georgia,serif' }}>{p.price}</span>
                  <span style={{ color:'#9ca3af', fontSize:14 }}>{p.period}</span>
                </div>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 20px', display:'flex', flexDirection:'column', gap:8 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#4b5563' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e7852" strokeWidth="2.5" style={{ flexShrink:0, marginTop:1 }}><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" style={{ display:'block', textAlign:'center', padding:'13px', borderRadius:14, fontWeight:700, fontSize:15, textDecoration:'none', color: p.featured?'white':'#1e7852', background: p.featured?'linear-gradient(135deg,#1e7852,#2e9468)':'#f0f9f4', border: p.featured?'none':'2px solid #2e9468' }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'60px 20px', background:'linear-gradient(135deg,#0a2419,#1e7852)', textAlign:'center' }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🏫</div>
          <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.75rem,5vw,2.5rem)', color:'white', margin:'0 0 14px' }}>Ready to transform your school?</h2>
          <p style={{ color:'rgba(167,216,190,0.8)', fontSize:'clamp(14px,3vw,16px)', margin:'0 0 28px', lineHeight:1.7 }}>Start your free 1-term trial today. No credit card needed.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
            <Link to="/signup" style={{ display:'block', padding:'14px 32px', borderRadius:14, color:'white', fontWeight:700, fontSize:16, textDecoration:'none', background:'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow:'0 8px 24px rgba(245,158,11,0.3)', width:'100%', maxWidth:300, textAlign:'center' }}>
              Start Free Trial →
            </Link>
            <Link to="/login" style={{ display:'block', padding:'14px', borderRadius:14, color:'white', fontWeight:500, fontSize:15, textDecoration:'none', border:'1px solid rgba(255,255,255,0.25)', width:'100%', maxWidth:300, textAlign:'center' }}>
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#0a2419', padding:'40px 16px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ color:'white', fontWeight:700, fontSize:14 }}>M</span>
            </div>
            <span style={{ color:'white', fontFamily:'Georgia,serif', fontSize:17 }}>MySchool</span>
          </div>
          <p style={{ color:'rgba(167,216,190,0.6)', fontSize:13, margin:'0 0 20px', lineHeight:1.6 }}>
            Kenya's CBC-native school management platform. PP1 to Grade 6. KICD 2025 aligned.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:24 }}>
            {['Features','Pricing','Contact Us','Privacy Policy'].map(l => (
              <a key={l} href="#" style={{ color:'rgba(167,216,190,0.5)', fontSize:13, textDecoration:'none' }}>{l}</a>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(46,148,104,0.2)', paddingTop:20, display:'flex', flexWrap:'wrap', gap:8, justifyContent:'space-between' }}>
            <p style={{ color:'rgba(167,216,190,0.35)', fontSize:12, margin:0 }}>© {new Date().getFullYear()} MySchool · CBC Platform Kenya</p>
            <p style={{ color:'rgba(167,216,190,0.35)', fontSize:12, margin:0 }}>KICD 2024/2025 aligned</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @media(min-width:768px) {
          .hero-grid { flex-direction: row !important; align-items: center !important; }
        }
        @media(min-width:1024px) {
          aside.sidebar { transform: translateX(0) !important; position: relative !important; }
        }
      `}</style>
    </div>
  )
}
