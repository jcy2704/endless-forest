import playBtn from '../assets/buttons/play.png';
import exitBtn from '../assets/buttons/exit.png';
import playPressed from '../assets/buttons/pressed/play.png';
import exitPressed from '../assets/buttons/pressed/exit.png';
import createAligned from '../javascript/createAligned';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title-screen');
  }

  preload() {
    this.load.image('play', playBtn);
    this.load.image('exit', exitBtn);
    this.load.image('playPressed', playPressed);
    this.load.image('exitPressed', exitPressed);

    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const bgh = this.textures.get('background').getSourceImage().height;

    this.add.tileSprite(0, this.height, this.width, bgh, 'background')
      .setOrigin(0, 1).setScrollFactor(0);

    createAligned(this, -23, 'bgTree_1', true);
    createAligned(this, 100, 'lights_1', false);
    createAligned(this, -53, 'bgTree_2', true);
    createAligned(this, -75, 'bgTree_3', true);
    createAligned(this, 100, 'lights_2', false);
    createAligned(this, -45, 'bgTree_4', true);
    createAligned(this, 0, 'upTree', true);
    createAligned(this, 10, 'floor', true, -250);

    const title = this.make.text({
      x: this.width/2,
      y: this.height/2 - 160,
      text: 'ENDLESS RUNNER',
      style: {
        fontSize: '75px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace'
      }
    });
    title.setOrigin(0.5, 0.5)

    this.playBtn = this.add.image(this.width/2, this.height/2 - 25, 'play').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.playIsPressed() )
      .on('pointerup', () => {
        this.playNotPressed();
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.scene.start('game');
      });

    this.exitBtn = this.add.image(this.width/2, this.height/2 + 70, 'exit').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.exitIsPressed() )
      .on('pointerup', () => {
        this.exitNotPressed();
      });
  }

  playIsPressed() {
    this.playBtn.setTexture('playPressed');
  }

  playNotPressed() {
    this.playBtn.setTexture('play');
  }

  exitIsPressed() {
    this.exitBtn.setTexture('exitPressed');
  }

  exitNotPressed() {
    this.exitBtn.setTexture('exit');
  }
}