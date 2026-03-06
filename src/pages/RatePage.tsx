import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RatePage = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Rate Your Experience</h1>
        <p className="text-muted-foreground">Help us improve IndraChavi for clinicians across India.</p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        {isSubmitted ? (
          <Card>
            <CardContent className="pt-8 text-center">
              <ThumbsUp className="h-12 w-12 text-accent mx-auto mb-3" />
              <h2 className="text-xl font-display font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-sm text-muted-foreground mb-4">Your feedback has been recorded.</p>
              <Button variant="outline" onClick={() => { setIsSubmitted(false); setRating(null); setFeedback(""); }}>
                Submit Another
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader><CardTitle className="text-center font-display">Share Your Feedback</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <Label className="mb-3 block">Overall Experience</Label>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHover(s)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <Star
                          size={36}
                          className={`transition-colors ${
                            (hover !== null ? s <= hover : s <= (rating || 0))
                              ? "fill-primary text-primary"
                              : "text-border"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Comments (optional)</Label>
                  <Textarea rows={4} placeholder="Tell us what you think…" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={!rating}>
                  <Send className="mr-2 h-4 w-4" /> Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RatePage;
