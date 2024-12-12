export default class MainMenu extends Phaser.Scene {
    constructor() {
      super({ key: 'MainMenu' });
    }
  
    preload() {
      this.load.image('background-img', 'assets/images/gameover-background.png');
      this.load.image('howToPlayImage', 'assets/images/howtoplay.png');
      this.load.audio('spawn', 'assets/audio/spawn.mp3'); // Load audio for level start
    }
  
    create() {
      this.add.image(400, 300, 'background-img');
      // Title
      this.add.text(400, 100, 'Main Menu', {
        font: '40px Arial',
        fill: '#00ff00',
      }).setOrigin(0.5);
      
      // Play Button
      const playButton = this.add.text(400, 200, 'Play', {
        font: '32px Arial',
        fill: '#00ff00',
      }).setOrigin(0.5).setInteractive();


      playButton.on('pointerdown', () => this.startGame());
      playButton.on('pointerover', () => playButton.setStyle({ fill: '#FFA500' }));
      playButton.on('pointerout', () => playButton.setStyle({ fill: '#00ff00' }));


      // How To Play Button
      const howToPlayButton = this.add.text(400, 300, 'How To Play', {
        font: '32px Arial',
        fill: '#00ff00',
      }).setOrigin(0.5).setInteractive();

      howToPlayButton.on('pointerdown', () => this.showHowToPlay());
      howToPlayButton.on('pointerover', () => howToPlayButton.setStyle({ fill: '#FFA500' }));
      howToPlayButton.on('pointerout', () => howToPlayButton.setStyle({ fill: '#00ff00' }));


      // Level Selection Button
      const levelButton = this.add.text(400, 400, 'Select Level', {
        font: '32px Arial',
        fill: '#00ff00',
      }).setOrigin(0.5).setInteractive();

      levelButton.on('pointerdown', () => this.showLevelSelection());
      levelButton.on('pointerover', () => levelButton.setStyle({ fill: '#FFA500' }));
      levelButton.on('pointerout', () => levelButton.setStyle({ fill: '#00ff00' }));

      // Back Button (Initially Hidden)
      this.backButton = this.add.text(400, 500, 'Back to Menu', {
        font: '32px Arial',
        fill: '#00ff00',
      }).setOrigin(0.5).setInteractive().setVisible(false);

      this.backButton.on('pointerdown', () => this.showMenu());
      this.backButton.on('pointerover', () => this.backButton.setStyle({ fill: '#FFA500' }));
      this.backButton.on('pointerout', () => this.backButton.setStyle({ fill: '#00ff00' }));


    
      playButton.on('pointerdown', () => {
        this.scene.start('GameScene');
      });

      // Level Buttons (Initially Hidden)
      this.levelButtons = [];
      for (let i = 1; i <= 2; i++) {
        const levelBtn = this.add.text(400, 150 + i * 50, `Level ${i}`, {
          font: '32px Arial',
          fill: '#00ff00',
      }).setOrigin(0.5).setInteractive().setVisible(false);

      levelBtn.on('pointerdown', () => this.startLevel(i - 1));
      levelBtn.on('pointerover', () => levelBtn.setStyle({ fill: '#FFA500' }));
      levelBtn.on('pointerout', () => levelBtn.setStyle({ fill: '#00ff00' }));

      this.levelButtons.push(levelBtn);
      }
    }
    startGame() {
      this.scene.start('GameScene', {
          level : 0
      }); // Transition to the main game
      this.sound.play('spawn'); // Play spawn sound
    }
  
    showHowToPlay() {
      this.clearMenu();
      this.add.text(400, 100, 'How To Play', {
        font: '32px Arial',
        fill: '#ffffff',
      }).setOrigin(0.5);
  
      // this.add.text(400, 200, 'Use Arrow Keys to Move', {
      //   font: '24px Arial',
      //   fill: '#ffffff',
      // }).setOrigin(0.5);

      // Add the "How To Play" image
      this.add.image(400, 250, 'howToPlayImage').setScale(0.5); // Adjust scale if necessary

  
      this.backButton.setVisible(true);
    }
  
    showLevelSelection() {
      this.clearMenu();
      this.levelButtons.forEach(button => button.setVisible(true));
      this.backButton.setVisible(true);
    }
  
    showMenu() {
      this.clearMenu();
      this.scene.restart(); // Restart to reset menu
    }
  
    startLevel(level) {
      this.scene.start('GameScene', { levelIndex : level }); // Pass the selected level to GameScene
      this.sound.play('spawn'); // Play spawn sound
    }
  
    clearMenu() {
      // Hide all visible menu elements
      this.children.list.forEach(child => {
        if (child instanceof Phaser.GameObjects.Text) {
          child.setVisible(false);
        }
      });
    }
  }
