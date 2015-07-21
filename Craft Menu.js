var Crafting = function()
{
	this.position = new Vector2(100, 100);
	this.scale = new Vector2(128, 128 + 32);
	this.title = "C R A F T I N G";
	this.open = false;
	
	this.componentSlotA = new Slot(new Vector2(this.position.x + 48, this.position.y + 32));
	this.componentSlotB = new Slot(new Vector2(this.position.x + 48, this.position.y + 74));
	this.recipeSlot = new Slot(new Vector2(this.position.x + 8, this.position.y + 74));
	
	this.recipeSlot.exclusiveType = "recipe";
	
	this.componentSlots = [];
	this.componentSlots.push(this.componentSlotA);
	this.componentSlots.push(this.componentSlotB);
	this.componentSlots.push(this.recipeSlot);
	
	this.highlightedSlot;
	this.dragging = false;
}

Crafting.prototype.get = function()
{
	this.helmet = 	 this.helmetSlot.item;
	this.chest = 	 this.chestSlot.item;
	this.lefthand =  this.leftHandSlot.item;
	this.righthand = this.rightHandSlot.item;
	this.boots = 	 this.shoeSlot.item;
}


Crafting.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + this.scale.x &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + 24)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Crafting.prototype.Remove = function(index)
{
	if(index === "all")
	{
		for (var i = 0; i < this.space; i++)
		{
			this.slots.splice(0, i);
			break;
		}
	}
	else
	{
		for (var i = 0; i < this.slots.length; i++)
		{
			if(i === index)
			{
				this.slots[i].items.splice(this.slots[i].items.length - 1, 1);
				if(this.slots[i].items.length === 0)
				{
					this.slots[i].items.push("undefined");
				}
				break;
			}
		}
	}
}

Crafting.prototype.draw = function()
{
	this.componentSlotA.position      = new Vector2(this.position.x + 8, this.position.y + 32);
	this.componentSlotB.position       = new Vector2(this.position.x + 88, this.position.y + 32);
	this.recipeSlot.position    = new Vector2(this.position.x + 48, this.position.y + 74) ;
	
	if(this.open)
	{
		drawRect("#333", this.position, new Vector2(this.scale.x, this.scale.y + 46));
		drawRect("#222", this.position, new Vector2(this.scale.x, 24));
		drawRect("#222", new Vector2(this.position.x + 4, this.position.y + 168), new Vector2(this.scale.x - 8, 34));
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + 16);
		for(var i = 0; i < this.componentSlots.length; i++)
		{
			this.componentSlots[i].draw();
			
			if(this.componentSlots[i].MouseOver())
			{
				this.highlightedSlot = this.componentSlots[i];
				context.drawImage(hilightImage, this.componentSlots[i].position.x, this.componentSlots[i].position.y);
				
				if(clicked && this.componentSlots[i].items[this.componentSlots[i].items.length - 1] != "undefined" && selectedItem === "undefined")
				{
					selectedItemIndex = i;
					selectedItem = this.highlightedSlot.items[this.componentSlots[i].items.length - 1];
					this.Remove(i);
				}
				else if(!clicked && this.componentSlots[i].items[this.componentSlots[i].items.length - 1] === "undefined" && this.componentSlots[i].exclusiveType === selectedItem.category)
				{
					this.highlightedSlot.items[this.componentSlots[i].items.length - 1] = selectedItem;
					selectedItem = "undefined";
				}
				else if(!clicked && this.componentSlots[i].items[this.componentSlots[i].items.length - 1].stackable === true && selectedItem.stackable === true && selectedItem === this.highlightedSlot.items[this.slots[i].items.length - 1])
				{
					this.componentSlots[i].items.push(selectedItem);
					selectedItem = "undefined";
				}
				else if(!clicked && this.componentSlots[i].items[this.componentSlots[i].items.length - 1] != "undefined" && selectedItem != "undefined")
				{
					if(this.componentSlots[selectedItemIndex].items[this.componentSlots[i].items.length - 1] === "undefined")
					{
						this.componentSlots[selectedItemIndex].items[this.componentSlots[i].items.length - 1] = this.highlightedSlot.items[this.componentSlots[i].items.length - 1];
					}
					this.highlightedSlot.items[this.componentSlots[i].items.length - 1] = selectedItem;
					selectedItem = "undefined";
				}
				if(this.componentSlots[i].items.length === 0)
				{
					dblClicked = false;
					this.Remove(i);
				}
			}
		}
	}
}

Crafting.prototype.update = function()
{
	if(this.open)
	{
		if(this.MouseOver() && mouseDOWN === true && selectedItem === "undefined"){
			this.dragging = true;
		}
		else if(mouseUP === true)
		{
			this.dragging = false;
		}
		
		if(this.dragging)
		{
			this.position = new Vector2(mousePosition.x - (this.scale.x / 2), mousePosition.y - 16);
		}
		
		if(this.MouseOver() && dblClicked === true)
		{
			this.open = false;
			dblClicked = false;
		}
	}
	if(selectedItem != "undefined"){
		context.drawImage(selectedItem.image, mousePosition.x, mousePosition.y);
	}
}