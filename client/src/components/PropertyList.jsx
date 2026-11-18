import React from 'react';
import PropertyCard from './PropertyCard';
import { Sparkles, Layers, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function PropertyList({ 
  properties, 
  activeCategory, 
  setActiveCategory, 
  onSelectProperty, 
  onBookSiteVisit,
  onResetFilters
}) {
  const categories = [
    { id: 'All', label: 'All Offerings' },
    { id: 'NA Plot', label: 'Collector NA Plots' },
    { id: 'Villa', label: 'Beachfront Villas' },
    { id: 'Farmhouse', label: 'Alphonso Mango Agro Estates' },
    { id: 'Cottage', label: 'Oceanview Cottages' },
  ];

  return (
    <section id="properties" className="py-20 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-100/80 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>Curated Coastal Real Estate Collection</span>
            </div>
            
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              Exclusive Coastal Properties & Plots in Dapoli
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Every project comes with 100% verified legal clear title, individual 7/12 land extract, 
              sanctioned Collector NA orders, and direct access to pristine Arabian Sea beaches.
            </p>
          </div>

          <div className="mt-6 md:mt-0 text-xs font-semibold text-stone-500 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Showing {properties.length} Active Verified Projects</span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-teal-900 text-white shadow-md shadow-teal-950/20 scale-[1.02]'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:text-teal-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Property Grid or Empty State */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelectProperty={onSelectProperty}
                onBookSiteVisit={onBookSiteVisit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-2">
              No Properties Found Matching Your Filters
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              Try adjusting your price range or beach location to explore available NA plots and villas.
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
