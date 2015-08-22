var DRAWCOLLISION = false;
var DEV = true;
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var randomChest = Math.floor(Math.random() * 400);
var randomChesta = Math.floor(Math.random() * 400);
var chest = new Container([Potions[0], Armours[1], Weapons[3], Recipes[0]], new Vector2(player.position.x - 64, player.position.y), randomChest);
var achest = new Container([Weapons[9], Potions[1], Weapons[3], Weapons[4]], new Vector2(player.position.x + 64, player.position.y + 10), randomChesta);

entities.push(chest);
entities.push(achest);

function DrawEntities()
{
	for(var i = 0; i < entities.length; i++)
	{
		entities[i].draw();
		if(entities[i].MouseOver() && dblClicked === true)
		{
			entities[i].Open();
			dblClicked = false;
		}
		if(entities[i].open)
		{
			entities[i].inventory.draw();
			entities[i].inventory.update();
		}
	}
	for(var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw();
	}
}

function DrawEnemies(deltaTime)
{
	for(var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw(); enemies[i].update(deltaTime);
		
		if(enemies[i].isDead === true)
		{
			enemies.splice(i, 1);
		}
	}
}

function DrawPlayer(deltaTime)
{
	player.draw();
	player.update(deltaTime);
	
	if(DRAWCOLLISION)
	{
		for(var i = 0; i < colliders.length; i++)
		{
			colliders[i].draw("#f00");
		}
	}
	
	for(var i = 0; i < player.Stats.length; i++)
	{
		player.Stats[i].update();
	}
}

function DrawDev(deltaTime)
{
	fpsTime += deltaTime;
	fpsCount++;
	
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}	
	
	context.font = "12px Verdana";
	context.fillStyle = "#fff";
	context.fillText("Entities: " + entities.length, 10, 16);
	context.fillText("Enemies: " + enemies.length, 10, 28);
	context.fillText("Frames: " + fps, 10, 40);	
	context.fillText("---Controls---", 10, 66);	
	context.fillText("Spawn Enemy: P", 10, 78);	
	context.fillText("Open Inventory: I", 10, 90);	
	context.fillText("Open Equipment: E", 10, 104);	
	context.fillText("Open Crafting: Q ", 10, 116);	
	context.fillText("Movement: W, A, S, D", 10, 128);	
	context.fillText("Hotbar: 1 - 0", 10, 140);	
	context.fillText("Increase Level: Z", 10, 152);
	
	//devInv.draw();
	//devInv.update();
}

function DrawUI()
{
	player.drawUI();
	
	var instImg = document.createElement("img");
	instImg.src = "Instructions.png";
	context.drawImage(instImg, 0, 0);
	
	player.inventory.draw();
	player.inventory.update();
	player.equipment.draw();
	player.equipment.update();
	player.craft.draw();
	player.craft.update();
	if(DEV)
		devInv.draw();
	if(mouseMoving){
		context.drawImage(mouseIcon, mousePosition.x, mousePosition.y);
	}
}
////////////OLD STUFFY STUFF////////// ***** Still important
{
function run()
{
	var deltaTime = getDeltaTime();
	dev();
	
	Update(deltaTime);
}

function checkInput()
{
	player.input();
	if(Input.keys[Input.P] === true && DEV)
	{
		//var rndMob = Math.floor(Math.random() * 1);
		enemies.push(new Enemy("Dagg", new Vector2(58, 28), true, Math.floor(Math.random() * 10) + 1));
	}
	if(Input.keys[Input.Z] === true && DEV)
	{
		player.LevelUp();
	}
}

window.addEventListener('keydown', checkInput);
window.addEventListener('keyup', checkInput);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('dblclick', doubleClick);

function dev()
{	
	var WIPImage = document.createElement("img");
	WIPImage.src = "title screen.png";

	var DEVICO = document.createElement("img");
	DEVICO.src = "DevIcon.png"
	
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	context.drawImage(WIPImage, 10, 100);
	context.drawImage(DEVICO, 0, 630);
}

States();
}

function Update(deltaTime)
{
	dungeon.draw();
	DrawPlayer(deltaTime);
	DrawEntities();
	DrawEnemies(deltaTime);
	DrawUI();
	if(DEV)
		DrawDev(deltaTime);
}