import { ReactNode } from "react";

interface Props {
  type: "submit" | "button";
  full?: boolean;
  disabled?: boolean;
  click?: () => void;
  children: ReactNode;
}

export function Button({ type, full, disabled, click, children }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={click}
      className={`${
        full ? "w-full" : "w-max"
      } flex h-max justify-center px-4 py-1 rounded-lg bg-primary text-white capitalize disabled:bg-light disabled:text-dark transition-colors duration-150`}
    >
      {children}
    </button>
  );
}
