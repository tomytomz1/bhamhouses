import React from 'react';
import Image from 'next/image';
import { Clock, DollarSign, MapPin, Phone } from 'lucide-react';
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
  title = "Sell Your Birmingham Home Fast",
      subtitle = "We buy houses that are difficult to sell through traditional real estate. Fair cash offers, quick closings, no repairs needed.",
  benefits = [
          { icon: Clock, text: "Quick Closings", color: "blue" },
    { icon: DollarSign, text: "Fair Cash Offers", color: "green" },
    { icon: MapPin, text: "Birmingham Focus", color: "orange" }
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
            <div className="space-y-6">
              {/* Main Headline */}
              <div className="space-y-4 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
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
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="flex justify-center lg:justify-start space-x-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    <Icon 
                      icon={benefit.icon} 
                      size="sm" 
                      color={getIconColor(benefit.color)}
                    />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center space-x-4 text-lg font-semibold text-blue-600">
                  <Phone className="w-5 h-5" />
                  <span>Call {CONTACT_INFO.phone}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            {showForm && (
              <LeadForm variant="inline" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 