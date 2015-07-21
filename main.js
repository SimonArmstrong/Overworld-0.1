var randomChest = Math.floor(Math.random() * 400);
console.log(randomChest);
var chest = new Container([Potions[0], Potions[1], Weapons[3], Weapons[4]], new Vector2(player.position.x - 64, player.position.y), randomChest);
chest.pushable = true;

var WIPImage = document.createElement("img");
WIPImage.src = "title screen.png";

function checkInput()
{
	player.input();
}
	
window.addEventListener('keydown', checkInput);
window.addEventListener('keyup', checkInput);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('dblclick', doubleClick);

var LEFT_WALL = new Wall(new Vector2(512, 0), new Vector2(32, canvas.height), "WallTestTile.png");
var RIGHT_WALL = new Wall(new Vector2(1024, 0), new Vector2(32, canvas.height), "WallTestTile.png");

var chests = [];
chests.push(chest);
var colliders = [];
colliders.push(chest);
colliders.push(LEFT_WALL);
colliders.push(RIGHT_WALL);



//dungeon.build();
function run()
{
	var deltaTime = getDeltaTime();
	
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	
	context.drawImage(WIPImage, 10, 100);
	
	dungeon.draw(deltaTime);
	
	/*
	context.drawImage(floorTestImg, 670, 132);
	context.drawImage(floorTestImg, 670, 380);
	context.drawImage(floorTestImg, 670, 632);
	context.drawImage(floorTestImg, 370, 380);
	context.drawImage(floorTestImg, 970, 380);
	*/
	player.draw();
	
	
	for(var i = 0; i < chests.length; i++)
	{
		//chests[i].draw();
		if(chests[i].MouseOver() && dblClicked === true)
		{
			chests[i].Open();
			dblClicked = false;
		}
		if(chests[i].open)
		{
			chests[i].inventory.draw();
			chests[i].inventory.update();
		}
	}
	
	
	//Player Drawing
	if(player.inventory.open === true){
		player.inventory.draw();
	}

	player.equipment.update();
	player.equipment.draw();
	player.craft.update();
	player.craft.draw();
	player.update(deltaTime);
	for(var i = 0; i < colliders.length; i++)
	{
		if(player.ABOVE.isTouching(colliders[i].collider) && player.collider.isTouching(colliders[i].collider))
		{
			player.position.y += player.speed.maximum * deltaTime;
			if(colliders[i].pushable === true && colliders[i].pushable != "undefined")
			{
				colliders[i].position.y -= player.speed.maximum * deltaTime;
			}
			if(Input.onKeyDown(Input.F) && colliders[i].inventory.open === false)
			{
				colliders[i].inventory.open = !colliders[i].inventory.open;
			}
		}
		else if(player.BELOW.isTouching(colliders[i].collider) && player.collider.isTouching(colliders[i].collider))
		{
			player.position.y -= player.speed.maximum * deltaTime;
			if(colliders[i].pushable === true && colliders[i].pushable != "undefined")
			{
				colliders[i].position.y += player.speed.maximum * deltaTime;
			}
		}
		else if(player.LEFT.isTouching(colliders[i].collider) && player.collider.isTouching(colliders[i].collider))
		{
			player.position.x += player.speed.maximum * deltaTime;
			if(colliders[i].pushable === true && colliders[i].pushable != "undefined")
			{
				colliders[i].position.x -= player.speed.maximum * deltaTime;
			}
		}
		else if(player.RIGHT.isTouching(colliders[i].collider) && player.collider.isTouching(colliders[i].collider))
		{
			player.position.x -= player.speed.maximum * deltaTime;
			if(colliders[i].pushable === true && colliders[i].pushable != "undefined")
			{
				colliders[i].position.x += player.speed.maximum * deltaTime;
			}
		}
		colliders[i].draw();
	}
	
	if(dialogueWindow.show)
	{
		dialogueWindow.draw();
		dialogueWindow.update();
	}
	
	player.drawUI();
	player.collider.draw("#f00");
	player.ABOVE.draw("#0f0");
	player.BELOW.draw("#0f0");
	player.LEFT.draw("#0f0");
	player.RIGHT.draw("#0f0");
	
	devInv.draw();
	devInv.update();
	
	if(mouseMoving){
		context.drawImage(mouseIcon, mousePosition.x, mousePosition.y);
	}
	
	player.inventory.update();
	for(var i = 0; i < player.Stats.length; i++)
	{
		player.Stats[i].update();
	}
	for(var i = 0; i < chests.length; i++)
	{
		if(selectedItem != "undefined" && !clicked && chests[i].MouseOver())
		{
			chests[i].Add(selectedItem);
			selectedItem = "undefined";
		}
		chests[i].collider.draw("#00f");
	}
}

States();