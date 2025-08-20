import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message, services } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Format services for email
    const formattedServices = services && services.length > 0 
      ? services.join(', ') 
      : 'None specified';
    
    // Format company and phone for email
    const formattedCompany = company ? company : 'Not provided';
    const formattedPhone = phone ? phone : 'Not provided';

    // Send main email to tony@cosmicjs.com
    const mainEmailData = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${formattedCompany}</p>
        <p><strong>Phone:</strong> ${formattedPhone}</p>
        <p><strong>Services Interested In:</strong> ${formattedServices}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to sender
    const confirmationEmailData = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your submission:</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${formattedCompany}</p>
        <p><strong>Phone:</strong> ${formattedPhone}</p>
        <p><strong>Services Interested In:</strong> ${formattedServices}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,</p>
        <p>The Cosmic Team</p>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      mainEmailId: mainEmailData.id,
      confirmationEmailId: confirmationEmailData.id
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}