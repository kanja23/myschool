// src/services/school.service.js
import {
  collection, doc, addDoc, setDoc, updateDoc, getDocs,
  query, where, orderBy, serverTimestamp, deleteDoc, getDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// ── School ─────────────────────────────────────────────────────────────────
export async function updateSchool(schoolId, data) {
  await updateDoc(doc(db, 'schools', schoolId), { ...data, updatedAt: serverTimestamp() })
}

export async function getSchool(schoolId) {
  const snap = await getDoc(doc(db, 'schools', schoolId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// ── Classes ────────────────────────────────────────────────────────────────
export async function getClasses(schoolId) {
  const q = query(collection(db, 'schools', schoolId, 'classes'), orderBy('gradeOrder'), orderBy('stream'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createClass(schoolId, data) {
  const ref = await addDoc(collection(db, 'schools', schoolId, 'classes'), {
    ...data,
    schoolId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateClass(schoolId, classId, data) {
  await updateDoc(doc(db, 'schools', schoolId, 'classes', classId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteClass(schoolId, classId) {
  await deleteDoc(doc(db, 'schools', schoolId, 'classes', classId))
}

// ── Teachers ───────────────────────────────────────────────────────────────
export async function getTeachers(schoolId) {
  const q = query(collection(db, 'users'), where('schoolId', '==', schoolId), where('role', '==', 'teacher'), orderBy('displayName'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getPendingUsers(schoolId) {
  // Users with this schoolCode who are pending
  const q = query(collection(db, 'users'), where('status', '==', 'pending'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function approveUser(userId, schoolId, schoolName) {
  await updateDoc(doc(db, 'users', userId), {
    status:     'approved',
    active:     true,
    schoolId,
    schoolName,
    updatedAt:  serverTimestamp(),
  })
}

export async function rejectUser(userId) {
  await updateDoc(doc(db, 'users', userId), {
    status:    'rejected',
    active:    false,
    updatedAt: serverTimestamp(),
  })
}

export async function assignTeacherToClass(schoolId, classId, teacherId, teacherName) {
  await updateDoc(doc(db, 'schools', schoolId, 'classes', classId), {
    teacherId,
    teacherName,
    updatedAt: serverTimestamp(),
  })
}

// ── Students ───────────────────────────────────────────────────────────────
export async function getStudents(schoolId, classId = null) {
  let q
  if (classId) {
    q = query(collection(db, 'schools', schoolId, 'students'), where('classId', '==', classId), orderBy('surname'))
  } else {
    q = query(collection(db, 'schools', schoolId, 'students'), orderBy('surname'))
  }
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createStudent(schoolId, data) {
  // Generate admission number
  const admNo = `${data.grade.replace(/\s/g,'').toUpperCase()}/${Date.now().toString().slice(-5)}`
  const ref = await addDoc(collection(db, 'schools', schoolId, 'students'), {
    ...data,
    admissionNo: admNo,
    schoolId,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return { id: ref.id, admissionNo: admNo }
}

export async function updateStudent(schoolId, studentId, data) {
  await updateDoc(doc(db, 'schools', schoolId, 'students', studentId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteStudent(schoolId, studentId) {
  await deleteDoc(doc(db, 'schools', schoolId, 'students', studentId))
}

// ── Announcements ──────────────────────────────────────────────────────────
export async function createAnnouncement(schoolId, data, authorProfile) {
  await addDoc(collection(db, 'schools', schoolId, 'announcements'), {
    ...data,
    authorId:   authorProfile.uid,
    authorName: authorProfile.displayName,
    authorRole: authorProfile.role,
    readBy:     [],
    createdAt:  serverTimestamp(),
    updatedAt:  serverTimestamp(),
  })
}
