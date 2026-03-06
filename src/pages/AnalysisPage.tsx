import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Activity, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stateData } from "@/data/indiaStates";
import ClassificationReport from "@/components/ClassificationReport";
import { useI18n } from "@/lib/i18n";

const AnalysisPage = () => {
  const { t } = useI18n();
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientState, setPatientState] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext("2d")?.drawImage(v, 0, 0);
      setSelectedImage(c.toDataURL("image/png"));
      const stream = v.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
      setIsCameraActive(false);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowReport(true);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  if (showReport) {
    return (
      <ClassificationReport
        patientId={patientId || "IC-001"}
        patientName={patientName || "Patient"}
        patientAge={patientAge || "30"}
        patientState={patientState || "MH"}
        imageUrl={selectedImage}
        onBack={() => {
          setShowReport(false);
          setSelectedImage(null);
          setIsAnalyzing(false);
        }}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t("New Patient Analysis")}</h1>
        <p className="text-muted-foreground">{t("analysis_subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> {t("Patient Details")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pid">{t("Patient ID")}</Label>
                <Input id="pid" placeholder="IC-001" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">{t("Age")}</Label>
                <Input id="age" type="number" placeholder="30" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">{t("Full Name")}</Label>
              <Input id="name" placeholder={t("Patient name")} value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t("State")}</Label>
              <Select value={patientState} onValueChange={setPatientState}>
                <SelectTrigger><SelectValue placeholder={t("Select state")} /></SelectTrigger>
                <SelectContent>
                  {stateData.map((s) => (
                    <SelectItem key={s.abbr} value={s.abbr}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" /> {t("Image Capture")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedImage && !isCameraActive ? (
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium text-foreground">{t("Upload Image")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("upload_hint")}</p>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileChange} />
                </button>
                <Button onClick={startCamera} variant="outline" className="w-full" size="lg">
                  <Camera className="mr-2 h-5 w-5" /> {t("Open Camera")}
                </Button>
              </div>
            ) : isCameraActive ? (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-[4/3]">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-60 border-2 border-white/50 rounded-[50%] animate-pulse-gentle" />
                  </div>
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {t("align_face")}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={captureImage} className="flex-1" size="lg">
                    <Camera className="mr-2 h-5 w-5" /> {t("Capture")}
                  </Button>
                  <Button
                    onClick={() => {
                      const stream = videoRef.current?.srcObject as MediaStream;
                      stream?.getTracks().forEach((t) => t.stop());
                      setIsCameraActive(false);
                    }}
                    variant="outline"
                  >
                    {t("Cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <img src={selectedImage!} alt="Patient" className="w-full rounded-lg aspect-[4/3] object-cover border border-border" />
                <div className="flex gap-3">
                  <Button onClick={handleAnalyze} className="flex-1" size="lg" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <><Activity className="mr-2 h-5 w-5 animate-pulse" /> {t("Analyzing")}</>
                    ) : (
                      t("Analyze & Generate Recipe")
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedImage(null)}>
                    {t("Retake")}
                  </Button>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisPage;
