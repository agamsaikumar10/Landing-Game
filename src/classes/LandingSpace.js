
export default class LandingSpace {
    constructor(scene, x, y) {
      this.scene = scene;
      this.sprite = null;
      this.x = x; //Added this x position
      this.y = y; //Added this y position
      this.visible = false;
      this.landed = false;
    }
  
    preload() {
      this.scene.load.image('landingSpace', 'assets/images/landing-space.png');
    }
  
    create() {
      // 400, 500
      this.sprite = this.scene.physics.add.staticSprite(this.x, this.y, 'landingSpace')
        .setScale(1)
        .setVisible(false); // Hide initially
    }
  
    show() {
        console.log('LandingSpace.show() called. Making sprite visible.');
        this.sprite.setVisible(true);
        this.visible = true; 
        // if (this.sprite) {
          
        // }
    }
    land() {
        this.landed = true;
    }
}
  
  