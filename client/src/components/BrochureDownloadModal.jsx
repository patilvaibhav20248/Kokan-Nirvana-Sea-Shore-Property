import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  Send,
  MessageCircle
} from 'lucide-react';
import { submitInquiry } from '../firebase/firebaseService';

export default function BrochureDownloadModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Complete Project Dossier & Price Sheet'
  });
  const [downloading, setDownloading] = useState(false);
  const [ready, setReady] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloading(true);
    try {
      await submitInquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: 'Requested Project Brochure & Legal Dossier Download',
        propertyTitle: 'Full Dapoli Coastal Master Portfolio',
        interestedCategory: 'E-Brochure Download'
      });
      setReady(true);
    } catch (err) {
      console.error(err);
      setReady(true);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-950 to-stone-900 p-6 text-white flex items-center justify-between border-b border-teal-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Project Dossier</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Download Kokan Nirvana Dossier
            </h3>
            <p className="text-xs text-teal-200 mt-0.5">
              Includes high-res Master Plan, 7/12 land extract copy, and 2026 pricing schedule.
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
        <div className="p-6">
          {ready ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-1">
                Your E-Brochure Package is Ready!
              </h4>
              <p className="text-xs text-stone-600 mb-6 max-w-xs mx-auto">
                We've also dispatched a direct WhatsApp copy to <span className="font-bold text-stone-800">{form.phone}</span>.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href="/brochure-preview.pdf"
                  download="Kokan-Nirvana-Sea-Shore-Dapoli-Brochure.pdf"
                  onClick={(e) => {
                    // Friendly mock download
                    e.preventDefault();
                    alert("Downloading Kokan Nirvana Sea Shore Property Master Dossier & Sanctioned NA Map (PDF)...");
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete PDF (12.4 MB)</span>
                </a>

                <a
                  href={`https://wa.me/919820012345?text=Hi%20Kokan%20Nirvana%20team,%20please%20send%20me%20the%20brochure%20and%20rates%20for%20Dapoli%20plots%20to%20${encodeURIComponent(form.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Get on WhatsApp Instantly</span>
                </a>

                <button
                  onClick={onClose}
                  className="text-xs text-stone-500 hover:text-stone-800 font-medium mt-2"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Package Contents:
                </div>
                <div>• Sandalwood Palms & Sea Breeze Master Blueprint</div>
                <div>• Sanctioned Collector NA Orders & Sample 7/12 Extract</div>
                <div>• 2026 Price List & Down-Payment Installment Schemes</div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanjay Patil"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">WhatsApp Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 XXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={downloading}
                  className="w-full py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Preparing Download Package...' : 'Download Project Dossier (PDF)'}</span>
                </button>
              </div>

              <p className="text-[10px] text-stone-400 text-center">
                🔒 We respect your privacy. No spam. Instant direct access to legal & pricing docs.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
