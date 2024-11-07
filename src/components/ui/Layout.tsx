import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="flex sm:flex-row flex-col-reverse">
      <Sidebar />
      <main className="flex-grow flex flex-col min-h-screen py-4 px-2 sm:px-4 md:px-8 lg:px-12">
        {children}
      </main>
    </div>
  );
}
