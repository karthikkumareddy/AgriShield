import React from 'react';
import { InfectionStage, SupportedLanguage } from '../types/agrishield';
import { AlertTriangle, CheckCircle2, ShieldAlert, Activity, Leaf, Bug } from 'lucide-react';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface SeverityGaugeProps {
  severityPercentage: number;
  infectionStage: InfectionStage;
  cropDetected: string;
  currentLanguage?: SupportedLanguage;
}

export const SeverityGauge: React.FC<SeverityGaugeProps> = ({
  severityPercentage,
  infectionStage,
  cropDetected,
  currentLanguage = 'en',
}) => {
  const lang: LanguageCode = normalizeLanguageCode(currentLanguage);

  // Clamped severity
  const clampedSeverity = Math.min(100, Math.max(0, severityPercentage));

  const localizedConfig = {
    en: {
      header: 'Identified Specimen',
      coverage: 'Infection Surface Coverage',
      Low: {
        stageBadge: 'Low Stage',
        label: 'Low Severity (<15%)',
        protocol: 'Organic & Preventive Bio-Pesticide Protocol',
        subtext: 'Surface infection is confined to localized pinpoint spots. High economic yield preservation potential.',
      },
      Moderate: {
        stageBadge: 'Moderate Stage',
        label: 'Moderate Severity (15% - 40%)',
        protocol: 'Standard Targeted Chemical Pesticide Protocol',
        subtext: 'Infection actively spreading across foliage. Immediate calibrated intervention required.',
      },
      Severe: {
        stageBadge: 'Severe Stage',
        label: 'Severe Severity (>40%)',
        protocol: 'Emergency Strong Curative Spray & Quarantine',
        subtext: 'Extensive cellular necrosis exceeding threshold. High risk of field-wide crop loss.',
      },
    },
    te: {
      header: 'గుర్తించిన పంట నమూనా',
      coverage: 'ఆకులపై తెగులు వ్యాపించిన విస్తీర్ణం',
      Low: {
        stageBadge: 'తక్కువ దశ',
        label: 'తక్కువ తీవ్రత (<15%)',
        protocol: 'సేంద్రీయ & జీవ నియంత్రణ విధానం',
        subtext: 'తెగులు ప్రారంభ దశలో కొన్ని ఆకులకే పరిమితమై ఉంది. సేంద్రీయ పద్ధతుల ద్వారా పంటను సురక్షితంగా కాపాడవచ్చు.',
      },
      Moderate: {
        stageBadge: 'మధ్యస్థ దశ',
        label: 'మధ్యస్థ తీవ్రత (15% - 40%)',
        protocol: 'ప్రామాణిక లక్ష్య రసాయనిక నివారణ విధానం',
        subtext: 'తెగులు ఆకులపై వేగంగా వ్యాపిస్తోంది. తక్షణమే సిఫార్సు చేసిన మందు పిచికారీ చేయాలి.',
      },
      Severe: {
        stageBadge: 'తీవ్ర దశ',
        label: 'అధిక తీవ్రత (>40%)',
        protocol: 'అత్యవసర చికిత్స & క్వారంటైన్ రక్షణ',
        subtext: 'ఆకులు, కొమ్మలు తీవ్రంగా దెబ్బతిన్నాయి. పంట నష్టాన్ని నివారించడానికి తక్షణ అత్యవసర చర్యలు అవసరం.',
      },
    },
    hi: {
      header: 'पहचाना गया फसल नमूना',
      coverage: 'संक्रमण प्रभावित पत्ती क्षेत्रफल',
      Low: {
        stageBadge: 'प्रारंभिक अवस्था',
        label: 'कम गंभीरता (<15%)',
        protocol: 'जैविक एवं निवारक उपचार पद्धति',
        subtext: 'रोग अभी प्रारंभिक अवस्था में है। जैविक व नीम दवाओं से फसल सुरक्षित रहेगी।',
      },
      Moderate: {
        stageBadge: 'मध्यम अवस्था',
        label: 'मध्यम गंभीरता (15% - 40%)',
        protocol: 'मानक रासायनिक कवकनाशी उपचार',
        subtext: 'रोग पत्तियों पर तेजी से फैल रहा है। तुरंत अनुशंसित दवा का छिड़काव करें।',
      },
      Severe: {
        stageBadge: 'गंभीर अवस्था',
        label: 'अत्यधिक गंभीरता (>40%)',
        protocol: 'आपातकालीन उपचारात्मक छिड़काव एवं बचाव',
        subtext: 'पत्तियां और तने गंभीर रूप से झुलस रहे हैं। फसल बचाने हेतु तुरंत दवा डालें।',
      },
    },
    ta: {
      header: 'கண்டறியப்பட்ட பயிர் மாதிரி',
      coverage: 'நோய் தாக்கிய இலைப்பரப்பு அளவு',
      Low: {
        stageBadge: 'ஆரம்ப நிலை',
        label: 'குறைந்த தீவிரம் (<15%)',
        protocol: 'இயற்கை மற்றும் தடுப்பு முறை',
        subtext: 'நோய் ஆரம்ப நிலையில் சில இலைகளில் மட்டுமே உள்ளது. இயற்கை மருந்துகளே போதுமானது.',
      },
      Moderate: {
        stageBadge: 'மிதமான நிலை',
        label: 'மிதமான தீவிரம் (15% - 40%)',
        protocol: 'பரிந்துரைக்கப்பட்ட ரசாயன மருந்து முறை',
        subtext: 'நோய் இலைகளில் வேகமாக பரவுகிறது. உடனடியாக மருந்து தெளிப்பது அவசியம்.',
      },
      Severe: {
        stageBadge: 'தீவிர நிலை',
        label: 'அதிக தீவிரம் (>40%)',
        protocol: 'அவசர சிகிச்சை மற்றும் தனிமைப்படுத்துதல்',
        subtext: 'இலைகள், தண்டுகள் தீவிரமாக கருகுகின்றன. உடனடி அவசர சிகிச்சை தேவை.',
      },
    },
  }[lang];

  const currentStageText = localizedConfig[infectionStage];

  const styling = {
    Low: {
      icon: CheckCircle2,
      badgeClass: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-400',
      gradientClass: 'from-emerald-500 to-green-500',
      strokeColor: '#10b981',
    },
    Moderate: {
      icon: AlertTriangle,
      badgeClass: 'bg-amber-950/70 border-amber-500/40 text-amber-400',
      gradientClass: 'from-amber-500 to-orange-500',
      strokeColor: '#f59e0b',
    },
    Severe: {
      icon: ShieldAlert,
      badgeClass: 'bg-rose-950/70 border-rose-500/40 text-rose-400',
      gradientClass: 'from-rose-500 to-red-600',
      strokeColor: '#f43f5e',
    },
  }[infectionStage];

  const IconComponent = styling.icon;

  // Arc calculation for gauge (180 degree semi-circle)
  const radius = 80;
  const circumference = Math.PI * radius; // half circle = 251.3
  const strokeDashoffset = circumference - (clampedSeverity / 100) * circumference;

  return (
    <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        {/* Crop Detected Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 uppercase tracking-wider font-semibold">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>{localizedConfig.header}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {cropDetected}
            </h3>
          </div>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 shadow-sm ${styling.badgeClass}`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{currentStageText.stageBadge}</span>
          </span>
        </div>

        {/* Severity Dial Graphic */}
        <div className="py-2 flex flex-col items-center">
          <div className="relative w-52 h-28 flex items-end justify-center overflow-hidden">
            <svg className="w-52 h-52 transform -rotate-180" viewBox="0 0 200 200">
              {/* Background Arc */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#292524"
                strokeWidth="18"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              {/* Filled Severity Arc */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={styling.strokeColor}
                strokeWidth="18"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Center Severity Readout */}
            <div className="absolute bottom-1 flex flex-col items-center text-center">
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline">
                {severityPercentage.toFixed(1)}
                <span className="text-lg font-bold text-stone-400 ml-0.5">%</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-stone-400 -mt-0.5">
                {localizedConfig.coverage}
              </span>
            </div>
          </div>
        </div>

        {/* Severity Tier Card */}
        <div className="mt-3 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
          <div className="flex items-center gap-2 mb-1">
            <IconComponent
              className={`w-4 h-4 ${
                infectionStage === 'Severe'
                  ? 'text-rose-400'
                  : infectionStage === 'Moderate'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            />
            <h4 className="text-xs sm:text-sm font-black text-white">
              {currentStageText.label}
            </h4>
          </div>

          <p className="text-xs text-stone-200 font-semibold mb-1">
            {currentStageText.protocol}
          </p>

          <p className="text-[11px] text-stone-400 leading-relaxed">
            {currentStageText.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};
