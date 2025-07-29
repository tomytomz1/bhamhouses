import { updateSectionConfig, getSectionConfig, SectionConfig } from '@/config/pageSections';
import { LucideIcon } from 'lucide-react';

/**
 * Utility class for easily updating page sections
 */
export class SectionUpdater {
  /**
   * Update a specific section's properties
   */
  static updateSection(
    pageId: string, 
    sectionId: string, 
    updates: Partial<SectionConfig['props']>
  ) {
    const currentSection = getSectionConfig(pageId, sectionId);
    if (currentSection) {
      updateSectionConfig(pageId, sectionId, {
        props: {
          ...currentSection.props,
          ...updates
        }
      });
    }
  }

  /**
   * Enable or disable a section
   */
  static toggleSection(pageId: string, sectionId: string, enabled: boolean) {
    updateSectionConfig(pageId, sectionId, { enabled });
  }

  /**
   * Update hero section title
   */
  static updateHeroTitle(pageId: string, newTitle: string) {
    this.updateSection(pageId, 'hero', { title: newTitle });
  }

  /**
   * Update hero section subtitle
   */
  static updateHeroSubtitle(pageId: string, newSubtitle: string) {
    this.updateSection(pageId, 'hero', { subtitle: newSubtitle });
  }

  /**
   * Update hero section benefits
   */
  static updateHeroBenefits(pageId: string, benefits: Array<{
    icon: LucideIcon;
    text: string;
    color: 'blue' | 'green' | 'orange';
  }>) {
    this.updateSection(pageId, 'hero', { benefits });
  }

  /**
   * Update CTA section content
   */
  static updateCTAContent(pageId: string, title: string, subtitle: string) {
    this.updateSection(pageId, 'bottom-cta', { title, subtitle });
  }

  /**
   * Update specialization section features
   */
  static updateSpecializationFeatures(pageId: string, features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }>) {
    this.updateSection(pageId, 'birmingham-specialization', { features });
  }
}

/**
 * Quick update functions for common changes
 */
export const quickUpdates = {
  /**
   * Change the hero title
   */
  changeHeroTitle: (newTitle: string) => {
    SectionUpdater.updateHeroTitle('homepage', newTitle);
  },

  /**
   * Change the hero subtitle
   */
  changeHeroSubtitle: (newSubtitle: string) => {
    SectionUpdater.updateHeroSubtitle('homepage', newSubtitle);
  },

  /**
   * Change the CTA text
   */
  changeCTAText: (title: string, subtitle: string) => {
    SectionUpdater.updateCTAContent('homepage', title, subtitle);
  },

  /**
   * Toggle a section on/off
   */
  toggleSection: (sectionId: string, enabled: boolean) => {
    SectionUpdater.toggleSection('homepage', sectionId, enabled);
  }
}; 