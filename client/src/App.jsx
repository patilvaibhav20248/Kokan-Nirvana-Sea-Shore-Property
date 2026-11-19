import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BeachDestinationsStrip from './components/BeachDestinationsStrip';
import PlotCalculator from './components/PlotCalculator';
import PropertyList from './components/PropertyList';
import PropertyDetailModal from './components/PropertyDetailModal';
import MasterPlanExplorer from './components/MasterPlanExplorer';
import ReservationSection from './components/ReservationSection';
import RouteGuide from './components/RouteGuide';
import LegalGuide from './components/LegalGuide';
import FaqSection from './components/FaqSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import VipSiteVisitModal from './components/VipSiteVisitModal';
import BrochureDownloadModal from './components/BrochureDownloadModal';
import AdminPanelModal from './components/AdminPanelModal';
import SavedPropertiesDrawer from './components/SavedPropertiesDrawer';
import Footer from './components/Footer';

import { FavoritesProvider } from './context/FavoritesContext';
import { initialProperties, initialPlots, initialTestimonials } from './data/fallbackData';
import { MessageCircle, Calendar } from 'lucide-react';

function MainApp() {
  // Properties and Data states
  const [properties, setProperties] = useState(initialProperties);
  const [plots, setPlots] = useState(initialPlots);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [weatherData, setWeatherData] = useState(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');

  // Modal & Selection States
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [preselectedReservationProperty, setPreselectedReservationProperty] = useState(null);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [siteVisitTargetProperty, setSiteVisitTargetProperty] = useState(null);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Fetch live properties, plots, and weather from Node.js backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, plotRes, testRes, weatherRes] = await Promise.allSettled([
          fetch('/api/properties'),
          fetch('/api/plots'),
          fetch('/api/testimonials'),
          fetch('/api/weather')
        ]);

        if (propRes.status === 'fulfilled' && propRes.value.ok) {
          const json = await propRes.value.json();
          if (json.data && json.data.length > 0) setProperties(json.data);
        }

        if (plotRes.status === 'fulfilled' && plotRes.value.ok) {
          const json = await plotRes.value.json();
          if (json.data && json.data.length > 0) setPlots(json.data);
        }

        if (testRes.status === 'fulfilled' && testRes.value.ok) {
          const json = await testRes.value.json();
          if (json.data && json.data.length > 0) setTestimonials(json.data);
        }

        if (weatherRes.status === 'fulfilled' && weatherRes.value.ok) {
          const json = await weatherRes.value.json();
          if (json.data) setWeatherData(json.data);
        }
      } catch (err) {
        console.warn('Backend sync note (using resilient local datasets):', err.message);
      }
    };

    fetchData();
  }, []);

  // Filtered Properties Computation
  const filteredProperties = properties.filter((prop) => {
    // 1. Category Filter
    if (selectedCategory !== 'All' && selectedCategory !== 'Liked' && prop.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // 2. Location Filter
    if (selectedLocation !== 'All') {
      const match = prop.location.toLowerCase().includes(selectedLocation.toLowerCase());
      if (!match) return false;
    }

    // 3. Budget Filter
    if (selectedBudget === 'Under 30L' && prop.numericPrice > 3000000) return false;
    if (selectedBudget === '30L - 60L' && (prop.numericPrice < 3000000 || prop.numericPrice > 6000000)) return false;
    if (selectedBudget === '60L - 1.5Cr' && (prop.numericPrice < 6000000 || prop.numericPrice > 15000000)) return false;
    if (selectedBudget === 'Above 1.5Cr' && prop.numericPrice < 15000000) return false;

    return true;
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectedBudget('All');
  };

  const handleOpenSiteVisit = (prop = null) => {
    setSiteVisitTargetProperty(prop);
    setSiteVisitModalOpen(true);
  };

  const handleReservePlotFromMasterPlan = (plot) => {
    const formatted = {
      id: plot.id,
      title: `${plot.name} (${plot.size}, ${plot.zone})`,
      plotSize: plot.size,
      location: 'Dapoli Coastal Belt',
      price: plot.price
    };
    setPreselectedReservationProperty(formatted);
    const reservationEl = document.getElementById('reservation');
    if (reservationEl) {
      reservationEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReserveProperty = (property) => {
    setPreselectedReservationProperty(property);
    const reservationEl = document.getElementById('reservation');
    if (reservationEl) {
      reservationEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans flex flex-col selection:bg-amber-900 selection:text-white">
      
      {/* Top Header & Navigation */}
      <Navbar
        onOpenSiteVisit={() => handleOpenSiteVisit(null)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        weatherData={weatherData}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Authentic Human Real-Estate Hero */}
        <Hero
          onOpenSiteVisit={() => handleOpenSiteVisit(null)}
          onOpenBrochure={() => setBrochureModalOpen(true)}
        />

        {/* Dapoli's 5 Coastal Beach Belts */}
        <BeachDestinationsStrip
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />

        {/* Guntha ↔ Sq.Ft & Maharashtra Stamp Duty Estimator */}
        <PlotCalculator
          onBookSiteVisit={handleOpenSiteVisit}
        />

        {/* Featured Projects & Land Layouts */}
        <PropertyList
          properties={filteredProperties}
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onBookSiteVisit={(prop) => handleOpenSiteVisit(prop)}
          onReserveProperty={handleReserveProperty}
          onResetFilters={handleResetFilters}
        />

        {/* Complete Reservation Desk (Priority Token Hold & Free Site Visits) */}
        <ReservationSection
          preselectedProperty={preselectedReservationProperty}
          onClearPreselected={() => setPreselectedReservationProperty(null)}
        />

        {/* Interactive Master Plan & Demarcated Plot Selector */}
        <MasterPlanExplorer
          plots={plots}
          onReservePlot={handleReservePlotFromMasterPlan}
          onOpenBrochure={() => setBrochureModalOpen(true)}
        />

        {/* Travel & Route Guide from Mumbai & Pune */}
        <RouteGuide
          onBookSiteVisit={handleOpenSiteVisit}
        />

        {/* Maharashtra Land Law & 7/12 Legal Guide */}
        <LegalGuide
          onOpenBrochure={() => setBrochureModalOpen(true)}
        />

        {/* Buyer Frequently Asked Questions */}
        <FaqSection
          onOpenSiteVisit={handleOpenSiteVisit}
        />

        {/* Verified Homeowner Reviews from Mumbai & Pune */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Direct Site Office Contacts & Inquiry Form */}
        <ContactSection
          onBookSiteVisit={() => handleOpenSiteVisit(null)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSiteVisit={() => handleOpenSiteVisit(null)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href="https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20am%20interested%20in%20sea-facing%20NA%20plots%20in%20Dapoli"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-950/20 hover:scale-105 transition-all cursor-pointer group relative"
          aria-label="Direct WhatsApp Consultation"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-15 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            Chat on WhatsApp (+91 98200 12345)
          </span>
        </a>

        <a
          href="#reservation"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold shadow-xl hover:scale-105 transition-all cursor-pointer border border-amber-700"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Reserve Plot / Visit</span>
        </a>
      </div>

      {/* Saved Properties Drawer */}
      <SavedPropertiesDrawer
        properties={properties}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onReserveProperty={handleReserveProperty}
      />

      {/* Modals */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onBookSiteVisit={(prop) => {
            setSelectedProperty(null);
            handleOpenSiteVisit(prop);
          }}
          onReserveProperty={(prop) => {
            setSelectedProperty(null);
            handleReserveProperty(prop);
          }}
        />
      )}

      {siteVisitModalOpen && (
        <VipSiteVisitModal
          property={siteVisitTargetProperty}
          onClose={() => {
            setSiteVisitModalOpen(false);
            setSiteVisitTargetProperty(null);
          }}
        />
      )}

      {brochureModalOpen && (
        <BrochureDownloadModal
          onClose={() => setBrochureModalOpen(false)}
        />
      )}

      {adminModalOpen && (
        <AdminPanelModal
          onClose={() => setAdminModalOpen(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <MainApp />
    </FavoritesProvider>
  );
}
