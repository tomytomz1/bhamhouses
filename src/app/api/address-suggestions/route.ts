import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  // Return empty for very short queries
  if (!query || query.length < 1) {
    return NextResponse.json({ predictions: [] });
  }

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
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    console.log('Raw Google API response for query:', query, 'Status:', data.status);
    console.log('Raw predictions count:', data.predictions?.length || 0);
    if (data.predictions?.length > 0) {
      console.log('Sample raw prediction:', data.predictions[0]);
    }

    if (data.status === 'OK') {
      // Filter for Birmingham, MI addresses only
      const birminghamPredictions = data.predictions
        .filter((prediction: { description: string }) => {
          const description = prediction.description.toLowerCase();
          return description.includes('birmingham') && description.includes('mi');
        })
        .slice(0, 8); // Limit results for performance
      
      console.log('Filtered Birmingham predictions count:', birminghamPredictions.length);
      
      return NextResponse.json({
        predictions: birminghamPredictions
      }, {
        headers: {
          'Cache-Control': 'public, max-age=300',
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json({ 
        predictions: [],
        error: data.status,
        message: data.error_message
      });
    }
  } catch (error) {
    console.error('Address suggestions error:', error);
    return NextResponse.json({ 
      predictions: [],
      error: 'Network error'
    });
  }
} 