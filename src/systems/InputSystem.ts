import Phaser from 'phaser';
import { EVENTS, type TouchKey } from '../core/events';

export type Action = TouchKey;

/** Merges keyboard and on-screen touch input into one action API. */
export class InputSystem {
  private touch = new Set<Action>();
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: Record<string, Phaser.Input.Keyboard.Key>;
  private interactHandlers: Array<() => void> = [];
  /** Presses are buffered until the next frame consumes them, so a tap shorter than one frame is never lost. */
  private attackQueued = false;
  private jumpQueued = false;

  constructor(private scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard!;
    this.cursors = keyboard.createCursorKeys();
    this.keys = keyboard.addKeys('A,D,W,SPACE,J,E') as Record<string, Phaser.Input.Keyboard.Key>;
    keyboard.on('keydown-E', this.fireInteract);
    keyboard.on('keydown-J', this.queueAttack);
    for (const key of ['SPACE', 'W', 'UP']) keyboard.on(`keydown-${key}`, this.queueJump);
    scene.game.events.on(EVENTS.touchKey, this.onTouch);
  }

  isDown(action: 'left' | 'right'): boolean {
    return action === 'left'
      ? this.cursors.left.isDown || this.keys.A.isDown || this.touch.has('left')
      : this.cursors.right.isDown || this.keys.D.isDown || this.touch.has('right');
  }

  jumpRequested(grounded: boolean): boolean {
    const queued = this.jumpQueued;
    this.jumpQueued = false;
    return queued || (this.touch.has('jump') && grounded);
  }

  attackRequested(): boolean {
    const queued = this.attackQueued;
    this.attackQueued = false;
    return queued || this.touch.has('attack');
  }

  onInteract(handler: () => void): void { this.interactHandlers.push(handler); }

  destroy(): void {
    const keyboard = this.scene.input.keyboard;
    keyboard?.off('keydown-E', this.fireInteract);
    keyboard?.off('keydown-J', this.queueAttack);
    for (const key of ['SPACE', 'W', 'UP']) keyboard?.off(`keydown-${key}`, this.queueJump);
    this.scene.game.events.off(EVENTS.touchKey, this.onTouch);
    this.touch.clear();
  }

  private queueAttack = (event: KeyboardEvent): void => { if (!event.repeat) this.attackQueued = true; };
  private queueJump = (event: KeyboardEvent): void => { if (!event.repeat) this.jumpQueued = true; };

  private fireInteract = (): void => { this.interactHandlers.forEach(handler => handler()); };

  private onTouch = (key: Action, pressed: boolean): void => {
    if (pressed) {
      this.touch.add(key);
      if (key === 'interact') this.fireInteract();
    } else {
      this.touch.delete(key);
    }
  };
}
