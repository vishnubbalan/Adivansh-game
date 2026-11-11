import Phaser from 'phaser';
import { ForestScene } from './scenes/ForestScene';
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
    arcade: { gravity: { y: 1100 }, debug: false }
  },
  scene: [ForestScene]
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

game.events.on('player:health', (health: number) => {
  document.querySelector('#health')!.textContent = String(health);
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
  button.addEventListener('pointerdown', event => { event.preventDefault(); set(true); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(name =>
    button.addEventListener(name, () => set(false))
  );
});

window.addEventListener('beforeunload', () => game.destroy(true));
