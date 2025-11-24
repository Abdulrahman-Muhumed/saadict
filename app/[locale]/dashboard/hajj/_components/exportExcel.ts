import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export interface HajjRow {
  full_name: string | null;
  passport_number: string | null;
  phone_number: string | null;
  paid: number | null;
  total: number | null;
  status: string | null;
}

export function exportHajjExcel(rows: HajjRow[]) {
  const data = rows.map((r, i) => ({
    No: i + 1,
    Name: r.full_name ?? "",
    Passport: r.passport_number ?? "",
    Phone: r.phone_number ?? "",
    Paid: Number(r.paid ?? 0),
    Remaining: Number(r.total ?? 0) - Number(r.paid ?? 0),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Hajj 2026");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Hajj-2026-Pilgrims.xlsx`);
}
