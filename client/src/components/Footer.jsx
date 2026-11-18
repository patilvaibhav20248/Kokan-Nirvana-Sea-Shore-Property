import React from 'react';
import { 
  Waves, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
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
      <div className="bg-gradient-to-r from-teal-900 via-teal-950 to-stone-900 border-b border-teal-800/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Limited Coastal Inventory</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              “Your dream of owning a piece of paradise in Dapoli.”
            </h3>
            <p className="text-teal-200 text-xs sm:text-sm mt-1 max-w-xl">
              Sanctioned Collector NA sea-facing plots & luxury villas are selling fast in Phase 2. Secure your pre-launch rates today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919820012345?text=Hi%20Kokan%20Nirvana%20team,%20I%20would%20like%20to%20inquire%20about%20current%20rates%20in%20Dapoli"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={onOpenSiteVisit}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Book Complimentary Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white">
                <Waves className="w-6 h-6 text-teal-100" />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold text-white tracking-tight">
                  Kokan Nirvana
                </span>
                <p className="text-[10px] uppercase tracking-widest text-teal-400 font-semibold">
                  Sea Shore Property • Dapoli
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Premier real estate developer and land promoters in Dapoli, Maharashtra. 
              Pioneering transparent, Collector NA sanctioned coastal living with 100% 
              clear 7/12 land titles, modern underground infrastructure, and high rental return assets.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Near Murud Beach Road, Dapoli, Dist. Ratnagiri, Maharashtra 415712</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 98200 12345 / +91 84460 67890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>inquiries@kokannirvana.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Explore Projects
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#properties" className="hover:text-teal-400 transition-colors">The Azure Coast Villas</a></li>
              <li><a href="#properties" className="hover:text-teal-400 transition-colors">Sandalwood Palms Plots</a></li>
              <li><a href="#properties" className="hover:text-teal-400 transition-colors">Alphonso Greens Agro Estates</a></li>
              <li><a href="#properties" className="hover:text-teal-400 transition-colors">Coral Horizon Cottages</a></li>
              <li><a href="#properties" className="hover:text-teal-400 transition-colors">Sea Breeze Enclave</a></li>
              <li><a href="#master-plan" className="hover:text-teal-400 transition-colors flex items-center gap-1 text-teal-300">
                <span>Interactive Master Plan</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </a></li>
            </ul>
          </div>

          {/* Dapoli Destinations (Col 4) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Dapoli Coastlines
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="hover:text-stone-200">Murud Beach & Water Sports</span></li>
              <li><span className="hover:text-stone-200">Ladghar Red Pebble Beach</span></li>
              <li><span className="hover:text-stone-200">Karde White Sand Beach</span></li>
              <li><span className="hover:text-stone-200">Kelshi Dunes & Palms</span></li>
              <li><span className="hover:text-stone-200">Suvarnadurg Sea Fort & Harnai</span></li>
              <li><span className="hover:text-stone-200">Anjarle Beach & Kadyavarcha Ganpati</span></li>
            </ul>
          </div>

          {/* Legal & Backend Access (Col 5) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Legal & Verification
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Sanctioned Collector NA</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Separate 7/12 extract for each plot, 30-year search report from High Court advocate, RERA registered developments.
              </p>

              <div className="pt-2 border-t border-stone-800">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-teal-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-teal-400" />
                  <span>Admin & Leads Desk</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Kokan Nirvana Sea Shore Property, Dapoli. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-stone-400 cursor-pointer">RERA Disclaimer</span>
            <button
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
