import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Shield, Clock, Award } from 'lucide-react';
import { Button } from '../ui/Button';

const Hero: React.FC = () => {
  const [currentRate, setCurrentRate] = useState('6.875');
  const [fadeClass, setFadeClass] = useState('');

  // Simulate live rate updates
  useEffect(() => {
    const rates = ['6.875', '6.750', '6.625', '6.500', '6.750'];
    let index = 0;

    const interval = setInterval(() => {
      setFadeClass('opacity-50');
      setTimeout(() => {
        index = (index + 1) % rates.length;
        setCurrentRate(rates[index]);
        setFadeClass('');
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Star, label: 'Client Satisfaction', value: '99%' },
    { icon: Clock, label: 'Avg. Approval Time', value: '24hrs' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Shield, label: 'Loans Closed', value: '$2B+' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 overflow-hidden"
      role="main"
      aria-label="Hero section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              NMLS Licensed Mortgage Professional
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Dream Home
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                Starts Here
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl">
              Expert mortgage solutions in the San Fernando Valley. Get pre-approved in minutes with 
              competitive rates and personalized service from Helen Mehrshahi.
            </p>

            {/* Current Rate Display */}
            <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-center">
                <p className="text-sm text-gray-300 mb-2">Today's Rate</p>
                <div className={`text-4xl font-bold text-gold-400 transition-opacity duration-300 ${fadeClass}`}>
                  {currentRate}%
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Rate updated every 60 minutes • APR varies by loan type
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white shadow-xl">
                Start Your Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-navy-900 transition-all duration-300"
              >
                Calculate Payment
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                    <stat.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Rate Widget */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Get Your Rate</h2>
              <p className="text-gray-600">See your personalized rate in 60 seconds</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Purchase</option>
                    <option>Refinance</option>
                    <option>Cash-out Refi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Single Family</option>
                    <option>Condo</option>
                    <option>Townhome</option>
                    <option>Multi-family</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <input
                  type="text"
                  placeholder="$750,000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <input
                  type="text"
                  placeholder="$150,000 (20%)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Score
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>740+</option>
                  <option>680-739</option>
                  <option>620-679</option>
                  <option>Below 620</option>
                </select>
              </div>

              <Button fullWidth size="lg" className="bg-primary-600 hover:bg-primary-700">
                Get My Rate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By clicking "Get My Rate", you agree to our Terms of Service and Privacy Policy.
                No commitment required.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;