// src/context/NotificationContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { collection, query, where, orderBy, limit, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { profile } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount]     = useState(0)
  const [toasts, setToasts]               = useState([])   // slide-in popups

  useEffect(() => {
    if (!profile?.schoolId) return

    // Listen to announcements for this school, targeted at this role or 'all'
    const q = query(
      collection(db, 'schools', profile.schoolId, 'announcements'),
      where('targetRoles', 'array-contains-any', [profile.role, 'all']),
      orderBy('createdAt', 'desc'),
      limit(30)
    )

    const unsub = onSnapshot(q, snap => {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setNotifications(items)
      setUnreadCount(items.filter(n => !n.readBy?.includes(profile.uid)).length)

      // Show slide-in toast for very new announcements (< 10 seconds old)
      snap.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data()
          const age  = Date.now() - (data.createdAt?.toMillis?.() ?? 0)
          if (age < 10000 && !data.readBy?.includes(profile.uid)) {
            showToast({ id: change.doc.id, ...data })
          }
        }
      })
    })

    return unsub
  }, [profile?.schoolId, profile?.role, profile?.uid])

  function showToast(notification) {
    const id = notification.id + Date.now()
    setToasts(t => [...t, { ...notification, toastId: id }])
    setTimeout(() => setToasts(t => t.filter(x => x.toastId !== id)), 6000)
  }

  function dismissToast(toastId) {
    setToasts(t => t.filter(x => x.toastId !== toastId))
  }

  async function markAllRead() {
    if (!profile?.schoolId) return
    const unread = notifications.filter(n => !n.readBy?.includes(profile.uid))
    for (const n of unread) {
      try {
        await updateDoc(
          doc(db, 'schools', profile.schoolId, 'announcements', n.id),
          { readBy: [...(n.readBy ?? []), profile.uid], updatedAt: serverTimestamp() }
        )
      } catch {}
    }
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, toasts, dismissToast, markAllRead }}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}

// ── Slide-in toast stack ────────────────────────────────────────────────────
function ToastStack({ toasts, onDismiss }) {
  if (!toasts.length) return null
  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:10, maxWidth:360 }}>
      {toasts.map((t, i) => (
        <div key={t.toastId}
          style={{ background:'white', borderRadius:16, padding:16, boxShadow:'0 8px 32px rgba(0,0,0,0.15)', border:'1px solid #e5e7eb', display:'flex', gap:12, alignItems:'flex-start', animation:'slideInRight 0.4s cubic-bezier(0.34,1.56,0.64,1)', borderLeft:'4px solid #1e7852' }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#f0f9f4,#dcf1e6)', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:18 }}>
            {t.emoji ?? '📢'}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:700, color:'#111', lineHeight:1.3 }}>{t.title ?? 'New Announcement'}</p>
            <p style={{ margin:0, fontSize:12, color:'#6b7280', lineHeight:1.45, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{t.message ?? t.body ?? ''}</p>
            <p style={{ margin:'4px 0 0', fontSize:11, color:'#9ca3af' }}>
              {t.authorName ?? 'School Admin'} · just now
            </p>
          </div>
          <button onClick={() => onDismiss(t.toastId)}
            style={{ background:'none', border:'none', cursor:'pointer', color:'#9ca3af', fontSize:16, lineHeight:1, padding:0, flexShrink:0 }}>
            ×
          </button>
        </div>
      ))}
      <style>{`@keyframes slideInRight{from{opacity:0;transform:translateX(120px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  )
}
