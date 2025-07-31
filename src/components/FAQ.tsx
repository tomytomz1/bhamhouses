'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '@/data/faqs';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="pt-16 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Selling Difficult Properties
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="text-blue-800 font-bold text-lg mb-2">
              💡 About Our Services
            </div>
            <p className="text-blue-700 text-sm">
              These questions are about properties that are difficult to sell through traditional real estate. If your house is in good condition, we recommend working with a realtor for the best price.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition duration-200 flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openItems.has(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openItems.has(faq.id) && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="text-blue-800 font-bold text-lg mb-2">
              💡 Don't See Your Situation Listed?
            </div>
            <p className="text-blue-700 text-sm">
              We handle many different types of challenging property situations. If you have a unique circumstance, give us a call - we're here to help.
            </p>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            Every challenging property situation has a solution. Let's discuss yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5863241248"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Call (586) 324-1248
            </a>
            <a
              href="/contact"
              className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Get Cash Offer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 