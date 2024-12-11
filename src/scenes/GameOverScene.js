export default class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' }); // Unique key to identify this scene
    }
  
    preload() {
      
      // Preload assets
      this.load.image('gameoverBackground', 'assets/images/gameover-background.png');
    }
  
    create() {
      // Add background image
      this.add.image(400, 300, 'gameoverBackground') // Adjust scale as needed
  
      // Calculate and update high score
      const currentScore = this.registry.get('score') || 0; // Assuming score is stored in the registry
      let highscore = localStorage.getItem('highscore') || 0;
      if (currentScore > highscore) {
        highscore = currentScore;
        localStorage.setItem('highscore', highscore);
      }
  
      // Display "GAME OVER" text
      this.add.text(400, 160, 'GAME OVER', {
        font: '72px Nunito-ExtraBold',
        fill: '#ff6600',
        stroke: '#ffffff',
        strokeThickness: 10,
      }).setOrigin(0.5);
  
      // Display points earned
      this.add.text(400, 300, 'YOU MANAGED TO GET', {
        font: '35px Nunito-ExtraBold',
        fill: '#ffffff',
      }).setOrigin(0.5);
  
      this.add.text(400, 370, `${currentScore}`, {
        font: '40px Nunito-ExtraBold',
        fill: '#ff6600',
      }).setOrigin(0.5);
  
      this.add.text(400, 450, 'MONKEY POINTS!', {
        font: '35px Nunito-ExtraBold',
        fill: '#ffffff',
      }).setOrigin(0.5);
  
      // Add "Restart" button
      const restartButton = this.add.text(150, 520, 'Restart Game', {
        font: '32px Nunito-ExtraBold',
        fill: '#ff6600',
        backgroundColor: '#ffffff',
      })
        .setOrigin(0.5)
        .setPadding(5)
        .setInteractive();

      restartButton.on('pointerdown', () => {
        this.scene.start('GameScene', { levelIndex: 0, currentScore: 0 });
      });

      // Add "Retry Level" button
      const retryButton = this.add.text(400, 520, 'Retry Level', {
        font: '32px Nunito-ExtraBold',
        fill: '#ff6600',
        backgroundColor: '#ffffff',
      })
        .setOrigin(0.5)
        .setPadding(5)
        .setInteractive();

      retryButton.on('pointerdown', () => {
        const lastLevel = this.registry.get('lastLevel') || 0;
        this.scene.start('GameScene', { levelIndex: lastLevel, currentScore : 0 });
      });

      const mainMenuButton = this.add.text(650, 520, 'Main Menu', {
        font: '32px Nunito-ExtraBold',
        fill: '#ff6600',
        backgroundColor: '#ffffff',
      })
        .setOrigin(0.5)
        .setPadding(5)
        .setInteractive();
  
      mainMenuButton.on('pointerdown', () => {
        this.scene.start('MainMenu'); // Transition to MainMenu scene
      });
       // Adjust spacing between buttons
    restartButton.setPosition(150, 520); // Left-side button
    retryButton.setPosition(400, 520); 
    mainMenuButton.setPosition(650, 520);
    }
  }
