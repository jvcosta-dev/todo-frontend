import { FormEvent, useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import { Input } from "../ui/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function DeleteAccount({ isOpen, onClose, onSubmit }: Props) {
  const { user } = useAuth();
  const confirmMessage = `${user.name} delete my account`;
  const [confirmInput, setConfirmInput] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setConfirmInput("");
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (confirmInput !== confirmMessage) {
      return;
    }

    onSubmit();
    onClose();
  };

  if (!isOpen) return;
  return (
    <Modal title="Delete my Account" closeFn={onClose}>
      <h4 className="text-lg select-none">
        Please type <b>{confirmMessage}</b> to confirm
      </h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="confirm"
          type="text"
          value={confirmInput}
          change={(e) => setConfirmInput(e.target.value)}
          required
        />
        <Button
          type="submit"
          danger
          full
          disabled={confirmInput !== confirmMessage}
        >
          <Trash2 />
          Delete my Account
        </Button>
      </form>
    </Modal>
  );
}
