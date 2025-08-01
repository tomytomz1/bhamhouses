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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h1>
            <div className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              <p className="mb-2">Selling your Birmingham, MI house for cash is simple.</p>
              <p>Here&apos;s our straightforward 3-step process.</p>
            </div>
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
                We&apos;ll call you back to get property condition details and provide a fair cash offer within 24 hours.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Market analysis of your area</li>
                <li>• Property condition assessment</li>
                <li>• Property condition assessment</li>
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
                Accept our offer and close in 7-90 days, or choose your own timeline. 
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
                          <p className="text-lg text-gray-600 max-w-3xl mx-auto whitespace-nowrap">
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
                Get a call back within 24 hours and close in 7-90 days. 
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
                We buy Birmingham properties that are difficult to sell through traditional real estate. Fire damage, foundation issues, 
                inherited properties - we handle challenging situations.
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Sell Your Birmingham House Fast?
              </h2>
              
              {/* Benefits List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Left Column - 3 Benefits */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white text-lg">Skip Repairs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white text-lg">No Fees or Commissions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white text-lg">Cash in 7-90 Days</span>
                  </div>
                </div>
                
                {/* Right Column - 3 Benefits */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white text-lg">Close on Your Timeline</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white text-lg">No Showings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white text-lg">Local Cash Buyers</span>
                  </div>
                </div>
              </div>
              
              {/* Call Box - Inside Left Column */}
              <div className="bg-white bg-opacity-15 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">Prefer to Call?</h3>
                <p className="mb-6 text-white">Speak directly with our Birmingham specialists</p>
                <a href="tel:5863241248" className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition duration-200">
                  Call (586) 324-1248
                </a>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="max-w-md mx-auto lg:max-w-none">
                                <div className="bg-white shadow-lg rounded-xl p-3">
                <LeadForm 
                  variant="inline"
                  title="Get Your Cash Offer"
                  subtitle="Fill out the form and we&apos;ll call you back to get property details."
                  textColor="light"
                />
              </div>
            </div>
          </div>


        </div>
      </section>
    </>
  )
} 