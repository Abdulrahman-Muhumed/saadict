import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2 style="color:#24365C;font-size:22px;font-family:sans-serif;">New Contact Message</h2>
        <p style="font-family:sans-serif;color:#334155;"><strong>Name:</strong> ${name}</p>
        <p style="font-family:sans-serif;color:#334155;"><strong>Email:</strong> ${email}</p>
        <p style="font-family:sans-serif;color:#334155;"><strong>Company:</strong> ${company}</p>
        <p style="font-family:sans-serif;color:#334155;"><strong>Inquiry:</strong> ${service}</p>
        <p style="font-family:sans-serif;color:#334155;"><strong>Message:</strong></p>
      <div style="padding:16px;border-left:4px solid #4C8FC4;background:#f8fafc;color:#24365C;font-family:sans-serif;line-height:1.5;">
        ${message}
      </div>
    `;

    await transporter.sendMail({
      from: `SAAD ICT Website <${process.env.SMTP_USER}>`,
      to: "info@saadict.com",
      subject: "New Contact Form Message",
      html,
    });

    return Response.json({ ok: true });

  } catch (err: any) {
    console.log("Contact form error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
