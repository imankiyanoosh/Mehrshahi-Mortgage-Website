import React from 'react';
import { ArrowRight, TrendingUp, Calculator as CalcIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

const CalculatorHub: React.FC = () => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || CalcIcon;
  };

  const categories = [
    { id: 'purchase', label: 'Purchase', color: 'green' },
    { id: 'refinance', label: 'Refinance', color: 'blue' },
    { id: 'investment', label: 'Investment', color: 'purple' },
  ];

  return (
    <section id="calculators" className="py-20 bg-white" aria-label="Mortgage calculators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            Mortgage Calculator Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with our comprehensive suite of mortgage calculators. 
            Get instant results for payments, affordability, refinancing, and more.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const categoryCalculators = calculators.filter(calc => calc.category === category.id);
          
          return (
            <div key={category.id} className="mb-16">
              <div className="flex items-center mb-8">
                <div className={`w-3 h-8 rounded-full mr-4 ${
                  category.color === 'green' ? 'bg-green-500' :
                  category.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <h3 className="text-2xl font-bold text-navy-900">{category.label} Calculators</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryCalculators.map((calculator) => {
                  const IconComponent = getIcon(calculator.icon);
                  
                  return (
                    <Card key={calculator.id} hover className="h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            category.color === 'green' ? 'bg-green-100' :
                            category.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              category.color === 'green' ? 'text-green-600' :
                              category.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                            }`} />
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            category.color === 'green' ? 'bg-green-100 text-green-800' :
                            category.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {category.label}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-navy-900 mb-2">{calculator.title}</h4>
                        <p className="text-sm text-gray-600">{calculator.description}</p>
                      </CardHeader>

                      <CardContent>
                        <Button fullWidth variant="outline" size="sm">
                          Use Calculator
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Featured Calculator */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600 mr-3" />
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Mortgage Payment Calculator
              </h3>
              <p className="text-gray-600 mb-6">
                Calculate your monthly mortgage payment including principal, interest, taxes, 
                and insurance. Get instant results with our most-used calculator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Calculate Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  See All Calculators
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-navy-900 mb-4">Quick Calculate</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount
                  </label>
                  <input
                    type="text"
                    placeholder="$600,000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interest Rate
                    </label>
                    <input
                      type="text"
                      placeholder="6.875%"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Term
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>30 years</option>
                      <option>15 years</option>
                      <option>20 years</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Monthly Payment:</span>
                    <span className="text-xl font-bold text-primary-600">$3,956</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorHub;