import Phaser from 'phaser';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('leaderboard-scene');
  }

  init(data) {
    this.subScore = data.score;
    this.kills = data.kills;
    this.ending = data.song;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.totalScore = this.subScore + this.kills * 10;

    this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 150,
      text: `Total Score\n${this.totalScore}`,
      style: {
        fontSize: '60px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
        align: 'center',
      },
    }).setOrigin(0.5, 0.5);

    this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: `Score: ${this.subScore} | Kills: ${this.kills}`,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);

    const keys = this.input.keyboard.addKeys({
      space: 'SPACE',
      a: 'A',
      s: 'S',
      w: 'W',
      enter: 'ENTER',
    });

    keys.a.on('down', (e) => {
      e.preventDefault();
    });

    keys.s.on('down', (e) => {
      e.preventDefault();
    });

    keys.enter.on('down', (e) => {
      e.preventDefault();
    });

    keys.space.on('down', (e) => {
      e.preventDefault();
    });

    keys.w.on('down', (e) => {
      e.preventDefault();
    });

    const element = this.add.dom(this.width / 2, this.height / 2 + 100).createFromHTML('<input class="playerInput" type="text" placeholder="Your Nickname" name="player">', 'form');

    const form = document.querySelector('form');
    const input = document.querySelector('input');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form).entries();
      const { player } = Object.fromEntries(formData);

      if (player === '') {
        input.value = '';
        input.placeholder = 'PLEASE ENTER A NICKNAME';
        input.classList.add('input-warning');
      } else {
        element.destroy();

        this.cameras.main.fadeOut(1000, 0, 0, 0);

        this.scene.start('leaderboard-table', { player, score: this.totalScore, song: this.ending });
      }
    });
  }
}