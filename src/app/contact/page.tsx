import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import { CONTACT_INFO } from '@/utils/contactInfo';

export const metadata: Metadata = {
  title: 'Contact BHAM Houses - Birmingham, MI Cash Home Buyers',
  description: 'Contact BHAM Houses, Birmingham, Michigan\'s cash home buyers. Call (586) 324-1248 or fill out our form for a free cash offer.',
  keywords: 'contact BHAM Houses, Birmingham MI cash home buyers contact, we buy houses Birmingham contact',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact BHAM Houses
            </h1>
            <p className="text-xl text-gray-700 whitespace-nowrap text-center">
              Ready to sell your Birmingham home? Get in touch with us today for a fair cash offer.
            </p>
            <p className="text-xl text-gray-700 whitespace-nowrap text-center">
              No obligation, no pressure, just a straightforward conversation about your property.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get Your Fair Cash Offer
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  We're here to help you sell your Birmingham home quickly and hassle-free. 
                  Whether you need to sell fast or just want to explore your options, we're ready to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-gray-600 hover:text-blue-600 text-lg">
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available 7 days a week, 8AM-8PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <a href="mailto:info@bhamhouses.com" className="text-gray-600 hover:text-blue-600 text-lg">
                      info@bhamhouses.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll call back within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Area</h3>
                    <p className="text-gray-600 text-lg">Birmingham, MI 48009</p>
                    <p className="text-sm text-gray-500 mt-1">Serving Birmingham, MI</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <p className="text-gray-600 text-lg">Monday - Sunday</p>
                    <p className="text-sm text-gray-500 mt-1">8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-luxury">
              <LeadForm 
                variant="inline"
                title="Get Your Free Cash Offer"
                subtitle="Fill out the form below and we'll call you back to get property details."
              />
            </div>
          </div>

          {/* Why Choose Us - Full Width Row */}
          <div className="bg-blue-50 rounded-2xl p-8 mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose BHAM Houses?</h3>
                                        <div className="grid grid-cols-3 gap-8 text-gray-700 max-w-6xl mx-auto">
                <div className="flex items-center space-x-3 justify-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base font-medium text-left">Call back in 24 hours</span>
                </div>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base font-medium text-left">Close in 7-90 days or choose your timeline</span>
                </div>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base font-medium text-left">No repairs, no fees, no commissions</span>
                </div>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base font-medium text-left">Birmingham specialists with local expertise</span>
                </div>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base font-medium text-left">As-is purchases, no repairs needed</span>
                </div>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base font-medium text-left">Transparent process, no hidden fees</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-900">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Sell Your Birmingham Home?
              </h2>
              <p className="text-lg text-blue-100">
                Don't wait - get your fair cash offer today. No obligation, no pressure, just a straightforward process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call {CONTACT_INFO.phone}</span>
              </a>
              <a href="/" className="btn-outline border-white text-white hover:bg-white hover:text-blue-900">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 