import { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact BHAM Houses - Birmingham, MI Cash Home Buyers',
  description: 'Contact BHAM Houses, Birmingham, Michigan\'s cash home buyers. Call (248) XXX-XXXX or fill out our form for a free cash offer.',
  keywords: 'contact BHAM Houses, Birmingham MI cash home buyers contact, call Birmingham house buyers',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact BHAM Houses
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Ready to sell your Birmingham, MI house? Get in touch with us today for a free cash offer.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:248XXXXXXX" className="text-gray-600 hover:text-blue-600 text-lg">
                      (248) XXX-XXXX
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Call us anytime during business hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@bhamhouses.com" className="text-gray-600 hover:text-blue-600 text-lg">
                      info@bhamhouses.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Service Area</h3>
                    <p className="text-gray-600 text-lg">Birmingham, MI 48009</p>
                    <p className="text-sm text-gray-500 mt-1">Serving all Birmingham neighborhoods</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600 text-lg">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Extended hours for your convenience</p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose BHAM Houses?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Birmingham, MI specialists with deep local market knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Fair cash offers within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Close in 7 days or choose your timeline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>No repairs, no fees, no commissions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Professional and transparent process</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <LeadForm 
                variant="inline"
                title="Get Your Birmingham Cash Offer"
                subtitle="Fill out the form below and we&apos;ll contact you within 24 hours with your fair cash offer."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Serve All Birmingham Neighborhoods
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From downtown condos to luxury family homes, we buy properties in every Birmingham area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Downtown Birmingham',
              'Shain Park',
              'Bloomfield Ridge',
              'The Village',
              'Wellspring',
              'Maplewood',
              'Birmingham Estates',
              'Birmingham Manor',
              'Birmingham Villas',
              'Buckingham Village',
              'Woodward Corridor',
              'Rouge River Area',
              'Lincoln Hills Golf Course Area',
              'Booth Park Area',
              'Birmingham Theatre District'
            ].map((area) => (
              <div key={area} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <span className="text-gray-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Sell Your Birmingham House?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get your fair cash offer today. No obligation, no pressure, just a straightforward process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:248XXXXXXX"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Call (248) XXX-XXXX
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Get Started Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
} 