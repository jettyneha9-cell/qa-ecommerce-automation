import { test, expect } from '@playwright/test';

test('Valid login with correct credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_title')).toBeVisible();
});

test('Invalid login with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrongpassword');
  await page.click('#login-button');
  
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toContainText('Epic sadface: Username and password do not match');
});

test('Login with locked-out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toContainText('Epic sadface: Sorry, this user has been locked out');
});

test('Login with empty username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  await expect(page.locator('.error-message')).toBeVisible();
});