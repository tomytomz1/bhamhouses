export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };
}

export function storeUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUTMParams();
  const hasUTMParams = Object.values(utmParams).some(param => param);
  
  if (hasUTMParams) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
}

export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : {};
}

export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  sessionStorage.removeItem('utm_params');
} 