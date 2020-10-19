const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

var pc, npc;
var ground, groundimg, invisGround;
var backgroundImg;
var obstacles, obstacles1, obstacles2, obstacles3;


var START = 0;
var PLAY = 1;
var END = 2;
var gameState = "START";

var startImg, restartImg;
var form;




var count = 0;

function preload(){
groundimg = loadImage('road.jpg')

startImg = loadImage('starting.png')

restartImg = loadImage('purple_button.png')

obstacles1 = loadImage('desk.png');

obstacles2 = loadImage('chair.png')

obstacles3 = loadImage('book.png')

}

function setup(){
    var canvas = createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world;

    var ground = createSprite(0, 600, 800, 20);
    ground.addImage(groundimg)
    ground.scale = 2
    ground.x = ground.width /2;

    var invisGround = createSprite(0, 700, 800,5);
    invisGround.visible = false;
    invisGround.static = true

    pc = createSprite(100, 720, 15, 15);
    pc.static = false;

    npc = createSprite(150, 720, 15, 15);

    ObstacleGroup = new Group();
    form = new Form();
}

function draw(){
    background('sunset.jpg');
    Engine.update(engine);

    text("Score: "+ count, 250, 100);
  console.log(gameState);

  if(gameState === "START") {
    pc.velocityX = 0;
    pc.velocityY = 0;
  }
  
  else if(gameState === "PLAY"){
    console.log(gameState);

    
    count = count + Math.round(World.frameRate/60);
    //move the ground
    ground.velocityx = -(6 + 3*count/100);

    npc.x = pc.x + 50;
    npx.y = pc.y;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && pc.y >= 359){
      pc.velocityY = -12 ;
      playSound("jump.mp3");
    }
  
    //add gravity
    pc.velocityY = pc.velocityY + 0.8;


    spawnObstacles();
    

    if(ObstacleGroup.isTouching(pc)){
      gameState = END;
    }
  }
  
  if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    

    ground.velocityX = 0;
    pc.velocityY = 0;
  }

  pc.collide(invisGround);
  
  drawSprites();

  form.display();
  obstacles.display();
}

function gameUpdate() {
  gameState = "PLAY";
}

function reset() {
  gameState = "START"
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacles = createSprite(400,365,10,40);
    obstacles.velocityX = - (6 + 3*count/100);
    
    var rand = Math.round(random(1,3))
    switch(rand) {
      case 1: obstacles.addImage(obstacles1)
        break;
      case 2: obstacles.addImage(obstacles2)
        break;
      case 3: obstacles.addImage(obstacles3)
        break;
        default: break;
    }
    
    obstacles.scale = 0.5;
    obstacles.lifetime = 70;

    ObstacleGroup.add(obstacles)
  }
}