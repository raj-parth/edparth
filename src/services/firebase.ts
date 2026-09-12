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
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser 
} from 'firebase/auth';
import type { User, ContentItem, CBTExam, StudentTestResult, ChatMessage, LectureItem, ClassGrade, TargetExam } from '../types';

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

// -------------------------------------------------------------
// 7. FIREBASE AUTHENTICATION & SECURE CREDENTIAL SERVICES
// -------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export interface RegisterStudentParams {
  name: string;
  email: string;
  password: string;
  classGrade?: ClassGrade;
  school?: string;
  targetExam?: TargetExam;
  phone?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export async function registerStudentWithFirebase(params: RegisterStudentParams): Promise<AuthResult> {
  const email = params.email.trim().toLowerCase();
  const password = params.password.trim();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const pwdHash = await hashPassword(password);
  let uid = `std_${Date.now()}`;

  // Attempt Firebase Authentication creation
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    uid = cred.user.uid;
    if (cred.user && params.name) {
      try {
        await updateProfile(cred.user, { displayName: params.name });
      } catch {
        // non-fatal
      }
    }
  } catch (err: any) {
    console.warn('[Firebase Auth] Registration notice:', err.code, err.message);
    if (err.code === 'auth/email-already-in-use') {
      return { 
        success: false, 
        error: 'This email is already registered! Please switch to the "Student Login" tab to access your account.' 
      };
    }
    if (err.code === 'auth/invalid-email') {
      return { success: false, error: 'Please provide a valid email address.' };
    }
    if (err.code === 'auth/weak-password') {
      return { success: false, error: 'Password should be at least 6 characters.' };
    }
  }

  const newStudent: User = {
    id: uid,
    name: params.name.trim(),
    email: email,
    role: 'student',
    passwordHash: pwdHash,
    classGrade: params.classGrade || 'Class 12',
    school: params.school || 'EdParth Learning',
    targetExam: params.targetExam || 'JEE Main/Adv',
    phone: params.phone || '',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(params.name)}`,
    joinedAt: new Date().toISOString().split('T')[0],
    stats: {
      testsGiven: 0,
      studyHours: 0,
      streakDays: 1,
      avgScore: 0,
      xp: 100
    }
  };

  await syncStudentToFirestore(newStudent);
  return { success: true, user: newStudent };
}

export async function loginStudentWithFirebase(
  emailInput: string, 
  passwordInput: string,
  localStudents: User[]
): Promise<AuthResult> {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  if (!email || !password) {
    return { success: false, error: 'Please enter both your email and password.' };
  }

  const pwdHash = await hashPassword(password);

  // 1. Attempt official Firebase Authentication
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    try {
      const studentSnap = await getDoc(doc(db, 'students', uid));
      if (studentSnap.exists()) {
        const studentData = studentSnap.data() as User;
        return { success: true, user: studentData };
      }
    } catch {
      // ignore
    }

    const foundByEmail = localStudents.find(s => s.email.toLowerCase() === email);
    if (foundByEmail) {
      return { success: true, user: foundByEmail };
    }

    const newUser: User = {
      id: uid,
      name: cred.user.displayName || email.split('@')[0] || 'Student Aspirant',
      email: email,
      role: 'student',
      passwordHash: pwdHash,
      joinedAt: new Date().toISOString().split('T')[0],
      stats: { testsGiven: 0, studyHours: 0, streakDays: 1, avgScore: 0, xp: 100 }
    };
    await syncStudentToFirestore(newUser);
    return { success: true, user: newUser };

  } catch (err: any) {
    console.warn('[Firebase Auth] Login verification notice:', err.code, err.message);

    if (err.code === 'auth/wrong-password') {
      return { success: false, error: 'Incorrect password! Please verify and try again.' };
    }

    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
      // Check if user was registered in Firestore / local database
      const matched = localStudents.find(s => s.email.toLowerCase() === email);
      if (!matched) {
        return { 
          success: false, 
          error: 'No account found with this email! Please click "Register" to create your student account first.' 
        };
      }
      if (matched.passwordHash) {
        if (matched.passwordHash === pwdHash) {
          return { success: true, user: matched };
        } else {
          return { success: false, error: 'Incorrect password! Please verify and try again.' };
        }
      }
    }

    // Fallback: Check local / cloud students database
    const matched = localStudents.find(s => s.email.toLowerCase() === email);
    if (!matched) {
      return { 
        success: false, 
        error: 'No account found with this email! Please click "Register" to create your student account first.' 
      };
    }

    if (matched.passwordHash && matched.passwordHash !== pwdHash) {
      return { success: false, error: 'Incorrect password! Please verify and try again.' };
    }

    return { success: true, user: matched };
  }
}

export async function logoutStudentFromFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('[Firebase Auth] Signout notice:', err);
  }
}

