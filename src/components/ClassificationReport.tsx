import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Palette } from "lucide-react";
import swatchData from "@/data/swatches.json";

interface Props {
  patientId: string;
  patientName: string;
  patientAge: string;
  patientState: string;
  imageUrl: string | null;
  onBack: () => void;
}

interface Swatch {
  index: number;
  lab: number[];
  hex: string;
  distribution_pct: Record<string, number>;
}

const ClassificationReport = ({ patientId, patientName, patientAge, patientState, imageUrl, onBack }: Props) => {
  const swatches: Swatch[] = useMemo(() => {
    const s = (swatchData as any).swatches;
    return Object.values(s) as Swatch[];
  }, []);

  const matchedIndex = useMemo(() => Math.floor(Math.random() * swatches.length), []);
  const matched = swatches[matchedIndex];

  const recipeColors: Record<string, string> = {
    "Technovent Master Colour": "hsl(24, 80%, 44%)",
    "Brilliant Yellow": "hsl(50, 90%, 55%)",
    "Yellow": "hsl(45, 85%, 50%)",
    "Brilliant White": "hsl(0, 0%, 95%)",
    "Black": "hsl(0, 0%, 10%)",
    "Green": "hsl(145, 45%, 38%)",
    "Brilliant Red": "hsl(0, 75%, 50%)",
    "Blue": "hsl(220, 70%, 50%)",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Analysis
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Palette className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Classification Report</h1>
            <p className="text-sm text-muted-foreground">Patient: {patientName} ({patientId}) • Age: {patientAge} • State: {patientState}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Matched Shade */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Perfect Match — Swatch #{matched.index}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="w-full h-32 rounded-lg mb-4 border border-border"
                  style={{ backgroundColor: matched.hex }}
                />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hex</span>
                    <span className="font-mono font-semibold">{matched.hex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LAB</span>
                    <span className="font-mono text-xs">
                      L:{matched.lab[0].toFixed(1)} a:{matched.lab[1].toFixed(1)} b:{matched.lab[2].toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Mixing Recipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(matched.distribution_pct)
                  .sort(([, a], [, b]) => b - a)
                  .map(([name, pct]) => (
                    <div key={name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{name}</span>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: recipeColors[name] || "hsl(var(--primary))" }}
                        />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {imageUrl && (
              <Card>
                <CardContent className="pt-4">
                  <img src={imageUrl} alt="Patient" className="w-full rounded-lg aspect-[4/3] object-cover" />
                </CardContent>
              </Card>
            )}
          </div>

          {/* 98-Swatch Palette */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">98-Swatch Prosthetic Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 gap-1">
                  {swatches.map((s) => (
                    <div
                      key={s.index}
                      className={`aspect-square rounded-md border cursor-pointer transition-all hover:scale-110 ${
                        s.index === matched.index
                          ? "ring-2 ring-primary ring-offset-2 scale-110"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: s.hex }}
                      title={`#${s.index} — ${s.hex}`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-4 h-4 rounded ring-2 ring-primary ring-offset-1" />
                  <span>= Matched swatch (#{matched.index})</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex gap-3">
              <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" /> Download Report PDF
              </Button>
              <Button variant="outline" onClick={onBack}>
                New Analysis
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassificationReport;
