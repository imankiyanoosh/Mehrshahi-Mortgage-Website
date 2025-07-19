import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import LoanServicePage from './components/pages/LoanServicePage';
import LoansPage from './components/pages/LoansPage';
import CalculatorsPage from './components/pages/CalculatorsPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import LocalAreasPage from './components/pages/LocalAreasPage';
import CityPage from './components/pages/CityPage';
import { loanTypes } from './data/loans';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/calculators" element={<CalculatorsPage />} />
        <Route path="/local-areas" element={<LocalAreasPage />} />
        <Route path="/local-areas/:citySlug" element={<CityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {loanTypes.map((loan) => (
          <Route
            key={loan.slug}
            path={`/loan-services/${loan.slug}`}
            element={<LoanServicePage loan={loan} />}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;