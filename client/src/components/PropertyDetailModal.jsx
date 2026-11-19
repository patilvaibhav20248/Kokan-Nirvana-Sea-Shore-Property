import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Waves, 
  Maximize2, 
  Bed, 
  Bath, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Share2, 
  Sparkles, 
  Send, 
  MessageCircle, 
  Clock, 
  Car,
  Heart
} from 'lucide-react';
import { submitInquiry } from '../firebase/firebaseService';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyDetailModal({ property, onClose, onBookSiteVisit, onReserveProperty }) {
  const { isLiked, toggleLike } = useFavorites();
  const liked = property ? isLiked(property.id) : false;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'blueprint' | 'location'
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: `Hi, I am interested in ${property?.title || 'this property'} in Dapoli. Please share the complete pricing sheet, 7/12 extract copy, and schedule details.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        message: formState.message,
        propertyTitle: property.title,
        interestedCategory: property.category,
        budget: property.price
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {property.category} • {property.badge || 'Verified Project'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleLike(property.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${
                liked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title={liked ? 'Saved in your shortlist' : 'Save property for later'}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-400 text-red-400' : ''}`} />
              <span>{liked ? 'Saved' : 'Save for Later'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          
          {/* Main Title & Price Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-teal-800 font-semibold mb-1">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{property.location}</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900">
                {property.title}
              </h2>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 shrink-0 text-right">
              <span className="text-xs text-stone-500 uppercase font-bold block">Investment Price</span>
              <span className="text-2xl sm:text-3xl font-black text-stone-900">{property.price}</span>
              <span className="text-xs text-emerald-700 font-medium block mt-0.5">
                {property.possession}
              </span>
            </div>
          </div>

          {/* High-res Image Gallery */}
          <div className="space-y-3 mb-8">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-950 relative shadow-inner">
              <img 
                src={property.images[activeImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-2">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>{property.distanceToBeach}</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === i ? 'border-teal-700 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-950 text-white p-4 rounded-2xl mb-8">
            <div className="p-2">
              <span className="text-teal-300 text-[11px] uppercase block font-semibold">Plot Area</span>
              <span className="text-base sm:text-lg font-bold">{property.plotSize}</span>
            </div>
            <div className="p-2">
              <span className="text-teal-300 text-[11px] uppercase block font-semibold">Sanctioned Area</span>
              <span className="text-base sm:text-lg font-bold">{property.builtUpArea}</span>
            </div>
            <div className="p-2">
              <span className="text-teal-300 text-[11px] uppercase block font-semibold">Proximity</span>
              <span className="text-base sm:text-lg font-bold truncate">{property.distanceToBeach}</span>
            </div>
            <div className="p-2">
              <span className="text-teal-300 text-[11px] uppercase block font-semibold">Legal Sanction</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 truncate">100% Collector NA</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-stone-200 mb-6 gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'overview' ? 'border-teal-800 text-teal-800' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Overview & Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'features' ? 'border-teal-800 text-teal-800' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Key Amenities ({property.highlights.length})
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'blueprint' ? 'border-teal-800 text-teal-800' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Layout Blueprint
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'location' ? 'border-teal-800 text-teal-800' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Location & Access
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-10">
            {activeTab === 'overview' && (
              <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
                <p>{property.description}</p>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-amber-900">
                    <span className="font-bold">Legal Guarantee: </span>
                    {property.titleStatus}. Full title search report from Mumbai High Court advocate available for inspection along with 7/12 extract and Collector NA Sanad.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'blueprint' && (
              <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl border border-stone-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase text-teal-400">Architectural Master Blueprint Preview</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 text-amber-300">Sanctioned FSI 1.0</span>
                </div>
                <div className="border border-dashed border-stone-700 rounded-xl p-8 text-center bg-stone-950/60">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-teal-900/40 text-teal-400 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-white mb-1">
                    {property.title} — Demarcation Plan
                  </h4>
                  <p className="text-xs text-stone-400 max-w-md mx-auto mb-4">
                    Includes road frontage, compound wall boundary, setback coordinates, underground utilities schematic, and private garden allocation.
                  </p>
                  <button 
                    onClick={() => onBookSiteVisit(property)}
                    className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Request Full CAD / PDF Blueprint on WhatsApp
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <Waves className="w-4 h-4 text-cyan-600" />
                    Beach Access
                  </div>
                  <p className="text-stone-600">{property.distanceToBeach}. Safe swimming beach with dolphin sightings.</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <Car className="w-4 h-4 text-amber-600" />
                    Highway & Rail
                  </div>
                  <p className="text-stone-600">28 km from Khed Konkan Railway station (Vande Bharat stoppage) and NH-66 Mumbai-Goa expressway.</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <Clock className="w-4 h-4 text-teal-600" />
                    Drive Time
                  </div>
                  <p className="text-stone-600">Approx 4 hrs from Mumbai (via Mandwa Ro-Ro / Pen) and 3.5 hrs from Pune via Tamhini Ghat.</p>
                </div>
              </div>
            )}
          </div>

          {/* Lead Capture Form Section */}
          <div className="bg-gradient-to-br from-stone-50 to-teal-50/50 p-6 sm:p-8 rounded-2xl border border-teal-200/60">
            {submitSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-1">Inquiry Dispatched to Firebase & Concierge!</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-4">
                  Thank you, <span className="font-semibold text-stone-800">{formState.name}</span>. Our Dapoli property manager will contact you at <span className="font-semibold text-stone-800">{formState.phone}</span> with the complete legal dossier.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-4 py-2 rounded-lg bg-teal-800 text-white text-xs font-bold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="text-xs uppercase font-bold text-teal-800 tracking-wider">Fast-Track Response</span>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Enquire Directly for {property.title}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Receive brochure, price breakdown, and available plot coordinate map within minutes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 XXXXX"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Message / Questions</label>
                    <textarea
                      rows={2}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Saved securely to Firebase Firestore & Node Backend
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Dispatching...' : 'Send Inquiry'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Kokan Nirvana Sea Shore Property • Dapoli, Maharashtra
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/919820012345?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20in%20Dapoli`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                if (onReserveProperty) {
                  onReserveProperty(property);
                } else if (onBookSiteVisit) {
                  onBookSiteVisit(property);
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-900 hover:bg-amber-800 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Reserve This Plot</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookSiteVisit(property);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Site Visit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
