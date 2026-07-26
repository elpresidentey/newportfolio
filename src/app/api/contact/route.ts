import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'conceptsandcontexts@gmail.com',
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
