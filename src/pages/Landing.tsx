import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import { Button } from "../components/ui/Button";
import { Header } from "../components/ui/Header";

export function Landing() {
  const { t } = useTranslation();
  return (
    <Page title={t("title-landing")} description={t("desc-landing")}>
      <Header />
      <section className="flex flex-col items-center gap-6 md:gap-4">
        <h1 className="text-center text-3xl lg:text-5xl xl:text-6xl font-bold">
          {t("h1-landing")} <br />
          <span className="text-primary">{t("h1-span-landing")}</span>
        </h1>
        <p>{t("p-landing")}</p>
        <Link to={"/signup"}>
          <Button type="button">{t("action-landing")}</Button>
        </Link>
        <img
          src="desktop.webp"
          className="object-cover hidden md:block lg:w-[768px] xl:w-[1024px] border-4 border-primary rounded-xl"
        />
        <img
          src="mobile.webp"
          alt="tasck track dashboard"
          className="object-cover block md:hidden h-[667px] w-[375px] border-4 border-primary rounded-xl"
        />
      </section>
    </Page>
  );
}
