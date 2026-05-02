import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LogOutIcon, MenuIcon, SchoolIcon } from '@/components/ui/Icons'
import NotificationPanel from '@/components/ui/NotificationPanel'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const ROLE_LABEL = {
  superadmin:'Super Admin', admin:'School Admin', teacher:'Teacher',
  student:'Student', parent:'Parent', supplier:'Supplier',
}
const ROLE_COLOR = {
  superadmin:'bg-purple-100 text-purple-800',
  admin:     'bg-primary-100 text-primary-800',
  teacher:   'bg-blue-100 text-blue-800',
  student:   'bg-amber-100 text-amber-800',
  parent:    'bg-pink-100 text-pink-800',
  supplier:  'bg-gray-100 text-gray-700',
}

export default function DashboardLayout({ navItems, children, title }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleSignOut() {
    try { await signOut(); navigate('/login', { replace: true }) }
    catch { toast.error('Sign out failed') }
  }

  // Bottom nav items — first 4 only (mobile)
  const bottomNav = navItems.slice(0, 4)

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f8faf8', fontFamily:"'DM Sans',sans-serif" }}>

      {/* ── MOBILE OVERLAY ─────────────────────────────── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:40, display:'block' }}
          className="lg:hidden"
        />
      )}

      {/* ── SIDEBAR (desktop always visible, mobile slide-in) ── */}
      <aside style={{
        position:'fixed', top:0, left:0, bottom:0, zIndex:50,
        width:256,
        background:'linear-gradient(180deg,#0a2419 0%,#14402e 100%)',
        display:'flex', flexDirection:'column',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition:'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: sidebarOpen ? '4px 0 24px rgba(0,0,0,0.3)' : 'none',
      }}
      className="lg:translate-x-0 lg:shadow-none lg:relative lg:transform-none"
      >
        <style>{`
          @media(min-width:1024px){
            aside { transform: translateX(0) !important; box-shadow: none !important; position: relative !important; }
          }
        `}</style>

        {/* Logo */}
        <div style={{ padding:'20px 16px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', gap:12 }}>
          <SchoolIcon size={32} />
          <div>
            <p style={{ margin:0, color:'white', fontFamily:'Georgia,serif', fontSize:16, lineHeight:1.2 }}>MySchool</p>
            <p style={{ margin:0, color:'rgba(167,216,190,0.5)', fontSize:10 }}>CBC Platform</p>
          </div>
        </div>

        {/* School name */}
        {profile?.schoolName && (
          <div style={{ padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ margin:0, color:'rgba(167,216,190,0.6)', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {profile.schoolName}
            </p>
          </div>
        )}

        {/* Nav items */}
        <nav style={{ flex:1, padding:'12px 8px', overflowY:'auto', display:'flex', flexDirection:'column', gap:2 }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display:'flex', alignItems:'center', gap:12,
                padding:'11px 12px', borderRadius:12,
                fontSize:14, fontWeight:500, textDecoration:'none',
                transition:'all 0.15s',
                background: isActive ? '#1e7852' : 'transparent',
                color: isActive ? 'white' : 'rgba(167,216,190,0.75)',
                boxShadow: isActive ? '0 2px 8px rgba(30,120,82,0.4)' : 'none',
              })}
            >
              <span style={{ flexShrink:0, opacity:0.9 }}>{item.icon}</span>
              <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.label}</span>
              {item.badge && (
                <span style={{ background:'#f59e0b', color:'white', fontSize:10, fontWeight:700, padding:'2px 6px', borderRadius:999 }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom — notifications + user + sign out */}
        <div style={{ padding:'12px 8px', borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', flexDirection:'column', gap:10 }}>
          {/* Notification bell row */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 4px' }}>
            <span style={{ fontSize:11, color:'rgba(167,216,190,0.4)', textTransform:'uppercase', letterSpacing:1 }}>Alerts</span>
            <NotificationPanel />
          </div>

          {/* User row */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 8px', background:'rgba(255,255,255,0.05)', borderRadius:12 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:15, flexShrink:0 }}>
              {profile?.displayName?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ margin:0, color:'white', fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {profile?.displayName}
              </p>
              <span style={{ fontSize:10, fontWeight:600, padding:'1px 6px', borderRadius:999, backgroundColor:'rgba(255,255,255,0.1)', color:'rgba(167,216,190,0.8)' }}>
                {ROLE_LABEL[profile?.role]}
              </span>
            </div>
          </div>

          {/* Sign out */}
          <button onClick={handleSignOut}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'rgba(167,216,190,0.7)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', width:'100%', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <LogOutIcon size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ──────────────────────────────── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, minHeight:'100vh' }}>

        {/* Top bar */}
        <header style={{
          background:'white', borderBottom:'1px solid #e5e7eb',
          padding:'0 16px', height:56,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          position:'sticky', top:0, zIndex:30,
          boxShadow:'0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              style={{ width:40, height:40, borderRadius:10, border:'1px solid #e5e7eb', background:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#374151', flexShrink:0 }}
              className="lg:hidden"
            >
              <MenuIcon size={18} />
            </button>

            {/* Logo on mobile topbar */}
            <div style={{ display:'flex', alignItems:'center', gap:8 }} className="lg:hidden">
              <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#1e7852,#2e9468)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L4 10v2h24v-2L16 4z" fill="white"/>
                  <rect x="6" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                  <rect x="14" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                  <rect x="22" y="12" width="4" height="10" rx="1" fill="white" fillOpacity=".85"/>
                  <rect x="4" y="22" width="24" height="3" rx="1" fill="white"/>
                  <rect x="13" y="16" width="6" height="6" rx="1" fill="#f59e0b"/>
                </svg>
              </div>
              <span style={{ fontFamily:'Georgia,serif', fontSize:15, color:'#111', fontWeight:600 }}>MySchool</span>
            </div>

            {/* Title — desktop */}
            <h1 style={{ margin:0, fontSize:15, fontWeight:700, color:'#111', display:'none' }} className="lg:block">
              {title}
            </h1>
          </div>

          {/* Right side */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:'#f0f9f4', borderRadius:10, border:'1px solid #bbf7d0' }}>
              <span style={{ fontSize:11, color:'#6b7280' }}>Term</span>
              <span style={{ fontSize:12, fontWeight:700, color:'#1e7852' }}>
                {profile?.currentTerm ?? 1} · {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{
          flex:1,
          padding:'16px 16px 80px', // 80px bottom padding for mobile bottom nav
          overflowY:'auto',
          maxWidth:'100%',
        }}
        className="lg:p-6 lg:pb-6"
        >
          <style>{`@media(min-width:1024px){ main { padding: 24px !important; } }`}</style>
          {children}
        </main>

        {/* ── MOBILE BOTTOM TAB BAR ──────────────────── */}
        <nav style={{
          position:'fixed', bottom:0, left:0, right:0, zIndex:30,
          background:'white', borderTop:'1px solid #e5e7eb',
          display:'flex', alignItems:'stretch',
          boxShadow:'0 -4px 20px rgba(0,0,0,0.08)',
          paddingBottom:'env(safe-area-inset-bottom)', // iPhone notch
        }}
        className="lg:hidden"
        >
          {bottomNav.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              style={({ isActive }) => ({
                flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                padding:'8px 4px', textDecoration:'none', gap:3,
                color: isActive ? '#1e7852' : '#9ca3af',
                background: isActive ? '#f0f9f4' : 'white',
                borderTop: isActive ? '2px solid #1e7852' : '2px solid transparent',
                transition:'all 0.15s', minHeight:56,
              })}
            >
              {({ isActive }) => (
                <>
                  <span style={{ opacity: isActive ? 1 : 0.6, transform: isActive ? 'scale(1.1)' : 'scale(1)', transition:'transform 0.15s' }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize:9, fontWeight: isActive ? 700 : 500, lineHeight:1.2, textAlign:'center', maxWidth:60, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          {/* More button — opens sidebar for remaining items */}
          {navItems.length > 4 && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'8px 4px', border:'none', background:'white', borderTop:'2px solid transparent', cursor:'pointer', gap:3, minHeight:56 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
              </svg>
              <span style={{ fontSize:9, fontWeight:500, color:'#9ca3af' }}>More</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  )
}
