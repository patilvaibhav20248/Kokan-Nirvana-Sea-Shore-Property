import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Search, CheckCircle2, Award, Download, FileText, Lock } from 'lucide-react';

export default function LegalVerifier({ onOpenBrochure }) {
  const [selectedPlot, setSelectedPlot] = useState('P-101');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const sampleCertificates = {
    'P-101': {
      plot: 'Plot 101 (Sandalwood Palms, Ladghar Ridge)',
      sanadNo: 'COL/RATNAGIRI/NA-ORD/2024/4891',
      surveyNo: 'Gat No. 112/4 (Hissa No. 2)',
      zone: 'Residential Collector NA (Non-Agricultural)',
      titleStatus: '100% Clear, Marketable & Unencumbered',
      searchPeriod: '30-Year Search (1994 - 2024)',
      advocate: 'Adv. S. K. Deshmukh (Bombay High Court)',
      mutationEntry: 'Ferfar No. 1842 Verified',
      fsi: 'Sanctioned 1.0 FSI with 30-ft Tar Road Frontage'
    },
    'P-103': {
      plot: 'Plot 103 (Corner Sea-Breeze Plot, Sandalwood Palms)',
      sanadNo: 'COL/RATNAGIRI/NA-ORD/2024/4893',
      surveyNo: 'Gat No. 112/4 (Hissa No. 4)',
      zone: 'Residential Collector NA (Non-Agricultural)',
      titleStatus: '100% Clear, Marketable & Unencumbered',
      searchPeriod: '30-Year Search (1994 - 2024)',
      advocate: 'Adv. S. K. Deshmukh (Bombay High Court)',
      mutationEntry: 'Ferfar No. 1844 Verified',
      fsi: 'Sanctioned 1.0 FSI with Dual Corner Access'
    },
    'V-201': {
      plot: 'The Azure Coast Beachfront Villa Estate',
      sanadNo: 'COL/RATNAGIRI/MURUD/NA/2023/1102',
      surveyNo: 'Gat No. 84/1 (Shoreline Zone)',
      zone: 'Collector NA Permitted Luxury Villa Development',
      titleStatus: 'Clear Title with Direct Beach Access Sanction',
      searchPeriod: '30-Year Search (1994 - 2024)',
      advocate: 'Adv. Meera Nadkarni (High Court, Mumbai)',
      mutationEntry: 'Ferfar No. 921 Verified',
      fsi: 'Individual 7/12 Extract Recorded'
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setVerificationResult(sampleCertificates[selectedPlot] || sampleCertificates['P-101']);
      setIsVerifying(false);
    }, 400);
  };

  return (
    <section className="py-20 bg-stone-100/80 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-100 px-3.5 py-1 rounded-full mb-3 border border-teal-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Digital Due Diligence & Transparency Tool</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Instant 7/12 & Collector NA Title Verifier
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            In Konkan, legal legitimacy is the greatest luxury. Select any unit below to inspect its sanctioned Collector NA Order, 
            survey demarcation, and 30-year advocate title clearance.
          </p>
        </div>

        {/* Verifier Interactive Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Selector & Action (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">
              Select Sample Plot or Villa Unit:
            </label>

            <select
              value={selectedPlot}
              onChange={(e) => {
                setSelectedPlot(e.target.value);
                setVerificationResult(null);
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer"
            >
              <option value="P-101">Plot 101 — Sandalwood Palms (Ladghar Ridge)</option>
              <option value="P-103">Plot 103 — Corner Sea-Breeze Plot (Ladghar)</option>
              <option value="V-201">The Azure Coast Villa (Murud Beachfront)</option>
            </select>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full py-3.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isVerifying ? 'Scanning Revenue Records...' : 'Verify Legal Dossier & 7/12'}</span>
            </button>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                Zero Ambiguity Commitment:
              </span>
              <p className="text-[11px] text-amber-800">
                You can bring your own legal counsel or revenue consultant to physically review the original Collector Sanad at our Dapoli office.
              </p>
            </div>
          </div>

          {/* Certificate Result Preview (7 Cols) */}
          <div className="lg:col-span-7">
            {verificationResult ? (
              <div className="bg-stone-900 text-stone-100 p-6 sm:p-7 rounded-2xl border border-teal-500/50 shadow-inner space-y-3 font-mono text-xs">
                
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-[11px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    STATUS: SANCTIONED & REGISTERED
                  </span>
                  <span className="text-stone-400">MAHARASHTRA LAND REVENUE CODE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Unit Demarcation:</span>
                    <strong className="text-white">{verificationResult.plot}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Sanctioned Collector Sanad:</span>
                    <strong className="text-amber-300">{verificationResult.sanadNo}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Survey / Gat Number:</span>
                    <strong className="text-white">{verificationResult.surveyNo}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Zoning Permitted:</span>
                    <strong className="text-emerald-300">{verificationResult.zone}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Title Opinion:</span>
                    <strong className="text-white">{verificationResult.titleStatus}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Advocate Certification:</span>
                    <strong className="text-teal-300">{verificationResult.advocate}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">Digital Copy Hash: SHA-256 #8f92a1c0</span>
                  <button
                    onClick={onOpenBrochure}
                    className="text-[11px] font-sans font-bold text-amber-300 hover:text-white underline underline-offset-4 cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Signed PDF Copy</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="border border-dashed border-stone-300 rounded-2xl p-8 text-center text-stone-500 bg-stone-50">
                <FileText className="w-10 h-10 mx-auto text-stone-400 mb-2" />
                <h4 className="font-bold text-stone-800 text-sm">Revenue Certificate Inspector</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                  Click the button on the left to run an automated simulation check of the Collector NA Sanad and 7/12 record.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
