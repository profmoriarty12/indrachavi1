import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi";

const translations: Record<string, Record<Lang, string>> = {
  "Home": { en: "Home", hi: "होम" },
  "Dashboard": { en: "Dashboard", hi: "डैशबोर्ड" },
  "Analysis": { en: "Analysis", hi: "विश्लेषण" },
  "Records": { en: "Records", hi: "रिकॉर्ड" },
  "Learn": { en: "Learn", hi: "सीखें" },
  "Contact": { en: "Contact", hi: "संपर्क" },
  "Rate Us": { en: "Rate Us", hi: "रेटिंग दें" },
  "Login": { en: "Login", hi: "लॉगिन" },
  "Sign Up": { en: "Sign Up", hi: "साइन अप" },
  "Patient Records": { en: "Patient Records", hi: "मरीज़ के रिकॉर्ड" },
  "Upload Image": { en: "Upload Image", hi: "छवि अपलोड करें" },
  "Open Camera": { en: "Open Camera", hi: "कैमरा खोलें" },
  "Download Report": { en: "Download Report", hi: "रिपोर्ट डाउनलोड करें" },
  "Download PDF": { en: "Download PDF", hi: "PDF डाउनलोड करें" },
  "New Patient Analysis": { en: "New Patient Analysis", hi: "नया मरीज़ विश्लेषण" },
  "Patient Details": { en: "Patient Details", hi: "मरीज़ का विवरण" },
  "Image Capture": { en: "Image Capture", hi: "छवि कैप्चर" },
  "Start Analysis": { en: "Start Analysis", hi: "विश्लेषण शुरू करें" },
  "View India Map": { en: "View India Map", hi: "भारत का नक्शा देखें" },
  "India Demographic Dashboard": { en: "India Demographic Dashboard", hi: "भारत जनसांख्यिकी डैशबोर्ड" },
  "Classification Report": { en: "Classification Report", hi: "वर्गीकरण रिपोर्ट" },
  "Back to Analysis": { en: "Back to Analysis", hi: "विश्लेषण पर वापस जाएं" },
  "Analyze & Generate Recipe": { en: "Analyze & Generate Recipe", hi: "विश्लेषण और नुस्खा बनाएं" },
  "Knowledge Hub": { en: "Knowledge Hub", hi: "ज्ञान केंद्र" },
  "Patient ID": { en: "Patient ID", hi: "मरीज़ आईडी" },
  "Full Name": { en: "Full Name", hi: "पूरा नाम" },
  "Age": { en: "Age", hi: "आयु" },
  "State": { en: "State", hi: "राज्य" },
  "Capture": { en: "Capture", hi: "कैप्चर" },
  "Cancel": { en: "Cancel", hi: "रद्द करें" },
  "Retake": { en: "Retake", hi: "दोबारा लें" },
  "New Analysis": { en: "New Analysis", hi: "नया विश्लेषण" },
  "Search": { en: "Search by name, ID, or state…", hi: "नाम, आईडी, या राज्य से खोजें…" },
  "View": { en: "View", hi: "देखें" },
  "Read More": { en: "Read More", hi: "और पढ़ें" },
  "For Indian Clinicians": { en: "For Indian Clinicians", hi: "भारतीय चिकित्सकों के लिए" },
  "Clinical Tools, Simplified": { en: "Clinical Tools, Simplified", hi: "नैदानिक उपकरण, सरलीकृत" },
  "Create Free Account": { en: "Create Free Account", hi: "मुफ्त खाता बनाएं" },
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[key]?.[lang] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
