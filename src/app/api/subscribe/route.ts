import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = "2ece5e59-e02e-410f-9cbd-c38ee3ae5cd2";
    const organizerEmail = "info@awssbgpiet.in";
    const senderEmail = "AWS SBG PIET <site@awssbgpiet.in>";

    // 1. Add Subscriber to Resend Contacts Audience (SUMMIT ALERTS)
    try {
      const contactRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          unsubscribed: false,
        }),
      });
      const contactData = await contactRes.json();
      console.log("Resend Contact added:", contactData);
    } catch (err) {
      console.error("Resend audience contact add error:", err);
    }

    // HTML for Student Confirmation Email
    const studentWelcomeHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #080D1E; color: #ffffff;">
        <div style="background: linear-gradient(135deg, #8E35EA, #AD5CFF); padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">⚡ You're On the List!</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #ffffff; opacity: 0.95; font-family: monospace;">AWS Student Community Day Panipat 2026</p>
        </div>

        <div style="padding: 0 8px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
          <p style="font-size: 15px; color: #ffffff; font-weight: 600;">Hey Cloud Builder,</p>
          <p>
            You are officially subscribed to <strong>Summit Alerts</strong> for Haryana's first-ever AWS Student Community Day hosted at PIET Panipat!
          </p>

          <div style="background-color: rgba(173, 92, 255, 0.1); border: 1px solid rgba(173, 92, 255, 0.25); border-radius: 12px; padding: 16px; margin: 20px 0;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #BE7BFF; font-weight: 800;">📦 What you'll receive 1 week before the summit:</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #e2e8f0;">
              <li style="margin-bottom: 6px;">Official hands-on lab GitHub repositories & Starter code</li>
              <li style="margin-bottom: 6px;">AWS Free Tier & CloudShell setup prerequisites</li>
              <li style="margin-bottom: 6px;">Amazon Bedrock & GenAI track installation guides</li>
              <li>KIRO Buildathon hackathon problem statements & guidelines</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 28px 0 20px 0;">
            <a href="https://aws-sbg-piet.co.in/scd-panipat-2026/badge" style="background: #AD5CFF; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; display: inline-block;">
              Create Your Delegate Badge »
            </a>
          </div>

          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            Date: <strong>Friday, 11 September 2026</strong> • Venue: <strong>PIET Panipat, Haryana</strong>
          </p>
        </div>
      </div>
    `;

    // 2. Send Student Welcome Email & Organizer Notification
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [email],
            subject: "⚡ Confirmed: AWS Student Community Day 2026 Workshop Repos & Alerts",
            html: studentWelcomeHtml,
          }),
        });
      } catch (err) {
        console.error("Student confirmation dispatch error:", err);
      }

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [organizerEmail],
            subject: `[New Subscriber] ${email} joined Summit Alerts`,
            html: `<p>New student builder alert subscription: <strong>${email}</strong></p><p>Added to Resend Audience: <strong>SUMMIT ALERTS</strong></p>`,
          }),
        });
      } catch (err) {
        console.error("Organizer notification error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed to Summit Alerts successfully.",
    });
  } catch (error) {
    console.error("Subscribe API Error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
