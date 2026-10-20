import React, { useState } from 'react';
import {
  ShieldCheck,
  Sprout,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Leaf,
} from 'lucide-react';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '../types/agrishield';
import { FarmerUser } from '../types/auth';
import { TRANSLATIONS, getTranslations } from '../data/translations';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface LandingLoginPageProps {
  onLoginSuccess: (user: FarmerUser, token?: string) => void;
  onNavigateRegister: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({
  onLoginSuccess,
  onNavigateRegister,
  currentLanguage,
  onLanguageChange,
}) => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const t = getTranslations(langCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileOrEmail: mobileOrEmail.trim(),
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFarmer = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/auth/demo');
      const data = await response.json();
      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMessage('Could not load demo farmer profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Ambience with Agrarian Visual Identity */}
      <div className="absolute inset-0 bg-radial from-emerald-950/40 via-stone-950 to-stone-950 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar with Language Switcher */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-lg sm:text-xl text-white tracking-tight leading-none">
              AgriShield <span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-[11px] text-stone-400 font-medium">
              {t.app.tagline}
            </p>
          </div>
        </div>

        {/* Language selector toggle */}
        <div className="flex items-center bg-stone-900/90 p-1 rounded-2xl border border-stone-800 shadow-inner">
          <Globe className="w-3.5 h-3.5 text-stone-400 ml-2 mr-1 hidden sm:block" />
          <div className="flex gap-0.5">
            {LANGUAGE_OPTIONS.map((lang) => {
              const isActive = langCode === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-xl transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title={lang.name}
                >
                  <span className="mr-1">{lang.flagIcon}</span>
                  <span>{lang.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Column: Visual Brand Story & Farmer Guidance */}
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Kisan Assistant</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Protect Your Crops with <span className="text-emerald-400">Precision AI Diagnosis</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {t.auth.welcomeSubtitle}
          </p>

          {/* Simple Visual Step Guide for Farmers */}
          <div className="pt-2 grid grid-cols-3 gap-2.5 max-w-md mx-auto lg:mx-0 text-left">
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-lg">📷</span>
              <h4 className="font-bold text-xs text-white mt-1">1. Take Photo</h4>
              <p className="text-[10px] text-stone-400">Clear leaf snapshot</p>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-lg">🔍</span>
              <h4 className="font-bold text-xs text-white mt-1">2. AI Diagnosis</h4>
              <p className="text-[10px] text-stone-400">Identify disease</p>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-lg">🌾</span>
              <h4 className="font-bold text-xs text-white mt-1">3. Cure & Dose</h4>
              <p className="text-[10px] text-stone-400">Verified spray plan</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free for All Farmers</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Telugu • Hindi • Tamil • English</span>
            </span>
          </div>
        </div>

        {/* Right Column: Clean Farmer Login Card */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-5">
              <h3 className="text-xl font-black text-white">
                {t.auth.loginButton}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Enter your mobile number or email to access your farm portal
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1-Click Demo Farmer Shortcut for Quick Testing */}
            <div className="mb-5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {t.auth.demoLogin}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {t.auth.demoFarmerInfo}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoFarmer}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-xl transition shadow shrink-0"
              >
                1-Tap Login
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.mobileOrEmail}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={mobileOrEmail}
                    onChange={(e) => setMobileOrEmail(e.target.value)}
                    placeholder="e.g. 9876543210 or ramesh@agrishield.ai"
                    className="w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-300">
                    {t.auth.password}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    {t.auth.forgotPassword}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <span>{t.auth.loginButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Register Navigation Prompt */}
            <div className="mt-5 pt-4 border-t border-stone-800 text-center">
              <button
                type="button"
                onClick={onNavigateRegister}
                className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
              >
                {t.auth.newFarmerPrompt}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h4 className="font-bold text-base text-white">Reset Farmer Password</h4>
            <p className="text-xs text-stone-400">
              For demo and field testing, you can use the instant 1-Click Demo login, or use password: <strong className="text-emerald-400 font-mono">farmer@123</strong>.
            </p>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="relative z-10 border-t border-stone-900 py-4 text-center text-xs text-stone-500">
        <p>AgriShield AI • Digital Agricultural Technology for Every Indian Farmer</p>
      </footer>
    </div>
  );
};
