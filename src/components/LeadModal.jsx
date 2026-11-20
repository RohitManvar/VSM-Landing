import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building, Mail, User, Phone } from 'lucide-react';
import { PRICING_CONFIG } from '../config/pricing';

export const LeadModal = ({ isOpen, onClose, initialData = {} }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialData.mode || 'trial'); // 'trial' | 'demo' | 'login'
  const [selectedPlan, setSelectedPlan] = useState(initialData.plan || 'Professional');
  const currency = initialData.currency || 'USD';
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Manufacturing Engineer');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'demo' ? 'Demo Scheduled!' : 'Welcome to VSM Cloud!'}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              {mode === 'demo' 
                ? `Thank you ${fullName || 'there'}. A Faber Infinite manufacturing specialist has been notified and will email confirmation to ${workEmail || 'your inbox'}.`
                : selectedPlan === 'Consultant'
                  ? `Your 3-day full-access trial account for Consultant plan has been provisioned. We have sent verification details to ${workEmail || 'your email'}.`
                  : selectedPlan === 'Free'
                    ? `Your Free plan account has been activated. We have sent verification details to ${workEmail || 'your email'}.`
                    : `Your ${selectedPlan} plan subscription request has been received. Instant activation details have been sent to ${workEmail || 'your email'}.`
              }
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button
                onClick={handleReset}
                className="w-full py-3.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-3">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>
                  {mode === 'demo' 
                    ? 'Live Product Demo' 
                    : mode === 'login' 
                      ? 'Account Sign In' 
                      : selectedPlan === 'Consultant' 
                        ? '3-Day Free Trial' 
                        : selectedPlan === 'Free'
                          ? 'Free Forever'
                          : `${selectedPlan} Plan Subscription`
                  }
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {mode === 'demo' 
                  ? 'Request a Guided VSM Walkthrough' 
                  : mode === 'login' 
                    ? 'Sign in to your VSM workspace'
                    : selectedPlan === 'Consultant'
                      ? 'Start your 3-day Consultant trial'
                      : selectedPlan === 'Free'
                        ? 'Get started with your Free plan'
                        : `Activate your ${selectedPlan} plan`
                }
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {mode === 'demo'
                  ? 'See how VSM Cloud eliminates manual spreadsheet charting for your specific manufacturing plant.'
                  : mode === 'login'
                    ? 'Enter your credentials to access your saved Value Stream Maps.'
                    : 'Full access to digital VSM canvas and KPI engine. No credit card required.'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Work / Company Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company / Plant
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Manufacturing Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Manufacturing Engineer">Industrial Engineer</option>
                    <option value="Lean Consultant">Lean Consultant</option>
                    <option value="Plant Operations Manager">Plant / Ops Manager</option>
                    <option value="Continuous Improvement Director">CI / OpEx Director</option>
                  </select>
                </div>
              </div>

              {mode === 'trial' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Selected Plan
                  </label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Free">
                      {currency === 'INR' ? 'Free (₹0/mo)' : 'Free ($0/mo)'} — 5 VSM Projects
                    </option>
                    <option value="Professional">
                      {currency === 'INR' ? 'Professional (₹1,599/mo)' : 'Professional ($19/mo)'} — 10 Active Projects
                    </option>
                    <option value="Consultant">
                      {currency === 'INR' ? 'Consultant (₹3,999/mo)' : 'Consultant ($49/mo)'} — 3-Day Trial Included (30 Projects)
                    </option>
                    <option value="Business">
                      {currency === 'INR' ? 'Business (₹7,999/mo)' : 'Business ($99/mo)'} — Up to 5 Users, 50 Projects
                    </option>
                    <option value="Enterprise">Enterprise (Custom) — Multi-Plant &amp; Custom Integration</option>
                  </select>
                </div>
              )}

              {/* Security note */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {selectedPlan === 'Consultant' || selectedPlan === 'Free' 
                    ? 'Enterprise grade encryption. Zero credit card needed.' 
                    : 'Enterprise grade encryption. Cancel anytime.'
                  }
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 active:scale-98 text-white rounded-full font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {mode === 'demo' 
                      ? 'Book Product Walkthrough' 
                      : mode === 'login' 
                        ? 'Sign In' 
                        : selectedPlan === 'Consultant' 
                          ? 'Activate 3-Day Free Trial' 
                          : selectedPlan === 'Free' 
                            ? 'Get Free Plan' 
                            : `Subscribe to ${selectedPlan} Plan`
                    }
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
