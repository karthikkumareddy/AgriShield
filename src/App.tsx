/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveNavTab } from './components/Header';
import { LandingLoginPage } from './components/LandingLoginPage';
import { RegisterPage } from './components/RegisterPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { DiseaseResultView } from './components/DiseaseResultView';
import { FarmerAiChatView } from './components/FarmerAiChatView';
import { ScanUploadModal } from './components/ScanUploadModal';
import { ExecutionPipelineStatus } from './components/ExecutionPipelineStatus';
import { InfectionHeatmapVisualizer } from './components/InfectionHeatmapVisualizer';
import { SeverityGauge } from './components/SeverityGauge';
import { MultilingualAdvisory } from './components/MultilingualAdvisory';
import { SprayDosageCalculatorModal } from './components/SprayDosageCalculatorModal';
import { JsonReportModal } from './components/JsonReportModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { AuthModal } from './components/AuthModal';
import {
  AgriShieldReport,
  SupportedLanguage,
  ScanHistoryItem,
} from './types/agrishield';
import { FarmerUser } from './types/auth';
import { SAMPLE_CROPS, SampleCropItem } from './data/sampleCrops';
import { AlertCircle, Code2, ShieldCheck, Sprout, ArrowRight, MessageSquare, ArrowLeft } from 'lucide-react';
import { TRANSLATIONS } from './data/translations';
import { normalizeLanguageCode, LanguageCode } from './data/verifiedTreatments';

const STORAGE_KEY = 'agrishield_scan_history_v1';
const AUTH_KEY = 'agrishield_farmer_user_v1';
const LANG_KEY = 'agrishield_preferred_language_v1';

type AppView = 'login' | 'register' | 'dashboard' | 'result' | 'chat';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [report, setReport] = useState<AgriShieldReport>(SAMPLE_CROPS[0].report);
  const [activeImage, setActiveImage] = useState<string>(SAMPLE_CROPS[0].thumbnailSvg);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(SAMPLE_CROPS[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Farmer User State
  const [currentUser, setCurrentUser] = useState<FarmerUser | null>(null);
  const [activeFarmAcres, setActiveFarmAcres] = useState<number>(2.0);

  // Modals state
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [scanModalInitialMode, setScanModalInitialMode] = useState<'camera' | 'browse'>('browse');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Scan history
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  // Load user, language, and scan history from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang) {
        setCurrentLanguage(normalizeLanguageCode(savedLang));
      }

      const savedUser = localStorage.getItem(AUTH_KEY);
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        if (user.farmSize && user.farmSize > 0) {
          setActiveFarmAcres(user.farmSize);
        }
        if (user.preferredLanguage) {
          setCurrentLanguage(normalizeLanguageCode(user.preferredLanguage));
        }
        setCurrentView('dashboard');
      }

      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        const initialItem: ScanHistoryItem = {
          id: `scan-${Date.now()}`,
          timestamp: Date.now(),
          report: SAMPLE_CROPS[0].report,
          imageUrl: SAMPLE_CROPS[0].thumbnailSvg,
          source: 'sample',
        };
        setHistory([initialItem]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([initialItem]));
      }
    } catch (e) {
      console.error('Failed reading storage on mount:', e);
    }
  }, []);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    const code = normalizeLanguageCode(lang);
    setCurrentLanguage(code);
    try {
      localStorage.setItem(LANG_KEY, code);
      if (currentUser) {
        const updatedUser = { ...currentUser, preferredLanguage: code };
        setCurrentUser(updatedUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error('Failed saving language:', e);
    }
  };

  const handleAuthSuccess = (user: FarmerUser, _token?: string) => {
    setCurrentUser(user);
    if (user.preferredLanguage) {
      handleLanguageChange(user.preferredLanguage);
    }
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save auth to localStorage:', e);
    }
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_KEY);
    setCurrentView('login');
  };

  const saveHistoryItem = (
    newReport: AgriShieldReport,
    imageUrl?: string,
    source: 'upload' | 'camera' | 'sample' = 'upload'
  ) => {
    const item: ScanHistoryItem = {
      id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      report: newReport,
      imageUrl,
      source,
    };
    const updated = [item, ...history.slice(0, 19)];
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed saving scan history:', e);
    }
  };

  const handleSelectSample = (sample: SampleCropItem) => {
    setSelectedSampleId(sample.id);
    setActiveImage(sample.thumbnailSvg);
    setReport(sample.report);
    setError(null);
    saveHistoryItem(sample.report, sample.thumbnailSvg, 'sample');
    setCurrentView('result');
  };

  const handleAnalyzeUpload = async (imageData: {
    base64: string;
    mimeType: string;
    cropHint?: string;
    farmAcres?: number;
  }) => {
    setIsLoading(true);
    setError(null);
    setSelectedSampleId(null);
    setActiveImage(imageData.base64);

    if (imageData.farmAcres && imageData.farmAcres > 0) {
      setActiveFarmAcres(imageData.farmAcres);
    }

    try {
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageData.base64,
          mimeType: imageData.mimeType,
          cropHint: imageData.cropHint,
          language: currentLanguage,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Analysis request failed with status ${response.status}`);
      }

      const parsedReport: AgriShieldReport = await response.json();
      setReport(parsedReport);
      saveHistoryItem(parsedReport, imageData.base64, 'upload');
      setIsScanModalOpen(false);
      setCurrentView('result');
    } catch (err: any) {
      console.error('Crop analysis failure:', err);
      setError(
        err.message || 'Unable to complete crop disease assessment. Please verify connection or try another photo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Convert currentView to ActiveNavTab for Header
  const activeNavTab: ActiveNavTab =
    currentView === 'result' ? 'result' : currentView === 'chat' ? 'chat' : 'dashboard';

  // 1. LOGIN PAGE VIEW
  if (currentView === 'login') {
    return (
      <LandingLoginPage
        onLoginSuccess={handleAuthSuccess}
        onNavigateRegister={() => setCurrentView('register')}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  // 2. REGISTER PAGE VIEW
  if (currentView === 'register') {
    return (
      <RegisterPage
        onRegisterSuccess={handleAuthSuccess}
        onNavigateLogin={() => setCurrentView('login')}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  // 3. MAIN AUTHENTICATED/EXPLORATION APPLICATION SHELL
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top Application Header with Navigation Tabs */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenJsonViewer={() => setIsJsonViewerOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenChat={() => setCurrentView('chat')}
        currentUser={currentUser}
        onLogout={handleLogout}
        historyCount={history.length}
        hasActiveReport={!!report}
        activeView={activeNavTab}
        onNavigateView={(nav) => setCurrentView(nav)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Alert Bar */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-300 flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            <div className="flex-1 text-xs">
              <span className="font-bold block text-rose-200">Diagnosis Processing Error:</span>
              <span>{error}</span>
              <p className="mt-1 text-stone-400">
                You can also select any of the pre-loaded field test specimens to view accurate treatment, dosage calculations, and localized advisory.
              </p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-stone-400 hover:text-white text-xs underline font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* VIEW A: FARMER DASHBOARD */}
        {currentView === 'dashboard' && (
          <FarmerDashboard
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            onOpenScanCamera={() => {
              setScanModalInitialMode('camera');
              setIsScanModalOpen(true);
            }}
            onOpenScanBrowse={() => {
              setScanModalInitialMode('browse');
              setIsScanModalOpen(true);
            }}
            onSelectSampleCrop={handleSelectSample}
            onOpenChat={() => setCurrentView('chat')}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            recentScans={history}
            onSelectScan={(item) => {
              setReport(item.report);
              if (item.imageUrl) setActiveImage(item.imageUrl);
              setCurrentView('result');
            }}
          />
        )}

        {/* VIEW B: DIAGNOSIS & DISEASE RESULT VIEW */}
        {currentView === 'result' && report && (
          <div className="space-y-6">
            {/* 4-Phase Execution Pipeline Tracker */}
            <ExecutionPipelineStatus
              currentStage={report.analysis_metadata.infection_stage}
              cropDetected={report.cropName || report.analysis_metadata.crop_detected}
              severityPercentage={report.analysis_metadata.severity_percentage}
              isLoading={isLoading}
              currentLanguage={currentLanguage}
            />

            {/* Diagnostic Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Infection Visualizer & Severity Gauge (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <InfectionHeatmapVisualizer
                  imageSrc={activeImage}
                  severityPercentage={report.analysis_metadata.severity_percentage}
                  infectionStage={report.analysis_metadata.infection_stage}
                  cropName={report.cropName || report.analysis_metadata.crop_detected}
                  currentLanguage={currentLanguage}
                />

                <SeverityGauge
                  severityPercentage={report.analysis_metadata.severity_percentage}
                  infectionStage={report.analysis_metadata.infection_stage}
                  cropDetected={report.cropName || report.analysis_metadata.crop_detected}
                  currentLanguage={currentLanguage}
                />

                <MultilingualAdvisory
                  languages={report.languages}
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                  onOpenCalculator={() => setIsCalculatorOpen(true)}
                  infectionStage={report.analysis_metadata.infection_stage}
                />
              </div>

              {/* Right Column: Full Disease Result View with Treatment & Cost Estimation (7 cols) */}
              <div className="lg:col-span-7">
                <DiseaseResultView
                  report={report}
                  currentLanguage={currentLanguage}
                  onOpenChatWithContext={() => setCurrentView('chat')}
                  onBackToDashboard={() => setCurrentView('dashboard')}
                  userFarmSize={activeFarmAcres}
                />
              </div>
            </div>

            {/* Strict Schema Banner */}
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>
                  AgriShield Structured Output ready for agronomists, farm APIs, and localized drone sprayers.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('chat')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discuss with Kisan AI Doctor</span>
                </button>
                <button
                  onClick={() => setIsJsonViewerOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-300 font-semibold flex items-center gap-1.5 transition shrink-0"
                >
                  <span>View Strict JSON Payload</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW C: FARMER AI CHAT VIEW */}
        {currentView === 'chat' && (
          <FarmerAiChatView
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            activeScanReport={report}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-stone-800/80 bg-stone-950/90 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-stone-300">AgriShield AI</span>
            <span>• Integrated Plant Pathology & Vernacular Farm Advisory</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>English</span>
            <span>•</span>
            <span>తెలుగు (Telugu)</span>
            <span>•</span>
            <span>தமிழ் (Tamil)</span>
            <span>•</span>
            <span>हिन्दी (Hindi)</span>
          </div>
        </div>
      </footer>

      {/* Interactive Scan / Upload Modal */}
      <ScanUploadModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onAnalyze={handleAnalyzeUpload}
        currentLanguage={currentLanguage}
        initialMode={scanModalInitialMode}
        defaultFarmSize={activeFarmAcres}
      />

      {/* Knapsack Spray Tank & Acre Dosage Mixer Modal */}
      {report && (
        <>
          <SprayDosageCalculatorModal
            isOpen={isCalculatorOpen}
            onClose={() => setIsCalculatorOpen(false)}
            recommendedDosageText={
              (report.languages as any)?.[
                currentLanguage === 'te' || currentLanguage === 'telugu'
                  ? 'telugu'
                  : currentLanguage === 'hi' || currentLanguage === 'hindi'
                  ? 'hindi'
                  : currentLanguage === 'ta' || currentLanguage === 'tamil'
                  ? 'tamil'
                  : 'english'
              ]?.exact_dosage || report.languages?.english?.exact_dosage || ''
            }
            currentLanguage={currentLanguage}
          />

          <JsonReportModal
            isOpen={isJsonViewerOpen}
            onClose={() => setIsJsonViewerOpen(false)}
            report={report}
          />
        </>
      )}

      {/* Farmer Auth Modal (Login / Register fallback) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        currentLanguage={currentLanguage}
      />

      {/* Field Scan History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectScan={(item) => {
          setReport(item.report);
          if (item.imageUrl) setActiveImage(item.imageUrl);
          setCurrentView('result');
        }}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
