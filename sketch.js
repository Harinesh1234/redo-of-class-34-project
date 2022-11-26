
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine;
var world;
var bg_img;
var canvas
var ball,ball_img;
var basketballhoopside1,basketballhoopside2;
var man,man_img;
var ScoreChecker;
var score = 0
var bg_song
var gameState = "play"
function preload(){
bg_img = loadImage("bg_plain.png");
ball_img = loadImage("basketboll.png");
man_img = loadImage("Screenshot__198_-removebg-preview.png")
bg_song = loadSound("stranger-things-124008.mp3")
}

function setup() {
  //canvas
 canvas = createCanvas(windowWidth, windowHeight);

 bg_song.play();
 bg_song.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
  //ground and hoop
  ground = new Ground(400,height-24,width*2,40);
  basketballhoopside1 = new Ground (windowWidth-300,windowHeight-400,20,100);
  basketballhoopside2 = new Ground (windowWidth-200,windowHeight-400,20,100);
  ScoreChecker = createSprite(windowWidth-250,windowHeight-400,100,20)
  ScoreChecker.shapeColor = "red"
  // var ball options 
  var ball_option = {
    isStatic:false,
    restitution:0.5,
    friction:0,
    density:1
  }
  ball = Matter.Bodies.circle(100,400,45,ball_option);
  World.add(world,ball);
  man = createSprite(100,500,100,100);
  man.scale = 1;
  man.addImage(man_img)
  score = 0
  mute_btn = createImg('mute.png');
  mute_btn.position(width-150,80);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(muteSound);
  rectMode(CENTER);
   ellipseMode(RADIUS);
}

function draw() 
{
  background(bg_img);

  Engine.update(engine);
 
  ground.show()
  basketballhoopside1.show()
  basketballhoopside2.show()
  if(ball != null){
  image(ball_img,ball.position.x,ball.position.y,50,50);
  }
  //making the ball go up when up arrow is presse
  if(keyIsDown(UP_ARROW)){
    Matter.Body.applyForce(ball,{x:0,y:0},{x:20,y:80})
  }
  drawSprites()
  if(collide(ball,ScoreChecker,50)=== true){
    gameState = "end";
    World.remove(engine.world,ball);
    ball = null
   }
   if(gameState === "end"){
    textSize(100);
    fill("red")
    text("You win!!",windowWidth/2.5,windowHeight/2);
    textSize(15);
    fill("black")
    text(" <= (YES!! I KNEW I COULD DO IT!! )",windowWidth/8,windowHeight/1.45)
   }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
function muteSound(){
  if(bg_song.isPlaying())
  {
   bg_song.stop();
  }
  else{
   bg_song.play();
  }
}
function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}