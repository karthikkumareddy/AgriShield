import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  LanguageAdvisory,
  LANGUAGE_OPTIONS,
  InfectionStage,
} from '../types/agrishield';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';
import {
  Volume2,
  VolumeX,
  Share2,
  Check,
  Calculator,
  Shield,
  Sprout,
  AlertOctagon,
  Sparkles,
  Droplets,
  Layers,
} from 'lucide-react';

interface MultilingualAdvisoryProps {
  languages: {
    english: LanguageAdvisory;
    telugu: LanguageAdvisory;
    tamil: LanguageAdvisory;
    hindi: LanguageAdvisory;
  };
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenCalculator: () => void;
  infectionStage: InfectionStage;
}

export const MultilingualAdvisory: React.FC<MultilingualAdvisoryProps> = ({
  languages,
  currentLanguage,
  onLanguageChange,
  onOpenCalculator,
  infectionStage,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const langKey =
    langCode === 'te'
      ? 'telugu'
      : langCode === 'hi'
      ? 'hindi'
      : langCode === 'ta'
      ? 'tamil'
      : 'english';

  const activeAdvisory: LanguageAdvisory =
    (languages as any)[langKey] || (languages as any)[currentLanguage] || languages.english;

  const currentLangMeta =
    LANGUAGE_OPTIONS.find((l) => l.code === langCode || l.key === currentLanguage) ||
    LANGUAGE_OPTIONS[0];

  // Stop speech when language switches or component unmounts
  useEffect(() => {
    stopSpeech();
    return () => {
      stopSpeech();
    };
  }, [currentLanguage]);

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech audio is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      stopSpeech();
      return;
    }

    // Build spoken script in selected vernacular
    const textToSpeak = `${activeAdvisory.disease_name}. ${activeAdvisory.recommended_pesticide}. ${activeAdvisory.exact_dosage}. ${activeAdvisory.usage_instructions}. ${activeAdvisory.sustainability_mitigation_tip}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLangMeta.speechCode;
    utterance.rate = 0.95; // Slightly slower for clarity in agricultural terms
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) => v.lang === currentLangMeta.speechCode || v.lang.startsWith(currentLangMeta.speechCode.slice(0, 2))
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopyAdvisory = () => {
    const text = `🌱 AgriShield AI Diagnostic Advisory (${currentLangMeta.name} / ${currentLangMeta.nativeName})
Disease: ${activeAdvisory.disease_name}
Recommended Pesticide: ${activeAdvisory.recommended_pesticide}
Exact Dosage: ${activeAdvisory.exact_dosage}
Directions: ${activeAdvisory.usage_instructions}
Eco-Tip: ${activeAdvisory.sustainability_mitigation_tip}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Vernacular label titles for UI
  const uiLabels = {
    english: {
      disease: 'Diagnosed Disease Anomaly',
      pesticide: 'Recommended Crop Protection',
      dosage: 'Calibrated Application Dosage',
      usage: 'Application & Field Guidelines',
      eco: 'Eco-Mitigation & Sustainability Directive',
      listen: 'Read Aloud Audio',
      stop: 'Stop Audio',
      copy: 'Share Advisory',
      copied: 'Copied to Clipboard!',
      tankCalc: 'Spray Tank Mix Calculator',
    },
    telugu: {
      disease: 'గుర్తించిన తెగులు / రోగం',
      pesticide: 'సిఫార్సు చేసిన మందు / శిలీంద్రనాశిని',
      dosage: 'ఎకరాకు వాడాల్సిన కచ్చితమైన మోతాదు',
      usage: 'పిచికారీ చేసే విధానం & జాగ్రత్తలు',
      eco: 'సేంద్రీయ నివారణ & పర్యావరణ చిట్కా',
      listen: 'వాయిస్ వినండి (ఆడియో)',
      stop: 'ఆడియో ఆపండి',
      copy: 'సలహాను షేర్ చేయండి',
      copied: 'కాపీ చేయబడింది!',
      tankCalc: 'ట్యాంకు & ఎకరాల మోతాదు లెక్కింపు',
    },
    tamil: {
      disease: 'கண்டறியப்பட்ட நோய் வகை',
      pesticide: 'பரிந்துரைக்கப்பட்ட பூச்சிக்கொல்லி / மருந்து',
      dosage: 'பயன்படுத்த வேண்டிய துல்லியமான அளவு',
      usage: 'தெளிக்கும் முறை மற்றும் பாதுகாப்பு விதிகள்',
      eco: 'இயற்கை பூச்சி மேலாண்மை & சுற்றுச்சூழல் குறிப்பு',
      listen: 'குரல் விளக்கம் (ஆடியோ)',
      stop: 'நிறுத்து',
      copy: 'பகிர் / சேமி',
      copied: 'நகலெடுக்கப்பட்டது!',
      tankCalc: 'தெளிப்பான் தொட்டி கணக்கீடு',
    },
    hindi: {
      disease: 'पहचानी गई फसल की बीमारी',
      pesticide: 'अनुशंसित कीटनाशक / फफूंदनाशक',
      dosage: 'सटीक खुराक एवं पानी का अनुपात',
      usage: 'छिड़काव की विधि एवं आवश्यक सावधानियां',
      eco: 'जैविक रोकथाम एवं पर्यावरण मित्र उपाय',
      listen: 'आवाज़ में सुनें (ऑडियो)',
      stop: 'ऑडियो रोकें',
      copy: 'सलाह साझा करें',
      copied: 'कॉपी हो गया!',
      tankCalc: 'स्प्रे टैंक व एकड़ खुराक कैलकुलेटर',
    },
  }[langKey] || {
    disease: 'Identified Disease Name',
    pesticide: 'Recommended Pesticide / Fungicide',
    dosage: 'Exact Dosage & Spray Metric',
    usage: 'Application & Safety Directions',
    eco: 'Organic / Bio-Management Tip',
    listen: 'Listen (Audio)',
    stop: 'Stop Audio',
    copy: 'Share Advisory',
    copied: 'Copied to Clipboard!',
    tankCalc: 'Spray Tank Mix Calculator',
  };

  return (
    <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        {/* Vernacular Language Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multilingual Vernacular Advisory</span>
            </span>
            <div className="text-xs text-stone-400 mt-0.5">
              Advisory tailored for regional farmers in native agricultural terminology
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read-Out Button */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition shadow-sm ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-stone-700'
              }`}
              title="Listen to advisory in selected language"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{uiLabels.stop}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{uiLabels.listen}</span>
                </>
              )}
            </button>

            {/* Share / Copy Button */}
            <button
              onClick={handleCopyAdvisory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-xl transition"
              title="Copy advisory text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{uiLabels.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>{uiLabels.copy}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vernacular Tabs */}
        <div className="flex gap-1.5 mt-3 mb-4 overflow-x-auto pb-1">
          {LANGUAGE_OPTIONS.map((lang) => {
            const isActive = langCode === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-stone-950/80 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <span>{lang.flagIcon}</span>
                <span>{lang.nativeName}</span>
                <span className="text-[10px] font-normal opacity-70">({lang.name})</span>
              </button>
            );
          })}
        </div>

        {/* Advisory Cards Grid */}
        <div className="space-y-3.5">
          {/* 1. Disease Name Card */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span>{uiLabels.disease}</span>
            </span>
            <div className="text-base sm:text-lg font-extrabold text-white mt-1">
              {activeAdvisory.disease_name}
            </div>
          </div>

          {/* 2. Recommended Pesticide Card */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>{uiLabels.pesticide}</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                {infectionStage === 'Low'
                  ? 'Bio-Pesticide'
                  : infectionStage === 'Moderate'
                  ? 'Targeted Chemical'
                  : 'Emergency Curative'}
              </span>
            </div>
            <div className="text-sm sm:text-base font-bold text-stone-100 mt-1">
              {activeAdvisory.recommended_pesticide}
            </div>
          </div>

          {/* 3. Exact Dosage Card with Mixer Calculator CTA */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5" />
                <span>{uiLabels.dosage}</span>
              </span>
              <button
                onClick={onOpenCalculator}
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
              >
                <Calculator className="w-3 h-3" />
                <span>{uiLabels.tankCalc}</span>
              </button>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-amber-200/90 mt-1 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
              {activeAdvisory.exact_dosage}
            </div>
          </div>

          {/* 4. Usage Directions Card */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{uiLabels.usage}</span>
            </span>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {activeAdvisory.usage_instructions}
            </p>
          </div>

          {/* 5. Sustainability & Eco Mitigation Tip */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{uiLabels.eco}</span>
            </span>
            <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed">
              {activeAdvisory.sustainability_mitigation_tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
