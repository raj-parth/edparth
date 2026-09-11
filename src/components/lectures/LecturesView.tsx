import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Heart, 
  Star, 
  CheckCircle2, 
  X, 
  Play, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Flame, 
  Trophy, 
  Zap, 
  Clock, 
  Sparkles,
  Building2,
  ListVideo
} from 'lucide-react';

interface JEEChannelCard {
  id: string;
  channel: string;
  teacher: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Complete PCM';
  level: string;
  bestFor: string;
  rating: number;
  featuredTitle: string;
  youtubeUrl: string;       // Direct YouTube watch/search/playlist URL
  channelPlaylistsUrl: string; // Official channel playlists URL
  verified: boolean;
  tags: string[];
}

interface JEESection {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  cards: JEEChannelCard[];
}

const SECTIONS_DATA: JEESection[] = [
  // ==========================================
  // SECTION 1: CLASS 11 FOUNDATION
  // ==========================================
  {
    id: 'class-11',
    title: 'Class 11 — Foundation & Full Syllabi',
    badge: 'CLASS 11 (FOUNDATION & JEE)',
    description: 'Systematic chapterwise lectures, Mechanics, Physical Chemistry & 11th Algebra',
    icon: GraduationCap,
    accentColor: 'text-orange-500',
    cards: [
      {
        id: 'c11-1',
        channel: 'Competishun - Physics (ABJ Sir)',
        teacher: 'ABJ Sir (Amit Bijarnia)',
        subject: 'Physics',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 11 Mechanics, NLM, Friction, Work Power & Rotational Motion from Kota',
        rating: 5,
        featuredTitle: 'Class 11 Mechanics & NLM Complete Kota Classroom',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Mohit+Tyagi+ABJ+Sir+Physics+Newton+Laws+of+Motion',
        channelPlaylistsUrl: 'https://www.youtube.com/@MohitTyagi/playlists',
        verified: true,
        tags: ['NLM', 'Work Energy', 'Rotation', 'Kota Classroom']
      },
      {
        id: 'c11-2',
        channel: 'PW JEE Wallah (Arjuna JEE)',
        teacher: 'Rajwant Sir & Saleem Sir',
        subject: 'Physics',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 11 complete physics syllabus with live illustrations & DPP solving',
        rating: 5,
        featuredTitle: 'Arjuna JEE Class 11 Physics Full Lectures',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+Arjuna+JEE+Physics+Class+11',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Kinematics', 'Gravitation', 'Thermodynamics', 'Arjuna']
      },
      {
        id: 'c11-3',
        channel: 'Pankaj Sir Chemistry',
        teacher: 'Pankaj Sijairya',
        subject: 'Chemistry',
        level: 'Boards + JEE Main/Adv',
        bestFor: 'Class 11 General Organic Chemistry (GOC) & Hydrocarbons basics',
        rating: 5,
        featuredTitle: 'Class 11 Complete GOC & Hydrocarbons Masterclass',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Pankaj+Sir+Chemistry+GOC+Class+11+One+Shot',
        channelPlaylistsUrl: 'https://www.youtube.com/@PankajSirChemistry/playlists',
        verified: true,
        tags: ['GOC', 'Hydrocarbons', 'Reaction Mechanism', 'Class 11']
      },
      {
        id: 'c11-4',
        channel: 'DexterChem',
        teacher: 'Anoop Vashishtha',
        subject: 'Chemistry',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 11 Chemical Bonding & Periodic Classification 100% NCERT',
        rating: 5,
        featuredTitle: 'Chemical Bonding & Periodic Table NCERT Line-by-Line',
        youtubeUrl: 'https://www.youtube.com/results?search_query=DexterChem+NCERT+Chemical+Bonding+Class+11',
        channelPlaylistsUrl: 'https://www.youtube.com/@DexterChem/playlists',
        verified: true,
        tags: ['Chemical Bonding', 'Periodic Table', 'Thermodynamics']
      },
      {
        id: 'c11-5',
        channel: 'Mohit Tyagi (Maths)',
        teacher: 'Mohit Tyagi',
        subject: 'Mathematics',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 11 Conic Sections, Straight Lines, Circles, Permutations & Combinations',
        rating: 5,
        featuredTitle: 'Class 11 Coordinate Geometry & Conic Sections Complete',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Mohit+Tyagi+Straight+Lines+Circles+Conic+Sections',
        channelPlaylistsUrl: 'https://www.youtube.com/@MohitTyagi/playlists',
        verified: true,
        tags: ['Straight Lines', 'Circles', 'Conic Sections', 'P&C']
      },
      {
        id: 'c11-6',
        channel: 'Unacademy JEE (NV Sir)',
        teacher: 'Nishant Vora',
        subject: 'Mathematics',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 11 Quadratic Equations, Sequence & Series, Trigonometry BounceBack',
        rating: 5,
        featuredTitle: 'BounceBack Class 11 Mathematics One-Shots',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Unacademy+JEE+BounceBack+Sequence+Series+Nishant+Vora',
        channelPlaylistsUrl: 'https://www.youtube.com/@UnacademyJEE/playlists',
        verified: true,
        tags: ['Quadratic Equations', 'Sequence & Series', 'BounceBack']
      }
    ]
  },

  // ==========================================
  // SECTION 2: CLASS 12 BOARDS + JEE
  // ==========================================
  {
    id: 'class-12',
    title: 'Class 12 — Boards + JEE Main & Advanced',
    badge: 'CLASS 12 (BOARDS + JEE)',
    description: 'Electrodynamics, Optics, Complete Calculus, Solutions, Coordination Chemistry',
    icon: Flame,
    accentColor: 'text-amber-500',
    cards: [
      {
        id: 'c12-1',
        channel: 'PW JEE Wallah (Lakshya JEE)',
        teacher: 'Rajwant Sir & Saleem Sir',
        subject: 'Physics',
        level: 'Boards + JEE Main/Adv',
        bestFor: 'Class 12 Electrostatics, Magnetism, Optics & Modern Physics full syllabus',
        rating: 5,
        featuredTitle: 'Lakshya JEE Class 12 Physics Complete Lectures',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+Lakshya+JEE+Physics+Class+12',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Electrostatics', 'Current Electricity', 'Optics', 'Lakshya']
      },
      {
        id: 'c12-2',
        channel: 'Physics Galaxy',
        teacher: 'Ashish Arora',
        subject: 'Physics',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 12 Electrodynamics & Wave Optics Revision Checklist',
        rating: 5,
        featuredTitle: 'Class 12 Physics Galaxy Revision Checklist',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Physics+Galaxy+Revision+Checklist+Class+12+Optics+Modern',
        channelPlaylistsUrl: 'https://www.youtube.com/@PhysicsGalaxy74/playlists',
        verified: true,
        tags: ['Electrodynamics', 'Wave Optics', 'Modern Physics']
      },
      {
        id: 'c12-3',
        channel: 'DexterChem (Class 12)',
        teacher: 'Anoop Vashishtha',
        subject: 'Chemistry',
        level: 'Boards + JEE Main/Adv',
        bestFor: 'Class 12 Coordination Compounds, d & f block, Solutions, Electrochemistry',
        rating: 5,
        featuredTitle: 'Class 12 Complete Inorganic & Physical Chemistry NCERT',
        youtubeUrl: 'https://www.youtube.com/results?search_query=DexterChem+Coordination+Compounds+Electrochemistry+Class+12',
        channelPlaylistsUrl: 'https://www.youtube.com/@DexterChem/playlists',
        verified: true,
        tags: ['Coordination', 'Electrochemistry', 'Solutions', 'd-block']
      },
      {
        id: 'c12-4',
        channel: 'Sachin Rana [IITB]',
        teacher: 'Sachin Rana',
        subject: 'Chemistry',
        level: 'JEE Main & Advanced',
        bestFor: 'Class 12 Complete Organic Chemistry (Aldehydes, Ketones, Amines, Biomolecules)',
        rating: 5,
        featuredTitle: 'Complete Class 12 Organic Chemistry Mechanisms',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Sachin+Rana+Complete+Organic+Chemistry+Aldehydes+Ketones',
        channelPlaylistsUrl: 'https://www.youtube.com/@SachinRanaIITB/playlists',
        verified: true,
        tags: ['Aldehydes', 'Ketones', 'Carboxylic Acids', 'Amines']
      },
      {
        id: 'c12-5',
        channel: 'Mohit Tyagi (Calculus)',
        teacher: 'Mohit Tyagi',
        subject: 'Mathematics',
        level: 'JEE Main & Advanced',
        bestFor: 'Functions, Limits, Continuity, Differentiation & Complete Integral Calculus',
        rating: 5,
        featuredTitle: 'Complete Calculus (Differential & Integral) Library',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Mohit+Tyagi+Functions+Calculus+Lecture+1',
        channelPlaylistsUrl: 'https://www.youtube.com/@MohitTyagi/playlists',
        verified: true,
        tags: ['Functions', 'Definite Integration', 'AOD', 'Differential Equations']
      },
      {
        id: 'c12-6',
        channel: 'MathonGo (Class 12 Maths)',
        teacher: 'Anup Gupta',
        subject: 'Mathematics',
        level: 'Boards + JEE Main',
        bestFor: 'Class 12 Matrices, Determinants, Vectors & 3D Geometry high-scoring chapters',
        rating: 5,
        featuredTitle: 'Class 12 High-Weightage Chapters (Matrices & 3D)',
        youtubeUrl: 'https://www.youtube.com/results?search_query=MathonGo+Matrices+Determinants+Vectors+3D+Geometry',
        channelPlaylistsUrl: 'https://www.youtube.com/@MathonGo/playlists',
        verified: true,
        tags: ['Matrices', 'Determinants', 'Vectors', '3D Geometry']
      }
    ]
  },

  // ==========================================
  // SECTION 3: DROPPER / FAST TRACK TARGET
  // ==========================================
  {
    id: 'dropper-target',
    title: 'Dropper & Repeater — Fast-Track Target',
    badge: 'DROPPER / TARGET BATCH',
    description: 'High-density revision, 100-day full syllabus completion & score maximizers',
    icon: Zap,
    accentColor: 'text-indigo-500',
    cards: [
      {
        id: 'drp-1',
        channel: 'PW JEE Wallah (Prayas Batch)',
        teacher: 'PW Star Droppers Faculty',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'Prayas batch fast-track dropper lectures covering 11th & 12th in one year',
        rating: 5,
        featuredTitle: 'Prayas Dropper Batch Full Syllabus Lectures',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+Prayas+Batch+Dropper+Lectures',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Prayas', 'Dropper Fast-Track', '11th+12th Complete']
      },
      {
        id: 'drp-2',
        channel: 'Competishun (Praveen Dropper)',
        teacher: 'Mohit Tyagi, ABJ Sir, ALK Sir, NS Sir',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'Praveen batch structured Kota dropper plan with zero fluff',
        rating: 5,
        featuredTitle: 'Competishun Praveen Fast-Track Dropper Lectures',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Competishun+Praveen+Dropper+Batch+Lectures',
        channelPlaylistsUrl: 'https://www.youtube.com/@MohitTyagi/playlists',
        verified: true,
        tags: ['Praveen', 'Kota Dropper', 'Zero Fluff']
      },
      {
        id: 'drp-3',
        channel: 'MathonGo (Rank Booster)',
        teacher: 'Anup Gupta',
        subject: 'Mathematics',
        level: 'JEE Main',
        bestFor: 'Dropper mathematics strategy, cutoff analysis, priority chapter sequences',
        rating: 5,
        featuredTitle: 'Dropper Mathematics 99 Percentile Roadmap & PYQs',
        youtubeUrl: 'https://www.youtube.com/results?search_query=MathonGo+Dropper+Mathematics+99+Percentile+Strategy',
        channelPlaylistsUrl: 'https://www.youtube.com/@MathonGo/playlists',
        verified: true,
        tags: ['Dropper Strategy', 'Rank Booster', '99 Percentile']
      }
    ]
  },

  // ==========================================
  // SECTION 4: ONE-SHOT & CRASH COURSES
  // ==========================================
  {
    id: 'one-shots',
    title: 'One-Shot & Crash Course Marathons',
    badge: 'ONE-SHOT MARATHONS',
    description: 'Complete 6 to 10-hour chapter revision marathons with theory & problem sets',
    icon: Sparkles,
    accentColor: 'text-rose-500',
    cards: [
      {
        id: 'os-1',
        channel: 'PW Manzil Series (Physics)',
        teacher: 'Saleem Sir / Rajwant Sir / MR Sir',
        subject: 'Physics',
        level: 'JEE Main & Advanced',
        bestFor: 'Legendary Manzil one shots covering theory, formulas & 50+ problems in one video',
        rating: 5,
        featuredTitle: 'Manzil Physics Complete Chapter One Shots',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+Manzil+Physics+One+Shot',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Manzil Physics', 'One Shot', 'Complete Chapter']
      },
      {
        id: 'os-2',
        channel: 'PW Manzil Series (Chemistry)',
        teacher: 'Faisal Sir / Om Pandey Sir',
        subject: 'Chemistry',
        level: 'JEE Main & Advanced',
        bestFor: 'Manzil one shots for Physical, Organic & Inorganic chemistry with short notes',
        rating: 5,
        featuredTitle: 'Manzil Chemistry Complete One Shots',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+Manzil+Chemistry+One+Shot',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Manzil Chemistry', 'Faisal Sir', 'Om Pandey']
      },
      {
        id: 'os-3',
        channel: 'PW Manzil Series (Mathematics)',
        teacher: 'Sachin Sir / Ashish Sir',
        subject: 'Mathematics',
        level: 'JEE Main & Advanced',
        bestFor: 'Manzil marathon one shots for Calculus, Coordinate Geometry & Algebra',
        rating: 5,
        featuredTitle: 'Manzil Mathematics Complete One Shots',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+Manzil+Maths+One+Shot',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Manzil Maths', 'Sachin Sir', 'One Shot Marathon']
      },
      {
        id: 'os-4',
        channel: 'Unacademy BounceBack (NV Sir Maths)',
        teacher: 'Nishant Vora',
        subject: 'Mathematics',
        level: 'JEE Main & Advanced',
        bestFor: 'BounceBack 1.0 & 2.0 full 44 chapters with downloadable handwritten notes',
        rating: 5,
        featuredTitle: 'BounceBack 2.0 Mathematics Complete One Shots',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Unacademy+JEE+BounceBack+2.0+Nishant+Vora+Maths',
        channelPlaylistsUrl: 'https://www.youtube.com/@UnacademyJEE/playlists',
        verified: true,
        tags: ['BounceBack 2.0', 'NV Sir', 'Handwritten Notes']
      },
      {
        id: 'os-5',
        channel: 'Unacademy BounceBack (Sakshi Ma\'am Chem)',
        teacher: 'Sakshi Ganotra Vora',
        subject: 'Chemistry',
        level: 'JEE Main & Advanced',
        bestFor: 'BounceBack complete chemistry one-shots covering NCERT line-by-line',
        rating: 5,
        featuredTitle: 'BounceBack Chemistry Complete Chapter One Shots',
        youtubeUrl: 'https://www.youtube.com/results?search_query=BounceBack+Sakshi+Vora+Chemistry+Complete+One+Shot',
        channelPlaylistsUrl: 'https://www.youtube.com/@UnacademyJEE/playlists',
        verified: true,
        tags: ['BounceBack Chemistry', 'Sakshi Vora', 'NCERT Highlights']
      },
      {
        id: 'os-6',
        channel: 'JEE Nexus (Sprint Series)',
        teacher: 'Arvind Kalia Sir',
        subject: 'Mathematics',
        level: 'JEE Main',
        bestFor: 'Speed solving sprint sessions with high-probability exam questions',
        rating: 4,
        featuredTitle: 'JEE Nexus Sprint: Mathematics Speed Solving',
        youtubeUrl: 'https://www.youtube.com/results?search_query=JEE+Nexus+Arvind+Kalia+Sprint+One+Shot',
        channelPlaylistsUrl: 'https://www.youtube.com/@JEENexus/playlists',
        verified: true,
        tags: ['Arvind Kalia', 'Nexus Sprint', 'Shortcuts']
      }
    ]
  },

  // ==========================================
  // SECTION 5: PYQ SERIES & QUESTION MARATHONS
  // ==========================================
  {
    id: 'pyq-series',
    title: 'PYQ Marathons & 10-Year Chapterwise Solving',
    badge: 'PYQ MARATHONS (2019-2025)',
    description: 'Direct NTA examination past-year questions solved step-by-step with shortcuts',
    icon: BookOpen,
    accentColor: 'text-emerald-500',
    cards: [
      {
        id: 'pyq-1',
        channel: 'MathonGo (Chapterwise PYQs)',
        teacher: 'Anup Gupta',
        subject: 'Mathematics',
        level: 'JEE Main',
        bestFor: 'Top 50-100 PYQs per chapter with time-saving hacks and weightage analysis',
        rating: 5,
        featuredTitle: 'JEE Main 10-Year Chapterwise Mathematics PYQs',
        youtubeUrl: 'https://www.youtube.com/results?search_query=MathonGo+JEE+Main+Chapterwise+PYQ+Marathon',
        channelPlaylistsUrl: 'https://www.youtube.com/@MathonGo/playlists',
        verified: true,
        tags: ['Chapterwise PYQ', 'Top 50 Questions', '30-Sec Hacks']
      },
      {
        id: 'pyq-2',
        channel: 'Eduniti (Physics PYQ Sprint)',
        teacher: 'Mohit Goenka',
        subject: 'Physics',
        level: 'JEE Main & Advanced',
        bestFor: '5-year JEE Main & Advanced chapterwise PYQ solutions in shortest video runtime',
        rating: 5,
        featuredTitle: 'Eduniti Physics 5-Year PYQ Sprint Series',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Eduniti+Physics+PYQ+Sprint+5+Year',
        channelPlaylistsUrl: 'https://www.youtube.com/@Eduniti/playlists',
        verified: true,
        tags: ['PYQ Sprint', 'Shortest Runtime', 'Formula Recaps']
      },
      {
        id: 'pyq-3',
        channel: 'PW JEE Wallah (PYQ Marathons)',
        teacher: 'PW Faculty Team',
        subject: 'Complete PCM',
        level: 'JEE Main',
        bestFor: '12-hour continuous live PYQ marathons for Physics, Chemistry & Maths',
        rating: 5,
        featuredTitle: 'JEE Main 1000+ PYQ Live Solving Marathon',
        youtubeUrl: 'https://www.youtube.com/results?search_query=PW+JEE+Wallah+1000+PYQ+Live+Marathon',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['Live Marathon', '1000 PYQs', 'PCM Complete']
      }
    ]
  },

  // ==========================================
  // SECTION 6: JEE ADVANCED RANKERS
  // ==========================================
  {
    id: 'advanced-rankers',
    title: 'JEE Advanced Rankers & 700+ Advanced Problems',
    badge: 'TOP AIR RANKERS & OLYMPIAD',
    description: 'High conceptual rigor, multi-concept problems, Irodov, Krotov & Black Book level',
    icon: Trophy,
    accentColor: 'text-amber-600',
    cards: [
      {
        id: 'adv-1',
        channel: 'Physics Galaxy (700+ Advanced)',
        teacher: 'Ashish Arora',
        subject: 'Physics',
        level: 'JEE Advanced Only',
        bestFor: 'Iconic 700+ Advanced Illustrations series for AIR < 500 aspirants',
        rating: 5,
        featuredTitle: '700+ Advanced Illustrations for JEE Advanced',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Physics+Galaxy+700+Advanced+Illustrations',
        channelPlaylistsUrl: 'https://www.youtube.com/@PhysicsGalaxy74/playlists',
        verified: true,
        tags: ['700+ Illustrations', 'AIR Top 500', 'Irodov Level']
      },
      {
        id: 'adv-2',
        channel: 'Sachin Rana [IITB]',
        teacher: 'Sachin Rana',
        subject: 'Chemistry',
        level: 'JEE Advanced Only',
        bestFor: 'Clayden-level organic mechanisms, deep stereochemistry & tricky rearrangements',
        rating: 5,
        featuredTitle: 'Complete Organic Mechanisms for JEE Advanced (Clayden Level)',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Sachin+Rana+Reaction+Mechanisms+JEE+Advanced',
        channelPlaylistsUrl: 'https://www.youtube.com/@SachinRanaIITB/playlists',
        verified: true,
        tags: ['Clayden Level', 'Stereochemistry', 'IIT Bombay']
      },
      {
        id: 'adv-3',
        channel: 'Maths Unplugged',
        teacher: 'Maths Unplugged Faculty',
        subject: 'Mathematics',
        level: 'JEE Advanced Only',
        bestFor: 'Extreme conceptual mathematical rigor, Black Book solutions & tricky proofs',
        rating: 5,
        featuredTitle: 'JEE Advanced Calculus & Algebra Masterclass',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Maths+Unplugged+Calculus+JEE+Advanced',
        channelPlaylistsUrl: 'https://www.youtube.com/@MathsUnplugged/playlists',
        verified: true,
        tags: ['Black Book', 'Extreme Rigor', 'Pure Maths']
      },
      {
        id: 'adv-4',
        channel: 'IITian Explains (MKA Sir)',
        teacher: 'Md. Kashif Alam (MKA Sir)',
        subject: 'Chemistry',
        level: 'JEE Advanced Only',
        bestFor: 'Brainstorming reaction pathways and top rankers problem sets',
        rating: 5,
        featuredTitle: 'MKA Sir Brainstorming Series in Organic Chemistry',
        youtubeUrl: 'https://www.youtube.com/results?search_query=IITian+Explains+MKA+Sir+Brainstorming+Series',
        channelPlaylistsUrl: 'https://www.youtube.com/@IITianExplains/playlists',
        verified: true,
        tags: ['Brainstorming', 'MKA Sir', 'Top Ranker Organic']
      }
    ]
  },

  // ==========================================
  // SECTION 7: FORMULA & RAPID REVISION
  // ==========================================
  {
    id: 'formula-revision',
    title: 'Formula Sheets & Rapid Revision Checklists',
    badge: 'LAST-MINUTE SCORE BOOSTER',
    description: 'Revise complete physics, chemistry or math formulas in 1 to 2 hours before exam',
    icon: Clock,
    accentColor: 'text-teal-500',
    cards: [
      {
        id: 'f-1',
        channel: 'Eduniti (Formula Marathon)',
        teacher: 'Mohit Goenka',
        subject: 'Physics',
        level: 'JEE Main & Advanced',
        bestFor: 'Complete Physics Formula Marathon & checklist with memory triggers',
        rating: 5,
        featuredTitle: 'Complete Physics Formula Marathon for JEE Main',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Eduniti+Complete+Physics+Formula+Revision+JEE+Main',
        channelPlaylistsUrl: 'https://www.youtube.com/@Eduniti/playlists',
        verified: true,
        tags: ['Formula Marathon', 'Checklist', 'Memory Triggers']
      },
      {
        id: 'f-2',
        channel: 'DexterChem (NCERT Highlights)',
        teacher: 'Anoop Vashishtha',
        subject: 'Chemistry',
        level: 'JEE Main & Advanced',
        bestFor: '100% NCERT line-by-line revision for Inorganic & Physical Chemistry',
        rating: 5,
        featuredTitle: 'NCERT Line-by-Line Complete Chemistry Revision',
        youtubeUrl: 'https://www.youtube.com/results?search_query=DexterChem+NCERT+Line+by+Line+Complete+Chemistry',
        channelPlaylistsUrl: 'https://www.youtube.com/@DexterChem/playlists',
        verified: true,
        tags: ['NCERT Highlights', 'Exceptions', 'Line-by-Line']
      },
      {
        id: 'f-3',
        channel: 'Neha Agrawal Mathematically Inclined',
        teacher: 'Neha Agrawal',
        subject: 'Mathematics',
        level: 'JEE Main',
        bestFor: 'Short tricks, formula cheat sheets and rapid recall hacks',
        rating: 4,
        featuredTitle: 'Super Tricks & Formula Hacks for JEE Main Mathematics',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Mathematically+Inclined+Super+Tricks+Formula+Hacks',
        channelPlaylistsUrl: 'https://www.youtube.com/@MathematicallyInclined/playlists',
        verified: true,
        tags: ['Formula Hacks', 'Cheat Sheets', '1-Min Tricks']
      },
      {
        id: 'f-4',
        channel: 'eSaral (3-Layer Revision)',
        teacher: 'NKC Sir, NV Sir, Prateek Sir',
        subject: 'Complete PCM',
        level: 'JEE Main',
        bestFor: 'Mindmaps, chapter formulas and 3-layer rapid revision checklists',
        rating: 4,
        featuredTitle: 'eSaral Mindmaps & Formula Rapid Revision',
        youtubeUrl: 'https://www.youtube.com/results?search_query=eSaral+Mind+Maps+Physics+Chemistry+Maths',
        channelPlaylistsUrl: 'https://www.youtube.com/@eSaral/playlists',
        verified: true,
        tags: ['Mind Maps', 'Formula Revision', '3-Layer']
      }
    ]
  },

  // ==========================================
  // SECTION 8: COMPLETE PCM COACHING CHANNELS
  // ==========================================
  {
    id: 'coaching-ecosystems',
    title: 'Top Official PCM Coaching Ecosystems',
    badge: 'COMPLETE PCM PLATFORMS',
    description: 'Official YouTube channels of premier national coaching institutes & platforms',
    icon: Building2,
    accentColor: 'text-purple-500',
    cards: [
      {
        id: 'coach-1',
        channel: 'JEE Wallah (Physics Wallah)',
        teacher: 'PW Star Faculty Panel',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'India\'s most popular free JEE channel (Arjuna, Lakshya, Manzil, Prayas)',
        rating: 5,
        featuredTitle: 'Official PW JEE Wallah Channel & All Batches',
        youtubeUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        channelPlaylistsUrl: 'https://www.youtube.com/@PW-JEEWallah/playlists',
        verified: true,
        tags: ['PW Official', 'All Batches', 'Free Library']
      },
      {
        id: 'coach-2',
        channel: 'Competishun - Official',
        teacher: 'Mohit Tyagi, ABJ Sir, ALK Sir, NS Sir',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'Zero distraction, complete systematic Kota preparation for JEE Advanced',
        rating: 5,
        featuredTitle: 'Competishun Official Free Full Syllabus Playlists',
        youtubeUrl: 'https://www.youtube.com/@MohitTyagi/playlists',
        channelPlaylistsUrl: 'https://www.youtube.com/@MohitTyagi/playlists',
        verified: true,
        tags: ['Competishun Official', 'Kota Standard', 'Zero Distraction']
      },
      {
        id: 'coach-3',
        channel: 'Unacademy JEE - Official',
        teacher: 'Unacademy Master Educators',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'Historic BounceBack series, live mocks & NTA paper discussions',
        rating: 5,
        featuredTitle: 'Unacademy JEE Official Playlists & Series',
        youtubeUrl: 'https://www.youtube.com/@UnacademyJEE/playlists',
        channelPlaylistsUrl: 'https://www.youtube.com/@UnacademyJEE/playlists',
        verified: true,
        tags: ['Unacademy Official', 'BounceBack', 'Live Mocks']
      },
      {
        id: 'coach-4',
        channel: 'ALLEN JEE - Official',
        teacher: 'ALLEN Kota Faculty Council',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'Score booster masterclasses, live paper analysis & NTA answer keys',
        rating: 4,
        featuredTitle: 'ALLEN JEE Official Kota Lectures & Solutions',
        youtubeUrl: 'https://www.youtube.com/@ALLENJEE/playlists',
        channelPlaylistsUrl: 'https://www.youtube.com/@ALLENJEE/playlists',
        verified: true,
        tags: ['ALLEN Kota', 'National Leader', 'Paper Analysis']
      },
      {
        id: 'coach-5',
        channel: 'Motion Education - Official',
        teacher: 'NV Sir (Nitin Vijay) & Kota Team',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'High energy concept classes, motivational strategy & Kota DPPs',
        rating: 4,
        featuredTitle: 'Motion JEE Official Playlists & NV Sir Lectures',
        youtubeUrl: 'https://www.youtube.com/@MotionJEE/playlists',
        channelPlaylistsUrl: 'https://www.youtube.com/@MotionJEE/playlists',
        verified: true,
        tags: ['Motion Kota', 'NV Sir', 'DPP Solutions']
      },
      {
        id: 'coach-6',
        channel: 'Vedantu JEE - Official',
        teacher: 'Vedantu Master Teachers',
        subject: 'Complete PCM',
        level: 'JEE Main & Advanced',
        bestFor: 'Sprint marathons, paper predictions and live problem solving',
        rating: 4,
        featuredTitle: 'Vedantu JEE Sprint & Marathons',
        youtubeUrl: 'https://www.youtube.com/@VedantuJEE/playlists',
        channelPlaylistsUrl: 'https://www.youtube.com/@VedantuJEE/playlists',
        verified: true,
        tags: ['Vedantu Official', 'Sprint', 'Paper Prediction']
      }
    ]
  }
];

export const LecturesView: React.FC = () => {
  // Search query across all sections
  const [searchQuery, setSearchQuery] = useState('');

  // Saved bookmark IDs persisted in localStorage
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('edparth_saved_channels_v5');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    return new Set<string>();
  });

  // Only show saved favorites toggle
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Active section for smooth scrolling
  const [activeSectionId, setActiveSectionId] = useState<string>('class-11');

  // Persist saved IDs
  useEffect(() => {
    localStorage.setItem('edparth_saved_channels_v5', JSON.stringify(Array.from(savedIds)));
  }, [savedIds]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setShowSavedOnly(false);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter sections and cards based on search query or saved filter
  const visibleSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return SECTIONS_DATA.map(section => {
      const filteredCards = section.cards.filter(card => {
        // Saved only check
        if (showSavedOnly && !savedIds.has(card.id)) return false;

        // Search query check
        if (q) {
          const matchTitle = card.featuredTitle.toLowerCase().includes(q);
          const matchChannel = card.channel.toLowerCase().includes(q);
          const matchTeacher = card.teacher.toLowerCase().includes(q);
          const matchSubject = card.subject.toLowerCase().includes(q);
          const matchBestFor = card.bestFor.toLowerCase().includes(q);
          const matchTags = card.tags.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchChannel || matchTeacher || matchSubject || matchBestFor || matchTags;
        }

        return true;
      });

      return {
        ...section,
        cards: filteredCards
      };
    }).filter(sec => sec.cards.length > 0);
  }, [searchQuery, showSavedOnly, savedIds]);

  const totalVisibleCards = useMemo(() => {
    return visibleSections.reduce((acc, s) => acc + s.cards.length, 0);
  }, [visibleSections]);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto font-sans text-slate-800">
      
      {/* 1. Top Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-xs text-left space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#ff6a00] text-xs font-mono font-bold border border-orange-100">
              <Flame className="w-3.5 h-3.5 fill-[#ff6a00]" />
              <span>DIRECT JEE YOUTUBE COURSE DIRECTORY</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
              JEE YouTube Lectures
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Categorized chapterwise courses & lectures for Class 11, Class 12, Droppers & Revision • <strong>Opens directly on YouTube</strong>
            </p>
          </div>

          {/* Bookmark Counter & Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                showSavedOnly
                  ? 'bg-rose-50 border-rose-200 text-rose-600 ring-2 ring-rose-200'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>My Saved Courses ({savedIds.size})</span>
            </button>
          </div>
        </div>

        {/* 2. Instant Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any teacher, topic, chapter (e.g. Rotational Motion, Mohit Tyagi, Manzil, BounceBack, Organic GOC, Calculus)..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-slate-50/90 border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ff6a00] focus:bg-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 3. Direct Section Quick Jump Bar (Sticky Navigation Tabs) */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Jump to Section:
          </span>
          {SECTIONS_DATA.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSectionId === sec.id && !showSavedOnly;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff6a00]' : 'text-slate-400'}`} />
                <span>{sec.title.split('—')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Search Result Counter (when searching) */}
        {(searchQuery || showSavedOnly) && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              Showing <strong className="text-slate-900 font-bold">{totalVisibleCards}</strong> verified YouTube courses matching your search
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSavedOnly(false);
              }}
              className="text-[#ff6a00] font-bold hover:underline cursor-pointer"
            >
              Reset Search & Show All Sections
            </button>
          </div>
        )}
      </div>

      {/* 4. Dedicated Sections Display */}
      {visibleSections.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 text-slate-400 space-y-4">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No YouTube courses found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try searching for other keywords like "Calculus", "Mohit Tyagi", "Manzil", "Eduniti", "Rotation", or clear your search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setShowSavedOnly(false);
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            Show All Sections
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {visibleSections.map(section => {
            const SectionIcon = section.icon;

            return (
              <section
                key={section.id}
                id={section.id}
                className="space-y-5 scroll-mt-6 text-left"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-orange-50 border border-orange-100">
                        <SectionIcon className="w-4 h-4 text-[#ff6a00]" />
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#ff6a00]">
                        {section.badge}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {section.title}
                    </h2>
                    
                    <p className="text-xs text-slate-500 font-medium">
                      {section.description}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-slate-400 font-semibold shrink-0">
                    {section.cards.length} Verified Channels
                  </span>
                </div>

                {/* Section Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {section.cards.map(card => {
                    const isSaved = savedIds.has(card.id);

                    return (
                      <div
                        key={card.id}
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative text-left"
                      >
                        {/* Card Top: Channel & Teacher info */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-[#ff6a00]">⚡</span>
                                <h3 className="text-base font-extrabold text-slate-900 leading-snug truncate">
                                  {card.channel}
                                </h3>
                              </div>
                              <p className="text-xs font-semibold text-slate-600">
                                Mentor: <strong className="text-slate-800">{card.teacher}</strong>
                              </p>
                            </div>

                            {/* Verified Badge */}
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-200/60 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          </div>

                          {/* Subject & Exam Target Pills */}
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase font-mono ${
                              card.subject === 'Physics' ? 'bg-amber-100 text-amber-900' :
                              card.subject === 'Chemistry' ? 'bg-emerald-100 text-emerald-900' :
                              card.subject === 'Mathematics' ? 'bg-indigo-100 text-indigo-900' :
                              'bg-purple-100 text-purple-900'
                            }`}>
                              {card.subject}
                            </span>

                            <span className="text-[11px] font-mono font-bold text-slate-500">
                              {card.level}
                            </span>

                            {/* Star rating */}
                            <div className="flex items-center gap-1 ml-auto text-amber-500 text-[11px] font-bold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>5.0</span>
                            </div>
                          </div>

                          {/* Best For Callout */}
                          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                            <span className="font-bold text-slate-900">Best for: </span>
                            <span>{card.bestFor}</span>
                          </div>

                          {/* Featured Course Title */}
                          <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs space-y-1">
                            <span className="text-[10px] font-mono font-black uppercase text-[#ff6a00] block">
                              RECOMMENDED SERIES / COURSE
                            </span>
                            <p className="font-extrabold text-slate-900 leading-snug line-clamp-2">
                              {card.featuredTitle}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {card.tags.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Bottom: Direct YouTube Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                          {/* Primary CTA: Open directly on YouTube */}
                          <a
                            href={card.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                            title="Open verified course directly on YouTube"
                          >
                            <Play className="w-3.5 h-3.5 fill-white text-white" />
                            <span>Open on YouTube ↗</span>
                          </a>

                          {/* All Playlists link */}
                          <a
                            href={card.channelPlaylistsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                            title="View all playlists of this channel"
                          >
                            <ListVideo className="w-4 h-4 text-slate-600" />
                            <span className="hidden sm:inline">Playlists</span>
                          </a>

                          {/* Bookmark button */}
                          <button
                            onClick={(e) => toggleSave(card.id, e)}
                            title={isSaved ? 'Remove from Saved' : 'Save Channel'}
                            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center transition-all cursor-pointer ${
                              isSaved
                                ? 'bg-rose-50 border-rose-200 text-rose-600'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

    </div>
  );
};
