import { notFound } from 'next/navigation';
import { neighborhoods } from '@/data/neighborhoods';
import LeadForm from '@/components/LeadForm';
import { MapPin, Home, DollarSign, Clock } from 'lucide-react';

interface NeighborhoodPageProps {
  params: Promise<{ neighborhood: string }>;
}

export async function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({
    neighborhood: neighborhood.slug,
  }));
}

export async function generateMetadata({ params }: NeighborhoodPageProps) {
  const { neighborhood } = await params;
  const neighborhoodData = neighborhoods.find(n => n.slug === neighborhood);
  
  if (!neighborhoodData) {
    return {
      title: 'Neighborhood Not Found',
      description: 'The requested Birmingham neighborhood could not be found.',
    };
  }

  return {
    title: `Sell My House Fast ${neighborhoodData.name} Birmingham, MI - Cash Home Buyers`,
    description: `Sell your house fast in ${neighborhoodData.name}, Birmingham, MI. Get a fair cash offer in 24 hours, close in 7 days. No repairs, no fees, no commissions.`,
    keywords: [
      `sell house fast ${neighborhoodData.name} Birmingham MI`,
      `cash home buyers ${neighborhoodData.name} Birmingham Michigan`,
      `we buy houses ${neighborhoodData.name} Birmingham MI`,
      `${neighborhoodData.name} Birmingham cash buyers`,
      `sell house ${neighborhoodData.name} Birmingham Michigan`
    ].join(', '),
  };
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { neighborhood } = await params;
  const neighborhoodData = neighborhoods.find(n => n.slug === neighborhood);

  if (!neighborhoodData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-green-900/10"></div>
        <div className="container-max section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Sell Your House Fast in{' '}
                  <span className="text-gradient">{neighborhoodData.name}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Birmingham, Michigan's dedicated cash home buyers. Get a fair cash offer in 24 hours, close in 7 days. No repairs, no fees, no commissions.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Close in 7 days</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">No fees or commissions</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Serving {neighborhoodData.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Fair offers in 24 hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-3 text-2xl font-bold text-blue-600">
                  <MapPin className="w-6 h-6" />
                  <span>Call (248) XXX-XXXX</span>
                </div>
                <div className="text-gray-600">
                  <div className="font-medium">Get Cash Offer Online</div>
                  <div className="text-sm">Get Your {neighborhoodData.name} Cash Offer</div>
                </div>
              </div>
            </div>

            <div className="card-luxury">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your {neighborhoodData.name} Cash Offer</h2>
                <p className="text-gray-600">Fill out the form below and we'll contact you within 24 hours with your fair cash offer for your {neighborhoodData.name} property.</p>
              </div>
              <LeadForm
                title={`Get Your ${neighborhoodData.name} Cash Offer`}
                subtitle={`Fill out the form below and we'll contact you within 24 hours with your fair cash offer for your ${neighborhoodData.name} property.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Information */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About {neighborhoodData.name}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {neighborhoodData.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Types</h3>
              <p className="text-gray-700">
                {neighborhoodData.propertyTypes.join(', ')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Average Price</h3>
              <p className="text-gray-700">
                {neighborhoodData.averagePrice}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
              <p className="text-gray-700">
                {neighborhoodData.name}, Birmingham, MI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for This Neighborhood */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose BHAM Houses for {neighborhoodData.name}?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We specialize in buying houses in {neighborhoodData.name} and understand the unique characteristics of this Birmingham neighborhood.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Local Expertise</h3>
              <p className="text-gray-700">
                We know {neighborhoodData.name} inside and out, including market trends, property values, and selling considerations specific to this area.
              </p>
            </div>

            <div className="card">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fair Market Value</h3>
              <p className="text-gray-700">
                Our offers are based on recent sales in {neighborhoodData.name} and current market conditions, ensuring you get a competitive price.
              </p>
            </div>

            <div className="card">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Process</h3>
              <p className="text-gray-700">
                Close in as little as 7 days, or choose your own timeline. We work around your schedule, not ours.
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
              Ready to Sell Your {neighborhoodData.name} Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get your fair cash offer today. No obligation, no pressure, just a straightforward process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:248XXXXXXX" className="btn-secondary inline-flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Call (248) XXX-XXXX</span>
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