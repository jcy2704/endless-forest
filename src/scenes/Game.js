import Phaser from 'phaser';
import background from '../assets/background/Background 1.png';
import bgTree_1 from '../assets/background/BGTrees 2.png';
import lights_1 from '../assets/background/Lights 3.png';
import bgTree_2 from '../assets/background/BGTrees 4.png';
import bgTree_3 from '../assets/background/BGTrees 5.png';
import lights_2 from '../assets/background/Lights 6.png';
import bgTree_4 from '../assets/background/BGTrees 7.png';
import upTree from '../assets/background/UpTrees 8.png';
import floor from '../assets/background/Floor 9.png';
import player from '../assets/player_run.png';
import platform from '../assets/platform.png';
import createAligned from '../javascript/createAligned';

export default class Background extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', background);
    this.load.image('bgTree_1', bgTree_1);
    this.load.image('lights_1', lights_1);
    this.load.image('lights_2', lights_2);
    this.load.image('bgTree_2', bgTree_2);
    this.load.image('bgTree_3', bgTree_3);
    this.load.image('bgTree_4', bgTree_4);
    this.load.image('upTree', upTree);
    this.load.image('floor', floor);
    this.load.image('platform', platform);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.width = this.scale.width;
    this.height = this.scale.height;
    this.counter = 1;

    this.load.spritesheet('player', player, {
      frameWidth: 63.5,
      frameHeight: 55
    });
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
    this.platform = this.physics.add.sprite(0, this.height-10, 'platform')
      .setOrigin(0, 1);
    this.bg8 = createAligned(this, 10, 'floor', true, -250);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

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
}
