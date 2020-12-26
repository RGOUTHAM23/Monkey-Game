var ground;
var monkey , monkey_running;
var  bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var monkey_collided;
var play;
var end;
var gameState = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided= loadAnimation("sprite_5.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey=createSprite(100,500,5,7);
  monkey.addAnimation("bandar",monkey_running);
  monkey.addAnimation("ruk ja bandar",monkey_collided);
  
  monkey.scale=0.2;
  
  ground=createSprite(400,500,900,10);
  //ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
   //score
  stroke("black");
  fill("black");
  text("Score : "+score,500,50);

  if(gameState === "play"){
 
  ground.velocityX = -5;
  
  if(keyDown("space") && monkey.y >= 430){
    monkey.velocityY = -20;
  }
     monkey.velocityY = monkey.velocityY + 0.8;
  
    
  if(FoodGroup.isTouching(monkey)){
    score= score+2;
    FoodGroup.destroyEach();
  }
  
 
  if(ground.x < 300){
    ground.x = ground.width/2;
     
  }
  
    food();
    Rock();
     
    if(obstacleGroup.isTouching(monkey)){
      gameState = "end";
      monkey.y=500;
      
    }
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
}
 
  else if(gameState === "end"){
    
    ground.velocityX= 0;
    monkey.velocityY =0;
    monkey.changeAnimation("ruk ja bandar",monkey_collided);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
  }
  monkey.collide(ground);
  
  
  drawSprites();
}

function food(){
  if(frameCount % 100 === 0){
    var banana=createSprite(600,0,5,7);
    banana.addImage("kela",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.y = Math.round(random(120,350));
    banana.lifetime = 300; 
    FoodGroup.add(banana);
  }
}

function Rock(){
  if(frameCount % 300 === 0){
     obstacle=createSprite(600,439,3,7);
     obstacle.addImage("pathar",obstaceImage);
     obstacle.scale=0.3;
     obstacle.velocityX=-5;
     obstacle.lifetime= 300;
     obstacleGroup.add(obstacle);
  }
}




