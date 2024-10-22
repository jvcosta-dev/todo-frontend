import { ClipboardCheck, LayoutDashboard, Settings } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useContent } from "../../contexts/ContentContext";
import { useAuth } from "../../contexts/AuthContext";

export function Sidebar() {
  const { sidebar } = useContent();
  const { user } = useAuth();
  return (
    <aside className="sm:h-screen w-full sticky bottom-0 sm:w-max flex sm:flex-col justify-center sm:justify-between gap-4 p-4 bg-white">
      <div className="flex sm:flex-col items-center gap-4">
        <SidebarItem to="/dashboard" name={sidebar.dashboard}>
          <LayoutDashboard className="w-8 h-8" />
        </SidebarItem>
        <SidebarItem to="/tasks" name={sidebar.tasks}>
          <ClipboardCheck className="w-8 h-8" />
        </SidebarItem>
      </div>
      <div className="flex sm:flex-col items-center gap-4">
        <SidebarItem to="/profile" name={user.name}>
          <img
            src={user?.imageUrl || "/user.webp"}
            className="object-cover h-8 w-8 rounded-full bg-primary"
          />
        </SidebarItem>
        <SidebarItem to="/settings" name={sidebar.settings}>
          <Settings className="w-8 h-8" />
        </SidebarItem>
      </div>
    </aside>
  );
}
