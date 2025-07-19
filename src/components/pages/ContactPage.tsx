import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import ContactSection from '../sections/ContactSection';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Contact Helen Mehrshahi | Mortgage Solutions in San Fernando Valley';
  }, []);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 mr-3" />
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                Let's Connect
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact Helen Mehrshahi</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your home financing journey? Get in touch for personalized service 
              and expert guidance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default ContactPage;