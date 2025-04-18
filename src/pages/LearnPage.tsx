
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Stethoscope, Brain, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LearnPage = () => {
  const resources = [
    {
      title: "Understanding Skin Types",
      description: "Learn about different skin types, characteristics, and how to identify your own skin type.",
      icon: <Stethoscope className="h-8 w-8 text-epitone-purple" />,
      link: "#understanding-skin-types"
    },
    {
      title: "The Science of Skin Tone",
      description: "Explore the biological factors that determine skin tone and how they affect skin health.",
      icon: <Brain className="h-8 w-8 text-epitone-purple" />,
      link: "#science-of-skin-tone"
    },
    {
      title: "Skincare Essentials",
      description: "Discover the fundamental skincare practices everyone should follow for healthy skin.",
      icon: <Zap className="h-8 w-8 text-epitone-purple" />,
      link: "#skincare-essentials"
    },
    {
      title: "Dermatologist Insights",
      description: "Expert advice from leading dermatologists on maintaining optimal skin health.",
      icon: <Award className="h-8 w-8 text-epitone-purple" />,
      link: "#dermatologist-insights"
    }
  ];

  const articles = [
    {
      title: "The Role of Melanin in Skin Protection",
      category: "Science",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "How to Choose the Right Sunscreen for Your Skin Type",
      category: "Skincare",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Understanding Hyperpigmentation and Treatment Options",
      category: "Treatment",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Nutrition and Its Impact on Skin Health",
      category: "Wellness",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
        <h1 className="text-4xl font-bold text-epitone-darkPurple mb-4">Learn About Skin Health</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the science behind skin tone, effective skincare practices, and expert insights to help you maintain healthy, radiant skin.
        </p>
      </motion.div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for articles, topics, or questions..."
            className="w-full px-6 py-4 rounded-full border border-epitone-softPurple focus:outline-none focus:ring-2 focus:ring-epitone-purple"
          />
          <Button className="absolute right-2 top-2 rounded-full bg-epitone-purple hover:bg-epitone-purple/80 h-10 w-10 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Learning Resources */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-epitone-darkPurple mb-8 text-center">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border-epitone-softPurple hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="mb-4">{resource.icon}</div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {resource.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link 
                    to={resource.link} 
                    className="text-epitone-purple hover:text-epitone-purple/80 flex items-center text-sm font-medium"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-epitone-darkPurple mb-8 text-center">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-t-lg">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="bg-white p-5 border-x border-b border-epitone-softPurple rounded-b-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-epitone-softPurple text-epitone-purple rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-medium mb-3">{article.title}</h3>
                <Link 
                  to="#" 
                  className="text-epitone-purple hover:text-epitone-purple/80 flex items-center text-sm font-medium"
                >
                  Read article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" className="border-epitone-purple text-epitone-purple hover:bg-epitone-softPurple/50">
            View All Articles
          </Button>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-epitone-softPurple to-epitone-softPeach rounded-xl p-8 text-center"
      >
        <BookOpen className="h-12 w-12 text-epitone-purple mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-epitone-darkPurple mb-3">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Stay updated with the latest articles, research findings, and skincare tips delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-2 rounded-md border border-epitone-softPurple focus:outline-none focus:ring-2 focus:ring-epitone-purple"
          />
          <Button className="bg-epitone-purple hover:bg-epitone-purple/80">
            Subscribe
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LearnPage;
