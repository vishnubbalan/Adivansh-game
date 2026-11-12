import Phaser from 'phaser';

/**
 * Isolated art-direction proof. It deliberately does not replace ForestScene.
 * Pose swaps are a temporary animation-contract test until proper frame atlases
 * are produced and approved.
 */
export class CharacterArtProofScene extends Phaser.Scene {
  private seeker!: Phaser.GameObjects.Image;
  private sentinel!: Phaser.GameObjects.Image;
  private seekerState: 'idle' | 'run' | 'attack' = 'idle';
  private guardianState: 'idle' | 'telegraph' | 'attack' = 'idle';
  private lastPoseChange = 0;
  private lastGuardianChange = 0;
  private instructions!: Phaser.GameObjects.Text;

  constructor() { super('CharacterArtProofScene'); }

  preload() {
    const root = `${import.meta.env.BASE_URL}assets/art-proof/`;
    this.load.image('proof-forest', `${root}whispering-forest.svg`);
    for (const pose of ['idle', 'run', 'attack']) this.load.image(`seeker-${pose}`, `${root}seeker-${pose}.svg`);
    for (const pose of ['idle', 'telegraph', 'attack']) this.load.image(`guardian-${pose}`, `${root}guardian-${pose}.svg`);
  }

  create() {
    this.add.image(640, 360, 'proof-forest').setDisplaySize(1280, 720).setDepth(-10);
    this.add.rectangle(640, 675, 1280, 90, 0x172b25).setDepth(0);
    this.add.text(48, 42, 'CHAPTER ONE  /  ART DIRECTION PROOF', {
      fontFamily: 'Georgia, serif', fontSize: '22px', color: '#f2d9a5',
      stroke: '#14231f', strokeThickness: 4, letterSpacing: 2
    }).setDepth(10);
    this.add.text(50, 82, 'THE SEEKER  •  FOREST SENTINEL  •  WHISPERING FOREST', {
      fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#d9d2bc',
      letterSpacing: 2
    }).setDepth(10);

    this.seeker = this.add.image(340, 535, 'seeker-idle').setDisplaySize(205, 270).setDepth(4);
    this.sentinel = this.add.image(900, 525, 'guardian-idle').setDisplaySize(300, 330).setDepth(4);
    this.add.ellipse(340, 655, 190, 24, 0x09140f, .55).setDepth(2);
    this.add.ellipse(900, 655, 290, 30, 0x09140f, .65).setDepth(2);

    this.instructions = this.add.text(640, 690,
      'A / D  MOVE POSE     J  ATTACK     SPACE  GUARDIAN TELEGRAPH / STRIKE     R  RESET', {
        fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#f1dfbd',
        backgroundColor: '#101d20cc', padding: { x: 16, y: 8 }, letterSpacing: 1
      }).setOrigin(.5).setDepth(20);

    this.input.keyboard?.on('keydown-A', () => this.setSeekerPose('run'));
    this.input.keyboard?.on('keydown-D', () => this.setSeekerPose('run'));
    this.input.keyboard?.on('keyup-A', () => this.setSeekerPose('idle'));
    this.input.keyboard?.on('keyup-D', () => this.setSeekerPose('idle'));
    this.input.keyboard?.on('keydown-J', () => this.setSeekerPose('attack'));
    this.input.keyboard?.on('keydown-SPACE', () => this.cycleGuardian());
    this.input.keyboard?.on('keydown-R', () => this.resetPoses());
    this.input.keyboard?.on('keyup-J', () => this.setSeekerPose('idle'));
  }

  update(time: number) {
    if (this.seekerState === 'attack' && time - this.lastPoseChange > 420) this.setSeekerPose('idle');
    if (this.guardianState !== 'idle' && time - this.lastGuardianChange > 700) this.setGuardianPose('idle');
  }

  private setSeekerPose(pose: 'idle' | 'run' | 'attack') {
    this.seekerState = pose;
    this.lastPoseChange = this.time.now;
    this.seeker.setTexture(`seeker-${pose}`);
  }

  private setGuardianPose(pose: 'idle' | 'telegraph' | 'attack') {
    this.guardianState = pose;
    this.lastGuardianChange = this.time.now;
    this.sentinel.setTexture(`guardian-${pose}`);
  }

  private cycleGuardian() {
    this.setGuardianPose(this.guardianState === 'idle' ? 'telegraph' : 'attack');
  }

  private resetPoses() {
    this.setSeekerPose('idle');
    this.setGuardianPose('idle');
  }
}
