'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { MapPin, Home, Wrench, Clock, User, Phone, Mail, Send, CheckCircle } from 'lucide-react';

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
}

export default function LeadForm({ title, subtitle }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
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
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-700">
          We've received your information and will contact you within 24 hours with your fair cash offer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {title && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </div>
      )}

      {/* Property Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Property Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('address')}
              type="text"
              placeholder="Enter your Birmingham property address"
              className="form-input pl-10"
            />
          </div>
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Birmingham Neighborhood *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select {...register('neighborhood')} className="form-select pl-10">
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
            <p className="text-red-600 text-sm mt-1">{errors.neighborhood.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Property Type *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select {...register('propertyType')} className="form-select pl-10">
                <option value="">Select property type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condo</option>
                <option value="townhome">Townhome</option>
                <option value="duplex">Duplex</option>
                <option value="multi-family">Multi-Family</option>
              </select>
            </div>
            {errors.propertyType && (
              <p className="text-red-600 text-sm mt-1">{errors.propertyType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Property Condition *
            </label>
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select {...register('condition')} className="form-select pl-10">
                <option value="">Select condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="needs-major-work">Needs Major Work</option>
              </select>
            </div>
            {errors.condition && (
              <p className="text-red-600 text-sm mt-1">{errors.condition.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Timeline *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select {...register('timeline')} className="form-select pl-10">
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="30-days">Within 30 days</option>
              <option value="60-days">Within 60 days</option>
              <option value="90-days">Within 90 days</option>
              <option value="just-exploring">Just exploring</option>
            </select>
          </div>
          {errors.timeline && (
            <p className="text-red-600 text-sm mt-1">{errors.timeline.message}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('name')}
              type="text"
              placeholder="Enter your full name"
              className="form-input pl-10"
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('phone')}
                type="tel"
                placeholder="(248) XXX-XXXX"
                className="form-input pl-10"
                onChange={handlePhoneChange}
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                placeholder="your.email@example.com"
                className="form-input pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
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