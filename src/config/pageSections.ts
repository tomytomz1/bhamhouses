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
    title: "Birmingham Property Nightmare? House Falling Apart? We Specialize in Impossible Situations",
    subtitle: "When your Birmingham house becomes a burden instead of an asset, we step in. Military deployment, bankruptcy, death in family, disability, business failure, rental nightmares, legal troubles, foreclosure, foundation collapse, fire damage, hoarding, elderly care costs - we've solved them all.",
    benefits: [
              { icon: Clock, text: "Emergency Closings", color: "blue" },
      { icon: DollarSign, text: "Nightmare Properties", color: "green" },
      { icon: MapPin, text: "Birmingham Only", color: "orange" },
              { icon: Handshake, text: "Crisis Specialists", color: "blue" }
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
    title: "Birmingham's Cash Home Buyers for Distressed Properties",
    subtitle: "We buy houses that are difficult or impossible to sell on MLS - distressed properties, properties with title issues, homes that need significant work, foreclosures, and situations where you need to sell fast. If your Birmingham house is in good condition and you have months to wait for the right buyer, we recommend working with a realtor for the best price.",
    features: [
      {
        icon: MapPin,
        title: "Distressed Properties",
        description: "Birmingham fire damage, foundation issues, city code violations, inherited properties, probate situations - we buy properties that need special attention.",
        color: "blue"
      },
      {
        icon: DollarSign,
        title: "Fair Cash Offers",
        description: "Relocating for work? Inherited a property? Need to sell quickly? We provide fair cash offers for challenging situations.",
        color: "green"
      },
      {
        icon: Clock,
        title: "Quick Closings",
        description: "Need to close quickly? We can accommodate your timeline. Whether it's 7 days or 90 days, we work with your schedule.",
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
    title: "Need to Sell Your Birmingham Home?",
    subtitle: "We provide fair cash offers for properties that are difficult to sell through traditional real estate. Whether it's condition, timing, or circumstances - we're here to help.",
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