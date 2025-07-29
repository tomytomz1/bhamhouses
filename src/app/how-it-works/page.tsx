import { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import { Phone, FileText, CheckCircle, Clock, DollarSign, Home, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works - Birmingham, MI Cash Home Buyers | BHAM Houses',
  description: 'Learn how BHAM Houses buys Birmingham, MI properties for cash. Simple 3-step process: contact, get offer, close fast.',
  keywords: 'how it works Birmingham MI cash buyers, Birmingham house selling process, cash home buying process',
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Selling your Birmingham, MI house for cash is simple. Here&apos;s our straightforward 3-step process.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-4">
                Fill out our form or call us directly. We&apos;ll ask about your Birmingham property address, 
                condition, and timeline.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Property address</li>
                <li>• Property type and condition</li>
                <li>• Your preferred timeline</li>
                <li>• Contact information</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Your Cash Offer</h3>
              <p className="text-gray-600 mb-4">
                We&apos;ll analyze recent sales in Birmingham and provide a fair cash offer within 24 hours.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Market analysis of your area</li>
                <li>• Property condition assessment</li>
                <li>• Fair cash offer calculation</li>
                <li>• No-obligation offer</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Close Fast</h3>
              <p className="text-gray-600 mb-4">
                Accept our offer and close in as little as 7 days, or choose your own timeline. 
                We handle everything.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Choose your closing date</li>
                <li>• We handle all paperwork</li>
                <li>• No repairs or cleaning needed</li>
                <li>• Cash at closing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Process?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Birmingham-focused approach makes selling your house simple, fast, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Fast Timeline</h3>
              </div>
              <p className="text-gray-600">
                Get an offer within 24 hours and close in as little as 7 days. 
                We work around your schedule, not ours.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">No Hidden Fees</h3>
              </div>
              <p className="text-gray-600">
                No realtor commissions, no closing costs, no hidden fees. 
                Our offer is what you walk away with.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">As-Is Purchase</h3>
              </div>
              <p className="text-gray-600">
                We buy houses in any condition. No repairs, no cleaning, 
                no improvements needed.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Birmingham Specialists</h3>
              </div>
              <p className="text-gray-600">
                We focus exclusively on Birmingham, MI properties, giving us 
                deep local market knowledge.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Simple Process</h3>
              </div>
              <p className="text-gray-600">
                No showings, no inspections, no waiting for buyer financing. 
                Just a straightforward cash sale.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Personal Service</h3>
              </div>
              <p className="text-gray-600">
                Work directly with our Birmingham specialists. No middlemen, 
                no corporate bureaucracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Buy in Birmingham, MI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We buy all types of properties throughout Birmingham, regardless of condition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Single Family Homes</h3>
              <p className="text-gray-600 text-sm">
                From starter homes to luxury estates throughout Birmingham
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Condos & Townhomes</h3>
              <p className="text-gray-600 text-sm">
                Downtown condos, townhomes, and villa-style properties
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inherited Properties</h3>
              <p className="text-gray-600 text-sm">
                Properties in probate, inherited homes, estate sales
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Distressed Properties</h3>
              <p className="text-gray-600 text-sm">
                Foreclosure, short sales, properties needing major repairs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            It only takes a few minutes to get your fair cash offer.
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