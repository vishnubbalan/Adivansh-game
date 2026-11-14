import Phaser from 'phaser';
import { ForestScene } from './scenes/ForestScene';
import { VillageFestivalScene } from './scenes/VillageFestivalScene';
import { CharacterArtProofScene } from './scenes/CharacterArtProofScene';
import { EVENTS } from './core/events';
import './style.css';

const params = new URLSearchParams(window.location.search);
// In headless CI the WebGL SwiftShader renderer is very slow. Force 2D canvas
// when quality=low so tests complete in reasonable time.
const rendererType = params.get('quality') === 'low' ? Phaser.CANVAS : Phaser.AUTO;

const game = new Phaser.Game({
  type: rendererType,
  parent: 'game',
  width: 1280,
  height: 720,
  backgroundColor: '#172638',
  pixelArt: false,
  antialias: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 1100 }, debug: false }
  },
  scene: params.has('artProof')
    ? [CharacterArtProofScene]
    : params.has('forest') ? [ForestScene] : [VillageFestivalScene]
});

// Test seam for browser QA: `?debug` exposes the game instance. Not enabled in normal play.
if (params.has('debug')) {
  (window as unknown as { __ADIVANSH__: Phaser.Game }).__ADIVANSH__ = game;
}

const intro = document.querySelector<HTMLElement>('#intro')!;
const hud = document.querySelector<HTMLElement>('#hud')!;
const touchControls = document.querySelector<HTMLElement>('#touch-controls')!;
const startButton = document.querySelector<HTMLButtonElement>('#start-button')!;

// Chapter-specific HUD visibility is applied after the intro starts.

startButton.addEventListener('click', () => {
  intro.classList.add('is-hidden');
  hud.hidden = false;
  touchControls.hidden = false;
  document.querySelector('#health')?.parentElement?.toggleAttribute('hidden', !params.has('forest'));
  document.querySelector('.clue-pill')?.toggleAttribute('hidden', !params.has('forest'));
  document.querySelector<HTMLButtonElement>('[data-key="attack"]')?.toggleAttribute('hidden', !params.has('forest'));
  game.events.emit(EVENTS.journeyStart);
});

game.events.on(EVENTS.playerPosition, (position: { x: number; y: number }) => {
  const gameRoot = document.querySelector<HTMLElement>('#game')!;
  gameRoot.dataset.playerX = String(position.x);
  gameRoot.dataset.playerY = String(position.y);
});
game.events.on(EVENTS.playerHealth, (health: number) => {
  document.querySelector('#health')!.textContent = String(health);
});
game.events.on(EVENTS.objectiveChanged, (objective: string) => {
  document.querySelector('#objective')!.textContent = objective;
});
game.events.on(EVENTS.storyMilestone, (milestone: { objective: string; narration: string }) => {
  document.querySelector('#objective')!.textContent = milestone.objective;
  const toast = document.querySelector<HTMLElement>('#toast')!;
  toast.textContent = milestone.narration;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 4200);
});
game.events.on(EVENTS.storyComplete, (finale: { objective: string; narration: string }) => {
  document.querySelector('#objective')!.textContent = finale.objective;
  const toast = document.querySelector<HTMLElement>('#toast')!;
  toast.textContent = finale.narration;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 5200);
});
game.events.on(EVENTS.clueCollected, () => {
  document.querySelector('#clue-count')!.textContent = '1 / 1 CLUES';
  document.querySelector('#objective')!.textContent = 'A clue has revealed a path deeper into the forest';
});
game.events.on(EVENTS.toast, (message: string) => {
  const toast = document.querySelector<HTMLElement>('#toast')!;
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 2400);
});

document.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(button => {
  const key = button.dataset.key!;
  const set = (pressed: boolean) => game.events.emit(EVENTS.touchKey, key, pressed);
  button.type = 'button';
  button.addEventListener('contextmenu', event => event.preventDefault());
  button.addEventListener('dragstart', event => event.preventDefault());
  button.addEventListener('pointerdown', event => {
    event.preventDefault();
    event.stopPropagation();
    // Register the held input before attempting capture. Synthetic pointer
    // events used by browser tests cannot always be captured and may throw.
    set(true);
    try {
      if (event.isTrusted && button.setPointerCapture) button.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is an enhancement; the held state must still work.
    }
  });
  const release = (event: Event) => {
    event.preventDefault();
    set(false);
  };
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('pointerleave', release);
  button.addEventListener('lostpointercapture', release);
  window.addEventListener('blur', () => set(false));
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
  });
});

// Browser cleans up WebGL resources naturally on close; no manual destroy needed.
