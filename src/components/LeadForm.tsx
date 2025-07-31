'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useCallback } from 'react';
import { MapPin, Wrench, User, Phone, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { getStoredUTMParams } from '@/utils/utmTracking';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import React from 'react';

const formSchema = z.object({
  address: z.string()
    .min(1, 'Birmingham property address is required')
    .refine((address) => {
      if (!address) return false;
      const lowerAddress = address.toLowerCase();
      return lowerAddress.includes('birmingham') && lowerAddress.includes('mi');
    }, 'Please enter a valid Birmingham, MI address. We only serve Birmingham, Michigan properties.'),
  condition: z.array(z.string()).min(1, 'Please select at least one property problem'),
  name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'inline' | 'two-column';
  textColor?: 'dark' | 'light';
}

export default function LeadForm({ 
  title = "Get Your Cash Offer", 
  subtitle = "Tell us about your property", 
  variant = 'default', 
  textColor = 'dark' 
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      condition: []
    }
  });

  const propertyConditions = [
    { value: 'fire-flood-damage', label: 'Fire/Flood/Storm Damage' },
    { value: 'foundation-structural', label: 'Foundation/Structural Issues' },
    { value: 'code-violations', label: 'Code Violations/Condemned' },
    { value: 'hoarding-situation', label: 'Hoarding Situation' },
    { value: 'foreclosure', label: 'Foreclosure/Liens' },
    { value: 'inheritance-probate', label: 'Inheritance/Probate' },
    { value: 'major-repairs-needed', label: 'Major Repairs Needed' },
    { value: 'other-problem', label: 'Other Problem' }
  ];

  const toggleCondition = (value: string) => {
    setSelectedConditions(prev => {
      if (prev.includes(value)) {
        const newConditions = prev.filter(c => c !== value);
        setValue('condition', newConditions);
        return newConditions;
      } else {
        const newConditions = [...prev, value];
        setValue('condition', newConditions);
        return newConditions;
      }
    });
  };

  const removeCondition = (value: string) => {
    setSelectedConditions(prev => {
      const newConditions = prev.filter(c => c !== value);
      setValue('condition', newConditions);
      return newConditions;
    });
  };

  const submitLead = useCallback(async (data: FormData) => {
    const utmParams = getStoredUTMParams();
    
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyAddress: data.address,
        propertyCondition: data.condition.join(', '),
        fullName: data.name,
        phone: data.phone,
        utmSource: utmParams.utm_source,
        utmMedium: utmParams.utm_medium,
        utmCampaign: utmParams.utm_campaign,
        utmTerm: utmParams.utm_term,
        utmContent: utmParams.utm_content,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('You\'ve submitted too many requests. Please wait a few minutes and try again.');
      }
      throw new Error(result.error || 'Failed to submit lead');
    }

    return result;
  }, []);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.multi-select-dropdown')) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Add click outside listener
  React.useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen, handleClickOutside]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await submitLead(data);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
        setSelectedConditions([]);
      }, 5000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    e.target.value = formatted;
  };

  if (isSubmitted) {
    return (
      <div className="hero-form bg-white/90 backdrop-blur-sm rounded-3xl shadow-luxury border border-gray-200 p-6 max-w-sm sm:max-w-md mx-auto lg:max-w-none">
        <div className="text-center py-4">
          <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-700 mb-3 text-sm">
            We've received your information and will call you back within 24 hours to get property details.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>What happens next?</strong><br />
              • We'll review your property details<br />
              • Get a fair market analysis<br />
              • Call you back within 24 hours<br />
              • No obligation, no pressure
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-form bg-white/90 backdrop-blur-sm rounded-3xl shadow-luxury border border-gray-200 p-6 max-w-sm sm:max-w-md mx-auto lg:max-w-none">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-3">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Submission Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-sm text-red-600 hover:text-red-800 mt-2 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Property Address */}
        <div>
          <label htmlFor="property-address" className="block text-sm font-semibold mb-1 text-gray-900">
            Property Address *
          </label>
          <div className="relative">
            <AddressAutocomplete
              value={watch('address') || ''}
              onChange={(value) => {
                setValue('address', value, { shouldValidate: true });
              }}
              placeholder="Enter your Birmingham property address"
              error={errors.address?.message}
            />
          </div>
        </div>

        {/* Property Condition */}
        <div>
          <label htmlFor="property-condition" className="block text-sm font-semibold mb-1 text-gray-900">
            What's Wrong With Your Property? *
          </label>
          <div className="relative">
            <div className="relative multi-select-dropdown">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="form-input pl-10 text-sm w-full text-left flex items-center justify-between text-gray-500"
                aria-describedby={errors.condition ? 'condition-error' : undefined}
              >
                <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <span>
                  {selectedConditions.length === 0 
                    ? 'Select problems' 
                    : selectedConditions.length === 1 
                    ? propertyConditions.find(c => c.value === selectedConditions[0])?.label
                    : `${selectedConditions.length} problems selected`
                  }
                </span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Selected conditions display */}
              <div className="mt-2 min-h-[32px]">
                {selectedConditions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedConditions.map(condition => {
                      const displayText = propertyConditions.find(c => c.value === condition)?.label;
                      return (
                        <span
                          key={condition}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {displayText}
                          <button
                            type="button"
                            onClick={() => removeCondition(condition)}
                            className="hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dropdown options */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {propertyConditions.map(condition => (
                    <label
                      key={condition.value}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition.value)}
                        onChange={() => toggleCondition(condition.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{condition.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          {errors.condition && (
            <p id="condition-error" className="text-red-600 text-sm mt-1" role="alert">{errors.condition.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="full-name" className="block text-sm font-semibold mb-1 text-gray-900">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              id="full-name"
              {...register('name')}
              type="text"
              placeholder="Enter your full name"
              className="form-input pl-10 text-sm w-full"
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
              name="name"
            />
          </div>
          {errors.name && (
            <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-1 text-gray-900">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              id="phone"
              {...register('phone')}
              type="tel"
              placeholder="Phone number"
              className="form-input pl-10 text-sm w-full"
              onChange={handlePhoneChange}
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
              name="phone"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2 text-sm py-3"
          aria-label={isSubmitting ? 'Submitting form' : 'Submit form to get cash offer'}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Get Cash Offer</span>
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-700">
          By submitting this form, you agree to be contacted by BHAM Houses regarding your property.
        </p>
      </form>
    </div>
  );
} 