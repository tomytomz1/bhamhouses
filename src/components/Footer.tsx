import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '@/utils/contactInfo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">BHAM Houses</h3>
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mb-6">
              <p className="text-blue-200 font-bold text-sm mb-2">💡 We Specialize in Difficult-to-Sell Properties</p>
              <p className="text-blue-100 text-sm leading-relaxed">
                We focus on properties that are challenging to sell through traditional real estate. 
                If your house is in good condition, we recommend working with a realtor for the best price.
              </p>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Fire damage, foundation issues, foreclosure, code violations, inherited properties, liens, probate situations - 
              we handle properties that need special attention.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="hover:text-blue-400"
              >
                {CONTACT_INFO.phone}
              </a>
              <span className="text-gray-400">|</span>
              <a href="mailto:info@bhamhouses.com" className="hover:text-blue-400">
                info@bhamhouses.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about-birmingham-mi-cash-buyers" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-house-selling-faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-blue-400">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@bhamhouses.com" className="hover:text-blue-400">
                  info@bhamhouses.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Birmingham, MI 48009</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Mon-Sun: 8AM-8PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mb-6 text-center">
            <p className="text-blue-200 font-bold text-sm mb-2">
              💡 About Our Services
            </p>
            <p className="text-blue-100 text-xs leading-relaxed">
              BHAM Houses specializes in properties that are difficult to sell through traditional real estate in Birmingham, MI. 
              We provide fair cash offers for challenging situations. For properties in good condition, we recommend traditional real estate options.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 BHAM Houses. All rights reserved. Birmingham Cash Home Buyers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 