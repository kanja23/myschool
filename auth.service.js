// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (snap.exists()) {
            setProfile({ id: snap.id, ...snap.data() })
          } else {
            await firebaseSignOut(auth)
            setUser(null)
            setProfile(null)
          }
        } catch {
          setProfile(null)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const signOut = async () => {
    await firebaseSignOut(auth)
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    loading,
    signOut,
    // isAuthenticated = logged in AND approved
    isAuthenticated: !!user && !!profile && profile.active === true,
    isPending:       !!user && !!profile && profile.status === 'pending',
    role:            profile?.role ?? null,
    schoolId:        profile?.schoolId ?? null,
    isSuperAdmin:    profile?.role === 'superadmin',
    isAdmin:         profile?.role === 'admin',
    isTeacher:       profile?.role === 'teacher',
    isStudent:       profile?.role === 'student',
    isParent:        profile?.role === 'parent',
    isSupplier:      profile?.role === 'supplier',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
