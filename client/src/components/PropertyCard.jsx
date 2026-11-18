import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Waves, 
  Maximize2, 
  Bed, 
  Bath, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  MessageCircle
} from 'lucide-react';

export default function PropertyCard({ property, onSelectProperty, onBookSiteVisit }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Property Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-900/90 text-teal-100 backdrop-blur-md border border-teal-700/50 shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {property.badge || property.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900/80 text-stone-200 backdrop-blur-md border border-white/20">
            {property.possession}
          </span>
        </div>

        {/* Distance to Beach overlay badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            {property.distanceToBeach}
          </span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Title */}
          <div className="flex items-center gap-1.5 text-xs text-teal-800 font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{property.location}</span>
          </div>

          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 leading-snug group-hover:text-teal-800 transition-colors mb-2">
            {property.title}
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {property.tagline || property.description}
          </p>

          {/* Key Specs Pill Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200/70 mb-4">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Plot / Land Area</span>
              <span className="font-bold text-stone-900">{property.plotSize}</span>
            </div>

            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Construction / FSI</span>
              <span className="font-bold text-stone-900">{property.builtUpArea}</span>
            </div>

            {property.bedrooms && (
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Bedrooms</span>
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-teal-600" />
                  {property.bedrooms} BHK Luxury
                </span>
              </div>
            )}

            <div className={property.bedrooms ? '' : 'col-span-2'}>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Title & Approvals</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1 truncate">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                {property.titleStatus}
              </span>
            </div>
          </div>

          {/* Highlights checklist preview */}
          <div className="space-y-1.5 mb-5 text-xs text-stone-600">
            {property.highlights.slice(0, 2).map((h, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-stone-400 uppercase font-semibold block">Investment Price</span>
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {property.price}
              </span>
            </div>
            <span className="text-[11px] text-teal-800 font-semibold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              Clear 7/12 Sanad
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProperty(property)}
              className="w-full py-2.5 px-3 rounded-xl border border-teal-700 text-teal-800 hover:bg-teal-50 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Details & Plans</span>
            </button>

            <button
              onClick={() => onBookSiteVisit(property)}
              className="w-full py-2.5 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
