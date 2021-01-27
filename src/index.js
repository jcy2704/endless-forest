import Phaser from 'phaser';
import './css/main.css';
import Background from './scenes/background';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1250,
  height: 725,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Background]
};

const game = new Phaser.Game(config);

// this.load.spritesheet('player', player, {
//   frameWidth: 104,
//   frameHeight: 64
// });
// this.anims.create({
//   key: 'run',
//   frames: this.anims.generateFrameNumbers('player', {
//     start: 0,
//     end: 5
//   }),
//   frameRate: 8,
//   repeat: -1
// });

// this.player = this.add.sprite(462, 270, 'player');
// this.player.anims.play('run');