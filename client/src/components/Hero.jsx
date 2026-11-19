import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Waves, 
  Calculator, 
  CheckCircle2, 
  ChevronRight,
  Sun,
  Navigation,
  Sparkles
} from 'lucide-react';

export default function Hero({ onOpenSiteVisit, onOpenBrochure }) {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] text-stone-900 pt-10 pb-16 border-b border-stone-200">
      
      {/* Delicate natural gradient backdrop */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 via-teal-50/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Ribbon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Sanctioned Collector NA Plots & Beachfront Villas</span>
          <span className="text-stone-300">•</span>
          <span className="text-teal-900 font-bold">Dapoli, Ratnagiri District</span>
        </div>

        {/* Main 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Headline & Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <p className="font-editorial italic text-2xl sm:text-3xl text-teal-900 font-normal mb-2 tracking-wide">
                “Your dream of owning a piece of paradise in Dapoli.”
              </p>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]">
                Clear-Title Coastal NA Land <br />
                <span className="bg-gradient-to-r from-amber-900 via-stone-800 to-teal-900 bg-clip-text text-transparent">
                  4 Hours from Mumbai & Pune
                </span>
              </h1>
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Escape the metropolitan rush to Maharashtra's cleanest coastal town. 
              Own planned, demarcated Collector NA residential plots and turnkey sea-facing homes in Dapoli 
              with an <strong>individual 7/12 extract mutated in your name</strong>, 30-ft tar roads, and tap water connections.
            </p>

            {/* Practical Real-World Fact Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">From Mumbai</span>
                <span className="text-sm font-extrabold text-stone-900">3.5 - 4 Hrs</span>
                <span className="text-[10px] text-teal-800 block">NH-66 / Ro-Ro</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">From Pune</span>
                <span className="text-sm font-extrabold text-stone-900">3.0 - 3.5 Hrs</span>
                <span className="text-[10px] text-stone-500 block">Via Tamhini Ghat</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Legal Sanction</span>
                <span className="text-sm font-extrabold text-emerald-700">Class-1 NA</span>
                <span className="text-[10px] text-stone-500 block">Separate 7/12</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Starting Price</span>
                <span className="text-sm font-extrabold text-amber-900">₹24.5 L</span>
                <span className="text-[10px] text-stone-500 block">2.5+ Guntha NA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#reservation"
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-amber-900 hover:bg-amber-800 shadow-md shadow-amber-950/20 hover:scale-[1.01] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Reserve Plot (₹21k Refundable)</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </a>

              <button
                type="button"
                onClick={() => onOpenSiteVisit(null)}
                className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 hover:scale-[1.01] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Schedule VIP Site Visit</span>
              </button>

              <a
                href="#plot-calculator"
                className="px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-amber-950 bg-amber-100/70 hover:bg-amber-100 border border-amber-300/80 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-900" />
                <span>Plot Calculator</span>
              </a>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-stone-700 hover:text-stone-900 border border-stone-300 hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span>Pricing & 7/12</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Freehold ownership. Any Indian citizen can buy directly without agricultural certificate.</span>
            </div>

          </div>

          {/* Right Column: Grounded Dapoli Photographic Showcase (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 shadow-xl border border-stone-200 aspect-[4/5] flex flex-col justify-between p-6 sm:p-7 text-white">
              
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" 
                alt="Ladghar Coastal Ridge Dapoli" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.68]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/20"></div>

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-stone-900 shadow-sm">
                  Featured Layout: Sandalwood Palms
                </span>
                <span className="text-xs font-mono font-semibold bg-black/60 text-amber-300 px-2.5 py-1 rounded-md border border-white/20">
                  Phase 2 Open
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Ladghar Beach Ridge, Dapoli (450m to beach)</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Demarcated Coastal NA Plots
                </h3>

                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                  2.5 to 5.0 Guntha residential plots with wide 30-ft internal tarred roads, underground electric cabling, and 24/7 water.
                </p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-300 uppercase font-semibold block">Plots Starting At</span>
                    <span className="text-2xl font-black text-amber-300 tracking-tight">₹24.50 Lakhs</span>
                  </div>

                  <a
                    href="#properties"
                    className="px-4 py-2 rounded-xl bg-white text-stone-950 hover:bg-amber-300 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View Inventory</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
