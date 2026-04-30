// src/components/ui/Modal.jsx
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, width = 520 }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(4px)' }}/>

      {/* Panel */}
      <div style={{ position:'relative', width:'100%', maxWidth:width, background:'white', borderRadius:24, boxShadow:'0 24px 64px rgba(0,0,0,0.2)', animation:'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)', maxHeight:'90vh', display:'flex', flexDirection:'column' }}>
        {/* Header */}
        <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <h3 style={{ margin:0, fontSize:17, fontWeight:700, color:'#111', fontFamily:"'DM Sans',sans-serif" }}>{title}</h3>
          <button onClick={onClose} style={{ width:30, height:30, borderRadius:8, border:'none', background:'#f5f5f5', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'#666' }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding:24, overflowY:'auto', flex:1 }}>
          {children}
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.92) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  )
}
