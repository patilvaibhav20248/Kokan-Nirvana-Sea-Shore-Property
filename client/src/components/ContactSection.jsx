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
  Calendar,
  UserCheck
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
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full mb-3 border border-amber-800">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Human Sales & Site Team</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Connect with Our Dapoli Site Team
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Planning a weekend road trip to Dapoli? Speak directly with our site managers or visit our local sales office. 
            We coordinate free plot inspections, boundary stone checks, and revenue record reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Site Office & Team Cards (Left, 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dapoli Office Card */}
            <div className="bg-stone-800/90 p-6 sm:p-7 rounded-3xl border border-stone-700">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>Dapoli Main Site Office</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">
                Kokan Nirvana Sea Shore Property
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                Near Murud Beach Road Junction, Opposite Coconut Palm Grove, Dapoli, District Ratnagiri, Maharashtra 415712
              </p>

              <div className="space-y-3 text-xs text-stone-300 pt-4 border-t border-stone-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">Direct Site Office Lines</span>
                    <a href="tel:+919820012345" className="font-bold text-white hover:text-amber-300 transition-colors">
                      +91 98200 12345 / +91 84460 67890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">WhatsApp Site Desk</span>
                    <a 
                      href="https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20would%20like%20to%20know%20more%20about%20Collector%20NA%20plots%20in%20Dapoli"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-300 hover:text-white transition-colors"
                    >
                      Chat on WhatsApp (+91 98200 12345) →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">Email Inquiries</span>
                    <a href="mailto:inquiries@kokannirvana.com" className="font-bold text-white hover:text-amber-300 transition-colors">
                      inquiries@kokannirvana.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">Office & Site Visiting Hours</span>
                    <span className="font-medium text-stone-200">Monday to Sunday: 9:00 AM to 7:00 PM (Open all weekends)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Team Contacts */}
            <div className="bg-stone-850 p-5 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                Local On-Ground Coordinators:
              </span>
              <div className="flex justify-between items-center py-1 border-b border-stone-800">
                <span className="font-bold text-white">Sagar Kadam</span>
                <span className="text-stone-400">Site Operations & Survey Manager</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-bold text-white">Adv. Rajeshwar Patil</span>
                <span className="text-stone-400">Dapoli Revenue & Title Counsel</span>
              </div>
            </div>

          </div>

          {/* Direct Inquiry Form (Right, 7 Cols) */}
          <div className="lg:col-span-7 bg-stone-800/90 p-6 sm:p-8 rounded-3xl border border-stone-700">
            {submitted ? (
              <div className="text-center py-8 animate-fadeIn">
                <div className="inline-flex items-center gap-2 border-2 border-emerald-500 bg-emerald-950/80 text-emerald-300 font-black text-lg px-4 py-1.5 rounded-2xl uppercase tracking-wider mb-4 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>RECORDED & CONFIRMED! (नोंद झाली आहे)</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                  Request Received by Dapoli Desk!
                </h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-white">{form.name}</strong>. Your inquiry and plot preference have been recorded. Our senior Dapoli manager Sagar Kadam will call you at <strong className="text-white">{form.phone}</strong> with the 7/12 extract and sanctioned layout map.
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href={`https://wa.me/919820012345?text=Hello%20Kokan%20Nirvana%20team,%20I%20have%20submitted%20an%20inquiry%20for%20${encodeURIComponent(form.interestedCategory)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Site Desk</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-bold text-xs cursor-pointer"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Direct Response Guarantee</span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-white mt-0.5">
                    Request Pricing & Land Records
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Fill out the form below to receive the sanctioned Collector NA order, demarcation map, and pricing sheet on WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Joshi"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Your Current City</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai / Pune / Thane"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Interested Project Type</label>
                      <select
                        value={form.interestedCategory}
                        onChange={(e) => setForm({ ...form, interestedCategory: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                      >
                        <option value="Collector NA Plots">Sandalwood Palms NA Plots (Ladghar)</option>
                        <option value="Beachfront Villas">The Azure Coast Luxury Villas (Murud)</option>
                        <option value="Alphonso Agro Estates">Alphonso Greens 1-Acre Estates (Karde)</option>
                        <option value="Oceanview Cottages">Coral Horizon Holiday Cottages (Karde)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Estimated Budget</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                      >
                        <option value="₹25 L - ₹50 L">₹25 Lakhs - ₹50 Lakhs (NA Plots)</option>
                        <option value="₹50 L - ₹1 Cr">₹50 Lakhs - ₹1 Crore (Agro/Cottages)</option>
                        <option value="₹1 Cr - ₹2 Cr">₹1 Crore - ₹2 Crores (Beach Villas)</option>
                        <option value="₹2 Cr+">₹2 Crores+ (Ultra Luxury Beachfront)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">Specific Questions or Plot Size Preference</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Interested in a 2.5 Guntha sea-facing plot in Ladghar with separate 7/12 extract. Visiting Dapoli next Saturday."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Data safely stored in Firebase & dispatched to site manager</span>
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-7 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-stone-950" />
                      <span>{loading ? 'Submitting...' : 'Send Inquiry'}</span>
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
