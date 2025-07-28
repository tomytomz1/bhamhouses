import LeadForm from '@/components/LeadForm';
import BenefitsSection from '@/components/BenefitsSection';
import ProcessSection from '@/components/ProcessSection';
import NeighborhoodsGrid from '@/components/NeighborhoodsGrid';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { Clock, DollarSign, MapPin, Handshake, Phone, Mail, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '@/utils/contactInfo';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section - Full Viewport Height */}
      <section className="hero-section">
        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-0">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
              {/* Left Column - Content */}
              <div className="space-y-4 sm:space-y-6">
                {/* Main Headline */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                    Sell Your House Fast in{' '}
                    <span className="text-gradient">Birmingham, MI</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    Birmingham, Michigan's dedicated cash home buyers. Get a fair cash offer in 24 hours, close in 7 days. No repairs, no fees, no commissions.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Close in 7 days</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">No fees or commissions</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Serving all Birmingham neighborhoods</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <Handshake className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Fair offers in 24 hours</span>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg md:text-xl font-bold text-blue-600">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Call {CONTACT_INFO.phone}</span>
                  </div>
                  <div className="text-gray-600">
                    <div className="font-medium text-xs sm:text-sm">Get Cash Offer Online</div>
                    <div className="text-xs">Get Your Birmingham Cash Offer</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="hero-form bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-luxury border border-gray-200 p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                <div className="text-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Get Your Birmingham Cash Offer</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Fill out the form below and we'll contact you within 24 hours with your fair cash offer.</p>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birmingham Specialization Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Birmingham, MI's Only Dedicated Cash Home Buyer
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              While other companies spread themselves thin across 50+ cities, we focus exclusively on Birmingham, Michigan. 
              This specialization gives us deep local market knowledge and allows us to provide better service to Birmingham homeowners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Birmingham Specialists</h3>
              <p className="text-gray-700">
                We know every Birmingham neighborhood, from downtown condos to luxury family homes in Bloomfield Ridge.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fair Market Offers</h3>
              <p className="text-gray-700">
                Our offers are based on current Birmingham market values and recent sales in your specific neighborhood.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast & Flexible</h3>
              <p className="text-gray-700">
                Close in 7 days or choose your timeline. We work around your schedule, not ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Birmingham Neighborhoods */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              We Serve All Birmingham, MI Neighborhoods
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From downtown condos to luxury family homes, we buy properties in every Birmingham neighborhood. 
              Click on any area to learn more about selling your house in that specific neighborhood.
            </p>
          </div>
          <NeighborhoodsGrid />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Birmingham Homeowners Say
            </h2>
            <p className="text-xl text-gray-700">
              Don't just take our word for it. Here's what Birmingham property owners have to say about their experience.
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-white to-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700">
              Get answers to the most common questions about selling your Birmingham home for cash.
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-blue-900">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Sell Your Birmingham Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get your fair cash offer today. No obligation, no pressure, just a straightforward process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="btn-secondary inline-flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call {CONTACT_INFO.phone}</span>
              </a>
              <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
  );
}
