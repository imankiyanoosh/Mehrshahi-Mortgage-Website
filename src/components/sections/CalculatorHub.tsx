import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calculator as CalcIcon, Sparkles, ChevronDown, ChevronUp, Home, RefreshCw, Building, FileText, Scale, Briefcase, Hammer, Settings, Phone, Calendar, Star, DollarSign, Percent, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

const CalculatorHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('purchase');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const calculatorSectionRef = useRef<HTMLDivElement>(null);

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
      gradient: 'from-emerald-500 to-emerald-600'
    },
    { 
      id: 'refinance', 
      label: 'Refinance', 
      icon: RefreshCw,
      color: 'blue', 
      description: 'Lower rates & cash-out options',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'investment', 
      label: 'Investment', 
      icon: Building,
      color: 'purple', 
      description: 'Rental & flip properties',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'alt-doc', 
      label: 'Alternative Documentation', 
      icon: FileText,
      color: 'orange', 
      description: 'Self-employed & business owners',
      gradient: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'credit', 
      label: 'Credit & Prequalification', 
      icon: Scale,
      color: 'green', 
      description: 'Assess readiness & improve profile',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      id: 'commercial', 
      label: 'Commercial', 
      icon: Briefcase,
      color: 'indigo', 
      description: 'Commercial real estate & business loans',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    { 
      id: 'renovation', 
      label: 'Renovation', 
      icon: Hammer,
      color: 'yellow', 
      description: 'Home improvements & ROI',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    { 
      id: 'advanced', 
      label: 'Advanced Tools', 
      icon: Settings,
      color: 'red', 
      description: 'Advanced strategies & analysis',
      gradient: 'from-red-500 to-red-600'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Smooth scroll to calculator section
    setTimeout(() => {
      calculatorSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

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
    const maxVisible = 6;
    
    return isExpanded ? categoryCalculators : categoryCalculators.slice(0, maxVisible);
  };

  const hasMoreCalculators = (categoryId: string) => {
    const categoryCalculators = calculators.filter(calc => calc.category === categoryId);
    return categoryCalculators.length > 6;
  };

  const getFeaturedCalculator = () => {
    const categoryCalculators = calculators.filter(calc => calc.category === activeCategory);
    return categoryCalculators[0]; // First calculator as featured
  };

  const featuredCalculator = getFeaturedCalculator();
  const activeTab = categories.find(cat => cat.id === activeCategory);

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

        {/* Category Bento Grid */}
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
                  className={`cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group rounded-xl p-6 ${
                    isActive 
                      ? `ring-2 ring-${category.color}-500 shadow-lg bg-gradient-to-br ${category.gradient} text-white` 
                      : `hover:shadow-lg bg-white hover:bg-gradient-to-br hover:${category.gradient} hover:text-white`
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 0.6s ease-out forwards'
                  }}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : `bg-${category.color}-100 text-${category.color}-600 group-hover:bg-white/20 group-hover:text-white`
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h4 className={`text-lg font-bold mb-2 transition-colors ${
                      isActive ? 'text-white' : 'text-navy-900 group-hover:text-white'
                    }`}>
                      {category.label}
                    </h4>
                    
                    <p className={`text-sm transition-colors ${
                      isActive ? 'text-white/90' : 'text-gray-600 group-hover:text-white/90'
                    }`}>
                      {category.description}
                    </p>
                    
                    <div className={`mt-4 text-xs font-medium transition-colors ${
                      isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'
                    }`}>
                      {calculators.filter(calc => calc.category === category.id).length} calculators
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Calculator - Dynamic based on active category */}
        {featuredCalculator && (
          <div className="mb-16" ref={calculatorSectionRef}>
            <Card className={`bg-gradient-to-br ${activeTab?.gradient} border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 text-white animate-slide-up`}>
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <CalcIcon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                      Most Popular in {activeTab?.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredCalculator.title}</h3>
                  <p className="text-white/90 text-lg mb-6">{featuredCalculator.description}</p>
                  
                  <Link to={`/calculators/${featuredCalculator.slug}`}>
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 border border-white/30 text-white">
                      Use Full Calculator
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Quick Preview</h4>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">
                        Loan Amount
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="$600,000"
                          className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">
                        Interest Rate
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="6.875%"
                          className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/20">
                    <span className="text-white/90">Monthly Payment:</span>
                    <span className="text-2xl font-bold">$3,956</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Active Category Calculators - Enhanced Bento Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-navy-900">
              {activeTab?.label} Calculators
            </h3>
            <div className="text-sm text-gray-600">
              {calculators.filter(calc => calc.category === activeCategory).length} calculators available
            </div>
          </div>

          {/* Enhanced Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleCalculators(activeCategory).map((calculator, index) => {
              const IconComponent = getIcon(calculator.icon);
              const category = categories.find(cat => cat.id === activeCategory);
              
              return (
                <Card 
                  key={calculator.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group calculator-card bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white rounded-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/calculators/${calculator.slug}`}>
                    <CardHeader className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${category?.color}-100 group-hover:bg-${category?.color}-200 transition-colors shadow-sm`}>
                          <IconComponent className={`w-7 h-7 text-${category?.color}-600`} />
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {calculator.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{calculator.description}</p>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${category?.color}-100 text-${category?.color}-800`}>
                          {category?.label}
                        </span>
                        <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                          Use Calculator
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
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
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
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

        {/* Enhanced Bottom CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-blue-900 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right Calculator?</h3>
              <p className="text-lg mb-6 opacity-90">
                Our mortgage experts can guide you through the calculations and help you understand your options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (818) 555-0123
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Calculator Benefits</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-gold-400 mr-3" />
                  <span className="text-sm">Instant accurate calculations</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-3" />
                  <span className="text-sm">Compare different scenarios</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-400 mr-3" />
                  <span className="text-sm">Professional-grade tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorHub;