// global game options
export default {
    drop: 1,

    dropForce: 150,
    // platform speed range, in pixels per second
    platformSpeed: 300,

    // mountain speed, in pixels per second
    mountainSpeed: 80,

    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],

    platformSpawnRate: 5000,

    // platform width range, in pixels
    platformSizeRange: [150, 300],

    // a height range between rightmost platform and next platform to be spawned
    platformInitial: [450, 550],

    platformHeightRange: [370, 550],

    // player gravity
    playerGravity: 900,

    // player jump force
    jumpForce: 500,

    // player starting X position
    playerPositionX: 200,

    playerPositionY: 629,

    // consecutive jumps allowed
    jumps: 2,

    scoreSpeed: 500,

    skeletonSpawnRange: [0, 3],

    skeletonSpawnDistance: [0, 150],

    skeletonSpawnRate: 6000,

    spikeWidth: 56,

    spikeScaleRange: [1, 4],

    spikePercent: 25,

    spikeSpawnRate: 10000,
}