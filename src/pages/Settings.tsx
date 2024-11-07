import { useTranslation } from "react-i18next";

import Page from "../components/Page";
import { primaryColor, useSettings } from "../contexts/SettingsContext";
import { ChangeLanguage } from "../components/ChangeLanguage";

export function Settings() {
  const { t } = useTranslation();
  const { changePrimaryColor, switchDarkMode, primaryColor, darkMode } =
    useSettings();

  const primaryColors = [
    { name: "Azure", color: "#2b91ff" },
    { name: "Coral", color: "#ff5252" },
    { name: "Turquoise", color: "#00acc1" },
    { name: "Amethyst", color: "#7b3cbe" },
    { name: "Sunset", color: "#bc600b" },
  ];

  return (
    <Page title={t("title-settings")} description={t("desc-settings")}>
      <label
        htmlFor="check"
        className="flex items-center gap-1 cursor-pointer relative"
      >
        <div className="inline-flex items-center">
          <input
            onChange={switchDarkMode}
            checked={darkMode}
            type="checkbox"
            aria-label="switch dark mode"
            className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
            id="check"
          />
        </div>
        {t("dark-mode")}
      </label>
      <label htmlFor="primaryColor" className="flex flex-col gap-1">
        {t("primary-color")}
        <select
          id="primaryColor"
          style={{ borderColor: primaryColor.color }}
          className="p-1 border-2 rounded-lg bg-solid dark:bg-solidDark outline-none"
          onChange={(e) => {
            changePrimaryColor(JSON.parse(e.target.value) as primaryColor);
          }}
        >
          <option value={JSON.stringify(primaryColor)}>
            {primaryColor.name}
          </option>
          {primaryColors.map((color, i) => (
            <option value={JSON.stringify(color)} key={i}>
              {color.name}
            </option>
          ))}
        </select>
      </label>
      <ChangeLanguage />
    </Page>
  );
}
