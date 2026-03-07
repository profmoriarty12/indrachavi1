import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router-dom";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  chips?: QuickChip[];
}

interface QuickChip {
  label: string;
  action: string;
}

const botReplies: Record<string, { en: string; hi: string; chips?: QuickChip[] }> = {
  greeting: {
    en: "Hello! I'm the **Indra AI Assistant**. How can I help you today?",
    hi: "नमस्ते! मैं **इंद्र AI सहायक** हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    chips: [
      { label: "How do I match a skin tone?", action: "workflow" },
      { label: "Tell me about the recipe", action: "formulation" },
      { label: "Show patient records", action: "nav_records" },
      { label: "Take me to the map", action: "nav_map" },
    ],
  },
  workflow: {
    en: "**Clinical Workflow — Skin Tone Matching:**\n\n1️⃣ Go to the **Analysis** page.\n2️⃣ Enter the Patient ID, Name, Age, and Region.\n3️⃣ Snap a photo of the **healthy tissue adjacent to the defect** using the built-in camera, or upload an existing image.\n4️⃣ I will extract the **CIE Lab*** value from the image and match it against our 98-swatch palette.\n5️⃣ A **pigment mixing recipe** (using Technovent medical-grade silicone pigments) is generated instantly.\n6️⃣ Download the formal **PGIMER-style clinical report** as a PDF.",
    hi: "**नैदानिक कार्यप्रवाह — त्वचा टोन मिलान:**\n\n1️⃣ **विश्लेषण** पृष्ठ पर जाएं।\n2️⃣ मरीज़ आईडी, नाम, आयु और क्षेत्र दर्ज करें।\n3️⃣ बिल्ट-इन कैमरे से **दोष के निकट स्वस्थ ऊतक** की फोटो लें, या मौजूदा छवि अपलोड करें।\n4️⃣ मैं छवि से **CIE Lab*** मान निकालूंगा और हमारे 98-स्वॉच पैलेट से मिलान करूंगा।\n5️⃣ **पिगमेंट मिक्सिंग रेसिपी** (टेक्नोवेंट मेडिकल-ग्रेड सिलिकॉन पिगमेंट) तुरंत बनाई जाती है।\n6️⃣ औपचारिक **PGIMER-शैली नैदानिक रिपोर्ट** PDF के रूप में डाउनलोड करें।",
    chips: [
      { label: "Start an analysis now", action: "nav_analysis" },
      { label: "Tell me about the recipe", action: "formulation" },
    ],
  },
  formulation: {
    en: "**Formulation Science — Wet-to-Dry Compensation:**\n\nThe prescribed recipe uses a **'Negative Bias'**. It is intentionally mixed **too light** to perfectly compensate for the **non-linear darkening shift** that occurs during silicone polymerization.\n\nWhen medical-grade silicone cures (crosslinks), the pigment particles compress, causing a measurable increase in ΔE*. Our **XGBoost regressor** predicts this exact shift and pre-compensates the formulation so the final cured prosthesis matches the patient's native skin tone within **ΔE* < 2** (clinically imperceptible).",
    hi: "**फॉर्मूलेशन विज्ञान — वेट-टू-ड्राई क्षतिपूर्ति:**\n\nनिर्धारित रेसिपी **'नेगेटिव बायस'** का उपयोग करती है। इसे जानबूझकर **बहुत हल्का** मिलाया जाता है ताकि सिलिकॉन पोलीमराइजेशन के दौरान होने वाले **गैर-रैखिक काले होने** की पूरी तरह से भरपाई हो सके।\n\nजब मेडिकल-ग्रेड सिलिकॉन क्योर (क्रॉसलिंक) होता है, तो पिगमेंट कण संकुचित होते हैं, जिससे ΔE* में मापनीय वृद्धि होती है। हमारा **XGBoost रिग्रेसर** इस सटीक बदलाव की भविष्यवाणी करता है और फॉर्मूलेशन को पूर्व-क्षतिपूर्ति करता है।",
    chips: [
      { label: "How do I match a skin tone?", action: "workflow" },
      { label: "Show patient records", action: "nav_records" },
    ],
  },
  nav_records: {
    en: "📋 You can view all patient records on the **[Patient Records](/records)** page. It includes searchable history of matched shades and prosthetic recipes.",
    hi: "📋 आप **[मरीज़ रिकॉर्ड](/records)** पृष्ठ पर सभी मरीज़ के रिकॉर्ड देख सकते हैं। इसमें मिलान शेड्स और प्रोस्थेटिक रेसिपी का खोजने योग्य इतिहास शामिल है।",
    chips: [
      { label: "Start an analysis", action: "nav_analysis" },
      { label: "Take me to the map", action: "nav_map" },
    ],
  },
  nav_map: {
    en: "🗺️ The interactive India map is on the **[Dashboard](/dashboard)** page. Hover over any state to see the Mean Melanin Index and Fitzpatrick Type.",
    hi: "🗺️ इंटरैक्टिव भारत नक्शा **[डैशबोर्ड](/dashboard)** पृष्ठ पर है। मीन मेलेनिन इंडेक्स और फिट्ज़पैट्रिक प्रकार देखने के लिए किसी भी राज्य पर होवर करें।",
    chips: [
      { label: "How do I match a skin tone?", action: "workflow" },
      { label: "Show patient records", action: "nav_records" },
    ],
  },
  nav_analysis: {
    en: "🔬 Head to the **[Analysis](/analysis)** page to start a new patient skin tone analysis and generate a pigment recipe.",
    hi: "🔬 नया मरीज़ त्वचा टोन विश्लेषण शुरू करने और पिगमेंट रेसिपी बनाने के लिए **[विश्लेषण](/analysis)** पृष्ठ पर जाएं।",
    chips: [
      { label: "Tell me about the recipe", action: "formulation" },
      { label: "Take me to the map", action: "nav_map" },
    ],
  },
  fallback: {
    en: "I'm not sure I understand. Here are some things I can help with:",
    hi: "मुझे समझ नहीं आया। यहाँ कुछ चीज़ें हैं जिनमें मैं मदद कर सकता हूँ:",
    chips: [
      { label: "How do I match a skin tone?", action: "workflow" },
      { label: "Tell me about the recipe", action: "formulation" },
      { label: "Show patient records", action: "nav_records" },
      { label: "Take me to the map", action: "nav_map" },
    ],
  },
};

// Simple markdown-like renderer for bold and links
const RenderText = ({ text }: { text: string }) => {
  // Split by markdown links [text](url) and bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <span>
      {parts.map((part, i) => {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <Link key={i} to={linkMatch[2]} className="text-primary underline font-medium">
              {linkMatch[1]}
            </Link>
          );
        }
        const boldMatch = part.match(/^\*\*(.+)\*\*$/);
        if (boldMatch) {
          return <strong key={i}>{boldMatch[1]}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const IndraAIAssistant = () => {
  const { lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [chatLang, setChatLang] = useState<"en" | "hi">(lang);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [msgId, setMsgId] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatLang(lang);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (key: string, currentLang: "en" | "hi") => {
    const reply = botReplies[key] || botReplies.fallback;
    const newId = msgId + 1;
    setMsgId(newId);
    // Translate chips labels based on lang
    const chips = reply.chips?.map(c => {
      // For Hindi, translate chip labels
      if (currentLang === "hi") {
        const hiLabels: Record<string, string> = {
          "How do I match a skin tone?": "त्वचा टोन कैसे मिलाएं?",
          "Tell me about the recipe": "रेसिपी के बारे में बताएं",
          "Show patient records": "मरीज़ रिकॉर्ड दिखाएं",
          "Take me to the map": "नक्शे पर ले जाएं",
          "Start an analysis now": "अभी विश्लेषण शुरू करें",
          "Start an analysis": "विश्लेषण शुरू करें",
        };
        return { ...c, label: hiLabels[c.label] || c.label };
      }
      return c;
    });
    setMessages(prev => [...prev, { id: newId, role: "bot", text: reply[currentLang], chips }]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      addBotMessage("greeting", chatLang);
    }
  };

  const handleChip = (action: string) => {
    // Add user message
    const chip = botReplies[action];
    const userText = action === "workflow" ? (chatLang === "hi" ? "त्वचा टोन कैसे मिलाएं?" : "How do I match a skin tone?")
      : action === "formulation" ? (chatLang === "hi" ? "रेसिपी के बारे में बताएं" : "Tell me about the recipe")
      : action === "nav_records" ? (chatLang === "hi" ? "मरीज़ रिकॉर्ड दिखाएं" : "Show patient records")
      : action === "nav_map" ? (chatLang === "hi" ? "नक्शे पर ले जाएं" : "Take me to the map")
      : action === "nav_analysis" ? (chatLang === "hi" ? "विश्लेषण शुरू करें" : "Start an analysis")
      : action;
    const uid = msgId + 1;
    setMsgId(uid + 1);
    setMessages(prev => [...prev, { id: uid, role: "user", text: userText }]);
    setTimeout(() => addBotMessage(action, chatLang), 400);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const uid = msgId + 1;
    setMsgId(uid + 1);
    setMessages(prev => [...prev, { id: uid, role: "user", text: input }]);
    setInput("");
    // Simple keyword matching
    const lower = input.toLowerCase();
    const key = lower.includes("skin") || lower.includes("tone") || lower.includes("match") || lower.includes("त्वचा") ? "workflow"
      : lower.includes("recipe") || lower.includes("formul") || lower.includes("wet") || lower.includes("dry") || lower.includes("रेसिपी") ? "formulation"
      : lower.includes("record") || lower.includes("patient") || lower.includes("रिकॉर्ड") || lower.includes("मरीज़") ? "nav_records"
      : lower.includes("map") || lower.includes("dashboard") || lower.includes("नक्श") || lower.includes("डैशबोर्ड") ? "nav_map"
      : lower.includes("analy") || lower.includes("विश्लेषण") ? "nav_analysis"
      : "fallback";
    setTimeout(() => addBotMessage(key, chatLang), 400);
  };

  const toggleChatLang = () => {
    const newLang = chatLang === "en" ? "hi" : "en";
    setChatLang(newLang);
    const uid = msgId + 1;
    setMsgId(uid + 1);
    const switchMsg = newLang === "hi" ? "भाषा हिन्दी में बदली गई।" : "Language switched to English.";
    setMessages(prev => [...prev, { id: uid, role: "bot", text: switchMsg }]);
    setTimeout(() => addBotMessage("greeting", newLang), 300);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            title="Indra AI Assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
              <div>
                <p className="font-semibold text-sm">Indra AI Assistant</p>
                <p className="text-[10px] opacity-80">Clinical Support</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleChatLang}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold bg-white/20 hover:bg-white/30 transition-colors"
                  title="Toggle chat language"
                >
                  <Globe className="h-3 w-3" />
                  {chatLang === "en" ? "हिन्दी" : "English"}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}>
                    {msg.text.split("\n").map((line, li) => (
                      <span key={li}>
                        <RenderText text={line} />
                        {li < msg.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.chips.map((chip) => (
                          <button
                            key={chip.action}
                            onClick={() => handleChip(chip.action)}
                            className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={chatLang === "hi" ? "अपना सवाल टाइप करें…" : "Type your question…"}
                  className="flex-1 text-sm rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IndraAIAssistant;
