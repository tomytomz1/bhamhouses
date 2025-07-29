import { Metadata } from 'next'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import { Phone, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Birmingham, MI House Selling FAQ - Common Questions About Cash Home Sales',
  description: 'Get answers to frequently asked questions about selling your house for cash in Birmingham, Michigan. Learn about our process, offers, and timeline.',
  keywords: 'Birmingham MI house selling FAQ, cash home buyer questions, Birmingham Michigan real estate FAQ',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-green-900/10"></div>
        <div className="container-max section-padding relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Birmingham, MI House Selling{' '}
              <span className="text-gradient">FAQ</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Get answers to the most common questions about selling your house for cash in Birmingham, Michigan. 
              We're here to help you understand our process and make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to know about selling your Birmingham home for cash.
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Additional Questions */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're here to help. Contact us directly for personalized answers about your specific situation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Us Directly
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Have a specific question about your Birmingham property? We're here to help. 
                  Call us or fill out the form and we'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">(586) 324-1248</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">info@bhamhouses.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">Birmingham, Michigan</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose BHAM Houses?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Birmingham specialists with deep local market knowledge</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fair offers based on current Birmingham market values</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fast closing in 7 days or your timeline</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>No repairs, no fees, no commissions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Transparent, straightforward process</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-luxury">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Birmingham Cash Offer</h3>
                <p className="text-gray-600">Fill out the form and we'll contact you within 24 hours with answers to your questions.</p>
              </div>
              <LeadForm
                title="Get Your Birmingham Cash Offer"
                subtitle="Fill out the form and we'll contact you within 24 hours with answers to your questions."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-blue-900">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get your fair cash offer today. No obligation, no pressure, just straightforward answers and a simple process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <a href="tel:5863241248" className="btn-secondary inline-flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call (586) 324-1248</span>
                </a>
              <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 