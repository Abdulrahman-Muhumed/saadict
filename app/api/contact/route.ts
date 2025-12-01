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
      <h2 style="color:#FACC15;font-size:22px;">New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <div style="padding:12px;border-left:3px solid #FACC15;background:#111;color:#fff;">
        ${message}
      </div>
    `;

    await transporter.sendMail({
      from: `HornBox Website <${process.env.SMTP_USER}>`,
      to: "info@hornboxllc.com",
      subject: "New Contact Form Message",
      html,
    });

    return Response.json({ ok: true });

  } catch (err: any) {
    console.log("Contact form error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
