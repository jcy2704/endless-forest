require("regenerator-runtime/runtime");

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_KEY_ID}/scores`

export default class Leaderboard {
  constructor() {
  }

  async getScores() {
    const scoreArray = [];

    await fetch(url, { mode: 'cors' })
    .then(result => result.json())
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
      })
      console.log(scoreSorted);
      return scoreSorted;
    })
  }

  async postScore(player, score) {
    console.log(process.env.GAME_KEY_ID);
    const entry = { user: player, score: String(score) };

    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(entry)
    })
    .catch(error => console.error(error));

    return this.getScores();
  }
}