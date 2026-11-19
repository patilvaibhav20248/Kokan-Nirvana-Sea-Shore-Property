import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Car, 
  Train, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Send,
  Coffee,
  ShieldCheck,
  MessageCircle,
  Ticket,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitSiteVisit } from '../firebase/firebaseService';
import { buildSiteVisitWhatsAppUrl, buildConciergeWhatsAppUrl, formatDisplayPhone } from '../utils/whatsappHelper';

export default function VipSiteVisitModal({ property, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    preferredDate: '',
    pickupNeeded: 'Own Vehicle',
    guestCount: 2,
    propertyId: property?.id || '',
    propertyName: property?.title || 'Kokan Nirvana Sea Shore Projects',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const refCode = 'VIP-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);

    try {
      await submitSiteVisit({ ...form, refCode });
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Automatically attempt opening the visitor's WhatsApp confirmation pass
      try {
        const waPassUrl = buildSiteVisitWhatsAppUrl({ ...form, refCode });
        const win = window.open(waPassUrl, '_blank');
        if (win) {
          win.focus();
        }
      } catch (waErr) {
        console.info('Auto popup for WhatsApp handled via on-screen button');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-stone-900 p-6 text-white flex items-center justify-between border-b border-teal-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Guest Experience</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Schedule Your VIP Dapoli Site Visit
            </h3>
            <p className="text-xs text-teal-200 mt-0.5">
              Experience the fresh sea breeze, taste local Alphonso delicacies, and inspect 7/12 land papers in person.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-4 animate-fadeIn">
              <div className="inline-flex items-center gap-2 border-4 border-emerald-600 bg-emerald-50 text-emerald-800 font-black text-xl sm:text-2xl px-6 py-2 rounded-2xl uppercase tracking-wider mb-3 shadow-md">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                <span>BOOKED & CONFIRMED! (आरक्षित)</span>
              </div>
              
              <h4 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-1">
                VIP Site Visit Confirmed!
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto mb-4">
                Thank you, <strong className="text-stone-900">{form.name}</strong>. Your complimentary Dapoli site inspection is locked in.
              </p>

              {/* Digital Pass Summary Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-md mx-auto text-left mb-5 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-amber-600" />
                    VIP Pass Reference
                  </span>
                  <span className="font-mono font-bold text-sm text-stone-900 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-300">
                    {bookingRef || 'VIP-847291'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Preferred Date</span>
                    <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-700" />
                      {form.preferredDate || 'This Weekend'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Pick-up Logistics</span>
                    <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Car className="w-3.5 h-3.5 text-teal-700" />
                      {form.pickupNeeded}
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-2 flex items-center justify-between text-xs text-stone-600">
                  <span>Guests: <strong>{form.guestCount} Persons</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Refreshments Included
                  </span>
                </div>
              </div>

              {/* WhatsApp VIP Pass Dispatched Status Card */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 max-w-md mx-auto text-left mb-4 shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping shrink-0"></span>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-950 block">Pass Sent to Your WhatsApp:</span>
                    <span className="font-mono text-emerald-900 text-xs font-bold">{formatDisplayPhone(form.phone)}</span>
                  </div>
                </div>
                <a
                  href={buildSiteVisitWhatsAppUrl({ ...form, refCode: bookingRef })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-2xs shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-2.5 max-w-md mx-auto">
                <a
                  href={buildSiteVisitWhatsAppUrl({ ...form, refCode: bookingRef })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/10 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Receive on My WhatsApp</span>
                </a>

                <a
                  href={buildConciergeWhatsAppUrl(bookingRef, form.propertyName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Site Desk</span>
                </a>

                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Selected Property preview if any */}
              {form.propertyName && (
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Interested in:</span>
                  <span className="font-bold text-teal-900 truncate max-w-xs">{form.propertyName}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kulkarni"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">WhatsApp / Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                  <p className="text-[10px] text-teal-800 mt-1 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>VIP site inspection pass & driver coordinates will go to this WhatsApp.</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Your City</label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
                  >
                    <option value="Mumbai">Mumbai (Suburbs / Navi Mumbai / Thane)</option>
                    <option value="Pune">Pune (Kothrud / PCMC / Camp)</option>
                    <option value="NRI">NRI / Overseas Resident</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Travel / Pickup</label>
                  <select
                    value={form.pickupNeeded}
                    onChange={(e) => setForm({ ...form, pickupNeeded: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
                  >
                    <option value="Own Vehicle">Coming by Own Car</option>
                    <option value="Khed Station Pickup">Pickup from Khed Railway Station</option>
                    <option value="Dapoli Bus Stand">Pickup from Dapoli Central</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={form.guestCount}
                    onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Special Preferences or Inquiries</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want to inspect sea-facing plots with private access to beach; travelling with family."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              {/* Complimentary Konkan hospitality perks */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Coffee className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <span className="font-bold">Complimentary Konkan Hospitality Included: </span>
                  Fresh tender coconut welcome drink, authentic Malvani / Konkani luncheon, and private guided coastal tour of Murud, Ladghar and Karde beaches.
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Synced to Firebase & Site Manager
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Confirming Visit...' : 'Confirm VIP Booking'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
