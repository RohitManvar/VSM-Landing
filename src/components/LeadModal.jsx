import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowUpRight, Sparkles, Building, Mail, User } from 'lucide-react';
import { APP_SIGNUP_URL, SALES_EMAIL, COMPANY_URL } from '../config/app';

// "Book a demo" / "Contact sales" request. Trials don't come here: they go
// straight to the app's self-serve sign-up (see config/app.js).
// There is no backend behind this page, so the request is handed to the
// visitor's email app (VITE_SALES_EMAIL) — nothing is claimed as sent until
// they press send there.
export const LeadModal = ({ isOpen, onClose, initialData = {} }) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Industrial Engineer');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { setSubmitted(false); onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const plan = initialData.plan && initialData.plan !== 'Trial' ? initialData.plan : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (SALES_EMAIL) {
      const subject = `VSM 4.0 demo request — ${companyName}`;
      const body = [
        `Name: ${fullName}`,
        `Email: ${workEmail}`,
        `Company / plant: ${companyName}`,
        `Role: ${role}`,
        plan ? `Interested in: ${plan} plan` : null,
        '',
        message,
      ].filter((l) => l !== null).join('\n');
      window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(COMPANY_URL, '_blank', 'noopener');
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const inputCls = 'w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="relative bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Almost done</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              {SALES_EMAIL
                ? <>Your email app has opened with the request to <strong>{SALES_EMAIL}</strong>. Press send there and our team will get back to you.</>
                : <>We opened the Faber Infinite website in a new tab. Use its contact page to reach our team about a VSM 4.0 demo.</>}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              <a
                href={APP_SIGNUP_URL}
                className="w-full py-3.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                Meanwhile, start a free trial <ArrowUpRight className="w-4 h-4" />
              </a>
              <button onClick={handleClose} className="text-sm text-slate-500 hover:text-slate-800 cursor-pointer">
                Back to website
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-3">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>{plan ? `${plan} plan` : 'Live product demo'}</span>
              </div>
              <h3 id="lead-modal-title" className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {plan === 'Enterprise' ? 'Talk to us about Enterprise' : 'Book a guided VSM 4.0 walkthrough'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Tell us about your plant and we'll show you VSM 4.0 on a value stream like yours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lm-name" className="block text-xs font-medium text-slate-700 mb-1">Full name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input id="lm-name" type="text" required placeholder="e.g. Ramesh Patel" value={fullName}
                    onChange={(e) => setFullName(e.target.value)} className={inputCls} />
                </div>
              </div>

              <div>
                <label htmlFor="lm-email" className="block text-xs font-medium text-slate-700 mb-1">Work email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input id="lm-email" type="email" required placeholder="name@company.com" value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)} className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lm-company" className="block text-xs font-medium text-slate-700 mb-1">Company / plant</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input id="lm-company" type="text" required placeholder="Manufacturing Ltd" value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="lm-role" className="block text-xs font-medium text-slate-700 mb-1">Your role</label>
                  <select id="lm-role" value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors">
                    <option>Industrial Engineer</option>
                    <option>Lean Consultant</option>
                    <option>Plant / Ops Manager</option>
                    <option>CI / OpEx Director</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="lm-msg" className="block text-xs font-medium text-slate-700 mb-1">What would you like to see? <span className="text-slate-400">(optional)</span></label>
                <textarea id="lm-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. 3 assembly lines, 2 plants, mapping lead time from supplier to customer"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:border-slate-400 focus:bg-white focus:outline-none transition-colors resize-none" />
              </div>

              <div className="pt-2">
                <button type="submit"
                  className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 active:scale-98 text-white rounded-full font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>{SALES_EMAIL ? 'Send request' : 'Contact our team'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  Prefer to explore on your own?{' '}
                  <a href={APP_SIGNUP_URL} className="font-semibold text-slate-800 underline underline-offset-2">Start a free trial</a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
