'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/utils/contactInfo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <AlertTriangle className="w-24 h-24 text-red-500 mx-auto" />
            </div>

            {/* Content */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Something Went Wrong
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              We're sorry, but something unexpected happened. Don't worry - we're still here to help you sell your Birmingham home!
            </p>

            {/* CTA Section */}
            <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need to Sell Your Birmingham Home?
              </h2>
              <p className="text-gray-700 mb-6">
                Get a call back in 24 hours. No repairs, no fees, no commissions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </button>
                
                <Link
                  href="/"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Go Home</span>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-gray-600">
              <p className="mb-2">Still having trouble?</p>
              <p className="font-medium">
                Call us directly: <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-blue-600 hover:text-blue-700">{CONTACT_INFO.phone}</a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 