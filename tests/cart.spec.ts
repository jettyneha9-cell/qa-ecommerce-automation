import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Login before each cart test
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

test('Add product to cart', async ({ page }) => {
  await page.click('#add-to-cart-sauce-labs-backpack');
  
  // Verify cart badge shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toContainText('1');
});

test('Add multiple products to cart', async ({ page }) => {
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  
  // Verify cart badge shows 2 items
  await expect(page.locator('.shopping_cart_badge')).toContainText('2');
});

test('Remove product from cart', async ({ page }) => {
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#remove-sauce-labs-backpack');
  
  // Verify remove button is gone
  await expect(page.locator('#remove-sauce-labs-backpack')).not.toBeVisible();
});

test('Navigate to cart page', async ({ page }) => {
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart');
  
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.locator('.cart_item')).toBeVisible();
});