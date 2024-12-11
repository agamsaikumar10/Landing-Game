import GameScene from './scenes/GameScene.js';
import MainMenu from './scenes/MainMenu.js';
import GameOverScene from './scenes/GameOverScene.js';
import GamePauseScene from './scenes/GamePauseScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: [MainMenu, GameScene, GameOverScene, GamePauseScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    }
  },
  // plugins: {
  //   global: [
  //     { key: 'TimePlugin', plugin: Phaser.Time.Clock, start: true },
  //   ],
  // },
};

const game = new Phaser.Game(config);