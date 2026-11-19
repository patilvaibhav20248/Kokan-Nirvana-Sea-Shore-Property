import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Share2, 
  MessageCircle, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function SavedPropertiesDrawer({ properties, onSelectProperty, onReserveProperty }) {
  const { likedIds, toggleLike, drawerOpen, setDrawerOpen, clearFavorites } = useFavorites();

  if (!drawerOpen) return null;

  const safeProperties = Array.isArray(properties) ? properties : [];
  const safeLikedIds = Array.isArray(likedIds) ? likedIds : [];
  const savedList = safeProperties.filter((p) => p && safeLikedIds.includes(p.id));

  const handleShareWhatsApp = () => {
    if (savedList.length === 0) return;
    const titles = savedList.map((p, idx) => `${idx + 1}. ${p.title} (${p.location}) - ${p.price}`).join('%0A');
    const msg = `Hello! I have shortlisted these sea-facing properties at Kokan Nirvana Dapoli:%0A%0A${titles}%0A%0AWebsite: https://patilvaibhav20248.github.io/Kokan-Nirvana-Sea-Shore-Property/`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 transform transition-transform duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold">
                My Saved Properties
              </h3>
              <p className="text-[11px] text-stone-300">
                {savedList.length} {savedList.length === 1 ? 'property' : 'properties'} saved for later
              </p>
            </div>
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close saved drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {savedList.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-stone-800 mb-1">
                No Properties Saved Yet
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-6 max-w-xs mx-auto">
                Click the heart icon on any villa plot or project to save it here. You can easily compare and review your favorites anytime.
              </p>
              <a
                href="#properties"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <span>Explore Dapoli Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs pb-1">
                <span className="text-stone-500 font-medium">Your Shortlist:</span>
                <button
                  type="button"
                  onClick={clearFavorites}
                  className="text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              {savedList.map((property) => (
                <div 
                  key={property.id} 
                  className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/90 shadow-xs hover:shadow-sm transition-all flex flex-col gap-3 group"
                >
                  <div className="flex gap-3">
                    <img 
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'} 
                      alt={property.title} 
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md">
                          {property.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLike(property.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          title="Remove from saved"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-serif-luxury font-bold text-stone-900 text-sm mt-1 truncate">
                        {property.title}
                      </h4>

                      <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>

                      <div className="flex items-baseline justify-between mt-2 pt-1 border-t border-stone-200/70">
                        <span className="text-xs font-bold text-stone-900">
                          {property.price}
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium">
                          {property.plotSize}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDrawerOpen(false);
                        if (onSelectProperty) onSelectProperty(property);
                      }}
                      className="py-1.5 px-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 text-stone-500" />
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDrawerOpen(false);
                        if (onReserveProperty) onReserveProperty(property);
                      }}
                      className="py-1.5 px-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-3 h-3 text-amber-300" />
                      <span>Reserve Plot</span>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedList.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Share Shortlist via WhatsApp</span>
            </button>

            <a
              href="#reservation"
              onClick={() => setDrawerOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Go to Complete Reservation Portal</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
