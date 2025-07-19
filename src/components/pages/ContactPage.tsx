import React from 'react';
import ContactSection from '../sections/ContactSection';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Contact Helen Mehrshahi | Mortgage Solutions in San Fernando Valley';
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <ContactSection />
    </div>
  );
};

export default ContactPage;