export default class Score {
    constructor(scene, x, y) {
        this.scene = scene; // Reference to the Phaser scene
        this.x = x;         // X position for the score display
        this.y = y;         // Y position for the score display
        this.score = 0;     // Initial score
    
        // // Create a graphics object for the score box
        // this.scoreBox = this.scene.add.graphics();
        // this.drawScoreBox();

        //Adjust the positions for alignment inside the score box
        this.boxWidth = 120;  //Width of the score box
        this.boxHeight = 40;   //Height of the score box

        // Create a graphics object for the score box
        this.scoreBox = this.scene.add.graphics();
        this.drawScoreBox();

        const centerX = this.x + this.boxWidth / 2;  //Center of box
        const scoreTextY = this.y + 1;   //Vertical center for "POINTS"
        const textY = this.y + 30  //Adjusted score gap for score value
  
        // Create text for "POINTS"
        this.pointsText = this.scene.add.text(centerX , scoreTextY + 10, 'SCORE', {
            fontSize: '12px',
            fontFamily: 'Nunito',
            color: '#ff6600',
        }).setOrigin(0.5);
  
        // Create text for the score
        this.scoreText = this.scene.add.text(centerX, textY, `${this.score}`, {
            fontSize: '20px',
            fontFamily: 'Nunito-ExtraBold',
            color: '#ff6600',
        }).setOrigin(0.5);
    }
  
    // Method to draw the score box
    drawScoreBox() {
        this.scoreBox.clear();
        this.scoreBox.fillStyle(0xffffff); // White fill
        this.scoreBox.lineStyle(2.5, 0x000000); // Black stroke

        const radius = 20;

        this.scoreBox.beginPath();

        // Top-left corner
        this.scoreBox.moveTo(this.x + radius, this.y);
        // Top edge
        this.scoreBox.lineTo(this.x + this.boxWidth - radius, this.y);
        // Top-right corner
        this.scoreBox.arc(this.x + this.boxWidth - radius, this.y + radius, radius, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(360), false);
        // Right edge
        this.scoreBox.lineTo(this.x + this.boxWidth, this.y + this.boxHeight - radius);
        // Bottom-right corner
        this.scoreBox.arc(this.x + this.boxWidth - radius, this.y + this.boxHeight - radius, radius, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(90), false);
        // Bottom edge
        this.scoreBox.lineTo(this.x + radius, this.y + this.boxHeight);
        // Bottom-left corner
        this.scoreBox.arc(this.x + radius, this.y + this.boxHeight - radius, radius, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(180), false);
        // Left edge
        this.scoreBox.lineTo(this.x, this.y + radius);
        // Top-left corner
        this.scoreBox.arc(this.x + radius, this.y + radius, radius, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(270), false);
        this.scoreBox.closePath();

        this.scoreBox.fillPath();
        this.scoreBox.strokePath();
    }
  
    // Method to update the score display
    update(newScore) {
      this.score = newScore;
      this.scoreText.setText(`${this.score}`);
    }
  }