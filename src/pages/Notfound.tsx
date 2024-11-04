import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Page from "../components/Page";
import { useTranslation } from "react-i18next";

export function Notfound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Page title={t("title-404")} description={t("desc-404")}>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-8xl md:text-9xl">404</h1>
        <p className="text-lg sm:text-2xl capitalize">{t("title-404")}</p>

        <Button click={() => navigate(-1)} type="button">
          {t("link-404")}
        </Button>
      </div>
    </Page>
  );
}
