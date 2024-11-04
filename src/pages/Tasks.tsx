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
import { ITask } from "../interfaces/interfaces";
import { Task } from "../components/tasks/Task";
import { useTranslation } from "react-i18next";

export function Tasks() {
  const { t } = useTranslation();
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
    <Page title={t("title-tasks")} description={t("desc-tasks")}>
      <div className="flex flex-col flex-grow gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <h1 className="text-xl">
            {t("greeting")} {user.name},{" "}
            {tasks && tasks.length > 0
              ? `${t("have-tasks")} ${tasks.length} ${t("tasks")}`
              : t("no-tasks")}
          </h1>
          <Button type="button" click={() => setIsModalOpen(true)}>
            <div className="flex gap-2 items-center">
              {t("create-tasks")}
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
                placeholder={t("search-tasks")}
                change={(e) => setTerm(e.target.value)}
              />
              <Button type="submit">
                <Search aria-label={t("")} />
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
                <Trash2 aria-label={t("delete-tasks")} />
              </Button>
            </form>
            {resultTask ? (
              <Task task={resultTask} />
            ) : (
              touchedSearch && (
                <p className="text-danger text-center">
                  {t("a")}: {term}
                </p>
              )
            )}

            <TaskList
              title={t("pending-tasks")}
              tasks={tasks.filter((t) => t.status === 2)}
            />
            <TaskList
              title={t("active-tasks")}
              tasks={tasks.filter((t) => t.status === 0)}
            />
            <TaskList
              title={t("completed-tasks")}
              tasks={tasks.filter((t) => t.status === 1)}
            />
            {Array.from(new Set(tasks.map((t) => t.tag))).map((tag) => (
              <TaskList
                key={tag}
                title={`#${tag} ${t("tasks")}`}
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
