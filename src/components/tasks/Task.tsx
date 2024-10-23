import { Trash2 } from "lucide-react";
import { useContent } from "../../contexts/ContentContext";
import { ITask } from "../../interfaces";
import { formatDate } from "../../utils/formatDate";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  task: ITask;
}

export function Task({ task }: Props) {
  const { fetchWithAuth } = useAuth();
  const { labels } = useContent();
  const [isChecked, setIsChecked] = useState(task.status === 1);

  const queryClient = useQueryClient();

  const checkTask = () =>
    fetchWithAuth<any>(`check/${task._id}`, { method: "PATCH" }).then(
      (res) => res
    );

  const checkMutation = useMutation({
    mutationFn: checkTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    checkMutation.mutate();
  };

  const deleteTask = () =>
    fetchWithAuth<null>(`task/${task._id}`, { method: "DELETE" }).then(
      (res) => res
    );

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <article
      className={`flex sm:items-center flex-col sm:flex-row gap-2 sm:justify-between p-2 rounded-xl bg-white border-2 ${
        task.status === 1
          ? "border-success"
          : task.status === 0
          ? "border-light"
          : "border-danger"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input
              onChange={handleCheck}
              checked={isChecked}
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
        <time dateTime={task.endDate.toString()}>
          {formatDate(task.endDate.toString())}
        </time>
        <button
          onClick={handleDelete}
          aria-label={labels.taskDelete}
          className="p-1 rounded-lg text-light bg-danger"
        >
          <Trash2 />
        </button>
      </div>
    </article>
  );
}
