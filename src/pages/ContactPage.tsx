
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiry: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        inquiry: "",
        message: ""
      });
      
      // Reset the success message after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const locations = [
    {
      name: "Boston Medical Center",
      address: "123 Medical Center Dr, Boston, MA 02115",
      email: "boston@epitone-health.com",
      phone: "+1 (800) 123-4567",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM"
    },
    {
      name: "San Francisco Health Lab",
      address: "456 Health Science Blvd, San Francisco, CA 94143",
      email: "sf@epitone-health.com",
      phone: "+1 (800) 234-5678",
      hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-3PM"
    },
    {
      name: "Houston Research Center",
      address: "789 Research Parkway, Houston, TX 77030",
      email: "houston@epitone-health.com",
      phone: "+1 (800) 345-6789",
      hours: "Mon-Fri: 8AM-7PM"
    }
  ];
  
  const faqs = [
    {
      question: "How accurate is EpiTone's skin analysis?",
      answer: "EpiTone's skin analysis is highly accurate, utilizing advanced AI algorithms trained on diverse datasets. Our system provides analysis with 95% accuracy compared to dermatologist assessments."
    },
    {
      question: "Can I use EpiTone if I have a skin condition?",
      answer: "Yes, EpiTone can still be used if you have skin conditions. However, please note that our tool is designed for skin tone analysis and not as a diagnostic tool for skin conditions. Always consult with a healthcare professional for medical advice."
    },
    {
      question: "How often should I perform a skin analysis?",
      answer: "For optimal tracking of your skin health, we recommend performing a skin analysis once a month. However, if you're using new skincare products or treatments, you may want to analyze more frequently to track changes."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. At EpiTone, we take your privacy seriously. All photos and data are encrypted and securely stored. Your information is never shared with third parties without your explicit consent, and you can request deletion of your data at any time."
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
        <h1 className="text-4xl font-bold text-epitone-darkPurple mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions or feedback? Our team is here to help you with any inquiries about our skin tone analysis technology.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-epitone-softPurple">
            <CardContent className="pt-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-epitone-purple mr-3" />
                <h2 className="text-2xl font-semibold text-epitone-darkPurple">Send a Message</h2>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                >
                  <div className="bg-green-100 text-green-700 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-green-800 mb-1">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="How can we help you?" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inquiry">Type of Inquiry</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("inquiry", value)}
                      value={formData.inquiry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Please share the details of your inquiry..." 
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-epitone-purple hover:bg-epitone-purple/80"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-epitone-softPurple to-epitone-softPeach p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-epitone-darkPurple mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-epitone-purple mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-epitone-darkPurple">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:contact@epitone-health.com" className="hover:text-epitone-purple">
                      contact@epitone-health.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-epitone-purple mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-epitone-darkPurple">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+18001234567" className="hover:text-epitone-purple">
                      +1 (800) 123-4567
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-epitone-purple mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-epitone-darkPurple">Support Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 5PM EST</p>
                  <p className="text-gray-600">Saturday: 10AM - 2PM EST</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-epitone-darkPurple mt-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                className="border border-epitone-softPurple rounded-lg p-4"
              >
                <h3 className="font-medium text-epitone-darkPurple mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Lab Locations */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-epitone-darkPurple">Our Laboratory Locations</h2>
          <p className="text-gray-600">Visit one of our advanced skin analysis laboratories for in-person consultations.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
            >
              <Card className="h-full border-epitone-softPurple">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl text-epitone-darkPurple mb-4">{location.name}</h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-epitone-purple mr-3 shrink-0" />
                      <span className="text-gray-600">{location.address}</span>
                    </div>
                    <div className="flex">
                      <Mail className="h-5 w-5 text-epitone-purple mr-3 shrink-0" />
                      <a href={`mailto:${location.email}`} className="text-gray-600 hover:text-epitone-purple">
                        {location.email}
                      </a>
                    </div>
                    <div className="flex">
                      <Phone className="h-5 w-5 text-epitone-purple mr-3 shrink-0" />
                      <a href={`tel:${location.phone.replace(/\D/g, '')}`} className="text-gray-600 hover:text-epitone-purple">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex">
                      <Clock className="h-5 w-5 text-epitone-purple mr-3 shrink-0" />
                      <span className="text-gray-600">{location.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
