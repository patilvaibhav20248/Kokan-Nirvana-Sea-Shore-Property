import React from 'react';
import { Star, Quote, MapPin, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-50 px-3.5 py-1 rounded-full mb-3 border border-teal-200">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Community of Happy Coastal Homeowners</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Loved by Families from Mumbai, Pune & Abroad
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Discover why doctors, business owners, senior executives, and NRIs trust Kokan Nirvana 
            for legitimate, clear-title sea-facing properties in Dapoli.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-stone-50 rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-700/20" />
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center gap-3">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-700/40"
                />
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{t.name}</h4>
                  <div className="text-[11px] text-teal-800 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{t.location}</span>
                  </div>
                  <div className="text-[10px] text-stone-500 truncate mt-0.5">
                    Purchased: {t.propertyPurchased}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Bar */}
        <div className="mt-16 bg-teal-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300">125+</div>
            <div className="text-xs text-teal-200 font-medium mt-1">Acres Developed in Dapoli</div>
          </div>
          <div className="w-px h-10 bg-teal-800 hidden sm:block"></div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300">480+</div>
            <div className="text-xs text-teal-200 font-medium mt-1">Delighted Plot & Villa Owners</div>
          </div>
          <div className="w-px h-10 bg-teal-800 hidden sm:block"></div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-teal-200 font-medium mt-1">Sanctioned Collector NA Orders</div>
          </div>
          <div className="w-px h-10 bg-teal-800 hidden sm:block"></div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-cyan-300">0 - 400m</div>
            <div className="text-xs text-teal-200 font-medium mt-1">Distance to Arabian Sea</div>
          </div>
        </div>

      </div>
    </section>
  );
}
