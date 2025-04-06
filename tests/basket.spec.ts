import { test, expect } from '@playwright/test';


test.describe('Basket Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/MockWebsite/shop.html');
    await page.locator("//button[normalize-space(text())='Search']").click();
    await page.click('//button[normalize-space(text())="Add to Basket"]');

    await page.goto('http://localhost:3000/MockWebsite/basket.html');
    await expect(page.locator('//h1[normalize-space(text())="Basket"]')).toBeVisible();
  });

  test('Displays added products correctly', async ({ page }) => {
    const items = await page.locator('#basketList').count();
    expect(items).toBeGreaterThan(0);
  });

  test('verify Total value is calculated correctly', async ({ page }) => {
    const totalText = await page.locator('#basketTotal').innerText();
  });


  test('Verify Clear Basket removes items', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Basket cleared');
      await dialog.accept();
    });
    await page.click('text=Clear Basket');
    const basket = await page.evaluate(() => localStorage.getItem('basket'));
    expect(basket).toBe('[]');
  });



  test('Back to Shop button works', async ({ page }) => {
    await page.click('//button[normalize-space(text())="Back to Shop"]');
    await expect(page.locator('//h1[normalize-space(text())="Shop"]')).toBeVisible();
  });


test('Logout redirects to login page', async ({ page }) => {
    await page.click('text=Logout');
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});


