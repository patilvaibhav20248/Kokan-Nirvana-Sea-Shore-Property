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
  ShieldCheck
} from 'lucide-react';
import { submitSiteVisit } from '../firebase/firebaseService';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitSiteVisit(form);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
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
            <div className="text-center py-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 border-4 border-emerald-600 bg-emerald-50 text-emerald-800 font-black text-xl sm:text-2xl px-5 py-2 rounded-2xl uppercase tracking-wider mb-4 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>BOOKED & CONFIRMED! (आरक्षित)</span>
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-2">
                VIP Site Visit Successfully Booked!
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
                Thank you, <strong className="text-stone-900">{form.name}</strong>. Your complimentary VIP site inspection is officially <strong>BOOKED</strong>. Our Dapoli hospitality concierge will contact you at <strong className="text-stone-900">{form.phone}</strong> to coordinate your Khed station pickup and refreshments.
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20have%20booked%20a%20VIP%20site%20visit%20for%20${encodeURIComponent(form.propertyName || 'Dapoli Projects')}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
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
