import type { Locator, Page } from "@playwright/test";

export class ShoppingPage {
  readonly logo: Locator;
  readonly searchNavigation: Locator;
  readonly categoryNavigation: Locator;
  readonly firstCategoryLink: Locator;
  readonly electronicsLink: Locator;
  readonly electronicsImage: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;

  constructor(private readonly page: Page) {
    this.logo = page.locator("#nav-logo");
    this.searchNavigation = page.locator("#nav-search");
    this.categoryNavigation = page.locator("#nav-xshop");
    this.firstCategoryLink = page.locator("#nav-xshop a").first();
    this.electronicsLink = page.getByRole("link", {
      name: "Electronics",
      exact: true,
    });
    this.electronicsImage = page.locator('img[alt="Electronics"]');
    this.searchInput = page.locator("#twotabsearchtextbox");
    this.searchButton = page.locator("#nav-search-submit-button");
    this.searchResults = page.locator("#search");
  }

  async openHomePage(): Promise<void> {
    await this.page.goto("/", { waitUntil: "load" });
  }

  async openElectronicsCategory(): Promise<void> {
    await this.electronicsLink.click();
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async captureScreenshot(path: string): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.screenshot({ path, fullPage: true });
  }
}
