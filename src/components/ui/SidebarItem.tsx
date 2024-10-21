import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  to: string;
  children: ReactNode;
}

export function SidebarItem({ name, to, children }: Props) {
  return (
    <Link to={to} className="flex flex-row items-center gap-1">
      {children}
      {name}
    </Link>
  );
}
