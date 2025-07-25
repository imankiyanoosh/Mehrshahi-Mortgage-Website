import { Calculator } from '../types';

export const calculators: Calculator[] = [
  // PURCHASE CALCULATORS
  {
    id: '1',
    title: 'Conventional Loan Calculator',
    description: 'Calculate payments for conventional mortgages with flexible terms and competitive rates.',
    category: 'purchase',
    slug: 'conventional-loan',
    icon: 'Calculator'
  },
  {
    id: '2',
    title: 'FHA Loan Calculator',
    description: 'Estimate payments for FHA loans with low down payment options.',
    category: 'purchase',
    slug: 'fha-loan',
    icon: 'Home'
  },
  {
    id: '3',
    title: 'VA Loan Calculator',
    description: 'Calculate VA loan payments with no down payment for eligible veterans.',
    category: 'purchase',
    slug: 'va-loan',
    icon: 'Shield'
  },
  {
    id: '4',
    title: 'Construction Loan Calculator',
    description: 'Estimate costs for construction-to-permanent financing.',
    category: 'purchase',
    slug: 'construction-loan',
    icon: 'Hammer'
  },
  {
    id: '5',
    title: 'Affordability Calculator',
    description: 'Determine how much house you can afford based on income and expenses.',
    category: 'purchase',
    slug: 'affordability',
    icon: 'DollarSign'
  },
  {
    id: '6',
    title: 'Loan Pre-Approval Estimator',
    description: 'Get an estimate of your pre-approval amount and terms.',
    category: 'purchase',
    slug: 'pre-approval',
    icon: 'CheckCircle'
  },
  {
    id: '7',
    title: 'Down Payment Assistance Calculator',
    description: 'Calculate available down payment assistance programs.',
    category: 'purchase',
    slug: 'down-payment-assistance',
    icon: 'HandHeart'
  },
  {
    id: '8',
    title: 'Mortgage Insurance Calculator',
    description: 'Calculate PMI and MIP costs for your loan.',
    category: 'purchase',
    slug: 'mortgage-insurance',
    icon: 'Shield'
  },
  {
    id: '9',
    title: 'Fixed vs ARM Calculator',
    description: 'Compare fixed-rate versus adjustable-rate mortgage costs.',
    category: 'purchase',
    slug: 'fixed-vs-arm',
    icon: 'ArrowUpDown'
  },

  // REFINANCE CALCULATORS
  {
    id: '10',
    title: 'Refinance Loan Calculator',
    description: 'Calculate potential savings from refinancing your mortgage.',
    category: 'refinance',
    slug: 'refinance-loan',
    icon: 'RefreshCw'
  },
  {
    id: '11',
    title: 'Cash-Out Refinance Calculator',
    description: 'Estimate cash available from your home equity.',
    category: 'refinance',
    slug: 'cash-out-refinance',
    icon: 'Banknote'
  },
  {
    id: '12',
    title: 'Break-Even Refinance Calculator',
    description: 'Calculate how long to break even on refinance costs.',
    category: 'refinance',
    slug: 'break-even-refinance',
    icon: 'TrendingUp'
  },
  {
    id: '13',
    title: 'Prepayment Savings Calculator',
    description: 'See how extra payments can save money and time.',
    category: 'refinance',
    slug: 'prepayment-savings',
    icon: 'PiggyBank'
  },
  {
    id: '14',
    title: 'Loan Amortization Schedule',
    description: 'Generate detailed payment schedules for your loan.',
    category: 'refinance',
    slug: 'amortization-schedule',
    icon: 'Calendar'
  },
  {
    id: '15',
    title: 'Biweekly Payment Calculator',
    description: 'Calculate savings from biweekly mortgage payments.',
    category: 'refinance',
    slug: 'biweekly-payment',
    icon: 'Clock'
  },

  // INVESTMENT CALCULATORS
  {
    id: '16',
    title: 'DSCR Investment Calculator',
    description: 'Calculate debt service coverage ratio for rental properties.',
    category: 'investment',
    slug: 'dscr-investment',
    icon: 'PieChart'
  },
  {
    id: '17',
    title: 'Fix & Flip Calculator',
    description: 'Estimate profits and financing for fix-and-flip projects.',
    category: 'investment',
    slug: 'fix-flip',
    icon: 'Wrench'
  },
  {
    id: '18',
    title: 'BRRRR Strategy Calculator',
    description: 'Calculate returns for Buy, Rehab, Rent, Refinance, Repeat strategy.',
    category: 'investment',
    slug: 'brrrr-strategy',
    icon: 'Repeat'
  },
  {
    id: '19',
    title: 'Rental Property ROI Calculator',
    description: 'Calculate return on investment for rental properties.',
    category: 'investment',
    slug: 'rental-roi',
    icon: 'TrendingUp'
  },
  {
    id: '20',
    title: 'Reverse Mortgage Calculator',
    description: 'Calculate available funds from reverse mortgage (62+).',
    category: 'investment',
    slug: 'reverse-mortgage',
    icon: 'ArrowLeft'
  },

  // ALTERNATIVE DOCUMENTATION CALCULATORS
  {
    id: '21',
    title: 'No W2/Tax Return Calculator',
    description: 'Calculate loan options without traditional income documentation.',
    category: 'alt-doc',
    slug: 'no-w2-tax-return',
    icon: 'FileX'
  },
  {
    id: '22',
    title: 'VOE/Stated Income Calculator',
    description: 'Calculate loans based on employer verification of employment.',
    category: 'alt-doc',
    slug: 'voe-stated-income',
    icon: 'FileCheck'
  },
  {
    id: '23',
    title: 'Bank Statement Calculator',
    description: 'Qualify using 12-24 months of bank statements.',
    category: 'alt-doc',
    slug: 'bank-statement',
    icon: 'CreditCard'
  },
  {
    id: '24',
    title: '1-Year Tax Return Calculator',
    description: 'Calculate loan options with just one year of tax returns.',
    category: 'alt-doc',
    slug: 'one-year-tax',
    icon: 'FileText'
  },
  {
    id: '25',
    title: 'P&L Statement Calculator',
    description: 'Qualify using CPA-prepared profit and loss statements.',
    category: 'alt-doc',
    slug: 'profit-loss',
    icon: 'BarChart'
  },
  {
    id: '26',
    title: 'No Doc Community Calculator',
    description: 'Asset-based qualification with minimal documentation.',
    category: 'alt-doc',
    slug: 'no-doc-community',
    icon: 'Users'
  },

  // CREDIT & PREQUALIFICATION CALCULATORS
  {
    id: '27',
    title: 'Debt-to-Income Calculator',
    description: 'Calculate your DTI ratio for loan qualification.',
    category: 'credit',
    slug: 'debt-to-income',
    icon: 'Scale'
  },
  {
    id: '28',
    title: 'Credit Repair Timeline',
    description: 'Estimate timeline for improving your credit score.',
    category: 'credit',
    slug: 'credit-repair-timeline',
    icon: 'TrendingUp'
  },

  // COMMERCIAL CALCULATORS
  {
    id: '29',
    title: 'Commercial Real Estate Calculator',
    description: 'Calculate financing for commercial property investments.',
    category: 'commercial',
    slug: 'commercial-real-estate',
    icon: 'Building'
  },
  {
    id: '30',
    title: 'Business Loan Calculator',
    description: 'Estimate business loan payments and qualification.',
    category: 'commercial',
    slug: 'business-loan',
    icon: 'Briefcase'
  },

  // RENOVATION CALCULATORS
  {
    id: '31',
    title: 'Remodeling ROI Calculator',
    description: 'Calculate return on investment for home improvements.',
    category: 'renovation',
    slug: 'remodeling-roi',
    icon: 'Home'
  },
  {
    id: '32',
    title: 'Renovation Loan Calculator',
    description: 'Estimate 203K and HomeStyle renovation loan costs.',
    category: 'renovation',
    slug: 'renovation-loan',
    icon: 'Hammer'
  },

  // ADVANCED TOOLS
  {
    id: '33',
    title: 'Interest-Only Calculator',
    description: 'Calculate payments for interest-only loan periods.',
    category: 'advanced',
    slug: 'interest-only',
    icon: 'Percent'
  },
  {
    id: '34',
    title: 'Rate Lock Calculator',
    description: 'Determine the value of locking in your interest rate.',
    category: 'advanced',
    slug: 'rate-lock',
    icon: 'Lock'
  }
];