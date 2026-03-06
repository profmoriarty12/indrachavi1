import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, Brain, Users, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const articles = [
  {
    title: "Project IndraChavi: Methodology & Insights",
    excerpt:
      "A deep dive into the engineering and clinical framework behind Indra Chavi. This project bridges the gap between digital AI predictions and physical silicone formulations, creating a standardized, error-free pipeline for highly inclusive facial prosthetics across India's diverse demographics.",
    category: "Case Study",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    fullContent: `Facial rehabilitation following oncology resection, trauma, or congenital defects relies heavily on the aesthetic quality of silicone prostheses. Currently, shade matching is a highly subjective, manual process dependent on the artistic interpretation of the prosthodontist. This leads to inconsistencies, high failure rates, and a lack of scalable standardization, particularly across the vastly diverse skin tones of the Indian population.

Project Indra Chavi bridges the gap between digital AI predictions and physical silicone formulations. By integrating a context-aware multimodal AI framework with precision automated micro-dispensing hardware, we are creating a standardized, error-free pipeline for highly inclusive facial prosthetics.

Clinical Validation & Standard Operating Procedure (SOP): A sophisticated algorithm is only as valuable as its clinical usability. We have distilled this complex architecture into a "Plug-and-Play" Standard Operating Procedure for clinicians at PGIMER.

Through rigorous in-vivo clinical validation, the final shade match is objectively quantified using medical-grade spectrophotometry. Our empirical threshold for success requires the color difference between the patient's native skin and the AI-formulated prosthesis to fall strictly below the threshold of human visual perception (ΔE < 3), ensuring a seamless, imperceptible restoration of the patient's identity.`,
  },
  {
    title: "Silicone Pigmentation: From Lab to Patient",
    excerpt:
      "Traditional prosthetic matching relies heavily on subjective visual estimation, leading to clinical inconsistencies. Discover how our wet-to-dry regressor loop accounts for chemical polymerization shifts, ensuring the final cured silicone perfectly matches the patient's native skin.",
    category: "Tutorial",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80",
    fullContent: `One of the greatest challenges in maxillofacial prosthetics is the chemical polymerization shift. A silicone mixture that looks perfectly matched while wet will inevitably darken and shift in hue once cured (cross-linked) in the oven.

Indra Chavi solves this chemistry puzzle computationally:

Benchmarking Dataset: We utilized a massive dataset comparing wet pre-polymerization spectrometry with dry cured spectrometry.

XGBoost Solver: An XGBoost regressor loop learns the non-linear relationship of this curing delta shift.

The "Negative Bias" Recipe: The AI outputs an intentional "Negative Bias" formulation. It prescribes a wet pigment mix that is specifically calculated to be "too light," precisely compensating for the predictable darkening during thermal cross-linking.

From Lab to Patient — Automated Hardware Integration: To eliminate the final variable of human error—manual drop-by-drop mixing—the project incorporates custom hardware engineering. A precision-controlled, multi-channel dispensing machine handles high-viscosity medical silicones and base pigments (melanin browns, hemoglobin reds, carotene yellows). A proprietary API transmits the AI-generated digital volumetric ratios directly to the hardware's stepper motors, ensuring micro-gram accuracy and clinical reproducibility.`,
  },
  {
    title: "Understanding the Fitzpatrick Scale in the Indian Demographic",
    excerpt:
      "The human face is not a single hex code. India's vast genetic diversity spans Fitzpatrick Types II through VI. This article explores our decentralized data mapping of the Melanin Index across different states, highlighting the need for geographically aware clinical tools.",
    category: "Research",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    fullContent: `The human face is not a single hex code. India's vast genetic diversity spans Fitzpatrick Types II through VI, with highly variable Melanin Indices (MI) across different states and regions.

Research on skin tone in India has historically been decentralized. By aggregating findings from major dermatological surveys and genetic studies, Project Indra Chavi incorporates a geographic and demographic awareness into its core algorithm.

Standard computer vision often fails because it only "sees" pixels. Our system understands that a specific Lab* value on a patient from Punjab (predominantly Type III) carries different biological context than a similar value on a patient from Tamil Nadu (predominantly Type V-VI). This demographic grounding is essential for inclusive healthcare technology.

The 98-swatch palette development involved data collection across 30 states and clinical validation, resulting in a comprehensive representation of Indian skin tones for prosthetic matching.`,
  },
  {
    title: "Advancements in AI for Facial Prosthetics",
    excerpt:
      "Explore how Vision Transformers and U-Net segmentation map the facial landscape. By intelligently isolating healthy tissue and ignoring noise like freckles or surgical scars, multimodal AI extracts the pure biological CIE Lab* values required for seamless rehabilitation.",
    category: "Technology",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    fullContent: `Our architecture replaces the "trial-and-error" visual matching process with deterministic, mathematical precision.

Semantic Segmentation & Anatomical Zoning: Utilizing an advanced U-Net with Attention Gates, the AI maps the facial landscape into 9 distinct clinical regions (e.g., malar, frontal, nasal). It recognizes that the forehead receives more sun exposure than the neck, and cheeks hold more hemoglobin.

Targeted Feature Extraction: Instead of blindly averaging the entire face, the vision architecture intelligently isolates the specific healthy tissue adjacent to the defect. It mathematically filters out visual "noise" such as facial hair, ephelides (freckles), and cicatricial (scar) tissue to extract the pure, median biological CIE Lab* value.

Multimodal Context Fusion: The vision data is simultaneously processed alongside a Large Language Model (LLM) framework that ingests clinical context from the Case Record Form (CRF)—including patient age, etiology (e.g., radiation hyperpigmentation vs. natural melanin), and region of origin. The Fusion Hub synthesizes these dual streams for highly nuanced shade predictions.`,
  },
];

const resources = [
  {
    icon: <FlaskConical className="h-7 w-7 text-primary" />,
    title: "Melanin Index Reference",
    description: "State-wise spectrophotometric melanin data for prosthetic shade matching.",
  },
  {
    icon: <Brain className="h-7 w-7 text-accent" />,
    title: "AI Classification Model",
    description: "Technical documentation on the swatch classification neural network.",
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    title: "Clinical Guidelines",
    description: "Best practices for image capture, patient consent, and prosthetic fitting.",
  },
  {
    icon: <BookOpen className="h-7 w-7 text-accent" />,
    title: "Pigment Mixing Guide",
    description: "Technovent silicone pigment ratios and mixing instructions.",
  },
];

const LearnPage = () => {
  const { t } = useI18n();
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t("Knowledge Hub")}</h1>
        <p className="text-muted-foreground max-w-2xl">
          Resources, research, and tutorials on facial prosthetic color science and Indian demographic skin tone data.
        </p>
      </motion.div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {resources.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-3">{r.icon}</div>
                <h3 className="font-display font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Articles */}
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {articles.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="overflow-hidden h-48">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardContent className="pt-4">
                <div className="flex gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{a.category}</span>
                  <span className="text-xs text-muted-foreground">{a.readTime}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setSelectedArticle(a)}>
                  {t("Read More")} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-48 object-cover rounded-t-xl" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{selectedArticle.category}</span>
                  <span className="text-xs text-muted-foreground">{selectedArticle.readTime}</span>
                </div>
                <h2 className="text-xl font-display font-bold text-foreground mb-4">{selectedArticle.title}</h2>
                <div className="prose prose-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {selectedArticle.fullContent}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearnPage;
