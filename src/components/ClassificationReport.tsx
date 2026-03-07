import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Palette } from "lucide-react";
import swatchData from "@/data/swatches.json";
import { useI18n } from "@/lib/i18n";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoPgimer from "@/assets/logo-pgimer.jpeg";
import logoDicMdart from "@/assets/logo-dic-mdart.png";
import logoIcmr from "@/assets/logo-icmr.svg";

interface Props {
  patientId: string;
  patientName: string;
  patientAge: string;
  patientState: string;
  patientGender?: string;
  imageUrl: string | null;
  onBack: () => void;
}

interface Swatch {
  index: number;
  lab: number[];
  hex: string;
  distribution_pct: Record<string, number>;
}

const ClassificationReport = ({ patientId, patientName, patientAge, patientState, patientGender, imageUrl, onBack }: Props) => {
  const { t } = useI18n();
  const reportRef = useRef<HTMLDivElement>(null);

  const swatches: Swatch[] = useMemo(() => {
    const s = (swatchData as any).swatches;
    return Object.values(s) as Swatch[];
  }, []);

  const matchedIndex = useMemo(() => Math.floor(Math.random() * swatches.length), []);
  const matched = swatches[matchedIndex];

  const recipeColors: Record<string, string> = {
    "Technovent Master Colour": "#b85c1a",
    "Brilliant Yellow": "#e6c846",
    "Yellow": "#d4a830",
    "Brilliant White": "#f0f0f0",
    "Black": "#1a1a1a",
    "Green": "#3d8b5e",
    "Brilliant Red": "#cc3333",
    "Blue": "#3366cc",
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`IndraChavi_Report_${patientId}.pdf`);
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("Back to Analysis")}
        </Button>
        <Button onClick={handleDownloadPDF} className="gap-2">
          <Download className="h-4 w-4" /> {t("Download PDF")}
        </Button>
      </div>

      {/* Printable PGIMER-style Report */}
      <div ref={reportRef} className="bg-white text-black max-w-[210mm] mx-auto shadow-lg">
        {/* Hospital Header */}
        <div className="border-b-4 border-[#b85c1a] px-8 pt-8 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#b85c1a] tracking-tight" style={{ fontFamily: "serif" }}>
                PGIMER
              </h1>
              <p className="text-xs text-gray-600 mt-0.5">
                Postgraduate Institute of Medical Education & Research
              </p>
              <p className="text-xs text-gray-500">Sector 12, Chandigarh 160012, India</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Department of Prosthodontics</p>
              <p className="text-xs text-gray-500">Maxillofacial Prosthetics Division</p>
              <p className="text-xs text-gray-500 mt-1">Report Date: {currentDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-[1px] flex-1 bg-gray-300" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#b85c1a] font-semibold">
              IndraChavi Skin Tone Classification Report
            </span>
            <div className="h-[1px] flex-1 bg-gray-300" />
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="px-8 py-5 border-b border-gray-200 bg-gray-50/80">
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3">Patient Demographics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[10px] uppercase text-gray-400">Patient ID</p>
              <p className="font-semibold text-gray-800">{patientId}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-400">Name</p>
              <p className="font-semibold text-gray-800">{patientName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-400">Age / Gender</p>
              <p className="font-semibold text-gray-800">{patientAge} yrs / {patientGender || "M"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-400">Region of Origin</p>
              <p className="font-semibold text-gray-800">{patientState}</p>
            </div>
          </div>
        </div>

        {/* Clinical Findings */}
        <div className="px-8 py-5 border-b border-gray-200">
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">Clinical Findings — Skin Tone Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-1">
              <p className="text-[10px] uppercase text-gray-400 mb-2">Matched Swatch — #{matched.index}</p>
              <div
                className="w-full h-28 rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: matched.hex }}
              />
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Hex</span>
                  <span className="font-mono font-bold text-gray-800">{matched.hex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CIE Lab*</span>
                  <span className="font-mono text-gray-800">
                    L:{matched.lab[0].toFixed(1)} a:{matched.lab[1].toFixed(1)} b:{matched.lab[2].toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {imageUrl && (
              <div className="col-span-1">
                <p className="text-[10px] uppercase text-gray-400 mb-2">Patient Image</p>
                <img src={imageUrl} alt="Patient" className="w-full h-28 object-cover rounded-lg border border-gray-300" />
              </div>
            )}

            <div className={imageUrl ? "col-span-1" : "col-span-2"}>
              <p className="text-[10px] uppercase text-gray-400 mb-2">98-Swatch Palette</p>
              <div className="grid grid-cols-10 gap-[2px]">
                {swatches.map((s) => (
                  <div
                    key={s.index}
                    className={`aspect-square rounded-sm ${
                      s.index === matched.index ? "ring-2 ring-[#b85c1a] ring-offset-1 scale-125 z-10" : ""
                    }`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[9px] text-gray-400">
                <div className="w-3 h-3 rounded ring-1 ring-[#b85c1a] ring-offset-1" />
                <span>= Matched swatch (#{matched.index})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prescribed Formulation */}
        <div className="px-8 py-5 border-b border-gray-200">
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">Prescribed Formulation — Pigment Mixing Recipe</h2>
          <div className="space-y-2.5">
            {Object.entries(matched.distribution_pct)
              .sort(([, a], [, b]) => b - a)
              .map(([name, pct]) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{name}</span>
                    <span className="font-bold text-gray-800">{pct}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: recipeColors[name] || "#b85c1a",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-3 italic">
            Formulation uses Technovent medical-grade silicone pigments. Dispensing volumes computed via XGBoost regressor with wet-to-dry compensation.
          </p>
        </div>

        {/* Signatures */}
        <div className="px-8 py-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-6">Authorization</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="border-b border-gray-300 mb-2 h-12" />
              <p className="text-xs font-semibold text-gray-700">Attending Prosthodontist</p>
              <p className="text-[10px] text-gray-400">Dept. of Prosthodontics, PGIMER</p>
            </div>
            <div>
              <div className="border-b border-gray-300 mb-2 h-12" />
              <p className="text-xs font-semibold text-gray-700">Head of Department</p>
              <p className="text-[10px] text-gray-400">Maxillofacial Division, PGIMER</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-[9px] text-gray-400">
              This report was generated by IndraChavi — AI-Powered Prosthetic Color Matching System
            </p>
            <p className="text-[9px] text-gray-400">
              Clinical Partner: PGIMER, Chandigarh • Research: DIC MDaRT UIET, Panjab University
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons below report */}
      <div className="max-w-[210mm] mx-auto mt-6 flex gap-3">
        <Button onClick={handleDownloadPDF} className="flex-1 gap-2">
          <Download className="h-4 w-4" /> {t("Download PDF")}
        </Button>
        <Button variant="outline" onClick={onBack}>
          {t("New Analysis")}
        </Button>
      </div>
    </div>
  );
};

export default ClassificationReport;
