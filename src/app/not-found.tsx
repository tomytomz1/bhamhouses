import Link from 'next/link';
import { Home, Phone, ArrowLeft } from 'lucide-react';
import { CONTACT_INFO } from '@/utils/contactInfo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200">404</div>
          <div className="text-6xl font-bold text-blue-600 -mt-8">Oops!</div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. But don't worry - we're still here to help you sell your Birmingham home fast!
        </p>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Sell Your Birmingham Home?
          </h2>
          <p className="text-gray-700 mb-6">
            Get a call back in 24 hours. No repairs, no fees, no commissions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call {CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 