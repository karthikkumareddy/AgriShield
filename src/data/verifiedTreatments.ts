export type LanguageCode = 'en' | 'te' | 'hi' | 'ta';

export interface LocalizedPesticideData {
  productName: string;
  activeIngredient: string;
  formulation: string;
  purpose: string;
  recommendedConcentration: string; // e.g. "2.5 g / L"
  concentrationGramsPerLitre: number; // for tank calculations
  waterRequirementPerAcre: number; // in Litres, e.g. 200
  quantityPerAcre: number; // in g or ml, e.g. 500
  unit: 'g' | 'ml';
  applicationMethod: string;
  applicationFrequency: string;
  preHarvestIntervalDays: number;
  safetyPrecautions: string[];
  source: string;
  dateVerified: string;
  defaultPricePerUnit?: number | null; // price per kg or L in INR
}

export interface LocalizedDiseaseProfile {
  cropName: string;
  scientificCropName: string;
  diseaseName: string;
  scientificDiseaseName: string;
  whatIsHappening: string;
  symptoms: string[];
  immediateActions: string[];
  culturalPractices: string[];
  organicControl: string[];
  chemicalControl: string[];
  prevention: string[];
  severityExplanation: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
  pesticide: LocalizedPesticideData;
  alternativePesticides?: LocalizedPesticideData[];
}

export interface DiseaseRecord {
  id: string;
  cropKey: string;
  severityDefault: 'Low' | 'Medium' | 'High' | 'Critical';
  severityPercentageDefault: number;
  confidenceDefault: number;
  languages: Record<LanguageCode, LocalizedDiseaseProfile>;
}

export const VERIFIED_DISEASE_DATABASE: Record<string, DiseaseRecord> = {
  'tomato_septoria_leaf_spot': {
    id: 'tomato_septoria_leaf_spot',
    cropKey: 'tomato',
    severityDefault: 'Medium',
    severityPercentageDefault: 24.5,
    confidenceDefault: 88,
    languages: {
      en: {
        cropName: 'Tomato (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'Septoria Leaf Spot (Septoria lycopersici)',
        scientificDiseaseName: 'Septoria lycopersici',
        whatIsHappening: 'Septoria leaf spot is caused by a fungal pathogen that attacks the lower foliage first. Water splashes spread microscopic spores upwards. As spots multiply, infected leaves turn yellow and drop prematurely, exposing fruits to sunscald and drastically reducing crop yield.',
        symptoms: [
          'Circular dark brown spots with lighter grey centers on lower leaves',
          'Tiny black fruiting bodies (pycnidia) visible inside center of spots',
          'Yellowing of foliage surrounding infected spots',
          'Severe premature leaf fall progressing from ground upwards',
          'Stems and petioles developing small dark elliptical lesions'
        ],
        immediateActions: [
          'Pick and destroy severely spotted lower leaves; do not compost infected foliage.',
          'Cease overhead hose or sprinkler irrigation immediately to keep leaves dry.',
          'Stake or tie tomato plants upright to improve ventilation and sunshine.',
          'Spray verified protective fungicide thoroughly across both leaf surfaces.'
        ],
        culturalPractices: [
          'Maintain 60cm plant spacing to ensure rapid morning drying of leaves.',
          'Mulch the soil bed with clean straw to prevent soil-splash onto lower leaves.',
          'Prune suckers and lowest leaves touching wet soil bed.'
        ],
        organicControl: [
          'Apply Copper Hydroxide or Bordeaux Mixture (1%) during early lesion appearance.',
          'Foliar spray of Trichoderma harzianum bio-agent (5g per Litre of water).',
          'Cold-pressed Neem Oil (10,000 ppm) @ 5ml/L as preventive biopesticide.'
        ],
        chemicalControl: [
          'Chlorothalonil 75% WP @ 2.0g per Litre of water (400g in 200L water per acre).',
          'Mancozeb 75% WP @ 2.5g per Litre of water as alternate contact fungicide.'
        ],
        prevention: [
          'Practice 2 to 3-year crop rotation with non-solanaceous crops (maize, pulses).',
          'Use disease-free certified seeds and disinfect nursery beds before transplanting.',
          'Clean farm tools and sprayers before moving to uninfected field blocks.'
        ],
        severityExplanation: {
          low: 'Low severity (<15% leaf area). Confined to oldest bottom leaves. Organic bio-fungicides are sufficient.',
          medium: 'Medium severity (15% to 40% leaf area). Disease spreading upwards to mid-canopy. Targeted foliar spray required.',
          high: 'High severity (>40% leaf area). Extensive leaf drop. Urgent curative spray needed to prevent total defoliation.',
          critical: 'Critical severity (>60% canopy loss). Severe defoliation and sunscald. Immediate quarantine and systemic rescue.'
        },
        pesticide: {
          productName: 'Kavach (Chlorothalonil 75% WP)',
          activeIngredient: 'Chlorothalonil 75% WP',
          formulation: 'Wettable Powder (WP)',
          purpose: 'Broad-spectrum contact protective fungicide inhibiting fungal spore germination and mycelial growth.',
          recommendedConcentration: '2.0 g per Litre of water',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 400,
          unit: 'g',
          applicationMethod: 'Foliar spray covering upper and lower leaf surfaces with fine mist nozzle.',
          applicationFrequency: 'Repeat after 7 to 10 days if humid, rainy weather continues.',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'Wear protective face mask, rubber gloves, and eye protection while mixing.',
            'Spray during calm morning or late afternoon; avoid spraying against the wind.',
            'Do not harvest tomatoes within 5 days of spray application.',
            'Keep children, poultry, and domestic animals away during spraying.'
          ],
          source: 'ICAR - Indian Institute of Horticultural Research (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 650
        }
      },
      te: {
        cropName: 'టమాటా (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'సెప్టోరియా ఆకు మచ్చ తెగులు (Septoria Leaf Spot)',
        scientificDiseaseName: 'Septoria lycopersici',
        whatIsHappening: 'ఈ తెగులు సెప్టోరియా అనే శిలీంధ్రం (ఫంగస్) వల్ల వస్తుంది. మొదట మొక్క కింది ఆకులపై చిన్న నీటి మచ్చలు ఏర్పడి క్రమంగా గోధుమ రంగులోకి మారుతాయి. వర్షపు తుంపర్లు లేదా నీటి ద్వారా ఈ తెగులు పై ఆకులకు వేగంగా వ్యాపిస్తుంది. దీనివల్ల ఆకులు రాలిపోయి, మొక్క ఆహారం తయారు చేసుకునే సామర్థ్యం తగ్గి దిగుబడి భారీగా తగ్గే ప్రమాదం ఉంది.',
        symptoms: [
          'కింది ఆకులపై చిన్న గుండ్రని ముదురు గోధుమ రంగు మచ్చలు ఏర్పడటం',
          'మచ్చల మధ్య భాగం బూడిద లేదా లేత గోధుమ రంగులో మారి చిన్న నల్లటి చుక్కలు కనిపించడం',
          'మచ్చల చుట్టూ ఉన్న ఆకు భాగం పసుపు రంగులోకి మారిపోవడం',
          'తెగులు తీవ్రమై ఆకులు ఎండిపోయి అకాలంగా రాలిపోవడం',
          'కొమ్మలు మరియు కాండంపై కూడా చిన్న నల్లటి మచ్చలు ఏర్పడటం'
        ],
        immediateActions: [
          'తెగులు ఎక్కువగా సోకిన కింది ఆకులను వెంటనే తుంచి పొలం బయట వేసి కాల్చేయండి.',
          'పైనుంచి స్ప్రింక్లర్లు లేదా పైపులతో ఆకులపై నీరు చల్లడం వెంటనే ఆపండి.',
          'మొక్కలకు కర్రలు లేదా తాళ్ల సపోర్ట్ ఇచ్చి ఆకులు నేలకు తగలకుండా పైకి కట్టండి.',
          'ఆకుల అడుగు భాగం బాగా తడిచేలా సిఫార్సు చేసిన మందును పిచికారీ చేయండి.'
        ],
        culturalPractices: [
          'మొక్కల మధ్య కనీసం 60 సెం.మీ దూరం ఉండేలా చూసుకోవాలి, తద్వారా గాలి, వెలుతురు బాగా తగులుతాయి.',
          'నేలపై ఎండుగడ్డితో మల్చింగ్ చేయడం వల్ల నేలలోని శిలీంధ్ర బీజాలు ఆకులపై పడకుండా ఉంటాయి.',
          'నేల తేమగా ఉన్నప్పుడు దున్నడం లేదా పొలంలో అనవసరంగా తిరగడం ఆపండి.'
        ],
        organicControl: [
          'తెగులు ప్రారంభ దశలో కాపర్ ఆక్సీక్లోరైడ్ లేదా బోర్డో మిశ్రమం (1%) పిచికారీ చేయండి.',
          'ట్రైకోడెర్మా విరిడే (లీటరు నీటికి 5 గ్రాములు) కలిపి సాయంత్రం వేళల్లో పిచికారీ చేయాలి.',
          'వేప నూనె (10,000 ppm) లీటరు నీటికి 5 మి.లీ కలిపి నివారణగా వాడండి.'
        ],
        chemicalControl: [
          'క్లోరోథలోనిల్ 75% WP లీటరు నీటికి 2.0 గ్రాములు (ఎకరాకు 200 లీటర్ల నీటిలో 400 గ్రాములు).',
          'మాంకోజెబ్ 75% WP లీటరు నీటికి 2.5 గ్రాములు కలిపి పిచికారీ చేయవచ్చు.'
        ],
        prevention: [
          'టమాటా తర్వాత ఇతర పంటలైన జొన్న, మొక్కజొన్న లేదా పప్పుదినుసులతో పంట మార్పిడి చేయండి.',
          'ధృవీకరించిన నాణ్యమైన విత్తనాలు లేదా నారును మాత్రమే ఉపయోగించాలి.',
          'పొలం గట్లపై కలుపు మొక్కలను ఎప్పటికప్పుడు తొలగించి శుభ్రంగా ఉంచండి.'
        ],
        severityExplanation: {
          low: 'తక్కువ తీవ్రత (<15% ఆకుల విస్తీర్ణం). మొదట కింది ఆకులకే పరిమితం. సేంద్రీయ నివారణ సరిపోతుంది.',
          medium: 'మధ్యస్థ తీవ్రత (15%–40% ఆకుల విస్తీర్ణం). తెగులు మధ్య ఆకులకు వ్యాపిస్తోంది. తక్షణ మందు పిచికారీ అవసరం.',
          high: 'అధిక తీవ్రత (>40% ఆకుల విస్తీర్ణం). ఆకులు రాలిపోతున్నాయి. పంటను కాపాడటానికి అత్యవసర చికిత్స అవసరం.',
          critical: 'తీవ్రమైన ప్రమాదం (>60% ఆకులు దెబ్బతిన్నాయి). తీవ్రమైన ఆకు రాలడం, పంట నష్టపోయే ప్రమాదం ఉంది.'
        },
        pesticide: {
          productName: 'కవచ్ (Chlorothalonil 75% WP)',
          activeIngredient: 'Chlorothalonil 75% WP',
          formulation: 'వెట్టబుల్ పౌడర్ (WP)',
          purpose: 'ఆకు మచ్చ తెగులు శిలీంధ్ర వ్యాప్తిని అరికట్టే సమర్థవంతమైన స్పర్శ శిలీంధ్రనాశిని.',
          recommendedConcentration: 'లీటరు నీటికి 2.0 గ్రాములు',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 400,
          unit: 'g',
          applicationMethod: 'ఆకుల పైభాగం మరియు అడుగుభాగం సమానంగా తడిచేలా పిచికారీ చేయాలి.',
          applicationFrequency: 'తేమ వాతావరణం ఉంటే 7 నుండి 10 రోజుల తర్వాత మరోసారి పిచికారీ చేయాలి.',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'మందు కలుపుతున్నప్పుడు మరియు పిచికారీ చేసేటప్పుడు తప్పనిసరిగా మాస్క్ మరియు గ్లౌజులు ధరించాలి.',
            'గాలి తక్కువగా ఉన్న ఉదయం లేదా సాయంత్రం వేళల్లోనే పిచికారీ చేయాలి; గాలికి ఎదురుగా చేయకూడదు.',
            'మందు చల్లిన తర్వాత కనీసం 5 రోజుల వరకు కాయలు కోయరాదు.',
            'పిచికారీ సమయంలో పిల్లలు, పశువులు మరియు కోళ్లను దూరంగా ఉంచాలి.'
          ],
          source: 'ICAR - భారతీయ ఉద్యాన పరిశోధనా సంస్థ (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 650
        }
      },
      hi: {
        cropName: 'टमाटर (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'सेप्टोरिया लीफ स्पॉट (Septoria Leaf Spot)',
        scientificDiseaseName: 'Septoria lycopersici',
        whatIsHappening: 'यह रोग सेप्टोरिया नामक फफूंद (कवक) के कारण होता है। यह सबसे पहले निचली पत्तियों पर हमला करता है। पानी की छींटों से बीजाणु ऊपरी पत्तियों तक फैलते हैं। पत्तियां पीली होकर समय से पहले झड़ने लगती हैं, जिससे धूप के कारण फल झुलसने लगते हैं और फसल की पैदावार में भारी गिरावट आती है।',
        symptoms: [
          'निचली पत्तियों पर छोटे, गोल, भूरे रंग के धब्बे दिखना',
          'धब्बों के बीच का भाग हल्का धूसर होना और उसमें काले दाने दिखना',
          'धब्बों के चारों ओर की पत्ती पीली पड़ना',
          'संक्रमण बढ़ने पर पत्तियां सूखकर समय से पहले गिरना',
          'तनों और डंठलों पर भी छोटे गहरे धब्बे बनना'
        ],
        immediateActions: [
          'रोगग्रस्त निचली पत्तियों को तुरंत तोड़कर खेत से दूर नष्ट कर दें।',
          'पत्तियों पर ऊपर से फव्वारे या पाइप से पानी देना तुरंत बंद करें।',
          'पौधों को डंडों या रस्सियों के सहारे बांधें ताकि पत्तियां गीली मिट्टी को न छुएं।',
          'पत्तियों की दोनों सतहों पर अनुशंसित कवकनाशी का अच्छी तरह छिड़काव करें।'
        ],
        culturalPractices: [
          'पौधों के बीच कम से कम 60 सेमी की दूरी रखें ताकि धूप और हवा अच्छी तरह लगे।',
          'जमीन पर सूखी घास या पुआल की मल्चिंग करें जिससे मिट्टी के कीटाणु पत्तियों पर न उछलें।',
          'खेत में जलभराव न होने दें, उचित जल निकासी नालियां बनाएं।'
        ],
        organicControl: [
          'शुरुआती लक्षण दिखने पर कॉपर ऑक्सीक्लोराइड या बोर्डो मिश्रण (1%) का छिड़काव करें।',
          'ट्राइकोडर्मा हरजिएनम (5 ग्राम प्रति लीटर पानी) का पत्तियों पर छिड़काव करें।',
          'नीम का तेल (10,000 ppm) 5 मिली प्रति लीटर पानी में मिलाकर रोकथाम हेतु डालें।'
        ],
        chemicalControl: [
          'क्लोरोथैलोनिल 75% WP 2.0 ग्राम प्रति लीटर पानी (प्रति एकड़ 200 लीटर पानी में 400 ग्राम)।',
          'मेंकोजेब 75% WP 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव किया जा सकता है।'
        ],
        prevention: [
          'टमाटर के बाद मक्का या दलहनी फसलों के साथ 2-3 साल का फसल चक्र अपनाएं।',
          'प्रमाणित रोगमुक्त बीज और स्वस्थ पौध का ही रोपण करें।',
          'खेत की मेड़ों को खरपतवार मुक्त और साफ-सुथरा रखें।'
        ],
        severityExplanation: {
          low: 'कम गंभीरता (<15% पत्ती क्षेत्र)। केवल निचली पत्तियों तक सीमित। जैविक उपाय पर्याप्त हैं।',
          medium: 'मध्यम गंभीरता (15% से 40% पत्ती क्षेत्र)। रोग मध्य पत्तियों तक फैल रहा है। रासायनिक छिड़काव आवश्यक है।',
          high: 'उच्च गंभीरता (>40% पत्ती क्षेत्र)। पत्तियां तेजी से गिर रही हैं। फसल बचाने के लिए तत्काल उपचार आवश्यक है।',
          critical: 'अत्यधिक गंभीर (>60% पत्तियां प्रभावित)। गंभीर पत्ती झुलसाव, फसल नष्ट होने का बड़ा खतरा है।'
        },
        pesticide: {
          productName: 'कवच (Chlorothalonil 75% WP)',
          activeIngredient: 'Chlorothalonil 75% WP',
          formulation: 'घुलनशील पाउडर (WP)',
          purpose: 'फफूंद बीजाणुओं के अंकुरण को रोकने वाला सुरक्षित और व्यापक संपर्क कवकनाशी।',
          recommendedConcentration: '2.0 ग्राम प्रति लीटर पानी',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 400,
          unit: 'g',
          applicationMethod: 'पत्तियों की ऊपरी और निचली दोनों सतहों पर बारीक फुहार से समान छिड़काव करें।',
          applicationFrequency: 'यदि नमी और बादल छाए रहें तो 7 से 10 दिनों बाद दोबारा छिड़काव करें।',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'दवा मिलाते और छिड़कते समय मास्क और रबर के दस्ताने अवश्य पहनें।',
            'हवा शांत रहने पर सुबह या शाम को छिड़काव करें; हवा के विपरीत छिड़काव न करें।',
            'दवा छिड़कने के बाद कम से कम 5 दिनों तक फलों की तुड़ाई न करें।',
            'छिड़काव के समय बच्चों और मवेशियों को खेत से दूर रखें।'
          ],
          source: 'ICAR - भारतीय बागवानी अनुसंधान संस्थान (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 650
        }
      },
      ta: {
        cropName: 'தக்காளி (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'செப்டோரியா இலைப்புள்ளி நோய் (Septoria Leaf Spot)',
        scientificDiseaseName: 'Septoria lycopersici',
        whatIsHappening: 'இந்த நோய் செப்டோரியா எனும் பூஞ்சையால் ஏற்படுகிறது. இது முதலில் அடிப்பகுதி இலைகளை பாதிக்கிறது. மழைத்துளிகள் மூலம் பூஞ்சை வித்துக்கள் மேல் இலைகளுக்கு பரவுகின்றன. இலைகள் மஞ்சள் நிறமாகி உதிர்வதால், செடியின் ஒளிச்சேர்க்கை பாதிக்கப்பட்டு தக்காளி பழ விளைச்சல் பெருமளவில் குறைகிறது.',
        symptoms: [
          'கீழ் இலைகளில் வட்ட வடிவ அடர் பழுப்பு நிற புள்ளிகள் தோன்றுதல்',
          'புள்ளிகளின் மையப்பகுதி சாம்பல் நிறமாக மாறி நடுவில் சிறிய கருப்பு புள்ளிகள் தெரிதல்',
          'புள்ளிகளை சுற்றியுள்ள இலைப்பகுதி மஞ்சள் நிறமாக மாறுதல்',
          'நோய் முற்றி இலைகள் காய்ந்து முன்கூட்டியே உதிர்தல்',
          'தண்டுகள் மற்றும் இலைக்காம்புகளிலும் சிறிய கருப்பு புள்ளிகள் தோன்றுதல்'
        ],
        immediateActions: [
          'பாதிக்கப்பட்ட அடி இலைகளை உடனடியாக பறித்து வயலுக்கு வெளியே தீயிட்டு அழிக்கவும்.',
          'மேலிருந்து தெளிப்பான் அல்லது குழாய் மூலம் நீர் தெளிப்பதை உடனே நிறுத்தவும்.',
          'செடிகளுக்கு குச்சிகள் நட்டு இலைகள் ஈர நிலத்தில் படாதவாறு கட்டி வைக்கவும்.',
          'பரிந்துரைக்கப்பட்ட பூஞ்சைக்கொல்லியை இலைகளின் இருபுறமும் நன்கு படும்படி தெளிக்கவும்.'
        ],
        culturalPractices: [
          'செடிகளுக்கு இடையே 60 செ.மீ இடைவெளி விட்டு நல்ல காற்றோட்டமும் சூரிய ஒளியும் கிடைக்கச் செய்யவும்.',
          'நிலத்தில் வைக்கோல் மூடாக்கு அமைப்பதால் மண்ணிலுள்ள கிருமிகள் இலைகளில் தெறிக்காது.',
          'வயலில் நீர் தேங்காமல் வடிகால் வசதிகளை சரியாக பராமரிக்கவும்.'
        ],
        organicControl: [
          'ஆரம்ப நிலையில் காப்பர் ஆக்ஸிகுளோரைடு அல்லது போர்டோ கலவை (1%) தெளிக்கவும்.',
          'டிரைக்கோடெர்மா விரிடி (லிட்டருக்கு 5 கிராம்) மாலையில் தெளிக்கவும்.',
          'வேப்பெண்ணெய் (10,000 ppm) ஒரு லிட்டர் தண்ணீருக்கு 5 மி.லி கலந்து தெளிக்கவும்.'
        ],
        chemicalControl: [
          'குளோரோதலோனில் 75% WP லிட்டருக்கு 2.0 கிராம் (ஏக்கருக்கு 200 லிட்டர் நீரில் 400 கிராம்).',
          'மேன்கோசெப் 75% WP லிட்டருக்கு 2.5 கிராம் கலந்து தெளிக்கலாம்.'
        ],
        prevention: [
          'தக்காளிக்கு பின் சோளம் அல்லது பயறு வகை பயிர்களுடன் 2-3 ஆண்டு பயிர் சுழற்சி செய்யவும்.',
          'சான்றளிக்கப்பட்ட நோய் எதிர்ப்பு திறன் கொண்ட விதைகளை மட்டுமே பயன்படுத்தவும்.',
          'வரப்புகளில் உள்ள களைகளை அவ்வப்போது அகற்றி வயலை சுத்தமாக வைத்திருக்கவும்.'
        ],
        severityExplanation: {
          low: 'குறைந்த தீவிரம் (<15% இலைப்பரப்பு). கீழ் இலைகளுக்கு மட்டுமே. இயற்கை மேலாண்மை போதுமானது.',
          medium: 'மிதமான தீவிரம் (15% முதல் 40% வரை). நடுப்பகுதி இலைகளுக்கும் பரவுகிறது. மருந்து தெளிப்பது அவசியம்.',
          high: 'அதிக தீவிரம் (>40% இலைப்பரப்பு). இலைகள் வேகமாக உதிர்கின்றன. பயிரை காப்பாற்ற உடனடி நடவடிக்கை தேவை.',
          critical: 'மிக தீவிர பாதிப்பு (>60% இலைகள் சேதம்). அதிக இலை உதிர்வு, கடுமையான மகசூல் இழப்பு அபாயம்.'
        },
        pesticide: {
          productName: 'கவாச் (Chlorothalonil 75% WP)',
          activeIngredient: 'Chlorothalonil 75% WP',
          formulation: 'நனையும் தூள் (WP)',
          purpose: 'பூஞ்சை வித்துக்கள் முளைப்பதை தடுத்து நோயை கட்டுப்படுத்தும் சிறந்த பாதுகாப்பு பூஞ்சைக்கொல்லி.',
          recommendedConcentration: 'லிட்டருக்கு 2.0 கிராம்',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 400,
          unit: 'g',
          applicationMethod: 'இலையின் மேல் மற்றும் அடிப்புறம் முழுவதும் பனித்துளி போல படியுமாறு தெளிக்கவும்.',
          applicationFrequency: 'ஈரப்பதம் நீடித்தால் 7 முதல் 10 நாட்களுக்கு பின் மீண்டும் ஒருமுறை தெளிக்கவும்.',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'மருந்து கலக்கும் போதும் தெளிக்கும் போதும் முகக்கவசம் மற்றும் கையுறைகள் அணியவும்.',
            'காலை அல்லது மாலை வேளையில் காற்று வீசாத திசையில் தெளிக்கவும்; எதிர்க் காற்றில் தெளிக்கக்கூடாது.',
            'மருந்து தெளித்த பின் 5 நாட்களுக்கு தக்காளி பழங்களை அறுவடை செய்யக்கூடாது.',
            'தெளிக்கும் போது குழந்தைகள் மற்றும் கால்நடைகளை வயலுக்குள் அனுமதிக்கக்கூடாது.'
          ],
          source: 'ICAR - இந்திய தோட்டக்கலை ஆராய்ச்சி நிறுவனம் (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 650
        }
      }
    }
  },

  'tomato_late_blight': {
    id: 'tomato_late_blight',
    cropKey: 'tomato',
    severityDefault: 'High',
    severityPercentageDefault: 54.8,
    confidenceDefault: 94,
    languages: {
      en: {
        cropName: 'Tomato (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'Late Blight (Phytophthora infestans)',
        scientificDiseaseName: 'Phytophthora infestans',
        whatIsHappening: 'Late blight is an aggressive water-mold pathogen. In cool, foggy, or rain-soaked weather, millions of microscopic spores develop and invade leaves within hours. The plant tissue rapidly turns black, rotting stems and tomato fruits, causing complete crop collapse within days if untreated.',
        symptoms: [
          'Large water-soaked dark brown to black irregular lesions on leaves',
          'Delicate white fungal mildew visible on leaf undersides in high humidity',
          'Brown rotting blotches on green and ripe tomato fruits with foul odor',
          'Stem girdling and rapid wilting of branches',
          'Whole plant collapsing into dark scorched appearance'
        ],
        immediateActions: [
          'Halt all overhead sprinkler irrigation immediately.',
          'Prune severely blackened leaves and destroy them outside the field.',
          'Apply emergency curative systemic fungicide early in the morning.',
          'Disinfect harvesting baskets and knives to prevent fruit contamination.'
        ],
        culturalPractices: [
          'Ensure 75cm row spacing for wide canopy ventilation.',
          'Improve soil drainage so water does not stand in furrows.',
          'Keep vines staked upright off moist soil.'
        ],
        organicControl: [
          'Bordeaux mixture (1%) preventive spray before onset of cloudy monsoon.',
          'Copper Hydroxide 53.8% DF @ 2g per Litre of water.',
          'Trichoderma harzianum root drenching to suppress overwintering oospores.'
        ],
        chemicalControl: [
          'Dimethomorph 50% WP (2.5g/L) + Mancozeb 75% WP (3.0g/L) calibrated mix.',
          'Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L as alternate systemic curative.'
        ],
        prevention: [
          'Rotate field with non-solanaceous crops (maize, sorghum) for 2 seasons.',
          'Use blight-resistant certified hybrid seeds.',
          'Destroy all tomato residue and volunteer potato plants.'
        ],
        severityExplanation: {
          low: 'Low severity (<15%). Isolated pinpoint lesions. Preventive copper sprays effective.',
          medium: 'Medium severity (15%–40%). Rapid lesion growth on foliage. Targeted systemic spray needed.',
          high: 'High severity (>40%). Severe stem and foliage blighting. Urgent curative intervention needed.',
          critical: 'Critical severity (>60%). Massive defoliation and fruit rot. Field quarantine required.'
        },
        pesticide: {
          productName: 'Acrobat (Dimethomorph 50% WP) + Dithane M-45 (Mancozeb)',
          activeIngredient: 'Dimethomorph 50% WP + Mancozeb 75% WP',
          formulation: 'Wettable Powder (WP)',
          purpose: 'Dual-action systemic curative and contact protective fungicide arresting blight mycelium and spore production.',
          recommendedConcentration: '2.5g Dimethomorph + 3.0g Mancozeb per Litre',
          concentrationGramsPerLitre: 2.5,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 500,
          unit: 'g',
          applicationMethod: 'Foliar spray with hollow cone nozzle coating both upper and lower leaf surfaces.',
          applicationFrequency: 'Repeat after 7 to 10 days if foggy, rainy weather persists.',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'Wear protective face mask, rubber gloves, and long sleeves during mixing.',
            'Spray during calm morning or late evening; never against wind direction.',
            'Do not harvest fruits within 5 days of spray application.',
            'Safely dispose of empty packaging away from water ponds and cattle.'
          ],
          source: 'ICAR - Indian Institute of Horticultural Research (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 850
        }
      },
      te: {
        cropName: 'టమాటా (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'మాడు తెగులు / లేట్ బ్లైట్ (Phytophthora infestans)',
        scientificDiseaseName: 'Phytophthora infestans',
        whatIsHappening: 'టమాటా మాడు తెగులు అత్యంత వేగంగా వ్యాపించే శిలీంధ్రం వల్ల వస్తుంది. చల్లటి, మబ్బులతో కూడిన తేమ వాతావరణంలో కొన్ని గంటల్లోనే లక్షలాది సూక్ష్మ బీజాలు ఆకులను ఆశిస్తాయి. ఆకులు, కొమ్మలు మరియు కాయలపై నల్లటి మచ్చలు ఏర్పడి మొక్కలు మాడిపోయి కొన్ని రోజుల్లోనే తోట మొత్తం నాశనమయ్యే ప్రమాదం ఉంది.',
        symptoms: [
          'ఆకులపై నీటితో తడిసినట్లు నల్లటి ముదురు గోధుమ రంగు పెద్ద మచ్చలు ఏర్పడటం',
          'తేమ ఎక్కువగా ఉన్నప్పుడు ఆకుల అడుగు భాగంలో తెల్లటి బూజు లాంటి పొర కనిపించడం',
          'పచ్చి మరియు పండిన టమాటా కాయలపై గోధుమ రంగు కుళ్లు మచ్చలు ఏర్పడటం',
          'కొమ్మలు కుళ్ళిపోయి మొక్కలు త్వరగా వడలిపోవడం',
          'మొత్తం తోట అగ్నితో కాలినట్లు నల్లబడిపోవడం'
        ],
        immediateActions: [
          'స్ప్రింక్లర్లు లేదా పైపులతో ఆకులపై నీరు చల్లడం వెంటనే ఆపండి.',
          'మాడిపోయిన ఆకులు మరియు కుళ్ళిన కాయలను వెంటనే కోసి దూరంగా పూడ్చండి.',
          'ఉదయం మంచు ఆరిన వెంటనే అత్యవసర సిస్టమిక్ శిలీంధ్రనాశిని పిచికారీ చేయండి.',
          'కోత కోసే కత్తులు, బుట్టలను శుభ్రపరచండి.'
        ],
        culturalPractices: [
          'మొక్కల మధ్య 75 సెం.మీ దూరం ఉంచి గాలి వెలుతురు ధారాళంగా తగిలేలా చేయండి.',
          'పొలంలో నీరు నిల్వ ఉండకుండా మురుగు కాలువలు తీయండి.',
          'చెట్లను కర్రలతో పైకి నిలబెట్టి ఆకులు తడి నేలపై పడకుండా జాగ్రత్తపడండి.'
        ],
        organicControl: [
          'మబ్బులు పట్టే ముందే బోర్డో మిశ్రమం (1%) రక్షణగా పిచికారీ చేయండి.',
          'కాపర్ హైడ్రాక్సైడ్ 53.8% DF లీటరు నీటికి 2 గ్రాముల చొప్పున వాడండి.',
          'ట్రైకోడెర్మా హార్జియానమ్ ద్రావణాన్ని మొదళ్ల వద్ద పోయడం.'
        ],
        chemicalControl: [
          'డైమెథోమార్ఫ్ 50% WP (2.5 గ్రా/లీ) + మాంకోజెబ్ 75% WP (3.0 గ్రా/లీ) ట్యాంక్ మిక్స్.',
          'సైమోక్సానిల్ 8% + మాంకోజెబ్ 64% WP లీటరుకు 2.5 గ్రాములు 7-10 రోజుల తర్వాత మార్చి కొట్టండి.'
        ],
        prevention: [
          'జొన్న లేదా మొక్కజొన్నతో 2 సీజన్లు పంట మార్పిడి చేయండి.',
          'తెగులును తట్టుకునే హైబ్రిడ్ విత్తనాలను ఎంచుకోండి.',
          'పాత పంట వ్యర్థాలను పొలంలో ఉంచకుండా కాల్చివేయండి.'
        ],
        severityExplanation: {
          low: 'తక్కువ తీవ్రత (<15%). కొన్ని ఆకులకే పరిమితం. రాగి మందులతో అదుపు చేయవచ్చు.',
          medium: 'మధ్యస్థ తీవ్రత (15%–40%). ఆకులపై మచ్చలు వేగంగా పెరుగుతున్నాయి. సిస్టమిక్ మందు పిచికారీ తప్పనిసరి.',
          high: 'అధిక తీవ్రత (>40%). కొమ్మలు, ఆకులు మాడిపోతున్నాయి. పంటను కాపాడటానికి తక్షణ రసాయనిక నివారణ అవసరం.',
          critical: 'తీవ్రమైన ప్రమాదం (>60%). తోట మొత్తం మాడిపోయే ప్రమాదం ఉంది. తక్షణ అత్యవసర చర్యలు చేపట్టాలి.'
        },
        pesticide: {
          productName: 'ఆక్రోబాట్ (Dimethomorph 50% WP) + డైథేన్ M-45 (Mancozeb)',
          activeIngredient: 'Dimethomorph 50% WP + Mancozeb 75% WP',
          formulation: 'వెట్టబుల్ పౌడర్ (WP)',
          purpose: 'మాడు తెగులు శిలీంధ్ర కణజాలాన్ని వేగంగా అణచివేసే అత్యుత్తమ సిస్టమిక్ మరియు కాంటాక్ట్ మందు.',
          recommendedConcentration: 'లీటరు నీటికి 2.5 గ్రా డైమెథోమార్ఫ్ + 3.0 గ్రా మాంకోజెబ్',
          concentrationGramsPerLitre: 2.5,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 500,
          unit: 'g',
          applicationMethod: 'ఆకుల పైభాగం మరియు అడుగు భాగం పూర్తిగా తడిచేలా హోలో కోన్ నాజిల్‌తో పిచికారీ చేయాలి.',
          applicationFrequency: 'మబ్బులు, వర్షపు వాతావరణం ఉంటే 7 నుండి 10 రోజుల తర్వాత మరోసారి చేయండి.',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'మందు కలుపుతున్నప్పుడు మాస్క్, రబ్బరు చేతి తొడుగులు తప్పనిసరిగా వాడాలి.',
            'గాలి తక్కువగా ఉన్న సమయంలోనే పిచికారీ చేయాలి; గాలికి ఎదురుగా నిలబడకూడదు.',
            'మందు చల్లిన తర్వాత 5 రోజుల వరకు కాయలు కోయరాదు.',
            'ఖాళీ ప్యాకెట్లను నీటి గుంటలు, పశువులకు దూరంగా భూమిలో పూడ్చాలి.'
          ],
          source: 'ICAR - భారతీయ ఉద్యాన పరిశోధనా సంస్థ (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 850
        }
      },
      hi: {
        cropName: 'टमाटर (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'पिछेती झुलसा रोग / लेट ब्लाइट (Phytophthora infestans)',
        scientificDiseaseName: 'Phytophthora infestans',
        whatIsHappening: 'टमाटर का पछेती झुलसा एक अत्यधिक आक्रामक फफूंद जैसा रोग है। ठंडे, कोहरे और लगातार नमी वाले मौसम में इसके लाखों बीजाणु कुछ ही घंटों में पत्तियों में प्रवेश कर जाते हैं। पत्तियां, तने और फल काले पड़कर सड़ने लगते हैं और बिना उपचार के कुछ ही दिनों में पूरी फसल नष्ट हो सकती है।',
        symptoms: [
          'पत्तियों पर पानी से भीगे हुए अनियमित बड़े काले-भूरे धब्बे',
          'अधिक नमी में पत्तियों की निचली सतह पर सफेद रुई जैसी फफूंद दिखना',
          'कच्चे और पके फलों पर गहरे भूरे रंग के सख्त सड़न वाले धब्बे',
          'तनों का काला पड़ना और टहनियों का तेजी से सूखना',
          'पूरा पौधा आग से झुलसा हुआ सा काला दिखाई देना'
        ],
        immediateActions: [
          'ऊपर से फव्वारा या पाइप से पानी देना तुरंत बंद करें।',
          'झुलसी हुई पत्तियों और सड़े हुए फलों को तोड़कर खेत से दूर गड्ढे में दबाएं।',
          'सुबह की ओस सूखते ही तुरंत अनुशंसित अंतःप्रवाही कवकनाशी का छिड़काव करें।',
          'तुड़ाई वाले औजारों और टोकरियों को साफ रखें।'
        ],
        culturalPractices: [
          'पंक्तियों के बीच 75 सेमी की दूरी रखें ताकि हवा का आवागमन बना रहे।',
          'खेत में जल निकासी की अच्छी व्यवस्था करें ताकि पानी न रुके।',
          'पौधों को डंडों के सहारे ऊपर बांधें ताकि पत्तियां गीली मिट्टी से दूर रहें।'
        ],
        organicControl: [
          'बादल छाने से पहले बोर्डो मिश्रण (1%) का सुरक्षात्मक छिड़काव करें।',
          'कॉपर हाइड्रोक्साइड 53.8% DF 2 ग्राम प्रति लीटर पानी में मिलाकर डालें।',
          'ट्राइकोडर्मा हरजिएनम को जड़ों के पास मिट्टी में डालें।'
        ],
        chemicalControl: [
          'डाइमेथोमॉर्फ 50% WP (2.5 ग्राम/ली) + मैंकोजेब 75% WP (3.0 ग्राम/ली) का मिश्रण।',
          'साइमोक्सानिल 8% + मैंकोजेब 64% WP 2.5 ग्राम/ली को 7-10 दिन बाद बदलकर डालें।'
        ],
        prevention: [
          'मक्का या ज्वार के साथ 2 मौसम का फसल चक्र अपनाएं।',
          'झुलसा रोधी प्रमाणित संकर किस्मों का ही चयन करें।',
          'पुरानी फसल के अवशेषों को खेत में न छोड़ें, उन्हें नष्ट करें।'
        ],
        severityExplanation: {
          low: 'कम गंभीरता (<15%)। केवल कुछ पत्तियों पर। कॉपर कवकनाशी से रोकथाम संभव है।',
          medium: 'मध्यम गंभीरता (15%–40%)। धब्बे तेजी से फैल रहे हैं। अंतःप्रवाही दवा का छिड़काव जरूरी है।',
          high: 'उच्च गंभीरता (>40%)। तने और पत्तियां झुलस रही हैं। फसल बचाने के लिए तत्काल उपचार आवश्यक है।',
          critical: 'अत्यधिक गंभीर (>60%)। पूरी फसल झुलसने का बड़ा खतरा है। तुरंत आपातकालीन छिड़काव करें।'
        },
        pesticide: {
          productName: 'एक्रोबैट (Dimethomorph 50% WP) + डाइथेन M-45 (Mancozeb)',
          activeIngredient: 'Dimethomorph 50% WP + Mancozeb 75% WP',
          formulation: 'घुलनशील पाउडर (WP)',
          purpose: 'झुलसा रोग की फफूंद को रोकने वाला अत्यंत प्रभावी अंतःप्रवाही और संपर्क कवकनाशी।',
          recommendedConcentration: 'प्रति लीटर पानी में 2.5 ग्राम डाइमेथोमॉर्फ + 3.0 ग्राम मैंकोजेब',
          concentrationGramsPerLitre: 2.5,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 500,
          unit: 'g',
          applicationMethod: 'पत्तियों की ऊपरी और निचली दोनों सतहों पर हॉलो कोन नोजल से अच्छी तरह छिड़कें।',
          applicationFrequency: 'बादल और बारिश का मौसम रहने पर 7 से 10 दिनों बाद दोबारा छिड़काव करें।',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'दवा मिलाते और छिड़कते समय मास्क और रबर के दस्ताने जरूर पहनें।',
            'शांत हवा में सुबह या शाम को छिड़काव करें; हवा के विपरीत न खड़े हों।',
            'दवा छिड़कने के बाद 5 दिनों तक टमाटर की तुड़ाई न करें।',
            'खाली पैकेटों को पानी के स्रोतों और पशुओं से दूर गड्ढे में दबाएं।'
          ],
          source: 'ICAR - भारतीय बागवानी अनुसंधान संस्थान (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 850
        }
      },
      ta: {
        cropName: 'தக்காளி (Solanum lycopersicum)',
        scientificCropName: 'Solanum lycopersicum',
        diseaseName: 'பிற்பருவ இலைக்கருகல் நோய் / லேட் பிளைட் (Phytophthora infestans)',
        scientificDiseaseName: 'Phytophthora infestans',
        whatIsHappening: 'தக்காளி லேட் பிளைட் நோய் ஃபைட்டோப்த்தோரா என்ற கொடிய பூஞ்சையால் ஏற்படுகிறது. குளிர்ந்த பனி மூட்டம் மற்றும் தொடர் மழைக்காலத்தில் சில மணிநேரங்களிலேயே பல லட்சம் வித்துக்கள் இலைகளை தாக்குகின்றன. இலைகள், தண்டுகள் மற்றும் காய்கள் கருப்பாக கருகி அழுகி சில நாட்களிலேயே தோட்டம் முழுவதும் அழியும் அபாயம் உள்ளது.',
        symptoms: [
          'இலைகளில் நீர் ஊறிய பெரிய ஒழுங்கற்ற அடர் பழுப்பு அல்லது கருப்பு கருகல் புள்ளிகள்',
          'அதிக காற்றில் இலைகளின் அடிப்பகுதியில் வெள்ளை நிற பஞ்சு போன்ற பூஞ்சை படலம் தெரிதல்',
          'பச்சை மற்றும் பழுத்த காய்களில் துர்நாற்றத்துடன் கூடிய பழுப்பு நிற அழுகல் புள்ளிகள்',
          'தண்டுகள் கருப்பாகி கிளைகள் விரைவாக வாடிப் போதல்',
          'செடிகள் முழுவதும் தீயில் கருகியது போன்ற தோற்றம் ஏற்படுதல்'
        ],
        immediateActions: [
          'மேலிருந்து குழாய் மூலம் நீர் தெளிப்பதை உடனே நிறுத்தவும்.',
          'கருகிய இலைகள் மற்றும் அழுகிய காய்களை உடனே பறித்து வயலுக்கு வெளியே குழிதோண்டி புதைக்கவும்.',
          'காலை பனி காய்ந்ததும் பரிந்துரைக்கப்பட்ட பூஞ்சைக்கொல்லியை உடனே தெளிக்கவும்.',
          'அறுவடை செய்யும் கூடை மற்றும் கத்திகளை சுத்தமாக வைக்கவும்.'
        ],
        culturalPractices: [
          'செடிகளுக்கு இடையே 75 செ.மீ இடைவெளி விட்டு நல்ல காற்றோட்டம் கிடைக்கச் செய்யவும்.',
          'வயலில் நீர் தேங்காமல் வாய்க்கால்களை தூர்வாரி வைக்கவும்.',
          'செடிகளை குச்சிகள் நட்டு தூக்கி கட்டி இலைகள் ஈர நிலத்தில் படாமல் பாதுகாக்கவும்.'
        ],
        organicControl: [
          'மழைக்காலம் தொடங்கும் முன் போர்டோ கலவை (1%) தெளிக்கவும்.',
          'காப்பர் ஹைட்ராக்சைடு 53.8% DF லிட்டருக்கு 2 கிராம் கலந்து தெளிக்கவும்.',
          'டிரைக்கோடெர்மா ஹார்சியானம் பூஞ்சையை செடியின் வேர்ப்பகுதியில் இடவும்.'
        ],
        chemicalControl: [
          'டைமெத்தோமார்ஃப் 50% WP (2.5 கிராம்/லி) + மேன்கோசெப் 75% WP (3.0 கிராம்/லி) கலவை.',
          'சைமோக்சானில் 8% + மேன்கோசெப் 64% WP 2.5 கிராம்/லி 7-10 நாட்களுக்கு பின் மாற்றி தெளிக்கவும்.'
        ],
        prevention: [
          'மக்காச்சோளம் அல்லது பயறு வகை பயிர்களுடன் 2 பருவங்களுக்கு பயிர் சுழற்சி செய்யவும்.',
          'நோய் எதிர்ப்பு திறன் கொண்ட வீரிய ஒட்டு ரக விதைகளை தேர்வு செய்யவும்.',
          'பழைய பயிர் கழிவுகளை வயலில் விடாமல் முழுமையாக அப்புறப்படுத்தவும்.'
        ],
        severityExplanation: {
          low: 'குறைந்த தீவிரம் (<15%). சில இலைகளுக்கு மட்டுமே. காப்பர் மருந்துகளால் கட்டுப்படுத்தலாம்.',
          medium: 'மிதமான தீவிரம் (15%–40%). புள்ளிகள் வேகமாக பரவுகின்றன. ஊடுருவி தாக்கும் மருந்து அவசியம்.',
          high: 'அதிக தீவிரம் (>40%). தண்டுகளும் இலைகளும் கருகுகின்றன. உடனடி தீவிர மருந்து தெளிப்பு தேவை.',
          critical: 'மிக தீவிர பாதிப்பு (>60%). பயிர் முழுவதும் கருகும் அபாயம். உடனடி அவசர சிகிச்சை தேவை.'
        },
        pesticide: {
          productName: 'அக்ரோபேட் (Dimethomorph 50% WP) + டைத்தேன் M-45 (Mancozeb)',
          activeIngredient: 'Dimethomorph 50% WP + Mancozeb 75% WP',
          formulation: 'நனையும் தூள் (WP)',
          purpose: 'கருகல் நோய் பூஞ்சையை வேகமாக அழிக்கும் மிகச்சிறந்த ஊடுருவும் மற்றும் பாதுகாப்பு பூஞ்சைக்கொல்லி.',
          recommendedConcentration: 'லிட்டருக்கு 2.5 கிராம் டைமெத்தோமார்ஃப் + 3.0 கிராம் மேன்கோசெப்',
          concentrationGramsPerLitre: 2.5,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 500,
          unit: 'g',
          applicationMethod: 'இலையின் மேல் மற்றும் அடிப்பகுதி முழுமையாக நனையுமாறு ஹாலோ கோன் நாசில் மூலம் தெளிக்கவும்.',
          applicationFrequency: 'மேகமூட்டம் மற்றும் மழை நீடித்தால் 7 முதல் 10 நாட்களுக்கு பின் மீண்டும் தெளிக்கவும்.',
          preHarvestIntervalDays: 5,
          safetyPrecautions: [
            'மருந்து கலக்கும் போதும் தெளிக்கும் போதும் முகக்கவசம் மற்றும் ரப்பர் கையுறைகள் அணியவும்.',
            'காலை அல்லது மாலை வேளையில் காற்று வீசாத திசையில் தெளிக்கவும்; எதிர்க் காற்றில் தெளிக்கக்கூடாது.',
            'மருந்து தெளித்த பின் 5 நாட்களுக்கு தக்காளியை அறுவடை செய்யக்கூடாது.',
            'காலி உறைகளை நீர்நிலைகள் மற்றும் கால்நடைகளுக்கு எட்டாதவாறு குழிதோண்டி புதைக்கவும்.'
          ],
          source: 'ICAR - இந்திய தோட்டக்கலை ஆராய்ச்சி நிறுவனம் (IIHR)',
          dateVerified: '2026',
          defaultPricePerUnit: 850
        }
      }
    }
  },

  'cotton_leaf_curl': {
    id: 'cotton_leaf_curl',
    cropKey: 'cotton',
    severityDefault: 'Medium',
    severityPercentageDefault: 28.5,
    confidenceDefault: 91,
    languages: {
      en: {
        cropName: 'Cotton (Gossypium hirsutum)',
        scientificCropName: 'Gossypium hirsutum',
        diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
        scientificDiseaseName: 'Begomovirus & Whitefly Vector',
        whatIsHappening: 'Cotton Leaf Curl Virus is transmitted by the whitefly vector (Bemisia tabaci). Whiteflies feed on plant sap, injecting viral particles that disrupt leaf cell division. Leaves curl upward or downward with thickened veins, stunting the plant and preventing cotton boll formation.',
        symptoms: [
          'Upward or downward cupping and curling of top young leaves',
          'Prominent thickening, swelling, and darkening of veins on leaf underside',
          'Enation (small cup-shaped leafy outgrowths) on the undersides of veins',
          'Severe stunting of cotton plants with shortened internodes',
          'Few or deformed flower buds (squares) and cotton bolls'
        ],
        immediateActions: [
          'Eradicate whitefly vector colonies by targeted spraying on leaf undersides.',
          'Install 12 to 15 yellow sticky traps per acre to capture flying whiteflies.',
          'Rogue out severely stunted infected plants in early crop stages.',
          'Avoid applying excess nitrogen fertilizer which attracts succulent sap-feeders.'
        ],
        culturalPractices: [
          'Plant 2 to 3 border rows of sorghum, maize, or pearl millet as barrier crops.',
          'Remove weed hosts (such as Parthenium, Abutilon, Xanthium) from field bunds.',
          'Monitor whitefly nymph counts twice weekly during morning hours.'
        ],
        organicControl: [
          'Cold-pressed Neem Oil (10,000 ppm) @ 5ml/L mixed with 1ml mild soap.',
          'Apply Verticillium lecanii bio-fungicide spores @ 5g/L during cloudy days.',
          'Release green lacewing predators (Chrysoperla carnea) @ 10,000 larvae/acre.'
        ],
        chemicalControl: [
          'Diafenthiuron 50% WP @ 1.5g per Litre of water (250g in 150-200L water/acre).',
          'Pyriproxyfen 10% EC @ 2ml/L as insect growth regulator against whitefly nymphs.'
        ],
        prevention: [
          'Sow certified CLCuV-tolerant cotton hybrids recommended for your zone.',
          'Avoid continuous monoculture of cotton; rotate with wheat or chickpea.',
          'Never spray pyrethroid insecticides early as they trigger whitefly resurgence.'
        ],
        severityExplanation: {
          low: 'Low severity (<15%). Pinpoint vein thickening on top leaves. Neem oil and sticky traps sufficient.',
          medium: 'Medium severity (15%–40%). Leaf cupping spreading across upper canopy. Targeted vector control needed.',
          high: 'High severity (>40%). Severe stunting and enations. Boll formation halted. Urgent intervention required.',
          critical: 'Critical severity (>60%). Widespread viral collapse. Plant growth arrested.'
        },
        pesticide: {
          productName: 'Pegasus (Diafenthiuron 50% WP)',
          activeIngredient: 'Diafenthiuron 50% WP',
          formulation: 'Wettable Powder (WP)',
          purpose: 'Targeted insecticide/miticide controlling adult and nymph whiteflies transmitting the leaf curl virus.',
          recommendedConcentration: '1.5 g per Litre of water',
          concentrationGramsPerLitre: 1.5,
          waterRequirementPerAcre: 175,
          quantityPerAcre: 250,
          unit: 'g',
          applicationMethod: 'Foliar spray directing nozzles upwards to thoroughly coat lower leaf surfaces.',
          applicationFrequency: 'Maximum 2 consecutive sprays; alternate chemical class to prevent resistance.',
          preHarvestIntervalDays: 14,
          safetyPrecautions: [
            'Wear protective overalls, goggles, and face mask while handling wettable powder.',
            'Spray early in the morning when whiteflies are sluggish on leaf undersides.',
            'Do not spray against the wind or during hot midday hours.',
            'Avoid chemical drift onto neighboring honeybee boxes or water channels.'
          ],
          source: 'Central Institute for Cotton Research (CICR) & ICAR',
          dateVerified: '2026',
          defaultPricePerUnit: 680
        }
      },
      te: {
        cropName: 'పత్తి (Gossypium hirsutum)',
        scientificCropName: 'Gossypium hirsutum',
        diseaseName: 'పత్తి ఆకు ముడుత తెగులు & తెల్లదోమ (CLCuV)',
        scientificDiseaseName: 'Begomovirus & తెల్లదోమ (Bemisia tabaci)',
        whatIsHappening: 'పత్తిలో ఆకు ముడుత తెగులు తెల్లదోమ (వైట్‌ఫ్లై) ద్వారా వ్యాపిస్తుంది. తెల్లదోమలు ఆకుల అడుగు భాగం నుండి రసాన్ని పీల్చుతూ వైరస్‌ను మొక్కల్లోకి ప్రవేశపెడతాయి. దీనివల్ల ఆకుల ఈనెలు లావుగా మారి ఆకులు పైకి లేదా కిందకి ముడుచుకుపోతాయి, మొక్క గిడసబారి పూత, కాయ నిలవక తీవ్ర నష్టం వాటిల్లుతుంది.',
        symptoms: [
          'పై లేత ఆకులు పైకి లేదా కిందకి గిన్నెలా ముడుచుకుపోవడం',
          'ఆకుల అడుగు భాగంలోని ఈనెలు లావుగా, ముదురు ఆకుపచ్చగా ఉబ్బడం',
          'ఆకుల అడుగున ఈనెలపై చిన్న ఆకు లాంటి పొక్కులు (ఎనేషన్లు) ఏర్పడటం',
          'మొక్కలు ఎదుగుదల లోపించి గిడసబారిపోవడం',
          'పూత రాలిపోవడం మరియు పత్తి కాయల సంఖ్య బాగా తగ్గిపోవడం'
        ],
        immediateActions: [
          'ఆకుల అడుగున ఉన్న తెల్లదోమల గుంపులను వెంటనే గుర్తించి మందు పిచికారీ చేయండి.',
          'ఎకరాకు 12 నుండి 15 పసుపు జిగురు అట్టలను పైరు ఎత్తులో అమర్చండి.',
          'ప్రారంభ దశలో బాగా ముడుచుకుపోయిన చెట్లను పీకి నాశనం చేయండి.',
          'అధిక మోతాదులో యూరియా వేయడం ఆపండి, ఎందుకంటే ఇది తెల్లదోమలను మరింత ఆకర్షిస్తుంది.'
        ],
        culturalPractices: [
          'పొలం గట్ల వెంబడి జొన్న, మొక్కజొన్న లేదా సజ్జలను 2-3 వరుసలు రక్షణ పంటగా వేయండి.',
          'గట్లపై ఉన్న వయ్యారిభామ (పార్థీనియం), తుత్తురుబెండ కలుపు మొక్కలను తొలగించండి.',
          'ఉదయం వేళల్లో ఆకుల అడుగున తెల్లదోమల సంఖ్యను క్రమం తప్పకుండా గమనించండి.'
        ],
        organicControl: [
          'వేప నూనె (10,000 ppm) లీటరు నీటికి 5 మి.లీ కలిపి సబ్బు ద్రావణంతో పిచికారీ చేయండి.',
          'వర్టిసిలియం లెకాని అనే మిత్ర శిలీంధ్రం లీటరుకు 5 గ్రాములు చొప్పున వాడండి.',
          'ఎకరాకు 10,000 క్రైసోపెర్లా (మిత్రపురుగు) లార్వాలను విడుదల చేయండి.'
        ],
        chemicalControl: [
          'డయాఫెంథియురాన్ 50% WP లీటరు నీటికి 1.5 గ్రాములు (ఎకరాకు 150-200 లీటర్ల నీటిలో 250 గ్రాములు).',
          'పైరిప్రాక్సిఫెన్ 10% EC లీటరుకు 2 మి.లీ చొప్పున తెల్లదోమ పిల్ల పురుగుల నివారణకు వాడండి.'
        ],
        prevention: [
          'ఆకు ముడుత తెగులును తట్టుకునే గుర్తింపు పొందిన హైబ్రిడ్ విత్తనాలను ఎంచుకోండి.',
          'పత్తి తర్వాత గోధుమ లేదా శనగ పంటలతో పంట మార్పిడి చేయండి.',
          'సింథటిక్ పైరెథ్రాయిడ్స్ మందులను ప్రారంభంలో వాడకండి, ఇవి తెల్లదోమలను మరింత పెంచుతాయి.'
        ],
        severityExplanation: {
          low: 'తక్కువ తీవ్రత (<15%). కొద్దిగా ఈనెలు లావు కావడం. వేప నూనె, పసుపు అట్టలు సరిపోతాయి.',
          medium: 'మధ్యస్థ తీవ్రత (15%–40%). ఆకులు ముడుచుకుంటున్నాయి. తెల్లదోమ నివారణ మందు అవసరం.',
          high: 'అధిక తీవ్రత (>40%). మొక్కలు గిడసబారిపోయాయి. పూత రాలుతోంది. తక్షణ రసాయనిక పిచికారీ అవసరం.',
          critical: 'తీవ్రమైన ప్రమాదం (>60%). వైరస్ తోట అంతటా వ్యాపించింది. కాయలు ఏర్పడవు.'
        },
        pesticide: {
          productName: 'పెగాసస్ (Diafenthiuron 50% WP)',
          activeIngredient: 'Diafenthiuron 50% WP',
          formulation: 'వెట్టబుల్ పౌడర్ (WP)',
          purpose: 'ఆకు ముడుత వైరస్‌ను వ్యాపింపజేసే తెల్లదోమలు మరియు నల్లులను నిర్మూలించే సమర్థవంతమైన పురుగుమందు.',
          recommendedConcentration: 'లీటరు నీటికి 1.5 గ్రాములు',
          concentrationGramsPerLitre: 1.5,
          waterRequirementPerAcre: 175,
          quantityPerAcre: 250,
          unit: 'g',
          applicationMethod: 'ఆకుల అడుగు భాగం బాగా తడిచేలా నాజిల్‌ను పైకి తిప్పి పిచికారీ చేయాలి.',
          applicationFrequency: 'వరుసగా రెండు సార్ల కంటే ఎక్కువ వాడకండి; రసాయన తరగతిని మార్చాలి.',
          preHarvestIntervalDays: 14,
          safetyPrecautions: [
            'పౌడర్ కలిపేటప్పుడు మాస్క్, కళ్లజోడు మరియు రబ్బరు తొడుగులు తప్పనిసరిగా ధరించాలి.',
            'తెల్లదోమలు కదలకుండా ఉండే ఉదయం వేళల్లోనే పిచికారీ చేయాలి.',
            'గాలికి ఎదురుగా లేదా ఎండ ఎక్కువగా ఉన్నప్పుడు పిచికారీ చేయకూడదు.',
            'తేనెటీగల పెట్టెలు, చేపల చెరువులు ఉన్న వైపు మందు పడకుండా చూడాలి.'
          ],
          source: 'ICAR - కేంద్ర పత్తి పరిశోధనా సంస్థ (CICR)',
          dateVerified: '2026',
          defaultPricePerUnit: 680
        }
      },
      hi: {
        cropName: 'कपास (Gossypium hirsutum)',
        scientificCropName: 'Gossypium hirsutum',
        diseaseName: 'कपास पत्ती मरोड़ रोग एवं सफेद मक्खी (CLCuV)',
        scientificDiseaseName: 'Begomovirus एवं सफेद मक्खी (Bemisia tabaci)',
        whatIsHappening: 'कपास का पत्ती मरोड़ रोग सफेद मक्खी कीट द्वारा फैलता है। सफेद मक्खियां पत्तियों की निचली सतह से रस चूसते समय विषाणु (वायरस) पौधे में छोड़ देती हैं। इससे पत्तियों की नसें मोटी हो जाती हैं और पत्तियां ऊपर या नीचे मुड़ जाती हैं, जिससे पौधे की बढ़वार रुक जाती है और टिंडे नहीं बनते।',
        symptoms: [
          'ऊपरी नई पत्तियों का ऊपर या नीचे की ओर मुड़ना (मरोड़िया)',
          'पत्तियों की निचली सतह की नसों का असामान्य रूप से मोटा और गहरा हरा होना',
          'नसों के नीचे छोटे पत्ती जैसे उभार (एनेशन) निकलना',
          'पौधों की बढ़वार रुकना और पौधे का बौना रह जाना',
          'फूलों के छत्ते और कपास के टिंडों का बहुत कम बनना'
        ],
        immediateActions: [
          'पत्तियों की निचली सतह पर सफेद मक्खियों के झुंड पर लक्षित छिड़काव करें।',
          'प्रति एकड़ 12 से 15 पीले चिपचिपे ट्रैप फसल की ऊंचाई पर लगाएं।',
          'शुरुआती अवस्था में अत्यधिक रोगी पौधों को उखाड़कर नष्ट कर दें।',
          'खेत में यूरिया की अधिक मात्रा न डालें, इससे रस चूसक कीट बढ़ते हैं।'
        ],
        culturalPractices: [
          'खेत की मेड़ों पर ज्वार, बाजरा या मक्का की 2-3 कतारें सुरक्षा बाड़ के रूप में लगाएं।',
          'मेड़ों से गाजर घास (पार्थेनियम) और खरपतवार को पूरी तरह साफ करें।',
          'सुबह के समय सफेद मक्खी की संख्या की नियमित निगरानी करें।'
        ],
        organicControl: [
          'नीम का तेल (10,000 ppm) 5 मिली प्रति लीटर पानी में हल्के साबुन के साथ छिड़कें।',
          'वर्टिसिलियम लेकानी फफूंद 5 ग्राम प्रति लीटर पानी में मिलाकर डालें।',
          'क्राइसोपरला मित्र कीट के 10,000 लार्वा प्रति एकड़ खेत में छोड़ें।'
        ],
        chemicalControl: [
          'डायफेंथियूरॉन 50% WP 1.5 ग्राम प्रति लीटर पानी (प्रति एकड़ 150-200 लीटर पानी में 250 ग्राम)।',
          'पायरीप्रॉक्सिफेन 10% EC 2 मिली/लीटर सफेद मक्खी के अंडों और बच्चों की रोकथाम हेतु।'
        ],
        prevention: [
          'पत्ती मरोड़ रोधी प्रमाणित संकर किस्मों के बीजों की ही बुवाई करें।',
          'कपास के बाद गेहूं या चने के साथ फसल चक्र अपनाएं।',
          'शुरुआत में सिंथेटिक पाइरेथ्रोइड कीटनाशकों का प्रयोग न करें, इनसे सफेद मक्खी बढ़ती है।'
        ],
        severityExplanation: {
          low: 'कम गंभीरता (<15%)। केवल ऊपरी नसों का मोटा होना। नीम तेल व पीले ट्रैप पर्याप्त हैं।',
          medium: 'मध्यम गंभीरता (15%–40%)। पत्तियां मुड़ रही हैं। सफेद मक्खी नाशक कीटनाशक आवश्यक है।',
          high: 'उच्च गंभीरता (>40%)। पौधा बौना हो चुका है। तत्काल रासायनिक उपचार आवश्यक है।',
          critical: 'अत्यधिक गंभीर (>60%)। पूरे खेत में रोग फैल गया है। टिंडे बनने बंद हो गए हैं।'
        },
        pesticide: {
          productName: 'पेगासस (Diafenthiuron 50% WP)',
          activeIngredient: 'Diafenthiuron 50% WP',
          formulation: 'घुलनशील पाउडर (WP)',
          purpose: 'पत्ती मरोड़ वायरस फैलाने वाली सफेद मक्खी और माइट्स को नियंत्रित करने वाला विशिष्ट कीटनाशक।',
          recommendedConcentration: '1.5 ग्राम प्रति लीटर पानी',
          concentrationGramsPerLitre: 1.5,
          waterRequirementPerAcre: 175,
          quantityPerAcre: 250,
          unit: 'g',
          applicationMethod: 'पत्तियों की निचली सतह पर अच्छी तरह दवा लगे, नोजल को ऊपर की ओर रखकर छिड़कें।',
          applicationFrequency: 'लगातार 2 से अधिक बार न छिड़कें; दवा का वर्ग बदलें।',
          preHarvestIntervalDays: 14,
          safetyPrecautions: [
            'पाउडर मिलाते समय मास्क, चश्मा और रबर के दस्ताने अवश्य पहनें।',
            'सफेद मक्खियां शांत रहने वाले सुबह के समय छिड़काव करें।',
            'हवा के विपरीत या तेज धूप में छिड़काव न करें।',
            'मधुमक्खी बक्सों और जलाशयों के पास दवा के बहाव से बचें।'
          ],
          source: 'ICAR - केंद्रीय कपास अनुसंधान संस्थान (CICR)',
          dateVerified: '2026',
          defaultPricePerUnit: 680
        }
      },
      ta: {
        cropName: 'பருத்தி (Gossypium hirsutum)',
        scientificCropName: 'Gossypium hirsutum',
        diseaseName: 'பருத்தி இலைச்சுருள் நோய் மற்றும் வெள்ளை ஈ (CLCuV)',
        scientificDiseaseName: 'Begomovirus மற்றும் வெள்ளை ஈ (Bemisia tabaci)',
        whatIsHappening: 'பருத்தி இலைச்சுருள் நோய் வெள்ளை ஈ எனும் பூச்சியினால் பரவுகிறது. வெள்ளை ஈக்கள் இலைகளின் அடிப்பகுதியில் இருந்து சாற்றை உறிஞ்சும் போது வைரஸை உட்செலுத்துகின்றன. இதனால் இலை நரம்புகள் தடித்து இலைகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு செடியின் வளர்ச்சி குன்றி, பருத்தி காய்கள் உருவாகாமல் மகசூல் குறைகிறது.',
        symptoms: [
          'மேல் இளந்தளிர்கள் மேல்நோக்கி அல்லது கீழ்நோக்கி கிண்ணம் போல சுருங்குதல்',
          'இலையின் அடியில் நரம்புகள் தடித்து அடர் பச்சையாக வீங்குதல்',
          'இலை நரம்புகளின் அடியில் சிறிய இலை போன்ற தடிப்புகள் (எனேஷன்) தோன்றுதல்',
          'செடிகள் போதிய வளர்ச்சியின்றி குட்டையாக மாறுதல்',
          'பூ மொட்டுகள் மற்றும் பருத்தி காய்கள் மிக குறைவாக உருவாகுதல்'
        ],
        immediateActions: [
          'இலையின் அடிப்பகுதியில் உள்ள வெள்ளை ஈ கூட்டத்தை அழிக்க உடனே மருந்து தெளிக்கவும்.',
          'ஏக்கருக்கு 12 முதல் 15 மஞ்சள் ஒட்டும் பொறிகளை பயிர் மட்டத்தில் வைக்கவும்.',
          'ஆரம்பத்தில் அதிகம் பாதிக்கப்பட்ட செடிகளை பிடுங்கி அழித்து விடவும்.',
          'அதிகப்படியான யூரியா உரம் இடுவதை தவிர்க்கவும்; இது சாறு உறிஞ்சும் பூச்சிகளை ஈர்க்கும்.'
        ],
        culturalPractices: [
          'வயல் வரப்பில் சோளம், கம்பு அல்லது மக்காச்சோளத்தை 2-3 வரிசைகளில் அரண் பயிராக நடவும்.',
          'வரப்புகளில் உள்ள பார்த்தீனியம் போன்ற களைகளை உடனே அகற்றவும்.',
          'காலை வேளையில் வெள்ளை ஈக்களின் நடமாட்டத்தை தொடர்ந்து கண்காணிக்கவும்.'
        ],
        organicControl: [
          'வேப்பெண்ணெய் (10,000 ppm) ஒரு லிட்டர் தண்ணீருக்கு 5 மி.லி கலந்து தெளிக்கவும்.',
          'வெர்ட்டிசீலியம் லெக்கானி பூஞ்சை லிட்டருக்கு 5 கிராம் கலந்து மாலையில் தெளிக்கவும்.',
          'கிரைசோபெர்லா நன்மை செய்யும் பூச்சிகளை ஏக்கருக்கு 10,000 விடவும்.'
        ],
        chemicalControl: [
          'டயாபென்தியூரான் 50% WP லிட்டருக்கு 1.5 கிராம் (ஏக்கருக்கு 150-200 லிட்டர் நீரில் 250 கிராம்).',
          'பைரிப்ராக்ஸிஃபென் 10% EC லிட்டருக்கு 2 மி.லி வெள்ளை ஈ குஞ்சுகளை கட்டுப்படுத்த தெளிக்கவும்.'
        ],
        prevention: [
          'இலைச்சுருள் நோயை எதிர்க்கும் சான்றளிக்கப்பட்ட வீரிய ஒட்டு பருத்தி விதைகளை பயிரிடவும்.',
          'பருத்திக்கு பின் கோதுமை அல்லது உளுந்துடன் பயிர் சுழற்சி செய்யவும்.',
          'ஆரம்பத்தில் செயற்கை பைரித்ராய்டு மருந்துகளை தெளிக்கக் கூடாது; அவை வெள்ளை ஈக்களை பெருக்கும்.'
        ],
        severityExplanation: {
          low: 'குறைந்த தீவிரம் (<15%). நரம்புகள் லேசாக தடித்தல். வேப்பெண்ணெய், மஞ்சள் பொறி போதுமானது.',
          medium: 'மிதமான தீவிரம் (15%–40%). இலைகள் சுருளுகின்றன. வெள்ளை ஈ கட்டுப்பாட்டு மருந்து தேவை.',
          high: 'அதிக தீவிரம் (>40%). செடி வளர்ச்சி குன்றிவிட்டது. உடனடி ரசாயன மருந்து தெளிப்பு அவசியம்.',
          critical: 'மிக தீவிர பாதிப்பு (>60%). தோட்டம் முழுவதும் வைரஸ் பரவியுள்ளது. காய்கள் உருவாகாது.'
        },
        pesticide: {
          productName: 'பெகாசஸ் (Diafenthiuron 50% WP)',
          activeIngredient: 'Diafenthiuron 50% WP',
          formulation: 'நனையும் தூள் (WP)',
          purpose: 'இலைச்சுருள் வைரஸை பரப்பும் வெள்ளை ஈக்கள் மற்றும் உண்ணிகளை அழிக்கும் பிரத்யேக பூச்சிக்கொல்லி.',
          recommendedConcentration: 'லிட்டருக்கு 1.5 கிராம்',
          concentrationGramsPerLitre: 1.5,
          waterRequirementPerAcre: 175,
          quantityPerAcre: 250,
          unit: 'g',
          applicationMethod: 'இலையின் அடிப்பகுதியில் மருந்து நன்கு படியுமாறு நாசிலை மேல்நோக்கி வைத்து தெளிக்கவும்.',
          applicationFrequency: 'தொடர்ந்து 2 முறைக்கு மேல் தெளிக்கக்கூடாது; மருந்து வகையை மாற்ற வேண்டும்.',
          preHarvestIntervalDays: 14,
          safetyPrecautions: [
            'மருந்து கலக்கும் போது முகக்கவசம், மூக்குக்கண்ணாடி மற்றும் ரப்பர் கையுறைகள் அணியவும்.',
            'வெள்ளை ஈக்கள் அசையாமல் இருக்கும் காலை வேளையில் மட்டுமே தெளிக்கவும்.',
            'எதிர்க்காற்றிலோ அல்லது சுட்டெரிக்கும் வெயிலிலோ தெளிக்கக்கூடாது.',
            'தேன் பெட்டிகள் மற்றும் நீர்நிலைகளில் மருந்து படாதவாறு கவனமாக தெளிக்கவும்.'
          ],
          source: 'ICAR - மத்திய பருத்தி ஆராய்ச்சி நிறுவனம் (CICR)',
          dateVerified: '2026',
          defaultPricePerUnit: 680
        }
      }
    }
  },

  'rice_bacterial_blight': {
    id: 'rice_bacterial_blight',
    cropKey: 'rice',
    severityDefault: 'Medium',
    severityPercentageDefault: 32.0,
    confidenceDefault: 93,
    languages: {
      en: {
        cropName: 'Rice / Paddy (Oryza sativa)',
        scientificCropName: 'Oryza sativa',
        diseaseName: 'Bacterial Leaf Blight of Rice (BLB)',
        scientificDiseaseName: 'Xanthomonas oryzae pv. oryzae',
        whatIsHappening: 'Bacterial Leaf Blight (BLB) is caused by the bacterium Xanthomonas oryzae. The bacteria enter through natural leaf openings and wounds caused by strong wind or insect feeding. Lesions spread rapidly in waterlogged fields, drying out leaves, causing kresek (seedling wilt) and poor grain filling.',
        symptoms: [
          'Water-soaked to yellowish-green wavy wavy margins along leaf tips',
          'Lesions turning straw-yellow to dirty white as leaf blades dry out',
          'Bacterial ooze droplets (milky dew beads) visible on young lesions in early morning',
          'Kresek symptom (complete drying and wilting of young tillers)',
          'Chaffy, partially filled grains with darkened discoloration'
        ],
        immediateActions: [
          'Drain standing water from the paddy field for 48 hours to aerate soil.',
          'Withhold all nitrogen (urea) top-dressing until fresh lesions stop appearing.',
          'Apply muriate of potash (MOP) @ 15-20 kg/acre to strengthen cell walls.',
          'Spray verified bactericide-copper combination on a clear sunny morning.'
        ],
        culturalPractices: [
          'Avoid clipping seedlings during transplanting as wounds harbor bacteria.',
          'Maintain balanced N:P:K fertilization (never over-dose nitrogen).',
          'Do not pass through wet infected fields to prevent mechanical transmission.'
        ],
        organicControl: [
          'Neem cake application in nursery beds @ 100 kg/acre.',
          'Foliar spray of Pseudomonas fluorescens bio-agent @ 5g per Litre of water.',
          'Spray fresh cow dung filtrate (20%) as traditional microbial deterrent.'
        ],
        chemicalControl: [
          'Copper Hydroxide 53.8% DF @ 2.0g/L + Streptocycline @ 6g per 50 Litres of water.',
          'Copper Oxychloride 50% WP (2.5g/L) + Plantomycin (1g/10L).'
        ],
        prevention: [
          'Sow certified BLB-resistant paddy varieties (e.g. Improved Samba Mahsuri).',
          'Treat seeds with Streptocycline (1g in 10L water) before sprouting.',
          'Clean field bunds of wild host grasses (Leersia hexandra).'
        ],
        severityExplanation: {
          low: 'Low severity (<15%). Confined to leaf tips. Drain field and apply potash.',
          medium: 'Medium severity (15%–40%). Wavy lesions moving down blades. Spray copper-bactericide.',
          high: 'High severity (>40%). Extensive straw-yellow drying. Urgent curative bactericide needed.',
          critical: 'Critical severity (>60%). Kresek wilting and grain sterility. Immediate intervention.'
        },
        pesticide: {
          productName: 'Kocide 2000 (Copper Hydroxide 53.8% DF) + Streptocycline',
          activeIngredient: 'Copper Hydroxide 53.8% DF + Streptomycin Sulfate + Tetracycline',
          formulation: 'Dry Flowable (DF) + Powder Pouch',
          purpose: 'Synergistic bactericide and copper complex controlling Xanthomonas leaf infection.',
          recommendedConcentration: '2.0g Copper Hydroxide + 6g Streptocycline per 50L water',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 150,
          quantityPerAcre: 300,
          unit: 'g',
          applicationMethod: 'Foliar spray across standing canopy on a dry sunny morning.',
          applicationFrequency: 'Repeat after 10 to 12 days if heavy monsoon storms reoccur.',
          preHarvestIntervalDays: 15,
          safetyPrecautions: [
            'Wear protective mask and gloves while dissolving antibiotic powder.',
            'Do not mix Copper Hydroxide directly with acidic insecticides or zinc sprays.',
            'Prevent chemical spray drift into aquaculture ponds or irrigation canals.',
            'Wash spraying equipment thoroughly with fresh water after use.'
          ],
          source: 'ICAR - National Rice Research Institute (NRRI)',
          dateVerified: '2026',
          defaultPricePerUnit: 520
        }
      },
      te: {
        cropName: 'వరి / వరి పైరు (Oryza sativa)',
        scientificCropName: 'Oryza sativa',
        diseaseName: 'వరి బాక్టీరియా ఆకు ఎండు తెగులు (BLB)',
        scientificDiseaseName: 'Xanthomonas oryzae pv. oryzae',
        whatIsHappening: 'ఈ తెగులు క్సాంతోమోనాస్ అనే బాక్టీరియా వల్ల వస్తుంది. గాలులు, వర్షాల వల్ల ఆకులకు పడే చిన్న గాయాలు మరియు సహజ రంధ్రాల ద్వారా బాక్టీరియా లోపలికి ప్రవేశిస్తుంది. నీరు నిలిచి ఉన్న పొలాల్లో ఇది చాలా వేగంగా వ్యాపించి ఆకుల చివర్ల నుంచి ఎండుకుంటూ వచ్చి గింజలు సరిగా పాలుపోయక తాలుగా మారతాయి.',
        symptoms: [
          'ఆకుల చివర్ల నుండి అంచుల వెంబడి అలల ఆకారంలో పసుపు-పచ్చటి చారలు ఏర్పడటం',
          'ఆకులు ఎండుగడ్డి రంగులోకి లేదా మురికి తెల్లగా మారి ఎండిపోవడం',
          'తెల్లవారుజామున లేత మచ్చలపై చిన్న పాల చుక్కల వంటి బాక్టీరియా జిగురు బిందువులు కనిపించడం',
          'పైరు పిలకలు పూర్తిగా ఎండిపోయి చనిపోవడం (క్రెసెక్ లక్షణం)',
          'కంకులు తాలుగా మారి ధాన్యం దిగుబడి తీవ్రంగా తగ్గడం'
        ],
        immediateActions: [
          'పొలంలో నిల్వ ఉన్న నీటిని వెంటనే 2 రోజుల పాటు పూర్తిగా తీసివేసి ఆరబెట్టండి.',
          'తెగులు తగ్గే వరకు యూరియా (నత్రజని) వేయడం పూర్తిగా ఆపండి.',
          'ఎకరాకు 15-20 కిలోల మ్యూరేట్ ఆఫ్ పొటాష్ (MOP) వేసి పైరుకు రోగనిరోధక శక్తినివ్వండి.',
          'ఎండ ఉన్న ఉదయం వేళ కాపర్ మరియు స్ట్రెప్టోసైక్లిన్ కలిపి పిచికారీ చేయండి.'
        ],
        culturalPractices: [
          'నాట్లు వేసేటప్పుడు ఆకుల కొనలను తుంచడం మానుకోండి (గాయాల ద్వారా బాక్టీరియా చేరుతుంది).',
          'నత్రజని, భాస్వరం, పొటాష్ ఎరువులను సమతుల్యంగా వేయండి; యూరియా ఎక్కువ వేయకూడదు.',
          'తెగులు ఉన్న తడి పొలాల్లో అటూఇటూ తిరగవద్దు.'
        ],
        organicControl: [
          'నారుమడిలో ఎకరాకు 100 కిలోల వేపపిండి వేయండి.',
          'సూడోమోనాస్ ఫ్లోరోసెన్స్ లీటరు నీటికి 5 గ్రాముల చొప్పున పిచికారీ చేయండి.',
          'తాజా ఆవుపేడ ద్రావణం (20%) వడకట్టి పిచికారీ చేయడం సాంప్రదాయ పద్ధతి.'
        ],
        chemicalControl: [
          'కాపర్ హైడ్రాక్సైడ్ 53.8% DF (2 గ్రా/లీ) + స్ట్రెప్టోసైక్లిన్ (50 లీటర్ల నీటికి 6 గ్రాములు).',
          'కాపర్ ఆక్సీక్లోరైడ్ 50% WP (2.5 గ్రా/లీ) + ప్లాంటోమైసిన్ (10 లీటర్లకు 1 గ్రాము).'
        ],
        prevention: [
          'బాక్టీరియా ఎండు తెగులును తట్టుకునే రకాలను (ఉదా: ఇంప్రూవ్డ్ సాంబ మసూరి) సాగు చేయండి.',
          'స్ట్రెప్టోసైక్లిన్ ద్రావణంలో విత్తనాలను నానబెట్టి విత్తన శుద్ధి చేయండి.',
          'పొలం గట్లపై ఉండే అడవి గడ్డి కలుపును తొలగించండి.'
        ],
        severityExplanation: {
          low: 'తక్కువ తీవ్రత (<15%). ఆకుల చివర్లకే పరిమితం. నీరు తీసివేసి పొటాష్ వేయండి.',
          medium: 'మధ్యస్థ తీవ్రత (15%–40%). ఆకుల అంచుల వెంబడి ఎండిపోతోంది. కాపర్ + బాక్టీరిసైడ్ స్ప్రే అవసరం.',
          high: 'అధిక తీవ్రత (>40%). ఆకులు ఎండుగడ్డిలా మారిపోతున్నాయి. తక్షణ రసాయనిక నివారణ చేపట్టాలి.',
          critical: 'తీవ్రమైన ప్రమాదం (>60%). పిలకలు చనిపోతున్నాయి, గింజలు తాలు అవుతాయి.'
        },
        pesticide: {
          productName: 'కొసైడ్ 2000 (Copper Hydroxide 53.8% DF) + స్ట్రెప్టోసైక్లిన్',
          activeIngredient: 'Copper Hydroxide 53.8% DF + Streptomycin + Tetracycline',
          formulation: 'డ్రై ఫ్లోయబుల్ (DF) + పౌడర్ పౌచ్',
          purpose: 'వరి బాక్టీరియా ఆకు ఎండు తెగులును నివారించే శక్తివంతమైన బాక్టీరిసైడ్ మరియు రాగి మిశ్రమం.',
          recommendedConcentration: 'లీటరుకు 2.0 గ్రా కాపర్ హైడ్రాక్సైడ్ + 50 లీటర్ల నీటికి 6 గ్రా స్ట్రెప్టోసైక్లిన్',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 150,
          quantityPerAcre: 300,
          unit: 'g',
          applicationMethod: 'వర్షం లేని నిర్మలమైన ఎండ ఉదయం వేళ పైరుపై సమానంగా పిచికారీ చేయాలి.',
          applicationFrequency: 'వర్షాలు మళ్లీ పడి తెగులు ఆగకపోతే 10 నుండి 12 రోజుల తర్వాత మరోసారి చేయండి.',
          preHarvestIntervalDays: 15,
          safetyPrecautions: [
            'యాంటీబయాటిక్ పౌడర్ కలిపేటప్పుడు మాస్క్, చేతి తొడుగులు వాడాలి.',
            'కాపర్ మందులను జింక్ లేదా ఆమ్ల గుణం ఉన్న పురుగుమందులతో నేరుగా కలపకూడదు.',
            'చేపల చెరువుల్లోకి మందు నీరు పోకుండా గట్లు ఎత్తుగా ఉంచాలి.',
            'పిచికారీ తర్వాత పంపులను మంచి నీటితో శుభ్రంగా కడగాలి.'
          ],
          source: 'ICAR - జాతీయ వరి పరిశోధనా సంస్థ (NRRI)',
          dateVerified: '2026',
          defaultPricePerUnit: 520
        }
      },
      hi: {
        cropName: 'धान / चावल (Oryza sativa)',
        scientificCropName: 'Oryza sativa',
        diseaseName: 'धान का जीवाणु झुलसा रोग (BLB)',
        scientificDiseaseName: 'Xanthomonas oryzae pv. oryzae',
        whatIsHappening: 'यह रोग ज़ैंथोमोनास नामक जीवाणु (बैक्टीरिया) के कारण होता है। हवा और बारिश से पत्तियों पर बने घावों से यह जीवाणु पौधे में प्रवेश करता है। खेत में पानी भरे रहने पर यह तेजी से फैलता है, पत्तियां सूख जाती हैं और बालियों में दाने नहीं भरते, जिससे भारी नुकसान होता है।',
        symptoms: [
          'पत्तियों की नोक और किनारों से लहरदार पीले-हरे धब्बे बनना',
          'पत्तियां सूखकर भूसे जैसी पीली या गंदी सफेद हो जाना',
          'सुबह के समय ताजे धब्बों पर दूधिया जीवाणु बूंदें (ऊज़) दिखना',
          'कल्लों का सूखकर मुरझाना (क्रेसेक लक्षण)',
          'बालियों में दाने थोथे (खाली) रह जाना'
        ],
        immediateActions: [
          'खेत से खड़ा पानी 48 घंटे के लिए तुरंत बाहर निकाल दें।',
          'रोग रुकने तक यूरिया खाद डालना पूरी तरह बंद करें।',
          'प्रति एकड़ 15-20 किलो पोटाश (MOP) डालकर पौधों को मजबूत बनाएं।',
          'धूप निकलने पर कॉपर और स्ट्रेप्टोसाइक्लिन का छिड़काव करें।'
        ],
        culturalPractices: [
          'रोपाई के समय पौध की ऊपरी पत्तियों को न काटें।',
          'संतुलित मात्रा में ही उर्वरक डालें; यूरिया का अत्यधिक प्रयोग न करें।',
          'रोगी खेत में गीली अवस्था में चलने से बचें।'
        ],
        organicControl: [
          'नर्सरी में 100 किलो प्रति एकड़ नीम की खली डालें।',
          'स्यूडोमोनास फ्लोरोसेंस 5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।',
          'ताजे गाय के गोबर का 20% घोल छानकर छिड़कना लाभकारी होता है।'
        ],
        chemicalControl: [
          'कॉपर हाइड्रोक्साइड 53.8% DF 2.0 ग्राम/ली + स्ट्रेप्टोसाइक्लिन 6 ग्राम प्रति 50 लीटर पानी।',
          'कॉपर ऑक्सीक्लोराइड 50% WP (2.5 ग्राम/ली) + प्लांटोमाइसिन (1 ग्राम/10ली)।'
        ],
        prevention: [
          'रोगरोधी धान की किस्मों (जैसे इम्प्रूव्ड सांभा महसूरी) की ही बुवाई करें।',
          'स्ट्रेप्टोसाइक्लिन से बीज उपचार करके ही बुवाई करें।',
          'खेत की मेड़ों को खरपतवार मुक्त रखें।'
        ],
        severityExplanation: {
          low: 'कम गंभीरता (<15%)। पत्तियों की नोक तक सीमित। पानी निकालें और पोटाश डालें।',
          medium: 'मध्यम गंभीरता (15%–40%)। पत्तियां किनारों से सूख रही हैं। कॉपर + जीवाणुनाशक दवा डालें।',
          high: 'उच्च गंभीरता (>40%)। पत्तियां तेजी से सफेद हो रही हैं। तत्काल उपचार जरूरी है।',
          critical: 'अत्यधिक गंभीर (>60%)। कल्ले सूख रहे हैं और बालियां खाली रह जाएंगी।'
        },
        pesticide: {
          productName: 'कोसाइड 2000 (Copper Hydroxide 53.8% DF) + स्ट्रेप्टोसाइक्लिन',
          activeIngredient: 'Copper Hydroxide 53.8% DF + Streptomycin + Tetracycline',
          formulation: 'सूखा प्रवाहित पाउडर (DF) + पाउच',
          purpose: 'धान के जीवाणु झुलसा रोग को रोकने वाला अत्यधिक प्रभावी जीवाणुनाशक और तांबा मिश्रण।',
          recommendedConcentration: '2.0 ग्राम कॉपर हाइड्रोक्साइड + 50 लीटर पानी में 6 ग्राम स्ट्रेप्टोसाइक्लिन',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 150,
          quantityPerAcre: 300,
          unit: 'g',
          applicationMethod: 'धूप वाले साफ मौसम में सुबह के समय फसल पर समान रूप से छिड़काव करें।',
          applicationFrequency: 'यदि बारिश फिर से हो और रोग न थमे तो 10-12 दिन बाद दोबारा छिड़कें।',
          preHarvestIntervalDays: 15,
          safetyPrecautions: [
            'दवा घोलते समय मास्क और रबर के दस्ताने पहनें।',
            'कॉपर को सीधे जिंक या अम्लीय कीटनाशकों के साथ न मिलाएं।',
            'दवा को मछली पालन वाले तालाबों में जाने से रोकें।',
            'छिड़काव के बाद स्प्रे पंप को साफ पानी से अच्छी तरह धोएं।'
          ],
          source: 'ICAR - राष्ट्रीय चावल अनुसंधान संस्थान (NRRI)',
          dateVerified: '2026',
          defaultPricePerUnit: 520
        }
      },
      ta: {
        cropName: 'நெல் / நெற்பயிர் (Oryza sativa)',
        scientificCropName: 'Oryza sativa',
        diseaseName: 'நெல் பாக்டீரியா இலைக்கருகல் நோய் (BLB)',
        scientificDiseaseName: 'Xanthomonas oryzae pv. oryzae',
        whatIsHappening: 'இந்த நோய் சாந்தோமோனாஸ் பாக்டீரியாவினால் ஏற்படுகிறது. பலத்த காற்று மற்றும் பூச்சிகளால் ஏற்படும் காயங்கள் வழியாக பாக்டீரியா உள்ளே நுழைகிறது. நீர் தேங்கிய வயல்களில் வேகமாக பரவி இலைகளை உலர்த்தி, பயிரை கருகச் செய்து நெல் மணிகள் பதராக மாற காரணமாகிறது.',
        symptoms: [
          'இலை நுனியில் இருந்து விளிம்புகளில் அலை போன்ற மஞ்சள்-பச்சை நிற கோடுகள் தோன்றுதல்',
          'இலைகள் வைக்கோல் மஞ்சள் அல்லது மங்கலான வெள்ளை நிறமாக மாறி காய்ந்து போதல்',
          'அதிகாலை வேளையில் இளம் புள்ளிகளில் பால் போன்ற பாக்டீரியா திரவத் துளிகள் தெரிதல்',
          'தூர்கள் முழுமையாக காய்ந்து வாடுதல் (கிரெசக் நிலை)',
          'கதிர்களில் மணிகள் பதராகி பழுப்பு நிறமாக மாறுதல்'
        ],
        immediateActions: [
          'வயலில் தேங்கியுள்ள தண்ணீரை 48 மணிநேரத்திற்கு உடனே வடித்து விடவும்.',
          'நோய் கட்டுப்படும் வரை யூரியா உரம் இடுவதை முற்றிலும் நிறுத்தவும்.',
          'ஏக்கருக்கு 15-20 கிலோ பொட்டாஷ் உரம் இட்டு பயிரின் நோய் எதிர்ப்பு திறனை கூட்டவும்.',
          'வெயில் உள்ள காலை வேளையில் காப்பர் மற்றும் ஸ்ட்ரெப்டோசைக்ளின் கலந்து தெளிக்கவும்.'
        ],
        culturalPractices: [
          'நாற்று நடும் போது இலை நுனிகளை கிள்ளுவதை தவிர்க்கவும்.',
          'தழை, மணி, சாம்பல் சத்து உரங்களை சமச்சீராக இடவும்; யூரியாவை அதிகமாக இடக்கூடாது.',
          'நோய் தாக்கிய ஈரமான வயல்களில் நடமாடுவதை தவிர்க்கவும்.'
        ],
        organicControl: [
          'நாற்றங்காலில் ஏக்கருக்கு 100 கிலோ வேப்பம்பிண்ணாக்கு இடவும்.',
          'சூடோமோனாஸ் புளோரசன்ஸ் லிட்டருக்கு 5 கிராம் கலந்து தெளிக்கவும்.',
          'புதிய நாட்டு மாட்டு சாண எரிசாரம் (20%) வடிகட்டி தெளிப்பது சிறந்த இயற்கை முறை.'
        ],
        chemicalControl: [
          'காப்பர் ஹைட்ராக்சைடு 53.8% DF (2 கிராம்/லி) + ஸ்ட்ரெப்டோசைக்ளின் (50 லிட்டர் நீரில் 6 கிராம்).',
          'காப்பர் ஆக்ஸிகுளோரைடு 50% WP (2.5 கிராம்/லி) + பிளான்டோமைசின் (1 கிராம்/10லி).'
        ],
        prevention: [
          'பாக்டீரியா கருகலை எதிர்க்கும் சாம்பா மசூரி போன்ற ரகங்களை பயிரிடவும்.',
          'ஸ்ட்ரெப்டோசைக்ளின் கரைசலில் விதை நேர்த்தி செய்து விதைக்கவும்.',
          'வரப்புகளில் உள்ள களைகளை சுத்தமாக பராமரிக்கவும்.'
        ],
        severityExplanation: {
          low: 'குறைந்த தீவிரம் (<15%). இலை நுனிகளில் மட்டும். நீரை வடித்து பொட்டாஷ் இடவும்.',
          medium: 'மிதமான தீவிரம் (15%–40%). இலை விளிம்புகளில் காய்கிறது. காப்பர் + பாக்டீரிசைடு தெளிக்கவும்.',
          high: 'அதிக தீவிரம் (>40%). இலைகள் வேகமாக வெளிறி காய்கின்றன. உடனடி மருந்து தெளிப்பு தேவை.',
          critical: 'மிக தீவிர பாதிப்பு (>60%). தூர்கள் மடிகின்றன, மணிகள் பதராகும் அபாயம்.'
        },
        pesticide: {
          productName: 'கோசைட் 2000 (Copper Hydroxide 53.8% DF) + ஸ்ட்ரெப்டோசைக்ளின்',
          activeIngredient: 'Copper Hydroxide 53.8% DF + Streptomycin + Tetracycline',
          formulation: 'உலர்ந்த தூள் (DF) + பாக்கெட்',
          purpose: 'நெல் பாக்டீரியா இலைக்கருகல் நோயை கட்டுப்படுத்தும் சிறந்த காப்பர் மற்றும் நுண்ணுயிர் எதிர்ப்பு கலவை.',
          recommendedConcentration: 'லிட்டருக்கு 2.0 கிராம் காப்பர் ஹைட்ராக்சைடு + 50 லிட்டர் நீரில் 6 கிராம் ஸ்ட்ரெப்டோசைக்ளின்',
          concentrationGramsPerLitre: 2.0,
          waterRequirementPerAcre: 150,
          quantityPerAcre: 300,
          unit: 'g',
          applicationMethod: 'மழை இல்லாத தெளிவான வெயில் உள்ள காலை வேளையில் பயிரின் மேல் தெளிக்கவும்.',
          applicationFrequency: 'மழை பெய்து நோய் நீடித்தால் 10-12 நாட்களுக்கு பின் மீண்டும் தெளிக்கவும்.',
          preHarvestIntervalDays: 15,
          safetyPrecautions: [
            'மருந்து கலக்கும் போது முகக்கவசம் மற்றும் கையுறைகள் அணியவும்.',
            'காப்பரை துத்தநாகம் அல்லது அமில பூச்சிக்கொல்லிகளுடன் நேரடியாக கலக்கக்கூடாது.',
            'மருந்து கலந்த நீர் மீன் பண்ணைகளில் கலக்காமல் பார்த்துக் கொள்ளவும்.',
            'தெளித்த பின் தெளிப்பானை நல்ல தண்ணீரில் சுத்தம் செய்யவும்.'
          ],
          source: 'ICAR - தேசிய நெல் ஆராய்ச்சி நிறுவனம் (NRRI)',
          dateVerified: '2026',
          defaultPricePerUnit: 520
        }
      }
    }
  },

  'chilli_anthracnose': {
    id: 'chilli_anthracnose',
    cropKey: 'chilli',
    severityDefault: 'Low',
    severityPercentageDefault: 12.0,
    confidenceDefault: 90,
    languages: {
      en: {
        cropName: 'Chilli / Pepper (Capsicum annuum)',
        scientificCropName: 'Capsicum annuum',
        diseaseName: 'Chilli Anthracnose & Fruit Rot / Dieback',
        scientificDiseaseName: 'Colletotrichum capsici',
        whatIsHappening: 'Anthracnose is a devastating fungal pathogen that causes circular sunken necrotic spots on green and ripe chilli pods and die-back of young twigs. High relative humidity and warm temperatures allow fungal mycelium to penetrate fruit epidermis, causing premature dropping and black rotting.',
        symptoms: [
          'Sunken circular water-soaked spots on ripening chilli pods',
          'Concentric rings of dark salmon-pink fungal spore masses on fruit lesions',
          'Dieback of twigs starting from tip downwards with necrotic whitening',
          'Small greyish circular spots with dark brown margins on leaves',
          'Premature fruit drop and shriveled bleached mummified fruits'
        ],
        immediateActions: [
          'Pick and bury severely spotted pods and dried twigs away from the farm.',
          'Avoid picking chillies when dew is wet on the canopy.',
          'Apply preventive bio-fungicide or systemic triazole spray in late evening.',
          'Ensure furrow irrigation water does not splash from soil to lower fruits.'
        ],
        culturalPractices: [
          'Maintain clean rows with adequate plant spacing for fast canopy drying.',
          'Apply potash and calcium to toughen chilli fruit skin resistance.',
          'Collect and destroy all crop residues after harvest.'
        ],
        organicControl: [
          'Cold-pressed Neem Oil (10,000 ppm) @ 5ml/L as preventive eco-management.',
          'Foliar spray of Trichoderma viride bio-agent @ 5g per Litre of water.',
          'Pseudomonas fluorescens @ 5g/L during early flowering stage.'
        ],
        chemicalControl: [
          'Azoxystrobin 23% SC @ 1.0ml per Litre of water (200ml in 200L water/acre).',
          'Difenoconazole 25% EC @ 0.5ml per Litre of water as alternate curative.'
        ],
        prevention: [
          'Treat seeds with Thiram or Captan @ 3g/kg before nursery sowing.',
          'Use disease-tolerant chilli hybrids with upright pod orientation.',
          'Rotate with non-solanaceous crops (pulses, millets) for 2 years.'
        ],
        severityExplanation: {
          low: 'Low severity (<15%). Pinpoint spots on few leaves/twigs. Bio-organic neem/Trichoderma recommended.',
          medium: 'Medium severity (15%–40%). Pod lesions spreading. Targeted triazole fungicide spray needed.',
          high: 'High severity (>40%). Severe fruit rot and twig dieback. Emergency curative spray required.',
          critical: 'Critical severity (>60%). Massive pod rotting and fruit drop. Immediate intervention.'
        },
        pesticide: {
          productName: 'Amistar (Azoxystrobin 23% SC)',
          activeIngredient: 'Azoxystrobin 23% SC',
          formulation: 'Suspension Concentrate (SC)',
          purpose: 'Broad-spectrum translaminar systemic fungicide controlling anthracnose fruit rot and powdery mildew.',
          recommendedConcentration: '1.0 ml per Litre of water',
          concentrationGramsPerLitre: 1.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 200,
          unit: 'ml',
          applicationMethod: 'Foliar spray thoroughly misting flower clusters, twigs, and developing chilli pods.',
          applicationFrequency: 'Repeat after 10 to 14 days if warm, humid rains persist.',
          preHarvestIntervalDays: 3,
          safetyPrecautions: [
            'Wear protective mask and gloves while measuring liquid concentrate.',
            'Spray during calm evening hours to minimize honeybee exposure.',
            'Do not harvest chillies within 3 days of spray application.',
            'Keep empty containers away from drinking water and cattle sheds.'
          ],
          source: 'Indian Agricultural Research Institute (IARI) & ICAR',
          dateVerified: '2026',
          defaultPricePerUnit: 780
        }
      },
      te: {
        cropName: 'మిరప / పచ్చిమిర్చి (Capsicum annuum)',
        scientificCropName: 'Capsicum annuum',
        diseaseName: 'మిరప కాయకుళ్లు మరియు కొమ్మ ఎండు తెగులు (Anthracnose)',
        scientificDiseaseName: 'Colletotrichum capsici',
        whatIsHappening: 'మిరపలో ఆంత్రాక్నోస్ లేదా కాయకుళ్లు తెగులు కొలెట్టోట్రైకమ్ అనే శిలీంధ్రం వల్ల వస్తుంది. ఎక్కువ గాలి తేమ, వెచ్చని ఉష్ణోగ్రత ఉన్నప్పుడు ఈ శిలీంధ్రం కాయలు మరియు కొమ్మలపై దాడి చేస్తుంది. కాయలపై గుండ్రని నల్లటి గుంటలు పడి కాయలు కుళ్ళిపోతాయి, కొమ్మలు పైనుంచి కిందికి ఎండిపోయి దిగుబడి నాణ్యత తీవ్రంగా దెబ్బతింటుంది.',
        symptoms: [
          'పచ్చి మరియు పండు మిరప కాయలపై లోతుగా దిగబడిన గుండ్రని మచ్చలు',
          'మచ్చలపై నల్లటి లేదా గులాబీ రంగు వలయాల వంటి శిలీంధ్ర బీజాలు కనిపించడం',
          'కొమ్మల చివర్ల నుండి కిందికి ఎండిపోవడం (డైబ్యాక్ లక్షణం)',
          'ఆకులపై ముదురు గోధుమ రంగు చిన్న గుండ్రని మచ్చలు ఏర్పడటం',
          'కాయలు రాలిపోవడం మరియు ఎండిపోయి తెల్లగా మారడం'
        ],
        immediateActions: [
          'తెగులు సోకిన కాయలు, ఎండిన కొమ్మలను తుంచి పొలం బయట వేసి పూడ్చండి.',
          'ఆకులపై మంచు తేమ ఉన్నప్పుడు కాయలు కోయడం మానుకోండి.',
          'సాయంత్రం వేళల్లో సేంద్రీయ లేదా రసాయన శిలీంధ్రనాశిని పిచికారీ చేయండి.',
          'నీరు కాయలపై చిందకుండా జాగ్రత్తగా పారించండి.'
        ],
        culturalPractices: [
          'మొక్కల మధ్య తగినంత దూరం ఉంచి గాలి వెలుతురు ధారాళంగా తగిలేలా చేయండి.',
          'కాయ తొక్క గట్టిపడేందుకు పొటాష్, కాల్షియం ఎరువులు సమతుల్యంగా వేయండి.',
          'పంట పూర్తయిన తర్వాత మోడులను పూర్తిగా తీసి కాల్చండి.'
        ],
        organicControl: [
          'వేప నూనె (10,000 ppm) లీటరు నీటికి 5 మి.లీ కలిపి నివారణగా వాడండి.',
          'ట్రైకోడెర్మా విరిడే లీటరు నీటికి 5 గ్రాముల చొప్పున సాయంత్రం వేళల్లో పిచికారీ చేయండి.',
          'సూడోమోనాస్ ఫ్లోరోసెన్స్ పూత దశలో పిచికారీ చేయడం వల్ల మంచి ఫలితం ఉంటుంది.'
        ],
        chemicalControl: [
          'అజోక్సిస్ట్రోబిన్ 23% SC లీటరు నీటికి 1.0 మి.లీ (ఎకరాకు 200 లీటర్ల నీటిలో 200 మి.లీ).',
          'డైఫెనోకొనజోల్ 25% EC లీటరుకు 0.5 మి.లీ మార్చి పిచికారీ చేయవచ్చు.'
        ],
        prevention: [
          'థైరమ్ లేదా కాప్టాన్ తో విత్తన శుద్ధి (కిలో విత్తనానికి 3 గ్రాములు) చేయండి.',
          'తెగులును తట్టుకునే నిటారు కాయలు గల మిరప రకాలను ఎంచుకోండి.',
          'పప్పుదినుసులు, చిరుధాన్యాలతో 2 ఏళ్లు పంట మార్పిడి చేయండి.'
        ],
        severityExplanation: {
          low: 'తక్కువ తీవ్రత (<15%). ఆకులు, కొమ్మలపై చిన్న మచ్చలు. వేప నూనె, ట్రైకోడెర్మా సరిపోతాయి.',
          medium: 'మధ్యస్థ తీవ్రత (15%–40%). కాయలపై మచ్చలు వస్తున్నాయి. అజోక్సిస్ట్రోబిన్ స్ప్రే అవసరం.',
          high: 'అధిక తీవ్రత (>40%). కాయలు కుళ్ళిపోతున్నాయి, కొమ్మలు ఎండుతున్నాయి. తక్షణ చికిత్స అవసరం.',
          critical: 'తీవ్రమైన ప్రమాదం (>60%). తోటలో కాయలన్నీ కుళ్ళి రాలిపోయే ప్రమాదం ఉంది.'
        },
        pesticide: {
          productName: 'అమిస్టార్ (Azoxystrobin 23% SC)',
          activeIngredient: 'Azoxystrobin 23% SC',
          formulation: 'సస్పెన్షన్ కాన్సంట్రేట్ (SC)',
          purpose: 'మిరప కాయకుళ్లు మరియు బూడిద తెగులును నివారించే ఆధునిక సిస్టమిక్ శిలీంధ్రనాశిని.',
          recommendedConcentration: 'లీటరు నీటికి 1.0 మి.లీ',
          concentrationGramsPerLitre: 1.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 200,
          unit: 'ml',
          applicationMethod: 'పూత, పిందెలు మరియు కాయలు పూర్తిగా తడిచేలా సన్నని నాజిల్‌తో పిచికారీ చేయాలి.',
          applicationFrequency: 'వాతావరణంలో తేమ ఎక్కువగా ఉంటే 10 నుండి 14 రోజుల తర్వాత మరోసారి చేయండి.',
          preHarvestIntervalDays: 3,
          safetyPrecautions: [
            'మందు కొలిచేటప్పుడు మరియు కలిపేటప్పుడు మాస్క్, గ్లౌజులు వాడాలి.',
            'తేనెటీగలకు హాని కలగకుండా సాయంత్రం వేళల్లోనే పిచికారీ చేయాలి.',
            'మందు చల్లిన తర్వాత 3 రోజుల వరకు పచ్చిమిర్చి కోయరాదు.',
            'ఖాళీ డబ్బాలను పశువులు, తాగునీటికి దూరంగా ఉంచాలి.'
          ],
          source: 'ICAR - భారతీయ వ్యవసాయ పరిశోధనా సంస్థ (IARI)',
          dateVerified: '2026',
          defaultPricePerUnit: 780
        }
      },
      hi: {
        cropName: 'मिर्च (Capsicum annuum)',
        scientificCropName: 'Capsicum annuum',
        diseaseName: 'मिर्च का फल सड़न एवं डाइबैक रोग (Anthracnose)',
        scientificDiseaseName: 'Colletotrichum capsici',
        whatIsHappening: 'मिर्च का एंथ्रेक्नोज या फल सड़न रोग कोलेटोट्राइकम नामक फफूंद के कारण होता है। अधिक हवा की नमी और गर्म तापमान में यह कवक टहनियों और मिर्च के फलों पर हमला करता है। फलों पर गोल धब्बे पड़कर फल सड़ जाते हैं और टहनियां ऊपर से नीचे की ओर सूखने लगती हैं, जिससे उपज बुरी तरह प्रभावित होती है।',
        symptoms: [
          'हरी और पकी मिर्चों पर अंदर की ओर धंसे हुए गोल धब्बे',
          'धब्बों पर काले या हल्के गुलाबी रंग के छल्लेदार फफूंद के निशान',
          'टहनियों का ऊपरी सिरे से नीचे की ओर सूखना (डाइबैक)',
          'पत्तियों पर गहरे भूरे रंग के छोटे गोल धब्बे दिखना',
          'फलों का समय से पहले गिरना और सूखकर सफेद पड़ जाना'
        ],
        immediateActions: [
          'रोगी फलों और सूखी टहनियों को तोड़कर खेत से दूर गड्ढे में दबाएं।',
          'ओस से भीगी पत्तियों पर मिर्च की तुड़ाई न करें।',
          'शाम के समय जैविक या कवकनाशी दवा का छिड़काव करें।',
          'सिंचाई का पानी फलों पर न उछले इसका ध्यान रखें।'
        ],
        culturalPractices: [
          'पौधों के बीच पर्याप्त दूरी रखें ताकि हवा और धूप अच्छी तरह लगे।',
          'फलों की त्वचा को मजबूत बनाने के लिए पोटाश और कैल्शियम खाद डालें।',
          'फसल समाप्त होने पर सारे अवशेषों को नष्ट कर दें।'
        ],
        organicControl: [
          'नीम का तेल (10,000 ppm) 5 मिली प्रति लीटर पानी में मिलाकर रोकथाम करें।',
          'ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर शाम को छिड़कें।',
          'स्यूडोमोनास फ्लोरोसेंस का फूल आने के समय छिड़काव करें।'
        ],
        chemicalControl: [
          'एज़ोक्सीस्ट्रोबिन 23% SC 1.0 मिली प्रति लीटर पानी (प्रति एकड़ 200 लीटर पानी में 200 मिली)।',
          'डिफेनोकोनाज़ोल 25% EC 0.5 मिली/लीटर को बदलकर छिड़कें।'
        ],
        prevention: [
          'थिरम या कैप्टन (3 ग्राम प्रति किलो बीज) से बीज उपचार करें।',
          'रोगरोधी मिर्च की संकर किस्मों का चयन करें।',
          'दलहन या मोटे अनाजों के साथ 2 साल का फसल चक्र अपनाएं।'
        ],
        severityExplanation: {
          low: 'कम गंभीरता (<15%)। पत्तियों पर छोटे धब्बे। नीम तेल और ट्राइकोडर्मा पर्याप्त हैं।',
          medium: 'मध्यम गंभीरता (15%–40%)। फलों पर धब्बे पड़ रहे हैं। एज़ोक्सीस्ट्रोबिन का छिड़काव जरूरी है।',
          high: 'उच्च गंभीरता (>40%)। फल सड़ रहे हैं और टहनियां सूख रही हैं। तत्काल कवकनाशी डालें।',
          critical: 'अत्यधिक गंभीर (>60%)। खेत में फल सड़कर गिर रहे हैं, बड़ा नुकसान हो सकता है।'
        },
        pesticide: {
          productName: 'एमिस्टार (Azoxystrobin 23% SC)',
          activeIngredient: 'Azoxystrobin 23% SC',
          formulation: 'निलंबन सांद्रण (SC)',
          purpose: 'मिर्च के फल सड़न और चूर्णिल फफूंद को रोकने वाला आधुनिक अंतःप्रवाही कवकनाशी।',
          recommendedConcentration: '1.0 मिली प्रति लीटर पानी',
          concentrationGramsPerLitre: 1.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 200,
          unit: 'ml',
          applicationMethod: 'फूलों, टहनियों और मिर्च के फलों पर बारीक फुहार से छिड़काव करें।',
          applicationFrequency: 'नमी और बारिश रहने पर 10 से 14 दिनों बाद दोबारा छिड़काव करें।',
          preHarvestIntervalDays: 3,
          safetyPrecautions: [
            'दवा नापते और घोलते समय मास्क और दस्ताने जरूर पहनें।',
            'मधुमक्खियों की सुरक्षा हेतु शाम के समय ही छिड़काव करें।',
            'दवा छिड़कने के बाद 3 दिनों तक मिर्च की तुड़ाई न करें।',
            'खाली बोतलों को पानी और मवेशियों से दूर रखें।'
          ],
          source: 'ICAR - भारतीय कृषि अनुसंधान संस्थान (IARI)',
          dateVerified: '2026',
          defaultPricePerUnit: 780
        }
      },
      ta: {
        cropName: 'மிளகாய் (Capsicum annuum)',
        scientificCropName: 'Capsicum annuum',
        diseaseName: 'மிளகாய் காய் அழுகல் மற்றும் நுனிக்கருகல் நோய் (Anthracnose)',
        scientificDiseaseName: 'Colletotrichum capsici',
        whatIsHappening: 'மிளகாயில் ஆந்த்ராக்னோஸ் அல்லது காய் அழுகல் நோய் கொலட்டோட்ரைக்கம் என்ற பூஞ்சையால் ஏற்படுகிறது. அதிக காற்று ஈரப்பதம் மற்றும் வெப்பமான சூழலில் இந்த பூஞ்சை கிளைகள் மற்றும் மிளகாய் காய்களை தாக்குகிறது. காய்களில் வட்ட வடிவ புள்ளிகள் தோன்றி அழுகி, நுனிக்கிளைகள் காய்ந்து போவதால் மகசூல் பெருமளவில் பாழாகிறது.',
        symptoms: [
          'பச்சை மற்றும் பழுத்த மிளகாய் காய்களில் குழிந்த வட்ட வடிவ புள்ளிகள் தோன்றுதல்',
          'புள்ளிகளின் மேல் கருப்பு அல்லது இளஞ்சிவப்பு நிற வளையங்கள் தெரிதல்',
          'இளங்கிளைகள் நுனியில் இருந்து கீழ்நோக்கி காய்ந்து போதல் (டைபேக் நிலை)',
          'இலைகளில் அடர் பழுப்பு நிற சிறிய வட்டப் புள்ளிகள் ஏற்படுதல்',
          'காய்கள் உதிர்ந்து சருகாக மாறி வெளிறிப் போதல்'
        ],
        immediateActions: [
          'தாக்கப்பட்ட காய்கள் மற்றும் காய்ந்த கிளைகளை பறித்து வயலுக்கு வெளியே குழிதோண்டி புதைக்கவும்.',
          'பனி ஈரப்பதம் இருக்கும் போது மிளகாய் பறிப்பதை தவிர்க்கவும்.',
          'மாலை வேளையில் இயற்கை அல்லது பூஞ்சைக்கொல்லி மருந்து தெளிக்கவும்.',
          'பாசன நீர் காய்களின் மீது தெறிக்காதவாறு பாய்ச்சவும்.'
        ],
        culturalPractices: [
          'செடிகளுக்கு இடையே போதிய இடைவெளி விட்டு நல்ல காற்றோட்டம் கிடைக்கச் செய்யவும்.',
          'காய்களின் தோல் கடினத்தன்மை பெற பொட்டாஷ், கால்சியம் உரங்களை இடவும்.',
          'பயிர் முடிந்ததும் செடிகளை முழுமையாக அகற்றி அழிக்கவும்.'
        ],
        organicControl: [
          'வேப்பெண்ணெய் (10,000 ppm) லிட்டருக்கு 5 மி.லி கலந்து தெளிக்கவும்.',
          'டிரைக்கோடெர்மா விரிடி லிட்டருக்கு 5 கிராம் கலந்து மாலையில் தெளிக்கவும்.',
          'சூடோமோனாஸ் பூக்கும் பருவத்தில் தெளிப்பது நன்மை தரும்.'
        ],
        chemicalControl: [
          'அஸோக்ஸிஸ்ட்ரோபின் 23% SC லிட்டருக்கு 1.0 மி.லி (ஏக்கருக்கு 200 லிட்டர் நீரில் 200 மி.லி).',
          'டைபனோகோனசோல் 25% EC லிட்டருக்கு 0.5 மி.லி மாற்றி தெளிக்கலாம்.'
        ],
        prevention: [
          'திராம் அல்லது கேப்டான் (கிலோவுக்கு 3 கிராம்) கொண்டு விதை நேர்த்தி செய்யவும்.',
          'நோய் எதிர்ப்பு திறன் கொண்ட வீரிய ஒட்டு மிளகாய் ரகங்களை பயிரிடவும்.',
          'பயறு வகைகளுடன் 2 ஆண்டு பயிர் சுழற்சி செய்யவும்.'
        ],
        severityExplanation: {
          low: 'குறைந்த தீவிரம் (<15%). இலைகளில் சிறிய புள்ளிகள். வேப்பெண்ணெய், டிரைக்கோடெர்மா போதுமானது.',
          medium: 'மிதமான தீவிரம் (15%–40%). காய்களில் புள்ளிகள் ஏற்படுகின்றன. அஸோக்ஸிஸ்ட்ரோபின் தெளிக்கவும்.',
          high: 'அதிக தீவிரம் (>40%). காய்கள் அழுகுகின்றன, கிளைகள் காய்கின்றன. உடனடி சிகிச்சை தேவை.',
          critical: 'மிக தீவிர பாதிப்பு (>60%). காய்கள் அனைத்தும் அழுகி உதிரும் பேராபத்து.'
        },
        pesticide: {
          productName: 'அமிஸ்டார் (Azoxystrobin 23% SC)',
          activeIngredient: 'Azoxystrobin 23% SC',
          formulation: 'நீர்ம செறிவு (SC)',
          purpose: 'மிளகாய் காய் அழுகல் மற்றும் சாம்பல் நோயை கட்டுப்படுத்தும் நவீன ஊடுருவும் பூஞ்சைக்கொல்லி.',
          recommendedConcentration: 'லிட்டருக்கு 1.0 மி.லி',
          concentrationGramsPerLitre: 1.0,
          waterRequirementPerAcre: 200,
          quantityPerAcre: 200,
          unit: 'ml',
          applicationMethod: 'பூக்கள், பிஞ்சுகள் மற்றும் காய்கள் மீது பனித்துளி போல படியுமாறு தெளிக்கவும்.',
          applicationFrequency: 'ஈரப்பதம் நீடித்தால் 10 முதல் 14 நாட்களுக்கு பின் மீண்டும் தெளிக்கவும்.',
          preHarvestIntervalDays: 3,
          safetyPrecautions: [
            'மருந்து எடுக்கும் போதும் கலக்கும் போதும் முகக்கவசம் மற்றும் கையுறைகள் அணியவும்.',
            'தேன் ஈக்களுக்கு பாதிப்பு ஏற்படாமல் இருக்க மாலை வேளையில் மட்டுமே தெளிக்கவும்.',
            'மருந்து தெளித்த பின் 3 நாட்களுக்கு மிளகாய் பறிக்கக்கூடாது.',
            'காலி குப்பிகளை நீர்நிலைகள் மற்றும் கால்நடைகளுக்கு எட்டாதவாறு அப்புறப்படுத்தவும்.'
          ],
          source: 'ICAR - இந்திய வேளாண் ஆராய்ச்சி நிறுவனம் (IARI)',
          dateVerified: '2026',
          defaultPricePerUnit: 780
        }
      }
    }
  }
};

/**
 * Normalizes language codes ('english' -> 'en', 'telugu' -> 'te', etc.)
 */
export function normalizeLanguageCode(lang: string | undefined): LanguageCode {
  if (!lang) return 'en';
  const lower = lang.toLowerCase().trim();
  if (lower === 'te' || lower === 'telugu') return 'te';
  if (lower === 'hi' || lower === 'hindi') return 'hi';
  if (lower === 'ta' || lower === 'tamil') return 'ta';
  return 'en';
}

/**
 * Finds the closest verified disease record by searching keywords in crop & disease strings
 */
export function findVerifiedDiseaseRecord(cropName?: string, diseaseName?: string): DiseaseRecord {
  const text = `${cropName || ''} ${diseaseName || ''}`.toLowerCase();

  if (text.includes('septoria') || (text.includes('tomato') && text.includes('spot'))) {
    return VERIFIED_DISEASE_DATABASE['tomato_septoria_leaf_spot'];
  }
  if (text.includes('tomato') || text.includes('solanum') || text.includes('మాడు') || text.includes('టమోటా') || text.includes('blight')) {
    return VERIFIED_DISEASE_DATABASE['tomato_late_blight'];
  }
  if (text.includes('cotton') || text.includes('whitefly') || text.includes('పత్తి') || text.includes('பருத்தி') || text.includes('कपास')) {
    return VERIFIED_DISEASE_DATABASE['cotton_leaf_curl'];
  }
  if (text.includes('rice') || text.includes('paddy') || text.includes('వరి') || text.includes('நெல்') || text.includes('धान')) {
    return VERIFIED_DISEASE_DATABASE['rice_bacterial_blight'];
  }
  if (text.includes('chilli') || text.includes('chili') || text.includes('pepper') || text.includes('మిరప') || text.includes('மிளகாய்') || text.includes('मिर्च')) {
    return VERIFIED_DISEASE_DATABASE['chilli_anthracnose'];
  }

  // Default to tomato septoria leaf spot if unknown
  return VERIFIED_DISEASE_DATABASE['tomato_septoria_leaf_spot'];
}
