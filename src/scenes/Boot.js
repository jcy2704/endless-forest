import Phaser from 'phaser';
import loadFont from '../javascript/fontLoader';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    loadFont('Arcadia', '../assets/font/Arcadia-Regular.ttf');
  }

  create() {
    const title = this.make.text({
      x: this.width/2,
      y: this.height/2,
      text: 'ENDLESS RUNNER',
      style: {
        fontSize: '100px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace'
      }
    });
    title.setOrigin(0.5, 0.5)

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.time.delayedCall(2000, () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start('preLoader');
    });

  }
}