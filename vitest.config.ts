import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['tests/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			enabled: true,
			reporter: ['html', 'json', 'text'],
			all: true,
			include: ['src/**/*.ts'],
		},
		environment: 'node',
	},
});
