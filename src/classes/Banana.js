export default class Banana {
  constructor(scene) {
    this.scene = scene; // Reference to the Phaser scene
    this.bananaImage = 'banana'; // Phaser key for the banana image
    this.positions = [
      { x: 200, y: 200 },
      { x: 600, y: 300 },
      { x: 100, y: 250 },
    ]; // Only use the first 3 positions
    this.bananasGroup = null;
  }

  preload() {
    // Preload the banana image
    this.scene.load.image(this.bananaImage, 'assets/images/pineapple.png');
  }

  create() {
   
    this.bananasGroup = this.scene.physics.add.staticGroup();

    this.positions.forEach(pos => {
      this.bananasGroup.create(pos.x, pos.y, this.bananaImage);
    });
  }

  collectBanana(monkey, banana) {
    // Remove the banana from the scene
    banana.destroy();
    this.bananas = this.bananas.filter(b => b !== banana);

    // Update score
    this.scene.registry.values.score += this.bananaPoints;

    // Play sound effect
    this.scene.sound.play('eat');
  }

  update() {
    // Add update logic for bananas, if needed
    
  }
}
