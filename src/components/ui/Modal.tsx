import { ReactNode } from "react";
import { Button } from "./Button";
import { X } from "lucide-react";

interface Props {
  title: string;
  children: ReactNode;
  closeFn: () => void;
}
export function Modal({ title, children, closeFn }: Props) {
  return (
    <div className="min-h-screen h-full fixed z-30 inset-0 flex items-center justify-center bg-dark/50">
      <div className="flex flex-col mx-2 p-4 gap-2 rounded-xl bg-white">
        <div className="flex items-center justify-between">
          <h5 className="text-2xl w-72 sm:w-80">{title}</h5>
          <Button type="button" click={closeFn}>
            <X />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
