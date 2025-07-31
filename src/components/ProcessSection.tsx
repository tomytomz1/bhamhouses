import { Phone, FileText, CheckCircle } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      icon: Phone,
      title: 'Tell Us About Your Situation',
      description: 'Call our Birmingham office or fill out our form. Describe your property and circumstances - whether it\'s condition issues, timing constraints, or other challenges that make selling difficult.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: 'We Assess Your Property',
      description: 'We\'ll visit your Birmingham property to understand its condition and your situation. We provide honest assessments and fair cash offers based on what we see.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: CheckCircle,
      title: 'Quick, Hassle-Free Closing',
      description: 'Need to close quickly? We can accommodate your timeline. Whether it\'s 7 days or 90 days, we work with your schedule to make the process as smooth as possible.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How We Help Birmingham Homeowners Sell Difficult Properties
          </h2>
          <div className="text-xl text-gray-700 max-w-3xl mx-auto">
            <p className="mb-2">Birmingham homeowner with a challenging property situation? Here\'s our simple, professional process.</p>
            <p className="font-semibold text-blue-600">We provide fair cash offers and work with your timeline to make selling as easy as possible.</p>
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="text-blue-800 font-bold text-lg mb-2">
              💡 Need to Sell Your Birmingham Home Quickly?
            </div>
            <p className="text-blue-700 text-sm">
              Whether it\'s condition issues, timing constraints, or other circumstances - we provide fair cash offers for properties that are difficult to sell through traditional real estate.
            </p>
          </div>
          <p className="text-xl text-gray-700 mb-6">
            Birmingham homeowner ready to sell your challenging property? We\'re here to help with a fair, professional solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Your Fair Cash Offer</span>
            </a>
            <a href="tel:5863241248" className="btn-outline inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call (586) 324-1248</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 