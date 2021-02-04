import Phaser from 'phaser';
import Leaderboard from '../javascript/leaderboard';

export default class LeaderboardTable extends Phaser.Scene {
  constructor() {
    super('leaderboard-table');
  }

  init(data) {
    this.player = data.player;
    this.score = data.score;
    this.song = data.song;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    const leaderboard = new Leaderboard();

    if (this.player && this.score) {
      this.leaderboard = leaderboard.postScore(this.player, this.score);
    } else {
      this.leaderboard = leaderboard.getScores();
    }
  }

  create() {
    const title = this.make.text({
      x: this.width / 2,
      y: 50,
      text: 'LEADERBOARD',
      style: {
        fontSize: '100px',
        fill: '#fff200',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);

    this.sub = this.make.text({
      x: this.width / 2,
      y: title.y + 110,
      text: 'Rank       Player       Score',
      style: {
        fontSize: '50px',
        fill: '#003fff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);

    this.time.delayedCall(1000, () => {
      this.leaderboard.then(result => {
        let prevRank;
        let prevName;
        let prevScore;

        for (let i = 0; i <= 4; i += 1) {
          const { user, score } = result[i];

          const rank = this.rankText(i + 1);
          const name = this.nameText(user);
          const scoreN = this.scoreText(score);

          if (i >= 1) {
            rank.y = prevRank.y + 70;
            name.y = prevName.y + 70;
            scoreN.y = prevScore.y + 70;
          }

          prevRank = rank;
          prevName = name;
          prevScore = scoreN;
        }

        if (this.player && this.score) {
          for (let i = 0; i <= result.length - 1; i += 1) {
            const { user, score } = result[i];

            if (user === this.player && parseInt(score, 10) === this.score) {
              this.text = this.make.text({
                x: this.width / 5.7,
                y: this.height - 100,
                text: i + 1,
                style: {
                  fontSize: '60px',
                  fill: '#ffffff',
                  fontFamily: 'Arcadia, monospace',
                },
              }).setOrigin(0.5, 0.5);

              this.make.text({
                x: this.width / 2 - 20,
                y: this.height - 100,
                text: user,
                style: {
                  fontSize: '60px',
                  fill: '#ffffff',
                  fontFamily: 'Arcadia, monospace',
                },
              }).setOrigin(0.5, 0.5);

              this.make.text({
                x: this.width - 235,
                y: this.height - 100,
                text: score,
                style: {
                  fontSize: '60px',
                  fill: '#ffffff',
                  fontFamily: 'Arcadia, monospace',
                },
              }).setOrigin(0.5, 0.5);
            }

            if (this.text) {
              break;
            }
          }
        }
      });
    });

    this.make.text({
      x: this.width / 2,
      y: this.height - 30,
      text: "[ Press 'ENTER' to continue... ]",
      style: {
        fontSize: '30px',
        fill: '#505050',
        fontFamily: 'Monogram, monospace',
        align: 'justify',
      },
    }).setOrigin(0.5, 0.5);

    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.scene.start('credits', { song: this.song });
    });
  }

  rankText(rank) {
    return this.make.text({
      x: this.width / 5.7,
      y: this.sub.y + 75,
      text: rank,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }

  nameText(player) {
    return this.make.text({
      x: this.width / 2 - 20,
      y: this.sub.y + 75,
      text: player,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }

  scoreText(score) {
    return this.make.text({
      x: this.width - 235,
      y: this.sub.y + 75,
      text: score,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }
}