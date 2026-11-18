import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  IndianRupee, 
  Calendar, 
  Percent, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function InvestmentCalculator({ onOpenSiteVisit, onOpenBrochure }) {
  const [propertyCost, setPropertyCost] = useState(3000000); // 30 Lakhs default
  const [holdingYears, setHoldingYears] = useState(5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.75);

  // Formatting helpers for INR
  const formatInr = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Calculations
  const downPayment = Math.round(propertyCost * (downPaymentPercent / 100));
  const loanAmount = propertyCost - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = holdingYears * 12;

  const monthlyEmi = Math.round(
    loanAmount * monthlyRate * (Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  // Capital appreciation in Dapoli: 13.5% CAGR
  const annualGrowth = 0.135;
  const projectedFutureValue = Math.round(propertyCost * Math.pow(1 + annualGrowth, holdingYears));
  const capitalGain = projectedFutureValue - propertyCost;

  // Tourism rental yield: 10.5% average annual return
  const annualRentalYield = Math.round(propertyCost * 0.105);
  const totalRentalIncome = annualRentalYield * holdingYears;

  const totalReturn = capitalGain + totalRentalIncome;

  return (
    <section id="investment-roi" className="py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-widest bg-teal-100/80 px-3.5 py-1 rounded-full mb-3 border border-teal-200">
            <Calculator className="w-3.5 h-3.5 text-teal-700" />
            <span>Financial Planning & Growth Simulator</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Dapoli Land Investment & ROI Calculator
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            With the rapid completion of the Mumbai-Goa 4-lane expressway and the explosion of weekend staycations, 
            coastal land in Dapoli delivers extraordinary capital appreciation paired with high vacation rental yields.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            
            {/* Slider 1: Property Cost */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Target Property / Plot Value
                </label>
                <span className="text-lg font-black text-stone-900">
                  {formatInr(propertyCost)}
                </span>
              </div>
              <input
                type="range"
                min="2000000"
                max="25000000"
                step="500000"
                value={propertyCost}
                onChange={(e) => setPropertyCost(Number(e.target.value))}
                className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-medium">
                <span>₹20 Lakhs (NA Plot)</span>
                <span>₹1.25 Cr (Cottage)</span>
                <span>₹2.5 Cr (Luxury Villa)</span>
              </div>
            </div>

            {/* Slider 2: Holding Years */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Investment Horizon
                </label>
                <span className="text-lg font-black text-stone-900">
                  {holdingYears} Years
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 7, 10].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setHoldingYears(yr)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      holdingYears === yr 
                        ? 'bg-teal-800 text-white border-teal-800 shadow-sm' 
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-stone-900">
                  {formatInr(downPayment)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>10% Self-Funded</span>
                <span>Loan Required: {formatInr(loanAmount)}</span>
                <span>50%</span>
              </div>
            </div>

            {/* Slider 4: Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Estimated Bank Loan Rate
                </label>
                <span className="text-sm font-bold text-stone-900">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="7.5"
                max="11.5"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1.5 border-t border-stone-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Nationalized bank plot loans (SBI, HDFC, ICICI, Bank of Baroda) available on Collector NA plots.</span>
            </div>

          </div>

          {/* Projection Card (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-stone-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl border border-teal-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-teal-900 mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                    Financial Projection
                  </span>
                  <span className="text-xs text-stone-400">Based on {holdingYears}-year Dapoli trend</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950">
                  13.5% CAGR
                </span>
              </div>

              {/* Monthly EMI */}
              <div className="mb-6 bg-stone-900/80 p-4 rounded-2xl border border-teal-900">
                <span className="text-xs text-teal-300 uppercase font-semibold block mb-1">
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl font-black text-white">
                  ₹{monthlyEmi.toLocaleString('en-IN')} <span className="text-xs font-normal text-stone-400">/ month</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-1">
                  For loan tenure of {holdingYears} years on {formatInr(loanAmount)}
                </span>
              </div>

              {/* Projected Asset Value Breakdown */}
              <div className="space-y-3 mb-6 text-xs">
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Projected Land Value ({holdingYears} Years)</span>
                  <span className="font-bold text-amber-300">{formatInr(projectedFutureValue)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Projected Capital Gain</span>
                  <span className="font-bold text-emerald-400">+{formatInr(capitalGain)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Projected Vacation Rental Yield</span>
                  <span className="font-bold text-cyan-300">+{formatInr(totalRentalIncome)}</span>
                </div>

                <div className="flex justify-between py-2 pt-3">
                  <span className="text-sm font-bold text-white">Total Estimated Return</span>
                  <span className="text-base font-black text-amber-300">+{formatInr(totalReturn)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-teal-900 space-y-3">
              <button
                onClick={onOpenSiteVisit}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Schedule VIP Site Visit & Financial Review</span>
              </button>

              <button
                onClick={onOpenBrochure}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-teal-200 bg-white/5 hover:bg-white/10 border border-teal-800 transition-colors cursor-pointer"
              >
                Download Detailed Investment Deck (PDF)
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
