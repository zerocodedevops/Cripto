import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests-e2e",
	fullyParallel: true,
	// eslint-disable-next-line no-undef
	forbidOnly: !!process.env.CI,
	// eslint-disable-next-line no-undef
	retries: process.env.CI ? 2 : 0,
	// eslint-disable-next-line no-undef
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:5173",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	webServer: {
		command: "npm run dev",
		url: "http://localhost:5173",
		// eslint-disable-next-line no-undef
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
