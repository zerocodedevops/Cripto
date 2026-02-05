import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import {
	type Language,
	type TranslationKey,
	translations,
} from "./translations";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export function LanguageProvider({
	children,
}: {
	readonly children: ReactNode;
}) {
	const [language, setLanguage] = useState<Language>("es");

	const t = (key: TranslationKey): string => {
		return translations[language][key];
	};

	const value = useMemo(() => ({ language, setLanguage, t }), [language]);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within LanguageProvider");
	}
	return context;
}
