export interface VisitorLog {
  id: string;
  timestamp: string;
  city: string;
  state: string;
  country: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  browser: string;
  source: 'Direct' | 'YouTube' | 'Telegram' | 'Instagram' | 'WhatsApp' | 'Google' | 'Other';
  pageViewed: string;
}

export interface AnalyticsSummary {
  totalPageviews: number;
  uniqueVisitors: number;
  activeNow: number;
  topCities: { city: string; visits: number; percentage: number }[];
  sources: { source: string; visits: number; percentage: number }[];
  devices: { device: string; count: number; percentage: number }[];
  topPages: { page: string; views: number }[];
  recentVisitors: VisitorLog[];
}

const STORAGE_KEY = 'edparth_visitor_logs_v2';
const VIEWS_KEY = 'edparth_real_pageviews';
const PAGE_COUNTS_KEY = 'edparth_real_page_counts';
const GA_KEY = 'edparth_ga_measurement_id';

export function getVisitorLogs(): VisitorLog[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function recordPageView(pageName: string) {
  try {
    // 1. Increment total real pageviews
    const currentViews = parseInt(localStorage.getItem(VIEWS_KEY) || '0', 10);
    localStorage.setItem(VIEWS_KEY, String(currentViews + 1));

    // 2. Track page specific view count
    const rawCounts = localStorage.getItem(PAGE_COUNTS_KEY);
    const pageCounts: Record<string, number> = rawCounts ? JSON.parse(rawCounts) : {};
    pageCounts[pageName] = (pageCounts[pageName] || 0) + 1;
    localStorage.setItem(PAGE_COUNTS_KEY, JSON.stringify(pageCounts));

    // 3. Detect device & browser
    const ua = navigator.userAgent;
    let device: 'Mobile' | 'Desktop' | 'Tablet' = 'Desktop';
    if (/iPad|Tablet|PlayBook/i.test(ua)) device = 'Tablet';
    else if (/Mobile|Android|iP(hone|od)/i.test(ua)) device = 'Mobile';

    let browser = 'Chrome';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';

    // 4. Detect referrer source
    const referrer = document.referrer.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref') || urlParams.get('utm_source');

    let source: VisitorLog['source'] = 'Direct';
    if (refParam) {
      if (refParam.includes('youtube')) source = 'YouTube';
      else if (refParam.includes('telegram') || refParam.includes('tg')) source = 'Telegram';
      else if (refParam.includes('instagram') || refParam.includes('ig')) source = 'Instagram';
      else if (refParam.includes('whatsapp') || refParam.includes('wa')) source = 'WhatsApp';
    } else if (referrer.includes('youtube.com')) source = 'YouTube';
    else if (referrer.includes('t.me') || referrer.includes('telegram.org')) source = 'Telegram';
    else if (referrer.includes('instagram.com')) source = 'Instagram';
    else if (referrer.includes('google.com')) source = 'Google';

    const logs = getVisitorLogs();
    const newLog: VisitorLog = {
      id: `vis_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      city: 'Local Session',
      state: 'Active',
      country: 'India',
      device,
      browser,
      source,
      pageViewed: pageName
    };

    const updated = [newLog, ...logs.slice(0, 49)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silent fail in privacy/storage-restricted environments
  }
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const logs = getVisitorLogs();
  const totalPageviews = parseInt(localStorage.getItem(VIEWS_KEY) || String(logs.length), 10);
  const uniqueVisitors = logs.length > 0 ? 1 : 0;
  const activeNow = 1; // Real single active student session

  // Real page counts from storage
  let rawCounts: Record<string, number> = {};
  try {
    const saved = localStorage.getItem(PAGE_COUNTS_KEY);
    if (saved) rawCounts = JSON.parse(saved);
  } catch {
    rawCounts = {};
  }

  const topPages = Object.entries(rawCounts).map(([page, views]) => ({
    page,
    views
  })).sort((a, b) => b.views - a.views);

  // Group real devices
  const deviceCounts: Record<string, number> = {};
  logs.forEach(l => {
    deviceCounts[l.device] = (deviceCounts[l.device] || 0) + 1;
  });
  const totalDev = logs.length || 1;
  const devices = Object.entries(deviceCounts).map(([device, count]) => ({
    device,
    count,
    percentage: Math.round((count / totalDev) * 100)
  }));

  // Group real sources
  const sourceCounts: Record<string, number> = {};
  logs.forEach(l => {
    sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
  });
  const totalSrc = logs.length || 1;
  const sources = Object.entries(sourceCounts).map(([source, visits]) => ({
    source,
    visits,
    percentage: Math.round((visits / totalSrc) * 100)
  }));

  return {
    totalPageviews,
    uniqueVisitors,
    activeNow,
    topCities: [],
    sources,
    devices,
    topPages,
    recentVisitors: logs
  };
}

// Google Analytics 4 Script Loader
export function initGoogleAnalytics(measurementId: string) {
  if (!measurementId || !measurementId.startsWith('G-')) return;

  localStorage.setItem(GA_KEY, measurementId.trim());

  if (document.getElementById('google-analytics-script')) return;

  const script = document.createElement('script');
  script.id = 'google-analytics-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId.trim()}`;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId.trim()}');
  `;
  document.head.appendChild(inlineScript);
}

export function getSavedGaMeasurementId(): string {
  return localStorage.getItem(GA_KEY) || '';
}
