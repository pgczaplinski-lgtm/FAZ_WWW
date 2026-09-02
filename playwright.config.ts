import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	retries: 0,
	reporter: [['line']],
	use: {
		baseURL: 'http://localhost:4322',
		channel: 'chrome',
		headless: true,
		trace: 'off',
		screenshot: 'off',
		video: 'off',
	},
	webServer: {
		command: 'npm run build && npm run preview -- --host 0.0.0.0 --port 4322',
		url: 'http://localhost:4322/',
		reuseExistingServer: false,
		timeout: 120_000,
	},
});
