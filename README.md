# 🎓 EdParth Study — Next-Gen Education Platform & NTA CBT Engine

> Specially built for **Class 9 to 12 CBSE/ICSE**, **JEE Main & Advanced**, **NEET UG**, and **Competitive Government Examinations (SSC, NDA, CUET)**.
> Powered by **React 19**, **Firebase Cloud Firestore**, **Firebase Authentication**, **Google Analytics 4**, and **Tailwind CSS v4**.

📖 **[Read the Full Technical & Architectural Documentation (PROJECT_DOCUMENTATION.md)](./PROJECT_DOCUMENTATION.md)**

---

## 🌟 Key Highlights & Features

### 1. 🤖 Interactive Mascot **"PARTH"**
- Reactive AI Study Guide that tracks cursor movement across the screen.
- **Smart Password Privacy Mode**: Automatically covers his eyes when password input is focused!
- Reacts with real-time emotions (Happy, Thinking, Surprised, Confetti Celebration on login/test submission).

### 2. ⚡ Hyperrealistic NTA-Standard Computer Based Test (CBT) Engine
- Exact JEE/NEET NTA test screen layout with Section tabs (Physics, Chemistry, Maths/Biology).
- Interactive Question Palette with complete NTA color-coded legend:
  - 🟢 **Answered**
  - 🔴 **Not Answered**
  - ⚪ **Not Visited**
  - 🟣 **Marked for Review**
  - 🟣🟢 **Answered & Marked for Review**
- Live countdown timer with under-5-min alert, text zoom controls, clear response, and instant scorecard with rank predictor and step-by-step solution explanations.

### 3. 📄 Automated PDF & Question Paper to CBT Converter
- Upload any test paper PDF, document, or paste question bank text.
- Smart parser detects questions, options `(A, B, C, D)`, diagrams, and answer keys.
- Visual Question Editor to adjust questions, attach PNG diagrams/figures, edit markings (+4/-1), and publish live tests in one click.

### 4. 🔒 Enterprise Firebase Authentication & Cloud Firestore
- **Real Production Auth**: Secure email/password login & registration powered by Firebase Auth with SHA-256 fallback protection. Minimum 6-character password security.
- **Cloud Firestore Database**: Real-time cross-device synchronization for tests, submissions, study materials, student directory, and community chat.
- **₹0 Unlimited Storage Architecture**: Leverages high-capacity Telegram Channel integration (`t.me/edparthbooks`) and Google Drive links to keep storage 100% free with zero credit card required.

### 5. 🛡️ Master Admin Control Hub
- **Access Route**: Accessible securely via `/admin`, `?admin=true`, or `?portal=admin` with real-time admin authorization.
- **Realtime Student Directory**: Monitor live registered student profiles (Target Exam, Class, Streak, Tests given, Accuracy).
- **Test Management & Live Publishing**: Create, schedule, activate, or archive CBT tests in real-time.
- **Content & Notes Manager**: Upload reference books, chapter revision notes, DPP worksheets, and formula cheat sheets.
- **Student Request Desk**: Review and fulfill custom study material requests submitted by students.

### 6. 📱 App-Like Mobile Navigation & DRM Anti-Theft Guard
- **Mobile Bottom Navigation Bar**: Floating glassmorphic dock for intuitive thumb navigation on all mobile viewports.
- **DRM Anti-Piracy Protection**: Protects premium mock tests, question banks, and notes with right-click prevention, text-selection locks, developer shortcuts disabled, and watermark defense.

### 7. 🚀 Gen-Z Study Widgets & Community
- **Pomodoro Deep Study Clock**: Focus & Break modes with flip clock.
- **Formula Flashcards**: 3D flip cards for high-yield exam tips and key formulas.
- **Daily Streak & XP Tracker**: Motivates students with daily streak fire and level badges.
- **Live Community Chat**: Real-time doubt-solving and peer discussion channel.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4, Glassmorphism, CSS Canvas Physics |
| **Database** | Google Cloud Firestore (Real-time NoSQL) |
| **Authentication** | Firebase Auth (Email/Password + SHA-256) |
| **Analytics** | Google Analytics 4 (Measurement ID: `G-V7BWEXCZ7G`) |
| **Storage Architecture** | Telegram Channel (`t.me/edparthbooks`) + Google Drive + Firebase Storage |
| **Icons & Effects** | Lucide React, Canvas Confetti, Framer Motion |
| **Deployment** | Vercel / Netlify / Cloudflare Pages |

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 👨‍💻 Project Team & Attribution

- **Lead Architect & Developer**: **RAJ KANNAUJIYA**
- **Core Team**: **TEAM PARTH**
- **Brand & Platform**: **EdParth Study** (edparth.com)

---

## 📚 Complete Project Documentation

For complete database schema specifications, collection fields, security rules, environment configurations, and admin user guides, see:
👉 **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)**

