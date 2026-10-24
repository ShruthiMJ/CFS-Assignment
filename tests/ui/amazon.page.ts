import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { Locator, Page, TestInfo } from "@playwright/test";

export class AmazonPage {
  private readonly screenshotRunId = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly accountLink: Locator;
  readonly ordersLink: Locator;
  readonly cartLink: Locator;
  readonly helpLink: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;

  constructor(private readonly page: Page) {
    this.logo = page.locator("#nav-logo");
    this.searchInput = page.getByPlaceholder("Search Amazon");
    this.accountLink = page.locator("#nav-link-accountList");
    this.ordersLink = page.locator("#nav-orders");
    this.cartLink = page.locator("#nav-cart");
    this.helpLink = page.getByRole("link", {
      name: "Help",
      exact: true,
    });
    this.searchButton = page.locator("#nav-search-submit-button");
    this.searchResults = page.locator("#search");
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async openHelpCenter(): Promise<void> {
    await this.helpLink.click();
  }

  async returnHome(): Promise<void> {
    await this.page.locator("#nav-logo-sprites").click();
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async captureScreenshot(testInfo: TestInfo, filename: string): Promise<void> {
    const screenshotPath = path.join(
      process.cwd(),
      "screenshots",
      this.screenshotRunId,
      filename,
    );

    await mkdir(path.dirname(screenshotPath), { recursive: true });
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(filename, {
      path: screenshotPath,
      contentType: "image/png",
    });
  }
}
