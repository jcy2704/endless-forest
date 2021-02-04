require("regenerator-runtime/runtime");

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_KEY_ID}/scores`

export default class Leaderboard {
  constructor() {
  }

  async getScores() {
    return new Promise((resolve, reject) => {
      const scoreArray = [];

      fetch(url, { mode: 'cors' })
      .then(result => result.json())
      .catch(error => {
        reject(error);
      })
      .then(({ result }) => {
        result.forEach(({ user, score }) => {
          scoreArray.push({ user, score });
        });

        const scoreSorted = scoreArray.sort((a, b) => {
          a = parseInt(a.score);
          b = parseInt(b.score);
          if (a < b) {
            return 1;
          }
          if (a > b) {
            return -1;
          }
          return 0;
        });

        resolve(scoreSorted);
      });
    });
  }

  async postScore(player, score) {
    return new Promise((resolve, reject) => {
      const entry = { user: player, score: String(score) };

      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(entry)
      })
      .then((result) => {
        if (result.ok) return result.json();
        throw new Error('An error ocurred');
      })
      .catch((error) => {
        reject(error);
      })
      .then(() => {
        return resolve(this.getScores());
      });
    })
  }
}