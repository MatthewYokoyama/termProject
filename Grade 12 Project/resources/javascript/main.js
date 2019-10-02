  ///////////////////////////////////
 //////SET DOCUMENT PARAMETERS//////
///////////////////////////////////

document.getElementById('view').style.cursor = 'none';


  /////////////////////
 //////RESOURCES//////
/////////////////////

var abilitySounds = [];

//Ability0
for (var i = 0; i < 1; ++i) {
	var sfx = new Audio();
	sfx.src = 'resources/assets/sounds/player/ability0/' + i + '.ogg';

	abilitySounds.push(sfx);
}

//Ability1
for (var i = 0; i < 1; ++i) {
	var sfx = new Audio();
	sfx.src = 'resources/assets/sounds/player/ability1/' + i + '.ogg';

	abilitySounds.push(sfx);
}

var playerResources = [];

for (var i = 0; i < 6; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/player/playerSprites/' + i + '.png';

	playerResources.push(img);
}

var abilityResources = [];

for (var i = 0; i < 1; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/player/ability0/' + i + '.png';

	abilityResources.push(img);
}

var userInterfaceResources = [];

for (var i = 0; i < 6; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/userinterface/' + i + '.png';

	userInterfaceResources.push(img);
}

var startScreenResources = [];

for (var i = 0; i < 4; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/userinterface/startScreen/' + i + '.png';

	startScreenResources.push(img);
}

var sceneryResources = [];

for (var i = 0; i < 1; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/environment/' + i + '.png';

	sceneryResources.push(img);
}

var backdropResources = [];

for (var i = 0; i < 3; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/environment/backdrops/' + i + '.png';

	backdropResources.push(img);
}

var enemy0Resources = [];

for (var i = 0; i < 2; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/enemy/enemy0/' + i + '.png';

	enemy0Resources.push(img);
}

var enemy0Sounds = [];

for (var i = 0; i < 2; ++i) {
	var sfx = new Audio();
	sfx.src = 'resources/assets/sounds/enemy/enemy0/' + i + '.ogg';

	enemy0Sounds.push(sfx);
}

var enemy1Resources = [];

for (var i = 0; i < 2; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/enemy/enemy1/' + i + '.png';

	enemy1Resources.push(img);
}

var enemy1ProjectileResources = [];

for (var i = 0; i < 1; ++i) {
	img = new Image();
	img.src = 'resources/assets/textures/enemy/enemy1/projectile/' + i + '.png';

	enemy1ProjectileResources.push(img);
}

	///////////////////////////////
 ///////GLOBAL PARAMETERS///////
///////////////////////////////

//Physics variables
var physicsParameters = {
	gravity: 0.4
};

//Render variables
var renderParameters = {
	windowWidth: 1920,
	windowHeight: 1080,
	xOffset: 0,
	yOffset: -40,
	xScale: 1,
	yScale: 1,
	//Game loop frequency in (Hz)
	gameSpeed: 120,
	pause: false,
};

var cursorParameters = {
	x: 0,
	y: 0,
	angle: 0,
	mouseDown1: false,
	mouseDown2: false,
	mouseDown3: false,
	click: true
};

  /////////////////////////
 //////PLAYER OBJECT//////
/////////////////////////


var player = {
	//HEIGHT AND WIDTH VALUES MUST BE A MULTIPLE OF 40
	height: 160,
	width: 80,
	x: 0,
	y: 0,
	xVelocity: 0,
	yVelocity: 0,
	xAcceleration: 0.7,
	xVelocityMax: 12,
	slope: 0,
	slopeMax: 3,
	jump: false,
	jumpWall: false,
	jumpHeight: 15,
	jumpTapRight: false,
	jumpTapLeft: false,
	collision: false,
	health: 100,
	attackDamage: 10,
	damageToPlayer: [],
	direction: 0,
	state: 0,

	//player functions
	move: function() {
		//Get input data
		keystrokelistener.logKeystrokes();

		//yVelocity calculations
		if (keystrokelistener.w === true || keystrokelistener.space === true) {
			if (player.jump === false) {
				player.yVelocity = -player.jumpHeight;
				player.jump = true;
			}
		}

		//xVelocity calculations
		if (keystrokelistener.d === false || player.yVelocity > -player.jumpHeight / 5) {
			player.jumpTapRight = false;
		}
		if (keystrokelistener.a === false || player.yVelocity > -player.jumpHeight / 5) {
			player.jumpTapLeft = false;
		}


		if (keystrokelistener.d === true || keystrokelistener.a === true) {
			if (keystrokelistener.d === true && keystrokelistener.a === false) {

				if (player.jump === false) {
					if (player.xVelocity < 0) {
						player.xVelocity = player.xVelocity / 1.5;
					}
					if (player.xVelocity < player.xVelocityMax) {
						player.xVelocity = player.xVelocity + player.xAcceleration;
					}
				} else if (player.jump === true && player.jumpTapRight === false) {
					if (player.xVelocity < player.xVelocityMax) {
						player.xVelocity = player.xVelocity + player.xAcceleration / 2;
					}
				}
			}
			if (keystrokelistener.d === false && keystrokelistener.a === true) {

				if (player.jump === false) {
					if (player.xVelocity > 0) {
						player.xVelocity = player.xVelocity / 1.5;
					}
					if (player.xVelocity > -player.xVelocityMax) {
						player.xVelocity = player.xVelocity - player.xAcceleration;
					}
				} else if (player.jump === true && player.jumpTapLeft === false) {
					if (player.xVelocity > -player.xVelocityMax) {
						player.xVelocity = player.xVelocity - player.xAcceleration / 2;
					}
				}
			}
		} else if (player.jump === false) {
			player.xVelocity = player.xVelocity / 1.6;
		} else if (player.jump === true) {
			player.xVelocity = player.xVelocity / 1.05;
		}


  //////////////////////////////////////
 //////MOVE AND HANDLE COLLISIONS//////
//////////////////////////////////////

		//Move along x-axis
		for (var i = 0; i < Math.round(Math.abs(player.xVelocity)); i = i + 1) {
			if (Math.round(player.xVelocity > 0)) {
				player.x = player.x + 1;
				player.direction = 0;

				if (player.collisionCheck() === true) {

					//Test for walking up slope
					player.slope = 0;

					while (player.slope < player.slopeMax && player.collisionCheck() === true) {
						player.y = player.y - 1;
						player.slope = player.slope + 1;
					}
					if (player.slope == player.slopeMax) {
						player.y = player.y + player.slopeMax;
						player.x = player.x - 1;
						player.xVelocity = 0;

						if (player.jump === true) {
							if (keystrokelistener.w === false && keystrokelistener.space === false) {
								player.jumpWall = true;
							}
						}
						if (player.jumpWall === true) {
							//Wall sliding
							if (keystrokelistener.d === true && player.yVelocity > 0) {
								player.yVelocity = 2;
							}

							if (keystrokelistener.w === true || keystrokelistener.space === true) {
								player.x = player.x - 1;
								player.jumpWall = false;
								player.jumpTapRight = true;

								if (player.collisionCheck() == false) {
									player.xVelocity = -player.xVelocityMax;
									player.yVelocity = -player.jumpHeight;
								}
								player.x = player.x + 1;
							}
						}
					}
				}
			}
			if (Math.round(player.xVelocity < 0)) {
				player.x = player.x - 1;
				player.direction = 1;

				if (player.collisionCheck() === true) {

					//Test for walking up slope
					player.slope = 0;

					while (player.slope < player.slopeMax && player.collisionCheck() === true) {
						player.y = player.y - 1;
						player.slope = player.slope + 1;
					}
					if (player.slope == player.slopeMax) {
						player.y = player.y + player.slopeMax;
						player.x = player.x + 1;
						player.xVelocity = 0;

						if (player.jump === true) {
							if (keystrokelistener.w === false && keystrokelistener.space === false) {
								player.jumpWall = true;
							}
						}
						if (player.jumpWall === true) {
							//Wall sliding
							if (keystrokelistener.a === true && player.yVelocity > 0) {
								player.yVelocity = 2;
							}

							if (keystrokelistener.w === true || keystrokelistener.space === true) {
								player.x = player.x + 1;
								player.jumpWall = false;
								player.jumpTapLeft = true;

								if (player.collisionCheck() == false) {
									player.xVelocity = player.xVelocityMax;
									player.yVelocity = -player.jumpHeight;
								}
								player.x = player.x - 1;
							}
						}
					}
				}
			}
		}


		//Test for jump
		if (player.jump === false) {
			player.y = player.y + 1;
			player.jumpWall = false;

			if (player.collisionCheck() === true) {
				player.y = player.y - 1;
			} else {
				player.jump = true;
			}

			player.jumpTapRight = false;
			player.jumpTapLeft = false;
		}

		//Handle jump
		if (player.jump === true) {
			player.yVelocity = player.yVelocity + physicsParameters.gravity;

			for (var i = 0; i <= Math.round(Math.abs(player.yVelocity)); i = i + 1) {
				if (player.yVelocity > 0) {
					player.y = player.y + 1;
					if (player.collisionCheck() === true) {
						player.jump = false;
						player.y = player.y - 1;
						player.yVelocity = 0;
					}
				}
				if (player.yVelocity < 0) {
					player.y = player.y - 1;
					if (player.collisionCheck() === true) {
						player.y = player.y + 1;
						player.yVelocity = 0;
					}
				}
			}
		}
		//yPosition handler

		player.collisionCheck();
	},
	collisionCheck: function() {
		player.collision = false;

		for (var i = 0; i <= (player.width / map.tileWidth + 1) * (player.height / map.tileHeight + 1) - 1; i = i + 1) {
			var tileCheck = ((player.x - player.x % map.tileWidth) / map.tileWidth) + ((player.y - player.y % map.tileHeight) / map.tileHeight * map.tileMapWidth) + (i % (player.width / map.tileWidth + 1)) + (map.tileMapWidth * (i - i % (player.width / map.tileWidth + 1)) / (player.width / map.tileWidth + 1));
			if (map.tileMap[tileCheck] != 0) {
				if (player.x + player.width > tileCheck % map.tileMapWidth * map.tileWidth && player.x < tileCheck % map.tileMapWidth * map.tileWidth + map.tileWidth && player.y + player.height > (tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight) {
					if (map.tileMap[tileCheck] == 1) {
						player.collision = true;
					} else if (map.tileMap[tileCheck] == 2) {
						if (((player.x + player.width) - tileCheck % map.tileMapWidth * map.tileWidth) - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (player.y + player.height)) > 0) {
							player.collision = true;
						}
					} else if (map.tileMap[tileCheck] == 3) {
						if ((-(player.x - tileCheck % map.tileMapWidth * map.tileWidth - map.tileWidth)) - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (player.y + player.height)) > 0) {
							player.collision = true;
						}
					} else if (map.tileMap[tileCheck] == 4) {
						if (((player.x + player.width) - tileCheck % map.tileMapWidth * map.tileWidth) - (map.tileHeight - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (player.y))) > 0) {
							player.collision = true;
						}
					} else if (map.tileMap[tileCheck] == 5) {
						if ((-(player.x - tileCheck % map.tileMapWidth * map.tileWidth - map.tileWidth)) - (map.tileHeight - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (player.y))) > 0) {
							player.collision = true;
						}
					}
				}
			}
		}
		return player.collision;
	},
	collisionCheckBlock: function() {
		for (var i = 0; i <= (player.width / map.tileWidth + 1) * (player.height / map.tileHeight) - 1; i = i + 1) {
			var tileCheck = ((player.x - player.x % map.tileWidth) / map.tileWidth) + ((player.y - player.y % map.tileHeight) / map.tileHeight * map.tileMapWidth) + (i % (player.width / map.tileWidth + 1)) + (map.tileMapWidth * (i - i % (player.width / map.tileWidth + 1)) / (player.width / map.tileWidth + 1));
			if (map.tileMap[tileCheck] != 0) {
				if (map.tileMap[tileCheck] == 6) {
					if ((-(player.x - tileCheck % map.tileMapWidth * map.tileWidth - map.tileWidth)) - (map.tileHeight - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (player.y))) > 0) {

						//Pauses the game for stage transition
						renderParameters.pause = true;

					}
				} else if (map.tileMap[tileCheck] == 10) {
					if ((-(player.x - tileCheck % map.tileMapWidth * map.tileWidth - map.tileWidth)) - (map.tileHeight - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (player.y))) > 0) {

						//Damages Player
						player.damageToPlayer.push(-0.1);
						player.damageToPlayer.push(0);

					}
				}
			}
		}
	},

	//Ability cool down Data
	coolDown0Ticker: 0,
	coolDown0: 25,
	ability0KeyTap: false,

	ability0: function() {
		//Decrease cooldown timer
		if (player.coolDown0Ticker > 0) {
			player.coolDown0Ticker = player.coolDown0Ticker - 1;
		}

		if (cursorParameters.mouseDown1 === false) {
			player.ability0KeyTap = true;
		} else if (cursorParameters.mouseDown1 === true && player.coolDown0Ticker <= 0) {
			player.ability0KeyTap = false;
			bullets.push(new Bullet(player.x, player.y, cursorParameters.angle, 45 * -Math.cos(cursorParameters.angle) + player.xVelocity, 45 * -Math.sin(cursorParameters.angle) + player.yVelocity, true, false, player.width / 2, player.height / 3, 20, 0));

			//Sound effect
			const newAudio = abilitySounds[0].cloneNode();
			newAudio.play();

			player.coolDown0Ticker = player.coolDown0;
		}
	},

	//Ability cool down Data
	coolDown1Ticker: 0,
	coolDown1: 500,
	ability1KeyTap: false,

	active1State: false,
	active1Ticker: 0,
	active1Time: 100,

	ability1Range: 1000,

	enemyDistance: [],
	enemyDistanceSort: [],
	enemyTargetNumber: 6,
	enemyTarget: [],
	targetIDs: [],

	projectileCounter: 0,

	ability1: function() {

		player.enemyDistance = [];
		player.enemyDistanceSort = [];
		player.enemyTarget = [];

		for (var i = 0; i < enemyCollisionBoxes.length / 4; i = i + 1) {

			//Get distances
			player.enemyDistance.push(Math.hypot(((enemyCollisionBoxes[i * 4] + enemyCollisionBoxes[i * 4 + 2]) - (player.x + player.width / 2)), ((enemyCollisionBoxes[i * 4 + 1] + enemyCollisionBoxes[i * 4 + 3]) - (player.y + player.height / 2))));
			player.enemyDistanceSort.push(Math.hypot(((enemyCollisionBoxes[i * 4] + enemyCollisionBoxes[i * 4 + 2]) - (player.x + player.width / 2)), ((enemyCollisionBoxes[i * 4 + 1] + enemyCollisionBoxes[i * 4 + 3]) - (player.y + player.height / 2))));

		}

		//Sort one array
		player.enemyDistanceSort.sort(function(a, b){return a - b});

		for (var i = 0; i < player.enemyTargetNumber; i = i + 1) {

			for (var n = 0; n < player.enemyDistance.length; n = n + 1) {

				if (player.enemyDistance[n] === player.enemyDistanceSort[i] && player.enemyDistanceSort[i] < player.ability1Range + 100) {
					player.enemyTarget.push(n);

					n = player.enemyDistance.length + 1;
				}

			}

		}

		//Ensure that enemy target array is full for maximum damage
		if (player.enemyTarget.length >= 1) {

			while (player.enemyTarget.length < player.enemyTargetNumber) {

				player.enemyTarget.push(player.enemyTarget[0]);

			}

		}


		//Execute ability if conditions allow

		//Decrease cooldown timer
		if (player.coolDown1Ticker > 0 && player.active1State === false) {
			player.coolDown1Ticker = player.coolDown1Ticker - 1;
		}

		if (cursorParameters.mouseDown3 === false) {
			player.ability1KeyTap = true;
		} else if (cursorParameters.mouseDown3 === true && player.coolDown1Ticker <= 0 && player.enemyTarget.length != 0 && player.active1State === false && player.ability1KeyTap === true) {

			player.ability1KeyTap = false;
			player.active1State = true;

			player.active1Ticker = 0;
			player.projectileCounter = 0;
			player.coolDown1Ticker = player.coolDown1;

		}

		if (player.active1State === true) {


			if (player.projectileCounter * Math.floor(player.active1Time / player.enemyTargetNumber) == player.active1Ticker) {

				if (player.projectileCounter < player.enemyTargetNumber && player.enemyTarget.length != 0) {

					enemies[player.enemyTarget[player.projectileCounter]].targetID.push(player.targetIDs.length);

					missiles.push(new Missile(player.x, player.y, 10 * -Math.cos(cursorParameters.angle) + player.xVelocity, 10 * -Math.sin(cursorParameters.angle) + player.yVelocity, 40, (cursorParameters.angle - Math.PI / 2 + Math.PI * Math.random()), player.targetIDs.length));

					player.targetIDs.push(player.targetIDs.length);

					//Sound effects
					const newAudio = abilitySounds[1].cloneNode();
					newAudio.play();

				}

				player.projectileCounter = player.projectileCounter + 1;
			}

			player.active1Ticker = player.active1Ticker + 1;

			if (player.active1Ticker >= player.active1Time) {

				player.active1State = false;
				player.active1Ticker = 0;
			}
		}
	},

	//Ability cool down Data
	coolDown2Ticker: 0,
	coolDown2: 100,
	ability2KeyTap: false,

	ability2: function() {

	},
	takeDamage: function() {
		for (var i = 0; i < player.damageToPlayer.length / 2; i = i + 1) {
			player.health = player.health + player.damageToPlayer[i * 2];
			player.xVelocity = player.xVelocity + player.damageToPlayer[i * 2 + 1];
		}
		if (player.health < 0) {
			player.health = 0;
		}
		player.damageToPlayer = [];
	},
	determineState: function() {

		if (player.direction === 0) {
			if (player.jump === false) {
				player.state = 0;
			}
			if (player.jump === true) {
				//Test for wall slide

				player.x = player.x + 1;

				if (player.collisionCheck() === true && keystrokelistener.d === true && player.yVelocity > 1) {
					player.state = 2;
				} else {

					player.state = 0;

					if (player.yVelocity > 20) {
						player.state = 4;
					}
				}

				player.x = player.x - 1;

			}
		}

		if (player.direction === 1) {
			if (player.jump === false) {
				player.state = 1;
			}
			if (player.jump === true) {
				//Test for wall slide

				player.x = player.x - 1;

				if (player.collisionCheck() === true && keystrokelistener.a === true && player.yVelocity > 1) {
					player.state = 3;
				} else {
					player.state = 1;

					if  (player.yVelocity > 20) {
						player.state = 5;
					}
				}

				player.x = player.x + 1;

			}
		}
	},
	animate: function() {

	},
	render: function() {
		ctx.beginPath();

		if (player.state == 0) {
			ctx.drawImage(playerResources[0], renderParameters.windowWidth + renderParameters.xOffset, renderParameters.windowHeight + renderParameters.yOffset, player.width * renderParameters.xScale, player.height * renderParameters.yScale);
		}
		if (player.state == 1) {
			ctx.drawImage(playerResources[1], renderParameters.windowWidth + renderParameters.xOffset, renderParameters.windowHeight + renderParameters.yOffset, player.width * renderParameters.xScale, player.height * renderParameters.yScale);
		}
		if (player.state == 2) {
			ctx.drawImage(playerResources[2], renderParameters.windowWidth + renderParameters.xOffset, renderParameters.windowHeight + renderParameters.yOffset, player.width * renderParameters.xScale, player.height * renderParameters.yScale);
		}
		if (player.state == 3) {
			ctx.drawImage(playerResources[3], renderParameters.windowWidth + renderParameters.xOffset, renderParameters.windowHeight + renderParameters.yOffset, player.width * renderParameters.xScale, player.height * renderParameters.yScale);
		}
		if (player.state == 4) {
			ctx.drawImage(playerResources[4], renderParameters.windowWidth + renderParameters.xOffset, renderParameters.windowHeight + renderParameters.yOffset, player.width * renderParameters.xScale, player.height * renderParameters.yScale);
		}
		if (player.state == 5) {
			ctx.drawImage(playerResources[5], renderParameters.windowWidth + renderParameters.xOffset, renderParameters.windowHeight + renderParameters.yOffset, player.width * renderParameters.xScale, player.height * renderParameters.yScale);
		}


		if (player.active1Ticker != 0 || cursorParameters.mouseDown3 === true) {
			ctx.arc(renderParameters.windowWidth + renderParameters.xOffset + player.width / 2, renderParameters.windowHeight + renderParameters.yOffset + player.height / 2, player.ability1Range, 0, 2 * Math.PI);
			ctx.lineWidth = 12;
			ctx.strokeStyle = '#081100';
			ctx.stroke();

			ctx.lineWidth = 5;
			ctx.strokeStyle = '#6fb032';
			ctx.stroke();
		}

		ctx.closePath();
	}
};


  //////////////////////
 //////MAP OBJECT//////
//////////////////////

var map = {
	tileMap: [],
	tileMapWidth: 0,
	tileWidth: 40,
	tileHeight: 40,
	level: 0,
	generateMap: function() {
		map.tileMap = [];
		enemies = [];

		var genc = document.getElementById('Canvas');
		var genctx = genc.getContext('2d');

		genctx.clearRect(0, 0, genc.width, genc.height);

		var img = document.getElementById(map.level);
		var imgHeight = document.getElementById(map.level).height;
		var imgWidth = document.getElementById(map.level).width;

		map.tileMapWidth = imgWidth;

		genc.style.height = String(imgHeight + 'px');
		genc.style.width = String(imgWidth + 'px');

		genctx.drawImage(img, 0, 0);
		var imgData = genctx.getImageData(0, 0, genc.width, genc.height);

		for (var i = 0; i < imgData.data.length; i += 4) {
				if (imgData.data[i+3] > 0 && imgData.data[i] == 0 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0) {
						map.tileMap.push(1);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] > 0 && imgData.data[i] <= 60 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0) {
						map.tileMap.push(2);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] > 60 && imgData.data[i] <= 120 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0) {
						map.tileMap.push(3);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] > 120 && imgData.data[i] <= 180 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0) {
						map.tileMap.push(4);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] > 180 && imgData.data[i] <= 240 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0) {
						map.tileMap.push(5);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] == 0 && imgData.data[i + 1] > 120 && imgData.data[i + 1] <= 180 && imgData.data[i + 2] == 0) {
						map.tileMap.push(6);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] == 0 && imgData.data[i + 1] > 180 && imgData.data[i + 1] <= 240 && imgData.data[i + 2] == 0) {
						map.tileMap.push(7);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] == 0 && imgData.data[i + 1] == 0 && imgData.data[i + 2] > 0 && imgData.data[i + 2] <= 60) {
						map.tileMap.push(8);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] == 0 && imgData.data[i + 1] == 0 && imgData.data[i + 2] > 60 && imgData.data[i + 2] <= 120) {
						map.tileMap.push(9);
				} else if (imgData.data[i+3] > 0 && imgData.data[i] == 255 && imgData.data[i + 1] > 0 && imgData.data[i + 1] < 30 && imgData.data[i + 2] == 255) {
						map.tileMap.push(10);
				} else {
						map.tileMap.push(0);
				}
		}

		//Generate special map data
		for (var i = 0; i < map.tileMap.length; i = i + 1) {

			//Player spawn point
			if (map.tileMap[i] == 7) {
				player.x = i % map.tileMapWidth * map.tileWidth;
				player.y = (i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight;
			}


			//Enemies
			if (map.tileMap[i] == 8) {
				enemies.push(new Enemy0(i % map.tileMapWidth * map.tileWidth, (i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight, 80, 120));
			}

			if (map.tileMap[i] == 9) {
				enemies.push(new Enemy1(i % map.tileMapWidth, (i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight, 80, 80));
			}

		}


		renderParameters.pause = false;

	},
	render: function() {
		for (var i = 0; i <= map.tileMap.length; i = i + 1) {
			ctx.beginPath();
      ctx.fillStyle = '#47048a';

			if (i % map.tileMapWidth * map.tileWidth - player.x > -(renderParameters.windowWidth + map.tileWidth) && i % map.tileMapWidth * map.tileWidth - player.x < renderParameters.windowWidth && ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset > -renderParameters.windowHeight && ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset < renderParameters.windowHeight * 2) {

				if (map.tileMap[i] != 0) {
					if (map.tileMap[i] == 1) {
						ctx.fillRect((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, map.tileWidth * renderParameters.xScale, map.tileHeight * renderParameters.yScale);
						ctx.closePath();
					}
					if (map.tileMap[i] == 2) {
						ctx.moveTo((i % map.tileMapWidth * map.tileWidth - player.x + map.tileWidth) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y + map.tileHeight) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x + map.tileWidth) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y + map.tileHeight) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.closePath();
						ctx.fill();
					}
					if (map.tileMap[i] == 3) {
						ctx.moveTo((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y + map.tileHeight) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x + map.tileWidth) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y + map.tileHeight) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.closePath();
						ctx.fill();
					}
					if (map.tileMap[i] == 4) {
						ctx.moveTo((i % map.tileMapWidth * map.tileWidth - player.x + map.tileWidth) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x + map.tileWidth) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y + map.tileHeight) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.closePath();
						ctx.fill();
					}
					if (map.tileMap[i] == 5) {
						ctx.moveTo((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y + map.tileHeight) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.lineTo((i % map.tileMapWidth * map.tileWidth - player.x + map.tileWidth) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset)
						ctx.closePath();
						ctx.fill();
					}
					if (map.tileMap[i] == 10) {

						ctx.fillStyle = '#FF0000'

						ctx.fillRect((i % map.tileMapWidth * map.tileWidth - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, ((i - i % map.tileMapWidth) / map.tileMapWidth * map.tileHeight - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, map.tileWidth * renderParameters.xScale, map.tileHeight * renderParameters.yScale);
						ctx.closePath();
					}
				}

			}
		}
	}
};

  ////////////////////////
 //////START SCREEN//////
////////////////////////

var startScreen = {
	active: true,
	y: 0,
	transition: false,
	transitionDirection: false,
	loop: function() {
		if (keystrokelistener.space === true) {
			startScreen.transition = true;
		}

		if (startScreen.transition === true) {

			if (startScreen.y <= renderParameters.windowHeight + 100 && startScreen.transitionDirection === false) {
				startScreen.y = startScreen.y + 15;
			}
			if (startScreen.y > renderParameters.windowHeight) {
				startScreen.transitionDirection = true;
			}
			if (startScreen.y > 0 && startScreen.transitionDirection === true) {
				startScreen.y = startScreen.y - 15;
			}
			if (startScreen.y <= 0 && startScreen.transitionDirection === true) {
				startScreen.active = false;
			}
		}

	},
	render: function() {
		ctx.beginPath();

		if (startScreen.transitionDirection === false) {
			//Background
			ctx.drawImage(startScreenResources[0], 0, 0, 2 * renderParameters.windowWidth, 2 * renderParameters.windowHeight);

			//UI elements
			ctx.drawImage(startScreenResources[1], renderParameters.windowWidth * 0.5, renderParameters.windowHeight * 0.4 + Math.round(20 * Math.sin(loopTime / 70)) * 2, renderParameters.windowWidth, renderParameters.windowHeight / 2);
			ctx.drawImage(startScreenResources[2], renderParameters.windowWidth * 0.9375, renderParameters.windowHeight * 1.55 + Math.round(10 * Math.sin(loopTime / 70)) * 2, renderParameters.windowWidth / 8, renderParameters.windowHeight / 8);

			//ctx.drawImage(startScreenResources[3], renderParameters.windowWidth * 0.95, renderParameters.windowHeight * 1 + Math.round(12 * Math.sin(loopTime / 70)) * 2, 1000, 1500);
		}


		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 2 * renderParameters.windowWidth, startScreen.y);
		ctx.fillRect(0, 2 * renderParameters.windowHeight, 2 * renderParameters.windowWidth, -startScreen.y);


		ctx.closePath();
	}
}



  /////////////////////
 //////UI OBJECT//////
/////////////////////

var userInterface = {
	boxes: 3,
	boxWidth: 160,
	boxHeight: 160,
	boxSpacing: 40,
	abilityBorderWidth: 20,

	healthWidth: 960,
	apparentHealthWidth: 960,
	healthHeight: 80,
	healthBorderWidth: 20,

	playerIconWidth: 500,
	playerIconHeight: 500,
	playerIconXOffset: -520,
	playerIconYOffset: -500,


	render: function() {

		//Draw ability icons

		ctx.beginPath();

		ctx.drawImage(userInterfaceResources[4], cursorParameters.x * 2 - 40, cursorParameters.y * 2 - 40, 80, 80);

		for (var i = 0; i < 3; ++i) {
			ctx.drawImage(userInterfaceResources[i], (i + 1) * userInterface.boxSpacing + i * userInterface.boxWidth, renderParameters.windowHeight * 2 - userInterface.boxHeight - userInterface.boxSpacing, userInterface.boxWidth, userInterface.boxHeight);
		}

		//Draw ability cooldown indicator
		ctx.fillStyle = '#FFFFFF';

		ctx.fillRect(userInterface.boxSpacing + userInterface.abilityBorderWidth, renderParameters.windowHeight * 2 - userInterface.boxSpacing - userInterface.abilityBorderWidth, userInterface.boxWidth - userInterface.abilityBorderWidth * 2, -(userInterface.boxHeight - userInterface.abilityBorderWidth * 2) * (player.coolDown0Ticker / player.coolDown0));

		ctx.fillRect(2 * userInterface.boxSpacing + userInterface.boxWidth + userInterface.abilityBorderWidth, renderParameters.windowHeight * 2 - userInterface.boxSpacing - userInterface.abilityBorderWidth, userInterface.boxWidth - userInterface.abilityBorderWidth * 2, -(userInterface.boxHeight - userInterface.abilityBorderWidth * 2) * (player.coolDown1Ticker / player.coolDown1));

		//Draw Healthbar

		ctx.fillStyle = '#000000';
		ctx.fillRect((i + 1) * userInterface.boxSpacing + i * userInterface.boxWidth, renderParameters.windowHeight * 2 - userInterface.boxHeight + userInterface.boxHeight / 4 - userInterface.boxSpacing, userInterface.healthWidth, userInterface.healthHeight);

		if ((userInterface.apparentHealthWidth - userInterface.healthBorderWidth * 2) > (userInterface.healthWidth - userInterface.healthBorderWidth * 2) * (player.health / 100)) {
			userInterface.apparentHealthWidth = userInterface.apparentHealthWidth - 0.5;
		}

		ctx.fillStyle = '#FFFF00';
		ctx.fillRect((i + 1) * userInterface.boxSpacing + i * userInterface.boxWidth + userInterface.healthBorderWidth, renderParameters.windowHeight * 2 - userInterface.boxHeight + userInterface.boxHeight / 4 - userInterface.boxSpacing  + userInterface.healthBorderWidth, (userInterface.apparentHealthWidth - userInterface.healthBorderWidth * 2), userInterface.healthHeight - userInterface.healthBorderWidth * 2);

		ctx.fillStyle = '#FF0000';
		ctx.fillRect((i + 1) * userInterface.boxSpacing + i * userInterface.boxWidth + userInterface.healthBorderWidth, renderParameters.windowHeight * 2 - userInterface.boxHeight + userInterface.boxHeight / 4 - userInterface.boxSpacing  + userInterface.healthBorderWidth, (userInterface.healthWidth - userInterface.healthBorderWidth * 2) * (player.health / 100), userInterface.healthHeight - userInterface.healthBorderWidth * 2);

		ctx.drawImage(userInterfaceResources[i], (i + 1) * userInterface.boxSpacing + i * userInterface.boxWidth, renderParameters.windowHeight * 2 - userInterface.boxHeight + userInterface.boxHeight / 4 - userInterface.boxSpacing, userInterface.healthWidth, userInterface.healthHeight);

		ctx.drawImage(userInterfaceResources[5], renderParameters.windowWidth * 2 + userInterface.playerIconXOffset, renderParameters.windowHeight * 2 + userInterface.playerIconYOffset, userInterface.playerIconWidth, userInterface.playerIconHeight);

		ctx.closePath();
	}
};


  ////////////////////////////
 //////STAGE TRANSITION//////
////////////////////////////

var stageTransition = {
	ticker: 0,
	time: 70,
	x: 0,
	width: 0,


	transition: function() {

		stageTransition.ticker = stageTransition.ticker + 1;

		stageTransition.x = 0;
		stageTransition.width = 2 * canvas.width * (stageTransition.ticker / stageTransition.time)

		if (stageTransition.time <= stageTransition.ticker) {
			stageTransition.ticker = 0;
			stageTransition.width = 0;

			map.level = map.level + 1;
			renderParameters.pause = false;

			map.generateMap();
		}
	},

	render: function() {
		ctx.beginPath();
		ctx.fillStyle = '#000000'
		ctx.fillRect(stageTransition.x, 0, stageTransition.width, 2 * canvas.height);
		ctx.closePath();
	}

}


  //////////////////////////
 //////SCENERY LAYERS//////
//////////////////////////

var scenery0 = {
	render: function() {
		ctx.beginPath();
		ctx.drawImage(backdropResources[map.level], 0, 0, canvas.width, canvas.height);
		ctx.closePath();
	}
}

var scenery1 = {
	render: function() {
		ctx.beginPath();
		ctx.drawImage(sceneryResources[0], 0, 0, canvas.width, canvas.height);
		ctx.closePath();
	}
}


  ////////////////////////////
 //////SET CANVAS STATE//////
////////////////////////////

var canvas = document.getElementById('view');
var ctx = canvas.getContext('2d');

//Set the canvas units
canvas.width = renderParameters.windowWidth * 2;
canvas.height = renderParameters.windowHeight * 2;

//Set the canvas size on screen in pixels
canvas.style.width = String(renderParameters.windowWidth + 'px');
canvas.style.height = String(renderParameters.windowHeight + 'px');


  ////////////////////////
 //////CURSOR INPUT//////
////////////////////////

canvas.addEventListener('mousedown', function() {
	if (event.which === 1) {
		cursorParameters.mouseDown1 = true;
	}
	if (event.which === 2) {
		cursorParameters.mouseDown2 = true;
	}
	if (event.which === 3) {
		cursorParameters.mouseDown3 = true;
	}
});


canvas.addEventListener('mouseup', function() {
	if (event.which === 1) {
		cursorParameters.mouseDown1 = false;
	}
	if (event.which === 2) {
		cursorParameters.mouseDown2 = false;
	}
	if (event.which === 3) {
		cursorParameters.mouseDown3 = false;
	}
});

canvas.addEventListener('contextmenu', function(e) {
	e.preventDefault();
}, false);

canvas.addEventListener('mousemove', function(e) {
	var cursorPosition = getCursorPosition(canvas, e);

	cursorParameters.x = cursorPosition.x;
	cursorParameters.y = cursorPosition.y;

	cursorParameters.angle = Math.atan2((renderParameters.windowHeight + (player.height / 3 * renderParameters.yScale) + renderParameters.yOffset) - (cursorParameters.y * 2), (renderParameters.windowWidth + (player.width / 2 * renderParameters.xScale) + renderParameters.xOffset) - (cursorParameters.x * 2));
}, false);

function getCursorPosition(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}


  //////////////////////////
 //////KEYBOARD INPUT//////
//////////////////////////

var keystrokelistener = {
	w: false,
	a: false,
	s: false,
	d: false,
	space: false,
	logKeystrokes: function() {
		'use strict';
    document.onkeydown = function (keyDown) {
      keyDown = keyDown || window.event;
      var charCode = (typeof keyDown.which === 'number') ? keyDown.which : keyDown.keyCode;

      if (String.fromCharCode(charCode) === 'W') {
        keystrokelistener.w = true;
      }
      if (String.fromCharCode(charCode) === 'S') {
        keystrokelistener.s = true;
      }
      if (String.fromCharCode(charCode) === 'D') {
        keystrokelistener.d = true;
      }
      if (String.fromCharCode(charCode) === 'A') {
        keystrokelistener.a = true;
      }
			if (charCode === 32) {
        keystrokelistener.space = true;
      }
    };
    document.onkeyup = function (keyUp) {
      keyUp = keyUp || window.event;
      var charCode = (typeof keyUp.which === 'number') ? keyUp.which : keyUp.keyCode;

      if (String.fromCharCode(charCode) === 'W') {
        keystrokelistener.w = false;
      }
      if (String.fromCharCode(charCode) === 'S') {
        keystrokelistener.s = false;
      }
      if (String.fromCharCode(charCode) === 'D') {
        keystrokelistener.d = false;
      }
      if (String.fromCharCode(charCode) === 'A') {
        keystrokelistener.a = false;
      }
			if (charCode === 32) {
				keystrokelistener.space = false;
			}
    };
	}
};


  ///////////////////////////////
 //////OBJECT CONSTRUCTORS//////
///////////////////////////////

//bullets

let bullets = [];

function Bullet(x, y, angle, xVelocityInitial, yVelocityInitial, gravity, enemy, xOffset, yOffset, radius, type) {
	this.x = x + xOffset;
	this.y = y + yOffset;
	this.xVelocity = xVelocityInitial;
	this.yVelocity = yVelocityInitial;
	this.velocity = 0;
	this.angle = angle;
	this.gravity = gravity;
	this.enemy = enemy;
	this.radius = radius;
	this.type = type;
	this.delete = false;
	this.move = function() {

		this.velocity = Math.round(Math.hypot(this.xVelocity, this.yVelocity));
		this.angle = Math.atan2(this.yVelocity, this.xVelocity);

		for (var i = 0; i < this.velocity; i = i + 1) {
			this.x = this.x + 1 * Math.cos(this.angle);
			this.y = this.y + 1 * Math.sin(this.angle);

			this.collisionCheck();

			if (this.delete === false) {
				if (this.enemy === false) {

					this.attackEnemy();

				} else if (this.enemy === true) {

					this.attackPlayer();

				}
			}

		}

	}
	this.collisionCheck = function() {
		if (map.tileMap[(((this.x + this.radius * Math.cos(this.angle)) - ((this.x + this.radius * Math.cos(this.angle)) % map.tileWidth)) / map.tileWidth) + map.tileMapWidth * (((this.y + this.radius * Math.sin(this.angle)) - ((this.y + this.radius * Math.sin(this.angle)) % map.tileHeight)) / map.tileHeight)] > 0 && map.tileMap[(((this.x + this.radius * Math.cos(this.angle)) - ((this.x + this.radius * Math.cos(this.angle)) % map.tileWidth)) / map.tileWidth) + map.tileMapWidth * (((this.y + this.radius * Math.sin(this.angle)) - ((this.y + this.radius * Math.sin(this.angle)) % map.tileHeight)) / map.tileHeight)] < 6) {
			this.delete = true;
		}
	}
	this.attackEnemy = function () {

		for (var n = 0; n < enemies.length; n = n + 1) {
			if (this.x < enemyCollisionBoxes[n * 4] + enemyCollisionBoxes[n * 4 + 2] && this.x > enemyCollisionBoxes[n * 4] && this.y < enemyCollisionBoxes[n * 4 + 1] + enemyCollisionBoxes[n * 4 + 3] && this.y > enemyCollisionBoxes[n * 4 + 1]) {
				if (this.delete === false) {
					enemies[n].takeDamage();
				}

				this.delete = true;
			}
		}


	}
	this.attackPlayer = function() {
		if (this.x >= player.x && this.x <= player.x + player.width && this.y >= player.y && this.y <= player.y + player.height) {
			if (this.enemy === true) {
				player.damageToPlayer.push(-1);

				if (this.xVelocity > 0) {
					player.damageToPlayer.push(20);
				} else if (this.xVelocity < 0) {
					player.damageToPlayer.push(-20);
				} else {
					player.damageToPlayer.push(0);
				}

				this.delete = true;
			}
		}
	}
	this.render = function() {

		ctx.beginPath();

		if (this.type == 0) {
			ctx.drawImage(abilityResources[0], (this.x - player.x - this.radius) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, (this.y - player.y - this.radius) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, this.radius * 2 * renderParameters.xScale, this.radius * 2 * renderParameters.yScale);
		}

		if (this.type == 1) {
			ctx.drawImage(enemy1ProjectileResources[0], (this.x - player.x - this.radius) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, (this.y - player.y - this.radius) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, this.radius * 2 * renderParameters.xScale, this.radius * 2 * renderParameters.yScale);
		}

		ctx.closePath();

	}
}

//missiles

let missiles = [];

function Missile(x, y, xVelocity, yVelocity, velocity, angle, target) {
	this.x = x;
	this.y = y;
	this.width = 40;
	this.height = 40;
	this.velocity = velocity;
	this.xVelocity = xVelocity;
	this.yVelocity = yVelocity;
	this.angle = angle;
	this.delete = false;
	this.target = target;

	this.move = function() {

		for (var i = 0; i < enemies.length; i = i + 1) {

			for (var n = 0; n < enemies[i].targetID.length; n = n + 1) {

				//Code in here
				if (this.target === enemies[i].targetID[n]) {

					this.angle = Math.atan2((this.y + this.height / 2) - (enemies[i].y + enemies[i].height / 2), (this.x + this.width / 2) - (enemies[i].x + enemies[i].width / 2))

					if (this.xVelocity > this.velocity * -Math.cos(this.angle)) {
						this.xVelocity = this.xVelocity - (this.xVelocity - this.velocity * -Math.cos(this.angle)) * 0.5;
					}
					if (this.xVelocity < this.velocity * -Math.cos(this.angle)) {
						this.xVelocity = this.xVelocity - (this.xVelocity - this.velocity * -Math.cos(this.angle)) * 0.5;
					}
					if (this.yVelocity > this.velocity * -Math.sin(this.angle)) {
						this.yVelocity = this.yVelocity - (this.yVelocity - this.velocity * -Math.sin(this.angle)) * 0.5;
					}
					if (this.yVelocity < this.velocity * -Math.sin(this.angle)) {
						this.yVelocity = this.yVelocity - (this.yVelocity - this.velocity * -Math.sin(this.angle)) * 0.5;
					}

					// this.x = this.x + this.xVelocity;
					// this.y = this.y + this.yVelocity;

					if (enemies[i].delete === true) {
						this.delete = true;
					}

					for (var n = 0; n < Math.abs(Math.hypot(this.xVelocity, this.yVelocity)); n = n + 1) {

						this.x = this.x + Math.cos(Math.atan2(this.yVelocity, this.xVelocity));
						this.y = this.y + Math.sin(Math.atan2(this.yVelocity, this.xVelocity));


						if (this.x < enemyCollisionBoxes[i * 4] + enemyCollisionBoxes[i * 4 + 2] && this.x + this.width> enemyCollisionBoxes[i * 4] && this.y < enemyCollisionBoxes[i * 4 + 1] + enemyCollisionBoxes[i * 4 + 3] && this.y  + this.height> enemyCollisionBoxes[i * 4 + 1]) {
							if (this.delete === false) {
								enemies[i].takeDamage();
							}

							this.delete = true;
						}

					}

				}
			}

		}

	}



	this.render = function() {
		ctx.beginPath();

		ctx.fillRect((this.x - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, (this.y - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, 40 * renderParameters.xScale, 40 * renderParameters.yScale);

		ctx.closePath();
	}

}

//Enemies
let enemies = [];
var enemyCollisionBoxes = [];

function Enemy0(x, y, width, height) {
  this.x = x;
  this.y = y;
	this.width = width;
	this.height = height;
  this.xVelocity = 0;
  this.yVelocity = 0;
	this.xVelocityMax = 12;
	this.xAcceleration = 1 + Math.random();
	this.slope = 0;
	this.slopeMax = 3;
	this.jump = false;
	this.jumpHeight = 15;
	this.followDistance = 500;
	this.trackingRange = 2000;
	this.collision = false;
	this.health = 100;
	this.attackDistance = 20;
	this.attacking = false;
	this.attackTicker = 0;
	this.attackTime = 8;
	this.attacked = false;
	this.attackDamage = 1;
	this.armor = 0.01;
	this.criticalStrikeChance = 0;
	this.direction = 0;
	this.delete = false;
	this.enemyID = 0;
	this.targetID = [];

	this.loop = function() {
			this.move();
			this.attack();
	}

	this.move = function() {
		if (this.attacking === false) {
			if ((this.x + this.width / 2) < (player.x + player.width / 2) - this.attackDistance && (this.x + this.width / 2) > (player.x + player.width / 2) - this.trackingRange) {
				if (this.xVelocity < this.xVelocityMax) {
					this.xVelocity = this.xVelocity + this.xAcceleration;
				}
			} else if ((this.x + this.width / 2) > (player.x + player.width / 2) + this.attackDistance && (this.x + this.width / 2) < (player.x + player.width / 2) + this.trackingRange) {
				if (this.xVelocity > -this.xVelocityMax) {
					this.xVelocity = this.xVelocity - this.xAcceleration;
				}
			} else if (this.jump === false) {
				this.xVelocity = this.xVelocity / 2;
			} else if (this.jump === true) {
				this.xVelocity = this.xVelocity / 1.1;
			}
		}

		if (this.xVelocity > 0) {
			//set texture direction
			this.direction = 0;
		} else if (this.xVelocity < 0) {
			//set texture direction
			this.direction = 1;
		}

		for (var i = 0; i < Math.round(Math.abs(this.xVelocity)); i = i + 1) {
			if (this.xVelocity > 0) {
				this.x = this.x + 1;
				if (this.collisionCheck() === true) {
					this.slope = 0;

					while (this.slope < this.slopeMax && this.collisionCheck() === true) {
						this.y = this.y - 1;
						this.slope = this.slope + 1;
					}
					if (this.slope == this.slopeMax) {
						this.y = this.y + this.slopeMax;
						this.x = this.x - 1;
						this.xVelocity = 0;

						if (this.jump === false) {
							this.yVelocity = -this.jumpHeight - 2 * Math.random();
							this.jump = true;
						}
					}
				}
			}
			if (this.xVelocity < 0) {
				this.x = this.x - 1;

				if (this.collisionCheck() === true) {
					this.slope = 0;

					while (this.slope < this.slopeMax && this.collisionCheck() === true) {
						this.y = this.y - 1;
						this.slope = this.slope + 1;
					}
					if (this.slope == this.slopeMax) {
						this.y = this.y + this.slopeMax;
						this.x = this.x + 1;
						this.xVelocity = 0;

						if (this.jump === false) {
							this.yVelocity = -this.jumpHeight - 2 * Math.random();
							this.jump = true;
						}
					}
				}
			}
		}

		if (this.jump === false) {
			this.y = this.y + 1;

			if (this.collisionCheck() === true) {
				this.y = this.y - 1;
			} else {
				this.jump = true;
				this.yVelocity = -this.jumpHeight - 2 * Math.random();
			}

			for (var i = 0; i < enemies.length; i = i + 1) {
				if (i != this.enemyID) {
					if (this.x < enemyCollisionBoxes[i * 4] + enemyCollisionBoxes[i * 4 + 2] && this.x + this.width > enemyCollisionBoxes[i * 4] && this.y < enemyCollisionBoxes[i * 4 + 1] + enemyCollisionBoxes[i * 4 + 3] && this.y + this.height > enemyCollisionBoxes[i * 4 + 1]) {
						this.jump = true;
						this.yVelocity = -this.jumpHeight * Math.random();
						this.xVelocity = -4 + 8 * Math.random();
					}
				}
			}
		}

		//Handle jump
		if (this.jump === true) {
			this.yVelocity = this.yVelocity + physicsParameters.gravity;

			for (var i = 0; i <= Math.round(Math.abs(this.yVelocity)); i = i + 1) {
				if (this.yVelocity > 0) {
					this.y = this.y + 1;
					if (this.collisionCheck() === true) {
						this.jump = false;
						this.y = this.y - 1;
						this.yVelocity = 0;
					}
				}
				if (this.yVelocity < 0) {
					this.y = this.y - 1;
					if (this.collisionCheck() === true) {
						this.y = this.y + 1;
						this.yVelocity = 0;
					}
				}
			}
		}
	}

	this.collisionCheck = function() {
		this.collision = false;

		for (var i = 0; i <= (this.width / map.tileWidth + 1) * (this.height / map.tileHeight + 1) - 1; i = i + 1) {
			var tileCheck = ((this.x - this.x % map.tileWidth) / map.tileWidth) + ((this.y - this.y % map.tileHeight) / map.tileHeight * map.tileMapWidth) + (i % (this.width / map.tileWidth + 1)) + (map.tileMapWidth * (i - i % (this.width / map.tileWidth + 1)) / (this.width / map.tileWidth + 1));
			if (map.tileMap[tileCheck] != 0) {
				if (this.x + this.width > tileCheck % map.tileMapWidth * map.tileWidth && this.x < tileCheck % map.tileMapWidth * map.tileWidth + map.tileWidth && this.y + this.height > (tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight) {
					if (map.tileMap[tileCheck] == 1) {
						this.collision = true;
					} else if (map.tileMap[tileCheck] == 2) {
						if (((this.x + this.width) - tileCheck % map.tileMapWidth * map.tileWidth) - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (this.y + this.height)) > 0) {
							this.collision = true;
						}
					} else if (map.tileMap[tileCheck] == 3) {
						if ((-(this.x - tileCheck % map.tileMapWidth * map.tileWidth - map.tileWidth)) - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (this.y + this.height)) > 0) {
							this.collision = true;
						}
					} else if (map.tileMap[tileCheck] == 4) {
						if (((this.x + this.width) - tileCheck % map.tileMapWidth * map.tileWidth) - (map.tileHeight - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (this.y))) > 0) {
							this.collision = true;
						}
					} else if (map.tileMap[tileCheck] == 5) {
						if ((-(this.x - tileCheck % map.tileMapWidth * map.tileWidth - map.tileWidth)) - (map.tileHeight - ((tileCheck - tileCheck % map.tileMapWidth) / map.tileMapWidth * map.tileHeight + map.tileHeight - (this.y))) > 0) {
							this.collision = true;
						}
					}
				}
			}
		}

		return this.collision;
	}

	this.returnCollisionBox = function() {
		enemyCollisionBoxes.push(this.x);
		enemyCollisionBoxes.push(this.y);
		enemyCollisionBoxes.push(this.width);
		enemyCollisionBoxes.push(this.height);

	}

  this.attack = function() {
		if ((this.x + this.width / 2) > (player.x + player.width / 2) - this.attackDistance - 50 && (this.x + this.width / 2) < (player.x + player.width / 2) + this.attackDistance + 50 && (this.y + this.height / 2) > (player.y + player.height / 3) - this.attackDistance - 50 && (this.y + this.height / 2) < (player.y + player.height / 3) + this.attackDistance + 50) {
			this.attacking = true;
			this.xVelocity = this.xVelocity / 2;

			this.attackTicker = this.attackTicker - 1;

			if (this.attackTicker <= 0) {
				//Jump Away from player
				if (this.jump === false) {
					this.jump = true;
					this.yVelocity = -this.jumpHeight* 0.7;

				}
			}

			//Determine if against a wall to stop attack
			this.x = this.x + 1;
			if (this.collisionCheck() === true) {
				this.attacking = false;
			}
			this.x = this.x - 1;

			this.x = this.x - 1;
			if (this.collisionCheck() === true) {
				this.attacking = false;
			}
			this.x = this.x + 1;


		} else if (this.attacking === false) {
			this.attackTicker = this.attackTime;
		}

		if (this.attacking === true) {

			if (this.attackTicker <= 0) {

				if (this.attacked === false) {
					//Damage value per attack
					if (this.x < player.x + player.width + this.attackDistance * 5 && this.x + this.width> player.x - this.attackDistance * 5 && this.y + this.height > player.y - this.attackDistance) {
						player.damageToPlayer.push(-this.attackDamage);

						if (this.xVelocity > 0) {
							player.damageToPlayer.push(10);
						} else if (this.xVelocity < 0) {
							player.damageToPlayer.push(-10);
						} else {
							player.damageToPlayer.push(0);
						}
					}

					//Play sound effect
					if (Math.random() > 0.5) {
						const newAudio = enemy0Sounds[0].cloneNode();
						newAudio.play();
					} else {
						const newAudio = enemy0Sounds[1].cloneNode();
						newAudio.play();
					}

					this.attacked = true;
				}

				if ((this.x + this.width / 2) >= (player.x + player.width / 2)) {
					if (this.xVelocity < this.xVelocityMax) {
						this.xVelocity = this.xVelocity + this.xAcceleration;

						this.x = this.x + 1;
						if (this.collisionCheck() === true) {
							this.attacking = false;
						}
						this.x = this.x - 1;
					}
				} else if ((this.x + this.width / 2) < (player.x + player.width / 2)) {
					if (this.xVelocity > -this.xVelocityMax) {
						this.xVelocity = this.xVelocity - this.xAcceleration;

						this.x = this.x - 1;
						if (this.collisionCheck() === true) {
							this.attacking = false;
						}
						this.x = this.x + 1;
					}
				}

			}

			if ((this.x + this.width / 2) < (player.x + player.width / 2) - this.followDistance || (this.x + this.width / 2) > (player.x + player.width / 2) + this.followDistance || (this.y + this.height / 2) < (player.y + player.height / 3) - this.followDistance || (this.y + this.height / 2) > (player.y + player.height / 3) + this.followDistance) {
				this.attacked = false;
				this.attacking = false;
			}
		}
  }

	this.takeDamage = function() {
		this.xVelocity = this.xVelocity + 20 * (Math.cos(Math.atan2(this.y - player.y, this.x - player.x)));
		this.yVelocity = this.yVelocity + 10 * (Math.sin(Math.atan2(this.y - player.y, this.x - player.x)));

		this.health = this.health - (player.attackDamage * (1 - this.armor));

		if (this.health <= 0) {
			this.delete = true;
		}
	}

  this.render = function() {
		ctx.beginPath();

		//Draw using enemy textures

		if (this.direction == 0) {
			ctx.drawImage(enemy0Resources[0], Math.round(((this.x - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset) / 2) * 2, (this.y - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, this.width * renderParameters.xScale, this.height * renderParameters.yScale);
		}
		if (this.direction == 1) {
			ctx.drawImage(enemy0Resources[1], Math.round(((this.x - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset) / 2 ) * 2, (this.y - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, this.width * renderParameters.xScale, this.height * renderParameters.yScale);
		}

	  ctx.closePath();
  }
}

function Enemy1(x, y, width, height) {
  this.x = x;
  this.y = y;
	this.width = width;
	this.height = height;
	this.angle = 10 * Math.random();
	this.xTarget = 0;
	this.yTarget = 0;
	this.health = 40;
	this.armor = 0;
	this.direction = 0;
	this.coolDownTicker = 0;
	this.coolDown = 400;
	this.attackDistance = 1000;
	this.startTracking = false;
	this.trackingRange = 1000;
	this.xTracker = 0;
	this.yTracker = 0;
	this.targetLocked = false;
	this.delete = false;
	this.enemyID = 0;
	this.targetID = [];

	this.loop = function() {
		if (this.x + this.width / 2 > player.x + player.width / 2 - this.trackingRange && this.x + this.width / 2 < player.x + player.width / 2 + this.trackingRange) {
			this.startTracking = true;
		}

		if (this.startTracking === true) {
			this.move();
			this.attack();
		}
	}

	this.move = function() {

		this.angle = this.angle + 0.0045;

		this.xTarget = player.x + this.attackDistance * Math.cos(Math.PI * Math.sin(this.angle));
		this.yTarget = player.y + this.attackDistance * Math.sin(Math.PI * Math.sin(this.angle));

		this.x = this.x + (this.xTarget - this.x) * 0.015;
		this.y = this.y + (this.yTarget - this.y) * 0.05;

	}

	this.returnCollisionBox = function() {

		enemyCollisionBoxes.push(this.x);
		enemyCollisionBoxes.push(this.y);
		enemyCollisionBoxes.push(this.width);
		enemyCollisionBoxes.push(this.height);

	}

  this.attack = function() {

		//Test for line of sight
		this.targetLocked = true;

		this.xTracker = this.x;
		this.yTracker = this.y;

		for (var i = 0; i < Math.abs(Math.hypot((this.y + this.height / 2) - (player.y + player.height / 2), (this.x + this.width / 2) - (player.x + player.width / 2))); i = i + 1) {

			if (map.tileMap[(this.xTracker - this.xTracker % map.tileWidth) / map.tileWidth + map.tileMapWidth * (this.yTracker - this.yTracker % map.tileHeight) / map.tileHeight] > 0) {

				this.targetLocked = false;

			}

			this.xTracker = this.xTracker - Math.cos(Math.atan2((this.y + this.height / 2) - (player.y + player.height / 2), (this.x + this.width / 2) - (player.x + player.width / 2)));

			this.yTracker = this.yTracker - Math.sin(Math.atan2((this.y + this.height / 2) - (player.y + player.height / 2), (this.x + this.width / 2) - (player.x + player.width / 2)));
		}

		//Attack if cool down is 0 and has line of sight
		if (this.coolDownTicker <= 0) {
			if (Math.abs((this.x + this.width / 2) - (player.x + player.width / 2)) > this.attackDistance / 2 && this.targetLocked === true) {

				bullets.push(new Bullet(this.x, this.y, Math.atan2((this.y + this.height / 2) - (player.y + player.height / 2), (this.x + this.width / 2) - (player.x + player.width / 2)), 10 * -Math.cos(Math.atan2((this.y + this.height / 2) - (player.y + player.height / 2), (this.x + this.width / 2) - (player.x + player.width / 2))), 10 * -Math.sin(Math.atan2((this.y + this.height / 2) - (player.y + player.height / 2), (this.x + this.width / 2) - (player.x + player.width / 2))), false, true, this.width / 2, this.height / 2, 20, 1));

				this.coolDownTicker = this.coolDown;
			}
		} else {

			this.coolDownTicker = this.coolDownTicker - 1;
		}
  }

	this.takeDamage = function() {
		this.x = this.x + 60 * (Math.cos(Math.atan2(this.y - player.y, this.x - player.x)));
		this.y = this.y + 60 * (Math.sin(Math.atan2(this.y - player.y, this.x - player.x)));

		this.health = this.health - (player.attackDamage * (1 - this.armor));

		//Stuns attack
		this.coolDownTicker = this.coolDown;


		if (this.health <= 0) {
			this.delete = true;
		}
	}

  this.render = function() {
		ctx.beginPath();

		if (this.x + this.width / 2 < player.x + player.width / 2) {

			ctx.drawImage(enemy1Resources[0], (this.x - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, (this.y - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, this.width * renderParameters.xScale, this.height * renderParameters.yScale);

		}

		if (this.x + this.width / 2 > player.x + player.width / 2) {

			ctx.drawImage(enemy1Resources[1], (this.x - player.x) * renderParameters.xScale + renderParameters.windowWidth + renderParameters.xOffset, (this.y - player.y) * renderParameters.yScale + renderParameters.windowHeight + renderParameters.yOffset, this.width * renderParameters.xScale, this.height * renderParameters.yScale);

		}

	  ctx.closePath();
  }
}


//Creates objects
initializeObjects();

function initializeObjects() {

	ctx.imageSmoothingEnabled = false;

	//Map generator
	while(document.getElementById(map.level).complete === false) {

	}
	map.generateMap();

	window.requestAnimationFrame(gameTick);
	window.requestAnimationFrame(render);

}


  /////////////////////
 //////GAME TICK//////
/////////////////////

var loopTime = 0;

function gameTick() {

	while (loopTime < timestamp() / (1000 / renderParameters.gameSpeed)) {
		mainLoop()
		loopTime = loopTime + 1;

		if (timestamp() / (1000 / renderParameters.gameSpeed) - loopTime > 50) {

			loopTime = timestamp() / (1000 / renderParameters.gameSpeed);

		}
	}

	window.requestAnimationFrame(gameTick);
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

//Main process loop
function mainLoop() {

	if (startScreen.active === true) {
		keystrokelistener.logKeystrokes();
		startScreen.loop();
	}


	if (renderParameters.pause === false && startScreen.active === false) {


		enemyCollisionBoxes = [];

		//Find enemy hitboxes
		for (var i = 0; i < enemies.length; i = i + 1)  {

			enemies[i].returnCollisionBox()

		}


		////////////////////////////
	 //////PLAYER FUNCTIONS//////
	////////////////////////////

		//Player functions
		player.move();

		player.ability0();
		player.ability1();
		player.ability2();

		player.collisionCheckBlock();

		player.takeDamage();

		player.determineState();
		player.animate();


		  /////////////////////////
		 //////MOVE ENTITIES//////
		/////////////////////////

		//enemyHandler
		for (var i = 0; i < enemies.length; i = i + 1)  {

			enemies[i].enemyID = i;
			enemies[i].loop();

		}

		//Bullet handler
		for (var i = 0; i < bullets.length; i = i + 1)  {

	    bullets[i].move();

	  }

		//Missile handler
		for (var i = 0; i < missiles.length; i = i + 1)  {

			missiles[i].move();

		}


		  ///////////////////////////
		 //////DELETE ENTITIES//////
		///////////////////////////

		//Bullet handler
		for (var i = 0; i < bullets.length; i = i + 1)  {

	    if (bullets[i].delete === true) {
	      bullets.splice(i, 1);
	    }
	  }

		//Missile handler
		for (var i = 0; i < missiles.length; i = i + 1)  {

			if (missiles[i].delete === true) {
				missiles.splice(i, 1);
			}
		}

		//enemyHandler

		for (var i = 0; i < enemies.length; i = i + 1)  {

	    if (enemies[i].delete === true) {
	      enemies.splice(i, 1);
	    }
		}

	}


	if (renderParameters.pause === true) {
		stageTransition.transition();
	}

}


//Draw objects on screen
function render() {
	'use strict';

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scenery0.render();
	map.render();
	renderLine(renderParameters.windowWidth + (player.width / 2 * renderParameters.xScale) + renderParameters.xOffset, renderParameters.windowHeight + (player.height / 3 * renderParameters.yScale) + renderParameters.yOffset, cursorParameters.x * 2, cursorParameters.y * 2);
	player.render();

	//Render Bullets
	bullets.forEach(i => {
		i.render();
	});
	userInterface.render();

	//Render missiles
	missiles.forEach(i => {
		i.render();
	});
	userInterface.render();

	//Render Enemies
	enemies.forEach(i => {
		i.render();
	});


	//Viginette
	scenery1.render();

	userInterface.render();

	stageTransition.render();

	if (startScreen.active === true) {
		startScreen.render();
	}


	window.requestAnimationFrame(render);

}

function renderLine(x1, y1, x2, y2) {

	ctx.beginPath;

	ctx.lineCap = 'round';

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = 12;
	ctx.strokeStyle = '#081100';
	ctx.stroke();

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#6fb032';
	ctx.stroke();
	ctx.closePath();

}
