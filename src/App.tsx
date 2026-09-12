import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { IntroScreen } from './components/IntroScreen';
import { Sidebar, type NavViewType } from './components/Sidebar';
import { MobileNavigation } from './components/navigation/MobileNavigation';
import { TopHeader } from './components/TopHeader';
import { StudentHomeView } from './components/student/StudentHomeView';
import { CBTList } from './components/cbt/CBTList';
import { CBTExamEngine } from './components/cbt/CBTExamEngine';
import { LecturesView } from './components/lectures/LecturesView';
import { MaterialLibrary } from './components/library/MaterialLibrary';
import { CommunityChat } from './components/community/CommunityChat';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AIDoubtEngine } from './components/doubts/AIDoubtEngine';
import { SecurityGuard } from './components/security/SecurityGuard';
import { AuthPage } from './components/auth/AuthPage';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { AnalyticsTab } from './components/admin/AnalyticsTab';
import { recordPageView } from './utils/analytics';

export type ActiveViewType = 'home' | 'cbt-list' | 'lectures' | 'library' | 'chat' | 'doubts' | 'dashboard' | 'admin' | 'analytics';

const MainApp: React.FC = () => {
  const { 
    activeExam, 
    setActiveExam, 
    currentUser, 
    hasSeenIntro, 
    setHasSeenIntro, 
    openAuthModal,
    requireAuth 
  } = useApp();

  const [activeView, setActiveView] = useState<ActiveViewType>('home');
  const [isAuthenticatedSession, setIsAuthenticatedSession] = useState<boolean>(() => {
    return sessionStorage.getItem('edparth_authenticated_session') === 'true';
  });

  // Track real section pageview
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      'home': 'Study Suite Home',
      'cbt-list': 'CBT Mock Tests',
      'lectures': 'JEE YouTube Lectures',
      'library': 'Study Material Vault',
      'chat': 'Student Community & Chat',
      'doubts': '24/7 AI Doubt Engine',
      'dashboard': 'Student Rank & Stats',
      'admin': 'Admin Console',
      'analytics': 'Admin Analytics'
    };
    recordPageView(pageTitles[activeView] || activeView);
  }, [activeView]);

  // 1. First time or initial visit: Show Intro Anime Portal Screen
  if (!hasSeenIntro) {
    return (
      <IntroScreen
        onEnter={() => {
          setHasSeenIntro(true);
        }}
      />
    );
  }

  // 2. Strict Auth Gate: Always show full-screen AuthPage (Login/Signup) after Intro
  if (!currentUser || !isAuthenticatedSession) {
    return (
      <AuthPage 
        onAuthSuccess={() => {
          sessionStorage.setItem('edparth_authenticated_session', 'true');
          setIsAuthenticatedSession(true);
        }}
      />
    );
  }

  // 3. Active CBT Exam: Show Full-screen NTA CBT Engine
  if (activeExam) {
    return (
      <CBTExamEngine
        exam={activeExam}
        onExit={() => {
          setActiveExam(null);
          setActiveView('cbt-list');
        }}
      />
    );
  }

  // 4. Authenticated Student Portal with Physics Wallah Class & Target Customization
  return (
    <div className="flex min-h-screen bg-[#f4f6fb] text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Right Main View */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <TopHeader
          onChatClick={() => setActiveView('chat')}
          onNavigate={(view) => requireAuth(() => setActiveView(view))}
        />

        {/* View Router */}
        <main className="flex-1 pb-20 lg:pb-0">
          {activeView === 'home' && (
            <StudentHomeView
              onStartExam={(exam) => requireAuth(() => setActiveExam(exam))}
              onExploreVault={() => requireAuth(() => setActiveView('library'))}
              onExploreCbtList={() => requireAuth(() => setActiveView('cbt-list'))}
              onExploreLectures={() => requireAuth(() => setActiveView('lectures'))}
              onOpenChat={() => setActiveView('chat')}
              onOpenDoubts={() => requireAuth(() => setActiveView('doubts'))}
            />
          )}

          {activeView === 'doubts' && (
            <AIDoubtEngine />
          )}

          {activeView === 'cbt-list' && (
            <CBTList
              onStartExam={(exam) => requireAuth(() => setActiveExam(exam))}
              onOpenConverter={() => setActiveView('admin')}
            />
          )}

          {activeView === 'lectures' && (
            <LecturesView />
          )}

          {activeView === 'library' && (
            <MaterialLibrary
              onRequestMaterialClick={() => setActiveView('chat')}
            />
          )}

          {activeView === 'chat' && (
            <CommunityChat />
          )}

          {activeView === 'dashboard' && (
            <StudentDashboard
              onStartCbtClick={() => requireAuth(() => setActiveView('cbt-list'))}
              onRequestMaterialClick={() => setActiveView('chat')}
            />
          )}

          {activeView === 'admin' && currentUser?.role === 'admin' && (
            <AdminDashboard />
          )}

          {activeView === 'analytics' && currentUser?.role === 'admin' && (
            <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
              <AnalyticsTab />
            </div>
          )}
        </main>

        {/* Bottom Footer */}
        <Footer />
      </div>

      {/* Dedicated Mobile Bottom Navigation (Phone / Tablet) */}
      <MobileNavigation
        activeView={activeView}
        setActiveView={(view) => requireAuth(() => setActiveView(view))}
      />

      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <SecurityGuard>
        <MainApp />
      </SecurityGuard>
    </AppProvider>
  );
}

export default App;
