"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

import HajjHeader from "./_components/HajjHeader";
import PilgrimTable from "./_components/PilgrimTable";
import StatChip from "./_components/StatChip";
import ViewModal from "./_components/ViewModal";
import ConfirmDialog from "./_components/ConfirmDialog";
import Toast from "./_components/Toast";
import RequestsList from "./_components/RequestsList";
import PilgrimForm from "./_components/PilgrimForm";

/* ─────────────────────────── Supabase ─────────────────────────── */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ─────────────────────────── Consts / helpers ─────────────────────────── */
const ACTIVE_STATUSES = ["approved", "confirmed"];
const BUCKET_NAME = "pilgrims";
const BASE_FOLDER = "hajj-2026";

const fmtMoney = (n?: number) =>
  Number(n || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

const slug = (v = "") =>
  v.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const extOfFile = (file: File) => {
  const e = file?.name?.split(".").pop() || "bin";
  return e.toLowerCase();
};

/* ─────────────────────────── PageContent ─────────────────────────── */
export default function PageContent() {
  const [loading, setLoading] = useState(true);

  // data
  const [active, setActive] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [q, setQ] = useState("");

  // stats
  const [stats, setStats] = useState({ total: 0, confirmed: 0, approved: 0, pending: 0 });
  const [money, setMoney] = useState({ paidSum: 0, remainingSum: 0 });

  // ui
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState<any>(null);
  const [viewing, setViewing] = useState<any>(null);
  const [confirmRow, setConfirmRow] = useState<any>(null);
  const [toast, setToast] = useState({ open: false, text: "" });

  // local table pagination (client-side for filtered list)
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  /* ─────────────────────────── Load data ─────────────────────────── */
  async function load() {
    setLoading(true);

    const { data: act } = await supabase
      .from("hajj_users")
      .select("*")
      .in("status", ACTIVE_STATUSES)
      .order("approved_at", { ascending: false });

    const { data: req } = await supabase
      .from("hajj_users")
      .select("*")
      .eq("status", "pending")
      .order("requested_at", { ascending: false });

    const { data: all } = await supabase.from("hajj_users").select("status, paid, total");

    const total =
      all?.filter((r) => r.status === "confirmed" || r.status === "approved").length || 0;
    const confirmed = all?.filter((r) => r.status === "confirmed").length || 0;
    const approved = all?.filter((r) => r.status === "approved").length || 0;
    const pendingCount = all?.filter((r) => r.status === "pending").length || 0;

    const paidSum = act?.reduce((s, r) => s + Number(r.paid || 0), 0) || 0;
    const remainingSum =
      act?.reduce(
        (s, r) => s + Math.max(Number(r.total || 0) - Number(r.paid || 0), 0),
        0
      ) || 0;

    setActive(act || []);
    setPending(req || []);
    setStats({ total, confirmed, approved, pending: pendingCount });
    setMoney({ paidSum, remainingSum });
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  /* ─────────────────────────── Filter + paginate ─────────────────────────── */
  const filtered = useMemo(() => {
    if (!q.trim()) return active;
    const t = q.toLowerCase();
    return active.filter(
      (r) =>
        r.full_name?.toLowerCase().includes(t) ||
        r.passport_number?.toLowerCase().includes(t) ||
        r.phone_number?.toLowerCase().includes(t)
    );
  }, [q, active]);

  useEffect(() => {
    setPage(1);
  }, [q, active.length]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    [filtered.length]
  );
  const visible = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* ─────────────────────────── CRUD ─────────────────────────── */
  async function remove(id: string) {
    const { error } = await supabase.from("hajj_users").delete().eq("id", id);
    if (!error) {
      setConfirmRow(null);
      setToast({ open: true, text: "Pilgrim deleted." });
      await load();
    }
  }

  async function createRow(payload: any) {
    const { full_name, passport_number, phone_number, status, passportFile, paid, total } =
      payload;
    try {
      let key: string | null = null;

      if (passportFile) {
        key = `${BASE_FOLDER}/${slug(full_name)}-${crypto.randomUUID()}.${extOfFile(
          passportFile
        )}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(key, passportFile, {
            upsert: false,
            cacheControl: "3600",
            contentType: passportFile.type || undefined,
          });
        if (upErr) throw upErr;
      }

      const row = {
        full_name: full_name?.trim(),
        passport_number: passport_number?.trim(),
        phone_number,
        status: status || "approved",
        passport_file_key: key || null,
        paid: Number(paid || 0),
        total: Number(total || 4543.5),
      };

      const { error: dbErr } = await supabase.from("hajj_users").insert(row);
      if (dbErr) throw dbErr;

      setAddOpen(false);
      await load();
      setToast({ open: true, text: "Pilgrim created." });
    } catch (e: any) {
      setToast({ open: true, text: e.message || "Failed to create pilgrim." });
    }
  }

  async function saveEdit(payload: any) {
    const { id, passportFile, ...rest } = payload;
    const updateObj: any = {
      full_name: rest.full_name?.trim(),
      passport_number: rest.passport_number?.trim(),
      phone_number: rest.phone_number?.trim() || null,
      status: rest.status || "approved",
      paid: Number(rest.paid || 0),
      total: Number(rest.total || 4543.5),
    };

    try {
      if (passportFile) {
        const key = `${BASE_FOLDER}/${slug(updateObj.full_name)}-${crypto.randomUUID()}.${extOfFile(
          passportFile
        )}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(key, passportFile, { upsert: false });
        if (upErr) throw upErr;
        updateObj.passport_file_key = key;
      }

      const { error } = await supabase.from("hajj_users").update(updateObj).eq("id", id);
      if (error) throw error;
      setEditOpen(false);
      await load();
      setToast({ open: true, text: "Pilgrim updated." });
    } catch (e: any) {
      setToast({ open: true, text: e.message || "Failed to update pilgrim." });
    }
  }

  /* ─────────────────────────── Requests actions ─────────────────────────── */
  async function approve(id: string) {
    const { data: u } = await supabase.auth.getUser();
    const approved_by = u?.user?.id || null;
    const { error } = await supabase
      .from("hajj_users")
      .update({ status: "approved", approved_at: new Date().toISOString(), approved_by })
      .eq("id", id);
    if (!error) {
      await load();
      setToast({ open: true, text: "Request approved." });
    }
  }

  async function reject(id: string) {
    const { error } = await supabase.from("hajj_users").update({ status: "rejected" }).eq("id", id);
    if (!error) {
      await load();
      setToast({ open: true, text: "Request rejected." });
    }
  }

  /* ─────────────────────────── Print (with / without money) ─────────────────────────── */
function buildPrintableHtml(rows: any[], withMoney: boolean) {
  const headerLogoUri = "/brand/hg_icon.png";
  const watermarkUri = "/brand/hg_icon_light.png";
  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const reportTitle = "Hajj 2026 Pilgrims List";
  const reportType = withMoney ? "2026 Hajj Report (With Amounts)" : "2026 Hajj | Pilgrims List";

  // 🧮 Totals
  const totalPaid = rows.reduce((sum, r) => sum + (r.paid ?? 0), 0);
  const totalRemaining = rows.reduce(
    (sum, r) => sum + Math.max((r.total ?? 0) - (r.paid ?? 0), 0),
    0
  );

  const itemsHTML = rows
    .map(
      (r, i) => `
        <tr>
          <td style="width:4%; text-align:center;">${i + 1}</td>
          <td style="width:26%;">${r.full_name || ""}</td>
          <td style="width:18%;">${r.passport_number || ""}</td>
          <td style="width:15%;">${r.phone_number || "—"}</td>
          ${
            withMoney
              ? `<td style="width:10%; text-align:right;">${fmtMoney(r.paid)}</td>
                 <td style="width:10%; text-align:right;">${fmtMoney(
                   Math.max((r.total ?? 0) - (r.paid ?? 0), 0)
                 )}</td>`
              : ``
          }
        </tr>`
    )
    .join("");

  // 🧾 Totals row (only if withMoney)
  const totalsRow = withMoney
    ? `
      <tr style="background:#e7f3ff;font-weight:600;border-top:2px solid #94a3b8;">
        <td colspan="4" style="text-align:right;padding:10px 6px;">TOTALS</td>
        <td style="text-align:right;padding:10px 6px;">${fmtMoney(totalPaid)}</td>
        <td style="text-align:right;padding:10px 6px;">${fmtMoney(totalRemaining)}</td>
      </tr>
    `
    : "";

  return `
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        color: #1e293b;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      @page {
        size: Letter portrait;
        margin: 7.5mm;
      }
      .wrapper {
        width: 210mm;
        max-width: 210mm;
        margin: 0 auto;
        padding: 12mm 15mm;
        background: white;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .invoice-logo {
        width: 140px;
        height: 48px;
        object-fit: contain;
        margin-top: 6px;
      }
      .company-info {
        text-align: right;
        font-size: 12px;
        line-height: 1.6;
      }
      .company-info strong {
        font-size: 13px;
        color: #241c72;
      }
      h2 {
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        color: #241c72;
        margin-top: 50px;
        text-transform: uppercase;
      }
      .meta-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 12px;
        color: #475569;
      }
      .meta-row div span {
        font-weight: 600;
        color: #1e293b;
      }
      table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        font-size: 12px;
      }
      th {
        padding: 8px 6px;
        text-align: left;
        border-bottom: 1px solid #cbd5e1;
        background: #ddebfa !important;
        font-weight: 600;
      }
      td {
        padding: 8px 6px;
        border-bottom: 1px solid #eef2f7;
        word-wrap: break-word;
      }
      tr:nth-child(even) td { background: #f9fbff; }
      .watermark {
        position: fixed;
        top: 55%;
        left: 30%;
        transform: translate(-50%, -50%);
        width: 30%;
        opacity: 0.06;
        pointer-events: none;
      }
      @media print {
        thead { display: table-header-group; }
        tfoot { display: table-footer-group; }
        tr { page-break-inside: avoid; }
      }
    </style>

    <div class="watermark"><img src="${watermarkUri}" /></div>

    <div class="wrapper">
      <!-- HEADER -->
      <div class="top">
        <img src="${headerLogoUri}" class="invoice-logo" />
        <div class="company-info">
          <strong>Hoggaan Travels</strong><br/>
          HODON, TALEX, TCC, A43<br/>
          MOGADISHU, SOMALIA<br/>
          INFO@HOGGAANTRAVEL.COM
        </div>
      </div>

      <h2>${reportTitle}</h2>

      <!-- META INFO -->
      <div class="meta-row">
        <div>
          <span>Report Type:</span> ${reportType}<br/>
          <span>Date:</span> ${dateNow}
        </div>
        <div style="text-align:right;">
          <span>Printed On:</span> ${dateNow}, ${timeNow}<br/>
          <span>Mode:</span> ${withMoney ? "With Money" : "Without Money"}
        </div>
      </div>

      <!-- TABLE -->
      <table>
        <thead>
          <tr>
            <th style="width:4%; text-align:center;">#</th>
            <th style="width:26%;">Name</th>
            <th style="width:18%;">Passport</th>
            <th style="width:15%;">Phone</th>
            ${
              withMoney
                ? `<th style="width:10%; text-align:right;">Paid</th>
                   <th style="width:10%; text-align:right;">Remaining</th>`
                : ``
            }
          </tr>
        </thead>
        <tbody>
          ${
            itemsHTML ||
            `<tr><td colspan="${withMoney ? 6 : 4}" style="text-align:center; color:#64748b;">No pilgrims found</td></tr>`
          }
          ${totalsRow}
        </tbody>
      </table>
    </div>
  `.trim();
}




  function handlePrint(rows: any[], withMoney: boolean) {
    const html = buildPrintableHtml(rows, withMoney);
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

  /* ─────────────────────────── Render ─────────────────────────── */
  return (
    <div className="w-full">
      {/* Header with add / requests / search + print actions */}
      <HajjHeader
        q={q}
        setQ={setQ}
        pendingCount={pending.length}
        onAdd={() => setAddOpen(true)}
        onRequests={() => setRequestsOpen(true)}
        onPrintWithMoney={() => handlePrint(filtered, true)}
        onPrintWithoutMoney={() => handlePrint(filtered, false)}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatChip label="Total" value={stats.total} />
        <StatChip label="Pending" value={stats.pending} />
        <StatChip label="Approved" value={stats.approved} />
        <StatChip label="Paid Sum" value={fmtMoney(money.paidSum)} />
        <StatChip label="Remaining" value={fmtMoney(money.remainingSum)} />
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 shadow-lg">
        {loading ? (
          <div className="flex h-40 items-center justify-center text-slate-500 dark:text-slate-400">
            Loading…
          </div>
        ) : visible.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 p-6 text-center">
            <Users className="h-6 w-6 text-slate-300" />
            <p className="text-sm text-slate-500 dark:text-slate-400">No active pilgrims yet.</p>
          </div>
        ) : (
          <>
            <PilgrimTable
              rows={visible}
              onView={(r: any) => setViewing(r)}
              onEdit={(r: any) => {
                setEditRow(r);
                setEditOpen(true);
              }}
              onDelete={(r: any) => setConfirmRow(r)}
            />

            {/* Pagination bar (same as other tables) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-900/60 px-4 py-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-900 disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Page {page} / {totalPages}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-900 disabled:opacity-40"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Slideovers */}
      {requestsOpen && (
        <SlideOver title="Hajj Requests" onClose={() => setRequestsOpen(false)}>
          <RequestsList rows={pending} onApprove={approve} onReject={reject} />
        </SlideOver>
      )}

      {addOpen && (
        <SlideOver title="Add Pilgrim" onClose={() => setAddOpen(false)}>
          <PilgrimForm
            initial={{
              full_name: "",
              passport_number: "",
              phone_number: "",
              status: "approved",
              paid: 0,
              total: 4543.5,
            }}
            onCancel={() => setAddOpen(false)}
            onSave={createRow}
            saveLabel="Create"
            requireFile={false}
            confirmLabel="Create Pilgrim"
          />
        </SlideOver>
      )}

      {editOpen && editRow && (
        <SlideOver title="Edit Pilgrim" onClose={() => setEditOpen(false)}>
          <PilgrimForm
            initial={editRow}
            onCancel={() => setEditOpen(false)}
            onSave={saveEdit}
            saveLabel="Save"
            confirmLabel="Save Changes"
          />
        </SlideOver>
      )}

      {/* View / Confirm / Toast */}
      {viewing && (
        <ViewModal
          row={viewing}
          bucket={BUCKET_NAME}
          onClose={() => setViewing(null)}
          supabase={supabase}
        />
      )}

      {confirmRow && (
        <ConfirmDialog
          title="Delete Pilgrim"
          message={`Are you sure you want to delete "${confirmRow.full_name}"?`}
          confirmText="Delete"
          onCancel={() => setConfirmRow(null)}
          onConfirm={() => remove(confirmRow.id)}
        />
      )}

      {toast.open && <Toast text={toast.text} onClose={() => setToast({ open: false, text: "" })} />}
    </div>
  );
}

/* ─────────────────────────── SlideOver ─────────────────────────── */
function SlideOver({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-neutral-950/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-neutral-900"
            >
              Close
            </button>
          </div>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
