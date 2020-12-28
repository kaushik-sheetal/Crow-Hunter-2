var player,playerimage,backgroundimage,bg,crow,crowimage,arrow,arrowimage,score,crowsgroup,arrowsgroup,ArrowSound;

var gamestate="start";

function preload(){

    playerimage=loadImage("CHARACTERS.png");

//playerimage=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");

backgroundimage=loadImage("Background.jpg")

crowimage=loadAnimation("1.png","2.png","3.png");

arrowimage=loadImage("arrow.png")

ArrowSound= loadSound("ArrowSound3.mp3");

CrowSound1= loadSound("CrowSound1.mp3");

}
function setup(){

createCanvas(displayWidth,displayHeight);

score=0;

//player.addAnimation("playerimage",playerimage);

//bg = createSprite(0,0,displayWidth,displayHeight);

//bg.addImage(backgroundimage)

//bg.scale=10;

player = createSprite(displayWidth/2,displayHeight-200,100,100)

player.addImage("Image",playerimage);

player.scale=2.5;

crowsgroup = new Group();

arrowsgroup = new Group();

}

function draw (){


    if (gamestate===("start")){
        background(backgroundimage)
        rectMode(CENTER);
        fill("lightblue");

        strokeWeight(50);

        //stroke("grey");
        rect(displayWidth/2,displayHeight-500,500,500);

        //arrows();
        textSize(25);

        fill("red");
        
        text("Kills : "+score,displayWidth/2,50);

      //  fill("blue");

       // text(score,displayWidth-700,50)

        text("Hi Player! So you have to kill a total of ",50,displayHeight/5);
        text("10 crows through out the game.You can  ",50,displayHeight/4.5);
        text("control the player by touching wherever",50,displayHeight/4);
        text("you want the player to be and by ",50,displayHeight/3.5);
        text("tapping you can shoot.Click to start",50,displayHeight/3);

        if(touches.length>0||keyDown(DOWN_ARROW)){

            gamestate="play";

            arrowsgroup.destroyEach();

            touches=[ ];

        }
    }
    if(gamestate==="play"){
        background(backgroundimage)
        crows();

        arrows();

        for (var i=0;i<crowsgroup.length;i++){

            var kill=crowsgroup.get(i);
            
            if (arrowsgroup.isTouching(kill)){
            
                score=score+1;
            
                kill.destroy();
            
                arrowsgroup.destroyEach();

                CrowSound1.play();
                
                }
            
            }
            textSize(25);

        fill("red");
        
        text("Kills : "+score,displayWidth/2,50);

      //  fill("blue");

      //  text(score,displayWidth-700,50)

        if(score===10){

            gamestate="end";

        }
            
            }


    

    if(gamestate==="end"){

        background(backgroundimage)

        text("Kills : "+score,displayWidth/2,50);

        rectMode(CENTER);

        fill("lightblue");

        strokeWeight(50);

        rect(displayWidth/2,displayHeight-500,500,500);

        textSize(50);

        fill("red")

        text("   Game Over ",50,displayHeight/2)

        arrowsgroup.destroyEach();

        crowsgroup.destroyEach();

        textSize(25);
        
        text("Kills : "+score,displayWidth/2,50);

       // fill("blue");

       // text(score,displayWidth-700,50)

    }



/*//if(keyWentDown(LEFT_ARROW)||){

//player.velocityX=-10;

//}

if(keyWentUp(LEFT_ARROW)||){

    player.velocityX=0;
    
    }

if(keyWentDown(RIGHT_ARROW)){

    player.velocityX=10;
    
    }

    if(keyWentUp(RIGHT_ARROW)){

        player.velocityX=0;
        
        }
*/

player.x=mouseX;

//player.rotation=mouseY;


drawSprites();



    

    }


function crows(){

if (frameCount%100===0){

    crow=createSprite(displayWidth,displayHeight-600,50,50)

    crow.addAnimation("crowimage",crowimage);

    crow.velocityX=-(3+score/2);

    crow.y=random(displayHeight-600,displayHeight-700)

    crow.lifetime=530;

    crowsgroup.add(crow);

    //crow.debug=true;

    crow.setCollider("rectangle",0,0,100,50)

    
}
}

function arrows(){

    

if(keyWentDown("Space")||(touches.length>0)){

    arrow=createSprite(player.x,player.y-20,50,50);

    arrow.addImage(arrowimage);
    
    arrow.scale=0.5;
    
    arrow.depth=player.depth-1;

    arrow.velocityY=-6;

    arrow.lifetime=100;

    arrowsgroup.add(arrow);

    //arrow.debug=true;

    arrow.setCollider("rectangle",0,-90,10,50);

    ArrowSound.play();

    touches=[ ];

}

}

