import Phaser from 'phaser';
import './css/main.css';
import Background from './scenes/Game';
import Boot from './scenes/Boot';
import PreLoader from './scenes/PreLoader';
import titleScene from './scenes/TitleScene';

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'endless-runner',
    width: 1250,
    height: 725,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: [Boot, PreLoader, titleScene, Background]
  };

  const game = new Phaser.Game(config);
  window.focus();
}

