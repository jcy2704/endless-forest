const gameConfig = require('../options/gameConfig');

describe('gameConfig Object', () => {
  it('returns typeof gameconfig', () => {
    expect(typeof gameConfig).toEqual('object');
    expect(typeof gameConfig).not.toEqual('number');
  });

  it('Returns number of drops', () => {
    expect(gameConfig.drop).toEqual(1);
    expect(typeof gameConfig.drop).toEqual('number');
    expect(typeof gameConfig.drop).not.toEqual('object');
    expect(gameConfig.drop).not.toBeInstanceOf(Array);
  });

  it('Returns number of drop force', () => {
    expect(gameConfig.dropForce).toEqual(150);
    expect(typeof gameConfig.dropForce).toEqual('number');
    expect(typeof gameConfig.dropForce).not.toEqual('object');
    expect(gameConfig.dropForce).not.toBeInstanceOf(Array);
  });

  it('Returns number of platform speed', () => {
    expect(gameConfig.platformSpeed).toEqual(300);
    expect(typeof gameConfig.platformSpeed).toEqual('number');
    expect(typeof gameConfig.platformSpeed).not.toEqual('object');
    expect(gameConfig.platformSpeed).not.toBeInstanceOf(Array);
  });

  it('Returns range of spawn', () => {
    expect(gameConfig.spawnRange).toEqual([80, 300]);
    expect(gameConfig.spawnRange).toBeInstanceOf(Array);
    expect(typeof gameConfig.spawnRange).not.toEqual('number');
  });

  it('Returns spawn rate of platforms', () => {
    expect(gameConfig.platformSpawnRate).toEqual(5000);
    expect(typeof gameConfig.platformSpawnRate).toEqual('number');
    expect(typeof gameConfig.platformSpawnRate).not.toEqual('object');
    expect(gameConfig.platformSpawnRate).not.toBeInstanceOf(Array);
  });

  it('Returns size range of platforms', () => {
    expect(gameConfig.platformSizeRange).toEqual([150, 300]);
    expect(gameConfig.platformSizeRange).toBeInstanceOf(Array);
    expect(typeof gameConfig.platformSizeRange).not.toEqual('number');
  });

  it('Returns initial height for platforms', () => {
    expect(gameConfig.platformInitial).toEqual([450, 550]);
    expect(gameConfig.platformInitial).toBeInstanceOf(Array);
    expect(typeof gameConfig.platformInitial).not.toEqual('number');
  });

  it('Returns height for platforms', () => {
    expect(gameConfig.platformHeightRange).toEqual([370, 550]);
    expect(gameConfig.platformHeightRange).toBeInstanceOf(Array);
    expect(typeof gameConfig.platformHeightRange).not.toEqual('number');
  });

  it('Returns gravity force', () => {
    expect(gameConfig.playerGravity).toEqual(900);
    expect(typeof gameConfig.playerGravity).toEqual('number');
    expect(typeof gameConfig.playerGravity).not.toEqual('object');
    expect(gameConfig.playerGravity).not.toBeInstanceOf(Array);
  });

  it('Returns jump force', () => {
    expect(gameConfig.jumpForce).toEqual(500);
    expect(typeof gameConfig.jumpForce).toEqual('number');
    expect(typeof gameConfig.jumpForce).not.toEqual('object');
    expect(gameConfig.jumpForce).not.toBeInstanceOf(Array);
  });

  it('Returns intial position X', () => {
    expect(gameConfig.playerPositionX).toEqual(200);
    expect(typeof gameConfig.playerPositionX).toEqual('number');
    expect(typeof gameConfig.playerPositionX).not.toEqual('object');
    expect(gameConfig.playerPositionX).not.toBeInstanceOf(Array);
  });

  it('Returns position Y', () => {
    expect(gameConfig.playerPositionY).toEqual(629);
    expect(typeof gameConfig.playerPositionY).toEqual('number');
    expect(typeof gameConfig.playerPositionY).not.toEqual('object');
    expect(gameConfig.playerPositionY).not.toBeInstanceOf(Array);
  });

  it('Returns jumps', () => {
    expect(gameConfig.jumps).toEqual(2);
    expect(typeof gameConfig.jumps).toEqual('number');
    expect(typeof gameConfig.jumps).not.toEqual('object');
    expect(gameConfig.jumps).not.toBeInstanceOf(Array);
  });

  it('Returns score speed', () => {
    expect(gameConfig.scoreSpeed).toEqual(500);
    expect(typeof gameConfig.scoreSpeed).toEqual('number');
    expect(typeof gameConfig.scoreSpeed).not.toEqual('object');
    expect(gameConfig.scoreSpeed).not.toBeInstanceOf(Array);
  });

  it('Returns skeleton spawn rate', () => {
    expect(gameConfig.skeletonSpawnRate).toEqual(6000);
    expect(typeof gameConfig.skeletonSpawnRate).toEqual('number');
    expect(typeof gameConfig.skeletonSpawnRate).not.toEqual('object');
    expect(gameConfig.skeletonSpawnRate).not.toBeInstanceOf(Array);
  });

  it('Returns spike width', () => {
    expect(gameConfig.spikeWidth).toEqual(56);
    expect(typeof gameConfig.spikeWidth).toEqual('number');
    expect(typeof gameConfig.spikeWidth).not.toEqual('object');
    expect(gameConfig.spikeWidth).not.toBeInstanceOf(Array);
  });

  it('Returns range of spike scale', () => {
    expect(gameConfig.spikeScaleRange).toEqual([1, 4]);
    expect(gameConfig.spikeScaleRange).toBeInstanceOf(Array);
    expect(typeof gameConfig.spikeScaleRange).not.toEqual('number');
  });

  it('Returns spike percent rate', () => {
    expect(gameConfig.spikePercent).toEqual(25);
    expect(typeof gameConfig.spikePercent).toEqual('number');
    expect(typeof gameConfig.spikePercent).not.toEqual('object');
    expect(gameConfig.spikePercent).not.toBeInstanceOf(Array);
  });

  it('Returns spike spawn rate', () => {
    expect(gameConfig.spikeSpawnRate).toEqual(10000);
    expect(typeof gameConfig.spikeSpawnRate).toEqual('number');
    expect(typeof gameConfig.spikeSpawnRate).not.toEqual('object');
    expect(gameConfig.spikeSpawnRate).not.toBeInstanceOf(Array);
  });
});