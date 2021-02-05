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
import leaderboardScene from './scenes/LeaderboardScene';
import leaderboardTable from './scenes/LeaderboardTable';

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'divId',
    width: 1250,
    height: 725,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    dom: {
      createContainer: true,
    },
    // eslint-disable-next-line max-len
    scene: [Boot, PreLoader, titleScene, instructions, Game, gameover, leaderboardScene, leaderboardTable, credit, playAgain],
  };

  // eslint-disable-next-line no-unused-vars
  const game = new Phaser.Game(config);

  window.focus();
};
