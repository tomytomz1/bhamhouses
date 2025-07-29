# Modular Development Guide

This guide explains how to use the new modular system to make small changes without rebuilding entire pages.

## Overview

The new system uses a configuration-driven approach where page content is defined in configuration files rather than hardcoded in components. This allows you to:

- Change text, images, or styling without touching component code
- Enable/disable entire sections with a single line change
- Reuse components across different pages
- Make quick updates through utility functions

## Key Components

### 1. Configuration Files (`src/config/pageSections.ts`)

This file contains all the content and structure for your pages. Each section has:
- `id`: Unique identifier for the section
- `type`: What kind of section (hero, benefits, process, etc.)
- `props`: All the content and styling for that section
- `enabled`: Whether the section should be shown

### 2. Page Renderer (`src/components/PageRenderer.tsx`)

This component reads the configuration and renders the appropriate sections. It handles:
- Dynamic section rendering based on configuration
- Specialized sections (CTA, specialization)
- Section enabling/disabling

### 3. UI Components (`src/components/ui/`)

Reusable components that provide consistent styling:
- `Button.tsx`: Multiple variants and sizes
- `Card.tsx`: Different card styles
- `Icon.tsx`: Consistent icon sizing and colors
- `Section.tsx`: Standardized section layouts

## How to Make Changes

### Quick Text Changes

Instead of editing component files, update the configuration:

```typescript
// In src/config/pageSections.ts
export const defaultHeroConfig: SectionConfig = {
  id: 'hero',
  type: 'hero',
  enabled: true,
  props: {
    title: "Your New Title Here", // ← Change this
    subtitle: "Your new subtitle", // ← Change this
    // ... rest of props
  }
};
```

### Using Utility Functions

For common changes, use the utility functions:

```typescript
import { quickUpdates } from '@/utils/sectionUpdater';

// Change hero title
quickUpdates.changeHeroTitle("New Hero Title");

// Change CTA text
quickUpdates.changeCTAText("New CTA Title", "New CTA Subtitle");

// Toggle a section on/off
quickUpdates.toggleSection('testimonials', false); // Hide testimonials
```

### Adding New Sections

1. Add the section configuration to `pageSections.ts`:

```typescript
export const newSectionConfig: SectionConfig = {
  id: 'new-section',
  type: 'custom',
  enabled: true,
  props: {
    title: "My New Section",
    content: "Section content here"
  }
};
```

2. Add it to the page configuration:

```typescript
export const homepageConfig: PageConfig = {
  id: 'homepage',
  title: 'Homepage',
  sections: [
    defaultHeroConfig,
    newSectionConfig, // ← Add your new section
    // ... other sections
  ]
};
```

3. Create a component for the new section type (if needed):

```typescript
// src/components/sections/CustomSection.tsx
const CustomSection: React.FC<CustomSectionProps> = ({ title, content }) => {
  return (
    <Section>
      <h2>{title}</h2>
      <p>{content}</p>
    </Section>
  );
};
```

4. Add it to the PageRenderer mapping:

```typescript
const sectionComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  custom: CustomSection, // ← Add your new component
  // ... other components
};
```

## Benefits

### 1. No More Rebuilding Entire Pages

Before:
```typescript
// Had to edit the entire page component
export default function HomePage() {
  return (
    <main>
      <section>
        <h1>Old Title</h1> // ← Had to find this in 200+ lines
        <p>Old subtitle</p>
      </section>
      // ... lots more code
    </main>
  );
}
```

After:
```typescript
// Just update the configuration
export const defaultHeroConfig = {
  props: {
    title: "New Title", // ← Easy to find and change
    subtitle: "New subtitle"
  }
};
```

### 2. Easy A/B Testing

You can easily create different configurations for testing:

```typescript
export const homepageConfigA = {
  // Version A configuration
};

export const homepageConfigB = {
  // Version B configuration
};
```

### 3. Reusable Sections

Sections can be reused across different pages:

```typescript
// Same hero section on multiple pages
export const aboutPageConfig = {
  sections: [
    defaultHeroConfig, // ← Reuse the same hero
    // ... other sections
  ]
};
```

### 4. Quick Content Updates

Marketing team can update content without touching code:

```typescript
// Just change these values
export const defaultHeroConfig = {
  props: {
    title: "New Marketing Message",
    benefits: [
      { text: "New Benefit 1", color: "blue" },
      { text: "New Benefit 2", color: "green" }
    ]
  }
};
```

## File Structure

```
src/
├── config/
│   └── pageSections.ts          # Page configurations
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Icon.tsx
│   │   └── Section.tsx
│   ├── sections/                # Section-specific components
│   │   └── HeroSection.tsx
│   └── PageRenderer.tsx         # Dynamic page renderer
└── utils/
    └── sectionUpdater.ts        # Utility functions for updates
```

## Best Practices

1. **Keep configurations separate from components**: This makes content changes easy and safe
2. **Use TypeScript interfaces**: This provides autocomplete and type safety
3. **Create reusable UI components**: This ensures consistency across the site
4. **Use utility functions for common changes**: This makes updates even easier
5. **Document your configurations**: Add comments to explain what each section does

## Example: Changing Hero Title

### Old Way (Required rebuilding)
1. Find the homepage component (200+ lines)
2. Locate the hero section (50+ lines)
3. Find the title element
4. Make the change
5. Test the entire page

### New Way (Configuration only)
1. Open `src/config/pageSections.ts`
2. Find `defaultHeroConfig`
3. Change the `title` property
4. Done!

This new system makes your development much more efficient and reduces the risk of breaking other parts of the page when making small changes. 