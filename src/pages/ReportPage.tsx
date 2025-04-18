
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Filter, Calendar, Clock, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ReportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample report data
  const reports = [
    {
      id: "REP-001",
      title: "Skin Tone Analysis Results",
      date: "2025-04-15",
      time: "14:30",
      type: "Skin Analysis",
      status: "complete"
    },
    {
      id: "REP-002",
      title: "Face Detection Report",
      date: "2025-04-10",
      time: "11:15",
      type: "Face Detection",
      status: "complete"
    },
    {
      id: "REP-003",
      title: "Monthly Skin Health Summary",
      date: "2025-04-01",
      time: "09:45",
      type: "Summary",
      status: "complete"
    },
    {
      id: "REP-004",
      title: "Treatment Recommendation",
      date: "2025-03-22",
      time: "16:00",
      type: "Recommendation",
      status: "pending"
    }
  ];
  
  // Filter reports based on search query
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-epitone-darkPurple mb-4">Your Reports</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access and manage all your skin analysis reports, diagnostics, and personalized recommendations.
        </p>
      </motion.div>
      
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="skin">Skin Analysis</TabsTrigger>
              <TabsTrigger value="face">Face Detection</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-3">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reports by title, ID, or type..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <TabsContent value="all" className="mt-0">
            {filteredReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Card className="border-epitone-softPurple h-full hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-epitone-softPurple text-epitone-purple">
                              {report.type}
                            </span>
                            <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                              report.status === 'complete' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{report.id}</span>
                        </div>
                        <CardTitle className="text-xl mt-3">{report.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(report.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{report.time}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-epitone-purple border-epitone-purple hover:bg-epitone-softPurple/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="bg-epitone-purple hover:bg-epitone-purple/80">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No reports found</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No reports match your search "${searchQuery}"`
                    : "You don't have any reports yet"
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="skin" className="mt-0">
            {/* Similar structure for filtered skin analysis reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports
                .filter(report => report.type === "Skin Analysis")
                .map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Card className="border-epitone-softPurple h-full hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-epitone-softPurple text-epitone-purple">
                            {report.type}
                          </span>
                          <span className="text-xs text-gray-500">{report.id}</span>
                        </div>
                        <CardTitle className="text-xl mt-3">{report.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(report.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{report.time}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-epitone-purple border-epitone-purple hover:bg-epitone-softPurple/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="bg-epitone-purple hover:bg-epitone-purple/80">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="face" className="mt-0">
            {/* Face Detection reports tab content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports
                .filter(report => report.type === "Face Detection")
                .map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Card className="border-epitone-softPurple h-full hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-epitone-softPurple text-epitone-purple">
                            {report.type}
                          </span>
                          <span className="text-xs text-gray-500">{report.id}</span>
                        </div>
                        <CardTitle className="text-xl mt-3">{report.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(report.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{report.time}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-epitone-purple border-epitone-purple hover:bg-epitone-softPurple/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="bg-epitone-purple hover:bg-epitone-purple/80">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-0">
            {/* Recommendations tab content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports
                .filter(report => report.type === "Recommendation")
                .map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Card className="border-epitone-softPurple h-full hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-epitone-softPurple text-epitone-purple">
                            {report.type}
                          </span>
                          <span className="text-xs text-gray-500">{report.id}</span>
                        </div>
                        <CardTitle className="text-xl mt-3">{report.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(report.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{report.time}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-epitone-purple border-epitone-purple hover:bg-epitone-softPurple/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="bg-epitone-purple hover:bg-epitone-purple/80">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Generate new report section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto mt-12 bg-gradient-to-r from-epitone-softPurple to-epitone-softPeach p-8 rounded-xl text-center"
      >
        <h2 className="text-2xl font-bold text-epitone-darkPurple mb-4">Generate a New Analysis</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Need a new skin analysis or face detection report? Start a new diagnostic session to receive personalized insights.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-epitone-purple hover:bg-epitone-purple/80">
            Start Skin Tone Analysis
          </Button>
          <Button variant="outline" className="border-epitone-purple text-epitone-purple hover:bg-epitone-softPurple/50">
            Start Face Detection
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportPage;
