import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingScreen from "./components/common/LoadingScreen";

// Lazy loaded pages for better performance
const Home = lazy(() => import("./pages/Index"));
const DiagnoseScreen = lazy(() => import("./pages/DiagnoseScreen"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RatePage = lazy(() => import("./pages/RatePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen pt-16"> {/* Add padding-top for fixed navbar */}
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diagnose" element={<DiagnoseScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/reports" element={<ReportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/rate" element={<RatePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
