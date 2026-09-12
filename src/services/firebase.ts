import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  onSnapshot, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import type { User, ContentItem, CBTExam, StudentTestResult, ChatMessage, LectureItem } from '../types';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDl6rzcJ-XWE2qz7wacT2RBMZiJD5UTZjI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "edparth-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "edparth-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "edparth-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1062899928549",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1062899928549:web:194a471ae93c7a089c730c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V7BWEXCZ7G"
};

// Safe Singleton Initialization
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// -------------------------------------------------------------
// FIRESTORE COLLECTIONS & SYNCHRONIZATION HELPERS
// -------------------------------------------------------------

// 1. STUDENTS
export async function syncStudentToFirestore(student: User): Promise<void> {
  try {
    const studentRef = doc(db, 'students', student.id);
    await setDoc(studentRef, {
      ...student,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Sync student failed (fallback to local):', err);
  }
}

export function subscribeToStudents(onUpdate: (students: User[]) => void) {
  try {
    const q = query(collection(db, 'students'));
    return onSnapshot(q, (snapshot) => {
      const list: User[] = [];
      snapshot.forEach(d => list.push(d.data() as User));
      if (list.length > 0) {
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Students listener warning:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach students listener:', err);
    return () => {};
  }
}

// 2. CBT EXAMS
export async function syncExamToFirestore(exam: CBTExam): Promise<void> {
  try {
    const examRef = doc(db, 'cbt_exams', exam.id);
    await setDoc(examRef, {
      ...exam,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Sync exam failed:', err);
  }
}

export async function deleteExamFromFirestore(examId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'cbt_exams', examId));
  } catch (err) {
    console.warn('[Firestore] Delete exam failed:', err);
  }
}

export function subscribeToExams(onUpdate: (exams: CBTExam[]) => void) {
  try {
    const q = query(collection(db, 'cbt_exams'));
    return onSnapshot(q, (snapshot) => {
      const list: CBTExam[] = [];
      snapshot.forEach(d => list.push(d.data() as CBTExam));
      if (list.length > 0) {
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Exams listener warning:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach exams listener:', err);
    return () => {};
  }
}

// 3. LECTURES
export async function syncLectureToFirestore(lecture: LectureItem): Promise<void> {
  try {
    const lecRef = doc(db, 'lectures', lecture.id);
    await setDoc(lecRef, {
      ...lecture,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Sync lecture failed:', err);
  }
}

export async function deleteLectureFromFirestore(lectureId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'lectures', lectureId));
  } catch (err) {
    console.warn('[Firestore] Delete lecture failed:', err);
  }
}

export function subscribeToLectures(onUpdate: (lectures: LectureItem[]) => void) {
  try {
    const q = query(collection(db, 'lectures'));
    return onSnapshot(q, (snapshot) => {
      const list: LectureItem[] = [];
      snapshot.forEach(d => list.push(d.data() as LectureItem));
      if (list.length > 0) {
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Lectures listener warning:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach lectures listener:', err);
    return () => {};
  }
}

// 4. STUDY MATERIALS & BOOKS
export async function syncMaterialToFirestore(material: ContentItem): Promise<void> {
  try {
    const matRef = doc(db, 'materials', material.id);
    await setDoc(matRef, {
      ...material,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Sync material failed:', err);
  }
}

export async function deleteMaterialFromFirestore(materialId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'materials', materialId));
  } catch (err) {
    console.warn('[Firestore] Delete material failed:', err);
  }
}

export function subscribeToMaterials(onUpdate: (materials: ContentItem[]) => void) {
  try {
    const q = query(collection(db, 'materials'));
    return onSnapshot(q, (snapshot) => {
      const list: ContentItem[] = [];
      snapshot.forEach(d => list.push(d.data() as ContentItem));
      if (list.length > 0) {
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Materials listener warning:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach materials listener:', err);
    return () => {};
  }
}

// 5. TEST RESULTS
export async function syncTestResultToFirestore(result: StudentTestResult): Promise<void> {
  try {
    const resRef = doc(db, 'test_results', result.id);
    await setDoc(resRef, {
      ...result,
      submittedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Sync test result failed:', err);
  }
}

export function subscribeToTestResults(onUpdate: (results: StudentTestResult[]) => void) {
  try {
    const q = query(collection(db, 'test_results'));
    return onSnapshot(q, (snapshot) => {
      const list: StudentTestResult[] = [];
      snapshot.forEach(d => list.push(d.data() as StudentTestResult));
      if (list.length > 0) {
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Results listener warning:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach results listener:', err);
    return () => {};
  }
}

// 6. COMMUNITY CHAT MESSAGES
export async function syncChatMessageToFirestore(msg: ChatMessage): Promise<void> {
  try {
    const chatRef = doc(db, 'chat_messages', msg.id);
    await setDoc(chatRef, {
      ...msg,
      createdAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Sync chat failed:', err);
  }
}

export function subscribeToChatMessages(onUpdate: (messages: ChatMessage[]) => void) {
  try {
    const q = query(collection(db, 'chat_messages'), orderBy('timestamp', 'asc'), limit(100));
    return onSnapshot(q, (snapshot) => {
      const list: ChatMessage[] = [];
      snapshot.forEach(d => list.push(d.data() as ChatMessage));
      if (list.length > 0) {
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Chat listener warning:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach chat listener:', err);
    return () => {};
  }
}
