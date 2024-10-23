import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="flex sm:flex-row flex-col-reverse">
      <Sidebar />
      <main className="flex-grow flex flex-col min-h-screen p-4">
        {children}
      </main>
    </div>
  );
}
