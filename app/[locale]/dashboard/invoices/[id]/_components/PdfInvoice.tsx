"use client";

export default function handlePrintInvoice(invoice: any, lines: any[]) {
  const headerLogoUri = "/brand/hg_icon.png";
  const watermarkUri = "/brand/hg_icon_light.png";
  const stamplogo = "/brand/hoggaan_stamp2.png";
  const hoggan_footer = "/brand/hoggan_footer.png";

  const fmt = (n: number) =>
    Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 });

  // 🧮 Totals
  const totals: { sub: number; tax: number; disc: number; grand: number } = {
    sub: (lines || []).reduce(
      (a, l) =>
        a +
        Number(
          l.total ?? (Number(l.qty || 0) * Number(l.unit_price || l.price || 0))
        ),
      0
    ),
    tax: Number(invoice?.tax || 0),
    disc: Number(invoice?.discount || 0),
    grand: 0,
  };
  totals.grand = totals.sub + totals.tax - totals.disc;

  const amountPaid = Number(invoice?.amount_paid || 0);
  const amountDue = Math.max(0, totals.grand - amountPaid);
  const status = invoice.status || "unpaid";

  // 🧾 Rows
  const itemsHTML = (lines || [])
    .map(
      (l) => `
      <tr>
        <td style="font-size:12px; color:black;">${l.item_name || ""}</td>
        <td style="font-size:12px; color:black;">${l.description || ""}</td>
        <td style="text-align:right; font-size:12px; color:black;">${fmt(
          l.unit_price
        )}</td>
        <td style="text-align:center; font-size:12px; color:black;">${
          l.qty || 0
        }</td>
        <td style="text-align:right; font-size:12px; color:black;">${fmt(
          (l.qty || 0) * l.unit_price
        )}</td>
      </tr>`
    )
    .join("");

  // 🖨️ Invoice HTML (identical design to Dashboard 1)
  const html = `
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Inter', Arial, sans-serif;
      color: #1e293b;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: #fff;
    }
    .wrapper { padding: 12mm 15mm; }
    .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
    .invoice-logo { width: 200px; height: 80px; object-fit: contain; margin-top: 10px; }
    .invoice-logo2 { width: 200px; height: 140px; object-fit: contain; position: absolute; bottom: 250px; right: 30px; }
    .company { text-align: right; font-size: 12px; line-height: 1.7; color: #475569; }

    h2 {
      text-align: right;
      margin-top: 50px;
      margin-bottom: 20px;
      font-size: 28px;
      font-weight: 700;
      color: #241c72;
      letter-spacing: 0.3px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 8px;
    }
    th {
      padding: 8px 6px;
      text-align: left;
      border-bottom: 1px solid #cbd5e1;
      background: #241c72 !important;
      font-weight: 600;
      color: #ffffff;
    }
    td {
      padding: 8px 6px;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    tr:last-child td { border-bottom: none; }
    tbody tr:nth-child(even) td { background: #f8fafc; }
    tbody tr:hover td { background: #f1f5f9; }

    .grand_color {
      background: #241c72 !important;
      font-weight: 600;
      color: #ffffff;
    }

    .summary-table {
      width: 50%;
      margin-top: 24px;
      font-size: 12px;
      border-collapse: collapse;
    }
    .summary-table td {
      padding: 6px 4px;
      border: none;
    }
    .summary-table tr td:first-child {
      color: #475569;
      font-weight: 500;
    }
    .summary-table tr td:last-child {
      text-align: right;
      font-family: 'Inter', Arial, sans-serif;
    }

    /* Ensure only Grand Total row is colored */
    .summary-table tr.grand_color td {
      background: #241c72 !important;
      color: #ffffff;
    }

    .payment-details {
      margin-top: 30px;
      padding-left: 10px;
      border-left: 3px solid #241c72;
      font-size: 11px;
      color: #1e293b;
      line-height: 1.75;
    }

    .payment-details strong {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #0b1020;
      margin-bottom: 6px;
      letter-spacing: 0.2px;
    }

    .due-status {
      background-color: #fee2e2;
      color: #b91c1c;
      font-weight: 700;
      padding: 4px 10px;
      display: inline-block;
      margin-top: 25px;
      border-radius: 4px;
      text-transform: uppercase;
      font-size: 11px;
    }

    .watermark {
      position: fixed;
      top: 51%;
      left: 33%;
      transform: translate(-50%, -50%);
      width: 35%;
      max-width: 400px;
      opacity: 0.05;
      pointer-events: none;
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .footer-image { width: 100%; display: block; }

    @page { margin: 0; }
    @media print { body { margin: 0; } }
  </style>

  <div class="watermark"><img src="${watermarkUri}" /></div>

  <div class="wrapper">
    <div class="top">
      <div><img src="${headerLogoUri}" class="invoice-logo" /></div>
      ${
        status === "paid"
          ? `<div><img src="${stamplogo}" class="invoice-logo2" /></div>`
          : ""
      }
      <div class="company">
        <p>
          <strong>Hoggaan Travels</strong><br/>
          HODON, TALEX, TCC, A43<br/>
          MOGADISHU, SOMALIA<br/>
          SALES@HOGGAANTRAVEL.COM
        </p>
      </div>
    </div>

    <h2>INVOICE</h2>

    <div style="
      display:flex;
      justify-content:space-between;
      margin-bottom:25px;
      padding-bottom:10px;
      gap:20px;
      font-family:'Inter', Arial, sans-serif;
    ">
      <!-- Left: Client/Billing -->
      <div style="
          width:48%;
          line-height:1.7;
          border-left:3px solid #241c72;
          padding-left:14px;">
          <strong style="
          font-size:13px;
          display:block;
          margin-bottom:10px;
          color:#0b1020;
          letter-spacing:0.2px;
          ">
              CLIENT / BILLING DETAILS
          </strong>
          <div style="font-size:13px; color:#1e293b; margin-bottom:4px;">
              <span style="font-weight:500;">${invoice.bill_to_name || ""}</span>
          </div>
          <div style="font-size:12.5px; color:#475569;">
              <span>${invoice.bill_to_phone || ""}</span>
          </div>
      </div>

      <!-- Right: Invoice Info -->
      <div style="
          width:48%;
          text-align:right;
          line-height:1.7;
          font-size:13px;
          color:#1e293b;">
          <div><span style="font-weight:500;">Invoice No.:</span> ${
            invoice.invoice_number || invoice.number || invoice.id
          }</div>
          <div><span style="font-weight:500;">Invoice Date:</span> ${
            invoice.issue_date
              ? new Date(invoice.issue_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""
          }</div>
          <div><span style="font-weight:500;">Due Date:</span> ${
            invoice.due_date
              ? new Date(invoice.due_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""
          }</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width:20%;">Item</th>
          <th style="width:40%;">Description</th>
          <th style="width:15%; text-align:right;">Unit Price</th>
          <th style="width:10%; text-align:center;">Qty</th>
          <th style="width:15%; text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${
          itemsHTML ||
          `<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:12px;">No items</td></tr>`
        }
      </tbody>
    </table>

    <table class="summary-table">
        <tr><td>Sub Total</td><td style="color:black;">$ ${fmt(totals.sub)}</td></tr>
        <tr><td>Tax</td><td style="color:black;">$ ${fmt(totals.tax)}</td></tr>
        <tr class="grand_color"><td><strong>Grand Total</strong></td><td style="color:white;">$ ${fmt(totals.grand)}</td></tr>
        <tr><td>Amount Paid</td><td style="color:black;">$ ${fmt(amountPaid)}</td></tr>
        <tr><td><strong>Amount Due</strong></td><td style="color:black;"><strong>$ ${fmt(amountDue)}</strong></td></tr>
    </table>

    ${
      status === "unpaid" || status === "void" || status === "issued"
        ? `<div class="due-status">This invoice remains unpaid</div>`
        : ""
    }

    <div class="payment-details">
      <strong style="font-size: 12px;">Payment Instructions</strong>
      <p style="margin-top: 5px;">
        Please make payment to the following account before the due date.<br/>
        --------------------------------------------------<br/>
        <strong>
          Account Name: HOGGAAN TRAVEL<br/>
          EVC: 061 9100000<br/>
          Salam Bank: 34834829<br/>
          Sombank: 1000522402<br/>
        </strong>
      </p>
    </div>

    <div style="text-align:center; margin-top:90px; font-size:13px; color:#475569;">
      Thank you for choosing <strong>Hoggaan Travels</strong>, your trusted partner
    </div>
  </div>

  <div class="footer">
    <img src="${hoggan_footer}" class="footer-image" />
  </div>
  `.trim();

  // 🖨️ Print logic (same as all other sections)
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  doc?.open();
  doc?.write(html);
  doc?.close();

  iframe.contentWindow?.focus();
  iframe.contentWindow?.print();

  setTimeout(() => document.body.removeChild(iframe), 1200);
}
