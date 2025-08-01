import { Clock, DollarSign, MapPin, Users, Shield, CheckCircle } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import Image from 'next/image';

export const metadata = {
  title: 'About Birmingham, MI Cash Buyers - BHAM Houses | Local Real Estate Experts',
  description: 'Learn about BHAM Houses, Birmingham, Michigan\'s dedicated cash home buyers. We specialize exclusively in Birmingham properties with deep local market knowledge.',
  keywords: 'Birmingham MI cash buyers, about Birmingham home buyers, BHAM Houses, Birmingham Michigan real estate experts',
};

export default function AboutPage() {
  const values = [
    {
      icon: MapPin,
      title: 'Birmingham Specialists',
      description: 'We focus exclusively on Birmingham, Michigan properties, giving us deep local market knowledge that competitors can\'t match.',
    },
    {
      icon: DollarSign,
      title: 'Fair Market Value',
      description: 'Our offers are based on current Birmingham market values and recent sales in the area.',
    },
    {
      icon: Clock,
      title: 'Fast & Flexible',
      description: 'Close in 7-90 days or choose your timeline. We work around your schedule, not ours.',
    },
    {
      icon: Users,
      title: 'Local Expertise',
      description: 'We know Birmingham, from downtown condos to luxury family homes throughout the area.',
    },
    {
      icon: Shield,
      title: 'Trusted Process',
      description: 'Transparent, straightforward process with no hidden fees or surprises. What we offer is what you get.',
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: 'Hundreds of satisfied Birmingham homeowners have trusted us with their property sales.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="hero-section relative">
        {/* Background Image with Frosted Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/birmingham-michigan-downtown.webp"
            alt="Downtown Birmingham, Michigan"
            fill
            className="object-cover"
            priority
          />
          {/* Frosted Overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-0 pb-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
              {/* Left Column - Content */}
              <div className="space-y-4 sm:space-y-6">
                {/* Main Headline */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                    About{' '}
                    <span className="text-gradient">BHAM Houses</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    Birmingham, Michigan's dedicated cash home buying company. We specialize in Birmingham properties, giving us deep local market knowledge that competitors can't match.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-xs sm:text-sm font-medium">Birmingham Focus</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-xs sm:text-sm font-medium">Fair Market Value</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    <span className="text-xs sm:text-sm font-medium">Fast Closing</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="hero-form bg-white/90 backdrop-blur-sm rounded-3xl shadow-luxury border border-gray-200 p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                <div className="text-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Get Your Birmingham Cash Offer</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Fill out the form below and we'll call you back to get property details.</p>
                </div>
                <LeadForm variant="inline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why We Chose Birmingham
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              While other companies spread themselves thin across 50+ cities, we made a conscious decision to focus exclusively on Birmingham, Michigan. This specialization allows us to provide better service and deeper market knowledge.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Our Birmingham Focus</h3>
              <p className="text-gray-700 leading-relaxed">
                Birmingham is a unique market with its own characteristics, challenges, and opportunities. By focusing exclusively here, we've developed deep expertise in Birmingham, from downtown condos to luxury family homes throughout the area.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We understand Birmingham's zoning laws, historic district requirements, property tax implications, and market trends better than any competitor. This specialized knowledge translates into better offers and smoother transactions for Birmingham homeowners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our commitment to Birmingham goes beyond just buying houses - we're invested in the community and understand what makes this area special to its residents.
              </p>
            </div>

            <div className="card-luxury">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Birmingham Market Expertise</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Deep knowledge of Birmingham, MI</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Understanding of Birmingham's historic district requirements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Knowledge of Birmingham property tax implications</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Familiarity with Birmingham zoning and development patterns</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Understanding of Birmingham's unique market dynamics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We believe in transparency, fairness, and putting Birmingham homeowners first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card group hover:shadow-luxury transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our straightforward process is designed to make selling your Birmingham home as simple and stress-free as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-700">
                Fill out our form or call us. We'll ask about your Birmingham property and your timeline.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Offer</h3>
              <p className="text-gray-700">
                We'll call you back to get property condition details and provide a fair cash offer within 24 hours.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Close on Your Timeline</h3>
              <p className="text-gray-700">
                Close in 7-90 days or choose your own timeline. No repairs needed, no fees, no commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-blue-900">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work with Birmingham's Specialists?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get your fair cash offer today. No obligation, no pressure, just a straightforward process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:5863241248" className="btn-secondary inline-flex items-center space-x-2">
                <span>Call (586) 324-1248</span>
              </a>
              <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center space-x-2">
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 