import React from 'react';
import { Waves, MapPin, Compass, ArrowRight } from 'lucide-react';
import { dapoliBeaches } from '../data/dapoliData';

export default function BeachDestinationsStrip({ selectedLocation, onSelectLocation }) {
  const beachCards = [
    {
      id: 'Ladghar',
      name: 'Ladghar Beach',
      localName: 'तांबडी वाळू (Red Pebble Shore)',
      tagline: 'Water sports, coastal ridge & sunsets',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: 'Sandalwood Palms Plots (450m)'
    },
    {
      id: 'Murud',
      name: 'Murud Beach',
      localName: 'Dolphin Bay & Watersports',
      tagline: 'Expansive golden sand & seafood shacks',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: 'The Azure Coast Villas (80m)'
    },
    {
      id: 'Karde',
      name: 'Karde Beach',
      localName: '4 km White Sand Coastal Stretch',
      tagline: 'Serene, flat sandbanks & palm groves',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: 'Alphonso Mango Estates (1.8 km)'
    },
    {
      id: 'Anjarle',
      name: 'Anjarle & Suvarnadurg',
      localName: 'Sea Fort & Dolphin Haven',
      tagline: 'Historic island fortress & hill shrine',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: 'Sea Breeze Hilltop NA Plots'
    },
    {
      id: 'Kelshi',
      name: 'Kelshi Dunes',
      localName: 'Heritage Dunes & Betel Palms',
      tagline: 'Untouched shoreline & village culture',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80',
      plotsAvailable: 'The Coconut Grove Cottages'
    }
  ];

  return (
    <section className="bg-stone-50 text-stone-900 py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 px-3 py-1 rounded-full mb-2 border border-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-800" />
              <span>Dapoli Coastal Geography</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900">
              Explore by Dapoli’s 5 Distinct Beach Belts
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Click on any beach belt to view land layouts and properties situated in that specific coastal village.
          </p>
        </div>

        {/* 5 Beach Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {beachCards.map((b) => {
            const isSelected = selectedLocation.toLowerCase() === b.id.toLowerCase();
            return (
              <div
                key={b.id}
                onClick={() => {
                  onSelectLocation(isSelected ? 'All' : b.id);
                  const el = document.getElementById('properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer border transition-all duration-300 flex flex-col justify-between p-4 ${
                  isSelected 
                    ? 'border-stone-900 ring-2 ring-stone-900 shadow-xl scale-[1.03]' 
                    : 'border-stone-200 hover:border-amber-800 hover:shadow-md hover:scale-[1.02]'
                }`}
              >
                {/* Background Photo */}
                <img 
                  src={b.image} 
                  alt={b.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.62]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-black/40 to-transparent"></div>

                {/* Top Badge */}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 backdrop-blur-md border border-white/20">
                    {b.plotsAvailable}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 text-white">
                  <h4 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {b.name}
                  </h4>
                  <div className="text-[10px] text-amber-300 font-medium">
                    {b.localName}
                  </div>
                  <p className="text-[11px] text-stone-300 font-normal line-clamp-1 mt-0.5">
                    {b.tagline}
                  </p>
                  <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-white font-bold">
                    <span>Inspect Area</span>
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
