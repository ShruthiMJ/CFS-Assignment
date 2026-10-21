import { expect, test } from "@playwright/test";
import { ShoppingPage } from "./page";

test.describe("Shopping website UI", () => {
  test(
    "home page shows key navigation and captures a full-page screenshot",
    async ({ page }, testInfo) => {
      const shoppingPage = new ShoppingPage(page);
      await shoppingPage.openHomePage();

      await expect(shoppingPage.logo).toBeVisible();
      await expect(shoppingPage.searchNavigation).toBeVisible();
      await expect(shoppingPage.categoryNavigation).toBeVisible();
      await expect(shoppingPage.firstCategoryLink).toBeVisible();

      await shoppingPage.captureScreenshot(testInfo.outputPath("home-page.png"));
    },
  );

  test("navigation opens the Electronics category", async ({ page }, testInfo) => {
    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.openHomePage();

    await expect(shoppingPage.electronicsLink).toBeVisible();
    await shoppingPage.openElectronicsCategory();
    await expect(page).toHaveURL(/\/electronics\//i);
    await expect(shoppingPage.electronicsImage).toBeVisible();

    await shoppingPage.captureScreenshot(
      testInfo.outputPath("electronics-category.png"),
    );
  });

  test(
    "search results contain the requested product term",
    async ({ page }, testInfo) => {
      const searchTerm = "iphone";
      const shoppingPage = new ShoppingPage(page);
      await shoppingPage.openHomePage();
      await shoppingPage.searchFor(searchTerm);
      await expect(page).toHaveURL(/\/s\?/i);
      await expect(page).toHaveURL(new RegExp(`[?&]k=${searchTerm}`, "i"));
      await expect(shoppingPage.searchResults).toContainText(
        new RegExp(searchTerm, "i"),
      );

      await shoppingPage.captureScreenshot(
        testInfo.outputPath("search-results.png"),
      );
    },
  );
});
