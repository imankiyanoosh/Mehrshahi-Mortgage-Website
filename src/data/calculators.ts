import { Calculator } from '../types';

export const calculators: Calculator[] = [
  {
    id: '1',
    title: 'Mortgage Payment Calculator',
    description: 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance.',
    category: 'purchase',
    slug: 'mortgage-payment',
    icon: 'Calculator'
  },
  {
    id: '2',
    title: 'Affordability Calculator',
    description: 'Determine how much house you can afford based on your income and expenses.',
    category: 'purchase',
    slug: 'affordability',
    icon: 'Home'
  },
  {
    id: '3',
    title: 'Refinance Breakeven',
    description: 'Calculate how long it will take to break even on your refinance costs.',
    category: 'refinance',
    slug: 'refinance-breakeven',
    icon: 'TrendingUp'
  },
  {
    id: '4',
    title: 'HELOC vs Cash-Out',
    description: 'Compare the costs and benefits of a HELOC versus cash-out refinance.',
    category: 'refinance',
    slug: 'heloc-vs-cashout',
    icon: 'Scale'
  },
  {
    id: '5',
    title: 'Rent vs Buy',
    description: 'Analyze whether it\'s better to rent or buy in your situation.',
    category: 'purchase',
    slug: 'rent-vs-buy',
    icon: 'Building'
  },
  {
    id: '6',
    title: 'Early Payoff Calculator',
    description: 'See how extra payments can save you money and time on your mortgage.',
    category: 'refinance',
    slug: 'early-payoff',
    icon: 'Clock'
  },
  {
    id: '7',
    title: 'Rate Lock Calculator',
    description: 'Determine the value of locking in your interest rate.',
    category: 'purchase',
    slug: 'rate-lock',
    icon: 'Lock'
  },
  {
    id: '8',
    title: 'DSCR Calculator',
    description: 'Calculate debt service coverage ratio for investment properties.',
    category: 'investment',
    slug: 'dscr',
    icon: 'PieChart'
  },
  {
    id: '9',
    title: 'ARM vs Fixed',
    description: 'Compare adjustable-rate mortgage versus fixed-rate mortgage costs.',
    category: 'purchase',
    slug: 'arm-vs-fixed',
    icon: 'ArrowUpDown'
  }
];