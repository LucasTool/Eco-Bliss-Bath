import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
   baseUrl: 'http://localhost:8080',
   supportFile: 'cypress/support/e2e.ts',
   specPattern: 'cypress/e2e/**/*.cy.{ts,js}',
   viewportWidth: 1280,         
    viewportHeight: 800,
  },
});
