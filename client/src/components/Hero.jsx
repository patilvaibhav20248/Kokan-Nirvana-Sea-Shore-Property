import React, { useState } from 'react';
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
  Search,
  CheckCircle2,
  ChevronRight,
  Sun,
  Wind,
  PhoneCall
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
  onApplySearch,
  onSelectProperty
}) {
  // 4 Coastal Perspectives for dynamic interactive hero
  const perspectives = [
    {
      id: 'Villa',
      tabLabel: '🌊 Beachfront Villas',
      title: 'The Azure Coast Signature Villas',
      location: 'Murud Beachfront, Dapoli',
      price: '₹2.15 Cr',
      beachDistance: 'Direct Sand Access (60m)',
      tagline: 'Private infinity plunge pools facing the Arabian Sea with sunset decks',
      badge: 'Ultra Luxury Beachfront',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Sanctioned 1.0 FSI',
      propertyId: 'azure-coast-villas'
    },
    {
      id: 'NA Plot',
      tabLabel: '🏖️ Collector NA Plots',
      title: 'Sandalwood Palms Coastal NA Plots',
      location: 'Ladghar (Red Pebble Beach) Ridge',
      price: 'Starting ₹24.5 Lakhs',
      beachDistance: '400m to Ladghar Beach',
      tagline: 'Collector Sanad NA plots with individual 7/12 extract & 30-ft tar roads',
      badge: 'Best Investment Hotspot',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Separate 7/12 Extract',
      propertyId: 'sandalwood-palms-plots'
    },
    {
      id: 'Farmhouse',
      tabLabel: '🥭 Mango Agro Estates',
      title: 'Alphonso Greens 1-Acre Estates',
      location: 'Karde Valley Hills, Dapoli',
      price: '₹48.0 Lakhs / Acre',
      beachDistance: '1.8 km to Karde White Sands',
      tagline: '40+ yielding mature GI-tagged Alphonso mango trees & private cottage zoning',
      badge: 'GI-Tagged Agro Estate',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Gated 1-Acre Parcels',
      propertyId: 'alphonso-greens-estates'
    },
    {
      id: 'Cottage',
      tabLabel: '🏡 Oceanview Cottages',
      title: 'Coral Horizon Boutique Cottages',
      location: 'Karde Beach Heights, Dapoli',
      price: '₹78.0 Lakhs',
      beachDistance: '350m to Ocean Horizon',
      tagline: 'Turnkey fully-furnished coastal cottages with 12-14% projected tourism rental yield',
      badge: 'High Vacation Rental Yield',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Fully Furnished Turnkey',
      propertyId: 'coral-horizon-cottages'
    }
  ];

  const [activePerspectiveIndex, setActivePerspectiveIndex] = useState(0);
  const activePersp = perspectives[activePerspectiveIndex];

  const handlePerspectiveClick = (index, catId) => {
    setActivePerspectiveIndex(index);
    setSelectedCategory(catId);
  };

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[92vh] flex flex-col justify-between pt-6 pb-10">
      
      {/* Dynamic Background Image with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          key={activePersp.image}
          src={activePersp.image} 
          alt={activePersp.title} 
          className="w-full h-full object-cover object-center filter brightness-[0.52] scale-105 transition-all duration-1000 ease-out"
        />
        {/* Layered Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-radial from-teal-900/30 via-transparent to-stone-950/90 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Interactive Experience Perspective Switcher (Top of Hero) */}
        <div className="pt-2 sm:pt-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-bold text-teal-300 uppercase tracking-widest hidden md:inline-block mr-2 shrink-0">
              Explore Living Styles:
            </span>
            {perspectives.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handlePerspectiveClick(idx, p.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  activePerspectiveIndex === idx
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow-lg shadow-amber-400/20 scale-105 ring-2 ring-amber-300/60'
                    : 'bg-white/10 hover:bg-white/20 text-stone-200 backdrop-blur-md border border-white/15'
                }`}
              >
                <span>{p.tabLabel}</span>
                {activePerspectiveIndex === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-950"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Split Asymmetric Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* Left Column: Headline, Brand Story, CTAs (7 Cols) */}
          <div className="lg:col-span-7">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-teal-500/40 text-teal-200 text-xs sm:text-sm font-medium mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">Collector NA Sanctioned</span>
              <span className="text-teal-400/60">•</span>
              <span className="text-amber-300 font-medium">Individual 7/12 Titles in Dapoli</span>
            </div>

            {/* Core Emotional Tagline */}
            <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-amber-200 font-normal mb-3 tracking-wide drop-shadow-md">
              “Your dream of owning a piece of paradise in Dapoli.”
            </p>

            {/* Main Punchy Heading */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
              Bespoke Coastal Living on the <br />
              <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-amber-200 bg-clip-text text-transparent">
                Pristine Dapoli Sea Shore
              </span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-8">
              Wake up to Arabian Sea waves, golden sunsets, and pure coastal breezes (AQI &lt; 20). 
              Gated Collector NA plots, beachfront villas, and Alphonso mango agro estates — 
              just <strong className="text-white font-semibold">4 hours from Mumbai & 3.5 hours from Pune</strong> via the 4-lane expressway & Ro-Ro ferry.
            </p>

            {/* Hero Primary Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onOpenSiteVisit}
                className="px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-950/40 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Book VIP Site Visit (Free Tour & Lunch)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBrochure}
                className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <FileText className="w-4 h-4 text-teal-300" />
                <span>Download Legal Dossier & Rates</span>
              </button>

              <a
                href="#master-plan"
                className="px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-teal-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>Interactive Master Plan →</span>
              </a>
            </div>

            {/* Trust Assurance Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">100% Clear 7/12</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">Sanctioned Collector NA</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">0 - 400m to Shore</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">480+ Happy Owners</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Architectural Showcase Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-7 border border-teal-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              
              {/* Subtle glowing ambient accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Card Header Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {activePersp.badge}
                </span>

                <span className="text-xs font-mono text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800">
                  {activePersp.fsi}
                </span>
              </div>

              {/* Featured Project Title & Location */}
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-1.5">
                {activePersp.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{activePersp.location}</span>
                <span className="text-stone-600">•</span>
                <span className="text-cyan-300">{activePersp.beachDistance}</span>
              </div>

              {/* Tagline Description */}
              <p className="text-xs text-stone-300 leading-relaxed mb-6 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
                {activePersp.tagline}
              </p>

              {/* Specs & Pricing Pill Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-950/80 p-4 rounded-2xl border border-stone-800">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Investment Starting</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight">
                    {activePersp.price}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Legal Guarantee</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Collector Sanad NA
                  </span>
                </div>
              </div>

              {/* Direct Card Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('properties');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-3 px-3 rounded-xl border border-teal-600/80 hover:bg-teal-900/40 text-teal-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenSiteVisit}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Visit</span>
                </button>
              </div>

              {/* Bottom Weather & Distance Micro-Ticker */}
              <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" />
                  Dapoli: 26°C Sunny Sea Breeze
                </span>
                <span className="text-emerald-400 font-medium">AQI 18 (Pure Ozone)</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Interactive Property Search Island (Bottom of Hero) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-stone-200/90 text-stone-900">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4">
            
            {/* Field 1: Category */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                Property Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
              >
                <option value="All">All Coastal Properties & NA Plots</option>
                <option value="NA Plot">Collector NA Plots (Ladghar / Anjarle)</option>
                <option value="Villa">Beachfront Villas (Murud)</option>
                <option value="Farmhouse">Alphonso Mango Agro Estates (Karde)</option>
                <option value="Cottage">Luxury Oceanview Cottages</option>
              </select>
            </div>

            {/* Field 2: Location */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                Dapoli Shore / Beach
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
              >
                <option value="All">All Beaches & Locations in Dapoli</option>
                <option value="Murud">Murud Beach (Direct Sand Access & Watersports)</option>
                <option value="Ladghar">Ladghar Beach (Famous Red Pebble Shore)</option>
                <option value="Karde">Karde Beach (Expansive White Sands)</option>
                <option value="Kelshi">Kelshi Coast (Palm Groves & Dunes)</option>
                <option value="Anjarle">Anjarle (Panoramic Sea Fort Promontory)</option>
              </select>
            </div>

            {/* Field 3: Budget */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                Investment Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
              >
                <option value="All">Any Budget</option>
                <option value="Under 30L">Under ₹30 Lakhs (Ideal NA Plots)</option>
                <option value="30L - 60L">₹30 Lakhs - ₹60 Lakhs (Agro/Hilltop Plots)</option>
                <option value="60L - 1.5Cr">₹60 Lakhs - ₹1.5 Cr (Holiday Cottages)</option>
                <option value="Above 1.5Cr">₹1.5 Cr+ (Beachfront Signature Villas)</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:w-auto flex items-end">
              <button
                onClick={onApplySearch}
                className="w-full lg:w-auto px-7 py-3 rounded-xl bg-teal-900 hover:bg-teal-950 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer h-[44px]"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Search Available Units</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
