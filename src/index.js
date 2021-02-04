import Phaser from 'phaser';
import './css/main.css';
import Game from './scenes/Game';
import Boot from './scenes/Boot';
import PreLoader from './scenes/PreLoader';
import titleScene from './scenes/TitleScene';
import instructions from './scenes/InstructionsScene';
import gameover from './scenes/GameOver';
import credit from './scenes/Credits';
import playAgain from './scenes/playAgain';
import Leaderboard from './javascript/leaderboard';

const gameKey = process.env.GAME_KEY;

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
        debug: false
      }
    },
    scene: [Boot, PreLoader, titleScene, instructions, Game, gameover, credit, playAgain]
  };

  const game = new Phaser.Game(config);
  const leaderboard = new Leaderboard();
  window.leaderboard = leaderboard;
  window.focus();
}

