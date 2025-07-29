import { Clock, DollarSign, MapPin, Handshake, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/utils/contactInfo';

export interface SectionConfig {
  id: string;
  type: 'hero' | 'benefits' | 'process' | 'testimonials' | 'faq' | 'cta' | 'specialization';
  props: Record<string, unknown>;
  enabled?: boolean;
}

export interface PageConfig {
  id: string;
  title: string;
  sections: SectionConfig[];
}

// Default hero section configuration
export const defaultHeroConfig: SectionConfig = {
  id: 'hero',
  type: 'hero',
  enabled: true,
  props: {
    title: "Sell Your House Fast in Birmingham, MI",
    subtitle: "Birmingham, Michigan's dedicated cash home buyers. Get a call back in 24 hours, close in 7 days. No repairs, no fees, no commissions.",
    benefits: [
      { icon: Clock, text: "Close in 7 days", color: "blue" },
      { icon: DollarSign, text: "No fees or commissions", color: "green" },
      { icon: MapPin, text: "Serving all Birmingham, MI", color: "orange" },
              { icon: Handshake, text: "Call back in 24 hours", color: "blue" }
    ],
    showForm: true,
            backgroundImage: "/images/downtown-birmingham-mi-2025.webp"
  }
};

// Birmingham specialization section
export const birminghamSpecializationConfig: SectionConfig = {
  id: 'birmingham-specialization',
  type: 'specialization',
  enabled: true,
  props: {
    title: "Birmingham, MI's Only Dedicated Cash Home Buyer",
    subtitle: "While other companies spread themselves thin across 50+ cities, we focus exclusively on Birmingham, Michigan. This specialization gives us deep local market knowledge and allows us to provide better service to Birmingham homeowners.",
    features: [
      {
        icon: MapPin,
        title: "Birmingham Specialists",
        description: "We know every Birmingham area, from downtown condos to luxury family homes throughout the city.",
        color: "blue"
      },
      {
        icon: DollarSign,
        title: "Fair Market Offers",
        description: "Our offers are based on current Birmingham market values and recent sales in your area.",
        color: "green"
      },
      {
        icon: Clock,
        title: "Fast & Flexible",
        description: "Close in 7 days or choose your timeline. We work around your schedule, not ours.",
        color: "orange"
      }
    ]
  }
};

// Bottom CTA section
export const bottomCTAConfig: SectionConfig = {
  id: 'bottom-cta',
  type: 'cta',
  enabled: true,
  props: {
    title: "Ready to Sell Your Birmingham Home?",
    subtitle: "Get your fair cash offer today. No obligation, no pressure, just a straightforward process.",
    actions: [
      {
        type: 'phone',
        text: `Call ${CONTACT_INFO.phone}`,
        href: `tel:${CONTACT_INFO.phoneRaw}`,
        icon: Phone
      },
      {
        type: 'link',
        text: "Contact Us",
        href: "/contact",
        icon: Mail,
        secondary: true
      }
    ],
    variant: 'dark'
  }
};

// Homepage configuration
export const homepageConfig: PageConfig = {
  id: 'homepage',
  title: 'Homepage',
  sections: [
    defaultHeroConfig,
    birminghamSpecializationConfig,
    { id: 'benefits', type: 'benefits', enabled: true, props: {} },
    { id: 'process', type: 'process', enabled: true, props: {} },

    { id: 'testimonials', type: 'testimonials', enabled: true, props: {} },
    { id: 'faq', type: 'faq', enabled: true, props: {} },
    bottomCTAConfig
  ]
};

// Function to get section configuration
export function getSectionConfig(pageId: string, sectionId: string): SectionConfig | undefined {
  const pageConfig = getPageConfig(pageId);
  return pageConfig?.sections.find(section => section.id === sectionId);
}

// Function to get page configuration
export function getPageConfig(pageId: string): PageConfig | undefined {
  const configs: Record<string, PageConfig> = {
    homepage: homepageConfig
  };
  return configs[pageId];
}

// Function to update section configuration
export function updateSectionConfig(pageId: string, sectionId: string, updates: Partial<SectionConfig>): void {
  const pageConfig = getPageConfig(pageId);
  if (pageConfig) {
    const sectionIndex = pageConfig.sections.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1) {
      pageConfig.sections[sectionIndex] = {
        ...pageConfig.sections[sectionIndex],
        ...updates
      };
    }
  }
} 