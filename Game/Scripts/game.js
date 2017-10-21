function PlayGame(){

	        start();
    $("p").remove();
    $("div").remove();
    $("button").remove();
    gameWorld = $("<div>");
    gameWorld.css({'background' : 'url(Images/background.jpg)', 'height':"700px", 'width' : "600px", "display":"inline-block", "position": "absolute", "left":"30%", "top" : '5%', "background-repeat":"no-repeat", "background-size" : "600px 700px"});
    $("body").append(gameWorld);
    players.image.css({"height":"35px", "width":"35px"})
    players.imagePath.css({"height":"35px","display":"inline-block","width":"35px", "position":"absolute", "top":"0", "left": "0"});


    $(gameWorld).append(players.imagePath);
    
    obstacle = new Obs();
    blueCircle = new Circle();
    ghost = new Enemy(664, 564);
	ghost1 = new Enemy(664, 1);
	ghost2 = new Enemy(1, 454);
	ghost3 = new Enemy(264, 251);
	fruit = new Fruit();

    gameWorld.append(ghost.imagePath);

	gameWorld.append(ghost1.imagePath);

	gameWorld.append(ghost2.imagePath);

	gameWorld.append(ghost3.imagePath);    
    
   $('html').keydown(charMovement);

function charMovement(e)
{   
    
	switch (e.which){
		case 65:
			players.directions.left = true;
			players.directions.right=false;
			players.directions.up=false;
			players.directions.down=false;
			break;
		case 87:
			players.directions.left = false;
			players.directions.right=false;
			players.directions.up=true;
			players.directions.down=false;
			break;
		case 68:
			players.directions.left = false;
			players.directions.right=true;
			players.directions.up=false;
			players.directions.down=false;
			break;
		case 83:
			players.directions.left = false;
			players.directions.right=false;
			players.directions.up=false;
			players.directions.down=true;
			break;

	}
    
    
}
    

function move()
{
    if($(".blue").attr("class") == "blue"){
    if($(".ghost").attr("class") == 'ghost'){
    if((count += 20)%200 == 0) 
	{
		imageCounter = imageCounter == 1 ? 0 : (imageCounter+1);
		//console.log(imageCounter);
	}
    
	if(players.lives == 0){
		alert("You lose");
		clearInterval(interval);
		players.imagePath.remove();
	}

    players.collision();

    ghost.ghostMove();
    ghost.wallsCol();

    ghost1.ghostMove();
    ghost1.wallsCol();

    ghost2.ghostMove();
    ghost2.wallsCol();

    ghost3.ghostMove();
    ghost3.wallsCol();

    if(ghostDie == true){
    	$(".ghost").attr('src', 'Images/a.jpg');
    } else {
    	$(".ghost").attr('src', 'blackhole.jpg');
    }
        

        //console.log(i);
		if(players.imagePath.position().left > 0 && players.directions.left == true)
		{   
			
			players.imagePath.css("left", (players.imagePath.position().left - players.speed) + "px");
           /* players.image.attr('src', players.src_name + "/" + players.src_name + "_right_" + imageCounter + ".png");*/
		}
        
		else if(players.imagePath.position().left < (gameWorld.width() - players.imagePath.width()) && players.directions.right == true)
		{ 
			players.imagePath.css("left", (players.imagePath.position().left + players.speed) + "px");
            /*players.image.attr('src', players.src_name + "/" + players.src_name + "_left_" + imageCounter + ".png");*/
		}
		
		else if(players.imagePath.position().top > 0 && players.directions.up == true)
		{ 
			players.imagePath.css("top", (players.imagePath.position().top - players.speed) + "px");
           /* players.image.attr('src', players.src_name + "/" + players.src_name + "_top_" + imageCounter + ".png");*/
		}

        else if(players.imagePath.position().top < (gameWorld.height() - players.imagePath.height()) && players.directions.down == true)
		{
			players.imagePath.css("top", (players.imagePath.position().top + players.speed) + "px");
           /* players.image.attr('src', players.src_name + "/" + players.src_name + "_bottom_" + imageCounter + ".png");*/
		}

		/*

			end if

		*/
	}else{
		alert("You win");
        clearInterval(interval);	
	}
    }else{
        alert("You win");
        clearInterval(interval);
    }
    }
    interval = setInterval(move,20);
   
   

		
    

    

    }
function Obs(){
    this.matrix = [
					[0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
					[0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
					[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
					[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
					[0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
					[0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
					[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],

				];
	
	this.allWalls = [];
	
	for(var h = 0; h < this.matrix.length; h++)
	{
		for(var w = 0; w < this.matrix[h].length; w++)
		{
			if(this.matrix[h][w] == 1)
			{
				this.allWalls.push($("<div style='width: 50px; height: 50px; position: absolute;'>").append($("<img>").attr("src", "Images/asteroid.png").css({'width':"100%",'height':"100%"})).css({top:(h*50)+"px", left:(w*50)+"px", "width":"50px", "height":"50px"}));
				gameWorld.append(this.allWalls[this.allWalls.length-1]);
			}
			}
		}
	}

function Circle(){
    this.matrix = [
					[1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
					[0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
					[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
					[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0],
					[0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
					[0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
					[0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],

				];
	
	this.allWalls = [];
	
	for(var h = 0; h < this.matrix.length; h++)
	{
		for(var w = 0; w < this.matrix[h].length; w++)
		{
			if(this.matrix[h][w] == 0)
			{
				this.allWalls.push($("<div style='width: 10px; height: 10px; position: absolute;' class='blue'>").append($("<img>").attr("src", "Images/yellowthing.png")).css({top:(h*50)+5+"px", left:(w*50)+10+"px", "width":"10px", "height":"10px"}));
				gameWorld.append(this.allWalls[this.allWalls.length-1]);
			}
			}
		}
	}

	function Enemy(h, w){

		this.h = h;

		this.w = w;

    	this.src_name = "ghost";

    	this.speed = 10;

    
    	this.directions = [false, false, true, false];
    


        this.image = $("<img class = 'ghost'>").attr("src",  this.src_name + ".png");        
        this.imagePath = $("<div>").append(this.image);


        this.image.css({"height" : "35px", "width": "35px"});
        this.imagePath.css({"height" : "35px", "display":"inline-block","width":"35px", "position":"absolute", "top":this.h + "px", "left": this.w + "px"});
 
        this.random = function()
        {
    		this.directions = [false, false, false, false];
			var x = Math.round((Math.random() * 3));
			this.directions[x] = true;
        }

        this.ghostMove = function(){
        	if(this.imagePath.position().left > 0 && this.directions[0] == true)
			{   
				this.imagePath.css("left", (this.imagePath.position().left - this.speed) + "px");
			}
        
			if(this.imagePath.position().left < (gameWorld.width() - this.imagePath.width()) && this.directions[1] == true)
			{ 
				this.imagePath.css("left", (this.imagePath.position().left + this.speed) + "px");
			}
		
			if(this.imagePath.position().top > 0 && this.directions[2] == true)
			{ 
				this.imagePath.css("top", (this.imagePath.position().top - this.speed) + "px");
			}
			
        	if(this.imagePath.position().top < (gameWorld.height() - this.imagePath.height()) && this.directions[3] == true)
			{
				this.imagePath.css("top", (this.imagePath.position().top + this.speed) + "px");
			}

			if(this.imagePath.position().left <= 0 || this.imagePath.position().left >= (gameWorld.width() - this.imagePath.width()) || this.imagePath.position().top <= 0 || this.imagePath.position().top >= (gameWorld.height() - this.imagePath.height()))
			{
				switch(true)
				{
					case this.directions[0]:
						this.imagePath.css("left", "1px");
						break;
					case this.directions[2]:
						this.imagePath.css("top", "1px");
						break;
					case this.directions[1]:
						this.imagePath.css("left", "564px");
						break;
					case this.directions[3]:
						this.imagePath.css("top", "664px");
						break;
				}

				this.random();
				
			}

        }

        this.wallsCol = function(){
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
                    case this.directions[0]:
                        this.directions[0] = false;
                        this.imagePath.css('left', (obstacle.allWalls[c].position().left+obstacle.allWalls[c].width()+1)+"px");
                        this.random()
                        break;
                    case this.directions[2]:
                        this.directions[2]=false;
                        this.imagePath.css('top', (obstacle.allWalls[c].position().top+obstacle.allWalls[c].height()+1)+"px");
                        this.random()
                        break;
                    case this.directions[1]:
                        this.directions[1]=false;
                        this.imagePath.css('left', (obstacle.allWalls[c].position().left-this.imagePath.width() - 1)+"px");
                        this.random()
                        break;
                    case this.directions[3]:
                        this.directions[3]=false;
                        this.imagePath.css('top', (obstacle.allWalls[c].position().top-this.imagePath.height()-1)+"px");
                        this.random();
                        break;
                }
            }
        }
        }

 	
        


	}

	function Fruit(){
    	this.matrix = [
					[1, 0, 0, 1, 0, 2, 1, 1, 1, 0, 1, 1],
					[0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
					[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
					[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0],
					[0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
					[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
					[0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
					[0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],

				];
	
		this.allWalls = [];
	
		for(var h = 0; h < this.matrix.length; h++)
		{
		for(var w = 0; w < this.matrix[h].length; w++)
		{
			if(this.matrix[h][w] == 2)
			{
				this.allWalls.push($("<div style='width: 30px; height: 30px; position: absolute;' class='fruit'>").append($("<img>").attr("src", "Images/fruit.png").css({'width':"100%",'height':"100%"})).css({top:(h*50)+5+"px", left:(w*50)+10+"px", "width":"30px", "height":"30px"}));
				gameWorld.append(this.allWalls[this.allWalls.length-1]);
			}
			}
		}
	}







    
    

