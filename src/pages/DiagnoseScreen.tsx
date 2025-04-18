
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Scan, Activity, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const DiagnoseScreen = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFaceDetected(true); // In a real app, you'd run face detection here
    }
  };
  
  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        
        // In a real app, you'd implement face detection here
        setTimeout(() => {
          setFaceDetected(true);
        }, 2000);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };
  
  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setSelectedImage(imageUrl);
        
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setIsCameraActive(false);
      }
    }
  };
  
  // Analyze skin tone
  const analyzeSkinTone = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis (in a real app, you'd call your backend API)
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisResults({
        skinTone: "Medium",
        undertone: "Warm",
        hydration: "74%",
        sensitivity: "Moderate",
        recommendations: [
          "Use SPF 30+ sunscreen daily",
          "Hydrating serums with hyaluronic acid",
          "Vitamin C for brightening",
          "Gentle exfoliation 2x weekly"
        ]
      });
    }, 3000);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-epitone-darkPurple mb-4">Skin Tone Analysis</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Upload or capture an image for AI-powered skin tone analysis and personalized recommendations.
        </p>
      </motion.div>
      
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="upload" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload" className="text-lg py-3">
              <Upload className="mr-2 h-5 w-5" /> Upload Image
            </TabsTrigger>
            <TabsTrigger value="camera" className="text-lg py-3">
              <Camera className="mr-2 h-5 w-5" /> Use Camera
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-epitone-softPurple">
            <TabsContent value="upload" className="p-6">
              {!selectedImage ? (
                <div className="text-center">
                  <div 
                    className="border-2 border-dashed border-epitone-softPurple rounded-lg p-12 cursor-pointer hover:bg-epitone-softPurple/20 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-16 w-16 text-epitone-purple mb-4" />
                    <h3 className="text-xl font-medium mb-2">Upload your photo</h3>
                    <p className="text-gray-500">Click to browse or drag and drop</p>
                    <p className="text-gray-400 text-sm mt-1">Supports JPG, PNG (max 10MB)</p>
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6 relative mx-auto max-w-md">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded image" 
                      className="rounded-lg mx-auto max-h-[400px] border border-epitone-softPurple"
                    />
                    {faceDetected && !isAnalyzing && !analysisComplete && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full border-2 border-epitone-purple w-32 h-32 animate-pulse-gentle"></div>
                      </div>
                    )}
                  </div>
                  
                  {!analysisComplete ? (
                    <div>
                      {faceDetected ? (
                        <Button 
                          size="lg" 
                          className="bg-epitone-purple hover:bg-epitone-purple/80"
                          onClick={analyzeSkinTone}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Activity className="mr-2 h-5 w-5 animate-pulse" /> 
                              Analyzing Skin Tone...
                            </>
                          ) : (
                            <>
                              <Scan className="mr-2 h-5 w-5" /> 
                              Analyze Skin Tone
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="text-center text-amber-600 flex items-center justify-center">
                          <AlertTriangle className="mr-2 h-5 w-5" />
                          <span>Position your face properly in the frame</span>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="mt-4 ml-2"
                        onClick={() => setSelectedImage(null)}
                      >
                        Upload Different Image
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <h3 className="text-2xl font-bold text-epitone-darkPurple mb-4">
                        Analysis Results
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Skin Tone</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.skinTone}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Undertone</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.undertone}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Hydration Level</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.hydration}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Sensitivity</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.sensitivity}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <h4 className="font-medium text-gray-500 mb-3">Recommendations</h4>
                          <ul className="space-y-2">
                            {analysisResults.recommendations.map((rec: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <div className="bg-epitone-softPurple text-epitone-purple rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-0.5">
                                  {i + 1}
                                </div>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <div className="mt-6 space-x-3">
                        <Button 
                          className="bg-epitone-orange hover:bg-epitone-orange/80"
                        >
                          Generate PDF Report
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedImage(null);
                            setAnalysisComplete(false);
                            setAnalysisResults(null);
                          }}
                        >
                          Start New Analysis
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="camera" className="p-6">
              {!isCameraActive && !selectedImage ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-epitone-softPurple rounded-lg p-12">
                    <Camera className="mx-auto h-16 w-16 text-epitone-purple mb-4" />
                    <h3 className="text-xl font-medium mb-2">Use your camera</h3>
                    <p className="text-gray-500 mb-6">Take a photo for skin tone analysis</p>
                    <Button 
                      size="lg" 
                      className="bg-epitone-purple hover:bg-epitone-purple/80"
                      onClick={startCamera}
                    >
                      Start Camera
                    </Button>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="text-center">
                  <div className="mb-6 relative mx-auto max-w-md">
                    <img 
                      src={selectedImage} 
                      alt="Captured image" 
                      className="rounded-lg mx-auto max-h-[400px] border border-epitone-softPurple"
                    />
                    {faceDetected && !isAnalyzing && !analysisComplete && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full border-2 border-epitone-purple w-32 h-32 animate-pulse-gentle"></div>
                      </div>
                    )}
                  </div>
                  
                  {!analysisComplete ? (
                    <div>
                      {faceDetected ? (
                        <Button 
                          size="lg" 
                          className="bg-epitone-purple hover:bg-epitone-purple/80"
                          onClick={analyzeSkinTone}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Activity className="mr-2 h-5 w-5 animate-pulse" /> 
                              Analyzing Skin Tone...
                            </>
                          ) : (
                            <>
                              <Scan className="mr-2 h-5 w-5" /> 
                              Analyze Skin Tone
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="text-center text-amber-600 flex items-center justify-center">
                          <AlertTriangle className="mr-2 h-5 w-5" />
                          <span>Position your face properly in the frame</span>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="mt-4 ml-2"
                        onClick={() => {
                          setSelectedImage(null);
                          setIsCameraActive(true);
                          startCamera();
                        }}
                      >
                        Take Another Photo
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <h3 className="text-2xl font-bold text-epitone-darkPurple mb-4">
                        Analysis Results
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Skin Tone</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.skinTone}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Undertone</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.undertone}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Hydration Level</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.hydration}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium text-gray-500 mb-2">Sensitivity</h4>
                            <p className="text-xl font-bold text-epitone-darkPurple">{analysisResults.sensitivity}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <h4 className="font-medium text-gray-500 mb-3">Recommendations</h4>
                          <ul className="space-y-2">
                            {analysisResults.recommendations.map((rec: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <div className="bg-epitone-softPurple text-epitone-purple rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-0.5">
                                  {i + 1}
                                </div>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <div className="mt-6 space-x-3">
                        <Button 
                          className="bg-epitone-orange hover:bg-epitone-orange/80"
                        >
                          Generate PDF Report
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedImage(null);
                            setAnalysisComplete(false);
                            setAnalysisResults(null);
                          }}
                        >
                          Start New Analysis
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="relative mx-auto max-w-md mb-6">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="rounded-lg w-full border border-epitone-softPurple"
                    />
                    
                    {/* Face detection guide overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`rounded-full border-2 ${faceDetected ? 'border-green-500' : 'border-epitone-orange'} w-64 h-64 ${faceDetected ? 'animate-pulse-gentle' : ''}`}></div>
                      
                      {!faceDetected && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <div className="inline-block bg-epitone-orange/80 text-white px-3 py-1 rounded-full text-sm">
                            Position your face in the circle
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="bg-epitone-purple hover:bg-epitone-purple/80"
                    onClick={captureImage}
                    disabled={!faceDetected}
                  >
                    Capture Image
                  </Button>
                  
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DiagnoseScreen;
