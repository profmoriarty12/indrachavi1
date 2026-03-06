import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Check, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";

const partners = [
  {
    name: "PGIMER",
    full: "Postgraduate Institute of Medical Education & Research",
    address: "Sector 12, Chandigarh 160012",
    email: "pgimer@indrachavi.in",
    phone: "+91 172 275 6565",
  },
  {
    name: "DIC MDaRT UIET, Panjab University",
    full: "Design Innovation Centre, University Institute of Engineering & Technology",
    address: "Sector 25, Chandigarh 160014",
    email: "dic.mdart@pu.ac.in",
    phone: "+91 172 253 4818",
  },
];

const ContactPage = () => {
  const { t } = useI18n();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t("Contact")}</h1>
        <p className="text-muted-foreground">{t("contact_subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
        <Card>
          <CardContent className="pt-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{t("Message Sent")}</h3>
                <p className="text-sm text-muted-foreground">{t("response_time")}</p>
                <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>{t("Send Another")}</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>{t("Name")}</Label><Input placeholder="Dr. Name" required /></div>
                  <div className="space-y-2"><Label>{t("Email")}</Label><Input type="email" placeholder="doctor@hospital.in" required /></div>
                </div>
                <div className="space-y-2"><Label>{t("Subject")}</Label><Input placeholder="Inquiry about…" required /></div>
                <div className="space-y-2"><Label>{t("Message")}</Label><Textarea rows={5} placeholder="Your message…" required /></div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("Sending") : <><Send className="mr-2 h-4 w-4" /> {t("Send Message")}</>}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="bg-primary/5 rounded-lg p-5">
            <h3 className="font-display font-semibold text-foreground mb-3">{t("Get in Touch")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2"><Mail className="h-4 w-4 text-primary mt-0.5" /><span className="text-muted-foreground">research@indrachavi.in</span></div>
              <div className="flex gap-2"><Phone className="h-4 w-4 text-primary mt-0.5" /><span className="text-muted-foreground">+91 172 275 6565</span></div>
              <div className="flex gap-2"><Clock className="h-4 w-4 text-primary mt-0.5" /><span className="text-muted-foreground">Mon–Fri: 9AM–5PM IST</span></div>
            </div>
          </div>

          <h3 className="font-display font-semibold text-foreground pt-2">{t("Institutional Partners")}</h3>
          {partners.map((l, i) => (
            <Card key={i}>
              <CardContent className="pt-4 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary shrink-0" />
                  <h4 className="font-semibold text-foreground">{l.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground pl-6">{l.full}</p>
                <div className="flex gap-2 pl-6"><MapPin className="h-4 w-4 text-primary shrink-0" /><span className="text-muted-foreground">{l.address}</span></div>
                <div className="flex gap-2 pl-6"><Mail className="h-4 w-4 text-primary shrink-0" /><span className="text-muted-foreground">{l.email}</span></div>
                <div className="flex gap-2 pl-6"><Phone className="h-4 w-4 text-primary shrink-0" /><span className="text-muted-foreground">{l.phone}</span></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
