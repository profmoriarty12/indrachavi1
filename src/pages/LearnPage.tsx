import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, Brain, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "Understanding the Fitzpatrick Scale in the Indian Demographic",
    excerpt: "A deep-dive into how the Fitzpatrick classification applies across India's genetically diverse population, and why a single-scale approach is insufficient.",
    category: "Research",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Advancements in AI for Facial Prosthetics",
    excerpt: "How machine learning models are trained on spectrophotometric data to predict melanin indices and automate color recipe formulation.",
    category: "Technology",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Project IndraChavi: Methodology & Insights",
    excerpt: "An overview of the 98-swatch palette development, data collection across 30 states, and the clinical validation process.",
    category: "Case Study",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Silicone Pigmentation: From Lab to Patient",
    excerpt: "Step-by-step guide on how Technovent pigments are mixed using distribution percentages to achieve lifelike prosthetic color.",
    category: "Tutorial",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80",
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
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Knowledge Hub</h1>
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
                <Button variant="link" className="p-0 h-auto text-primary">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
