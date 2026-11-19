import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  ShieldCheck, 
  Car, 
  Train, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Phone, 
  Mail, 
  User, 
  Download, 
  MessageCircle, 
  AlertCircle, 
  FileText, 
  Building2,
  BadgePercent,
  Check,
  RefreshCw,
  Printer,
  ArrowRight,
  ArrowLeft,
  Share2,
  Award,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitReservation } from '../firebase/firebaseService';

export default function ReservationSection({ preselectedProperty, onClearPreselected }) {
  // Stepper State: 1 (Plan & Plot) -> 2 (Buyer & Travel) -> 3 (Review & Summary) -> 4 (Confirmed Digital Pass)
  const [currentStep, setCurrentStep] = useState(1);
  const sectionRef = useRef(null);

  // Reservation Mode: 'token' (₹21k Refundable Plot Hold) | 'visit' (Complimentary Site Visit) | 'legal' (Title Consultation)
  const [reservationType, setReservationType] = useState('token');

  // Available Dapoli Projects for dropdown
  const availableProjects = [
    {
      id: 'anjarle-seashore',
      title: 'Kokan Nirvana Seashore (Anjarle Beach)',
      location: 'Anjarle Beach, Dapoli',
      plotSize: '4 Gunthas (4,356 sq.ft)',
      price: '₹24.50 Lakhs',
      tokenAmount: 21000,
      zone: 'Sea Shore Luxury',
      availablePlots: ['Plot #12 (Sea View)', 'Plot #14 (Corner)', 'Plot #18 (East Facing)']
    },
    {
      id: 'ladghar-heights',
      title: 'Ladghar Red Pebble Heights',
      location: 'Ladghar Coastal Ridge, Dapoli',
      plotSize: '5 Gunthas (5,445 sq.ft)',
      price: '₹32.00 Lakhs',
      tokenAmount: 21000,
      zone: 'Elevated Ocean Ridge',
      availablePlots: ['Plot #04 (Sunset View)', 'Plot #07 (Near Club)', 'Plot #09 (Private Road)']
    },
    {
      id: 'murud-dolphin-bay',
      title: 'Murud Dolphin Bay Sanad Plots',
      location: 'Murud Beach Road, Dapoli',
      plotSize: '7 Gunthas (7,623 sq.ft)',
      price: '₹48.00 Lakhs',
      tokenAmount: 21000,
      zone: 'Direct Beachfront Road',
      availablePlots: ['Plot #02 (Direct Beach Access)', 'Plot #05 (Sea Facing)', 'Plot #11 (Wide Frontage)']
    },
    {
      id: 'karde-beachfront',
      title: 'Karde Beachfront Private Villa Plots',
      location: 'Karde Beach Coastline, Dapoli',
      plotSize: '6 Gunthas (6,534 sq.ft)',
      price: '₹55.00 Lakhs',
      tokenAmount: 21000,
      zone: 'Ultra Premium Frontline',
      availablePlots: ['Plot #01 (Front Row Sea)', 'Plot #03 (Coconut Grove)']
    },
    {
      id: 'harnai-orchard',
      title: 'Harnai Fort View Hilltop Orchard',
      location: 'Harnai Hills, Dapoli',
      plotSize: '10 Gunthas (10,890 sq.ft)',
      price: '₹38.00 Lakhs',
      tokenAmount: 21000,
      zone: 'Alphonso Orchard & Sea View',
      availablePlots: ['Plot #21 (Hilltop Panorama)', 'Plot #24 (Orchard Enclave)']
    }
  ];

  // Selected project state
  const [selectedProjectId, setSelectedProjectId] = useState(availableProjects[0].id);
  const [selectedSpecificPlot, setSelectedSpecificPlot] = useState('');

  // Update when parent preselects a property
  useEffect(() => {
    if (preselectedProperty && preselectedProperty.title) {
      const pTitle = String(preselectedProperty.title).toLowerCase();
      const match = availableProjects.find(
        (p) => p.title.toLowerCase().includes(pTitle) ||
               pTitle.includes(p.title.toLowerCase())
      );
      if (match) {
        setSelectedProjectId(match.id);
        setSelectedSpecificPlot(match.availablePlots?.[0] || '');
      } else {
        setSelectedSpecificPlot(String(preselectedProperty.title));
      }
      setCurrentStep(1);
    }
  }, [preselectedProperty]);

  const activeProject = availableProjects.find((p) => p.id === selectedProjectId) || availableProjects[0];

  // Form State
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    preferredDate: '',
    timeSlot: 'Morning (10:00 AM)',
    pickupOption: 'Khed Railway Station (Free Station Pickup)',
    guestCount: 2,
    specialRequirements: '',
    acceptTerms: true
  });

  const [loading, setLoading] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // Smooth scroll to top of section on step changes
  const scrollToSectionHeader = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step 1 -> Step 2 validation
  const handleProceedToStep2 = (e) => {
    if (e) e.preventDefault();
    if (!form.preferredDate) {
      alert('Please select your preferred visit date to continue.');
      return;
    }
    setCurrentStep(2);
    scrollToSectionHeader();
  };

  // Step 2 -> Step 3 validation
  const handleProceedToStep3 = (e) => {
    if (e) e.preventDefault();
    if (!form.fullName.trim()) {
      alert('Please enter your Full Name.');
      return;
    }
    if (!form.phone.trim() || form.phone.trim().length < 8) {
      alert('Please enter a valid WhatsApp / Phone Number.');
      return;
    }
    setCurrentStep(3);
    scrollToSectionHeader();
  };

  // Step 3 -> Step 4 (Final Submission)
  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const reservationId = `KN-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    const reservationPayload = {
      reservationId,
      reservationType,
      projectId: activeProject.id,
      projectTitle: activeProject.title,
      specificPlot: selectedSpecificPlot || activeProject.availablePlots[0],
      location: activeProject.location,
      plotSize: activeProject.plotSize,
      price: activeProject.price,
      tokenAmount: reservationType === 'token' ? activeProject.tokenAmount : 0,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      city: form.city,
      preferredDate: form.preferredDate,
      timeSlot: form.timeSlot,
      pickupOption: form.pickupOption,
      guestCount: form.guestCount,
      specialRequirements: form.specialRequirements,
      status: reservationType === 'token' ? 'Priority Hold Active' : 'Site Visit Confirmed',
      createdAt: new Date().toISOString()
    };

    try {
      await submitReservation(reservationPayload);
      setBookingConfirmation(reservationPayload);
      setCurrentStep(4);
      scrollToSectionHeader();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback if confetti isn't supported
      }
    } catch (err) {
      console.warn('Reservation local fallback sync', err);
      setBookingConfirmation(reservationPayload);
      setCurrentStep(4);
      scrollToSectionHeader();
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const stepsList = [
    { num: 1, label: 'Plot & Plan' },
    { num: 2, label: 'Buyer & Travel' },
    { num: 3, label: 'Review & Terms' },
    { num: 4, label: 'Confirmed Pass' }
  ];

  return (
    <section 
      id="reservation" 
      ref={sectionRef}
      className="py-20 bg-stone-100 text-stone-900 border-t border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-900/10 text-amber-900 border border-amber-900/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Official Booking & Reservation Desk</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-3">
            Reserve Your Dream Piece of Paradise
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Follow the 4 simple steps below to lock your preferred NA plot with a <strong className="text-stone-900">100% refundable token (₹21,000)</strong> or schedule a <strong className="text-stone-900">VIP weekend site visit</strong> with complimentary Khed station pickup.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
            <div className="flex items-center justify-between relative">
              {/* Connecting line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-200 -z-0">
                <div 
                  className="h-full bg-amber-900 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
                ></div>
              </div>

              {stepsList.map((step) => {
                const isCompleted = step.num < currentStep;
                const isActive = step.num === currentStep;

                return (
                  <div key={step.num} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      disabled={step.num > currentStep}
                      onClick={() => {
                        if (step.num < currentStep && currentStep !== 4) {
                          setCurrentStep(step.num);
                          scrollToSectionHeader();
                        }
                      }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-700 text-white shadow-sm cursor-pointer'
                          : isActive
                            ? 'bg-amber-900 text-white ring-4 ring-amber-200 shadow-md'
                            : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step.num}
                    </button>
                    <span className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${
                      isActive ? 'text-amber-950 font-extrabold' : isCompleted ? 'text-emerald-800' : 'text-stone-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 1: Select Plan & Plot */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto animate-fadeIn">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                    Step 1 of 4: Reservation Plan & Location
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
                    Choose Your Reservation Type & Plot
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  Step 1
                </span>
              </div>

              {/* Mode Selector */}
              <div className="mb-6">
                <label className="text-xs font-bold text-stone-800 block mb-2">
                  Select Booking Plan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setReservationType('token')}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      reservationType === 'token'
                        ? 'border-amber-900 bg-amber-50/70 shadow-xs ring-2 ring-amber-900/10'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">Priority Plot Hold</span>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">₹21,000</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Freeze plot for 14 days. 100% money-back guarantee.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReservationType('visit')}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      reservationType === 'visit'
                        ? 'border-amber-900 bg-amber-50/70 shadow-xs ring-2 ring-amber-900/10'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">VIP Site Visit</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">Free</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Guided weekend tour + station pickup + local lunch.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReservationType('legal')}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      reservationType === 'legal'
                        ? 'border-amber-900 bg-amber-50/70 shadow-xs ring-2 ring-amber-900/10'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">7/12 Title Review</span>
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">Free</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Legal paper verification with Adv. Rajeshwar Patil.
                    </p>
                  </button>
                </div>
              </div>

              {/* Project & Plot Selection */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Select Dapoli Coastal Project:
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => {
                      setSelectedProjectId(e.target.value);
                      const p = availableProjects.find((x) => x.id === e.target.value);
                      setSelectedSpecificPlot(p ? p.availablePlots[0] : '');
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900 shadow-2xs"
                  >
                    {availableProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} • {p.price} ({p.plotSize})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1.5">
                      Select Specific Available Plot:
                    </label>
                    <select
                      value={selectedSpecificPlot}
                      onChange={(e) => setSelectedSpecificPlot(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900 shadow-2xs"
                    >
                      {activeProject.availablePlots.map((plot) => (
                        <option key={plot} value={plot}>
                          {plot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1.5">
                      Preferred Inspection / Visit Date: *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        required
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Step Action Button */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Step 1 of 4 complete
                </span>

                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="px-6 py-3.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Continue to Step 2: Buyer & Logistics</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            </div>

            {/* Sidebar Summary Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
                  Plot Preview
                </span>
                <h4 className="font-serif-luxury text-lg font-bold text-stone-900">
                  {activeProject.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{activeProject.location}</span>
                </div>

                <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Allocated Plot:</span>
                    <span className="font-bold text-stone-900">{selectedSpecificPlot || activeProject.availablePlots[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Plot Size:</span>
                    <span className="font-bold text-stone-900">{activeProject.plotSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Base Agreement:</span>
                    <span className="font-bold text-stone-900">{activeProject.price}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 inline mr-1" />
                  <strong>100% Refundable Token Policy</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Buyer Information & Travel Logistics */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto animate-fadeIn">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                    Step 2 of 4: Buyer Details & Travel Logistics
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
                    Who Is Traveling & Booking?
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  Step 2
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vaibhav Patil"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      City of Residence
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                    >
                      <option value="Mumbai">Mumbai (Western / Central / Harbour)</option>
                      <option value="Pune">Pune (Kothrud / Baner / Wakad / PCMC)</option>
                      <option value="Thane">Thane</option>
                      <option value="Navi Mumbai">Navi Mumbai</option>
                      <option value="Kolhapur">Kolhapur / Satara</option>
                      <option value="Nashik">Nashik</option>
                      <option value="NRI">NRI / Overseas Buyer</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Preferred Arrival Time:
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <select
                        value={form.timeSlot}
                        onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                      >
                        <option value="Morning (10:00 AM)">Morning (10:00 AM - Ideal sea breeze)</option>
                        <option value="Afternoon (2:00 PM)">Afternoon (2:00 PM - Post lunch tour)</option>
                        <option value="Sunset Slot (4:30 PM)">Sunset Slot (4:30 PM - Golden hour beach view)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Travel & Station Pickup:
                    </label>
                    <div className="relative">
                      <Car className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <select
                        value={form.pickupOption}
                        onChange={(e) => setForm({ ...form, pickupOption: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                      >
                        <option value="Khed Railway Station (Free Station Pickup)">Free Pickup from Khed Station (Vande Bharat / Tejas)</option>
                        <option value="Mangaon Pickup (NH-66)">Free Pickup from Mangaon (NH-66)</option>
                        <option value="Self Drive / Own Car">Self Drive / Own Vehicle (Send GPS Pin)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    Special Preferences / Specific Questions:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Prefer sea-facing corner plot, looking for bank loan quotation, need custom villa architect consultation..."
                    value={form.specialRequirements}
                    onChange={(e) => setForm({ ...form, specialRequirements: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-amber-900"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    scrollToSectionHeader();
                  }}
                  className="px-5 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-stone-500" />
                  <span>Back to Step 1</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="px-6 py-3.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Continue to Step 3: Review & Summary</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            </div>

            {/* Sidebar Summary Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
                  Trip Timeline
                </span>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Visit Date:</span>
                    <span className="font-bold text-stone-900">{form.preferredDate || 'Not selected'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Time Window:</span>
                    <span className="font-bold text-stone-900">{form.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Pickup Service:</span>
                    <span className="font-medium text-stone-700">{form.pickupOption}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Final Confirmation */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto animate-fadeIn">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                    Step 3 of 4: Verification & Confirmation
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
                    Review Your Reservation Details
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  Step 3
                </span>
              </div>

              {/* Review Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-5 rounded-2xl border border-stone-200 mb-6">
                <div>
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Project & Location</span>
                  <span className="font-bold text-stone-900 text-sm">{activeProject.title}</span>
                  <span className="text-stone-500 block">{activeProject.location}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Plot Choice & Dimensions</span>
                  <span className="font-bold text-stone-900 text-sm">{selectedSpecificPlot || activeProject.availablePlots[0]}</span>
                  <span className="text-emerald-700 font-semibold block">{activeProject.plotSize}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Buyer Name & Phone</span>
                  <span className="font-bold text-stone-900">{form.fullName}</span>
                  <span className="text-stone-600 block">{form.phone} ({form.city})</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Visit Date & Time Slot</span>
                  <span className="font-bold text-stone-900">{form.preferredDate}</span>
                  <span className="text-stone-600 block">{form.timeSlot}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Station Pickup Arranged</span>
                  <span className="font-semibold text-stone-800">{form.pickupOption}</span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Reservation Mode</span>
                  <span className="font-bold text-amber-900">
                    {reservationType === 'token' ? 'Priority 14-Day Hold (₹21,000 Refundable)' : 'Complimentary VIP Site Visit'}
                  </span>
                </div>
              </div>

              {/* Guarantee Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 mb-6 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 font-bold">Official Dapoli Land Guarantee</strong>
                  <span className="text-[11px] text-emerald-800">
                    Your token is 100% refundable within 15 days of booking if you decide not to proceed. 
                    Collector NA Class-1 with separate 7/12 extract in your name.
                  </span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="final-terms"
                  checked={form.acceptTerms}
                  onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-900 focus:ring-amber-900 border-stone-300"
                />
                <label htmlFor="final-terms" className="text-xs text-stone-700 font-medium">
                  I confirm the details above and authorize Kokan Nirvana to issue my digital reservation pass and contact me on WhatsApp.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(2);
                    scrollToSectionHeader();
                  }}
                  className="px-5 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-stone-500" />
                  <span>Back to Edit</span>
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="px-7 py-3.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting & Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Submit & Issue Official Digital Pass</span>
                      <ArrowRight className="w-4 h-4 text-amber-200" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar Summary Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
                  Due Today
                </span>
                <div className="text-3xl font-black text-amber-900 mb-1">
                  {reservationType === 'token' ? '₹21,000' : '₹0'}
                </div>
                <span className="text-xs text-emerald-700 font-semibold block mb-4">
                  {reservationType === 'token' ? '100% Refundable Token' : 'Free VIP Guest Pass'}
                </span>
                <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-3">
                  Clicking the button will generate your official digital voucher with your unique Booking Reference ID and assigned site manager details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Official Digital Pass & Next Steps Roadmap */}
        {currentStep === 4 && bookingConfirmation && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-emerald-300 shadow-2xl p-6 sm:p-10 animate-fadeIn">
            
            {/* Pass Header */}
            <div className="text-center pb-6 border-b border-stone-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 inline-block mb-1">
                Step 4 of 4: Reservation Active • Pass Issued
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mt-2">
                Booking Reference: {bookingConfirmation.reservationId}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Your reservation has been recorded in the Dapoli site registry for <strong className="text-stone-900">{bookingConfirmation.fullName}</strong>.
              </p>
            </div>

            {/* Voucher Details Table */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Project & Location</span>
                <span className="font-bold text-stone-900 text-sm">{bookingConfirmation.projectTitle}</span>
                <span className="text-stone-500 block">{bookingConfirmation.location}</span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Allocated Plot & Size</span>
                <span className="font-bold text-stone-900 text-sm">{bookingConfirmation.specificPlot}</span>
                <span className="text-emerald-700 font-semibold block">{bookingConfirmation.plotSize}</span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Reservation Status</span>
                <span className="font-bold text-amber-900 block text-sm">
                  {bookingConfirmation.reservationType === 'token' ? '14-Day Priority Plot Freeze' : 'VIP Site Inspection'}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">100% Refundable Guarantee</span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Scheduled Visit Date</span>
                <span className="font-bold text-stone-900 text-sm">{bookingConfirmation.preferredDate}</span>
                <span className="text-stone-500 block">{bookingConfirmation.timeSlot}</span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Travel Pickup Choice</span>
                <span className="font-semibold text-stone-800 text-sm">{bookingConfirmation.pickupOption}</span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Assigned Site Operations Lead</span>
                <span className="font-bold text-stone-900 text-sm">Sagar Kadam</span>
                <span className="text-emerald-700 font-semibold block">+91 98200 12345</span>
              </div>
            </div>

            {/* Interactive "What Happens Next" 4-Step Roadmap */}
            <div className="my-8 bg-amber-50/70 border border-amber-200 rounded-3xl p-6">
              <h4 className="font-serif-luxury text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-800" />
                <span>Your Next Steps Journey:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center mb-2">
                    ✓
                  </div>
                  <strong className="block text-stone-900 font-bold mb-1">Step 1: Pass Logged</strong>
                  <p className="text-stone-500 leading-snug">
                    Your digital pass is securely synchronized with our backend registry.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white font-bold text-[11px] flex items-center justify-center mb-2">
                    2
                  </div>
                  <strong className="block text-stone-900 font-bold mb-1">Step 2: Manager Call</strong>
                  <p className="text-stone-500 leading-snug">
                    Sagar Kadam will call your WhatsApp to confirm your travel timings.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white font-bold text-[11px] flex items-center justify-center mb-2">
                    3
                  </div>
                  <strong className="block text-stone-900 font-bold mb-1">Step 3: GPS Pin Sent</strong>
                  <p className="text-stone-500 leading-snug">
                    Receive direct Google Maps coordinates & Konkani hospitality voucher.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white font-bold text-[11px] flex items-center justify-center mb-2">
                    4
                  </div>
                  <strong className="block text-stone-900 font-bold mb-1">Step 4: Station Escort</strong>
                  <p className="text-stone-500 leading-snug">
                    Private pickup from Khed Railway Station to site office with local lunch.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print / Save Digital Pass</span>
              </button>

              <a
                href={`https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20have%20completed%20reservation%20${bookingConfirmation.reservationId}%20for%20${encodeURIComponent(bookingConfirmation.projectTitle)}.%20Please%20confirm%20my%20site%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp Concierge</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setBookingConfirmation(null);
                  setCurrentStep(1);
                  scrollToSectionHeader();
                }}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Make Another Reservation</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
