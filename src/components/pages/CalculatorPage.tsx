import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calculator as CalcIcon, TrendingUp, DollarSign, Percent, Calendar, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const { calculatorSlug } = useParams<{ calculatorSlug: string }>();
  const [result, setResult] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const calculator = calculators.find(calc => calc.slug === calculatorSlug);

  useEffect(() => {
    if (calculator) {
      document.title = `${calculator.title} | Helen Mehrshahi Mortgage Solutions`;
    }
  }, [calculator]);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || CalcIcon;
  };

  if (!calculator) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Calculator Not Found</h1>
          <p className="text-gray-600 mb-6">The calculator you're looking for doesn't exist.</p>
          <Link to="/calculators">
            <Button>Return to Calculators</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIcon(calculator.icon);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateMortgagePayment = () => {
    const principal = parseFloat(inputs.loanAmount) || 0;
    const annualRate = parseFloat(inputs.interestRate) / 100 || 0;
    const years = parseFloat(inputs.loanTerm) || 30;
    
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
      setResult(principal / numberOfPayments);
    } else {
      const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setResult(monthlyPayment);
    }
  };

  const calculateAffordability = () => {
    const monthlyIncome = parseFloat(inputs.monthlyIncome) || 0;
    const monthlyDebts = parseFloat(inputs.monthlyDebts) || 0;
    const downPayment = parseFloat(inputs.downPayment) || 0;
    const interestRate = parseFloat(inputs.interestRate) / 100 / 12 || 0;
    const loanTerm = parseFloat(inputs.loanTerm) * 12 || 360;
    
    // Use 28% of gross monthly income for housing
    const maxHousingPayment = monthlyIncome * 0.28;
    const maxTotalDebt = monthlyIncome * 0.36;
    const availableForHousing = Math.min(maxHousingPayment, maxTotalDebt - monthlyDebts);
    
    // Calculate max loan amount
    if (interestRate === 0) {
      setResult((availableForHousing * loanTerm) + downPayment);
    } else {
      const maxLoanAmount = availableForHousing * (Math.pow(1 + interestRate, loanTerm) - 1) / 
                           (interestRate * Math.pow(1 + interestRate, loanTerm));
      setResult(maxLoanAmount + downPayment);
    }
  };

  const renderCalculator = () => {
    switch (calculator.slug) {
      case 'mortgage-payment':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.loanAmount || ''}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                    placeholder="600000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    step="0.001"
                    value={inputs.interestRate || ''}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    placeholder="6.875"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={inputs.loanTerm || '30'}
                    onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Tax (Monthly)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.propertyTax || ''}
                    onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                    placeholder="500"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <Button onClick={calculateMortgagePayment} size="lg" className="w-full">
              Calculate Payment
            </Button>
            {result && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Monthly Payment</h3>
                  <div className="text-3xl font-bold text-blue-600">
                    ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-sm text-blue-700 mt-2">Principal & Interest</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'affordability':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.monthlyIncome || ''}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    placeholder="8000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Debts
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.monthlyDebts || ''}
                    onChange={(e) => handleInputChange('monthlyDebts', e.target.value)}
                    placeholder="500"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={inputs.downPayment || ''}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    placeholder="100000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    step="0.001"
                    value={inputs.interestRate || ''}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    placeholder="6.875"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <Button onClick={calculateAffordability} size="lg" className="w-full">
              Calculate Affordability
            </Button>
            {result && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Maximum Home Price</h3>
                  <div className="text-3xl font-bold text-green-600">
                    ${result.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-sm text-green-700 mt-2">Based on 28% debt-to-income ratio</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <CalcIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Calculator Coming Soon</h3>
            <p className="text-gray-600">
              This calculator is currently being developed. Please check back soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/calculators">
            <Button variant="outline" className="mb-6 border-white text-white hover:bg-white hover:text-navy-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                  {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{calculator.title}</h1>
              <p className="text-xl text-blue-100 mb-8">{calculator.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100">
                  Get Pre-Approved
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Talk to Expert
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 bg-white/10 rounded-2xl flex items-center justify-center">
                <IconComponent className="w-24 h-24 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-navy-900 mb-2">{calculator.title}</h2>
                <p className="text-gray-600">Enter your information below to calculate your results</p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {renderCalculator()}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Calculators */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            Related Calculators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {calculators
              .filter(calc => calc.category === calculator.category && calc.id !== calculator.id)
              .slice(0, 3)
              .map((relatedCalc) => {
                const RelatedIcon = getIcon(relatedCalc.icon);
                return (
                  <Card key={relatedCalc.id} hover>
                    <Link to={`/calculators/${relatedCalc.slug}`}>
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                          <RelatedIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-bold text-navy-900 mb-2">{relatedCalc.title}</h4>
                        <p className="text-sm text-gray-600">{relatedCalc.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button fullWidth variant="outline" size="sm">
                          Use Calculator
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;