import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { ITaskInput } from "../../interfaces/interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITaskInput) => void;
}

export function CreateTaskModal({ isOpen, onClose, onSubmit }: Props) {
  const { t } = useTranslation();

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
      setError(t("error-date"));
      return;
    }

    if (title.length < 3 || description.length < 3 || tag.length < 3) {
      setError(t("error-length"));
      return;
    }
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return;
  return (
    <Modal title={t("create-tasks")} closeFn={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="title"
          label={t("title")}
          type="text"
          change={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <Input
          name="description"
          label={t("desc")}
          type="text"
          change={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <Input
          name="tag"
          label={t("tag")}
          type="text"
          change={(e) => setTag(e.target.value)}
          value={tag}
          required
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            name="initialDate"
            label={t("initial-date")}
            type="datetime-local"
            change={(e) => setInitialDate(e.target.value)}
            value={initialDate}
            required
          />
          <Input
            name="endDate"
            label={t("end-date")}
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
          {t("create-tasks")}
        </Button>
      </form>
      {error && <span className="text-danger text-center">{error}</span>}
    </Modal>
  );
}
