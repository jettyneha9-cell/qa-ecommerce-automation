import { test, expect } from 

test('E-Commerce Complete User Flow', async ({ page }) => {
  // Step 1: Navigate to login page
  await page.goto('https://www.saucedemo.com');
  
  // Step 2: Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Step 3: Verify landing page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
  // Step 4: Add product to cart
  await page.click('#add-to-cart-sauce-labs-backpack');
  
  // Step 5: Go to cart
  await page.click('.shopping_cart');
  
  // Step 6: Verify cart has item
  await expect(page.locator('.cart_item')).toHaveCount(1);
  
  // Step 7: Checkout
  await page.click('#checkout');
  
  // Step 8: Fill checkout form
  await page.fill('#first-name', 'Neha');
  await page.fill('#last-name', 'Jetty');
  await page.fill('#postal-code', '110001');
  await page.click('#continue');
  
  // Step 9: Verify completion
  await expect(page.locator('.complete-header')).toBeVisible();
});