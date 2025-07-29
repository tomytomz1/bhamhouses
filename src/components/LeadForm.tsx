'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useCallback } from 'react';
import { Home, Wrench, Clock, User, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { getStoredUTMParams } from '@/utils/utmTracking';
import { CONTACT_INFO } from '@/utils/contactInfo';
import AddressAutocomplete from '@/components/AddressAutocomplete';

const formSchema = z.object({
  address: z.string().min(1, 'Property address is required'),
  propertyType: z.string().min(1, 'Please select property type'),
  condition: z.string().min(1, 'Please select property condition'),
  timeline: z.string().min(1, 'Please select your timeline'),
  name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'inline' | 'two-column';
  textColor?: 'dark' | 'light';
}

export default function LeadForm({ title, subtitle, variant = 'default', textColor = 'dark' }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });


  const submitLead = useCallback(async (data: FormData) => {
    const utmParams = getStoredUTMParams();
    
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyAddress: data.address,
        propertyType: data.propertyType,
        propertyCondition: data.condition,
        timeline: data.timeline,
        fullName: data.name,
        phone: data.phone,
        email: data.email,
        utmSource: utmParams.utm_source,
        utmMedium: utmParams.utm_medium,
        utmCampaign: utmParams.utm_campaign,
        utmTerm: utmParams.utm_term,
        utmContent: utmParams.utm_content,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        throw new Error('You\'ve submitted too many requests. Please wait a few minutes and try again.');
      }
      throw new Error(result.error || 'Failed to submit lead');
    }

    return result;
  }, []);

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
      <div className="text-center py-4 sm:py-6">
        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-2 sm:mb-3" />
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Thank You!</h3>
        <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">
          We've received your information and will call you back within 24 hours to get property details.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
          <p className="text-xs text-blue-800">
            <strong>What happens next?</strong><br />
            • We'll review your property details<br />
            • Get a fair market analysis<br />
            • Call you back within 24 hours<br />
            • No obligation, no pressure
          </p>
        </div>
      </div>
    );
  }

  const containerClass = variant === 'inline' ? 'space-y-4 sm:space-y-5' : 'space-y-5 sm:space-y-6';

  // Helper functions for text colors
  const getTitleColor = () => textColor === 'light' ? 'text-gray-900' : 'text-gray-900';
  const getSubtitleColor = () => textColor === 'light' ? 'text-gray-600' : 'text-gray-700';
  const getLabelColor = () => textColor === 'light' ? 'text-gray-800' : 'text-gray-900';
  const getDisclaimerColor = () => textColor === 'light' ? 'text-gray-600' : 'text-gray-700';

  // Handle different variants
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {title && (
          <div className="text-center mb-3 lg:col-span-2">
            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${getTitleColor()}`}>{title}</h3>
            {subtitle && <p className={`text-sm ${getSubtitleColor()}`}>{subtitle}</p>}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start space-x-3 lg:col-span-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
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

        {/* Property Address - Full Width */}
        <div className="lg:col-span-2">
                      <label htmlFor="property-address" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
              Property Address *
            </label>
          <AddressAutocomplete
            value={watch('address') || ''}
            onChange={(value) => {
              setValue('address', value, { shouldValidate: true });
            }}
            placeholder="Enter your Birmingham property address"
            error={errors.address?.message}
            aria-label="Property address input with autocomplete"
            aria-required="true"
            aria-invalid={errors.address ? 'true' : 'false'}
            aria-describedby={errors.address ? 'address-error' : undefined}
          />
          {errors.address && (
            <p id="address-error" className="text-red-600 text-sm mt-1" role="alert">{errors.address.message}</p>
          )}
        </div>

        {/* Property Type */}
        <div>
          <label htmlFor="property-type" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
            Property Type *
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
            <select 
              id="property-type"
              {...register('propertyType')} 
              className="form-select pl-10 text-sm sm:text-base w-full"
              aria-required="true"
              aria-invalid={errors.propertyType ? 'true' : 'false'}
              aria-describedby={errors.propertyType ? 'property-type-error' : undefined}
            >
              <option value="">Select property type</option>
              <option value="single-family">Single Family Home</option>
              <option value="condo">Condo</option>
              <option value="townhome">Townhome</option>
              <option value="duplex">Duplex</option>
              <option value="multi-family">Multi-Family</option>
            </select>
          </div>
          {errors.propertyType && (
            <p id="property-type-error" className="text-red-600 text-sm mt-1" role="alert">{errors.propertyType.message}</p>
          )}
        </div>

        {/* Property Condition */}
        <div>
          <label htmlFor="property-condition" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
            Property Condition *
          </label>
          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
            <select 
              id="property-condition"
              {...register('condition')} 
              className="form-select pl-10 text-sm sm:text-base w-full"
              aria-required="true"
              aria-invalid={errors.condition ? 'true' : 'false'}
              aria-describedby={errors.condition ? 'condition-error' : undefined}
            >
              <option value="">Select condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="needs-major-work">Needs Major Work</option>
            </select>
          </div>
          {errors.condition && (
            <p id="condition-error" className="text-red-600 text-sm mt-1" role="alert">{errors.condition.message}</p>
          )}
        </div>

        {/* Timeline - Full Width */}
        <div className="lg:col-span-2">
          <label htmlFor="timeline" className={`block text-sm font-semibold mb-2 ${getLabelColor()}`}>
            Timeline *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
            <select 
              id="timeline"
              {...register('timeline')} 
              className="form-select pl-10 text-sm sm:text-base w-full text-gray-900"
              aria-required="true"
              aria-invalid={errors.timeline ? 'true' : 'false'}
              aria-describedby={errors.timeline ? 'timeline-error' : undefined}
            >
              <option value="" className="text-gray-900">Select timeline</option>
              <option value="asap" className="text-gray-900">ASAP</option>
              <option value="30-days" className="text-gray-900">Within 30 days</option>
              <option value="60-days" className="text-gray-900">Within 60 days</option>
              <option value="90-days" className="text-gray-900">Within 90 days</option>
              <option value="just-exploring" className="text-gray-900">Just exploring</option>
            </select>
          </div>
          {errors.timeline && (
            <p id="timeline-error" className="text-red-600 text-sm mt-1" role="alert">{errors.timeline.message}</p>
          )}
        </div>

        {/* Full Name - Full Width */}
        <div className="lg:col-span-2">
          <label htmlFor="full-name" className={`block text-sm font-semibold mb-2 ${getLabelColor()}`}>
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
            <input
              id="full-name"
              {...register('name')}
              type="text"
              placeholder="Enter your full name"
              className="form-input pl-10 text-sm sm:text-base w-full"
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
            />
          </div>
          {errors.name && (
            <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
            <input
              id="phone"
              {...register('phone')}
              type="tel"
              placeholder="Phone number"
              className="form-input pl-10 text-sm sm:text-base w-full"
              onChange={handlePhoneChange}
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">{errors.phone.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
            <input
              id="email"
              {...register('email')}
              type="email"
              placeholder="Email address"
              className="form-input pl-10 text-sm sm:text-base w-full"
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-3 sm:py-4 lg:col-span-2"
          aria-label={isSubmitting ? 'Submitting lead form' : 'Submit lead form to get cash offer'}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Get My Fair Cash Offer</span>
            </>
          )}
        </button>

        <p className={`text-xs lg:text-[10px] text-center lg:col-span-2 lg:whitespace-nowrap ${getDisclaimerColor()}`}>
          By submitting this form, you agree to be contacted by BHAM Houses regarding your property.
        </p>
      </form>
    );
  }

  if (variant === 'two-column') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {title && (
          <div className="text-center mb-3 sm:mb-4 lg:col-span-2">
            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${getTitleColor()}`}>{title}</h3>
            {subtitle && <p className={`text-sm ${getSubtitleColor()}`}>{subtitle}</p>}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start space-x-3 lg:col-span-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
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

        {/* Left Column - Property Information */}
        <div className="space-y-3">
          {/* Property Address */}
          <div>
            <label htmlFor="property-address" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
              Property Address *
            </label>
            <AddressAutocomplete
              value={watch('address') || ''}
              onChange={(value) => {
                setValue('address', value, { shouldValidate: true });
              }}
              placeholder="Enter your Birmingham property address"
              error={errors.address?.message}
              aria-label="Property address input with autocomplete"
              aria-required="true"
              aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <p id="address-error" className="text-red-600 text-sm mt-1" role="alert">{errors.address.message}</p>
            )}
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="property-type" className={`block text-sm font-semibold mb-2 ${getLabelColor()}`}>
              Property Type *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <select 
                id="property-type"
                {...register('propertyType')} 
                className="form-select pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.propertyType ? 'true' : 'false'}
                aria-describedby={errors.propertyType ? 'property-type-error' : undefined}
              >
                <option value="" className="text-gray-500">Select property type</option>
                <option value="single-family" className="text-gray-900">Single Family Home</option>
                <option value="condo" className="text-gray-900">Condo</option>
                <option value="townhome" className="text-gray-900">Townhome</option>
                <option value="duplex" className="text-gray-900">Duplex</option>
                <option value="multi-family" className="text-gray-900">Multi-Family</option>
              </select>
            </div>
            {errors.propertyType && (
              <p id="property-type-error" className="text-red-600 text-sm mt-1" role="alert">{errors.propertyType.message}</p>
            )}
          </div>

          {/* Property Condition */}
          <div>
            <label htmlFor="property-condition" className={`block text-sm font-semibold mb-2 ${getLabelColor()}`}>
              Property Condition *
            </label>
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <select 
                id="property-condition"
                {...register('condition')} 
                className="form-select pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.condition ? 'true' : 'false'}
                aria-describedby={errors.condition ? 'condition-error' : undefined}
              >
                <option value="" className="text-gray-500">Select condition</option>
                <option value="excellent" className="text-gray-900">Excellent</option>
                <option value="good" className="text-gray-900">Good</option>
                <option value="fair" className="text-gray-900">Fair</option>
                <option value="poor" className="text-gray-900">Poor</option>
                <option value="needs-major-work" className="text-gray-900">Needs Major Work</option>
              </select>
            </div>
            {errors.condition && (
              <p id="condition-error" className="text-red-600 text-sm mt-1" role="alert">{errors.condition.message}</p>
            )}
          </div>

                  {/* Timeline */}
        <div>
          <label htmlFor="timeline" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
            Timeline *
          </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <select 
                id="timeline"
                {...register('timeline')} 
                className="form-select pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.timeline ? 'true' : 'false'}
                aria-describedby={errors.timeline ? 'timeline-error' : undefined}
              >
                <option value="" className="text-gray-500">Select timeline</option>
                <option value="asap" className="text-gray-900">ASAP</option>
                <option value="30-days" className="text-gray-900">Within 30 days</option>
                <option value="60-days" className="text-gray-900">Within 60 days</option>
                <option value="90-days" className="text-gray-900">Within 90 days</option>
                <option value="just-exploring" className="text-gray-900">Just exploring</option>
              </select>
            </div>
            {errors.timeline && (
              <p id="timeline-error" className="text-red-600 text-sm mt-1" role="alert">{errors.timeline.message}</p>
            )}
          </div>
        </div>

        {/* Right Column - Contact Information */}
        <div className="space-y-3">
                  {/* Full Name */}
        <div>
          <label htmlFor="full-name" className={`block text-sm font-semibold mb-1 ${getLabelColor()}`}>
            Full Name *
          </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <input
                id="full-name"
                {...register('name')}
                type="text"
                placeholder="Enter your full name"
                className="form-input pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className={`block text-sm font-semibold mb-2 ${getLabelColor()}`}>
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <input
                id="phone"
                {...register('phone')}
                type="tel"
                placeholder="Phone number"
                className="form-input pl-10 text-sm sm:text-base w-full"
                onChange={handlePhoneChange}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">{errors.phone.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${getLabelColor()}`}>
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <input
                id="email"
                {...register('email')}
                type="email"
                placeholder="your.email@example.com"
                className="form-input pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button - Full Width */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-3 sm:py-4"
            aria-label={isSubmitting ? 'Submitting lead form' : 'Submit lead form to get cash offer'}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Get My Fair Cash Offer</span>
              </>
            )}
          </button>

          <p className={`text-xs lg:text-[10px] text-center mt-2 lg:whitespace-nowrap ${getDisclaimerColor()}`}>
            By submitting this form, you agree to be contacted by BHAM Houses regarding your property.
          </p>
        </div>
      </form>
    );
  }

  // Default variant
  return (
    <div className="space-y-3">
      {/* Form Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {title && (
          <div className="text-center mb-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{title}</h3>
            {subtitle && <p className="text-gray-700 text-sm">{subtitle}</p>}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start space-x-3 mb-6">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Property Address - Full Width */}
          <div className="border-b border-gray-200 pb-4">
            <label htmlFor="property-address" className="block text-sm font-semibold text-gray-900 mb-2">
              Property Address:
            </label>
            <AddressAutocomplete
              value={watch('address') || ''}
              onChange={(value) => {
                setValue('address', value, { shouldValidate: true });
              }}
              placeholder="Enter your Birmingham property address"
              error={errors.address?.message}
              aria-label="Property address input with autocomplete"
              aria-required="true"
              aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <p id="address-error" className="text-red-600 text-sm mt-1" role="alert">{errors.address.message}</p>
            )}
          </div>

          {/* Property Type and Condition - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-b border-gray-200 pb-4">
            <div>
              <label htmlFor="property-type" className="block text-sm font-semibold text-gray-900 mb-2">
                Property Type:
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                <select 
                  id="property-type"
                  {...register('propertyType')} 
                  className="form-select pl-10 text-sm sm:text-base w-full text-gray-400"
                  aria-required="true"
                  aria-invalid={errors.propertyType ? 'true' : 'false'}
                  aria-describedby={errors.propertyType ? 'property-type-error' : undefined}
                >
                  <option value="" className="text-gray-400">Select property type</option>
                  <option value="single-family" className="text-gray-900">Single Family Home</option>
                  <option value="condo" className="text-gray-900">Condo</option>
                  <option value="townhome" className="text-gray-900">Townhome</option>
                  <option value="duplex" className="text-gray-900">Duplex</option>
                  <option value="multi-family" className="text-gray-900">Multi-Family</option>
                </select>
              </div>
              {errors.propertyType && (
                <p id="property-type-error" className="text-red-600 text-sm mt-1" role="alert">{errors.propertyType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="property-condition" className="block text-sm font-semibold text-gray-900 mb-2">
                Property Condition:
              </label>
              <div className="relative">
                <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                <select 
                  id="property-condition"
                  {...register('condition')} 
                  className="form-select pl-10 text-sm sm:text-base w-full text-gray-400"
                  aria-required="true"
                  aria-invalid={errors.condition ? 'true' : 'false'}
                  aria-describedby={errors.condition ? 'condition-error' : undefined}
                >
                  <option value="" className="text-gray-400">Select condition</option>
                  <option value="excellent" className="text-gray-900">Excellent</option>
                  <option value="good" className="text-gray-900">Good</option>
                  <option value="fair" className="text-gray-900">Fair</option>
                  <option value="poor" className="text-gray-900">Poor</option>
                  <option value="needs-major-work" className="text-gray-900">Needs Major Work</option>
                </select>
              </div>
              {errors.condition && (
                <p id="condition-error" className="text-red-600 text-sm mt-1" role="alert">{errors.condition.message}</p>
              )}
            </div>
          </div>

          {/* Timeline - Full Width */}
          <div className="border-b border-gray-200 pb-4">
            <label htmlFor="timeline" className="block text-sm font-semibold text-gray-900 mb-2">
              Timeline:
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <select 
                id="timeline"
                {...register('timeline')} 
                className="form-select pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.timeline ? 'true' : 'false'}
                aria-describedby={errors.timeline ? 'timeline-error' : undefined}
              >
                <option value="" className="text-gray-500">Select timeline</option>
                <option value="asap" className="text-gray-900">ASAP</option>
                <option value="30-days" className="text-gray-900">Within 30 days</option>
                <option value="60-days" className="text-gray-900">Within 60 days</option>
                <option value="90-days" className="text-gray-900">Within 90 days</option>
                <option value="just-exploring" className="text-gray-900">Just exploring</option>
              </select>
            </div>
            {errors.timeline && (
              <p id="timeline-error" className="text-red-600 text-sm mt-1" role="alert">{errors.timeline.message}</p>
            )}
          </div>

          {/* Full Name - Full Width */}
          <div className="border-b border-gray-200 pb-4">
            <label htmlFor="full-name" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name:
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
              <input
                id="full-name"
                {...register('name')}
                type="text"
                placeholder="Enter your full name"
                className="form-input pl-10 text-sm sm:text-base w-full"
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number and Email - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-b border-gray-200 pb-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number:
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="phone"
                  {...register('phone')}
                  type="tel"
                  placeholder="Phone number"
                  className="form-input pl-10 text-sm sm:text-base w-full"
                  onChange={handlePhoneChange}
                  aria-required="true"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && (
                <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address:
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="email"
                  {...register('email')}
                  type="email"
                  placeholder="Email address"
                  className="form-input pl-10 text-sm sm:text-base w-full"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-3 sm:py-4"
              aria-label={isSubmitting ? 'Submitting lead form' : 'Submit lead form to get cash offer'}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Get My Fair Cash Offer</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs lg:text-[10px] text-gray-700 text-center pt-2 lg:whitespace-nowrap">
            By submitting this form, you agree to be contacted by BHAM Houses regarding your property.
          </p>
        </form>
      </div>

      {/* Call Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Prefer to Call?</h3>
        <p className="mb-6 text-gray-700">Speak directly with our Birmingham specialists</p>
        <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition duration-200">
          <Phone className="w-5 h-5 mr-2" />
          Call {CONTACT_INFO.phone}
        </a>
      </div>
    </div>
  );
} 