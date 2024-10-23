import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components/ui/Loading";
import { useAuth } from "../contexts/AuthContext";
import { ITask } from "../interfaces";
import { TaskList } from "../components/tasks/TaskList";

export function Tasks() {
  const { fetchWithAuth } = useAuth();
  const getTasks = () => fetchWithAuth<ITask[]>("mytasks").then((res) => res);

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      {data && data?.length > 0 && (
        <section className="flex flex-col gap-6">
          <TaskList
            title="Pending Tasks"
            tasks={data.filter((t) => t.status === 2)}
          />
          <TaskList
            title="Active Tasks"
            tasks={data.filter((t) => t.status === 0)}
          />
          <TaskList
            title="Completed Tasks"
            tasks={data.filter((t) => t.status === 1)}
          />
        </section>
      )}
    </>
  );
}
