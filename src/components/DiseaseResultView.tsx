import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Calculator,
  MessageSquare,
  Sprout,
  Droplets,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Calendar,
  DollarSign,
  Share2,
  Check,
  Activity,
  Beaker,
  Info,
} from 'lucide-react';
import { AgriShieldReport, SupportedLanguage } from '../types/agrishield';
import { getTranslations } from '../data/translations';
import { localizeReport, FullyLocalizedReport } from '../utils/localizeReport';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface DiseaseResultViewProps {
  report: AgriShieldReport;
  currentLanguage: SupportedLanguage;
  onOpenChatWithContext: () => void;
  onBackToDashboard: () => void;
  userFarmSize?: number;
}

const UI_TEXT: Record<
  LanguageCode,
  {
    backToDashboard: string;
    shareReport: string;
    copied: string;
    interventionGuide: string;
    interventionSubtitle: string;
    purposeAction: string;
    perAcre: string;
    tanksOf16L: string;
    waitingPeriod: string;
    doNotHarvestPHI: string;
    source: string;
    formula: string;
    totalProduct: string;
    totalWater: string;
    farmLogistics: string;
    farmLogisticsSubtitle: string;
    totalSprayVolume: string;
    basedOnVerified: string;
    knapsackMixingRatio: string;
    knapsackSubtitle: string;
    sprayerCapacity: string;
    litres: string;
    tankConcentration: string;
    perLitreWater: string;
    medicinePerTank: string;
    waterPerTank: string;
    cleanWater: string;
    approxTotalTanks: string;
    tanks: string;
    financialPlanning: string;
    costSubtitle: string;
    adjustMarketRate: string;
    manualInputNeeded: string;
    calculatedAfterPrice: string;
    knapsackSprayLabor: string;
    waterSurfactantOther: string;
    farmResilience: string;
    tip: string;
    askDoctorContext: string;
    chatWithDoctor: string;
  }
> = {
  en: {
    backToDashboard: '← Back to Dashboard',
    shareReport: 'Share Report',
    copied: 'Copied!',
    interventionGuide: 'Farm Intervention Guide',
    interventionSubtitle: 'Follow verified cultural, bio-organic, and registered chemical management options below.',
    purposeAction: 'Purpose / Action',
    perAcre: 'per acre',
    tanksOf16L: 'tanks of 16L',
    waitingPeriod: 'Days Waiting Period (PHI)',
    doNotHarvestPHI: 'Do not harvest crops during waiting period',
    source: 'Source',
    formula: 'Formula:',
    totalProduct: 'Total Product',
    totalWater: 'Total Water',
    farmLogistics: 'Farm Logistics & Requirement',
    farmLogisticsSubtitle: 'Enter your exact acreage to calculate verified product and water requirements.',
    totalSprayVolume: 'Total Spray Water Volume',
    basedOnVerified: 'Based on verified recommendations',
    knapsackMixingRatio: 'Knapsack Mixing Ratio',
    knapsackSubtitle: 'Calculate exact medicine powder/liquid to add per spray tank so you never over-dose or under-dose.',
    sprayerCapacity: 'Sprayer Tank Capacity (Litres):',
    litres: 'Litres',
    tankConcentration: 'Tank Concentration:',
    perLitreWater: 'per 1 Litre of clean water',
    medicinePerTank: 'Medicine Per Tank',
    waterPerTank: 'Water Per Tank',
    cleanWater: 'Clean well/tap water (free of silt)',
    approxTotalTanks: 'Approximate Total Tanks',
    tanks: 'Tanks',
    financialPlanning: 'Treatment Cost Planning',
    costSubtitle: 'Transparent estimated cost calculation for your acreage.',
    adjustMarketRate: 'You can adjust product price to match your local market rate',
    manualInputNeeded: 'Manual input needed',
    calculatedAfterPrice: 'Calculated after price',
    knapsackSprayLabor: 'Knapsack spray labor',
    waterSurfactantOther: 'Water transport & spreader sticker',
    farmResilience: 'Farm Resilience & Long-term Care',
    tip: 'Tip',
    askDoctorContext: 'Ask Kisan Mitra AI doctor with your crop and farm context already loaded.',
    chatWithDoctor: 'Chat with Kisan Doctor',
  },
  te: {
    backToDashboard: '← రైతు డ్యాష్‌బోర్డ్‌కి తిరిగి వెళ్ళండి',
    shareReport: 'సలహాను పంచుకోండి',
    copied: 'కాపీ చేయబడింది!',
    interventionGuide: 'రైతు కోసం నివారణ మరియు నిర్వహణ సూచనలు',
    interventionSubtitle: 'ధృవీకరించబడిన సాగు పద్ధతులు, జీవ సేంద్రీయ నివారణ మరియు రసాయన మందుల సూచనలను పాటించండి.',
    purposeAction: 'ఉపయోగం / పనిచేసే విధానం',
    perAcre: 'ఎకరాకు',
    tanksOf16L: '16 లీటర్ల ట్యాంకులు',
    waitingPeriod: 'రోజుల నిరీక్షణ సమయం (కోతకు ముందు)',
    doNotHarvestPHI: 'ఈ నిరీక్షణ సమయంలో పంటను కోయకూడదు',
    source: 'పరిశోధనా సంస్థ / మూలం',
    formula: 'సూత్రం:',
    totalProduct: 'మొత్తం మందు',
    totalWater: 'మొత్తం నీరు',
    farmLogistics: 'పొలం విస్తీర్ణం - మందు లెక్కింపు',
    farmLogisticsSubtitle: 'మీ పొలం ఎకరాల విస్తీర్ణం నమోదు చేసి అవసరమైన మొత్తం మందు మరియు నీటిని లెక్కించండి.',
    totalSprayVolume: 'మొత్తం స్ప్రే నీటి పరిమాణం',
    basedOnVerified: 'ధృవీకరించిన వ్యవసాయ పరిశోధన ప్రకారం',
    knapsackMixingRatio: 'నాప్‌సాక్ ట్యాంక్ కలపడం',
    knapsackSubtitle: 'మందు ఎక్కువ లేదా తక్కువ కాకుండా ప్రతి స్ప్రే ట్యాంక్‌కు ఎంత మందు కలపాలో ఖచ్చితంగా తెలుసుకోండి.',
    sprayerCapacity: 'స్ప్రే ట్యాంక్ సామర్థ్యం (లీటర్లు):',
    litres: 'లీటర్లు',
    tankConcentration: 'ట్యాంక్ సాంద్రత:',
    perLitreWater: 'ప్రతి 1 లీటరు స్వచ్ఛమైన నీటికి',
    medicinePerTank: 'ప్రతి ట్యాంకుకు మందు',
    waterPerTank: 'ప్రతి ట్యాంకుకు నీరు',
    cleanWater: 'బురద లేని స్వచ్ఛమైన బావి లేదా బోరు నీరు',
    approxTotalTanks: 'సుమారు అవసరమయ్యే ట్యాంకులు',
    tanks: 'ట్యాంకులు',
    financialPlanning: 'చికిత్స ఖర్చు అంచనా',
    costSubtitle: 'మీ పొలం విస్తీర్ణానికి అయ్యే ఖర్చు యొక్క పారదర్శక అంచనా.',
    adjustMarketRate: 'మీ స్థానిక దుకాణ ధర ప్రకారం మందు ధరను మార్చుకోవచ్చు',
    manualInputNeeded: 'ధర నమోదు అవసరం',
    calculatedAfterPrice: 'ధర ఆధారంగా లెక్కింపు',
    knapsackSprayLabor: 'కూలీల పిచికారీ ఖర్చు',
    waterSurfactantOther: 'నీటి రవాణా మరియు జిగురు/స్ప్రెడర్',
    farmResilience: 'దీర్ఘకాలిక పంట సంరక్షణ సూచనలు',
    tip: 'సూచన',
    askDoctorContext: 'మీ పంట మరియు పొలం వివరాలతో కూడిన కిసాన్ మిత్ర AI వైద్యుడిని అడగండి.',
    chatWithDoctor: 'రైతు AI డాక్టర్‌తో మాట్లాడండి',
  },
  hi: {
    backToDashboard: '← किसान डैशबोर्ड पर वापस जाएं',
    shareReport: 'रिपोर्ट शेयर करें',
    copied: 'कॉपी हो गया!',
    interventionGuide: 'किसान के लिए निवारण एवं प्रबंधन निर्देश',
    interventionSubtitle: 'सत्यापित सस्य विधियों, जैविक उपचार और अनुशंसित दवाओं के निर्देशों का पालन करें।',
    purposeAction: 'उद्देश्य / कार्य प्रणाली',
    perAcre: 'प्रति एकड़',
    tanksOf16L: '16 लीटर के टैंक',
    waitingPeriod: 'दिन प्रतीक्षा अवधि (तुड़ाई से पहले)',
    doNotHarvestPHI: 'इस प्रतीक्षा अवधि के दौरान फसल न काटें',
    source: 'अनुसंधान संस्थान / स्रोत',
    formula: 'सूत्र:',
    totalProduct: 'कुल दवा',
    totalWater: 'कुल पानी',
    farmLogistics: 'खेत का आकार - दवा की सटीक गणना',
    farmLogisticsSubtitle: 'अपने खेत का सटीक एकड़ दर्ज करके कुल दवा और पानी की मात्रा जानें।',
    totalSprayVolume: 'कुल आवश्यक पानी की मात्रा',
    basedOnVerified: 'सत्यापित कृषि अनुसंधान के अनुसार',
    knapsackMixingRatio: 'स्प्रे टैंक मिश्रण गणना',
    knapsackSubtitle: 'प्रत्येक स्प्रे टैंक में मिलाई जाने वाली सटीक दवा जानें ताकि दवा कम या ज्यादा न हो।',
    sprayerCapacity: 'स्प्रे टैंक क्षमता (लीटर):',
    litres: 'लीटर',
    tankConcentration: 'टैंक में दवा अनुपात:',
    perLitreWater: 'प्रति 1 लीटर साफ पानी में',
    medicinePerTank: 'प्रति टैंक दवा की मात्रा',
    waterPerTank: 'प्रति टैंक पानी',
    cleanWater: 'साफ कुएं या नल का पानी',
    approxTotalTanks: 'कुल अनुमानित टैंक',
    tanks: 'टैंक',
    financialPlanning: 'अनुमानित उपचार लागत',
    costSubtitle: 'आपके खेत के रकबे के लिए पारदर्शी उपचार खर्च का अनुमान।',
    adjustMarketRate: 'आप अपनी स्थानीय बाजार दर के अनुसार दवा की कीमत बदल सकते हैं',
    manualInputNeeded: 'मूल्य दर्ज करना आवश्यक',
    calculatedAfterPrice: 'मूल्य के अनुसार गणना',
    knapsackSprayLabor: 'छिड़काव मजदूरी',
    waterSurfactantOther: 'पानी ढुलाई और स्प्रेडर स्टीकर',
    farmResilience: 'दीर्घकालिक फसल स्वास्थ्य उपाय',
    tip: 'उपाय',
    askDoctorContext: 'अपनी फसल और खेत के विवरण के साथ किसान मित्र AI डॉक्टर से सीधे पूछें।',
    chatWithDoctor: 'किसान डॉक्टर से बातचीत करें',
  },
  ta: {
    backToDashboard: '← விவசாயி டாஷ்போர்டுக்கு திரும்புக',
    shareReport: 'அறிக்கையைப் பகிரவும்',
    copied: 'நகலெடுக்கப்பட்டது!',
    interventionGuide: 'விவசாயிக்கான தடுப்பு மற்றும் மேலாண்மை வழிகாட்டி',
    interventionSubtitle: 'சரிபார்க்கப்பட்ட சாகுபடி முறைகள், இயற்கை மருந்துகள் மற்றும் பரிந்துரைக்கப்பட்ட ரசாயன வழிமுறைகளை பின்பற்றவும்.',
    purposeAction: 'பயன்பாடு / செயல்படும் முறை',
    perAcre: 'ஏக்கருக்கு',
    tanksOf16L: '16 லிட்டர் தொட்டிகள்',
    waitingPeriod: 'நாட்கள் அறுவடை இடைவெளி (PHI)',
    doNotHarvestPHI: 'இந்த காத்திருப்பு நாட்களில் பயிரை அறுவடை செய்ய வேண்டாம்',
    source: 'ஆராய்ச்சி நிறுவனம் / ஆதாரம்',
    formula: 'சூத்திரம்:',
    totalProduct: 'மொத்த மருந்து',
    totalWater: 'மொத்த நீர்',
    farmLogistics: 'பண்ணை பரப்பளவு - மருந்து கணக்கீடு',
    farmLogisticsSubtitle: 'உங்கள் ஏக்கர் பரப்பளவை உள்ளிட்டு தேவையான மருந்து மற்றும் நீரின் அளவை கணக்கிடவும்.',
    totalSprayVolume: 'மொத்த தெளிப்பு நீர் அளவு',
    basedOnVerified: 'சரிபார்க்கப்பட்ட வேளாண் பரிந்துரையின்படி',
    knapsackMixingRatio: 'தெளிப்பான் தொட்டி கணக்கீடு',
    knapsackSubtitle: 'ஒவ்வொரு தெளிப்பான் தொட்டியிலும் சேர்க்க வேண்டிய துல்லியமான மருந்தை கணக்கிடுங்கள்.',
    sprayerCapacity: 'தெளிப்பான் தொட்டி கொள்ளளவு (லிட்டர்):',
    litres: 'லிட்டர்',
    tankConcentration: 'தொட்டி செறிவு:',
    perLitreWater: 'ஒரு லிட்டர் சுத்தமான தண்ணீருக்கு',
    medicinePerTank: 'ஒரு தொட்டிக்கான மருந்து',
    waterPerTank: 'ஒரு தொட்டிக்கான தண்ணீர்',
    cleanWater: 'சேறு இல்லாத சுத்தமான கிணற்று நீர்',
    approxTotalTanks: 'தோராயமான மொத்த தொட்டிகள்',
    tanks: 'தொட்டிகள்',
    financialPlanning: 'மதிப்பிடப்பட்ட சிகிச்சை செலவு',
    costSubtitle: 'உங்கள் பண்ணைக்கான வெளிப்படையான சிகிச்சை செலவு கணக்கீடு.',
    adjustMarketRate: 'உங்கள் உள்ளூர் கடை விலைக்கு ஏற்ப மருந்து விலையை மாற்றலாம்',
    manualInputNeeded: 'விலை உள்ளீடு தேவை',
    calculatedAfterPrice: 'விலை அடிப்படையில் கணக்கிடப்பட்டது',
    knapsackSprayLabor: 'தெளிப்பு கூலி',
    waterSurfactantOther: 'நீர் போக்குவரத்து மற்றும் ஒட்டும் திரவம்',
    farmResilience: 'நீண்டகால பயிர் ஆரோக்கியம்',
    tip: 'குறிப்பு',
    askDoctorContext: 'உங்கள் பயிர் விவரங்களுடன் கிசான் மித்ரா AI மருத்துவரிடம் நேரடியாக கேளுங்கள்.',
    chatWithDoctor: 'விவசாய மருத்துவரிடம் பேசுங்கள்',
  },
};

const FARM_ACRES_QUESTION: Record<
  LanguageCode,
  { question: string; enterSize: string; acreUnit: string; validationError: string; presetAcre: string }
> = {
  en: {
    question: 'How many acres is your farm?',
    enterSize: 'Enter farm size',
    acreUnit: 'acres',
    presetAcre: 'acre',
    validationError: 'Please enter a valid farm size greater than 0 (e.g. 0.5, 1, 2 acres)',
  },
  te: {
    question: 'మీ పొలం ఎంత ఎకరాలు?',
    enterSize: 'పొలం విస్తీర్ణం నమోదు చేయండి',
    acreUnit: 'ఎకరాలు',
    presetAcre: 'ఎకరం',
    validationError: 'దయచేసి 0 కంటే ఎక్కువ విస్తీర్ణాన్ని నమోదు చేయండి (ఉదా: 0.5, 1, 2 ఎకరాలు)',
  },
  hi: {
    question: 'आपके खेत में कितने एकड़ जमीन है?',
    enterSize: 'खेत का आकार दर्ज करें',
    acreUnit: 'एकड़',
    presetAcre: 'एकड़',
    validationError: 'कृपया 0 से अधिक खेत का आकार दर्ज करें (उदा: 0.5, 1, 2 एकड़)',
  },
  ta: {
    question: 'உங்கள் வயல் எத்தனை ஏக்கர்?',
    enterSize: 'பண்ணை பரப்பளவை உள்ளிடவும்',
    acreUnit: 'ஏக்கர்',
    presetAcre: 'ஏக்கர்',
    validationError: 'தயவுசெய்து 0-ஐ விட அதிகமான பரப்பளவை உள்ளிடவும் (எ.கா: 0.5, 1, 2 ஏக்கர்)',
  },
};

export const DiseaseResultView: React.FC<DiseaseResultViewProps> = ({
  report,
  currentLanguage,
  onOpenChatWithContext,
  onBackToDashboard,
  userFarmSize = 2.0,
}) => {
  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const t = getTranslations(langCode);
  const ui = UI_TEXT[langCode];
  const acresUi = FARM_ACRES_QUESTION[langCode] || FARM_ACRES_QUESTION.en;

  // Fully localized report with 100% language lock
  const localized: FullyLocalizedReport = localizeReport(report, langCode);

  // Farmer interactive inputs
  const [farmAcres, setFarmAcres] = useState<number>(userFarmSize || 2.0);
  const [tankCapacityLitres, setTankCapacityLitres] = useState<number>(16);
  const [customPricePerUnit, setCustomPricePerUnit] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync farmAcres if userFarmSize changes
  useEffect(() => {
    if (userFarmSize && userFarmSize > 0) {
      setFarmAcres(userFarmSize);
    }
  }, [userFarmSize]);

  // Calculations based on verified agronomic data
  const verifiedPesticide = localized.pesticide;
  const verifiedQtyPerAcre = verifiedPesticide.quantityPerAcre;
  const verifiedWaterPerAcre = verifiedPesticide.waterRequirementPerAcre;
  const unit = verifiedPesticide.unit;

  // Farm size total requirements
  const totalProductQuantity = farmAcres * verifiedQtyPerAcre;
  const totalWaterRequired = farmAcres * verifiedWaterPerAcre;

  // Tank calculations
  const numberOfTanks = Math.ceil(totalWaterRequired / (tankCapacityLitres || 16));
  const productPerTank = verifiedPesticide.concentrationGramsPerLitre * tankCapacityLitres;

  // Cost calculation
  const defaultProductPrice = verifiedPesticide.defaultPricePerUnit ?? null;
  const activeProductPricePerAcre = customPricePerUnit !== null ? customPricePerUnit : defaultProductPrice;
  const calculatedProductCost = activeProductPricePerAcre !== null ? activeProductPricePerAcre * farmAcres : null;
  const calculatedLaborCost = 350 * farmAcres;
  const calculatedOtherCost = 100 * farmAcres;
  const calculatedTotalCost =
    calculatedProductCost !== null ? calculatedProductCost + calculatedLaborCost + calculatedOtherCost : null;

  // Unit conversion helper
  const formatQuantity = (amount: number, unitType: 'g' | 'ml') => {
    if (unitType === 'g') {
      if (amount >= 1000) {
        return `${(amount / 1000).toFixed(2)} kg (${amount} g)`;
      }
      return `${amount} g`;
    } else {
      if (amount >= 1000) {
        return `${(amount / 1000).toFixed(2)} L (${amount} ml)`;
      }
      return `${amount} ml`;
    }
  };

  const handleShareAdvisory = () => {
    const text = `🌱 AgriShield Report:
${t.results.cropIdentified}: ${localized.cropName}
${t.results.possibleDisease}: ${localized.diseaseName}
${t.results.confidence}: ${localized.confidence}%
${t.results.severityTitle}: ${localized.severityDisplay}
${t.results.productName}: ${verifiedPesticide.productName}
${t.results.recommendedDosage}: ${verifiedPesticide.recommendedConcentration}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Section title translations per language with ZERO accidental English
  const sectionHeadings = {
    en: {
      diagnosis: 'CROP DIAGNOSIS',
      whatHappened: 'WHAT HAPPENED TO MY CROP?',
      symptoms: 'OBSERVED SYMPTOMS',
      whatToDoNow: 'WHAT SHOULD THE FARMER DO NOW? (IMMEDIATE ACTIONS)',
      treatments: 'VERIFIED TREATMENT OPTIONS',
      cultural: 'A. Cultural Management',
      organic: 'B. Organic / Biological Control',
      chemical: 'C. Chemical Control',
      farmCalculator: 'MY FARM SIZE (ACRE CALCULATOR)',
      tankCalculator: 'SPRAY TANK CALCULATOR',
      costEstimator: 'ESTIMATED TREATMENT COST',
      howToApply: 'HOW TO APPLY SAFELY',
      safetyFirst: 'SAFETY FIRST & PRECAUTIONS',
      prevention: 'PREVENTION & LONG-TERM CARE',
      askAi: 'ASK FARMER AI DOCTOR (KISAN MITRA)',
    },
    te: {
      diagnosis: 'పంట నిర్ధారణ',
      whatHappened: 'మీ పంట మొక్కకు ఏమైంది?',
      symptoms: 'గమనించిన తెగులు లక్షణాలు',
      whatToDoNow: 'రైతు ఇప్పుడు ఏమి చేయాలి? (తక్షణ చర్యలు)',
      treatments: 'ధృవీకరించిన చికిత్సా ఎంపికలు',
      cultural: 'ఎ. సాగు పద్ధతుల నిర్వహణ',
      organic: 'బి. సేంద్రీయ / జీవ నియంత్రణ',
      chemical: 'సి. రసాయనిక నివారణ',
      farmCalculator: 'నా పొలం విస్తీర్ణం - మందు లెక్కింపు',
      tankCalculator: 'స్ప్రే ట్యాంక్ లెక్కింపు',
      costEstimator: 'అంచనా చికిత్స ఖర్చు',
      howToApply: 'మందు పిచికారీ చేసే విధానం',
      safetyFirst: 'రక్షణ మరియు భద్రతా చర్యలు',
      prevention: 'నివారణ మరియు దీర్ఘకాలిక జాగ్రత్తలు',
      askAi: 'రైతు AI సహాయకుడిని అడగండి (కిసాన్ మిత్ర)',
    },
    hi: {
      diagnosis: 'फसल पहचान एवं निदान',
      whatHappened: 'आपकी फसल को क्या हुआ है?',
      symptoms: 'देखे गए लक्षण',
      whatToDoNow: 'किसान को अब क्या करना चाहिए? (त्वरित कदम)',
      treatments: 'सत्यापित उपचार विकल्प',
      cultural: 'क. सस्य एवं कृषि प्रबंधन',
      organic: 'ख. जैविक / प्राकृतिक नियंत्रण',
      chemical: 'ग. रासायनिक नियंत्रण',
      farmCalculator: 'खेत का आकार - दवा की सटीक गणना',
      tankCalculator: 'स्प्रे टैंक मिश्रण गणना',
      costEstimator: 'अनुमानित उपचार लागत',
      howToApply: 'दवा छिड़कने की सही विधि',
      safetyFirst: 'सुरक्षा और सावधानियां',
      prevention: 'बचाव और दीर्घकालिक उपाय',
      askAi: 'किसान AI सहायक से पूछें (किसान मित्र)',
    },
    ta: {
      diagnosis: 'பயிர் நோய் கண்டறிதல்',
      whatHappened: 'உங்கள் பயிருக்கு என்ன ஏற்பட்டுள்ளது?',
      symptoms: 'காணப்பட்ட அறிகுறிகள்',
      whatToDoNow: 'விவசாயி இப்போது என்ன செய்ய வேண்டும்? (உடனடி நடவடிக்கைகள்)',
      treatments: 'சரிபார்க்கப்பட்ட சிகிச்சை முறைகள்',
      cultural: 'அ. சாகுபடி மேலாண்மை',
      organic: 'ஆ. இயற்கை / உயிரியல் மேலாண்மை',
      chemical: 'இ. ரசாயன மேலாண்மை',
      farmCalculator: 'பண்ணை பரப்பளவு - மருந்து கணக்கீடு',
      tankCalculator: 'தெளிப்பான் தொட்டி கணக்கீடு',
      costEstimator: 'மதிப்பிடப்பட்ட சிகிச்சை செலவு',
      howToApply: 'மருந்து தெளிக்கும் முறை',
      safetyFirst: 'பாதுகாப்பு வழிமுறைகள்',
      prevention: 'தடுப்பு மற்றும் நீண்டகால பராமரிப்பு',
      askAi: 'விவசாயி AI உதவியாளரிடம் கேளுங்கள் (கிசான் மித்ரா)',
    },
  }[langCode];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Top Breadcrumb & Share Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="text-xs font-bold text-stone-400 hover:text-white flex items-center gap-1.5 transition"
        >
          <span>{ui.backToDashboard}</span>
        </button>

        <button
          onClick={handleShareAdvisory}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? ui.copied : ui.shareReport}</span>
        </button>
      </div>

      {/* LOW CONFIDENCE BANNER (IF UNCERTAIN) */}
      {localized.isLowConfidence && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/70 border-2 border-amber-600/80 text-amber-200 flex items-start gap-3 shadow-xl">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-100">
              {t.results.lowConfidenceWarning}
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {t.results.lowConfidenceAdvice}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 1: CROP DIAGNOSIS CARD */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Sprout className="w-4 h-4" />
                <span>{t.results.cropIdentified}:</span>
              </span>
              <strong className="text-base sm:text-lg font-black text-white">
                {localized.cropName}
              </strong>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400 uppercase font-semibold block">
                {t.results.possibleDisease}:
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {localized.diseaseName}
              </h2>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-1.5 text-xs font-bold">
              <span className="text-stone-400">{t.results.confidence}:</span>
              <span
                className={
                  localized.confidence >= 80
                    ? 'text-emerald-400 font-mono text-sm'
                    : 'text-amber-400 font-mono text-sm'
                }
              >
                {localized.confidence}%
              </span>
            </div>

            <div
              className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                localized.severity === 'High'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                  : localized.severity === 'Medium'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{localized.severityDisplay}</span>
            </div>
          </div>
        </div>

        {/* Severity Explanation */}
        <div className="pt-4 pb-2 space-y-1">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
            {t.results.severityTitle} ({localized.severityDisplay})
          </span>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
            {localized.severityExplanation}
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 2: WHAT HAPPENED TO MY CROP? */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400">
            {sectionHeadings.whatHappened}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-100 leading-relaxed font-normal bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
          {localized.whatIsHappening}
        </p>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3: OBSERVED SYMPTOMS */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
          <span>🔍</span>
          <span>{sectionHeadings.symptoms}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {localized.symptoms.map((symptom, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 bg-stone-950/80 p-3 rounded-2xl border border-stone-800/70"
            >
              <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
              <span className="text-xs sm:text-[13px] text-stone-200 leading-snug">{symptom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 4: WHAT SHOULD THE FARMER DO NOW? (IMMEDIATE ACTIONS) */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-rose-400 font-bold text-lg">🚨</span>
          <h3 className="text-base sm:text-lg font-black text-rose-300">
            {sectionHeadings.whatToDoNow}
          </h3>
        </div>
        <ul className="space-y-2">
          {localized.immediateActions.map((action, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-stone-950/90 p-3.5 rounded-2xl border border-stone-800"
            >
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/30">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-[13px] text-stone-100 font-medium leading-relaxed">
                {action}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ============================================================ */}
      {/* SECTION 5: VERIFIED TREATMENT OPTIONS (A, B, C) */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{ui.interventionGuide}</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {sectionHeadings.treatments}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {ui.interventionSubtitle}
          </p>
        </div>

        {/* Option A: Cultural Management */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5">
          <h4 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
            {sectionHeadings.cultural}
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-300">
            {localized.culturalPractices.map((cult, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">✓</span>
                <span>{cult}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Option B: Organic / Biological Control */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-2.5">
          <h4 className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sprout className="w-4 h-4" />
            <span>{sectionHeadings.organic}</span>
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-[13px] text-emerald-200">
            {localized.organicControl.map((org, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">🌿</span>
                <span>{org}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Option C: Chemical Control with Verified Medicine Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider">
              {sectionHeadings.chemical}
            </h4>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800/60 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{t.results.verifiedBadge}</span>
            </span>
          </div>

          {/* VERIFIED MEDICINE CARD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                  {t.results.productName}
                </span>
                <strong className="text-base text-white font-bold block mt-0.5">
                  {verifiedPesticide.productName}
                </strong>
                <span className="text-xs text-stone-300 font-mono mt-0.5 block">
                  {verifiedPesticide.activeIngredient} ({verifiedPesticide.formulation})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                  {ui.purposeAction}
                </span>
                <p className="text-xs text-stone-200 leading-snug mt-0.5">
                  {verifiedPesticide.purpose}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                  {t.results.recommendedDosage}
                </span>
                <strong className="text-xs sm:text-sm text-amber-300 font-bold block mt-1">
                  {verifiedPesticide.recommendedConcentration}
                </strong>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  ({verifiedQtyPerAcre} {unit} {ui.perAcre})
                </span>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                  {t.results.waterQuantity}
                </span>
                <strong className="text-xs sm:text-sm text-stone-100 font-bold block mt-1">
                  {verifiedWaterPerAcre} {ui.litres} / {ui.perAcre}
                </strong>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  (~{Math.ceil(verifiedWaterPerAcre / 16)} {ui.tanksOf16L})
                </span>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                  {t.results.preHarvestInterval}
                </span>
                <strong className="text-xs sm:text-sm text-rose-300 font-bold block mt-1">
                  {verifiedPesticide.preHarvestIntervalDays} {ui.waitingPeriod}
                </strong>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  {ui.doNotHarvestPHI}
                </span>
              </div>
            </div>

            {/* Application Method & Frequency */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">
                  {t.results.applicationMethod}
                </span>
                <p className="text-stone-200 mt-0.5">{verifiedPesticide.applicationMethod}</p>
              </div>
              <div className="pt-1.5 border-t border-stone-800/60">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">
                  {t.results.applicationFrequency}
                </span>
                <p className="text-stone-300 mt-0.5">{verifiedPesticide.applicationFrequency}</p>
              </div>
            </div>

            {/* Safety & Precautions */}
            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-stone-800 space-y-1.5">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">
                {t.results.safetyPrecautions}
              </span>
              <ul className="space-y-1 text-xs text-stone-300">
                {verifiedPesticide.safetyPrecautions.map((safe, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">⚠️</span>
                    <span>{safe}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[10px] text-stone-500 font-mono">
                {ui.source}: {verifiedPesticide.source} ({verifiedPesticide.dateVerified})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 6: MY FARM SIZE (ACRE-BASED QUANTITY CALCULATOR) */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
            <Calculator className="w-4 h-4" />
            <span>{ui.farmLogistics}</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {sectionHeadings.farmCalculator}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {ui.farmLogisticsSubtitle}
          </p>
        </div>

        {/* Farmer Acre Input Card */}
        <div className="p-5 rounded-2xl bg-stone-950 border border-emerald-500/30 space-y-4">
          <div>
            <label className="block text-sm sm:text-base font-black text-white mb-1.5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 text-xs font-black flex items-center justify-center shrink-0">
                🌱
              </span>
              <span>{acresUi.question}</span>
            </label>
            <p className="text-xs text-stone-400 pl-8">
              {ui.farmLogisticsSubtitle}
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2 pl-0 sm:pl-8">
            {[0.5, 1, 2, 5, 10].map((preset) => {
              const isSelected = farmAcres === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFarmAcres(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    isSelected
                      ? 'bg-emerald-500 text-stone-950 shadow-md font-black ring-2 ring-emerald-400'
                      : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-850 border border-stone-800'
                  }`}
                >
                  {preset} {acresUi.presetAcre}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pl-0 sm:pl-8">
            <div>
              <div className="relative">
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  placeholder={acresUi.enterSize}
                  value={farmAcres}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setFarmAcres(isNaN(val) ? 0 : Math.max(0, val));
                  }}
                  className="w-full px-4 py-2.5 text-lg font-bold bg-stone-900 border border-emerald-500/60 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-400"
                />
                <span className="absolute right-3.5 top-3 text-xs text-stone-400 font-bold uppercase">
                  {acresUi.acreUnit}
                </span>
              </div>
              {farmAcres <= 0 && (
                <p className="text-xs text-rose-400 mt-1 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{acresUi.validationError}</span>
                </p>
              )}
            </div>

            <div className="text-xs text-stone-400 bg-stone-900 p-3.5 rounded-xl border border-stone-800">
              <span className="block font-bold text-stone-200 mb-0.5">{ui.formula}</span>
              <code className="text-emerald-400 font-mono text-[11px] block">
                {ui.totalProduct} = {farmAcres} {t.calculator.acres} × {verifiedQtyPerAcre}{unit}/{t.calculator.acres}
              </code>
              <code className="text-emerald-400 font-mono text-[11px] block mt-0.5">
                {ui.totalWater} = {farmAcres} {t.calculator.acres} × {verifiedWaterPerAcre}L/{t.calculator.acres}
              </code>
            </div>
          </div>

          {/* Computed Physical Quantities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                {t.calculator.totalQuantityRequired}
              </span>
              <strong className="text-base sm:text-lg font-bold text-emerald-400 font-mono block mt-1">
                {formatQuantity(totalProductQuantity, unit)}
              </strong>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                {ui.basedOnVerified} ({verifiedQtyPerAcre} {unit}/{t.calculator.acres})
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                {ui.totalSprayVolume}
              </span>
              <strong className="text-base sm:text-lg font-bold text-amber-400 font-mono block mt-1">
                {totalWaterRequired} {ui.litres}
              </strong>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                {ui.basedOnVerified} ({verifiedWaterPerAcre} L/{t.calculator.acres})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 7: SPRAY TANK CALCULATOR */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-1">
            <Droplets className="w-4 h-4" />
            <span>{ui.knapsackMixingRatio}</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {sectionHeadings.tankCalculator}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {ui.knapsackSubtitle}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {ui.sprayerCapacity}
              </label>
              <div className="flex items-center gap-2">
                {[10, 16, 20].map((size) => (
                  <button
                    key={size}
                    onClick={() => setTankCapacityLitres(size)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                      tankCapacityLitres === size
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {size} {ui.litres}
                  </button>
                ))}
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={tankCapacityLitres}
                  onChange={(e) => setTankCapacityLitres(Math.max(1, parseInt(e.target.value) || 16))}
                  className="w-20 px-3 py-1 text-xs bg-stone-900 border border-stone-700 rounded-xl text-white font-mono text-center"
                />
              </div>
            </div>

            <div className="text-xs text-stone-400 bg-stone-900 p-3 rounded-xl border border-stone-800">
              <span className="font-bold text-stone-200 block mb-0.5">{ui.tankConcentration}</span>
              <span className="text-amber-300 font-mono text-[11px] block">
                {verifiedPesticide.concentrationGramsPerLitre} {unit} {ui.perLitreWater}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                {ui.medicinePerTank} ({tankCapacityLitres}L)
              </span>
              <strong className="text-base font-bold text-amber-300 font-mono block mt-1">
                {productPerTank.toFixed(1)} {unit}
              </strong>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                ({verifiedPesticide.concentrationGramsPerLitre} × {tankCapacityLitres}L)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                {ui.waterPerTank}
              </span>
              <strong className="text-base font-bold text-blue-400 font-mono block mt-1">
                {tankCapacityLitres} {ui.litres}
              </strong>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                {ui.cleanWater}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                {ui.approxTotalTanks}
              </span>
              <strong className="text-base font-bold text-emerald-400 font-mono block mt-1">
                {numberOfTanks} {ui.tanks}
              </strong>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                ({totalWaterRequired}L ÷ {tankCapacityLitres}L)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 8: ESTIMATED TREATMENT COST */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
            <DollarSign className="w-4 h-4" />
            <span>{ui.financialPlanning}</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {sectionHeadings.costEstimator}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {ui.costSubtitle} ({farmAcres} {t.calculator.acres})
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-950 border border-emerald-500/30 space-y-4">
          <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-stone-200 block">
                {t.calculator.enterCustomPrice}:
              </span>
              <span className="text-[11px] text-stone-400">
                {ui.adjustMarketRate}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-stone-400">₹</span>
              <input
                type="number"
                placeholder={defaultProductPrice ? defaultProductPrice.toString() : '650'}
                value={customPricePerUnit ?? (defaultProductPrice || '')}
                onChange={(e) => setCustomPricePerUnit(parseFloat(e.target.value) || 0)}
                className="w-24 px-2.5 py-1 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white font-mono"
              />
              <span className="text-[10px] text-stone-400">/{t.calculator.acres}</span>
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-stone-800/80 text-stone-300">
              <span>{t.calculator.productCost} ({farmAcres} {t.calculator.acres}):</span>
              <span className="font-mono font-bold text-white">
                {calculatedProductCost !== null ? `₹${calculatedProductCost.toFixed(0)}` : ui.manualInputNeeded}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-stone-800/80 text-stone-300">
              <span>{t.calculator.laborCost} ({ui.knapsackSprayLabor}):</span>
              <span className="font-mono font-bold text-white">
                ₹{calculatedLaborCost.toFixed(0)}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-stone-800/80 text-stone-300">
              <span>{t.calculator.otherCost} ({ui.waterSurfactantOther}):</span>
              <span className="font-mono font-bold text-white">
                ₹{calculatedOtherCost.toFixed(0)}
              </span>
            </div>

            <div className="flex justify-between pt-2 text-sm font-extrabold text-emerald-400">
              <span>{t.calculator.estimatedTotal}:</span>
              <span className="text-base sm:text-lg font-mono">
                {calculatedTotalCost !== null ? `₹${calculatedTotalCost.toFixed(0)}` : ui.calculatedAfterPrice}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 pt-1 leading-relaxed">
            * {t.calculator.costDisclaimer}
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 9: PREVENTION & LONG-TERM FARM RESILIENCE */}
      {/* ============================================================ */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{ui.farmResilience}</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {sectionHeadings.prevention}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {localized.prevention.map((prev, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1"
            >
              <span className="text-emerald-400 font-bold block">✓ {ui.tip} {idx + 1}</span>
              <p className="text-stone-300 leading-relaxed">{prev}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 10: CONTEXT-AWARE FARMER AI CHAT TRIGGER */}
      {/* ============================================================ */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-stone-900 to-stone-900 border-2 border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base sm:text-lg font-black text-white">
              {sectionHeadings.askAi}
            </h4>
          </div>
          <p className="text-xs text-stone-300">
            {ui.askDoctorContext} ({localized.cropName}, {farmAcres} {t.calculator.acres}, {numberOfTanks} {ui.tanks})
          </p>
        </div>

        <button
          onClick={onOpenChatWithContext}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-950 flex items-center gap-2 transition shrink-0 transform active:scale-98"
        >
          <span>{ui.chatWithDoctor}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
