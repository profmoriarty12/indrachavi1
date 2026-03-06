import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ic-clay text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              Indra<span className="text-ic-saffron">Chavi</span>
            </h3>
            <p className="mb-4 text-white/70 text-sm">
              AI-powered prosthetic color matching for facial rehabilitation across India. Precision formulation meets clinical care.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/analysis", label: "Analysis" },
                { to: "/records", label: "Records" },
                { to: "/learn", label: "Learn" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-ic-saffron transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Partner Labs</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-ic-saffron mt-0.5" />
                <span className="text-white/70">AIIMS, Ansari Nagar, New Delhi 110029</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-ic-saffron mt-0.5" />
                <span className="text-white/70">KEM Hospital, Parel, Mumbai 400012</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-ic-saffron mt-0.5" />
                <span className="text-white/70">CMC, Vellore, Tamil Nadu 632004</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-ic-saffron" />
                <span className="text-white/70">+91 11 2658 8500</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-ic-saffron" />
                <span className="text-white/70">research@indrachavi.in</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-ic-saffron" />
                <span className="text-white/70">support@indrachavi.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-xs">
          <p>&copy; {new Date().getFullYear()} IndraChavi — Facial Prosthetic Research Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
