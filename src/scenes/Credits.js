import Phaser from 'phaser';

export default class Credits extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  init(data) {
    this.ending = data.song;
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.credits = [
      {
        game: {
          created: '     Game Creator          Steven Jack Chung',
          background: 'Forest Background          Edermunizz',
          knight: ' Rogue Knight Art          Kronovi-',
        },
        music: {
          intro: '   Intro Song:\n   VGMA Challenge          Abstraction',
          game: ' Game Song:\n Mystical Journey          FATAL EXIT',
          ending: 'Ending Song:\nIII Finale Slowly          Dee Yan-Key',
        },
        fx: {
          die: 'SFx:\nSuper Dialogue Pack        Dillon Becker',
        },
        font: {
          arcadia: '          Font:\n          Arcadia          Alex Wan',
        },
      },
    ];
  }

  create() {
    this.textGroup = this.add.group();

    this.createText('Credits', 100, 'Arcadia', true);

    let creditsAdded = 0;
    let prevCredit;

    this.credits.forEach(entry => {
      Object.entries(entry).forEach(([key, value]) => {
        // eslint-disable-next-line no-unused-vars
        Object.entries(value).forEach(([key2, value2]) => {
          creditsAdded = 0;
          this.time.delayedCall(3000, () => {
            const credit = this.createText(value2, 50, 'Monogram');
            if (creditsAdded >= 1) {
              credit.y = prevCredit.y + 200;
            }
            prevCredit = credit;
            creditsAdded += 1;
          });

          if (key === 'font') {
            this.time.delayedCall(25000, () => {
              this.cameras.main.fadeOut(1000, 0, 0, 0);
            });

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
              this.scene.start('play-again', { song: this.ending });
            });
          }
        });
      });
    });

    const keyP = this.input.keyboard.addKey('ENTER');
    keyP.on('down', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.scene.start('play-again', { song: this.ending });
    });
  }

  update() {
    this.textGroup.getChildren().forEach(text => {
      if (text.y < -text.displayHeight / 2) {
        this.textGroup.remove(text);
        text.destroy();
      }
    }, this);
  }

  createText(placeholder, fontSize, font, center = false) {
    const text = this.make.text({
      x: this.width / 2,
      y: this.height,
      text: placeholder,
      style: {
        fontSize: `${fontSize}px`,
        fill: '#ffffff',
        fontFamily: `${font}, monospace`,
        align: 'left',
      },
    });
    if (center) {
      text.setOrigin(0.5, 0.5);
    } else {
      text.setOrigin(0, 1);
      text.x /= 3;
    }

    this.physics.add.existing(text);

    text.body.setVelocityY(-85);

    this.textGroup.add(text);

    return text;
  }
}