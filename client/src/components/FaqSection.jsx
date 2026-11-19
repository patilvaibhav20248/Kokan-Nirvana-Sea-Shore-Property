import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { realFaqs } from '../data/dapoliData';

export default function FaqSection({ onOpenSiteVisit }) {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-50 px-3.5 py-1 rounded-full mb-3 border border-teal-200">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            <span>Buyer Questions & Transparency</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Frequently Asked Questions by Land Buyers
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Real answers to common legal, registration, construction, and property management queries from families in Mumbai and Pune.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {realFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'border-stone-400 bg-stone-50/70 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'bg-stone-900 text-white rotate-180' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-200/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-6 bg-stone-50 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-600">
          <span>Have a specific legal or revenue query regarding your land purchase? </span>
          <button
            type="button"
            onClick={() => onOpenSiteVisit(null)}
            className="font-bold text-teal-800 underline underline-offset-4 hover:text-teal-950 cursor-pointer ml-1"
          >
            Speak directly with our Dapoli Land Consultant →
          </button>
        </div>

      </div>
    </section>
  );
}
