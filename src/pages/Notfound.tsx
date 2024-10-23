import { Link, useNavigate } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import { Button } from "../components/ui/Button";

export function Notfound() {
  const { fallback } = useContent();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-8xl md:text-9xl">404</h1>
      <p className="text-lg sm:text-2xl capitalize">{fallback.message}</p>

      <Button click={() => navigate(-1)} type="button">
        Go Back
      </Button>
    </div>
  );
}
