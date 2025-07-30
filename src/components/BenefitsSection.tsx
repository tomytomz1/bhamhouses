import { CheckCircle, DollarSign, Clock, Shield, Home, Calendar } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Birmingham Nightmare Properties Only',
      description: 'Foundation collapse in Birmingham neighborhoods? House condemned by the city? Structural damage from Michigan winters? Perfect - these disasters are exactly what we buy.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: DollarSign,
      title: 'Birmingham Crisis Response Team',
      description: 'Detroit-area drug houses, Oakland County hoarding situations, Oakland County foreclosures, probate nightmares - we handle Birmingham Metro disasters.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      title: 'Birmingham Life Crisis Response',
      description: 'Military deployment orders? Bankruptcy filing? Death in family requiring estate sale? Business failure? Lost auto job? Nightmare tenants destroying rental? We understand desperate Birmingham situations.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Home,
      title: 'Birmingham\'s No-Judgment Experts',
      description: 'Birmingham neighbors gossiping? City code enforcement threatening fines? Can\'t maintain property anymore? We\'ve helped hundreds of Birmingham families.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: 'When Birmingham Contractors Flee',
      description: 'Birmingham contractors won\'t even estimate? Local real estate agents refuse your listing? Other investors won\'t return calls? That\'s when we step in.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      title: 'Birmingham Crisis Timing',
      description: 'Military PCS orders in 30 days? Foreclosure hearing next week? Elderly parent needs nursing home deposit? Bankruptcy court deadline? IRS lien threatening seizure? Desperate timelines are our specialty.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-white to-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Birmingham Homeowners Choose Us for Their Property Disasters
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <strong>Birmingham residents facing impossible property situations:</strong> We specialize in disasters, emergencies, and houses that make other buyers run away. If your Birmingham home is a burden, we're your solution.
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="text-red-800 font-bold text-lg mb-2">
              🚨 BIRMINGHAM PROPERTY DISASTERS ONLY 🚨
            </div>
            <p className="text-red-700 text-sm">
              We DO NOT buy nice Birmingham homes that could sell through traditional real estate. If your Birmingham property is in good condition, please use a realtor. 
              We exclusively help Birmingham residents with property emergencies, disasters, and impossible situations.
            </p>
          </div>
          <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold">
            <span>Birmingham homeowner facing property disaster? We're here to help.</span>
          </div>
          <div className="mt-4">
            <a href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Birmingham Property Emergency Help</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 