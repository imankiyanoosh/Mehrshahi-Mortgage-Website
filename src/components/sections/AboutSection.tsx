import React from 'react';
import { Award, Users, Clock, Shield, Star, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const AboutSection: React.FC = () => {
  const achievements = [
    { icon: Award, label: 'NMLS Licensed', value: 'Since 2009' },
    { icon: Users, label: 'Families Helped', value: '2,500+' },
    { icon: Clock, label: 'Avg. Close Time', value: '21 Days' },
    { icon: Shield, label: 'Satisfaction Rate', value: '99.2%' },
  ];

  const credentials = [
    'NMLS Licensed Mortgage Loan Originator',
    'California Department of Real Estate License',
    'Certified Mortgage Planning Specialist',
    'FHA/VA Approved Lender',
    'USDA Rural Development Specialist',
  ];

  return (
    <section id="about" className="py-20 bg-white" aria-label="About Helen Mehrshahi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-gold-500 mr-2" />
              <span className="px-3 py-1 bg-gold-100 text-gold-800 text-sm font-medium rounded-full">
                Your Trusted Mortgage Professional
              </span>
            </div>

            <h2 className="text-4xl font-bold text-navy-900 mb-6">
              Meet Helen Mehrshahi
            </h2>

            <div className="prose prose-lg text-gray-600 mb-8">
              <p>
                With over 15 years of experience in the mortgage industry, I've dedicated my career 
                to helping families in the San Fernando Valley achieve their homeownership dreams. 
                As a lifelong Valley resident, I understand the unique challenges and opportunities 
                in our local market.
              </p>
              <p>
                My commitment goes beyond just securing loans—I'm your partner in making informed 
                financial decisions. Whether you're a first-time homebuyer, looking to refinance, 
                or investing in real estate, I provide personalized guidance every step of the way.
              </p>
            </div>

            {/* Credentials */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Professional Credentials</h3>
              <ul className="space-y-2">
                {credentials.map((credential, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Shield className="w-4 h-4 text-primary-600 mr-3 flex-shrink-0" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-sm text-gray-600">(818) 555-0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-sm text-gray-600">helen@example.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-sm text-gray-600">Woodland Hills, CA</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                Download Bio
              </Button>
            </div>
          </div>

          {/* Photo and Stats */}
          <div>
            {/* Professional Photo */}
            <div className="relative mb-8">
              <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Helen Mehrshahi, Mortgage Professional"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <achievement.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-xl font-bold text-navy-900">{achievement.value}</div>
                    <div className="text-sm text-gray-600">{achievement.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-navy-900 mb-4">My Mission</h3>
            <p className="text-lg text-gray-600 mb-6">
              "To provide exceptional mortgage solutions with integrity, transparency, and personalized 
              service. Every client deserves a smooth, stress-free path to homeownership, and I'm 
              committed to making that happen."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-0.5 bg-primary-600"></div>
              <Star className="w-6 h-6 text-gold-500 mx-4" />
              <div className="w-16 h-0.5 bg-primary-600"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;