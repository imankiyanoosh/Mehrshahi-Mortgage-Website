import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { cities } from '../../data/cities';

const LocalAreasPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Local Areas | San Fernando Valley Mortgage Services';
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 mr-3" />
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                Local Expert
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">San Fernando Valley Service Areas</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert mortgage services throughout the San Fernando Valley. Deep local knowledge 
              and personalized service for every community we serve.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{cities.length}+</div>
            <div className="text-gray-600">Cities Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">2,500+</div>
            <div className="text-gray-600">Local Families Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
            <div className="text-gray-600">Years Local Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">$2B+</div>
            <div className="text-gray-600">Local Loans Funded</div>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Card key={city.slug} hover className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-navy-900">{city.name}</h3>
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-gray-600 mb-4">{city.description}</p>
              </CardHeader>

              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-navy-900">{city.population}</div>
                    <div className="text-xs text-gray-500">Population</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Home className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-navy-900">{city.medianHomePrice}</div>
                    <div className="text-xs text-gray-500">Median Price</div>
                  </div>
                </div>

                {/* ZIP Codes */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-gray-700 mb-2">ZIP Codes:</p>
                  <div className="flex flex-wrap gap-1">
                    {city.zipCodes.map((zip) => (
                      <span
                        key={zip}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded"
                      >
                        {zip}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to={`/local-areas/${city.slug}`}>
                  <Button fullWidth size="sm">
                    View {city.name} Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Don't See Your City?
              </h3>
              <p className="text-gray-600 mb-6">
                We serve the entire San Fernando Valley and surrounding areas. If you don't see 
                your specific city listed, we likely still provide services in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Get Market Report
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-navy-900 mb-4">Service Area Coverage</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>All San Fernando Valley cities</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Santa Clarita Valley</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Conejo Valley</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Greater Los Angeles area</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAreasPage;