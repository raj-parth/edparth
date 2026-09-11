import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Download, Eye, PlusCircle, FileText, Layers, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ContentItem } from '../../types';

interface MaterialLibraryProps {
  onRequestMaterialClick: () => void;
}

export const MaterialLibrary: React.FC<MaterialLibraryProps> = ({ onRequestMaterialClick }) => {
  const { contentList, currentUser, openAuthModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);

  const categories = [
    { id: 'All', label: 'All Resources', icon: Layers },
    { id: 'Class 9', label: 'Class 9 Foundation', icon: BookOpen },
    { id: 'Class 10', label: 'Class 10 Board Prep', icon: BookOpen },
    { id: 'Class 11', label: 'Class 11 Science/PCM', icon: BookOpen },
    { id: 'Class 12', label: 'Class 12 Board & PCM', icon: BookOpen },
    { id: 'JEE', label: 'JEE Main & Advanced', icon: Sparkles },
    { id: 'NEET', label: 'NEET UG Medical', icon: CheckCircle2 },
    { id: 'Govt Exam', label: 'Govt Exams (SSC/NDA/CUET)', icon: Bookmark }
  ];

  const types = ['All', 'book', 'notes', 'dpp', 'pyq', 'formula'];

  const filteredItems = contentList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = (e: React.MouseEvent, item: ContentItem) => {
    if (!currentUser) {
      e.preventDefault();
      openAuthModal('login');
    }
  };

  const handlePreview = (item: ContentItem) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setPreviewItem(item);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wider mb-2 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Study Library & Notes Vault</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Study Material Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-medium">
            Curated reference books, chapter formula sheets, and handwritten topper notes organized sidewise by class & exam.
          </p>
        </div>

        <button
          onClick={onRequestMaterialClick}
          className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Request Custom Notes</span>
        </button>
      </div>

      {/* Sidewise Organized Main Vault Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidewise Categories Menu */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4 sticky top-24">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
              Categories
            </span>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {contentList.length} Items
            </span>
          </div>

          <nav className="space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = cat.id === 'All' 
                ? contentList.length 
                : contentList.filter(c => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md font-extrabold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${selectedCategory === cat.id ? 'text-white' : 'text-slate-400'}`} />
                    <span>{cat.label}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Area: Filter bar & Material Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Search & Format Filter */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, chapters, books..."
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
              />
            </div>

            {/* Type format badges */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {t === 'All' ? 'All Formats' : t}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Filtered Material Cards */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={item.thumbnail || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/95 text-slate-900 shadow-sm font-mono">
                        {item.category}
                      </span>
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white shadow-sm uppercase font-mono">
                        {item.type}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100 font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px] font-bold">{item.fileSize}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePreview(item)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        title="Quick Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => handleDownload(e, item)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 text-slate-400 max-w-md mx-auto space-y-3 shadow-sm">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-700">No Materials in this Category</h4>
              <p className="text-xs text-slate-400">
                Admin can upload new notes, or you can submit a study material request!
              </p>
              <button
                onClick={onRequestMaterialClick}
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                Request Study Material
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-lg w-full space-y-4 shadow-2xl relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-mono">
                    {previewItem.type} • {previewItem.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-2">{previewItem.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{previewItem.subject} • Uploaded by {previewItem.uploadedBy}</p>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-56 overflow-y-auto">
                <p className="font-bold text-slate-900 mb-1">Description:</p>
                <p>{previewItem.description}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={previewItem.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleDownload(e, previewItem)}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

