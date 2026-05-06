import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, service } = body;

    if (!name || !mobile || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const API_KEY = process.env.CRATIO_API_KEY;
    const API_URL = process.env.CRATIO_API_URL;

    if (!API_KEY || !API_URL) {
      console.warn('CRATIO env vars missing. Simulating success.');
      return NextResponse.json({ success: true, message: 'Submission received' }, { status: 200 });
    }

    const payload = {
      formName: "Leads",
      overwrite: true,
      data: { Name: name, Mobile: mobile, LeadSource: "Prism Healthcure Website", Requirements: service }
    };

    const response = await fetch(`${API_URL}?apikey=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'CRM submission failed');

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
