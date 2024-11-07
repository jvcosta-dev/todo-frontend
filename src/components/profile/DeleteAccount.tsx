import { FormEvent, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Modal } from "../ui/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function DeleteAccount({ isOpen, onClose, onSubmit }: Props) {
  const { t } = useTranslation();
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
    <Modal title={t("delete-account")} closeFn={onClose}>
      <h4 className="text-lg select-none">
        {t("please-type")} <b>{confirmMessage}</b> {t("to-confirm")}
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
          {t("delete-account")}
        </Button>
      </form>
    </Modal>
  );
}
