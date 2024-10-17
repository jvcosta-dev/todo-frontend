import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <aside></aside>
      <main>{children}</main>
    </div>
  );
}
