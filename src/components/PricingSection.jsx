import React, { useState } from 'react';
import { Check, ChevronRight, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { PRICING_CONFIG, formatPrice, getCurrencySymbol } from '../config/pricing';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const PricingSection = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'INR'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      q: 'What is included in the Free plan?',
      a: 'The Free plan lets individual practitioners map 5 VSM projects with process data inputs, generate full Current State Maps (CSM), run basic FSPlanner analysis, access 5 AI recommendations/month, generate basic Future State Maps (FSM), and export standard PDFs.'
    },
    {
      q: 'How do AI recommendations work in Smart Improve?',
      a: 'NexVSM evaluates station cycle times against Takt time, identifies line starvation, and models continuous flow scenarios (such as line rebalancing, SMED changeover targets, and pull supermarket sizing) using deterministic Lean manufacturing logic.'
    },
    {
      q: 'Can I invite clients or team members to collaborate?',
      a: 'Yes. The Consultant plan supports multiple distinct client workspaces with client-wise project management. The Business plan includes up to 5 user seats with shared organizational workspaces and centralized project management.'
    },
    {
      q: 'Can I upgrade, downgrade, or cancel anytime?',
      a: 'Yes, all paid subscriptions can be adjusted or cancelled at any time from your account settings with zero cancellation penalties. Annual plans include a 20% discount.'
    },
    {
      q: 'Is my factory routing and cycle time data kept private?',
      a: 'Absolutely. We enforce strict data confidentiality. Your cycle times, routing secrets, and factory floor metrics are never used to train public machine learning models.'
    }
  ];

  const comparisonRows = [
    { name: 'Active VSM Projects', free: '5 projects', pro: '10 projects', consultant: '30 projects', business: '50 projects', enterprise: 'Custom / Unlimited' },
    { name: 'Current State Mapping (CSM)', free: 'Basic', pro: 'Complete', consultant: 'Complete', business: 'Complete', enterprise: 'Complete' },
    { name: 'Smart Improve / FSPlanner', free: 'Basic', pro: 'Complete', consultant: 'Complete', business: 'Complete', enterprise: 'Complete' },
    { name: 'AI Kaizen Credits / mo', free: '5 runs', pro: '100 credits', consultant: '300 credits', business: '500 credits', enterprise: 'Custom' },
    { name: 'Future State Mapping (FSM)', free: 'Basic', pro: 'Improved', consultant: 'Advanced', business: 'Advanced', enterprise: 'Tailored' },
    { name: 'User Seats Included', free: '1 user', pro: '1 user', consultant: '1 consultant seat', business: '5 team users', enterprise: 'Custom allocation' },
    { name: 'Client Workspaces', free: '—', pro: '—', consultant: 'Multiple Workspaces', business: 'Shared Org Workspace', enterprise: 'Multi-Plant Org' },
    { name: 'Export Formats', free: 'Standard PDF', pro: 'PDF & Excel', consultant: 'PDF, Excel & PPT', business: 'Full Export Suite', enterprise: 'API & SLA' },
    { name: 'Support Level', free: 'Community', pro: 'Standard', consultant: 'Priority Support', business: 'Priority Support', enterprise: 'Dedicated SLA' }
  ];

  return (
    <section id="pricing" className="py-24 md:py-36 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 border-b border-neutral-200/70 dark:border-neutral-800/80 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* EDITORIAL HEADER: "Simple plans. Smarter value stream transformation."    */}
        {/* ========================================================================= */}
        <ScrollReveal direction="up" duration={700}>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-black dark:text-white">
              Simple plans. <br className="hidden sm:inline" />
              Smarter value stream transformation.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
              Choose the right NexVSM plan for your team and scale your improvement journey.
            </p>

            {/* Toggle Controls: Currency Selector (USD / INR) & Billing Cycle (Monthly / Annual) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              
              {/* Currency Selector (USD $ / INR ₹) */}
              <div className="inline-flex items-center bg-neutral-100 dark:bg-[#1A1A1A] p-1 rounded-full border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    currency === 'USD'
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                  aria-label="Switch pricing currency to USD"
                >
                  <span className="font-mono text-xs font-bold">$</span>
                  <span>USD</span>
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    currency === 'INR'
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                  aria-label="Switch pricing currency to INR"
                >
                  <span className="font-mono text-xs font-bold">₹</span>
                  <span>INR</span>
                </button>
              </div>

              {/* Monthly / Annual Pill Toggle */}
              <div className="inline-flex items-center bg-neutral-100 dark:bg-[#1A1A1A] p-1 rounded-full border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span>Annual</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    billingCycle === 'annual'
                      ? 'bg-emerald-500/20 text-emerald-300 dark:text-emerald-700'
                      : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    Save {PRICING_CONFIG.annualDiscountPercent}%
                  </span>
                </button>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 5 PRICING CARDS (Free, Professional, Consultant, Business, Enterprise)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch max-w-[1400px] mx-auto">
          {PRICING_CONFIG.plans.map((plan, idx) => {
            const isAnnual = billingCycle === 'annual';
            const planPricing = plan.pricing ? plan.pricing[currency] : null;
            const monthlyPrice = planPricing ? planPricing.monthly : plan.monthlyPrice;
            const annualPrice = planPricing ? planPricing.annualMonthly : plan.annualPriceMonthly;
            const price = isAnnual ? annualPrice : monthlyPrice;
            const annualTotal = planPricing ? planPricing.annualTotal : (price * 12);
            const symbol = getCurrencySymbol(currency);

            return (
              <ScrollReveal key={plan.id} direction="up" delay={idx * 60}>
                <div
                  className={`h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 text-left relative ${
                    plan.popular
                      ? 'bg-white dark:bg-[#161616] border-2 border-black dark:border-white shadow-xl ring-2 ring-black/5 dark:ring-white/10 -translate-y-1'
                      : 'bg-[#F9F9FB] dark:bg-[#141414] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs'
                  }`}
                >
                  {/* Recommended Highlight Badge */}
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-xs z-20 ${
                      plan.popular 
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Plan Name & Tagline */}
                    <div className="mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed min-h-[34px] font-normal">
                      {plan.description}
                    </p>

                    {/* Price Block */}
                    <div className="mt-4 pb-5 border-b border-neutral-200/80 dark:border-neutral-800">
                      {plan.isCustom ? (
                        <div className="h-[44px] flex items-baseline">
                          <span className="text-3xl font-extrabold tracking-tight text-black dark:text-white">
                            Custom
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
                            {symbol}{formatPrice(price, currency)}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                            / month
                          </span>
                        </div>
                      )}

                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                        {plan.isCustom 
                          ? 'Tailored enterprise deployment' 
                          : price === 0
                            ? 'Free forever • No card required'
                            : isAnnual 
                              ? `Billed annually (${symbol}${formatPrice(annualTotal, currency)}/yr)`
                              : 'Billed monthly, cancel anytime'
                        }
                      </div>

                      {/* Explicit Trial Days Badge (Highlighting 3-Day Trial for Consultant) */}
                      {plan.trialDays > 0 && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/70 text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>{plan.trialDays}-day free trial included</span>
                        </div>
                      )}
                    </div>

                    {/* Feature Checklist */}
                    <div className="pt-4 space-y-2.5">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                        Included Features:
                      </span>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug text-[12px]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan Action CTA Button */}
                  <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                    <button
                      onClick={() => onOpenTrial({ mode: plan.isCustom ? 'demo' : 'trial', plan: plan.name, currency })}
                      className={`w-full py-2.5 sm:py-3 rounded-full text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-98 ${
                        plan.popular
                          ? 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold'
                          : 'bg-white dark:bg-[#1E1E1E] text-black dark:text-white border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE FEATURE COMPARISON TABLE                                    */}
        {/* ========================================================================= */}
        <div className="mt-20 sm:mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
              Compare plan features
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Detailed breakdown of allowances and capabilities across all plans.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FBFBFC] dark:bg-[#141414]">
            <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-[#1A1A1A]/70 text-black dark:text-white font-bold">
                  <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-[11px]">Capability</th>
                  <th className="py-3.5 px-3">Free</th>
                  <th className="py-3.5 px-3">Professional</th>
                  <th className="py-3.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">Consultant</th>
                  <th className="py-3.5 px-3">Business</th>
                  <th className="py-3.5 px-3">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70 text-neutral-700 dark:text-neutral-300 font-sans">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-black dark:text-white">{row.name}</td>
                    <td className="py-3 px-3">{row.free}</td>
                    <td className="py-3 px-3">{row.pro}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-300">{row.consultant}</td>
                    <td className="py-3 px-3">{row.business}</td>
                    <td className="py-3 px-3 font-medium text-black dark:text-white">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION                                */}
        {/* ========================================================================= */}
        <div id="faq" className="mt-20 sm:mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
              Frequently asked questions
            </h3>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, fIdx) => (
              <div 
                key={fIdx}
                className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                  className="w-full py-4 px-5 text-left font-semibold text-sm sm:text-[15px] flex items-center justify-between gap-4 text-black dark:text-white cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === fIdx ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>
                {openFaqIndex === fIdx && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footnote Disclaimers */}
        <div className="mt-14 max-w-2xl mx-auto text-center space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <p>{PRICING_CONFIG.currencies[currency].taxNotice}</p>
          <p>{PRICING_CONFIG.disclaimer}</p>
        </div>

      </div>
    </section>
  );
};
