const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Global config unless overridden in test suite or individual test.
  video: true,
  videoCompression: 32,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  // Config for E2E tests.
  e2e: {
    baseUrl: 'https://demo.guru99.com/V4',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
