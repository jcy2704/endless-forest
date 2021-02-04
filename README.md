<p align="center">
  <a href="https://github.com/jcy2704/endless-forest">
    <img src="./src/assets/icon.png" alt="Logo">
  </a>
</p>

<h1 align="center">

  [**Endless Forest**](https://inspiring-lovelace-c7ca1c.netlify.app/)

</h1>

<p align="center">
  <strong>Project/Game created by Steven Jack Chung</strong>
  <br>
  Project created using <a href="https://www.notion.so/Leaderboard-API-service-24c0c3c116974ac49488d4eb0267ade3">Leaderboard API</a> and <a href="https://phaser.io">Phaser 3</a>
</p>

<p align="center">
  <a href="https://inspiring-lovelace-c7ca1c.netlify.app/">
    <img src="https://img.shields.io/badge/PLAY%20ENDLESS%20FOREST-darkgreen?style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="https://github.com/jcy2704/endless-forest/issues">
    <img src="https://img.shields.io/badge/REPORT%20A%20BUG-royalblue?style=for-the-badge">
  </a>
   ‎ ‎ ‎ ‎
  <a href="https://github.com/jcy2704/endless-forest/issues">
    <img src="https://img.shields.io/badge/Request%20a%20feature-royalblue?style=for-the-badge">
  </a>
</p>

## Table of Contents
- [🌳 About Endless Forest](#about-endless-forest)
- [📐 About The Project](#about-the-project)
- [📝 Game Instructions](#game-instructions)
- [⚒️ Built With Phaser 3](#built-with)
- [🖥️ Setup](#setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Run Endless Forest](#run-endless-forest)
- [✍️ Make Your Own Changes](#make-your-own-changes)
  - [Available Commands](#available-commands)
  - [Writing Code](#writing-code)
  - [Deploying Code](#deploying-code)
- [📜 Acknowledgements and Credits](#acknowledgements-and-credits)
- [👤 Author](#author)
- [🤝 Contributing](#-contributing)
- [⭐ Show your support](#show-your-support)

## 🌳 About Endless Forest

[**Endless Forest**](https://inspiring-lovelace-c7ca1c.netlify.app/) is a platform game based on an endless runner genre. You may have heard about Temple Run, Subway Surfer, and other similar games. Although Endless Forest is a 2D game, it falls in a similar genre with those games.

The story behind [**Endless Forest**](https://inspiring-lovelace-c7ca1c.netlify.app/) is about a Knight walking peacefully, but little did he know, he entered the [**Endless Forest**](https://inspiring-lovelace-c7ca1c.netlify.app/). Filled with obstacles and monsters, the knight tries to survive by dodging the obstacles and killing the monsters.

The more time survived the highest score.

I implemented a leaderboard showing the Top 5 Ranking High Scores and the rank and score of the current player.

## 📐 About The Project
Endless Forest is a Phaser 3 project with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

## 📝 Game Instructions

For the Knight to be able to survive you need to dodge obstacles and kills monsters.

**To Jump** over obstacles you can use these following keys

```
    ⌨️ 'W' or 'SPACEBAR'
```

**To Attack** monsters you can use these following keys

```
    ⌨️ 'A' or  🖱️ 'LEFT MOUSE BUTTON'
```

**To Drop** faster (like Subway Surfer) you can use these following keys

```
    ⌨️ 'S' or  🖱️ 'RIGHT MOUSE BUTTON'
```

**Other**

The `ENTER` key is used for basic interaction within the game. These basic interaction includes **skip boot scene, start game, submit leaderboard nickname, skip credits scene, etc**.

## ⚒️ Built With Phaser 3

#### 🕹️ [Phaser 3](https://phaser.io)

## 🖥️ Setup
### Requirements
Internet Browser (Chrome, Firefox, Opera, etc)

[Git](https://git-scm.com/downloads) for version control.

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

### Installation

After installing the tools required, go ahead and clone this repository by using [Git](https://git-scm.com/downloads) commands.

```
    git clone https://github.com/jcy2704/endless-forest.git
```

Or you can also download this repository and access it with navigation commands.

```
    cd /path/to/repository/endless-forrest
```

To be able to run the game smoothly you need to install Node dependencies by typing the following command on your terminal

```
    npm install
```

Now you are good to go!

### Run Endless Forest

Now that you've installed the repository correctly. Go ahead and test it out by running the following command on the terminal

```
    npm start
```

This command will open a `localhost:8080` server where it will be running the game until you close the server by using the key combo `CTRL + C` on the terminal.

And there you are running the game.

**Enjoy!**

## Making Your Own Changes
### Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

### Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

### Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended.

## 📜 Acknowledgements and Credits

### Background Art
**[Pixel Art Forest](https://edermunizz.itch.io/free-pixel-art-forest) Background by Edermunizz**

![Background](https://user-images.githubusercontent.com/64392568/106933163-9c8e1300-66e6-11eb-904f-e7355973ebda.png)

### Character Art
**[Rogue Knight](https://darkpixel-kronovi.itch.io/rogue-knight) by Kronovi-**

![Rogue Knight](https://user-images.githubusercontent.com/64392568/106933328-c6dfd080-66e6-11eb-9890-1402aa6defa4.png)

![Attack](https://user-images.githubusercontent.com/64392568/106933450-eb3bad00-66e6-11eb-99af-c60a014083e6.png)

![player_jump](https://user-images.githubusercontent.com/64392568/106933488-f989c900-66e6-11eb-9bd0-5f622c1d5ce5.png)

![Falling](https://user-images.githubusercontent.com/64392568/106933415-df4feb00-66e6-11eb-95e0-a8aa0354b63f.png)

### Sound Effects

**[Super Dialogue Audio Pack](https://bckr.itch.io/sdap) (death) by Dillon Becker. This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**

![5exuIn](https://user-images.githubusercontent.com/64392568/106933921-7d43b580-66e7-11eb-9bca-3afb34d12080.jpg)

<br>

**Game Over SFX obtained from [Zapsplat](https://www.zapsplat.com)**

### Music

**Intro: [VGMA Challenge](https://tallbeard.itch.io/music-loop-bundle) (July 12th Challenge) by [Abstraction](http://www.abstractionmusic.com/)**

**Game: [A Mystical Journey](https://fatalexit.itch.io/a-mystical-journey-free-orchestral-soundtrack-music-for-games) by [FATAL EXIT](https://soundcloud.com/fatalexit). Licensed under CC BY 4.0.**


**Ending: [III. Finale: Slowly](https://freemusicarchive.org/music/Dee_Yan-Key/Lounge_Jazz_Symphony/03-1424456-Dee_Yan-Key-III_Finale__Slowly_1086) by [Dee Yan-Key](https://freemusicarchive.org/music/Dee_Yan-Key). This work is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)**

### Font
**[Arcadia](https://alexwan.itch.io/arcadia) by Alex Wan. This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**

![LKtY+p](https://user-images.githubusercontent.com/64392568/106933976-90568580-66e7-11eb-9f5d-50bdca8d1bf4.png)
## 👤 Author

👤 **Steven Jack Chung**

- GitHub: [@jcy2704](https://github.com/jcy2704)
- Twitter: [@yiak_](https://twitter.com/yiak_)
- LinkedIn: [Steven Jack Chung](https://linkedin.com/in/stevenjchung)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/jcy2704/endless-forest/issues).

## ⭐ Show your support

Give a ⭐️ if you like this project!