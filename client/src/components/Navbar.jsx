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
  ChevronDown
} from 'lucide-react';
import { isFirebaseInitialized, firebaseConfig } from '../firebase/config';

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
      {/* Top Notification / Weather & Connectivity Bar */}
      <div className="bg-teal-950 text-teal-100 text-xs py-2 px-4 border-b border-teal-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-teal-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Dapoli, Ratnagiri Coast, Maharashtra</span>
            </span>
            <span className="text-teal-400/50">|</span>
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{weatherData ? `${weatherData.temperature} • ${weatherData.condition} (AQI ${weatherData.aqi})` : '26°C • Sunny Coastal Breeze (AQI 18)'}</span>
            </span>
            <span className="text-teal-400/50">|</span>
            <span className="text-teal-300">
              ⚡ 4 Hrs from Mumbai (Ro-Ro / NH-66) & 3.5 Hrs from Pune
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Clear Title • Collector NA Sanctioned
            </span>
            <span className="text-teal-400/50">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-teal-300 hover:text-white transition-colors cursor-pointer"
              title="View Leads & Firebase Backend Status"
            >
              <Database className="w-3 h-3 text-cyan-400" />
              <span>Backend & Leads</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-lg border-b border-stone-200/80 py-3' 
          : 'bg-white/95 backdrop-blur-md border-b border-stone-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
              <Waves className="w-6 h-6 text-teal-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                  Kokan Nirvana
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300/60 hidden sm:inline-block">
                  Sea Shore
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-teal-800 font-semibold">
                Dapoli • Maharashtra
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-stone-700">
            <a href="#properties" className="hover:text-teal-700 transition-colors">Properties</a>
            <a href="#master-plan" className="hover:text-teal-700 transition-colors flex items-center gap-1">
              <span>Master Plan</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Interactive</span>
            </a>
            <a href="#why-dapoli" className="hover:text-teal-700 transition-colors">Why Dapoli</a>
            <a href="#investment-roi" className="hover:text-teal-700 transition-colors">ROI Calculator</a>
            <a href="#testimonials" className="hover:text-teal-700 transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-teal-700 transition-colors">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919820012345?text=Hi%20Kokan%20Nirvana%20team,%20I%20am%20interested%20in%20sea-facing%20plots%20and%20villas%20in%20Dapoli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenSiteVisit}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 shadow-md shadow-teal-900/15 hover:shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book VIP Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-teal-700"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="bg-teal-50 rounded-lg p-3 text-xs text-teal-900 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 font-medium">
                <Sun className="w-4 h-4 text-amber-500" />
                Dapoli: 26°C Sunny Sea Breeze
              </span>
              <span className="text-[11px] text-teal-700 font-semibold">AQI 18</span>
            </div>

            <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
              <a 
                href="#properties" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                Featured Properties
              </a>
              <a 
                href="#master-plan" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100 flex items-center justify-between"
              >
                <span>Interactive Master Plan</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded font-bold">New</span>
              </a>
              <a 
                href="#why-dapoli" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                Why Invest in Dapoli
              </a>
              <a 
                href="#investment-roi" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                ROI & EMI Calculator
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                Buyer Reviews
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100"
              >
                Contact & Sales Desk
              </a>
            </nav>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSiteVisit();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-emerald-700"
              >
                <Calendar className="w-4 h-4" />
                Book VIP Site Visit
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold text-stone-700 bg-stone-100 border border-stone-200"
              >
                <Database className="w-3.5 h-3.5 text-teal-600" />
                View Leads & Backend Status
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
