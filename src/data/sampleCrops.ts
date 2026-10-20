import { AgriShieldReport } from '../types/agrishield';

export interface SampleCropItem {
  id: string;
  name: string;
  cropName: string;
  diseaseEnglish: string;
  stage: 'Low' | 'Moderate' | 'Severe';
  severityPercentage: number;
  thumbnailSvg: string;
  report: AgriShieldReport;
}

export const SAMPLE_CROPS: SampleCropItem[] = [
  {
    id: 'sample-tomato-late-blight',
    name: 'Tomato - Late Blight (Phytophthora)',
    cropName: 'Tomato',
    diseaseEnglish: 'Late Blight (Phytophthora infestans)',
    stage: 'Severe',
    severityPercentage: 54.8,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect width="400" height="300" fill="%231c251e"/>
      <path d="M200,20 C270,70 340,160 310,240 C280,270 230,280 200,275 C170,280 120,270 90,240 C60,160 130,70 200,20 Z" fill="%232b6e3f" stroke="%23388e3c" stroke-width="3"/>
      <path d="M200,30 L200,275" stroke="%2322522e" stroke-width="4"/>
      <path d="M200,80 Q250,90 280,120" stroke="%2322522e" stroke-width="2.5" fill="none"/>
      <path d="M200,130 Q140,140 110,180" stroke="%2322522e" stroke-width="2.5" fill="none"/>
      <path d="M200,180 Q260,200 290,230" stroke="%2322522e" stroke-width="2.5" fill="none"/>
      <path d="M120,110 Q160,80 190,130 Q160,180 110,160 Z" fill="%234a2810" opacity="0.85"/>
      <path d="M130,120 Q150,100 170,130 Q150,160 120,150 Z" fill="%23241208" opacity="0.95"/>
      <path d="M210,140 Q280,130 290,210 Q240,240 205,190 Z" fill="%234a2810" opacity="0.88"/>
      <path d="M225,155 Q270,150 275,200 Q235,220 215,185 Z" fill="%231e0f07" opacity="0.95"/>
      <circle cx="160" cy="220" r="28" fill="%234a2810" opacity="0.8"/>
      <circle cx="160" cy="220" r="18" fill="%231f1008" opacity="0.95"/>
      <circle cx="200" cy="65" r="18" fill="%234a2810" opacity="0.75"/>
      <circle cx="120" cy="110" r="12" fill="%23a4b040" opacity="0.35"/>
      <circle cx="280" cy="180" r="16" fill="%23a4b040" opacity="0.35"/>
      <text x="20" y="285" fill="%23f87171" font-family="sans-serif" font-size="14" font-weight="bold">Stage: Severe (54.8% Area Necrosis)</text>
    </svg>`,
    report: {
      cropName: "Tomato (Solanum lycopersicum)",
      diseaseName: "Late Blight (Phytophthora infestans)",
      confidence: 94,
      isLowConfidence: false,
      symptoms: [
        "Dark brown to black water-soaked lesions across leaves and stems",
        "White fungal mildew growth on lower leaf surface during high humidity",
        "Rapid collapse and browning of leaf foliage",
        "Brown firm rotting patches on green and ripe tomato fruits",
      ],
      severity: "High",
      severityExplanation: "Infection coverage exceeds 40%. The pathogen spreads rapidly through air and water droplets. High risk of complete crop loss if curative action is not taken within 24-48 hours.",
      whatIsHappening: "Late Blight is an aggressive water mold pathogen (Phytophthora infestans). When continuous dampness or fog occurs, the fungus multiplies into millions of microscopic spores that penetrate leaf stomata, destroying plant tissue within days.",
      treatment: {
        immediateAction: [
          "Cease all sprinkler or overhead irrigation immediately to stop moisture retention on foliage.",
          "Carefully prune infected lower leaves using clean shears; do not shake infected vines.",
          "Prepare emergency systemic curative fungicide spray as soon as morning dew dries.",
        ],
        culturalPractices: [
          "Stake plants upright to improve ventilation and keep leaves off wet soil.",
          "Ensure wide drainage furrows so water never stagnates near root zones.",
          "Disinfect pruning tools with 10% bleach solution between crop rows.",
        ],
        organicControl: [
          "Apply Bordeaux Mixture (1% concentration) or Copper Oxychloride in early or organic plots.",
          "Foliar spray of Trichoderma harzianum bio-agent at root collar to prevent soil-borne spore cycling.",
        ],
        chemicalControl: [
          "Apply Dimethomorph 50% WP (2.5g/L) + Mancozeb 75% WP (3.0g/L) as a calibrated tank mix.",
          "Alternate with Cymoxanil 8% + Mancozeb 64% WP after 7-10 days to prevent chemical resistance.",
        ],
        prevention: [
          "Rotate land with non-solanaceous crops (e.g. Maize, Sorghum, Legumes) for at least 2 seasons.",
          "Always select certified blight-resistant hybrid seed varieties.",
        ],
      },
      prevention: [
        "Maintain minimum 60cm row spacing to allow sunlight penetration and drying winds.",
        "Deep-bury or burn infected plant debris away from farm boundary at season end.",
        "Avoid overhead irrigation; use drip lines at soil level.",
      ],
      pesticideInformation: {
        productName: "Acrobat (Dimethomorph 50% WP) + Dithane M-45 (Mancozeb)",
        activeIngredient: "Dimethomorph 50% WP + Mancozeb 75% WP",
        formulation: "Wettable Powder (WP)",
        recommendedDosage: "Mix 2.5g Dimethomorph + 3.0g Mancozeb per Litre of water (500g + 600g per acre in 200 Litres)",
        waterQuantity: "200 Litres per Acre (12 to 13 knapsack spray tanks)",
        unitQuantityPerAcre: 500,
        unit: "g",
        applicationMethod: "Foliar curative spray using hollow-cone nozzle, coating adaxial and abaxial surfaces",
        applicationFrequency: "Repeat after 7-10 days if humid, cloudy weather persists",
        preHarvestIntervalDays: 5,
        safetyPrecautions: [
          "Wear protective face mask, rubber gloves, and long sleeves while mixing powder.",
          "Spray during calm early morning or late evening; never spray against wind direction.",
          "Do not harvest tomatoes within 5 days of spray application.",
          "Triple-rinse and safely dispose empty chemical pouches away from water ponds.",
        ],
        source: "ICAR - Indian Institute of Horticultural Research (IIHR) Blight Management Manual",
        dateChecked: "2026",
      },
      organicControl: [
        "Cold-pressed Neem Oil (10,000 ppm) @ 5ml/L with liquid soap emulsifier as a spore repellent.",
        "Bio-fungicide Trichoderma viride @ 5g/L sprayed during cloudy evening hours.",
      ],
      estimatedCost: {
        productCostPerAcre: 850,
        laborCostPerAcre: 400,
        otherCostPerAcre: 150,
      },
      warning: "Do not exceed two consecutive sprays of the same systemic chemical group to avoid fungicide resistance in Phytophthora strains.",
      sources: [
        "ICAR-IIHR Plant Pathology Guidelines",
        "National Institute of Plant Health Management (NIPHM)",
        "TNAU Agritech Portal",
      ],
      analysis_metadata: {
        crop_detected: "Tomato (Solanum lycopersicum)",
        severity_percentage: 54.8,
        infection_stage: "Severe",
      },
      languages: {
        english: {
          disease_name: "Tomato Late Blight (Phytophthora infestans)",
          recommended_pesticide: "Dimethomorph 50% WP + Mancozeb 75% WP",
          exact_dosage: "Mix 2.5g Dimethomorph + 3.0g Mancozeb per Litre of water (500g in 200L per acre)",
          usage_instructions: "Apply emergency curative spray covering both leaf surfaces immediately. Prune and destroy blighted foliage. Avoid overhead sprinkler irrigation and maintain farm quarantine.",
          sustainability_mitigation_tip: "Observe 5-day pre-harvest waiting period. Deep-bury blighted residue away from farm boundary.",
        },
        telugu: {
          disease_name: "టమోటా లేట్ బ్లైట్ / మాడు తెగులు",
          recommended_pesticide: "డైమెథోమార్ఫ్ 50% WP + మాంకోజెబ్ 75% WP",
          exact_dosage: "లీటరు నీటికి 2.5 గ్రాముల డైమెథోమార్ఫ్ + 3 గ్రాముల మాంకోజెబ్ (ఎకరాకు 200 లీటర్ల నీటిలో 500 గ్రాములు)",
          usage_instructions: "ఆకుల పైభాగం, అడుగుభాగం తడిచేలా వెంటనే పిచికారీ చేయాలి. పూర్తిగా మాడిన ఆకులను కాల్చేయండి. స్ప్రింక్లర్లతో పైనుంచి నీరు పోయడం ఆపండి.",
          sustainability_mitigation_tip: "మందు కొట్టిన తర్వాత 5 రోజుల వరకు కాయలు కోయవద్దు. పొలంలో నీరు నిల్వ ఉండకుండా డ్రైనేజీ కాలువలు తీయండి.",
        },
        tamil: {
          disease_name: "தக்காளி பின் கருகல் நோய் (Phytophthora infestans)",
          recommended_pesticide: "டைமெத்தோமார்ப் 50% WP + மேன்கோசெப் 75% WP",
          exact_dosage: "ஒரு லிட்டர் தண்ணீருக்கு 2.5 கிராம் டைமெத்தோமார்ப் + 3 கிராம் மேன்கோசெப் (ஏக்கருக்கு 200 லிட்டர் நீரில் 500 கிராம்)",
          usage_instructions: "இலையின் மேல் மற்றும் அடிப்பகுதியில் படுமாறு உடனே தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை உடனே அகற்றி எரிக்கவும்.",
          sustainability_mitigation_tip: "மருந்து தெளித்த பின் 5 நாட்கள் அறுவடை செய்யக்கூடாது. பண்ணைக் கருவிகளை சுத்தமாக பராமரிக்கவும்.",
        },
        hindi: {
          disease_name: "टमाटर का पछेती झुलसा रोग (लेट ब्लाइट)",
          recommended_pesticide: "डाइमेथोमॉर्फ 50% WP + मैंकोजेब 75% WP",
          exact_dosage: "प्रति लीटर पानी में 2.5 ग्राम डाइमेथोमॉर्फ और 3 ग्राम मैंकोजेब (प्रति एकड़ 200 लीटर में 500 ग्राम)",
          usage_instructions: "पत्तियों के दोनों तरफ अच्छी तरह से तुरंत छिड़काव करें। सड़ी हुई पत्तियों को काटकर खेत से दूर जला दें।",
          sustainability_mitigation_tip: "दवा छिड़कने के 5 दिन बाद ही फल की तुड़ाई करें। खेत में जलभराव न होने दें।",
        },
      },
    },
  },
  {
    id: 'sample-cotton-leaf-curl',
    name: 'Cotton - Leaf Curl & Whitefly Infestation',
    cropName: 'Cotton',
    diseaseEnglish: 'Cotton Leaf Curl Virus (CLCuV) & Whitefly Vector',
    stage: 'Moderate',
    severityPercentage: 27.6,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect width="400" height="300" fill="%231a231d"/>
      <path d="M200,40 C230,70 310,120 300,190 C290,240 240,260 200,270 C160,260 110,240 100,190 C90,120 170,70 200,40 Z" fill="%23437a3c" stroke="%2356994c" stroke-width="3"/>
      <path d="M200,40 L200,270" stroke="%23285724" stroke-width="3"/>
      <path d="M200,100 Q240,110 270,140 Q250,160 220,135" stroke="%23a3e635" stroke-width="3.5" fill="none"/>
      <path d="M200,140 Q150,150 120,180 Q145,200 180,170" stroke="%23a3e635" stroke-width="3.5" fill="none"/>
      <path d="M200,190 Q250,210 280,230" stroke="%23a3e635" stroke-width="3" fill="none"/>
      <circle cx="240" cy="130" r="16" fill="%23facc15" opacity="0.35"/>
      <circle cx="140" cy="180" r="18" fill="%23facc15" opacity="0.35"/>
      <circle cx="180" cy="220" r="14" fill="%23facc15" opacity="0.35"/>
      <circle cx="250" cy="190" r="15" fill="%23facc15" opacity="0.35"/>
      <text x="20" y="285" fill="%23fbbf24" font-family="sans-serif" font-size="14" font-weight="bold">Stage: Moderate (27.6% Vein Thickening)</text>
    </svg>`,
    report: {
      cropName: "Cotton (Gossypium hirsutum)",
      diseaseName: "Cotton Leaf Curl Virus (CLCuV)",
      confidence: 91,
      isLowConfidence: false,
      symptoms: [
        "Upward curling and cup-like puckering of leaves",
        "Thickening of main veins on leaf undersides (enation)",
        "Stunted vegetative growth and reduced boll formation",
        "Presence of small whitefly vector nymphs under foliage",
      ],
      severity: "Medium",
      severityExplanation: "Between 15% and 40% foliage shows leaf puckering and vein thickening. The viral agent is carried by the whitefly insect vector. Controlling whiteflies prevents transmission to healthy acreage.",
      whatIsHappening: "Cotton Leaf Curl Virus is a Begomovirus transmitted exclusively by the Silverleaf Whitefly (Bemisia tabaci). As whiteflies feed on plant sap, they inject viral particles into the phloem, causing hormonal imbalance and distorted growth.",
      treatment: {
        immediateAction: [
          "Install 12-15 yellow sticky cards per acre at crop canopy height to trap adult whitefly vectors.",
          "Target insecticidal spray specifically at leaf undersides where nymphs cluster.",
          "Rogue out and destroy severely stunted virus-infected plants to limit inoculum source.",
        ],
        culturalPractices: [
          "Plant border rows of Sorghum, Maize, or Pearl Millet as a natural biological barrier against flying whiteflies.",
          "Avoid excessive nitrogen fertilizer application which promotes succulent tender foliage attractive to sap-feeders.",
        ],
        organicControl: [
          "Spray Neem Seed Kernel Extract (NSKE 5%) or 10,000 ppm Neem Oil @ 3-5 ml/L.",
          "Foliar spray of entomopathogenic fungus Lecanicillium lecanii @ 5g/L during humid evening hours.",
        ],
        chemicalControl: [
          "Spray Diafenthiuron 50% WP @ 1.5g per Litre of water (250g in 150-200L water per acre).",
          "For severe nymph colonies, alternate with Pyriproxyfen 10% EC @ 2ml/L.",
        ],
        prevention: [
          "Use certified CLCuV-resistant Bt cotton hybrid cultivars.",
          "Synchronize sowing dates within the village farming cluster to avoid staggered whitefly migrations.",
        ],
      },
      prevention: [
        "Eradicate alternative weed hosts (like Abutilon indicum and Parthenium) around field bunds.",
        "Avoid planting cotton adjacent to alternate vector crops like bhindi (okra) or brinjal.",
      ],
      pesticideInformation: {
        productName: "Pegasus (Diafenthiuron 50% WP)",
        activeIngredient: "Diafenthiuron 50% WP",
        formulation: "Wettable Powder (WP)",
        recommendedDosage: "Mix 1.5g per Litre of water (250g in 150-200 Litres of water per acre)",
        waterQuantity: "150-200 Litres per Acre (10-12 knapsack spray tanks)",
        unitQuantityPerAcre: 250,
        unit: "g",
        applicationMethod: "Foliar spray directed upwards to wet leaf underside thoroughly",
        applicationFrequency: "Do not exceed 2 consecutive applications; rotate chemistry",
        preHarvestIntervalDays: 14,
        safetyPrecautions: [
          "Wear protective mask and goggles. Avoid inhaling pesticide spray mist.",
          "Spray during early morning hours (6:30 AM to 9:30 AM) when whiteflies are inactive.",
          "Keep livestock and grazing animals away from sprayed fields for 14 days.",
        ],
        source: "Central Institute for Cotton Research (CICR) Integrated Pest Management Package",
        dateChecked: "2026",
      },
      organicControl: [
        "Cold-pressed Neem Oil (10,000 ppm) @ 5ml/L + liquid soap surfactant.",
        "Yellow sticky traps placed at canopy level (15 cards/acre).",
      ],
      estimatedCost: {
        productCostPerAcre: 680,
        laborCostPerAcre: 350,
        otherCostPerAcre: 100,
      },
      warning: "Do not repeatedly spray synthetic pyrethroids as they trigger pest resurgence and eliminate natural predator ladybird beetles.",
      sources: [
        "ICAR - Central Institute for Cotton Research (CICR)",
        "NIPHM Cotton IPM Manual",
      ],
      analysis_metadata: {
        crop_detected: "Cotton (Gossypium hirsutum)",
        severity_percentage: 27.6,
        infection_stage: "Moderate",
      },
      languages: {
        english: {
          disease_name: "Cotton Leaf Curl Virus & Whitefly Vector",
          recommended_pesticide: "Diafenthiuron 50% WP (Targeted Insecticide)",
          exact_dosage: "Mix 1.5g Diafenthiuron per Litre of water (250g in 150-200L per acre)",
          usage_instructions: "Spray thoroughly during morning hours focusing on the underside of leaves. Install yellow sticky traps (10-15 per acre).",
          sustainability_mitigation_tip: "Do not exceed two consecutive applications to avoid pesticide resistance. Plant sorghum/maize borders.",
        },
        telugu: {
          disease_name: "పత్తి ఆకు ముడుత తెగులు మరియు తెల్లదోమ ఉధృతి",
          recommended_pesticide: "డయాఫెంథియురాన్ 50% WP లేదా పైరిప్రాక్సిఫెన్ 10% EC",
          exact_dosage: "లీటరు నీటికి 1.5 గ్రాముల డయాఫెంథియురాన్ (ఎకరాకు 150-200 లీటర్ల నీటిలో 250 గ్రాములు)",
          usage_instructions: "ఉదయం పూట ఆకుల అడుగు భాగం తడిచేలా పిచికారీ చేయాలి. ఎకరాకు 10-15 పసుపు జిగురు అట్టలను అమర్చండి.",
          sustainability_mitigation_tip: "దోమల్లో నిరోధకత రాకుండా ఒకే మందును వరుసగా వాడవద్దు. గట్ల వెంబడి జొన్న లేదా మొక్కజొన్నను నాటండి.",
        },
        tamil: {
          disease_name: "பருத்தி இலைச்சுருள் நோய் மற்றும் வெள்ளை ஈ",
          recommended_pesticide: "டயாபென்தியூரான் 50% WP (Diafenthiuron)",
          exact_dosage: "ஒரு லிட்டர் தண்ணீருக்கு 1.5 கிராம் (ஏக்கருக்கு 150-200 லிட்டர் நீரில் 250 கிராம்)",
          usage_instructions: "காலை வேளையில் இலையின் அடிப்பகுதி நன்கு நனையுமாறு தெளிக்கவும். ஏக்கருக்கு 10 மஞ்சள் ஒட்டும் பொறிகள் வைக்கவும்.",
          sustainability_mitigation_tip: "தொடர்ந்து ஒரே மருந்தை பயன்படுத்தாமல் சுழற்சி முறையில் தெளிக்கவும். வயல் வரப்புகளில் மக்காச்சோளம் பயிரிடவும்.",
        },
        hindi: {
          disease_name: "कपास पत्ती मरोड़ रोग एवं सफेद मक्खी का प्रकोप",
          recommended_pesticide: "डायफेंथियूरॉन 50% WP अथवा पाइरीप्रॉक्सीफेन 10% EC",
          exact_dosage: "प्रति लीटर पानी में 1.5 ग्राम (प्रति एकड़ 150-200 लीटर पानी में 250 ग्राम)",
          usage_instructions: "सुबह के समय पत्तियों की निचली सतह पर अच्छी तरह स्प्रे करें। प्रति एकड़ 10-12 पीले चिपचिपे ट्रैप लगाएं।",
          sustainability_mitigation_tip: "प्रतिरोधक क्षमता से बचने के लिए एक ही कीटनाशक को बार-बार न दोहराएं। खेत की मेड़ों पर मक्का की बाड़ लगाएं।",
        },
      },
    },
  },
  {
    id: 'sample-rice-bacterial-blight',
    name: 'Paddy / Rice - Bacterial Leaf Blight',
    cropName: 'Paddy / Rice',
    diseaseEnglish: 'Bacterial Leaf Blight (Xanthomonas oryzae pv. oryzae)',
    stage: 'Moderate',
    severityPercentage: 33.5,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect width="400" height="300" fill="%231b261a"/>
      <path d="M185,15 C215,70 235,160 220,285 L180,285 C165,160 170,70 185,15 Z" fill="%233b7d34" stroke="%23489e3f" stroke-width="2"/>
      <path d="M190,15 L190,285" stroke="%23255220" stroke-width="2.5"/>
      <path d="M195,40 C220,90 235,150 225,230 L210,230 C220,160 205,100 195,40 Z" fill="%23d4a342" opacity="0.9"/>
      <path d="M175,70 C165,120 160,180 170,250 L180,250 C170,180 175,130 185,80 Z" fill="%23c28e2b" opacity="0.85"/>
      <path d="M210,70 C225,100 230,130 220,170" stroke="%23854d0e" stroke-width="2" fill="none"/>
      <text x="20" y="285" fill="%23fbbf24" font-family="sans-serif" font-size="14" font-weight="bold">Stage: Moderate (33.5% Wavy Leaf Margin Blight)</text>
    </svg>`,
    report: {
      cropName: "Rice / Paddy (Oryza sativa)",
      diseaseName: "Bacterial Leaf Blight (Xanthomonas oryzae)",
      confidence: 93,
      isLowConfidence: false,
      symptoms: [
        "Water-soaked to yellowish-white wavy lesions starting at leaf tips and margins",
        "Lesions turn dull straw-colored with translucent wavy margins",
        "Amber-colored bacterial ooze droplets visible in early morning dew",
        "Complete drying and rolling of infected paddy blades (kresek symptom)",
      ],
      severity: "Medium",
      severityExplanation: "Between 15% and 40% of the leaf blade shows straw-colored marginal drying. The bacteria spreads easily via irrigation water and driving rains.",
      whatIsHappening: "Xanthomonas oryzae bacteria enter the plant through natural openings (hydathodes) and microscopic root wounds caused during transplanting. They multiply inside xylem vessels, blocking water flow and desiccating leaf margins.",
      treatment: {
        immediateAction: [
          "Drain stagnant standing water from the paddy field for 48-72 hours to break bacterial transmission.",
          "Immediately suspend top-dressing of nitrogen (urea) fertilizers until the disease is checked.",
          "Spray bactericide mixture on sunny mornings once morning dew has evaporated.",
        ],
        culturalPractices: [
          "Apply balanced potassium (Muriate of Potash @ 15-20 kg/acre) to strengthen plant cuticle.",
          "Avoid walking, clipping leaf tips, or dragging equipment through wet infected paddy.",
        ],
        organicControl: [
          "Foliar spray of fresh cow dung slurry extract (20% concentration) or Pseudomonas fluorescens @ 5g/L.",
        ],
        chemicalControl: [
          "Copper Hydroxide 53.8% DF (2g/L) + Streptocycline (6g per 50L water).",
        ],
        prevention: [
          "Grow BLB-resistant varieties such as Improved Samba Mahsuri (B92), Swarna-Sub1, or Ajaya.",
          "Treat seeds with Streptocycline (1g in 10L water) soaked for 8 hours prior to nursery sowing.",
        ],
      },
      prevention: [
        "Avoid clipping the tips of seedlings at the time of transplanting.",
        "Ensure field bunds are weed-free, especially of wild grasses that harbor Xanthomonas bacteria.",
      ],
      pesticideInformation: {
        productName: "Kocide 2000 (Copper Hydroxide 53.8% DF) + Streptocycline",
        activeIngredient: "Copper Hydroxide 53.8% DF + Streptomycin Sulfate + Tetracycline Hydrochloride",
        formulation: "Dry Flowable (DF) + Soluble Powder Pouch",
        recommendedDosage: "Mix 2.0g Copper Hydroxide + 6g Streptocycline pouch per 50 Litres of water (400g Cu Hydroxide + 18g Streptocycline in 150L water/acre)",
        waterQuantity: "150 Litres per Acre (9-10 knapsack spray tanks)",
        unitQuantityPerAcre: 400,
        unit: "g",
        applicationMethod: "Foliar spray with flat fan nozzle onto standing paddy canopy",
        applicationFrequency: "Repeat after 10-12 days if new wavy lesions continue to emerge",
        preHarvestIntervalDays: 15,
        safetyPrecautions: [
          "Do not mix Copper Hydroxide directly with acidic insecticides or liquid fertilizers.",
          "Wear protective face mask and gloves during preparation.",
          "Prevent chemical runoff into fish or duck ponds.",
        ],
        source: "ICAR - National Rice Research Institute (NRRI) & IRRI Blight Factsheet",
        dateChecked: "2026",
      },
      organicControl: [
        "Pseudomonas fluorescens liquid bio-agent @ 2.5 ml/L sprayed at tillering stage.",
      ],
      estimatedCost: {
        productCostPerAcre: 520,
        laborCostPerAcre: 350,
        otherCostPerAcre: 80,
      },
      warning: "Excess nitrogen fertilization makes paddy blades soft and succulent, drastically accelerating bacterial spread.",
      sources: [
        "ICAR - Indian Institute of Rice Research (IIRR)",
        "International Rice Research Institute (IRRI)",
      ],
      analysis_metadata: {
        crop_detected: "Rice / Paddy (Oryza sativa)",
        severity_percentage: 33.5,
        infection_stage: "Moderate",
      },
      languages: {
        english: {
          disease_name: "Bacterial Leaf Blight of Rice (Xanthomonas oryzae)",
          recommended_pesticide: "Copper Hydroxide 53.8% DF + Streptocycline",
          exact_dosage: "Mix 2.0g Copper Hydroxide + 6g Streptocycline per 50 Litres of water (400g in 150L/acre)",
          usage_instructions: "Drain excess standing water from the field for 48 hours. Spray during clear weather without wind. Temporarily withhold top-dress nitrogen fertilizer until lesions dry.",
          sustainability_mitigation_tip: "Apply potash (15-20 kg/acre) to build leaf cuticle strength. Avoid walking through wet infected paddy.",
        },
        telugu: {
          disease_name: "వరి బాక్టీరియా ఆకు ఎండు తెగులు (BLB)",
          recommended_pesticide: "కాపర్ హైడ్రాక్సైడ్ 53.8% DF + స్ట్రెప్టోసైక్లిన్",
          exact_dosage: "లీటరు నీటికి 2 గ్రాముల కాపర్ హైడ్రాక్సైడ్ + 50 లీటర్ల నీటికి 6గ్రా స్ట్రెప్టోసైక్లిన్ (ఎకరాకు 150 లీటర్లు)",
          usage_instructions: "ముందుగా పొలంలో నిల్వ ఉన్న నీటిని 2 రోజుల పాటు బయటకు తీయాలి. యూరియా ఎరువు వేయడం తాత్కాలికంగా ఆపండి. పగటి పూట పిచికారీ చేయండి.",
          sustainability_mitigation_tip: "ఎకరాకు 15-20 కిలోల పొటాష్ ఎరువు వేయడం ద్వారా పైరుకు రోగనిరోధక శక్తి పెరుగుతుంది. తడి చేలో నడవకండి.",
        },
        tamil: {
          disease_name: "நெல் பாக்டீரியா இலைக்கருகல் நோய் (BLB)",
          recommended_pesticide: "காப்பர் ஹைட்ராக்சைடு 53.8% DF + ஸ்ட்ரெப்டோமைசின்",
          exact_dosage: "ஒரு லிட்டர் தண்ணீருக்கு 2 கிராம் காப்பர் ஹைட்ராக்சைடு + 50 லிட்டருக்கு 6 கிராம் ஸ்ட்ரெப்டோசைக்ளின்",
          usage_instructions: "வயலில் தேங்கியுள்ள நீரை உடனடியாக வடிகட்டவும். நோய் கட்டுக்குள் வரும் வரை யூரியா உரமிடுவதை தவிர்க்கவும்.",
          sustainability_mitigation_tip: "ஏக்கருக்கு 15-20 கிலோ பொட்டாஷ் உரம் இடுவதால் தாவரத்தின் எதிர்ப்புத்திறன் கூடும்.",
        },
        hindi: {
          disease_name: "धान का जीवाणु झुलसा रोग (बैक्टीरियल लीफ ब्लाइट)",
          recommended_pesticide: "कॉपर हाइड्रोक्साइड 53.8% DF + स्ट्रेप्टोसाइक्लिन",
          exact_dosage: "प्रति लीटर पानी में 2 ग्राम कॉपर हाइड्रोक्साइड + 50 लीटर में 6 ग्राम स्ट्रेप्टोसाइक्लिन (प्रति एकड़ 150L)",
          usage_instructions: "खेत से अतिरिक्त पानी 2 दिन के लिए निकाल दें। जब तक बीमारी ठीक न हो, यूरिया का प्रयोग रोक दें।",
          sustainability_mitigation_tip: "पौधों को मजबूती देने के लिए प्रति एकड़ 15-20 किलो पोटाश डालें। गीले खेत में अनावश्यक आवाजाही न करें।",
        },
      },
    },
  },
  {
    id: 'sample-chilli-anthracnose',
    name: 'Chilli - Early Anthracnose / Fruit Spot',
    cropName: 'Chilli',
    diseaseEnglish: 'Anthracnose & Leaf Spot (Colletotrichum capsici)',
    stage: 'Low',
    severityPercentage: 8.4,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect width="400" height="300" fill="%231a241c"/>
      <path d="M200,30 C260,80 300,160 270,230 C245,265 210,270 200,270 C190,270 155,265 130,230 C100,160 140,80 200,30 Z" fill="%233e8538" stroke="%234fa347" stroke-width="2.5"/>
      <path d="M200,30 L200,270" stroke="%23285724" stroke-width="2.5"/>
      <circle cx="160" cy="110" r="10" fill="%23422006" stroke="%23a16207" stroke-width="1.5"/>
      <circle cx="160" cy="110" r="4" fill="%231c0a00"/>
      <circle cx="230" cy="140" r="8" fill="%23422006" stroke="%23a16207" stroke-width="1.5"/>
      <circle cx="230" cy="140" r="3" fill="%231c0a00"/>
      <circle cx="185" cy="190" r="9" fill="%23422006" stroke="%23a16207" stroke-width="1.5"/>
      <circle cx="215" cy="225" r="7" fill="%23422006" stroke="%23a16207" stroke-width="1"/>
      <text x="20" y="285" fill="%234ade80" font-family="sans-serif" font-size="14" font-weight="bold">Stage: Low (8.4% Surface Area - Preventive Mode)</text>
    </svg>`,
    report: {
      cropName: "Chilli / Pepper (Capsicum annuum)",
      diseaseName: "Anthracnose & Fruit Rot (Colletotrichum capsici)",
      confidence: 90,
      isLowConfidence: false,
      symptoms: [
        "Small circular sunken spots with black concentric rings on leaves and green pods",
        "Tip die-back and withering of tender twigs starting from apex",
        "Discoloration and premature dropping of flowers and young chilli pods",
      ],
      severity: "Low",
      severityExplanation: "Infection is below 15% coverage, confined to pinpoint spots. Standard chemical pesticides are NOT necessary at this threshold; bio-organic remedies are recommended to conserve natural predators.",
      whatIsHappening: "Colletotrichum fungus produces conidia that spread via splash droplets from overhead rains or dew. The fungus attacks succulent tissue, especially young flower buds and fruits, causing circular sunken lesions.",
      treatment: {
        immediateAction: [
          "Remove and safely dispose of any spot-bearing leaves or fallen chilli pods.",
          "Apply preventive cold-pressed Neem Oil spray or Trichoderma viride in late evening.",
        ],
        culturalPractices: [
          "Avoid dense seedling planting; prune dense vegetative branches to allow sunlight penetration.",
          "Use mulching sheets or straw mulch to prevent soil-splash onto lower plant nodes.",
        ],
        organicControl: [
          "Cold-pressed Neem Oil (10,000 ppm) @ 5ml/L mixed with 1ml liquid soap emulsifier.",
          "Bio-fungicide Trichoderma viride @ 5g/L or Pseudomonas fluorescens @ 5g/L.",
        ],
        chemicalControl: [
          "Chemical sprays not needed at this low stage. If spots double within 5 days, Azoxystrobin 23% SC @ 1ml/L may be consulted.",
        ],
        prevention: [
          "Treat seeds with Trichoderma viride @ 10g/kg seed before sowing.",
          "Source disease-free certified hybrid seeds from reputable agriculture research centres.",
        ],
      },
      prevention: [
        "Ensure field soil has good organic matter and adequate drainage.",
        "Clean secateurs and garden shears before pruning chilli bushes.",
      ],
      pesticideInformation: {
        productName: "Nimbecidine (Cold-Pressed Neem Oil 10,000 ppm) / Bio-Cure",
        activeIngredient: "Azadirachtin 1% (10,000 ppm) + Trichoderma viride",
        formulation: "Emulsifiable Concentrate (EC) & Bio-Powder",
        recommendedDosage: "Mix 5ml Neem Oil or 5g Trichoderma viride per Litre of water (750ml Neem Oil in 150L water/acre)",
        waterQuantity: "150 Litres per Acre (9-10 knapsack spray tanks)",
        unitQuantityPerAcre: 750,
        unit: "ml",
        applicationMethod: "Foliar preventive misting targeting flower clusters and leaf surfaces",
        applicationFrequency: "Repeat after 12-14 days if cool damp evenings persist",
        preHarvestIntervalDays: 0,
        safetyPrecautions: [
          "Eco-safe organic formulation. Non-toxic to humans, earthworms, and honeybees.",
          "Spray during late evening when UV index is lowest to preserve active fungal spores.",
        ],
        source: "Indian Agricultural Research Institute (IARI) Organic Farming Guide",
        dateChecked: "2026",
      },
      organicControl: [
        "Neem oil (10,000 ppm) @ 5ml/L with mild surfactant.",
        "Trichoderma viride bio-fungicide @ 5g/L.",
      ],
      estimatedCost: {
        productCostPerAcre: 350,
        laborCostPerAcre: 300,
        otherCostPerAcre: 50,
      },
      warning: "Avoid using high-potency chemical sprays at this early low-infection threshold to protect beneficial ladybird beetles and honeybee pollinators.",
      sources: [
        "ICAR - Indian Institute of Spices Research (IISR)",
        "TNAU Organic Spices Management",
      ],
      analysis_metadata: {
        crop_detected: "Chilli / Pepper (Capsicum annuum)",
        severity_percentage: 8.4,
        infection_stage: "Low",
      },
      languages: {
        english: {
          disease_name: "Chilli Anthracnose / Die-back (Colletotrichum capsici)",
          recommended_pesticide: "Cold-Pressed Neem Oil (10,000 ppm) + Trichoderma viride",
          exact_dosage: "Mix 5ml Neem Oil or 5g Trichoderma viride per Litre of water (750ml in 150L/acre)",
          usage_instructions: "Spray preventive bio-agent in late evening to protect live biocontrol spores. Ensure complete spray coverage over flowers and young leaf nodes.",
          sustainability_mitigation_tip: "Eco-safe organic approach preserves pollinator bees and beneficial ladybird beetles.",
        },
        telugu: {
          disease_name: "మిరప ఆకుమచ్చ మరియు కొమ్మ ఎండు తెగులు (ఆంథ్రాక్నోస్)",
          recommended_pesticide: "వేప నూనె (10,000 ppm) లేదా ట్రైకోడెర్మా విరిడే",
          exact_dosage: "లీటరు నీటికి 5 మి.లీ వేపనూనె లేదా 5 గ్రాముల ట్రైకోడెర్మా పొడి (ఎకరాకు 150 లీటర్లలో 750 మి.లీ)",
          usage_instructions: "తెగులు ప్రారంభ దశ (<15%) లో ఉన్నందున సాయంత్రం వేళల్లో సేంద్రీయ వేపనూనె పిచికారీ సరిపోతుంది. పూత మరియు పిందెలపై సమానంగా పడేలా పిచికారీ చేయండి.",
          sustainability_mitigation_tip: "సేంద్రీయ నివారణ వల్ల తేనెటీగలు, మిత్ర పురుగులకు హాని జరగదు. ఖర్చు ఆదా అవుతుంది.",
        },
        tamil: {
          disease_name: "மிளகாய் ஆந்த்ராக்னோஸ் மற்றும் இலைப்புள்ளி நோய்",
          recommended_pesticide: "வேப்பெண்ணெய் (10,000 ppm) அல்லது டிரைக்கோடெர்மா விரிடி",
          exact_dosage: "ஒரு லிட்டர் தண்ணீருக்கு 5 மி.லி வேப்பெண்ணெய் அல்லது 5 கிராம் டிரைக்கோடெர்மா விரிடி",
          usage_instructions: "தாக்கம் குறைவாக இருப்பதால் மாலை வேளையில் வேப்பெண்ணெய் கரைசல் தெளிப்பது சிறந்தது.",
          sustainability_mitigation_tip: "இயற்கை வழிமுறை மகரந்தச்சேர்க்கை செய்யும் தேனீக்களையும் நன்மை செய்யும் பூச்சிகளையும் பாதுகாக்கிறது.",
        },
        hindi: {
          disease_name: "मिर्च का एन्थ्रेक्नोज एवं फल सड़न रोग",
          recommended_pesticide: "नीम का तेल (10,000 ppm) या ट्राइकोडर्मा विरिडी",
          exact_dosage: "प्रति लीटर पानी में 5 मिली नीम तेल या 5 ग्राम ट्राइकोडर्मा विरिडी पाउडर (प्रति एकड़ 150L)",
          usage_instructions: "संक्रमण 15% से कम है, इसलिए रासायनिक दवा की जरूरत नहीं है। देर शाम को पत्तियों और फूलों पर छिड़काव करें।",
          sustainability_mitigation_tip: "नीम व ट्राइकोडर्मा के प्रयोग से मित्र कीटों (मधुमक्खी) को नुकसान नहीं पहुँचता।",
        },
      },
    },
  },
];
