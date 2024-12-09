export default class Pause {
    constructor(scene) {
      this.scene = scene; // Reference to the Phaser scene
      this.text = null; // Text object for "PAUSED"
    }
  
    create() {
      // Create "PAUSED" text in the center of the screen
      this.text = this.scene.add.text(400, 300, "PAUSED", {
        font: "30px Nunito-ExtraBold",
        fill: "#ff6600",
        stroke: "#ffffff",
        strokeThickness: 5,
      });
      this.text.setOrigin(0.5); // Center the text
      this.text.setVisible(false); // Initially, the pause text is hidden
    }
  
    show() {
      this.text.setVisible(true); // Show the pause text
      this.scene.physics.pause(); // Pause the game physics
    }
  
    hide() {
      this.text.setVisible(false); // Hide the pause text
      this.scene.physics.resume(); // Resume the game physics
    }
  
    toggle() {
      // Toggle pause state
      if (this.scene.physics.world.isPaused) {
        this.hide();
      } else {
        this.show();
      }
    }
  }
  