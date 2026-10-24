const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: process.env.SHOPPING_BASE_URL || "https://www.amazon.com",
    browserName: "chromium",
    headless: false,
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    screenshot: "on",
      //screenshot: "only-on-failure",
    trace: "retain-on-failure",
     trace:  "on",
  },
  outputDir: "test-results",
});
