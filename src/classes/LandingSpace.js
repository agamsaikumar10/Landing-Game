
export default class LandingSpace {
    constructor(scene) {
      this.scene = scene;
      this.sprite = null;
      this.visible = false;
      this.landed = false;
    }
  
    preload() {
      this.scene.load.image('landingSpace', 'assets/images/landing-space.png');
    }
  
    create() {
      this.sprite = this.scene.physics.add.staticSprite(400, 500, 'landingSpace')
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
  
  