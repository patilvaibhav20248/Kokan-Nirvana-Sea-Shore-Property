import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Waves, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Eye, 
  CornerDownRight, 
  Award,
  Layers
} from 'lucide-react';

export default function MasterPlanExplorer({ plots, onReservePlot, onOpenBrochure }) {
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activePlot, setActivePlot] = useState(plots[0] || null);

  const zones = ['All', 'Oceanfront Row A', 'Palm Boulevard Row B', 'Hillcrest Ridge Row C'];
  
  const filteredPlots = plots.filter(plot => {
    const matchesZone = selectedZone === 'All' || plot.zone === selectedZone;
    const matchesStatus = selectedStatus === 'All' || plot.status === selectedStatus;
    return matchesZone && matchesStatus;
  });

  const availableCount = plots.filter(p => p.status === 'available').length;
  const reservedCount = plots.filter(p => p.status === 'reserved').length;
  const soldCount = plots.filter(p => p.status === 'sold').length;

  return (
    <section id="master-plan" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      
      {/* Decorative coastal background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full mb-3 border border-amber-800/60">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Layout & Master Plan Explorer</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Select Your Sea-Facing NA Plot
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Explore demarcated Collector NA plots in Sandalwood Palms & Sea Breeze Enclave, Dapoli. 
            Click on any plot number to view dimensions, facing orientation, pricing, and instantly reserve your piece of paradise.
          </p>
        </div>

        {/* Legend & Summary Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 backdrop-blur-md mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <div>
              <span className="text-xs text-stone-400 block font-medium">Available</span>
              <span className="text-lg font-bold text-white">{availableCount} Units</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <div>
              <span className="text-xs text-stone-400 block font-medium">Under Token / Reserved</span>
              <span className="text-lg font-bold text-white">{reservedCount} Units</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-stone-600"></span>
            <div>
              <span className="text-xs text-stone-400 block font-medium">Sold Out</span>
              <span className="text-lg font-bold text-white">{soldCount} Units</span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end">
            <button
              onClick={onOpenBrochure}
              className="text-xs font-bold text-teal-300 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Download PDF Master Plan →
            </button>
          </div>
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedZone === zone
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-800 text-stone-200 border border-stone-700 rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="available">Available Only</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        {/* Master Plan Interactive Layout View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Plots Grid (Visual Map Representation) */}
          <div className="lg:col-span-2 bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Waves className="w-4 h-4 text-cyan-400" />
                Arabian Sea Shore (West Facing Shoreline)
              </span>
              <span className="text-stone-500 font-mono">30-Ft Wide Internal Tar Road</span>
            </div>

            {/* Visual plot grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredPlots.map((plot) => {
                const isSelected = activePlot?.id === plot.id;
                let statusBg = 'bg-stone-800/80 border-stone-700 text-stone-300 hover:border-emerald-500';
                let badgeBg = 'bg-emerald-950 text-emerald-400 border-emerald-700/60';

                if (plot.status === 'available') {
                  statusBg = isSelected 
                    ? 'bg-emerald-900/60 border-emerald-400 text-white ring-2 ring-emerald-400' 
                    : 'bg-stone-900 border-emerald-800/60 text-stone-100 hover:border-emerald-400 hover:bg-stone-800/90';
                  badgeBg = 'bg-emerald-950 text-emerald-300 border-emerald-800';
                } else if (plot.status === 'reserved') {
                  statusBg = isSelected
                    ? 'bg-amber-900/60 border-amber-400 text-white ring-2 ring-amber-400'
                    : 'bg-stone-900 border-amber-800/50 text-stone-300 hover:border-amber-400';
                  badgeBg = 'bg-amber-950 text-amber-300 border-amber-800';
                } else if (plot.status === 'sold') {
                  statusBg = 'bg-stone-900/50 border-stone-800 text-stone-500 opacity-60 cursor-not-allowed';
                  badgeBg = 'bg-stone-800 text-stone-400 border-stone-700';
                }

                return (
                  <div
                    key={plot.id}
                    onClick={() => plot.status !== 'sold' && setActivePlot(plot)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between aspect-[16/12] relative group ${statusBg}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                          {plot.name}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${badgeBg}`}>
                          {plot.status}
                        </span>
                      </div>
                      
                      <div className="text-xs font-semibold text-stone-300">
                        {plot.size}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate">
                        {plot.facing}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-black text-amber-300">{plot.price}</span>
                      <span className="text-[10px] text-stone-400 group-hover:text-white">
                        {plot.status === 'available' ? 'Inspect →' : plot.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Gate Entrance & Security Post (East)</span>
              <span>⚡ Underground Electricity & Water Line Demarcated</span>
            </div>
          </div>

          {/* Active Plot Details & Reservation Card */}
          <div className="bg-stone-800/95 p-6 sm:p-7 rounded-3xl border border-stone-700 shadow-xl flex flex-col justify-between">
            {activePlot ? (
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-300 uppercase tracking-wider bg-teal-950 px-2.5 py-1 rounded-md mb-4 border border-teal-800">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>{activePlot.zone}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-1">
                  {activePlot.name}
                </h3>
                <p className="text-xs text-stone-300 mb-6 font-medium">
                  {activePlot.type} • Collector Sanctioned NA Land
                </p>

                {/* Plot Specs */}
                <div className="space-y-3 bg-stone-900/80 p-4 rounded-xl border border-stone-700/80 mb-6 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">Plot Dimension</span>
                    <span className="font-bold text-white">{activePlot.size}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">Orientation</span>
                    <span className="font-bold text-teal-300">{activePlot.facing}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">Sanctioned Sanad</span>
                    <span className="font-bold text-emerald-400">Collector Approved</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-400">Title Documentation</span>
                    <span className="font-bold text-white">Separate 7/12 Extract</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-xs text-stone-400 uppercase font-semibold block mb-0.5">Investment Consideration</span>
                  <div className="text-3xl font-extrabold text-amber-300">
                    {activePlot.price}
                  </div>
                  <span className="text-[11px] text-stone-400">
                    *Includes demarcation, internal road frontage, and underground utility conduits.
                  </span>
                </div>

                {/* Reservation Action */}
                {activePlot.status === 'available' ? (
                  <button
                    onClick={() => onReservePlot(activePlot)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-stone-950" />
                    <span>Reserve / Enquire for {activePlot.name}</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-stone-900 text-center text-xs text-amber-300 border border-stone-700 font-medium">
                    This plot is currently under reservation or token. You can enquire to be next in line if it becomes available.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-stone-400 text-sm">
                Click any plot on the master plan to inspect details.
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-stone-700 text-xs text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free title search copy available prior to booking deposit.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
