// components/tasks/CreateTaskModal.tsx
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { ITaskInput } from "../../interfaces";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITaskInput) => void;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setTag("");
      setInitialDate("");
      setEndDate("");
      setError("");
    }
  }, [isOpen]);

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

    if (new Date(initialDate).getDate() > new Date(endDate).getDate()) {
      setError("End date must be greater than initial date.");
      return;
    }

    if (title.length < 3 || description.length < 3 || tag.length < 3) {
      setError("Title, Description and Tag must be at least 3 caracters.");
      return;
    }
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return;
  return (
    <Modal title="Create Task" closeFn={onClose}>
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
        <Button
          type="submit"
          disabled={!title || !description || !tag || !initialDate || !endDate}
          full
        >
          Create Task
        </Button>
      </form>
      {error && <span className="text-danger text-center">{error}</span>}
    </Modal>
  );
}
