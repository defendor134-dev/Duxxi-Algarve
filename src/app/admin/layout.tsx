import { ReactNode } from "react";
import SessionProvider from "@/components/ui/SessionProvider";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}