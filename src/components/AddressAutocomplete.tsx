'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AddressSuggestion {
  id: string;
  address: string;
  zipCode: string;
  fullAddress: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Enter your Birmingham property address",
  className,
  error
}) => {
  // Debug: Log the value prop
  console.log('AddressAutocomplete value prop:', value);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [hasValidBirminghamAddress, setHasValidBirminghamAddress] = useState(false);
  const [justSelected, setJustSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Instant response - no debounce for maximum speed
  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  // Fetch address suggestions immediately
  useEffect(() => {
    console.log('useEffect triggered - debouncedValue:', debouncedValue, 'justSelected:', justSelected); // Debug log
    
    // Don't fetch if we just selected an address
    if (justSelected) {
      console.log('Skipping fetch because justSelected is true'); // Debug log
      setJustSelected(false);
      return;
    }

    // Don't fetch if the current value is a complete Birmingham address
    if (debouncedValue.includes('Birmingham, MI, USA')) {
      console.log('Skipping fetch because value is a complete Birmingham address'); // Debug log
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    if (debouncedValue.length < 1) {
      setSuggestions([]);
      setIsOpen(false);
      setValidationMessage('');
      setHasValidBirminghamAddress(false);
      return;
    }

    const fetchAddresses = async () => {
      console.log('Fetching addresses for:', debouncedValue); // Debug log
      setIsLoading(true);
      try {
        const response = await fetch(`/api/address-suggestions?query=${encodeURIComponent(debouncedValue)}`);
        
        console.log('API Response status:', response.status); // Debug log
        
        if (response.ok) {
          const data = await response.json();
          console.log('API Response data:', data); // Debug log
          
          if (data.error) {
            console.error('API Error:', data.error, data.message);
            setSuggestions([]);
            setIsOpen(false);
            setValidationMessage('');
            return;
          }
          
          const formattedSuggestions = data.predictions.map((prediction: { 
            structured_formatting?: { main_text?: string }, 
            description: string 
          }, index: number) => ({
            id: `suggestion-${index}`,
            address: prediction.structured_formatting?.main_text || prediction.description,
            fullAddress: prediction.description,
            zipCode: extractZipCode(prediction.description)
          }));
          
          setSuggestions(formattedSuggestions);
          // Don't show dropdown if we just selected an address or if the current value is a complete address
          const shouldShowDropdown = formattedSuggestions.length > 0 && !justSelected && !value.includes('Birmingham, MI, USA');
          setIsOpen(shouldShowDropdown);
          
          // Check if current value is a valid Birmingham address
          const isBirminghamAddress = formattedSuggestions.some((suggestion: AddressSuggestion) => 
            suggestion.fullAddress.toLowerCase().includes('birmingham') && 
            suggestion.fullAddress.toLowerCase().includes('mi')
          );
          
          setHasValidBirminghamAddress(isBirminghamAddress);
          
          // Show validation message if user typed something but no Birmingham addresses found
          if (debouncedValue.length > 2 && formattedSuggestions.length === 0) {
            setValidationMessage('Please enter a valid Birmingham, MI address. We only serve Birmingham, Michigan properties.');
          } else if (debouncedValue.length > 2 && !isBirminghamAddress) {
            setValidationMessage('Please select a Birmingham, MI address from the suggestions above.');
          } else {
            setValidationMessage('');
          }
        } else {
          console.error('API response not ok:', response.status);
          setSuggestions([]);
          setIsOpen(false);
          setValidationMessage('');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setSuggestions([]);
        setIsOpen(false);
        setValidationMessage('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [debouncedValue, justSelected]);



  // Extract zip code from address
  const extractZipCode = (address: string): string => {
    const zipMatch = address.match(/\b48009\b/);
    return zipMatch ? zipMatch[0] : '48009';
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          selectAddress(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Select an address from suggestions
  const selectAddress = (address: AddressSuggestion) => {
    console.log('Selecting address:', address.fullAddress); // Debug log
    
    // Mark that we just selected an address to prevent refetching
    setJustSelected(true);
    
    // Update the input value first
    onChange(address.fullAddress);
    

    
    // Clear all state immediately and prevent dropdown from showing
    setIsOpen(false);
    setSelectedIndex(-1);
    setSuggestions([]);
    setValidationMessage('');
    setHasValidBirminghamAddress(true);
    
    // Ensure the input value is properly updated
    if (inputRef.current) {
      inputRef.current.value = address.fullAddress;
    }
    
    // Force clear any pending timeouts
    setTimeout(() => {
      setIsOpen(false);
      setSuggestions([]);
    }, 0);
  };

  // Handle input change with immediate feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Only show dropdown if there's text and we're not selecting
    if (newValue.length > 0 && !isOpen) {
      setIsOpen(true);
    } else if (newValue.length === 0) {
      setIsOpen(false);
      setSuggestions([]);
      setValidationMessage('');
      setHasValidBirminghamAddress(false);
    }
  };

  // Handle input focus - show suggestions immediately if there's text
  const handleInputFocus = () => {
    if (value.length > 0 && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle input blur - close dropdown when focus is lost
  const handleInputBlur = () => {
    // Much longer delay to allow for clicking on suggestions
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 300);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both input and dropdown
      const isOutsideInput = inputRef.current && !inputRef.current.contains(event.target as Node);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target as Node);
      
      if (isOutsideInput && isOutsideDropdown) {
        // Longer delay to allow for suggestion clicks
        setTimeout(() => {
          setIsOpen(false);
          setSelectedIndex(-1);
          setSuggestions([]);
        }, 150);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid="false"
          aria-required="false"
          className={cn(
            "form-input pl-8 text-xs sm:text-sm w-full",
            "mdc-text-field__input", // Google's input class
            "cdk-text-field-autofill-monitored", // Google's autofill class
            "pac-target-input", // Google's autocomplete target class
            validationMessage && !hasValidBirminghamAddress && "border-red-300 focus:border-red-500",
            className
          )}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 animate-spin" />
        )}
        {isOpen && !isLoading && suggestions.length > 0 && (
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
        )}
      </div>

      {/* Dropdown Suggestions - Google Maps style */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                selectAddress(suggestion);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={cn(
                "w-full px-4 py-3 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors",
                selectedIndex === index && "bg-blue-50 text-blue-900"
              )}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{suggestion.address}</div>
                  <div className="text-gray-500 text-xs mt-1">
                    Birmingham, MI • {suggestion.zipCode}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Validation Message */}
      {validationMessage && (
        <div className="flex items-center space-x-2 mt-2 text-sm">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-red-600">{validationMessage}</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default AddressAutocomplete; 