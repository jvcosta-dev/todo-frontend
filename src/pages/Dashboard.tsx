import { LineChart } from "../components/dashboard/LineChart";
import { Widget } from "../components/dashboard/Widget";
import Page from "../components/Page";
import { TaskList } from "../components/tasks/TaskList";
import { Loading } from "../components/ui/Loading";
import { useAuth } from "../contexts/AuthContext";
import { useDashBoard } from "../hooks/useDashboard";
import {
  formatDate,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "../utils/formatDate";
import { mockLineChart } from "../utils/mock";

export function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useDashBoard(
    getFirstDayOfCurrentMonth(),
    getLastDayOfCurrentMonth()
  );

  return (
    <Page
      title="Dashboard"
      description="your personal dashboard with custom analytics"
    >
      <div className="w-full flex flex-col items-center sm:items-start gap-1">
        <h1 className="text-xl">Hello, {user.name}!</h1>
        <p>Today is {formatDate(new Date().toString())}</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <h3 className="text-xl">Monthly Stats</h3>
            <section className="grid lg:grid-cols-3 gap-4">
              <Widget
                title="Completed Tasks"
                description=""
                value={data.completedTasks.toString()}
              />
              <Widget
                title="Active Tasks"
                description=""
                value={data.activeTasks.toString()}
              />
              <Widget
                title="Pending Tasks"
                description=""
                value={data.pendingTasks.toString()}
              />
            </section>
            {data.nextTask && (
              <TaskList title="Next Task" tasks={[data.nextTask]} />
            )}
            {data.nextPendingTask && (
              <TaskList
                title="Next Pending Task"
                tasks={[data.nextPendingTask]}
              />
            )}
            {data.recentCompletedTask && (
              <TaskList
                title="Most Recent Completed Task"
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
