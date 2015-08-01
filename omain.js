var DRAWCOLLISION = false;
var DEV = true;
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var entities = [];
function DrawEntities()
{
	for(var i = 0; i < entities.length; i++)
	{
		entities[i].draw();
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
		player.collider.draw("#f00");
		player.ABOVE.draw("#0f0");
		player.BELOW.draw("#0f0");
		player.LEFT.draw("#0f0");
		player.RIGHT.draw("#0f0");
		player.detectionRadius.draw("#f0f");
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
	
	//devInv.draw();
	//devInv.update();
}

function DrawUI()
{
	player.drawUI();
	player.inventory.draw();
	player.inventory.update();
	player.equipment.draw();
	player.equipment.update();
	player.craft.draw();
	player.craft.update();
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
		enemies.push(new Enemy("Dagg", new Vector2(58, 28), false, Math.floor(Math.random() * 10) + 1));
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