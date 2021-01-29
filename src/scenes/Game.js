import Phaser from 'phaser';
import createAligned from '../javascript/createAligned';

export default class Background extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.alive = true;
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
    this.platform = this.physics.add.sprite(10, this.height-10, 'platform')
      .setOrigin(0, 1);
    this.bg8 = createAligned(this, 10, 'floor', true, -250);

    this.player = this.physics.add.sprite(200, this.height - 90, 'player');
    this.player.anims.play('run');
    this.player.setGravityY(900);

    this.physics.add.collider(this.player, this.platform);
    this.platform.setImmovable();
  }

  update() {
    if (this.cursors.right.isDown) {
      this.alive = false;
    } else if (this.cursors.left.isDown) {
      this.alive = true;
    }

    if (this.alive === true) {
      const bgs = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5, this.bg6, this.bg7, this.bg8]
      const fact = [1.4, 1.45, 1.6, 1.7, 1.8, 2, 3.5, 5]

      bgs.forEach((bg, index) => {
        bg.tilePositionX += fact[index];
      })
    }
  }

  jump() {
    
  }
}
