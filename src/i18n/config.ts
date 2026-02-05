import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			es: { translation: es },
			en: { translation: en },
		},
		fallbackLng: "es",
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},
		interpolation: {
			escapeValue: false,
		},
	});

const i18nInstance = i18n;
export default i18nInstance;
