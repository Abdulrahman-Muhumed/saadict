"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "@/components/LoaderOverlay";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600); // how long loader stays

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <PageLoader show={loading} />
      {children}
    </>
  );
}
