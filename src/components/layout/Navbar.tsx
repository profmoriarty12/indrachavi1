
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-epitone-softPurple/90 backdrop-blur-md border-b border-epitone-purple/20 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <span className="text-2xl font-extrabold text-epitone-darkPurple">
              Epi<span className="text-epitone-purple">Tone</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-epitone-darkPurple hover:text-epitone-purple transition-colors">
              Home
            </Link>
            
            <div className="relative">
              <button 
                className="flex items-center text-epitone-darkPurple hover:text-epitone-purple transition-colors"
                onClick={() => toggleDropdown('diagnose')}
              >
                Diagnose <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'diagnose' && (
                <div 
                  className="absolute top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1"
                  onMouseLeave={closeDropdown}
                >
                  <Link 
                    to="/diagnose" 
                    className="block px-4 py-2 text-sm text-epitone-darkPurple hover:bg-epitone-softPurple rounded-md"
                    onClick={closeDropdown}
                  >
                    Skin Tone Analysis
                  </Link>
                  <Link 
                    to="/diagnose" 
                    className="block px-4 py-2 text-sm text-epitone-darkPurple hover:bg-epitone-softPurple rounded-md"
                    onClick={closeDropdown}
                  >
                    Face Detection
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/learn" className="text-epitone-darkPurple hover:text-epitone-purple transition-colors">
              Learn
            </Link>
            
            <Link to="/reports" className="text-epitone-darkPurple hover:text-epitone-purple transition-colors">
              Reports
            </Link>
            
            <Link to="/contact" className="text-epitone-darkPurple hover:text-epitone-purple transition-colors">
              Contact
            </Link>
            
            <Link to="/rate" className="text-epitone-darkPurple hover:text-epitone-purple transition-colors">
              Rate Us
            </Link>
          </div>

          {/* Login/Signup Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-epitone-purple hover:text-epitone-purple/80 hover:bg-epitone-softPurple">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-epitone-purple hover:bg-epitone-purple/80 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-epitone-darkPurple rounded-md hover:bg-epitone-softPurple/50"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <Link 
                to="/" 
                className="py-2 text-epitone-darkPurple"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <button 
                className="flex items-center justify-between py-2 text-epitone-darkPurple"
                onClick={() => toggleDropdown('mobileDiagnose')}
              >
                Diagnose
                <ChevronDown className={`h-4 w-4 transform ${activeDropdown === 'mobileDiagnose' ? 'rotate-180' : ''} transition-transform`} />
              </button>
              
              {activeDropdown === 'mobileDiagnose' && (
                <div className="pl-4 flex flex-col space-y-2">
                  <Link 
                    to="/diagnose" 
                    className="py-2 text-epitone-darkPurple"
                    onClick={() => setIsOpen(false)}
                  >
                    Skin Tone Analysis
                  </Link>
                  <Link 
                    to="/diagnose" 
                    className="py-2 text-epitone-darkPurple"
                    onClick={() => setIsOpen(false)}
                  >
                    Face Detection
                  </Link>
                </div>
              )}
              
              <Link 
                to="/learn" 
                className="py-2 text-epitone-darkPurple"
                onClick={() => setIsOpen(false)}
              >
                Learn
              </Link>
              
              <Link 
                to="/reports" 
                className="py-2 text-epitone-darkPurple"
                onClick={() => setIsOpen(false)}
              >
                Reports
              </Link>
              
              <Link 
                to="/contact" 
                className="py-2 text-epitone-darkPurple"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              <Link 
                to="/rate" 
                className="py-2 text-epitone-darkPurple"
                onClick={() => setIsOpen(false)}
              >
                Rate Us
              </Link>
              
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="py-2 text-center text-epitone-purple bg-white rounded-md border border-epitone-purple"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="py-2 text-center text-white bg-epitone-purple rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
