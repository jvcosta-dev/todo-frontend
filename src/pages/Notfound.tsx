import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import { Button } from "../components/ui/Button";

export function Notfound() {
  const { fallback } = useContent();
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-8xl md:text-9xl">404</h1>
      <p className="text-lg sm:text-2xl capitalize">{fallback.message}</p>
      <Link to={"/"}>
        <Button type="button">Go Back</Button>
      </Link>
    </div>
  );
}
