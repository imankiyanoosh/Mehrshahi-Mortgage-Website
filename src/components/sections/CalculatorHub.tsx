import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calculator as CalcIcon, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

const CalculatorHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('purchase');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || CalcIcon;
  };

  const categories = [
    { 
      id: 'purchase', 
      label: 'Purchase', 
      color: 'emerald', 
      description: 'Home buying calculators',
      subtitle: 'First-time & returning buyers'
    },
    { 
      id: 'refinance', 
      label: 'Refinance', 
      color: 'blue', 
      description: 'Refinancing tools',
      subtitle: 'Lower rates & cash-out options'
    },
    { 
      id: 'investment', 
      label: 'Investment', 
      color: 'purple', 
      description: 'Investment property tools',
      subtitle: 'Rental & flip properties'
    },
    { 
      id: 'alt-doc', 
      label: 'Alternative Documentation', 
      color: 'orange', 
      description: 'Non-traditional income verification',
      subtitle: 'Self-employed & business owners'
    },
    { 
      id: 'credit', 
      label: 'Credit & Prequalification', 
      color: 'green', 
      description: 'Credit health & qualification tools',
      subtitle: 'Assess readiness & improve profile'
    },
    { 
      id: 'commercial', 
      label: 'Commercial', 
      color: 'indigo', 
      description: 'Business & commercial financing',
      subtitle: 'Commercial real estate & business loans'
    },
    { 
      id: 'renovation', 
      label: 'Renovation', 
      color: 'yellow', 
      description: 'Remodeling & renovation financing',
      subtitle: 'Home improvements & ROI'
    },
    { 
      id: 'advanced', 
      label: 'Advanced Tools', 
      color: 'red', 
      description: 'Strategic & specialized calculators',
      subtitle: 'Advanced strategies & analysis'
    }
  ];

  const featuredCalculator = calculators.find(calc => calc.id === '1'); // Conventional Loan Calculator

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVisibleCalculators = (categoryId: string) => {
    const categoryCalculators = calculators.filter(calc => calc.category === categoryId);
    const isExpanded = expandedCategories.has(categoryId);
    const maxVisible = categoryId === activeCategory ? 9 : 6;
    
    return isExpanded ? categoryCalculators : categoryCalculators.slice(0, maxVisible);
  };

  const hasMoreCalculators = (categoryId: string) => {
    const categoryCalculators = calculators.filter(calc => calc.category === categoryId);
    const maxVisible = categoryId === activeCategory ? 9 : 6;
    return categoryCalculators.length > maxVisible;
  };

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

        {/* Category Tabs - Horizontal Scroll */}
        <div className="mb-12">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                    activeCategory === category.id
                      ? `bg-${category.color}-500 text-white border-${category.color}-500 shadow-lg transform scale-105`
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{category.label}</div>
                    <div className="text-xs opacity-80 mt-1">{category.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Calculator - Only for Purchase Tab */}
        {activeCategory === 'purchase' && featuredCalculator && (
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <CalcIcon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredCalculator.title}</h3>
                  <p className="text-blue-100 text-lg mb-6">{featuredCalculator.description}</p>
                  
                  <Link to={`/calculators/${featuredCalculator.slug}`}>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      Use Full Calculator
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Quick Preview</h4>
                  <div className="grid grid-cols-1 gap-4 mb-4">
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
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/20">
                    <span className="text-blue-100">Monthly Payment:</span>
                    <span className="text-2xl font-bold">$3,956</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Active Category Calculators - Bento Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-navy-900">
              {categories.find(cat => cat.id === activeCategory)?.label} Calculators
            </h3>
            <div className="text-sm text-gray-600">
              {calculators.filter(calc => calc.category === activeCategory).length} calculators available
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleCalculators(activeCategory).map((calculator, index) => {
              const IconComponent = getIcon(calculator.icon);
              const category = categories.find(cat => cat.id === activeCategory);
              
              return (
                <Card 
                  key={calculator.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group calculator-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/calculators/${calculator.slug}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${category?.color}-100 group-hover:bg-${category?.color}-200 transition-colors`}>
                          <IconComponent className={`w-7 h-7 text-${category?.color}-600`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
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

          {/* Load More Button */}
          {hasMoreCalculators(activeCategory) && (
            <div className="text-center mt-8">
              <Button
                onClick={() => toggleExpanded(activeCategory)}
                variant="outline"
                size="lg"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {expandedCategories.has(activeCategory) ? (
                  <>
                    Show Less
                    <ChevronUp className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Load More Calculators
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-blue-900 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right Calculator?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our mortgage experts can guide you through the calculations and help you understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Call (818) 555-0123
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorHub;