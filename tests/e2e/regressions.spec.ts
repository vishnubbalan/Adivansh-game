import { test, expect, type Page } from '@playwright/test';

// These specs use the `?debug` seam, which exposes the Phaser game for deterministic assertions.
type DebugWindow = { __ADIVANSH__: { scene: { getScene(key: string): any } } };

async function startGame(page: Page) {
  await page.goto('./?quality=low&debug');
  await page.getByRole('button', { name: /begin the journey/i }).click();
  await expect(page.locator('#hud')).toBeVisible();
}

test('the golden clue stays at the shrine instead of falling out of the world', async ({ page }) => {
  await startGame(page);
  await page.waitForTimeout(3000);
  const clue = await page.evaluate(() => {
    const scene = (window as unknown as DebugWindow).__ADIVANSH__.scene.getScene('ForestScene');
    return { x: scene.story.clue.x, y: scene.story.clue.y };
  });
  expect(clue.x).toBe(2350);
  expect(Math.abs(clue.y - 610)).toBeLessThan(5);
});

test('chapter one can be completed: reach the shrine and interact', async ({ page }) => {
  await startGame(page);
  await page.evaluate(() => {
    const scene = (window as unknown as DebugWindow).__ADIVANSH__.scene.getScene('ForestScene');
    scene.player.sprite.setPosition(2300, 600);
  });
  await page.waitForTimeout(500);
  await page.keyboard.press('e');
  await expect(page.locator('#clue-count')).toHaveText('1 / 1 CLUES');
  await expect(page.locator('#objective')).toContainText('Chapter complete');
});

test('a quick key tap still registers as an attack', async ({ page }) => {
  await startGame(page);
  await page.keyboard.press('j'); // keydown and keyup arrive in the same frame
  await expect(page.locator('#toast')).toHaveText(/Move closer|Blade hit/);
});
