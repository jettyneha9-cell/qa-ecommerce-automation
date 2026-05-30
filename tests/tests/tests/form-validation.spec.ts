import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.shopping_cart');
  await page.click('#checkout');
});

test('Form accepts special characters in name', async ({ page }) => {
  await page.fill('#first-name', 'Neha@123');
  await page.fill('#last-name', 'Jetty#456');
  await page.fill('#postal-code', '110001');
  
  await page.click('#continue');
  await expect(page.locator('.complete-header')).toBeVisible();
});

test('Form accepts long input in name fields', async ({ page }) => {
  const longName = 'A'.repeat(100);
  await page.fill('#first-name', longName);
  await page.fill('#last-name', 'Jetty');
  await page.fill('#postal-code', '110001');
  
  await page.click('#continue');
  await expect(page.locator('.complete-header')).toBeVisible();
});

test('Form rejects postal code with letters', async ({ page }) => {
  await page.fill('#first-name', 'Neha');
  await page.fill('#last-name', 'Jetty');
  await page.fill('#postal-code', 'ABC123');
  
  await page.click('#continue');
  await expect(page.locator('.error-message')).toBeVisible();
});