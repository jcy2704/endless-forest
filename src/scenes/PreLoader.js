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
import player from '../assets/player/player_run.png';
import player_rest from '../assets/player/player_rest.png';
import platform from '../assets/platform.png';
import playBtn from '../assets/buttons/play.png';
import exitBtn from '../assets/buttons/exit.png';
import playPressed from '../assets/buttons/pressed/play.png';
import exitPressed from '../assets/buttons/pressed/exit.png';
import player_jump from '../assets/player/player_jump.png';
import player_falling from '../assets/player/player_falling.png';
import player_attack from '../assets/player/player_attack.png';
import player_dead from '../assets/player/player_dead.png';
import skeleton_attack from '../assets/monsters/skeleton/Skeleton Attack.png';
import skeleton_walk from '../assets/monsters/skeleton/Skeleton Walk.png';
import skeleton_dead from '../assets/monsters/skeleton/Skeleton Dead.png';
import menu from '../assets/music/VGMA Challenge - July 12th.wav';
import gameMusic from '../assets/music/A mystical journey_3.ogg';
import ending from '../assets/music/Dee Yan-Key - III. Finale_ Slowly.mp3';
import spike from '../assets/obstacle/spike.png';
import spike_collection from '../assets/obstacle/spike collection.png';
import instruction_bg from '../assets/paperbackground.png';
import loadFont from '../javascript/fontLoader';

export default class PreLoad extends Phaser.Scene {
  constructor() {
    super('preLoader');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    this.sound.pauseOnBlur = false;
    this.scene.pauseOnBlur = false;
    loadFont('Monogram', '../assets/font/monogram_extended.ttf');

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
    this.load.image('platform', platform);

    this.load.image('play', playBtn);
    this.load.image('exit', exitBtn);
    this.load.image('playPressed', playPressed);
    this.load.image('exitPressed', exitPressed);

    this.load.image('instructions_bg', instruction_bg);

    this.load.spritesheet('player', player, {
      frameWidth: 63.5,
      frameHeight: 59
    });

    this.load.spritesheet('player_rest', player_rest, {
      frameWidth: 33.7,
      frameHeight: 60
    });

    this.load.spritesheet("player_jump", player_jump, {
      frameWidth: 56.7,
      frameHeight: 59
    });

    this.load.spritesheet("player_falling", player_falling, {
        frameWidth: 51.91,
        frameHeight: 59
    });

    this.load.spritesheet("player_attack", player_attack, {
      frameWidth: 86,
      frameHeight: 75
    });

    this.load.spritesheet("player_dead", player_dead, {
      frameWidth: 73,
      frameHeight: 60
    });

    this.load.spritesheet("skeleton_walk", skeleton_walk, {
      frameWidth: 45.13,
      frameHeight: 68
    });

    this.load.spritesheet("skeleton_attack", skeleton_attack, {
      frameWidth: 91.6,
      frameHeight: 79
    });

    this.load.spritesheet("skeleton_dead", skeleton_dead, {
      frameWidth: 69.85,
      frameHeight: 69
    });

    this.load.audio('menu', menu);
    this.load.audio('gameMusic', gameMusic);
    this.load.audio('ending', ending);

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
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "dead",
      frames: this.anims.generateFrameNumbers('player_dead', {
          start: 0,
          end: 6
      }),
      frameRate: 4
  });

    this.anims.create({
      key: 'rest',
      frames: this.anims.generateFrameNumbers('player_rest', {
        start: 0,
        end: 3
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers('player_jump', {
          start: 0,
          end: 6
      }),
      frameRate: 8
  });

  this.anims.create({
    key: "falling",
    frames: this.anims.generateFrameNumbers('player_falling', {
        start: 0,
        end: 5
    }),
    frameRate: 7
  });

  this.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNumbers('player_attack', {
        start: 0,
        end: 6
    }),
    frameRate: 15
  });

  this.anims.create({
    key: "skeleton_walking",
    frames: this.anims.generateFrameNumbers('skeleton_walk', {
        start: 0,
        end: 12
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "skeleton_attacking",
    frames: this.anims.generateFrameNumbers('skeleton_attack', {
        start: 0,
        end: 17
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "skeleton_death",
    frames: this.anims.generateFrameNumbers('skeleton_dead', {
        start: 0,
        end: 14
    }),
    frameRate: 10,
    repeat: -1
  });

  this.scene.start('title-screen');
  }
}
