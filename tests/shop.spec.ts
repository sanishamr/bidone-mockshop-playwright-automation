import { test, expect } from '@playwright/test';

test.describe('Shop Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/MockWebsite/shop.html');
    await page.locator("//button[normalize-space(text())='Search']").click();
  });

  test('Check that 6 products are listed', async ({ page }) => {
    const products = await page.locator('//div[@id="productList"]//div').count();
    console.log("count of products :",products);
    expect(products).toBe(6);
  });



  test('Verify product card contains code, price, UOM, and quantity', async ({ page }) => {
    const productCards = await page.$$('.product-card');
    expect(productCards.length).toBeGreaterThan(0);

    for (const [index, card] of productCards.entries()) {
      const title = await card.$eval('h3', el => el.textContent?.trim());
      const pTags = await card.$$eval('p', els => els.map(el => el.textContent?.trim()));

      const codeText = pTags[0] || '';
      const priceText = pTags[1] || '';
      const uomText = pTags[2] || '';
      const qtyText = pTags[3] || '';

      // Extract values from text
      const code = codeText.replace('Code: ', '');
      const price = priceText.replace('Price: ', '');
      const uom = uomText.replace('UOM: ', '');
      const qty = qtyText.replace('Qty: ', '');

      // Assertions
      expect(code).toMatch(/^P\d{3}$/);
      expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
      expect(uom.toLowerCase()).toMatch(/^(kg|liter|unit)$/);
      expect(Number(qty)).toBeGreaterThanOrEqual(0);

      console.log(`Product ${index + 1} - ${title}: Code=${code}, Price=${price}, UOM=${uom}, Qty=${qty}`);
    }
  });



  test('Can search by product code', async ({ page }) => {
    await page.fill('//div[@class="search-bar"]//input[1]', 'P001');
    await page.click('//button[normalize-space(text())="Search"]');
    const visibleProducts = await page.locator('//div[@id="productList"]//div').count();
    expect(visibleProducts).toBe(1);
  });


  

  test('Add to basket and verify the message', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('added to basket');
      await dialog.accept();
    });
    await page.click('//button[normalize-space(text())="Add to Basket"]', { strict: false });
    const basket = await page.evaluate(() => localStorage.getItem('basket'));
    expect(basket).toContain('P001'); 
  });



  test('verify clear basket', async({page})=>{
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Basket cleared!');
      await dialog.accept();
    });
    await page.locator('//button[normalize-space(text())="View Basket"]').click();
    await expect(page.locator('//h1[normalize-space(text())="Basket"]')).toBeVisible();
    await page.locator('//button[normalize-space(text())="Clear Basket"]').click();
    await expect(page.locator("//p[normalize-space(text())='Your basket is empty.']")).toBeVisible();
    
  })

 

  test('verify Logout redirects to login page', async ({ page }) => {
    await page.click('text=Logout');
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
