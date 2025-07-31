import { CheckCircle, DollarSign, Clock, Shield, Home, Calendar } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Challenging Properties Welcome',
      description: 'Foundation issues, structural damage, code violations, or properties that need significant repairs - we understand these situations and provide fair cash offers.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: DollarSign,
      title: 'Fair Cash Offers',
      description: 'We provide honest, fair cash offers for Birmingham properties that are difficult to sell through traditional real estate, regardless of condition or circumstances.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      title: 'Quick Solutions for Urgent Needs',
      description: 'Relocating for work? Inherited a property? Need to sell quickly? We understand timing constraints and can close in as little as 7 days.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Home,
      title: 'Professional & Understanding',
      description: 'We handle every situation with professionalism and understanding. Whether it\'s a property that needs work or circumstances requiring a quick sale.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: 'When Traditional Real Estate Won\'t Work',
      description: 'Properties that realtors won\'t list, homes that need too much work for conventional buyers, or situations requiring a quick, hassle-free sale.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      title: 'Flexible Closing Timeline',
      description: 'Need to close quickly? We can accommodate your timeline. Whether it\'s 7 days or 90 days, we work with your schedule and needs.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-white to-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Birmingham Homeowners Choose Us for Difficult-to-Sell Properties
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <strong>Birmingham residents facing challenging property situations:</strong> We specialize in homes that are difficult to sell through traditional real estate, whether due to condition, timing, or circumstances. We provide fair cash offers and professional service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="card group hover:shadow-luxury transition-all duration-300">
              <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="text-blue-800 font-bold text-lg mb-2">
              💡 We Specialize in Difficult-to-Sell Properties
            </div>
            <p className="text-blue-700 text-sm">
              We focus on Birmingham properties that are challenging to sell through traditional real estate. If your home is in good condition and can sell normally, we recommend working with a realtor for the best price.
            </p>
          </div>
          <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold">
            <span>Need to sell a challenging Birmingham property? We're here to help.</span>
          </div>
          <div className="mt-4">
            <a href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Your Fair Cash Offer</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 