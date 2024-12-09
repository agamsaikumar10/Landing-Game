export default class BigCliff {
    constructor(scene) {
      this.scene = scene; // Reference to the Phaser scene
      this.imageKey = 'big-cliff'; // Key for the image
      this.width = 147;
      this.height = 219;
      this.x = -2;
      this.y = 320;
  
      this.cliffPoints = [
        { x: this.x, y: this.y + 2 },
        { x: this.x + 27, y: this.y + 12 },
        { x: this.x + 80, y: this.y + 19 },
        { x: this.x + 115, y: this.y + 18 },
        { x: this.x + 140, y: this.y + 32 },
        { x: this.x + 147, y: this.y + 50 },
        { x: this.x + 135, y: this.y + 90 },
        { x: this.x + 116, y: this.y + 120 },
        { x: this.x + 103, y: this.y + 165 },
        { x: this.x + 106, y: this.y + 200 },
        { x: this.x + 99, y: this.y + 219 },
        { x: this.x, y: this.y + 219 },
      ];
    }
  
    preload() {
      // Preload the big cliff image
      this.scene.load.image(this.imageKey, 'assets/images/big-cliff.png');
    }
  
    // create() {
    //   // Add the big cliff image to the scene
    //     this.sprite = this.scene.add.image(this.x + this.width / 2, this.y + this.height / 2, this.imageKey);
    //     this.sprite.setDisplaySize(this.width, this.height); // Adjust size
    //     this.sprite.setOrigin(0.5, 0.5); // Center origin for collision alignment
    //     // Enable physics for the cliff (optional if collisions are basic)
    //     this.scene.physics.add.existing(this.sprite, true); // Static body
    // }

    create() {
        this.sprite = this.scene.physics.add.image(
          this.x + this.width / 2,
          this.y + this.height / 2,
          this.imageKey
        );
        this.sprite.setDisplaySize(this.width, this.height);
        this.sprite.body.setImmovable(true); // Ensure it's treated as a static object
      }
  
    update() {
      // Check collision with the monkey
      const monkey = this.scene.monkey.monkeySprite; // Assume monkey sprite is added to the scene
      const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
        monkey.getBounds(),
        this.sprite.getBounds()
      );
  
      if (overlap) {
        this.scene.events.emit('playerDead'); // Emit an event for game logic
      }
    }
  
    cliffPoly() {
      return this.cliffPoints; // Return the points defining the cliff
    }
  }
  