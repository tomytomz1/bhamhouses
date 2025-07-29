'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounce input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value]);

  // Memoized zip code extraction
  const extractZipCode = useCallback((address: string): string => {
    const zipMatch = address.match(/\b48009\b/);
    return zipMatch ? zipMatch[0] : '48009';
  }, []);

  // Memoized fetch function with abort controller
  const fetchAddresses = useCallback(async (query: string) => {
    if (query.length < 1) {
      setSuggestions([]);
      setIsOpen(false);
      setValidationMessage('');
      setHasValidBirminghamAddress(false);
      return;
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/address-suggestions?query=${encodeURIComponent(query)}`, {
        signal: abortControllerRef.current.signal
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.error) {
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
        const shouldShowDropdown = formattedSuggestions.length > 0 && !justSelected && !value.includes('Birmingham, MI, USA');
        setIsOpen(shouldShowDropdown);
        
        const isBirminghamAddress = formattedSuggestions.some((suggestion: AddressSuggestion) => 
          suggestion.fullAddress.toLowerCase().includes('birmingham') && 
          suggestion.fullAddress.toLowerCase().includes('mi')
        );
        
        setHasValidBirminghamAddress(isBirminghamAddress);
        
        if (query.length > 2 && formattedSuggestions.length === 0) {
          setValidationMessage('Please enter a valid Birmingham, MI address. We only serve Birmingham, Michigan properties.');
        } else if (query.length > 2 && !isBirminghamAddress) {
          setValidationMessage('Please select a Birmingham, MI address from the suggestions above.');
        } else {
          setValidationMessage('');
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setSuggestions([]);
        setIsOpen(false);
        setValidationMessage('');
      }
    } finally {
      setIsLoading(false);
    }
  }, [justSelected, value, extractZipCode]);
  
  // Fetch address suggestions with debounce
  useEffect(() => {
    // Don't fetch if we just selected an address
    if (justSelected) {
      setJustSelected(false);
      return;
    }

    // Don't fetch if the current value is a complete Birmingham address
    if (debouncedValue.includes('Birmingham, MI, USA')) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    fetchAddresses(debouncedValue);
  }, [debouncedValue, justSelected, fetchAddresses]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Memoized address selection handler
  const selectAddress = useCallback((address: AddressSuggestion) => {
    setJustSelected(true);
    onChange(address.fullAddress);
    setIsOpen(false);
    setSelectedIndex(-1);
    setSuggestions([]);
    setValidationMessage('');
    setHasValidBirminghamAddress(true);
    
    if (inputRef.current) {
      inputRef.current.value = address.fullAddress;
    }
  }, [onChange]);

  // Memoized keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, [isOpen, suggestions, selectedIndex, selectAddress]);

  // Memoized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.length > 0 && !isOpen) {
      setIsOpen(true);
    } else if (newValue.length === 0) {
      setIsOpen(false);
      setSuggestions([]);
      setValidationMessage('');
      setHasValidBirminghamAddress(false);
    }
  }, [onChange, isOpen]);

  // Memoized focus handler
  const handleInputFocus = useCallback(() => {
    if (value.length > 0 && suggestions.length > 0) {
      setIsOpen(true);
    }
  }, [value.length, suggestions.length]);

  // Memoized blur handler
  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideInput = inputRef.current && !inputRef.current.contains(event.target as Node);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target as Node);
      
      if (isOutsideInput && isOutsideDropdown) {
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

  // Memoized suggestion items to prevent unnecessary re-renders
  const suggestionItems = useMemo(() => (
    suggestions.map((suggestion, index) => (
      <button
        key={suggestion.id}
        id={`suggestion-${index}`}
        type="button"
        role="option"
        aria-selected={selectedIndex === index}
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
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <div className="font-medium text-gray-900">{suggestion.address}</div>
            <div className="text-gray-500 text-xs mt-1">
              Birmingham, MI • {suggestion.zipCode}
            </div>
          </div>
        </div>
      </button>
    ))
  ), [suggestions, selectedIndex, selectAddress]);

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
          autoComplete="address-line1"
          aria-invalid={error || validationMessage ? "true" : "false"}
          aria-required="true"
          aria-describedby={`${error ? 'address-error-external ' : ''}${validationMessage ? 'address-validation-message' : ''}`.trim() || undefined}
          aria-label="Property address input with autocomplete suggestions"
          role="combobox"
          aria-controls="address-suggestions"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={isOpen ? "address-suggestions" : undefined}
          aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          className={cn(
            "form-input pl-8 text-xs sm:text-sm w-full",
            "mdc-text-field__input",
            "cdk-text-field-autofill-monitored",
            "pac-target-input",
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

      {/* Dropdown Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div
          id="address-suggestions"
          ref={dropdownRef}
          role="listbox"
          aria-label="Address suggestions"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestionItems}
        </div>
      )}

      {/* Validation Message */}
      {validationMessage && (
        <div className="flex items-center space-x-2 mt-2 text-sm">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
          <p id="address-validation-message" className="text-red-600" role="alert">{validationMessage}</p>
        </div>
      )}

      {error && (
        <p id="address-error-external" className="text-red-600 text-xs mt-1" role="alert">{error}</p>
      )}
    </div>
  );
};

export default AddressAutocomplete;