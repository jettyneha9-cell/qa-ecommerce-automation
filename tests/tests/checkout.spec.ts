import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Login and add item to cart
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
});

test('Complete checkout with valid data', async ({ page }) => {
  await page.click('.shopping_cart');
  await page.click('#checkout');
  
  // Fill checkout form
  await page.fill('#first-name', 'Neha');
  await page.fill('#last-name', 'Jetty');
  await page.fill('#postal-code', '110001');
  await page.click('#continue');
  
  // Verify order confirmation
  await expect(page.locator('.complete-header')).toBeVisible();
  await expect(page.locator('.complete-text')).toContainText('Thank you for your order!');
});

test('Checkout with empty first name', async ({ page }) => {
  await page.click('.shopping_cart');
  await page.click('#checkout');
  
  await page.fill('#last-name', 'Jetty');
  await page.fill('#postal-code', '110001');
  await page.click('#continue');
  
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toContainText('First Name is required');
});

test('Checkout with empty postal code', async ({ page }) => {
  await page.click('.shopping_cart');
  await page.click('#checkout');
  
  await page.fill('#first-name', 'Neha');
  await page.fill('#last-name', 'Jetty');
  await page.click('#continue');
  
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toContainText('Postal Code is required');
});