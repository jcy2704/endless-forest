import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  init(data) {
    this.score = data.score;
    this.kills = data.kills;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    const gameOver = this.sound.add('gameover', { volume: 0.5 });
    gameOver.play();

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const title = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: 'GAME OVER',
      style: {
        fontSize: '100px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    title.setOrigin(0.5, 0.5);

    const score = this.make.text({
      x: this.width / 2,
      y: this.height / 2 + title.height / 2 + 40,
      text: `Score: ${this.score}  |  Kills: ${this.kills}`,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    score.setOrigin(0.5, 0.5);

    this.ending = this.sound.add('ending', { volume: 0.25, loop: true });

    this.time.delayedCall(3000, () => {
      this.ending.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('leaderboard-scene', { score: this.score, kills: this.kills, song: this.ending });
    });
  }
}