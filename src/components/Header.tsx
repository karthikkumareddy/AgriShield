import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Code2,
  Calculator,
  History,
  Globe,
  MessageSquare,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileSearch,
} from 'lucide-react';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '../types/agrishield';
import { FarmerUser } from '../types/auth';
import { TRANSLATIONS, getTranslations } from '../data/translations';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

export type ActiveNavTab = 'dashboard' | 'result' | 'chat';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenCalculator: () => void;
  onOpenJsonViewer: () => void;
  onOpenHistory: () => void;
  onOpenAuth: () => void;
  onOpenChat: () => void;
  currentUser: FarmerUser | null;
  onLogout: () => void;
  historyCount: number;
  hasActiveReport: boolean;
  activeView?: ActiveNavTab;
  onNavigateView?: (view: ActiveNavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenCalculator,
  onOpenJsonViewer,
  onOpenHistory,
  onOpenAuth,
  onOpenChat,
  currentUser,
  onLogout,
  historyCount,
  hasActiveReport,
  activeView = 'dashboard',
  onNavigateView,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.english;

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand identity */}
        <div 
          onClick={() => onNavigateView && onNavigateView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 border border-emerald-400/30">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                AgriShield <span className="text-emerald-400">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-2.5 h-2.5" /> Intelligence Core
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-400 hidden sm:block truncate max-w-xs">
              {t.app?.tagline || 'AI Plant Disease Detection & Farmer Assistance'}
            </p>
          </div>
        </div>

        {/* Farmer Journey Navigation Tabs (Dashboard, Diagnosis, Kisan Chat) */}
        {onNavigateView && (
          <nav className="hidden md:flex items-center bg-stone-900/90 p-1 rounded-2xl border border-stone-800 shadow-inner">
            <button
              onClick={() => onNavigateView('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.nav?.dashboard || 'Dashboard'}</span>
            </button>

            {hasActiveReport && (
              <button
                onClick={() => onNavigateView('result')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeView === 'result'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <FileSearch className="w-3.5 h-3.5" />
                <span>{t.nav?.scan || 'Diagnosis Result'}</span>
              </button>
            )}

            <button
              onClick={() => onNavigateView('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'chat'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav?.chat || 'Kisan AI Chat'}</span>
            </button>
          </nav>
        )}

        {/* Center / Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Vernacular Language Selector Toggle */}
          <div className="flex items-center bg-stone-900/90 p-1 rounded-xl border border-stone-800 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-1 hidden lg:block" />
            <div className="flex gap-0.5">
              {LANGUAGE_OPTIONS.map((lang) => {
                const isActive = normalizeLanguageCode(currentLanguage) === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                    title={`${lang.name} (${lang.nativeName})`}
                  >
                    <span className="mr-0.5 sm:mr-1">{lang.flagIcon}</span>
                    <span className="hidden sm:inline">{lang.nativeName}</span>
                    <span className="sm:hidden text-[10px]">{lang.code.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action tool buttons */}
          <button
            onClick={onOpenCalculator}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-emerald-300 border border-stone-800 rounded-xl transition shadow-sm"
            title="Knapsack Spray & Acre Dosage Calculator"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Dose Mix</span>
          </button>

          <button
            onClick={onOpenJsonViewer}
            disabled={!hasActiveReport}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium border rounded-xl transition shadow-sm ${
              hasActiveReport
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-emerald-300 border-stone-800'
                : 'opacity-40 cursor-not-allowed bg-stone-900/50 text-stone-500 border-stone-800/50'
            }`}
            title="Inspect & Copy Strict JSON Schema Output"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Schema JSON</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-emerald-300 border border-stone-800 rounded-xl transition shadow-sm"
            title="Field Scan History"
          >
            <History className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden md:inline">{t.nav?.history || 'History'}</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-stone-950 font-bold text-[10px] flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* Farmer User Profile / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 py-1 text-xs font-semibold bg-stone-900 hover:bg-stone-800 border border-emerald-500/40 rounded-xl text-stone-200 transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-[11px] border border-emerald-400/50">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'F'}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-2 z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-stone-800">
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-400 truncate">{currentUser.mobile || currentUser.email || 'Farmer Account'}</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">
                      {currentUser.state} • {currentUser.primaryCrops ? currentUser.primaryCrops.slice(0, 2).join(', ') : currentUser.mainCrop}
                    </p>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        if (onNavigateView) onNavigateView('chat');
                        else onOpenChat();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg flex items-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.nav?.chat || 'Farmer AI Chat'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.nav?.logout || 'Log Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-xl transition shadow-md shadow-emerald-900/30"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.nav?.login || 'Farmer Login'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
