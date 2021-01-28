import Phaser from 'phaser';
import background from '../assets/background/Background 1.png';
import bgTree_1 from '../assets/background/BGTrees 2.png';
import lights_1 from '../assets/background/Lights 3.png';
import bgTree_2 from '../assets/background/BGTrees 4.png';
import bgTree_3 from '../assets/background/BGTrees 5.png';
import lights_2 from '../assets/background/Lights 6.png';
import bgTree_4 from '../assets/background/BGTrees 7.png';
import upTree from '../assets/background/UpTrees 8.png';
import floor from '../assets/background/Floor 9.png';
import player from '../assets/player_run.png';


export default class PreLoad extends Phaser.Scene {
  constructor() {
    super('preLoader');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.width/2 - 160, this.height/2 - 25, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
          fontSize: '20px',
          fill: '#ffffff',
          fontFamily: 'Arcadia, monospace'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
        x: width / 2,
        y: height / 2,
        text: '0%',
        style: {
          fontSize: '18px',
          fill: '#ffffff',
          fontFamily: 'Arcadia, monospace'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.image('background', background);
    this.load.image('bgTree_1', bgTree_1);
    this.load.image('lights_1', lights_1);
    this.load.image('lights_2', lights_2);
    this.load.image('bgTree_2', bgTree_2);
    this.load.image('bgTree_3', bgTree_3);
    this.load.image('bgTree_4', bgTree_4);
    this.load.image('upTree', upTree);
    this.load.image('floor', floor);

    this.load.spritesheet('player', player, {
      frameWidth: 104,
      frameHeight: 64
    });

    this.load.on('progress', function (value) {
      progressBar.clear();
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.fillStyle(0x00cccc, 1);
      progressBar.fillRect(625 - 150, 362.5 - 15, 300 * value, 30);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }

  create() {
    this.scene.start('background');
  }
}
