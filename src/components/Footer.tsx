import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">BHAM Houses</h3>
            <p className="text-gray-300 mb-4">
              Birmingham, Michigan's dedicated cash home buying company. We specialize exclusively in Birmingham, MI properties, 
              providing fair cash offers and fast closings to homeowners throughout the area.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:248XXXXXXX" className="hover:text-blue-400">(248) XXX-XXXX</a>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@bhamhouses.com" className="hover:text-blue-400">info@bhamhouses.com</a>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Birmingham, MI 48009</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about-birmingham-mi-cash-buyers" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-house-selling-faq" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Birmingham Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Birmingham Areas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/birmingham-mi-downtown-houses" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Downtown Birmingham
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-shain-park-houses" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Shain Park
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-bloomfield-ridge-houses" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Bloomfield Ridge
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-village-houses" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  The Village
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-wellspring-houses" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Wellspring
                </Link>
              </li>
              <li>
                <Link href="/birmingham-mi-maplewood-houses" className="text-gray-300 hover:text-blue-400 transition duration-200">
                  Maplewood
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} BHAM Houses. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-blue-400 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 