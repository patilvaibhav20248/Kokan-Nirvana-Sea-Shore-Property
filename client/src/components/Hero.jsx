import React from 'react';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Palmtree, 
  Waves, 
  Award,
  Search
} from 'lucide-react';

export default function Hero({ 
  onOpenSiteVisit, 
  onOpenBrochure, 
  selectedCategory, 
  setSelectedCategory,
  selectedBudget,
  setSelectedBudget,
  selectedLocation,
  setSelectedLocation,
  onApplySearch
}) {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white min-h-[90vh] flex flex-col justify-between">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85" 
          alt="Dapoli Konkan Coastline" 
          className="w-full h-full object-cover object-center filter brightness-[0.68] scale-105 transform motion-safe:animate-pulse transition-all duration-1000"
          style={{ animationDuration: '10s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-radial from-teal-900/20 via-transparent to-stone-950/80"></div>
      </div>

      {/* Floating Trust Pill */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-200 text-xs sm:text-sm font-medium mb-6 shadow-xl">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Coastal Real Estate & NA Land Developers • Dapoli</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          <span className="text-white font-semibold">RERA & Collector Approved</span>
        </div>

        {/* Main Brand Tagline and Heading */}
        <div className="max-w-4xl">
          <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-amber-200/90 font-medium mb-2 tracking-wide">
            “Your dream of owning a piece of paradise in Dapoli.”
          </p>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Sea Shore Living in the <br />
            <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-amber-200 bg-clip-text text-transparent">
              Crown of Konkan
            </span>
          </h1>

          <p className="text-stone-200 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-8 text-shadow-sm">
            Own Collector NA Sanctioned sea-facing plots, ultra-luxury beachfront villas, 
            and Alphonso mango agro estates in Dapoli, Maharashtra. 100% Clear 7/12 Title, 
            underground infrastructure, and unmatched coastal serenity just 4 hours from Mumbai and Pune.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onOpenSiteVisit}
              className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-900/30 hover:scale-[1.02] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-stone-950" />
              <span>Schedule Free VIP Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBrochure}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <FileText className="w-5 h-5 text-teal-300" />
              <span>Download E-Brochure & Pricing</span>
            </button>

            <a
              href="#master-plan"
              className="px-5 py-3.5 rounded-xl font-medium text-sm sm:text-base text-stone-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Waves className="w-5 h-5 text-teal-400" />
              <span>Interactive Master Plan</span>
            </a>
          </div>

          {/* Key Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base">100% Clear Title</div>
                <div className="text-xs text-stone-400">Individual 7/12 Extract</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base">Collector NA</div>
                <div className="text-xs text-stone-400">Sanctioned Sanad & FSI</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base">0 - 400m</div>
                <div className="text-xs text-stone-400">From Pristine Beaches</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Palmtree className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base">Alphonso Groves</div>
                <div className="text-xs text-stone-400">GI-Tagged Mango Orchards</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Property Search & Filter Box */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <div className="glass-card rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/40 text-stone-900 bg-white/95">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            
            {/* Filter 1: Property Type */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              >
                <option value="All">All Properties & Plots</option>
                <option value="NA Plot">Collector NA Plots</option>
                <option value="Villa">Beachfront Villas</option>
                <option value="Farmhouse">Alphonso Mango Agro Estates</option>
                <option value="Cottage">Luxury Oceanview Cottages</option>
              </select>
            </div>

            {/* Filter 2: Beach / Location */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                Dapoli Beach Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              >
                <option value="All">All Dapoli Locations</option>
                <option value="Murud">Murud Beach (Watersports & Dolphins)</option>
                <option value="Ladghar">Ladghar Beach (Red Pebble Beach)</option>
                <option value="Karde">Karde Beach (White Sands & Sunset)</option>
                <option value="Kelshi">Kelshi Coastal Belt (Palms & Dunes)</option>
                <option value="Anjarle">Anjarle (Suvarnadurg Sea Fort View)</option>
              </select>
            </div>

            {/* Filter 3: Budget Range */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                Budget Range
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              >
                <option value="All">Any Budget</option>
                <option value="Under 30L">Under ₹30 Lakhs (Ideal NA Plots)</option>
                <option value="30L - 60L">₹30 Lakhs - ₹60 Lakhs (Agro/Hilltop Plots)</option>
                <option value="60L - 1.5Cr">₹60 Lakhs - ₹1.5 Cr (Luxury Cottages)</option>
                <option value="Above 1.5Cr">₹1.5 Cr+ (Beachfront Signature Villas)</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:w-auto flex items-end">
              <button
                onClick={onApplySearch}
                className="w-full lg:w-auto px-7 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer h-[44px]"
              >
                <Search className="w-4 h-4 text-teal-200" />
                <span>Search Properties</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
