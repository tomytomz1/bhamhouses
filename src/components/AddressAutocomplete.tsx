'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: AutocompleteOptions) => AutocompleteInstance;
        };
        LatLngBounds: new (sw: LatLng, ne: LatLng) => LatLngBounds;
        LatLng: new (lat: number, lng: number) => LatLng;
        event: {
          clearInstanceListeners: (instance: AutocompleteInstance) => void;
        };
      };
    };
  }
}

interface AutocompleteOptions {
  types?: string[];
  componentRestrictions?: { country: string };
  bounds?: LatLngBounds;
  strictBounds?: boolean;
  fields?: string[];
}

interface AutocompleteInstance {
  addListener: (event: string, callback: () => void) => void;
  getPlace: () => Place;
}

interface Place {
  formatted_address?: string;
  address_components?: unknown[];
  geometry?: unknown;
}

interface LatLngBounds {
  // Google Maps LatLngBounds interface
  contains?: (latLng: LatLng) => boolean;
}

interface LatLng {
  // Google Maps LatLng interface
  lat?: () => number;
  lng?: () => number;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Enter your Birmingham property address",
  className,
  error
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<AutocompleteInstance | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google || !isApiLoaded || isInitialized) return;

    // Check if Places library is available
    if (!window.google.maps || !window.google.maps.places) {
      console.error('Google Maps Places library not loaded, retrying in 100ms...');
      setTimeout(() => {
        if (window.google?.maps?.places) {
          initializeAutocomplete();
        }
      }, 100);
      return;
    }

    // Check if Autocomplete constructor is available
    if (!window.google.maps.places.Autocomplete) {
      console.error('Google Maps Autocomplete constructor not available, retrying in 100ms...');
      setTimeout(() => {
        if (window.google?.maps?.places?.Autocomplete) {
          initializeAutocomplete();
        }
      }, 100);
      return;
    }

    try {
      // Use the React input directly but remove problematic attributes
      const input = inputRef.current;
      if (!input) return;

      // Remove problematic attributes that might conflict with Google Maps API
      input.removeAttribute('autoComplete');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-required');
      input.removeAttribute('aria-describedby');
      input.removeAttribute('aria-label');

      // Use the stable Autocomplete class with full configuration
      autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(42.5467, -83.2113), // Birmingham, MI coordinates
          new window.google.maps.LatLng(42.5467, -83.2113)
        ),
        strictBounds: true,
        fields: ['formatted_address', 'address_components', 'geometry']
      });

      // Add listener for place selection
      if (autocompleteRef.current) {
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          
          if (place?.formatted_address) {
            // Enhanced Birmingham, MI address validation
            const address = place.formatted_address.toLowerCase();
            const isBirmingham = address.includes('birmingham') && 
                               (address.includes('mi') || address.includes('michigan')) &&
                               !address.includes('birmingham, al') && // Exclude Birmingham, AL
                               !address.includes('birmingham, uk'); // Exclude Birmingham, UK
            
            if (isBirmingham) {
              onChange(place.formatted_address);
            } else {
              // Clear the input if not Birmingham
              if (input) {
                input.value = '';
              }
              onChange('');
            }
          }
        });
      }
      setIsInitialized(true);
      console.log('Google Places Autocomplete initialized successfully with Autocomplete');
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }
  }, [onChange, isApiLoaded, isInitialized]);

  useEffect(() => {
    // Debug: Check if API key is available
    console.log('API Key available:', !!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);
    
    // Prevent multiple script loads
    if (isLoading) return;
    setIsLoading(true);
    
    // Load Google Maps JavaScript API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API loaded');
        setIsApiLoaded(true);
        // Add a longer delay to ensure the API is fully loaded
        setTimeout(initializeAutocomplete, 1000);
      };
      document.head.appendChild(script);
    } else {
      console.log('Google Maps API already loaded');
      setIsApiLoaded(true);
      // If Google is already loaded, wait a bit before initializing
      setTimeout(initializeAutocomplete, 500);
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [initializeAutocomplete, isLoading]);

  // Only re-initialize when API is loaded and not already initialized
  useEffect(() => {
    if (isApiLoaded && !isInitialized) {
      setTimeout(initializeAutocomplete, 200);
    }
  }, [isApiLoaded, isInitialized, initializeAutocomplete]);

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "form-input pl-8 text-xs sm:text-sm w-full",
            error && "border-red-300 focus:border-red-500",
            !error && value && value.toLowerCase().includes('birmingham') && value.toLowerCase().includes('mi') && "border-green-300 focus:border-green-500",
            className
          )}
        />
        {!error && value && value.toLowerCase().includes('birmingham') && value.toLowerCase().includes('mi') && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
        )}
      </div>
      {error && (
        <div className="mt-1 text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;