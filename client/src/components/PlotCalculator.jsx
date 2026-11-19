import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Check, Calendar, Info, Layers, IndianRupee } from 'lucide-react';

export default function PlotCalculator({ onBookSiteVisit }) {
  // Mode: 'guntha' or 'sqft'
  const [unitMode, setUnitMode] = useState('guntha');
  const [gunthaInput, setGunthaInput] = useState(2.5);
  const [sqftInput, setSqftInput] = useState(2722);
  const [ratePerSqFt, setRatePerSqFt] = useState(980); // standard NA rate in Ladghar / Dapoli

  // 1 Guntha = 1089 Sq.Ft.
  const handleGunthaChange = (val) => {
    const g = parseFloat(val) || 0;
    setGunthaInput(g);
    setSqftInput(Math.round(g * 1089));
  };

  const handleSqftChange = (val) => {
    const s = parseFloat(val) || 0;
    setSqftInput(s);
    setGunthaInput(parseFloat((s / 1089).toFixed(2)));
  };

  // Financial calculations
  const totalAreaSqFt = sqftInput;
  const agreementValue = Math.round(totalAreaSqFt * ratePerSqFt);
  
  // Ratnagiri District Stamp Duty: 6% for rural/Grampanchayat coastal zone
  const stampDutyRate = 0.06;
  const stampDutyAmount = Math.round(agreementValue * stampDutyRate);

  // Registration Fee: 1% capped at Rs 30,000 in Maharashtra
  const registrationFee = Math.min(Math.round(agreementValue * 0.01), 30000);

  // Legal documentation, title verification search & Sub-Registrar filing
  const legalDocsFee = 15000;

  const totalAllInclusive = agreementValue + stampDutyAmount + registrationFee + legalDocsFee;

  const formatInr = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakhs`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <section id="plot-calculator" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 px-3 py-1 rounded-full mb-3 border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-800" />
            <span>Maharashtra Land Revenue Transparency</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Guntha to Sq.Ft Land & Registration Fee Calculator
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            In Maharashtra, land is measured in <strong>Gunthas</strong> (1 Guntha = 1,089 sq.ft). 
            Use our calculator to estimate exact plot dimensions and the mandatory government stamp duty & registration charges in Ratnagiri District.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unit Toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Primary Input Unit:
              </span>
              <div className="flex bg-stone-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUnitMode('guntha')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unitMode === 'guntha' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Guntha (गुंठा)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitMode('sqft')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unitMode === 'sqft' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Square Feet (चौ. फूट)
                </button>
              </div>
            </div>

            {/* Plot Size Preset Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Popular Dapoli Plot Sizes:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "2.0 Guntha", g: 2.0, sq: 2178, desc: "Boutique Cottage" },
                  { label: "2.5 Guntha", g: 2.5, sq: 2722, desc: "Standard Villa Plot" },
                  { label: "4.0 Guntha", g: 4.0, sq: 4356, desc: "Large Garden Villa" },
                  { label: "10 Guntha", g: 10.0, sq: 10890, desc: "Mini Orchard Plot" },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setGunthaInput(preset.g);
                      setSqftInput(preset.sq);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      gunthaInput === preset.g 
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-bold text-xs">{preset.label}</div>
                    <div className="text-[10px] opacity-75">{preset.sq.toLocaleString('en-IN')} sq.ft</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Numerical Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Area in Guntha (गुंठा)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="40"
                    value={gunthaInput}
                    onChange={(e) => handleGunthaChange(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs text-stone-400 font-bold">Guntha</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Area in Square Feet (चौ. फूट)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="50"
                    min="1089"
                    value={sqftInput}
                    onChange={(e) => handleSqftChange(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs text-stone-400 font-bold">sq.ft</span>
                </div>
              </div>
            </div>

            {/* Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Estimated NA Land Rate per Sq.Ft
                </label>
                <span className="text-sm font-black text-amber-900">
                  ₹{ratePerSqFt} / sq.ft
                </span>
              </div>
              <input
                type="range"
                min="650"
                max="1800"
                step="50"
                value={ratePerSqFt}
                onChange={(e) => setRatePerSqFt(Number(e.target.value))}
                className="w-full accent-amber-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>₹650 (Valley / Agro plots)</span>
                <span>₹980 (Ladghar Ridge NA)</span>
                <span>₹1,800+ (Murud Beachfront)</span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Why Guntha matters:</strong> In Maharashtra revenue records, a separate 7/12 extract is issued per Gat/Survey number with exact Guntha measurement and boundary demarcation done by the government revenue surveyor (TILR).
              </div>
            </div>

          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    All-Inclusive Cost Breakdown
                  </span>
                  <span className="text-xs text-stone-400">Ratnagiri District Revenue Rules</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700">
                  Collector NA
                </span>
              </div>

              {/* Base Cost */}
              <div className="mb-6 bg-stone-950 p-5 rounded-2xl border border-stone-800">
                <span className="text-xs text-stone-400 uppercase font-bold block mb-1">
                  Estimated Total Outlay
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300">
                  {formatInr(totalAllInclusive)}
                </div>
                <span className="text-[11px] text-stone-400 block mt-1">
                  Includes plot cost + 100% government registration & title charges
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-stone-300 mb-6">
                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-400">Plot Base Agreement Value</span>
                  <span className="font-bold text-white">{formatInr(agreementValue)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-400">Maharashtra Stamp Duty (6%)</span>
                  <span className="font-bold text-amber-300">{formatInr(stampDutyAmount)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-stone-800">
                  <span className="text-stone-400">Government Registration Fee (1%)</span>
                  <span className="font-bold text-white">₹{registrationFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Sub-Registrar Filing & Advocate Title Search</span>
                  <span className="font-bold text-white">₹{legalDocsFee.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-3">
              <button
                type="button"
                onClick={() => onBookSiteVisit({
                  title: `${gunthaInput} Guntha Plot (${sqftInput.toLocaleString('en-IN')} sq.ft)`,
                  price: formatInr(agreementValue)
                })}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/40"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Book Site Visit for {gunthaInput} Guntha Plot</span>
              </button>

              <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero hidden charges. Sample 7/12 copy provided upfront.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
