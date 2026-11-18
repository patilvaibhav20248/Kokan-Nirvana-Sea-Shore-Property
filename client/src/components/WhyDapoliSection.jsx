import React from 'react';
import { 
  Compass, 
  MapPin, 
  Waves, 
  ShieldCheck, 
  Sun, 
  Wind, 
  Car, 
  Train, 
  Ship, 
  Award, 
  CheckCircle2, 
  Sparkles,
  TreePine,
  Anchor
} from 'lucide-react';

export default function WhyDapoliSection({ onOpenBrochure, onBookSiteVisit }) {
  const highlights = [
    {
      title: "The 'Mini Mahabaleshwar' Climate",
      desc: "Unlike typical coastal towns, Dapoli sits at an elevation of 800+ feet above sea level while overlooking the Arabian Sea, ensuring breezy, pleasantly cooler temperatures throughout the year.",
      icon: Wind,
      badge: "Pure Ozone AQI < 20"
    },
    {
      title: "Untouched Dolphin & Red-Pebble Beaches",
      desc: "Home to pristine coastal stretches like Murud Beach, Ladghar (famous for vibrant red pebbles and sea-dips), Karde (expansive sunset sandbanks), and Kelshi's majestic sand dunes.",
      icon: Waves,
      badge: "6 Pristine Shorelines"
    },
    {
      title: "Global Hub of Ratnagiri Alphonso Mangoes",
      desc: "World-renowned GI-tagged Alphonso (Hapus) mangoes, organic cashews, and sweet betel nut orchards flourish in Dapoli's mineral-rich laterite soil and sea-mist climate.",
      icon: TreePine,
      badge: "GI Tag Certified"
    },
    {
      title: "Epic Sea Forts & Maritime Heritage",
      desc: "Explore historic coastal fortresses built into the sea like Chhatrapati Shivaji Maharaj's Suvarnadurg, Harnai Port's bustling traditional fish auction, and ancient Keshavraj temple trails.",
      icon: Anchor,
      badge: "Rich Konkan Heritage"
    }
  ];

  const travelRoutes = [
    {
      from: "Mumbai (South / Island City)",
      time: "3.5 - 4 Hours",
      route: "Ro-Ro Ferry to Mandwa / Dighi, or NH-66 Mumbai-Goa 4-lane Highway via Pen & Mangaon",
      icon: Ship
    },
    {
      from: "Pune (Kothrud / Hinjawadi / Wakad)",
      time: "3 - 3.5 Hours",
      route: "Via Tamhini Ghat / Varandha Ghat to Mahad & Dapoli scenic mountain descent",
      icon: Car
    },
    {
      from: "Konkan Railway (Khed Station)",
      time: "25 Minutes (28 km)",
      route: "Vande Bharat Express & Tejas Express connectivity direct from Mumbai CSMT / Thane",
      icon: Train
    }
  ];

  return (
    <section id="why-dapoli" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-50 px-3.5 py-1 rounded-full mb-3 border border-teal-200">
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            <span>Destination Spotlight • Dapoli, Ratnagiri</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Why Dapoli is Maharashtra’s Most Desired Coastal Sanctuary
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Revered for generations as the crown jewel of southern Konkan, Dapoli offers clean ocean air, 
            rapid expressway connectivity, and booming tourism appreciation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-teal-700/50 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-900 bg-teal-100/80 px-2 py-0.5 rounded-full border border-teal-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rapid Connectivity & Travel Strip */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-800 mb-16 relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Fast-Track Connectivity</span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                Your Weekend Gateway Just Hours from the Metropolis
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2">
                With the new Mumbai-Goa 4-lane expressway (NH-66) and high-speed Ro-Ro water transport, 
                escaping Friday evening rush hour to reach your private Dapoli retreat is effortless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {travelRoutes.map((route, i) => {
                const RouteIcon = route.icon;
                return (
                  <div key={i} className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <RouteIcon className="w-6 h-6 text-teal-400" />
                        <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
                          {route.time}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white mb-1">{route.from}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed">{route.route}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 100% Legal Transparency & Security Checklist */}
        <div className="bg-gradient-to-r from-teal-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-teal-800/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Legal Ambiguity • Complete Peace of Mind</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-3">
                The Kokan Nirvana Legal Assurance
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                Buying coastal land in Konkan requires impeccable title diligence. Every Kokan Nirvana property passes rigorous 30-year legal scrutiny:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sanctioned Collector NA (Sanad) Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Individual 7/12 land extract in buyer's name</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Physical boundary demarcation with stone pillars</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Court Advocate 30-Year Title Search Report</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenBrochure}
                className="px-6 py-3 rounded-xl bg-white text-stone-950 font-bold text-xs sm:text-sm hover:bg-stone-100 transition-colors shadow-lg cursor-pointer"
              >
                Inspect Sample 7/12 & Legal Dossier
              </button>

              <button
                onClick={onBookSiteVisit}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-lg cursor-pointer"
              >
                Book Site Inspection
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
