import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  MessageSquare,
  Bot,
  User,
  Trash2,
  Plus,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Leaf,
  Clock,
  ChevronLeft,
  Search,
  AlertTriangle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { ChatMessage, ChatSession } from '../types/chat';
import { FarmerUser } from '../types/auth';
import { SupportedLanguage, LANGUAGE_OPTIONS, AgriShieldReport } from '../types/agrishield';
import { getTranslations } from '../data/translations';
import { normalizeLanguageCode, LanguageCode } from '../data/verifiedTreatments';
import { localizeReport } from '../utils/localizeReport';

interface FarmerAiChatViewProps {
  currentUser: FarmerUser | null;
  currentLanguage: SupportedLanguage;
  activeScanReport?: AgriShieldReport | null;
  onBackToDashboard: () => void;
}

const CHAT_UI = {
  en: {
    returnDashboard: 'Return to Dashboard',
    searchPlaceholder: 'Search previous chats...',
    emptyTitle: 'Ask Your Agricultural Question',
    emptySubtitle:
      'Ask about pest remedies, fertilizer mixing, tank calibration, or weather precautions in your native language.',
    waitingDoctor: 'Kisan Mitra is preparing verified agricultural advice...',
    stopVoice: 'Stop',
    contextPrefix: 'Context:',
    dictationError: 'Voice dictation is not supported in this browser. Please type your question.',
    newChatTitle: 'General Farm Consultation',
  },
  te: {
    returnDashboard: 'రైతు డ్యాష్‌బోర్డ్‌కి తిరిగి వెళ్ళండి',
    searchPlaceholder: 'గత సంభాషణలను శోధించండి...',
    emptyTitle: 'మీ వ్యవసాయ ప్రశ్నను అడగండి',
    emptySubtitle: 'పంట తెగుళ్ళు, మందుల మోతాదు, ట్యాంక్ కలపడం లేదా వాతావరణ జాగ్రత్తల గురించి అడగండి.',
    waitingDoctor: 'కిసాన్ మిత్ర ధృవీకరించిన వ్యవసాయ సలహాను సిద్ధం చేస్తోంది...',
    stopVoice: 'ఆపు',
    contextPrefix: 'పంట వివరాలు:',
    dictationError: 'ఈ బ్రౌజర్‌లో వాయిస్ టైపింగ్ అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.',
    newChatTitle: 'సాధారణ పంట సంరక్షణ సంభాషణ',
  },
  hi: {
    returnDashboard: 'किसान डैशबोर्ड पर वापस जाएं',
    searchPlaceholder: 'पिछली बातचीत खोजें...',
    emptyTitle: 'अपना कृषि प्रश्न पूछें',
    emptySubtitle:
      'फसल रोग, दवा की खुराक, टैंक में मिश्रण या मौसम संबंधी सावधानियों के बारे में पूछें।',
    waitingDoctor: 'किसान मित्र सत्यापित कृषि सलाह तैयार कर रहा है...',
    stopVoice: 'रोकें',
    contextPrefix: 'फसल संदर्भ:',
    dictationError: 'इस ब्राउज़र में वॉयस टाइपिंग समर्थित नहीं है। कृपया लिखकर पूछें।',
    newChatTitle: 'सामान्य फसल स्वास्थ्य परामर्श',
  },
  ta: {
    returnDashboard: 'விவசாயி டாஷ்போர்டுக்கு திரும்புக',
    searchPlaceholder: 'முந்தைய உரையாடல்களைத் தேடுங்கள்...',
    emptyTitle: 'உங்கள் விவசாயக் கேள்வியைக் கேளுங்கள்',
    emptySubtitle:
      'பயிர் நோய்கள், மருந்து அளவு, தெளிப்பான் தொட்டி கலவை அல்லது பாதுகாப்பு பற்றி கேளுங்கள்.',
    waitingDoctor: 'கிசான் மித்ரா சரிபார்க்கப்பட்ட வேளாண் ஆலோசனையைத் தயார் செய்கிறது...',
    stopVoice: 'நிறுத்து',
    contextPrefix: 'பயிர் விவரம்:',
    dictationError: 'இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.',
    newChatTitle: 'பொதுவான பயிர் ஆலோசனை',
  },
};

export const FarmerAiChatView: React.FC<FarmerAiChatViewProps> = ({
  currentUser,
  currentLanguage,
  activeScanReport,
  onBackToDashboard,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [showHistorySidebar, setShowHistorySidebar] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const langCode: LanguageCode = normalizeLanguageCode(currentLanguage);
  const t = getTranslations(langCode);
  const chatUi = CHAT_UI[langCode];

  // Localize active scan report according to target language
  const localizedScan = activeScanReport ? localizeReport(activeScanReport, langCode) : null;

  const currentLangMeta =
    LANGUAGE_OPTIONS.find((l) => l.code === langCode || l.key === currentLanguage) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    loadSessions();
    setupVoiceRecognition();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentUser]);

  const loadSessions = async () => {
    try {
      const userId = currentUser?.id || 'farmer-demo-001';
      const res = await fetch(`/api/farmer-chat/sessions?userId=${userId}`);
      if (res.ok) {
        const data: ChatSession[] = await res.json();
        setSessions(data);
        if (data.length > 0 && !activeSessionId) {
          setActiveSessionId(data[0].id);
        } else if (data.length === 0) {
          handleStartNewSession();
        }
      } else {
        handleStartNewSession();
      }
    } catch (e) {
      console.error('Failed loading chat sessions:', e);
      handleStartNewSession();
    }
  };

  const setupVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLangMeta.speechCode;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListeningVoice(false);
      };

      recognition.onerror = () => {
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognitionRef.current = recognition;
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(chatUi.dictationError);
      return;
    }

    if (isListeningVoice) {
      recognitionRef.current.stop();
      setIsListeningVoice(false);
    } else {
      recognitionRef.current.lang = currentLangMeta.speechCode;
      recognitionRef.current.start();
      setIsListeningVoice(true);
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isSending]);

  const handleStartNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      userId: currentUser?.id || 'farmer-demo-001',
      title: localizedScan ? `${localizedScan.cropName} - ${localizedScan.diseaseName}` : chatUi.newChatTitle,
      cropTag: localizedScan?.cropName || 'General',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [
        {
          id: `welcome-${Date.now()}`,
          sender: 'assistant',
          text:
            langCode === 'te'
              ? `నమస్కారం ${currentUser?.name || 'రైతు'} గారు! నేను మీ కిసాన్ మిత్ర AI ని. మీ పంట తెగుళ్ళు, పిచికారీ మోతాదు, ఎరువుల నిర్వహణ గురించి ఏ ప్రశ్నైనా అడగండి.`
              : langCode === 'ta'
              ? `வணக்கம் ${currentUser?.name || 'விவசாயி'} அவர்களே! நான் உங்கள் கிசான் மித்ரா AI பயிர் மருத்துவர். பயிர் நோய்கள், பூச்சி மருந்து அளவு அல்லது இயற்கை முறை பற்றி கேளுங்கள்.`
              : langCode === 'hi'
              ? `नमस्ते ${currentUser?.name || 'किसान'} भाई! मैं आपका किसान मित्र AI फसल सहायक हूँ। फसल के रोग, दवा की खुराक या छिड़काव संबंधी कोई भी सवाल पूछें।`
              : `Hello ${currentUser?.name || 'Farmer'}! I am Kisan Mitra, your Farmer AI Agronomist. Ask me anything about crop diseases, dosage metrics, tank mixing, or organic solutions.`,
          timestamp: Date.now(),
          language: langCode,
        },
      ],
    };

    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSessionId);
    saveSessionToServer(newSession);
  };

  const saveSessionToServer = async (session: ChatSession) => {
    try {
      await fetch('/api/farmer-chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      });
    } catch (e) {
      console.error('Failed saving session:', e);
    }
  };

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/farmer-chat/sessions/${sessionId}`, { method: 'DELETE' });
      const filtered = sessions.filter((s) => s.id !== sessionId);
      setSessions(filtered);
      if (activeSessionId === sessionId) {
        if (filtered.length > 0) {
          setActiveSessionId(filtered[0].id);
        } else {
          handleStartNewSession();
        }
      }
    } catch (e) {
      console.error('Failed deleting session:', e);
    }
  };

  const handleSendMessage = async (customText?: string, attachScan: boolean = false) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isSending) return;

    setInputMessage('');
    setIsSending(true);

    const farmerMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'farmer',
      text: textToSend,
      timestamp: Date.now(),
      language: langCode,
      attachedScan:
        attachScan && localizedScan
          ? {
              crop: localizedScan.cropName,
              disease: localizedScan.diseaseName,
              severityPercentage: localizedScan.severity === 'High' ? 45 : localizedScan.severity === 'Low' ? 12 : 28,
              stage: localizedScan.severityDisplay,
            }
          : undefined,
    };

    let targetSession = activeSession;
    if (!targetSession) {
      targetSession = {
        id: `session-${Date.now()}`,
        userId: currentUser?.id || 'farmer-demo-001',
        title: textToSend.slice(0, 40),
        cropTag: localizedScan?.cropName || 'Crop Query',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [],
      };
      setSessions([targetSession, ...sessions]);
      setActiveSessionId(targetSession.id);
    }

    const updatedMessages = [...targetSession.messages, farmerMsg];
    targetSession.messages = updatedMessages;
    targetSession.updatedAt = Date.now();
    setSessions([...sessions]);

    try {
      const response = await fetch('/api/farmer-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: updatedMessages.slice(-6),
          language: langCode,
          userContext: currentUser
            ? {
                name: currentUser.name,
                state: currentUser.state,
                district: currentUser.district,
                primaryCrops: currentUser.primaryCrops || [currentUser.mainCrop],
              }
            : undefined,
          scanContext: localizedScan
            ? {
                crop: localizedScan.cropName,
                disease: localizedScan.diseaseName,
                severityPercentage: localizedScan.severity === 'High' ? 45 : localizedScan.severity === 'Low' ? 12 : 28,
                stage: localizedScan.severityDisplay,
                confidence: localizedScan.confidence,
              }
            : undefined,
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || (langCode === 'te' ? 'సలహా అందింది.' : langCode === 'hi' ? 'सलाह प्राप्त हुई।' : langCode === 'ta' ? 'ஆலோசனை பெறப்பட்டது.' : 'Advisory received.'),
        timestamp: Date.now(),
        language: langCode,
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      targetSession.messages = finalMessages;
      targetSession.updatedAt = Date.now();
      setSessions([...sessions]);
      saveSessionToServer(targetSession);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLangMeta.speechCode;
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) => v.lang === currentLangMeta.speechCode || v.lang.startsWith(currentLangMeta.speechCode.slice(0, 2))
    );
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onstart = () => setIsSpeakingId(msgId);
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Group sessions by Today, Yesterday, Older
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const todaySessions = sessions.filter((s) => now - s.updatedAt < oneDay);
  const yesterdaySessions = sessions.filter((s) => now - s.updatedAt >= oneDay && now - s.updatedAt < 2 * oneDay);
  const olderSessions = sessions.filter((s) => now - s.updatedAt >= 2 * oneDay);

  const getDiscussScanPrompt = () => {
    if (!localizedScan) return '';
    if (langCode === 'te') {
      return `నా ${localizedScan.cropName} పంటలో ${localizedScan.diseaseName} గుర్తించారు (${localizedScan.confidence}% ఖచ్చితత్వం). దీనికి తక్షణ చికిత్స, ఎకరాకు మందు మోతాదు మరియు రక్షణ చర్యల గురించి రైతుకు వివరించండి.`;
    }
    if (langCode === 'hi') {
      return `मेरी ${localizedScan.cropName} की फसल में ${localizedScan.diseaseName} पाया गया है (${localizedScan.confidence}% सटीकता)। इसके लिए तुरंत क्या उपाय करें और प्रति एकड़ कितनी दवा डालें?`;
    }
    if (langCode === 'ta') {
      return `எனது ${localizedScan.cropName} பயிரில் ${localizedScan.diseaseName} கண்டறியப்பட்டுள்ளது (${localizedScan.confidence}% துல்லியம்). இதற்கு உடனடி சிகிச்சை மற்றும் மருந்து தெளிக்கும் வழிமுறைகளை கூறவும்.`;
    }
    return `Please provide tailored practical advice for my ${localizedScan.cropName} diagnosed with ${localizedScan.diseaseName} (${localizedScan.confidence}% confidence). What immediate steps, dosage, and safety checks should I take?`;
  };

  return (
    <div className="max-w-6xl mx-auto h-[82vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex overflow-hidden">
      {/* LEFT SIDEBAR: CHAT HISTORY (TODAY, YESTERDAY, OLDER) */}
      <div
        className={`${
          showHistorySidebar ? 'flex' : 'hidden'
        } md:flex w-full md:w-72 lg:w-80 bg-stone-950 border-r border-stone-800 flex-col h-full shrink-0`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-200">
              {t.chat.chatHistory}
            </h3>
          </div>
          <button
            onClick={handleStartNewSession}
            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1 transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.chat.newChat}</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-stone-800/80">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={chatUi.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-xl text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Sessions Categorized List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
          {sessions.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs px-4">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>{t.chat.noChats}</p>
            </div>
          ) : (
            <>
              {todaySessions.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-2">
                    {t.chat.today}
                  </span>
                  <div className="mt-1 space-y-1">
                    {todaySessions.map((s) => renderSessionCard(s))}
                  </div>
                </div>
              )}

              {yesterdaySessions.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-2">
                    {t.chat.yesterday}
                  </span>
                  <div className="mt-1 space-y-1">
                    {yesterdaySessions.map((s) => renderSessionCard(s))}
                  </div>
                </div>
              )}

              {olderSessions.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-2">
                    {t.chat.older}
                  </span>
                  <div className="mt-1 space-y-1">
                    {olderSessions.map((s) => renderSessionCard(s))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Back to dashboard at bottom */}
        <div className="p-3 border-t border-stone-800 bg-stone-950">
          <button
            onClick={onBackToDashboard}
            className="w-full py-2 text-xs font-bold rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-white transition flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{chatUi.returnDashboard}</span>
          </button>
        </div>
      </div>

      {/* RIGHT MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full bg-stone-900">
        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistorySidebar(!showHistorySidebar)}
              className="md:hidden p-1.5 rounded-lg text-stone-400 hover:text-white bg-stone-900"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">
                  {t.chat.title}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-stone-400">
                {t.chat.subtitle} ({currentLangMeta.nativeName})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartNewSession}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 transition"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.chat.newChat}</span>
            </button>
          </div>
        </div>

        {/* SECTION 14: CONTEXT-AWARE CAPSULE */}
        {localizedScan && (
          <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-800/40 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 truncate">
              <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-stone-300 truncate">
                {t.chat.activeScanContext}{' '}
                <strong className="text-white">{localizedScan.cropName}</strong> •{' '}
                <span className="text-emerald-300">
                  {localizedScan.diseaseName} ({localizedScan.confidence}%)
                </span>
              </span>
            </div>
            <button
              onClick={() => handleSendMessage(getDiscussScanPrompt(), true)}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold hover:bg-emerald-600 hover:text-stone-950 transition shrink-0"
            >
              + {t.chat.discussScan}
            </button>
          </div>
        )}

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(!activeSession || activeSession.messages.length === 0) ? (
            <div className="py-16 text-center text-stone-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{chatUi.emptyTitle}</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                  {chatUi.emptySubtitle}
                </p>
              </div>
            </div>
          ) : (
            activeSession.messages.map((msg) => {
              const isFarmer = msg.sender === 'farmer';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isFarmer ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isFarmer
                        ? 'bg-emerald-600 text-stone-950'
                        : 'bg-stone-800 text-emerald-400 border border-stone-700'
                    }`}
                  >
                    {isFarmer ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isFarmer
                        ? 'bg-emerald-600 text-stone-950 rounded-tr-xs font-medium'
                        : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-xs shadow-md'
                    }`}
                  >
                    {msg.attachedScan && (
                      <div className="mb-2 p-2 rounded-lg bg-black/20 border border-black/30 text-[11px] font-mono">
                        🌱 <strong>{chatUi.contextPrefix}</strong> {msg.attachedScan.crop} - {msg.attachedScan.disease} ({msg.attachedScan.stage})
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    <div
                      className={`mt-2 flex items-center justify-between text-[10px] ${
                        isFarmer ? 'text-stone-900/70' : 'text-stone-500'
                      }`}
                    >
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      {!isFarmer && (
                        <button
                          onClick={() => handleSpeakText(msg.id, msg.text)}
                          className="flex items-center gap-1 hover:text-emerald-400 transition"
                          title="Listen in regional voice"
                        >
                          {isSpeakingId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-rose-400" />
                              <span className="text-rose-400 font-bold">{chatUi.stopVoice}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-emerald-400" />
                              <span>{t.chat.speakVoice}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {isSending && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-800 text-emerald-400 border border-stone-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-950 border border-stone-800 rounded-2xl rounded-tl-xs p-3.5 text-xs text-stone-400 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>{chatUi.waitingDoctor}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-950/60 overflow-x-auto flex gap-2">
          {t.chat.quickPrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              className="px-2.5 py-1 text-[11px] rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-emerald-300 border border-stone-800 whitespace-nowrap transition"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Support */}
        <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-xl border transition ${
                isListeningVoice
                  ? 'bg-rose-600 text-white animate-pulse border-rose-500'
                  : 'bg-stone-900 text-stone-400 hover:text-emerald-400 border-stone-800'
              }`}
              title="Voice Speech Input"
            >
              {isListeningVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isListeningVoice ? t.chat.listening : t.chat.inputPlaceholder}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className={`p-2.5 rounded-xl transition ${
                !inputMessage.trim() || isSending
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md shadow-emerald-950'
              }`}
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Chat Safety Notice */}
          <div className="mt-2 text-center text-[10px] text-stone-500 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3 text-stone-400 shrink-0" />
            <span>{t.chat.safetyNotice}</span>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSessionCard(sess: ChatSession) {
    const isActive = sess.id === activeSessionId;
    const lastMsg = sess.messages[sess.messages.length - 1];
    return (
      <div
        key={sess.id}
        onClick={() => {
          setActiveSessionId(sess.id);
          if (window.innerWidth < 768) setShowHistorySidebar(false);
        }}
        className={`p-2.5 rounded-xl border transition cursor-pointer group text-left relative ${
          isActive
            ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
            : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 text-stone-300'
        }`}
      >
        <div className="flex items-start justify-between gap-1">
          <h4 className="font-bold text-xs truncate max-w-[190px]">
            {sess.title}
          </h4>
          <button
            onClick={(e) => handleDeleteSession(sess.id, e)}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-stone-500 hover:text-rose-400 transition"
            title="Delete chat"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        {lastMsg && (
          <p className="text-[10px] text-stone-400 truncate mt-0.5">
            {lastMsg.text}
          </p>
        )}
      </div>
    );
  }
};
