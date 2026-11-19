import React, { useState, useEffect } from 'react';
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
  Printer
} from 'lucide-react';
import { submitReservation } from '../firebase/firebaseService';

export default function ReservationSection({ preselectedProperty, onClearPreselected }) {
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

  // Update when parent preselects a property (e.g. from PropertyCard or Saved drawer)
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

  // Form submit handler
  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.preferredDate) {
      alert('Please fill in your Name, Phone Number, and Preferred Date.');
      return;
    }

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
    } catch (err) {
      console.warn('Reservation local fallback sync', err);
      setBookingConfirmation(reservationPayload);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="reservation" className="py-20 bg-stone-100 text-stone-900 border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-900/10 text-amber-900 border border-amber-900/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Official Booking & Reservation Desk</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Reserve Your Dream Piece of Paradise
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Secure your preferred sea-facing NA plot with a <strong className="text-stone-900">100% refundable token (₹21,000)</strong> or schedule a <strong className="text-stone-900">VIP weekend site inspection</strong> with complimentary station pickup from Khed.
          </p>
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-5xl mx-auto">
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">100% Refundable</span>
              <span className="text-[11px] text-stone-500">15-day money-back guarantee</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">Collector NA Class-1</span>
              <span className="text-[11px] text-stone-500">Separate 7/12 & 8-A extract</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">Station Pickup</span>
              <span className="text-[11px] text-stone-500">Khed Station (Vande Bharat)</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">TILR Demarcation</span>
              <span className="text-[11px] text-stone-500">Government boundary pegs</span>
            </div>
          </div>
        </div>

        {/* Confirmation Voucher (If Submitted) */}
        {bookingConfirmation ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden border border-emerald-300 shadow-xl p-6 sm:p-10 animate-fadeIn">
            <div className="text-center pb-6 border-b border-stone-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Reservation Confirmed • Booking Pass Issued
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                Booking Reference: {bookingConfirmation.reservationId}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                A digital copy has been recorded for <strong className="text-stone-900">{bookingConfirmation.fullName}</strong>.
              </p>
            </div>

            {/* Voucher Details Table */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-5 rounded-2xl border border-stone-200">
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
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Reservation Type</span>
                <span className="font-bold text-stone-900">
                  {bookingConfirmation.reservationType === 'token' 
                    ? '14-Day Priority Plot Token Hold (₹21,000)' 
                    : 'VIP Site Visit & Property Tour'}
                </span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Scheduled Visit Date & Time</span>
                <span className="font-bold text-stone-900">
                  {bookingConfirmation.preferredDate} ({bookingConfirmation.timeSlot})
                </span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Pickup Arrangement</span>
                <span className="font-medium text-stone-800">{bookingConfirmation.pickupOption}</span>
              </div>

              <div>
                <span className="text-stone-400 uppercase font-bold block text-[10px]">Assigned Dapoli Site Manager</span>
                <span className="font-bold text-stone-900">Sagar Kadam (+91 98200 12345)</span>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5 mb-6">
              <span className="font-bold block flex items-center gap-1.5 text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-700" />
                What happens next:
              </span>
              <p>1. Our site manager will contact you within 2 hours to confirm your travel timings and send the exact Google Maps location pin.</p>
              <p>2. A welcome hamper and complimentary Konkani refreshments (Ukadiche Modak & Fresh Coconut Water) will be kept ready at the site office.</p>
              <p>3. If booking with a token, your 14-day hold period starts from your scheduled visit date with a 100% money-back guarantee.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print / Save Booking Pass</span>
              </button>

              <a
                href={`https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20have%20completed%20reservation%20${bookingConfirmation.reservationId}%20for%20${encodeURIComponent(bookingConfirmation.projectTitle)}.%20Please%20confirm%20my%20site%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp Concierge</span>
              </a>

              <button
                type="button"
                onClick={() => setBookingConfirmation(null)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Make Another Reservation</span>
              </button>
            </div>
          </div>
        ) : (

          /* Interactive Multi-Step Reservation Desk */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            
            {/* Left 7 Columns: Reservation Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              
              {/* Step 1: Select Reservation Mode */}
              <div className="mb-6">
                <span className="text-[11px] uppercase font-bold text-amber-900 tracking-wider block mb-2">
                  Step 1: Choose Your Reservation Type
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setReservationType('token')}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      reservationType === 'token'
                        ? 'border-amber-900 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">Priority Plot Hold</span>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">₹21,000</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      14-day plot freeze. 100% refundable token.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReservationType('visit')}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      reservationType === 'visit'
                        ? 'border-amber-900 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">VIP Site Visit</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">Free</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Weekend tour + station pickup + local lunch.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReservationType('legal')}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      reservationType === 'legal'
                        ? 'border-amber-900 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">7/12 Title Review</span>
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">Free</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      1-on-1 legal review with Adv. Rajeshwar Patil.
                    </p>
                  </button>
                </div>
              </div>

              {/* Step 2: Select Project & Available Plot */}
              <div className="mb-6">
                <span className="text-[11px] uppercase font-bold text-amber-900 tracking-wider block mb-2">
                  Step 2: Select Project & Plot
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Select Dapoli Coastal Project:
                    </label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => {
                        setSelectedProjectId(e.target.value);
                        const p = availableProjects.find((x) => x.id === e.target.value);
                        setSelectedSpecificPlot(p ? p.availablePlots[0] : '');
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                    >
                      {availableProjects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} • {p.price} ({p.plotSize})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Select Specific Available Plot:
                      </label>
                      <select
                        value={selectedSpecificPlot}
                        onChange={(e) => setSelectedSpecificPlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      >
                        {activeProject.availablePlots.map((plot) => (
                          <option key={plot} value={plot}>
                            {plot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Preferred Visit Date:
                      </label>
                      <input
                        type="date"
                        required
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Buyer Details Form */}
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <span className="text-[11px] uppercase font-bold text-amber-900 tracking-wider block">
                  Step 3: Buyer Details & Travel Logistics
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vaibhav Patil"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="vaibhav@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      City of Residence
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
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
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Preferred Time Slot:
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <select
                        value={form.timeSlot}
                        onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      >
                        <option value="Morning (10:00 AM)">Morning (10:00 AM - Ideal for sea breeze)</option>
                        <option value="Afternoon (2:00 PM)">Afternoon (2:00 PM - Post lunch tour)</option>
                        <option value="Sunset Slot (4:30 PM)">Sunset Slot (4:30 PM - Golden hour beach view)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Travel & Pickup Logistics:
                    </label>
                    <div className="relative">
                      <Car className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <select
                        value={form.pickupOption}
                        onChange={(e) => setForm({ ...form, pickupOption: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                      >
                        <option value="Khed Railway Station (Free Station Pickup)">Free Pickup from Khed Station (Vande Bharat / Tejas)</option>
                        <option value="Mangaon Pickup (NH-66)">Free Pickup from Mangaon (NH-66)</option>
                        <option value="Self Drive / Own Car">Self Drive / Own Vehicle (Send GPS Pin)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Special Preferences / Questions:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Prefer sea-facing corner plot, looking for bank loan support, want to construct wooden holiday cottage..."
                    value={form.specialRequirements}
                    onChange={(e) => setForm({ ...form, specialRequirements: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={form.acceptTerms}
                    onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-900 focus:ring-amber-900 border-stone-300"
                  />
                  <label htmlFor="terms" className="text-[11px] text-stone-600">
                    I agree to receive booking pass details and site coordinator contact via WhatsApp / Phone.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Digital Booking Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>
                        {reservationType === 'token'
                          ? `Confirm Priority Plot Reservation (₹21,000 Refundable)`
                          : `Confirm Free VIP Site Visit Booking`}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right 5 Columns: Live Price & Guarantee Summary */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
                  Reservation Breakdown
                </span>

                <div className="border-b border-stone-100 pb-4 mb-4">
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    {activeProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{activeProject.location}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Allocated Plot:</span>
                    <span className="font-bold text-stone-900">{selectedSpecificPlot || activeProject.availablePlots[0]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500">Plot Size:</span>
                    <span className="font-bold text-stone-900">{activeProject.plotSize}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500">Total Agreement Value:</span>
                    <span className="font-bold text-stone-900">{activeProject.price}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-100">
                    <span className="text-stone-500">Stamp Duty + Reg. (6% Ratnagiri):</span>
                    <span className="font-medium text-stone-700">Estimated ~₹1.75 L</span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-stone-200 text-sm">
                    <span className="font-bold text-stone-900">Due Today (Reservation Token):</span>
                    <span className="font-black text-amber-900">
                      {reservationType === 'token' ? '₹21,000' : '₹0 (Free Visit)'}
                    </span>
                  </div>
                </div>

                {/* Refundability Guarantee */}
                <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-950 font-bold">100% Refundable Token Policy</strong>
                      <span className="text-[11px] text-emerald-800">
                        Your ₹21,000 token is 100% refundable within 15 days of booking if you decide not to proceed after your site visit or legal due diligence.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Site Office Contacts */}
              <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-sm border border-stone-800">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block mb-1">
                  Dapoli Site Contact Desk
                </span>
                <h4 className="font-serif-luxury text-lg font-bold text-white mb-2">
                  Need Help Choosing Your Plot?
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Speak directly with our local land development team in Dapoli before making your reservation.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-stone-200">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Sagar Kadam</strong> • Head of Site Operations (+91 98200 12345)</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-200">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span><strong>Adv. Rajeshwar Patil</strong> • Land Revenue & 7/12 Title Advisor</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20want%20to%20reserve%20a%20plot%20in%20Dapoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Reservation Assistance</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
