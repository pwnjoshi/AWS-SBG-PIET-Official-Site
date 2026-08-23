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
    const senderEmail = process.env.RESEND_FROM_EMAIL || "AWS SBG PIET <site@awssbgpiet.in>";
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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Sponsorship Inquiry</title>
      </head>
      <body style="margin: 0; padding: 32px 16px; background-color: #05070E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #0A0F24; border: 1px solid rgba(173, 92, 255, 0.25); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 28px; background: linear-gradient(135deg, #180B38 0%, #2A0E5C 50%, #150930 100%); border-bottom: 1px solid rgba(173, 92, 255, 0.2); text-align: center;">
              <div style="display: inline-block; padding: 4px 14px; background: rgba(173, 92, 255, 0.15); border: 1px solid rgba(173, 92, 255, 0.4); border-radius: 9999px; margin-bottom: 12px;">
                <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #BE7BFF; letter-spacing: 1.5px; text-transform: uppercase;">
                  ⚡ PARTNERSHIP &amp; SPONSORSHIP PORTAL
                </span>
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
                New Sponsorship Inquiry
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #94A3B8; font-family: monospace;">
                AWS Student Community Day Panipat 2026 • PIET Campus
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px;">
              
              <!-- Company Highlight Box -->
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 20px; margin-bottom: 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                      <span style="font-size: 11px; font-family: monospace; color: #94A3B8; text-transform: uppercase; font-weight: 700;">COMPANY / ORGANIZATION</span>
                      <div style="font-size: 20px; font-weight: 900; color: #ffffff; margin-top: 4px;">${companyName}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 14px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="50%">
                            <span style="font-size: 10px; font-family: monospace; color: #94A3B8; text-transform: uppercase; font-weight: 700;">TARGET TIER</span>
                            <div style="font-size: 15px; font-weight: 800; color: #10B981; margin-top: 3px;">${tier || "Not specified"}</div>
                          </td>
                          <td width="50%">
                            <span style="font-size: 10px; font-family: monospace; color: #94A3B8; text-transform: uppercase; font-weight: 700;">CONTACT PERSON</span>
                            <div style="font-size: 15px; font-weight: 700; color: #ffffff; margin-top: 3px;">${contactPerson}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Contact Coordinates Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px 0; color: #94A3B8; font-weight: 600; width: 35%;">Work Email:</td>
                  <td style="padding: 10px 0; font-weight: 700;">
                    <a href="mailto:${email}" style="color: #BE7BFF; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px 0; color: #94A3B8; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="padding: 10px 0; color: #E2E8F0; font-weight: 600;">
                    ${phone || "Not provided"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0 0; color: #94A3B8; font-weight: 600; vertical-align: top;">Objectives / Message:</td>
                  <td style="padding: 12px 0 0 0; color: #F1F5F9; line-height: 1.6; white-space: pre-wrap;">${customGoals || "None specified"}</td>
                </tr>
              </table>

              <!-- Action Call to Action Button -->
              <div style="text-align: center; margin: 30px 0 10px 0;">
                <a href="mailto:${email}?subject=Re:%20AWS%20Student%20Community%20Day%20Panipat%202026%20Sponsorship" style="background: linear-gradient(135deg, #8E35EA, #AD5CFF); color: #ffffff; padding: 13px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; display: inline-block; box-shadow: 0 4px 15px rgba(173, 92, 255, 0.35);">
                  Reply Directly to ${contactPerson} &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: rgba(0, 0, 0, 0.25); border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748B; font-family: monospace;">
                Delivered automatically from <a href="https://aws-sbg-piet.co.in" style="color: #94A3B8; text-decoration: none;">aws-sbg-piet.co.in</a> &bull; Recipient: ${receiverEmail}
              </p>
            </td>
          </tr>

        </table>
      </body>
      </html>
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
