import React from 'react';
import AboutSection from '../sections/AboutSection';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'About Helen Mehrshahi | Mortgage Professional in San Fernando Valley';
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <AboutSection />
    </div>
  );
};

export default AboutPage;