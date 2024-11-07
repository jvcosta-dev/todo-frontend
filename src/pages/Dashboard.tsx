import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useDashBoard } from "../hooks/useDashboard";

import { LineChart } from "../components/dashboard/LineChart";
import { Widget } from "../components/dashboard/Widget";
import Page from "../components/Page";
import { TaskList } from "../components/tasks/TaskList";
import { Loading } from "../components/ui/Loading";

import {
  formatDate,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "../utils/formatDate";

export function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data, isLoading } = useDashBoard(
    getFirstDayOfCurrentMonth(),
    getLastDayOfCurrentMonth()
  );

  return (
    <Page title={t("title-dash")} description={t("desc-dash")}>
      <div className="w-full flex flex-col items-center sm:items-start gap-1">
        <h1 className="text-xl">
          {t("greeting")}, {user.name}!
        </h1>
        <p>
          {t("today")} {formatDate(new Date().toString())}
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <h3 className="text-xl">{t("")}</h3>
            <section className="grid lg:grid-cols-3 gap-4">
              <Widget
                title={t("completed-tasks")}
                description=""
                value={data.completedTasks.toString()}
              />
              <Widget
                title={t("active-tasks")}
                description=""
                value={data.activeTasks.toString()}
              />
              <Widget
                title={t("pending-tasks")}
                description=""
                value={data.pendingTasks.toString()}
              />
            </section>
            {data.nextTask && (
              <TaskList title={t("next-dash")} tasks={[data.nextTask]} />
            )}
            {data.nextPendingTask && (
              <TaskList
                title={t("next-pending-dash")}
                tasks={[data.nextPendingTask]}
              />
            )}
            {data.recentCompletedTask && (
              <TaskList
                title={t("recent-dash")}
                tasks={[data.recentCompletedTask]}
              />
            )}
            <LineChart tasksPerDayArray={data.tasksPerDayArray} />
          </>
        )
      )}
    </Page>
  );
}
