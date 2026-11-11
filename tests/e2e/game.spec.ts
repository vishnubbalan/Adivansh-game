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
  await expect(page.locator('#touch-controls')).toBeVisible();

  // Read all five controls in one browser round-trip. Repeated per-locator
  // visibility and boundingBox calls were timing out intermittently in the
  // Chromium CI runner while Phaser was rendering the scene.
  const measurements = await controls.evaluateAll(buttons =>
    buttons.map(button => {
      const rect = button.getBoundingClientRect();
      const style = window.getComputedStyle(button);
      return {
        label: button.getAttribute('aria-label'),
        visible: rect.width > 0 && rect.height > 0 &&
          style.display !== 'none' && style.visibility !== 'hidden' &&
          button.getClientRects().length > 0,
        width: rect.width,
        height: rect.height,
        type: button.getAttribute('type')
      };
    })
  );

  expect(measurements).toHaveLength(5);
  for (const control of measurements) {
    expect(control.visible, `${control.label} should be visible`).toBeTruthy();
    expect(control.width, `${control.label} width`).toBeGreaterThanOrEqual(44);
    expect(control.height, `${control.label} height`).toBeGreaterThanOrEqual(44);
    expect(control.type, `${control.label} type`).toBe('button');
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
