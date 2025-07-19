import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Calculator, Building, Phone, FileText, MapPin, ChevronDown, ArrowRight, Star, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { loanTypes } from '../../data/loans';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('purchase');
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Loans', href: '/loans', icon: Building, hasDropdown: true },
    { name: 'Calculators', href: '/calculators', icon: Calculator },
    { name: 'Local Areas', href: '/local-areas', icon: MapPin },
    { name: 'About', href: '/about', icon: FileText },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  // Group loans by category for mega menu
  const loanCategories = {
    purchase: loanTypes.filter(loan => loan.category === 'purchase'),
    refinance: loanTypes.filter(loan => loan.category === 'refinance'),
    investment: loanTypes.filter(loan => loan.category === 'investment'),
    specialty: loanTypes.filter(loan => loan.category === 'specialty'),
  };

  const categoryInfo = {
    purchase: { title: 'Purchase Loans', icon: Home, color: 'green', description: 'Financing for buying your dream home' },
    refinance: { title: 'Refinance Loans', icon: ArrowRight, color: 'blue', description: 'Lower your rate or access equity' },
    investment: { title: 'Investment Loans', icon: Building, color: 'purple', description: 'Financing for rental properties' },
    specialty: { title: 'Specialty Programs', icon: Star, color: 'gold', description: 'Unique solutions for special situations' },
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown('Loans');
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleNavigation = (href: string) => {
    if (location.pathname === '/' && href.startsWith('#')) {
      scrollToSection(href);
    } else if (href.startsWith('#')) {
      // Navigate to home first, then scroll
      window.location.href = '/' + href;
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary-600 text-white p-3 z-50"
      >
        Skip to main content
      </a>
      
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className={`text-lg font-bold transition-colors ${
                    isScrolled ? 'text-navy-900' : 'text-white'
                  }`}>
                    Helen Mehrshahi
                  </div>
                  <div className={`text-xs transition-colors ${
                    isScrolled ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    Mortgage Solutions
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block" role="navigation" aria-label="Main navigation" ref={dropdownRef}>
              <ul className="flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <li key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <div 
                        className="relative"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <button
                          className={`flex items-center text-sm font-medium transition-colors duration-200 ${
                            isScrolled
                              ? 'text-gray-700 hover:text-primary-600'
                              : 'text-white hover:text-gold-400'
                          }`}
                          aria-expanded={activeDropdown === item.name}
                          aria-haspopup="true"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Redesigned Mega Menu */}
                        {activeDropdown === item.name && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-down">
                            <div className="flex h-[500px]">
                              {/* Left Column - Category Tabs */}
                              <div className="w-1/3 bg-gray-50 border-r border-gray-200">
                                <div className="p-6">
                                  <h3 className="text-lg font-bold text-navy-900 mb-6">Loan Categories</h3>
                                  <div className="space-y-2">
                                    {Object.entries(categoryInfo).map(([key, category]) => {
                                      const IconComponent = category.icon;
                                      const isActive = activeTab === key;
                                      
                                      return (
                                        <button
                                          key={key}
                                          onMouseEnter={() => setActiveTab(key)}
                                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                                            isActive 
                                              ? `bg-${category.color}-100 border-${category.color}-200 border` 
                                              : 'hover:bg-gray-100'
                                          }`}
                                        >
                                          <div className="flex items-start">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                                              isActive 
                                                ? `bg-${category.color}-500` 
                                                : 'bg-gray-300'
                                            }`}>
                                              <IconComponent className={`w-5 h-5 ${
                                                isActive ? 'text-white' : 'text-gray-600'
                                              }`} />
                                            </div>
                                            <div>
                                              <div className={`font-semibold ${
                                                isActive 
                                                  ? `text-${category.color}-900` 
                                                  : 'text-gray-700'
                                              }`}>
                                                {category.title}
                                              </div>
                                              <div className="text-xs text-gray-500 mt-1">
                                                {category.description}
                                              </div>
                                            </div>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Right Column - Dynamic Content */}
                              <div className="w-2/3 p-6">
                                <div className="h-full overflow-y-auto">
                                  <h4 className="text-lg font-bold text-navy-900 mb-4">
                                    {categoryInfo[activeTab as keyof typeof categoryInfo].title}
                                  </h4>
                                  
                                  <div className="grid grid-cols-2 gap-3">
                                    {loanCategories[activeTab as keyof typeof loanCategories].map((loan) => {
                                      const categoryColor = categoryInfo[activeTab as keyof typeof categoryInfo].color;
                                      
                                      return (
                                        <Link
                                          key={loan.id}
                                          to={`/loan-services/${loan.slug}`}
                                          className={`block p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                                            categoryColor === 'green' ? 'bg-green-50 border-green-200 hover:bg-green-100' :
                                            categoryColor === 'blue' ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' :
                                            categoryColor === 'purple' ? 'bg-purple-50 border-purple-200 hover:bg-purple-100' :
                                            'bg-gold-50 border-gold-200 hover:bg-gold-100'
                                          }`}
                                          onClick={() => setActiveDropdown(null)}
                                        >
                                          <div className={`text-sm font-medium mb-1 ${
                                            categoryColor === 'green' ? 'text-green-900' :
                                            categoryColor === 'blue' ? 'text-blue-900' :
                                            categoryColor === 'purple' ? 'text-purple-900' :
                                            'text-gold-900'
                                          }`}>
                                            {loan.title}
                                          </div>
                                          <div className="text-xs text-gray-600 line-clamp-2">
                                            {loan.subtitle}
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>

                                  {/* Featured Actions at Bottom */}
                                  <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-3">
                                      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-3 text-center">
                                        <Shield className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                                        <div className="text-sm font-semibold text-navy-900 mb-1">Pre-Approval</div>
                                        <div className="text-xs text-gray-600 mb-2">Get approved in 24 hours</div>
                                        <Button size="sm" className="w-full text-xs">Get Started</Button>
                                      </div>
                                      <div className="bg-gradient-to-r from-gold-50 to-gold-100 rounded-lg p-3 text-center">
                                        <Calculator className="w-6 h-6 text-gold-600 mx-auto mb-2" />
                                        <div className="text-sm font-semibold text-navy-900 mb-1">Calculators</div>
                                        <div className="text-xs text-gray-600 mb-2">Estimate payments</div>
                                        <Link to="/calculators">
                                          <Button size="sm" variant="outline" className="w-full text-xs">Calculate</Button>
                                        </Link>
                                      </div>
                                      <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg p-3 text-center">
                                        <Phone className="w-6 h-6 text-secondary-600 mx-auto mb-2" />
                                        <div className="text-sm font-semibold text-navy-900 mb-1">Expert Help</div>
                                        <div className="text-xs text-gray-600 mb-2">Speak with Helen</div>
                                        <Button size="sm" variant="outline" className="w-full text-xs">Call Now</Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => item.href.startsWith('#') ? handleNavigation(item.href) : undefined}
                        className={`text-sm font-medium transition-colors duration-200 ${
                          isScrolled
                            ? 'text-gray-700 hover:text-primary-600'
                            : 'text-white hover:text-gold-400'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button size="md" className="shadow-lg">
                Get Pre-Approved
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden bg-white shadow-lg border-t border-gray-200 max-h-screen overflow-y-auto"
          >
            <nav className="px-4 py-6 space-y-4" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 transition-colors py-2"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="mt-2 ml-8 space-y-3">
                          {Object.entries(loanCategories).map(([categoryKey, loans]) => {
                            const category = categoryInfo[categoryKey as keyof typeof categoryInfo];
                            return (
                              <div key={categoryKey}>
                                <h4 className="font-medium text-navy-900 mb-2">{category.title}</h4>
                                <div className="space-y-1 ml-4">
                                  {loans.slice(0, 4).map((loan) => (
                                    <Link
                                      key={loan.id}
                                      to={`/loan-services/${loan.slug}`}
                                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors py-1"
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      {loan.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          <Link
                            to="/loans"
                            className="block text-primary-600 hover:text-primary-700 font-medium text-sm mt-3"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            View All Loans →
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => {
                        if (item.href.startsWith('#')) {
                          handleNavigation(item.href);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                      className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors py-2"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Button fullWidth size="md">
                  Get Pre-Approved
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;