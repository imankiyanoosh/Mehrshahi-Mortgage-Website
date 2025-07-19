import React from 'react';
import { Phone, Mail, MapPin, Home, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Loan Programs',
      links: [
        { name: 'Conventional Loans', href: '#loans' },
        { name: 'FHA Loans', href: '#loans' },
        { name: 'VA Loans', href: '#loans' },
        { name: 'Jumbo Loans', href: '#loans' },
        { name: 'Refinancing', href: '#loans' },
        { name: 'Investment Loans', href: '#loans' },
      ],
    },
    {
      title: 'Calculators',
      links: [
        { name: 'Mortgage Payment', href: '#calculators' },
        { name: 'Affordability', href: '#calculators' },
        { name: 'Refinance Savings', href: '#calculators' },
        { name: 'HELOC vs Cash-Out', href: '#calculators' },
        { name: 'Rent vs Buy', href: '#calculators' },
        { name: 'Early Payoff', href: '#calculators' },
      ],
    },
    {
      title: 'Service Areas',
      links: [
        { name: 'Woodland Hills', href: '#cities' },
        { name: 'West Hills', href: '#cities' },
        { name: 'Encino', href: '#cities' },
        { name: 'Tarzana', href: '#cities' },
        { name: 'Winnetka', href: '#cities' },
        { name: 'Reseda', href: '#cities' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'First-Time Buyer Guide', href: '#' },
        { name: 'Market Reports', href: '#' },
        { name: 'Mortgage Blog', href: '#' },
        { name: 'Rate Alerts', href: '#' },
        { name: 'Pre-approval', href: '#' },
        { name: 'Document Checklist', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-navy-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold">Helen Mehrshahi</div>
                  <div className="text-sm text-gray-400">Mortgage Solutions</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 max-w-md">
                Your trusted mortgage professional serving the San Fernando Valley with 
                15+ years of experience and personalized service.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-primary-400" />
                  <span className="text-sm">(818) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-primary-400" />
                  <span className="text-sm">helen@example.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-primary-400" />
                  <span className="text-sm">Woodland Hills, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} Helen Mehrshahi Mortgage Solutions. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                ADA Compliance
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Licensing
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="text-xs text-gray-500 leading-relaxed">
              <p className="mb-2">
                <strong>NMLS ID:</strong> [To be provided] | 
                <strong> Licensed by:</strong> California Department of Financial Protection and Innovation
              </p>
              <p className="mb-2">
                This is not a commitment to lend. All loan programs subject to credit approval. 
                Rates, program terms and conditions are subject to change without notice. 
                Property taxes and insurance not included in payment calculation.
              </p>
              <p>
                Equal Housing Opportunity. This website is not affiliated with any government agencies. 
                All information provided is for informational purposes only and does not constitute 
                financial, legal, or tax advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;