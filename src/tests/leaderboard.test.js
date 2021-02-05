const Leaderboard = require('../javascript/leaderboard');

jest.mock('../javascript/leaderboard', () => jest.fn().mockImplementation(() => ({
  getScore: jest.fn().mockReturnValue([{ user: 'player', score: 400 }, { user: 'player2', score: 620 }]),
  postScore: jest.fn().mockReturnValue([{ user: 'player', score: 400 }]),
})));

describe('Leaderboard API POST and GET Scores', () => {
  let leaderboard;
  beforeEach(() => {
    leaderboard = new Leaderboard();
  });

  it('POST player and score to API', () => {
    expect(leaderboard.postScore('player', 400)).toEqual([{ user: 'player', score: 400 }]);
  });

  it('GET player and score from API', () => {
    expect(leaderboard.getScore()).toEqual([{ user: 'player', score: 400 }, { user: 'player2', score: 620 }]);
  });
});