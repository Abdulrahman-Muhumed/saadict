"use client";

import { useState, useMemo } from "react";
import HousingHeader from "./_components/HousingHeader";
import HousingTable from "./_components/HousingTable";

export default function HousingContent({ rows }: { rows: any[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return rows.filter(
      (r) =>
        r.name?.toLowerCase().includes(q.toLowerCase()) ||
        r.code?.toLowerCase().includes(q.toLowerCase())
    );
  }, [q, rows]);

  return (
    <div className="space-y-8">
      <HousingHeader q={q} setQ={setQ} />
      <HousingTable rows={filtered} />
    </div>
  );
}
