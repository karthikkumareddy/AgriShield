import React, { useState } from 'react';
import {
  X,
  Lock,
  Phone,
  User,
  MapPin,
  Sprout,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  Languages,
  Check,
} from 'lucide-react';
import { FarmerUser, INDIAN_AGRI_STATES, POPULAR_CROPS } from '../types/auth';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '../types/agrishield';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: FarmerUser, token?: string) => void;
  currentLanguage: SupportedLanguage;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  currentLanguage,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Login form state
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhoneOrEmail, setRegPhoneOrEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regState, setRegState] = useState(INDIAN_AGRI_STATES[0]);
  const [regDistrict, setRegDistrict] = useState('');
  const [regCrops, setRegCrops] = useState<string[]>(['Tomato', 'Cotton']);
  const [regLanguage, setRegLanguage] = useState<SupportedLanguage>(currentLanguage);

  if (!isOpen) return null;

  const toggleCrop = (cropName: string) => {
    const simpleName = cropName.split(' (')[0];
    if (regCrops.includes(simpleName)) {
      setRegCrops(regCrops.filter((c) => c !== simpleName));
    } else {
      setRegCrops([...regCrops, simpleName]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneOrEmail: loginPhoneOrEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          phoneOrEmail: regPhoneOrEmail,
          password: regPassword,
          state: regState,
          district: regDistrict,
          primaryCrops: regCrops,
          preferredLanguage: regLanguage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register account');
      }

      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/demo');
      const data = await res.json();
      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setErrorMessage('Could not load demo farmer profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
        {/* Top Decorative Banner with Agricultural Glow */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-br from-emerald-950 via-stone-900 to-green-950 p-6 flex items-end justify-between border-b border-stone-800 overflow-hidden">
          {/* Subtle Agrarian Grid & Light Beam Effect */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Heading */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Kisan Portal
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AgriShield <span className="text-emerald-400">Farmer Account</span>
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Secure crop protection logs, personalized advisories & chat history
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-stone-700/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950/70 p-1.5">
          <button
            onClick={() => {
              setTab('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              tab === 'login'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Farmer Sign In (లాగిన్ / உள்நுழைவு / लॉगिन)
          </button>
          <button
            onClick={() => {
              setTab('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              tab === 'register'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            New Farm Register (నమోదు / பதிவு / पंजीकरण)
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-400 hover:text-white ml-2 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Quick 1-Click Demo Farmer Banner */}
          <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-stone-900 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Quick 1-Click Demo Farmer</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">Instant</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Ramesh Reddy • Cotton, Tomato & Chilli • Telangana
                </p>
              </div>
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-xl transition shrink-0 flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Login as Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TAB 1: LOGIN */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Mobile Number or Farmer Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginPhoneOrEmail}
                    onChange={(e) => setLoginPhoneOrEmail(e.target.value)}
                    placeholder="e.g. 9876543210 or ramesh@agrishield.ai"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Farmer Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
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

              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-stone-700 bg-stone-950 text-emerald-500 focus:ring-0"
                  />
                  <span>Keep me signed in</span>
                </label>
                <span className="text-[11px] text-stone-500">Demo pwd: farmer@123</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enter AgriShield Portal</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* TAB 2: REGISTER */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Full Name / రైతు పేరు
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Mobile / Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={regPhoneOrEmail}
                      onChange={(e) => setRegPhoneOrEmail(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    State / రాష్ట్రం / மாநிலம் / राज्य
                  </label>
                  <div className="relative">
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    >
                      {INDIAN_AGRI_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Advisory Language
                  </label>
                  <select
                    value={regLanguage}
                    onChange={(e) => setRegLanguage(e.target.value as SupportedLanguage)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <option key={lang.key} value={lang.key}>
                        {lang.flagIcon} {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Primary Crops Multi-Select Tags */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Select Crops Grown (పండించే పంటలు)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-stone-950 rounded-xl border border-stone-800">
                  {POPULAR_CROPS.map((crop) => {
                    const simpleName = crop.split(' (')[0];
                    const isSelected = regCrops.includes(simpleName);
                    return (
                      <button
                        type="button"
                        key={crop}
                        onClick={() => toggleCrop(crop)}
                        className={`px-2.5 py-1 text-xs rounded-lg border transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        <span>{crop}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Create Farmer Profile</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Trust badges footer */}
          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-center gap-4 text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Free for Farmers
            </span>
            <span>•</span>
            <span>Vernacular Audio Advice</span>
            <span>•</span>
            <span>Offline History Cache</span>
          </div>
        </div>
      </div>
    </div>
  );
};
