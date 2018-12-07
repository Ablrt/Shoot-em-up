const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pointCount = document.getElementById("points");
const lifes = document.getElementById("lifes");
const bossHealth = document.getElementById("bossH");
const sub = document.getElementById("sub");

canvas.width = 1200;
canvas.height = 699;

let gameStatus = "stoped";

const background = new Image();
background.src = "Images/background.png";


const shipImg = new Image;
shipImg.src = "Images/ship.png";

const bulletImg = new Image;
bulletImg.src = "Images/bullet.png";

const easyImg = new Image;
easyImg.src = "Images/easy.png";

const hardImg = new Image;
hardImg.src = "Images/hard.png";

const fireballImg = new Image;
fireballImg.src = "Images/fireball.png";

const bossImg = new Image;
bossImg.src = "Images/boss.png";

const bossFireImg = new Image;
bossFireImg.src = "Images/bluefire.png";

const FinalImg = new Image;
FinalImg.src = "Images/end.jpg"

const easyDeath = new Audio("Music/EasyDeath.mp3");
const deathSound = new Audio("Music/deathSound.mp3");
const fireballSound = new Audio("Music/fireball.mp3");
const hand = new Audio("Music/hand.mp3");
const backgroundMusic = new Audio("Music/background.mp3");
const bossFireSound = new Audio("Music/laser.mp3");
const congratulations = new Audio("Music/BitchLasagna.mp3");
const bravo = new Audio("Music/bravo.mp3");
const touch = new Audio("Music/KillerQueen.mp3")


let points = 0;

const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const creatShip = function() {
	return { x: 530,
			 y: 600,
			 width: 50,
			 height: 50,
			 health: 30,
			 xdir: 0,
			 ydir: 0,
	}
};

const creatBullet = function(x,y) {
	return { x: x,
			 y: y,
			 width: 50,
			 height: 50,
			 speed: 6,
			 damage: 2,
	}
};

const creatEasyEnemy = function() {
	return { x: rand(canvas.width - 50),
			 y: -45,
			 width: 50,
			 height: 45,
			 speed: 4,
			 health: 5,
			 XP: 15,
	}
};

const creatHardEnemy = function() {
	return { x: rand(canvas.width - 100),
			 y: -100,
			 width: 100,
			 height: 100,
			 xdir:1,
			 ydir:1,
			 speed: 0,
			 health: 100,
			 XP: 150,
	}
};

const creatFireball = function(x){
	return { x: x + 29,
			 y: 120,
			 width: 40,
			 height: 40,
			 speed: 7,
	}

};

const creatBoss = function(){
	return { x: 500 ,
			 y: -150,
			 width: 200,
			 height: 200,
			 xdir: 1,
			 ydir: 1,
			 speed: 8,   //6
			 health: 1000
	}
};

const creatBossFire = function(x,y){
	return { x: x + 50,
			 y: y + 50,
			 width: 60,
			 height: 60,
			 speed: 11.5,
	}
};


const game = {

	drawShip: function(ship){ 

		ctx.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
	},
	updateShip: function(ship){
		if(ship.x > 0 && ship.x < canvas.width - ship.width){
			ship.x += ship.xdir;
		}else if(ship.x < 0){
			ship.x += 0.899
		}else{
			ship.x -= 0.9
		};

		if(ship.y > 350 && ship.y < canvas.height - ship.height){
			ship.y += ship.ydir;
		}else if(ship.y < 350){
			ship.y += 0.899
		}else{
			ship.y -= 0.9
		}
	},

	drawBullet: function(bullet){
		ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height)
	},
	updateBullet: function(bullet){
		bullet.y -= bullet.speed;
		if(bullet.y < 0){
			bullet.deleteme = true;
		}
	},

	drawEasyEnemy: function(easy){
		ctx.drawImage(easyImg, easy.x, easy.y, easy. width, easy.height) 
	},
		 
	updateEasyEnemy: function(easy){
		easy.y += easy.speed;
		if(easy.y > canvas.height){
			points -= 5;
			pointCount.innerHTML = "Score = " + points;
			easy.deleteme = true;
		};
	},

	drawHardEnemy: function(hard){
		ctx.drawImage(hardImg, hard.x, hard.y, hard.width, hard.height)
	}, 
	updateHardEnemy: function(hard){
		if(points >= 350){
			if(hard.y <= 80){
				hard.ydir *= 1
			}else{
				hard.ydir = 0;
				hard.speed = 7;												//****HARD SPEED****
				if(hard.x + hard.width >= canvas.width ) {
					hard.xdir *= -1
				};
				if(hard.x <= 0) {
					hard.xdir *= -1
				};

			};	
			hard.x += hard.speed * hard.xdir;
			hard.y += hard.ydir;
		}
	},

	drawFireball: function(fireball){
		ctx.drawImage(fireballImg, fireball.x, fireball.y, fireball.width, fireball.height)
	},
	updateFireball: function(fireball){
		fireball.y += fireball.speed;
		if(fireball.y > canvas.height){
			fireball.deleteme = true;
		}
	},

	drawBoss: function(boss){
		ctx.drawImage(bossImg, boss.x, boss.y, boss.width, boss.height)
	},
	updateBoss: function(boss){
		if(boss.y >= 0 ){
			setTimeout(function(){	
				if(boss.x + boss.width >= canvas.width) {
					boss.xdir *= -1;
				}
				if(boss.x <= 0)	{
					boss.xdir *= -1;
				}
				if(boss.y + boss.height >= 450) {
					boss.ydir *= -1;
				} 
				if(boss.y <= 0)	{
					boss.ydir *= -1;
				}

				boss.x += boss.xdir * boss.speed;
				boss.y += boss.ydir* boss.speed;			
			},500)
		}else{
			boss.y += 2
		}
	},

	drawBossFire: function(fire){
		ctx.drawImage(bossFireImg, fire.x, fire.y, fire.width, fire.height)
	},
	updateBossFire: function(fire){
		fire.y += fire.speed;
	}
}


const gameData = {

	ship: creatShip(),
	bullet: [],
	easy: [],
	hard: [],
	fireball: [],
	boss: creatBoss(),
	bossFire: []

}

const addEasy = function(){
	let setInt = setInterval(function(){
		if(points>2200){
			clearInterval(setInt);
		}
			gameData.easy.push(creatEasyEnemy());
	},500);
}



const addHard = function(){

		let setInt = setInterval(function(){
			if(points>2500){
				clearInterval(setInt)
			};
			if(points >= 350){
				gameData.hard.push(creatHardEnemy())
			}
		}, 4000)
}

const addBossFire = function(){
	setInterval(function(){
		if(gameData.boss.x != 500){
			gameData.bossFire.push(creatBossFire(gameData.boss.x, gameData.boss.y)) 
		}
	}, 650)

}

const draw = function(){
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	game.drawShip(gameData.ship);
	gameData.bullet.forEach(function(bullet){
		game.drawBullet(bullet);
	});

	gameData.easy.forEach(function(easy){
		game.drawEasyEnemy(easy); 
	});

	gameData.hard.forEach(function(hard){
		game.drawHardEnemy(hard)
	});

	gameData.fireball.forEach(function(fireball){
				game.drawFireball(fireball)
	});

	if(points > 2000 ){
		game.drawBoss(gameData.boss)
		const healthPercent = gameData.boss.health / 1000 * 100
		bossHealth.innerHTML = "BOSS HEALTH: " + healthPercent +"%"
		gameData.bossFire.forEach(function(fire){
			game.drawBossFire(fire)
		})

	}

}
// =============================================
// by Rouben Meschian start 

const intersect = (rect1, rect2) => {                           
    const x = Math.max(rect1.x, rect2.x),
        num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
        y = Math.max(rect1.y, rect2.y),
        num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
    return (num1 >= x && num2 >= y);
};



// by Rouben Meschian end
// =============================================
const update = function(){
	game.updateShip(gameData.ship);
	gameData.bullet.forEach(function(bullet){ 
		game.updateBullet(bullet);
	});

	gameData.easy.forEach(function(easy){ 
		game.updateEasyEnemy(easy);
	});

    gameData.bullet.forEach(bullet => {
        gameData.easy.forEach(easy => {
            if(intersect(bullet, easy)) {
            	easy.health -= bullet.damage;
                bullet.deleteme = true;
                 if(easy.health <= 0){
                 	easyDeath.currentTime = 0;
                 	easyDeath.play();
                 	points += easy.XP;
					pointCount.innerHTML = "Score = " + points;
                 	easy.deleteme = true;
                 }
            }
        });
    });

	gameData.hard.forEach(function(hard){
		game.updateHardEnemy(hard);
	});

    gameData.bullet.forEach(bullet => {
	    gameData.hard.forEach(hard => {
	        if(intersect(bullet, hard)) {
	        	hard.health -= bullet.damage;
	            bullet.deleteme = true;
	             if(hard.health <= 0){
		 			hand.currentTime = 0;
                 	hand.play();
                 	hand.volume = 0.5;
	             	points += hard.XP;
					pointCount.innerHTML = "Score = " + points;
	             	hard.deleteme = true;
	             }
	        }
	    });
    });

    gameData.easy.forEach(function(easy){
    	if(intersect(easy, gameData.ship)){
    		gameData.ship.health --;
    		easy.deleteme =true;
    		touch.play();
    	};
    });
	
	gameData.hard.forEach(function(hard){
		if(hard.x % 30 === 0 && hard.ydir === 0){
			gameData.fireball.push(creatFireball(hard.x))
		}
	})


    gameData.fireball.forEach(function(fireball){
    		if(fireball.y === 120){
    			fireballSound.currentTime = 0;
				fireballSound.play();
    		};
			game.updateFireball(fireball)
	});
	gameData.fireball.forEach(function(fireball){
		if(intersect(fireball, gameData.ship)){
			gameData.ship.health--;
			fireball.deleteme = true;
			touch.play();
		}
	})


	if(points > 2000){
		game.updateBoss(gameData.boss)
		gameData.bossFire.forEach(function(fire){
			if(fire.y < gameData.boss.y + 60 && fire.y > gameData.boss.y + 40){ 
				bossFireSound.currentTime = 0;
				bossFireSound.play()
			};
			game.updateBossFire(fire)
		})
	}

	gameData.bossFire.forEach(function(fire){
		if(intersect(fire, gameData.ship)){
			gameData.ship.health--;
			fire.deleteme = true;
			touch.play();
		}
	})

	if(intersect(gameData.boss, gameData.ship)){
		backgroundMusic.pause()
		deathSound.play(); 
		gameStatus = "lost"
	}


	gameData.bullet.forEach(function(bullet){
		if(intersect(bullet, gameData.boss)){
			gameData.boss.health -= bullet.damage;
			bullet.deleteme = true;
			if(gameData.boss.health <= 0){
				backgroundMusic.pause();
				bravo.play();
				bravo.volume = 1.0;
				congratulations.play();
				congratulations.volume = 0.7;
				congratulations.loop = true;
				gameStatus = 'You Win';
				ctx.drawImage(FinalImg, 0, 0, canvas.width, canvas.height);
				alert("!!!CONGRATULATIONS!!!");
				sub.innerHTML= "NOW GO AND SUBSCRIBE TO PEWDIEPIE"
			}
		}
	})


	const healthUpdate = function(){
		    if(gameData.ship.health > 1){
    			lifes.innerHTML = "Don't Worry, You Still Have " +gameData.ship.health+" Lifes"
    		};
    		if(gameData.ship.health === 1){
    			lifes.innerHTML = "Okey, Maybe You Should Start To Worry"
    		}
    		if (gameData.ship.health <= 0){
    			deathSound.currentTime = 0;
				deathSound.play();
				backgroundMusic.pause()
    			gameStatus = "lost";
    		}
	}
	healthUpdate()
	
	gameData.bullet = gameData.bullet.filter(bullet => !bullet.deleteme);
	gameData.easy = gameData.easy.filter(easy => !easy.deleteme)
	gameData.hard = gameData.hard.filter(hard => !hard.deleteme)
	gameData.fireball = gameData.fireball.filter(fireball => !fireball.deleteme)
	gameData.bossFire = gameData.bossFire.filter(bossFire => !bossFire.deleteme)
}


const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const spaceKey = 32;
document.addEventListener("keydown", function(e) {
	const keyCode = e.keyCode;
	const ship = gameData.ship;
	    if(keyCode === rightKey){
            gameData.ship.xdir = 7;
	    }
        else if(keyCode === leftKey){
            gameData.ship.xdir = -7;
        }
        else if(keyCode === upKey){
            gameData.ship.ydir = -7;
        }
        else if(keyCode === downKey){
            gameData.ship.ydir = 7;
        }
        else if(keyCode === spaceKey){
        	gameData.bullet.push(creatBullet(ship.x - 17, ship.y - 5))
        	gameData.bullet.push(creatBullet(ship.x + 15, ship.y - 5))
        }
})
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    const keyCode = e.keyCode;
    if(keyCode === rightKey || keyCode === leftKey) {
        gameData.ship.xdir = 0;
    } else if(keyCode === upKey || keyCode === downKey) {
       gameData.ship.ydir = 0;
    }
});


const loop = function(){
	if(gameStatus === "working"){
		draw();
		update();
		requestAnimationFrame(loop);
	}else if(gameStatus === "lost"){
		deathSound.currentTime = 0;
		deathSound.play();
		alert("You Are Already Dead")
	}
}

const add = function(){
	addEasy();
	addHard();
	addBossFire()

}

const Start = function(){
	if(gameStatus === 'stoped'){
		backgroundMusic.play();
		backgroundMusic.volume = 0.6;
		gameStatus = 'working';
		add()
		loop()
	}
}
