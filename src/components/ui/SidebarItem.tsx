import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  to: string;
  children: ReactNode;
}

export function SidebarItem({ name, to, children }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-row items-center p-2 rounded-lg gap-2 capitalize ${
          isActive
            ? "bg-primary text-light"
            : "hover:bg-light dark:hover:bg-dark transition-colors duration-150"
        }
        }`
      }
    >
      {children}
      <p className="hidden sm:block w-0 sm:w-24 truncate">{name}</p>
    </NavLink>
  );
}
