import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Camera, FileText, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const { t } = useI18n();

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: t("India Demographic Map"),
      description: t("map_feature_desc"),
      link: "/dashboard",
    },
    {
      icon: <Camera className="h-8 w-8 text-accent" />,
      title: t("Skin Tone Analysis"),
      description: t("analysis_feature_desc"),
      link: "/analysis",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: t("Patient Records"),
      description: t("records_feature_desc"),
      link: "/records",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-accent" />,
      title: t("Knowledge Hub"),
      description: t("knowledge_feature_desc"),
      link: "/learn",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ic-cream via-background to-ic-warm">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                {t("For Indian Clinicians")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                {t("hero_title_1")}{" "}
                <span className="text-primary">{t("hero_title_2")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl font-body">
                {t("hero_description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link to="/analysis">
                    {t("Start Analysis")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">
                    {t("View India Map")}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 flex">
          {["#e4e2e0","#cfcbc6","#ccbfaf","#cfb79c","#c5b0a1","#c5a899","#bea995","#ce9f81","#bea27f","#c59d8c","#b0946e","#a08264","#8b6e52","#755a42","#604a36","#503c2c"].map((c,i)=>(
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              {t("Clinical Tools, Simplified")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("tools_subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={f.link}
                  className="block p-6 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all h-full"
                >
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            {t("cta_title")}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t("cta_subtitle")}
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">
              {t("Create Free Account")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
