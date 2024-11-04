import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import pt from "./pt.json";
import es from "./es.json";
import fr from "./fr.json";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    fr: { translation: fr },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
