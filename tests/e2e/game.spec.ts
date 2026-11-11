import { test, expect } from '@playwright/test';

test('loads the adventure and starts the first chapter', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/The Search for the Queen/);
  await expect(page.getByRole('heading', { name: /The Search for the Queen/ })).toBeVisible();
  await page.getByRole('button', { name: /begin the journey/i }).click();
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#touch-controls')).toBeVisible();
  await expect(page.locator('#game canvas')).toBeVisible();
});

test('game controls are visible, accessible and large enough for touch', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  const controls = page.locator('#touch-controls button');
  await expect(controls).toHaveCount(5);
  for (const control of await controls.all()) {
    await expect(control).toBeVisible();
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    await expect(control).toHaveAttribute('type', 'button');
  }
});

test('direction controls accept pointer input without triggering browser context menus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  const left = page.getByRole('button', { name: 'Move left' });
  await left.dispatchEvent('pointerdown', { pointerId: 1, pointerType: 'touch', isPrimary: true, button: 0 });
  await left.dispatchEvent('pointerup', { pointerId: 1, pointerType: 'touch', isPrimary: true, button: 0 });
  let contextMenuPrevented = false;
  await left.evaluate(element => {
    element.addEventListener('contextmenu', event => {
      (window as any).__contextMenuPrevented = event.defaultPrevented;
    });
    element.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
  });
  contextMenuPrevented = await page.evaluate(() => Boolean((window as any).__contextMenuPrevented));
  expect(contextMenuPrevented).toBeTruthy();
  await expect(left).toBeVisible();
});

test('shows touch controls on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  await expect(page.locator('[data-key="left"]')).toBeVisible();
  await expect(page.locator('[data-key="jump"]')).toBeVisible();
});
