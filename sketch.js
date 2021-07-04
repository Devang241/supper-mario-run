var GAMESTATE = 1;
var PLAY = 1;
var END = 0 ;

var boy, boy_running, boy_collide; 
var ground,backgroundImg, backgroung, flyGround;
var enemy1,enemy2,enemy3,enemy4,enemy5,enemy6;
var gameOver, restart, gameOverImg, restartImg;
var coinImg;
var coinn = 0;

var sprite, sprite2;

function preload(){
  boy_running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png","boy9.png","boy10.png","boy11.png","boy12.png");
  boy_collide = loadAnimation("boy1.png");

  backgroundImg = loadImage("background1.png");

  enemy1 = loadAnimation("flower0.png","flower1.png","flower2.png","flower3.png");
  enemy2 = loadImage("enemy2.png");
  enemy3 = loadImage("enemy3.png");
  enemy4 = loadAnimation("enemy01.png","enemy02.png","enemy03.png","enemy04.png","enemy05.png","enemy06.png","enemy07.png","enemy08.png","enemy09.png","enemy10.png","enemy11.png","enemy12.png","enemy13.png","enemy14.png");
  enemy5 = loadImage("enemy5.png");
  enemy6 = loadAnimation("bomb00.png","bomb01.png","bomb02.png","bomb03.png","bomb04.png","bomb05.png","bomb06.png","bomb07.png","bomb08.png","bomb09.png","bomb10.png","bomb11.png",);
  
  gameOverImg = loadImage("GameOver.jpg");
  restartImg = loadImage("restart.jpg");

  coinImg = loadImage("coin.png");
  coinSound = loadSound("coinSn.mp3");
  ggameOver = loadSound("Game Over Super.mp3");
  jump = loadSound("jump.mp3");

  var score = 0;

}


function setup() {
  canvas = createCanvas(1500,650);

  backgroung = createSprite(750, 970);
  backgroung.addImage("groung",backgroundImg)
  backgroung.scale=1.2;

  sprite = createSprite(750,10,2000,50)
  
  sprite2 = createSprite(200,350,1000,20)
  sprite2.visible=false;
  
  boy = createSprite(200,300,20,50);
  boy.addAnimation("running",boy_running);
  boy.addAnimation("collided",boy_collide)
  boy.scale = 1;


  ground = createSprite(600,540,2000,10)
  ground.visible=false
 

  gameOver = createSprite(300,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5;
  gameOver.visible = false;

  restart = createSprite(1000,250);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  enemyGroup = new Group();
  FlyEnemyGroup = new Group();
  coinGroup = new Group();

  score = 0;

  
}

function draw() {

  background(0); 
 
  if(GAMESTATE===PLAY){

    score = score + Math.round(getFrameRate()/60);
    backgroung.velocityX = -(6 + 3*score/150);

    boy.changeAnimation("running",boy_running);

  if(keyDown("space") && boy.y >= 487) {
    boy.velocityY = -20;
    jump.play();
  }

  boy.velocityY = boy.velocityY +1

  if (backgroung.x < 0){
    backgroung.x = backgroung.width/4;
  }

  if(boy.isTouching(coinGroup)){
    coinGroup.destroyEach();
    coinn = coinn+1;
    coinSound.play();
  }

  boy.collide(ground);
  enemyGroup.collide(ground)
    
  spawnEnemy();
  spawnFlyEnemy();
  spawnCoin();

  if(enemyGroup.isTouching(boy)||FlyEnemyGroup.isTouching(boy)){
    GAMESTATE=END;
    ggameOver.play();
  }
  
  }

  else if(GAMESTATE===END){
   
    gameOver.visible=true;
    restart.visible=true;

    
    backgroung.velocityX = 0;
    boy.velocityY = 0;
    enemyGroup.setVelocityXEach(0);
    FlyEnemyGroup.setVelocityYEach(0);

    boy.changeAnimation("collided", boy_collide);
    
  }
   
  FlyEnemyGroup.bounceOff(sprite2);

  if(GAMESTATE===END){

    if(keyDown("r")){
      reset();
    }

  }


  drawSprites();

  textSize(20)
  fill("red");
  text("Score: "+ score, 700,100);

  text("coin: "+ coinn,700,150);

}

function spawnEnemy(){
  if(frameCount % 80===0){
    var enemy = createSprite(1800,400);
    enemy.velocityX=-8
    enemy.velocityY=1;


    var rand = Math.round(random(1,4))
    switch(rand){
      case 1: enemy.addAnimation("enemy1",enemy1);
              break;
      case 2: enemy.addAnimation("enemy4",enemy4);
              enemy.scale=0.5
              break;
      case 3: enemy.addImage(enemy5);
              break;
      case 4: enemy.addAnimation("enemy6",enemy6);
              enemy.scale=0.3
              break;
      default: break;        
    }
    enemyGroup.add(enemy);

  }
}


function spawnFlyEnemy(){
  if(frameCount % 260===0){
    var FlyEnemy = createSprite(1700,100);
    FlyEnemy.velocityX=(random(-8,-10))
    FlyEnemy.velocityY=(random(1,2));

    var rando = Math.round(random(1,2))
    switch(rando){
      case 1: FlyEnemy.addImage(enemy2);
              break;
      case 2: FlyEnemy.addImage(enemy3);
              break;
      default:break;        

    }
    FlyEnemyGroup.add(FlyEnemy)
  }
}

function spawnCoin(){
  if(frameCount% 120===0){
    var coin = createSprite(1800,425,50,50);
    coin.velocityX=-6;
    coin.y = Math.round(random(350,500));
    coin.addImage("coin",coinImg);
    coin.scale=0.5;
    coinGroup.add(coin);
  }
}

function reset(){
  GAMESTATE=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  score=0;
  enemyGroup.destroyEach();
  FlyEnemyGroup.destroyEach();
}




