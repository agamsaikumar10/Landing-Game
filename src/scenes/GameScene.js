
import Monkey from '../classes/Monkey.js';
import Banana from '../classes/Banana.js';
import Controller from '../classes/Controller.js';
import LandingSpace from '../classes/LandingSpace.js';
import Fuel from '../classes/Fuel.js';
import Score from '../classes/Score.js';
import BananaLeft from '../classes/BananaLeft.js';
import MonkeyLife from '../classes/MonkeyLife.js';

const levels = [
  {
      bananas: [{ x: 200, y: 200 }, { x: 600, y: 300 }, { x: 100, y: 250 }],
      landingSpace: { x: 400, y: 500 },
  },
  {
      bananas: [{ x: 300, y: 150 }, { x: 500, y: 400 }, { x: 200, y: 300 }],
      landingSpace: { x: 385, y: 450 },
  }
];


export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.levelIndex = 0; //Default to level 0
    this.lastCollisionTime = 0; //Initialize cooldown Timer
  }

  init(data) {
    // this.levelIndex = data && data.levelIndex !== undefined ? data.levelIndex : 0;
    this.levelIndex = data?.levelIndex ?? 0;
    this.currentScore = data?.currentScore  ??  0; // Retain the score
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
    // this.load.image('leftCliff', 'assets/images/rightCliff.png');
    // this.load.image('rightCliff', 'assets/images/leftCliff.png');
    
    // console.log('GameScene preload');
    this.load.image('cliff', 'assets/images/cliff.png');
    // Preload custom classes
    this.banana = new Banana(this);
    this.banana.preload();

    this.landingSpace = new LandingSpace(this);
    this.landingSpace.preload();

    // this.monkeyLife = new MonkeyLife(this, 535, 50);
    // this.monkeyLife.preload();

    // console.log('GameScene preload');
    // Create the left cliff
    
  }

  create() {


    // this.physics.world.bodies.entries.forEach((body) => {
    //   if (!body.gameObject || body.gameObject.active === false) {
    //       body.destroy();
    //   }
    // });

    console.log('GameScene is running');

    
  

    // Add background
    this.add.image(400, 300, 'background');

    this.monkeyLife = new MonkeyLife(this, 350, 10); // Instantiate MonkeyLife

    // Initialize the monkey
    this.monkey = new Monkey(this, this.monkeyLife);
    this.monkey.create();

    const currentLevel = levels[this.levelIndex];

    if (!currentLevel || !currentLevel.bananas) {
      console.error(`Invalid level data at index: ${this.levelIndex}`);
      this.scene.start('GameOverScene', { currentScore: this.currentScore });
      return;
    }

    // Initialize fuel
    this.fuel = new Fuel(this, 55, 55, 300, 22, levels);

    this.score = new Score(this, 650, 10);
    this.score.update(this.currentScore) //Initializing the score display

    // Initialize the bananas
    this.banana = new Banana(this, currentLevel.bananas);
    this.landingSpace = new LandingSpace(this, currentLevel.landingSpace.x, currentLevel.landingSpace.y);


    // Initialize the bananas
    this.banana.create();

    // Initialize landing space (hidden initially)
    this.landingSpace.create();


    // this.currentScore = 0;

    this.bananaLeft = new BananaLeft(this, 500, 10);
    // Display bananas left text
    this.bananaLeft.updateBananasLeft(this.banana.bananasGroup.countActive(true));
    
    
    // Initialize the controller
    this.controller = new Controller(this);
    this.controller.create();
    this.controller.disableInput = false; //Ensure that input is enabled


    

    if(this.levelIndex === 1){

    this.createCliffs();
  }

  if (this.levelIndex === 1) {
      this.physics.add.collider(
          this.monkey.monkeySprite,
          [this.leftCliff, this.rightCliff],
          (monkey, collidedObject) => {
              this.handleCliffCollision(monkey, collidedObject);
          },
          null,
          this
      );
  }

  // Debug physics bodies
  this.debugPhysicsBodies();

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
        this.handleLandingCollision(this, monkey, landingSpace);
      },() => this.landingSpace.visible,
      this
    );
  
    //this is called for restart
    if (this.levelIndex) {
      this.monkeyLife.updateLives(this.monkeyLife.lives); // Reset to full lives
      this.fuel.fuelHealth = 300;    // Reset fuel bar
    }

    // this.physics.world.createDebugGraphic();  //This puts boxes on game objects


    this.resetMonkey(); //Reset monkey position on level start
    this.isAnimatingFuel = false;  //Resetting the fuel animation flag

    console.log('Left Cliff:', this.leftCliff);
    console.log('Right Cliff:', this.rightCliff);
    // console.log('Left Cliff Body:', this.leftCliff.body);
    // console.log('Right Cliff Body:', this.rightCliff.body);
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
  if (this.levelIndex === 1){
    // Check collision between monkey and leftCliffPolygon
    if (this.leftCliff && this.checkPolygonCollision(this.monkey.monkeySprite, this.leftCliffPolygon)) {
      this.handleCliffCollision(this.monkey.monkeySprite, 'leftCliff');
    }
    // Check collision between monkey and rightCliffPolygon
    if (this.rightCliff && this.checkPolygonCollision(this.monkey.monkeySprite, this.rightCliffPolygon)) {
      this.handleCliffCollision(this.monkey.monkeySprite, 'rightCliff');
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

    // console.log(banana.length);
    console.log(`Current score: ${this.currentScore}`);
    this.updateBananasLeft();
  }

  updateBananasLeft() {
    const bananasLeft = this.banana.bananasGroup.countActive(true); // Count remaining bananas in the group
    this.bananaLeft.updateBananasLeft(bananasLeft);
  }

  handleLandingCollision(scene, monkey, landingSpace) {
    if (!this.landingSpace.landed) {
      this.landingSpace.landed = true; //Prevent further collision processing
      this.sound.play('victory');
      this.monkey.stopMovement();
      this.physics.pause();

      // console.log(this.scene.time);  //Should not be undefined

      scene.time.delayedCall(8000, () =>{
        // this.levelIndex++;
        if (this.levelIndex + 1 < levels.length) {
          console.log(`The total number of levels passed into the GamePauseScene is ${levels.length}`);
          this.scene.start('GamePauseScene', {
            currentScore: this.currentScore,
            levelIndex: this.levelIndex+1,
            totalLevels : levels.length, //Passing the total number of levels
          });

        } else {
          console.log('No more levels. Transitioning into GameOverScene')
          this.registry.set('score', this.currentScore);
          this.scene.start('GameOverScene', {currentScore : this.currentScore});
        }
      });
      

      //Setting a flag to prevent further interactions
      this.controller.disableInput = true;  //Disable input during transition

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
    if (this.levelIndex === 1) {
      this.monkey.monkeySprite.setPosition(100, 100); // Safe position in Level 1
    } else {
      this.monkey.monkeySprite.setPosition(100, 100); // Default position for other levels
    }
    this.monkey.monkeySprite.setVelocity(0, 0); // Stop movement
  }
  
  resetFuel() {
    // Reset fuel to its full capacity
    this.fuel.fuelHealth = 300;
    this.fuel.update(); // Update visuals
  }
  
  handleGameOver() {
    console.log('Game Over!');
    // this.add.text(400, 300, 'Game Over!', {
    //   font: '40px Arial',
    //   fill: '#ffffff',
    // }).setOrigin(0.5);
    this.registry.set('score', this.currentScore);
    this.registry.set('lastLevel', this.levelIndex); // Save the current level index

     // Pause physics to stop all in-game movements
     this.physics.pause();

     // Stop player controls
     this.controller.disableInput = true;
 
     // Reset monkey's velocity to prevent free fall
     this.monkey.monkeySprite.setVelocity(0, 0);
  
    // this.scene.pause(); // Pause the current scene
    this.time.delayedCall(10000, () => {
      this.scene.start('GameOverScene'); // Transition to GameOverScene
    });
  }

  createCliffs() {

    const cliffWidth = 302; // Width of each cliff section
    const cliffHeight = 202; // Height of each cliff section

    const leftCliffX = 50; // X position of the left cliff
    const leftCliffY = 570; 
    const rightCliffX = 700; // X position of the right cliff
    const rightCliffY = 313; // Y position of the right cliff

    this.leftCliff = this.add.sprite(leftCliffX, leftCliffY, 'cliff').setScale(1.3);
    this.leftCliff.setCrop(0, 0, cliffWidth, cliffHeight); // Crop the left part of the image

    this.leftCliffPolygon = new Phaser.Geom.Polygon([
      { x: leftCliffX - 50, y: leftCliffY - 200 },  // Bottom-left becomes top-left
      { x: leftCliffX + 50, y: leftCliffY - 145 },  // Start curving upwards
      { x: leftCliffX + 100, y: leftCliffY - 150 }, // First part of the curve
      { x: leftCliffX + 140, y: leftCliffY - 135 }, // More gradual curve
      { x: leftCliffX + 180, y: leftCliffY - 120 }, // Peak of the first curve
      { x: leftCliffX + 210, y: leftCliffY - 110 }, // Start the second bulge
      { x: leftCliffX + 220, y: leftCliffY - 100 }, // Bulge higher
      { x: leftCliffX + 200, y: leftCliffY - 90 },  // Dip after bulge
      { x: 230, y: leftCliffY - 70 },              // Flatten toward the right
      { x: leftCliffX + 180, y: leftCliffY },      // Slope downwards
      { x: leftCliffX + 180, y: leftCliffY + 5 },
      { x: leftCliffX - 50, y: leftCliffY + 5 },   // Close back to bottom-left
      { x: leftCliffX - 50, y: leftCliffY - 200 }  // Close the polygon
    ]);

    // // Right cliff
    this.rightCliff = this.add.sprite(rightCliffX, rightCliffY, 'cliff').setScale(1.3);
    this.rightCliff.setCrop(0, 208, cliffWidth-10, cliffHeight-10);

    

    this.rightCliffPolygon = new Phaser.Geom.Polygon([
      { x: rightCliffX - 200, y: rightCliffY + 140 },        // Top-left (lower point)
      { x: rightCliffX + cliffWidth - 200, y: rightCliffY + 50}, // Top-right (higher point)
      { x: rightCliffX + cliffWidth - 200, y: rightCliffY + cliffHeight+50}, // Bottom-right
      { x: rightCliffX - 200, y: rightCliffY + cliffHeight +50}, // Bottom-left
      { x: rightCliffX - 200, y: rightCliffY + 140 }         // Close the polygon
    ]);
      
  }
  
  handleCliffCollision(monkey, collidedObject) {
    if (collidedObject === 'leftCliff') {
        console.log('Monkey collided with the left cliff! Losing a life...');
        this.monkeyLife.decreaseLife();
        if (this.monkeyLife.lives <= 0) {
            this.handleGameOver();
            return;
        } else {
            this.resetMonkey();
        }
      }
      if (collidedObject === 'rightCliff') {
        console.log('Monkey collided with the right cliff! Losing a life...');
        this.monkeyLife.decreaseLife();
        if (this.monkeyLife.lives <= 0) {
            this.handleGameOver();
        } else {
            this.resetMonkey();
        }
      }
  }

  // Utility function to check if the monkey intersects the polygon
  checkPolygonCollision(sprite, polygon) {

    if(!polygon || !polygon.points){
      console.log('Polygon is not defined or invalid');
      return false;
    }

    const bounds = sprite.getBounds(); // Get monkey's bounds
    for (let i = 0; i < polygon.points.length - 1; i++) {
        const pointA = polygon.points[i];
        const pointB = polygon.points[i + 1];
        // Check if any line of the polygon intersects with the sprite's bounds
        if (Phaser.Geom.Intersects.LineToRectangle(
            new Phaser.Geom.Line(pointA.x, pointA.y, pointB.x, pointB.y), 
            bounds
        )) {
          console.log('Collision detected with polygon!');
            return true;
        }
    }
    return false;
  }

  debugPhysicsBodies() {
    this.physics.world.bodies.entries.forEach((body) => {
        console.log('Physics Body for the level are:', {
            x: body.position.x,
            y: body.position.y,
            width: body.width,
            height: body.height,
            gameObject: body.gameObject ? body.gameObject.texture.key : 'No GameObject',
        });
    });
  }
  
}
