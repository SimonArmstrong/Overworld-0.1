{	// *** Mouse Inputs ***
	var mousePosition = new Vector2(0, 0);
	var mouseIcon = document.createElement("img");
	mouseIcon.src = "MouseIcon.png";
	var mouseMoving = false;
	var mouseUP = false;
	var mouseDOWN = false;
	
	function mouseMove(e)
	{
		if(player.inventory.open)
		{
			//player.inventory.draw();
		}
		mousePosition = new Vector2(e.clientX, e.clientY);
		mouseMoving = true;
	}

	var clicked = false;
	var dblClicked = false;

	function mouseDown(e)
	{
		clicked = true;
		mouseUP = false;
		mouseDOWN = true;
		mouseMove = false;
	}
	
	function doubleClick(e)
	{
		dblClicked = true;
		//dblClicked = false;
	}
	
	function mouseUp(e)
	{
		mouseUP = true;
		mouseDOWN = false;
		clicked = false;
	}
}

var slotImage = document.createElement("img");
slotImage.src = "slot.png";

var Slot = function(vec_p)
{
	//this.item = "undefined";
	this.image = slotImage;
	this.size = new Vector2(32, 32);
	this.position = vec_p;
	this.items = ["undefined"];
	this.exclusiveType = "undefined";
}

Slot.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + this.size.x &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + this.size.y)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Slot.prototype.draw = function(style)	// Style = 1: Draw Image		Style = 0: Draw rectangle
{
	if(style === 0 || style === "undefined")
	{
		context.fillStyle = "#fff";
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		//context.fillText(this.item.name, this.position.x, this.position.y + 22, this.size.x, this.size.y);
	}
	else
	{
		context.fillStyle = "#fff";
		context.drawImage(this.image, this.position.x, this.position.y);
		if(this.items[this.items.length - 1] != "undefined")
		{
			context.drawImage(this.items[this.items.length - 1].image, this.position.x, this.position.y);
			context.drawImage(this.items[this.items.length - 1].rImage, this.position.x, this.position.y);
		}
	}
}