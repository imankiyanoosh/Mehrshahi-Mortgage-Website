import React from 'react';
import Hero from '../sections/Hero';
import LoansGrid from '../sections/LoansGrid';
import MortgageRatesSection from '../sections/MortgageRatesSection';
import CalculatorHub from '../sections/CalculatorHub';
import CitiesSection from '../sections/CitiesSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';

const HomePage: React.FC = () => {
  return (
    <main id="main-content">
      <Hero />
      <LoansGrid />
      <MortgageRatesSection />
      <CalculatorHub />
      <CitiesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;