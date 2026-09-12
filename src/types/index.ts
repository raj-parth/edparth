export type UserRole = 'student' | 'admin';

export type TargetExam = 'JEE Main/Adv' | 'NEET UG' | 'Govt Exam (SSC/NDA/CUET)' | 'CBSE Class 9' | 'CBSE Class 10' | 'CBSE Class 11' | 'CBSE Class 12';

export type ClassGrade = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Dropper/Target';

export type ExamCategory = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'JEE' | 'NEET' | 'Govt Exam';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash?: string;
  classGrade?: ClassGrade;
  school?: string;
  targetExam?: TargetExam;
  avatar?: string;
  phone?: string;
  joinedAt: string;
  stats: {
    testsGiven: number;
    studyHours: number;
    streakDays: number;
    avgScore: number;
    xp: number;
  };
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'notes' | 'dpp' | 'pyq' | 'formula';
  category: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'JEE' | 'NEET' | 'Govt Exam';
  subject: string;
  fileUrl: string;
  fileSize: string;
  thumbnail?: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadsCount: number;
  pagesCount?: number;
  tags: string[];
}

export interface LectureItem {
  id: string;
  title: string;
  channelName: string;
  youtubeUrl: string;
  embedId: string;
  category: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'JEE' | 'NEET' | 'Govt Exam';
  subject: string;
  duration?: string;
  thumbnail?: string;
  bannerUrl?: string;
  description?: string;
  addedAt: string;
}

export interface SocialChannel {
  id: string;
  platform: 'youtube' | 'telegram' | 'instagram';
  title: string;
  handleOrName: string;
  subject: string;
  category?: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'JEE' | 'NEET' | 'Govt Exam' | 'General';
  description: string;
  bannerUrl: string;
  linkUrl: string;
  badge?: string;
  stats?: string;
  videos?: {
    id: string;
    title: string;
    embedId: string;
    duration?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole?: UserRole;
  senderClass?: string;
  message: string;
  timestamp: string;
  isRequest?: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface CBTQuestion {
  id: number;
  subject: string;
  text: string;
  imageUrl?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  marks: number;
  negativeMarks: number;
  topic?: string;
}

export interface CBTExam {
  id: string;
  title: string;
  targetExam: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  instructions: string[];
  questions: CBTQuestion[];
  createdBy: string;
  createdAt: string;
  attemptsCount: number;
}

export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review';

export interface StudentTestResult {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  score: number;
  maxScore: number;
  accuracy: number;
  totalAttempted: number;
  correctCount: number;
  wrongCount: number;
  timeTakenSeconds: number;
  timestamp: string;
  userAnswers: Record<number, string>;
}

export interface DPPQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DPPItem {
  id: string;
  title: string;
  subject: string;
  category: ExamCategory;
  lectureId?: string;
  questions: DPPQuestion[];
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AIDoubtItem {
  id: string;
  question: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'General';
  conceptTitle: string;
  explanation: string;
  formulaUsed?: string;
  stepByStep: string[];
  suggestedTopic: string;
  askedAt: string;
  isBookmarked?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  classGrade: string;
  targetExam: string;
  xp: number;
  streakDays: number;
  testsGiven: number;
  avgAccuracy: number;
  badge: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'test' | 'lecture' | 'dpp' | 'security' | 'system';
  isRead: boolean;
}

