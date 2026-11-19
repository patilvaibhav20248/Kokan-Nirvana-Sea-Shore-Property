import React from 'react';
import { 
  Waves, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp,
  MessageCircle,
  Database
} from 'lucide-react';

export default function Footer({ onOpenSiteVisit, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      
      {/* Upper CTA Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-teal-950 border-b border-stone-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1.5">
              <span>Phase 2 NA Plots & Beachfront Villas Open</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              “Your dream of owning a piece of paradise in Dapoli.”
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
              100% Collector NA Sanad Class-1 with separate 7/12 extract in your personal name. 
              Schedule a free weekend site inspection with complimentary lunch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919820012345?text=Hi%20Kokan%20Nirvana%20team,%20I%20would%20like%20to%20know%20more%20about%20Dapoli%20NA%20plots"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenSiteVisit(null)}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Schedule VIP Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (Cols 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-900 flex items-center justify-center text-white">
                <Waves className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold text-white tracking-tight">
                  Kokan Nirvana
                </span>
                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                  Sea Shore Property • Dapoli, Maharashtra
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Real estate land developers and promoters based in Dapoli, Ratnagiri District. 
              Specializing in clear-title Collector NA Class-1 residential layouts, mango agro estates, 
              and bespoke sea-facing villas for second-home buyers from Mumbai and Pune.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Near Murud Beach Road Junction, Dapoli, Dist. Ratnagiri, Maharashtra 415712</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98200 12345 / +91 84460 67890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>inquiries@kokannirvana.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Dapoli Projects
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Sandalwood Palms (Ladghar Ridge)</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">The Azure Coast (Murud Beach)</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Alphonso Greens (Karde Valley)</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Coral Horizon (Karde Heights)</a></li>
              <li><a href="#master-plan" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-300">
                <span>Interactive Master Plan</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </a></li>
            </ul>
          </div>

          {/* Buyer Tools (Col 4) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Buyer Resources
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#plot-calculator" className="hover:text-amber-400 transition-colors">Guntha ↔ Sq.Ft Calculator</a></li>
              <li><a href="#plot-calculator" className="hover:text-amber-400 transition-colors">Ratnagiri Stamp Duty Estimator</a></li>
              <li><a href="#route-guide" className="hover:text-amber-400 transition-colors">Mumbai & Pune Travel Routes</a></li>
              <li><a href="#legal-guide" className="hover:text-amber-400 transition-colors">Collector NA Sanad Explained</a></li>
              <li><a href="#faqs" className="hover:text-amber-400 transition-colors">Non-Farmer Purchase Rules</a></li>
            </ul>
          </div>

          {/* Legal Transparency (Col 5) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Legal Transparency
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 44 MLRC Sanctioned</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Separate 7/12 extract per plot. Registered sale deeds executed at the Dapoli Sub-Registrar Office.
              </p>

              <div className="pt-2 border-t border-stone-800">
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Backend Management Desk</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Kokan Nirvana Sea Shore Property, Dapoli. All revenue documentation verified.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Title</span>
            <span className="hover:text-stone-400 cursor-pointer">RERA Disclaimer</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
