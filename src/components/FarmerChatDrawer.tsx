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
  Sparkles,
  Paperclip,
  CheckCircle2,
  Leaf,
  Clock,
  ChevronLeft,
  Search,
} from 'lucide-react';
import { ChatMessage, ChatSession } from '../types/chat';
import { FarmerUser } from '../types/auth';
import { SupportedLanguage, LANGUAGE_OPTIONS, AgriShieldReport } from '../types/agrishield';

interface FarmerChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FarmerUser | null;
  currentLanguage: SupportedLanguage;
  activeScanReport?: AgriShieldReport | null;
}

export const FarmerChatDrawer: React.FC<FarmerChatDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentLanguage,
  activeScanReport,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [showHistorySidebar, setShowHistorySidebar] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat sessions on mount or when user changes
  useEffect(() => {
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen, currentUser]);

  const loadSessions = async () => {
    try {
      const userId = currentUser?.id || 'farmer-demo-001';
      const res = await fetch(`/api/farmer-chat/sessions?userId=${userId}`);
      if (res.ok) {
        const data: ChatSession[] = await res.json();
        setSessions(data);
        if (data.length > 0 && !activeSessionId) {
          setActiveSessionId(data[0].id);
        }
      }
    } catch (e) {
      console.error('Failed loading chat sessions:', e);
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isSending]);

  if (!isOpen) return null;

  const currentLangMeta = LANGUAGE_OPTIONS.find((l) => l.key === currentLanguage) || LANGUAGE_OPTIONS[0];

  const handleStartNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      userId: currentUser?.id || 'farmer-demo-001',
      title: 'New Crop Consultation',
      cropTag: activeScanReport?.analysis_metadata.crop_detected.split(' (')[0] || 'General Field',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [
        {
          id: `welcome-${Date.now()}`,
          sender: 'assistant',
          text:
            currentLanguage === 'telugu'
              ? `నమస్కారం ${currentUser?.name || 'రైతు'} గారు! నేను మీ AgriShield కిసాన్ మిత్ర AI ని. మీ పంట తెగుళ్ళు, పిచికారీ మోతాదు లేదా సేంద్రీయ నివారణల గురించి నన్ను అడగండి.`
              : currentLanguage === 'tamil'
              ? `வணக்கம் ${currentUser?.name || 'விவசாயி'} அவர்களே! நான் உங்கள் AgriShield கிசான் மித்ரா AI. உங்கள் பயிர் நோய்கள், பூச்சி மருந்து அளவு அல்லது இயற்கை மேலாண்மை பற்றி கேளுங்கள்.`
              : currentLanguage === 'hindi'
              ? `नमस्ते ${currentUser?.name || 'किसान'} भाई! मैं आपका AgriShield किसान मित्र AI हूँ। फसल के रोग, कीटनाशक की सही मात्रा या जैविक उपचार के बारे में कोई भी प्रश्न पूछें।`
              : `Hello ${currentUser?.name || 'Farmer'}! I am your AgriShield Kisan Mitra AI advisor. Ask me anything about crop diseases, dosage metrics, tank mixing, or organic solutions.`,
          timestamp: Date.now(),
          language: currentLanguage,
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
      const updated = sessions.filter((s) => s.id !== sessionId);
      setSessions(updated);
      if (activeSessionId === sessionId) {
        setActiveSessionId(updated.length > 0 ? updated[0].id : null);
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

    // Build farmer message
    const farmerMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'farmer',
      text: textToSend,
      timestamp: Date.now(),
      language: currentLanguage,
      attachedScan:
        attachScan && activeScanReport
          ? {
              crop: activeScanReport.analysis_metadata.crop_detected,
              disease: activeScanReport.languages.english.disease_name,
              severityPercentage: activeScanReport.analysis_metadata.severity_percentage,
              stage: activeScanReport.analysis_metadata.infection_stage,
            }
          : undefined,
    };

    let targetSession = activeSession;
    if (!targetSession) {
      targetSession = {
        id: `session-${Date.now()}`,
        userId: currentUser?.id || 'farmer-demo-001',
        title: textToSend.slice(0, 40),
        cropTag: activeScanReport?.analysis_metadata.crop_detected.split(' (')[0] || 'Crop Query',
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
          language: currentLanguage,
          userContext: currentUser
            ? {
                name: currentUser.name,
                state: currentUser.state,
                district: currentUser.district,
                primaryCrops: currentUser.primaryCrops,
              }
            : undefined,
          scanContext: attachScan && activeScanReport
            ? {
                crop: activeScanReport.analysis_metadata.crop_detected,
                disease: activeScanReport.languages.english.disease_name,
                severityPercentage: activeScanReport.analysis_metadata.severity_percentage,
                stage: activeScanReport.analysis_metadata.infection_stage,
              }
            : undefined,
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Advisory advice received.',
        timestamp: Date.now(),
        language: currentLanguage,
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

  const quickPrompts = [
    {
      en: 'How to calibrate 16L knapsack spray tank for this disease?',
      te: 'ఈ తెగులుకు 16 లీటర్ల నాప్‌సాక్ ట్యాంకు మోతాదు ఎంత?',
      ta: '16 லிட்டர் தெளிப்பான் தொட்டிக்கான மருந்து அளவு என்ன?',
      hi: 'इस बीमारी के लिए 16 लीटर स्प्रे टैंक में कितनी दवा मिलाएं?',
    },
    {
      en: 'What are the best organic bio-pesticides for early prevention?',
      te: 'ప్రారంభ దశలో వాడాల్సిన సేంద్రీయ జీవ మందులు ఏమిటి?',
      ta: 'ஆரம்ப தடுப்புக்கு ஏற்ற இயற்கை பூச்சிக்கொல்லிகள் யாவை?',
      hi: 'शुरुआती रोकथाम के लिए सबसे अच्छे जैविक कीटनाशक कौन से हैं?',
    },
    {
      en: 'What is the ideal time of day to spray in hot weather?',
      te: 'ఎండ తీవ్రత ఉన్నప్పుడు పిచికారీ చేయడానికి అనువైన సమయం ఏది?',
      ta: 'வெயில் காலத்தில் மருந்து தெளிக்க உகந்த நேரம் எது?',
      hi: 'धूप के मौसम में छिड़काव करने का सही समय क्या है?',
    },
  ];

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs">
      <div className="w-full max-w-4xl bg-stone-900 border-l border-stone-800 h-full flex flex-col sm:flex-row shadow-2xl overflow-hidden">
        {/* Left Column: SAVED CHAT SESSIONS HISTORY */}
        <div
          className={`${
            showHistorySidebar ? 'flex' : 'hidden'
          } sm:flex w-full sm:w-80 bg-stone-950 border-r border-stone-800 flex-col h-full shrink-0`}
        >
          {/* History Header */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-200">
                Farmer Consult History
              </h3>
            </div>
            <button
              onClick={handleStartNewSession}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1 transition shadow-sm"
              title="Start New Consultation"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="p-3 border-b border-stone-800/80">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search previous chats..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-500/80"
              />
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredSessions.length === 0 ? (
              <div className="py-12 text-center text-stone-500 text-xs px-4">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No saved conversations found.</p>
                <button
                  onClick={handleStartNewSession}
                  className="mt-2 text-emerald-400 underline font-medium"
                >
                  Start your first consultation
                </button>
              </div>
            ) : (
              filteredSessions.map((sess) => {
                const isActive = sess.id === activeSessionId;
                const lastMsg = sess.messages[sess.messages.length - 1];
                return (
                  <div
                    key={sess.id}
                    onClick={() => {
                      setActiveSessionId(sess.id);
                      if (window.innerWidth < 640) setShowHistorySidebar(false);
                    }}
                    className={`p-3 rounded-xl border transition cursor-pointer group text-left relative ${
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
                        className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 transition"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {lastMsg && (
                      <p className="text-[11px] text-stone-400 truncate mt-1">
                        {lastMsg.text}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                      <span>{sess.cropTag || 'Crop'}</span>
                      <span>{new Date(sess.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* User profile banner at bottom of sidebar */}
          <div className="p-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                {currentUser?.name ? currentUser.name[0] : 'K'}
              </div>
              <div className="truncate">
                <div className="font-bold text-stone-200 truncate text-[11px]">
                  {currentUser?.name || 'Ramesh Reddy (Demo)'}
                </div>
                <div className="text-[10px] text-stone-500 truncate">
                  {currentUser?.state || 'Telangana'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ACTIVE CONVERSATION */}
        <div className="flex-1 flex flex-col h-full bg-stone-900">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistorySidebar(!showHistorySidebar)}
                className="sm:hidden p-1.5 rounded-lg text-stone-400 hover:text-white bg-stone-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">
                    Kisan Mitra AI Doctor
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-stone-400">
                  Regional Crop Pathology & Spray Advisory ({currentLangMeta.nativeName})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Scan Context Capsule (if leaf scanned) */}
          {activeScanReport && (
            <div className="px-4 py-2 bg-emerald-950/30 border-b border-emerald-800/40 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 truncate">
                <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-stone-300 truncate">
                  Active Leaf: <strong className="text-white">{activeScanReport.analysis_metadata.crop_detected}</strong> •{' '}
                  <span className="text-emerald-300">
                    {activeScanReport.languages.english.disease_name.split(' (')[0]} ({activeScanReport.analysis_metadata.severity_percentage}%)
                  </span>
                </span>
              </div>
              <button
                onClick={() =>
                  handleSendMessage(
                    `Please give me step-by-step spray directions and farm quarantine precautions for ${activeScanReport.analysis_metadata.crop_detected} infected with ${activeScanReport.languages.english.disease_name} (${activeScanReport.analysis_metadata.severity_percentage}% severity).`,
                    true
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold hover:bg-emerald-600 hover:text-stone-950 transition shrink-0"
              >
                + Ask About Scan
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {(!activeSession || activeSession.messages.length === 0) ? (
              <div className="py-16 text-center text-stone-400 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Ask Your Agricultural Query</h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                    Ask about pest symptoms, fertilizer mixing, tank preparation, or organic farming methods in your local language.
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
                          🌱 <strong>Attached Leaf Scan:</strong> {msg.attachedScan.crop} -{' '}
                          {msg.attachedScan.disease} ({msg.attachedScan.severityPercentage}%)
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
                                <span className="text-rose-400 font-bold">Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-emerald-400" />
                                <span>Voice</span>
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
                  <span>Kisan Mitra is formulating localized advice...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-950/60 overflow-x-auto flex gap-2">
            {quickPrompts.map((q, idx) => {
              const text =
                currentLanguage === 'telugu'
                  ? q.te
                  : currentLanguage === 'tamil'
                  ? q.ta
                  : currentLanguage === 'hindi'
                  ? q.hi
                  : q.en;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(text)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-emerald-300 border border-stone-800 whitespace-nowrap transition"
                >
                  {text}
                </button>
              );
            })}
          </div>

          {/* Message Input Box */}
          <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  currentLanguage === 'telugu'
                    ? 'మీ ప్రశ్నను ఇక్కడ అడగండి (ఉదా: పురుగు మందు మోతాదు, తెగులు నివారణ)...'
                    : currentLanguage === 'tamil'
                    ? 'உங்கள் கேள்வியை இங்கே கேட்கவும் (எ.கா: மருந்து அளவு)...'
                    : currentLanguage === 'hindi'
                    ? 'अपना सवाल यहाँ पूछें (उदा: कीटनाशक खुराक, छिड़काव का समय)...'
                    : 'Ask your farming question (e.g. spray dosage, tank mix, organic cure)...'
                }
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className={`p-2.5 rounded-xl transition ${
                  !inputMessage.trim() || isSending
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md shadow-emerald-900/40'
                }`}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
