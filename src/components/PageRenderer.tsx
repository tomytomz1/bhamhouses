import React from 'react';
import { PageConfig, SectionConfig } from '@/config/pageSections';
import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProcessSection from '@/components/ProcessSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';
import { LucideIcon } from 'lucide-react';

interface PageRendererProps {
  config: PageConfig;
}

interface FeatureItem {
  icon: LucideIcon;
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  title: string;
  description: string;
}

interface ActionItem {
  href: string;
  variant?: string;
  secondary?: boolean;
  icon?: LucideIcon;
  text?: string;
  children: React.ReactNode;
}

interface SpecializationProps extends SectionConfig {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

interface CTAProps extends SectionConfig {
  title: string;
  subtitle: string;
  variant?: 'default' | 'light' | 'dark' | 'gradient';
  actions: ActionItem[];
}

// Section component mapping
const sectionComponents: Record<string, React.ComponentType<Record<string, unknown>>> = {
  hero: HeroSection,
  benefits: BenefitsSection,
  process: ProcessSection,
  testimonials: Testimonials,
  faq: FAQ
};

// Specialized section renderers
const renderSpecializationSection = (props: SpecializationProps) => (
  <Section variant="default">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {props.title}
      </h2>
      <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
        {props.subtitle}
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {props.features.map((feature: FeatureItem, index: number) => (
        <div key={index} className="card text-center">
          <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            <Icon icon={feature.icon} size="xl" color={feature.color} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-gray-700">{feature.description}</p>
        </div>
      ))}
    </div>
  </Section>
);

const renderCTASection = (props: CTAProps) => (
  <Section variant={props.variant || 'dark'} className="bg-blue-900">
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {props.title}
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          {props.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {props.actions.map((action: ActionItem, index: number) => (
            <a
              key={index}
              href={action.href}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                action.secondary 
                  ? 'border border-white text-white hover:bg-white hover:text-blue-900' 
                  : 'bg-white text-blue-900 hover:bg-gray-100'
              }`}
            >
              {action.icon && <Icon icon={action.icon} size="md" />}
              <span>{action.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const PageRenderer: React.FC<PageRendererProps> = ({ config }) => {
  const renderSection = (section: SectionConfig) => {
    if (!section.enabled) return null;

    const { type, props } = section;

    // Handle specialized sections
    if (type === 'specialization') {
      return renderSpecializationSection(props as unknown as SpecializationProps);
    }

    if (type === 'cta') {
      return renderCTASection(props as unknown as CTAProps);
    }

    // Handle standard sections
    const SectionComponent = sectionComponents[type];
    if (SectionComponent) {
      return <SectionComponent {...props} />;
    }

    return null;
  };

  return (
    <main className="bg-white">
      {config.sections.map((section) => (
        <React.Fragment key={section.id}>
          {renderSection(section)}
        </React.Fragment>
      ))}
    </main>
  );
};

export default PageRenderer; 