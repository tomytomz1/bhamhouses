import { Phone, FileText, CheckCircle } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      icon: Phone,
      title: 'Tell Us Your Birmingham Disaster',
      description: 'Call our Birmingham crisis line. Describe your nightmare: foundation damage from Michigan freeze-thaw, fire from faulty furnace, Birmingham code violations, Oakland County foreclosure, inherited family disaster - the worse, the better.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: 'We Visit Your Birmingham Nightmare',
      description: 'We\'ll drive to your Birmingham property and assess the disaster. Structural collapse? Mold from Michigan humidity? Neighbor complaints? City fines? No judgment - we make cash offers on disasters.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: CheckCircle,
      title: 'Birmingham Emergency Closings',
      description: 'Foreclosure hearing in Oakland County next week? Birmingham code enforcement deadline? Hospital bills crushing you? We close emergency deals in Michigan in days, not months.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How We Solve Birmingham Property Disasters
          </h2>
          <div className="text-xl text-gray-700 max-w-3xl mx-auto">
            <p className="mb-2">Birmingham homeowner facing property crisis? Here's our emergency response process.</p>
            <p className="font-semibold text-red-600">Birmingham disasters get priority response - we move fast when you're desperate.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                {index + 1}
              </div>

              {/* Step Card */}
              <div className="card-luxury text-center pt-8">
                <div className={`w-20 h-20 ${step.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transform -translate-y-1/2 z-0"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="text-yellow-800 font-bold text-lg mb-2">
              🚨 Birmingham Property Emergency? Don't Wait!
            </div>
            <p className="text-yellow-700 text-sm">
              Oakland County foreclosure notice? Birmingham code enforcement breathing down your neck? House falling apart and can't afford repairs? We respond to Birmingham crises immediately.
            </p>
          </div>
          <p className="text-xl text-gray-700 mb-6">
            Birmingham homeowner ready to escape your property nightmare? We turn impossible situations into cash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Birmingham Emergency Help</span>
            </a>
            <a href="tel:5863241248" className="btn-outline inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Birmingham Crisis Line: (586) 324-1248</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 