import { test, expect } from '@playwright/test';

test('loads the adventure and starts the first chapter', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('./');
  await expect(page).toHaveTitle(/The Search for the Queen/);
  await expect(page.getByRole('heading', { name: /The Search for the Queen/ })).toBeVisible();
  await page.getByRole('button', { name: /begin the journey/i }).click();
  await expect(page.locator('#hud')).toBeVisible();
  await expect(page.locator('#game canvas')).toBeVisible();
  await expect(page.locator('#touch-controls')).toBeHidden();
});

test('game controls are visible, accessible and large enough for touch', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
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
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
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
  await page.goto('./');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  await expect(page.locator('[data-key="left"]')).toBeVisible();
  await expect(page.locator('[data-key="jump"]')).toBeVisible();
});


test('mobile touch controls stay below the canvas and respond to a held touch pointer', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.getByRole('button', { name: /begin the journey/i }).click();

  const canvas = page.locator('#game canvas');
  const controls = page.locator('#touch-controls');
  await expect(controls).toBeVisible();
  const layout = await page.evaluate(() => {
    const canvasRect = document.querySelector('#game canvas')!.getBoundingClientRect();
    const controlsRect = document.querySelector('#touch-controls')!.getBoundingClientRect();
    const buttons = [...document.querySelectorAll<HTMLButtonElement>('#touch-controls button')];
    return {
      canvasBottom: canvasRect.bottom,
      controlsTop: controlsRect.top,
      controlsBottom: controlsRect.bottom,
      viewportHeight: window.innerHeight,
      buttons: buttons.map(button => {
        const rect = button.getBoundingClientRect();
        return { width: rect.width, height: rect.height, right: rect.right };
      })
    };
  });
  expect(layout.controlsTop).toBeGreaterThanOrEqual(layout.canvasBottom);
  expect(layout.controlsBottom).toBeLessThanOrEqual(layout.viewportHeight);
  for (const button of layout.buttons) {
    expect(button.width).toBeGreaterThanOrEqual(44);
    expect(button.height).toBeGreaterThanOrEqual(44);
    expect(button.right).toBeLessThanOrEqual(390);
  }

  const gameRoot = page.locator('#game');
  await expect.poll(async () => Number(await gameRoot.getAttribute('data-player-x'))).toBeGreaterThan(0);
  const initialX = Number(await gameRoot.getAttribute('data-player-x'));
  const right = page.getByRole('button', { name: 'Move right' });
  await right.dispatchEvent('pointerdown', { pointerId: 7, pointerType: 'touch', isPrimary: true, button: 0, buttons: 1 });
  await page.waitForTimeout(500);
  await right.dispatchEvent('pointerup', { pointerId: 7, pointerType: 'touch', isPrimary: true, button: 0, buttons: 0 });
  await expect.poll(async () => Number(await gameRoot.getAttribute('data-player-x'))).toBeGreaterThan(initialX + 20);
  const releasedX = Number(await gameRoot.getAttribute('data-player-x'));
  await page.waitForTimeout(240);
  const stoppedX = Number(await gameRoot.getAttribute('data-player-x'));
  expect(stoppedX).toBeLessThanOrEqual(releasedX + 5);
});

test('mobile controls remain reachable in landscape', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('./');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  const bounds = await page.evaluate(() => {
    const canvas = document.querySelector('#game canvas')!.getBoundingClientRect();
    const controls = document.querySelector('#touch-controls')!.getBoundingClientRect();
    const buttons = [...document.querySelectorAll<HTMLButtonElement>('#touch-controls button')];
    return {
      canvasBottom: canvas.bottom,
      controlsTop: controls.top,
      controlsBottom: controls.bottom,
      viewportHeight: window.innerHeight,
      buttonSizes: buttons.map(button => {
        const rect = button.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      })
    };
  });
  expect(bounds.controlsTop).toBeGreaterThanOrEqual(bounds.canvasBottom);
  expect(bounds.controlsBottom).toBeLessThanOrEqual(bounds.viewportHeight);
  for (const size of bounds.buttonSizes) {
    expect(size.width).toBeGreaterThanOrEqual(44);
    expect(size.height).toBeGreaterThanOrEqual(44);
  }
});
test('keyboard movement changes the player world position', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  const gameRoot = page.locator('#game');
  await expect.poll(async () => Number(await gameRoot.getAttribute('data-player-x'))).toBeGreaterThan(0);
  const initialX = Number(await gameRoot.getAttribute('data-player-x'));
  await page.keyboard.down('d');
  await page.waitForTimeout(500);
  await page.keyboard.up('d');
  await expect.poll(async () => Number(await gameRoot.getAttribute('data-player-x'))).toBeGreaterThan(initialX + 40);
});
