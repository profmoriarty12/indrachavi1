
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-epitone-darkPurple text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Epi<span className="text-epitone-purple">Tone</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Advanced skin tone analysis and detection for better healthcare and personalized treatment recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-epitone-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-epitone-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-epitone-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-epitone-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-epitone-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/diagnose" className="text-gray-300 hover:text-epitone-purple transition-colors">
                  Diagnose
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-300 hover:text-epitone-purple transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-300 hover:text-epitone-purple transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-epitone-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Laboratory Addresses */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Laboratories</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-epitone-purple" />
                <span className="text-gray-300">123 Medical Center Dr, Boston, MA 02115</span>
              </li>
              <li className="flex">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-epitone-purple" />
                <span className="text-gray-300">456 Health Science Blvd, San Francisco, CA 94143</span>
              </li>
              <li className="flex">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-epitone-purple" />
                <span className="text-gray-300">789 Research Parkway, Houston, TX 77030</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-epitone-purple" />
                <span className="text-gray-300">+1 (800) 123-4567</span>
              </li>
              <li className="flex">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-epitone-purple" />
                <span className="text-gray-300">contact@epitone-health.com</span>
              </li>
              <li className="flex">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-epitone-purple" />
                <span className="text-gray-300">support@epitone-health.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EpiTone Health Technologies. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-epitone-purple transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-epitone-purple transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
