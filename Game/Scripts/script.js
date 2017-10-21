var players; 
var interval;
var count = 0;
var imageCounter = 0;
var obstacle;
var gameWorld;
var blueCircle;
var ghost;
var ghost1;
var ghost2;
var ghost3;
var bool = false;
var ghostDie = false;
var fruit;
var timeOutVar;
$(document).ready(function(){
        var s4 = $("<p/>").appendTo("body").text("Space War").attr("class", "s");
        var img = $("<img/>").appendTo("body").attr("id", "etinnkar").attr("src", "Images/paralax_space2.png").css({"position":'relative'})
        var char1 = $("<img>")
        $(char1).attr("src", "Images/Enemy.png" );
        $(char1).attr("path", "Images/Enemy.png");
        $(char1).attr("style", "height:200px;");
        $(char1).css({'position':"absolute"});
        $(char1).css({'top':"200px"});
        $(char1).css({'left':"408px"});

        var char2 = $("<img>");
        $(char2).attr("src", "Images/ship6.png");
        $(char2).attr("path", "Images/ship6.png");
        $(char2).attr("style", "height:200px;");
        $(char2).css({'position':"absolute"});
        $(char2).css({'top':"200px"});
        $(char2).css({'left':"549px"});
        var char3 = $("<img>");
        $(char3).attr("src", "Images/Space.png");
        $(char3).attr("path", "Images/Space.png");
        $(char3).attr("style", "height:200px;");
        $(char3).css({'position':"absolute"});
        $(char3).css({'top':"200px"});
        $(char3).css({'left':"881px"});
        $("body").append(char1);
        $("body").append(char2);
        $("body").append(char3);
        $(char1).on("click", Select);
        $(char2).on("click", Select);
        $(char3).on("click", Select);

    
    function Select(e){  
        

     if($(e.target).attr("path") == "Images/Enemy.png"){
         players = new Hero("Destroer", "Images/Enemy", 3, 6);
        
        
     }
    else if($(e.target).attr("path") == "Images/ship6.png"){
         players = new Hero("Faster", "Images/ship6", 2, 8);
        
    }
    else if($(e.target).attr("path") == "Images/Space.png"){
            players = new Hero("Default", "Images/Space", 4, 4);
          
    }
    else
        {
            console.log($(e.target).attr("path"));
        }
        
        players.view();
        
        var nameButton = $("<button>");
        $(nameButton).html("Change name");
        $(nameButton).click(function(){
            var newName = prompt("Enter new name");
            players.name = newName;
            players.view();
        });
        $("body").append(nameButton);
         
        
    
    }



function Hero(name, src_name, lives, speed)
{    

    
    this.name = name;
    this.src_name = src_name;

    this.speed = speed;

    this.lives = lives;
    
    this.directions = {left : false, up: false, right: false, down: false};
    var that = this;
    
    this.view = function(){
        $("p").remove();
        $("button").remove();

        this.image = $("<img>").attr('id','heros').attr("src",  this.src_name + ".png")        
        this.imagePath = $("<div>").append(this.image);

        $("img").remove();
        this.image.css("height", "200px");

        
        $("body").append(this.imagePath);
        var data = $("<p/>").appendTo("body").text("Your character name is "+this.name+" speed is "+this.speed+" lives are " +this.lives)
        $("body").append("<button id='playGame'>Play Game</button>");
        $("#playGame").on("click", PlayGame);
        
        
        
        
        
    }

    this.collision = function(){
        var playerXcenter = this.imagePath.position().left + this.imagePath.width()/2;
        var playerYcenter = this.imagePath.position().top + this.imagePath.height()/2;

        for(var c=0; c < obstacle.allWalls.length; c++){
        
            var objectXcenter = obstacle.allWalls[c].position().left + obstacle.allWalls[c].width()/2;
            var objectYcenter = obstacle.allWalls[c].position().top + obstacle.allWalls[c].height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + obstacle.allWalls[c].width()/2;
            var totalHeight = this.imagePath.height()/2 + obstacle.allWalls[c].height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                switch (true){
                    case this.directions.left:
                        this.directions.left = false;
                        this.imagePath.css('left', (obstacle.allWalls[c].position().left+obstacle.allWalls[c].width()+1)+"px");
                        break;
                    case this.directions.up:
                        players.directions.up=false;
                        this.imagePath.css('top', (obstacle.allWalls[c].position().top+obstacle.allWalls[c].height()+1)+"px");
                        //alert(this.imagePath.css("top"));
                        break;
                    case this.directions.right:
                        players.directions.right=false;
                        this.imagePath.css('left', (obstacle.allWalls[c].position().left-this.imagePath.width() - 1)+"px");
                        //alert(this.imagePath.css("left"));
                        break;
                    case this.directions.down:
                        players.directions.down=false;
                        this.imagePath.css('top', (obstacle.allWalls[c].position().top-this.imagePath.height()-1)+"px");
                        break;
                }
            }
        }
        
        /* 
            second for 
        */
        
        for(var c=0; c < blueCircle.allWalls.length; c++){
        
            var objectXcenter = blueCircle.allWalls[c].position().left + blueCircle.allWalls[c].width()/2;
            var objectYcenter = blueCircle.allWalls[c].position().top + blueCircle.allWalls[c].height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + blueCircle.allWalls[c].width()/2;
            var totalHeight = this.imagePath.height()/2 + blueCircle.allWalls[c].height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                
                blueCircle.allWalls[c].remove();
                blueCircle.allWalls.splice(c, 1);   
                
            }
        }

        /*
            third for
        */

        for(var c=0; c < fruit.allWalls.length; c++){
        
            var objectXcenter = fruit.allWalls[c].position().left + fruit.allWalls[c].width()/2;
            var objectYcenter = fruit.allWalls[c].position().top + fruit.allWalls[c].height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + fruit.allWalls[c].width()/2;
            var totalHeight = this.imagePath.height()/2 + fruit.allWalls[c].height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                if(ghostDie == true){
					window.clearTimeout(timeOutVar);
					fruit.allWalls[c].remove();
					fruit.allWalls.splice(c, 1);
					timeOutVar = setTimeout(function(){
						ghostDie = false;
                }, 20000) 
				}else{
					fruit.allWalls[c].remove();
					fruit.allWalls.splice(c, 1);
					ghostDie = true;
					timeOutVar = setTimeout(function(){
						ghostDie = false;
                }, 20000);
				console.log(timeOutVar);
				}
                   
                
            }
        }


            var objectXcenter = ghost.imagePath.position().left + ghost.imagePath.width()/2;
            var objectYcenter = ghost.imagePath.position().top + ghost.imagePath.height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + ghost.imagePath.width()/2;
            var totalHeight = this.imagePath.height()/2 + ghost.imagePath.height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                 if(ghostDie == false){ 
                    if(bool == false){
                        this.lives-=1;
                        console.log(this.lives);
                        bool = true;
                        setTimeout(function(){
                            bool = false;
                        }, 3000);
                    }
                }else{
                    ghost.imagePath.remove();
                }                   
            }

            var objectXcenter = ghost1.imagePath.position().left + ghost1.imagePath.width()/2;
            var objectYcenter = ghost1.imagePath.position().top + ghost1.imagePath.height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + ghost1.imagePath.width()/2;
            var totalHeight = this.imagePath.height()/2 + ghost1.imagePath.height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                if(ghostDie == false){ 
                    if(bool == false){
                        this.lives-=1;
                        console.log(this.lives);
                        bool = true;
                        setTimeout(function(){
                            bool = false;
                        }, 3000);
                    }
                }else{
                    ghost1.imagePath.remove();
                }    
            }

            var objectXcenter = ghost2.imagePath.position().left + ghost2.imagePath.width()/2;
            var objectYcenter = ghost2.imagePath.position().top + ghost2.imagePath.height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + ghost2.imagePath.width()/2;
            var totalHeight = this.imagePath.height()/2 + ghost2.imagePath.height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                if(ghostDie == false){ 
                    if(bool == false){
                        this.lives-=1;
                        console.log(this.lives);
                        bool = true;
                        setTimeout(function(){
                            bool = false;
                        }, 1000);
                    }
                }else{
                    ghost2.imagePath.remove();
                }
            }

            var objectXcenter = ghost3.imagePath.position().left + ghost3.imagePath.width()/2;
            var objectYcenter = ghost3.imagePath.position().top + ghost3.imagePath.height()/2;
        
            var horizontalCenterDistance = Math.abs(playerXcenter - objectXcenter);
            var verticalCenterDistance = Math.abs(playerYcenter - objectYcenter);
        
            var totalWidth = this.imagePath.width()/2 + ghost3.imagePath.width()/2;
            var totalHeight = this.imagePath.height()/2 + ghost3.imagePath.height()/2;

            if( horizontalCenterDistance <= totalWidth && verticalCenterDistance <= totalHeight ){
                if(ghostDie == false){ 
                    if(bool == false){
                        this.lives-=1;
                        console.log(this.lives);
                        bool = true;
                        setTimeout(function(){
                            bool = false;
                        }, 3000);
                    }
                }else{

                    ghost3.imagePath.remove();
                }    
            }


        
        
        }


    };
    
});
