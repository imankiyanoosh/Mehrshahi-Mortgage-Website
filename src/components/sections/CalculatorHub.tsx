import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calculator as CalcIcon, Sparkles, ChevronDown, ChevronUp, Home, RefreshCw, Building, FileX, Scale, Briefcase, Hammer, Settings } from 'lucide-react';
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
      icon: Home,
      color: 'emerald', 
      description: 'First-time & returning buyers',
      subtitle: 'First-time & returning buyers'
    },
    { 
      id: 'refinance', 
      label: 'Refinance', 
      icon: RefreshCw,
      color: 'blue', 
      description: 'Lower rates & cash-out options',
      subtitle: 'Lower rates & cash-out options'
    },
    { 
      id: 'investment', 
      label: 'Investment', 
      icon: Building,
      color: 'purple', 
      description: 'Rental & flip properties',
      subtitle: 'Rental & flip properties'
    },
    { 
      id: 'alt-doc', 
      label: 'Alternative Documentation', 
      icon: FileX,
      color: 'orange', 
      description: 'Self-employed & business owners',
      subtitle: 'Self-employed & business owners'
    },
    { 
      id: 'credit', 
      label: 'Credit & Prequalification', 
      icon: Scale,
      color: 'green', 
      description: 'Assess readiness & improve profile',
      subtitle: 'Assess readiness & improve profile'
    },
    { 
      id: 'commercial', 
      label: 'Commercial', 
      icon: Briefcase,
      color: 'indigo', 
      description: 'Commercial real estate & business loans',
      subtitle: 'Commercial real estate & business loans'
    },
    { 
      id: 'renovation', 
      label: 'Renovation', 
      icon: Hammer,
      color: 'yellow', 
      description: 'Home improvements & ROI',
      subtitle: 'Home improvements & ROI'
    },
    { 
      id: 'advanced', 
      label: 'Advanced Tools', 
      icon: Settings,
      color: 'red', 
      description: 'Advanced strategies & analysis',
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

        {/* Bento Grid Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Choose Your Calculator Category</h3>
            <p className="text-lg text-gray-600">Select a category to explore specialized mortgage calculators</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group ${
                    isActive 
                      ? `ring-2 ring-${category.color}-500 shadow-lg bg-gradient-to-br from-${category.color}-50 to-${category.color}-100` 
                      : 'hover:shadow-lg bg-white'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 0.6s ease-out forwards'
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? `bg-${category.color}-500 text-white shadow-lg` 
                        : `bg-${category.color}-100 text-${category.color}-600 group-hover:bg-${category.color}-200`
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h4 className={`text-lg font-bold mb-2 transition-colors ${
                      isActive ? `text-${category.color}-900` : 'text-navy-900 group-hover:text-gray-800'
                    }`}>
                      {category.label}
                    </h4>
                    
                    <p className={`text-sm transition-colors ${
                      isActive ? `text-${category.color}-700` : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {category.description}
                    </p>
                    
                    <div className={`mt-4 text-xs font-medium transition-colors ${
                      isActive ? `text-${category.color}-600` : 'text-gray-500'
                    }`}>
                      {calculators.filter(calc => calc.category === category.id).length} calculators
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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