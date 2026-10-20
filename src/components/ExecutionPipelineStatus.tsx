import React from 'react';
import { CheckCircle2, CircleDashed, ShieldAlert, Cpu, Sparkles, Languages, Gauge } from 'lucide-react';
import { InfectionStage, SupportedLanguage } from '../types/agrishield';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface ExecutionPipelineStatusProps {
  currentStage: InfectionStage | null;
  cropDetected?: string;
  severityPercentage?: number;
  isLoading: boolean;
  currentLanguage?: SupportedLanguage;
}

export const ExecutionPipelineStatus: React.FC<ExecutionPipelineStatusProps> = ({
  currentStage,
  cropDetected,
  severityPercentage,
  isLoading,
  currentLanguage = 'en',
}) => {
  const lang: LanguageCode = normalizeLanguageCode(currentLanguage);

  const localizedLabels = {
    en: {
      pipeline: 'AgriShield 4-Phase AI Execution Pipeline',
      liveReady: 'AI Core Online',
      step1: '1. Crop & Anomaly Isolation',
      step1Desc: cropDetected || 'Plant variety & lesion isolated',
      step2: '2. Severity Assessment %',
      step2Desc: severityPercentage !== undefined ? `${severityPercentage.toFixed(1)}% Surface Coverage` : 'Area % calculation',
      step3: '3. Protocol Categorization',
      step3Desc: currentStage
        ? `${currentStage} (${
            currentStage === 'Low'
              ? '<15% Bio-Organic'
              : currentStage === 'Moderate'
              ? '15-40% Chemical'
              : '>40% Curative'
          })`
        : 'Rule-based categorization',
      step4: '4. Localized Vernacular Advisory',
      step4Desc: '100% Locked Regional Language',
    },
    te: {
      pipeline: 'అగ్రిషీల్డ్ 4-దశల AI విశ్లేషణ వ్యవస్థ',
      liveReady: 'AI వ్యవస్థ సిద్ధంగా ఉంది',
      step1: '1. పంట & తెగులు గుర్తింపు',
      step1Desc: cropDetected || 'పంట రకం & తెగులు గుర్తించబడింది',
      step2: '2. తీవ్రత శాతం లెక్కింపు',
      step2Desc: severityPercentage !== undefined ? `${severityPercentage.toFixed(1)}% ఆకుల విస్తీర్ణం` : 'శాతం లెక్కింపు',
      step3: '3. నివారణ వర్గీకరణ',
      step3Desc: currentStage
        ? `${currentStage === 'Low' ? 'తక్కువ (<15% సేంద్రీయ)' : currentStage === 'Moderate' ? 'మధ్యస్థం (15-40% రసాయన)' : 'తీవ్రం (>40% అత్యవసర)'}`
        : 'నిబంధనల ఆధారిత వర్గీకరణ',
      step4: '4. పూర్తి తెలుగు వ్యవసాయ సలహా',
      step4Desc: '100% తెలుగులో మాత్రమే సూచనలు',
    },
    hi: {
      pipeline: 'एग्रीशील्ड 4-चरणीय AI विश्लेषण प्रणाली',
      liveReady: 'AI सिस्टम सक्रिय है',
      step1: '1. फसल एवं रोग पहचान',
      step1Desc: cropDetected || 'फसल किस्म एवं रोग की पहचान',
      step2: '2. गंभीरता प्रतिशत गणना',
      step2Desc: severityPercentage !== undefined ? `${severityPercentage.toFixed(1)}% पत्ती क्षेत्रफल` : 'क्षेत्रफल प्रतिशत गणना',
      step3: '3. उपचार वर्गीकरण',
      step3Desc: currentStage
        ? `${currentStage === 'Low' ? 'कम (<15% जैविक)' : currentStage === 'Moderate' ? 'मध्यम (15-40% रासायनिक)' : 'गंभीर (>40% आपातकालीन)'}`
        : 'मानक उपचार वर्गीकरण',
      step4: '4. संपूर्ण हिंदी कृषि परामर्श',
      step4Desc: '100% शुद्ध हिंदी भाषा में जानकारी',
    },
    ta: {
      pipeline: 'அக்ரிஷீல்ட் 4-படிநிலை AI ஆய்வு முறை',
      liveReady: 'AI அமைப்பு தயார்',
      step1: '1. பயிர் மற்றும் நோய் கண்டறிதல்',
      step1Desc: cropDetected || 'பயிர் வகை & நோய் பகுப்பாய்வு',
      step2: '2. தீவிர அளவு % கணக்கீடு',
      step2Desc: severityPercentage !== undefined ? `${severityPercentage.toFixed(1)}% இலைப்பரப்பு` : 'பரப்பளவு % கணக்கீடு',
      step3: '3. சிகிச்சை வகைப்பாடு',
      step3Desc: currentStage
        ? `${currentStage === 'Low' ? 'குறைந்தது (<15% இயற்கை)' : currentStage === 'Moderate' ? 'மிதமானது (15-40% ரசாயனம்)' : 'அதிகமானது (>40% அவசரம்)'}`
        : 'பரிந்துரைக்கப்பட்ட வகைப்பாடு',
      step4: '4. முழுமையான தமிழ் வேளாண் ஆலோசனை',
      step4Desc: '100% தமிழ் மொழியில் மட்டுமே தகவல்',
    },
  }[lang];

  const steps = [
    {
      num: 1,
      title: localizedLabels.step1,
      desc: localizedLabels.step1Desc,
      status: cropDetected ? 'complete' : isLoading ? 'active' : 'idle',
      icon: Cpu,
    },
    {
      num: 2,
      title: localizedLabels.step2,
      desc: localizedLabels.step2Desc,
      status: severityPercentage !== undefined ? 'complete' : isLoading ? 'active' : 'idle',
      icon: Gauge,
    },
    {
      num: 3,
      title: localizedLabels.step3,
      desc: localizedLabels.step3Desc,
      status: currentStage ? 'complete' : isLoading ? 'active' : 'idle',
      icon: ShieldAlert,
    },
    {
      num: 4,
      title: localizedLabels.step4,
      desc: localizedLabels.step4Desc,
      status: currentStage ? 'complete' : isLoading ? 'active' : 'idle',
      icon: Languages,
    },
  ];

  return (
    <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{localizedLabels.pipeline}</span>
        </span>
        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          {localizedLabels.liveReady}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';

          return (
            <div
              key={step.num}
              className={`p-3 rounded-xl border transition-all ${
                isComplete
                  ? 'bg-stone-950/80 border-emerald-500/40'
                  : isActive
                  ? 'bg-emerald-950/20 border-emerald-500 animate-pulse'
                  : 'bg-stone-950/40 border-stone-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isComplete ? 'text-emerald-400' : isActive ? 'text-emerald-300' : 'text-stone-500'
                    }`}
                  />
                  <span className="text-xs font-bold text-white truncate">{step.title}</span>
                </div>
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isActive ? (
                  <CircleDashed className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-stone-700 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-stone-400 truncate">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
