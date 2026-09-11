export type JEELevel = 'JEE Main' | 'JEE Advanced' | 'Main + Advanced';

export type ContentFilterType =
  | 'Full Lectures'
  | 'One Shots'
  | 'PYQs'
  | 'Revision'
  | 'Problem Solving'
  | 'Formula Revision'
  | 'Strategy'
  | 'Advanced Problems'
  | 'NCERT / Theory';

export type SubjectType = 'Physics' | 'Chemistry' | 'Mathematics' | 'Complete PCM';

export type TargetClassType = 'Class 11' | 'Class 12' | 'Dropper';

export type CourseCategoryType =
  | 'Full Year Batch'
  | 'One-Shot / Crash Course'
  | 'PYQ Series'
  | 'Advanced Rankers'
  | 'Formula & Rapid Revision';

export interface JEELecture {
  id: string;
  chapter: string;
  topic: string;
  lectureType: string;
  targetClass: TargetClassType;
  courseName: string;
  lectureUrl: string;
  youtubeId?: string;
  duration?: string;
}

export interface JEEChannel {
  id: number | string;
  channel: string;
  teacher: string;
  subject: SubjectType;
  level: JEELevel[];
  content: ContentFilterType[];
  targetClasses: TargetClassType[];
  courseCategories: CourseCategoryType[];
  bestFor: string;
  usefulness: 1 | 2 | 3 | 4 | 5;
  language: string;
  type: string;
  url: string;
  verified: boolean;
  featuredVideoId?: string;
  featuredVideoTitle?: string;
  avatar?: string;
  tags?: string[];
  lectures: JEELecture[];
}

export function getYouTubeEmbedSrc(urlOrId?: string): string {
  if (!urlOrId) return '';
  const val = urlOrId.trim();

  // If already embed URL:
  if (val.includes('youtube.com/embed/') || val.includes('youtube-nocookie.com/embed/')) {
    return val;
  }

  // If standard 11-char video id:
  if (/^[a-zA-Z0-9_-]{11}$/.test(val)) {
    return `https://www.youtube-nocookie.com/embed/${val}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Check for playlist list parameter
  const playlistMatch = val.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (playlistMatch && playlistMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistMatch[1]}&autoplay=1&rel=0`;
  }

  // Check for watch?v= parameter
  const videoMatch = val.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (videoMatch && videoMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${videoMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Check for youtu.be/
  const shortMatch = val.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Fallback if starts with PL playlist ID
  if (val.startsWith('PL') || val.startsWith('OL')) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${val}&autoplay=1&rel=0`;
  }

  return '';
}

export const INITIAL_JEE_CHANNELS: JEEChannel[] = [
  // ================= PHYSICS =================
  {
    id: 1,
    channel: 'Eduniti',
    teacher: 'Mohit Goenka',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['PYQs', 'Revision', 'Formula Revision', 'One Shots', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Formula & Rapid Revision', 'PYQ Series', 'One-Shot / Crash Course'],
    bestFor: 'Physics PYQs, rapid revision checklists & formula marathons',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Revision Specialist',
    url: 'https://www.youtube.com/@Eduniti',
    verified: true,
    featuredVideoId: '79hBfx1HhY4',
    featuredVideoTitle: 'Complete Physics Formula Marathon for JEE Main',
    tags: ['Mechanics', 'Electrostatics', 'Optics', 'Modern Physics', 'PYQ Solution'],
    lectures: [
      {
        id: 'lec_ed_1',
        chapter: 'Rotational Motion',
        topic: 'Moment of Inertia & Rolling Motion High-Yield PYQs',
        lectureType: 'PYQs',
        targetClass: 'Class 11',
        courseName: 'Eduniti PYQ Sprint 2025',
        lectureUrl: 'https://www.youtube.com/watch?v=79hBfx1HhY4',
        youtubeId: '79hBfx1HhY4',
        duration: '52 mins'
      },
      {
        id: 'lec_ed_2',
        chapter: 'Electrostatics & Current',
        topic: 'Gauss Law, Potential & RC Circuits 5-Year PYQs',
        lectureType: 'PYQs',
        targetClass: 'Class 12',
        courseName: 'Eduniti PYQ Sprint 2025',
        lectureUrl: 'https://www.youtube.com/watch?v=wX-y5E42a1E',
        youtubeId: 'wX-y5E42a1E',
        duration: '1h 15m'
      },
      {
        id: 'lec_ed_3',
        chapter: 'Modern Physics',
        topic: 'Photoelectric Effect, Bohr Model & Nuclear Physics Marathon',
        lectureType: 'Formula & Rapid Revision',
        targetClass: 'Dropper',
        courseName: 'Eduniti Formula Revision Series',
        lectureUrl: 'https://www.youtube.com/watch?v=bSjF06h_R-g',
        youtubeId: 'bSjF06h_R-g',
        duration: '1h 30m'
      }
    ]
  },
  {
    id: 2,
    channel: 'Physics Galaxy',
    teacher: 'Ashish Arora',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'Revision', 'One Shots', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Advanced Rankers', 'Formula & Rapid Revision', 'Full Year Batch'],
    bestFor: 'Concept depth, 700+ Advanced Illustrations & Revision Checklist',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Teacher / Author',
    url: 'https://www.youtube.com/@PhysicsGalaxy74',
    verified: true,
    featuredVideoId: 'gT8vWJkIqE8',
    featuredVideoTitle: 'Revision Checklist: Rotational Dynamics for JEE Advanced',
    tags: ['Advanced Illustrations', 'Checklist', 'Rotation', 'Thermodynamics', 'Waves'],
    lectures: [
      {
        id: 'lec_pg_1',
        chapter: 'Rotational Dynamics',
        topic: '700+ Advanced Illustrations: Angular Momentum & Collisions',
        lectureType: 'Advanced Problems',
        targetClass: 'Class 11',
        courseName: '700+ Advanced Illustrations',
        lectureUrl: 'https://www.youtube.com/watch?v=gT8vWJkIqE8',
        youtubeId: 'gT8vWJkIqE8',
        duration: '1h 45m'
      },
      {
        id: 'lec_pg_2',
        chapter: 'Ray Optics & Wave Optics',
        topic: 'Revision Checklist: Optical Instruments & Wavefronts',
        lectureType: 'Revision',
        targetClass: 'Class 12',
        courseName: 'PG Revision Checklist',
        lectureUrl: 'https://www.youtube.com/watch?v=2r1c0-n7sXg',
        youtubeId: '2r1c0-n7sXg',
        duration: '1h 20m'
      },
      {
        id: 'lec_pg_3',
        chapter: 'Heat & Thermodynamics',
        topic: 'Carnot Cycles, Entropy & Kinetic Theory Advanced Problem Set',
        lectureType: 'Advanced Problems',
        targetClass: 'Dropper',
        courseName: 'JEE Advanced Rankers Series',
        lectureUrl: 'https://www.youtube.com/watch?v=gT8vWJkIqE8',
        youtubeId: 'gT8vWJkIqE8',
        duration: '2h 10m'
      }
    ]
  },
  {
    id: 3,
    channel: 'PW JEE Wallah Physics',
    teacher: 'Saleem Sir / Rajwant Sir / MR Sir',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'PYQs', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Full Year Batch', 'PYQ Series'],
    bestFor: 'Complete chapter coverage, Manzil series one shots & classroom batches',
    usefulness: 5,
    language: 'Hinglish',
    type: 'Coaching / Faculty',
    url: 'https://www.youtube.com/@PW-JEEWallah',
    verified: true,
    featuredVideoId: 'fV7i12wJ7Zk',
    featuredVideoTitle: 'Manzil 2025: Rotational Motion Complete One Shot',
    tags: ['Manzil Batch', 'Arjuna JEE', 'Lakshya JEE', 'Prayas Droppers'],
    lectures: [
      {
        id: 'lec_pw_p1',
        chapter: 'Work, Energy & Power',
        topic: 'Arjuna JEE Class 11: Work-Energy Theorem & Vertical Circular Motion',
        lectureType: 'Full Lectures',
        targetClass: 'Class 11',
        courseName: 'Arjuna JEE 2025',
        lectureUrl: 'https://www.youtube.com/watch?v=fV7i12wJ7Zk',
        youtubeId: 'fV7i12wJ7Zk',
        duration: '3h 15m'
      },
      {
        id: 'lec_pw_p2',
        chapter: 'Electromagnetic Induction & AC',
        topic: 'Lakshya JEE Class 12: Faraday Law, Lenz Law & LCR Circuits',
        lectureType: 'Full Lectures',
        targetClass: 'Class 12',
        courseName: 'Lakshya JEE 2025',
        lectureUrl: 'https://www.youtube.com/watch?v=x7K4e6e6iYg',
        youtubeId: 'x7K4e6e6iYg',
        duration: '4h 05m'
      },
      {
        id: 'lec_pw_p3',
        chapter: 'Ray Optics',
        topic: 'Manzil One Shot: Reflection, Refraction, Prism & Lens Formula',
        lectureType: 'One Shots',
        targetClass: 'Dropper',
        courseName: 'Manzil 2025 One-Shot Series',
        lectureUrl: 'https://www.youtube.com/watch?v=fV7i12wJ7Zk',
        youtubeId: 'fV7i12wJ7Zk',
        duration: '5h 30m'
      }
    ]
  },
  {
    id: 4,
    channel: 'Competishun - Physics (ABJ Sir)',
    teacher: 'ABJ Sir (Amit Bijarnia)',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'Problem Solving', 'NCERT / Theory'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Full Year Batch', 'Advanced Rankers'],
    bestFor: 'Free systematic full classroom lectures from Kota for JEE Advanced',
    usefulness: 5,
    language: 'Hindi',
    type: 'Kota Faculty',
    url: 'https://www.youtube.com/@MohitTyagi',
    verified: true,
    featuredVideoId: 'Y9_8j9F4n0w',
    featuredVideoTitle: 'Newton Laws of Motion Lecture 01 - ABJ Sir Kota Class',
    tags: ['Kota Classroom', 'Mechanics', 'Electro', 'Rigid Body', 'Wave Optics'],
    lectures: [
      {
        id: 'lec_abj_1',
        chapter: 'Newton Laws of Motion',
        topic: 'Constraint Relations & Pseudo Force Fundamentals',
        lectureType: 'Full Lectures',
        targetClass: 'Class 11',
        courseName: 'Praveen / Pratham Kota Batch',
        lectureUrl: 'https://www.youtube.com/watch?v=Y9_8j9F4n0w',
        youtubeId: 'Y9_8j9F4n0w',
        duration: '1h 10m'
      },
      {
        id: 'lec_abj_2',
        chapter: 'Wave Optics',
        topic: 'Young Double Slit Experiment (YDSE) & Optical Path',
        lectureType: 'Full Lectures',
        targetClass: 'Class 12',
        courseName: 'Praveen / Pratham Kota Batch',
        lectureUrl: 'https://www.youtube.com/watch?v=Y9_8j9F4n0w',
        youtubeId: 'Y9_8j9F4n0w',
        duration: '1h 18m'
      }
    ]
  },
  {
    id: 5,
    channel: 'ALLEN JEE Physics',
    teacher: 'ALLEN Expert Physics Faculty',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['PYQs', 'Problem Solving', 'One Shots', 'Advanced Problems'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['PYQ Series', 'One-Shot / Crash Course'],
    bestFor: 'Score Booster series, Kota problem-solving methodology',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'National Coaching Institute',
    url: 'https://www.youtube.com/@ALLENJEE',
    verified: true,
    featuredVideoId: 'fV7i12wJ7Zk',
    featuredVideoTitle: 'ALLEN Score Booster: Physics High Yield Problems',
    tags: ['ALLEN Kota', 'Score Booster', 'PYQ', 'NTA Papers'],
    lectures: [
      {
        id: 'lec_allen_p1',
        chapter: 'Thermodynamics',
        topic: 'Kota Problem Solving: PV Indicator Diagrams & Heat Engines',
        lectureType: 'Problem Solving',
        targetClass: 'Class 11',
        courseName: 'ALLEN Score Booster',
        lectureUrl: 'https://www.youtube.com/watch?v=fV7i12wJ7Zk',
        youtubeId: 'fV7i12wJ7Zk',
        duration: '1h 25m'
      }
    ]
  },
  {
    id: 6,
    channel: 'Resonance Eduventures Physics',
    teacher: 'Resonance Senior HODs',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Advanced Rankers', 'Full Year Batch'],
    bestFor: 'Kota DPP solving & classic JEE Advanced problem sets',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'National Coaching Institute',
    url: 'https://www.youtube.com/@ResonanceEduventures',
    verified: true,
    featuredVideoId: 'Y9_8j9F4n0w',
    featuredVideoTitle: 'Resonance Advanced DPP Discussion: Rotational Mechanics',
    tags: ['DPP Solving', 'Resonance Kota', 'Advanced Physics'],
    lectures: []
  },
  {
    id: 7,
    channel: 'Motion Education Physics',
    teacher: 'NV Sir (Nitin Vijay) & Motion Team',
    subject: 'Physics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'Problem Solving', 'Strategy'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Full Year Batch'],
    bestFor: 'NV Sir iconic energetic lectures & fundamental intuition',
    usefulness: 4,
    language: 'Hindi',
    type: 'Coaching / Faculty',
    url: 'https://www.youtube.com/@MotionJEE',
    verified: true,
    featuredVideoId: 'fV7i12wJ7Zk',
    featuredVideoTitle: 'Motion One Shot: Circular Motion & Gravitation by NV Sir',
    tags: ['Nitin Vijay', 'Motion Kota', 'Energy', 'One Shot'],
    lectures: []
  },
  {
    id: 8,
    channel: 'FIITJEE Physics',
    teacher: 'FIITJEE Academic Faculty',
    subject: 'Physics',
    level: ['JEE Advanced'],
    content: ['Advanced Problems', 'Problem Solving'],
    targetClasses: ['Class 12', 'Dropper'],
    courseCategories: ['Advanced Rankers'],
    bestFor: 'GMP (Grand Masters Package) & Top 100 AIR problem discussions',
    usefulness: 4,
    language: 'English / Hindi',
    type: 'National Coaching Institute',
    url: 'https://www.youtube.com/@FIITJEELtdOfficial',
    verified: true,
    featuredVideoId: 'gT8vWJkIqE8',
    featuredVideoTitle: 'FIITJEE GMP Advanced Problem Solving: Mechanics',
    tags: ['GMP', 'Top Rankers', 'JEE Advanced Only', 'AITS'],
    lectures: []
  },

  // ================= CHEMISTRY =================
  {
    id: 9,
    channel: 'DexterChem',
    teacher: 'Anoop Vashishtha',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'NCERT / Theory', 'Revision', 'PYQs', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Formula & Rapid Revision', 'PYQ Series', 'One-Shot / Crash Course'],
    bestFor: '100% NCERT coverage, line-by-line Inorganic & Physical Chemistry',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Chemistry Specialist',
    url: 'https://www.youtube.com/@DexterChem',
    verified: true,
    featuredVideoId: 'j9_j2p2x8Y4',
    featuredVideoTitle: 'Chemical Bonding 100% NCERT Line-by-Line & Advanced Revision',
    tags: ['NCERT Inorganic', 'Periodic Table', 'Coordination', 'Physical Chem'],
    lectures: [
      {
        id: 'lec_dex_1',
        chapter: 'Chemical Bonding',
        topic: 'VSEPR, Hybridization & Molecular Orbital Theory (MOT) Sprint',
        lectureType: 'NCERT / Theory',
        targetClass: 'Class 11',
        courseName: 'NCERT Line-by-Line 2025',
        lectureUrl: 'https://www.youtube.com/watch?v=j9_j2p2x8Y4',
        youtubeId: 'j9_j2p2x8Y4',
        duration: '1h 10m'
      },
      {
        id: 'lec_dex_2',
        chapter: 'Coordination Compounds',
        topic: 'Crystal Field Theory (CFT), Isomerism & Magnetic Moments',
        lectureType: 'Revision',
        targetClass: 'Class 12',
        courseName: 'DexterChem Fast-Track Chemistry',
        lectureUrl: 'https://www.youtube.com/watch?v=6v7u1_1w9X0',
        youtubeId: '6v7u1_1w9X0',
        duration: '1h 35m'
      },
      {
        id: 'lec_dex_3',
        chapter: 'Thermodynamics & Equilibrium',
        topic: 'Chemical & Ionic Equilibrium High Yield PYQs',
        lectureType: 'PYQs',
        targetClass: 'Dropper',
        courseName: 'DexterChem 100% Score Series',
        lectureUrl: 'https://www.youtube.com/watch?v=j9_j2p2x8Y4',
        youtubeId: 'j9_j2p2x8Y4',
        duration: '2h 00m'
      }
    ]
  },
  {
    id: 10,
    channel: 'Pankaj Sir Chemistry',
    teacher: 'Pankaj Sijairya',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'NCERT / Theory', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Full Year Batch'],
    bestFor: 'Simplified Organic Chemistry mechanisms & board to JEE foundation',
    usefulness: 5,
    language: 'Hindi',
    type: 'Teacher / Faculty',
    url: 'https://www.youtube.com/@PankajSirChemistry',
    verified: true,
    featuredVideoId: 'm6N_r0z4Q98',
    featuredVideoTitle: 'Complete General Organic Chemistry (GOC) in One Shot',
    tags: ['Organic Chemistry', 'GOC', 'Hydrocarbons', 'Named Reactions'],
    lectures: [
      {
        id: 'lec_pankaj_1',
        chapter: 'General Organic Chemistry (GOC)',
        topic: 'Inductive, Mesomeric, Hyperconjugation & Stability of Intermediates',
        lectureType: 'One Shots',
        targetClass: 'Class 11',
        courseName: 'Pankaj Sir Organic Master Series',
        lectureUrl: 'https://www.youtube.com/watch?v=m6N_r0z4Q98',
        youtubeId: 'm6N_r0z4Q98',
        duration: '3h 45m'
      },
      {
        id: 'lec_pankaj_2',
        chapter: 'Aldehydes, Ketones & Carboxylic Acids',
        topic: 'Nucleophilic Addition, Aldol, Cannizzaro & Reduction Reactions',
        lectureType: 'One Shots',
        targetClass: 'Class 12',
        courseName: 'Class 12 Board + JEE Series',
        lectureUrl: 'https://www.youtube.com/watch?v=UqM2m0m0p1k',
        youtubeId: 'UqM2m0m0p1k',
        duration: '4h 15m'
      }
    ]
  },
  {
    id: 11,
    channel: 'Sachin Rana [IITB]',
    teacher: 'Sachin Rana',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'NCERT / Theory', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Advanced Rankers', 'Full Year Batch'],
    bestFor: 'Uncompromising JEE Advanced Organic Chemistry with rigorous stereochemistry',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'IITian Educator',
    url: 'https://www.youtube.com/@SachinRanaIITB',
    verified: true,
    featuredVideoId: '5U6-7e3f8Y0',
    featuredVideoTitle: 'Complete Reaction Mechanisms for JEE Advanced (Clayden Level)',
    tags: ['JEE Advanced Organic', 'Clayden Level', 'Stereochemistry', 'IIT Bombay'],
    lectures: [
      {
        id: 'lec_sr_1',
        chapter: 'Stereochemistry',
        topic: 'R/S Configuration, Pseudoasymmetry, Conformational Analysis',
        lectureType: 'Advanced Problems',
        targetClass: 'Class 11',
        courseName: 'Sachin Rana Complete Organic',
        lectureUrl: 'https://www.youtube.com/watch?v=5U6-7e3f8Y0',
        youtubeId: '5U6-7e3f8Y0',
        duration: '2h 10m'
      },
      {
        id: 'lec_sr_2',
        chapter: 'Aromatic Electrophilic Substitution',
        topic: 'Directing Groups, Nitration, Friedel Crafts & Arenium Ion',
        lectureType: 'Full Lectures',
        targetClass: 'Class 12',
        courseName: 'JEE Advanced Rankers Organic',
        lectureUrl: 'https://www.youtube.com/watch?v=8m9l7p6v4Y1',
        youtubeId: '8m9l7p6v4Y1',
        duration: '2h 40m'
      }
    ]
  },
  {
    id: 12,
    channel: 'Competishun - Chemistry (ALK Sir & NS Sir)',
    teacher: 'ALK Sir (Physical & Inorganic) & NS Sir (Organic)',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'NCERT / Theory', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Full Year Batch', 'Advanced Rankers'],
    bestFor: 'Exhaustive Kota classroom level theory for JEE Advanced',
    usefulness: 5,
    language: 'Hindi',
    type: 'Kota Faculty',
    url: 'https://www.youtube.com/@MohitTyagi',
    verified: true,
    featuredVideoId: 'j9_j2p2x8Y4',
    featuredVideoTitle: 'ALK Sir Thermodynamics & Ionic Equilibrium Complete Kota Class',
    tags: ['ALK Sir', 'NS Sir', 'Physical Chemistry', 'Inorganic Chemistry'],
    lectures: [
      {
        id: 'lec_alk_1',
        chapter: 'Chemical Kinetics & Radioactivity',
        topic: 'Integrated Rate Laws, Arrhenius Equation & Half Life',
        lectureType: 'Full Lectures',
        targetClass: 'Class 12',
        courseName: 'Competishun Kota Classroom',
        lectureUrl: 'https://www.youtube.com/watch?v=j9_j2p2x8Y4',
        youtubeId: 'j9_j2p2x8Y4',
        duration: '1h 15m'
      }
    ]
  },
  {
    id: 13,
    channel: 'PW JEE Wallah Chemistry',
    teacher: 'Faisal Sir / Om Pandey Sir / Amit Mahajan Sir',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'PYQs', 'NCERT / Theory'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Full Year Batch', 'PYQ Series'],
    bestFor: 'Manzil chemistry one shots, quick memory tricks & formula revision',
    usefulness: 5,
    language: 'Hinglish',
    type: 'Coaching / Faculty',
    url: 'https://www.youtube.com/@PW-JEEWallah',
    verified: true,
    featuredVideoId: 'UqM2m0m0p1k',
    featuredVideoTitle: 'Manzil 2025: Solutions & Electrochemistry Complete One Shot',
    tags: ['Manzil Chemistry', 'Faisal Sir', 'Om Pandey', 'One Shot'],
    lectures: [
      {
        id: 'lec_pw_c1',
        chapter: 'Solutions & Colligative Properties',
        topic: 'Raoult Law, Van t Hoff Factor & Colligative Properties Manzil',
        lectureType: 'One Shots',
        targetClass: 'Class 12',
        courseName: 'Manzil 2025 Chemistry',
        lectureUrl: 'https://www.youtube.com/watch?v=UqM2m0m0p1k',
        youtubeId: 'UqM2m0m0p1k',
        duration: '4h 30m'
      }
    ]
  },
  {
    id: 14,
    channel: 'IITian Explains (MKA Sir)',
    teacher: 'Md. Kashif Alam (MKA Sir)',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'Revision', 'One Shots'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Advanced Rankers', 'One-Shot / Crash Course'],
    bestFor: 'Top ranker Organic Chemistry & Kota reaction tricks',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'Kota Faculty',
    url: 'https://www.youtube.com/@IITianExplains',
    verified: true,
    featuredVideoId: '5U6-7e3f8Y0',
    featuredVideoTitle: 'MKA Sir Brainstorming Session on Organic Reaction Mechanisms',
    tags: ['MKA Sir', 'Organic Chemistry', 'Advanced Brainstorming'],
    lectures: []
  },
  {
    id: 15,
    channel: 'Unacademy JEE Chemistry (Sakshi Vora)',
    teacher: 'Sakshi Ganotra Vora',
    subject: 'Chemistry',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['One Shots', 'NCERT / Theory', 'Revision', 'PYQs'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Formula & Rapid Revision'],
    bestFor: 'BounceBack series 44-chapter chemistry one-shots with complete notes',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Educator',
    url: 'https://www.youtube.com/@UnacademyJEE',
    verified: true,
    featuredVideoId: '6v7u1_1w9X0',
    featuredVideoTitle: 'BounceBack: Complete Periodic Table & Coordination Chemistry',
    tags: ['BounceBack', 'Sakshi Vora', '44 Chapters', 'High Yield'],
    lectures: [
      {
        id: 'lec_sakshi_1',
        chapter: 'Periodic Classification & Trends',
        topic: 'BounceBack 1.0: Ionization Enthalpy, Electron Gain & Radius Exceptions',
        lectureType: 'One Shots',
        targetClass: 'Class 11',
        courseName: 'BounceBack Series',
        lectureUrl: 'https://www.youtube.com/watch?v=6v7u1_1w9X0',
        youtubeId: '6v7u1_1w9X0',
        duration: '3h 10m'
      }
    ]
  },

  // ================= MATHEMATICS =================
  {
    id: 16,
    channel: 'Mohit Tyagi',
    teacher: 'Mohit Tyagi',
    subject: 'Mathematics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'NCERT / Theory', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Full Year Batch', 'Advanced Rankers'],
    bestFor: 'The most comprehensive, unhurried Calculus & Algebra course on YouTube',
    usefulness: 5,
    language: 'Hindi',
    type: 'Kota Master Teacher',
    url: 'https://www.youtube.com/@MohitTyagi',
    verified: true,
    featuredVideoId: 'kY3PsmP2zT8',
    featuredVideoTitle: 'Functions & Graphs Complete Lecture 01 - Mohit Tyagi',
    tags: ['Calculus', 'Coordinate Geometry', 'Algebra', 'Vectors', 'IIT Delhi'],
    lectures: [
      {
        id: 'lec_mt_1',
        chapter: 'Functions & Graphs',
        topic: 'Domain, Range, Odd/Even, Periodic & Functional Equations',
        lectureType: 'Full Lectures',
        targetClass: 'Class 12',
        courseName: 'Mohit Tyagi Free YouTube Library',
        lectureUrl: 'https://www.youtube.com/watch?v=kY3PsmP2zT8',
        youtubeId: 'kY3PsmP2zT8',
        duration: '58 mins'
      },
      {
        id: 'lec_mt_2',
        chapter: 'Definite Integration',
        topic: 'King Property, Queen Property & Leibniz Integral Rule',
        lectureType: 'Full Lectures',
        targetClass: 'Class 12',
        courseName: 'Mohit Tyagi Free YouTube Library',
        lectureUrl: 'https://www.youtube.com/watch?v=kY3PsmP2zT8',
        youtubeId: 'kY3PsmP2zT8',
        duration: '1h 05m'
      },
      {
        id: 'lec_mt_3',
        chapter: 'Conic Sections',
        topic: 'Parabola, Ellipse & Hyperbola Standard Equations & Tangents',
        lectureType: 'Full Lectures',
        targetClass: 'Class 11',
        courseName: 'Mohit Tyagi Free YouTube Library',
        lectureUrl: 'https://www.youtube.com/watch?v=kY3PsmP2zT8',
        youtubeId: 'kY3PsmP2zT8',
        duration: '1h 12m'
      }
    ]
  },
  {
    id: 17,
    channel: 'MathonGo',
    teacher: 'Anup Gupta',
    subject: 'Mathematics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['PYQs', 'One Shots', 'Problem Solving', 'Strategy', 'Revision'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['PYQ Series', 'One-Shot / Crash Course', 'Formula & Rapid Revision'],
    bestFor: 'Precision PYQ series, marks vs percentile benchmarks & chapter weightage analysis',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Test Series & Analytics Lead',
    url: 'https://www.youtube.com/@MathonGo',
    verified: true,
    featuredVideoId: 'x9aM3lM_qY0',
    featuredVideoTitle: 'JEE Main Mathematics: 10-Year Chapterwise PYQ Marathon',
    tags: ['PYQ Series', 'Marks vs Percentile', 'Weightage', 'Paper Analysis'],
    lectures: [
      {
        id: 'lec_mg_1',
        chapter: 'Matrices & Determinants',
        topic: 'Top 50 PYQs with 30-Second Solving Shortcuts',
        lectureType: 'PYQs',
        targetClass: 'Class 12',
        courseName: 'MathonGo Chapterwise PYQ Series',
        lectureUrl: 'https://www.youtube.com/watch?v=x9aM3lM_qY0',
        youtubeId: 'x9aM3lM_qY0',
        duration: '1h 25m'
      },
      {
        id: 'lec_mg_2',
        chapter: 'Sequence & Series',
        topic: 'AP, GP, HP & AGP Arithmetic-Geometric Progression PYQ Sprint',
        lectureType: 'PYQs',
        targetClass: 'Class 11',
        courseName: 'MathonGo Chapterwise PYQ Series',
        lectureUrl: 'https://www.youtube.com/watch?v=3cR3u3Z3d6k',
        youtubeId: '3cR3u3Z3d6k',
        duration: '1h 10m'
      },
      {
        id: 'lec_mg_3',
        chapter: 'Vector & 3D Geometry',
        topic: 'Shortest Distance, Planes & Vector Cross Products 100% Guaranteed Marks',
        lectureType: 'PYQs',
        targetClass: 'Dropper',
        courseName: 'MathonGo JEE Main Rank Booster',
        lectureUrl: 'https://www.youtube.com/watch?v=x9aM3lM_qY0',
        youtubeId: 'x9aM3lM_qY0',
        duration: '2h 15m'
      }
    ]
  },
  {
    id: 18,
    channel: 'Maths Unplugged',
    teacher: 'Maths Unplugged Faculty',
    subject: 'Mathematics',
    level: ['JEE Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Advanced Rankers', 'Full Year Batch'],
    bestFor: 'Extreme conceptual mathematical rigor, Black Book solutions & Olympiad crossover',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Pure Maths Enthusiast',
    url: 'https://www.youtube.com/@MathsUnplugged',
    verified: true,
    featuredVideoId: 'k0l1m2n3o4p',
    featuredVideoTitle: 'Limits & Continuity Masterclass for JEE Advanced Rankers',
    tags: ['Black Book', 'Calculus Rigor', 'Pure Mathematics', 'JEE Advanced Only'],
    lectures: [
      {
        id: 'lec_mu_1',
        chapter: 'Calculus: Limits & Continuity',
        topic: 'Epsilon-Delta Intuition, Taylor Series Expansion & Tricky Asymptotes',
        lectureType: 'Advanced Problems',
        targetClass: 'Class 12',
        courseName: 'Maths Unplugged Advanced Rankers',
        lectureUrl: 'https://www.youtube.com/watch?v=k0l1m2n3o4p',
        youtubeId: 'k0l1m2n3o4p',
        duration: '2h 45m'
      }
    ]
  },
  {
    id: 19,
    channel: 'Unacademy JEE - NV Sir (Nishant Vora)',
    teacher: 'Nishant Vora (NV Sir)',
    subject: 'Mathematics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['One Shots', 'Revision', 'PYQs', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Formula & Rapid Revision', 'PYQ Series'],
    bestFor: 'BounceBack 1.0 & 2.0 legendary one-shot lectures with full handwritten notes',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'Educator',
    url: 'https://www.youtube.com/@UnacademyJEE',
    verified: true,
    featuredVideoId: 'bE7pIe11XzM',
    featuredVideoTitle: 'BounceBack 2.0: Matrices & Determinants Complete One Shot',
    tags: ['BounceBack', 'NV Sir', 'One Shot', 'Handwritten Notes'],
    lectures: [
      {
        id: 'lec_nv_1',
        chapter: 'Matrices & Determinants',
        topic: 'BounceBack: Inverse, Adjoint, Cramer Rule & System of Linear Equations',
        lectureType: 'One Shots',
        targetClass: 'Class 12',
        courseName: 'BounceBack 2.0 Series',
        lectureUrl: 'https://www.youtube.com/watch?v=bE7pIe11XzM',
        youtubeId: 'bE7pIe11XzM',
        duration: '4h 20m'
      },
      {
        id: 'lec_nv_2',
        chapter: 'Straight Lines & Circles',
        topic: 'BounceBack: Family of Lines, Radical Axis & Pair of Tangents',
        lectureType: 'One Shots',
        targetClass: 'Class 11',
        courseName: 'BounceBack 2.0 Series',
        lectureUrl: 'https://www.youtube.com/watch?v=lM5W2n6x_7c',
        youtubeId: 'lM5W2n6x_7c',
        duration: '5h 10m'
      }
    ]
  },
  {
    id: 20,
    channel: 'JEE Nexus (Arvind Kalia Sir)',
    teacher: 'Arvind Kalia',
    subject: 'Mathematics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['One Shots', 'PYQs', 'Problem Solving', 'Revision'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'PYQ Series'],
    bestFor: 'Fun, approachable one shots & speed problem solving for JEE Main',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'Master Teacher',
    url: 'https://www.youtube.com/@JEENexus',
    verified: true,
    featuredVideoId: 'x9aM3lM_qY0',
    featuredVideoTitle: 'JEE Nexus Sprint: Complete Calculus in One Shot',
    tags: ['Arvind Kalia', 'Nexus', 'Sprint', 'One Shot'],
    lectures: []
  },
  {
    id: 21,
    channel: 'Neha Agrawal Mathematically Inclined',
    teacher: 'Neha Agrawal',
    subject: 'Mathematics',
    level: ['JEE Main'],
    content: ['One Shots', 'Revision', 'PYQs', 'Formula Revision'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Formula & Rapid Revision', 'One-Shot / Crash Course'],
    bestFor: 'Quick formula recaps, 1-minute hacks & 100% JEE Main score boosters',
    usefulness: 4,
    language: 'Hindi',
    type: 'Educator',
    url: 'https://www.youtube.com/@MathematicallyInclined',
    verified: true,
    featuredVideoId: '3cR3u3Z3d6k',
    featuredVideoTitle: 'Super Shortcuts & Formula Hacks: JEE Main Mathematics',
    tags: ['Short Tricks', 'Hacks', 'Rapid Revision', 'Boards + JEE'],
    lectures: []
  },
  {
    id: 22,
    channel: 'PW JEE Wallah Mathematics',
    teacher: 'Sachin Sir / Ashish Sir / Tarun Sir',
    subject: 'Mathematics',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'PYQs', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Full Year Batch', 'PYQ Series'],
    bestFor: 'Manzil batch maths marathons, Arjuna Class 11 & Lakshya Class 12 batches',
    usefulness: 5,
    language: 'Hinglish',
    type: 'Coaching / Faculty',
    url: 'https://www.youtube.com/@PW-JEEWallah',
    verified: true,
    featuredVideoId: 'bE7pIe11XzM',
    featuredVideoTitle: 'Manzil 2025: Integral Calculus Complete Marathon (Sachin Sir)',
    tags: ['Manzil Maths', 'Sachin Sir', 'Ashish Agarwal', 'One Shot'],
    lectures: [
      {
        id: 'lec_pw_m1',
        chapter: 'Differential Calculus',
        topic: 'Continuity, Differentiability & Method of Differentiation One Shot',
        lectureType: 'One Shots',
        targetClass: 'Class 12',
        courseName: 'Manzil 2025 Mathematics',
        lectureUrl: 'https://www.youtube.com/watch?v=bE7pIe11XzM',
        youtubeId: 'bE7pIe11XzM',
        duration: '5h 45m'
      }
    ]
  },

  // ================= COMPLETE PCM CHANNELS =================
  {
    id: 23,
    channel: 'JEE Wallah (PW Complete PCM)',
    teacher: 'Physics Wallah Star Faculty (P, C, M)',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'PYQs', 'Revision', 'Problem Solving', 'Formula Revision', 'Strategy'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Full Year Batch', 'One-Shot / Crash Course', 'PYQ Series', 'Formula & Rapid Revision'],
    bestFor: 'India highest enrolled free JEE YouTube ecosystem (Arjuna, Lakshya, Manzil, Prayas)',
    usefulness: 5,
    language: 'Hinglish',
    type: 'EdTech Platform',
    url: 'https://www.youtube.com/@PW-JEEWallah',
    verified: true,
    featuredVideoId: 'fV7i12wJ7Zk',
    featuredVideoTitle: 'Manzil 2025: Physics, Chemistry & Maths Complete Marathon Series',
    tags: ['Manzil', 'Arjuna', 'Lakshya', 'Prayas', 'PW Stars'],
    lectures: [
      {
        id: 'lec_pcm_pw_1',
        chapter: 'Physics: Kinematics & Mechanics',
        topic: 'Manzil 2025: Kinematics 1D, 2D & Projectile Motion Complete',
        lectureType: 'One Shots',
        targetClass: 'Class 11',
        courseName: 'Manzil 2025 Crash Course',
        lectureUrl: 'https://www.youtube.com/watch?v=fV7i12wJ7Zk',
        youtubeId: 'fV7i12wJ7Zk',
        duration: '4h 20m'
      },
      {
        id: 'lec_pcm_pw_2',
        chapter: 'Chemistry: Electrochemistry & Solutions',
        topic: 'Nernst Equation, Galvanic Cells & Conductance Manzil',
        lectureType: 'One Shots',
        targetClass: 'Class 12',
        courseName: 'Manzil 2025 Crash Course',
        lectureUrl: 'https://www.youtube.com/watch?v=UqM2m0m0p1k',
        youtubeId: 'UqM2m0m0p1k',
        duration: '3h 50m'
      },
      {
        id: 'lec_pcm_pw_3',
        chapter: 'Mathematics: Vector & 3D Geometry',
        topic: 'Complete 3D Coordinate Geometry One Shot',
        lectureType: 'One Shots',
        targetClass: 'Dropper',
        courseName: 'Manzil 2025 Crash Course',
        lectureUrl: 'https://www.youtube.com/watch?v=bE7pIe11XzM',
        youtubeId: 'bE7pIe11XzM',
        duration: '5h 15m'
      }
    ]
  },
  {
    id: 24,
    channel: 'Unacademy JEE',
    teacher: 'Top Unacademy Master Educators (P, C, M)',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'PYQs', 'Revision', 'Formula Revision'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Formula & Rapid Revision', 'PYQ Series'],
    bestFor: 'Historic BounceBack 1.0 & 2.0 full syllabus playlists in high production quality',
    usefulness: 5,
    language: 'Hindi / English',
    type: 'EdTech Platform',
    url: 'https://www.youtube.com/@UnacademyJEE',
    verified: true,
    featuredVideoId: 'bE7pIe11XzM',
    featuredVideoTitle: 'BounceBack Complete PCM Master Library: All 44 Chapters',
    tags: ['BounceBack', 'Unacademy JEE', 'Complete PCM', 'One Shot'],
    lectures: []
  },
  {
    id: 25,
    channel: 'Vedantu JEE',
    teacher: 'Vedantu Master Teachers',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'One Shots', 'PYQs', 'Revision', 'Strategy'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'PYQ Series'],
    bestFor: 'Sprint sessions, marathon problem solving & paper prediction mock tests',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'EdTech Platform',
    url: 'https://www.youtube.com/@VedantuJEE',
    verified: true,
    featuredVideoId: 'x9aM3lM_qY0',
    featuredVideoTitle: 'Vedantu JEE Sprint: PCM Complete Mock Paper Live Solving',
    tags: ['Sprint', 'Vedantu', 'Live Mock', 'Paper Prediction'],
    lectures: []
  },
  {
    id: 26,
    channel: 'eSaral - JEE',
    teacher: 'NKC Sir, NV Sir, Prateek Sir (IITians Team)',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['One Shots', 'Revision', 'Formula Revision', 'Strategy', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Formula & Rapid Revision', 'One-Shot / Crash Course'],
    bestFor: 'Mind maps, 3-layer revision & structured revision checklists for JEE Main',
    usefulness: 4,
    language: 'Hindi',
    type: 'Coaching Platform',
    url: 'https://www.youtube.com/@eSaral',
    verified: true,
    featuredVideoId: '79hBfx1HhY4',
    featuredVideoTitle: 'eSaral 3-Layer Revision: Complete PCM Formula Mindmaps',
    tags: ['eSaral', 'Mind Maps', 'Revision Checklist', 'IITian Faculty'],
    lectures: []
  },
  {
    id: 27,
    channel: 'ATP STAR Kota',
    teacher: 'Vineet Khatri Sir & Kota Team',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Revision', 'Problem Solving', 'One Shots', 'Strategy', 'NCERT / Theory'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'Formula & Rapid Revision'],
    bestFor: 'Rank Boosting Course (RBC), Vineet Khatri Sir Organic Chemistry & Kota strategies',
    usefulness: 4,
    language: 'Hindi',
    type: 'Kota Coaching Institute',
    url: 'https://www.youtube.com/@ATPSTARJEE',
    verified: true,
    featuredVideoId: 'm6N_r0z4Q98',
    featuredVideoTitle: 'ATP STAR RBC: Rank Boosting Course PCM Strategy & Solving',
    tags: ['Vineet Khatri', 'RBC', 'Kota Strategy', 'ATP STAR'],
    lectures: []
  },
  {
    id: 28,
    channel: 'Competishun - Official',
    teacher: 'Mohit Tyagi Sir, ABJ Sir, ALK Sir, NS Sir',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['Full Lectures', 'Advanced Problems', 'NCERT / Theory', 'Problem Solving'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['Full Year Batch', 'Advanced Rankers'],
    bestFor: 'The benchmark standard for free, zero-distraction complete PCM Kota preparation',
    usefulness: 5,
    language: 'Hindi',
    type: 'Kota Faculty Team',
    url: 'https://www.youtube.com/@MohitTyagi',
    verified: true,
    featuredVideoId: 'kY3PsmP2zT8',
    featuredVideoTitle: 'Competishun Kota Full Syllabus System: Physics, Chemistry & Mathematics',
    tags: ['Competishun', 'Mohit Tyagi', 'ABJ Sir', 'ALK Sir', 'Zero Distraction'],
    lectures: []
  },
  {
    id: 29,
    channel: 'ALLEN JEE - Official',
    teacher: 'ALLEN Kota HOD Council',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['PYQs', 'Problem Solving', 'Revision', 'Strategy'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['PYQ Series', 'Formula & Rapid Revision'],
    bestFor: 'Official NTA paper discussions, Kota masterclasses & live analysis',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'National Coaching Institute',
    url: 'https://www.youtube.com/@ALLENJEE',
    verified: true,
    featuredVideoId: 'fV7i12wJ7Zk',
    featuredVideoTitle: 'ALLEN JEE: Live Paper Discussion & Complete PCM Score Booster',
    tags: ['ALLEN Kota', 'National Leader', 'NTA Papers'],
    lectures: []
  },
  {
    id: 30,
    channel: 'Aakash JEE',
    teacher: 'Aakash National Faculty',
    subject: 'Complete PCM',
    level: ['JEE Main', 'JEE Advanced', 'Main + Advanced'],
    content: ['One Shots', 'PYQs', 'Revision', 'Strategy'],
    targetClasses: ['Class 11', 'Class 12', 'Dropper'],
    courseCategories: ['One-Shot / Crash Course', 'PYQ Series'],
    bestFor: 'Challenger series, chapterwise rapid recall & CBT tips',
    usefulness: 4,
    language: 'Hindi / English',
    type: 'National Coaching Institute',
    url: 'https://www.youtube.com/@Aakash_JEE',
    verified: true,
    featuredVideoId: 'x9aM3lM_qY0',
    featuredVideoTitle: 'Aakash JEE Challenger Series: PCM Rapid Recall',
    tags: ['Aakash', 'Challenger', 'National Test Prep'],
    lectures: []
  }
];
