import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi";

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "Home": { en: "Home", hi: "होम" },
  "Dashboard": { en: "Dashboard", hi: "डैशबोर्ड" },
  "Analysis": { en: "Analysis", hi: "विश्लेषण" },
  "Records": { en: "Records", hi: "रिकॉर्ड" },
  "Learn": { en: "Learn", hi: "सीखें" },
  "Contact": { en: "Contact", hi: "संपर्क" },
  "Rate Us": { en: "Rate Us", hi: "रेटिंग दें" },
  "Login": { en: "Login", hi: "लॉगिन" },
  "Sign Up": { en: "Sign Up", hi: "साइन अप" },

  // Dashboard
  "India Demographic Dashboard": { en: "India Demographic Dashboard", hi: "भारत जनसांख्यिकी डैशबोर्ड" },
  "dashboard_subtitle": { en: "State-wise Melanin Index & Fitzpatrick Type distribution for prosthetic formulation reference.", hi: "प्रोस्थेटिक फॉर्मूलेशन संदर्भ के लिए राज्य-वार मेलेनिन इंडेक्स और फिट्ज़पैट्रिक प्रकार वितरण।" },
  "State-wise Melanin Index Map": { en: "State-wise Melanin Index Map", hi: "राज्य-वार मेलेनिन इंडेक्स मानचित्र" },
  "Fitzpatrick": { en: "Fitzpatrick", hi: "फिट्ज़पैट्रिक" },
  "Category": { en: "Category", hi: "श्रेणी" },
  "Low MI": { en: "Low MI", hi: "कम MI" },
  "High MI": { en: "High MI", hi: "अधिक MI" },
  "Mean Melanin Index": { en: "Mean Melanin Index", hi: "औसत मेलेनिन इंडेक्स" },
  "Fitzpatrick Type": { en: "Fitzpatrick Type", hi: "फिट्ज़पैट्रिक प्रकार" },
  "Tone Category": { en: "Tone Category", hi: "टोन श्रेणी" },
  "map_hint": { en: "Click or hover over a state on the map to view demographic skin tone data.", hi: "जनसांख्यिकी त्वचा टोन डेटा देखने के लिए मानचित्र पर किसी राज्य पर क्लिक या होवर करें।" },
  "States/UTs": { en: "States/UTs", hi: "राज्य/केंद्र शासित" },
  "Fitzpatrick Range": { en: "Fitzpatrick Range", hi: "फिट्ज़पैट्रिक रेंज" },
  "Min MI (J&K)": { en: "Min MI (J&K)", hi: "न्यूनतम MI (J&K)" },
  "Max MI (TN)": { en: "Max MI (TN)", hi: "अधिकतम MI (TN)" },

  // Analysis
  "New Patient Analysis": { en: "New Patient Analysis", hi: "नया मरीज़ विश्लेषण" },
  "analysis_subtitle": { en: "Capture or upload a skin image to generate a prosthetic color recipe.", hi: "प्रोस्थेटिक कलर रेसिपी बनाने के लिए त्वचा की छवि कैप्चर या अपलोड करें।" },
  "Patient Details": { en: "Patient Details", hi: "मरीज़ का विवरण" },
  "Image Capture": { en: "Image Capture", hi: "छवि कैप्चर" },
  "Patient ID": { en: "Patient ID", hi: "मरीज़ आईडी" },
  "Full Name": { en: "Full Name", hi: "पूरा नाम" },
  "Age": { en: "Age", hi: "आयु" },
  "State": { en: "State", hi: "राज्य" },
  "Upload Image": { en: "Upload Image", hi: "छवि अपलोड करें" },
  "upload_hint": { en: "JPG, PNG up to 10MB", hi: "JPG, PNG 10MB तक" },
  "Open Camera": { en: "Open Camera", hi: "कैमरा खोलें" },
  "align_face": { en: "Align face within the oval", hi: "चेहरे को अंडाकार में संरेखित करें" },
  "Capture": { en: "Capture", hi: "कैप्चर" },
  "Cancel": { en: "Cancel", hi: "रद्द करें" },
  "Analyze & Generate Recipe": { en: "Analyze & Generate Recipe", hi: "विश्लेषण और नुस्खा बनाएं" },
  "Analyzing": { en: "Analyzing…", hi: "विश्लेषण हो रहा है…" },
  "Retake": { en: "Retake", hi: "दोबारा लें" },
  "Select state": { en: "Select state", hi: "राज्य चुनें" },
  "Patient name": { en: "Patient name", hi: "मरीज़ का नाम" },

  // Records
  "Patient Records": { en: "Patient Records", hi: "मरीज़ के रिकॉर्ड" },
  "records_subtitle": { en: "Search and manage past patient analyses and reports.", hi: "पिछले मरीज़ विश्लेषण और रिपोर्ट खोजें और प्रबंधित करें।" },
  "Search": { en: "Search by name, ID, or state…", hi: "नाम, आईडी, या राज्य से खोजें…" },
  "Date": { en: "Date", hi: "तारीख" },
  "Name": { en: "Name", hi: "नाम" },
  "Matched Shade": { en: "Matched Shade", hi: "मिलान शेड" },
  "Action": { en: "Action", hi: "कार्रवाई" },
  "View": { en: "View", hi: "देखें" },
  "No records found": { en: "No records found.", hi: "कोई रिकॉर्ड नहीं मिला।" },

  // Report
  "Classification Report": { en: "Classification Report", hi: "वर्गीकरण रिपोर्ट" },
  "Back to Analysis": { en: "Back to Analysis", hi: "विश्लेषण पर वापस जाएं" },
  "Download Report": { en: "Download Report", hi: "रिपोर्ट डाउनलोड करें" },
  "Download PDF": { en: "Download PDF", hi: "PDF डाउनलोड करें" },
  "New Analysis": { en: "New Analysis", hi: "नया विश्लेषण" },

  // Learn
  "Knowledge Hub": { en: "Knowledge Hub", hi: "ज्ञान केंद्र" },
  "learn_subtitle": { en: "Resources, research, and tutorials on facial prosthetic color science and Indian demographic skin tone data.", hi: "फेशियल प्रोस्थेटिक कलर साइंस और भारतीय जनसांख्यिकी त्वचा टोन डेटा पर संसाधन, शोध और ट्यूटोरियल।" },
  "Featured Articles": { en: "Featured Articles", hi: "विशेष लेख" },
  "Read More": { en: "Read More", hi: "और पढ़ें" },

  // Contact
  "contact_subtitle": { en: "Reach out for partnerships, clinical inquiries, or technical support.", hi: "साझेदारी, नैदानिक पूछताछ या तकनीकी सहायता के लिए संपर्क करें।" },
  "Get in Touch": { en: "Get in Touch", hi: "संपर्क करें" },
  "Institutional Partners": { en: "Institutional Partners", hi: "संस्थागत भागीदार" },
  "Message Sent": { en: "Message Sent", hi: "संदेश भेजा गया" },
  "response_time": { en: "We'll respond within 24 hours.", hi: "हम 24 घंटे के भीतर जवाब देंगे।" },
  "Send Another": { en: "Send Another", hi: "एक और भेजें" },
  "Send Message": { en: "Send Message", hi: "संदेश भेजें" },
  "Sending": { en: "Sending…", hi: "भेज रहा है…" },
  "Subject": { en: "Subject", hi: "विषय" },
  "Message": { en: "Message", hi: "संदेश" },
  "Email": { en: "Email", hi: "ईमेल" },

  // Index / Landing
  "For Indian Clinicians": { en: "For Indian Clinicians", hi: "भारतीय चिकित्सकों के लिए" },
  "hero_title_1": { en: "Precision Color Matching for", hi: "के लिए सटीक रंग मिलान" },
  "hero_title_2": { en: "Facial Prosthetics", hi: "फेशियल प्रोस्थेटिक्स" },
  "hero_description": { en: "IndraChavi helps maxillofacial surgeons and prosthodontists across India formulate exact pigment recipes for custom prostheses — using AI-powered skin tone analysis and a 98-swatch color palette.", hi: "इंद्रछवि भारत भर के मैक्सिलोफेशियल सर्जनों और प्रोस्थोडॉन्टिस्टों को AI-संचालित स्किन टोन विश्लेषण और 98-स्वॉच कलर पैलेट का उपयोग करके कस्टम प्रोस्थेसिस के लिए सटीक पिगमेंट रेसिपी बनाने में मदद करता है।" },
  "Start Analysis": { en: "Start Analysis", hi: "विश्लेषण शुरू करें" },
  "View India Map": { en: "View India Map", hi: "भारत का नक्शा देखें" },
  "Clinical Tools, Simplified": { en: "Clinical Tools, Simplified", hi: "नैदानिक उपकरण, सरलीकृत" },
  "tools_subtitle": { en: "Everything a doctor needs for facial prosthetic color matching — from demographic insights to recipe generation.", hi: "फेशियल प्रोस्थेटिक कलर मिलान के लिए डॉक्टर को जो कुछ भी चाहिए — जनसांख्यिकी जानकारी से लेकर रेसिपी निर्माण तक।" },
  "India Demographic Map": { en: "India Demographic Map", hi: "भारत जनसांख्यिकी मानचित्र" },
  "map_feature_desc": { en: "Explore state-wise melanin index and Fitzpatrick type data across India's diverse population.", hi: "भारत की विविध जनसंख्या में राज्य-वार मेलेनिन इंडेक्स और फिट्ज़पैट्रिक प्रकार डेटा का अन्वेषण करें।" },
  "Skin Tone Analysis": { en: "Skin Tone Analysis", hi: "त्वचा टोन विश्लेषण" },
  "analysis_feature_desc": { en: "Capture or upload patient images for AI-powered melanin classification and recipe formulation.", hi: "AI-संचालित मेलेनिन वर्गीकरण और रेसिपी फॉर्मूलेशन के लिए मरीज़ की छवियां कैप्चर या अपलोड करें।" },
  "records_feature_desc": { en: "Manage patient history, matched shades, and prosthetic recipes in a searchable database.", hi: "खोजने योग्य डेटाबेस में मरीज़ का इतिहास, मिलान शेड्स और प्रोस्थेटिक रेसिपी प्रबंधित करें।" },
  "knowledge_feature_desc": { en: "Research articles on Fitzpatrick Scale, AI in prosthetics, and Indian demographic insights.", hi: "फिट्ज़पैट्रिक स्केल, प्रोस्थेटिक्स में AI और भारतीय जनसांख्यिकी अंतर्दृष्टि पर शोध लेख।" },
  "cta_title": { en: "Ready to Improve Prosthetic Outcomes?", hi: "प्रोस्थेटिक परिणामों में सुधार के लिए तैयार हैं?" },
  "cta_subtitle": { en: "Join clinicians across India who use IndraChavi for precise, reproducible prosthetic color formulation.", hi: "भारत भर के उन चिकित्सकों से जुड़ें जो सटीक, प्रतिलिपि योग्य प्रोस्थेटिक कलर फॉर्मूलेशन के लिए इंद्रछवि का उपयोग करते हैं।" },
  "Create Free Account": { en: "Create Free Account", hi: "मुफ्त खाता बनाएं" },

  // Footer
  "footer_description": { en: "AI-powered prosthetic color matching for facial rehabilitation across India. Precision formulation meets clinical care.", hi: "भारत भर में फेशियल रिहैबिलिटेशन के लिए AI-संचालित प्रोस्थेटिक कलर मिलान। सटीक फॉर्मूलेशन और नैदानिक देखभाल।" },
  "Quick Links": { en: "Quick Links", hi: "त्वरित लिंक" },

  // Resources (Learn page)
  "Melanin Index Reference": { en: "Melanin Index Reference", hi: "मेलेनिन इंडेक्स संदर्भ" },
  "melanin_ref_desc": { en: "State-wise spectrophotometric melanin data for prosthetic shade matching.", hi: "प्रोस्थेटिक शेड मिलान के लिए राज्य-वार स्पेक्ट्रोफोटोमेट्रिक मेलेनिन डेटा।" },
  "AI Classification Model": { en: "AI Classification Model", hi: "AI वर्गीकरण मॉडल" },
  "ai_model_desc": { en: "Technical documentation on the swatch classification neural network.", hi: "स्वॉच वर्गीकरण न्यूरल नेटवर्क पर तकनीकी दस्तावेज़ीकरण।" },
  "Clinical Guidelines": { en: "Clinical Guidelines", hi: "नैदानिक दिशानिर्देश" },
  "clinical_guide_desc": { en: "Best practices for image capture, patient consent, and prosthetic fitting.", hi: "छवि कैप्चर, मरीज़ की सहमति और प्रोस्थेटिक फिटिंग के लिए सर्वोत्तम प्रथाएं।" },
  "Pigment Mixing Guide": { en: "Pigment Mixing Guide", hi: "पिगमेंट मिक्सिंग गाइड" },
  "pigment_guide_desc": { en: "Technovent silicone pigment ratios and mixing instructions.", hi: "टेक्नोवेंट सिलिकॉन पिगमेंट अनुपात और मिक्सिंग निर्देश।" },
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
