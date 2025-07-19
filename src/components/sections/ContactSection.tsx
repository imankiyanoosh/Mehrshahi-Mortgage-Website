import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, Send, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Phone,
      label: 'Call or Text',
      value: '(818) 555-0123',
      description: 'Available 7 days a week',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'helen@example.com',
      description: 'Response within 2 hours',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: '20969 Ventura Blvd, Woodland Hills, CA 91364',
      description: 'By appointment',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri: 8AM-7PM, Sat-Sun: 9AM-5PM',
      description: 'Emergency calls 24/7',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50" aria-label="Contact information">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            Let's Get Started
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to begin your home financing journey? I'm here to help with personalized 
            service and expert guidance every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 mb-1">{info.label}</h3>
                        <p className="text-gray-900 mb-1">{info.value}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-4">
              <Button fullWidth size="lg" className="bg-primary-600 hover:bg-primary-700">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule 30-Min Call
              </Button>
              <Button fullWidth size="lg" variant="outline">
                <MessageCircle className="w-5 h-5 mr-2" />
                Text Me Now
              </Button>
            </div>

            {/* Emergency Contact */}
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">Emergency Rate Lock</h4>
              <p className="text-sm text-red-700 mb-3">
                Market moving fast? Call immediately to lock your rate.
              </p>
              <a
                href="tel:8185550123"
                className="text-red-600 font-semibold hover:text-red-700"
              >
                (818) 555-0123
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Send a Message</h3>
                <p className="text-gray-600">
                  Fill out the form below and I'll get back to you within 2 hours during business hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="(818) 555-0123"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select a topic</option>
                        <option value="purchase">Home Purchase</option>
                        <option value="refinance">Refinancing</option>
                        <option value="preapproval">Pre-approval</option>
                        <option value="rates">Current Rates</option>
                        <option value="consultation">Free Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Tell me about your home financing needs..."
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="mt-1 mr-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I consent to being contacted by Helen Mehrshahi Mortgage Solutions regarding my inquiry. 
                      I understand that consent is not required as a condition of purchasing any product or service.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-0">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map Coming Soon</p>
                  <p className="text-sm text-gray-500">20969 Ventura Blvd, Woodland Hills, CA 91364</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;