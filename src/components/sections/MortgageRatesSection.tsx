import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, Lock, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface RateData {
  category: string;
  slug: string;
  icon: React.ComponentType<any>;
  color: string;
  rates: {
    '30-year': { rate: string; apr: string; trend: 'up' | 'down'; change: string };
    '15-year': { rate: string; apr: string; trend: 'up' | 'down'; change: string };
    'arm': { rate: string; apr: string; trend: 'up' | 'down'; change: string; term: string };
  };
  description: string;
  features: string[];
}

const MortgageRatesSection: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<'30-year' | '15-year' | 'arm'>('30-year');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Set current timestamp
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    setLastUpdated(timeString);
  }, []);

  const ratesData: RateData[] = [
    {
      category: 'Purchase',
      slug: 'conventional-loans',
      icon: TrendingUp,
      color: 'green',
      rates: {
        '30-year': { rate: '6.875%', apr: '7.125%', trend: 'down', change: '0.05%' },
        '15-year': { rate: '6.375%', apr: '6.625%', trend: 'down', change: '0.03%' },
        'arm': { rate: '5.750%', apr: '6.125%', trend: 'up', change: '0.02%', term: '5/1 ARM' }
      },
      description: 'Conventional loans for home purchases',
      features: ['No PMI with 20% down', 'Flexible terms', 'Competitive rates']
    },
    {
      category: 'Refinance',
      slug: 'refinance',
      icon: TrendingDown,
      color: 'blue',
      rates: {
        '30-year': { rate: '6.950%', apr: '7.200%', trend: 'down', change: '0.08%' },
        '15-year': { rate: '6.450%', apr: '6.700%', trend: 'down', change: '0.06%' },
        'arm': { rate: '5.825%', apr: '6.200%', trend: 'up', change: '0.01%', term: '7/1 ARM' }
      },
      description: 'Lower your rate or access equity',
      features: ['Cash-out options', 'Rate & term', 'No cash to close']
    },
    {
      category: 'FHA Loans',
      slug: 'fha-loans',
      icon: TrendingUp,
      color: 'purple',
      rates: {
        '30-year': { rate: '6.750%', apr: '7.450%', trend: 'down', change: '0.04%' },
        '15-year': { rate: '6.250%', apr: '6.950%', trend: 'down', change: '0.02%' },
        'arm': { rate: '5.625%', apr: '6.325%', trend: 'up', change: '0.03%', term: '5/1 ARM' }
      },
      description: 'Low down payment government loans',
      features: ['3.5% down payment', 'Flexible credit', 'First-time buyer friendly']
    },
    {
      category: 'VA Loans',
      slug: 'va-loans',
      icon: TrendingDown,
      color: 'gold',
      rates: {
        '30-year': { rate: '6.625%', apr: '6.875%', trend: 'down', change: '0.07%' },
        '15-year': { rate: '6.125%', apr: '6.375%', trend: 'down', change: '0.05%' },
        'arm': { rate: '5.500%', apr: '5.875%', trend: 'up', change: '0.01%', term: '5/1 ARM' }
      },
      description: 'No down payment for veterans',
      features: ['0% down payment', 'No PMI', 'Reusable benefit']
    },
    {
      category: 'Investment',
      slug: 'dscr-investment-loans',
      icon: TrendingUp,
      color: 'indigo',
      rates: {
        '30-year': { rate: '7.250%', apr: '7.500%', trend: 'up', change: '0.02%' },
        '15-year': { rate: '6.750%', apr: '7.000%', trend: 'down', change: '0.01%' },
        'arm': { rate: '6.125%', apr: '6.500%', trend: 'up', change: '0.04%', term: '7/1 ARM' }
      },
      description: 'DSCR and rental property loans',
      features: ['No income verification', 'Rental income qualifying', 'Fast approval']
    },
    {
      category: 'Jumbo',
      slug: 'conventional-loans',
      icon: TrendingDown,
      color: 'red',
      rates: {
        '30-year': { rate: '7.125%', apr: '7.375%', trend: 'down', change: '0.06%' },
        '15-year': { rate: '6.625%', apr: '6.875%', trend: 'down', change: '0.04%' },
        'arm': { rate: '6.000%', apr: '6.375%', trend: 'up', change: '0.02%', term: '10/1 ARM' }
      },
      description: 'High-value home financing',
      features: ['Loan amounts over $766,550', 'Competitive rates', 'Flexible terms']
    },
    {
      category: 'Bank Statement',
      slug: 'bank-statement-loans',
      icon: TrendingUp,
      color: 'teal',
      rates: {
        '30-year': { rate: '7.500%', apr: '7.750%', trend: 'up', change: '0.03%' },
        '15-year': { rate: '7.000%', apr: '7.250%', trend: 'down', change: '0.02%' },
        'arm': { rate: '6.375%', apr: '6.750%', trend: 'up', change: '0.05%', term: '5/1 ARM' }
      },
      description: 'Self-employed qualifying options',
      features: ['12-24 months statements', 'No tax returns', 'Business owners']
    },
    {
      category: 'Second Mortgage',
      slug: 'cash-out-refinance',
      icon: TrendingDown,
      color: 'orange',
      rates: {
        '30-year': { rate: '8.250%', apr: '8.500%', trend: 'down', change: '0.04%' },
        '15-year': { rate: '7.750%', apr: '8.000%', trend: 'down', change: '0.03%' },
        'arm': { rate: '7.125%', apr: '7.500%', trend: 'up', change: '0.02%', term: 'HELOC' }
      },
      description: 'HELOC and piggyback loans',
      features: ['Access home equity', 'No refinancing needed', 'Flexible draw period']
    }
  ];

  const termOptions = [
    { key: '30-year', label: '30-Year Fixed' },
    { key: '15-year', label: '15-Year Fixed' },
    { key: 'arm', label: 'ARM/Variable' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'from-green-600 to-green-700 border-green-500',
      blue: 'from-blue-600 to-blue-700 border-blue-500',
      purple: 'from-purple-600 to-purple-700 border-purple-500',
      gold: 'from-yellow-600 to-yellow-700 border-yellow-500',
      indigo: 'from-indigo-600 to-indigo-700 border-indigo-500',
      red: 'from-red-600 to-red-700 border-red-500',
      teal: 'from-teal-600 to-teal-700 border-teal-500',
      orange: 'from-orange-600 to-orange-700 border-orange-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-gold-400 mr-3" />
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full">
              Live Market Data
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Today's Mortgage Rates in San Fernando Valley
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Real-time mortgage rates updated every hour. Lock in your rate today with competitive terms 
            and personalized service from Helen Mehrshahi.
          </p>
          
          {/* Last Updated */}
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Term Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 inline-flex">
            {termOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedTerm(option.key as any)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTerm === option.key
                    ? 'bg-white text-navy-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ratesData.map((rate, index) => {
            const IconComponent = rate.icon;
            const currentRate = rate.rates[selectedTerm];
            const isARM = selectedTerm === 'arm';
            
            return (
              <Card 
                key={rate.category} 
                className={`bg-gradient-to-br ${getColorClasses(rate.color)} border-2 text-white hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center text-sm">
                      {currentRate.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-green-300 mr-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-300 mr-1" />
                      )}
                      <span className={currentRate.trend === 'down' ? 'text-green-300' : 'text-red-300'}>
                        {currentRate.change}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{rate.category}</h3>
                  <p className="text-sm opacity-90 mb-4">{rate.description}</p>
                </CardHeader>

                <CardContent>
                  {/* Rate Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <div className="text-2xl font-bold">{currentRate.rate}</div>
                        <div className="text-xs opacity-75">
                          {isARM ? currentRate.term : `${selectedTerm.replace('-', ' ')}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{currentRate.apr}</div>
                        <div className="text-xs opacity-75">APR</div>
                      </div>
                    </div>
                    
                    <div className="text-xs opacity-75 mb-4">
                      {currentRate.trend === 'down' ? 'Down' : 'Up'} {currentRate.change} from last week
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {rate.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-xs opacity-90 flex items-center">
                          <div className="w-1 h-1 bg-white rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link to={`/loan-services/${rate.slug}`}>
                      <Button 
                        fullWidth 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Lock This Rate
                      </Button>
                    </Link>
                    <Button 
                      fullWidth 
                      size="sm" 
                      variant="outline" 
                      className="border-white border text-white hover:bg-white/20 hover:text-white hover:border-white transition duration-200 font-medium flex                                  items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Talk to Expert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Lock in Your Rate?
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Rates change daily. Get pre-approved today and lock in your rate for up to 60 days 
                while you shop for your perfect home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
                  Get Pre-Approved Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule 30-Min Call
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Rate Lock Benefits</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Lock className="w-4 h-4 text-gold-400 mr-3" />
                  <span className="text-sm">Lock rate for up to 60 days</span>
                </li>
                <li className="flex items-center">
                  <TrendingDown className="w-4 h-4 text-green-400 mr-3" />
                  <span className="text-sm">Protection from rate increases</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-400 mr-3" />
                  <span className="text-sm">24-hour approval process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageRatesSection;