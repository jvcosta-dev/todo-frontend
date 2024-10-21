import { ReactNode } from "react";
import { useContent } from "../contexts/ContentContext";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipboardCheck, LayoutDashboard } from "lucide-react";
import { SidebarItem } from "./ui/SidebarItem";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  const { sidebar } = useContent();
  const { user } = useAuth();
  return (
    <div className="flex flex-row">
      <aside className="h-screen flex flex-col justify-between p-4 bg-white">
        <div className="flex flex-col gap-2">
          <SidebarItem to="/dashboard" name={sidebar.dashboard}>
            <LayoutDashboard />
          </SidebarItem>
          <SidebarItem to="/tasks" name={sidebar.tasks}>
            <ClipboardCheck />
          </SidebarItem>
        </div>
        <div className="flex flex-col gap-2"></div>
      </aside>
      <main className="flex-grow flex flex-col">{children}</main>
    </div>
  );
}
