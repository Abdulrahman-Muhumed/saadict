import nodemailer from "nodemailer";

const YELLOW = "#FACC15";

/* --------------------------------------------
   PREMIUM TEMPLATE: CUSTOMER CONFIRMATION
--------------------------------------------- */
function customerTemplate(company: string, service: string, serviceCode: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111111;border-radius:12px;overflow:hidden;border:1px solid #1f1f1f;">

              <tr>
                <td style="padding:30px 40px;text-align:center;background:#0d0d0d;border-bottom:1px solid #1f1f1f;">
                  <h1 style="color:${YELLOW};margin:0;font-size:26px;font-weight:700;">HornBox Logistics</h1>
                  <p style="color:#999;margin:8px 0 0;font-size:13px;">Request Confirmation</p>
                </td>
              </tr>

              <tr>
                <td style="padding:35px 40px;color:#e6e6e6;font-size:15px;line-height:1.7;">
                  <p style="margin:0 0 10px;">Hello <strong style="color:#fff;">${company}</strong>,</p>

                  <p>
                    Thank you for reaching out to <strong style="color:${YELLOW};">HornBox Logistics</strong>.
                    We have received your request for the following service:
                  </p>

                  <p style="margin:15px 0;padding:14px;background:#0d0d0d;border-left:4px solid ${YELLOW};font-size:14px;">
                    <strong style="color:#fff;">Service:</strong> ${service} | ${serviceCode}
                  </p>

                  <p>
                    Our support specialists have been notified and will contact you shortly
                    with the next steps.
                  </p>

                  <p style="margin-top:30px;color:#aaa;font-size:13px;">This is an automated confirmation.</p>
                </td>
              </tr>

              <tr>
                <td style="padding:20px 40px;text-align:center;background:#0d0d0d;border-top:1px solid #1f1f1f;">
                  <p style="color:#777;font-size:12px;margin:0;">
                    © ${new Date().getFullYear()} HornBox LLC — All Rights Reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

/* --------------------------------------------
   PREMIUM TEMPLATE: SALES TEAM NOTIFICATION
--------------------------------------------- */
function salesTemplate(company: string, email: string, details: string, service: string, serviceCode: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111111;border-radius:12px;overflow:hidden;border:1px solid #1f1f1f;">

              <tr>
                <td style="padding:30px 40px;text-align:center;background:#0d0d0d;border-bottom:1px solid #1f1f1f;">
                  <h1 style="color:${YELLOW};margin:0;font-size:24px;font-weight:700;">🔔 New Service Request</h1>
                  <p style="color:#999;margin:8px 0 0;font-size:13px;">Incoming Lead</p>
                </td>
              </tr>

              <tr>
                <td style="padding:35px 40px;color:#e6e6e6;font-size:15px;line-height:1.7;">

                  <p style="margin-top:0;">A new service request has been submitted.</p>

                  <div style="margin:10px 0 20px;padding:18px;background:#0d0d0d;border-left:4px solid ${YELLOW};font-size:14px;">
                    <p style="margin:0;"><strong style="color:#fff;">Service:</strong> ${service} | ${serviceCode}</p>
                    <p style="margin:0;"><strong style="color:#fff;">Company:</strong> ${company}</p>
                    <p style="margin:0;"><strong style="color:#fff;">Email:</strong> ${email}</p>
                  </div>

                  <p style="margin:0 0 10px;color:#ccc;font-size:14px;">
                    <strong style="color:${YELLOW};">Request Notes:</strong>
                  </p>

                  <p style="padding:14px;background:#0d0d0d;font-size:14px;border-radius:6px;margin:0 0 20px;">
                    ${details}
                  </p>

                  <p style="margin-top:30px;color:#999;font-size:12px;">
                    Automated alert from HornBox Website – Sales Only.
                  </p>

                </td>
              </tr>

              <tr>
                <td style="padding:20px 40px;text-align:center;background:#0d0d0d;border-top:1px solid #1f1f1f;">
                  <p style="color:#777;font-size:12px;margin:0;">
                    © ${new Date().getFullYear()} HornBox LLC — Internal Notification
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

/* --------------------------------------------
   MAIN API
--------------------------------------------- */
export async function POST(req: Request) {
  try {
    const { company, email, details, service, serviceCode } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* ------------------------------
       1️⃣ Send Confirmation to User
    ------------------------------ */
    await transporter.sendMail({
      from: `HornBox LLC <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We Received Your Request – HornBox Logistics",
      html: customerTemplate(company, service, serviceCode),
    });

    /* ------------------------------
       2️⃣ Send Lead to Sales Team
    ------------------------------ */
    await transporter.sendMail({
      from: `HornBox LLC (New Request) <${process.env.SMTP_USER}>`,
      to: "sales@hornboxllc.com",
      subject: `New Service Request – ${service}`,
      html: salesTemplate(company, email, details, service , serviceCode),
    });

    return Response.json({ ok: true });

  } catch (err: any) {
    console.log("Email error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
