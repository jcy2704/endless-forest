import Phaser from 'phaser';
import loadFont from '../javascript/fontLoader';
import boot from '../assets/sound effects/boot.mp3';
import arcadiaFont from '../assets/font/Arcadia-Regular.ttf';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    loadFont('Arcadia', arcadiaFont);
    this.load.audio('boot', boot);
    this.sound.pauseOnBlur = false;
  }

  create() {
    this.bootSound = this.sound.add('boot', { volume: 0.4 });
    this.bootSound.play();

    const title = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: 'ENDLESS FOREST',
      style: {
        fontSize: '100px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    title.setOrigin(0.5, 0.5);

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.time.delayedCall(2000, () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('preLoader');
    });

    const keyP = this.input.keyboard.addKey('ENTER');
    keyP.on('down', () => {
      this.bootSound.stop();
      this.scene.start('preLoader');
    });
  }
}