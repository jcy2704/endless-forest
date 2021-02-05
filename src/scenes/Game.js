/* eslint-disable max-len */
import Phaser from 'phaser';
import createAligned from '../javascript/createAligned';
import gameOptions from '../options/gameConfig';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game-start');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);

    this.gameMusic = this.sound.add('gameMusic', { volume: 0.25, loop: true });
    this.gameMusic.play();

    this.input.mouse.disableContextMenu();

    this.alive = true;
    this.skeletonAlive = true;
    this.playerJumps = 0;
    this.playerDrops = 0;
    this.platformAdded = 0;
    this.spikeAdded = 0;
    this.kills = 0;
    this.score = 0;
    this.scoreSpeed = gameOptions.scoreSpeed;

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

    this.scoreText = this.make.text({
      x: this.width - 160,
      y: 40,
      text: 'SCORE: 0',
      style: {
        fontSize: '20px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });

    this.scoreCounter = this.time.addEvent({
      delay: this.scoreSpeed,
      callback: () => {
        this.score += 1;
      },
      callbackScope: this,
      loop: true,
    });

    this.player = this.physics.add.sprite(gameOptions.playerPositionX, gameOptions.playerPositionY, 'player');
    this.player.setGravityY(gameOptions.playerGravity);

    this.physics.add.collider(this.player, this.bg8, () => {
      this.platformTouching = false;
      if (!this.player.anims.isPlaying && this.alive) {
        this.player.setTexture('player');
        this.player.anims.play('run', true);
      }
    });

    this.physics.add.overlap(this.player, this.bg8, () => {
      this.player.setPosition(200, this.height - 104);
    });

    const keys = this.input.keyboard.addKeys({
      space: 'SPACE',
      a: 'A',
      s: 'S',
      w: 'W',
    });

    keys.space.on('down', this.jump, this);
    keys.w.on('down', this.jump, this);
    keys.a.on('down', this.attack, this);
    keys.s.on('down', this.instaDrop, this);

    this.input.on('pointerdown', (pointer) => {
      if (pointer.rightButtonDown()) {
        this.instaDrop();
      } else if (pointer.leftButtonDown()) {
        this.attack();
      }
    }, this);

    this.platformGroup = this.add.group({
      removeCallback: (platform) => {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback: (platform) => {
        platform.scene.platformGroup.add(platform);
      },
    });

    const randomPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);

    const randomPlatformHeight = Phaser.Math.Between(gameOptions.platformInitial[0], gameOptions.platformInitial[1]);

    this.addPlatform(this.width, randomPlatformHeight, randomPlatformWidth);

    this.physics.add.collider(this.player, this.platformGroup, () => {
      this.platformTouching = true;
      this.player.setVelocityX(gameOptions.platformSpeed);
      if (!this.player.anims.isPlaying && this.alive) {
        this.player.setTexture('player');
        this.player.anims.play('run', true);
      }
    }, null, this);

    this.spikeGroup = this.add.group({
      removeCallback: (spike) => {
        spike.scene.spikePool.add(spike);
      },
    });

    this.spikePool = this.add.group({
      removeCallback: (spike) => {
        spike.scene.spikeGroup.add(spike);
      },
    });

    this.spikeCollider = this.physics.add.collider(this.player, this.spikeGroup, () => {
      this.alive = false;
      this.player.setTexture('player_dead');
      this.player.anims.play('dead', true);
      this.sound.play('death_sound', { volume: 0.25 });
      this.player.body.setVelocityY(-200);

      this.outro();
    }, null, this);

    this.spikeFloor = this.time.addEvent({
      delay: gameOptions.spikeSpawnRate,
      callback: () => {
        this.spawnSpike();
      },
      callbackScope: this,
      loop: true,
    });

    this.floorSpikeGroup = this.add.group();

    this.floorSpikeCollider = this.physics.add.collider(this.player, this.floorSpikeGroup, () => {
      this.alive = false;
      this.player.setTexture('player_dead');
      this.player.anims.play('dead', true);
      this.sound.play('death_sound', { volume: 0.25 });
      this.player.body.setVelocityY(-200);

      this.outro();
    }, null, this);

    this.skeletonSpawner = this.time.addEvent({
      delay: gameOptions.skeletonSpawnRate,
      callback: () => {
        this.spawnSkeleton();
      },
      callbackScope: this,
      loop: true,
    });

    this.skeletonGroup = this.add.group();

    this.skeletonCollider = this.physics.add.collider(this.player, this.skeletonGroup, () => {
      if (this.alive && this.skeletonAlive && this.player.anims.getName() !== 'attack') {
        this.alive = false;
        this.player.setTexture('player_dead');
        this.player.anims.play('dead', true);
        this.sound.play('death_sound', { volume: 0.25 });
        this.player.body.setVelocityY(-200);

        this.outro();
      }
    }, null, this);
  }

  update() {
    this.player.x = gameOptions.playerPositionX;
    this.player.setVelocityX(0);

    if (this.alive) {
      this.scoreBonus();

      this.platformOverlap();

      if (this.skeletonGroup.getLength()) {
        this.skeletonGroup.getChildren().forEach(skeleton => {
          this.skeletonOverlap = this.physics.add.overlap(this.player, skeleton, () => {
            if (this.player.anims.getName() === 'attack') {
              this.skeletonAlive = false;
              skeleton.anims.playReverse('skeleton_death');
            }
          });

          if (skeleton.anims.getName() === 'skeleton_death') {
            this.physics.world.removeCollider(this.skeletonOverlap);
          }
        });
      }

      this.backgroundParallax();

      this.scoreText.setText(`SCORE: ${this.score}`);

      this.scoreText.x = this.width - this.scoreText.width - 50;

      this.objectRemove();

      this.platformSpawner();
    } else {
      this.theAfterLife();
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

      if (this.player.y < gameOptions.playerPositionY && this.player.y > 620 && this.alive) {
        this.player.y = gameOptions.playerPositionY;
        this.player.play('run');
      }

      this.platformGroup.getChildren().forEach(platform => {
        const platformPosY = platform.body.y - platform.body.height + 10.5;

        if (this.player.y < platformPosY && this.player.y > platformPosY - 10.5 && this.alive) {
          this.player.y = platformPosY;
          this.player.play('run');
        }
      });
    });
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

  addPlatform(posX, posY, platformWidth) {
    this.platformAdded += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 50, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable();
      platform.body.setVelocityX(gameOptions.platformSpeed * -1);
      platform.body.setSize(platform.body.width, platform.body.height - 10);
      this.platformGroup.add(platform);
    }

    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

    if (this.platformAdded > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.spikePercent) {
        if (this.spikePool.getLength()) {
          const spike = this.spikePool.getFirst();
          spike.x = posX - platform.body.width / 2 + Phaser.Math.Between(1, platform.body.width - gameOptions.spikeWidth);
          spike.y = posY - platform.body.height / 2;
          spike.active = true;
          spike.visible = true;
          this.spikePool.remove(spike);
        } else {
          const spike = this.physics.add.sprite(posX - platform.body.width / 2 + Phaser.Math.Between(1, platform.body.width - gameOptions.spikeWidth), posY - platform.body.height / 2, 'spike').setOrigin(0, 1);
          spike.setImmovable();
          spike.setVelocityX(platform.body.velocity.x);
          this.spikeGroup.add(spike);
        }
      }
    }
  }

  platformSpawner() {
    let minDistance = this.width;
    this.platformGroup.getChildren().forEach(platform => {
      const platformDistance = minDistance - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);

      let platformRandomHeight;
      if (this.platformAdded === 0) {
        platformRandomHeight = Phaser.Math.Between(gameOptions.platformInitial[0], gameOptions.platformInitial[1]);
      } else {
        platformRandomHeight = Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      }

      this.addPlatform(this.width + nextPlatformWidth / 2, platformRandomHeight, nextPlatformWidth);
    }
  }

  spawnSpike() {
    this.spikeAdded += 1;
    const h = this.textures.get('spike').getSourceImage().height;

    const floorSpike = this.add.tileSprite(this.width, gameOptions.playerPositionY, gameOptions.spikeWidth * Phaser.Math.Between(gameOptions.spikeScaleRange[0], gameOptions.spikeScaleRange[1]), h, 'spike');

    this.physics.add.existing(floorSpike);
    floorSpike.body.setImmovable();
    floorSpike.body.setVelocityX(gameOptions.platformSpeed * -1);
    this.floorSpikeGroup.add(floorSpike);
  }

  spawnSkeleton() {
    this.skeletonAlive = true;

    const skeleton = this.physics.add.sprite(this.width, gameOptions.playerPositionY - 5, 'skeleton_walk');

    skeleton.setVelocityX(gameOptions.platformSpeed * -1 - 50);
    skeleton.anims.playReverse('skeleton_walking');
    skeleton.setImmovable();

    this.skeletonGroup.add(skeleton);
  }

  scoreBonus() {
    if (this.player.body.touching.down && this.platformTouching) {
      this.scoreCounter.delay = gameOptions.scoreSpeed - 200;
    } else {
      this.scoreCounter.delay = gameOptions.scoreSpeed;
    }
  }

  platformOverlap() {
    if (this.platformGroup.getLength()) {
      this.platformGroup.getChildren().forEach(platform => {
        const platformPosY = platform.body.y - platform.body.height + 10.5;

        this.physics.add.overlap(this.player, platform, () => {
          this.player.y = platformPosY - 10.5;
        });
      });
    }
  }

  backgroundParallax() {
    if (this.player.body.velocity.y > 0 && !this.player.anims.isPlaying) {
      this.player.anims.play('falling', true);
    }
    const bgs = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5, this.bg6, this.bg7, this.bg8];
    const fact = [1.45, 1.5, 1.65, 1.75, 1.85, 2.1, 3.55, 5.1];

    bgs.forEach((bg, index) => {
      bg.tilePositionX += fact[index];
    });
  }

  objectRemove() {
    this.spikeGroup.getChildren().forEach(spike => {
      if (spike.x < -spike.displayWidth / 2) {
        this.spikeGroup.killAndHide(spike);
        this.spikeGroup.remove(spike);
      }
    }, this);

    this.floorSpikeGroup.getChildren().forEach(spike => {
      if (spike.x < -spike.displayWidth / 2) {
        this.floorSpikeGroup.remove(spike);
        spike.destroy();
      }
    }, this);

    this.skeletonGroup.getChildren().forEach(skeleton => {
      if (skeleton.x < -skeleton.displayWidth / 2 && skeleton.anims.getName() === 'skeleton_death') {
        this.kills += 1;
        this.skeletonGroup.remove(skeleton);
        skeleton.destroy();
      } else if (skeleton.x < -skeleton.displayWidth / 2) {
        this.skeletonGroup.remove(skeleton);
        skeleton.destroy();
      }
    }, this);
  }

  theAfterLife() {
    this.gameMusic.stop();

    this.scoreCounter.paused = true;
    this.skeletonSpawner.paused = true;
    this.spikeFloor.paused = true;

    this.platformGroup.getChildren().forEach(platform => {
      platform.body.setVelocityX(0);
    });

    this.spikeGroup.getChildren().forEach(spike => {
      spike.setVelocityX(0);
    });

    this.floorSpikeGroup.getChildren().forEach(spike => {
      spike.body.setVelocityX(0);
    });

    this.skeletonGroup.getChildren().forEach(skeleton => {
      skeleton.body.setVelocityX(-50);

      if (skeleton.anims.getName() === 'skeleton_death') {
        skeleton.body.setVelocityX(0);
      }
    });

    this.input.keyboard.removeAllKeys();

    this.physics.world.removeCollider(this.spikeCollider);
    this.physics.world.removeCollider(this.floorSpikeCollider);
    this.physics.world.removeCollider(this.skeletonCollider);
    this.physics.world.removeCollider(this.skeletonOverlap);

    this.time.delayedCall(1000, () => {
      this.player.setTexture('player_dead', 4);
    });
  }

  outro() {
    this.time.delayedCall(3000, () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('game-over', { score: this.score, kills: this.kills });
    });
  }
}
