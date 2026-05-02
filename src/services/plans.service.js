// src/services/plans.service.js
import {
  collection, doc, addDoc, updateDoc, getDocs, getDoc,
  query, where, orderBy, serverTimestamp, deleteDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { CBC_CURRICULUM, WEEKS_PER_TERM } from '@/data/cbcCurriculum'

// ── Create a teaching plan ─────────────────────────────────────────────────
export async function createPlan(schoolId, teacherProfile, planData) {
  const ref = await addDoc(collection(db, 'schools', schoolId, 'schemes'), {
    ...planData,
    teacherId:    teacherProfile.uid,
    teacherName:  teacherProfile.displayName,
    schoolId,
    status:       'draft',      // draft | active | completed
    completedSubStrands: [],    // sub-strand codes marked done
    coveragePercent: 0,
    createdAt:    serverTimestamp(),
    updatedAt:    serverTimestamp(),
  })
  return ref.id
}

// ── Get plans for a teacher ────────────────────────────────────────────────
export async function getTeacherPlans(schoolId, teacherId) {
  const q = query(
    collection(db, 'schools', schoolId, 'schemes'),
    where('teacherId', '==', teacherId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Get all plans for a school ─────────────────────────────────────────────
export async function getSchoolPlans(schoolId) {
  const q = query(
    collection(db, 'schools', schoolId, 'schemes'),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Mark a sub-strand as complete ──────────────────────────────────────────
export async function markSubStrandComplete(schoolId, planId, subStrandCode, totalSubStrands) {
  const ref  = doc(db, 'schools', schoolId, 'schemes', planId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return

  const data = snap.data()
  const completed = data.completedSubStrands ?? []

  const updated = completed.includes(subStrandCode)
    ? completed.filter(c => c !== subStrandCode)   // toggle off
    : [...completed, subStrandCode]                 // toggle on

  const coverage = Math.round((updated.length / totalSubStrands) * 100)

  await updateDoc(ref, {
    completedSubStrands: updated,
    coveragePercent:     coverage,
    status: coverage === 100 ? 'completed' : 'active',
    updatedAt: serverTimestamp(),
  })

  return { completed: updated, coverage }
}

// ── Update plan ────────────────────────────────────────────────────────────
export async function updatePlan(schoolId, planId, data) {
  await updateDoc(doc(db, 'schools', schoolId, 'schemes', planId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ── Delete plan ────────────────────────────────────────────────────────────
export async function deletePlan(schoolId, planId) {
  await deleteDoc(doc(db, 'schools', schoolId, 'schemes', planId))
}

// ── Generate plan content from CBC curriculum data ─────────────────────────
export function generatePlanContent(grade, subject, term, classInfo) {
  const subjectData = CBC_CURRICULUM[grade]?.[subject]
  if (!subjectData) return null

  const termNum     = Number(term)
  const allStrands  = subjectData.strands
  const totalStrands = allStrands.length

  // Distribute strands across 3 terms
  const strandsPerTerm = Math.ceil(totalStrands / 3)
  const startIdx = (termNum - 1) * strandsPerTerm
  const termStrands = allStrands.slice(startIdx, startIdx + strandsPerTerm)

  // Build weekly plan — 13 weeks per term
  const weeks = []
  let weekNum = 1
  let subStrandQueue = []

  termStrands.forEach(strand => {
    strand.subStrands.forEach(ss => {
      subStrandQueue.push({ strand: strand.strand, ...ss })
    })
  })

  // Distribute sub-strands across 13 weeks
  const weeksPerSubStrand = Math.max(1, Math.floor(WEEKS_PER_TERM / subStrandQueue.length))

  subStrandQueue.forEach((ss, i) => {
    const endWeek = Math.min(weekNum + weeksPerSubStrand - 1, WEEKS_PER_TERM)
    weeks.push({
      weekRange:    weekNum === endWeek ? `Week ${weekNum}` : `Week ${weekNum}–${endWeek}`,
      weekStart:    weekNum,
      weekEnd:      endWeek,
      strandCode:   ss.strand,
      subStrandCode:ss.code,
      subStrandTitle:ss.title,
      lessons:      ss.lessons,
      outcomes:     ss.outcomes,
      activities:   generateActivities(ss.title, grade),
      resources:    generateResources(subject, grade),
      assessment:   'Observation, oral questions, written exercises',
      status:       'pending',
    })
    weekNum = endWeek + 1
    if (weekNum > WEEKS_PER_TERM) weekNum = WEEKS_PER_TERM
  })

  return {
    grade,
    subject,
    term: String(term),
    classId:      classInfo?.id ?? '',
    className:    classInfo?.name ?? '',
    lessonsPerWeek: subjectData.lessonsPerWeek,
    totalWeeks:   WEEKS_PER_TERM,
    termStrands,
    weeks,
    totalSubStrands: subStrandQueue.length,
    generatedAt:  new Date().toISOString(),
  }
}

// ── Suggested activities by sub-strand title ───────────────────────────────
function generateActivities(subStrandTitle, grade) {
  const isUpper = ['Grade 4','Grade 5','Grade 6'].includes(grade)
  return [
    `Introduction: Discuss ${subStrandTitle} with learners using real-life examples`,
    `Activity: ${isUpper ? 'Group investigation and discussion' : 'Guided activity and demonstration'}`,
    `Practice: Learners complete exercises in pairs or groups`,
    `Application: Real-world problem solving related to ${subStrandTitle}`,
    `Assessment: Oral questions and written exercises to check understanding`,
  ]
}

// ── Suggested resources by subject ────────────────────────────────────────
function generateResources(subject, grade) {
  const base = ['Learner\'s textbook', 'Teacher\'s guide', 'Charts and posters', 'Whiteboard and markers']
  const extras = {
    'Mathematics':         ['Rulers and protractors', 'Geometric sets', 'Counters and number cards'],
    'Science & Technology':['Specimens', 'Laboratory equipment', 'Science kit'],
    'Agriculture':         ['Seeds and seedlings', 'Garden tools', 'Farm samples'],
    'Creative Arts':       ['Art materials', 'Musical instruments', 'Craft materials'],
    'English':             ['Storybooks', 'Dictionary', 'Reading cards'],
    'Kiswahili':           ['Vitabu vya hadithi', 'Kamusi', 'Kadi za kusomea'],
    'Social Studies':      ['Maps and atlas', 'Globe', 'Newspaper cuttings'],
    'Religious Education': ['Bible/Quran/Torah', 'Religious texts', 'Story cards'],
  }
  return [...base, ...(extras[subject] ?? [])]
}
