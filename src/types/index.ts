export interface LeadForm {
  propertyAddress: string;
  birminghamNeighborhood: string;
  propertyType: 'single-family' | 'condo' | 'townhome' | 'other';
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs-major-work';
  timeline: 'asap' | '30-days' | '60-days' | 'exploring';
  fullName: string;
  phone: string;
  email: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  propertyTypes: string[];
  averagePrice?: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  propertyType: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'process' | 'birmingham-specific';
} 