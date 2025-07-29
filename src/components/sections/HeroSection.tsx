import React from 'react';
import Image from 'next/image';
import { Clock, DollarSign, MapPin, Handshake, Phone } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import { CONTACT_INFO } from '@/utils/contactInfo';
import Icon from '@/components/ui/Icon';
import { LucideIcon } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  benefits?: Array<{
    icon: LucideIcon;
    text: string;
    color: 'blue' | 'green' | 'orange' | 'blue';
  }>;
  showForm?: boolean;
  backgroundImage?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Sell Your House Fast in Birmingham, MI",
      subtitle = "Birmingham, Michigan's dedicated cash home buyers. Get a call back in 24 hours, close in 7-90 days. No repairs, no fees, no commissions.",
  benefits = [
          { icon: Clock, text: "Close in 7-90 days", color: "blue" },
    { icon: DollarSign, text: "0 Fee/Commission", color: "green" },
    { icon: MapPin, text: "Birmingham, MI", color: "orange" },
          { icon: Handshake, text: "Call Back in 24h", color: "blue" }
  ],
  showForm = true,
  backgroundImage = "/images/downtown-birmingham-mi-2025.webp",
  className = ""
}) => {
  const getIconColor = (color: string) => {
    const colors = {
      blue: 'primary',
      green: 'success',
      orange: 'warning'
    } as const;
    return colors[color as keyof typeof colors] || 'primary';
  };

  return (
    <section className={`hero-section relative ${className}`}>
      {/* Background Image with Frosted Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Downtown Birmingham, MI"
          fill
          className="object-cover"
          priority
        />
        {/* Frosted Overlay */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-0 pb-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
            {/* Left Column - Content */}
            <div className="space-y-4 sm:space-y-6">
              {/* Main Headline */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  {title.includes('Birmingham, MI') ? (
                    <>
                      {title.split('Birmingham, MI')[0]}
                      <span className="text-gradient">Birmingham, MI</span>
                      {title.split('Birmingham, MI')[1]}
                    </>
                  ) : (
                    title
                  )}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Birmingham, Michigan's dedicated cash home buyers.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Get a call back in 24 hours, close in 7-90 days.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  No repairs, no fees, no commissions.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
                    <Icon 
                      icon={benefit.icon} 
                      size="sm" 
                      color={getIconColor(benefit.color)}
                    />
                    <span className="text-xs sm:text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-2">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg md:text-xl font-bold text-blue-600">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Call {CONTACT_INFO.phone}</span>
                  </div>
                  <div className="text-gray-600">
                    <div className="font-medium text-xs sm:text-sm">Get Cash Offer Online</div>
                    <div className="text-xs">Get Your Birmingham Cash Offer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            {showForm && (
              <div className="hero-form bg-white/90 backdrop-blur-sm rounded-3xl shadow-luxury border border-gray-200 p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                <div className="text-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Get Your Birmingham Cash Offer</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Fill out the form below and we'll call you back to get property details.</p>
                </div>
                <LeadForm variant="inline" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 