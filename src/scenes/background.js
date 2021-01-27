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

/**
 *
 * @param {Phaser.Scene} scene
 * @param {number} heightDiff
 * @param {string} image
 * @param {boolean} origin
 * @param {number} widthDiff
 */

const createAligned = (scene, heightDiff, image, origin, widthDiff = 0) => {
  let x = 0;
  let l = scene.scale.width / 2;
  let m;
  const h = scene.textures.get(image).getSourceImage().height;
  if (image === 'upTree') {
    m = scene.add.tileSprite(x, 0 + heightDiff, scene.scale.width, h, image)
      .setOrigin(0, 0);

    x += m.width;
  } else if (origin === true && image != 'upTree') {
    m = scene.add.tileSprite(x, scene.scale.height + heightDiff, scene.scale.width, h, image)
      .setOrigin(0, 1);

    x += m.width;
  } else {
    m = scene.add.tileSprite(l + widthDiff, scene.scale.height / 2 + heightDiff, scene.scale.width, h, image)

    l += m.width;
  }

  return m;
}

export default class Background extends Phaser.Scene {
  constructor() {
    super('background');
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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.width = this.scale.width;
    this.height = this.scale.height;
    this.counter = 1;
  }

  create() {
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
    this.bg8 = createAligned(this, 10, 'floor', true, -250);
  }

  update() {
    const cam = this.cameras.main;
    const speed = 5;

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
