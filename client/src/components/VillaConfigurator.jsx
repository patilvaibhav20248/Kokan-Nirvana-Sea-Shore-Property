import React, { useState } from 'react';
import { 
  Sliders, 
  Home, 
  Layers, 
  Sun, 
  Waves, 
  Check, 
  Sparkles, 
  Calculator, 
  ArrowRight,
  ShieldCheck,
  Palmtree,
  Calendar
} from 'lucide-react';

export default function VillaConfigurator({ onBookSiteVisit }) {
  // Step 1: Plot Selection
  const [plotType, setPlotType] = useState('oceanfront'); // 'oceanfront' | 'ridge' | 'mango'
  // Step 2: Architecture Style
  const [archStyle, setArchStyle] = useState('modern'); // 'modern' | 'vernacular' | 'chalet'
  // Step 3: Add-ons
  const [addons, setAddons] = useState({
    pool: true,
    solar: true,
    orchard: false,
    deck: true
  });

  const plotOptions = [
    {
      id: 'oceanfront',
      name: 'Oceanfront Row (Murud Beach)',
      size: '3,200 sq.ft',
      basePrice: 3200000,
      desc: 'Direct coastal breeze, 80m from the shoreline, sea-facing elevation.'
    },
    {
      id: 'ridge',
      name: 'Ladghar Ridge NA Plot',
      size: '2,500 sq.ft',
      basePrice: 2450000,
      desc: 'Scenic hillside view over the red-pebble beach, peaceful gated enclave.'
    },
    {
      id: 'mango',
      name: '1-Acre Alphonso Orchard Estate',
      size: '43,560 sq.ft (1 Acre)',
      basePrice: 4800000,
      desc: '40 mature mango trees, natural sweet water well, farm cottage zoning.'
    }
  ];

  const archOptions = [
    {
      id: 'modern',
      name: 'Contemporary Glass & Cantilever',
      builtUp: '2,400 sq.ft',
      cost: 4200000,
      desc: 'Floor-to-ceiling panoramic glass, minimalist lines, coastal concrete and teakwood.'
    },
    {
      id: 'vernacular',
      name: 'Traditional Konkani Chira Stone Villa',
      builtUp: '2,200 sq.ft',
      cost: 3600000,
      desc: 'Hand-cut local red laterite stone, terracotta roof tiles, open central courtyard (Chauk).'
    },
    {
      id: 'chalet',
      name: 'Tropical Wooden Eco-Chalet',
      builtUp: '1,600 sq.ft',
      cost: 2800000,
      desc: 'Treated pinewood & bamboo finishes, low carbon footprint, surrounded by trees.'
    }
  ];

  const addonOptions = [
    { id: 'pool', label: 'Infinity Plunge Pool', cost: 650000, desc: 'Facing the Arabian Sea sunset' },
    { id: 'solar', label: 'Off-Grid 5kW Solar Array', cost: 350000, desc: 'Eco power & net-metering' },
    { id: 'orchard', label: 'Private Organic Fruit Garden', cost: 150000, desc: '10 grafted Alphonso & Coconut trees' },
    { id: 'deck', label: 'Wooden Sundowner Roof Deck', cost: 250000, desc: '360° star gazing & ocean horizon' },
  ];

  const selectedPlot = plotOptions.find(p => p.id === plotType);
  const selectedArch = archOptions.find(a => a.id === archStyle);

  const addonsTotal = Object.entries(addons).reduce((sum, [key, active]) => {
    if (!active) return sum;
    const item = addonOptions.find(o => o.id === key);
    return sum + (item ? item.cost : 0);
  }, 0);

  const grandTotal = (selectedPlot?.basePrice || 0) + (selectedArch?.cost || 0) + addonsTotal;
  
  // Format Lakhs/Crores
  const formatCost = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    return `₹${(num / 100000).toFixed(2)} Lakhs`;
  };

  const estimatedRentalAnnual = Math.round(grandTotal * 0.12);
  const estimatedMonthlyEmi = Math.round((grandTotal * 0.8 * (0.0875 / 12) * Math.pow(1 + 0.0875 / 12, 180)) / (Math.pow(1 + 0.0875 / 12, 180) - 1));

  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full mb-3 border border-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Project Innovation</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Design & Price Your Dream Coastal Retreat
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Customize your plot, select vernacular or contemporary architecture, add luxury amenities, 
            and view real-time estimates for construction, monthly EMI, and vacation rental yields.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-stone-850/80 p-6 sm:p-8 rounded-3xl border border-stone-800 backdrop-blur-md">
            
            {/* Step 1: Choose Plot */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-900 border border-teal-500 text-teal-200 flex items-center justify-center text-[10px]">1</span>
                  Select Land / Plot Location
                </span>
                <span className="text-xs text-stone-400">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plotOptions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPlotType(p.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      plotType === p.id 
                        ? 'border-amber-400 bg-amber-400/10 text-white ring-1 ring-amber-400' 
                        : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-xs text-white mb-1">{p.name}</h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug">{p.desc}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-baseline">
                      <span className="text-[10px] text-teal-300">{p.size}</span>
                      <span className="font-bold text-amber-300 text-xs">{formatCost(p.basePrice)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Architectural Style */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-900 border border-teal-500 text-teal-200 flex items-center justify-center text-[10px]">2</span>
                  Select Architectural Villa Style
                </span>
                <span className="text-xs text-stone-400">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {archOptions.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => setArchStyle(a.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      archStyle === a.id 
                        ? 'border-teal-400 bg-teal-400/10 text-white ring-1 ring-teal-400' 
                        : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-xs text-white mb-1">{a.name}</h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug">{a.desc}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-400">{a.builtUp}</span>
                      <span className="font-bold text-teal-300 text-xs">+{formatCost(a.cost)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Luxury Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-900 border border-teal-500 text-teal-200 flex items-center justify-center text-[10px]">3</span>
                  Optional Upgrades & Amenities
                </span>
                <span className="text-xs text-stone-400">Step 3 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setAddons({ ...addons, [opt.id]: !addons[opt.id] })}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      addons[opt.id] 
                        ? 'border-emerald-500/80 bg-emerald-500/10 text-white' 
                        : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        addons[opt.id] ? 'bg-emerald-500 border-emerald-400 text-stone-950' : 'border-stone-700'
                      }`}>
                        {addons[opt.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">{opt.label}</div>
                        <div className="text-[10px] text-stone-400">{opt.desc}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">+{formatCost(opt.cost)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Real-Time Estimation & Financial Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-6 sm:p-8 rounded-3xl border border-teal-500/40 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                <div>
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                    Custom Configuration Summary
                  </span>
                  <span className="text-xs text-stone-400">Instant Estimate Breakdown</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-900 text-teal-200 border border-teal-700">
                  Ready to Build
                </span>
              </div>

              {/* Total Estimated Cost */}
              <div className="bg-stone-900/90 p-5 rounded-2xl border border-stone-800 mb-6">
                <span className="text-xs text-stone-400 uppercase font-semibold block mb-1">
                  All-Inclusive Estimated Investment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300">
                  {formatCost(grandTotal)}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Includes Land NA Title, Sanctions & Construction</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 text-xs text-stone-300 mb-6">
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400">Land: {selectedPlot?.name}</span>
                  <span className="font-bold text-white">{formatCost(selectedPlot?.basePrice || 0)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400">Villa: {selectedArch?.name}</span>
                  <span className="font-bold text-white">{formatCost(selectedArch?.cost || 0)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400">Add-ons Total</span>
                  <span className="font-bold text-emerald-400">+{formatCost(addonsTotal)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400">Est. 15-Year Monthly EMI</span>
                  <span className="font-bold text-cyan-300">₹{estimatedMonthlyEmi.toLocaleString('en-IN')}/mo</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-400">Est. Annual Tourism Rental Yield</span>
                  <span className="font-bold text-amber-300">+{formatCost(estimatedRentalAnnual)} / year</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-stone-800 space-y-2.5">
              <button
                onClick={() => onBookSiteVisit({
                  title: `Custom ${selectedArch?.name} on ${selectedPlot?.name}`,
                  price: formatCost(grandTotal)
                })}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Book Free Site Visit for This Custom Setup</span>
              </button>

              <p className="text-[10px] text-stone-400 text-center">
                Complimentary chauffeur pickup from Khed / Dapoli and fresh Konkani meal included.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
