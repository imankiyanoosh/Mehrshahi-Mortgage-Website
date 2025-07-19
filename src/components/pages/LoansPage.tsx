import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { loanTypes } from '../../data/loans';

const LoansPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Loans' },
    { id: 'purchase', label: 'Purchase' },
    { id: 'refinance', label: 'Refinance' },
    { id: 'investment', label: 'Investment' },
    { id: 'specialty', label: 'Specialty' },
  ];

  const filteredLoans = loanTypes.filter((loan) => {
    const matchesSearch = loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || loan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  React.useEffect(() => {
    document.title = 'Loan Services | Helen Mehrshahi Mortgage Solutions';
  }, []);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                20+ Loan Programs Available
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Comprehensive Loan Solutions</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From conventional loans to specialized financing, we offer 20+ loan products 
              to meet your unique homeownership and investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
                Get Pre-Approved
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search loan types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLoans.map((loan) => (
            <Card key={loan.id} hover className="h-full flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    loan.category === 'purchase' ? 'bg-green-100 text-green-800' :
                    loan.category === 'refinance' ? 'bg-blue-100 text-blue-800' :
                    loan.category === 'investment' ? 'bg-purple-100 text-purple-800' :
                    'bg-gold-100 text-gold-800'
                  }`}>
                    {loan.category.charAt(0).toUpperCase() + loan.category.slice(1)}
                  </span>
                </div>
              </div>

              <CardHeader>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{loan.title}</h3>
                <p className="text-sm text-primary-600 font-medium mb-2">{loan.subtitle}</p>
                <p className="text-sm text-gray-600 line-clamp-3">{loan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {loan.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <Star className="w-3 h-3 text-gold-500 mr-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/loan-services/${loan.slug}`}>
                  <Button fullWidth size="sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filter options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoansPage;