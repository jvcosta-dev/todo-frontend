import { ClipboardCheck, LayoutDashboard, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SidebarItem } from "./SidebarItem";
import { useAuth } from "../../contexts/AuthContext";

export function Sidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <aside className="z-10 sm:h-screen w-full sticky top-0 bottom-0 sm:w-max flex sm:flex-col justify-center sm:justify-between gap-8 p-4 bg-solid dark:bg-solidDark">
      <div className="flex sm:flex-col items-center gap-8 sm:gap-4">
        <SidebarItem to="/dashboard" name={t("dashboard-side")}>
          <LayoutDashboard className="w-8 h-8" />
        </SidebarItem>
        <SidebarItem to="/tasks" name={t("tasks-side")}>
          <ClipboardCheck className="w-8 h-8" />
        </SidebarItem>
      </div>
      <div className="flex sm:flex-col items-center gap-8 sm:gap-4">
        <SidebarItem to="/profile" name={user.name}>
          <img
            src={user?.imageUrl || "/user.webp"}
            className="object-cover h-8 w-8 rounded-full bg-primary"
          />
        </SidebarItem>
        <SidebarItem to="/settings" name={t("settings-side")}>
          <Settings className="w-8 h-8" />
        </SidebarItem>
      </div>
    </aside>
  );
}
