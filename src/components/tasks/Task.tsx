import { useContent } from "../../contexts/ContentContext";
import { ITask } from "../../interfaces";

interface Props {
  task: ITask;
}

export function Task({ task }: Props) {
  const { content } = useContent();
  return (
    <article className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          aria-label={
            task.status === 2
              ? content["task.completed-label"]
              : content["taks.mark-label"]
          }
        />
        <h3>{task.title}</h3>
        <span className="px-2 py-1 bg-gray">#{task.tag}</span>
      </div>
      <div className="flex items-center gap-3">
        <time dateTime={task.initialDate.toISOString()}></time>
        <time dateTime={task.endDate.toISOString()}></time>
        <button aria-label={content["task.delete-label"]}></button>
      </div>
    </article>
  );
}
