import React from 'react';
import PropertyCard from './PropertyCard';
import { Layers, SlidersHorizontal, RotateCcw, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyList({ 
  properties, 
  activeCategory, 
  setActiveCategory, 
  onSelectProperty, 
  onBookSiteVisit,
  onReserveProperty,
  onResetFilters
}) {
  const { likedCount, likedIds } = useFavorites();

  const categories = [
    { id: 'All', label: 'All Projects' },
    { id: 'NA Plot', label: 'Collector NA Plots' },
    { id: 'Villa', label: 'Beachfront Villas' },
    { id: 'Farmhouse', label: 'Mango Agro Estates' },
    { id: 'Cottage', label: 'Oceanview Cottages' },
    { 
      id: 'Liked', 
      label: `Saved Favorites (${likedCount})`,
      isLikedTab: true 
    }
  ];

  const safeProperties = Array.isArray(properties) ? properties : [];
  const safeLikedIds = Array.isArray(likedIds) ? likedIds : [];
  // If "Liked" tab is selected, filter properties to only liked ones
  const displayedProperties = activeCategory === 'Liked'
    ? safeProperties.filter((p) => p && safeLikedIds.includes(p.id))
    : safeProperties;

  return (
    <section id="properties" className="py-20 bg-white border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full mb-3 border border-amber-200">
              <Layers className="w-3.5 h-3.5 text-amber-800" />
              <span>Dapoli Project Portfolio</span>
            </div>
            
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              Planned Land Layouts & Turnkey Coastal Villas
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Every single plot comes with a separate 7/12 extract in your personal name, sanctioned Collector NA orders, 
              internal 30-ft tar roads, and tap water connections.
            </p>
          </div>

          <div className="mt-6 md:mt-0 text-xs font-semibold text-stone-600 bg-stone-50 px-4 py-2 rounded-xl border border-stone-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>{displayedProperties.length} Verified Layouts Open for Booking</span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? cat.isLikedTab 
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-stone-900 text-white shadow-sm'
                  : cat.isLikedTab
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat.isLikedTab && <Heart className={`w-3.5 h-3.5 ${activeCategory === cat.id ? 'fill-white' : 'fill-red-600'}`} />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Property Grid or Empty State */}
        {displayedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelectProperty={onSelectProperty}
                onBookSiteVisit={onBookSiteVisit}
                onReserveProperty={onReserveProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-stone-50 rounded-3xl p-12 text-center border border-stone-200 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-stone-400 mx-auto mb-4 border border-stone-200">
              {activeCategory === 'Liked' ? (
                <Heart className="w-8 h-8 text-red-400" />
              ) : (
                <SlidersHorizontal className="w-8 h-8" />
              )}
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-2">
              {activeCategory === 'Liked'
                ? 'You Haven\'t Saved Any Properties Yet'
                : 'No Plots Found Matching This Filter'}
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              {activeCategory === 'Liked'
                ? 'Click the heart icon on any villa or plot to add it to your shortlist and view it later.'
                : 'Try adjusting your category or price range to explore available coastal NA plots and villas.'}
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Show All Properties</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
