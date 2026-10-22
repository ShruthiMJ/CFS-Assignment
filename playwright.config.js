const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: process.env.SHOPPING_BASE_URL || "https://www.amazon.in",
    browserName: "chromium",
    headless: true,
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
  },
  outputDir: "test-results",
});
