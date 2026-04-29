// src/components/ui/NotificationPanel.jsx
import { useState } from 'react'
import { useNotifications } from '@/context/NotificationContext'

function timeAgo(ts) {
  if (!ts) return ''
  const ms = Date.now() - (ts.toMillis?.() ?? new Date(ts).getTime())
  const m = Math.floor(ms / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markAllRead } = useNotifications()

  function handleOpen() {
    setOpen(v => !v)
    if (!open && unreadCount > 0) markAllRead()
  }

  return (
    <div style={{ position:'relative' }}>
      {/* Bell button */}
      <button onClick={handleOpen}
        style={{ position:'relative', width:36, height:36, borderRadius:10, border:'none', background: open ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.2s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {unreadCount > 0 && (
          <span style={{ position:'absolute', top:4, right:4, width:16, height:16, borderRadius:'50%', background:'#f59e0b', fontSize:9, fontWeight:700, color:'white', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #14402e' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <>
          <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={() => setOpen(false)} />
          <div style={{ position:'absolute', bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)', width:320, background:'white', borderRadius:20, boxShadow:'0 16px 48px rgba(0,0,0,0.2)', border:'1px solid #e5e7eb', zIndex:50, overflow:'hidden', animation:'slideUp 0.25s ease-out' }}>
            {/* Header */}
            <div style={{ padding:'14px 16px', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14, fontWeight:700, color:'#111' }}>Notifications</span>
                {unreadCount > 0 && (
                  <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:999, background:'#fef3c7', color:'#d97706' }}>{unreadCount} new</span>
                )}
              </div>
              {notifications.length > 0 && (
                <button onClick={markAllRead} style={{ fontSize:11, color:'#1e7852', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight:380, overflowY:'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding:32, textAlign:'center' }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>🔔</div>
                  <p style={{ fontSize:13, color:'#9ca3af', margin:0 }}>No announcements yet</p>
                  <p style={{ fontSize:12, color:'#d1d5db', margin:'4px 0 0' }}>School announcements will appear here</p>
                </div>
              ) : notifications.map(n => (
                <div key={n.id} style={{ padding:'12px 16px', borderBottom:'1px solid #f9f9f9', display:'flex', gap:12, background: !n.readBy?.includes('__') ? 'white' : '#fafafa', cursor:'default' }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:16 }}>
                    {n.emoji ?? '📢'}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:600, color:'#111', lineHeight:1.3 }}>{n.title ?? 'Announcement'}</p>
                    <p style={{ margin:'0 0 4px', fontSize:12, color:'#6b7280', lineHeight:1.45, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{n.message ?? n.body ?? ''}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:11, color:'#9ca3af' }}>{n.authorName ?? 'Admin'}</span>
                      <span style={{ width:3, height:3, borderRadius:'50%', background:'#d1d5db', display:'inline-block' }}/>
                      <span style={{ fontSize:11, color:'#9ca3af' }}>{timeAgo(n.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  )
}
