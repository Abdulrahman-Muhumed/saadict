// app/protected/pilgrims/page.tsx
import PilgrimsClient from "./_components/PilgrimsClient";

export const dynamic = "force-dynamic";

export default function PilgrimsPage() {
  return (
    <section className="min-h-screen">
      <PilgrimsClient />
    </section>
  );
}
