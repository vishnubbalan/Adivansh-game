import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Vitest runs fast unit tests only. Browser E2E specs are run separately by Playwright.
    include: ['tests/unit/**/*.test.ts'],
  },
});
