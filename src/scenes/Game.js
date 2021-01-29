import Phaser from 'phaser';
import createAligned from '../javascript/createAligned';
import gameOptions from '../options/gameConfig';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game-start');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.alive = true;
    const bgh = this.textures.get('background').getSourceImage().height;

    this.add.tileSprite(0, this.height, this.width, bgh, 'background')
      .setOrigin(0, 1).setScrollFactor(0);

    this.bg1 = createAligned(this, -23, 'bgTree_1', true);
    this.bg2 = createAligned(this, 100, 'lights_1', false);
    this.bg3 = createAligned(this, -53, 'bgTree_2', true);
    this.bg4 = createAligned(this, -75, 'bgTree_3', true);
    this.bg5 = createAligned(this, 100, 'lights_2', false);
    this.bg6 = createAligned(this, -45, 'bgTree_4', true);
    this.bg7 = createAligned(this, 0, 'upTree', true);
    this.bg8 = createAligned(this, 10, 'floor', true, -250);

    this.bg8 = this.physics.add.existing(this.bg8);
    this.bg8.body.setImmovable();
    this.bg8.body.moves = false;
    this.bg8.body.setSize(this.width, 55);

    this.player = this.physics.add.sprite(200, this.height - 95, 'player');
    this.player.setGravityY(900);

    this.physics.add.collider(this.player, this.bg8, () => {
      if(!this.player.anims.isPlaying){
        this.player.setTexture('player');
        this.player.anims.play("run", true);
      }
    });

    this.physics.add.overlap(this.player, this.bg8, () => {
      this.player.setPosition(200, this.height - 104)
    })

    this.playerJumps = 0;
    const keys = this.input.keyboard.addKeys({
      space: 'SPACE',
      a: 'A',
      s: 'S'
    });

    keys.space.on('down', this.jump, this);
    keys.a.on('down', this.attack, this);
    keys.s.on('down', this.instaDown, this);
  }

  update() {
    console.log(this.player.y)

    if (this.player.body.velocity.y > 20 && this.alive && !this.player.anims.isPlaying) {
      this.player.anims.play('falling', true);
    }

    if(this.player.y > 725){
      this.scene.start("game-start");
    }

    if (this.alive) {
      const bgs = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5, this.bg6, this.bg7, this.bg8]
      const fact = [1.4, 1.45, 1.6, 1.7, 1.8, 2, 3.5, 5]

      bgs.forEach((bg, index) => {
        bg.tilePositionX += fact[index];
      })
    }
  }

  jump() {
    if ((this.alive) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }

      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.player.anims.play('jump', true);
      this.playerJumps += 1;
    }
  }

  attack() {
    this.player.setTexture('player_attack');
    this.player.setSize(this.player.width, this.player.height);
    this.player.anims.play('attack', true);

    this.player.on('animationcomplete', () => {
      this.player.setTexture('player');
      this.player.setSize(this.player.width, this.player.height);
      if (this.player.y < 629 && this.player.y > 620) {
        this.player.setPosition(200, this.height - 95);
        this.player.play('run');
      }
    })
  }

  instaDown() {
    this.player.setVelocityY(200);
  }
}
