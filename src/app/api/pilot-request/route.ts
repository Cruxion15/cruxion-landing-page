import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Cruxion <support@cruxion.in>',
      to: email,
      subject: 'Pilot Request Received - Cruxion',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Pilot Request Received</h2>
          <p>Thank you for your interest in Cruxion!</p>
          <p>We've received your pilot request from <strong>${email}</strong></p>
          <p>Our team will reach out within 24 hours with next steps.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">Cruxion.in</p>
        </div>
      `,
    });

    // Send notification email to Cruxion team
    await resend.emails.send({
      from: 'Cruxion Pilots <support@cruxion.in>',
      to: 'support@cruxion.in',
      subject: `New Pilot Request: ${email}`,
      html: `
        <p>New pilot request received:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Request received! Check your email.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Pilot request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Try again.' },
      { status: 500 }
    );
  }
}
