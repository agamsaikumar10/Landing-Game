
export default class MonkeyLife {
  constructor(scene, x, y) {
    this.scene = scene; // Reference to the Phaser scene
    this.x = x;         // X position for the life display
    this.y = y;         // Y position for the life display
    this.lives = 3;     // Initial lives

  
    // Adjust the positions for alignment inside the box
    this.boxWidth = 110; // Width of the life box
    this.boxHeight = 40; // Height of the life box

    // Create a graphics object for the lives box
    this.lifeBox = this.scene.add.graphics();
    console.log('Life box graphics created'); // Debugging
    this.drawLifeBox();

    const centerX = this.x + this.boxWidth / 2;  // Center of box
    const textY = this.y + 10;                  // Vertical center for "LIVES"
    const livesTextY = this.y + 30;             // Adjusted gap for lives value

    // Create text for "LIVES"
    this.livesText = this.scene.add.text(centerX, textY, 'LIVES LEFT', {
        fontSize: '12px',
        fontFamily: 'Nunito',
        color: '#ff6600',
    }).setOrigin(0.5);

    // Create text for the lives count
    this.livesCountText = this.scene.add.text(centerX, livesTextY, `${this.lives}`, {
        fontSize: '20px',
        fontFamily: 'Nunito-ExtraBold',
        color: '#ff6600',
    }).setOrigin(0.5);

    console.log('Life box created successfully'); // Debugging
  }

  drawLifeBox() {
    console.log('Drawing life box'); // Debugging
    this.lifeBox.clear();
    this.lifeBox.fillStyle(0xffffff); // White fill
    this.lifeBox.lineStyle(2.5, 0x000000); // Black stroke

    const radius = 20;

    this.lifeBox.beginPath();

    // Top-left corner
    this.lifeBox.moveTo(this.x + radius, this.y);
    // Top edge
    this.lifeBox.lineTo(this.x + this.boxWidth - radius, this.y);
    // Top-right corner
    this.lifeBox.arc(this.x + this.boxWidth - radius, this.y + radius, radius, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(360), false);
    // Right edge
    this.lifeBox.lineTo(this.x + this.boxWidth, this.y + this.boxHeight - radius);
    // Bottom-right corner
    this.lifeBox.arc(this.x + this.boxWidth - radius, this.y + this.boxHeight - radius, radius, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(90), false);
    // Bottom edge
    this.lifeBox.lineTo(this.x + radius, this.y + this.boxHeight);
    // Bottom-left corner
    this.lifeBox.arc(this.x + radius, this.y + this.boxHeight - radius, radius, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(180), false);
    // Left edge
    this.lifeBox.lineTo(this.x, this.y + radius);
    // Top-left corner
    this.lifeBox.arc(this.x + radius, this.y + radius, radius, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(270), false);
    this.lifeBox.closePath();

    this.lifeBox.fillPath();
    this.lifeBox.strokePath();

    console.log('Life box drawn'); // Debugging
}

  // Method to update the lives display
  updateLives(lives) {
    this.lives = lives;
    this.livesCountText.setText(`${this.lives}`);
  }

  // Method to decrease a life
  decreaseLife() {
    if (this.lives > 0) {
      this.lives -= 1;
      this.updateLives(this.lives);
      console.log(`the number of remaining lives is ${this.lives}`);
      if(this.lives === 0){
        console.log('the method called is from decreaseLife() of MonkeyLife.js');
      }
    }
  }
}

  