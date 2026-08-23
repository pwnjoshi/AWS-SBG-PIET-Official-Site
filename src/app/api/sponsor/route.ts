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

    const mailerliteApiKey = process.env.MAILERLITE_API_KEY;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const receiverEmail = process.env.SPONSOR_RECEIVER_EMAIL || process.env.BREVO_RECEIVER_EMAIL || "aws-sbg@piet.co.in";
    const senderEmail = process.env.SPONSOR_SENDER_EMAIL || process.env.BREVO_SENDER_EMAIL || "aws-sbg@piet.co.in";
    const senderName = "AWS SBG PIET Summit Portal";

    const inquiryDetailsHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #8E35EA, #AD5CFF); padding: 20px; border-radius: 8px; color: #ffffff; text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 22px;">New Sponsorship / Partnership Inquiry</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">AWS Student Community Day Panipat 2026</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568; width: 35%;">Company Name:</td>
            <td style="padding: 10px; color: #1a202c;">${companyName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Contact Person:</td>
            <td style="padding: 10px; color: #1a202c;">${contactPerson}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Work Email:</td>
            <td style="padding: 10px; color: #8E35EA;"><a href="mailto:${email}" style="color: #8E35EA; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Phone / WhatsApp:</td>
            <td style="padding: 10px; color: #1a202c;">${phone || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Target Tier:</td>
            <td style="padding: 10px; font-weight: bold; color: #10B981;">${tier || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #4a5568; vertical-align: top;">Objectives & Notes:</td>
            <td style="padding: 10px; color: #1a202c; white-space: pre-wrap;">${customGoals || "None specified"}</td>
          </tr>
        </table>

        <div style="padding: 15px; background-color: #f7fafc; border-radius: 8px; border: 1px dashed #cbd5e0; font-size: 12px; color: #718096; text-align: center;">
          Received via the official AWS Student Community Day Panipat 2026 website.
        </div>
      </div>
    `;

    // 1. MailerLite Integration: Subscribe lead directly to MailerLite
    if (mailerliteApiKey) {
      try {
        const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${mailerliteApiKey}`,
          },
          body: JSON.stringify({
            email,
            fields: {
              name: contactPerson,
              company: companyName,
              phone: phone || "",
              notes: `Tier: ${tier || "Inquiry"} | Goals: ${customGoals || "N/A"}`,
            },
            status: "active",
          }),
        });

        if (!mlResponse.ok) {
          const mlError = await mlResponse.json().catch(() => ({}));
          console.error("MailerLite API Error:", mlError);
        }
      } catch (err) {
        console.error("MailerLite dispatch failed:", err);
      }
    }

    // 2. Brevo Email Integration fallback
    if (brevoApiKey) {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: receiverEmail, name: "AWS SBG PIET Sponsorship Team" }],
          replyTo: { email: email, name: contactPerson },
          subject: `[Sponsorship Inquiry] ${companyName} - ${tier || "Partnership"} (${contactPerson})`,
          htmlContent: inquiryDetailsHtml,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Brevo API Error:", errorData);
      }
    }

    if (!mailerliteApiKey && !brevoApiKey) {
      console.log("No MAILERLITE_API_KEY or BREVO_API_KEY configured. Sponsorship inquiry logged:", {
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
