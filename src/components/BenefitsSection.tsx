import { CheckCircle, DollarSign, Clock, Shield, Home, Calendar } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'No Repairs Needed',
      description: 'We buy houses in any condition - no repairs, cleaning, or improvements required.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: DollarSign,
      title: 'Zero Fees or Commissions',
      description: 'No realtor fees, closing costs, or hidden charges. Our offer is what you get.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      title: 'Fast Closing',
      description: 'Close in 7-90 days, or choose your own timeline. We work around your schedule.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Home,
      title: 'Fair Cash Offers',
      description: 'Get a call back within 24 hours to discuss your property condition and provide a competitive cash offer.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: 'As-Is Purchase',
      description: 'Sell your house exactly as it is. No inspections, appraisals, or contingencies.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      title: 'Choose Your Closing Date',
      description: 'Need to close quickly or wait for your new home? We accommodate your timeline.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-white to-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose BHAM Houses?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Birmingham, MI's dedicated cash home buyers. We make selling your house simple, fast, and stress-free.
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
          <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold">
            <span>Ready to experience the BHAM Houses difference?</span>
          </div>
          <div className="mt-4">
            <a href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Your Cash Offer Today</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 