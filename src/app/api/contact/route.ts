import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, service, city } = body;

    if (!name || !mobile || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Cratio CRM Integration
    const CRATIO_API_KEY = process.env.CRATIO_API_KEY;
    const CRATIO_API_URL = process.env.CRATIO_API_URL;

    if (CRATIO_API_KEY && CRATIO_API_URL) {
      try {
        const payload = {
          formName: "Leads",
          overwrite: true,
          data: { 
            Name: name, 
            Mobile: mobile, 
            City: city || '', 
            LeadSource: "Prism Healthcure Website", 
            Requirements: service 
          }
        };
        await fetch(`${CRATIO_API_URL}?apikey=${CRATIO_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.error('CRM Error:', e);
      }
    }

    // 2. Google Sheets Integration (via Apps Script Webhook)
    const SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (SHEETS_URL) {
      try {
        await fetch(SHEETS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            mobile, 
            city: city || 'N/A', 
            service, 
            date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
          })
        });
      } catch (e) {
        console.error('Sheets Error:', e);
      }
    }

    // 3. Email Notification (via Resend)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Prism Leads <onboarding@resend.dev>',
          to: process.env.CONTACT_RECEIVER_EMAIL || 'contact@prismhealthcure.com',
          subject: `New Lead: ${name} (${service})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #0d9488;">New Appointment Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Mobile:</strong> ${mobile}</p>
              <p><strong>City:</strong> ${city || 'N/A'}</p>
              <p><strong>Service:</strong> ${service}</p>
              <hr style="border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #666;">Source: Prism Website | Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          `
        });
      } catch (e) {
        console.error('Email Error:', e);
      }
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

