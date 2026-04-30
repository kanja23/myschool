// src/hooks/useSchool.js
import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'

export function useSchool() {
  const { schoolId } = useAuth()
  const [school, setSchool]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!schoolId) { setLoading(false); return }
    const unsub = onSnapshot(doc(db, 'schools', schoolId), snap => {
      setSchool(snap.exists() ? { id: snap.id, ...snap.data() } : null)
      setLoading(false)
    })
    return unsub
  }, [schoolId])

  return { school, loading }
}

export function useClasses() {
  const { schoolId } = useAuth()
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!schoolId) { setLoading(false); return }
    import('firebase/firestore').then(({ collection, query, orderBy, onSnapshot }) => {
      const q = query(collection(db, 'schools', schoolId, 'classes'), orderBy('gradeOrder'), orderBy('stream'))
      const unsub = onSnapshot(q, snap => {
        setClasses(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      })
      return unsub
    })
  }, [schoolId])

  return { classes, loading }
}

export function useStudents(classId = null) {
  const { schoolId } = useAuth()
  const [students, setStudents] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!schoolId) { setLoading(false); return }
    import('firebase/firestore').then(({ collection, query, where, orderBy, onSnapshot }) => {
      let q = classId
        ? query(collection(db, 'schools', schoolId, 'students'), where('classId', '==', classId), orderBy('surname'))
        : query(collection(db, 'schools', schoolId, 'students'), orderBy('surname'))
      const unsub = onSnapshot(q, snap => {
        setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      })
      return unsub
    })
  }, [schoolId, classId])

  return { students, loading }
}
