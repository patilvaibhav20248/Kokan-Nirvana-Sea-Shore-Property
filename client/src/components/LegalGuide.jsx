import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Download, Lock, Check } from 'lucide-react';

export default function LegalGuide({ onOpenBrochure }) {
  const steps = [
    {
      step: "01",
      title: "Collector NA Sanad (Class-1 Non-Agricultural)",
      desc: "Sanctioned order issued by the District Collector under Section 44 of Maharashtra Land Revenue Code (MLRC). Class-1 status ensures absolute freehold ownership with zero government royalty or non-farmer restrictions."
    },
    {
      step: "02",
      title: "Individual 7/12 (Satbara) & 8-A Extract",
      desc: "A separate, independent 7/12 extract is mutated in the buyer’s personal name with an exclusive Gat/Hissa number. Your name is officially recorded as the sole Bhogavatdar (occupant) in Maharashtra Land Records."
    },
    {
      step: "03",
      title: "Government Demarcation (TILR Mojani)",
      desc: "Every single plot boundary is physically demarcated on ground by the Taluka Inspector of Land Records (TILR) using permanent concrete boundary stones and GPS survey points."
    },
    {
      step: "04",
      title: "30-Year Advocate Title Clearance Report",
      desc: "Certified search report spanning 30 continuous years conducted by a practicing High Court advocate, confirming zero bank mortgages, pending litigation, or encumbrances."
    }
  ];

  return (
    <section id="legal-guide" className="py-20 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full mb-3 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Land Laws & Revenue Transparency</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            How Clear-Title Land Ownership Works in Dapoli
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Buying land in Konkan has historically suffered from ancestral title confusion. 
            At Kokan Nirvana, we complete 100% of revenue sanctions, Collector NA orders, and boundary demarcation <strong>before</strong> opening any plot for sale.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black text-amber-800 font-mono mb-3">
                  {s.step}
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>100% Verified in Revenue Office</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Dossier Inspection Box */}
        <div className="bg-amber-50/70 rounded-3xl p-6 sm:p-8 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-stone-900 text-base">
              Want your family advocate to review our papers first?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              We happily email our complete legal dossier (Collector Sanad order, 30-year title search certificate, and sample 7/12 extract) directly to your legal advisor before you deposit any token money.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBrochure}
            className="shrink-0 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Request Legal Dossier (PDF)</span>
          </button>
        </div>

      </div>
    </section>
  );
}
