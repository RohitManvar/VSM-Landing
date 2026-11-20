/**
 * Central Configuration for NexVSM Pricing & Feature Limits
 * Maintained as single source of truth for all pricing tiers, billing cycles,
 * currencies (USD & INR), and plan limits.
 */

export const PRICING_CONFIG = {
  currencies: {
    USD: {
      code: 'USD',
      symbol: '$',
      label: 'USD ($)',
      taxNotice: 'All prices in USD. Local taxes may apply based on your billing region.',
    },
    INR: {
      code: 'INR',
      symbol: '₹',
      label: 'INR (₹)',
      taxNotice: 'All prices in INR (₹). 18% GST applicable for Indian billing entities.',
    }
  },
  defaultCurrency: 'USD',
  annualDiscountPercent: 20,
  taxNotice: 'All prices in USD. Local taxes may apply based on your billing region.',
  disclaimer: 'Consultant plan includes an exclusive 3-day free trial. Professional and Business plans feature instant workspace activation with cancel-anytime flexibility.',
  currency: '$',
  currencyCode: 'USD',
  
  plans: [
    {
      id: 'free',
      name: 'Free',
      badge: null,
      description: 'For exploring NexVSM.',
      monthlyPrice: 0,
      annualPriceMonthly: 0,
      pricing: {
        USD: { monthly: 0, annualMonthly: 0, annualTotal: 0 },
        INR: { monthly: 0, annualMonthly: 0, annualTotal: 0 },
      },
      isCustom: false,
      popular: false,
      ctaText: 'Get Free Plan',
      ctaVariant: 'secondary',
      trialDays: 0,
      limits: {
        users: '1 user',
        projects: '5 VSM projects',
        aiAllowance: '5 AI recommendations/month',
        exports: 'Standard PDF export'
      },
      features: [
        '5 VSM projects',
        'Process data input',
        'Current State Map generation',
        'Basic FSPlanner',
        '5 AI recommendations/month',
        'Basic FSM generation',
        'Standard PDF export'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      badge: null,
      description: 'For individual Lean professionals.',
      monthlyPrice: 19,
      annualPriceMonthly: 15, // ~20% discount ($180/yr)
      pricing: {
        USD: { monthly: 19, annualMonthly: 15, annualTotal: 180 },
        INR: { monthly: 1599, annualMonthly: 1299, annualTotal: 15588 },
      },
      isCustom: false,
      popular: false,
      ctaText: 'Get Professional Plan',
      ctaVariant: 'secondary',
      trialDays: 0,
      limits: {
        users: '1 user',
        projects: '10 active VSM projects',
        aiAllowance: '100 AI credits/month',
        exports: 'PDF and Excel exports'
      },
      features: [
        '10 active VSM projects',
        'Complete CSM generation',
        'Complete FSPlanner',
        '100 AI analysis and refinement credits/month',
        'AI improvement recommendations',
        'Improved FSM generation',
        'Advanced process analysis',
        'PDF and Excel exports',
        'Project history'
      ]
    },
    {
      id: 'consultant',
      name: 'Consultant',
      badge: 'Recommended',
      description: 'For Lean consultants managing multiple clients.',
      monthlyPrice: 49,
      annualPriceMonthly: 39, // ~20% discount ($468/yr)
      pricing: {
        USD: { monthly: 49, annualMonthly: 39, annualTotal: 468 },
        INR: { monthly: 3999, annualMonthly: 3199, annualTotal: 38388 },
      },
      isCustom: false,
      popular: true,
      ctaText: 'Get Consultant Plan',
      ctaVariant: 'primary',
      trialDays: 3,
      limits: {
        users: '1 consultant seat',
        projects: '30 active VSM projects',
        aiAllowance: '300 AI credits/month',
        exports: 'Advanced reports and presentations'
      },
      features: [
        'Everything in Professional',
        '30 active VSM projects',
        'Multiple client workspaces',
        '300 AI credits/month',
        'Advanced AI recommendations and refinement',
        'Client-wise project management',
        'Reusable improvement templates',
        'Advanced reports and presentations',
        'Client sharing',
        'Priority support'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      badge: null,
      description: 'For manufacturing companies and Lean teams.',
      monthlyPrice: 99,
      annualPriceMonthly: 79, // ~20% discount ($948/yr)
      pricing: {
        USD: { monthly: 99, annualMonthly: 79, annualTotal: 948 },
        INR: { monthly: 7999, annualMonthly: 6399, annualTotal: 76788 },
      },
      isCustom: false,
      popular: false,
      ctaText: 'Get Business Plan',
      ctaVariant: 'secondary',
      trialDays: 0,
      limits: {
        users: 'Up to 5 users',
        projects: '50 active VSM projects',
        aiAllowance: '500 shared AI credits/month',
        exports: 'Advanced reporting'
      },
      features: [
        'Up to 5 users',
        '50 active VSM projects',
        'Shared organization workspace',
        '500 shared AI credits/month',
        'Team collaboration',
        'Shared improvement plans',
        'Centralized project management',
        'Role-based access',
        'Advanced reporting',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      badge: null,
      description: 'For large organizations and consulting firms.',
      monthlyPrice: null,
      annualPriceMonthly: null,
      pricing: {
        USD: { monthly: null, annualMonthly: null, annualTotal: null },
        INR: { monthly: null, annualMonthly: null, annualTotal: null },
      },
      isCustom: true,
      customPriceLabel: 'Custom',
      popular: false,
      ctaText: 'Contact Sales',
      ctaVariant: 'outline',
      limits: {
        users: 'Custom user allocation',
        projects: 'Custom project limits',
        aiAllowance: 'Custom AI credit allocation',
        exports: 'Enterprise support and SLA options'
      },
      features: [
        'Custom user allocation',
        'Custom project limits',
        'Custom AI credit allocation',
        'Organization-level management',
        'Dedicated onboarding',
        'Custom integrations',
        'Enterprise support and SLA options'
      ]
    }
  ]
};

export const formatPrice = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return 'Custom';
  if (amount === 0) return '0';
  if (currency === 'INR') {
    return amount.toLocaleString('en-IN');
  }
  return amount.toLocaleString('en-US');
};

export const getCurrencySymbol = (currency = 'USD') => {
  return currency === 'INR' ? '₹' : '$';
};
