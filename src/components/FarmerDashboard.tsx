import React from 'react';
import {
  Camera,
  Image as ImageIcon,
  Sparkles,
  MessageSquare,
  History,
  Calculator,
  User,
  HelpCircle,
  AlertTriangle,
  Leaf,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SupportedLanguage } from '../types/agrishield';
import { FarmerUser } from '../types/auth';
import { ScanHistoryItem } from '../types/agrishield';
import { SAMPLE_CROPS, SampleCropItem } from '../data/sampleCrops';
import { TRANSLATIONS, getTranslations } from '../data/translations';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';
import { localizeReport } from '../utils/localizeReport';

interface FarmerDashboardProps {
  currentUser: FarmerUser | null;
  currentLanguage: SupportedLanguage;
  onOpenScanCamera: () => void;
  onOpenScanBrowse: () => void;
  onSelectSampleCrop: (sample: SampleCropItem) => void;
  onOpenChat: () => void;
  onOpenHistory: () => void;
  onOpenCalculator: () => void;
  recentScans: ScanHistoryItem[];
  onSelectScan: (item: ScanHistoryItem) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  currentUser,
  currentLanguage,
  onOpenScanCamera,
  onOpenScanBrowse,
  onSelectSampleCrop,
  onOpenChat,
  onOpenHistory,
  onOpenCalculator,
  recentScans,
  onSelectScan,
}) => {
  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const t = getTranslations(langCode);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Farmer Greeting Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950/80 via-stone-900 to-stone-900 border border-emerald-500/30 p-5 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-400">
                {t.dashboard.greeting}, {currentUser?.name || 'Kisan Bhai'}!
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {currentUser?.village ? `${currentUser.village}, ` : ''}{currentUser?.state || 'India'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {t.dashboard.heroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              {t.dashboard.heroSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenChat}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-stone-950 font-bold text-xs shadow-lg shadow-emerald-950 flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.dashboard.startChat}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: MAIN EXTREMELY OBVIOUS ACTION CARD: "SCAN / UPLOAD LEAF" */}
      <div className="bg-stone-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Primary Diagnostic Action</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.dashboard.scanCardTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
              {t.dashboard.scanCardDesc}
            </p>
          </div>

          {/* TWO BIG TOUCH-FRIENDLY BUTTONS (CAMERA / BROWSE) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenScanCamera}
              className="flex-1 sm:flex-initial px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-950 flex items-center justify-center gap-3 transition transform active:scale-98"
            >
              <Camera className="w-6 h-6 shrink-0" />
              <span>{t.dashboard.takePhoto}</span>
            </button>

            <button
              onClick={onOpenScanBrowse}
              className="flex-1 sm:flex-initial px-6 py-4 rounded-2xl bg-stone-800 hover:bg-stone-750 text-white border border-stone-700 hover:border-emerald-500/60 font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition shadow-lg"
            >
              <ImageIcon className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>{t.dashboard.browsePhoto}</span>
            </button>
          </div>
        </div>

        {/* Photography Tips Card */}
        <div className="mt-6 pt-5 border-t border-stone-800/80 bg-stone-950/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-5 sm:p-6 rounded-b-3xl">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.dashboard.photoTipsTitle}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs text-stone-300">
            {t.dashboard.photoTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1-Click Instant Test Specimen Cards (For quick farmer trials) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Test Crop Specimens (1-Tap Clinical Trial)</span>
          </h3>
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            Tap any sample leaf to immediately view full diagnosis, dosage & treatment
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_CROPS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSampleCrop(sample)}
              className="text-left p-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 transition group relative overflow-hidden"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-2 relative">
                <img
                  src={sample.thumbnailSvg}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-white">
                  {sample.severityPercentage}%
                </span>
              </div>
              <h4 className="font-bold text-xs text-stone-200 group-hover:text-emerald-400 truncate">
                {sample.cropName}
              </h4>
              <p className="text-[10px] text-stone-400 truncate">
                {sample.diseaseEnglish.split(' (')[0]}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Recent Scans + Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scans Column (2 cols) */}
        <div className="lg:col-span-2 bg-stone-900/80 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span>{t.dashboard.recentScansTitle}</span>
            </h3>
            {recentScans.length > 0 && (
              <button
                onClick={onOpenHistory}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>{t.dashboard.viewHistory}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {recentScans.length === 0 ? (
            <div className="py-8 text-center text-stone-500 text-xs">
              <Leaf className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>{t.dashboard.noScansYet}</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentScans.slice(0, 3).map((item) => {
                const loc = localizeReport(item.report, langCode);
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectScan(item)}
                    className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80 hover:border-emerald-500/50 transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-xs">
                        🌱
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition">
                          {loc.cropName}
                        </h4>
                        <p className="text-[11px] text-stone-400">
                          {loc.diseaseName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900 text-stone-300 border border-stone-800">
                        {item.report.confidence || item.report.analysis_metadata?.severity_percentage || 88}%
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Tools & Calculator Card (1 col) */}
        <div className="space-y-4">
          <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>{t.calculator.title}</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Calculate exact spray tanks, water volume, and estimated treatment expenses per acre.
            </p>
            <button
              onClick={onOpenCalculator}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-emerald-300 border border-stone-700 font-bold text-xs transition"
            >
              Open Farm Size Calculator
            </button>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Farmer Support & IPM</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Have doubts before spraying? Ask Kisan Mitra AI doctor in Telugu, Hindi, Tamil, or English.
            </p>
            <button
              onClick={onOpenChat}
              className="w-full py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 font-bold text-xs transition"
            >
              Talk to Crop Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
