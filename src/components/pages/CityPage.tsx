import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Home, GraduationCap, DollarSign, Star, Phone, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import MultiStepForm from '../forms/MultiStepForm';
import MortgageRatesSection from '../sections/MortgageRatesSection';
import LoansGrid from '../sections/LoansGrid';
import { FormData } from '../../types';
import { cities } from '../../data/cities';

const CityPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const city = cities.find(c => c.slug === citySlug);

  useEffect(() => {
    if (city) {
      document.title = `Mortgage Loans in ${city.name}, CA | Helen Mehrshahi`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Expert mortgage loans in ${city.name}, CA. Get pre-approved with competitive rates and personalized service. ${city.description}`);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `Mortgage Loans in ${city.name}, CA | Helen Mehrshahi`);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', `Expert mortgage loans in ${city.name}, CA. ${city.description}`);
      }
    }
  }, [city]);

  if (!city) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">City Not Found</h1>
          <p className="text-gray-600 mb-6">The city you're looking for doesn't exist in our service area.</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (data: FormData) => {
    console.log('City form submitted:', data);
    setFormSubmitted(true);
    setShowForm(false);
  };

  const cityStats = {
    population: city.population,
    medianHomePrice: city.medianHomePrice,
    medianIncome: '$85,000',
    schoolRating: '8.5/10',
    crimeRate: 'Below Average',
    walkScore: '72/100'
  };

  const localHighlights = [
    {
      title: 'Excellent Schools',
      description: 'Top-rated public and private schools with high graduation rates',
      icon: GraduationCap
    },
    {
      title: 'Family-Friendly',
      description: 'Safe neighborhoods with parks, recreation centers, and community events',
      icon: Users
    },
    {
      title: 'Great Location',
      description: 'Easy access to employment centers, shopping, and entertainment',
      icon: MapPin
    },
    {
      title: 'Strong Market',
      description: 'Stable property values with consistent appreciation over time',
      icon: Home
    }
  ];

  const testimonials = [
    {
      name: 'Sarah & Mike Johnson',
      location: city.name,
      quote: 'Helen made our home buying process so smooth. Her local knowledge of the area was invaluable.',
      rating: 5
    },
    {
      name: 'David Chen',
      location: city.name,
      quote: 'Got the best rate in town and closed in just 18 days. Highly recommend Helen for anyone buying in the area.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      location: city.name,
      quote: 'As a first-time buyer, Helen guided me through every step. Now I own my dream home!',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: `How much do I need for a down payment in ${city.name}?`,
      answer: `Down payment requirements in ${city.name} vary by loan type. Conventional loans typically require 5-20%, FHA loans as little as 3.5%, and VA loans may require no down payment for eligible veterans. With median home prices around ${city.medianHomePrice}, we can help you find the right program for your budget.`
    },
    {
      question: 'Can I qualify with 1 year of tax returns?',
      answer: 'Yes! We offer several loan programs that accept just one year of tax returns, including bank statement loans and alternative documentation programs. This is especially helpful for self-employed borrowers or those with changing income situations.'
    },
    {
      question: `Are there any first-time buyer programs in ${city.name}?`,
      answer: `Yes, there are several first-time buyer programs available in ${city.name}, including FHA loans, VA loans (for eligible veterans), USDA loans (in qualifying areas), and local down payment assistance programs. We can help you explore all available options.`
    },
    {
      question: `What's the average time to close on a home in ${city.name}?`,
      answer: `The average closing time in ${city.name} is typically 21-30 days, depending on the loan type and complexity. We work efficiently to ensure your closing happens on time, with most of our clients closing within 21 days.`
    },
    {
      question: 'Do you work with investors buying rental properties?',
      answer: 'Absolutely! We specialize in investment property loans including DSCR loans, fix-and-flip financing, and portfolio loans. Our investment loan programs are designed for both new and experienced real estate investors.'
    }
  ];

  const blogPosts = [
    {
      title: `5 Steps to Buying a Home in ${city.name}`,
      excerpt: 'A comprehensive guide to the home buying process specifically for local buyers.',
      readTime: '8 min read'
    },
    {
      title: `Top Neighborhoods in ${city.name} for First-Time Buyers`,
      excerpt: 'Discover the best areas for new homeowners based on affordability and amenities.',
      readTime: '6 min read'
    },
    {
      title: `${city.name} Real Estate Market Trends 2024`,
      excerpt: 'Current market analysis and predictions for the local real estate market.',
      readTime: '10 min read'
    }
  ];

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Application Submitted!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in buying a home in {city.name}. Helen will review your application and contact you within 2 hours.
          </p>
          <Button onClick={() => setFormSubmitted(false)}>
            Continue Exploring {city.name}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-navy-900 to-primary-900 text-white py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt={`${city.name} real estate`}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 mr-2" />
              <span className="text-gold-400 font-medium">{city.name}, California</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mortgage Loans in {city.name}, CA
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get pre-approved for your dream home in {city.name} with competitive rates and expert local guidance. 
              {city.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setShowForm(true)} className="bg-gold-600 hover:bg-gold-700">
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                <Phone className="w-5 h-5 mr-2" />
                Call (818) 555-0123
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Mortgage Rates */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900"></div>
        <div className="relative z-10">
          <MortgageRatesSection />
        </div>
      </div>

      {/* Multi-Step Lead Form */}
      {showForm && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">
                Get Pre-Approved for Your {city.name} Home
              </h2>
              <p className="text-lg text-gray-600">
                Complete our secure application and get pre-approved in minutes
              </p>
            </div>
            
            <MultiStepForm
              loanType="purchase"
              onSubmit={handleFormSubmit}
              onClose={() => setShowForm(false)}
              initialData={{ zipCode: city.zipCodes[0] }}
            />
          </div>
        </section>
      )}

      {/* Why Buy in City */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Buy a Home in {city.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes {city.name} a great place to call home
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {Object.entries(cityStats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {localHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <highlight.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">{highlight.title}</h3>
                    <p className="text-gray-600">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loan Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Loan Programs Available in {city.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive selection of mortgage solutions
            </p>
          </div>
          
          <LoansGrid />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Explore {city.name} Neighborhoods
            </h2>
            <p className="text-lg text-gray-600">
              Discover the perfect area for your new home
            </p>
          </div>

          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center mb-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
              <p className="text-gray-600">Google Maps integration coming soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Centered on {city.name} • ZIP Codes: {city.zipCodes.join(', ')}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Want help finding a home in {city.name}? Book a free call.
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              What {city.name} Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from satisfied homeowners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-navy-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-600 mb-2">NMLS ID: [To be provided] | Licensed by California DFI</p>
            <p className="text-xs text-gray-500">Equal Housing Opportunity Lender</p>
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about buying a home in {city.name}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-navy-900 pr-4">{faq.question}</h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 30-Minute Consultation */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Schedule Your Free 30-Minute Consultation
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Get personalized advice for buying a home in {city.name}. No obligation, zero pressure.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4">What We'll Cover:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold-400 rounded-full mr-3"></div>
                <span>Pre-approval process</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold-400 rounded-full mr-3"></div>
                <span>Local market insights</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold-400 rounded-full mr-3"></div>
                <span>Loan program options</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold-400 rounded-full mr-3"></div>
                <span>Down payment strategies</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
              <Phone className="w-5 h-5 mr-2" />
              Call (818) 555-0123
            </Button>
          </div>
        </div>
      </section>

      {/* Local Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              {city.name} Home Buying Resources
            </h2>
            <p className="text-lg text-gray-600">
              Expert guides and local market insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} hover>
                <CardHeader>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Button size="sm" variant="outline">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityPage;