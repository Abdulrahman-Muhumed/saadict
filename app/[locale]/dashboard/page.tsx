"use client";

import PageContent from "./PageContent";
import { notFound } from "next/navigation";

export default function Page() {

  notFound();
  return  <PageContent />;
}
