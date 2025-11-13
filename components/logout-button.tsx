"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoaderOverlay from "./LoaderOverlay";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const logout = async () => {
    setShow(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <Button onClick={logout}>Logout</Button>

      {show && (
        <div
          className=" bg-black/50 backdrop-blur-sm"
          style={{ position: "fixed", top: 0, right: 0, width: "100%", height: "100vh" }}
        >
          <LoaderOverlay />
        </div>
      )}
    </>
  );
}
