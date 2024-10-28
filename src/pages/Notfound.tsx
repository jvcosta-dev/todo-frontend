import { useNavigate } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import { Button } from "../components/ui/Button";
import Page from "../components/Page";

export function Notfound() {
  const { fallback } = useContent();
  const navigate = useNavigate();

  return (
    <Page title="Not Found" description={fallback.message}>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-8xl md:text-9xl">404</h1>
        <p className="text-lg sm:text-2xl capitalize">{fallback.message}</p>

        <Button click={() => navigate(-1)} type="button">
          Go Back
        </Button>
      </div>
    </Page>
  );
}
