import Phaser from 'phaser';
import './css/main.css';
import Game from './scenes/Game';
import Boot from './scenes/Boot';
import PreLoader from './scenes/PreLoader';
import titleScene from './scenes/TitleScene';
import instructions from './scenes/InstructionsScene';

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
    scene: [Boot, PreLoader, titleScene, instructions, Game]
  };

  const game = new Phaser.Game(config);
  window.focus();
}

