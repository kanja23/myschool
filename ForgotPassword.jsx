// src/services/auth.service.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

// ── Sign in ────────────────────────────────────────────────────────────────
export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

// ── Create a user (called by admin or super admin) ────────────────────────
export async function createUser({ email, password, displayName, role, schoolId = null }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName })

  await setDoc(doc(db, 'users', cred.user.uid), {
    uid:         cred.user.uid,
    email,
    displayName,
    role,          // 'superadmin' | 'admin' | 'teacher' | 'student' | 'parent' | 'supplier'
    schoolId,      // null for superadmin and supplier
    active:      true,
    createdAt:   serverTimestamp(),
    updatedAt:   serverTimestamp(),
  })

  return cred.user
}

// ── Password reset ─────────────────────────────────────────────────────────
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email)
}

// ── Seed a new school document ─────────────────────────────────────────────
export async function createSchool({ schoolId, name, county, type, logo = '' }) {
  await setDoc(doc(db, 'schools', schoolId), {
    name,
    county,
    type,          // 'public' | 'private'
    logo,
    subscription: {
      plan:      'trial',
      trialEnds: null,   // set when trial begins
      active:    true,
    },
    settings: {
      currentTerm:  1,
      currentYear:  new Date().getFullYear(),
      gradeLevels:  ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6'],
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
