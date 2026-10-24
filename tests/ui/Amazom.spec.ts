import { expect, test } from "@playwright/test";
import { AmazonPage } from "./amazon.page";

test("Amazon navigation and product search", async ({ page }, testInfo) => {
  const amazonPage = new AmazonPage(page);
  console.log("Opening Amazon homepage.");
  await amazonPage.open();

  await expect(amazonPage.logo).toBeVisible();
  await expect(amazonPage.searchInput).toBeVisible();
  await expect(amazonPage.accountLink).toBeVisible();
  await expect(amazonPage.ordersLink).toBeVisible();
  await expect(amazonPage.cartLink).toBeVisible();
  console.log("Amazon homepage navigation elements are visible.");
  await amazonPage.captureScreenshot(testInfo, "AmazonHomepage.png");
  console.log("Attached Amazon homepage screenshot to the test report.");

  console.log("Opening Amazon Help Center.");
  await amazonPage.openHelpCenter();
  await expect(page.locator("h1")).toHaveText(
    "Welcome to Amazon Customer Service",
  );
  console.log("Amazon Customer Service page loaded successfully.");
  await amazonPage.captureScreenshot(
    testInfo,
    "AmazonCustomerServicePage.png",
  );
  console.log("Attached Customer Service screenshot to the test report.");

  console.log('Returning to Amazon and searching for "iPhone 18".');
  await amazonPage.returnHome();
  await amazonPage.searchFor("iPhone 18");
  await expect(page).toHaveURL(/[?&]k=iPhone\+18/i);
  await expect(amazonPage.searchResults).toContainText(
    /results for ["“]?iphone 18/i,
  );
  console.log('Search results contain "iPhone 18".');
  await amazonPage.captureScreenshot(
    testInfo,
    "AmazonSearchResultpage.png",
  );
  console.log("Attached search-results screenshot to the test report.");
});