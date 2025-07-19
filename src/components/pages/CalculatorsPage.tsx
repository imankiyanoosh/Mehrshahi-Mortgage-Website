import React from 'react';
import { ArrowRight, Calculator as CalcIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { calculators } from '../../data/calculators';
import * as Icons from 'lucide-react';

const CalculatorsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Mortgage Calculators | Helen Mehrshahi Mortgage Solutions';
  }, []);

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
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                Free Financial Tools
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Mortgage Calculator Hub</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Make informed decisions with our comprehensive suite of mortgage calculators. 
              Get instant results for payments, affordability, refinancing, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
                Start Calculating
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                Get Expert Help
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
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
                <h2 className="text-2xl font-bold text-navy-900">{category.label} Calculators</h2>
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
                        <h3 className="text-lg font-bold text-navy-900 mb-2">{calculator.title}</h3>
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
      </div>
    </div>
  );
};

export default CalculatorsPage;