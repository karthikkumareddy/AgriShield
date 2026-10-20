export type InfectionStage = 'Low' | 'Moderate' | 'Severe';
export type SeverityLevel = 'Low' | 'Medium' | 'High';
export type LanguageCode = 'en' | 'te' | 'hi' | 'ta';
export type SupportedLanguage = LanguageCode | 'english' | 'telugu' | 'tamil' | 'hindi';

export interface LanguageAdvisory {
  disease_name: string;
  recommended_pesticide: string;
  exact_dosage: string;
  usage_instructions: string;
  sustainability_mitigation_tip: string;
}

export interface VerifiedPesticideInfo {
  productName: string;
  activeIngredient: string;
  formulation: string;
  recommendedDosage: string;
  waterQuantity: string;
  unitQuantityPerAcre: number; // e.g. 500
  unit: string; // 'g' or 'ml'
  applicationMethod: string;
  applicationFrequency: string;
  preHarvestIntervalDays: number;
  safetyPrecautions: string[];
  source: string;
  dateChecked: string;
}

export interface CropCostEstimation {
  productCostPerAcre: number | null; // null if local price unavailable
  laborCostPerAcre: number;
  otherCostPerAcre: number;
}

export interface CropTreatmentPlan {
  immediateAction: string[];
  culturalPractices: string[];
  organicControl: string[];
  chemicalControl: string[];
  prevention: string[];
}

export interface AgriShieldReport {
  // Structured ML model prediction format
  cropName: string;
  diseaseName: string;
  confidence: number; // e.g. 92
  isLowConfidence?: boolean;
  symptoms: string[];
  severity: SeverityLevel;
  severityExplanation: string;
  whatIsHappening: string;
  treatment: CropTreatmentPlan;
  prevention: string[];
  pesticideInformation?: VerifiedPesticideInfo;
  organicControl: string[];
  estimatedCost: CropCostEstimation;
  warning?: string;
  sources: string[];

  // Legacy & Multilingual compatibility container
  analysis_metadata: {
    crop_detected: string;
    severity_percentage: number;
    infection_stage: InfectionStage;
  };
  languages: {
    english: LanguageAdvisory;
    telugu: LanguageAdvisory;
    tamil: LanguageAdvisory;
    hindi: LanguageAdvisory;
  };
}

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  report: AgriShieldReport;
  imageUrl?: string;
  source: 'upload' | 'camera' | 'sample';
}

export interface LanguageMeta {
  key: LanguageCode;
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  speechCode: string;
  flagIcon: string;
}

export const LANGUAGE_OPTIONS: LanguageMeta[] = [
  {
    key: 'en',
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    speechCode: 'en-IN',
    flagIcon: '🇮🇳',
  },
  {
    key: 'te',
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    speechCode: 'te-IN',
    flagIcon: '🇮🇳',
  },
  {
    key: 'hi',
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    script: 'Devanagari',
    speechCode: 'hi-IN',
    flagIcon: '🇮🇳',
  },
  {
    key: 'ta',
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    speechCode: 'ta-IN',
    flagIcon: '🇮🇳',
  },
];
