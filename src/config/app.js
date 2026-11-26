// Where the VSM 4.0 web app lives. Set VITE_APP_URL at build time for production
// (e.g. VITE_APP_URL=https://app.example.com); the default is the local dev app.
export const APP_URL = (import.meta.env.VITE_APP_URL || 'http://localhost:5174').replace(/\/+$/, '');

export const APP_LOGIN_URL = `${APP_URL}/login`;
// Self-serve free trial sign-up (creates the account + organization after email verification).
export const APP_SIGNUP_URL = `${APP_URL}/register`;

// Where "Book a demo" / "Contact sales" requests go. Set VITE_SALES_EMAIL to receive them by email.
export const SALES_EMAIL = import.meta.env.VITE_SALES_EMAIL || '';
export const COMPANY_URL = 'https://faberinfinite.com';

export const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };

// Paid plan buttons: sign up (or sign in) and land on the app's billing page with
// the Razorpay checkout open for this plan. Keys are PRICING_CONFIG plan ids;
// values are the slugs the app understands (frontend checkoutIntent.js).
const APP_PLAN_SLUGS = { professional: 'professional', business: 'professional-plus' };
export const goToPlanCheckout = (planId, cycle = 'annual') => {
  const slug = APP_PLAN_SLUGS[planId];
  if (!slug) { goToSignup(); return; }
  const params = new URLSearchParams({ plan: slug, cycle: cycle === 'monthly' ? 'monthly' : 'annual' });
  window.location.href = `${APP_SIGNUP_URL}?${params}`;
};
export const goToLogin = () => { window.location.href = APP_LOGIN_URL; };
