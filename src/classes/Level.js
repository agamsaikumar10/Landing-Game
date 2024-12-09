export default class Level {
    constructor(scene) {
      this.scene = scene; // Reference to the Phaser scene
      this.gameClock = 0;
    }
  
    preload() {
      // Preload assets for the level (if needed)
      this.scene.load.image('bigCliff', 'assets/images/big-cliff.png');
      this.scene.load.image('rope', 'assets/images/rope.png');
      this.scene.load.image('coconutTree', 'assets/images/coconut-tree.png');
      this.scene.load.image('rock', 'assets/images/rock.png');
      this.scene.load.image('bigRock', 'assets/images/big-rock.png');
      // Add more assets here
    }
  
    create(level) {
      // Add level-specific assets and objects
      this.level = level;
      console.log(`Level initialized in level create() is  ${level}`);
  
      this.objects = {
        cliffLeft: level === 1 ? this.scene.add.image(100, 300, 'cliffLeft') : null,
        cliffRight: level === 1 ? this.scene.add.image(700, 300, 'cliffRight') : null,
        // ropeReversed: level === 2 ? this.scene.add.image(300, 200, 'rope') : null,
        // headOnSpike: level === 2 ? this.scene.add.image(500, 200, 'headOnSpike') : null,
        // coconutTree: this.createCoconutTree(level),
        // bigCliff: level === 3 ? this.scene.add.image(400, 300, 'bigCliff') : null,
        // rope: level === 3 ? this.scene.add.image(200, 400, 'rope') : null,
        // rock: level === 4 ? this.scene.add.image(500, 500, 'rock') : null,
        // bigRock: level === 4 ? this.scene.add.image(600, 500, 'bigRock') : null,
      };
  
      this.monkeyLife = this.scene.monkeyLife; // Reference to monkey life
      this.fuel = this.scene.fuel; // Reference to fuel system
      this.score = this.scene.score; // Reference to score system
      this.banana = this.scene.banana; // Reference to bananas
      this.landingSpace = this.scene.landingSpace; // Reference to landing space
      this.paused = false;
    }
  
    // createCoconutTree(level) {
    //   if (level >= 2 && level <= 4) {
    //     return this.scene.add.image(400, 300, 'coconutTree');
    //   }
    //   return null;
    // }
  
    update() {
      this.gameClock += 1;
  
      // Update objects based on the level
      if (this.level === 1) {
        this.objects.cliffLeft?.setVisible(true);
        this.objects.cliffRight?.setVisible(true);
      }
  
      // if (this.level === 2) {
      //   this.objects.ropeReversed?.setVisible(true);
      //   this.objects.headOnSpike?.setVisible(true);
      //   this.objects.coconutTree?.setVisible(true);
      // }
  
      // if (this.level === 3) {
      //   this.objects.bigCliff?.setVisible(true);
      //   this.objects.rope?.setVisible(true);
      //   this.objects.coconutTree?.setVisible(true);
      // }
  
      // if (this.level === 4) {
      //   this.objects.coconutTree?.setVisible(true);
      //   this.objects.rock?.setVisible(true);
      //   this.objects.bigRock?.setVisible(true);
      // }


      //Condtions to check if we are abnle to lpoad the level
  
      if (this.monkeyLife) {
        this.monkeyLife.update();
      } else {
        console.log('Error in updating monkey life in level class');
      }
      
      if (this.fuel) {
        this.fuel.update();
      } else {
        console.log('Error in updating fuel in level class');
      }
      
      if (this.score) {
        this.score.update();
      } else {
        console.log('Error in updating score in level class');
      }
      
      this.banana.update();


      
  
      if (this.gameClock % 10 === 0) {
        this.banana.hang(); // Handle banana animation or updates
      }
  
      // Check banana collection
      if (this.banana.bananaLeftToCollect === 0) {
        this.landingSpace.update();
        if (this.landingSpace.checkCollision(this.scene.monkey.sprite)) {
          this.scene.events.emit('playerLanded'); // Emit an event for a successful landing
        }
      }
  
      // Handle pause
      if (this.paused) {
        this.scene.pause.update();
      }
    }
  }
  