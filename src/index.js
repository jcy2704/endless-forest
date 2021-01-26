import Phaser from 'phaser';
import background from './assets/background.png';
import './css/main.css';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  heroload() {

  }

  preload() {
    this.load.image('background', background);
  }

  create() {
    const bg = this.add.image(462, 270, 'background');
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 924,
  height: 540,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: MyGame
};

const game = new Phaser.Game(config);