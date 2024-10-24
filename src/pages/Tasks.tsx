import { TaskList } from "../components/tasks/TaskList";
import { Button } from "../components/ui/Button";
import { FilePlusIcon } from "lucide-react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { CreateTaskModal } from "../components/tasks/CreateTask";
import { Loading } from "../components/ui/Loading";

export function Tasks() {
  const { tasks, isLoading, createTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-end">
          <Button type="button" click={() => setIsModalOpen(true)}>
            <div className="flex gap-2 items-center">
              Create Task
              <FilePlusIcon />
            </div>
          </Button>
        </div>

        {tasks && tasks.length > 0 && (
          <section className="flex flex-col flex-grow gap-6">
            <TaskList
              title="Pending Tasks"
              tasks={tasks.filter((t) => t.status === 2)}
            />
            <TaskList
              title="Active Tasks"
              tasks={tasks.filter((t) => t.status === 0)}
            />
            <TaskList
              title="Completed Tasks"
              tasks={tasks.filter((t) => t.status === 1)}
            />
          </section>
        )}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createTask}
      />
    </>
  );
}
