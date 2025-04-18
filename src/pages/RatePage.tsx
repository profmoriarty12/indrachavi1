
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RatePage = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const experiences = [
    { id: "ui", label: "User Interface" },
    { id: "accuracy", label: "Analysis Accuracy" },
    { id: "speed", label: "Processing Speed" },
    { id: "features", label: "Available Features" },
    { id: "reporting", label: "Report Generation" },
    { id: "support", label: "Customer Support" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value);
  };
  
  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Dermatologist",
      rating: 5,
      comment: "EpiTone has revolutionized how I approach patient consultations. The accuracy of the skin tone analysis is impressive, and the detailed reports help me provide more personalized care.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Michael Chen",
      role: "Medical Student",
      rating: 4,
      comment: "I've been using EpiTone for my research in dermatology, and it's been an invaluable tool. The interface is intuitive, and the analysis results are consistent with clinical observations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Priya Patel",
      role: "Skincare Specialist",
      rating: 5,
      comment: "My clients love the personalized recommendations from EpiTone. The ability to track changes over time has made it easier to demonstrate the effectiveness of treatments.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-epitone-darkPurple mb-4">Rate Your Experience</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Your feedback helps us improve EpiTone's skin analysis technology and provide a better experience for all users.
        </p>
      </motion.div>
      
      <div className="max-w-4xl mx-auto">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-epitone-softPurple rounded-lg p-8 text-center"
          >
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="h-10 w-10 text-epitone-purple" />
            </div>
            <h2 className="text-2xl font-bold text-epitone-darkPurple mb-3">Thank You for Your Feedback!</h2>
            <p className="text-gray-700 mb-6">
              Your rating and comments have been submitted successfully. We appreciate your input and will use it to improve our services.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setRating(null);
                setFeedback("");
                setSelectedExperience(null);
              }}
              className="bg-epitone-purple hover:bg-epitone-purple/80"
            >
              Submit Another Rating
            </Button>
          </motion.div>
        ) : (
          <Card className="border-epitone-softPurple">
            <CardHeader>
              <CardTitle className="text-center text-epitone-darkPurple">Share Your Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">How would you rate your overall experience?</Label>
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(null)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={40}
                            className={`transition-colors ${
                              (hover !== null ? star <= hover : star <= (rating || 0))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">Which aspect of EpiTone impressed you the most?</Label>
                  <RadioGroup value={selectedExperience || ""} onValueChange={handleExperienceChange}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={exp.id} id={exp.id} />
                          <Label htmlFor={exp.id} className="cursor-pointer">{exp.label}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="feedback" className="text-base">Tell us about your experience (optional)</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, suggestions, or any issues you encountered..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-epitone-purple hover:bg-epitone-purple/80"
                  disabled={isSubmitting || !rating}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-epitone-darkPurple mb-8 text-center">What Others Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              >
                <Card className="h-full border-epitone-softPurple">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full object-cover mr-4" 
                      />
                      <div>
                        <h3 className="font-medium text-epitone-darkPurple">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-epitone-softPurple to-epitone-softPeach rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-epitone-darkPurple mb-3">Ready to Experience EpiTone?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Try our advanced skin tone analysis technology today and discover personalized insights for healthier skin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-epitone-purple hover:bg-epitone-purple/80">
              Start Skin Analysis
            </Button>
            <Button variant="outline" className="border-epitone-purple text-epitone-purple hover:bg-epitone-softPurple/50">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RatePage;
