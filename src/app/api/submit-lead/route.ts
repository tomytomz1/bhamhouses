import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import nodemailer from 'nodemailer';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    } = body;

    // Validate required fields
    if (!propertyAddress || !propertyType || !propertyCondition || !timeline || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create lead record in Airtable
    const airtableRecord = await base('Leads').create([
      {
        fields: {
          'Property Address': propertyAddress,
          'Property Type': propertyType,
          'Property Condition': propertyCondition,
          'Timeline': timeline,
          'Full Name': fullName,
          'Phone': phone || '',
          'Email': email || '',
          'UTM Source': utmSource || '',
          'UTM Medium': utmMedium || '',
          'UTM Campaign': utmCampaign || '',
          'UTM Term': utmTerm || '',
          'UTM Content': utmContent || '',
          'Status': 'New',
          'Date Created': new Date().toISOString(),
        },
      },
    ]);

    // Send email notification
    const emailContent = `
      <h2>New Lead Received - BHAM Houses</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Property Address:</strong> ${propertyAddress}</p>
      <p><strong>Property Type:</strong> ${propertyType}</p>
      <p><strong>Property Condition:</strong> ${propertyCondition}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      <p><strong>UTM Source:</strong> ${utmSource || 'Direct'}</p>
      <p><strong>UTM Campaign:</strong> ${utmCampaign || 'N/A'}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'tomasbeltran2014@gmail.com',
      subject: `New Lead: ${fullName} - Birmingham, MI`,
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

  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    );
  }
} 