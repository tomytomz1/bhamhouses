import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Birmingham Homeowners Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what Birmingham, MI homeowners have to say about their experience with BHAM Houses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <p className="text-xs text-gray-500 mt-1">{testimonial.propertyType}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            Ready to join these satisfied Birmingham homeowners?
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