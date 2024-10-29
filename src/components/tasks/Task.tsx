import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { useContent } from "../../contexts/ContentContext";
import { ITask, ITaskInput } from "../../interfaces";
import { formatDate } from "../../utils/formatDate";
import { ChangeEvent, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Button } from "../ui/Button";
import { TaskDetail } from "./TaskDetail";

interface Props {
  task: ITask;
}

export function Task({ task }: Props) {
  const { labels } = useContent();
  const [_, setIsChecked] = useState(task.status === 1);

  const [isOpen, setIsOpen] = useState(false);

  const { deleteTask, checkTask, editTask } = useTasks();

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    checkTask(task._id);
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  return (
    <>
      <article
        className={`flex sm:items-center flex-col sm:flex-row gap-2 sm:justify-between p-2 rounded-xl bg-solid dark:bg-solidDark border-2 ${
          task.status === 1
            ? "border-success"
            : task.status === 0
            ? "border-light dark:border-dark"
            : "border-danger"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                onChange={handleCheck}
                checked={task.status === 1}
                type="checkbox"
                aria-label={
                  task.status === 1 ? labels.taskMarked : labels.taskMark
                }
                className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-success checked:border-success"
                id="check"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          <h3>{task.title}</h3>
          <span className="p-1 rounded-lg bg-primary text-light">
            #{task.tag}
          </span>
        </div>
        <p>{task.description}</p>
        <div className="flex items-center justify-between sm:gap-3">
          <time dateTime={task.initialDate.toString()}>
            {formatDate(task.initialDate.toString())}
          </time>
          -
          <time dateTime={task.endDate.toString()}>
            {formatDate(task.endDate.toString())}
          </time>
          <Button type="button" click={() => setIsOpen(true)}>
            <SquareArrowOutUpRight />
          </Button>
          <Button type="button" click={handleDelete} danger>
            <Trash2 aria-label={labels.taskDelete} />
          </Button>
        </div>
      </article>
      <TaskDetail
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(taskId: string, data: ITaskInput) =>
          editTask({ taskId, data })
        }
        task={task}
      />
    </>
  );
}
