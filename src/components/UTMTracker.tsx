'use client';

import { useEffect } from 'react';
import { storeUTMParams } from '@/utils/utmTracking';

export default function UTMTracker() {
  useEffect(() => {
    storeUTMParams();
  }, []);

  return null; // This component doesn't render anything
} 