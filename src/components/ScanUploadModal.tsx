import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Camera,
  UploadCloud,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { SupportedLanguage } from '../types/agrishield';
import { TRANSLATIONS, getTranslations } from '../data/translations';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';

interface ScanUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (imageData: { base64: string; mimeType: string; cropHint?: string; farmAcres?: number }) => Promise<void>;
  currentLanguage: SupportedLanguage;
  initialMode?: 'camera' | 'browse';
  defaultFarmSize?: number;
}

const FARM_SIZE_TEXT = {
  en: {
    question: "How many acres is your farm?",
    subtitle: "The app will calculate exact medicine, water, spray tanks, and cost for your field.",
    placeholder: "Enter farm size (e.g. 1.5)",
    acreUnit: "Acres",
    validationError: "Please enter a valid farm size greater than 0 (e.g. 0.5, 1, 2 acres).",
    step1Done: "Leaf photo ready",
    step2Active: "Enter your farm size",
  },
  te: {
    question: "మీ పొలం ఎంత ఎకరాలు?",
    subtitle: "మీ పొలానికి కావలసిన మందు, నీరు, స్ప్రే ట్యాంకులు మరియు ఖర్చును యాప్ స్వయంగా లెక్కిస్తుంది.",
    placeholder: "పొలం విస్తీర్ణం నమోదు చేయండి (ఉదా: 1.5)",
    acreUnit: "ఎకరాలు",
    validationError: "దయచేసి 0 కంటే ఎక్కువ ఎకరాల విస్తీర్ణం నమోదు చేయండి (ఉదా: 0.5, 1, 2 ఎకరాలు).",
    step1Done: "ఆకు ఫోటో సిద్ధంగా ఉంది",
    step2Active: "మీ పొలం విస్తీర్ణం నమోదు చేయండి",
  },
  hi: {
    question: "आपके खेत में कितने एकड़ जमीन है?",
    subtitle: "ऐप आपके खेत के लिए आवश्यक दवा, पानी, स्प्रे टैंक और लागत की सटीक गणना करेगा।",
    placeholder: "खेत का आकार दर्ज करें (उदा: 1.5)",
    acreUnit: "एकड़",
    validationError: "कृपया 0 से अधिक खेत का आकार दर्ज करें (उदा: 0.5, 1, 2 एकड़)।",
    step1Done: "पत्ती का फोटो तैयार है",
    step2Active: "अपने खेत का आकार दर्ज करें",
  },
  ta: {
    question: "உங்கள் வயல் எத்தனை ஏக்கர்?",
    subtitle: "உங்கள் வயலுக்கு தேவையான மருந்து, தண்ணீர், தெளிப்பான் தொட்டிகள் மற்றும் செலவை ஆப் துல்லியமாக கணக்கிடும்.",
    placeholder: "பண்ணை பரப்பளவை உள்ளிடவும் (எ.கா: 1.5)",
    acreUnit: "ஏக்கர்",
    validationError: "தயவுசெய்து 0-ஐ விட அதிகமான பரப்பளவை உள்ளிடவும் (எ.கா: 0.5, 1, 2 ஏக்கர்).",
    step1Done: "இலை படம் தயாராக உள்ளது",
    step2Active: "உங்கள் பண்ணை பரப்பளவை உள்ளிடவும்",
  },
};

export const ScanUploadModal: React.FC<ScanUploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  currentLanguage,
  initialMode = 'browse',
  defaultFarmSize = 2.0,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [cropHint, setCropHint] = useState('');
  const [farmAcresInput, setFarmAcresInput] = useState<string>(defaultFarmSize.toString());
  const [farmAcresError, setFarmAcresError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const t = getTranslations(langCode);
  const farmUi = FARM_SIZE_TEXT[langCode] || FARM_SIZE_TEXT.en;

  useEffect(() => {
    if (isOpen) {
      setFarmAcresInput(defaultFarmSize > 0 ? defaultFarmSize.toString() : '2');
      setFarmAcresError(null);
      if (initialMode === 'camera') {
        startCamera();
      } else {
        stopCamera();
      }
    } else {
      stopCamera();
      setSelectedImage(null);
      setValidationWarning(null);
      setFarmAcresError(null);
      setIsAnalyzing(false);
    }
  }, [isOpen, initialMode, defaultFarmSize]);

  // Rotate analysis staged status text
  useEffect(() => {
    let timer: any;
    if (isAnalyzing) {
      timer = setInterval(() => {
        setAnalysisStepIndex((prev) => (prev + 1) % t.scan.analyzingSteps.length);
      }, 1200);
    } else {
      setAnalysisStepIndex(0);
    }
    return () => clearInterval(timer);
  }, [isAnalyzing, t.scan.analyzingSteps.length]);

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError('Camera permission not available or camera in use. Please select a photo from gallery.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setMimeType('image/jpeg');
      stopCamera();
      validateImageQuality(ctx, canvas.width, canvas.height);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t.scan.invalidFormat);
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert('File size too large. Please select an image under 20MB.');
      return;
    }

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
      stopCamera();

      // Quick brightness heuristic check
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(img.width, 200);
        canvas.height = Math.min(img.height, 200);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          validateImageQuality(ctx, canvas.width, canvas.height);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const validateImageQuality = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 16) {
        totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const avgBrightness = totalBrightness / (data.length / 16);

      if (avgBrightness < 35) {
        setValidationWarning(t.scan.imageTooDark);
      } else {
        setValidationWarning(null);
      }
    } catch {
      setValidationWarning(null);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage || isAnalyzing) return;

    const acres = parseFloat(farmAcresInput);
    if (isNaN(acres) || acres <= 0) {
      setFarmAcresError(farmUi.validationError);
      return;
    }
    setFarmAcresError(null);

    setIsAnalyzing(true);
    try {
      await onAnalyze({
        base64: selectedImage,
        mimeType,
        cropHint: cropHint.trim() || undefined,
        farmAcres: acres,
      });
      onClose();
    } catch (e) {
      console.error('Analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {t.scan.title}
              </h3>
              <p className="text-xs text-stone-400">
                Capture infected crop leaf for AI disease diagnosis
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {cameraError && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}

          {validationWarning && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{validationWarning}</span>
            </div>
          )}

          {/* ACTIVE CAMERA VIEW */}
          {isCameraActive && (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-80 mx-auto flex items-center justify-center border-2 border-emerald-500/50">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center">
                  <span className="text-[10px] text-emerald-300 bg-stone-950/80 px-2 py-0.5 rounded font-mono">
                    Align Leaf Center
                  </span>
                </div>
              </div>
              <div className="absolute bottom-3 inset-x-0 flex justify-center">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow-lg flex items-center gap-2 transition"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.scan.capture}</span>
                </button>
              </div>
            </div>
          )}

          {/* PREVIEW VIEW WITH RETAKE / CHOOSE ANOTHER / FARM SIZE / ANALYZE LEAF */}
          {!isCameraActive && selectedImage && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-black border border-stone-800 aspect-video max-h-64 mx-auto flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected Leaf Specimen"
                  className="w-full h-full object-contain"
                />

                {/* Staged Processing Screen */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin mb-1" />
                    <span className="text-base font-extrabold text-white">
                      {t.scan.analyzingSteps[analysisStepIndex]}
                    </span>
                    <p className="text-xs text-stone-400 font-mono">
                      Running multi-spectral leaf anomaly detection
                    </p>
                  </div>
                )}
              </div>

              {/* Photo Retake / Choose Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={startCamera}
                  disabled={isAnalyzing}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  <span>{t.scan.retake}</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-stone-400" />
                  <span>{t.scan.chooseAnother}</span>
                </button>
              </div>

              {/* MANDATORY STEP 2: FARM SIZE QUESTION */}
              <div className={`p-4 rounded-2xl border transition ${
                farmAcresError ? 'bg-rose-950/40 border-rose-600' : 'bg-emerald-950/30 border-emerald-500/40'
              } space-y-3`}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 text-xs font-black flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span>{farmUi.question}</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {farmUi.step2Active}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 mt-1 pl-8">
                    {farmUi.subtitle}
                  </p>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 pl-0 sm:pl-8">
                  {[0.5, 1, 2, 5, 10].map((preset) => {
                    const isSelected = parseFloat(farmAcresInput) === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setFarmAcresInput(preset.toString());
                          setFarmAcresError(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isSelected
                            ? 'bg-emerald-500 text-stone-950 shadow-md font-black ring-2 ring-emerald-400'
                            : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-750 border border-stone-700'
                        }`}
                      >
                        {preset} {farmUi.acreUnit}
                      </button>
                    );
                  })}
                </div>

                {/* Decimal numeric input allowing 0.25, 0.5, 1.5, 2.75 etc. */}
                <div className="pl-0 sm:pl-8">
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0.01"
                      placeholder={farmUi.placeholder}
                      value={farmAcresInput}
                      onChange={(e) => {
                        setFarmAcresInput(e.target.value);
                        if (farmAcresError) setFarmAcresError(null);
                      }}
                      className={`w-full px-4 py-2.5 text-base font-bold bg-stone-950 border ${
                        farmAcresError ? 'border-rose-500 focus:border-rose-400' : 'border-emerald-500/60 focus:border-emerald-400'
                      } rounded-xl text-white font-mono placeholder:text-stone-600 focus:outline-none`}
                    />
                    <span className="absolute right-4 top-3 text-xs font-bold text-stone-400 uppercase">
                      {farmUi.acreUnit}
                    </span>
                  </div>

                  {farmAcresError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{farmAcresError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Big Action Button: Analyze Leaf & Calculate */}
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950 transition transform active:scale-98"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                <span>{t.scan.analyzeLeaf}</span>
              </button>
            </div>
          )}

          {/* EMPTY UPLOAD DROPZONE */}
          {!isCameraActive && !selectedImage && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-800 hover:border-emerald-500/60 bg-stone-950/60 p-8 rounded-2xl text-center cursor-pointer transition group"
            >
              <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 mx-auto mb-3 group-hover:scale-105 transition">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-white">
                {t.scan.dropzoneText}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                {t.scan.dropzoneSub}
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startCamera();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-2 shadow"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Camera</span>
                </button>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />

          {/* Crop Hint input (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1">
              Field Notes / Crop Name (Optional)
            </label>
            <input
              type="text"
              value={cropHint}
              onChange={(e) => setCropHint(e.target.value)}
              placeholder="e.g. Tomato under drip, Chilli pod spots, Cotton field after rain..."
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-500 font-sans"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
