
import Monkey from '../classes/Monkey.js';
import Banana from '../classes/Banana.js';
import Controller from '../classes/Controller.js';
import LandingSpace from '../classes/LandingSpace.js';
import Fuel from '../classes/Fuel.js';
import Score from '../classes/Score.js';
import BananaLeft from '../classes/BananaLeft.js';
import MonkeyLife from '../classes/MonkeyLife.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Preload assets
    this.load.image('background', 'assets/images/background.png');
    this.load.spritesheet('monkey', 'assets/images/monkey.png', {
      frameWidth: 188, // Width of each frame
      frameHeight: 108   // Height of each frame
    });
    this.load.image('banana', 'assets/images/pineapple.png');
    this.load.image('landingSpace', 'assets/images/landing-space.png');
    this.load.audio('victory', 'assets/audio/victory.mp3');
    this.load.audio('eat', 'assets/audio/eat.mp3');

    // Preload custom classes
    this.banana = new Banana(this);
    this.banana.preload();

    this.landingSpace = new LandingSpace(this);
    this.landingSpace.preload();

    // this.monkeyLife = new MonkeyLife(this, 535, 50);
    // this.monkeyLife.preload();

    console.log('GameScene preload');
  }

  create() {

    console.log('GameScene is running');

    // Add background
    this.add.image(400, 300, 'background');

    this.monkeyLife = new MonkeyLife(this, 350, 10); // Instantiate MonkeyLife

    // Initialize the monkey
    this.monkey = new Monkey(this, this.monkeyLife);
    this.monkey.create();

    // Initialize the bananas
    this.banana.create();

    // Initialize fuel
    this.fuel = new Fuel(this, 55, 55, 300, 22);

    this.score = new Score(this, 650, 10);

    


    this.currentScore = 0;

    this.bananaLeft = new BananaLeft(this, 500, 10);
    // Display bananas left text
    this.bananaLeft.updateBananasLeft(this.banana.bananasGroup.countActive(true));
    
    // Initialize the controller
    this.controller = new Controller(this);
    this.controller.create();

    // Initialize landing space (hidden initially)
    this.landingSpace.create();

    // Add overlap between monkey and bananas
    this.physics.add.overlap(
      this.monkey.monkeySprite,
      this.banana.bananasGroup,
      (monkey, banana) => {
        this.collectBanana(monkey, banana);
      },
      null,
      this
    );

    // Add overlap between monkey and landing space
    this.landingOverlap = this.physics.add.overlap(
      this.monkey.monkeySprite,
      this.landingSpace.sprite,
      (monkey, landingSpace) => {
        this.handleLandingCollision(monkey, landingSpace);
      },() => this.landingSpace.visible,
      this
    );

    
  }

  update() {

    const gameOverReason = this.checkGameOverConditions();
    if (gameOverReason) {
      this.handleLifeLost(gameOverReason);
      return; // Stop further updates
    }


    // Check if fuel is being animated
    if (this.isAnimatingFuel) {
      const decrementAmount = 1; // Amount to decrease per frame
      const scoreIncrement = 5; // Score increment per frame

      if (this.fuel.fuelHealth > 0) {
        this.fuel.fuelHealth -= decrementAmount; // Decrease fuel
        this.currentScore += scoreIncrement; // Increase score
        this.fuel.update(); // Update the fuel bar visuals
        this.score.update(this.currentScore); // Update the score display
      } else {
        this.isAnimatingFuel = false; // Stop animation when fuel is empty

          this.time.delayedCall(2000, () => {
            this.scene.start('GameOverScene');
          });
        // });
      }
      return; //Skip regular updates during animation
    }

    // Regular game updates
    if (!this.isAnimatingFuel) {
      if (this.banana.bananasGroup.countActive(true) === 0 && !this.landingSpace.visible) {
        this.landingSpace.show();
      }

    this.fuel.update();
    // Update other game objects
    this.controller.update();

    // this.monkey.update();
    if (this.monkey) {
      this.monkey.update(); // Call the Monkey update method every frame
    }
  }
}

checkGameOverConditions() {
  if (this.monkeyLife && this.monkeyLife.lives <= 0) {
      return 'Lives Over';
  }
  if (this.fuel.fuelHealth <= 0 && this.banana.bananasGroup.countActive(true) > 0) {
      return 'Fuel Depleted';
  }
  if (this.monkey.monkeySprite.y > this.cameras.main.height||
      this.monkey.monkeySprite.y < 0 || 
      this.monkey.monkeySprite.x < 0 || 
      this.monkey.monkeySprite.x > this.cameras.main.width
  ) {
      return 'Out of Bounds';
  }
  return null; // No game-over condition met
}


  collectBanana(monkey, banana) {
    banana.destroy(); // Remove the collected banana
    console.log(`Remaining bananas in group: ${this.banana.bananasGroup.countActive(true)}`);
    this.sound.play('eat');

    //Calculating the score from the bananas collected
    this.currentScore += 50;
    this.score.update(this.currentScore);

    console.log(banana.length);
    this.updateBananasLeft();
  }

  updateBananasLeft() {
    const bananasLeft = this.banana.bananasGroup.countActive(true); // Count remaining bananas in the group
    this.bananaLeft.updateBananasLeft(bananasLeft);
  }

  handleLandingCollision(monkey, landingSpace) {
    if (!this.landingSpace.landed) {
      this.sound.play('victory');
      this.monkey.stopMovement();
      this.add.text(400, 300, 'Game Over!', {
        font: '40px Arial',
        fill: '#ffffff',
      }).setOrigin(0.5);

      //Setting a flag to prevent further interactions
      this.controller.disableInput = true;

      this.physics.pause();

      // Set up fuel depletion animation
      this.isAnimatingFuel = true;
    }
  }

  handleLifeLost(reason) {
    console.log(`Life lost due to: ${reason}`);
    console.log(`The flag value in handleLifeLost is ${this.isLifeLost}`);
    if (this.monkeyLife) {
      this.monkeyLife.decreaseLife();
      // Check if no lives are left
      if (this.monkeyLife.lives <= 0) {
        console.log('No lives left. Game Over!');
        this.handleGameOver();
        return; // Exit to prevent further execution
    }
      this.resetMonkey();
      this.resetFuel();
      
    }
  }

  resetMonkey() {
    // Reset monkey's position and velocity
    this.monkey.monkeySprite.setPosition(100, 100); // Example initial position
    this.monkey.monkeySprite.setVelocity(0, 0); // Stop movement
  }
  
  resetFuel() {
    // Reset fuel to its full capacity
    this.fuel.fuelHealth = 300;
    this.fuel.update(); // Update visuals
  }
  
  handleGameOver() {
    console.log('Game Over!');
    this.add.text(400, 300, 'Game Over!', {
      font: '40px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5);
  
    this.scene.pause(); // Pause the current scene
    this.time.delayedCall(2000, () => {
      this.scene.start('GameOverScene'); // Transition to GameOverScene
    });
  }  
  
}

