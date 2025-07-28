import Link from 'next/link';
import { neighborhoods } from '@/data/neighborhoods';

export default function NeighborhoodsGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We Serve All Birmingham, MI Neighborhoods
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From downtown condos to luxury family homes, we buy properties in every Birmingham neighborhood. 
            Click on any area to learn more about selling your house in that specific neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.id}
              href={`/${neighborhood.slug}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {neighborhood.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition duration-200">
                  {neighborhood.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {neighborhood.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {neighborhood.propertyTypes.slice(0, 2).map((type) => (
                    <span
                      key={type}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {type}
                    </span>
                  ))}
                  {neighborhood.propertyTypes.length > 2 && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{neighborhood.propertyTypes.length - 2} more
                    </span>
                  )}
                </div>
                
                {neighborhood.averagePrice && (
                  <p className="text-sm text-gray-500">
                    Avg. Price: {neighborhood.averagePrice}
                  </p>
                )}
                
                <div className="mt-4 text-blue-600 font-medium text-sm group-hover:text-blue-700 transition duration-200">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            Don't see your neighborhood? We buy houses throughout Birmingham, MI!
          </p>
          <a
            href="tel:248XXXXXXX"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition duration-200"
          >
            Call (248) XXX-XXXX
          </a>
        </div>
      </div>
    </section>
  );
} 