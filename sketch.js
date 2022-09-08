const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg,cannonball;

var canvas, angle, torre, ground, cannon;
var ball;
var balls=[];
var boat;
var boats = [];
var score=0;

var qboatAnimation=[];
var quebrandoboatSpritdata,quebrandoboatSpritesheet;


var boatAnimation=[];
var boatSpritdata,boatSpritesheet;
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  torreImage = loadImage("./assets/tower.png");

  boatSpritdata=loadJSON("json/navegando.json");
  boatSpritesheet=loadImage("json/boat.png");

  quebrandoboatSpritdata=loadJSON("json/quebrando.json");
  quebrandoboatSpritesheet=loadImage("json/quebrando.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  torre = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, torre);

  cannon=new Cannon(180,110,130,100,angle);
  //cannonball = new CannonBall(cannon.x, cannon.y);

  //boat =new Boat(width-79,height-60,170,170,-80);

  var boatFrame=boatSpritdata.frames;

  for(var i=0; i<boatFrame.length; i++){
    var pos = boatFrame[i].position;
    var img=boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }



  //para o navio quebrando

  var quebboatFrame=quebrandoboatSpritdata.frames;

  for(var i=0; i<quebboatFrame.length; i++){
    var pos = quebboatFrame[i].position;
    var img=quebrandoboatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    qboatAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  //translate(torre.position.x, torre.position.y);
  //rotate(torre.angle);
  imageMode(CENTER);
  image(torreImage,torre.position.x, torre.position.y, 160, 310);
  pop();  

  showBoats();

 // showBalls();
  for(var i=0; i<balls.length; i++){
    showBalls(balls[i],i);
    collisionWithBoat(i);
  }
  
  cannon.display();
  

}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonball =new CannonBall(cannon.x,cannon.y);
    cannonball.trajectory = [];
    Matter.Body.setAngle(cannonball.body, cannon.angle);
    balls.push(cannonball);
  }
}


function showBalls(ball,index){
  if(ball){
    ball.display();

    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(index);
    }
  }
}



function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
         170,
        170,
        position,
        boatAnimation
        );

        boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0,
          boatAnimation
        });

        boats[i].display();
        boats[i].animate();
      } 
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60,boatAnimation);
    boats.push(boat);
  }
}

function collisionWithBoat(index){
  for(var i=0; i<boats.length; i++){
    //verifica se tem alguma coisa nesse array
    if(balls[index]!== undefined && boats[i]!== undefined){
      var collision =Matter.SAT.collides(balls[index].body,boats[i].body);

      if(collision.collided){
        boats[i].remove(i);

        Matter.World.remove(world,balls[index].body);
        delete balls[index]
      }
    }
  }
}
