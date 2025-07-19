import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { cities } from '../../data/cities';

const CitiesSection: React.FC = () => {
  return (
    <section id="cities" className="py-20 bg-gray-50" aria-label="San Fernando Valley service areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-primary-600 mr-3" />
            <span className="px-4 py-2 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
              Local Expert
            </span>
          </div>
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            San Fernando Valley Specialist
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep local knowledge and personalized service for homebuyers and homeowners 
            throughout the San Fernando Valley's most desirable communities.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cities.map((city) => (
            <Card key={city.slug} hover className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-navy-900">{city.name}</h3>
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600 mb-4">{city.description}</p>
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
                <div className="mb-4">
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

                <Button fullWidth variant="outline" size="sm">
                  <Link to={`/local-areas/${city.slug}`}>
                    View {city.name} Details
                  </Link>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Local Expertise CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-primary-900 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Local Market Expertise</h3>
              <p className="text-lg mb-6 opacity-90">
                15+ years of experience in the San Fernando Valley market. I know the neighborhoods, 
                schools, market trends, and the best loan programs for each community.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-gold-400">250+</div>
                  <div className="text-sm opacity-80">Valley Families Helped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-400">$500M+</div>
                  <div className="text-sm opacity-80">Local Loans Funded</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4">Get Your Local Market Report</h4>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your ZIP code"
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
                <Button fullWidth size="lg" className="bg-gold-600 hover:bg-gold-700">
                  Get Market Report
                  <TrendingUp className="w-5 h-5 ml-2" />
                </Button>
              </form>
              <p className="text-xs opacity-70 mt-3">
                Free market analysis including recent sales, price trends, and financing options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;