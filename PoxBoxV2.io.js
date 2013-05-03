PoxBoxV2 = function(io){

	//set canvas color
	io.setBGColor('#424242');

	//turns on Debug Console
	io.activateDebugger();

	/*	BUG-REPORT
	1. Drag function in the positive directions is a bit janky
	*/
	
	//Variable declartion
	var boxX = 0; //Box x & y velocities
	var boxY = 0; 

	var topSpeed = 10; //Top speed of Player

	var speedInc = .5; //Rate velocity increments

	var dragForce = .5; //Rate of velocity decrement - for now make sure it divides int speedinc evenly

	var boundary = -62; //Border offset

	var spacePushed = false; //Input switches
	var leftPushed = false;
	var downPushed = false;
	var rightPushed = false;
	var upPushed = false;

	var moveKeyPressed = false; //Makes the drag only active when a key is not pressed

	var spaceTick = 15; //Counter for canSpaceAction function
	var spaceTimer = 120; //Length of canSpaceAction function

	//Spawn box playerBox
	var playerBox = new iio.ioRect(io.canvas.center.x,io.canvas.center.y, 25)
		.enableKinematics()
		.setVel(boxX,boxY)
		.setFillStyle('black')
		.setStrokeStyle('');

	//Add box to io manager
	io.addToGroup('player', playerBox);

	//debug text creation
	var debugText1 = new iio.ioText('variable debug',500,15)	//boxX debug text
	    .setStrokeStyle('blue');
	    debugText1.font ='30px';
	io.addToGroup('text', debugText1);
	var debugText2 = new iio.ioText('variable debug',500,35)	//boxY debug text
	    .setStrokeStyle('blue');
	    debugText2.font ='30px';
	io.addToGroup('text', debugText2);
	var debugText3 = new iio.ioText('variable debug',500,55)	//space debug text
	    .setStrokeStyle('red');
	    debugText3.font ='30px';
	io.addToGroup('text', debugText3);
	var debugText4 = new iio.ioText('variable debug',500,75)	//left debug text
	    .setStrokeStyle('red');
	    debugText4.font ='30px';
	io.addToGroup('text', debugText4); 
	var debugText5 = new iio.ioText('variable debug',500,95)	//down debug text
	    .setStrokeStyle('red');
	    debugText5.font ='30px';
	io.addToGroup('text', debugText5);
	var debugText6 = new iio.ioText('variable debug',500,115)	//right debug text
	    .setStrokeStyle('red');
	    debugText6.font ='30px';
	io.addToGroup('text', debugText6);
	var debugText7 = new iio.ioText('variable debug',500,135)	//up debug text
	    .setStrokeStyle('red');
	    debugText7.font ='30px';;
	io.addToGroup('text', debugText7);
	var debugText8 = new iio.ioText('variable debug',500,155)	//space tick debug text
	    .setStrokeStyle('green');
	    debugText8.font ='30px';
	io.addToGroup('text', debugText8);
	var debugText9 = new iio.ioText('variable debug',500,175)	//can push space debug text
	    .setStrokeStyle('red');
	    debugText9.font ='30px';
	io.addToGroup('text', debugText9);
	var debugText10 = new iio.ioText('variable debug',500,195)	//can move test debug text
	    .setStrokeStyle('red');
	    debugText9.font ='30px';
	io.addToGroup('text', debugText10);

	//test if action bound to space can fire
	function canSpaceAction(){
		if(spaceTick<spaceTimer)
			return false;
		if (spaceTick>spaceTimer) {
			return true;
		};
	}

	//change bg color
	function colorChange(){
		io.setBGColor('#'+iio.getRandomInt(0,9)+iio.getRandomInt(0,9)+iio.getRandomInt(0,9)+iio.getRandomInt(0,9)+iio.getRandomInt(0,9)+iio.getRandomInt(0,9));
	}

	function moveKeyPressedReleaseTest(){
		if(upPushed||downPushed||leftPushed||rightPushed)
			return true;
		else
			return false;
	}

	//game loop
	function gameLoop(){
		//update box speed
		playerBox.setVel(boxX,boxY);

		//Uses input Switches to increase Box Velocity 
		if (upPushed&&!downPushed){ //up
			if(boxY>-topSpeed)
				boxY -= speedInc; 	
		}
		if (!upPushed&&downPushed){ //down
			if(boxY<topSpeed)
				boxY += speedInc; 	
		}
		if (!leftPushed&&rightPushed){ //right
			if(boxX<topSpeed)
				boxX += speedInc; 	
		}
		if (leftPushed&&!rightPushed){ //left
			if(boxX>-topSpeed)
				boxX -= speedInc;	
		}

		//Spacebar action
		if(spacePushed){
			if(canSpaceAction()){
				colorChange();
				spaceTick = 0;
			}
		};

		//Simulate drag
		if(!moveKeyPressed){
			if (boxX !=0 ||boxY != 0){
				if(boxX<0)
					boxX+=dragForce;
				if(boxX>0)
					boxX-=dragForce;
				if(boxY<0)
					boxY+=dragForce;
				if(boxY>0)
					boxY-=dragForce;
			}
		}

		//Key Listener for arrows WASD and space
		window.addEventListener('keydown', function(event){
			 
			if (iio.keyCodeIs('up arrow', event)||iio.keyCodeIs('w', event)){
					upPushed = true;
					moveKeyPressed = true;
				}

			if (iio.keyCodeIs('right arrow', event)||iio.keyCodeIs('d', event)){
					rightPushed = true;
					moveKeyPressed = true;
			 	}

			if (iio.keyCodeIs('down arrow', event)||iio.keyCodeIs('s', event)){
					downPushed = true;
					moveKeyPressed = true;
				}

			if (iio.keyCodeIs('left arrow', event)||iio.keyCodeIs('a', event)){
					leftPushed = true;
					moveKeyPressed = true;
				}	

			if (iio.keyCodeIs('space', event))
				spacePushed = true;
		});

		window.addEventListener('keyup', function(event){
			 
			if (iio.keyCodeIs('up arrow', event)||iio.keyCodeIs('w', event)){
					upPushed = false;
					moveKeyPressed = moveKeyPressedReleaseTest();
			 	}

			if (iio.keyCodeIs('right arrow', event)||iio.keyCodeIs('d', event)){
					rightPushed = false;
					moveKeyPressed = moveKeyPressedReleaseTest();
			 	}

			if (iio.keyCodeIs('down arrow', event)||iio.keyCodeIs('s', event)){
					downPushed = false;
					moveKeyPressed = moveKeyPressedReleaseTest();
			 	}

			if (iio.keyCodeIs('left arrow', event)||iio.keyCodeIs('a', event)){
					leftPushed = false;
					moveKeyPressed = moveKeyPressedReleaseTest();
				}

			if (iio.keyCodeIs('space', event))
				spacePushed = false;
		});

		
	}

	//increment timers
	function timerIncrement(){
		spaceTick++;
	}

	function debugUpdate(){
		debugText1.text = 'boxX = ' + boxX.toString();
		debugText2.text = 'boxY = ' + boxY.toString();
		debugText3.text = 'spacePushed = ' + spacePushed.toString();
		debugText4.text = 'leftPushed = ' + leftPushed.toString();
		debugText5.text = 'downPushed = ' + downPushed.toString();
		debugText6.text = 'rightPushed = ' + rightPushed.toString();
		debugText7.text = 'upPushed = ' + upPushed.toString();
		debugText8.text = 'spaceTick = ' + spaceTick.toString();
		debugText9.text = 'moveKeyPressed = ' + moveKeyPressed.toString();
	}

	//Set update time in ms and call gameloop
	io.setFramerate(60,function(){
		gameLoop();
		timerIncrement();
		debugUpdate();
	}

)};