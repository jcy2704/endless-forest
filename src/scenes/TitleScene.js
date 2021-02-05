import Phaser from 'phaser';
import createAligned from '../javascript/createAligned';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title-screen');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.scene.pauseOnBlur = false;

    this.menuSong = this.sound.add('menu', { volume: 0.25, loop: true });
    this.menuSong.play();

    const bgh = this.textures.get('background').getSourceImage().height;

    this.add.tileSprite(0, this.height, this.width, bgh, 'background')
      .setOrigin(0, 1).setScrollFactor(0);

    this.bg1 = createAligned(this, -23, 'bgTree_1', true);
    this.bg2 = createAligned(this, 100, 'lights_1', false);
    this.bg3 = createAligned(this, -53, 'bgTree_2', true);
    this.bg4 = createAligned(this, -75, 'bgTree_3', true);
    this.bg5 = createAligned(this, 100, 'lights_2', false);
    this.bg6 = createAligned(this, -45, 'bgTree_4', true);
    this.bg7 = createAligned(this, 0, 'upTree', true);
    this.bg8 = createAligned(this, 10, 'floor', true, -250);

    this.player = this.add.sprite(200, this.height - 95, 'player_rest');
    this.player.anims.play('rest');

    const title = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 140,
      text: 'ENDLESS FOREST',
      style: {
        fontSize: '90px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    title.setOrigin(0.5, 0.5);

    this.playBtn = this.add.image(this.width / 2, this.height / 2, 'play').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.playIsPressed())
      .on('pointerup', () => {
        this.playNotPressed();
        this.start();
      });

    this.exitBtn = this.add.image(this.width / 2, this.height / 2 + 100, 'exit').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.exitIsPressed())
      .on('pointerup', () => {
        this.exitNotPressed();
        this.exit();
      });

    ['A', 'S', 'SPACE', 'ENTER'].forEach(key => {
      const keyP = this.input.keyboard.addKey(key);
      keyP.on('down', () => {
        this.start();
      });
    });
  }

  start() {
    this.menuSong.stop();
    this.cameras.main.fadeOut(2000, 255, 255, 255);
    this.scene.start('instructions');
  }

  exit() {
    this.menuSong.stop();
    const ending = this.sound.add('ending', { volume: 0.25, loop: true });
    ending.play();
    this.cameras.main.fadeOut(2000, 0, 0, 0);
    this.scene.start('leaderboard-table', { song: ending });
  }

  update() {
    const bgs = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5, this.bg6, this.bg7, this.bg8];
    const fact = [0.1, 0.15, 0.25, 0.4, 0.5, 0.6, 1, 1.5];

    bgs.forEach((bg, index) => {
      bg.tilePositionX += fact[index];
    });
  }

  playIsPressed() {
    this.playBtn.setTexture('playPressed');
  }

  playNotPressed() {
    this.playBtn.setTexture('play');
  }

  exitIsPressed() {
    this.exitBtn.setTexture('exitPressed');
  }

  exitNotPressed() {
    this.exitBtn.setTexture('exit');
  }
}