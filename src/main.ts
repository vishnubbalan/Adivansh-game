import Phaser from 'phaser';
import { ForestScene } from './scenes/ForestScene';
import { CharacterArtProofScene } from './scenes/CharacterArtProofScene';
import './style.css';

const game = new Phaser.Game({
  type: Phaser.AUTO,
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
  scene: new URLSearchParams(window.location.search).has('artProof')
    ? [CharacterArtProofScene]
    : [ForestScene]
});

const intro = document.querySelector<HTMLElement>('#intro')!;
const hud = document.querySelector<HTMLElement>('#hud')!;
const touchControls = document.querySelector<HTMLElement>('#touch-controls')!;
const startButton = document.querySelector<HTMLButtonElement>('#start-button')!;

startButton.addEventListener('click', () => {
  intro.classList.add('is-hidden');
  hud.hidden = false;
  touchControls.hidden = false;
  game.events.emit('journey:start');
});

game.events.on('player:position', (position: { x: number; y: number }) => {
  const gameRoot = document.querySelector<HTMLElement>('#game')!;
  gameRoot.dataset.playerX = String(position.x);
  gameRoot.dataset.playerY = String(position.y);
});
game.events.on('player:health', (health: number) => {
  document.querySelector('#health')!.textContent = String(health);
});
game.events.on('story:milestone', (milestone: { objective: string; narration: string }) => {
  document.querySelector('#objective')!.textContent = milestone.objective;
  const toast = document.querySelector<HTMLElement>('#toast')!;
  toast.textContent = milestone.narration;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 4200);
});
game.events.on('story:complete', (finale: { objective: string; narration: string }) => {
  document.querySelector('#objective')!.textContent = finale.objective;
  const toast = document.querySelector<HTMLElement>('#toast')!;
  toast.textContent = finale.narration;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 5200);
});
game.events.on('clue:collected', () => {
  document.querySelector('#clue-count')!.textContent = '1 / 1 CLUES';
  document.querySelector('#objective')!.textContent = 'A clue has revealed a path deeper into the forest';
});
game.events.on('game:toast', (message: string) => {
  const toast = document.querySelector<HTMLElement>('#toast')!;
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 2400);
});

document.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(button => {
  const key = button.dataset.key!;
  const set = (pressed: boolean) => game.events.emit('touch:key', key, pressed);
  button.type = 'button';
  button.addEventListener('contextmenu', event => event.preventDefault());
  button.addEventListener('dragstart', event => event.preventDefault());
  button.addEventListener('pointerdown', event => {
    event.preventDefault();
    event.stopPropagation();
    button.setPointerCapture?.(event.pointerId);
    set(true);
  });
  const release = (event: Event) => {
    event.preventDefault();
    set(false);
  };
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', () => set(false));
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
  });
});

window.addEventListener('beforeunload', () => game.destroy(true));
