"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

import TicketHeader from "./_components/TicketHeader";
import TicketTable from "./_components/TicketTable";
import TicketForm from "./_components/TicketForm";
import TicketModal from "./_components/TicketModal";
import ConfirmModal from "./_components/ConfirmModal";
import { Loader2 } from "lucide-react";

export default function TicketsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({ col: "created_at", dir: "desc" });
  const [q, setQ] = useState("");
  const [paidFilter, setPaidFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewer, setViewer] = useState({ open: false, row: null });
  const [confirm, setConfirm] = useState({ open: false, id: null, label: "" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const PAGE_SIZE = 10;

  /* -------------------------------- Fetch list -------------------------------- */
  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("tickets")
        .select(
          `id, created_at, full_name, passport_number, from_airport, to_airport,
           cost, price, currency, paid, reference, notes, pilgrim_id,
           pilgrim:pilgrims(id, full_name, passport_number, city)`,
          { count: "exact" }
        )
        .order(sort.col, { ascending: sort.dir === "asc" })
        .range(from, to);

      if (q.trim()) {
        const term = q.trim();
        query = query.or(
          `full_name.ilike.%${term}%,passport_number.ilike.%${term}%,reference.ilike.%${term}%,from_airport.ilike.%${term}%,to_airport.ilike.%${term}%`
        );
      }
      if (paidFilter === "paid") query = query.eq("paid", true);
      if (paidFilter === "unpaid") query = query.eq("paid", false);

      const { data, error, count: total } = await query;
      if (!active) return;
      setLoading(false);
      if (error) return setRows([]);
      setRows(data || []);
      setCount(total || 0);
    })();
    return () => {
      active = false;
    };
  }, [page, sort, q, paidFilter]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / PAGE_SIZE)), [count]);

  /* -------------------------------- Handlers -------------------------------- */
  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (row: any) => {
    setEditing(row);
    setFormOpen(true);
  };
  const askDelete = (row: any) => {
    setConfirm({ open: true, id: row.id, label: row.full_name });
  };

  return (
    <div >
      <TicketHeader
        q={q}
        setQ={setQ}
        paidFilter={paidFilter}
        setPaidFilter={setPaidFilter}
        onAdd={openNew}
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <TicketTable
          rows={rows}
          sort={sort}
          setSort={setSort}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          count={count}
          onEdit={openEdit}
          onDelete={askDelete}
        />
      )}

      {formOpen && (
        <TicketForm
          initial={editing}
          onSave={() => {
            setFormOpen(false);
            setPage(1);
          }}
          onCancel={() => setFormOpen(false)}
          saving={false}
        />
      )}

      {confirm.open && (
        <ConfirmModal
          title="Delete ticket"
          body={`Are you sure you want to delete ${confirm.label}?`}
          onCancel={() => setConfirm({ open: false, id: null, label: "" })}
          onConfirm={() => {
            supabase.from("tickets").delete().eq("id", confirm.id);
            setConfirm({ open: false, id: null, label: "" });
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
