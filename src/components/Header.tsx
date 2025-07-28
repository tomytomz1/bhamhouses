'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, MapPin } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about-birmingham-mi-cash-buyers' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Market Report', href: '/birmingham-mi-real-estate-market' },
    { name: 'FAQ', href: '/birmingham-mi-house-selling-faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                BHAM Houses
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Birmingham, MI Cash Buyers
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Phone Number & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:248XXXXXXX"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(248) XXX-XXXX</span>
            </a>
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get Cash Offer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Phone Number */}
              <div className="flex items-center justify-center space-x-2 text-blue-600 font-semibold text-lg">
                <Phone className="w-5 h-5" />
                <span>(248) XXX-XXXX</span>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Get Cash Offer
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 