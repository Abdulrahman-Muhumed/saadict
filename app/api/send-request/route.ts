import nodemailer from "nodemailer";

const YELLOW = "#FACC15";

/* --------------------------------------------
   PREMIUM TEMPLATE: CUSTOMER CONFIRMATION
--------------------------------------------- */
function customerTemplate(company: string, service: string, serviceCode: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#000;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#ffffff;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border:1px solid #e5e5e5;border-radius:12px;background:#ffffff;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:24px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
                <h1 style="margin:0;font-size:22px;font-weight:700;color:#000;">
                  HornBox Logistics
                </h1>
                <p style="margin:8px 0 0;font-size:13px;color:#555;">
                  Request Confirmation
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px;color:#000;font-size:15px;line-height:1.7;">

                <p>Hello <strong>${company}</strong>,</p>

                <p>
                  Thank you for contacting <strong>HornBox Logistics</strong>.
                  We have successfully received your request for the service below:
                </p>

                <div style="margin:18px 0;padding:14px 16px;background:#f8f8f8;border-left:4px solid #f5b800;">
                  <p style="margin:0;font-size:14px;">
                    <strong>Service:</strong> ${service} &nbsp; | &nbsp; ${serviceCode}
                  </p>
                </div>

                <p>
                  Our support team will contact you shortly with the next steps.
                  If this request was not submitted by you, please ignore this email.
                </p>

                <p style="margin-top:28px;font-size:12px;color:#666;">
                  This is an automated confirmation email.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px;text-align:center;border-top:1px solid #e5e5e5;background:#fafafa;">
                <p style="margin:0;font-size:12px;color:#777;">
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
  <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#000;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#ffffff;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid #e5e5e5;border-radius:12px;background:#ffffff;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:24px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
                <h1 style="margin:0;font-size:20px;font-weight:700;color:#000;">
                  🔔 New Service Request
                </h1>
                <p style="margin:8px 0 0;font-size:13px;color:#555;">
                  Incoming Lead Notification
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px;font-size:15px;line-height:1.7;color:#000;">

                <p>A new service request has been submitted from the website.</p>

                <div style="margin:16px 0;padding:16px;background:#f8f8f8;border-left:4px solid #f5b800;">
                  <p style="margin:0;"><strong>Service:</strong> ${service} | ${serviceCode}</p>
                  <p style="margin:0;"><strong>Company:</strong> ${company}</p>
                  <p style="margin:0;"><strong>Email:</strong> ${email}</p>
                </div>

                <p style="margin:0 0 8px;"><strong>Request Notes:</strong></p>

                <div style="padding:14px 16px;background:#f8f8f8;border-radius:6px;font-size:14px;white-space:pre-line;">
                  ${details}
                </div>

                <p style="margin-top:28px;font-size:12px;color:#666;">
                  Internal system alert — HornBox Sales Department.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px;text-align:center;border-top:1px solid #e5e5e5;background:#fafafa;">
                <p style="margin:0;font-size:12px;color:#777;">
                  © ${new Date().getFullYear()} HornBox LLC — Confidential Sales Notification
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
      html: salesTemplate(company, email, details, service, serviceCode),
    });

    return Response.json({ ok: true });

  } catch (err: any) {
    console.log("Email error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
