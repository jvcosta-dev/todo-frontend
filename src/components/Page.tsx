import { ReactNode, useEffect } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}
export function Page({ title, description, children }: Props) {
  useEffect(() => {
    document.title = "Task Track | " + title;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    return () => {
      document.title = "Task Track";
      let metaDescription = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;
      if (metaDescription) {
        metaDescription.content =
          "Client application to manage your tasks, easy and modern.";
      }
    };
  }, [title, description]);

  return <div className="flex flex-col flex-grow gap-6">{children}</div>;
}

export default Page;
