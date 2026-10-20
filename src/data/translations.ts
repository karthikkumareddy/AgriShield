import { SupportedLanguage } from '../types/agrishield';

export interface TranslationSchema {
  app: {
    name: string;
    tagline: string;
    shortDesc: string;
  };
  nav: {
    dashboard: string;
    scan: string;
    chat: string;
    history: string;
    profile: string;
    language: string;
    logout: string;
    login: string;
    register: string;
    help: string;
  };
  auth: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    mobileOrEmail: string;
    password: string;
    confirmPassword: string;
    loginButton: string;
    registerButton: string;
    forgotPassword: string;
    newFarmerPrompt: string;
    alreadyRegisteredPrompt: string;
    demoLogin: string;
    demoFarmerInfo: string;
    fullName: string;
    state: string;
    district: string;
    village: string;
    farmSizeAcres: string;
    mainCrop: string;
    preferredLanguage: string;
    backToLogin: string;
    fillAllFields: string;
    passwordMismatch: string;
    loginSuccess: string;
    registerSuccess: string;
  };
  dashboard: {
    greeting: string;
    heroTitle: string;
    heroSubtitle: string;
    scanCardTitle: string;
    scanCardDesc: string;
    takePhoto: string;
    browsePhoto: string;
    photoTipsTitle: string;
    photoTips: string[];
    recentScans: string[];
    recentScansTitle: string;
    noScansYet: string;
    chatCardTitle: string;
    chatCardDesc: string;
    startChat: string;
    acreCalculator: string;
    viewHistory: string;
  };
  scan: {
    title: string;
    cameraActive: string;
    capture: string;
    retake: string;
    chooseAnother: string;
    analyzeLeaf: string;
    analyzingTitle: string;
    analyzingSteps: string[];
    dropzoneText: string;
    dropzoneSub: string;
    imageTooDark: string;
    imageTooBlurry: string;
    invalidFormat: string;
  };
  results: {
    cropIdentified: string;
    possibleDisease: string;
    confidence: string;
    lowConfidenceWarning: string;
    lowConfidenceAdvice: string;
    whatIsHappening: string;
    symptomsTitle: string;
    severityTitle: string;
    severityLevels: {
      low: string;
      lowDesc: string;
      medium: string;
      mediumDesc: string;
      high: string;
      highDesc: string;
    };
    treatmentTitle: string;
    immediateAction: string;
    culturalPractices: string;
    organicControl: string;
    chemicalControl: string;
    verifiedBadge: string;
    generalAdviceBadge: string;
    safetyRuleNotice: string;
    productName: string;
    activeIngredient: string;
    recommendedDosage: string;
    waterQuantity: string;
    applicationMethod: string;
    applicationFrequency: string;
    preHarvestInterval: string;
    safetyPrecautions: string;
    sourceChecked: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    enterFarmSize: string;
    acres: string;
    recommendedQuantityPerAcre: string;
    totalQuantityRequired: string;
    productCost: string;
    laborCost: string;
    otherCost: string;
    estimatedTotal: string;
    priceUnavailableNotice: string;
    enterCustomPrice: string;
    costDisclaimer: string;
    sprayTankMixTitle: string;
  };
  prevention: {
    title: string;
    subtitle: string;
    hygiene: string;
    spacing: string;
    irrigation: string;
    rotation: string;
    monitoring: string;
  };
  chat: {
    title: string;
    subtitle: string;
    newChat: string;
    chatHistory: string;
    today: string;
    yesterday: string;
    older: string;
    noChats: string;
    inputPlaceholder: string;
    send: string;
    listening: string;
    speakVoice: string;
    activeScanContext: string;
    discussScan: string;
    safetyNotice: string;
    quickPrompts: string[];
  };
}

export const TRANSLATIONS: Record<string, TranslationSchema> = {
  english: {
    app: {
      name: "AgriShield AI",
      tagline: "AI-Powered Plant Disease Detection & Farmer Assistance",
      shortDesc: "Accurate crop diagnosis, verified treatment, and regional agricultural assistance.",
    },
    nav: {
      dashboard: "Dashboard",
      scan: "Scan Leaf",
      chat: "Farmer AI Chat",
      history: "Scan History",
      profile: "Farmer Profile",
      language: "Language",
      logout: "Log Out",
      login: "Farmer Login",
      register: "New Farmer Register",
      help: "Farmer Help",
    },
    auth: {
      welcomeTitle: "Farmer Portal",
      welcomeSubtitle: "Identify plant diseases, get verified treatments, and talk with AI crop doctor.",
      mobileOrEmail: "Mobile Number or Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginButton: "Sign In to Farm Portal",
      registerButton: "Register My Farm",
      forgotPassword: "Forgot Password?",
      newFarmerPrompt: "New Farmer? Register here",
      alreadyRegisteredPrompt: "Already registered? Login here",
      demoLogin: "1-Click Demo Farmer Login",
      demoFarmerInfo: "Ramesh Reddy • Telangana • Cotton, Tomato & Chilli",
      fullName: "Farmer Full Name",
      state: "State",
      district: "District",
      village: "Village / Town",
      farmSizeAcres: "Farm Size (Acres)",
      mainCrop: "Main Crop Grown",
      preferredLanguage: "Preferred Language",
      backToLogin: "Back to Login",
      fillAllFields: "Please fill in all required fields.",
      passwordMismatch: "Passwords do not match.",
      loginSuccess: "Welcome back to your farm dashboard!",
      registerSuccess: "Registration successful! Welcome to AgriShield.",
    },
    dashboard: {
      greeting: "Namaste",
      heroTitle: "Crop Health & Disease Diagnostic Portal",
      heroSubtitle: "Upload a clear photo of the affected leaf to identify possible diseases.",
      scanCardTitle: "SCAN / UPLOAD LEAF",
      scanCardDesc: "Take a new photo with camera or browse leaf picture from phone gallery",
      takePhoto: "📷 Scan / Take Photo",
      browsePhoto: "🖼 Browse / Upload Picture",
      photoTipsTitle: "For better results:",
      photoTips: [
        "Keep the leaf clearly visible in the center",
        "Use good natural lighting (avoid dark shadows)",
        "Avoid blurry photos; hold camera steady",
        "Capture the affected disease spots clearly",
      ],
      recentScans: ["Tomato Late Blight", "Cotton Leaf Curl", "Rice Bacterial Blight"],
      recentScansTitle: "Recent Crop Diagnoses",
      noScansYet: "No leaf scans recorded yet. Tap above to scan your first leaf.",
      chatCardTitle: "Farmer AI Assistant (Kisan Mitra)",
      chatCardDesc: "Have questions about crop diseases, pest remedies, or spray mixing? Ask now.",
      startChat: "Chat with Crop Doctor",
      acreCalculator: "Acre Spray Calculator",
      viewHistory: "View History",
    },
    scan: {
      title: "Leaf Specimen Inspection",
      cameraActive: "Align leaf inside the frame and tap capture",
      capture: "Capture Photo",
      retake: "Retake Photo",
      chooseAnother: "Choose Another Image",
      analyzeLeaf: "Analyze Leaf Now",
      analyzingTitle: "Analyzing Leaf...",
      analyzingSteps: [
        "Analyzing your crop leaf...",
        "Identifying plant variety...",
        "Checking possible disease anomalies...",
        "Preparing farmer-friendly recommendations...",
      ],
      dropzoneText: "Drag and drop leaf image or tap to browse",
      dropzoneSub: "Supports JPG, JPEG, PNG from field cameras or smartphone",
      imageTooDark: "Image appears too dark. Please take photo in good lighting.",
      imageTooBlurry: "Image might be blurry. Ensure the leaf spots are in focus.",
      invalidFormat: "Please upload an image file (JPG, PNG).",
    },
    results: {
      cropIdentified: "Crop / Leaf Identified",
      possibleDisease: "Possible Disease",
      confidence: "AI Confidence",
      lowConfidenceWarning: "AI confidence is low. Please upload a clearer image or consult an agricultural expert.",
      lowConfidenceAdvice: "Do not apply chemical sprays based on an uncertain prediction. Inspect your field or show the leaf to your local agriculture extension officer.",
      whatIsHappening: "What is happening to your plant?",
      symptomsTitle: "Observed Symptoms",
      severityTitle: "Infection Severity",
      severityLevels: {
        low: "Low (<15% infected)",
        lowDesc: "Early localized spots. High chance of complete recovery with organic or preventive bio-controls.",
        medium: "Medium (15% - 40% infected)",
        mediumDesc: "Active spreading along foliage. Standard targeted treatment needed to protect yield.",
        high: "High (>40% infected)",
        highDesc: "Severe damage. Immediate curative spray and quarantine practices needed to protect acreage.",
      },
      treatmentTitle: "WHAT SHOULD I DO NOW?",
      immediateAction: "1. Immediate Action",
      culturalPractices: "2. Cultural Practices",
      organicControl: "3. Organic / Biological Control",
      chemicalControl: "4. Chemical Control",
      verifiedBadge: "Verified Product Recommendation",
      generalAdviceBadge: "General Treatment Advice",
      safetyRuleNotice: "Exact pesticide dosage depends on product formulation and local agricultural recommendations. Check the product label and confirm with your local agriculture officer before application.",
      productName: "Product Name",
      activeIngredient: "Active Ingredient",
      recommendedDosage: "Recommended Dosage",
      waterQuantity: "Water Quantity per Acre",
      applicationMethod: "Application Method",
      applicationFrequency: "Application Frequency",
      preHarvestInterval: "Pre-Harvest Interval (Waiting Period)",
      safetyPrecautions: "Safety & Personal Precautions",
      sourceChecked: "Verified Source / Date Checked",
    },
    calculator: {
      title: "FARM SIZE CALCULATOR",
      subtitle: "Calculate required product quantity and estimated cost for your exact farm acreage.",
      enterFarmSize: "Enter Your Farm Size (Acres)",
      acres: "Acres",
      recommendedQuantityPerAcre: "Recommended Quantity / Acre",
      totalQuantityRequired: "Total Quantity Required",
      productCost: "Product Cost",
      laborCost: "Labor Cost",
      otherCost: "Other / Water Cost",
      estimatedTotal: "Estimated Total Cost",
      priceUnavailableNotice: "Price unavailable — enter the current local market/product price:",
      enterCustomPrice: "Local Market Price per Unit (₹)",
      costDisclaimer: "Estimated cost only. Market prices and labor charges vary by region. Not a guaranteed quote.",
      sprayTankMixTitle: "Knapsack Tank Preparation",
    },
    prevention: {
      title: "HOW CAN I PREVENT THIS AGAIN?",
      subtitle: "Proven field practices to keep diseases away in future crop cycles.",
      hygiene: "Field Hygiene & Sanitation: Collect and burn or deep-bury infected crop debris away from fields.",
      spacing: "Proper Spacing: Maintain adequate plant spacing to allow sunlight penetration and free air circulation.",
      irrigation: "Careful Irrigation: Avoid overhead sprinkling that leaves foliage wet overnight. Use drip or furrow.",
      rotation: "Crop Rotation: Do not plant the same botanical family continuously in the same soil.",
      monitoring: "Regular Field Scouting: Inspect leaf undersides twice a week to detect first spots early.",
    },
    chat: {
      title: "Farmer AI Assistant (Kisan Mitra)",
      subtitle: "Ask questions about crop diseases, remedies, mixing, and weather precautions.",
      newChat: "New Chat",
      chatHistory: "Chat History",
      today: "Today",
      yesterday: "Yesterday",
      older: "Previous Conversations",
      noChats: "No previous chats recorded.",
      inputPlaceholder: "Ask your farming question (e.g. spray dosage, organic remedies, tank mix)...",
      send: "Send",
      listening: "Listening...",
      speakVoice: "Listen in Voice",
      activeScanContext: "Currently discussing your scan:",
      discussScan: "Ask About This Scan",
      safetyNotice: "AI assistant provides educational agricultural advice. For severe disease outbreaks or restricted chemicals, verify with local agriculture officers.",
      quickPrompts: [
        "How do I prepare a 16-litre spray tank for this disease?",
        "What organic bio-pesticide can I use as a preventive spray?",
        "What is the best time of day to spray in hot weather?",
        "How can I prevent this disease from spreading to next crop?",
      ],
    },
  },

  telugu: {
    app: {
      name: "అగ్రిషీల్డ్ AI (AgriShield)",
      tagline: "రైతులకు AI పంట తెగుళ్ల గుర్తింపు & సమగ్ర సహాయం",
      shortDesc: "కచ్చితమైన పంట రోగ నిర్ధారణ, సిఫార్సు చేసిన మందులు మరియు ప్రాంతీయ వ్యవసాయ సలహాలు.",
    },
    nav: {
      dashboard: "రైతు డ్యాష్‌బోర్డ్",
      scan: "ఆకు స్కాన్",
      chat: "కిసాన్ AI మిత్ర",
      history: "స్కాన్ చరిత్ర",
      profile: "రైతు వివరాలు",
      language: "భాష మార్పు",
      logout: "లాగ్ అవుట్",
      login: "రైతు లాగిన్",
      register: "కొత్త రైతు నమోదు",
      help: "రైతు సహాయం",
    },
    auth: {
      welcomeTitle: "రైతు పోర్టల్",
      welcomeSubtitle: "పంట తెగుళ్లను గుర్తించండి, సరైన మందుల మోతాదు తెలుసుకోండి, AI పంట డాక్టర్‌తో మాట్లాడండి.",
      mobileOrEmail: "మొబైల్ నంబర్ లేదా ఈమెయిల్",
      password: "పాస్‌వర్డ్",
      confirmPassword: "పాస్‌వర్డ్ నిర్ధారణ",
      loginButton: "రైతు లాగిన్ అవ్వండి",
      registerButton: "కొత్త రైతుగా నమోదు చేసుకోండి",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      newFarmerPrompt: "కొత్త రైతులా? ఇక్కడ నమోదు చేసుకోండి",
      alreadyRegisteredPrompt: "ఇప్పటికే నమోదు చేసుకున్నారా? లాగిన్ అవ్వండి",
      demoLogin: "1-క్లిక్ డెమో రైతు లాగిన్",
      demoFarmerInfo: "రమేష్ రెడ్డి • వరంగల్ • పత్తి, టమోటా & మిరప",
      fullName: "రైతు పూర్తి పేరు",
      state: "రాష్ట్రం",
      district: "జిల్లా",
      village: "గ్రామం / మండలం",
      farmSizeAcres: "పొలం విస్తీర్ణం (ఎకరాలు)",
      mainCrop: "ప్రధాన పంట",
      preferredLanguage: "ఇష్టపడే భాష",
      backToLogin: "లాగిన్‌కి తిరిగి వెళ్లండి",
      fillAllFields: "దయచేసి అన్ని అవసరమైన వివరాలు పూరించండి.",
      passwordMismatch: "పాస్‌వర్డ్‌లు సరిపోలలేదు.",
      loginSuccess: "స్వాగతం! మీ రైతు డ్యాష్‌బోర్డ్‌లోకి ప్రవేశించారు.",
      registerSuccess: "నమోదు విజయవంతమైంది! అగ్రిషీల్డ్‌కు స్వాగతం.",
    },
    dashboard: {
      greeting: "నమస్కారం",
      heroTitle: "పంట ఆరోగ్యం & తెగుళ్ల నిర్ధారణ వేదిక",
      heroSubtitle: "రోగ నిర్ధారణ కోసం తెగులు సోకిన ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.",
      scanCardTitle: "ఆకు స్కాన్ / అప్‌లోడ్ చేయండి",
      scanCardDesc: "కెమెరాతో కొత్త ఫోటో తీయండి లేదా ఫోన్ గ్యాలరీ నుండి ఆకు చిత్రాన్ని ఎంచుకోండి",
      takePhoto: "📷 కెమెరాతో ఫోటో తీయండి",
      browsePhoto: "🖼 గ్యాలరీ నుండి ఎంచుకోండి",
      photoTipsTitle: "మంచి ఫలితాల కోసం చిట్కాలు:",
      photoTips: [
        "ఆకు స్పష్టంగా కెమెరా మధ్యలో ఉండేలా చూడండి",
        "మంచి వెలుతురులో ఫోటో తీయండి (నీడలు పడకుండా)",
        "ఫోటో అస్పష్టంగా (blurry) లేకుండా స్థిరంగా పట్టుకోండి",
        "తెగులు సోకిన మచ్చల భాగాన్ని స్పష్టంగా చూపించండి",
      ],
      recentScans: ["టమోటా మాడు తెగులు", "పత్తి ఆకు ముడుత", "వరి ఆకు ఎండు తెగులు"],
      recentScansTitle: "ఇటీవలి పంట రోగ పరీక్షలు",
      noScansYet: "ఇంతవరకు ఎటువంటి స్కాన్‌లు లేవు. పై బటన్‌తో మీ మొదటి ఆకును పరీక్షించండి.",
      chatCardTitle: "కిసాన్ మిత్ర AI వ్యవసాయ సహాయకుడు",
      chatCardDesc: "పంట తెగుళ్ళు, పిచికారీ మోతాదు, సేంద్రీయ నివారణల గురించి అనుమానాలుంటే అడగండి.",
      startChat: "పంట డాక్టర్‌తో మాట్లాడండి",
      acreCalculator: "ఎకరా పిచికారీ లెక్కింపు",
      viewHistory: "చరిత్ర చూడండి",
    },
    scan: {
      title: "పంట ఆకు పరీక్ష",
      cameraActive: "ఆకును ఫ్రేమ్ మధ్యలో ఉంచి ఫోటో తీయండి",
      capture: "ఫోటో తీయండి",
      retake: "మళ్లీ తీయండి",
      chooseAnother: "వేరే ఫోటో ఎంచుకోండి",
      analyzeLeaf: "ఆకును పరీక్షించండి",
      analyzingTitle: "ఆకును పరీక్షిస్తున్నాము...",
      analyzingSteps: [
        "పంట ఆకును విశ్లేషిస్తున్నాము...",
        "మొక్క రకాన్ని గుర్తిస్తున్నాము...",
        "తెగులు లక్షణాలను లెక్కిస్తున్నాము...",
        "రైతుకు ఉపయోగపడే సలహాలను రూపొందిస్తున్నాము...",
      ],
      dropzoneText: "ఫోటోను ఇక్కడ వేయండి లేదా ఎంచుకోండి",
      dropzoneSub: "మొబైల్ కెమెరా నుండి JPG, JPEG, PNG ఫార్మాట్లకు మద్దతు కలదు",
      imageTooDark: "ఫోటో చాలా చీకటిగా ఉంది. మంచి వెలుతురులో తీయండి.",
      imageTooBlurry: "ఫోటో అస్పష్టంగా ఉంది. ఆకు మచ్చలు స్పష్టంగా కనిపించేలా తీయండి.",
      invalidFormat: "దయచేసి సరైన ఫోటో ఫైల్ (JPG, PNG) అప్‌లోడ్ చేయండి.",
    },
    results: {
      cropIdentified: "గుర్తించిన పంట / ఆకు",
      possibleDisease: "సోకిన అవకాశం ఉన్న తెగులు",
      confidence: "AI విశ్వసనీయత (Confidence)",
      lowConfidenceWarning: "AI విశ్వసనీయత తక్కువగా ఉంది. దయచేసి స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి లేదా వ్యవసాయ అధికారిని సంప్రదించండి.",
      lowConfidenceAdvice: "నిర్ధారణ స్పష్టంగా లేనప్పుడు రసాయన మందులు వాడవద్దు. మీ పొలాన్ని పరిశీలించి స్థానిక వ్యవసాయ విస్తరణ అధికారికి ఆకును చూపించండి.",
      whatIsHappening: "మీ పంట మొక్కకు ఏమైంది?",
      symptomsTitle: "గమనించిన తెగులు లక్షణాలు",
      severityTitle: "తెగులు తీవ్రత శాతం",
      severityLevels: {
        low: "తక్కువ (<15% తీవ్రత)",
        lowDesc: "ప్రారంభ దశ. సేంద్రీయ వేప నూనె లేదా జీవ శిలీంద్రనాశనులతో పంట సులభంగా కోలుకుంటుంది.",
        medium: "మధ్యస్థం (15% - 40% తీవ్రత)",
        mediumDesc: "ఆకులపై వేగంగా వ్యాపిస్తోంది. పంట దిగుబడి తగ్గకుండా నిర్దిష్ట రసాయనిక మందు పిచికారీ అవసరం.",
        high: "తీవ్రం (>40% తీవ్రత)",
        highDesc: "అధిక నష్టం. వెంటనే అత్యవసర మందు పిచికారీ మరియు పొలం క్వారంటైన్ చర్యలు చేపట్టాలి.",
      },
      treatmentTitle: "ఇప్పుడు రైతు ఏమి చేయాలి?",
      immediateAction: "1. తక్షణ చర్యలు",
      culturalPractices: "2. సాగు పద్ధతుల నిర్వహణ",
      organicControl: "3. సేంద్రీయ / జీవ నివారణ",
      chemicalControl: "4. రసాయనిక నివారణ",
      verifiedBadge: "ధృవీకరించిన వ్యవసాయ మందు సిఫార్సు",
      generalAdviceBadge: "సాధారణ చికిత్స సలహా",
      safetyRuleNotice: "కచ్చితమైన మందు మోతాదు మార్కెట్ బ్రాండ్ మరియు ప్రాంతీయ వ్యవసాయ పరిశోధనలపై ఆధారపడి ఉంటుంది. వాడే ముందు ఉత్పత్తి లేబుల్ చదవండి మరియు వ్యవసాయ అధికారిని సంప్రదించండి.",
      productName: "మందు పేరు",
      activeIngredient: "క్రియాశీల రసాయనం (Active Ingredient)",
      recommendedDosage: "సిఫార్సు చేసిన మోతాదు",
      waterQuantity: "ఎకరాకు కావలసిన నీటి పరిమాణం",
      applicationMethod: "పిచికారీ చేసే విధానం",
      applicationFrequency: "ఎన్ని రోజుల వ్యవధిలో చేయాలి",
      preHarvestInterval: "కోతకు ముందు వేచి ఉండాల్సిన రోజులు",
      safetyPrecautions: "రక్షణ చర్యలు & జాగ్రత్తలు",
      sourceChecked: "ధృవీకరించిన వ్యవసాయ మూలం",
    },
    calculator: {
      title: "పొలం విస్తీర్ణం & మోతాదు లెక్కింపు",
      subtitle: "మీ పొలం ఎకరాల ప్రకారం కావలసిన మందు పరిమాణం మరియు అంచనా ఖర్చును లెక్కించండి.",
      enterFarmSize: "మీ పొలం విస్తీర్ణం నమోదు చేయండి (ఎకరాల్లో)",
      acres: "ఎకరాలు",
      recommendedQuantityPerAcre: "ఎకరాకు అవసరమైన మోతాదు",
      totalQuantityRequired: "మొత్తం కావలసిన మందు పరిమాణం",
      productCost: "మందు కొనుగోలు ఖర్చు",
      laborCost: "కూలీల పిచికారీ ఖర్చు",
      otherCost: "ఇతర ఖర్చులు",
      estimatedTotal: "మొత్తం అంచనా ఖర్చు",
      priceUnavailableNotice: "మార్కెట్ ధర అందుబాటులో లేదు — మీ స్థానిక దుకాణ ధరను నమోదు చేయండి:",
      enterCustomPrice: "స్థానిక మార్కెట్ ధర (₹)",
      costDisclaimer: "ఇది కేవలం అంచనా ఖర్చు మాత్రమే. మార్కెట్ ధరలు మరియు కూలీల రేట్లు ప్రాంతాన్ని బట్టి మారవచ్చు.",
      sprayTankMixTitle: "నాప్‌సాక్ స్ప్రేయర్ ట్యాంక్ తయారీ",
    },
    prevention: {
      title: "ఈ తెగులు మళ్లీ రాకుండా ఎలా నివారించాలి?",
      subtitle: "తదుపరి పంటల్లో తెగుళ్లు రాకుండా అరికట్టే ఉత్తమ సాగు పద్ధతులు.",
      hygiene: "పొలం పరిశుభ్రత: రాలిన తెగులు ఆకులను, కొమ్మలను ఏరి పొలానికి దూరంగా కాల్చేయండి.",
      spacing: "సరైన దూరం: మొక్కల మధ్య తగిన దూరం ఉంచడం వల్ల గాలి, వెలుతురు బాగా ప్రసరిస్తాయి.",
      irrigation: "నీటి యాజమాన్యం: ఆకులు తడిసి ఉండేలా పైనుంచి నీరు చల్లకుండా డ్రిప్ లేదా కాల్వల ద్వారా నీరివ్వండి.",
      rotation: "పంట మార్పిడి: ఒకే రకమైన పంటను వరుసగా అదే నేలలో సాగు చేయకండి.",
      monitoring: "నిరంతర పరిశీలన: వారానికి రెండుసార్లు ఆకుల అడుగు భాగాన్ని పరిశీలించి తెగుళ్లను ముందుగానే గుర్తించండి.",
    },
    chat: {
      title: "కిసాన్ మిత్ర AI (రైతు సహాయకుడు)",
      subtitle: "పంట రోగాలు, పురుగు మందులు, ట్యాంకు కలపడం మరియు వాతావరణ జాగ్రత్తలపై ప్రశ్నించండి.",
      newChat: "కొత్త సంభాషణ",
      chatHistory: "మునుపటి సంభాషణలు",
      today: "ఈరోజు",
      yesterday: "నిన్న",
      older: "గత సంభాషణలు",
      noChats: "ఇంతవరకు ఎటువంటి పాత సంభాషణలు లేవు.",
      inputPlaceholder: "మీ వ్యవసాయ సందేహాన్ని అడగండి (ఉదా: మందు మోతాదు, సేంద్రీయ నివారణ)...",
      send: "పంపండి",
      listening: "వినబడుతోంది...",
      speakVoice: "వాయిస్ వినండి",
      activeScanContext: "ప్రస్తుతం చర్చిస్తున్న ఆకు పరీక్ష:",
      discussScan: "ఈ పరీక్ష గురించి అడగండి",
      safetyNotice: "AI ఇచ్చే సలహాలు వ్యవసాయ అవగాహన కొరకు మాత్రమే. తీవ్రమైన తెగుళ్ల సందర్భంలో వ్యవసాయ అధికారి సలహా తీసుకోండి.",
      quickPrompts: [
        "ఈ తెగులుకు 16 లీటర్ల నాప్‌సాక్ ట్యాంకులో ఎంత మందు కలపాలి?",
        "ప్రారంభ దశలో ఏ సేంద్రీయ వేప మందు వాడాలి?",
        "ఎండ సమయంలో పిచికారీ చేయడానికి సరైన సమయం ఏది?",
        "తదుపరి పంటకు ఈ తెగులు రాకుండా ఎలా అరికట్టాలి?",
      ],
    },
  },

  hindi: {
    app: {
      name: "एग्रीशील्ड AI (AgriShield)",
      tagline: "AI-संचालित पौध रोग पहचान एवं किसान सहायता प्रणाली",
      shortDesc: "सटीक फसल रोग निदान, सत्यापित दवा सिफारिशें और क्षेत्रीय कृषि मार्गदर्शन।",
    },
    nav: {
      dashboard: "किसान डैशबोर्ड",
      scan: "पत्ती स्कैन करें",
      chat: "किसान मित्र AI चैट",
      history: "स्कैन इतिहास",
      profile: "किसान प्रोफाइल",
      language: "भाषा बदलें",
      logout: "लॉग आउट",
      login: "किसान लॉगिन",
      register: "नया किसान पंजीकरण",
      help: "किसान सहायता",
    },
    auth: {
      welcomeTitle: "किसान पोर्टल",
      welcomeSubtitle: "पौधों की बीमारी पहचानें, सटीक दवा की खुराक जानें और AI फसल डॉक्टर से बात करें।",
      mobileOrEmail: "मोबाइल नंबर या ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      loginButton: "पोर्टल में लॉगिन करें",
      registerButton: "नए किसान का पंजीकरण करें",
      forgotPassword: "पासवर्ड भूल गए?",
      newFarmerPrompt: "नए किसान हैं? यहाँ पंजीकरण करें",
      alreadyRegisteredPrompt: "पहले से पंजीकृत हैं? यहाँ लॉगिन करें",
      demoLogin: "1-क्लिक डेमो किसान लॉगिन",
      demoFarmerInfo: "रमेश रेड्डी • तेलंगाना • कपास, टमाटर और मिर्च",
      fullName: "किसान का पूरा नाम",
      state: "राज्य",
      district: "ज़िला",
      village: "गाँव / कस्बा",
      farmSizeAcres: "खेत का आकार (एकड़)",
      mainCrop: "मुख्य फसल",
      preferredLanguage: "पसंदीदा भाषा",
      backToLogin: "लॉगिन पर वापस जाएं",
      fillAllFields: "कृपया सभी आवश्यक जानकारी भरें।",
      passwordMismatch: "पासवर्ड मेल नहीं खाते।",
      loginSuccess: "स्वागत है! अपने किसान डैशबोर्ड में प्रवेश कर चुके हैं।",
      registerSuccess: "पंजीकरण सफल रहा! एग्रीशील्ड में आपका स्वागत है।",
    },
    dashboard: {
      greeting: "नमस्ते",
      heroTitle: "फसल स्वास्थ्य एवं रोग निदान केंद्र",
      heroSubtitle: "संभावित बीमारी की पहचान के लिए प्रभावित पत्ती की स्पष्ट तस्वीर अपलोड करें।",
      scanCardTitle: "पत्ती स्कैन / अपलोड करें",
      scanCardDesc: "कैमरे से नई फोटो लें या फोन गैलरी से पत्ती की तस्वीर चुनें",
      takePhoto: "📷 कैमरे से फोटो लें",
      browsePhoto: "🖼 गैलरी से चुनें",
      photoTipsTitle: "सटीक परिणाम के लिए सुझाव:",
      photoTips: [
        "पत्ती को कैमरे के बीच में स्पष्ट रखें",
        "अच्छी रोशनी में फोटो लें (छाया से बचें)",
        "फोटो धुंधली न हो, हाथ स्थिर रखें",
        "बीमारी वाले धब्बों को साफ दिखाएं",
      ],
      recentScans: ["टमाटर का पछेती झुलसा", "कपास पत्ती मरोड़", "धान का जीवाणु झुलसा"],
      recentScansTitle: "हालिया फसल जांच",
      noScansYet: "अभी तक कोई स्कैन नहीं हुआ है। ऊपर दिए गए बटन से पहली पत्ती जांचें।",
      chatCardTitle: "किसान मित्र AI सहायक",
      chatCardDesc: "फसल रोग, कीटनाशक खुराक और जैविक उपचार के बारे में कोई भी प्रश्न पूछें।",
      startChat: "फसल डॉक्टर से बात करें",
      acreCalculator: "एकड़ खुराक कैलकुलेटर",
      viewHistory: "इतिहास देखें",
    },
    scan: {
      title: "फसल पत्ती परीक्षण",
      cameraActive: "पत्ती को फ्रेम के बीच में रखें और फोटो खींचें",
      capture: "फोटो खींचें",
      retake: "दोबारा फोटो लें",
      chooseAnother: "दूसरी फोटो चुनें",
      analyzeLeaf: "अभी पत्ती का विश्लेषण करें",
      analyzingTitle: "पत्ती का विश्लेषण हो रहा है...",
      analyzingSteps: [
        "आपकी फसल की पत्ती जांची जा रही है...",
        "पौधे की प्रजाति की पहचान हो रही है...",
        "संभावित रोग के लक्षणों का विश्लेषण हो रहा है...",
        "किसान भाई के लिए उचित सलाह तैयार की जा रही है...",
      ],
      dropzoneText: "फोटो यहाँ खींच कर लाएं या चुनने के लिए टैप करें",
      dropzoneSub: "मोबाइल कैमरे से JPG, JPEG, PNG फॉर्मेट समर्थित हैं",
      imageTooDark: "फोटो बहुत अंधेरी है। कृपया अच्छी रोशनी में फोटो लें।",
      imageTooBlurry: "तस्वीर धुंधली लग रही है। पत्ती के धब्बों को साफ रखें।",
      invalidFormat: "कृपया सही फोटो फाइल (JPG, PNG) अपलोड करें।",
    },
    results: {
      cropIdentified: "पहचानी गई फसल / पत्ती",
      possibleDisease: "संभावित रोग",
      confidence: "AI विश्वास स्तर (Confidence)",
      lowConfidenceWarning: "AI विश्वास स्तर कम है। कृपया अधिक स्पष्ट फोटो अपलोड करें या कृषि विशेषज्ञ से संपर्क करें।",
      lowConfidenceAdvice: "संदेह की स्थिति में रासायनिक कीटनाशकों का छिड़काव न करें। अपने स्थानीय कृषि अधिकारी को पत्ती दिखाएं।",
      whatIsHappening: "आपके पौधे के साथ क्या हो रहा है?",
      symptomsTitle: "देखे गए रोग के लक्षण",
      severityTitle: "संक्रमण की गंभीरता",
      severityLevels: {
        low: "कम (<15% संक्रमण)",
        lowDesc: "शुरुआती धब्बे। जैविक नीम तेल या ट्राइकोडर्मा से फसल पूरी तरह ठीक हो सकती है।",
        medium: "मध्यम (15% - 40% संक्रमण)",
        mediumDesc: "पत्तियों पर बीमारी फैल रही है। उपज बचाने हेतु मानक रासायनिक दवा का छिड़काव आवश्यक है।",
        high: "गंभीर (>40% संक्रमण)",
        highDesc: "अत्यधिक नुकसान। तुरंत आपातकालीन उपचारात्मक छिड़काव और खेत को अलग रखने की आवश्यकता है।",
      },
      treatmentTitle: "अब किसान क्या करे?",
      immediateAction: "1. त्वरित कदम",
      culturalPractices: "2. खेती की उचित पद्धतियाँ",
      organicControl: "3. जैविक / प्राकृतिक नियंत्रण",
      chemicalControl: "4. रासायनिक नियंत्रण",
      verifiedBadge: "सत्यापित कृषि दवा सिफारिश",
      generalAdviceBadge: "सामान्य उपचार सलाह",
      safetyRuleNotice: "सटीक कीटनाशक खुराक उत्पाद ब्रांड और स्थानीय कृषि अनुशंसाओं पर निर्भर करती है। प्रयोग से पूर्व उत्पाद लेबल अवश्य पढ़ें और कृषि अधिकारी से सलाह लें।",
      productName: "दवा का नाम",
      activeIngredient: "सक्रिय तत्व (Active Ingredient)",
      recommendedDosage: "अनुशंसित खुराक",
      waterQuantity: "प्रति एकड़ पानी की मात्रा",
      applicationMethod: "छिड़काव की विधि",
      applicationFrequency: "कितने दिनों में दोहराएं",
      preHarvestInterval: "तुड़ाई से पहले प्रतीक्षा अवधि",
      safetyPrecautions: "सुरक्षा एवं व्यक्तिगत सावधानियां",
      sourceChecked: "सत्यापित कृषि संदर्भ",
    },
    calculator: {
      title: "खेत आकार एवं खुराक कैलकुलेटर",
      subtitle: "अपने खेत के एकड़ के अनुसार आवश्यक दवा की मात्रा और अनुमानित लागत की गणना करें।",
      enterFarmSize: "खेत का आकार दर्ज करें (एकड़ में)",
      acres: "एकड़",
      recommendedQuantityPerAcre: "प्रति एकड़ अनुशंसित मात्रा",
      totalQuantityRequired: "कुल आवश्यक दवा की मात्रा",
      productCost: "दवा की अनुमानित लागत",
      laborCost: "छिड़काव मजदूरी लागत",
      otherCost: "अन्य / पानी की लागत",
      estimatedTotal: "कुल अनुमानित लागत",
      priceUnavailableNotice: "बाजार मूल्य उपलब्ध नहीं है — अपने स्थानीय दुकान का मूल्य दर्ज करें:",
      enterCustomPrice: "प्रति इकाई स्थानीय बाजार मूल्य (₹)",
      costDisclaimer: "यह केवल अनुमानित लागत है। बाजार मूल्य और मजदूरी दर क्षेत्र के अनुसार भिन्न हो सकती है।",
      sprayTankMixTitle: "स्प्रे टैंक घोल की तैयारी",
    },
    prevention: {
      title: "इस रोग को दोबारा आने से कैसे रोकें?",
      subtitle: "भविष्य की फसलों को सुरक्षित रखने के लिए अपनाई जाने वाली व्यावहारिक पद्धतियाँ।",
      hygiene: "खेत की स्वच्छता: संक्रमित पत्तियों और टहनियों को इकट्ठा करके खेत से दूर जला दें या गहरा गाड़ दें।",
      spacing: "उचित दूरी: पौधों के बीच पर्याप्त दूरी रखें ताकि धूप और हवा का संचार बना रहे।",
      irrigation: "सावधानीपूर्वक सिंचाई: फव्वारा सिंचाई से बचें जिससे रातभर पत्तियां गीली न रहें। ड्रिप या नाली विधि अपनाएं।",
      rotation: "फसल चक्र: एक ही खेत में लगातार एक ही कुल की फसल न बोएं।",
      monitoring: "नियमित निगरानी: सप्ताह में दो बार पत्तियों की निचली सतह की जांच करें ताकि बीमारी शुरू में ही पकड़ में आ जाए।",
    },
    chat: {
      title: "किसान मित्र AI (कृषि सहायक)",
      subtitle: "फसल रोग, कीटनाशक, टैंक घोल और मौसम संबंधी सावधानियों पर सवाल पूछें।",
      newChat: "नई बातचीत",
      chatHistory: "पिछली बातचीत",
      today: "आज",
      yesterday: "कल",
      older: "पुरानी बातचीत",
      noChats: "कोई पुरानी बातचीत नहीं मिली।",
      inputPlaceholder: "अपना सवाल पूछें (उदा: दवा की खुराक, जैविक उपचार, टैंक घोल)...",
      send: "भेजें",
      listening: "सुन रहे हैं...",
      speakVoice: "आवाज़ में सुनें",
      activeScanContext: "वर्तमान में जांची गई पत्ती:",
      discussScan: "इस जांच के बारे में पूछें",
      safetyNotice: "AI सहायक कृषि जागरूकता के लिए सलाह देता है। गंभीर रोग प्रकोप में हमेशा स्थानीय कृषि अधिकारी से पुष्टि करें।",
      quickPrompts: [
        "इस बीमारी के लिए 16 लीटर स्प्रे टैंक में कितनी दवा मिलाएं?",
        "शुरुआती रोकथाम के लिए कौन सा जैविक नीम कीटनाशक प्रयोग करें?",
        "तेज धूप में छिड़काव करने का सबसे अच्छा समय क्या है?",
        "अगली फसल में इस रोग से बचने के लिए क्या उपाय करें?",
      ],
    },
  },

  tamil: {
    app: {
      name: "அக்ரிஷீல்ட் AI (AgriShield)",
      tagline: "விவசாயிகளுக்கான AI பயிர் நோய் கண்டறிதல் & ஆலோசனை",
      shortDesc: "துல்லியமான பயிர் நோய் கண்டறிதல், பரிந்துரைக்கப்பட்ட மருந்துகள் மற்றும் வட்டார வேளாண்மை உதவி.",
    },
    nav: {
      dashboard: "விவசாயி முகப்பு",
      scan: "இலை ஸ்கேன்",
      chat: "கிசான் AI மித்ரா",
      history: "ஸ்கேன் வரலாறு",
      profile: "விவசாயி சுயவிவரம்",
      language: "மொழி மாற்றம்",
      logout: "வெளியேறு",
      login: "விவசாயி உள்நுழைவு",
      register: "புதிய விவசாயி பதிவு",
      help: "விவசாயி உதவி",
    },
    auth: {
      welcomeTitle: "விவசாயி தளம்",
      welcomeSubtitle: "பயிர் நோய்களைக் கண்டறியவும், சரியான மருந்து அளவை அறியவும், AI பயிர் மருத்துவரிடம் பேசவும்.",
      mobileOrEmail: "மொபைல் எண் அல்லது மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      confirmPassword: "கடவுச்சொல் உறுதிப்படுத்தல்",
      loginButton: "தளத்தில் உள்நுழைக",
      registerButton: "புதிய விவசாயியாக பதிவு செய்க",
      forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
      newFarmerPrompt: "புதிய விவசாயியா? இங்கே பதிவு செய்யவும்",
      alreadyRegisteredPrompt: "ஏற்கனவே பதிவு செய்தவரா? இங்கே உள்நுழைக",
      demoLogin: "1-கிளிக் மாதிரி விவசாயி உள்நுழைவு",
      demoFarmerInfo: "ரமேஷ் ரெட்டி • பருத்தி, தக்காளி & மிளகாய்",
      fullName: "விவசாயியின் முழு பெயர்",
      state: "மாநிலம்",
      district: "மாவட்டம்",
      village: "கிராமம் / ஊர்",
      farmSizeAcres: "நில அளவு (ஏக்கர்)",
      mainCrop: "முக்கிய பயிர்",
      preferredLanguage: "விருப்பமான மொழி",
      backToLogin: "உள்நுழைவுக்கு திரும்பு",
      fillAllFields: "தயவுசெய்து அனைத்து விவரங்களையும் நிரப்பவும்.",
      passwordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை.",
      loginSuccess: "வரவேற்கிறோம்! உங்கள் விவசாயி பக்கத்திற்குள் நுழைந்துவிட்டீர்கள்.",
      registerSuccess: "பதிவு வெற்றிகரமாக முடிந்தது! அக்ரிஷீல்டுக்கு நல்வரவு.",
    },
    dashboard: {
      greeting: "வணக்கம்",
      heroTitle: "பயிர் நலம் மற்றும் நோய் கண்டறியும் மையம்",
      heroSubtitle: "சாத்தியமான நோய்களைக் கண்டறிய பாதிக்கப்பட்ட இலையின் தெளிவான படத்தை பதிவேற்றவும்.",
      scanCardTitle: "இலையை ஸ்கேன் / பதிவேற்றவும்",
      scanCardDesc: "கேமரா மூலம் புதிய படம் எடுக்கவும் அல்லது கேலரியில் இருந்து இலையை தேர்ந்தெடுக்கவும்",
      takePhoto: "📷 கேமராவில் படம் எடுங்கள்",
      browsePhoto: "🖼 கேலரியில் இருந்து தேர்வு செய்",
      photoTipsTitle: "துல்லியமான முடிவுகளுக்கு குறிப்புகள்:",
      photoTips: [
        "இலை தெளிவாக திரையின் நடுவில் இருக்குமாறு பிடிக்கவும்",
        "நல்ல இயற்கை வெளிச்சத்தில் படம் எடுக்கவும் (நிழல் தவிர்க்கவும்)",
        "படம் மங்கலாக இல்லாமல் நிலையாக பிடிக்கவும்",
        "நோய் தாக்கிய பகுதிகளை தெளிவாக காட்டவும்",
      ],
      recentScans: ["தக்காளி பின் கருகல்", "பருத்தி இலைச்சுருள்", "நெல் பாக்டீரியா இலைக்கருகல்"],
      recentScansTitle: "சமீபத்திய பயிர் சோதனைகள்",
      noScansYet: "இதுவரை எந்த சோதனையும் செய்யப்படவில்லை. மேலே உள்ள பொத்தானை அழுத்தி சோதிக்கவும்.",
      chatCardTitle: "கிசான் மித்ரா AI விவசாய உதவியாளர்",
      chatCardDesc: "பயிர் நோய்கள், மருந்து அளவு, இயற்கை முறைகள் பற்றிய சந்தேகங்களை கேட்கலாம்.",
      startChat: "பயிர் மருத்துவரிடம் பேசவும்",
      acreCalculator: "ஏக்கர் மருந்து கணக்கீடு",
      viewHistory: "வரலாற்றைக் காண்க",
    },
    scan: {
      title: "பயிர் இலை பரிசோதனை",
      cameraActive: "இலையை சட்டத்தின் நடுவில் வைத்து படம் பிடிக்கவும்",
      capture: "படம் பிடிக்கவும்",
      retake: "மீண்டும் எடு",
      chooseAnother: "வேறு படம் எடு",
      analyzeLeaf: "இலையை ஆய்வு செய்",
      analyzingTitle: "இலை ஆய்வு செய்யப்படுகிறது...",
      analyzingSteps: [
        "உங்கள் பயிர் இலை ஆய்வு செய்யப்படுகிறது...",
        "பயிர் வகை அடையாளம் காணப்படுகிறது...",
        "சாத்தியமான நோய் அறிகுறிகள் கணக்கிடப்படுகின்றன...",
        "விவசாயிக்கான சரியான பரிந்துரைகள் தயாராகின்றன...",
      ],
      dropzoneText: "படத்தை இங்கே இழுத்து விடவும் அல்லது கிளிக் செய்யவும்",
      dropzoneSub: "மொபைல் கேமரா மூலம் JPG, JPEG, PNG கோப்புகள் ஏற்றுக்கொள்ளப்படும்",
      imageTooDark: "படம் மிகவும் இருட்டாக உள்ளது. நல்ல வெளிச்சத்தில் படம் எடுக்கவும்.",
      imageTooBlurry: "படம் மங்கலாக உள்ளது. இலை புள்ளிகள் தெளிவாக தெரியுமாறு எடுக்கவும்.",
      invalidFormat: "தயவுசெய்து சரியான படக் கோப்பை (JPG, PNG) பதிவேற்றவும்.",
    },
    results: {
      cropIdentified: "கண்டறியப்பட்ட பயிர் / இலை",
      possibleDisease: "சாத்தியமான நோய்",
      confidence: "AI நம்பகத்தன்மை (Confidence)",
      lowConfidenceWarning: "AI நம்பகத்தன்மை குறைவாக உள்ளது. தயவுசெய்து தெளிவான படத்தை பதிவேற்றவும் அல்லது வேளாண்மை அதிகாரியை அணுகவும்.",
      lowConfidenceAdvice: "நோய் உறுதி செய்யப்படாத போது ரசாயன மருந்துகளை தெளிக்க வேண்டாம். உங்கள் வயல் இலையை வேளாண்மை அலுவலரிடம் காட்டவும்.",
      whatIsHappening: "உங்கள் செடிக்கு என்ன நேர்ந்தது?",
      symptomsTitle: "கண்டறியப்பட்ட நோய் அறிகுறிகள்",
      severityTitle: "தாக்கத்தின் தீவிரம்",
      severityLevels: {
        low: "குறைவு (<15% தாக்கம்)",
        lowDesc: "தொடக்க நிலை. வேப்பெண்ணெய் அல்லது உயிரியல் பூஞ்சாணக் கொல்லி மூலம் எளிதில் குணப்படுத்தலாம்.",
        medium: "நடுத்தரம் (15% - 40% தாக்கம்)",
        mediumDesc: "இலைகளில் வேகமாக பரவுகிறது. விளைச்சல் குறையாமல் பாதுகாக்க சரியான ரசாயன மருந்து தேவை.",
        high: "தீவிரம் (>40% தாக்கம்)",
        highDesc: "கடும் சேதம். உடனடியாக அவசர மருந்து தெளிப்பும் வயல் தனிமைப்படுத்தலும் அவசியம்.",
      },
      treatmentTitle: "இப்போது விவசாயி என்ன செய்ய வேண்டும்?",
      immediateAction: "1. உடனடி நடவடிக்கை",
      culturalPractices: "2. சாகுபடி முறைகள்",
      organicControl: "3. இயற்கை / உயிரியல் கட்டுப்பாடு",
      chemicalControl: "4. ரசாயன கட்டுப்பாடு",
      verifiedBadge: "சரிபார்க்கப்பட்ட வேளாண் மருந்து பரிந்துரை",
      generalAdviceBadge: "பொதுவான சிகிச்சை ஆலோசனை",
      safetyRuleNotice: "துல்லியமான மருந்து அளவு தயாரிப்பு நிறுவனம் மற்றும் உள்ளூர் வேளாண் பரிந்துரைகளை சார்ந்தது. தெளிக்கும் முன் தயாரிப்பு லேபிளை படித்து வேளாண் அலுவலரிடம் உறுதி செய்யவும்.",
      productName: "மருந்தின் பெயர்",
      activeIngredient: "செயலில் உள்ள வேதிப்பொருள் (Active Ingredient)",
      recommendedDosage: "பரிந்துரைக்கப்பட்ட அளவு",
      waterQuantity: "ஏக்கருக்கு தேவைப்படும் தண்ணீரின் அளவு",
      applicationMethod: "தெளிக்கும் முறை",
      applicationFrequency: "எத்தனை நாட்களுக்கு ஒருமுறை",
      preHarvestInterval: "அறுவடைக்கு முன் இடைவெளி",
      safetyPrecautions: "பாதுகாப்பு & முன்னெச்சரிக்கைகள்",
      sourceChecked: "சரிபார்க்கப்பட்ட வேளாண் ஆதாரம்",
    },
    calculator: {
      title: "நில அளவு & மருந்து கணக்கீட்டு கருவி",
      subtitle: "உங்கள் நில ஏக்கருக்கு தேவையான மருந்து அளவு மற்றும் தோராய செலவை கணக்கிடுங்கள்.",
      enterFarmSize: "நில அளவை பதிவு செய்யவும் (ஏக்கரில்)",
      acres: "ஏக்கர்",
      recommendedQuantityPerAcre: "ஏக்கருக்கு தேவையான அளவு",
      totalQuantityRequired: "மொத்தம் தேவைப்படும் மருந்து அளவு",
      productCost: "மருந்து வாங்கும் செலவு",
      laborCost: "தெளிப்பு கூலி செலவு",
      otherCost: "இதர / தண்ணீர் செலவு",
      estimatedTotal: "மொத்த தோராய செலவு",
      priceUnavailableNotice: "சந்தை விலை தகவல் இல்லை — உங்கள் உள்ளூர் கடை விலையை பதிவு செய்யவும்:",
      enterCustomPrice: "உள்ளூர் சந்தை விலை (₹)",
      costDisclaimer: "இது ஒரு தோராயமான மதிப்பீடு மட்டுமே. சந்தை விலைகளும் கூலியும் பகுதிக்கு ஏற்ப மாறுபடும்.",
      sprayTankMixTitle: "தெளிப்பான் தொட்டி கரைசல் தயாரிப்பு",
    },
    prevention: {
      title: "இந்த நோய் மீண்டும் வராமல் தடுப்பது எப்படி?",
      subtitle: "அடுத்த பருவ பயிர்களில் நோய் தாக்குதலை தவிர்க்க உதவும் சிறந்த சாகுபடி பழக்கங்கள்.",
      hygiene: "வயல் தூய்மை: உதிர்ந்த பாதிக்கப்பட்ட இலைகளை சேகரித்து வயலுக்கு வெளியே தீயிட்டு அழிக்கவும்.",
      spacing: "சரியான இடைவெளி: சூரிய ஒளி மற்றும் காற்றோட்டம் சீராக கிடைக்க செடிகளுக்கு இடையே சரியான இடைவெளி விடவும்.",
      irrigation: "பாசன மேலாண்மை: இலைகள் இரவு முழுவதும் ஈரமாக இருப்பதை தவிர்க்க தெளிப்பு பாசனத்திற்கு பதில் சொட்டுநீர் பாசனம் செய்யவும்.",
      rotation: "பயிர் சுழற்சி: ஒரே நிலத்தில் தொடர்ந்து ஒரே குடும்பத்து பயிர்களை நடவு செய்யாதீர்கள்.",
      monitoring: "தொடர் கண்காணிப்பு: வாரத்திற்கு இருமுறை இலையின் அடிப்பகுதியை பரிசோதித்து நோயை ஆரம்பத்திலேயே கண்டறியவும்.",
    },
    chat: {
      title: "கிசான் மித்ரா AI (விவசாய தோழன்)",
      subtitle: "பயிர் நோய்கள், மருந்துகள், தொட்டி கலவை மற்றும் வானிலை பாதுகாப்பு பற்றி கேளுங்கள்.",
      newChat: "புதிய உரையாடல்",
      chatHistory: "முந்தைய உரையாடல்கள்",
      today: "இன்று",
      yesterday: "நேற்று",
      older: "பழைய உரையாடல்கள்",
      noChats: "முந்தைய உரையாடல்கள் எதுவும் இல்லை.",
      inputPlaceholder: "உங்கள் விவசாய கேள்வியை கேளுங்கள் (எ.கா: மருந்து அளவு, இயற்கை முறை)...",
      send: "அனுப்பு",
      listening: "கேட்கிறது...",
      speakVoice: "குரலில் கேளுங்கள்",
      activeScanContext: "தற்போது ஆய்வு செய்த இலை:",
      discussScan: "இந்த ஆய்வு பற்றி கேட்கவும்",
      safetyNotice: "AI உதவியாளர் விவசாய விழிப்புணர்வுக்காக மட்டுமே பதிலளிக்கிறது. கடுமையான நோய் தாக்கங்களில் உள்ளூர் வேளாண்மை அலுவலரை அணுகவும்.",
      quickPrompts: [
        "இந்த நோய்க்கு 16 லிட்டர் தொட்டியில் எவ்வளவு மருந்து கலக்க வேண்டும்?",
        "ஆரம்ப தடுப்புக்கு எந்த இயற்கை வேப்ப மருந்தை பயன்படுத்தலாம்?",
        "வெயில் காலத்தில் மருந்து தெளிக்க சிறந்த நேரம் எது?",
        "அடுத்த பயிருக்கு இந்த நோய் பரவாமல் தடுப்பது எப்படி?",
      ],
    },
  },
};

// Aliases for short language codes (en, te, hi, ta)
(TRANSLATIONS as any)['en'] = TRANSLATIONS.english;
(TRANSLATIONS as any)['te'] = TRANSLATIONS.telugu;
(TRANSLATIONS as any)['hi'] = TRANSLATIONS.hindi;
(TRANSLATIONS as any)['ta'] = TRANSLATIONS.tamil;

export function getTranslations(lang: string | undefined): TranslationSchema {
  if (!lang) return TRANSLATIONS.english;
  const lower = lang.toLowerCase().trim();
  if (lower === 'te' || lower === 'telugu') return TRANSLATIONS.telugu;
  if (lower === 'hi' || lower === 'hindi') return TRANSLATIONS.hindi;
  if (lower === 'ta' || lower === 'tamil') return TRANSLATIONS.tamil;
  return TRANSLATIONS.english;
}
