/**
 * Central Configuration for VSM 4.0 Pricing & Feature Limits
 * Maintained as single source of truth for all pricing tiers, billing cycles,
 * currencies (INR & USD), and plan limits.
 */

export const PRICING_CONFIG = {
  currencies: {
    INR: {
      code: 'INR',
      symbol: '₹',
      label: 'INR (₹)',
      taxNotice: 'All prices in INR (₹). 18% GST applicable for Indian billing entities.',
    },
    USD: {
      code: 'USD',
      symbol: '$',
      label: 'USD ($)',
      taxNotice: 'All prices in USD. Local taxes may apply based on your billing region.',
    }
  },
  defaultCurrency: 'INR',
  annualDiscountPercent: 10,
  taxNotice: 'All prices in INR (₹). 18% GST applicable for Indian billing entities.',
  trialPolicy: {
    durationDays: 7,
    planId: 'free',
    label: '7-Day Free Trial',
    badgeText: '7-day free trial included',
    autoExpiry: true,
    autoPayment: false,
    retentionDays: 30,
    rules: [
      'Trial expires automatically after 7 days.',
      'User receives expiry notifications.',
      'User selects a paid subscription to continue.',
      'No automatic payment or credit card required upfront.',
      'Project data retained for 30 days under retention policy.'
    ]
  },
  disclaimer: 'Trial plan includes a 7-day free trial with zero automatic payment. Trial expires automatically after 7 days, and project data is retained for 30 days under our retention policy. Professional and Professional Plus plans feature instant activation.',
  currency: '₹',
  currencyCode: 'INR',

  plans: [
    {
      id: 'free',
      tierNumber: '01',
      name: 'Trial',
      badge: '7-Day Trial',
      badgeVariant: 'trial',
      description: 'Map your first value stream and explore smart improvement ideas.',
      monthlyPrice: 0,
      annualPriceMonthly: 0,
      pricing: {
        INR: { monthly: 0, annualMonthly: 0, annualTotal: 0 },
        USD: { monthly: 0, annualMonthly: 0, annualTotal: 0 },
      },
      isCustom: false,
      popular: false,
      ctaText: 'Start 7-Day Free Trial',
      ctaVariant: 'secondary',
      trialDays: 7,
      limits: {
        users: '1 user',
        projects: '2 active VSM projects',
        aiAllowance: '5 AI recommendations/month'
      },
      features: [
        '1 user',
        '2 active VSM projects',
        'Current State Map generation',
        'Future State Map generation',
        '5 AI recommendations/month',
        'Future State Planner'
      ]
    },
    {
      id: 'professional',
      tierNumber: '02',
      name: 'Professional',
      badge: 'Recommended starting plan',
      description: 'Deliver high-impact Lean projects with dedicated workspaces.',
      monthlyPrice: 9999,
      annualPriceMonthly: 8999, // ~10% discount (₹107,988/yr)
      pricing: {
        INR: { monthly: 9999, annualMonthly: 8999, annualTotal: 107988 },
        USD: { monthly: 99, annualMonthly: 89, annualTotal: 1068 },
      },
      isCustom: false,
      popular: true,
      ctaText: 'Get Professional Plan',
      ctaVariant: 'primary',
      trialDays: 0,
      limits: {
        users: '1 user',
        projects: '10 active VSM projects',
        workspaces: 'Multiple project workspaces',
        aiAllowance: '150 AI credits/month',
        exports: 'PDF and Excel exports'
      },
      features: [
        '1 user',
        '10 active VSM projects',
        'Multiple project workspaces',
        'Complete Current State Map generation',
        'Complete Future State Map generation',
        'Smart Improve with AI recommendations',
        '150 AI credits/month',
        'Complete FSPlanner',
        'PDF and Excel exports',
        'Project history',
        'Client sharing',
        'Standard support'
      ]
    },
    {
      id: 'business',
      tierNumber: '03',
      name: 'Professional Plus',
      badge: null,
      description: 'Align plant engineers and execute shared continuous improvement roadmaps.',
      monthlyPrice: 19999,
      annualPriceMonthly: 17999, // ~10% discount (₹215,988/yr)
      pricing: {
        INR: { monthly: 19999, annualMonthly: 17999, annualTotal: 215988 },
        USD: { monthly: 249, annualMonthly: 224, annualTotal: 2688 },
      },
      isCustom: false,
      popular: false,
      ctaText: 'Get Professional Plus Plan',
      ctaVariant: 'secondary',
      trialDays: 0,
      limits: {
        users: 'Up to 5 users',
        projects: '25 active VSM projects',
        workspaces: 'Multiple project workspaces',
        aiAllowance: '500 AI credits/month',
        exports: 'Advanced reports and presentations'
      },
      features: [
        'Everything in Professional plan',
        'Up to 5 users',
        '25 active VSM projects',
        'Multiple project workspaces',
        'Complete Current State Map and Future State Map',
        'Advanced Smart Improve',
        '500 AI credits/month',
        'Team collaboration',
        'Shared improvement plans',
        'Centralized project management',
        'Role-based access',
        'Advanced reports and presentations',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      tierNumber: '04',
      name: 'Enterprise',
      badge: null,
      description: 'Orchestrate company-wide Lean transformation across all your production facilities.',
      monthlyPrice: null,
      annualPriceMonthly: null,
      pricing: {
        INR: { monthly: null, annualMonthly: null, annualTotal: null },
        USD: { monthly: null, annualMonthly: null, annualTotal: null },
      },
      isCustom: true,
      customPriceLabel: 'Custom',
      popular: false,
      ctaText: 'Contact Sales',
      ctaVariant: 'outline',
      trialDays: 0,
      limits: {
        users: 'Custom user allocation',
        projects: 'Custom project limits',
        aiAllowance: 'Custom AI credit allocation',
        exports: 'Dedicated support and SLA'
      },
      features: [
        'Everything in Professional Plus plan',
        'Custom user allocation',
        'Custom project limits',
        'Custom AI credit allocation',
        'Multiple plant management',
        'Organization-level administration',
        'Advanced access management',
        'Custom integrations',
        'Dedicated support and SLA'
      ]
    }
  ]
};

export const formatPrice = (amount, currency = 'INR') => {
  if (amount === null || amount === undefined) return 'Custom';
  if (amount === 0) return '0';
  if (currency === 'INR') {
    return amount.toLocaleString('en-IN');
  }
  return amount.toLocaleString('en-US');
};

export const getCurrencySymbol = (currency = 'INR') => {
  return currency === 'INR' ? '₹' : '$';
};
