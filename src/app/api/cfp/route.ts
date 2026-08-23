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

    const brevoApiKey = process.env.BREVO_API_KEY;
    const receiverEmail = process.env.BREVO_RECEIVER_EMAIL || "aws-sbg@piet.co.in";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "aws-sbg@piet.co.in";
    const senderName = "AWS SBG PIET CFP Portal";

    const cfpDetailsHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #8E35EA, #AD5CFF); padding: 20px; border-radius: 8px; color: #ffffff; text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 22px;">New Speaker Session Proposal (CFP)</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">AWS Student Community Day Panipat 2026</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568; width: 35%;">Speaker Name:</td>
            <td style="padding: 10px; color: #1a202c;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Email Address:</td>
            <td style="padding: 10px; color: #8E35EA;"><a href="mailto:${email}" style="color: #8E35EA; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Organization / Role:</td>
            <td style="padding: 10px; color: #1a202c;">${roleCompany || "Not specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Target Track:</td>
            <td style="padding: 10px; font-weight: bold; color: #10B981;">${track || "General"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; font-weight: bold; color: #4a5568;">Talk Title:</td>
            <td style="padding: 10px; font-weight: bold; color: #1a202c;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #4a5568; vertical-align: top;">Abstract:</td>
            <td style="padding: 10px; color: #1a202c; white-space: pre-wrap;">${abstract}</td>
          </tr>
        </table>

        <div style="padding: 15px; background-color: #f7fafc; border-radius: 8px; border: 1px dashed #cbd5e0; font-size: 12px; color: #718096; text-align: center;">
          Received via the official AWS Student Community Day Panipat 2026 website.
        </div>
      </div>
    `;

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
          to: [{ email: receiverEmail, name: "AWS SBG Review Committee" }],
          replyTo: { email: email, name: name },
          subject: `[Speaker CFP] ${title} (${name} - ${roleCompany || "Speaker"})`,
          htmlContent: cfpDetailsHtml,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Brevo CFP Error:", errorData);
      }
    } else {
      console.log("No BREVO_API_KEY configured. CFP Proposal logged:", {
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
