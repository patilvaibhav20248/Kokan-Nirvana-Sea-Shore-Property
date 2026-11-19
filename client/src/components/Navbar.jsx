import React, { useState, useEffect } from 'react';
import { 
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
  Calculator,
  Compass
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
      {/* Top Real-World Status Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-stone-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Dapoli Site Office: Near Murud Beach Road Junction, Ratnagiri</span>
            </span>
            <span className="text-stone-700">|</span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Dapoli Coastal Weather: {weatherData ? `${weatherData.temperature} • ${weatherData.condition} (AQI ${weatherData.aqi})` : '26°C • Sea Breeze (AQI 18)'}</span>
            </span>
            <span className="text-stone-700">|</span>
            <span className="text-amber-300 font-medium">
              🚗 4 Hrs from Mumbai (NH-66 / Ro-Ro) • 3.5 Hrs from Pune
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Collector NA Class-1 • Separate 7/12 Extract
            </span>
            <span className="text-stone-700">|</span>
            <button
              type="button"
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
          ? 'glass-panel shadow-md py-3 border-b border-stone-200' 
          : 'bg-[#faf8f5]/95 backdrop-blur-md py-4 border-b border-stone-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-950/10 group-hover:scale-105 transition-transform">
              <Waves className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                  Kokan Nirvana
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 hidden sm:inline-block">
                  Sea Shore Dapoli
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
                Property Developers • Ratnagiri
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <a href="#properties" className="hover:text-amber-900 transition-colors">Projects</a>
            <a href="#plot-calculator" className="hover:text-amber-900 transition-colors flex items-center gap-1 text-amber-900">
              <Calculator className="w-3.5 h-3.5 text-amber-800" />
              <span>Plot Calculator</span>
            </a>
            <a href="#master-plan" className="hover:text-amber-900 transition-colors">Master Plan</a>
            <a href="#route-guide" className="hover:text-amber-900 transition-colors">Travel Routes</a>
            <a href="#legal-guide" className="hover:text-amber-900 transition-colors">7/12 Legal Guide</a>
            <a href="#faqs" className="hover:text-amber-900 transition-colors">Buyer FAQs</a>
            <a href="#contact" className="hover:text-amber-900 transition-colors">Contact Site Office</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20am%20interested%20in%20sea-facing%20NA%20plots%20in%20Dapoli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              type="button"
              onClick={onOpenSiteVisit}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-amber-900 cursor-pointer"
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
                Featured Projects & Plots
              </a>
              <a 
                href="#plot-calculator" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50 flex items-center justify-between text-amber-900 font-bold"
              >
                <span>Guntha & Stamp Duty Calculator</span>
                <span className="px-2 py-0.5 text-[10px] bg-amber-100 text-amber-900 rounded-full">Popular</span>
              </a>
              <a 
                href="#master-plan" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Interactive Master Plan
              </a>
              <a 
                href="#route-guide" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Mumbai & Pune Travel Routes
              </a>
              <a 
                href="#legal-guide" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                7/12 & Collector NA Legal Guide
              </a>
              <a 
                href="#faqs" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Buyer Frequently Asked Questions
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-stone-50"
              >
                Dapoli Site Office & Directions
              </a>
            </nav>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSiteVisit();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-stone-900"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                Book VIP Site Visit (Free Station Pickup)
              </button>

              <button
                type="button"
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
