import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Star, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { loanTypes } from '../../data/loans';
import MultiStepForm from '../forms/MultiStepForm';
import { FormData } from '../../types';

const LoansGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showQuickForm, setShowQuickForm] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'All Loans' },
    { id: 'purchase', label: 'Purchase' },
    { id: 'refinance', label: 'Refinance' },
    { id: 'investment', label: 'Investment' },
    { id: 'specialty', label: 'Specialty' },
  ];

  const filteredLoans = loanTypes.filter((loan) => {
    const matchesSearch = loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || loan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyNow = (loanSlug: string) => {
    setShowQuickForm(loanSlug);
    setTimeout(() => {
      document.getElementById('quick-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = (data: FormData) => {
    console.log('Quick form submitted:', data);
    setFormSubmitted(true);
    setShowQuickForm(null);
  };

  if (formSubmitted) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Application Submitted!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest. Helen will review your application and contact you within 2 hours.
          </p>
          <Button onClick={() => setFormSubmitted(false)}>
            Return to Loans
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="loans" className="py-20 bg-gray-50" aria-label="Available loan types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            Comprehensive Loan Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From conventional loans to specialized financing, we offer 20+ loan products 
            to meet your unique homeownership and investment goals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search loan types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-label="Search loan types"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLoans.map((loan) => (
            <Card key={loan.id} hover className="h-full flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    loan.category === 'purchase' ? 'bg-green-100 text-green-800' :
                    loan.category === 'refinance' ? 'bg-blue-100 text-blue-800' :
                    loan.category === 'investment' ? 'bg-purple-100 text-purple-800' :
                    'bg-gold-100 text-gold-800'
                  }`}>
                    {loan.category.charAt(0).toUpperCase() + loan.category.slice(1)}
                  </span>
                </div>
                {loan.maxAmount && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    Up to {loan.maxAmount}
                  </div>
                )}
              </div>

              <CardHeader>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{loan.title}</h3>
                <p className="text-sm text-primary-600 font-medium mb-2">{loan.subtitle}</p>
                <p className="text-sm text-gray-600 line-clamp-3">{loan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between">
                {/* Key Features */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {loan.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <Star className="w-3 h-3 text-gold-500 mr-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link to={`/loan-services/${loan.slug}`}>
                    <Button fullWidth variant="outline" size="sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <Button fullWidth size="sm" onClick={() => handleApplyNow(loan.slug)}>
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filter options.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Not Sure Which Loan is Right for You?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let our experts analyze your situation and recommend the best loan program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-white/10 hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => window.open('tel:8185550123', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                onClick={() => setShowQuickForm('general')}
              >
                <Star className="w-5 h-5 mr-2" />
                Get Pre-Qualified
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Application Form */}
      {showQuickForm && (
        <div id="quick-form" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-navy-900 mb-4">Quick Application</h3>
              <p className="text-lg text-gray-600">
                Get started with your {loanTypes.find(l => l.slug === showQuickForm)?.title} application
              </p>
            </div>
            
            <MultiStepForm
              loanType={showQuickForm}
              onSubmit={handleFormSubmit}
              onClose={() => setShowQuickForm(null)}
              initialData={{ loanType: showQuickForm }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LoansGrid;