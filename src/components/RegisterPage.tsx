import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Sprout,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Globe,
} from 'lucide-react';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '../types/agrishield';
import { FarmerUser, INDIAN_AGRI_STATES, POPULAR_CROPS } from '../types/auth';
import { TRANSLATIONS, getTranslations } from '../data/translations';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface RegisterPageProps {
  onRegisterSuccess: (user: FarmerUser, token?: string) => void;
  onNavigateLogin: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigateLogin,
  currentLanguage,
  onLanguageChange,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(INDIAN_AGRI_STATES[0]);
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<SupportedLanguage>(currentLanguage);
  const [mainCrop, setMainCrop] = useState('Tomato');
  const [farmSize, setFarmSize] = useState('2.5');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const t = getTranslations(langCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage(t.auth.passwordMismatch);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          email: email.trim() || undefined,
          password,
          confirmPassword,
          state,
          district: district.trim(),
          village: village.trim(),
          preferredLanguage,
          mainCrop,
          farmSize: parseFloat(farmSize) || 1,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      onRegisterSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please check details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-radial from-emerald-950/40 via-stone-950 to-stone-950 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-4xl w-full mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onNavigateLogin}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.auth.backToLogin}</span>
        </button>

        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={langCode}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-stone-900 border border-stone-800 text-xs font-bold text-stone-200 rounded-xl px-2.5 py-1 focus:outline-none focus:border-emerald-500"
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flagIcon} {l.nativeName}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Registration Card Form */}
      <main className="relative z-10 max-w-2xl w-full mx-auto px-4 py-4 sm:py-6 flex-1 flex flex-col justify-center">
        <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-6 text-center sm:text-left flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 hidden sm:flex">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t.auth.registerButton}
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Create your personalized agricultural profile for tailored crop protection advice
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.fullName} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.mobileOrEmail} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. farmer@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.password} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.confirmPassword} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* State, District & Village */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.state} *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {INDIAN_AGRI_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.district} *
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Warangal"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.village} *
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Narsampet"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Main Crop & Farm Size & Preferred Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.mainCrop} *
                </label>
                <select
                  value={mainCrop}
                  onChange={(e) => setMainCrop(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {POPULAR_CROPS.map((c) => (
                    <option key={c} value={c.split(' (')[0]}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.farmSizeAcres} *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.1"
                  required
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  placeholder="e.g. 3.5"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {t.auth.preferredLanguage} *
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => {
                    const l = e.target.value as SupportedLanguage;
                    setPreferredLanguage(l);
                    onLanguageChange(l);
                  }}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {LANGUAGE_OPTIONS.map((l) => (
                    <option key={l.key} value={l.key}>
                      {l.flagIcon} {l.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isLoading ? (
                <span>Registering your farm...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.auth.registerButton}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-stone-800 text-center">
            <button
              type="button"
              onClick={onNavigateLogin}
              className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              {t.auth.alreadyRegisteredPrompt}
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-stone-900 py-4 text-center text-xs text-stone-500">
        <p>AgriShield AI • Free Plant Disease Doctor for Indian Farmers</p>
      </footer>
    </div>
  );
};
