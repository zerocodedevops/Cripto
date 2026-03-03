import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

export default [
	{
		ignores: [
			"src/dataconnect-generated/**",
			"node_modules/**",
			"dist/**",
			".git/**",
		],
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsparser,
			parserOptions: { ecmaVersion: "latest", sourceType: "module" },
			globals: {
				...globals.browser,
				React: "readonly",
			},
		},
		plugins: { "@typescript-eslint": tseslint },
		rules: {
			...js.configs.recommended.rules,
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["warn", {
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_",
				"destructuredArrayIgnorePattern": "^_"
			}],
		},
	},
	{
		files: [
			"**/vite.config.ts",
			"**/vitest.config.ts",
			"**/playwright.config.ts",
		],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
