import React, { useState } from 'react';
import { Sun, Sunset, Moon, Coffee, Waves, Wifi, Sparkles, Wind, Eye } from 'lucide-react';

export default function DayInDapoli() {
  const [activeSlot, setActiveSlot] = useState(2); // Default to Sunset

  const times = [
    {
      id: 0,
      time: '06:30 AM',
      phase: 'Dawn & Sunrise',
      icon: Sun,
      title: 'Morning Dolphin Walk on Red-Pebble Shore',
      desc: 'Wake up to the soft rumble of the Arabian Sea. Take a 5-minute stroll onto Ladghar or Murud beach to watch playful dolphin pods right by the shoreline in the crisp 22°C coastal breeze.',
      temp: '22°C',
      aqi: '12 (Pure Ozone)',
      vibe: 'Gentle waves & shorebirds',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 1,
      time: '11:00 AM',
      phase: 'Mid-Morning',
      icon: Coffee,
      title: 'Work From Paradise with High-Speed Fiber',
      desc: 'Sip fresh organic tender coconut water under shaded coconut and Alphonso mango canopies. High-speed optical fiber connectivity keeps you seamlessly connected to Mumbai, Pune, or global remote teams.',
      temp: '27°C',
      aqi: '16 (Clean Air)',
      vibe: 'Gentle rustling palm fronds',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      time: '05:30 PM',
      phase: 'Golden Hour Sunset',
      icon: Sunset,
      title: 'Private Sundowner Over the Ocean Horizon',
      desc: 'The sky turns into an arresting canvas of burnt orange, violet, and gold. Gather on your private villa deck overlooking the Arabian Sea as traditional fishing boats return to Harnai harbour.',
      temp: '25°C',
      aqi: '14 (Pure Coastal)',
      vibe: 'Warm ocean breeze & golden glow',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      time: '09:30 PM',
      phase: 'Night Sky',
      icon: Moon,
      title: 'Zero Light Pollution & Stargazing Silence',
      desc: 'Far away from metropolitan smog and noise, gaze at the Milky Way above your plot. Breathe clean coastal ozone, listen to the rhythmic tide, and enjoy the deepest, most restorative sleep of your life.',
      temp: '21°C',
      aqi: '10 (Exceptional)',
      vibe: 'Night crickets & gentle surf',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const current = times[activeSlot];

  return (
    <section className="py-20 bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-widest bg-teal-950 px-3.5 py-1 rounded-full mb-3 border border-teal-800">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>The Coastal Living Rhythm</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            24 Hours in Your Dapoli Paradise
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Click through the time-of-day timeline below to experience how life unfolds when you own a coastal home in Dapoli.
          </p>
        </div>

        {/* Time Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {times.map((t) => {
            const Icon = t.icon;
            const isActive = activeSlot === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveSlot(t.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isActive 
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-xl scale-[1.02] ring-2 ring-amber-300/60 font-bold' 
                    : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <span className={`text-[11px] block uppercase font-bold tracking-wider ${isActive ? 'text-stone-900' : 'text-teal-400'}`}>
                    {t.phase}
                  </span>
                  <span className="text-base font-black">{t.time}</span>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-stone-300'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Experience Canvas */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-stone-900 min-h-[420px] flex flex-col justify-between shadow-2xl">
          <img 
            key={current.image}
            src={current.image} 
            alt={current.title} 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>

          {/* Top Info Badges */}
          <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-amber-300 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5" />
              <span>{current.phase} • {current.time}</span>
            </span>

            <div className="flex items-center gap-3 text-xs">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white font-medium">
                🌡️ Temp: <strong className="text-amber-300">{current.temp}</strong>
              </span>
              <span className="bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-700/60 text-emerald-300 font-semibold">
                🍃 AQI: {current.aqi}
              </span>
            </div>
          </div>

          {/* Bottom Narrative Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-1 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ambience: {current.vibe}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-3">
              {current.title}
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-4">
              {current.desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
