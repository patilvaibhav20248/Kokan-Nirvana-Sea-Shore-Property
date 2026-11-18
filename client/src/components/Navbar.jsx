import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  Waves, 
  Sun, 
  MapPin, 
  Database, 
  MessageCircle, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ onOpenSiteVisit, onOpenAdmin, weatherData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Ambient Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-stone-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Dapoli, Ratnagiri Coast, Maharashtra</span>
            </span>
            <span className="text-stone-700">|</span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{weatherData ? `${weatherData.temperature} • ${weatherData.condition} (AQI ${weatherData.aqi})` : '26°C • Sunny Sea Breeze (AQI 18)'}</span>
            </span>
            <span className="text-stone-700">|</span>
            <span className="text-teal-300 font-medium">
              ⚡ 4 Hrs from Mumbai (Ro-Ro / NH-66) • 3.5 Hrs from Pune
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Collector NA Sanad • Individual 7/12 Titles
            </span>
            <span className="text-stone-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
              title="View Leads & Firebase Backend Status"
            >
              <Database className="w-3 h-3 text-cyan-400" />
              <span>Backend Desk</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel shadow-md py-3.5 border-b border-stone-200/80' 
          : 'bg-white/95 backdrop-blur-md py-4 border-b border-stone-200/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-900 via-teal-800 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
              <Waves className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                  Kokan Nirvana
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 hidden sm:inline-block">
                  Sea Shore
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
                Dapoli, Maharashtra
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <a href="#properties" className="hover:text-teal-800 transition-colors">Properties</a>
            <a href="#configurator" className="hover:text-teal-800 transition-colors flex items-center gap-1">
              <span>Villa Builder</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-800 font-extrabold lowercase">new</span>
            </a>
            <a href="#master-plan" className="hover:text-teal-800 transition-colors">Master Plan</a>
            <a href="#day-in-dapoli" className="hover:text-teal-800 transition-colors">24h Lifestyle</a>
            <a href="#legal-verifier" className="hover:text-teal-800 transition-colors">7/12 Verifier</a>
            <a href="#investment-roi" className="hover:text-teal-800 transition-colors">ROI Calculator</a>
            <a href="#contact" className="hover:text-teal-800 transition-colors">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20am%20interested%20in%20sea-facing%20plots%20in%20Dapoli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenSiteVisit}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-950/15 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book VIP Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-teal-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <nav className="flex flex-col space-y-1 text-sm font-semibold text-stone-800">
              <a 
                href="#properties" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Featured Properties & Plots
              </a>
              <a 
                href="#configurator" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>Custom Villa Builder</span>
                <span className="px-2 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded-full font-bold">Interactive</span>
              </a>
              <a 
                href="#master-plan" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Interactive Master Plan
              </a>
              <a 
                href="#day-in-dapoli" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                24-Hour Coastal Lifestyle
              </a>
              <a 
                href="#legal-verifier" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                7/12 & NA Title Verifier
              </a>
              <a 
                href="#investment-roi" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Investment & EMI Calculator
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Sales Office & Site Directions
              </a>
            </nav>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSiteVisit();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-stone-900"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                Book VIP Site Visit (Free Tour)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 border border-stone-200"
              >
                <Database className="w-3.5 h-3.5 text-cyan-600" />
                Backend Management & Leads
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
