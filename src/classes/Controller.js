export default class Controller {
  constructor(scene) {
    this.scene = scene; // Reference to the Phaser scene
    this.keys = null; // For keyboard controls
  }

  create() {
    // Define keys for movement
    this.keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP, // Hover up
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT, // Hover right
      left: Phaser.Input.Keyboard.KeyCodes.LEFT, // Hover left
    });
  }

  update() {
    if(this.scene.isAnimating || this.disableInput){return;}
    const { up, right, left } = this.keys;

    // Access the monkey sprite from the scene
    const monkey = this.scene.monkey?.monkeySprite;
    if (!monkey) return; // Exit if monkey is not initialized


    if (up.isDown || right.isDown || left.isDown) {
      // Decrease fuel when movement keys are pressed
      this.scene.fuel.decreaseFuel({amount:1});
    }

    // Hover up
    if (up.isDown) {
      monkey.setVelocityY(-200); // Simulate upward thrust
    }

    // Hover right
    if (right.isDown) {
      monkey.setVelocityX(200); // Move right
    } 
    // Hover left
    else if (left.isDown) {
      monkey.setVelocityX(-200); // Move left
    } 
    // Stop horizontal movement when no left/right key is pressed
    else {
      monkey.setVelocityX(0);
    }
  }
}