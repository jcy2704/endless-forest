const fontLoader = (name, url) => {
  const newFont = new FontFace(name, `url(${url})`);
  newFont.load().then((loaded) => {
    document.fonts.add(loaded);
  }).catch((error) => error);
};

module.exports = fontLoader;