import { test, expect } from '@playwright/test';

test('loads the adventure and starts the first chapter', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/The Search for the Queen/);
  await expect(page.getByRole('heading', { name: /The Search for the Queen/ })).toBeVisible();
  await page.getByRole('button', { name: /Begin the journey/ }).click();
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#touch-controls')).toBeVisible();
  await expect(page.locator('#game canvas')).toBeVisible();
});

test('shows touch controls on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /Begin the journey/ }).click();
  await expect(page.locator('[data-key="left"]')).toBeVisible();
  await expect(page.locator('[data-key="jump"]')).toBeVisible();
});
