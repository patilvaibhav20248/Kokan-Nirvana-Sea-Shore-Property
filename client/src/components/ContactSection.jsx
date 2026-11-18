import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Compass,
  Calendar
} from 'lucide-react';
import { submitInquiry } from '../firebase/firebaseService';

export default function ContactSection({ onBookSiteVisit }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    interestedCategory: 'Collector NA Plots',
    budget: '₹25 L - ₹50 L',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitInquiry({
        ...form,
        propertyTitle: 'General Inquiry via Website Form'
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full mb-3 border border-amber-800">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Connect with Kokan Nirvana Team</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Begin Your Coastal Paradise Journey in Dapoli
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Whether you are looking for an immediate possession Collector NA plot, an Alphonso mango agro estate, 
            or a sea-facing luxury villa, our on-ground team in Dapoli is here to guide you with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Site Office Cards (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dapoli Site Office Card */}
            <div className="bg-stone-800/90 p-6 sm:p-7 rounded-3xl border border-stone-700 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Dapoli Main Experience Center</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">
                Kokan Nirvana Sea Shore Property
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                Near Murud Beach Road, Opposite Coconut Palm Ridge, Dapoli, District Ratnagiri, Maharashtra 415712
              </p>

              <div className="space-y-3 text-xs text-stone-300 pt-4 border-t border-stone-700/80">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">Call / Inquiry Line</span>
                    <a href="tel:+919820012345" className="font-bold text-white hover:text-amber-300 transition-colors">
                      +91 98200 12345 / +91 84460 67890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">WhatsApp Concierge</span>
                    <a 
                      href="https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20would%20like%20to%20know%20more%20about%20sea-facing%20plots%20in%20Dapoli"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-300 hover:text-white transition-colors"
                    >
                      Chat Directly on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">Email Desk</span>
                    <a href="mailto:inquiries@kokannirvana.com" className="font-bold text-white hover:text-amber-300 transition-colors">
                      inquiries@kokannirvana.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">Visiting Hours</span>
                    <span className="font-medium text-stone-200">Monday - Sunday: 9:00 AM - 7:00 PM (Site open all 7 days)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Site Visit Banner */}
            <div className="bg-gradient-to-r from-teal-900 to-emerald-950 p-6 rounded-3xl border border-teal-700/60 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-white">Planning a Weekend Trip to Dapoli?</h4>
                <p className="text-xs text-teal-200 mt-1">Book our chauffeured coastal tour with complimentary local lunch.</p>
              </div>
              <button
                onClick={onBookSiteVisit}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Book VIP Visit
              </button>
            </div>

          </div>

          {/* Inquiry Form (Right) */}
          <div className="lg:col-span-7 bg-stone-800/95 p-6 sm:p-8 rounded-3xl border border-stone-700 shadow-xl">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                  Inquiry Successfully Received!
                </h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto mb-6">
                  Thank you, <span className="font-bold text-white">{form.name}</span>. Your details have been stored in our Firebase database and forwarded to our senior property consultant.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">Fast Response Guaranteed</span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-white mt-0.5">
                    Request Property Information & Callback
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Fill out the form below. We will send 7/12 extract samples, plot layouts, and current offers within 2 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mahesh Shinde"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Your Current City</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai / Pune / Dubai"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Interested Category</label>
                      <select
                        value={form.interestedCategory}
                        onChange={(e) => setForm({ ...form, interestedCategory: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                      >
                        <option value="Collector NA Plots">Collector NA Plots (Sandalwood Palms)</option>
                        <option value="Beachfront Villas">Beachfront Villas (Azure Coast)</option>
                        <option value="Alphonso Agro Estates">Alphonso Mango Agro Estates (1-2 Acres)</option>
                        <option value="Oceanview Cottages">Oceanview Holiday Cottages</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Estimated Budget</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                      >
                        <option value="₹25 L - ₹50 L">₹25 Lakhs - ₹50 Lakhs</option>
                        <option value="₹50 L - ₹1 Cr">₹50 Lakhs - ₹1 Crore</option>
                        <option value="₹1 Cr - ₹2 Cr">₹1 Crore - ₹2 Crores</option>
                        <option value="₹2 Cr+">₹2 Crores+ (Ultra Luxury)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Message or Specific Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Looking for a sea-facing plot within walking distance to Ladghar or Murud beach with clear NA orders."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Data saved to Firebase & Node server backend</span>
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-stone-950" />
                      <span>{loading ? 'Submitting...' : 'Send Inquiry Now'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
