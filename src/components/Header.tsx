'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '@/utils/contactInfo';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'About Us', href: '/about-birmingham-mi-cash-buyers' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Market Report', href: '/birmingham-mi-real-estate-market' },
  { name: 'FAQ', href: '/birmingham-mi-house-selling-faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              BHAM Houses
            </Link>
            <div className="ml-2 text-sm text-gray-600 hidden sm:block">
              Birmingham, MI Cash Buyers
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <Link
              href="/contact"
              className="btn-primary text-sm"
            >
              Get Cash Offer
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 