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
            Frequently Asked Questions About Problem Properties
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="text-red-800 font-bold text-lg mb-2">
              ⚠️ IMPORTANT: We Only Buy Problem Properties
            </div>
            <p className="text-red-700 text-sm">
              These questions are about distressed, damaged, and problem properties. If your house is in good condition and could sell on MLS, these answers don't apply to you.
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="text-yellow-800 font-bold text-lg mb-2">
              🚨 Don't See Your Specific Problem Listed?
            </div>
            <p className="text-yellow-700 text-sm">
              We've seen it all: structural collapses, environmental hazards, legal nightmares, condemned properties, and situations others won't touch. Call us - there's no problem too big.
            </p>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            Every property nightmare has a solution. Let's discuss yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5863241248"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Emergency Line: (586) 324-1248
            </a>
            <a
              href="/contact"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Describe Your Problem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 