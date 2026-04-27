// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // Firebase auth user
  const [profile, setProfile] = useState(null)   // Firestore user document
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (snap.exists()) {
            setProfile({ id: snap.id, ...snap.data() })
          } else {
            // User exists in Auth but not Firestore — sign them out
            await firebaseSignOut(auth)
            setUser(null)
            setProfile(null)
          }
        } catch (err) {
          console.error('Error fetching user profile:', err)
          setProfile(null)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
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
    isAuthenticated: !!user && !!profile,
    role: profile?.role ?? null,
    schoolId: profile?.schoolId ?? null,
    isSuperAdmin: profile?.role === 'superadmin',
    isAdmin:      profile?.role === 'admin',
    isTeacher:    profile?.role === 'teacher',
    isStudent:    profile?.role === 'student',
    isParent:     profile?.role === 'parent',
    isSupplier:   profile?.role === 'supplier',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
