/**
 *
 * @param {Phaser.Scene} scene
 * @param {number} heightDiff
 * @param {string} image
 * @param {boolean} origin
 * @param {number} widthDiff
 */

export default (scene, heightDiff, image, origin, widthDiff = 0) => {
  let x = 0;
  let l = scene.scale.width / 2;
  let m;
  const h = scene.textures.get(image).getSourceImage().height;
  if (image === 'upTree') {
    m = scene.add.tileSprite(x, 0 + heightDiff, scene.scale.width, h, image)
      .setOrigin(0, 0);

    x += m.width;
  } else if (origin === true && image != 'upTree') {
    m = scene.add.tileSprite(x, scene.scale.height + heightDiff, scene.scale.width, h, image)
      .setOrigin(0, 1);

    x += m.width;
  } else {
    m = scene.add.tileSprite(l + widthDiff, scene.scale.height / 2 + heightDiff, scene.scale.width, h, image)

    l += m.width;
  }

  return m;
}