import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-ic-clay text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              Indra<span className="text-ic-saffron">Chavi</span>
            </h3>
            <p className="mb-4 text-white/70 text-sm">
              {t("footer_description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t("Quick Links")}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: t("Home") },
                { to: "/dashboard", label: t("Dashboard") },
                { to: "/analysis", label: t("Analysis") },
                { to: "/records", label: t("Records") },
                { to: "/learn", label: t("Learn") },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-ic-saffron transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t("Institutional Partners")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2">
                <Building2 className="h-4 w-4 shrink-0 text-ic-saffron mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">PGIMER</span>
                  <span className="text-white/60 text-xs">Postgraduate Institute of Medical Education & Research, Chandigarh</span>
                </div>
              </li>
              <li className="flex gap-2">
                <Building2 className="h-4 w-4 shrink-0 text-ic-saffron mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">DIC MDaRT UIET</span>
                  <span className="text-white/60 text-xs">Design Innovation Centre, University Institute of Engineering & Technology, Panjab University</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t("Contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-ic-saffron" />
                <span className="text-white/70">Sector 12, Chandigarh 160012</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-ic-saffron" />
                <span className="text-white/70">+91 172 275 6565</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-ic-saffron" />
                <span className="text-white/70">research@indrachavi.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-xs">
          <p>&copy; {new Date().getFullYear()} IndraChavi — A PGIMER & DIC MDaRT UIET Joint Research Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
