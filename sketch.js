//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,bg,bgImg,sound1,sound2;


function preload(){
  
  swordImage = loadImage("—Pngtree—ninja with sword hand drawn_5442458.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("—Pngtree—cartoon cute dessert butter cookie_5528107.png");
  fruit2 = loadImage("—Pngtree—delicious dessert dessert baking_3844705 (1).png");
  fruit3 = loadImage("FAVPNG_praline-chocolate-frozen-dessert-fruit_rnJp83uV.png");
  fruit4 = loadImage("—Pngtree—banana ice cream cartoon snack_4759031.png");
  gameOverImage = loadImage("Game-over-2.png");
  bgImg = loadImage("lovely.jpg");
  sound1= loadSound("Drop Sword-SoundBible.com-768774345.mp3");
  sound2= loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  bg= createSprite(200,280);
  bg.addImage(bgImg);

  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.15;
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  //score=color("black");
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("pink");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      sound1.play();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        sound2.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        
        sword.x=300;
        sword.y=300;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  textSize(20);
  textFont("Cambria")
  fill("black");
  text("Score : "+ score,275,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position= Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
    if (position==1)
      {
       fruit.x=400;
       fruit.velocityX=-(7+(score/4));
      }
        else
      {
      if(position==2){
      fruit.x=0;
      fruit.velocityX= (7+(score/4));
      }
    }
    
    
    fruit.scale=0.05;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
      fruit1.scale=0.2;
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}