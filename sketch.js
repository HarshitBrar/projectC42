var monkey , monkey_running;
var bananaImage,obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,backGround,backGroundImg;
var gameState = PLAY;
var PLAY = 0;
var END = 1;
function preload(){
  monkey_running = loadAnimation("Monkey_01.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png,Monkey_02.png,Monkey_03.png,Monkey_04.png,Monkey_05.png,Monkey_06.png,Monkey_07.png,Monkey_08.png,Monkey_09.png,Monkey_10.png");
  backGroundImg = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("jumping",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,385,1500,10);
  ground.velocityX = -4;
  ground.x = ground.x/2;

  backGround = createSprite(300,300,600,600);
  backGround.addImage(backGroundImg);
  backGround.velocityX = -4;
  backGround.x = backGround.x/2;
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
}
function draw() {
  background("white");
  
  if(gameState === PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(backGround.x < 0){
      backGround.x = backGround.width/2;
    }
  if(keyDown("space")){
      monkey.velocityY = monkey.velocityY + 0.9;
    }

  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -15;
  }

  spawnObstacles();
  spawnFood();

  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyeach();
    score = score + 2;
    monkey.scale += + 0.1
  }

  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  }
  else if(gameState === END){
    backGround.velocityX = 0;
    monkey.visible=false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30)
    fill(255)
    text("!GAME OVER",300,220)
  }
  
  stroke ("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  monkey.collide(ground);
  
  drawSprites();
}
function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(400,365,30,30);
    obstacle.velocityX = -4;
    obstacle.addImage("stone",obstacleImage);
    obstacle.lifetime = 150;
    obstacle.scale = 0.1;
    
    obstaclesGroup.add(obstacle);
  }
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage("yellow",bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}




