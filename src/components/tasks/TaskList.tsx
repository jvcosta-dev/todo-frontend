import { ITask } from "../../interfaces";
import { Task } from "./Task";

interface Props {
  tasks: ITask[];
  title: string;
}
export function TaskList({ tasks, title }: Props) {
  if (tasks.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">{title}</h2>
      <div className="flex flex-col gap-1">
        {tasks.map((t) => (
          <Task key={t._id} task={t} />
        ))}
      </div>
    </div>
  );
}
