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
    this.cameras.main.fadeIn(1500, 255, 255, 255);

    this.gameMusic = this.sound.add('gameMusic', { volume: 0.25, loop: true });
    this.gameMusic.play();

    this.input.mouse.disableContextMenu();
    // Variables
    this.alive = true;
    this.playerJumps = 0;
    this.playerDrops = 0;
    this.platformAdded = 0;
    this._score = 0;
    this.scoreSpeed = gameOptions.scoreSpeed;

    // Background
    const bgh = this.textures.get('background').getSourceImage().height;

    this.add.tileSprite(0, this.height, this.width, bgh, 'background')
      .setOrigin(0, 1);

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
    this.bg8.body.setSize(this.width, 55);

    // Score System
    this.scoreText = this.make.text({
      x: this.width-160,
      y: 40,
      text: 'SCORE: 0',
      style: {
        fontSize: '20px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace'
      }
    });

    this.scoreCounter = this.time.addEvent({
      delay: this.scoreSpeed,
      callback: () => {
        this._score += 1;
      },
      callbackScope: this,
      loop: true
    });

    // Player
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.height - 95, 'player');
    this.player.setGravityY(gameOptions.playerGravity);

    this.physics.add.collider(this.player, this.bg8, () => {
      if (!this.player.anims.isPlaying) {
        this.player.setTexture('player');
        this.player.anims.play("run", true);
      }
    });

    this.physics.add.overlap(this.player, this.bg8, () => {
      this.player.setPosition(200, this.height - 104)
    })

    // Inputs
    const keys = this.input.keyboard.addKeys({
      space: 'SPACE',
      a: 'A',
      s: 'S',
      w: 'W'
    });

    keys.space.on('down', this.jump, this);
    keys.w.on('down', this.jump, this);
    keys.a.on('down', this.attack, this);
    keys.s.on('down', this.instaDrop, this);

    this.input.on("pointerdown", (pointer) => {
      if (pointer.rightButtonDown()) {
        this.instaDrop();
      } else if (pointer.leftButtonDown()) {
        this.attack();
      }
    }, this);

    // Platforms
    this.platformGroup = this.add.group({
      removeCallback: (platform) => {
        platform.scene.platformPool.add(platform);
      }
    })

    this.platformPool = this.add.group({
      removeCallback: (platform) => {
        platform.scene.platformGroup.add(platform);
      }
    })

    this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.setTexture('player');
        this.player.anims.play("run", true);
      }
    });

    this.platform = this.add.tileSprite(this.width, this.height-200, 200, 50, 'platform');

    this.physics.add.existing(this.platform);
    this.platform.body.setVelocityX(-300);
    this.platform.body.setSize(this.platform.body.width, this.platform.body.height - 10);
    this.platform.body.setImmovable();

    this.physics.add.collider(this.player, this.platform, () => {
      this.player.setVelocityX(this.platform.body.velocity.x * -1);
      if (!this.player.anims.isPlaying) {
        this.player.setTexture('player');
        this.player.anims.play("run", true);
      }
    }, null, this)

    this.platformPosY = this.platform.body.y - this.platform.body.height + 10.5

    this.physics.add.overlap(this.player, this.platform, () => {
      this.player.y = this.platformPosY - 10.5;
    })
  }

  update() {
    if (this.cursors.left.isDown) {
      this.scene.pause();
    } else if (this.cursors.right.isDown) {
      this.alive = false;
    }

    this.player.x = gameOptions.playerStartPosition;

    if (this.player.body.velocity.y > 0 && this.alive && !this.player.anims.isPlaying) {
      this.player.anims.play('falling', true);
    }

    if (this.alive === true) {
      const bgs = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5, this.bg6, this.bg7, this.bg8]
      const fact = [1.4, 1.45, 1.6, 1.7, 1.8, 2, 3.5, 5]

      bgs.forEach((bg, index) => {
        bg.tilePositionX += fact[index];
      })
    } else {
      this.scene.start('game-start')
    }

    this.player.setVelocityX(0);

    this.scoreText.setText(`SCORE: ${this._score}`);

    this.scoreText.x = this.width - this.scoreText.width - 50;
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
        this.player.y = 629;
        this.player.play('run');
      } else if (this.player.y < this.platformPosY && this.player.y > this.platformPosY - 10.5) {
        this.player.y = this.platformPosY;
        this.player.play('run');
      }
    })
  }

  instaDrop() {
    if ((this.alive) && (!this.player.body.touching.down || (this.playerDrops > 0 && this.playerJumps < gameOptions.drops))) {
      if (this.player.body.touching.down) {
        this.playerDrops = 0;
      }
      this.player.setVelocityY(gameOptions.dropForce);
      this.playerDrops += 1;
    }
  }
}
