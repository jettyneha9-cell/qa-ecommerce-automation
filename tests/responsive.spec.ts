test('Test on iPhone 12', async ({ page }) => {
  const context = await page.context();
  const mobilePage = await context.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
  });
  
  await mobilePage.goto('https://www.saucedemo.com');
  await expect(mobilePage.locator('.inventory_list')).toBeVisible();
});

