import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, contactPerson, email, phone, tier, customGoals } = body;

    // Validate required fields
    if (!companyName || !contactPerson || !email) {
      return NextResponse.json(
        { error: "Company name, contact person, and email are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.SPONSOR_RECEIVER_EMAIL || "info@awssbgpiet.in";
    const senderEmail = process.env.RESEND_FROM_EMAIL || "AWS SBG PIET <onboarding@resend.dev>";
    const generalAudienceId = "7abce8e8-acf6-4f09-9700-a4cf979adf03";

    // 1. Add Sponsor to Resend Contacts Audience
    if (resendApiKey) {
      try {
        await fetch(`https://api.resend.com/audiences/${generalAudienceId}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            first_name: contactPerson,
            unsubscribed: false,
          }),
        });
      } catch (err) {
        console.error("Resend sponsor audience contact error:", err);
      }
    }

    const inquiryDetailsHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #8E35EA, #AD5CFF); padding: 24px; border-radius: 12px; color: #ffffff; text-align: center; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">New Sponsorship / Live Inquiry</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; font-family: monospace;">AWS Student Community Day Panipat 2026</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b; width: 35%;">Company / Org:</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${companyName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Contact Person:</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${contactPerson}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Work Email:</td>
            <td style="padding: 12px 8px;"><a href="mailto:${email}" style="color: #8E35EA; font-weight: 700; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Phone / WhatsApp:</td>
            <td style="padding: 12px 8px; color: #0f172a;">${phone || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Target Tier:</td>
            <td style="padding: 12px 8px; font-weight: 800; color: #10B981;">${tier || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b; vertical-align: top;">Message / Goals:</td>
            <td style="padding: 12px 8px; color: #0f172a; white-space: pre-wrap; line-height: 1.5;">${customGoals || "None specified"}</td>
          </tr>
        </table>

        <div style="padding: 14px; background-color: #f8fafc; border-radius: 10px; border: 1px dashed #cbd5e1; font-size: 12px; color: #64748b; text-align: center;">
          Received via the official AWS Student Community Day Panipat 2026 website portal.
        </div>
      </div>
    `;

    // Send email via Resend API
    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [receiverEmail],
            reply_to: email,
            subject: `[Sponsorship Inquiry] ${companyName} - ${tier || "Partnership"} (${contactPerson})`,
            html: inquiryDetailsHtml,
          }),
        });

        if (!response.ok) {
          const resendError = await response.json().catch(() => ({}));
          console.error("Resend API Error:", resendError);
        }
      } catch (err) {
        console.error("Resend dispatch failed:", err);
      }
    } else {
      console.log("No RESEND_API_KEY configured. Sponsorship inquiry logged:", {
        companyName,
        contactPerson,
        email,
        phone,
        tier,
        customGoals,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Sponsorship inquiry received successfully.",
    });
  } catch (error) {
    console.error("Sponsor API Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your inquiry." },
      { status: 500 }
    );
  }
}
