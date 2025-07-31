import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calculator as CalcIcon, Sparkles, ChevronDown, ChevronUp, Home, RefreshCw, Building, FileText, Scale, Briefcase, Hammer, Settings, Phone, Calendar, Star, DollarSign, Percent, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

// Calculator Component for Dynamic Calculations
interface CalculatorComponentProps {
  category: string;
}

const CalculatorComponent: React.FC<CalculatorComponentProps> = ({ category }) => {
  // State for all calculator inputs
  const [inputs, setInputs] = useState<Record<string, string>>({});
  // State for calculation results
  const [results, setResults] = useState<Record<string, string>>({});

  // Format number inputs with commas and currency symbols
  const formatNumber = (value: string, type: 'currency' | 'percent' | 'number' = 'number'): string => {
    if (!value) return '';
    
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    if (type === 'currency') {
      // Format as currency
      const number = parseFloat(numericValue);
      if (isNaN(number)) return '';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(number);
    } else if (type === 'percent') {
      // Format as percentage
      const number = parseFloat(numericValue);
      if (isNaN(number)) return '';
      return number.toFixed(2) + '%';
    } else {
      // Format as number with commas
      const number = parseFloat(numericValue);
      if (isNaN(number)) return '';
      return new Intl.NumberFormat('en-US').format(number);
    }
  };

  // Parse formatted number back to raw number for calculations
  const parseNumber = (value: string): number => {
    if (!value) return 0;
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) || 0;
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Recalculate when any input changes
    setTimeout(() => calculateResults({ ...inputs, [field]: value }), 0);
  };

  // Calculate results based on category and inputs
  const calculateResults = (currentInputs: Record<string, string>) => {
    const newResults: Record<string, string> = {};
    
    switch (category) {
      case 'purchase':
        // Property Price, Down Payment, Loan Term, Interest Rate
        const propertyPrice2 = parseNumber(currentInputs.propertyPrice || '0');
        const downPayment2 = parseNumber(currentInputs.downPayment || '0');
        const loanTerm2 = parseNumber(currentInputs.loanTerm || '30');
        const interestRate2 = parseNumber(currentInputs.interestRate || '0') / 100;
        
        const loanAmount2 = propertyPrice2 - downPayment2;
        const monthlyRate2 = interestRate2 / 12;
        const numberOfPayments2 = loanTerm2 * 12;
        
        // Monthly payment calculation (M = P[r(1+r)^n]/[(1+r)^n-1])
        let monthlyPayment2 = 0;
        if (monthlyRate2 > 0) {
          monthlyPayment2 = loanAmount2 * (monthlyRate2 * Math.pow(1 + monthlyRate2, numberOfPayments2)) / 
                          (Math.pow(1 + monthlyRate2, numberOfPayments2) - 1);
        } else {
          monthlyPayment2 = loanAmount2 / numberOfPayments2;
        }
        
        newResults.monthlyPayment = formatNumber(monthlyPayment2.toFixed(2), 'currency');
        break;
        
      case 'refinance':
        // Current Loan Balance, New Loan Term, New Interest Rate, Closing Costs (optional)
        const currentLoanBalance4 = parseNumber(currentInputs.currentLoanBalance || '0');
        const newLoanTerm4 = parseNumber(currentInputs.newLoanTerm || '30');
        const newInterestRate4 = parseNumber(currentInputs.newInterestRate || '0') / 100;
        parseNumber(currentInputs.closingCosts || '0'); // Used to prevent warning, but value is not actually needed
        
        const newMonthlyRate4 = newInterestRate4 / 12;
        const newNumberOfPayments4 = newLoanTerm4 * 12;
        
        // Monthly payment calculation
        let newMonthlyPayment4 = 0;
        if (newMonthlyRate4 > 0) {
          newMonthlyPayment4 = currentLoanBalance4 * (newMonthlyRate4 * Math.pow(1 + newMonthlyRate4, newNumberOfPayments4)) / 
                             (Math.pow(1 + newMonthlyRate4, newNumberOfPayments4) - 1);
        } else {
          newMonthlyPayment4 = currentLoanBalance4 / newNumberOfPayments4;
        }
        
        newResults.monthlyPayment = formatNumber(newMonthlyPayment4.toFixed(2), 'currency');
        // Optionally calculate savings if we had data about old loan
        break;
        
      case 'investment':
        // Property Price, Estimated Monthly Rent, Loan Term, Interest Rate, Down Payment
        const invPropertyPrice5 = parseNumber(currentInputs.propertyPrice || '0');
        const monthlyRent5 = parseNumber(currentInputs.monthlyRent || '0');
        const invLoanTerm6 = parseNumber(currentInputs.loanTerm || '30');
        const invInterestRate6 = parseNumber(currentInputs.interestRate || '0') / 100;
        const invDownPayment5 = parseNumber(currentInputs.downPayment || '0');
        
        const invLoanAmount5 = invPropertyPrice5 - invDownPayment5;
        const invMonthlyRate6 = invInterestRate6 / 12;
        const invNumberOfPayments6 = invLoanTerm6 * 12;
        
        // Monthly mortgage payment calculation
        let monthlyMortgage5 = 0;
        if (invMonthlyRate6 > 0) {
          monthlyMortgage5 = invLoanAmount5 * (invMonthlyRate6 * Math.pow(1 + invMonthlyRate6, invNumberOfPayments6)) / 
                           (Math.pow(1 + invMonthlyRate6, invNumberOfPayments6) - 1);
        } else {
          monthlyMortgage5 = invLoanAmount5 / invNumberOfPayments6;
        }
        
        // DSCR calculation (DSCR = Net Operating Income / Debt Service)
        // For simplicity, we'll use monthly rent as NOI
        const dscr5 = monthlyRent5 / monthlyMortgage5;
        
        newResults.monthlyMortgage = formatNumber(monthlyMortgage5.toFixed(2), 'currency');
        newResults.dscr = dscr5.toFixed(2);
        break;
        
      case 'alt-doc':
        // Loan Amount, Estimated Monthly Income, Loan Term, Interest Rate
        const altLoanAmount = parseNumber(currentInputs.loanAmount || '0');
        const altMonthlyIncome = parseNumber(currentInputs.monthlyIncome || '0');
        const altLoanTerm2 = parseNumber(currentInputs.loanTerm || '30');
        const altInterestRate2 = parseNumber(currentInputs.interestRate || '0') / 100;
        
        const altMonthlyRate2 = altInterestRate2 / 12;
        const altNumberOfPayments2 = altLoanTerm2 * 12;
        
        // Monthly payment calculation
        let altMonthlyPayment2 = 0;
        if (altMonthlyRate2 > 0) {
          altMonthlyPayment2 = altLoanAmount * (altMonthlyRate2 * Math.pow(1 + altMonthlyRate2, altNumberOfPayments2)) / 
                             (Math.pow(1 + altMonthlyRate2, altNumberOfPayments2) - 1);
        } else {
          altMonthlyPayment2 = altLoanAmount / altNumberOfPayments2;
        }
        
        // DTI calculation (Debt-to-Income Ratio)
        const dti2 = (altMonthlyPayment2 / altMonthlyIncome) * 100;
        
        newResults.monthlyPayment = formatNumber(altMonthlyPayment2.toFixed(2), 'currency');
        newResults.dti = formatNumber(dti2.toFixed(2), 'percent');
        break;
        
      case 'credit':
        // Monthly Income, Estimated Debt, Credit Score
        const income4 = parseNumber(currentInputs.monthlyIncome || '0');
        const debt4 = parseNumber(currentInputs.estimatedDebt || '0');
        const creditScore4 = parseNumber(currentInputs.creditScore || '700');
        
        // DTI calculation (used to prevent warning, but value is not actually needed)
        (debt4 / income4) * 100;
        
        // Estimate loan amount based on DTI and credit score
        // This is a simplified calculation for demonstration
        let maxDti4 = 43; // Maximum DTI for most loans
        if (creditScore4 >= 760) maxDti4 = 45;
        else if (creditScore4 >= 700) maxDti4 = 43;
        else if (creditScore4 >= 680) maxDti4 = 40;
        else if (creditScore4 >= 660) maxDti4 = 38;
        else if (creditScore4 >= 640) maxDti4 = 36;
        else maxDti4 = 35;
        
        // Calculate maximum loan amount based on DTI
        const maxMonthlyPayment4 = (income4 * (maxDti4 / 100)) - debt4;
        // Assuming 4% interest rate and 30-year term for estimation
        const estInterestRate4 = 0.04;
        const estMonthlyRate4 = estInterestRate4 / 12;
        const estNumberOfPayments4 = 30 * 12;
        
        let estimatedLoanAmount4 = 0;
        if (estMonthlyRate4 > 0) {
          estimatedLoanAmount4 = (maxMonthlyPayment4 * (Math.pow(1 + estMonthlyRate4, estNumberOfPayments4) - 1)) / 
                               (estMonthlyRate4 * Math.pow(1 + estMonthlyRate4, estNumberOfPayments4));
        } else {
          estimatedLoanAmount4 = maxMonthlyPayment4 * estNumberOfPayments4;
        }
        
        newResults.estimatedLoanAmount = formatNumber(estimatedLoanAmount4.toFixed(0), 'currency');
        break;
        
      case 'commercial':
        // Property Value, Down Payment, Interest Rate, Loan Term, NOI
        const propertyValue5 = parseNumber(currentInputs.propertyValue || '0');
        const commDownPayment5 = parseNumber(currentInputs.downPayment || '0');
        const commInterestRate5 = parseNumber(currentInputs.interestRate || '0') / 100;
        const commLoanTerm5 = parseNumber(currentInputs.loanTerm || '30');
        const noi5 = parseNumber(currentInputs.noi || '0');
        
        const commLoanAmount5 = propertyValue5 - commDownPayment5;
        const commMonthlyRate5 = commInterestRate5 / 12;
        const commNumberOfPayments5 = commLoanTerm5 * 12;
        
        // Monthly payment calculation
        let commMonthlyPayment5 = 0;
        if (commMonthlyRate5 > 0) {
          commMonthlyPayment5 = commLoanAmount5 * (commMonthlyRate5 * Math.pow(1 + commMonthlyRate5, commNumberOfPayments5)) / 
                              (Math.pow(1 + commMonthlyRate5, commNumberOfPayments5) - 1);
        } else {
          commMonthlyPayment5 = commLoanAmount5 / commNumberOfPayments5;
        }
        
        // DSCR calculation
        const annualNOI5 = noi5 * 12;
        const annualDebt5 = commMonthlyPayment5 * 12;
        const commDscr5 = annualNOI5 / annualDebt5;
        
        newResults.monthlyPayment = formatNumber(commMonthlyPayment5.toFixed(2), 'currency');
        newResults.dscr = commDscr5.toFixed(2);
        break;
        
      case 'renovation':
        // Renovation Budget, Estimated Property Value After Renovation, Loan Term, Interest Rate
        const renovationBudget5 = parseNumber(currentInputs.renovationBudget || '0');
        const afterValue5 = parseNumber(currentInputs.afterValue || '0');
        const renLoanTerm5 = parseNumber(currentInputs.loanTerm || '30');
        const renInterestRate5 = parseNumber(currentInputs.interestRate || '0') / 100;
        
        // For renovation loans, we'll assume the loan amount equals renovation budget
        const renLoanAmount5 = renovationBudget5;
        const renMonthlyRate5 = renInterestRate5 / 12;
        const renNumberOfPayments5 = renLoanTerm5 * 12;
        
        // Monthly payment calculation
        let renMonthlyPayment5 = 0;
        if (renMonthlyRate5 > 0) {
          renMonthlyPayment5 = renLoanAmount5 * (renMonthlyRate5 * Math.pow(1 + renMonthlyRate5, renNumberOfPayments5)) / 
                             (Math.pow(1 + renMonthlyRate5, renNumberOfPayments5) - 1);
        } else {
          renMonthlyPayment5 = renLoanAmount5 / renNumberOfPayments5;
        }
        
        // ROI calculation
        const propertyValueIncrease5 = afterValue5 - (afterValue5 - renovationBudget5); // Simplified
        const roi5 = (propertyValueIncrease5 / renovationBudget5) * 100;
        
        newResults.monthlyPayment = formatNumber(renMonthlyPayment5.toFixed(2), 'currency');
        newResults.roi = formatNumber(roi5.toFixed(2), 'percent');
        break;
        
      case 'advanced':
        // Loan Amount, Rate Type, Initial Interest Rate, Adjustment Cap, Term
        const advLoanAmount5 = parseNumber(currentInputs.loanAmount || '0');
        const initialRate5 = parseNumber(currentInputs.initialRate || '0') / 100;
        const adjustmentCap5 = parseNumber(currentInputs.adjustmentCap || '0') / 100;
        const advTerm5 = parseNumber(currentInputs.term || '30');
        
        // For adjustable rate, we'll calculate based on initial rate
        const advMonthlyRate6 = initialRate5 / 12;
        const advNumberOfPayments6 = advTerm5 * 12;
        
        // Monthly payment calculation
        let advMonthlyPayment5 = 0;
        if (advMonthlyRate6 > 0) {
          advMonthlyPayment5 = advLoanAmount5 * (advMonthlyRate6 * Math.pow(1 + advMonthlyRate6, advNumberOfPayments6)) / 
                             (Math.pow(1 + advMonthlyRate6, advNumberOfPayments6) - 1);
        } else {
          advMonthlyPayment5 = advLoanAmount5 / advNumberOfPayments6;
        }
        
        // Calculate potential payment after rate adjustment
        const adjustedRate5 = initialRate5 + adjustmentCap5;
        const adjustedMonthlyRate5 = adjustedRate5 / 12;
        
        let adjustedMonthlyPayment5 = 0;
        if (adjustedMonthlyRate5 > 0) {
          adjustedMonthlyPayment5 = advLoanAmount5 * (adjustedMonthlyRate5 * Math.pow(1 + adjustedMonthlyRate5, advNumberOfPayments6)) / 
                                  (Math.pow(1 + adjustedMonthlyRate5, advNumberOfPayments6) - 1);
        } else {
          adjustedMonthlyPayment5 = advLoanAmount5 / advNumberOfPayments6;
        }
        
        newResults.initialPayment = formatNumber(advMonthlyPayment5.toFixed(2), 'currency');
        newResults.adjustedPayment = formatNumber(adjustedMonthlyPayment5.toFixed(2), 'currency');
        break;
        
      default:
        newResults.default = 'Select a category to see calculations';
    }
    
    setResults(newResults);
  };

  // Render input fields based on category
  const renderInputFields = () => {
    switch (category) {
      case 'purchase':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Property Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.propertyPrice || ''}
                  onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                  placeholder="$600,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Down Payment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.downPayment || ''}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  placeholder="$120,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={inputs.loanTerm || '30'}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.interestRate || ''}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="6.875%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
        
      case 'refinance':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Current Loan Balance
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.currentLoanBalance || ''}
                  onChange={(e) => handleInputChange('currentLoanBalance', e.target.value)}
                  placeholder="$450,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                New Loan Term (Years)
              </label>
              <input
                type="number"
                value={inputs.newLoanTerm || '30'}
                onChange={(e) => handleInputChange('newLoanTerm', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                New Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.newInterestRate || ''}
                  onChange={(e) => handleInputChange('newInterestRate', e.target.value)}
                  placeholder="6.25%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Closing Costs (Optional)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.closingCosts || ''}
                  onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                  placeholder="$5,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
        
      case 'investment':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Property Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.propertyPrice || ''}
                  onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                  placeholder="$500,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Estimated Monthly Rent
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.monthlyRent || ''}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  placeholder="$3,500"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={inputs.loanTerm || '30'}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.interestRate || ''}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="6.5%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Down Payment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.downPayment || ''}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  placeholder="$100,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
        
      case 'alt-doc':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.loanAmount || ''}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  placeholder="$400,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Estimated Monthly Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.monthlyIncome || ''}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder="$12,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={inputs.loanTerm || '30'}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.interestRate || ''}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="7.0%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
        
      case 'credit':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Monthly Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.monthlyIncome || ''}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder="$8,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Estimated Debt
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.estimatedDebt || ''}
                  onChange={(e) => handleInputChange('estimatedDebt', e.target.value)}
                  placeholder="$1,500"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Credit Score
              </label>
              <input
                type="number"
                min="300"
                max="850"
                value={inputs.creditScore || '700'}
                onChange={(e) => handleInputChange('creditScore', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
          </>
        );
        
      case 'commercial':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Property Value
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.propertyValue || ''}
                  onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  placeholder="$2,000,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Down Payment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.downPayment || ''}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  placeholder="$400,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.interestRate || ''}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="6.0%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={inputs.loanTerm || '25'}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                NOI (Net Operating Income)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.noi || ''}
                  onChange={(e) => handleInputChange('noi', e.target.value)}
                  placeholder="$15,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
        
      case 'renovation':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Renovation Budget
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.renovationBudget || ''}
                  onChange={(e) => handleInputChange('renovationBudget', e.target.value)}
                  placeholder="$75,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Estimated Property Value After Renovation
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.afterValue || ''}
                  onChange={(e) => handleInputChange('afterValue', e.target.value)}
                  placeholder="$650,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={inputs.loanTerm || '15'}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.interestRate || ''}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="7.5%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
        
      case 'advanced':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Loan Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.loanAmount || ''}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  placeholder="$500,000"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Initial Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.initialRate || ''}
                  onChange={(e) => handleInputChange('initialRate', e.target.value)}
                  placeholder="6.5%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Adjustment Cap (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  value={inputs.adjustmentCap || ''}
                  onChange={(e) => handleInputChange('adjustmentCap', e.target.value)}
                  placeholder="2.0%"
                  className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Term (Years)
              </label>
              <input
                type="number"
                value={inputs.term || '30'}
                onChange={(e) => handleInputChange('term', e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
          </>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p className="text-white/80">Select a category to see calculator inputs</p>
          </div>
        );
    }
  };

  // Render results based on category
  const renderResults = () => {
    switch (category) {
      case 'purchase':
        return (
          <div className="flex justify-between items-center pt-4 border-t border-white/20">
            <span className="text-white/90">Monthly Payment:</span>
            <span className="text-2xl font-bold">{results.monthlyPayment || '$0'}</span>
          </div>
        );
        
      case 'refinance':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90">New Monthly Payment:</span>
              <span className="text-xl font-bold">{results.monthlyPayment || '$0'}</span>
            </div>
            <div className="text-xs text-white/70 mt-2">
              * Savings calculation requires current loan information
            </div>
          </div>
        );
        
      case 'investment':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90">Monthly Mortgage:</span>
              <span className="text-xl font-bold">{results.monthlyMortgage || '$0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">DSCR Ratio:</span>
              <span className="text-xl font-bold">{results.dscr || '0'}</span>
            </div>
          </div>
        );
        
      case 'alt-doc':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90">Estimated Monthly Payment:</span>
              <span className="text-xl font-bold">{results.monthlyPayment || '$0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">DTI (Debt-to-Income Ratio):</span>
              <span className="text-xl font-bold">{results.dti || '0%'}</span>
            </div>
          </div>
        );
        
      case 'credit':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-white/90">Estimated Loan Amount You Can Qualify For:</span>
              <span className="text-xl font-bold">{results.estimatedLoanAmount || '$0'}</span>
            </div>
          </div>
        );
        
      case 'commercial':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90">Monthly Payment:</span>
              <span className="text-xl font-bold">{results.monthlyPayment || '$0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">DSCR:</span>
              <span className="text-xl font-bold">{results.dscr || '0'}</span>
            </div>
          </div>
        );
        
      case 'renovation':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90">Monthly Payment:</span>
              <span className="text-xl font-bold">{results.monthlyPayment || '$0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">ROI (%):</span>
              <span className="text-xl font-bold">{results.roi || '0%'}</span>
            </div>
          </div>
        );
        
      case 'advanced':
        return (
          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90">Initial Payment:</span>
              <span className="text-xl font-bold">{results.initialPayment || '$0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90">Adjusted Payment:</span>
              <span className="text-xl font-bold">{results.adjustedPayment || '$0'}</span>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex justify-between items-center pt-4 border-t border-white/20">
            <span className="text-white/90">Result:</span>
            <span className="text-2xl font-bold">$0</span>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      {renderInputFields()}
      {renderResults()}
    </div>
  );
};

const CalculatorHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('purchase');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const calculatorSectionRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || CalcIcon;
  };

  const categories = [
    { 
      id: 'purchase', 
      label: 'Purchase', 
      icon: Home,
      color: 'emerald', 
      description: 'First-time & returning buyers',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    { 
      id: 'refinance', 
      label: 'Refinance', 
      icon: RefreshCw,
      color: 'blue', 
      description: 'Lower rates & cash-out options',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'investment', 
      label: 'Investment', 
      icon: Building,
      color: 'purple', 
      description: 'Rental & flip properties',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'alt-doc', 
      label: 'Alternative Documentation', 
      icon: FileText,
      color: 'orange', 
      description: 'Self-employed & business owners',
      gradient: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'credit', 
      label: 'Credit & Prequalification', 
      icon: Scale,
      color: 'green', 
      description: 'Assess readiness & improve profile',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      id: 'commercial', 
      label: 'Commercial', 
      icon: Briefcase,
      color: 'indigo', 
      description: 'Commercial real estate & business loans',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    { 
      id: 'renovation', 
      label: 'Renovation', 
      icon: Hammer,
      color: 'yellow', 
      description: 'Home improvements & ROI',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    { 
      id: 'advanced', 
      label: 'Advanced Tools', 
      icon: Settings,
      color: 'red', 
      description: 'Advanced strategies & analysis',
      gradient: 'from-red-500 to-red-600'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Smooth scroll to calculator section
    setTimeout(() => {
      calculatorSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVisibleCalculators = (categoryId: string) => {
    const categoryCalculators = calculators.filter(calc => calc.category === categoryId);
    const isExpanded = expandedCategories.has(categoryId);
    const maxVisible = 6;
    
    return isExpanded ? categoryCalculators : categoryCalculators.slice(0, maxVisible);
  };

  const hasMoreCalculators = (categoryId: string) => {
    const categoryCalculators = calculators.filter(calc => calc.category === categoryId);
    return categoryCalculators.length > 6;
  };

  const getFeaturedCalculator = () => {
    const categoryCalculators = calculators.filter(calc => calc.category === activeCategory);
    return categoryCalculators[0]; // First calculator as featured
  };

  const featuredCalculator = getFeaturedCalculator();
  const activeTab = categories.find(cat => cat.id === activeCategory);

  return (
    <section id="calculators" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" aria-label="Mortgage calculators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
            <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Free Financial Tools
            </span>
          </div>
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            Mortgage Calculator Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with our comprehensive suite of mortgage calculators. 
            Get instant results for payments, affordability, refinancing, and more.
          </p>
        </div>

        {/* Category Bento Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Choose Your Calculator Category</h3>
            <p className="text-lg text-gray-600">Select a category to explore specialized mortgage calculators</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              
              // Determine classes based on category color and active state
              const getCardClasses = () => {
                let baseClasses = "cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group rounded-xl p-6 ";
                
                if (isActive) {
                  switch (category.color) {
                    case 'emerald':
                      return baseClasses + "ring-2 ring-emerald-500 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white";
                    case 'blue':
                      return baseClasses + "ring-2 ring-blue-500 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white";
                    case 'purple':
                      return baseClasses + "ring-2 ring-purple-500 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white";
                    case 'orange':
                      return baseClasses + "ring-2 ring-orange-500 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white";
                    case 'green':
                      return baseClasses + "ring-2 ring-green-500 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white";
                    case 'indigo':
                      return baseClasses + "ring-2 ring-indigo-500 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white";
                    case 'yellow':
                      return baseClasses + "ring-2 ring-yellow-500 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white";
                    case 'red':
                      return baseClasses + "ring-2 ring-red-500 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white";
                    default:
                      return baseClasses + "ring-2 ring-gray-500 shadow-lg bg-gradient-to-br from-gray-500 to-gray-600 text-white";
                  }
                } else {
                  return baseClasses + "bg-white hover:shadow-lg hover:bg-gray-50";
                }
              };
              
              const getIconContainerClasses = () => {
                if (isActive) {
                  return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white/20 text-white shadow-lg";
                }
                
                switch (category.color) {
                  case 'emerald':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 group-hover:text-emerald-700";
                  case 'blue':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700";
                  case 'purple':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-purple-100 text-purple-600 group-hover:bg-purple-200 group-hover:text-purple-700";
                  case 'orange':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-orange-100 text-orange-600 group-hover:bg-orange-200 group-hover:text-orange-700";
                  case 'green':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-green-100 text-green-600 group-hover:bg-green-200 group-hover:text-green-700";
                  case 'indigo':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 group-hover:text-indigo-700";
                  case 'yellow':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700";
                  case 'red':
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-red-100 text-red-600 group-hover:bg-red-200 group-hover:text-red-700";
                  default:
                    return "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700";
                }
              };
              
              const getTitleClasses = () => {
                return `text-lg font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-navy-900 group-hover:text-navy-900'}`;
              };
              
              const getDescriptionClasses = () => {
                return `text-sm transition-colors ${isActive ? 'text-white/90' : 'text-gray-600 group-hover:text-gray-600'}`;
              };
              
              const getCountClasses = () => {
                return `mt-4 text-xs font-medium transition-colors ${isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-500'}`;
              };

              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 0.6s ease-out forwards'
                  }}
                >
                  <Card
                    className={getCardClasses()}
                  >
                    <div className="text-center">
                      <div className={getIconContainerClasses()}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      
                      <h4 className={getTitleClasses()}>
                        {category.label}
                      </h4>
                      
                      <p className={getDescriptionClasses()}>
                        {category.description}
                      </p>
                      
                      <div className={getCountClasses()}>
                        {calculators.filter(calc => calc.category === category.id).length} calculators
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Calculator - Dynamic based on active category */}
        {featuredCalculator && (
          <div className="mb-16" ref={calculatorSectionRef}>
            <Card className={`bg-gradient-to-br ${activeTab?.gradient} border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 text-white animate-slide-up`}>
              <div className="p-8">
                {/* Top Section: Title, description, CTA button */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <CalcIcon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                      Most Popular in {activeTab?.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredCalculator.title}</h3>
                  <p className="text-white/90 text-lg mb-6">{featuredCalculator.description}</p>
                  
                  <Link to={`/calculators/${featuredCalculator.slug}`}>
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 border border-white/30 text-white">
                      Use Full Calculator
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Bottom Section: Input fields + calculated result */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Quick Preview</h4>
                  <CalculatorComponent category={activeCategory} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Active Category Calculators - Enhanced Bento Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-navy-900">
              {activeTab?.label} Calculators
            </h3>
            <div className="text-sm text-gray-600">
              {calculators.filter(calc => calc.category === activeCategory).length} calculators available
            </div>
          </div>

          {/* Enhanced Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleCalculators(activeCategory).map((calculator, index) => {
              const IconComponent = getIcon(calculator.icon);
              const category = categories.find(cat => cat.id === activeCategory);
              
              return (
                <div
                  key={calculator.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card 
                    className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group calculator-card bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white rounded-xl"
                  >
                    <Link to={`/calculators/${calculator.slug}`}>
                      <CardHeader className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={
                            category?.color === 'emerald' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-100 group-hover:bg-emerald-200 transition-colors shadow-sm" :
                            category?.color === 'blue' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100 group-hover:bg-blue-200 transition-colors shadow-sm" :
                            category?.color === 'purple' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-purple-100 group-hover:bg-purple-200 transition-colors shadow-sm" :
                            category?.color === 'orange' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-orange-100 group-hover:bg-orange-200 transition-colors shadow-sm" :
                            category?.color === 'green' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-green-100 group-hover:bg-green-200 transition-colors shadow-sm" :
                            category?.color === 'indigo' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-indigo-100 group-hover:bg-indigo-200 transition-colors shadow-sm" :
                            category?.color === 'yellow' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-yellow-100 group-hover:bg-yellow-200 transition-colors shadow-sm" :
                            category?.color === 'red' ? "w-14 h-14 rounded-xl flex items-center justify-center bg-red-100 group-hover:bg-red-200 transition-colors shadow-sm" :
                            "w-14 h-14 rounded-xl flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors shadow-sm"
                          }>
                            <IconComponent className={
                              category?.color === 'emerald' ? "w-7 h-7 text-emerald-600" :
                              category?.color === 'blue' ? "w-7 h-7 text-blue-600" :
                              category?.color === 'purple' ? "w-7 h-7 text-purple-600" :
                              category?.color === 'orange' ? "w-7 h-7 text-orange-600" :
                              category?.color === 'green' ? "w-7 h-7 text-green-600" :
                              category?.color === 'indigo' ? "w-7 h-7 text-indigo-600" :
                              category?.color === 'yellow' ? "w-7 h-7 text-yellow-600" :
                              category?.color === 'red' ? "w-7 h-7 text-red-600" :
                              "w-7 h-7 text-gray-600"
                            } />
                          </div>
                          <div className="flex items-center">
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {calculator.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{calculator.description}</p>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <div className="flex items-center justify-between">
                          <span className={
                            category?.color === 'emerald' ? "px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800" :
                            category?.color === 'blue' ? "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800" :
                            category?.color === 'purple' ? "px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800" :
                            category?.color === 'orange' ? "px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800" :
                            category?.color === 'green' ? "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800" :
                            category?.color === 'indigo' ? "px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800" :
                            category?.color === 'yellow' ? "px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800" :
                            category?.color === 'red' ? "px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800" :
                            "px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                          }>
                            {category?.label}
                          </span>
                          <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                            Use Calculator
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMoreCalculators(activeCategory) && (
            <div className="text-center mt-8">
              <Button
                onClick={() => toggleExpanded(activeCategory)}
                variant="outline"
                size="lg"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                {expandedCategories.has(activeCategory) ? (
                  <>
                    Show Less
                    <ChevronUp className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Load More Calculators
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-blue-900 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right Calculator?</h3>
              <p className="text-lg mb-6 opacity-90">
                Our mortgage experts can guide you through the calculations and help you understand your options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (818) 555-0123
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Calculator Benefits</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-gold-400 mr-3" />
                  <span className="text-sm">Instant accurate calculations</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-3" />
                  <span className="text-sm">Compare different scenarios</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-400 mr-3" />
                  <span className="text-sm">Professional-grade tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorHub;
