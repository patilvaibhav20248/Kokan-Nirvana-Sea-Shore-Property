import React from 'react';
import { Car, Ship, Train, MapPin, Clock, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import { travelRoutes } from '../data/dapoliData';

export default function RouteGuide({ onBookSiteVisit }) {
  return (
    <section id="route-guide" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-50 px-3.5 py-1 rounded-full mb-3 border border-teal-200">
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            <span>Practical Buyer Travel Logistics</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            How to Reach Dapoli from Mumbai & Pune
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Dapoli is the northernmost coastal gem of Ratnagiri district, making it significantly closer to Mumbai and Pune than Goa, Malvan, or Ganpatipule.
          </p>
        </div>

        {/* 3 Real Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {travelRoutes.map((route, idx) => {
            let Icon = Car;
            if (idx === 0) Icon = Ship;
            if (idx === 2) Icon = Train;

            return (
              <div 
                key={idx} 
                className="bg-stone-50 rounded-3xl p-6 sm:p-7 border border-stone-200 hover:border-teal-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-200">
                      {route.driveTime}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-1">
                    {route.from}
                  </h3>
                  <div className="text-xs text-stone-500 font-semibold mb-3">
                    Distance: {route.distance}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed mb-4">
                    {route.bestRoute}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-stone-200/80">
                  <span className="font-bold text-stone-900 block mb-0.5">💡 Local Tip:</span>
                  {route.recommendation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Pickup Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Complimentary Concierge</span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
              Coming by Vande Bharat or Bus? We'll Pick You Up at Khed.
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Our site team provides complimentary chauffeur pickup from Khed Railway Station (28 km away) or Dapoli ST bus stand, including a guided coastal survey and traditional lunch.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBookSiteVisit(null)}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Schedule Free Station Pickup
          </button>
        </div>

      </div>
    </section>
  );
}
