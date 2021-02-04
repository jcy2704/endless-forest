import Phaser from 'phaser';

export default class playAgain extends Phaser.Scene {
  constructor() {
    super('play-again');
  }

  init(data) {
    this.ending = data.song;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const text = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: 'Thank You',
      style: {
        fontSize: '120px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    text.setOrigin(0.5, 0.5);

    const play = this.make.text({
      x: this.width / 2,
      y: this.height / 2 + 40,
      text: 'play again?',
      style: {
        fontSize: '40px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    play.setOrigin(0.5, 0.5);

    text.y -= text.height / 2;

    this.playBtn = this.add.image(this.width / 2, this.height / 2 + 120, 'play_red').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.playIsPressed())
      .on('pointerup', () => {
        this.playNotPressed();
        this.start();
      });

    this.playBtn.x -= this.playBtn.width / 2 + 50;

    this.exitBtn = this.add.image(this.width / 2, this.height / 2 + 120, 'exit_red').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.exitIsPressed())
      .on('pointerup', () => {
        this.exitNotPressed();
        this.exit();
      });

    this.exitBtn.x -= this.exitBtn.width / 2 - 200;
  }

  start() {
    this.ending.stop();
    this.cameras.main.fadeOut(2000, 255, 255, 255);
    this.scene.start('title-screen');
  }

  exit() {
    this.ending.stop();
    this.cameras.main.fadeOut(2000, 0, 0, 0);
    this.scene.stop();
  }

  playIsPressed() {
    this.playBtn.setTexture('playPressed');
  }

  playNotPressed() {
    this.playBtn.setTexture('play_red');
  }

  exitIsPressed() {
    this.exitBtn.setTexture('exitPressed');
  }

  exitNotPressed() {
    this.exitBtn.setTexture('exit_red');
  }
}