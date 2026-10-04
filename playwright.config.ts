import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// De feature files en step definitions; playwright-bdd maakt hier Playwright-tests van (map .features-gen)
const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: 'tests/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    serviceWorkers: 'block',        // anders krijgt de test een bewaarde (oude) pagina
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Start de website lokaal voordat de tests draaien
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
