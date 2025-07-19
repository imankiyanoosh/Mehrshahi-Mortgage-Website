import { LoanType } from '../types';

export const loanTypes: LoanType[] = [
  {
    id: '1',
    title: 'Conventional Loans',
    subtitle: 'Flexible Financing Solutions',
    description: 'Access flexible financing with a conventional loan, offering competitive rates and terms for a variety of home purchasing or refinancing needs.',
    maxAmount: '$100,000,000',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'conventional-loans',
    category: 'purchase',
    features: [
      'Competitive interest rates',
      'Flexible down payment options',
      'No mortgage insurance with 20% down',
      'Various term lengths available'
    ],
    eligibility: [
      'Good credit score (620+)',
      'Stable employment history',
      'Debt-to-income ratio below 43%',
      'Adequate down payment'
    ]
  },
  {
    id: '2',
    title: 'FHA Loans',
    subtitle: 'First-Time Buyer Friendly',
    description: 'An FHA loan is a mortgage insured by the Federal Housing Administration, offering lower down payments and more flexible credit requirements.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'fha-loans',
    category: 'purchase',
    features: [
      'Low down payment (3.5%)',
      'Flexible credit requirements',
      'Government-backed security',
      'Assumable loans'
    ],
    eligibility: [
      'Credit score as low as 580',
      'Down payment as low as 3.5%',
      'Primary residence only',
      'Mortgage insurance required'
    ]
  },
  {
    id: '3',
    title: 'No W2 / No Tax Return',
    subtitle: 'Alternative Documentation',
    description: 'A "No Tax Return, No W2" loan lets borrowers qualify without traditional income proof like tax returns or W2s.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'no-w2-no-tax-return',
    category: 'specialty',
    features: [
      'No tax returns required',
      'No W2 forms needed',
      'Bank statement verification',
      'Fast approval process'
    ],
    eligibility: [
      'Self-employed borrowers',
      'Business owners',
      'High-net-worth individuals',
      'Strong credit profile'
    ]
  },
  {
    id: '4',
    title: 'VOE / Stated Income',
    subtitle: 'Employment Verification',
    description: 'A VOE Stated Income loan verifies income through an employer\'s statement rather than tax returns or pay stubs.',
    image: 'https://images.pexels.com/photos/7821689/pexels-photo-7821689.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'voe-stated-income',
    category: 'specialty',
    features: [
      'Employer verification only',
      'No tax documentation',
      'Streamlined process',
      'Competitive rates'
    ],
    eligibility: [
      'Stable employment',
      'Employer cooperation',
      'Good credit score',
      'Adequate down payment'
    ]
  },
  {
    id: '5',
    title: 'VA Loans',
    subtitle: 'Veterans & Military',
    description: 'A VA loan is a mortgage backed by the U.S. Department of Veterans Affairs, offering no down payment and competitive rates.',
    image: 'https://images.pexels.com/photos/7821976/pexels-photo-7821976.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'va-loans',
    category: 'purchase',
    features: [
      'No down payment required',
      'No mortgage insurance',
      'Competitive rates',
      'Reusable benefit'
    ],
    eligibility: [
      'Military service members',
      'Veterans',
      'Eligible surviving spouses',
      'Certificate of eligibility'
    ]
  },
  {
    id: '6',
    title: 'Construction Loans',
    subtitle: 'Build Your Dream Home',
    description: 'A construction loan is a short-term mortgage for building or renovating a home, providing funds as needed.',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'construction-loans',
    category: 'specialty',
    features: [
      'Interest-only payments during construction',
      'Funds released in stages',
      'Converts to permanent loan',
      'Flexible terms'
    ],
    eligibility: [
      'Detailed construction plans',
      'Licensed contractor',
      'Strong credit and income',
      'Larger down payment'
    ]
  },
  {
    id: '7',
    title: 'Refinance',
    subtitle: 'Lower Your Rate',
    description: 'Refinancing replaces your existing mortgage with a new one, often to secure a lower interest rate or access equity.',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'refinance',
    category: 'refinance',
    features: [
      'Lower monthly payments',
      'Access home equity',
      'Eliminate mortgage insurance',
      'Change loan terms'
    ],
    eligibility: [
      'Current homeowner',
      'Adequate home equity',
      'Good credit score',
      'Stable income'
    ]
  },
  {
    id: '8',
    title: 'Bank Statement Loans',
    subtitle: '1-2 Years Statements',
    description: 'Qualify for a home loan with just 1 or 2 years of personal or business bank statements.',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'bank-statement-loans',
    category: 'specialty',
    features: [
      '12-24 months statements',
      'Personal or business accounts',
      'No tax returns needed',
      'Self-employed friendly'
    ],
    eligibility: [
      'Self-employed borrowers',
      'Consistent deposits',
      'Good credit profile',
      'Adequate cash flow'
    ]
  },
  {
    id: '9',
    title: 'Cash-Out Refinance',
    subtitle: 'Access Your Equity',
    description: 'Tap into your home\'s equity with a cash-out refinance, providing funds for major expenses or goals.',
    image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'cash-out-refinance',
    category: 'refinance',
    features: [
      'Access cash from equity',
      'Consolidate high-interest debt',
      'Fund home improvements',
      'Competitive rates'
    ],
    eligibility: [
      'Significant home equity',
      'Good credit score',
      'Stable income',
      'Low debt-to-income ratio'
    ]
  },
  {
    id: '10',
    title: 'Reverse Mortgage',
    subtitle: 'Age 62+ Eligible',
    description: 'Get a reverse mortgage starting at age 62, allowing you to access your home\'s equity while staying in your home.',
    image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'reverse-mortgage',
    category: 'specialty',
    features: [
      'No monthly payments',
      'Access home equity',
      'Stay in your home',
      'Government regulated'
    ],
    eligibility: [
      'Age 62 or older',
      'Own home outright or low mortgage',
      'Primary residence',
      'Financial assessment'
    ]
  },
  {
    id: '11',
    title: 'Fix & Flip Loans',
    subtitle: 'Investment Properties',
    description: 'Finance your property renovation with a fix-and-flip loan, designed for purchase, renovation, and resale.',
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'fix-flip-loans',
    category: 'investment',
    features: [
      'Purchase and renovation funds',
      'Fast approval process',
      'Short-term financing',
      'Interest-only options'
    ],
    eligibility: [
      'Real estate experience',
      'Strong credit profile',
      'Adequate liquid assets',
      'Detailed renovation plan'
    ]
  },
  {
    id: '12',
    title: 'No Doc Community Loans',
    subtitle: 'Simplified Approval',
    description: 'Secure a loan with no income documentation required, simplifying the approval process.',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'no-doc-loans',
    category: 'specialty',
    features: [
      'No income verification',
      'Asset-based qualification',
      'Fast processing',
      'Flexible terms'
    ],
    eligibility: [
      'High credit score',
      'Significant assets',
      'Large down payment',
      'Low loan-to-value ratio'
    ]
  },
  {
    id: '13',
    title: 'Commercial Loans',
    subtitle: 'Business Properties',
    description: 'Secure financing for your business with a commercial loan, tailored for property purchases and expansions.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'commercial-loans',
    category: 'investment',
    features: [
      'Property acquisition',
      'Business expansion',
      'Competitive rates',
      'Flexible terms'
    ],
    eligibility: [
      'Established business',
      'Strong cash flow',
      'Good credit profile',
      'Adequate down payment'
    ]
  },
  {
    id: '14',
    title: 'Government Down Payment Assistance',
    subtitle: 'Zero Down Options',
    description: 'Access government assistance for 0% down payment loans, making homeownership more affordable.',
    image: 'https://images.pexels.com/photos/7821689/pexels-photo-7821689.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'government-assistance',
    category: 'purchase',
    features: [
      '0% down payment',
      'Government backing',
      'First-time buyer programs',
      'Reduced closing costs'
    ],
    eligibility: [
      'Income limits apply',
      'First-time homebuyer',
      'Complete homebuyer education',
      'Primary residence only'
    ]
  },
  {
    id: '15',
    title: 'Business Loans',
    subtitle: 'Commercial Financing',
    description: 'A business loan provides funds to help businesses grow or cover expenses with competitive terms.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'business-loans',
    category: 'investment',
    features: [
      'Working capital',
      'Equipment financing',
      'Business expansion',
      'Competitive rates'
    ],
    eligibility: [
      'Established business',
      'Good credit history',
      'Strong cash flow',
      'Business plan'
    ]
  },
  {
    id: '16',
    title: 'Credit Repair',
    subtitle: 'Improve Your Score',
    description: 'Credit repair involves improving your credit score by addressing errors and managing debts effectively.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'credit-repair',
    category: 'specialty',
    features: [
      'Credit report analysis',
      'Dispute inaccuracies',
      'Debt management advice',
      'Score improvement strategies'
    ],
    eligibility: [
      'Credit issues present',
      'Commitment to process',
      'Regular monitoring',
      'Financial discipline'
    ]
  },
  {
    id: '17',
    title: 'CPA P&L Verification',
    subtitle: 'Professional Documentation',
    description: 'The CPA letter outlines your business profit and loss, helping lenders assess financial stability.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'cpa-verification',
    category: 'specialty',
    features: [
      'Professional verification',
      'Business income proof',
      'CPA documentation',
      'Streamlined process'
    ],
    eligibility: [
      'Business ownership',
      'CPA relationship',
      'Positive cash flow',
      'Professional documentation'
    ]
  },
  {
    id: '18',
    title: '1-Year Tax Return',
    subtitle: 'Simplified Documentation',
    description: 'Get approved for a home loan with just one year of tax returns for streamlined processing.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'one-year-tax-return',
    category: 'specialty',
    features: [
      'Single tax return',
      'Faster processing',
      'Reduced documentation',
      'Competitive rates'
    ],
    eligibility: [
      'Stable income history',
      'Good credit score',
      'Complete tax return',
      'Adequate down payment'
    ]
  },
  {
    id: '19',
    title: 'Remodeling Services',
    subtitle: 'Home Renovation',
    description: 'Transform your home with professional remodeling and renovation services tailored to your needs.',
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'remodeling-services',
    category: 'specialty',
    features: [
      'Kitchen remodeling',
      'Bathroom renovation',
      'Full home makeovers',
      'Professional design'
    ],
    eligibility: [
      'Homeownership',
      'Renovation plans',
      'Adequate financing',
      'Contractor selection'
    ]
  },
  {
    id: '20',
    title: 'DSCR Investment Loans',
    subtitle: 'Rental Property Financing',
    description: 'A DSCR loan qualifies you based on rental income rather than personal income for investment properties.',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'dscr-investment-loans',
    category: 'investment',
    features: [
      'Rental income qualification',
      'No personal income verification',
      'Investment property focus',
      'Competitive rates'
    ],
    eligibility: [
      'Investment property',
      'DSCR ratio > 1.0',
      'Rental agreements',
      'Property cash flow'
    ]
  }
];