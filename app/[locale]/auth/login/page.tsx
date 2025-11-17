import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/login-form";


export default async function Page() {

 const supabase = await createClient(); 

  // Check current session
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (user) {
    // User already logged in → redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="w-full">
      <LoginForm />
    </div>
  );
}
