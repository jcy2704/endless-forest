import Phaser from 'phaser';
import './css/main.css';
import Background from './scenes/Background';
import Boot from './scenes/Boot';
import PreLoader from './scenes/PreLoader';

const config = {
  type: Phaser.AUTO,
  parent: 'endless-runner',
  width: 1250,
  height: 725,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Boot, PreLoader, Background]
};

const game = new Phaser.Game(config);
