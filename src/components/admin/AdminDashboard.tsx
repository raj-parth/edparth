import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Upload, Search, Filter, Trash2, Sparkles, Shield, MoreVertical, Zap, MessageSquare, Tv, Share2, Plus, ExternalLink, Play, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PdfToCbtConverter } from '../cbt/PdfToCbtConverter';
import { AnalyticsTab } from './AnalyticsTab';
import type { ContentItem, LectureItem, SocialChannel, ExamCategory } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    contentList,
    exams,
    lectures,
    socialChannels,
    chatMessages,
    addContentItem,
    deleteContentItem,
    deleteCBTExam,
    addLecture,
    deleteLecture,
    addSocialChannel,
    deleteSocialChannel,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'students' | 'analytics' | 'upload' | 'lectures' | 'social-channels' | 'cbt-generator' | 'requests' | 'exams'>('students');

  // Student search & filter state
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All');

  // New Content Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<ContentItem['type']>('book');
  const [newCategory, setNewCategory] = useState<ContentItem['category']>('JEE');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileSize, setNewFileSize] = useState('14.2 MB');
  const [newPages, setNewPages] = useState(250);
  const [newThumbnail, setNewThumbnail] = useState('');
  const [newTags, setNewTags] = useState('Mechanics, High Yield, PYQs');

  // New Lecture Form State
  const [lecTitle, setLecTitle] = useState('');
  const [lecChannel, setLecChannel] = useState('edparth Official');
  const [lecUrl, setLecUrl] = useState('');
  const [lecCategory, setLecCategory] = useState<LectureItem['category']>('JEE');
  const [lecSubject, setLecSubject] = useState('Physics');

  // New Social Channel Hub State
  const [chanPlatform, setChanPlatform] = useState<'youtube' | 'telegram' | 'instagram'>('youtube');
  const [chanTitle, setChanTitle] = useState('');
  const [chanHandle, setChanHandle] = useState('');
  const [chanSubject, setChanSubject] = useState('');
  const [chanCategory, setChanCategory] = useState<ExamCategory>('JEE');
  const [chanDescription, setChanDescription] = useState('');
  const [chanBannerUrl, setChanBannerUrl] = useState('');
  const [chanLinkUrl, setChanLinkUrl] = useState('');
  const [chanBadge, setChanBadge] = useState('Official Partner');
  const [chanStats, setChanStats] = useState('Study Community');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  const filteredStudents = students.filter(std => {
    const matchesSearch = std.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          std.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          (std.school && std.school.toLowerCase().includes(studentSearch.toLowerCase()));
    const matchesClass = selectedClassFilter === 'All' || std.classGrade === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const studentRequests = chatMessages.filter(m => m.isRequest);

  const handleUploadContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addContentItem({
      title: newTitle,
      description: newDesc || 'Verified high-quality study material for Class 9-12 and competitive entrance exams.',
      type: newType,
      category: newCategory,
      subject: newSubject,
      fileUrl: newFileUrl || 'https://example.com/study-material.pdf',
      fileSize: newFileSize || '8.4 MB',
      thumbnail: newThumbnail || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
      uploadedBy: currentUser ? currentUser.name : 'Raj (Admin)',
      pagesCount: Number(newPages),
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setNewTitle('');
    setNewDesc('');
    setNewFileUrl('');
    showNotification('Study material published successfully to repository.');
  };

  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lecTitle || !lecUrl) return;

    let embedId = 'dQw4w9WgXcQ';
    const match = lecUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      embedId = match[1];
    }

    addLecture({
      title: lecTitle,
      channelName: lecChannel,
      youtubeUrl: lecUrl,
      embedId,
      category: lecCategory,
      subject: lecSubject,
      duration: '45 mins',
      thumbnail: `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`,
      description: 'Comprehensive chapter video lesson for concept clarity.'
    });

    setLecTitle('');
    setLecUrl('');
    showNotification('Video lecture indexed successfully in library.');
  };

  const handleAddSocialChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chanTitle.trim() || !chanLinkUrl.trim()) return;

    addSocialChannel({
      platform: chanPlatform,
      title: chanTitle,
      handleOrName: chanHandle || (chanPlatform === 'youtube' ? '@edparth_official' : chanPlatform === 'telegram' ? 't.me/edparth_vault' : '@rajvqx'),
      subject: chanSubject || 'All Subjects',
      category: chanCategory,
      description: chanDescription || 'Official curated resource stream for aspirants.',
      bannerUrl: chanBannerUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      linkUrl: chanLinkUrl,
      badge: chanBadge || 'Official Hub',
      stats: chanStats || 'Study Hub',
      videos: chanPlatform === 'youtube' ? [
        {
          id: `v_${Date.now()}_1`,
          title: `${chanTitle} - Concept Sprint #1`,
          embedId: 'dQw4w9WgXcQ',
          duration: '45 mins'
        }
      ] : undefined
    });

    setChanTitle('');
    setChanHandle('');
    setChanSubject('');
    setChanDescription('');
    setChanLinkUrl('');
    setChanBannerUrl('');
    showNotification('Media Channel & Hub published successfully.');
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 p-7 sm:p-9 text-white shadow-lg shadow-orange-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
            <Shield className="w-3.5 h-3.5" />
            <span>Master Administration Center</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Hello, {currentUser?.name || 'RAJ Sir'}!
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-xl">
            Logged in via <strong className="text-white underline">{currentUser?.email}</strong>. Manage students, upload materials, YouTube channels, Telegram vaults, and CBT test papers.
          </p>
        </div>

        {/* Quick Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 z-10 w-full md:w-auto">
          <div className="bg-white/95 text-slate-800 rounded-2xl p-3 text-center min-w-[100px] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Students</span>
            <div className="text-lg font-black text-slate-900">{students.length}</div>
          </div>
          <div className="bg-white/95 text-slate-800 rounded-2xl p-3 text-center min-w-[100px] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Books / Notes</span>
            <div className="text-lg font-black text-slate-900">{contentList.length}</div>
          </div>
          <div className="bg-white/95 text-slate-800 rounded-2xl p-3 text-center min-w-[100px] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Channels Hub</span>
            <div className="text-lg font-black text-slate-900">{socialChannels.length}</div>
          </div>
          <div className="bg-white/95 text-slate-800 rounded-2xl p-3 text-center min-w-[100px] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Requests</span>
            <div className="text-lg font-black text-orange-600">{studentRequests.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {[
          { id: 'students', label: `Student Directory (${students.length})`, icon: Users },
          { id: 'analytics', label: 'Visitor & City Analytics', icon: BarChart3 },
          { id: 'upload', label: 'Upload Books & Notes', icon: Upload },
          { id: 'social-channels', label: `Channels & Media Hubs (${socialChannels.length})`, icon: Share2 },
          { id: 'lectures', label: `Video Lectures (${lectures.length})`, icon: Tv },
          { id: 'cbt-generator', label: 'PDF to CBT Converter', icon: Sparkles },
          { id: 'requests', label: `Chat Requests (${studentRequests.length})`, icon: MessageSquare },
          { id: 'exams', label: `Manage Tests (${exams.length})`, icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: Visitor & City Analytics */}
      {activeTab === 'analytics' && <AnalyticsTab />}

      {/* TAB 1: Student Directory */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search by student name, school, email..."
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
              >
                <option value="All">All Classes (9-12 & Dropper)</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper/Target">Dropper / Target</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Target Exam</th>
                  <th className="py-3 px-4">School / Institute</th>
                  <th className="py-3 px-4">Tests Given</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-xs font-bold text-slate-700">No registered students found</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">When students sign up on EdParth, their profiles will appear here in real time.</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={std.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${std.name}`}
                            alt={std.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 bg-slate-100"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{std.name}</p>
                            <p className="text-[10px] text-slate-400">{std.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                          {std.classGrade || 'Class 12'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{std.targetExam || 'JEE Main/Adv'}</td>
                      <td className="py-3.5 px-4 text-slate-500">{std.school || 'Academic Institute'}</td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">{std.stats.testsGiven}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-emerald-600">{std.stats.avgScore}%</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-orange-500">🔥 {std.stats.streakDays}d</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Upload Books & Notes */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              <span>Publish Study Notes / Books</span>
            </h3>

            <form onSubmit={handleUploadContent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. HC Verma Physics Vol 1 Complete Notes"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="book">Book</option>
                    <option value="notes">Notes</option>
                    <option value="dpp">DPP Worksheet</option>
                    <option value="pyq">PYQ</option>
                    <option value="formula">Formula Sheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="Govt Exam">Govt Exam</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Physics / Chemistry"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">File Size</label>
                  <input
                    type="text"
                    value={newFileSize}
                    onChange={(e) => setNewFileSize(e.target.value)}
                    placeholder="12.5 MB"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PDF File Download Link</label>
                <input
                  type="text"
                  value={newFileUrl}
                  onChange={(e) => setNewFileUrl(e.target.value)}
                  placeholder="https://.../document.pdf"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief syllabus outline..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                + Publish Study Material
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              Current Published Library ({contentList.length})
            </h3>

            {contentList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400">
                No custom books uploaded yet. Use the form on the left!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contentList.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {item.type} • {item.category}
                        </span>
                        <button
                          onClick={() => deleteContentItem(item.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                      <span>{item.subject}</span>
                      <span>{item.fileSize}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: Manage Social Channels & Media Hubs */}
      {activeTab === 'social-channels' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-600" />
              <span>Add Media Hub / Channel</span>
            </h3>

            <form onSubmit={handleAddSocialChannel} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Platform *</label>
                <select
                  value={chanPlatform}
                  onChange={(e) => setChanPlatform(e.target.value as any)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-bold"
                >
                  <option value="youtube">YouTube Official Channel</option>
                  <option value="telegram">Telegram Notes Hub</option>
                  <option value="instagram">Instagram Concepts & Shorts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Channel / Hub Title *</label>
                <input
                  type="text"
                  required
                  value={chanTitle}
                  onChange={(e) => setChanTitle(e.target.value)}
                  placeholder="e.g. EdParth Physics Masterclass"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Handle / Name</label>
                  <input
                    type="text"
                    value={chanHandle}
                    onChange={(e) => setChanHandle(e.target.value)}
                    placeholder="@edparth_physics"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={chanCategory}
                    onChange={(e) => setChanCategory(e.target.value as ExamCategory)}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="Govt Exam">Govt Exam</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Focus</label>
                <input
                  type="text"
                  value={chanSubject}
                  onChange={(e) => setChanSubject(e.target.value)}
                  placeholder="e.g. Physics / Mathematics / Biology"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Channel / Vault Link URL *</label>
                <input
                  type="url"
                  required
                  value={chanLinkUrl}
                  onChange={(e) => setChanLinkUrl(e.target.value)}
                  placeholder="https://youtube.com/... or https://t.me/..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={chanBannerUrl}
                  onChange={(e) => setChanBannerUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={chanDescription}
                  onChange={(e) => setChanDescription(e.target.value)}
                  placeholder="Detailed focus of this channel..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Channel / Media Hub</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              Active Official Channels & Hubs ({socialChannels.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialChannels.map((chan) => (
                <div key={chan.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group">
                  <div className="relative h-28 w-full bg-slate-900">
                    <img
                      src={chan.bannerUrl}
                      alt={chan.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase font-mono text-white ${
                        chan.platform === 'youtube' ? 'bg-rose-600' : chan.platform === 'telegram' ? 'bg-sky-500' : 'bg-pink-600'
                      }`}>
                        {chan.platform}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm">
                        {chan.category}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteSocialChannel(chan.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                      title="Delete Channel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-3 right-3 text-white">
                      <p className="font-bold text-xs line-clamp-1">{chan.title}</p>
                      <p className="text-[10px] text-slate-300 font-mono">{chan.handleOrName}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <p className="text-xs text-slate-600 line-clamp-2">{chan.description}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{chan.subject}</span>
                      <a
                        href={chan.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Manage YouTube Lectures */}
      {activeTab === 'lectures' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Tv className="w-4 h-4 text-rose-600" />
              <span>Add YouTube Video Lecture</span>
            </h3>

            <form onSubmit={handleAddLecture} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={lecTitle}
                  onChange={(e) => setLecTitle(e.target.value)}
                  placeholder="e.g. JEE Physics Kinematics One-Shot"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">YouTube URL *</label>
                <input
                  type="url"
                  required
                  value={lecUrl}
                  onChange={(e) => setLecUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={lecCategory}
                    onChange={(e) => setLecCategory(e.target.value as any)}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="Govt Exam">Govt Exam</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={lecSubject}
                    onChange={(e) => setLecSubject(e.target.value)}
                    placeholder="Physics / Chemistry"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Channel Name</label>
                <input
                  type="text"
                  value={lecChannel}
                  onChange={(e) => setLecChannel(e.target.value)}
                  placeholder="edparth Official"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                + Add Video to Lectures
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              Published YouTube Lectures ({lectures.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lectures.map((lec) => (
                <div key={lec.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                        {lec.category} • {lec.subject}
                      </span>
                      <button onClick={() => deleteLecture(lec.id)} className="text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{lec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{lec.channelName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PDF to CBT Converter */}
      {activeTab === 'cbt-generator' && (
        <PdfToCbtConverter />
      )}

      {/* TAB 5: Chat Material Requests */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>Student Material Requests from Community Chat ({studentRequests.length})</span>
          </h3>

          <div className="space-y-3">
            {studentRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{req.senderName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">• {req.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-950">{req.message}</p>
                </div>
              </div>
            ))}

            {studentRequests.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">No pending material requests in chat.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: Manage Exams */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                    {exam.targetExam}
                  </span>
                  <button onClick={() => deleteCBTExam(exam.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{exam.title}</h4>
                <p className="text-xs text-slate-400">{exam.questions.length} Qs • {exam.durationMinutes} Mins • {exam.totalMarks} Marks</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Success Notification Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{successToast}</span>
        </div>
      )}
    </div>
  );
};
