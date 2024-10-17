import { useContent } from "../contexts/ContentContext";

export function Home() {
  const { foo } = useContent();
  return <>{foo.title}</>;
}
