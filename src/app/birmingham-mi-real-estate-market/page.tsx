import { Metadata } from 'next'
import { DollarSign, TrendingUp, Home, Calendar } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Birmingham, MI Real Estate Market Report - Cash Home Buyers | BHAM Houses',
  description: 'Current Birmingham, Michigan real estate market analysis. Property values, trends, and insights for Birmingham homeowners.',
  keywords: 'Birmingham MI real estate market, Birmingham Michigan property values, Birmingham house prices',
}

export default function MarketReportPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Birmingham, MI Real Estate Market Report
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Current market insights and property value trends for Birmingham, Michigan homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Birmingham Market Overview
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Birmingham, Michigan continues to be one of the most desirable communities in Metro Detroit. 
                With its excellent schools, walkable downtown, and strong community amenities, Birmingham 
                maintains strong property values even in changing market conditions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                The current market shows steady demand for Birmingham properties, with homes typically 
                selling within 30-45 days when priced correctly. Our cash offers are based on current 
                market values and recent sales in Birmingham.
              </p>
              <p className="text-lg text-gray-600">
                Whether you&apos;re looking to sell quickly or want to understand your property&apos;s current value, 
                we provide fair, market-based offers for all Birmingham properties.
              </p>
            </div>
            <div>
              <LeadForm 
                variant="inline"
                title="Get Your Property Value"
                subtitle="Find out what your Birmingham property is worth in today&apos;s market."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Birmingham Market Statistics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Current market data for Birmingham, Michigan properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$650,000</h3>
              <p className="text-gray-600">Average Home Price</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">35 Days</h3>
              <p className="text-gray-600">Average Days on Market</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Birmingham Area</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">7 Days</h3>
              <p className="text-gray-600">Our Average Closing Time</p>
            </div>
          </div>
        </div>
      </section>



      {/* Market Trends */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current Market Trends
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What we&apos;re seeing in the Birmingham real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Strong Demand</h3>
              <p className="text-gray-600 mb-4">
                Birmingham continues to attract families and professionals seeking excellent schools, 
                walkable amenities, and a strong community. Demand remains steady across all price points.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Family homes in good condition sell quickly</li>
                <li>• Downtown condos appeal to empty nesters</li>
                <li>• Luxury properties maintain premium values</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Price Stability</h3>
              <p className="text-gray-600 mb-4">
                Birmingham property values have remained relatively stable, with modest appreciation 
                across the area. Well-maintained homes continue to command premium prices.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Consistent property values across Birmingham</li>
                <li>• Good condition homes sell at or above asking</li>
                <li>• Investment properties show steady returns</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Inventory Levels</h3>
              <p className="text-gray-600 mb-4">
                Available inventory varies across Birmingham, with some areas experiencing lower 
                supply than demand. This creates opportunities for sellers in well-positioned properties.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Limited inventory in popular areas</li>
                <li>• New construction filling some gaps</li>
                <li>• Opportunities for quick sales</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cash Buyers</h3>
              <p className="text-gray-600 mb-4">
                Cash buyers like BHAM Houses provide an alternative to traditional listings, 
                offering speed and certainty for sellers who need to move quickly.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Fast closing times (7-30 days)</li>
                <li>• No repairs or improvements needed</li>
                <li>• Certainty of sale completion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Your Birmingham Property Value
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Find out what your Birmingham property is worth in today&apos;s market.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <LeadForm 
              variant="inline"
              title="Get Your Market Value"
              subtitle="Fill out the form and we&apos;ll provide a fair market analysis."
            />
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Prefer to Call?</h3>
              <p className="mb-4 text-blue-100">
                Speak directly with our Birmingham market specialists
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