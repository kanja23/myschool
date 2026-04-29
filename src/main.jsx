import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { NotificationProvider } from '@/context/NotificationContext'
import AppRouter from '@/routes/AppRouter'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontSize:'13px', fontFamily:"'DM Sans',sans-serif", borderRadius:'12px', boxShadow:'0 4px 16px rgba(0,0,0,0.1)' },
              success: { iconTheme: { primary:'#1e7852', secondary:'#fff' } },
              error:   { iconTheme: { primary:'#dc2626', secondary:'#fff' } },
            }}
          />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
