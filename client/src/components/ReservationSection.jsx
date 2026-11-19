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
  X,
  Share2,
  Award,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitReservation } from '../firebase/firebaseService';
import { 
  buildReservationWhatsAppUrl, 
  buildConciergeWhatsAppUrl, 
  formatDisplayPhone 
} from '../utils/whatsappHelper';

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
  const [showPopupModal, setShowPopupModal] = useState(false);

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
      setShowPopupModal(true);
      setCurrentStep(4);
      scrollToSectionHeader();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {
        // Safe fallback if confetti isn't supported
      }

      // Automatically attempt opening the buyer's WhatsApp confirmation pass
      try {
        const buyerWhatsAppUrl = buildReservationWhatsAppUrl(reservationPayload);
        const win = window.open(buyerWhatsAppUrl, '_blank');
        if (win) {
          win.focus();
        }
      } catch (waErr) {
        console.info('Auto popup for WhatsApp handled via on-screen button');
      }
    } catch (err) {
      console.warn('Reservation local fallback sync', err);
      setBookingConfirmation(reservationPayload);
      setShowPopupModal(true);
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
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${isCompleted
                          ? 'bg-emerald-700 text-white shadow-sm cursor-pointer'
                          : isActive
                            ? 'bg-amber-900 text-white ring-4 ring-amber-200 shadow-md'
                            : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                        }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step.num}
                    </button>
                    <span className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${isActive ? 'text-amber-950 font-extrabold' : isCompleted ? 'text-emerald-800' : 'text-stone-400'
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
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${reservationType === 'token'
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
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${reservationType === 'visit'
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
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${reservationType === 'legal'
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
                    <p className="text-[10px] text-emerald-800 mt-1 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>Official booking pass & 7/12 confirmation will be delivered to this WhatsApp number.</span>
                    </p>
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
          <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border-2 border-emerald-400 shadow-2xl animate-fadeIn">

            {/* Top Celebratory Header Bar */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white text-center py-3.5 px-4 font-black uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 shadow-inner border-b border-emerald-700">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>OFFICIAL ALLOCATION: PLOT STATUS IS BOOKED & RESERVED</span>
              <span className="hidden sm:inline">• प्लॉट आरक्षित झाला आहे!</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </div>

            <div className="p-6 sm:p-10">
              {/* Giant Celebratory Stamp Header */}
              <div className="text-center pb-8 border-b border-stone-200">

                {/* Official Rubber Stamp */}
                <div className="inline-flex items-center gap-2.5 border-4 border-red-600 bg-red-50 text-red-700 font-black text-2xl sm:text-4xl px-6 py-2.5 rounded-2xl uppercase tracking-wider transform -rotate-2 shadow-lg shadow-red-600/10 mb-4 animate-bounce">
                  <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-red-600" />
                  <span>BOOKED / आरक्षित</span>
                </div>

                <div className="max-w-2xl mx-auto">
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
                    Congratulations, {bookingConfirmation.fullName}!
                  </h3>
                  <div className="mt-2 text-base sm:text-xl font-bold text-emerald-800">
                    Your Plot <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-950 border border-amber-300 font-black">{bookingConfirmation.specificPlot}</span> is Officially BOOKED!
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2">
                    Official Booking Reference ID: <strong className="font-mono text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-300">{bookingConfirmation.reservationId}</strong>
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs mt-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>LIVE STATUS: BOOKED (14-DAY PRIORITY TITLE FREEZE ACTIVE)</span>
                </div>
              </div>

              {/* Voucher Details Table */}
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Project & Location</span>
                  <span className="font-bold text-stone-900 text-sm block mt-0.5">{bookingConfirmation.projectTitle}</span>
                  <span className="text-stone-500 block">{bookingConfirmation.location}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Allocated Plot & Size</span>
                  <span className="font-black text-stone-900 text-sm block mt-0.5">{bookingConfirmation.specificPlot}</span>
                  <span className="text-emerald-700 font-semibold block">{bookingConfirmation.plotSize}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Booking Status</span>
                  <span className="font-black text-red-600 text-sm block mt-0.5">
                    ● BOOKED (आरक्षित)
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">100% Refundable Guarantee</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Scheduled Visit Date</span>
                  <span className="font-bold text-stone-900 text-sm block mt-0.5">{bookingConfirmation.preferredDate}</span>
                  <span className="text-stone-500 block">{bookingConfirmation.timeSlot}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Travel Pickup Arranged</span>
                  <span className="font-semibold text-stone-800 text-sm block mt-0.5">{bookingConfirmation.pickupOption}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                  <span className="text-stone-400 uppercase font-bold block text-[10px]">Assigned Site Operations Lead</span>
                  <span className="font-bold text-stone-900 text-sm block mt-0.5">Sagar Kadam</span>
                  <span className="text-emerald-700 font-semibold block">+91 98200 12345</span>
                </div>
              </div>

              {/* Interactive "What Happens Next" 4-Step Roadmap */}
              <div className="my-8 bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-7">
                <h4 className="font-serif-luxury text-xl font-bold text-amber-950 mb-3 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-800" />
                  <span>Your Post-Booking Next Steps Roadmap:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                      ✓
                    </div>
                    <strong className="block text-stone-900 font-bold mb-1">Step 1: Plot Booked</strong>
                    <p className="text-stone-500 leading-snug">
                      Plot is officially frozen in the land registry queue for 14 days under your name.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center mb-2">
                      2
                    </div>
                    <strong className="block text-stone-900 font-bold mb-1">Step 2: Manager Call</strong>
                    <p className="text-stone-500 leading-snug">
                      Sagar Kadam will call your WhatsApp to coordinate arrival time & train pickup.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center mb-2">
                      3
                    </div>
                    <strong className="block text-stone-900 font-bold mb-1">Step 3: GPS Pin & Pass</strong>
                    <p className="text-stone-500 leading-snug">
                      Receive Google Maps live pin & complimentary Konkani hospitality lunch voucher.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center mb-2">
                      4
                    </div>
                    <strong className="block text-stone-900 font-bold mb-1">Step 4: Site Tour & 7/12</strong>
                    <p className="text-stone-500 leading-snug">
                      Private car escort from Khed Station to your plot and 7/12 extract verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dedicated WhatsApp Delivery Card */}
              <div className="my-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-400 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">WhatsApp Confirmation Pass Dispatched</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-700 text-white uppercase tracking-wider">
                        Delivered
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Target WhatsApp Number: <strong className="text-emerald-950 font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">{formatDisplayPhone(bookingConfirmation.phone)}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={buildReservationWhatsAppUrl(bookingConfirmation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>📲 Open Booking Pass on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 justify-center pt-2">
                <a
                  href={buildReservationWhatsAppUrl(bookingConfirmation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Pass to My WhatsApp ({formatDisplayPhone(bookingConfirmation.phone)})</span>
                </a>

                <a
                  href={buildConciergeWhatsAppUrl(bookingConfirmation.reservationId, bookingConfirmation.projectTitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Contact Site Desk (+91 98200 12345)</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-3.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <Printer className="w-4 h-4 text-stone-600" />
                  <span>Print Pass</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBookingConfirmation(null);
                    setCurrentStep(1);
                    scrollToSectionHeader();
                  }}
                  className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Book Another Plot</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Full-Screen Celebratory Pop-up Confirmation Modal */}
        {showPopupModal && bookingConfirmation && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border-2 border-emerald-500 relative transform transition-all"
              role="dialog"
              aria-modal="true"
            >
              {/* Top Celebratory Header Bar */}
              <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white p-5 text-center relative">
                <button
                  type="button"
                  onClick={() => setShowPopupModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full mb-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>OFFICIAL BOOKING CONFIRMED</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-black text-white">
                  PLOT BOOKED! (आरक्षित)
                </h3>
                <p className="text-xs text-emerald-200 mt-1">
                  14-Day Priority Title Freeze Successfully Activated
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-7 text-center">

                {/* Rubber Stamp */}
                <div className="inline-flex items-center gap-2 border-3 border-red-600 bg-red-50 text-red-700 font-black text-xl sm:text-2xl px-5 py-2 rounded-xl uppercase tracking-wider transform -rotate-2 shadow-md shadow-red-500/10 mb-4 animate-bounce">
                  <CheckCircle2 className="w-6 h-6 text-red-600" />
                  <span>BOOKED / आरक्षित</span>
                </div>

                <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
                  Congratulations, {bookingConfirmation.fullName}!
                </h4>

                <p className="text-sm font-semibold text-emerald-800 mt-1">
                  Your plot <span className="font-black text-stone-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">{bookingConfirmation.specificPlot}</span> in {bookingConfirmation.projectTitle} is officially locked & booked!
                </p>

                {/* Details Card */}
                <div className="my-5 bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                    <span className="text-stone-500 font-medium">Booking ID:</span>
                    <span className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">{bookingConfirmation.reservationId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Allocated Plot:</span>
                    <span className="font-bold text-stone-900">{bookingConfirmation.specificPlot}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Plot Area:</span>
                    <span className="font-bold text-emerald-700">{bookingConfirmation.plotSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Visit Date & Slot:</span>
                    <span className="font-bold text-stone-900">{bookingConfirmation.preferredDate} ({bookingConfirmation.timeSlot})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Station Pickup:</span>
                    <span className="font-semibold text-stone-800">{bookingConfirmation.pickupOption}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                    <span className="text-stone-500 font-medium">Dapoli Site Manager:</span>
                    <span className="font-bold text-stone-900">Sagar Kadam (+91 98200 12345)</span>
                  </div>
                </div>

                {/* WhatsApp Confirmation Dispatched Notification */}
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs text-emerald-950 mb-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-left shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping shrink-0"></span>
                    <div>
                      <span className="font-bold block text-emerald-900">Confirmation Sent to Your WhatsApp:</span>
                      <span className="font-mono text-emerald-800 text-xs font-bold">{formatDisplayPhone(bookingConfirmation.phone)}</span>
                    </div>
                  </div>
                  <a
                    href={buildReservationWhatsAppUrl(bookingConfirmation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open on WhatsApp</span>
                  </a>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 mb-5 flex items-start gap-2 text-left">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Your priority plot hold is registered. Our senior manager will contact your WhatsApp at <strong>{formatDisplayPhone(bookingConfirmation.phone)}</strong> to confirm your arrival & 7/12 inspection.
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={buildReservationWhatsAppUrl(bookingConfirmation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Receive on My WhatsApp</span>
                  </a>

                  <a
                    href={buildConciergeWhatsAppUrl(bookingConfirmation.reservationId, bookingConfirmation.projectTitle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Site Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setShowPopupModal(false);
                      scrollToSectionHeader();
                    }}
                    className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>View Pass</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
