import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { addressSearchLimiter } from '@/utils/rateLimit';

// Input validation schema
const querySchema = z.string().min(1).max(200).regex(/^[a-zA-Z0-9\s,.-]+$/, 'Invalid characters in query');

export async function GET(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = addressSearchLimiter(request);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        predictions: [],
        error: 'Too many requests. Please slow down.' 
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('query');

  if (!rawQuery) {
    return NextResponse.json({ predictions: [] });
  }

  // Validate and sanitize query
  const queryValidation = querySchema.safeParse(rawQuery);
  if (!queryValidation.success) {
    return NextResponse.json({ 
      predictions: [],
      error: 'Invalid query format'
    });
  }

  const query = DOMPurify.sanitize(queryValidation.data, { ALLOWED_TAGS: [] });

  // Return empty for very short queries after sanitization
  if (query.length < 1) {
    return NextResponse.json({ predictions: [] });
  }

  let retryCount = 0;
  const maxRetries = 2;
  
  while (retryCount <= maxRetries) {
    try {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      
      if (!apiKey || apiKey === 'your_google_places_api_key_here') {
        return NextResponse.json({ 
          predictions: [],
          error: 'API key not configured'
        });
      }

    // Build the Places Autocomplete API URL according to Google's documentation
    const params = new URLSearchParams({
      input: query,
      types: 'address',
      components: 'country:us',
      location: '42.5467,-83.2113', // Birmingham, MI coordinates
      radius: '50000', // 50km radius
      key: apiKey
    });

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();


    if (data.status === 'OK') {
      // Filter for Birmingham, MI addresses only
      const birminghamPredictions = data.predictions
        .filter((prediction: { description: string }) => {
          const description = prediction.description.toLowerCase();
          return description.includes('birmingham') && description.includes('mi');
        })
        .slice(0, 8); // Limit results for performance
      
      
      return NextResponse.json({
        predictions: birminghamPredictions
      }, {
        headers: {
          'Cache-Control': 'public, max-age=300',
          'Content-Type': 'application/json',
        },
      });
    } else {
      return NextResponse.json({ 
        predictions: [],
        error: data.status,
        message: data.error_message
      });
    }
    } catch (error) {
      retryCount++;
      
      // If this was the last retry, return error
      if (retryCount > maxRetries) {
        return NextResponse.json({ 
          predictions: [],
          error: error instanceof Error && error.name === 'AbortError' 
            ? 'Request timeout' 
            : 'Network error'
        });
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
    }
  }
} 