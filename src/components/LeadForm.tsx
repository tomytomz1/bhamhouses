'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Wrench, User, Phone, Send, CheckCircle, AlertCircle, X, ChevronDown } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        setValue('condition', newConditions, { shouldValidate: true });
        return newConditions;
      } else {
        const newConditions = [...prev, value];
        setValue('condition', newConditions, { shouldValidate: true });
        return newConditions;
      }
    });
  };

  const removeCondition = (value: string) => {
    setSelectedConditions(prev => {
      const newConditions = prev.filter(c => c !== value);
      setValue('condition', newConditions, { shouldValidate: true });
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
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Add click outside listener
  useEffect(() => {
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
        <div className="text-center py-4 animate-bounceIn">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            We've received your information and will call you back within 24 hours to get property details.
          </p>
          <div className="alert alert-info">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-800 mb-1">What happens next?</p>
                <ul className="text-xs text-blue-700 space-y-0.5">
                  <li>• We'll review your property details</li>
                  <li>• Get a fair market analysis</li>
                  <li>• Call you back within 24 hours</li>
                  <li>• No obligation, no pressure</li>
                </ul>
              </div>
            </div>
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
        {/* Error Alert */}
        {error && (
          <div className="alert alert-error animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Submission Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button 
                type="button"
                onClick={() => setError(null)}
                className="text-sm text-red-600 hover:text-red-800 mt-2 underline focus-visible-ring"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Property Address - Enhanced */}
        <div>
          <label htmlFor="property-address" className="block text-sm font-semibold mb-1 text-gray-900">
            Property Address *
          </label>
          <AddressAutocomplete
            value={watch('address') || ''}
            onChange={(value) => {
              setValue('address', value, { shouldValidate: true });
            }}
            placeholder="Enter your Birmingham property address"
            error={errors.address?.message}
            className={errors.address ? 'input-error' : watch('address') && watch('address').toLowerCase().includes('birmingham') ? 'input-success' : ''}
          />
        </div>

        {/* Property Condition - Enhanced with better animations */}
        <div>
          <label htmlFor="property-condition" className="block text-sm font-semibold mb-1 text-gray-900">
            What's Wrong With Your Property? *
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`form-input text-sm w-full text-left flex items-center justify-between transition-all duration-200 hover-lift focus-visible-ring ${
                errors.condition ? 'input-error' : 'hover:border-blue-400'
              } ${selectedConditions.length > 0 ? 'text-gray-900' : 'text-gray-500'}`}
              aria-describedby={errors.condition ? 'condition-error' : undefined}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="flex items-center">
                <Wrench className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {selectedConditions.length === 0 
                    ? 'Select problems' 
                    : selectedConditions.length === 1 
                    ? propertyConditions.find(c => c.value === selectedConditions[0])?.label
                    : `${selectedConditions.length} problems selected`
                  }
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ml-2 flex-shrink-0 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Selected conditions display */}
            {selectedConditions.length > 0 && (
              <div className="mt-2 animate-fadeIn">
                <div className="flex flex-wrap gap-1">
                  {selectedConditions.map(condition => {
                    const displayText = propertyConditions.find(c => c.value === condition)?.label;
                    return (
                      <span
                        key={condition}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full animate-fadeIn hover-grow"
                      >
                        <span className="truncate-120">{displayText}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCondition(condition);
                          }}
                          className="hover:bg-blue-200 rounded-full p-0.5 transition-colors active-press focus-visible-ring"
                          aria-label={`Remove ${displayText}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dropdown options - Enhanced */}
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-luxury max-h-60 overflow-auto animate-slideDown dropdown-scroll">
                <div className="py-1">
                  {propertyConditions.map((condition) => (
                    <label
                      key={condition.value}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors hover-lift"
                      role="option"
                      aria-selected={selectedConditions.includes(condition.value)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition.value)}
                        onChange={() => toggleCondition(condition.value)}
                        className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus-visible-ring"
                        tabIndex={-1}
                      />
                      <span className="text-sm text-gray-700 select-none">{condition.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          {errors.condition && (
            <p id="condition-error" className="text-red-600 text-sm mt-1 animate-fadeIn flex items-center space-x-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.condition.message}</span>
            </p>
          )}
        </div>

        {/* Full Name - Enhanced */}
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
              className={`form-input pl-10 text-sm w-full transition-all duration-200 hover-lift focus-visible-ring ${
                errors.name ? 'input-error' : watch('name') ? 'input-success' : ''
              }`}
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
            />
          </div>
          {errors.name && (
            <p id="name-error" className="text-red-600 text-sm mt-1 animate-fadeIn flex items-center space-x-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        {/* Phone Number - Enhanced */}
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
              className={`form-input pl-10 text-sm w-full transition-all duration-200 hover-lift focus-visible-ring ${
                errors.phone ? 'input-error' : watch('phone') && watch('phone').length >= 10 ? 'input-success' : ''
              }`}
              onChange={handlePhoneChange}
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-sm mt-1 animate-fadeIn flex items-center space-x-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button - Enhanced */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2 text-sm py-3 transition-all duration-200 hover-lift active-press focus-visible-ring disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isSubmitting ? 'Submitting form' : 'Submit form to get cash offer'}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner w-4 h-4"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Get Cash Offer</span>
            </>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-center text-gray-700 leading-relaxed">
          By submitting this form, you agree to be contacted by BHAM Houses regarding your property.
        </p>
      </form>
    </div>
  );
}