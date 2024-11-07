import { useTranslation } from "react-i18next";

export function ChangeLanguage() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };
  return (
    <label htmlFor="changeLanguage" className="flex flex-col gap-1">
      {t("language")}
      <select
        id="changeLanguage"
        className="p-1 border-2 rounded-lg bg-solid dark:bg-solidDark border-light dark:border-solidDark outline-none"
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
    </label>
  );
}
