const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'http://localhost:3000',

    // Test files location
    specPattern: 'cypress/e2e/**/*.cy.js',

    // How long to wait before failing (ms)
    defaultCommandTimeout: 6000,

    // How long to wait for page to load (ms)
    pageLoadTimeout: 30000,

    // Retry failed tests
    retries: {
      runMode: 2,   // retry 2 times in cy:run (terminal)
      openMode: 0,  // no retries in cy:open (visual)
    },

    // Screenshots and Videos
    screenshotOnRunFailure: true,
    video: false,

    // Viewport size (browser window size)
    viewportWidth: 1280,
    viewportHeight: 720,

    setupNodeEvents(on, config) {},
  },
});