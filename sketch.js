  //Creating Trex
  var trex;

  //Creating Trex image holder
  var trex_collider,trex_run,trex_duck;

  //Creating two types of ground
  var grnd,invisible_grnd;

  //Creating ground Image
  var grndI;

  //Creating cloud Image holder
  var cloudImg,obs1,obs2,obs3,obs4,obs5,obs6;


  //Creating Taro Image holder
  var taroImg;
  var t1,t2;
  var bird;
  //Creating groups
  var cactusGrp;
  var cloudGrp;
  var taroGrp;

  //Creating Score
  var score;

var GO,GOI;
var resetBt,resetBtI;

var gameState;

  //Loading Animations and Images
  function preload(){

    //Loading Animations and Image of Trex
  trex_run=loadAnimation("trex0.png","trex1.png","trex2.png");
  trex_collide = loadAnimation("trex_collided.png");
  trex_duck = loadAnimation("trex-duck.png");  
    
  //Loading ground Image
  grndI = loadImage("grnd.png");
  
  //Loading Cloud Image
  cloudImg = loadImage("Cloud.png");
    
  //Loading cactus Image
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstical5.png");
  obs6 = loadImage("obstical6.png");
    
  taroImg  = loadAnimation("taro0.png","taro1.png") ;
  t1 = loadAnimation("taro0.png");
  t2 = loadAnimation("taro1.png");
    
  GOI = loadImage("gameover.png");
  resetBtI = loadImage("resetBt.png");
  }

  //Creating Sprites
  function setup() {
    createCanvas(665, 200);

    grnd = createSprite(200,190);
    grnd.addAnimation("grndI",grndI);
    grnd.velocityX = -4;

    invisible_grnd = createSprite(200,200,400,10);
    invisible_grnd.visible = false;

     grnd.x = grnd.width/2;

    trex = createSprite(30,160);
    trex.addAnimation("trex_run",trex_run);
    trex.addAnimation("trex_duck",trex_duck);
    trex.addAnimation("trex_collide",trex_collide);
    trex.scale = 0.50;

    cloudGrp = new Group();
    cactusGrp = new Group();
    taroGrp = new Group();

    score = 0;
    
  bird = createSprite(665,random (150,100));
  bird.addAnimation("taroImg",taroImg);
  bird.addAnimation("t1",t1);
  bird.addAnimation("t2",t2);
  bird.visible = false;
    
    GO = createSprite(334,50);
    GO.addImage("GOI",GOI);
    GO.scale = 0.50;
    GO.visible = false;
    
    resetBt = createSprite(334,150);
    resetBt.addImage("resetBtI",resetBtI);
    resetBt.scale = 0.50;
    resetBt.visible = false;
    
    gameState = "play";
  }

  //Functions
  function draw() {
    background(0);

    

    if(grnd.x<0){

    grnd.x = grnd.width/2;
    }

    if(gameState=="play"){
      
      score = score+Math.round(getFrameRate()/60);
      
    jump();
    gravity();
    duck();
    spawnClouds();
    spawnObstacles();
    spawnTaro();
      
      if((trex.isTouching(cactusGrp)||trex.isTouching(taroGrp))&&gameState=="play"){
      gameState = "over";
      bird.changeAnimation("t1",t1);
      }
    }
    else if(gameState=="over"){
    
      trex.velocityX = 0;
      trex.velocityY = 0;
      
      grnd.velocityX = 0;
      
      trex.changeAnimation("trex_collide",trex_collide);
      
      cactusGrp.setVelocityXEach(0);
      taroGrp.setVelocityXEach(0);
      cloudGrp.setVelocityXEach(0);
      
      cactusGrp.setLifetimeEach(-1);
      taroGrp.setLifetimeEach(-1);
      cloudGrp.setLifetimeEach(-1);
      GO.visible = true;
      resetBt.visible = true;
    
      
    }
    
    

    trex.collide(invisible_grnd);

    reset();
    
    drawSprites();

    text("Score: "+score,10,20);
  }

  //Creating Gravity
  function gravity(){

    var grav = 0.50;
    trex.velocityY=  trex.velocityY+grav;
  }

  //Jumping when pressing SPACE
  function jump(){

    if(keyDown("space")&&trex.isTouching(grnd)){
       trex.velocityY = -7;
       }
  }

  //Duck when pressing D
  function duck(){

    if(keyWentDown("d")){
       trex.changeAnimation("trex_duck",trex_duck);
      trex.scale = 1;
       }
  if(keyWentUp("d")){
     trex.changeAnimation("trex_run",trex_run);
    trex.scale = 0.50;
     }
  }

  function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(665,25,40,10);
      cloud.y = Math.round(random(25,120));
      cloud.addImage("Cloud.png",cloudImg);
      cloud.scale = 0.5;
      cloud.velocityX = -3;

       //assign lifetime to the variable
      cloud.lifetime = 230;

      //adjust the depth
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;

      cloudGrp.add(cloud)
    }

  }


  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(665,175,10,40);
      obstacle.velocityX = -4;

      //generate random obstacles
      var rand = Math.round(random(1,6));

      switch(rand){
        case 1:obstacle.addImage("obstical1.png",obs1);
          obstacle.scale = 1;
          break;
          case 2:obstacle.addImage("obstacle2.png",obs2);
          break;
          case 3:obstacle.addImage("obstacle3.png",obs3);
          break;
          case 4:obstacle.addImage("obstacle4.png",obs4);
          break;
          case 5:obstacle.addImage("obstical5.png",obs5);
          break;
          case 6:obstacle.addImage("obstical6.png",obs6);
          break;
          default:break;
      }
      
      obstacle.scale = 0.5;
      obstacle.lifetime = 170;

      cactusGrp.add(obstacle);
    }
  }

function spawnTaro(){

  if(World.frameCount%100==0){

  bird.velocityX = -5;
  bird.scale = 0.80;
  bird.lifeTime = 130;
  bird.visible = true;  
    taroGrp.add(bird);
  }

}

function reset(){
if(mousePressedOver(resetBt)&&resetBt.visible==true){
    gameState= "play";
  
  cactusGrp.destroyEach();
  cloudGrp.destroyEach();
  taroGrp.destroyEach();
  
  trex.changeAnimation("trex_run",trex_run);
  
  GO.visible = false;
  resetBt.visible = false;
  
  grnd.velocityX = -4;
 
  score = 0;
    }
}