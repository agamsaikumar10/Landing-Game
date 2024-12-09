export default class Monkey {
  constructor(scene, monkeyLife) {
    this.scene = scene;
    this.monkeySprite = null;
    this.monkeyLife = monkeyLife;
    this.hasHitWorldBounds = false;
  }

  create() {
    console.log('Scene reference:', this.scene);
    this.monkeySprite = this.scene.physics.add.sprite(100, 100, 'monkey', 0)
        .setGravityY(200)            // Apply gravity
        .setCollideWorldBounds(true) // Prevent the sprite from leaving the game bounds
        .setScale(0.85);                // Optional: Adjust the scale

    // Enable world bounds collision detection
    this.monkeySprite.body.onWorldBounds = true;

    this.scene.physics.world.on('worldbounds', (body) => {
      if (body.gameObject === this.monkeySprite) {
        if(!this.hasHitWorldBounds){
          console.log('Monkey touched the world bounds! Losing a life.');
          this.monkeyLife.decreaseLife(); // Decrease a life
          if (this.monkeyLife.monkeyLeft <= 0) {
              this.scene.scene.pause();
              this.scene.add.text(400, 300, 'Game Over!', {
                  font: '40px Arial',
                  fill: '#ffffff',
              }).setOrigin(0.5);
              this.scene.time.delayedCall(2000, () => {
                  this.scene.scene.start('GameOverScene');
              });
          } else {
              this.scene.resetMonkey(); // Reset monkey for another attempt
          }
          this.scene.time.delayedCall(0, () =>{
            this.hasHitWorldBounds = false;
          });
        }
      }
    });
    console.log('Monkey Physics Body:', this.monkeySprite.body);
    console.log('Sprite created with physics:', this.monkeySprite);
  }

  update() {
    if (!this.canPlay) {
      return; // Prevent movement if input is disabled
    }

    const keys = this.scene.input.keyboard.createCursorKeys();

    if (keys.up.isDown) {
      this.monkeySprite.setVelocityY(-200);
    }
    if (keys.right.isDown) {
      this.monkeySprite.setVelocityX(200);
    } else if (keys.left.isDown) {
      this.monkeySprite.setVelocityX(-200);
    } else {
      this.monkeySprite.setVelocityX(0);
    }
    // this.monkeySprite.setVelocityX(200);
  }

  stopMovement() {
    this.monkeySprite.setVelocity(0, 0);
    this.monkeySprite.body.setGravityY(0);
    return;
  }

}

