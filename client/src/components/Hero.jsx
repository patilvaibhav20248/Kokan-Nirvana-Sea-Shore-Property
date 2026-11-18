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
  PhoneCall,
  SlidersHorizontal
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
  const perspectives = [
    {
      id: 'Villa',
      tabLabel: 'Beachfront Villas',
      title: 'The Azure Coast Signature Villas',
      location: 'Murud Beachfront, Dapoli',
      price: '₹2.15 Cr',
      beachDistance: 'Direct Sand Access (60m)',
      tagline: 'Private infinity plunge pool facing the Arabian Sea with panoramic sunset decks',
      badge: 'Ultra Luxury Beachfront',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Sanctioned 1.0 FSI',
      propertyId: 'azure-coast-villas'
    },
    {
      id: 'NA Plot',
      tabLabel: 'Collector NA Plots',
      title: 'Sandalwood Palms Coastal NA Plots',
      location: 'Ladghar (Red Pebble Beach) Ridge',
      price: 'Starting ₹24.5 Lakhs',
      beachDistance: '400m to Ladghar Beach',
      tagline: 'Sanctioned Collector NA plots with separate 7/12 extract & 30-ft tar roads',
      badge: 'Best Investment Hotspot',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Separate 7/12 Extract',
      propertyId: 'sandalwood-palms-plots'
    },
    {
      id: 'Farmhouse',
      tabLabel: 'Mango Agro Estates',
      title: 'Alphonso Greens 1-Acre Estates',
      location: 'Karde Valley Hills, Dapoli',
      price: '₹48.0 Lakhs / Acre',
      beachDistance: '1.8 km to Karde White Sands',
      tagline: '40+ mature GI-tagged Alphonso mango trees with farm cottage permissions',
      badge: 'GI-Tagged Agro Estate',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
      fsi: 'Gated 1-Acre Parcels',
      propertyId: 'alphonso-greens-estates'
    },
    {
      id: 'Cottage',
      tabLabel: 'Oceanview Cottages',
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
    <section className="relative overflow-hidden bg-[#fbfbf9] text-stone-900 pt-8 pb-16 border-b border-stone-200/80">
      
      {/* Delicate background ambient gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-100/40 via-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/30 via-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag & Perspective Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-200/60">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>RERA Registered & Collector Sanad NA Approved</span>
            <span className="text-stone-400">•</span>
            <span className="text-teal-800 font-bold">Dapoli, Ratnagiri</span>
          </div>

          {/* Living Style Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {perspectives.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handlePerspectiveClick(idx, p.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activePerspectiveIndex === idx
                    ? 'bg-stone-900 text-white shadow-md shadow-stone-900/10 scale-105'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {p.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Split Gallery Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
          
          {/* Left Column: Brand Story & Emotional Statement (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-teal-800 font-normal mb-2 tracking-wide">
                “Your dream of owning a piece of paradise in Dapoli.”
              </p>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.14]">
                Where Pure Sea Air Meets <br />
                <span className="bg-gradient-to-r from-teal-800 via-emerald-700 to-amber-700 bg-clip-text text-transparent">
                  Timeless Coastal Luxury
                </span>
              </h1>
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Escape to the "Mini Mahabaleshwar of Konkan". Own Collector NA sanctioned sea-facing plots, 
              private pool beachfront villas, and mature Alphonso mango agro estates in Dapoli, Maharashtra. 
              Enjoy 100% clear 7/12 land titles with 4-hour expressway access from Mumbai and Pune.
            </p>

            {/* Micro Highlights Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-sm">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Connectivity</span>
                <span className="text-xs font-bold text-stone-900">3.5 - 4 Hrs</span>
                <span className="text-[10px] text-teal-700 block">Mumbai / Pune</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-sm">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Legal Status</span>
                <span className="text-xs font-bold text-emerald-700">100% Clear</span>
                <span className="text-[10px] text-stone-500 block">Collector Sanad NA</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-sm">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Beach Proximity</span>
                <span className="text-xs font-bold text-stone-900">0 - 400m</span>
                <span className="text-[10px] text-stone-500 block">Pristine Shores</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-sm">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Air Quality</span>
                <span className="text-xs font-bold text-teal-800">AQI 18</span>
                <span className="text-[10px] text-stone-500 block">Pure Coastal Ozone</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSiteVisit}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-stone-900 hover:bg-stone-800 shadow-lg shadow-stone-900/15 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Schedule VIP Site Visit</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>

              <a
                href="#configurator"
                className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-teal-700" />
                <span>Custom Villa Builder</span>
              </a>

              <button
                onClick={onOpenBrochure}
                className="px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-stone-700 hover:text-stone-900 border border-stone-300 hover:bg-stone-100 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span>Download Rates</span>
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Magazine Frame (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 shadow-2xl border border-stone-200 group aspect-[4/5] sm:aspect-[1/1] flex flex-col justify-between p-6 sm:p-7 text-white">
              
              {/* Dynamic Photo */}
              <img 
                key={activePersp.image}
                src={activePersp.image} 
                alt={activePersp.title} 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30"></div>

              {/* Card Top Pill Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-stone-900 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {activePersp.badge}
                </span>

                <span className="text-xs font-mono font-semibold bg-black/60 text-teal-300 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                  {activePersp.fsi}
                </span>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePersp.location}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-teal-200">{activePersp.beachDistance}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {activePersp.title}
                </h3>

                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                  {activePersp.tagline}
                </p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-300 uppercase font-semibold block">Investment From</span>
                    <span className="text-2xl font-black text-amber-300 tracking-tight">{activePersp.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      const el = document.getElementById('properties');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-stone-950 hover:bg-amber-300 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View Units</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating Property Search Island */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-stone-200/90 text-stone-900">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            
            {/* Field 1 */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Property Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
              >
                <option value="All">All Coastal Properties & NA Plots</option>
                <option value="NA Plot">Collector NA Plots (Ladghar / Anjarle)</option>
                <option value="Villa">Beachfront Villas (Murud)</option>
                <option value="Farmhouse">Alphonso Mango Agro Estates (Karde)</option>
                <option value="Cottage">Luxury Oceanview Cottages</option>
              </select>
            </div>

            {/* Field 2 */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Dapoli Shore / Beach
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
              >
                <option value="All">All Beaches & Locations in Dapoli</option>
                <option value="Murud">Murud Beach (Direct Sand Access & Watersports)</option>
                <option value="Ladghar">Ladghar Beach (Famous Red Pebble Shore)</option>
                <option value="Karde">Karde Beach (Expansive White Sands)</option>
                <option value="Kelshi">Kelshi Coast (Palm Groves & Dunes)</option>
                <option value="Anjarle">Anjarle (Panoramic Sea Fort Promontory)</option>
              </select>
            </div>

            {/* Field 3 */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Investment Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
              >
                <option value="All">Any Budget</option>
                <option value="Under 30L">Under ₹30 Lakhs (Ideal NA Plots)</option>
                <option value="30L - 60L">₹30 Lakhs - ₹60 Lakhs (Agro/Hilltop Plots)</option>
                <option value="60L - 1.5Cr">₹60 Lakhs - ₹1.5 Cr (Holiday Cottages)</option>
                <option value="Above 1.5Cr">₹1.5 Cr+ (Beachfront Signature Villas)</option>
              </select>
            </div>

            {/* Search CTA */}
            <div className="lg:w-auto flex items-end">
              <button
                onClick={onApplySearch}
                className="w-full lg:w-auto px-7 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer h-[44px]"
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
