import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Star, Phone, Calculator, FileText, Users, Shield, Clock, Award, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import MultiStepForm from '../forms/MultiStepForm';
import { LoanType, FormData } from '../../types';

interface LoanServicePageProps {
  loan: LoanType;
}

const LoanServicePage: React.FC<LoanServicePageProps> = ({ loan }) => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set page title and meta tags
  useEffect(() => {
    document.title = `${loan.title} | Helen Mehrshahi Mortgage Solutions`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${loan.description} Expert ${loan.title.toLowerCase()} services in San Fernando Valley with competitive rates and personalized service.`);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${loan.title} | Helen Mehrshahi Mortgage Solutions`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', loan.description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', loan.image);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Helen Mehrshahi Mortgage Solutions | Expert Home Loans in San Fernando Valley';
    };
  }, [loan]);

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setFormSubmitted(true);
    setShowForm(false);
    // Here you would typically send the data to your backend
  };

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('loan-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const benefits = [
    'Expert guidance throughout the process',
    'Competitive rates and terms',
    'Fast approval and closing',
    'Personalized service',
    'Local market expertise',
    'No hidden fees or surprises'
  ];

  const process = [
    { step: 1, title: 'Application', description: 'Complete our simple online application' },
    { step: 2, title: 'Documentation', description: 'Provide required documents' },
    { step: 3, title: 'Processing', description: 'We review and process your loan' },
    { step: 4, title: 'Approval', description: 'Get approved and receive your loan terms' },
    { step: 5, title: 'Closing', description: 'Sign documents and get your keys' }
  ];

  const stats = [
    { icon: Users, label: 'Clients Served', value: '2,500+' },
    { icon: Clock, label: 'Avg. Close Time', value: '21 Days' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Shield, label: 'Satisfaction Rate', value: '99.2%' }
  ];

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in our {loan.title}. Helen will review your application and contact you within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button>
                  Return to Home
                </Button>
              </Link>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Now: (818) 555-0123
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <Button variant="outline" className="mb-6 border-white text-white hover:bg-white hover:text-navy-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  loan.category === 'purchase' ? 'bg-green-100 text-green-800' :
                  loan.category === 'refinance' ? 'bg-blue-100 text-blue-800' :
                  loan.category === 'investment' ? 'bg-purple-100 text-purple-800' :
                  'bg-gold-100 text-gold-800'
                }`}>
                  {loan.category.charAt(0).toUpperCase() + loan.category.slice(1)}
                </span>
                {loan.maxAmount && (
                  <span className="ml-3 px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                    Up to {loan.maxAmount}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{loan.title}</h1>
              <p className="text-xl text-gold-400 mb-6">{loan.subtitle}</p>
              <p className="text-lg text-gray-300 mb-8">{loan.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={scrollToForm} className="bg-gold-600 hover:bg-gold-700">
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Helen
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key Features */}
              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Key Features & Benefits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">Loan Features</h3>
                    <ul className="space-y-3">
                      {loan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">Why Choose Helen</h3>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Eligibility Requirements */}
              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Eligibility Requirements</h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {loan.eligibility.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <Shield className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Process */}
              <section>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">How It Works</h2>
                <div className="space-y-6">
                  {process.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Apply Card */}
              <Card className="sticky top-8">
                <CardHeader>
                  <h3 className="text-xl font-bold text-navy-900">Get Started Today</h3>
                  <p className="text-gray-600">Apply now and get pre-approved in minutes</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button fullWidth size="lg" onClick={scrollToForm}>
                      Start Application
                    </Button>
                    <Button fullWidth variant="outline" size="lg">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Payment
                    </Button>
                    <Button fullWidth variant="outline" size="lg">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Guide
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Questions? Call Helen directly</p>
                      <a
                        href="tel:8185550123"
                        className="text-lg font-semibold text-primary-600 hover:text-primary-700"
                      >
                        (818) 555-0123
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rate Info */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-navy-900">Current Rates</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">6.875%</div>
                    <p className="text-sm text-gray-600 mb-4">30-Year Fixed Rate*</p>
                    <p className="text-xs text-gray-500">
                      *Rate shown is for qualified borrowers. Your actual rate may vary based on credit score, loan amount, and other factors.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div id="loan-form" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to Apply?</h2>
            <p className="text-lg text-gray-600">
              Complete our secure application and get pre-approved for your {loan.title}
            </p>
          </div>
          
          {showForm ? (
            <MultiStepForm
              loanType={loan.slug}
              onSubmit={handleFormSubmit}
              initialData={{ loanType: loan.slug }}
            />
          ) : (
            <div className="text-center">
              <Button size="lg" onClick={() => setShowForm(true)} className="bg-primary-600 hover:bg-primary-700">
                Start Your Application
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanServicePage;