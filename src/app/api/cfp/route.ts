import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, roleCompany, track, title, abstract, bio } = body;

    if (!name || !email || !title || !abstract) {
      return NextResponse.json(
        { error: "Speaker name, email, talk title, and abstract are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CFP_RECEIVER_EMAIL || "joshipawan2021@gmail.com";
    const senderEmail = process.env.RESEND_FROM_EMAIL || "AWS SBG PIET <onboarding@resend.dev>";

    const cfpDetailsHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #8E35EA, #AD5CFF); padding: 24px; border-radius: 12px; color: #ffffff; text-align: center; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">New Speaker Session Proposal (CFP)</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; font-family: monospace;">AWS Student Community Day Panipat 2026</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b; width: 35%;">Speaker Name:</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Email Address:</td>
            <td style="padding: 12px 8px;"><a href="mailto:${email}" style="color: #8E35EA; font-weight: 700; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Organization / Role:</td>
            <td style="padding: 12px 8px; color: #0f172a;">${roleCompany || "Not specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Target Track:</td>
            <td style="padding: 12px 8px; font-weight: 800; color: #10B981;">${track || "General"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Talk Title:</td>
            <td style="padding: 12px 8px; font-weight: 700; color: #0f172a;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; font-weight: 700; color: #64748b; vertical-align: top;">Abstract:</td>
            <td style="padding: 12px 8px; color: #0f172a; white-space: pre-wrap; line-height: 1.5;">${abstract}</td>
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
            subject: `[Speaker CFP] ${title} (${name} - ${roleCompany || "Speaker"})`,
            html: cfpDetailsHtml,
          }),
        });

        if (!response.ok) {
          const resendError = await response.json().catch(() => ({}));
          console.error("Resend CFP Error:", resendError);
        }
      } catch (err) {
        console.error("Resend CFP dispatch failed:", err);
      }
    } else {
      console.log("No RESEND_API_KEY configured. CFP Proposal logged:", {
        name,
        email,
        roleCompany,
        track,
        title,
        abstract,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Speaker proposal received successfully.",
    });
  } catch (error) {
    console.error("CFP API Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your proposal." },
      { status: 500 }
    );
  }
}
