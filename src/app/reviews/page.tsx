import { Metadata } from 'next'
import { testimonials } from '@/data/testimonials'
import LeadForm from '@/components/LeadForm'
import { Star, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Customer Reviews - Birmingham, MI Cash Home Buyers | BHAM Houses',
  description: 'Read reviews from Birmingham, MI homeowners who sold their houses to BHAM Houses. Real testimonials from satisfied customers.',
  keywords: 'BHAM Houses reviews, Birmingham MI cash home buyers reviews, customer testimonials Birmingham',
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Customer Reviews
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what Birmingham, MI homeowners have to say about their experience with BHAM Houses.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-200"
              >
                <div className="flex items-start mb-6">
                  <Quote className="h-8 w-8 text-blue-600 mr-4 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.propertyType}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Birmingham Homeowners Choose BHAM Houses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to Birmingham homeowners is reflected in every review. Here&apos;s what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5-Star Service</h3>
              <p className="text-gray-600">
                Every customer receives our full attention and professional service. 
                We&apos;re committed to making your experience positive from start to finish.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Process</h3>
              <p className="text-gray-600">
                No hidden fees, no surprises, no pressure. We believe in complete 
                transparency throughout the entire process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Birmingham Focus</h3>
              <p className="text-gray-600">
                We specialize exclusively in Birmingham, MI properties, giving us 
                deep local knowledge and better service for Birmingham homeowners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Help Birmingham Homeowners in Many Situations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re facing foreclosure, inherited a property, going through a divorce, 
              or need to relocate quickly, we can help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inherited Properties</h3>
              <p className="text-gray-600 text-sm">
                We handle probate situations and help you sell inherited properties quickly and easily.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Foreclosure Avoidance</h3>
              <p className="text-gray-600 text-sm">
                Facing foreclosure? We can help you sell quickly and avoid losing your home.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Divorce Sales</h3>
              <p className="text-gray-600 text-sm">
                Need to sell your marital home? We make the process simple and stress-free.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Relocation</h3>
              <p className="text-gray-600 text-sm">
                Job transfer requiring a quick sale? We can close in as little as 7 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Satisfied Customers?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get your fair cash offer today and experience the BHAM Houses difference.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <LeadForm 
              variant="inline"
              title="Get Your Cash Offer"
              subtitle="Fill out the form and we&apos;ll contact you within 24 hours."
            />
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Prefer to Call?</h3>
              <p className="mb-4 text-blue-100">
                Speak directly with our Birmingham specialists
              </p>
              <a
                href="tel:248XXXXXXX"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
              >
                Call (248) XXX-XXXX
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 