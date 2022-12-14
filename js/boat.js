class Boat {
    constructor(x, y, width, height, boatPos,boatAnimation
      ) {
      this.speed = 0.05;
      this.animation=boatAnimation;
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
      this.image = loadImage("assets/boat.png");
      this.boatPosition = boatPos;
      this.isBroken = false;
      World.add(world, this.body);
    }

remove(index) {
  this.animation = qboatAnimation;
  this.speed = 0.05;
  this.width = 300;
  this.height = 300;
  this.isBroken = true;
  setTimeout(() => {
    Matter.World.remove(world, boats[index].body);
    delete boats[index];
  }, 2000);
  }

animate(){
  this.speed+=0.05;
}
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      //essa variavel é usada para percorrer um conjunto de animaçoes
      var index=floor(this.speed % this.animation.length);
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, this.boatPosition, this.width, this.height);
      pop();
    }
  }