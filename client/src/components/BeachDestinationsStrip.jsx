import React from 'react';
import { Waves, MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function BeachDestinationsStrip({ selectedLocation, onSelectLocation }) {
  const beaches = [
    {
      id: 'Murud',
      name: 'Murud Beach',
      tagline: 'Watersports & Dolphin Safaris',
      highlight: 'Direct Beachfront Villas',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: '3 Villas & Plots'
    },
    {
      id: 'Ladghar',
      name: 'Ladghar Beach',
      tagline: 'Famous Red Pebble Shore & Parasailing',
      highlight: 'Collector NA Plots (400m)',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: '18 Gated NA Plots'
    },
    {
      id: 'Karde',
      name: 'Karde Beach',
      tagline: 'Expansive White Sandbanks & Sunsets',
      highlight: 'Mango Agro Estates & Cottages',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: '6 1-Acre Estates'
    },
    {
      id: 'Anjarle',
      name: 'Anjarle Promontory',
      tagline: 'Historic Suvarnadurg Sea Fort View',
      highlight: 'Hilltop Sea-Facing Plots',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: '8 Panoramic Plots'
    },
    {
      id: 'Kelshi',
      name: 'Kelshi Coastal Belt',
      tagline: 'Lush Betel Nut Palms & Heritage Dunes',
      highlight: 'Vernacular Eco-Villas',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: '4 Eco-Villas'
    }
  ];

  return (
    <section className="bg-stone-900 text-white py-12 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3 py-0.5 rounded-full mb-1 border border-amber-800/60">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Dapoli Coastal Beach Zones</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Explore By Dapoli's 5 Iconic Shorelines
            </h3>
          </div>

          <p className="text-xs text-stone-400 max-w-md">
            Click on any beach to instantly filter available Collector NA plots, beachfront villas, and agro estates located in that sector.
          </p>
        </div>

        {/* 5 Beach Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {beaches.map((b) => {
            const isSelected = selectedLocation.toLowerCase() === b.id.toLowerCase();
            return (
              <div
                key={b.id}
                onClick={() => {
                  onSelectLocation(isSelected ? 'All' : b.id);
                  const el = document.getElementById('properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer border transition-all duration-300 flex flex-col justify-between p-4 ${
                  isSelected 
                    ? 'border-amber-400 ring-2 ring-amber-400 shadow-xl scale-[1.03]' 
                    : 'border-stone-800 hover:border-teal-400 hover:scale-[1.02]'
                }`}
              >
                {/* Background Photo */}
                <img 
                  src={b.image} 
                  alt={b.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Top Badge */}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-teal-300 backdrop-blur-md border border-white/10">
                    {b.plotsAvailable}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <h4 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {b.name}
                  </h4>
                  <p className="text-[11px] text-stone-300 font-medium line-clamp-1 mt-0.5">
                    {b.tagline}
                  </p>
                  <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-amber-300 font-bold">
                    <span>{b.highlight}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
