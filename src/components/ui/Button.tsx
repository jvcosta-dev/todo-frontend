import { ReactNode } from "react";

interface Props {
  type: "submit" | "button";
  full?: boolean;
  disabled?: boolean;
  danger?: boolean;
  click?: () => void;
  children: ReactNode;
}

export function Button({
  type,
  full,
  disabled,
  click,
  danger,
  children,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={click}
      className={`${full ? "w-full" : "w-max"} ${
        danger ? "bg-danger" : "bg-primary"
      } flex h-max justify-center gap-2 p-2 rounded-lg text-white capitalize disabled:bg-light dark:disabled:bg-solidDark disabled:text-dark dark:disabled:text-light transition-colors duration-150`}
    >
      {children}
    </button>
  );
}
