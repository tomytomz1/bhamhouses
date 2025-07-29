import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { leadSubmissionLimiter } from '@/utils/rateLimit';

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID || '');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Server-side validation schema
const leadSchema = z.object({
  propertyAddress: z.string().min(1, 'Property address is required').max(500),
  propertyType: z.enum(['single-family', 'condo', 'townhome', 'duplex', 'multi-family']),
  propertyCondition: z.enum(['excellent', 'good', 'fair', 'poor', 'needs-major-work']),
  timeline: z.enum(['asap', '30-days', '60-days', '90-days', 'just-exploring']),
  fullName: z.string().min(1, 'Full name is required').max(100),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  email: z.string().email('Valid email is required').max(100),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

// Sanitize HTML content
function sanitizeHtml(content: string): string {
  return DOMPurify.sanitize(content, { ALLOWED_TAGS: [] });
}

export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = leadSubmissionLimiter(request);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        resetTime: rateLimitResult.resetTime 
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    );
  }

  try {
    const body = await request.json();
    
    // Validate input schema
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input data',
          details: validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    const {
      propertyAddress,
      propertyType,
      propertyCondition,
      timeline,
      fullName,
      phone,
      email,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    } = validationResult.data;
    
    // Sanitize all string inputs
    const sanitizedData = {
      propertyAddress: sanitizeHtml(propertyAddress),
      propertyType,
      propertyCondition,
      timeline,
      fullName: sanitizeHtml(fullName),
      phone: sanitizeHtml(phone),
      email: sanitizeHtml(email),
      utmSource: utmSource ? sanitizeHtml(utmSource) : '',
      utmMedium: utmMedium ? sanitizeHtml(utmMedium) : '',
      utmCampaign: utmCampaign ? sanitizeHtml(utmCampaign) : '',
      utmTerm: utmTerm ? sanitizeHtml(utmTerm) : '',
      utmContent: utmContent ? sanitizeHtml(utmContent) : '',
    };

    // Create lead record in Airtable
    const airtableRecord = await base('Leads').create([
      {
        fields: {
          'Property Address': sanitizedData.propertyAddress,
          'Property Type': sanitizedData.propertyType,
          'Property Condition': sanitizedData.propertyCondition,
          'Timeline': sanitizedData.timeline,
          'Full Name': sanitizedData.fullName,
          'Phone': sanitizedData.phone,
          'Email': sanitizedData.email,
          'UTM Source': sanitizedData.utmSource,
          'UTM Medium': sanitizedData.utmMedium,
          'UTM Campaign': sanitizedData.utmCampaign,
          'UTM Term': sanitizedData.utmTerm,
          'UTM Content': sanitizedData.utmContent,
          'Status': 'New',
          'Date Created': new Date().toISOString(),
        },
      },
    ]);

    // Send email notification (using sanitized data)
    const emailContent = `
      <h2>New Lead Received - BHAM Houses</h2>
      <p><strong>Name:</strong> ${sanitizedData.fullName}</p>
      <p><strong>Property Address:</strong> ${sanitizedData.propertyAddress}</p>
      <p><strong>Property Type:</strong> ${sanitizedData.propertyType}</p>
      <p><strong>Property Condition:</strong> ${sanitizedData.propertyCondition}</p>
      <p><strong>Timeline:</strong> ${sanitizedData.timeline}</p>
      ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
      ${sanitizedData.email ? `<p><strong>Email:</strong> ${sanitizedData.email}</p>` : ''}
      <p><strong>UTM Source:</strong> ${sanitizedData.utmSource || 'Direct'}</p>
      <p><strong>UTM Campaign:</strong> ${sanitizedData.utmCampaign || 'N/A'}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    const recipient = process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER || 'info@bhamhouses.com';
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: `New Lead: ${sanitizedData.fullName} - Birmingham, MI`,
      html: emailContent,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead submitted successfully',
        leadId: airtableRecord[0].id 
      },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    );
  }
} 