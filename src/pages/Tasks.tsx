import { TaskList } from "../components/tasks/TaskList";
import { Button } from "../components/ui/Button";
import { FilePlusIcon, Search, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { CreateTaskModal } from "../components/tasks/CreateTask";
import { Loading } from "../components/ui/Loading";
import Page from "../components/Page";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { ITask } from "../interfaces";
import { Task } from "../components/tasks/Task";

export function Tasks() {
  const { user } = useAuth();
  const { tasks, isLoading, createTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [term, setTerm] = useState("");
  const [resultTask, setResultTask] = useState<ITask | null>(null);
  const [touchedSearch, setTouchedSearch] = useState(false);

  const search = (e: FormEvent) => {
    e.preventDefault();
    if (!tasks || !term) return;
    const found = tasks.find((t) =>
      t.title.toLowerCase().includes(term.toLowerCase())
    );
    setTouchedSearch(true);
    if (found) setResultTask(found);
    return;
  };

  if (isLoading) return <Loading />;

  return (
    <Page title="Your Tasks" description="manage all of your tasks.">
      <div className="flex flex-col flex-grow gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <h1 className="text-xl">
            Hello {user.name},{" "}
            {tasks && tasks.length > 0
              ? `you have ${tasks.length} tasks!`
              : "you dont have any tasks!"}
          </h1>
          <Button type="button" click={() => setIsModalOpen(true)}>
            <div className="flex gap-2 items-center">
              Create Task
              <FilePlusIcon />
            </div>
          </Button>
        </div>

        {tasks && tasks.length > 0 && (
          <>
            <form
              onSubmit={search}
              className="flex items-center gap-2 rounded-xl"
            >
              <Input
                name="term"
                type="text"
                value={term}
                placeholder="search task by name"
                change={(e) => setTerm(e.target.value)}
              />
              <Button type="submit">
                <Search aria-label="search task" />
              </Button>
              <Button
                type="button"
                click={() => {
                  setResultTask(null);
                  setTouchedSearch(false);
                  setTerm("");
                }}
                danger
                disabled={!resultTask && !term && !touchedSearch}
              >
                <Trash2 aria-label="delete search results" />
              </Button>
            </form>
            {resultTask ? (
              <Task task={resultTask} />
            ) : (
              touchedSearch && (
                <p className="text-danger text-center">
                  No results for: {term}
                </p>
              )
            )}

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
            {Array.from(new Set(tasks.map((t) => t.tag))).map((tag) => (
              <TaskList
                key={tag}
                title={`#${tag} Tasks`}
                tasks={tasks.filter((t) => t.tag === tag)}
              />
            ))}
          </>
        )}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createTask}
      />
    </Page>
  );
}
