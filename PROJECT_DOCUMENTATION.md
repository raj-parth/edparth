# 📘 EdParth Study — Complete Technical & Operational Project Documentation

**Project Name:** EdParth Study Platform  
**Live Repository:** [https://github.com/raj-parth/edparth](https://github.com/raj-parth/edparth)  
**Lead Architect & Developer:** RAJ KANNAUJIYA  
**Development Team:** TEAM PARTH  
**Target Audience:** Class 9–12 CBSE/ICSE, JEE Main & Advanced, NEET UG, and Competitive Exam Aspirants  
**License:** Proprietary / Educational Open Platform  

---

## 📑 Table of Contents
1. [Executive Summary & Product Vision](#1-executive-summary--product-vision)
2. [High-Level Architecture & Tech Stack](#2-high-level-architecture--tech-stack)
3. [Database Architecture & Firestore Data Models](#3-database-architecture--firestore-data-models)
4. [Authentication & Security Implementation](#4-authentication--security-implementation)
5. [Core Features & Module Breakdown](#5-core-features--module-breakdown)
   - [5.1 Interactive AI Mascot (PARTH)](#51-interactive-ai-mascot-parth)
   - [5.2 NTA-Standard CBT Mock Exam Engine](#52-nta-standard-cbt-mock-exam-engine)
   - [5.3 Automated PDF-to-CBT Converter](#53-automated-pdf-to-cbt-converter)
   - [5.4 Study Material Vault & 100% Free Storage](#54-study-material-vault--100-free-storage)
   - [5.5 YouTube Video Lecture Masterclass Hub](#55-youtube-video-lecture-masterclass-hub)
   - [5.6 24/7 AI Doubt Solving Engine](#56-247-ai-doubt-solving-engine)
   - [5.7 Student Community & Live Chat](#57-student-community--live-chat)
   - [5.8 Gamification, Leaderboards & Daily Streaks](#58-gamification-leaderboards--daily-streaks)
   - [5.9 Master Admin Dashboard & Real-Time Analytics](#59-master-admin-dashboard--real-time-analytics)
   - [5.10 Content Protection & DRM Security Guard](#510-content-protection--drm-security-guard)
   - [5.11 Mobile Responsive Navigation (Native App Feel)](#511-mobile-responsive-navigation-native-app-feel)
6. [Firebase Configuration & Security Rules](#6-firebase-configuration--security-rules)
7. [Environment Variables & Configuration](#7-environment-variables--configuration)
8. [Local Development & Production Build](#8-local-development--production-build)
9. [Deployment Guide (Vercel / Netlify)](#9-deployment-guide-vercel--netlify)
10. [Maintenance & Administrator Operations Manual](#10-maintenance--administrator-operations-manual)

---

## 1. Executive Summary & Product Vision

**EdParth Study** is an enterprise-grade, modern digital learning ecosystem engineered to provide premier exam preparation tools—equivalent to paid edtech platforms—completely free of cost for Indian students.

### Primary Objectives:
- **Zero AI/Demo Fluff:** Eliminates all fake visitor counters, hardcoded fake reviews, and static mock figures in favor of genuine user interactions.
- **Data-Driven Real-Time Sync:** Fully powered by Google Firebase (Firestore Database, Firebase Authentication, and Google Analytics 4).
- **100% Free Tier Forever Architecture:** Zero mandatory server fees or cloud credit card requirements. Database stays strictly within Firebase Spark plan (₹0/mo), while notes and high-capacity PDFs leverage Telegram Channel and Google Drive links for unlimited free storage.
- **Device-Agnostic Usability:** High-performance desktop study dashboard coupled with an app-like bottom navigation bar on mobile viewports.

---

## 2. High-Level Architecture & Tech Stack

```
                               ┌──────────────────────────────────────────────┐
                               │                 CLIENT BROWSER               │
                               │  React 19 + TypeScript + Vite + Tailwind CSS │
                               └──────────────┬───────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
                    ▼                         ▼                         ▼
         ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
         │ Firebase Cloud Auth │   │  Cloud Firestore DB │   │  Google Analytics   │
         │ - Email / Password  │   │  - Real-time Sync   │   │  - Measurement ID   │
         │ - SHA-256 Security  │   │  - Collections CRUD │   │    G-V7BWEXCZ7G     │
         └─────────────────────┘   └─────────────────────┘   └─────────────────────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              ▼
                               ┌──────────────────────────────┐
                               │  UNLIMITED STORAGE BACKEND   │
                               │  - Telegram (t.me/edparth)   │
                               │  - Google Drive Documents    │
                               │  - Firebase Cloud Storage    │
                               └──────────────────────────────┘
```

### Core Technologies:
| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19.x with TypeScript 5.8 |
| **Build & Bundler** | Vite 8.2 (Sub-second HMR, tree-shaken rollup chunks) |
| **Styling** | Tailwind CSS v4 + Custom Glassmorphism & Micro-animations |
| **State Management** | React Context API (`AppContext`) with bidirectional cloud sync |
| **Backend & Cloud Database**| Google Cloud Firestore (Multi-device real-time listeners) |
| **Authentication** | Firebase Authentication + Web Crypto SHA-256 Hashing |
| **Telemetry & Metrics** | Google Analytics 4 (`G-V7BWEXCZ7G`) + In-app metrics |
| **Motion & Visuals** | Framer Motion, HTML5 Canvas Physics, Confetti animations |
| **Icons & Assets** | Lucide React |

---

## 3. Database Architecture & Firestore Data Models

Data is structured in normalized collections within Firebase Cloud Firestore (`edparth-web`):

### 3.1 `students` Collection
Stores registered student identities, exam preferences, and cumulative gamification stats:
```typescript
interface User {
  id: string;               // Firebase Auth UID or 'std_<timestamp>'
  name: string;             // Student full name
  email: string;            // Registered email address
  role: 'student' | 'admin';
  passwordHash?: string;    // SHA-256 client hash for verification fallback
  classGrade?: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Dropper/Target';
  targetExam?: 'JEE Main/Adv' | 'NEET UG' | 'Govt Exam' | 'CBSE Class 12' | ...;
  school?: string;          // School, College or Coaching Institute
  phone?: string;           // Optional student mobile number
  avatar?: string;          // Auto-generated SVG dicebear avatar URL
  joinedAt: string;         // ISO date 'YYYY-MM-DD'
  stats: {
    testsGiven: number;     // Total CBT tests attempted
    studyHours: number;     // Tracked focus study hours
    streakDays: number;     // Consecutive days active
    avgScore: number;       // Average percentage score
    xp: number;             // Experience points accumulated
  };
}
```

### 3.2 `cbt_exams` Collection
Stores National Testing Agency (NTA) formatted computer-based exams:
```typescript
interface CBTExam {
  id: string;               // Unique test ID e.g., 'exam_jee_01'
  title: string;            // Exam title
  category: ExamCategory;   // 'JEE' | 'NEET' | 'Class 12' | ...
  durationMinutes: number;  // Test duration (e.g., 60, 180 mins)
  totalMarks: number;       // e.g., 300 marks
  passingMarks: number;     // Qualifying cutoff marks
  instructions: string[];   // Standard NTA examination rules
  createdBy: string;        // Admin user identifier
  createdAt: string;        // Creation date
  attemptsCount: number;    // Real student attempts tally
  questions: CBTQuestion[]; // Array of structured questions
}
```

### 3.3 `test_results` Collection
Stores audit-proof submission scorecards when students finish a CBT test:
```typescript
interface StudentTestResult {
  id: string;               // 'res_<timestamp>'
  examId: string;           // Ref to CBTExam.id
  examTitle: string;
  studentId: string;        // Ref to User.id
  studentName: string;
  score: number;            // Total marks obtained (taking +4/-1 into account)
  totalMarks: number;
  accuracy: number;         // Percentage accuracy (0-100%)
  timeSpentSeconds: number; // Duration elapsed in the test engine
  timestamp: string;        // ISO 8601 timestamp
  answers: Record<number, string>; // Question ID -> Selected Option ('A', 'B', 'C', 'D')
}
```

### 3.4 `materials` Collection
Stores reference books, handwritten notes, formula compendiums, and DPP sheets:
```typescript
interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'notes' | 'dpp' | 'pyq' | 'formula';
  category: ExamCategory;
  subject: string;          // 'Physics', 'Chemistry', 'Mathematics', 'Biology'
  fileUrl: string;          // Direct Telegram / Google Drive / Cloud URL
  fileSize: string;         // e.g., '14.2 MB'
  thumbnail?: string;       // Image preview link
  uploadedBy: string;
  uploadedAt: string;
  downloadsCount: number;
  pagesCount?: number;
  tags: string[];
}
```

### 3.5 `lectures` Collection
Stores curated YouTube one-shot revision playlists and masterclasses:
```typescript
interface LectureItem {
  id: string;
  title: string;
  channelName: string;
  youtubeUrl: string;
  embedId: string;          // YouTube 11-character video ID
  category: ExamCategory;
  subject: string;
  duration?: string;
  addedAt: string;
}
```

### 3.6 `chat_messages` Collection
Community peer study chat messages synchronized in real-time:
```typescript
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'admin';
  senderClass?: string;
  message: string;
  timestamp: string;
  isRequest?: boolean;      // Flags book/material requests for admin review
}
```

---

## 4. Authentication & Security Implementation

### 4.1 Strict Dual-Mode Authentication (No Auto-Registration Leaks)
- **Login Mode:** Evaluates credentials via Firebase Authentication (`signInWithEmailAndPassword`) and checks verified registered records in Firestore.
  - If an unregistered email is entered: Rejects with error `⚠️ No student account found with this email! Please click 'Register' to create your account first.`
  - If password is wrong: Rejects with error `⚠️ Incorrect password! Please verify and try again.`
- **Register Mode:** Creates user in Firebase Authentication (`createUserWithEmailAndPassword`), enforces minimum 6-character passwords, hashes credentials with SHA-256 for offline resilience, and initializes student profile in Firestore.

### 4.2 Protected Master Admin Gateway
- The Admin Portal tab is **hidden by default** from general students and visitors.
- Accessible only when:
  1. URL contains secret parameters: `?admin=true`, `?portal=admin`, or route `/admin`.
  2. Or by tapping the hidden `//` trigger in the footer.
- **Passcode Verification:** Evaluated via Web Cryptography API (`crypto.subtle.digest('SHA-256')`). No plaintext passwords exist in client bundles.
- Optional environment variable override: `VITE_ADMIN_PASSCODE`.

---

## 5. Core Features & Module Breakdown

### 5.1 Interactive AI Mascot ("PARTH")
- **Eye-Tracking Engine:** Mathematically calculates cursor angle relative to mascot position (`Math.atan2(dy, dx)`) and smoothly animates pupils inside SVG eye sockets.
- **Privacy Mode:** When any password input gains focus (`onFocus`), Parth raises his hands to cover his eyes with a discreet lock badge.
- **Emotional States:** Dynamically changes expression between `idle`, `happy`, `thinking`, and `surprised`.

### 5.2 NTA-Standard CBT Mock Exam Engine
- Replicates the exact layout used in official JEE Main and NEET UG examinations.
- **Section Selector:** Switch between Physics, Chemistry, and Mathematics/Biology at will.
- **Interactive Question Palette:** Standard 5-color NTA status indicators (Answered, Not Answered, Not Visited, Marked for Review, Answered & Marked for Review).
- **Exam Integrity:** Full-screen lock prompt, auto-submission when timer hits zero, under-5-minute warning banner, and instant post-exam analytics.

### 5.3 Automated PDF-to-CBT Converter
- Built into Admin Dashboard.
- Converts raw question text or PDF files into fully interactive CBT mock tests.
- Automatic regex parser recognizes questions, options (A, B, C, D), answer keys, and solutions.
- Visual question editor allows inline edits, diagram image attachments, and custom mark weighting before publishing.

### 5.4 Study Material Vault & 100% Free Storage
- **Primary Mode (Telegram & Google Drive):** Admin pastes public links from the official Telegram channel (`https://t.me/edparthbooks`) or Google Drive. Ensures zero server storage costs and unlimited file capacity.
- **Secondary Mode (Cloud Storage):** Direct drag-and-drop file upload to Firebase Storage bucket with live progress percentage indicator.
- Search and filter by Subject, Exam Category, and Material Type (Books, Notes, DPPs, PYQs, Formula Sheets).

### 5.5 YouTube Video Lecture Masterclass Hub
- Embedded distraction-free video player for chapter revisions and one-shot marathons.
- Filter lectures by target exam and subject.
- Companion DPPs linked directly beneath each lecture.

### 5.6 24/7 AI Doubt Solving Engine
- High-yield doubt solver supporting instant step-by-step solutions for JEE, NEET, and CBSE numerical problems.
- Supports copy-paste, formula breakdowns, and topic categorization.

### 5.7 Student Community & Live Chat
- Real-time peer study room powered by Firestore listeners.
- Includes special "Request Book / Material" button that flags requests directly to the Admin Desk.

### 5.8 Gamification, Leaderboards & Daily Streaks
- **Daily Streak Counter:** Tracks active learning days with animated flame indicator.
- **XP Reward System:** Awards +100 XP upon sign-up and dynamic XP based on CBT test score performance.
- **Dynamic Leaderboard:** Ranks top active students based on authentic real-time test scores.

### 5.9 Master Admin Dashboard & Real-Time Analytics
- **Live Student Directory:** Search, view, and filter real students by class grade or target exam.
- **Content Publisher:** Instant publishing of books, tests, notes, and video playlists.
- **Real-Time Analytics Tab:** Visual bar charts, score distributions, and platform engagement tracking.

### 5.10 Content Protection & DRM Security Guard
- **Watermarking Engine:** Renders dynamic student email & session watermark across study materials to deter unauthorized distribution.
- **Anti-Copy Protections:** Disables context menu, unauthorized keyboard shortcuts (Ctrl+C, Ctrl+U, F12), and highlights security status via the DRM modal.

### 5.11 Mobile Responsive Navigation (Native App Feel)
- On screens `< 1024px`, the wide desktop sidebar is hidden automatically.
- Replaced by a sleek, native app bottom navigation bar (`Study`, `Mock CBT`, `AI Doubts`, `Lectures`, `Vault`, and `Admin`).
- Mobile-optimized header with collapsible search modal and scaled touch targets.

---

## 6. Firebase Configuration & Security Rules

### 6.1 Firestore Security Rules
Paste these rules in **Firebase Console -> Firestore Database -> Rules -> Publish**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public read access for curriculum materials, lectures & exams
    match /materials/{document=**} {
      allow read, write: if true;
    }
    match /cbt_exams/{document=**} {
      allow read, write: if true;
    }
    match /lectures/{document=**} {
      allow read, write: if true;
    }
    
    // Students can access and sync profiles & test scorecards
    match /students/{studentId} {
      allow read, write: if true;
    }
    match /test_results/{resultId} {
      allow read, write: if true;
    }
    
    // Community chat messages
    match /chat_messages/{messageId} {
      allow read, write: if true;
    }
  }
}
```

### 6.2 Firebase Authentication Setup
1. In Firebase Console, navigate to **Build -> Authentication**.
2. Click **Get Started**.
3. Under **Sign-in method**, enable the **Email/Password** provider and click **Save**.

### 6.3 Firebase Cloud Storage Rules (Optional)
If utilizing direct file uploads to Firebase Storage:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 7. Environment Variables & Configuration

Create a `.env` file in the project root (see [.env.example](file:///d:/Edparth%20study/.env.example)):

```env
# Google Firebase Web Client Credentials
VITE_FIREBASE_API_KEY=AIzaSyDl6rzcJ-XWE2qz7wacT2RBMZiJD5UTZjI
VITE_FIREBASE_AUTH_DOMAIN=edparth-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=edparth-web
VITE_FIREBASE_STORAGE_BUCKET=edparth-web.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1062899928549
VITE_FIREBASE_APP_ID=1:1062899928549:web:194a471ae93c7a089c730c
VITE_FIREBASE_MEASUREMENT_ID=G-V7BWEXCZ7G

# Optional Custom Admin Passcode Override
# VITE_ADMIN_PASSCODE=YourCustomPassword123
```

---

## 8. Local Development & Production Build

### Prerequisites:
- **Node.js**: v18.x, v20.x, or v22.x
- **npm** or **pnpm**

### Commands:
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (starts on http://localhost:5173)
npm run dev

# 3. Type-check and build production bundle (output to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 9. Deployment Guide (Vercel / Netlify)

The project is fully prepared for zero-configuration continuous deployment.

### Deploying via Vercel:
1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: production release"
   git push origin main
   ```
2. Log into **[vercel.com](https://vercel.com)**.
3. Click **"Add New Project"** -> **"Import"** repository `raj-parth/edparth`.
4. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Vercel will build and assign a global HTTPS production domain.
6. Any future `git push origin main` will auto-deploy updates in ~30 seconds.

---

## 10. Maintenance & Administrator Operations Manual

### 10.1 How to Access Admin Panel
- Add `?admin=true` to your website URL (e.g. `https://your-domain.vercel.app/?admin=true`), or click the hidden `//` symbol in the footer.
- Enter your admin credentials to log into the Admin Control Hub.

### 10.2 How to Add a New CBT Mock Test
1. Inside Admin Dashboard, click **"CBT Generator"** or **"Active Exams"**.
2. Paste test paper text into the parser or click **"+ Create New Exam"**.
3. Set Section Marks, Question Text, Diagram Image URL, Options, and Correct Answer.
4. Click **Publish Exam**. The test will instantly be available to all students nationwide.

### 10.3 How to Add Free Books & Notes
1. Upload your PDF file to your **Telegram Channel** (`t.me/edparthbooks`) or Google Drive.
2. Go to Admin Dashboard -> **"Publish Study Notes / Books"**.
3. Enter Title, Subject, and paste the Telegram/Drive link (or click *"📢 Insert Official Telegram Link"*).
4. Click **+ Publish Study Material**.

### 10.4 How to Perform a Fresh Cloud Reset
If you ever want to wipe all student test records and start fresh:
1. Open **Firebase Console** -> **Firestore Database** -> **Data**.
2. Click the three dots `⋮` next to `students` -> **Delete collection**.
3. Click the three dots `⋮` next to `test_results` -> **Delete collection**.
4. In **Authentication** -> **Users**, delete any test accounts.
New students will automatically regenerate clean collections when they register.

---

*Documentation compiled and verified for EdParth Study Platform.*  
*Maintained by Lead Developer **RAJ KANNAUJIYA** & **TEAM PARTH**.*
