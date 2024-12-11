
export default class Fuel {
  constructor(scene, x, y, width, height, levels) {
    this.scene = scene; // Reference to the Phaser scene
    this.x = x;         // Position of the fuel bar
    this.y = y;
    this.width = width; // Total width of the fuel bar
    this.height = height;
    this.fuelHealth = width; // Initial fuel level is the full width of the bar
    this.levels = levels; // Store the levels array

    // Create the background bar
    this.fuelBarBg = scene.add.rectangle(x, y, width, height, 0x000000)
      .setOrigin(1, 0) // Set origin to the right side
      .setX(scene.cameras.main.width - 10); // Align to the right of the screen

    // Create the green fuel bar
    this.fuelBar = scene.add.rectangle(x, y, this.fuelHealth, height, 0x66cc00)
      .setOrigin(1, 0) // Set origin to the right side
      .setX(scene.cameras.main.width - 10); // Align to the right of the screen

    // Add the fuel text
    this.fuelText = scene.add.text(x + width / 2, y + height / 2, 'COCONUT FUEL', {
      fontSize: '14px',
      fontFamily: 'Nunito-Bold',
      color: '#ffffff',
    })
      .setOrigin(1, 0.5) // Align the text to the right
      .setX(scene.cameras.main.width - width / 2 - 10); // Center the text above the bar
  }

  update() {
    // Update the width of the fuel bar to reflect current fuelHealth
    this.fuelBar.width = this.fuelHealth; //Dynamically adjust the fuel bar width

    // Check if fuel is empty
    if (this.fuelHealth <= 0) {
      this.scene.monkey.verticalSpeedFactor = 0;
      this.scene.monkey.horizontalSpeedFactor = 0;
      console.log(`Length of levels from Fuel.js is  :${this.levels.length}`);
      if (this.scene.levelIndex + 1 < this.levels.length) {
        console.log('Fuel is empty! Transitioning to next level...');
        this.scene.time.delayedCall(2000, () => {
          this.scene.levelIndex++;
          this.scene.scene.start('GamePauseScene', { levelIndex: this.scene.levelIndex, currentScore : this.scene.currentScore, totalLevels: this.levels.length });
        });
      }
      // Trigger GameOverScene if not already triggered
      else if (!this.scene.scene.isPaused()) {
        console.log('Fuel is empty! Transitioning to GameOverScene...');
        this.scene.handleGameOver();
      }
    }
  }

  decreaseFuel(options = { amount: 1 }) {
    const { amount } = options; // Destructure the options object
    // Decrease fuel only if it's above 0
    if (this.fuelHealth > 0) {
      this.fuelHealth -= amount;
      if (this.fuelHealth < 0) {
        this.fuelHealth = 0; // Ensure fuel doesn't go below 0
      }
    }
  }
}



  