import { ReactNode } from "react";

interface Props {
  type: "submit" | "button";
  full?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export function Button({ type, full, disabled, children }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${
        full ? "w-full" : "w-max"
      } flex justify-center px-4 py-1 rounded-lg bg-primary text-white capitalize disabled:bg-light disabled:text-dark transition-colors duration-150`}
    >
      {children}
    </button>
  );
}
