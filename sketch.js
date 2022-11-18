var playerImg, playerImg2
var backgroundImg;
var gameOverImg;
var rocketImg;
var meteor1Img, meteor2Img;
var gameOverImg;
var victoryImg;

var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
 
    playerImg = loadImage("space_boy.png");
    playerImg2 = loadImage("space_boy2.png");
    rocketImg = loadImage("rocket.png");
    meteor1Img = loadImage("meteor1.png");
    meteor2Img = loadImage("meteor2.png");
    gameOverImg = loadImage("gameOver.png");
    victoryImg = loadImage("victory.png");
    backgroundImg = loadImage("background.webp");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(width / 11, height - 90, 20, 20);
    player.addImage("left", playerImg);
    player.addImage("right", playerImg2);
    player.scale = 0.5;
    player.depth = 5;

    rocket = createSprite(width / 1.1, height - 550, 50, 50);
    rocket.addImage(rocketImg);
    rocket.scale = 1.5
    rocket.depth = 1

    gameOver = createSprite(width / 2, height - 400, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 1;

    victory = createSprite(width / 2, height - 400, 50, 50);
    victory.addImage(victoryImg);
    victory.visible = false;
    victory.scale = 1;

    meteor1G = new Group();
    meteor2G = new Group();

}

function draw() {
    
    background(backgroundImg);


    if (gameState === PLAY){


        if(keyIsDown(UP_ARROW)){
            player.position.y -= 5;
        }

        if(keyIsDown(DOWN_ARROW)){
            player.position.y += 5;
        }
        
        if(keyIsDown(RIGHT_ARROW)){
            player.position.x += 5
            player.changeImage("right");
        }
        
        if(keyIsDown(LEFT_ARROW)){
            player.position.x -= 5;
            player.changeImage("left");
        }

        if(player.collide(rocket)){
            player.destroy();
            rocket.velocityX = 5;
            rocket.velocityY = -5;
            victory.visible = true
        }

        player.setCollider("rectangle", 0, 0, 50, 50);
        //player.debug = true
        rocket.setCollider("rectangle", 0, 0, 50, 50);
        //rocket.debug = true
        meteor1G.setColliderEach("rectangle", 0, 0, 250, 250);
        meteor2G.setColliderEach("rectangle", 0, 0, 100, 100);

        spawnMeteors1();
        spawnMeteors2();

        if(player.collide(meteor1G) || player.collide(meteor2G)){
            gameOver.visible = true;
            meteor1G.setVelocityYEach(0);
            meteor2G.setVelocityYEach(0);
            meteor1G.setLifetimeEach(-1);
            meteor2G.setLifetimeEach(-1);
            player.velocity = 0
        }
        
        

        

    } 
    
    

    drawSprites();
}

function spawnMeteors1(){
    if(World.frameCount % 7 == 0){
        meteor1 = createSprite(Math.round(random(50, width-50), 40, 10, 10))
        meteor1.addImage(meteor1Img);
        meteor1.scale = 0.2;
        meteor1.velocityY = 5;
        meteor1.lifetime = 400;
        meteor1G.add(meteor1);
        meteor1G.depth = 2;
        //meteor1.debug = true;
     
    }
}

function spawnMeteors2(){
    if(World.frameCount % 10 == 0){
        meteor2 = createSprite(Math.round(random(50, width-50), 40, 10, 10))
        meteor2.addImage(meteor2Img);
        meteor2.scale = 0.6;
        meteor2.velocityY = 5;
        meteor2.lifetime = 400;
        meteor2G.add(meteor2);
        meteor2G.depth = 2;
        //meteor2.debug = true;
     
    }
}


