export default class GamePauseScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GamePauseScene' }); // Unique key for the pause scene
    }

    initialize({currentScore, levelIndex, totalLevels}){
        this.currentScore = currentScore || 0;
        this.levelIndex = levelIndex || 0;
        this.totalLevels = totalLevels || 1; // Default to 1 if not provided
    }
  
    create(data) {
      const { currentScore, levelIndex, totalLevels } = data;
      console.log(`The number of levels is :${totalLevels}`);
  
      // Background overlay
      this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);
  
      // Pause message
      this.add.text(400, 200, 'Paused', {
        font: '48px Arial',
        fill: '#ffffff',
      }).setOrigin(0.5);
  
      // Display current score
      this.add.text(400, 270, `Score: ${currentScore}`, {
        font: '32px Arial',
        fill: '#ffffff',
      }).setOrigin(0.5);
  
      // Add "Next Level" button
      const nextLevelButton = this.add.text(400, 350, 'Next Level', {
        font: '24px Arial',
        fill: '#00ff00',
        backgroundColor: '#000',
      })
        .setOrigin(0.5)
        .setInteractive();
  
      nextLevelButton.on('pointerdown', () => {
        if (levelIndex + 1 < totalLevels) {
            this.scene.stop('GamePauseScene');
            this.scene.start('GameScene', {
              levelIndex: levelIndex + 1,
              currentScore,
            });
          } else {
            console.log('No more levels. Transitioning to GameOverScene.');
            this.scene.stop('GamePauseScene');
            this.scene.start('GameOverScene', { currentScore });
          }
        });
  
      // Add "Retry Level" button
      const retryButton = this.add.text(400, 420, 'Retry Level', {
        font: '24px Arial',
        fill: '#ff0000',
        backgroundColor: '#000',
      })
        .setOrigin(0.5)
        .setInteractive();
  
      retryButton.on('pointerdown', () => {
        this.scene.stop('GamePauseScene');
        this.scene.start('GameScene', { levelIndex, currentScore: 0 });
      });
    }
  }