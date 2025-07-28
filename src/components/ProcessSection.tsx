import { Phone, FileText, CheckCircle } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      icon: Phone,
      title: 'Contact Us',
      description: 'Fill out our form or call us. We\'ll ask a few questions about your Birmingham property. Tell us about your property address, condition, and timeline. No pressure, just information gathering.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: 'Get Your Cash Offer',
      description: 'We\'ll provide a fair cash offer within 24 hours based on current Birmingham market values. Our offer is based on recent sales in your neighborhood, property condition, and current market trends.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: CheckCircle,
      title: 'Close on Your Timeline',
      description: 'Close in as little as 7 days, or choose your own timeline. We work around your schedule. No repairs needed, no fees, no commissions. Our offer is what you walk away with.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Selling your Birmingham, MI house for cash is simple. Here's our straightforward 3-step process.
          </p>
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
          <p className="text-xl text-gray-700 mb-6">
            Ready to get started? It only takes a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Started Today</span>
            </a>
            <a href="tel:248XXXXXXX" className="btn-outline inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call (248) XXX-XXXX</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 