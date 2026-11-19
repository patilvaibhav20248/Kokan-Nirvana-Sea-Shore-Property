import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Waves, 
  Maximize2, 
  Calendar, 
  CheckCircle2, 
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyCard({ property, onSelectProperty, onBookSiteVisit, onReserveProperty }) {
  const { isLiked, toggleLike } = useFavorites();
  const liked = isLiked(property.id);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLike(property.id);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative">
      
      {/* Property Image & Status */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-900/90 text-white backdrop-blur-md shadow-sm">
            {property.category || property.projectType}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 backdrop-blur-md border border-emerald-700/50">
            {property.possession}
          </span>
        </div>

        {/* Like / Favorite Button */}
        <button
          type="button"
          onClick={handleLikeClick}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
            liked
              ? 'bg-white text-red-500 scale-110 shadow-red-500/20'
              : 'bg-black/40 hover:bg-white text-white hover:text-red-500 backdrop-blur-md'
          }`}
          aria-label={liked ? 'Remove from favorites' : 'Save property for later'}
          title={liked ? 'Saved in your shortlist' : 'Save for later'}
        >
          <Heart className={`w-4 h-4 transition-transform ${liked ? 'fill-red-500 scale-110' : ''}`} />
        </button>

        {/* Distance Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
            <Waves className="w-3.5 h-3.5 text-cyan-300" />
            {property.distanceToBeach || property.beachProximity}
          </span>
          {liked && (
            <span className="text-[10px] font-bold bg-red-600/90 text-white px-2 py-0.5 rounded-full backdrop-blur-md">
              Saved
            </span>
          )}
        </div>
      </div>

      {/* Property Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{property.location}</span>
          </div>

          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors mb-2">
            {property.title}
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {property.tagline || property.description}
          </p>

          {/* Maharashtrian Land Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 mb-4">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Land / Plot Area</span>
              <span className="font-bold text-stone-900">{property.plotSize || property.plotSizes}</span>
            </div>

            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Sanction / FSI</span>
              <span className="font-bold text-stone-900">{property.builtUpArea || property.fsi || '1.0 FSI Base'}</span>
            </div>

            <div className="col-span-2 pt-1 border-t border-stone-200/60">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Title & Revenue Clearance</span>
              <span className="font-semibold text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {property.titleStatus}
              </span>
            </div>
          </div>

          {/* Highlights bullets */}
          <div className="space-y-1.5 mb-5 text-xs text-stone-600">
            {property.highlights.slice(0, 2).map((h, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Human Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-bold block">Agreement Price</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {property.price || property.priceStarting}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Freehold 7/12 Title
            </span>
          </div>

          {/* 3 Action Buttons: Dossier | Reserve Plot | Book Site Visit */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onSelectProperty(property)}
              className="py-2.5 px-2 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-800 hover:bg-stone-50 font-bold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-stone-500" />
              <span>Dossier</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onReserveProperty) {
                  onReserveProperty(property);
                } else if (onBookSiteVisit) {
                  onBookSiteVisit(property);
                }
              }}
              className="py-2.5 px-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Reserve</span>
            </button>

            <button
              type="button"
              onClick={() => onBookSiteVisit(property)}
              className="py-2.5 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Visit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
