'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { MapPin, Home, Wrench, Clock, User, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { getStoredUTMParams } from '@/utils/utmTracking';
import { CONTACT_INFO } from '@/utils/contactInfo';

const formSchema = z.object({
  address: z.string().min(1, 'Property address is required'),
  neighborhood: z.string().min(1, 'Please select your neighborhood'),
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
  variant?: 'default' | 'inline';
}

export default function LeadForm({ title, subtitle, variant = 'default' }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get UTM parameters
      const utmParams = getStoredUTMParams();
      
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyAddress: data.address,
          neighborhood: data.neighborhood,
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
        throw new Error(result.error || 'Failed to submit lead');
      }

      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 5000);

    } catch (err) {
      console.error('Lead submission error:', err);
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
      <div className="text-center py-6 sm:py-8">
        <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
          We've received your information and will contact you within 24 hours with your fair cash offer.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-blue-800">
            <strong>What happens next?</strong><br />
            • We'll review your property details<br />
            • Get a fair market analysis<br />
            • Contact you within 24 hours<br />
            • No obligation, no pressure
          </p>
        </div>
      </div>
    );
  }

  const containerClass = variant === 'inline' ? 'space-y-3 sm:space-y-4' : 'space-y-4 sm:space-y-6';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass}>
      {title && (
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{title}</h3>
          {subtitle && <p className="text-gray-600 text-xs sm:text-sm">{subtitle}</p>}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start space-x-2 sm:space-x-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs sm:text-sm font-medium text-red-800">Submission Error</p>
            <p className="text-xs sm:text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Property Information */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
            Property Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              {...register('address')}
              type="text"
              placeholder="Enter your Birmingham property address"
              className="form-input pl-10 text-sm sm:text-base"
            />
          </div>
          {errors.address && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
            Birmingham Neighborhood *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select {...register('neighborhood')} className="form-select pl-10 text-sm sm:text-base">
              <option value="">Select your neighborhood</option>
              <option value="downtown">Downtown Birmingham</option>
              <option value="shain-park">Shain Park</option>
              <option value="bloomfield-ridge">Bloomfield Ridge</option>
              <option value="village">The Village</option>
              <option value="wellspring">Wellspring</option>
              <option value="maplewood">Maplewood</option>
              <option value="estates">Birmingham Estates</option>
              <option value="manor">Birmingham Manor</option>
              <option value="villas">Birmingham Villas</option>
              <option value="buckingham-village">Buckingham Village</option>
              <option value="woodward-corridor">Woodward Corridor</option>
              <option value="rouge-river">Rouge River Area</option>
              <option value="lincoln-hills">Lincoln Hills Golf Course Area</option>
              <option value="booth-park">Booth Park Area</option>
              <option value="theatre-district">Birmingham Theatre District</option>
            </select>
          </div>
          {errors.neighborhood && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.neighborhood.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
              Property Type *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select {...register('propertyType')} className="form-select pl-10 text-sm sm:text-base">
                <option value="">Select property type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condo</option>
                <option value="townhome">Townhome</option>
                <option value="duplex">Duplex</option>
                <option value="multi-family">Multi-Family</option>
              </select>
            </div>
            {errors.propertyType && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.propertyType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
              Property Condition *
            </label>
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select {...register('condition')} className="form-select pl-10 text-sm sm:text-base">
                <option value="">Select condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="needs-major-work">Needs Major Work</option>
              </select>
            </div>
            {errors.condition && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.condition.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
            Timeline *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select {...register('timeline')} className="form-select pl-10 text-sm sm:text-base">
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="30-days">Within 30 days</option>
              <option value="60-days">Within 60 days</option>
              <option value="90-days">Within 90 days</option>
              <option value="just-exploring">Just exploring</option>
            </select>
          </div>
          {errors.timeline && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.timeline.message}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              {...register('name')}
              type="text"
              placeholder="Enter your full name"
              className="form-input pl-10 text-sm sm:text-base"
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                {...register('phone')}
                type="tel"
                placeholder={CONTACT_INFO.phone}
                className="form-input pl-10 text-sm sm:text-base"
                onChange={handlePhoneChange}
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                placeholder="your.email@example.com"
                className="form-input pl-10 text-sm sm:text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-2 sm:py-3"
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

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted by BHAM Houses regarding your property.
      </p>
    </form>
  );
} 