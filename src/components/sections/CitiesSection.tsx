import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, TrendingUp, Users, ArrowRight, Building, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { cities } from '../../data/cities';

// Define unique color schemes for each city
const cityColorSchemes = [
  { name: 'blue', primary: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-400', glow: 'blue' },
  { name: 'emerald', primary: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-400', glow: 'green' },
  { name: 'amber', primary: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-400', glow: 'orange' },
  { name: 'rose', primary: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-400', glow: 'red' },
  { name: 'indigo', primary: 'text-indigo-400', bg: 'bg-indigo-500/20', border: 'border-indigo-400', glow: 'purple' },
  { name: 'teal', primary: 'text-teal-400', bg: 'bg-teal-500/20', border: 'border-teal-400', glow: 'blue' },
  { name: 'violet', primary: 'text-violet-400', bg: 'bg-violet-500/20', border: 'border-violet-400', glow: 'purple' },
  { name: 'cyan', primary: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-400', glow: 'blue' },
  { name: 'fuchsia', primary: 'text-fuchsia-400', bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-400', glow: 'purple' },
  { name: 'lime', primary: 'text-lime-400', bg: 'bg-lime-500/20', border: 'border-lime-400', glow: 'green' },
  { name: 'orange', primary: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-400', glow: 'orange' },
  { name: 'sky', primary: 'text-sky-400', bg: 'bg-sky-500/20', border: 'border-sky-400', glow: 'blue' },
  { name: 'pink', primary: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-400', glow: 'red' },
  { name: 'yellow', primary: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400', glow: 'orange' },
  { name: 'purple', primary: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-400', glow: 'purple' },
  { name: 'green', primary: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400', glow: 'green' },
];

const CitiesSection: React.FC = () => {
  const [visibleCities, setVisibleCities] = useState(9);

  const loadMoreCities = () => {
    setVisibleCities(prev => Math.min(prev + 3, cities.length));
  };

  const showLessCities = () => {
    setVisibleCities(9);
  };

  const hasMoreCities = visibleCities < cities.length;

  return (
    <section id="cities" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white" aria-label="San Fernando Valley service areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-white mr-3" />
            <span className="px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full">
              Local Expert
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            San Fernando Valley Specialist
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Deep local knowledge and personalized service for homebuyers and homeowners 
            throughout the San Fernando Valley's most desirable communities.
          </p>
        </div>

        {/* Cities Grid - Bento Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cities.slice(0, visibleCities).map((city, index) => {
            const colorScheme = cityColorSchemes[index % cityColorSchemes.length];
            return (
              <div 
                key={city.slug} 
                className="animate-card-entrance"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`h-full flex flex-col rounded-2xl border ${colorScheme.border} ${colorScheme.bg} backdrop-blur-sm bg-white/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={`text-2xl font-bold ${colorScheme.primary}`}>{city.name}</h3>
                      <MapPin className={`w-6 h-6 ${colorScheme.primary}`} />
                    </div>
                    <p className="text-white/90 mb-6 flex-grow text-base leading-relaxed">{city.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className={`text-center p-4 rounded-xl transition-all duration-300 hover:opacity-90 ${colorScheme.bg} border ${colorScheme.border}`}>
                        <Users className={`w-8 h-8 ${colorScheme.primary} mx-auto mb-2`} />
                        <div className={`text-xl font-bold ${colorScheme.primary}`}>{city.population}</div>
                        <div className="text-xs text-white/70 uppercase tracking-wide">Population</div>
                      </div>
                      <div className={`text-center p-4 rounded-xl transition-all duration-300 hover:opacity-90 ${colorScheme.bg} border ${colorScheme.border}`}>
                        <DollarSign className={`w-8 h-8 ${colorScheme.primary} mx-auto mb-2`} />
                        <div className={`text-xl font-bold ${colorScheme.primary}`}>{city.medianHomePrice}</div>
                        <div className="text-xs text-white/70 uppercase tracking-wide">Median Price</div>
                      </div>
                    </div>

                    {/* ZIP Codes */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">ZIP Codes:</p>
                      <div className="flex flex-wrap gap-2">
                        {city.zipCodes.map((zip) => (
                          <span
                            key={zip}
                            className={`px-3 py-2 ${colorScheme.bg} text-white text-sm font-medium rounded-full transition-all duration-300 hover:opacity-90 border ${colorScheme.border}`}
                          >
                            {zip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button fullWidth variant="outline" size="sm" className={`border ${colorScheme.border} bg-white/20 hover:bg-white/30 text-white transition-all duration-300 group py-3 font-medium`}>
                      <Link to={`/local-areas/${city.slug}`} className="flex items-center w-full justify-center">
                        View {city.name} Details
                        <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 ${colorScheme.primary}`} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mb-16">
          {hasMoreCities ? (
            <Button 
              onClick={loadMoreCities}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg animate-button-pulse hover:animate-none shadow-lg hover:shadow-xl"
            >
              Load More Cities
              <ArrowRight className="w-6 h-6 ml-2 inline transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button 
              onClick={showLessCities}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg animate-button-entrance shadow-lg hover:shadow-xl"
            >
              Show Less
              <ArrowRight className="w-6 h-6 ml-2 inline rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
          )}
        </div>

        {/* Local Expertise CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 text-white border border-white/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Local Market Expertise</h3>
              <p className="text-lg mb-6 opacity-90">
                15+ years of experience in the San Fernando Valley market. I know the neighborhoods, 
                schools, market trends, and the best loan programs for each community.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">250+</div>
                  <div className="text-sm opacity-80">Valley Families Helped</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">$500M+</div>
                  <div className="text-sm opacity-80">Local Loans Funded</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold mb-4">Get Your Local Market Report</h4>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your ZIP code"
                  className="w-full p-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
                <Button fullWidth size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg">
                  Get Market Report
                  <TrendingUp className="w-6 h-6 ml-2" />
                </Button>
              </form>
              <p className="text-sm opacity-70 mt-3">
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
