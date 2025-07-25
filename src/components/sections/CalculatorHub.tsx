import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calculator as CalcIcon, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

const CalculatorHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('purchase');

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || CalcIcon;
  };

  const categoryColors: Record<string, string> = {
  purchase: 'bg-emerald-500',
  refinance: 'bg-blue-500',
  investment: 'bg-purple-500',
};

  const categories = [
    { id: 'purchase', label: 'Purchase', color: 'emerald', description: 'Home buying calculators' },
    { id: 'refinance', label: 'Refinance', color: 'blue', description: 'Refinancing tools' },
    { id: 'investment', label: 'Investment', color: 'purple', description: 'Investment property tools' },
  ];

  const featuredCalculator = calculators.find(calc => calc.id === '1'); // Mortgage Payment Calculator

  return (
    <section id="calculators" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" aria-label="Mortgage calculators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
            <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Free Financial Tools
            </span>
          </div>
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            Mortgage Calculator Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with our comprehensive suite of mortgage calculators. 
            Get instant results for payments, affordability, refinancing, and more.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-${category.color}-500 text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{category.label}</div>
                  <div className="text-xs opacity-80">{category.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Featured Calculator - Large Card */}
          {featuredCalculator && (
            <div className="lg:col-span-8">
              <Card className="h-full bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                        <CalcIcon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-blue-200" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredCalculator.title}</h3>
                  <p className="text-blue-100 text-lg">{featuredCalculator.description}</p>
                </CardHeader>
                <CardContent>
                  {/* Quick Calculator Preview */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold mb-4">Quick Calculate</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-blue-100">
                          Loan Amount
                        </label>
                        <input
                          type="text"
                          placeholder="$600,000"
                          className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-blue-100">
                          Interest Rate
                        </label>
                        <input
                          type="text"
                          placeholder="6.875%"
                          className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-blue-100">
                          Loan Term
                        </label>
                        <select className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent">
                          <option className="text-gray-900">30 years</option>
                          <option className="text-gray-900">15 years</option>
                          <option className="text-gray-900">20 years</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/20">
                      <span className="text-blue-100">Monthly Payment:</span>
                      <span className="text-2xl font-bold">$3,956</span>
                    </div>
                  </div>
                  <Link to={`/calculators/${featuredCalculator.slug}`}>
                    <Button size="lg" className="w-full bg-white !text-blue-700 border border-blue-700 hover:bg-blue-700 hover:!text-white transition-all duration-300 font-semibold flex items-center justify-center">
                      Use Full Calculator
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Category Calculators - Right Column */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {calculators
                .filter(calc => calc.category === activeCategory)
                .slice(1, 4) // Skip the featured calculator
                .map((calculator, index) => {
                  const IconComponent = getIcon(calculator.icon);
                  const category = categories.find(cat => cat.id === activeCategory);
                  
                  return (
                    <Card 
                      key={calculator.id} 
                      className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                    >
                      <Link to={`/calculators/${calculator.slug}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${category?.color}-100 group-hover:bg-${category?.color}-200 transition-colors`}>
                              <IconComponent className={`w-6 h-6 text-${category?.color}-600`} />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          </div>
                          <h4 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {calculator.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {calculator.description}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>

        {/* All Calculators Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            All {categories.find(cat => cat.id === activeCategory)?.label} Calculators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators
              .filter(calc => calc.category === activeCategory)
              .map((calculator, index) => {
                const IconComponent = getIcon(calculator.icon);
                const category = categories.find(cat => cat.id === activeCategory);
                
                return (
                  <Card 
                    key={calculator.id} 
                    className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link to={`/calculators/${calculator.slug}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${category?.color}-100 group-hover:bg-${category?.color}-200 transition-colors`}>
                            <IconComponent className={`w-7 h-7 text-${category?.color}-600`} />
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${category?.color}-100 text-${category?.color}-800`}>
                            {category?.label}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {calculator.title}
                        </h4>
                        <p className="text-sm text-gray-600">{calculator.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button fullWidth variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200">
                          Use Calculator
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-blue-900 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right Calculator?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our mortgage experts can guide you through the calculations and help you understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="!bg-white !text-blue-900 hover:!bg-gray-200 shadow-sm px-6 py-3 rounded-md">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="!bg-transparent !text-white !border-white hover:!bg-white/10 hover:!text-white hover:!border-white transition duration-200">
              Call (818) 555-0123
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorHub;