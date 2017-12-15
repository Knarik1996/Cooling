
//canvas
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");

//set the width and height of the canvas according to the opened window
canvas.width=window.innerWidth-17;
canvas.height=window.innerHeight-17;

const a=canvas.width;
const b=canvas.height;//for convenience

//all of these will be used later
let isnextlevel=false;//will be used when we pass from one level to another
let ispaused=true;//it is true because the main menu is in the condition of pause
let isboss=false;//indicates whether it is time for boss to come or no
let gamestart=false; //does our game started?
let changelevel=false; //will be used for background images while moving from one level to another
let isstart=false;//should our balls move?
let ispossible=true;//can we shoot?
let isbuilding=false;//is it time for buildings to be created?
let bossstart=0;//1, 2, and boss comes!
let level=1;//we have three levels, for security let's assign a number in the beginning
let i=1, j=0;//for for loops and security
let isshot=0;//?

//returns a random number from 1 to the given
const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

//hero
const heroim=new Image();
heroim.src="plane.png";

//background images
const bim1=new Image();
bim1.src="1.jpg";
const bim2=new Image();
bim2.src="2.jpg";
const bim3=new Image();
bim3.src="3.jpg";
const bim4=new Image();
bim4.src="4.jpg";
const bim5=new Image();
bim5.src="5.jpg";
const bim6=new Image();
bim6.src="6.jpg";
const bim7=new Image();
bim7.src="7.jpg";
const bim8=new Image();
bim8.src="8.jpg";
const bim9=new Image();
bim9.src="9.jpg";
const bim10=new Image();
bim10.src="10.jpg";
const bim11=new Image();
bim11.src="11.gif";
const bim12=new Image();
bim12.src="12.gif";
const bim13=new Image();
bim13.src="13.gif";
const bim14=new Image();
bim14.src="14.gif";
const bim15=new Image();
bim15.src="15.gif";

//barrier images
const bar1im=new Image();
bar1im.src="barrier1.png";
const bar2im=new Image();
bar2im.src="barrier2.png";
const bar3im=new Image();
bar3im.src="barrier3.png";
const bar4im=new Image();
bar4im.src="barrier4.png";
const bar5im=new Image();
bar5im.src="barrier5.png";
const bar6im=new Image();
bar6im.src="barrier6.png";
const bar7im=new Image();
bar7im.src="barrier7.png";
const bar8im=new Image();
bar8im.src="barrier8.png";

//enemy images
const enemy1=new Image();
enemy1.src="enemy1.png";
const enemy2=new Image();
enemy2.src="enemy2.png";
const enemy3=new Image();
enemy3.src="enemy3.png";

//explosion and fire
const fire=new Image();
fire.src="fire1.png";
const fire1=new Image();
fire1.src="fire.png";

//bosses from 1 to 3
const bossimage=new Image();
bossimage.src="boss.png";
const bossimage1=new Image();
bossimage1.src="boss1.png";
const bossimage2=new Image();
bossimage2.src="boss2.png";

//lives
const heart=new Image();
heart.src="heart.png";

//walls, groundbuildings and ceilingbuildings
const wallim=new Image();
wallim.src="wall.jpg";
const b1=new Image();
b1.src="b1.png";
const b2=new Image();
b2.src="b2.png";
const b3=new Image();
b3.src="b3.png";
const b4=new Image();
b4.src="b4.png";
const b5=new Image();
b5.src="b5.png";
const b1c=new Image();
b1c.src="b1.1.png";
const b2c=new Image();
b2c.src="b2.2.png";
const b3c=new Image();
b3c.src="b3.3.png";

//menu images
const nextlevel=new Image();
nextlevel.src="nextlevel.png";
const startim=new Image();
startim.src="start.jpg";
const level1im=new Image();
level1im.src="level1.png";
const level2im=new Image();
level2im.src="level2.png";
const level3im=new Image();
level3im.src="level3.png";
const gameover=new Image();
gameover.src="gameover.jpg";
const exit=new Image();
exit.src="exit.png";
const botton=new Image();
botton.src="botton.png";
const menu=new Image();
menu.src="menu.png";
const resume=new Image();
resume.src="resume.png";
const instructions=new Image();
instructions.src="instructions.png";
const congrat=new Image();
congrat.src="congrat.jpg";


let arr=["barriers"];
arr[1]=bar1im;
arr[2]=bar2im;
arr[3]=bar3im;
arr[4]=bar4im;

let arr2=["barriers for level 2 and 3"];
arr2[1]=bar1im;
arr2[2]=bar2im;
arr2[3]=bar3im;
arr2[4]=bar4im;
arr2[5]=bar5im;
arr2[6]=bar6im;
arr2[7]=bar7im;
arr2[8]=bar8im;

//one of the most importants parts
//notice that it is a function, so we'll use it a lot
let updategamedata=function()
{
	if(level===1) //every level has its own data, with some or many differences
	{             //so all of the below is for the level 1
		gamedata={
		hero:	{
			im     		: heroim,//image
			x      		: 0,//beginning x
			y      		: b/3,//beginning y
			xdelta 		: 8,//speed x
			ydelta 		: 8,//speed y
			xdir   		: 0,//direction x
			ydir   		: 0,//direction y
			lives  		: 20
		},
		boss: {
			im: bossimage,
			x: a+a/10,
			y: b/2,
			xdelta: 5,
			ydelta: 3,
			width:a/10,
			height:a/10
		},
		barinfo:{
			im			: arr[rand(4)],//as it is reusable, we randomly choose one of the barrier images
			x			: a+a/2,//it should always appear at 1.5*a
			y			: rand(b-b/8),//its y is random within the canvas
			xdelta		: 6.5,//the speed with which it comes to us
			livesmin	: 1,//every barrier can take away only 1 life
			visibility	: 10//will be used for the effect of appearing and disappearing in case of collisions
		},
		arr1:[bim6, bim7, bim8, bim9, bim10],//an array of background images for level 1
		biminfo:{
			xdelta:6.5//the speed with which it moves
		},
		enemyinfo:{
			 im:enemy1,//image
			 y: b/2,//it should always appear in the middle for security
			 ydelta: 6,//speed of y
			 xdelta:6.5,//notice that it is the same as for barriers and b-g-d images, in this way we think that our plane is moving, while it is the environment
			 issh: false,//can the enemy shoot after once he has done
			 isok: false,//can the enemy shoot or move up and down, so is evrything okay with it
			 livesmin:1,//in case of collision, only 1 life is reduced
			 visibility:10,//effect
			 enable: true,//if we have shot our enemy, it will not be able to shoot as
			 enshootinfo:{//info about balls of our enemy
					 xdelta:15,//speed
					 r: 3*a/1000,//radius of balls
					 color:"black",
					 livesmin:1,//can take only 1 life
					 hit: false,//has it hit us?
					 time:1//will be used to indicate how long the explosion lasts
			 }
		}
		};
		gamedata.biminfo.im=gamedata.arr1[i];//subsequent images of canvas
		gamedata.biminfo.x=(i+1)*a;//they should appear out of canvas in the right order
	}
	else if(level===2)//data for level 2
	{
		gamedata={
		hero:	{
		im     		: heroim,
		x      		: 0,
		y      		: b/3,
		xdelta 		: 8,
		ydelta 		: 8,
		xdir   		: 0,
		ydir   		: 0,
		lives  		: 20
	},
	boss: {
		im: bossimage1,
		x: a+a/10,
		y: b/2,
		xdelta: 5,
		ydelta: 5,//this one moves faster
		width:a/10,
		height:a/10
	},
	barinfo:{
		im			: arr2[rand(8)],//here we have more barriers
		x			: a+2*a/5,//we will see later, why we need this specific number
		y			: rand(b-b/8),
		xdelta		: 6.5,
		livesmin	: 1,
		visibility	: 10
	},
	arr1:[bim1, bim2, bim3, bim4, bim5],//again b-g-d images
	biminfo:{
		xdelta:6.5
	},
	enemyinfo:{
		 im:enemy2,//we have different enemy for the second level
		 y: b/2,
		 ydelta: 6,
		 xdelta:6.5,
		 issh: false,
		 isok: false,
		 livesmin:1,
		 visibility:10,
		 enable: true,
		 enshootinfo:{
				 xdelta:15,
				 r: 3*a/1000,
				 color:"blue",
				 livesmin:1,
				 hit: false,
				 time:1
		 }
	}
};
	gamedata.biminfo.im=gamedata.arr1[i];
	gamedata.biminfo.x=(i+1)*a;
	}
	else if(level===3)//data for level 3
	{
		gamedata={
		hero:	{
		im     		: heroim,
		x      		: 0,
		y      		: b/3,
		xdelta 		: 8,
		ydelta 		: 8,
		xdir   		: 0,
		ydir   		: 0,
		lives  		: 20
	},
	boss: {
		im: bossimage2,
		x: a+a/10,
		y: b/2,
		xdelta: 5,
		ydelta: 5,
		width:a/10,
		height:a/10
	},
	barinfo:{
		im		: arr2[rand(8)],
		x		: a+a/2,
		y		: b/4+rand(5*b/12),//the problem is that it should not intersect with buildings
		xdelta	: 6.5,
		livesmin: 1,
		visibility: 10
	},
	arr1:[bim11, bim12, bim13, bim14, bim15],
	biminfo:{
		xdelta:6.5
	},
	enemyinfo:{
		 im:enemy3,//another enemy
		 y: b/2,
		 ydelta: 6,
		 xdelta:6.5,
		 issh: false,
		 isok: false,
		 livesmin:1,
		 visibility:10,
		 enable: true,
		 enshootinfo:{
				 xdelta:15,
				 r: 3*a/1000,
				 color:"gold",
				 livesmin:1,
				 hit: false,
				 time:1
		 }
	},
	wallsceiling:{ //the ceiling
		im:wallim,//image
		x:a+i*a/5,//it should appear out of canvas
		y:0,//it is ceiling
		xdelta:6.5,//speed is the same everywhere
		livesmin:1,//again, every part of the wall can take only 1 life from our hero
		visibility:10//effect
	},
	wallsground:{//the same for our ground
		im:wallim,
		x:a+i*a/5,
		y:b-a/60,
		xdelta:6.5,
		livesmin:1,
		visibility:10
	},
	arrbuildingsground:[b1, b2, b3, b4, b5],
	buildingsground:{//our builidngs
		xdelta:6.5,
		y: b-b/20,
		livesmin:1,
		visibility:10
	},
	arrbuildingsceiling:[b1c, b2c, b3c],
	buildingsceiling:{
		xdelta:6.5,
		y:b/40,
		livesmin:1,
		visibility:10
	}
};
	gamedata.biminfo.im=gamedata.arr1[i];
	gamedata.biminfo.x=(i+1)*a;
	gamedata.buildingsground.im=gamedata.arrbuildingsground[rand(5)-1];//randomly chosen buildings every time
	gamedata.buildingsceiling.im=gamedata.arrbuildingsceiling[rand(3)-1];
	
	//out of canvas, with some distance from the beginning, with some among themselves, with some sense of being random
	gamedata.buildingsground.x=a+a/10+i*a/5+rand(a/8);	
	gamedata.buildingsceiling.x=a+a/10+i*a/5+rand(a/8);
	}
};

updategamedata();//let's update
let boss=gamedata.boss;//for convenience
let hero=gamedata.hero;
let initial=hero.x;//will be used to indicate, whether we can shoot or no
let initialenemy=1000000000;//the same for our enemy
let fireonplane={//the explosion
	im:fire1,//image
	x:100000,//will be changed
	y:100000
};



//so let's start
		

let bar=[];
for(i=0;i<5;i++) //we create an array of objects for our barriers, we have first 5 barriers
	bar[i]={
		im		: arr[rand(4)],
		x		: (3*a/10)*(i+4),
		y		: b/4+rand(5*b/12),
		xdelta	: 6.5,
		livesmin: 1,
		visibility: 10
		};
/*suppose a is 1000,  for bar[0].x we have 1200, for bar[1].x -- 1500, for bar[4].x -- 2400
 notice the last condition in updatebar(), it says that if a barrier goes out of canvas,
create instead of him a new one according to barinfo,  so here we have some math, 
when the first barrier goes out of canvas, bar[4].x=2400-1200=1200, but we have seen that 
the distance between barriers is 300, so as the first one goes out, instead of it a new barrier 
should appear in 1200+300=1500,   and as 1500 is 1.5*a, now you understand why I have chosen that number in barinfo
So all barriers are equidistant from each other				
*/		
const updatebar=function()
{
	updategamedata();
	for(i=0;i<bar.length;i++)
	{
		bar[i].x-=bar[i].xdelta;//every barrier should move
		//collision
		if(bar[i].x<=hero.x+75*a/1000 && bar[i].x+40*a/1000>=hero.x && bar[i].y<=hero.y+60*a/1000 && bar[i].y+25*a/1000>=hero.y)
		{
			bar[i].visibility+=1;//refer to draw() to understand
			hero.lives-=bar[i].livesmin;//-1 life 
			bar[i].livesmin=0;//and no more for the same barrier
		}
		else
			bar[i].visibility=10;
/*when there is a collision our draw function draws our hero only when visibility%10=0
as we are in an animation loop, visibility will change rapidly, and from time to time our hero will be drawn,
in other cases visibility is 10, so our hero is drawn when there isn't a collision*/		
	}
	for(i=0;i<bar.length;i++)
	{
		updategamedata();//we update it every time to get the necessary random values
		if(bar[i].x+45*a/1000<=0 && bossstart<2)
		{
			bar[i]=gamedata.barinfo;//refer to gamedata
		}
	}
};

const updatehero=function()//our hero
{
	hero.x+=hero.xdir*hero.xdelta;//in general
	hero.y+=hero.ydir*hero.ydelta;
	if(hero.x<=0)
		hero.x=0;
	if(hero.x+a/10>=a)
		hero.x=a-a/10;//do not go out of canvas!!
	if(hero.y+b/20<=0)
		hero.y=-b/20;
	if(hero.y+b/7.5>=b)
		hero.y=b-b/7.5;
};

//it is with this that we will play
const leftKey = 37,
        upKey = 38,
        rightKey = 39,
        downKey = 40,
		z=90;
 document.addEventListener("keydown", function(event){//if we are pressing the button
	 e=event.keyCode;
	 if(e===39)
		 hero.xdir=1;//continuously go to the right according to updatehero()
	 if(e===37)
		 hero.xdir=-1;
	 if(e===38)
		 hero.ydir=-1;
	 if(e===40)
		 hero.ydir=1;
 });
  document.addEventListener("keyup", function(event){//if we do not press
	 e=event.keyCode;
	 if(e===39)
		 hero.xdir=0;//do not go anyway
	 if(e===37)
		 hero.xdir=0;
	 if(e===38)
		 hero.ydir=0;
	 if(e===40)
		 hero.ydir=0;
 });
 
 //backgrounds
 let arrbim=[];
 let isyes;//will be used for the fifth background
 for(i=0;i<gamedata.arr1.length;i++)
 {
	 updategamedata();
	 arrbim[i]={
		 im:gamedata.biminfo.im,//proper images for the start
		 x:i*a,
		 xdelta: 6.5
	 }
 }
let bimnotlose=arrbim[arrbim.length-1];//let's keep the fifth part of the background 
let bimnotlosexdelta=6.5;//the same speed
 const updatebim=function()
 {
	 if(changelevel===true)//if the level has changed, start again: get proper images, and start with 0
	 {
		 for(i=0;i<arrbim.length;i++)
		 {
			 updategamedata();
			 arrbim[i]={
			 im:gamedata.biminfo.im,
			 x:i*a,
			 xdelta: 6.5
			}
		 }
		 changelevel=false;//it should be done only once
	 }
	 
	 //at this point the boss comes and the movement of backgrounds stops
	 if(bimnotlose.x+a<=0 && bossstart>=2) //go ahead
	 {
		 isboss=true;//actual start
		 for(i=0;i<arrbim.length;i++)
			 arrbim[i].xdelta=0;
		 bimnotlosexdelta=0;//stop
	 }
	 else if(bossstart<2)//go ahead
	 {
		 isboss=false;//no boss
		 for(i=0;i<arrbim.length;i++)
			arrbim[i].xdelta=6.5;
		bimnotlosexdelta=6.5;//there is movement
	 }
	 for(i=0;i<arrbim.length;i++) 
		 arrbim[i].x-=arrbim[i].xdelta;//we move
	 if(isyes===true)//once more go ahead
		bimnotlose.x-=bimnotlosexdelta;
	 if(arrbim[arrbim.length-1].x<=0)
	 {
		 bossstart++;
		 bimnotlose=arrbim[arrbim.length-1];
		 isyes=true;
		 for(i=0;i<arrbim.length;i++)
		 {
			 updategamedata();
			 arrbim[i]=gamedata.biminfo;
		 }
	 }
/*and here we go; 1)we have only five parts of background and it moves; so, when the fifth part
of our background reaches the point 0 with its beginning, we should recreate our backgrounds
according to gamedata; but in this case they will appear out of canvas and will start to move
from there; but our initial fifth background will remain!! that's why in that case I assign
the fifth b-g-d to bimnotlose and make it move; isyes indicates when it should start to move;
2)regarding the boss;as you can see, whenever the fifth part of our background reaches the 0
point with its beginning, bossstart increases by 1, so we can infer that the time for boss is
when the fifth part has reached it twice, namely bossstart is >=2
*/	 
 };
 

 const enemy=[gamedata.enemyinfo];//we have many enemies each having its own data
 enemy[0].x=bar[rand(5)-1].x+75*a/1000;//it should appear somewhere between barriers
 enemy[0].enshoot=[gamedata.enemyinfo.enshootinfo];//each of these many enemies can have many balls
 enemy[0].enshoot.x=enemy[0].x-3*a/1000;//the ball appears very near to the enemy
 enemy[0].enshoot.y=enemy[0].y+32.5*a/1000;//in the middle actually (for sizes refer to draw())
 
 const updateenemy1=function()//let's begin
 {
	 let k;
	 if(enemy[enemy.length-1].x<a/2 && bossstart<2)//second part says that it is not bosstime
	 {
		 updategamedata();
		 for(i=0;i<bar.length;i++)
			 if(bar[i].x>a)
				 k=bar[i].x;//we want our enemy to appear out of canvas
			 
		enemy[enemy.length]=gamedata.enemyinfo;//we do not have i=enemy.length, so this is a new enemy!!
		if(level===1 || level===3)//the enemy appears after the barrier,
			enemy[enemy.length-1].x=k+45*a/1000+rand(180);
		else if(level===2)//the random number depends on the distance between barriers
			enemy[enemy.length-1].x=k+45*a/1000+rand(80);//for the second level the distance is 200 for a=1000, draw on paper to see the proper place
		enemy[enemy.length-1].enshoot=[gamedata.enemyinfo.enshootinfo];//our new enemy has at least one ball
		enemy[enemy.length-1].enshoot[0].x=enemy[enemy.length-1].x-3*a/1000;
		enemy[enemy.length-1].enshoot[0].y=enemy[enemy.length-1].y+32.5*a/1000;//with its proper place		 
	 }
	 for(i=0;i<enemy.length;i++)
	 {
		 updategamedata();//for security
		 enemy[i].x-=enemy[i].xdelta;//our enemy moves
		 if(level===3)//here we have buildings, so...
		 {
//the buildings appear only when there are walls, as we will see later			 
			 if(enemy[i].x>=arrwallsceiling[0].x && enemy[i].x<=arrwallsceiling[9].x+a/5)
			 {
				 if(enemy[i].y<=b/4)
					 enemy[i].ydelta*=-1;
				 if(enemy[i].y+40*a/1000>=b/1.3) //change direction more often if there are buildings
					 enemy[i].ydelta*=-1;
			 }
			 if(enemy[i].y>=b-b/8)
				 enemy[i].ydelta*=-1;
			 if(enemy[i].y<=b/20)
				 enemy[i].ydelta*=-1;
			 if(enemy[i].x<=a)
				enemy[i].y+=enemy[i].ydelta;//actual movement
		 }
		 else     //if there are no buildings, just do not go out of canvas
		 {
			 if(enemy[i].y>=b-b/8)
				 enemy[i].ydelta*=-1;
			 if(enemy[i].y<=-b/30)
				 enemy[i].ydelta*=-1;
			 if(enemy[i].x<=a)
				enemy[i].y+=enemy[i].ydelta;
		 }
		 if(level===1 || level===2)//a little different from level 3 because of the image
		 {
			 //collision
			 if(enemy[i].x<=hero.x+60*a/1000 && enemy[i].x+40*a/1000>=hero.x && enemy[i].y<=hero.y+40*a/1000 && enemy[i].y+20*a/1000>=hero.y)
			 {
				 enemy[i].im=fire;//the image becomes the fire
				 enemy[i].ydelta=0;//it does not move up or down, though it continues to move to the left
				 enemy[i].isok=0; //it cannot shoot anymore
				 enemy[i].visibility+=1;//refer to barrier
				 hero.lives-=enemy[i].livesmin;//only 1 life
				 enemy[i].livesmin=0;//and no more
			 }
			 else
				 enemy[i].visibility=10;//refer to barrier
		 }
		 else//only numbers change
			 if(enemy[i].x<=hero.x+60*a/1000 && enemy[i].x+60*a/1000>=hero.x && enemy[i].y<=hero.y+60*a/1000 && enemy[i].y+20*a/1000>=hero.y)
			 {
				 enemy[i].im=fire;
				 enemy[i].ydelta=0;
				 enemy[i].isok=0;
				 enemy[i].visibility+=1;
				 hero.lives-=enemy[i].livesmin;
				 enemy[i].livesmin=0;
			 }
			 else
				 enemy[i].visibility=10;
	 }
 };

 const updateenemyshoot=function()//updateballs
 {
	 for(i=0;i<enemy.length;i++)
	 {
		 updategamedata();
		 if(level===1)
		 {
			 updategamedata();
			 //if the enemy "sees" our hero, it shoots
			 if(enemy[i].x<=a-75*a/1000 && enemy[i].x>=hero.x+a/10 &&  enemy[i].y>=hero.y && enemy[i].y<=hero.y+35*a/1000)
			 {
				 if(enemy[i].isok===true || enemy[i].isok===false)//it is not 0 mentioned above
					enemy[i].isok=true;
				 if(enemy[i].isok===true)//bavararum e mer anhrajesht paymannerin
					 if(enemy[i].issh===false)//distance ev hajaxakanutyun
					 {
						 initialenemy=enemy[i].x-3*a/1000;//the initial position of our enemy
						 enemy[i].enshoot[enemy[i].enshoot.length]=gamedata.enemyinfo.enshootinfo;//a new ball is created(balleri array)
						 enemy[i].enshoot[enemy[i].enshoot.length-1].x=enemy[i].x-3*a/1000;//determine its place
						 enemy[i].enshoot[enemy[i].enshoot.length-1].y=enemy[i].y+32.5*a/1000;
						 enemy[i].issh=true;//once it shoots it should wait
					 }
			 }
		 }
		 else if(level===2)//in if statement we have a greater interval, so here enemies shoot more
		 {
			 updategamedata();
				if(enemy[i].x<=a-75*a/1000 && enemy[i].x>=hero.x+a/10 &&  enemy[i].y>=hero.y-20*a/1000 && enemy[i].y<=hero.y+55*a/1000)
				 {//i hakarak myus levelneri estex enemyneri heravorutyunn avelin e dra hamar el shat enq krarkum
					 if(enemy[i].isok===true || enemy[i].isok===false)
						enemy[i].isok=true;
					 if(enemy[i].isok===true)
						 if(enemy[i].issh===false)
						 {
							 initialenemy=enemy[i].x-3;
							 enemy[i].enshoot[enemy[i].enshoot.length]=gamedata.enemyinfo.enshootinfo;
							 enemy[i].enshoot[enemy[i].enshoot.length-1].x=enemy[i].x-3*a/1000;
							 enemy[i].enshoot[enemy[i].enshoot.length-1].y=enemy[i].y+32.5*a/1000;
							 enemy[i].issh=true;
	//once more, notice that I write gamedata.enemyinfo.enshootinfo; without updategamedata() we would have the same values!!!
						 }
				 }
		 }
		 else if(level===3)//the same as in 2
		 {
			 updategamedata();
				if(enemy[i].x<=a-75*a/1000 && enemy[i].x>=hero.x+a/10 &&  enemy[i].y>=hero.y-20*a/1000 && enemy[i].y<=hero.y+55*a/1000)
				 {
					 if(enemy[i].isok===true || enemy[i].isok===false)
						enemy[i].isok=true;
					 if(enemy[i].isok===true)
						 if(enemy[i].issh===false)
						 {
							 initialenemy=enemy[i].x-3;
							 enemy[i].enshoot[enemy[i].enshoot.length]=gamedata.enemyinfo.enshootinfo;
							 enemy[i].enshoot[enemy[i].enshoot.length-1].x=enemy[i].x-3*a/1000;
							 enemy[i].enshoot[enemy[i].enshoot.length-1].y=enemy[i].y+32.5*a/1000;
							 enemy[i].issh=true;
						 }
				 }
		 }
	 }
	 for(i=0;i<enemy.length;i++)
	 {
		 for(j=1;j<enemy[i].enshoot.length;j++)
		 {
			enemy[i].enshoot[j].x-=gamedata.enemyinfo.enshootinfo.xdelta;//every created ball moves from right to left
			//if it hits us
			if(enemy[i].enshoot[j].x<=hero.x+80*a/1000 && enemy[i].enshoot[j].x+a/100>=hero.x && enemy[i].enshoot[j].y<=hero.y+70*a/1000 && enemy[i].enshoot[j].y>=hero.y+30*a/1000)
			{
				hero.lives-=enemy[i].enshoot[j].livesmin;//only 1 life
				enemy[i].enshoot[j].livesmin=0;
				enemy[i].enshoot[j].hit=true;//do not draw it antmore(ball)
				enemy[i].enshoot[j].time*=2;//it is just a condition that will take place only once	
			}
			if(enemy[i].enshoot[j].time===2)
			{
				fireonplane={
					im: fire1,
					x: enemy[i].enshoot[j].x,//at the place of the hit, the explosion is created
					y: enemy[i].enshoot[j].y
				};
				enemy[i].enshoot[j].time=0; //enqan a nkarum ed fiere qanzi inqe vorosh entacq henc ed planei mej a)
			}
	/*nevertheless, notice that the ball, though it is not drawn, continues to move (refer to draw()),
      this movement is left as a timeindicator for drawing the explosion image*/
			
			if(enemy[i].enable===true)//when the enemy can shoot again
			{
				if(initialenemy-enemy[i].enshoot[j].x>=a/10)
					enemy[i].issh=false;
				else
					enemy[i].issh=true; 
			}
		 }
		 
	 }
 };
 
 
 
 let hw=[];//hero weapon
document.addEventListener("keydown", function(event){
	 if(event.keyCode===90)//z is pressed
		 if(ispossible===true)//can we shoot again?
			 {
				 initial=hero.x;//it depends from this(krakelov tex fixel)
				 isstart=true;//the movement of balls start
				 hw[hw.length]={ //a new ball is created
					isit	:true, 	//has it hit somewhere and should we draw it afterwards(refer to draw())  
					x		:hero.x+105*a/1000, //plane dimace
					y		:hero.y+50*a/1000,//the ball begins on the nose of our hero//mejtexe
					r		:a/200, //radius
					xdelta	:15,//speed
					minliv	:1,//how many lives can one ball take from the boss
					time  	:1,//for explosion on the boss
					color	: "rgba(250, 10, 10, 0.6)" 
				 };
			 }
 } ,false);
let bosslives=5;
let bosslives1=5;//will be clear later, why we need 2 types of lives
let originallives=bosslives;//will be used to determine when the boss attacks us
const updateweapon=function()//our weapon
{
	if(isstart===true)//as we press one time the movement begins
		for(j=0;j<hw.length;j++)
		{
			hw[j].x+=hw[j].xdelta;//actual movement
			if(isboss===true)
			{//if there is a boss and our ball has hit him
				if(hw[j].isit===true && boss.x+boss.width<=a+a/10 && hw[j].x>=boss.x && hw[j].x<=boss.x+boss.width && hw[j].y>=boss.y && hw[j].y<=boss.y+boss.height)
				{
					bosslives-=hw[j].minliv;//only one life
					hw[j].minliv=0;
					hw[j].time*=2;//to get one time action
					hw[j].isit=false;//the ball is no longer visible
	/*again notice that it continues to move; that is used to determine how much
	the explosion lasts on boss; but in order not to get multiple hits to different objects,
	everywhere we write the first condition:  isit===true*/
				}
				
				if(hw[j].time===2)//one time action
				{
					fireonplane={
						im: fire1,
						x: hw[j].x,//in the place where the ball first hits the boss
						y: hw[j].y
					};
					hw[j].time=0;
				}
			}
			
			for(i=0;i<enemy.length;i++)//the ball hits an ordinary enemy
				if(hw[j].isit===true && enemy[i].x<=a && hw[j].x>=enemy[i].x && hw[j].x<=enemy[i].x+75*a/1000 && hw[j].y>=enemy[i].y && hw[j].y<=enemy[i].y+40*a/1000)
				{
					hw[j].isit=false;//we no longer draw the ball
					enemy[i].im=fire;//the image is fire
					enemy[i].ydelta=0;//the enemy does not move up or down
					enemy[i].enable=false;//it can't shoot any more
					enemy[i].isok=0;//it can't shoot at all
					break;
				}
			for(i=0;i<bar.length;i++)
				if(bar[i].x<=a && hw[j].x>=bar[i].x+5*a/1000 && hw[j].x<=bar[i].x+30*a/1000 && hw[j].y>=bar[i].y+5*a/1000 && hw[j].y<=bar[i].y+45*a/1000)
				{
					hw[j].isit=false;//if the ball hits a barrier , it disappears
					break;
				}
			for(i=0;i<buildingsceiling.length;i++)//the same for builings
				if(buildingsceiling[i].x<=a && hw[j].x>=buildingsceiling[i].x+5*a/1000 && hw[j].x<=buildingsceiling[i].x+30*a/1000 && hw[j].y>=buildingsceiling[i].y+5*a/1000 && hw[j].y<=buildingsceiling[i].y+b/5)
				{
					hw[j].isit=false;
					break;
				}
			for(i=0;i<buildingsground.length;i++)
				if(buildingsground[i].x<=a && hw[j].x>=buildingsground[i].x+5*a/1000 && hw[j].x<=buildingsground[i].x+30*a/1000 && hw[j].y>=buildingsground[i].y-b/6 && hw[j].y<=buildingsground[i].y+b/5)
				{
					hw[j].isit=false;
					break;
				}
		}
	if(hw.length>=1)// we can shoot the first one, for the second shoot we should compare distances
	{
		if(hw[hw.length-1].x-initial>=a/4)//ete sxamc pahem krakelu kjake distance a/4 a
			ispossible=true;
		else
			ispossible=false;
	}
};



 
 
 let bossshoot=[{
					x: boss.x,
					initial:boss.x,//can shoot or not and fixes
					y:boss.y+a/20,
					r: 4*a/1000,//radius
					color: "yellow",
					xdelta: 15
				}];
 let bossvis=10;//the effect of visibility
 let life=1;//will be used to indicate that only one life is deduced from both hero and boss
 const updateboss=function()
 {
	 if(isboss===true) //if it is bosstime
	 {
		if(boss.x+boss.width>=a)
			boss.x-=boss.xdelta; //if it is out of canvas, come in
		
		if(boss.x+boss.width<a)
		{
			if(hero.y>=boss.y)
				boss.y+=boss.ydelta;
			else //the boss will try to catch the hero by y coordinate to be able to shoot precisely
				boss.y-=boss.ydelta;
			if(bosslives===originallives-1)//haylayin artapatkerum im qayleri
			{
				boss.xdelta=-10;
			}
	/*as you have saw in updateweapon(), it is bosslives that decrease, so as we hit the boss, we change 
	xdelta and the boss attacks us; when it reaches 0 point it goes backwards and originallives become the same as bosslives*/
			if(boss.x<=0)
			{
				boss.xdelta=10;
				originallives=bosslives;
			}
			boss.x+=boss.xdelta;//movement of the boss
			//collision
			if(boss.x<=hero.x+75*a/1000 && boss.x+80*a/1000>=hero.x && boss.y<=hero.y+60*a/1000 && boss.y+60*a/1000>=hero.y)
			{
				bossvis++;//tartel
				life*=2;
			}
			else
			{
				bossvis=10;   //if the collision is in the process, it does not take more lives,nuynisk erb paymanuc durs ga sa meka ashxateluya
				life=1;			
			}
			if(life===2)
			{
				hero.lives--;		//only one from both
				bosslives1--;   /*and here is the difference; if we use just bosslives we
						will have problems with originallives"*/
			}
			
		}	
	 }
 }
 
const updatebossshoot=function()
{
	if(isboss===true)//it is bosstime
	{
		if(boss.x+boss.width<a+a/10)//the boss is visible to us
		{
			//it is in the proper place to shoot
			if(boss.x>=hero.x+a/10 && boss.y>=hero.y-a/20 && boss.y<=hero.y+a/10 && boss.x-bossshoot[bossshoot.length-1].x>=a/10)
				bossshoot[bossshoot.length]={
							x: boss.x,
							initial:boss.x,
							y:boss.y+a/20,
							r: 4*a/1000,
							color: "yellow",
							xdelta: 15,
							livesmin:1,
							hit:false,
							time:1
						};
			for(i=0;i<bossshoot.length;i++)
			{
				bossshoot[i].x-=bossshoot[i].xdelta;//every ball moves
				//collision
				if(bossshoot[i].x<=hero.x+80*a/1000 && bossshoot[i].x+a/100>=hero.x && bossshoot[i].y<=hero.y+70*a/1000 && bossshoot[i].y>=hero.y+30*a/1000)
				{
					hero.lives-=bossshoot[i].livesmin;//1 life
					bossshoot[i].livesmin=0;
					bossshoot[i].hit=true;//again, it continues to move, but it is not drawn
					bossshoot[i].time*=2;	
				}
				if(bossshoot[i].time===2)
				{
					fireonplane={
						im: fire1,
						x: bossshoot[i].x,//again, an explosion
						y: bossshoot[i].y
					};
					bossshoot[i].time=0;
				}
			}
		}
	}
	else //if it is not bosstime, there should not be any balls of boss here
		for(i=0;i<bossshoot.length;i++)
			bossshoot[i].x=-10;
}
 level=3;//just for convenience
 arrwallsceiling=[];
 arrwallsground=[];
 /*wall={
	 im:wallim,
	 x:i*a/5,
	 y:0,
	 
 }*/
 for(i=0;i<10;i++)
 {
	 updategamedata();
	 arrwallsceiling[i]=gamedata.wallsceiling;//walls above
 }
 for(i=0;i<10;i++)
 {
	 updategamedata();
	 arrwallsground[i]=gamedata.wallsground;//walls below
 }
 const updatewallsceiling=function()
 {
	 if(arrwallsceiling[0].x>=a && arrwallsceiling[9].x<=3*a)//if walls are out of canvas
		 isbuilding=true;							//we can start building builings	
	 else
		 isbuilding=false;
	 for(i=0;i<arrwallsceiling.length;i++)
	 {
		if(isboss===true)
			arrwallsceiling[i].xdelta=0;//if it is bosstime, the walls should not move
		arrwallsceiling[i].x-=arrwallsceiling[i].xdelta;//the movement of walls //visibility tartiiiir <3
		if(arrwallsceiling[i].x<=hero.x+75*a/1000 && arrwallsceiling[i].x+a/5>=hero.x && arrwallsceiling[i].y<=hero.y+60*a/1000 && arrwallsceiling[i].y-b/60>=hero.y)
		{
			arrwallsceiling[i].visibility++;
			hero.lives-=arrwallsceiling[i].livesmin;
			arrwallsceiling[i].livesmin=0;
		}
		else //collision and visibilityeffect
			arrwallsceiling[i].visibility=10;
	 }
	 if(arrwallsceiling[9].x+a/5<=0)
	 {
		 for(i=0;i<arrwallsceiling.length;i++)
		 {
			 updategamedata();
			 arrwallsceiling[i]=gamedata.wallsceiling;
		 }
	 }
	 /*notice that according to gamedata the current walls are out of canvas,
	 the new ones will also appear out of canvas, so in this way we get subsequent 
	 types of backgrounds: with walls (and accordingly with buildings) and witjout*/
 }
 const updatewallsground=function()//the same with a bit of difference
 {
	 if(arrwallsground[0].x>=a && arrwallsground[9].x<=3*a)
		 isbuilding=true;
	 else
		 isbuilding=false;
	 for(i=0;i<arrwallsground.length;i++)
	 {
		if(isboss===true)
			arrwallsground[i].xdelta=0;
		arrwallsground[i].x-=arrwallsground[i].xdelta;
		if(arrwallsground[i].x<=hero.x+75*a/1000 && arrwallsground[i].x+a/5>=hero.x && arrwallsground[i].y<=hero.y+70*a/1000 /*&& arrwallsground[i].y-b/60>=hero.y*/)
		{
			arrwallsground[i].visibility++;
			hero.lives-=arrwallsground[i].livesmin;
			arrwallsground[i].livesmin=0;
		}
		else
			arrwallsground[i].visibility=10;
	 }
	 if(arrwallsground[9].x+a/5<=0)
	 {
		 for(i=0;i<arrwallsground.length;i++)
		 {
			 updategamedata();
			 arrwallsground[i]=gamedata.wallsground;
		 }
	 }
 }
 let buildingsground=[];
 let buildingsceiling=[];
 for(i=0;i<9;i++)
 {
	 level=3;
	 updategamedata();
	 buildingsground[i]=gamedata.buildingsground;
	 buildingsceiling[i]=gamedata.buildingsceiling;
 }//at first the buildings will automatically appear on walls
 
 const updatebuildings=function()
 {
	 if(isbuilding===true && bossstart<2)
		 for(i=0;i<9;i++)
		 {
//as you have noticed I have written "else isbuilding..."; this is because the creation of buildings should take place only once
			 updategamedata();
			 buildingsground[i]=gamedata.buildingsground;
			 buildingsceiling[i]=gamedata.buildingsceiling;
		 }
	for(i=0;i<9;i++)
		//groundi u cellingi hamar shenqer a stexcum ev dranc dzax a sharjum
	{
		buildingsground[i].x-=buildingsground[i].xdelta;
		buildingsceiling[i].x-=buildingsceiling[i].xdelta;//movement and collisions with effect
		if(buildingsceiling[i].x<=hero.x+85*a/1000 && buildingsceiling[i].x+a/40>=hero.x && /*buildingsceiling[i].y<=hero.y+165*a/1000 &&*/ buildingsceiling[i].y+b/7>=hero.y)
		{
			buildingsceiling[i].visibility+=1;
			hero.lives-=buildingsceiling[i].livesmin;
			buildingsceiling[i].livesmin=0;
		}
		else
			buildingsceiling[i].visibility=10;
		if(buildingsground[i].x<=hero.x+85*a/1000 && buildingsground[i].x+a/40>=hero.x && buildingsground[i].y<=hero.y+165*a/1000 && buildingsground[i].y+b/5>=hero.y)
		{
			buildingsground[i].visibility+=1;
			hero.lives-=buildingsground[i].livesmin;
			buildingsground[i].livesmin=0;
		}
		else
			buildingsground[i].visibility=10;
	}
 }
 level=1;
 
 const draw=function()
{
	updategamedata();
	let drawnow=0;
/*as you have seen, we had several visibility cases, so the "otherwise" cases should be grouped in one
and in that way, get the normal airplane*/	
	
	for(i=0;i<arrbim.length;i++)//draw background
		context.drawImage(arrbim[i].im, arrbim[i].x, 0, a, b);
	
	if(bimnotlose.x<=0)//draw the fifth background that we cannot lose
		context.drawImage(bimnotlose.im, bimnotlose.x, 0, a, b);
	
	if(isstart===true) //draw our balls
		for(j=0;j<hw.length;j++) //hw is our ball that we use to shoot
		{
			if(hw[j].isit===true)
			{
				context.beginPath();
				context.arc(hw[j].x, hw[j].y, hw[j].r, 0, 2 * Math.PI, false);
				context.fillStyle = hw[j].color;
				context.fill();
				context.lineWidth = 5;
			}
		}
		
	for(i=0;i<enemy.length;i++) //draw enemyballs
			for(j=1;j<enemy[i].enshoot.length;j++)
			{
				if(enemy[i].enshoot[j].hit===false)
				{
					context.beginPath();
					context.arc(enemy[i].enshoot[j].x, enemy[i].enshoot[j].y, enemy[i].enshoot[j].r, 0, 2 * Math.PI, false);
					context.fillStyle = enemy[i].enshoot[j].color;
					context.fill();
					context.lineWidth = 5*a/1000;
				}
			}
	
	for(i=0;i<bar.length;i++)//draw barriers
		context.drawImage(bar[i].im, bar[i].x, bar[i].y, 45*a/1000, 45*a/1000);
	
	for(i=0;i<enemy.length;i++)//draw enemies
	{
		if(level===3)
			context.drawImage(enemy[i].im, enemy[i].x, enemy[i].y, 75*a/1000, 40*a/1000);//uxxaknyun
		else
			context.drawImage(enemy[i].im, enemy[i].x, enemy[i].y, 75*a/1000, 75*a/1000);//qarakusi verjin bazmapatkaman shnorhiv
	}
	
	
	
	for(i=0;i<bar.length;i++)//visibility cases for barriers
	{
		if(bar[i].x<=hero.x+75*a/1000 && bar[i].x+40*a/1000>=hero.x && bar[i].y<=hero.y+60*a/1000 && bar[i].y+25*a/1000>=hero.y)
		{
			if(bar[i].visibility%10===0)
				context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
			break;
		}
		else if(i===bar.length-1)
			drawnow++;//erb voch mekin kpach chi linum darnum a sa 1
	}
	
	
	for(i=0;i<enemy.length;i++)//visibility cases for enemies
	{
		if(enemy[i].x<=hero.x+60*a/1000 && enemy[i].x+40*a/1000>=hero.x && enemy[i].y<=hero.y+40*a/1000 && enemy[i].y+a/50>=hero.y)
		{
			if(enemy[i].visibility%10===0)
				context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
			break;//henc mi hat gtav verj
		}
		else if(i===enemy.length-1)
			drawnow++; //ete chgtav anum a sa
	}
	
	//visibility case for boss
	if(boss.x<=hero.x+75*a/1000 && boss.x+80*a/1000>=hero.x && boss.y<=hero.y+60*a/1000 && boss.y+60*a/1000>=hero.y)
	{
		if(bossvis%10===0)
			context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
	}
	else
		drawnow++;
	for(i=0;i<enemy.length;i++)//explosion on our plane
	{
		for(j=1;j<enemy[i].enshoot.length;j++)
		{
			if(enemy[i].enshoot[j].x<=hero.x+80*a/1000 && enemy[i].enshoot[j].x+10*a/1000>=hero.x && enemy[i].enshoot[j].y<=hero.y+70*a/1000 && enemy[i].enshoot[j].y>=hero.y+30*a/1000)
			{
				context.drawImage(fireonplane.im, fireonplane.x, fireonplane.y, 40*a/1000, 40*a/1000);
				break;//mi hat fire unenalu hamar
			}
		}
	}
	
	if(level===3)
	{	//draw builings
		for(i=0;i<buildingsground.length;i++)
			context.drawImage(buildingsground[i].im, buildingsground[i].x, buildingsground[i].y-b/5+20, a/40, b/5);
		for(i=0;i<buildingsceiling.length;i++)
			context.drawImage(buildingsceiling[i].im, buildingsceiling[i].x, buildingsceiling[i].y, a/40, b/5);
		//visibilitycases for ground and ceiling buildings
		for(i=0;i<buildingsground.length;i++)
		{
			if(buildingsground[i].x<=hero.x+85*a/1000 && buildingsground[i].x+a/40>=hero.x && buildingsground[i].y<=hero.y+165*a/1000 && buildingsground[i].y+b/5>=hero.y)
			{
				if(buildingsground[i].visibility%10===0)
					context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
				break;
			}
			else if(i===buildingsground.length-1)
				drawnow++;
		}
		for(i=0;i<buildingsceiling.length;i++)
		{
			if(buildingsceiling[i].x<=hero.x+85*a/1000 && buildingsceiling[i].x+a/40>=hero.x && /*buildingsceiling[i].y<=hero.y+165*a/1000 &&*/ buildingsceiling[i].y+b/7>=hero.y)
			{
				if(buildingsceiling[i].visibility%10===0)
					context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
				break;
			}
			else if(i===buildingsceiling.length-1)
				drawnow++;
		}
		
		//draw up and down walls
		for(i=0;i<arrwallsceiling.length;i++)
		{
			context.drawImage(arrwallsceiling[i].im, arrwallsceiling[i].x, arrwallsceiling[i].y, a/5, a/60);
		}
		for(i=0;i<arrwallsground.length;i++)
		{
			context.drawImage(arrwallsground[i].im, arrwallsground[i].x, b-a/60, a/5, a/60);
		}
		//visibility cases for up and down walls
		for(i=0;i<arrwallsceiling.length;i++)
		{
			if(arrwallsceiling[i].x<=hero.x+75*a/1000 && arrwallsceiling[i].x+a/5>=hero.x /*arrwallsceiling[i].y<=hero.y+60*a/1000*/ && arrwallsceiling[i].y+a/60>=hero.y)
			{
				if(arrwallsceiling[i].visibility%10===0)
					context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
				break;
			}
			else if(i===arrwallsceiling.length-1)
				drawnow++;
		}
		for(i=0;i<arrwallsground.length;i++)//wallesi goundin kpneln a
		{
			if(arrwallsground[i].x<=hero.x+75*a/1000 && arrwallsground[i].x+a/5>=hero.x && arrwallsground[i].y<=hero.y+70*a/1000 /*&& arrwallsground[i].y-b/60>=hero.y*/)
			{
				if(arrwallsground[i].visibility%10===0)
					context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
				break;
			}
			else if(i===arrwallsground.length-1)
				drawnow++;
		}
	}
	if((drawnow===3 && level!==3) || (drawnow===7 && level===3))//to sum up we need to create our hero (gumarn a erb chkan visibilitiner)
		context.drawImage(hero.im, hero.x, hero.y, a/10, a/10);
	
	if(isboss===true)
	{//draw boss
		context.drawImage(boss.im, boss.x, boss.y, boss.width, boss.height);
	
		if(boss.x+boss.width<a+100*a/1000)//canvasi mej a
			for(i=0;i<bossshoot.length;i++)
				if(bossshoot[i].hit===false)//nkari ir krakocnere u ete da chi kpel mer heroin
				{//draw boss balls
					context.beginPath();
					context.arc(bossshoot[i].x, bossshoot[i].y, bossshoot[i].r, 0, 2 * Math.PI, false);
					context.fillStyle = bossshoot[i].color;
					context.fill();
					context.lineWidth = 5;
				}
		//explosion when boss balls hit us
		for(i=0;i<bossshoot.length;i++)
			if(bossshoot[i].hit===true && bossshoot[i].x<=hero.x+80*a/1000 && bossshoot[i].x+10*a/1000>=hero.x && bossshoot[i].y<=hero.y+70*a/1000 && bossshoot[i].y>=hero.y+30*a/1000)
			{
				context.drawImage(fireonplane.im, fireonplane.x, fireonplane.y, 40*a/1000, 40*a/1000);
				break;
			}
	//explosion when we hit the boss
		for(j=0;j<hw.length;j++)
			if(hw[j].isit===false && boss.x+boss.width<=a+100*a/1000 && hw[j].x>=boss.x && hw[j].x<=boss.x+boss.width && hw[j].y>=boss.y && hw[j].y<=boss.y+boss.height)
			{
				context.drawImage(fireonplane.im, fireonplane.x, fireonplane.y, 40*a/1000, 40*a/1000);
				break;
		}
	}
	
};

let numhero;//stringified version of our lives
const drawlives=function()
{
	numhero=hero.lives+"";//in this way we get a string (just stringified)
	context.font = "25px Arial";
	context.fillStyle="red";
	context.fillText(numhero, a/20, a/40+20*a/1000);//in this way we draw text
	context.drawImage(heart, a/20+a/30, a/40, 25*a/1000, 25*a/1000);//heart
	if(isboss===true)
		for(i=1;i<=bosslives+bosslives1;i++)//lives of the boss as rectangles
		{
			context.fillStyle="orange";//bossi kyaneri srtiknern en
			context.fillRect(700*a/1000+20*i*a/1000, 10*a/1000, 20, 10);
		}
}


//this is the most difficult and the most important part

 const loop=function()
 {
	 
	 if(ispaused===true && gamestart===false)
	 {
/*at first our game has not started and it is paused; we draw the background image,
the instructions and the levels; then for every level we have an event listener 'click';
the main point and the problem is that all initial conditions must be restored*/
		 context.drawImage(startim, 0, 0, a, b);
		 context.drawImage(level1im, a/2.5, 150*a/1000+a/10, a/5, a/10);
		 context.drawImage(level2im, a/2.5, 150*a/1000+a/5, a/5, a/10);
		 context.drawImage(level3im, a/2.5, 150*a/1000+3*a/10, a/5, a/10);
		 document.addEventListener("click", function(evt){
			 if(gamestart===false)
			 {
				 const d=evt.offsetX;
				 const e=evt.offsetY;
				 if(d>=a/2.5 && d<=a/2.5+a/5 && e>=150*a/1000+a/10 && e<=150*a/1000+a/10+a/10)
				 {
					 bossstart=0;//no boss at first
					 ispaused=false;//the game is not paused
					 level=1;//if we have clicked on "level1"
					 updategamedata();//to get the necessary values
					 hero.x=0;//hero starts from the beginning
					 hero.y=b/3;// and somewhere in the middle
					 hero.lives=20;//it has 20 lives
					 boss=gamedata.boss;//we have the right boss for the level
					 bosslives=5;//lives
					 bosslives1=5;
					 originallives=bosslives;//do not forget that originallives is a global variable
					 bar.length=5;//maybe the previous level was 2 and bar.length is 7, we would have problems in that case
					 for(i=0;i<5;i++)//initial barriers 
						bar[i]={
							im		: arr[rand(4)],
							x		: (3*a/10)*(i+4),
							y		: b/4+rand(5*b/12),
							xdelta	: 6.5,
							livesmin: 1,
							visibility: 10
							};
					enemy.length=1; //initial enemy
					for(i=0;i<1;i++)//connection between enemy and i
					{
						 updategamedata();
						 enemy[i]=gamedata.enemyinfo;//initial data
						 enemy[i].enshoot=[gamedata.enemyinfo.enshootinfo];
						 enemy[i].x=bar[rand(5)-1].x+75*a/1000;
						 enemy[i].y=b/2;
					}
					arrbim.length=0;//clear everything and then construct the right one
					for(i=0;i<5;i++)
					 {
						 updategamedata();
						 arrbim[i]={
							 im:gamedata.biminfo.im,
							 x:i*a,
							 xdelta: 6.5
						 }
					 }
					 gamestart=true;//start the game
				 }
				 else if(d>=a/2.5 && d<=a/2.5+a/5 && e>=150*a/1000+a/5 && e<=150*a/1000+a/5+a/10)
				 {
					 bossstart=0;
					 ispaused=false;
					 level=2;
					 updategamedata();
					 hero=gamedata.hero;
					 boss=gamedata.boss;
					 hero.x=0;
					 hero.y=b/3;
					 hero.lives=20;
					 bosslives=5;
					 bosslives1=5;
					 originallives=bosslives;
					 bar.length=7;//this is the difference
					 for(i=0;i<7;i++)
						 bar[i]={
						im		: arr[rand(4)],
						x		: (a/5)*(i+7),
						y		: rand(b-b/8),
						xdelta	: 6.5,
						livesmin: 1,
						visibility: 10
						};
	/*like in the first case, here for a=1000 we get 1400, 1600, ... , 2600;
	when the first one reaches the 0 point, the last one is 1200, so the next one should be 1400,
	which is a+2*a/5*/	
						
					enemy.length=1;
					for(i=0;i<1;i++)
					{
						 updategamedata();
						 enemy[i]=gamedata.enemyinfo;
						 enemy[i].enshoot=[gamedata.enemyinfo.enshootinfo];
						 enemy[i].x=bar[rand(5)-1].x+75*a/1000;
						 enemy[i].y=b/2;
					}
					arrbim.length=0;
					for(i=0;i<5;i++)
					 {
						 updategamedata();
						 arrbim[i]={
							 im:gamedata.biminfo.im,
							 x:i*a,
							 xdelta: 6.5
						 }
					 }
					 gamestart=true;
				 }
				 else if(d>=a/2.5 && d<=a/2.5+a/5 && e>=150*a/1000+a/5+a/10 && e<=150*a/1000+a/5+a/10+a/10)
				 {
					 bossstart=0;
					 ispaused=false;
					 level=3;
					 updategamedata();
					 hero=gamedata.hero;
					 boss=gamedata.boss;
					 hero.x=0;
					 hero.y=b/3;
					 hero.lives=20;
					 bosslives=5;
					 bosslives1=5;
					 originallives=bosslives;
					 arrwallsceiling.length=0;//clear all grounds and ceilings
					 arrwallsground.length=0;
					 buildingsground.length=0;
					 buildingsceiling.length=0;
					 for(i=0;i<9;i++)//rebuild them properly
					 {
						 updategamedata();
						 buildingsground[i]=gamedata.buildingsground;
						 buildingsceiling[i]=gamedata.buildingsceiling;
					 }
					 for(i=0;i<10;i++)
					 {
						 updategamedata();
						 arrwallsceiling[i]=gamedata.wallsceiling;
					 }
					 for(i=0;i<10;i++)
					 {
						 updategamedata();
						 arrwallsground[i]=gamedata.wallsground;
					 }
					 bar.length=5;
					 for(i=0;i<5;i++)
						bar[i]={
							im		: arr[rand(4)],
							x		: (3*a/10)*(i+4),
							y		: b/4+rand(5*b/12),
							xdelta	: 6.5,
							livesmin: 1,
							visibility: 10
							};
					enemy.length=1;
					for(i=0;i<1;i++)
					{
						 updategamedata();
						 enemy[i]=gamedata.enemyinfo;
						 enemy[i].enshoot=[gamedata.enemyinfo.enshootinfo];
						 enemy[i].x=bar[rand(5)-1].x+75*a/1000;
						 enemy[i].y=b/2;
					}
					arrbim.length=0;
					 for(i=0;i<5;i++)
					 {
						 updategamedata();
						 arrbim[i]={
							 im:gamedata.biminfo.im,
							 x:i*a,
							 xdelta: 6.5
						 }
					 }
					 gamestart=true;
				 }
				 
			 }
		 }, false)
		 
	 }
	 if(ispaused===false && gamestart===true)//this is the case when we actually play
	 {
		 updategamedata();
		 updatebim();
		 updatehero();
		 updatebar();
		 updateweapon();
		 updateenemy1();
		 updateenemyshoot();
		 updateboss();
		 updatebossshoot();
		 
		 if(level===3)
		 {
			 updatebuildings();
			 updatewallsceiling();
			 updatewallsground();			 
		 }
		 
		 draw();
		 drawlives();
		 context.drawImage(botton, 0, 0, a/30, a/30);//left botton
		 document.addEventListener("click", function(evt){
				 const d=evt.offsetX;
				 const e=evt.offsetY;
				 if(d>=0 && d<=a/30 && e>=0 && e<=a/30)
				 {
	//if we press the button, "resume" and "main menu" appear
					 ispaused=true;
					 context.drawImage(resume, a/2.5, 200*a/1000, a/5, a/10);
					 context.drawImage(menu, a/2.5, 200*a/1000+a/8, a/5, a/10);
					 document.addEventListener("click", function(evt){
						 const u=evt.offsetX;
						 const v=evt.offsetY;
						 if(u>=a/2.5 && u<=a/2.5+a/5 && v>=200*a/1000 && v<=200*a/1000+a/10)
							 ispaused=false; //if we press "resume", the game is again not paused
						 else if(u>=a/2.5 && u<=a/2.5+a/5 && v>=200*a/1000+a/8 && v<=200*a/1000+a/8+a/10)
							 gamestart=false;//if we press "main menu", we go to main menu and as I have mentioned there all starts again
						 }, false);
				 }
			 }, false);
			 
		 
		 if(hero.lives===0)//if we have lost
		 {
			 ispaused=true;//the game is on pause and two two things are drawn 
			 context.drawImage(gameover, 0, 0, a, b);
			 context.drawImage(exit, a/2.2, 200*a/1000, a/10, a/20);
			 document.addEventListener("click", function(evt){
			 if(gamestart===true)//in order to evade multiple clicking
			 {
				 const d=evt.offsetX;
				 const e=evt.offsetY;
				 if(d>=a/2.2 && d<=a/2.2+a/10 && e>=200*a/1000 && e<=200*a/1000+a/20)
				 {
					 gamestart=false;
					 hero.lives=20;
				 }
			 }
			 }, false);
		 }
		 else if(level===1 && bosslives+bosslives1===0)
		 {//from the first level to the second
			 updategamedata();
			 for(i=0;i<7;i++)//new barriers
				bar[i]={
				im		: arr[rand(4)],
				x		: (a/5)*(i+7),
				y		: rand(b-b/8),
				xdelta	: 6.5,
				livesmin: 1,
				visibility: 10
				};
			 isboss=false;
			 bosslives=5;
			 bosslives1=5;
			 hero.lives=20;
			 bossstart=0;
			 level=2;
			 changelevel=true;//for background images above
			 updategamedata();
			 boss=gamedata.boss;
			 ispaused=true;//it pauses
			 isnextlevel=true;//to draw the "next level" button
			 originallives=bosslives;
		 } 
		 else if(level===2 && bosslives+bosslives1===0)
		 {//from the second level to the third
			 updategamedata();
			 bar.length=5;//the previous one had 7 barriers
			 for(i=0;i<5;i++)
				bar[i]={
					im		: arr[rand(4)],
					x		: (3*a/10)*(i+4),
					y		: b/4+rand(5*b/12),
					xdelta	: 6.5,
					livesmin: 1,
					visibility: 10
					};
			 isboss=false;
			 bosslives=5;
			 bosslives1=5;
			 hero.lives=20;
			 bossstart=0;
			 level=3;
			 changelevel=true;
			 updategamedata();
			 boss=gamedata.boss;
			 ispaused=true;
			 isnextlevel=true;
			 originallives=bosslives;
		 }
		 else if(level===3 && bosslives+bosslives1===0)//you have won nigger
		 {
			 ispaused=true;
			 context.drawImage(congrat, 0, 0, a, b);
			 context.drawImage(menu, a/2.5, b/1.5, a/5, a/10);//a chance to go to main menu
			 document.addEventListener("click", function(evt){
				 const d=evt.offsetX;
				 const e=evt.offsetY;
				 if(d>=a/2.5 && d<=a/2.5+a/5 && e>=b/1.5 && e<=b/1.5+a/10)
				 {
					 gamestart=false;
				 }
			 }, false);
		 }
	 }
	 
	 else if(ispaused===true && gamestart===true && isnextlevel===true)
	 {//we go from one level to another
		 context.drawImage(nextlevel, 300*a/1000, 200*a/1000, 400*a/1000, 200*a/1000);
		 document.addEventListener("click", function(evt){
			 const d=evt.offsetX;
			 const e=evt.offsetY;
			 if(d>=300*a/1000 && d<=700*a/1000 && e>=200*a/1000 && e<=400*a/1000)
			 {
				 ispaused=false;
				 isnextlevel=false;
			 }
		 }, false)
	 }
	 requestAnimationFrame(loop);//animation
 }
 loop();
