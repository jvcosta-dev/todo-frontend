import { Edit, Trash2 } from "lucide-react";
import { useContent } from "../../contexts/ContentContext";
import { ITask, ITaskInput } from "../../interfaces";
import { useTasks } from "../../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { FormEvent, useState } from "react";
import { formatDateToInput } from "../../utils/formatDate";

interface Props {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskId: string, data: ITaskInput) => void;
}

export function TaskDetail({ task, isOpen, onClose, onSubmit }: Props) {
  const navigate = useNavigate();
  const { labels } = useContent();
  const { deleteTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task._id);
    return navigate("/tasks");
  };

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tag, setTag] = useState(task.tag);
  const [initialDate, setInitialDate] = useState(
    formatDateToInput(task.initialDate.toString())
  );
  const [endDate, setEndDate] = useState(
    formatDateToInput(task.endDate.toString())
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const initial = new Date(initialDate);
    const end = new Date(endDate);

    const data = {
      title,
      description,
      tag,
      initialDate: initial.toISOString(),
      endDate: end.toISOString(),
    };

    onSubmit(task._id, data);
    onClose();
  };

  if (!isOpen) return;
  return (
    <Modal title={task.title} closeFn={onClose}>
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            name="title"
            label="Title"
            type="text"
            change={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <Input
            name="description"
            label="Description"
            type="text"
            change={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <Input
            name="tag"
            label="Tag"
            type="text"
            change={(e) => setTag(e.target.value)}
            value={tag}
            required
          />
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              name="initialDate"
              label="Initial Date"
              type="datetime-local"
              change={(e) => setInitialDate(e.target.value)}
              value={initialDate}
              required
            />
            <Input
              name="endDate"
              label="End Date"
              type="datetime-local"
              change={(e) => setEndDate(e.target.value)}
              value={endDate}
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={
                !title || !description || !tag || !initialDate || !endDate
              }
              full
            >
              <Edit size={24} aria-label={labels.taskDelete} />
              Edit Task
            </Button>
            <Button type="button" click={handleDelete} danger full>
              <Trash2 size={24} aria-label={labels.taskDelete} />
              Delete Task
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
