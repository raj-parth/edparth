import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { User, ContentItem, CBTExam, StudentTestResult, ChatMessage, LectureItem, SocialChannel, TargetExam, DPPItem, LeaderboardEntry, SystemNotification } from '../types';

const INITIAL_SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'yt_chan_1',
    platform: 'youtube',
    title: 'EdParth Physics Masterclass',
    handleOrName: '@edparth_physics',
    subject: 'Physics (JEE / NEET / Class 11-12)',
    category: 'JEE',
    description: 'Complete one-shot chapter revision, rotational dynamics, electromagnetism & mechanics numerical solving.',
    bannerUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    linkUrl: 'https://youtube.com',
    badge: 'Verified Faculty',
    stats: 'Physics Hub',
    videos: [
      {
        id: 'v1',
        title: 'Rotational Dynamics & Angular Momentum in One Shot',
        embedId: 'dQw4w9WgXcQ',
        duration: '1h 20m'
      },
      {
        id: 'v2',
        title: 'Electromagnetic Induction & Lenz Law Problem Sprint',
        embedId: 'dQw4w9WgXcQ',
        duration: '50 mins'
      },
      {
        id: 'v3',
        title: 'Thermodynamics & Heat Engine High-Yield Derivations',
        embedId: 'dQw4w9WgXcQ',
        duration: '1h 05m'
      }
    ]
  },
  {
    id: 'yt_chan_2',
    platform: 'youtube',
    title: 'EdParth Medical Chemistry & Bio Sprint',
    handleOrName: '@edparth_med',
    subject: 'Chemistry & Biology (NEET UG / Class 12)',
    category: 'NEET',
    description: 'NCERT line-by-line diagram analysis, Coordination complexes, Organic reaction mechanisms, and Genetics.',
    bannerUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    linkUrl: 'https://youtube.com',
    badge: 'Official Medical Hub',
    stats: 'Medical Hub',
    videos: [
      {
        id: 'v4',
        title: 'Human Physiology & Neural Coordination Diagram Sprint',
        embedId: 'dQw4w9WgXcQ',
        duration: '45 mins'
      },
      {
        id: 'v5',
        title: 'Coordination Compounds IUPAC & Crystal Field Theory',
        embedId: 'dQw4w9WgXcQ',
        duration: '1h 10m'
      }
    ]
  },
  {
    id: 'yt_chan_3',
    platform: 'youtube',
    title: 'EdParth Mathematics Calculus Academy',
    handleOrName: '@edparth_maths',
    subject: 'Mathematics (Class 9-12 / JEE / NDA)',
    category: 'Class 12',
    description: 'Integral calculus, Vectors 3D Geometry, Probability, and Quadratic shortcut methods.',
    bannerUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    linkUrl: 'https://youtube.com',
    badge: 'Top Educator',
    stats: 'Calculus Series',
    videos: [
      {
        id: 'v6',
        title: 'Definite Integrals King Property Masterclass with 10 PYQs',
        embedId: 'dQw4w9WgXcQ',
        duration: '55 mins'
      }
    ]
  },
  {
    id: 'tg_chan_1',
    platform: 'telegram',
    title: 'EdParth Books & Notes Vault',
    handleOrName: '@edparthbooks',
    subject: 'Class 9-12, JEE & NEET Study Materials',
    category: 'General',
    description: 'Daily PDF books, solved formula cheatsheets, NCERT exemplar notes, and DPP answer keys.',
    bannerUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    linkUrl: 'https://t.me/edparthbooks',
    badge: 'Direct Download Vault',
    stats: 'Official Channel'
  },
  {
    id: 'tg_chan_2',
    platform: 'telegram',
    title: 'EdParth Daily PYQ & Mock Test Alert',
    handleOrName: '@edparth_alerts',
    subject: 'Live CBT Exam Schedules & Result Analysis',
    category: 'JEE',
    description: 'Instant notifications when new NTA CBT mock tests, answer keys, and percentiles go live.',
    bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    linkUrl: 'https://t.me/edparthbooks',
    badge: 'Exam Alerts',
    stats: 'Daily Updates'
  },
  {
    id: 'ig_chan_1',
    platform: 'instagram',
    title: 'EdParth Concept Shorts & Daily Facts',
    handleOrName: '@edparth_study',
    subject: '60-Sec Micro Learning & Concept Visualizations',
    category: 'General',
    description: 'High-speed formula recaps, mnemonics, quick physics experiments, and exam strategy reels.',
    bannerUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    linkUrl: 'https://instagram.com/edparth',
    badge: 'Concept Reels',
    stats: 'Daily Shorts'
  }
];

const INITIAL_STUDENTS: User[] = [];

const INITIAL_EXAMS: CBTExam[] = [
  {
    id: 'exam_jee_1',
    title: 'JEE Main 2026 Mega Full Mock Test #1 (Physics + Chem + Maths)',
    targetExam: 'JEE Main/Adv',
    subject: 'Full Syllabus PCM',
    durationMinutes: 60,
    totalMarks: 300,
    passingMarks: 120,
    instructions: [
      'The test contains 3 Sections: Physics, Chemistry, and Mathematics.',
      'Each correct answer awards +4 marks. Incorrect answer deducts -1 mark.',
      'You can switch between sections at any time during the test.'
    ],
    createdBy: 'Admin (RAJ)',
    createdAt: '2026-09-01',
    attemptsCount: 0,
    questions: [
      {
        id: 1,
        subject: 'Physics',
        text: 'A block of mass m = 2 kg is placed on a frictionless inclined plane of angle θ = 30°. A horizontal force F is applied such that the block remains stationary. Find the magnitude of force F (take g = 10 m/s²).',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80',
        options: [
          { id: 'A', text: '11.55 N' },
          { id: 'B', text: '20 N' },
          { id: 'C', text: '10 N' },
          { id: 'D', text: '34.64 N' }
        ],
        correctOptionId: 'A',
        explanation: 'For equilibrium along the incline: F cos θ = mg sin θ => F = mg tan θ = 2 * 10 * tan 30° = 20 / √3 ≈ 11.55 N.',
        marks: 4,
        negativeMarks: 1,
        topic: 'Laws of Motion'
      },
      {
        id: 2,
        subject: 'Chemistry',
        text: 'Which of the following coordination complexes exhibits maximum magnetic moment (spin-only)?',
        options: [
          { id: 'A', text: '[Fe(CN)6]³⁻' },
          { id: 'B', text: '[Fe(H2O)6]³⁺' },
          { id: 'C', text: '[Co(NH3)6]³⁺' },
          { id: 'D', text: '[Ni(CN)4]²⁻' }
        ],
        correctOptionId: 'B',
        explanation: 'In [Fe(H2O)6]³⁺, Fe³⁺ has 3d⁵ configuration with H2O as weak field ligand, resulting in 5 unpaired electrons (μ ≈ 5.92 BM).',
        marks: 4,
        negativeMarks: 1,
        topic: 'Coordination Chemistry'
      },
      {
        id: 3,
        subject: 'Mathematics',
        text: 'Evaluate the limit: lim (x -> 0) [ (sin 3x - 3 sin x) / x³ ]',
        options: [
          { id: 'A', text: '-4' },
          { id: 'B', text: '4' },
          { id: 'C', text: '0' },
          { id: 'D', text: '-1' }
        ],
        correctOptionId: 'A',
        explanation: 'Using sin 3x = 3 sin x - 4 sin³ x, numerator becomes -4 sin³ x. Thus lim -4 (sin x / x)³ = -4(1)³ = -4.',
        marks: 4,
        negativeMarks: 1,
        topic: 'Limits & Calculus'
      }
    ]
  }
];

const INITIAL_LECTURES: LectureItem[] = [
  {
    id: 'lec_1',
    title: 'Rotational Dynamics & Angular Momentum in One Shot',
    channelName: 'edparth Official',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    category: 'JEE',
    subject: 'Physics',
    duration: '1h 20m',
    addedAt: '2026-09-01'
  },
  {
    id: 'lec_2',
    title: 'Human Physiology & Neural Coordination Diagram Sprint',
    channelName: 'edparth Medical',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    category: 'NEET',
    subject: 'Biology',
    duration: '45 mins',
    addedAt: '2026-09-03'
  },
  {
    id: 'lec_3',
    title: 'Definite Integrals King Property Masterclass with 10 PYQs',
    channelName: 'edparth Official',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    category: 'Class 12',
    subject: 'Mathematics',
    duration: '55 mins',
    addedAt: '2026-09-05'
  }
];

const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'msg_welcome',
    senderId: 'admin_1',
    senderName: 'Raj Sir (Faculty & Admin)',
    senderRole: 'admin',
    message: 'Welcome everyone to the official EdParth student community! Feel free to ask your study queries, request books/notes, and share preparation tips. Join our Telegram: https://t.me/edparthbooks',
    timestamp: '10:00 AM'
  }
];

const INITIAL_CONTENT: ContentItem[] = [
  {
    id: 'c_1',
    title: 'HC Verma Concepts of Physics Vol 1 & 2 Chapter Solved Compendium',
    description: 'Complete step-by-step solved questions for Kinematics, Rotational Motion, Thermodynamics, and Waves.',
    type: 'book',
    category: 'JEE',
    subject: 'Physics',
    fileUrl: 'https://t.me/edparthbooks',
    fileSize: '18.5 MB',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=80',
    uploadedBy: 'Raj (Admin)',
    uploadedAt: '2026-09-01',
    downloadsCount: 0,
    pagesCount: 320,
    tags: ['Physics', 'JEE Main', 'HC Verma']
  },
  {
    id: 'c_2',
    title: 'NCERT Fingertips Biology 10-Year Diagrammatic Notes',
    description: 'High-yield color mindmaps for Cell Biology, Genetics, Plant Kingdom, and Human Physiology.',
    type: 'notes',
    category: 'NEET',
    subject: 'Biology',
    fileUrl: 'https://t.me/edparthbooks',
    fileSize: '14.2 MB',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=80',
    uploadedBy: 'Raj (Admin)',
    uploadedAt: '2026-09-02',
    downloadsCount: 0,
    pagesCount: 190,
    tags: ['NEET', 'Biology', 'NCERT']
  }
];

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'n1',
    title: 'CBT Mock Test Portal Ready',
    message: 'JEE Main Full Syllabus Test Series #1 is available with official NTA-standard marking scheme.',
    time: 'Recent',
    type: 'test',
    isRead: false
  },
  {
    id: 'n2',
    title: 'Rotational Dynamics Masterclass & DPP',
    message: 'Physics masterclass notes and companion practice problem sets are available in the Lectures hub.',
    time: 'Recent',
    type: 'lecture',
    isRead: false
  },
  {
    id: 'n3',
    title: 'EdParth DRM & Integrity Protection Active',
    message: 'Dynamic watermarking and anti-copy protections are enabled for your learning session.',
    time: 'System',
    type: 'security',
    isRead: true
  }
];

const INITIAL_DPPS: DPPItem[] = [
  {
    id: 'dpp_1',
    title: 'DPP-01: Rotational Dynamics & Moment of Inertia Sprint',
    subject: 'Physics',
    category: 'JEE',
    lectureId: 'v1',
    difficulty: 'Medium',
    totalQuestions: 4,
    questions: [
      {
        id: 'q1',
        question: 'A uniform circular disc of mass M and radius R rolls without slipping on a horizontal surface. What is the ratio of rotational kinetic energy to total kinetic energy?',
        options: ['1/2', '1/3', '2/3', '1/4'],
        correctIndex: 1,
        explanation: 'K_rot = 1/2 I ω² = 1/2 (1/2 M R²) (v/R)² = 1/4 M v². K_trans = 1/2 M v². Total K = 3/4 M v². Ratio = (1/4)/(3/4) = 1/3.'
      },
      {
        id: 'q2',
        question: 'If external torque acting on a rotating body is zero, which physical quantity remains strictly conserved?',
        options: ['Linear Momentum', 'Rotational Kinetic Energy', 'Angular Momentum', 'Moment of Inertia'],
        correctIndex: 2,
        explanation: 'According to Newton second law for rotation: τ = dL/dt. If τ_ext = 0, then dL/dt = 0 => Angular Momentum L is conserved.'
      },
      {
        id: 'q3',
        question: 'Radius of gyration of a solid sphere of radius R about its diametrical axis is:',
        options: ['√(2/5) R', '√(3/5) R', '√(1/2) R', '√(2/3) R'],
        correctIndex: 0,
        explanation: 'For solid sphere, I = 2/5 M R² = M k² => k = √(2/5) R.'
      },
      {
        id: 'q4',
        question: 'A thin ring and a solid cylinder of same mass and radius start rolling down the same incline without slipping. Which reaches the bottom first?',
        options: ['Ring', 'Solid Cylinder', 'Both reach together', 'Depends on inclination angle'],
        correctIndex: 1,
        explanation: 'Acceleration in rolling = g sinθ / (1 + k²/R²). For cylinder k²/R² = 1/2 (a = 2/3 g sinθ). For ring k²/R² = 1 (a = 1/2 g sinθ). Cylinder has greater acceleration and reaches first.'
      }
    ]
  },
  {
    id: 'dpp_2',
    title: 'DPP-02: Coordination Chemistry & IUPAC Nomenclature',
    subject: 'Chemistry',
    category: 'NEET',
    lectureId: 'v5',
    difficulty: 'Easy',
    totalQuestions: 3,
    questions: [
      {
        id: 'q2_1',
        question: 'What is the IUPAC name for [Co(NH3)5Cl]Cl2?',
        options: [
          'Pentaamminechloridocobalt(III) chloride',
          'Pentaamminechlorocobalt(II) chloride',
          'Chloropentaamminecobalt(III) dichloride',
          'Pentaamminecobalt(III) trichloride'
        ],
        correctIndex: 0,
        explanation: 'Ligands are named alphabetically: ammine before chlorido. Co is in +3 oxidation state: Pentaamminechloridocobalt(III) chloride.'
      },
      {
        id: 'q2_2',
        question: 'The number of unpaired electrons in octahedral complex [CoF6]3- (F- is weak field ligand) is:',
        options: ['0', '2', '4', '5'],
        correctIndex: 2,
        explanation: 'Co³⁺ is 3d⁶. Weak ligand F⁻ does not cause pairing (Δo < P): t₂g⁴ eg² has 4 unpaired electrons (high spin).'
      },
      {
        id: 'q2_3',
        question: 'Which of the following is an ambidentate ligand?',
        options: ['H2O', 'NH3', 'SCN-', 'en (ethylenediamine)'],
        correctIndex: 2,
        explanation: 'SCN⁻ can coordinate through either Sulfur (thiocyanato-S) or Nitrogen (isothiocyanato-N), making it ambidentate.'
      }
    ]
  },
  {
    id: 'dpp_3',
    title: 'DPP-03: Definite Integration by King Property Sprint',
    subject: 'Mathematics',
    category: 'Class 12',
    lectureId: 'v6',
    difficulty: 'Hard',
    totalQuestions: 2,
    questions: [
      {
        id: 'q3_1',
        question: 'Evaluate ∫[0 to π] (x sin x) / (1 + cos² x) dx:',
        options: ['π² / 4', 'π / 4', 'π² / 2', 'π / 2'],
        correctIndex: 0,
        explanation: 'Apply King property: I = ∫[0 to π] ((π-x) sin x) / (1 + cos² x) dx. Adding both: 2I = π ∫[0 to π] sin x / (1 + cos² x) dx = π [ -arctan(cos x) ]_0^π = π (π/4 - (-π/4)) = π²/2 => I = π²/4.'
      },
      {
        id: 'q3_2',
        question: 'Evaluate ∫[2 to 8] √x / (√(10 - x) + √x) dx:',
        options: ['6', '3', '4', '8'],
        correctIndex: 1,
        explanation: 'Using ∫[a to b] f(x) dx = (b - a) / 2 when f(x) + f(a + b - x) = 1. Here (8 - 2) / 2 = 6 / 2 = 3.'
      }
    ]
  }
];

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

interface AppContextType {
  currentUser: User | null;
  students: User[];
  contentList: ContentItem[];
  exams: CBTExam[];
  lectures: LectureItem[];
  socialChannels: SocialChannel[];
  chatMessages: ChatMessage[];
  testResults: StudentTestResult[];
  activeExam: CBTExam | null;
  hasSeenIntro: boolean;
  setHasSeenIntro: (val: boolean) => void;
  targetGoal: TargetExam;
  setTargetGoal: (goal: TargetExam) => void;
  isGoalModalOpen: boolean;
  openGoalModal: () => void;
  closeGoalModal: () => void;
  isSecurityModalOpen: boolean;
  openSecurityModal: () => void;
  closeSecurityModal: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'admin';
  setAuthModalMode: (mode: 'login' | 'signup' | 'admin') => void;
  openAuthModal: (mode?: 'login' | 'signup' | 'admin') => void;
  closeAuthModal: () => void;
  notifications: SystemNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  dppList: DPPItem[];
  leaderboard: LeaderboardEntry[];
  addXP: (amount: number) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  registerStudent: (studentData: Omit<User, 'id' | 'role' | 'joinedAt' | 'stats'>) => void;
  addContentItem: (item: Omit<ContentItem, 'id' | 'uploadedAt' | 'downloadsCount'>) => void;
  deleteContentItem: (id: string) => void;
  addCBTExam: (exam: CBTExam) => void;
  deleteCBTExam: (id: string) => void;
  setActiveExam: (exam: CBTExam | null) => void;
  addLecture: (lec: Omit<LectureItem, 'id' | 'addedAt'>) => void;
  deleteLecture: (id: string) => void;
  addSocialChannel: (channel: Omit<SocialChannel, 'id'>) => void;
  deleteSocialChannel: (id: string) => void;
  sendChatMessage: (message: string, isRequest?: boolean) => void;
  submitTestResult: (result: Omit<StudentTestResult, 'id' | 'timestamp'>) => void;
  requireAuth: (callback: () => void) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(() => {
    return sessionStorage.getItem('edparth_seen_intro') === 'true';
  });

  const [targetGoal, setTargetGoal] = useState<TargetExam>(() => {
    const saved = localStorage.getItem('edparth_target_goal') as TargetExam;
    return saved || 'JEE Main/Adv';
  });

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edparth_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (['std_1', 'std_2', 'std_3', 'std_4'].includes(parsed.id) || parsed.email === 'aarav.sharma@gmail.com') {
          localStorage.removeItem('edparth_current_user');
          sessionStorage.removeItem('edparth_authenticated_session');
          return null;
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [students, setStudents] = useState<User[]>(() => {
    const saved = localStorage.getItem('edparth_students');
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        return parsed.filter(s => !['std_1', 'std_2', 'std_3', 'std_4'].includes(s.id));
      } catch {
        return [];
      }
    }
    return [];
  });

  const [contentList, setContentList] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('edparth_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [exams, setExams] = useState<CBTExam[]>(() => {
    const saved = localStorage.getItem('edparth_exams');
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [lectures, setLectures] = useState<LectureItem[]>(() => {
    const saved = localStorage.getItem('edparth_lectures');
    return saved ? JSON.parse(saved) : INITIAL_LECTURES;
  });

  const [socialChannels, setSocialChannels] = useState<SocialChannel[]>(() => {
    const saved = localStorage.getItem('edparth_social_channels');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_CHANNELS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('edparth_chats');
    if (saved) {
      try {
        const parsed: ChatMessage[] = JSON.parse(saved);
        const cleaned = parsed.filter(m => !['msg_1', 'msg_2', 'msg_3'].includes(m.id));
        return cleaned.length > 0 ? cleaned : INITIAL_CHATS;
      } catch {
        return INITIAL_CHATS;
      }
    }
    return INITIAL_CHATS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('edparth_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [dppList] = useState<DPPItem[]>(INITIAL_DPPS);

  const leaderboard: LeaderboardEntry[] = useMemo(() => {
    const allCandidates = [...students];
    if (currentUser && currentUser.role === 'student' && !allCandidates.some(s => s.id === currentUser.id)) {
      allCandidates.push(currentUser);
    }
    
    if (allCandidates.length === 0) {
      return [];
    }

    return allCandidates
      .sort((a, b) => (b.stats?.xp || 0) - (a.stats?.xp || 0))
      .slice(0, 10)
      .map((std, idx) => ({
        rank: idx + 1,
        id: std.id,
        name: std.name,
        avatar: std.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(std.name)}`,
        classGrade: std.classGrade || 'Class 12',
        targetExam: std.targetExam || 'JEE Main/Adv',
        xp: std.stats?.xp || 100,
        streakDays: std.stats?.streakDays || 1,
        testsGiven: std.stats?.testsGiven || 0,
        avgAccuracy: std.stats?.avgScore || 0,
        badge: idx === 0 ? '🏆 AIR-1 Leader' : idx === 1 ? '⚡ Top Achiever' : idx === 2 ? '🎯 Rising Star' : '🌟 Active Student'
      }));
  }, [students, currentUser]);

  const [testResults, setTestResults] = useState<StudentTestResult[]>(() => {
    const saved = localStorage.getItem('edparth_results');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeExam, setActiveExam] = useState<CBTExam | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'admin'>('login');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edparth_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edparth_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('edparth_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('edparth_content', JSON.stringify(contentList));
  }, [contentList]);

  useEffect(() => {
    localStorage.setItem('edparth_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('edparth_lectures', JSON.stringify(lectures));
  }, [lectures]);

  useEffect(() => {
    localStorage.setItem('edparth_social_channels', JSON.stringify(socialChannels));
  }, [socialChannels]);

  useEffect(() => {
    localStorage.setItem('edparth_chats', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('edparth_results', JSON.stringify(testResults));
  }, [testResults]);

  const handleSetHasSeenIntro = (val: boolean) => {
    setHasSeenIntro(val);
    sessionStorage.setItem('edparth_seen_intro', String(val));
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'admin' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const requireAuth = (callback: () => void) => {
    if (!currentUser) {
      openAuthModal('login');
    } else {
      callback();
    }
  };

  const loginUser = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('edparth_authenticated_session', 'true');
    closeAuthModal();
  };

  const logoutUser = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('edparth_authenticated_session');
    localStorage.removeItem('edparth_current_user');
  };

  const registerStudent = (studentData: Omit<User, 'id' | 'role' | 'joinedAt' | 'stats'>) => {
    const newStudent: User = {
      ...studentData,
      id: `std_${Date.now()}`,
      role: 'student',
      joinedAt: new Date().toISOString().split('T')[0],
      avatar: studentData.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${studentData.name}`,
      stats: {
        testsGiven: 0,
        studyHours: 0,
        streakDays: 1,
        avgScore: 0,
        xp: 100
      }
    };

    setStudents(prev => [newStudent, ...prev]);
    setCurrentUser(newStudent);
    closeAuthModal();
  };

  const addContentItem = (item: Omit<ContentItem, 'id' | 'uploadedAt' | 'downloadsCount'>) => {
    const newItem: ContentItem = {
      ...item,
      id: `content_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      downloadsCount: 0
    };
    setContentList(prev => [newItem, ...prev]);
  };

  const deleteContentItem = (id: string) => {
    setContentList(prev => prev.filter(c => c.id !== id));
  };

  const addCBTExam = (exam: CBTExam) => {
    setExams(prev => [exam, ...prev]);
  };

  const deleteCBTExam = (id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };

  const addLecture = (lec: Omit<LectureItem, 'id' | 'addedAt'>) => {
    const newLec: LectureItem = {
      ...lec,
      id: `lec_${Date.now()}`,
      addedAt: new Date().toISOString().split('T')[0]
    };
    setLectures(prev => [newLec, ...prev]);
  };

  const deleteLecture = (id: string) => {
    setLectures(prev => prev.filter(l => l.id !== id));
  };

  const sendChatMessage = (message: string, isRequest: boolean = false) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser ? currentUser.id : 'guest',
      senderName: currentUser ? currentUser.name : 'Student',
      senderRole: currentUser ? currentUser.role : 'student',
      senderClass: currentUser?.classGrade,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRequest
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const submitTestResult = (result: Omit<StudentTestResult, 'id' | 'timestamp'>) => {
    const newResult: StudentTestResult = {
      ...result,
      id: `res_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setTestResults(prev => [newResult, ...prev]);

    if (currentUser && currentUser.role === 'student') {
      const updatedUser: User = {
        ...currentUser,
        stats: {
          ...currentUser.stats,
          testsGiven: currentUser.stats.testsGiven + 1,
          avgScore: Math.round(((currentUser.stats.avgScore * currentUser.stats.testsGiven) + result.accuracy) / (currentUser.stats.testsGiven + 1)),
          xp: currentUser.stats.xp + Math.max(50, result.score * 2)
        }
      };
      setCurrentUser(updatedUser);
      setStudents(prev => prev.map(s => s.id === updatedUser.id ? updatedUser : s));
    }
  };

  const addSocialChannel = (channel: Omit<SocialChannel, 'id'>) => {
    const newChan: SocialChannel = {
      ...channel,
      id: `chan_${Date.now()}`
    };
    setSocialChannels(prev => [newChan, ...prev]);
  };

  const deleteSocialChannel = (id: string) => {
    setSocialChannels(prev => prev.filter(c => c.id !== id));
  };

  const handleSetTargetGoal = (goal: TargetExam) => {
    setTargetGoal(goal);
    localStorage.setItem('edparth_target_goal', goal);
  };

  const openGoalModal = () => setIsGoalModalOpen(true);
  const closeGoalModal = () => setIsGoalModalOpen(false);

  const openSecurityModal = () => setIsSecurityModalOpen(true);
  const closeSecurityModal = () => setIsSecurityModalOpen(false);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isRead: true } : n);
      localStorage.setItem('edparth_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('edparth_notifications');
  };

  const addXP = (amount: number) => {
    if (currentUser && currentUser.role === 'student') {
      const updatedUser: User = {
        ...currentUser,
        stats: {
          ...currentUser.stats,
          xp: currentUser.stats.xp + amount
        }
      };
      setCurrentUser(updatedUser);
      setStudents(prev => prev.map(s => s.id === updatedUser.id ? updatedUser : s));
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        students,
        contentList,
        exams,
        lectures,
        socialChannels,
        chatMessages,
        testResults,
        activeExam,
        hasSeenIntro,
        setHasSeenIntro: handleSetHasSeenIntro,
        targetGoal,
        setTargetGoal: handleSetTargetGoal,
        isGoalModalOpen,
        openGoalModal,
        closeGoalModal,
        isSecurityModalOpen,
        openSecurityModal,
        closeSecurityModal,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        dppList,
        leaderboard,
        addXP,
        loginUser,
        logoutUser,
        registerStudent,
        addContentItem,
        deleteContentItem,
        addCBTExam,
        deleteCBTExam,
        setActiveExam,
        addLecture,
        deleteLecture,
        addSocialChannel,
        deleteSocialChannel,
        sendChatMessage,
        submitTestResult,
        requireAuth
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
