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
    title: "Birmingham's ONLY Property Disaster Specialists",
    subtitle: "We DO NOT buy nice Birmingham homes. We exclusively help Birmingham residents escape property nightmares that traditional real estate can't handle. If your Birmingham house is in good condition, please use a realtor.",
    features: [
      {
        icon: MapPin,
        title: "Birmingham Disasters Only",
        description: "Birmingham fire damage, Michigan foundation collapse, city code violations, Birmingham hoarding complaints, inherited disasters - the bigger the Birmingham nightmare, the better.",
        color: "blue"
      },
      {
        icon: DollarSign,
        title: "Birmingham Emergency Response",
        description: "Birmingham health crisis? Michigan divorce? Auto industry job loss? Oakland County liens? Detroit-area probate nightmare? We specialize in desperate Michigan situations.",
        color: "green"
      },
      {
        icon: Clock,
        title: "Oakland County Crisis Closings",
        description: "Oakland County foreclosure next week? Birmingham house condemned? We can close emergency Michigan deals in days when Birmingham families are desperate.",
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
    title: "Got a Birmingham Property Nightmare?",
    subtitle: "We specialize in problems others won't touch. Emergency situations, distressed properties, and impossible cases are our specialty.",
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