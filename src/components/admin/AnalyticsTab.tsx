import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Smartphone, 
  Globe, 
  Compass, 
  Clock, 
  Share2, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Laptop,
  Flame,
  Radio
} from 'lucide-react';
import { 
  getAnalyticsSummary, 
  initGoogleAnalytics, 
  getSavedGaMeasurementId,
  type AnalyticsSummary 
} from '../../utils/analytics';

export const AnalyticsTab: React.FC = () => {
  const [data, setData] = useState<AnalyticsSummary>(() => getAnalyticsSummary());
  const [gaId, setGaId] = useState(() => getSavedGaMeasurementId());
  const [gaSavedMessage, setGaSavedMessage] = useState('');

  // Refresh summary periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setData(getAnalyticsSummary());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveGaId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gaId.trim()) return;
    initGoogleAnalytics(gaId.trim());
    setGaSavedMessage('Google Analytics 4 Measurement ID saved and activated!');
    setTimeout(() => setGaSavedMessage(''), 4000);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/30">
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>AUTHENTIC TELEMETRY & GOOGLE ANALYTICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Traffic & Analytics Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Review real-time in-app navigation statistics and connect official Google Analytics 4 for worldwide geographic demographics.
          </p>
        </div>

        {/* Real Status Badge */}
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-md self-start md:self-auto shrink-0 shadow-lg">
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono font-bold text-slate-400">SESSION TELEMETRY</div>
            <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Real Tracking Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase">Total Recorded Views</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {data.totalPageviews > 0 ? data.totalPageviews.toLocaleString() : '—'}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            Local browser sessions
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase">Active Sections</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {data.topPages.length > 0 ? data.topPages.length : '—'}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            Navigated learning modules
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase">Most Visited Section</span>
            <MapPin className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-base sm:text-lg font-black text-slate-900 truncate">
            {data.topPages[0]?.page || 'Study Suite'}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {data.topPages[0]?.views ? `${data.topPages[0].views} views` : 'Awaiting navigation'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase">GA4 Connection</span>
            <Share2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-base sm:text-lg font-black text-slate-900 truncate">
            {gaId ? 'Connected' : 'Not Connected'}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {gaId ? gaId : 'Configure below'}
          </p>
        </div>
      </div>

      {/* 3. Two Columns: Cities Breakdown & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Top Cities (Kaha se visit kiye) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-50 border border-orange-100 text-[#ff6a00]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Top Student Cities & States</h3>
                <p className="text-xs text-slate-500">Where your learners are visiting from</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">India</span>
          </div>

          <div className="space-y-3.5">
            {data.topCities.length > 0 ? (
              data.topCities.map(item => (
                <div key={item.city} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.city}</span>
                    <span className="font-mono text-slate-500">
                      <strong className="text-slate-900">{item.visits}</strong> visits ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      style={{ width: `${item.percentage * 2.2}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
                <p className="text-xs text-slate-600 font-medium">
                  Client-side storage protects user privacy and does not fabricate geolocation.
                </p>
                <p className="text-[11px] text-slate-400">
                  Connect your Google Analytics 4 Measurement ID below to view verified city-by-city geographic distribution.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Acquisition Sources (Traffic kaha se aa raha hai) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Traffic Acquisition Sources</h3>
                <p className="text-xs text-slate-500">Which channels brought students to your site</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">Referrals</span>
          </div>

          <div className="space-y-3.5">
            {data.sources.length > 0 ? (
              data.sources.map(src => (
                <div key={src.source} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{src.source}</span>
                    <span className="font-mono text-slate-500">
                      <strong className="text-slate-900">{src.visits}</strong> visits ({src.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                      style={{ width: `${src.percentage * 2.2}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                <p className="text-xs text-slate-500">No external referral sources detected yet.</p>
              </div>
            )}
          </div>

          {/* Device Breakdown Pill */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2.5">
              Device Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {data.devices.map(d => (
                <div key={d.device} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-medium block truncate">{d.device}</span>
                  <span className="text-sm font-black text-slate-900 mt-0.5 block">{d.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4. Real-time Live Visitor Stream */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Recent Real-Time Visitor Logs</h3>
              <p className="text-xs text-slate-500">Telemetry logs recorded in this browser session</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active Log
          </span>
        </div>

        <div className="overflow-x-auto">
          {data.recentVisitors.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="pb-3 font-bold">Timestamp</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold">Traffic Source</th>
                  <th className="pb-3 font-bold">Device & Browser</th>
                  <th className="pb-3 font-bold">Page Viewed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.recentVisitors.slice(0, 8).map(vis => (
                  <tr key={vis.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-mono font-semibold text-slate-500">
                      {vis.timestamp}
                    </td>
                    <td className="py-3 font-bold text-slate-900">
                      {vis.city}
                    </td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {vis.source}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">
                      {vis.device} • {vis.browser}
                    </td>
                    <td className="py-3 font-semibold text-slate-800 capitalize">
                      {vis.pageViewed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center space-y-1">
              <p className="text-sm font-semibold text-slate-700">No session telemetry recorded yet</p>
              <p className="text-xs text-slate-400">Navigate between sections of EdParth to record real local page transitions.</p>
            </div>
          )}
        </div>
      </div>

      {/* 5. Production Google Analytics 4 (GA4) Integration Card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>OFFICIAL GOOGLE ANALYTICS 4 INTEGRATION</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Connect Free Google Analytics (Worldwide Live Map & Demographics)
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Google provides 100% free production analytics with live interactive globe maps, realtime visitor countdowns, and mobile app telemetry. Simply enter your GA4 ID below.
            </p>
          </div>

          <a 
            href="https://analytics.google.com/"
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors self-start md:self-auto shrink-0"
          >
            <span>Open Google Analytics</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* GA4 ID Form */}
        <form onSubmit={handleSaveGaId} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <input
            type="text"
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="Paste your Measurement ID: e.g. G-ABC123XYZ"
            className="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
          >
            Save & Enable Tracking
          </button>
        </form>

        {gaSavedMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{gaSavedMessage}</span>
          </div>
        )}
      </div>

    </div>
  );
};
