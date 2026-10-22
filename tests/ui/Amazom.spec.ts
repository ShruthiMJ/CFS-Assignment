const {test, expect} = require("@playwright/test")

test('Verify Amazon homepage navigation and capture screenshot', async ({page})=>
{
  //browse URL
   await page.goto("https://www.amazon.com/");
  //Verify Key navigation elements
  //Verify Amazon Logo
  await expect(page.locator('#nav-logo')).toBeVisible(); 
  //Verify Search Textbox
  await expect(page.getByPlaceholder('Search Amazon')).toBeVisible();
    //Verify Accounts & Lists Dropdown link 
  await expect(page.locator('#nav-link-accountList')).toBeVisible();
  //Verify Returns & Orders link
  await expect(page.locator('#nav-orders')).toBeVisible();
  //Verify Cart link
  await expect(page.locator('#nav-cart')).toBeVisible();

  //Capture full page screenshot
  await page.screenshot({path: 'screenshots/AmazonHomepage.png',fullPage: true});
  

  //CLick on Prime Video link and verify the page navigation
  page.getByRole('link', { name: 'Customer Service'}).click();
  await page.waitForTimeout(5000);
  //Verify successfull page navigation
  const expectedPageText = "Welcome to Amazon Customer Service";
  const actualPageText = await page.locator('//h1').innerText();
  console.log(actualPageText);
  expect(actualPageText).toBe(expectedPageText);

  //Capture Customer Service full page screenshot
  await page.screenshot({path: 'screenshots/AmazonCustomerServicePage.png',fullPage: true});

  //Navigate to Amazon home page
  //await page.goBack();
  await page.locator('#nav-logo-sprites').click();
  //Search for a product and verify the search result page
  await page.locator('#twotabsearchtextbox').click();
  await page.locator('#twotabsearchtextbox').fill('iPhone 18');
  await page.locator('#nav-search-submit-button').click();
  await page.waitForLoadState('load');
  expect(page.getByText('results for "iphone 18"')).toBeTruthy();

  //Capture full page screenshot
  await page.screenshot({path: 'screenshots/AmazonSearchResultpage.png',fullPage: true});

});