var COLLIDEWITHOTHERS = false;

var Enemy = function(name, vec_s, hostile, level)
{
	this.position = new Vector2(CENTER.x, CENTER.y);
	this.scale = vec_s;
	this.name = name;
	this.id = enemies.length;
	if(COLLIDEWITHOTHERS)
	{
		this.collider = new Collider("enemy" + this.id, this.position, this.scale);
	}
	else
	{
		this.collider = new Collider("enemy", this.position, this.scale);
	}
	
	this.image = document.createElement("img");
	this.image.src = this.name + ".png";
	
	this.direction = 0;
	this.speed = 100;
	
	this.level = level;
	
	this.health = new Stat("Entity Health", 20, 20);
	this.isDead = false;
	this.isHostile = hostile;
	
	this.health.maximum = this.health.maximum * this.level;
	this.health.amount = this.health.amount * this.level;
	//Add all enemies to enemies array
	enemies.push(this);	
}

Enemy.prototype.draw = function()
{
	if(!this.isDead)
	{
		context.drawImage(this.image, this.position.x, this.position.y);
		if(this.health.amount < this.health.maximum)
		{
			if(this.level > player.level.amount + 2)
			{
				context.fillStyle = "#f00";
			}
			else if(this.level < player.level.amount - 2)
			{
				context.fillStyle = "0f0"
			}
			else
			{
				context.fillStyle = "#fff";
			}
			context.font = "8px Verdana";
			context.fillText("LV." + this.level + " " + this.name, this.position.x, this.position.y - 18);
			drawRect("#0f0", new Vector2(this.position.x, this.position.y - 12), new Vector2((this.health.amount / this.health.maximum) * 72, 4));
		}
		//this.health.amount = 19;
		if(this.health.amount <= 0)
		{
			this.health.amount = 0;
			this.isDead = true;
		}
		if(this.health.amount >= this.health.maximum)
		{
			this.health.amount = this.health.maximum;
		}
	}
}

var changedir = 1;

Enemy.prototype.update = function(deltaTime)
{
	if(!this.isDead)
	{
		if(this.collider.isTouching(player.detectionRadius) && this.isHostile)
		{
			if(this.position.y < player.position.y + 16)
			{
				this.direction = 3;
			}
			if(this.position.y > player.position.y - 16)
			{
				this.direction = 2;
			}
			if(this.position.y >= player.position.y - 16 && this.position.y <= player.position.y + 16)
			{
				if(this.position.x < player.position.x)
				{
					this.direction = 0;
				}
				if(this.position.x > player.position.x)
				{
					this.direction = 1;
				}
			}
		}
		else
		{
			changedir -= deltaTime;
			if(changedir <= 0)
			{
				this.direction = Math.floor(Math.random() * 4);
				changedir = 1;
			}
			for(var i = 0; i < colliders.length; i++)
			{
				if(COLLIDEWITHOTHERS)
				{
					if(colliders[i].tag != "player" && colliders[i].tag != "enemy" + this.id)
					{
						if(this.collider.isTouching(colliders[i]))
						{
							switch(this.direction)
							{
								case 0:
								this.direction = 1;
								break;
								case 1:
								this.direction = 0;
								break;
								case 2:
								this.direction = 3;
								break;
								case 3:
								this.direction = 2;
								break;
							}
						}
					}
				}
				else
				{
					if(colliders[i].tag != "player" && colliders[i].tag != "enemy")
					{
						if(this.collider.isTouching(colliders[i]))
						{
							switch(this.direction)
							{
								case 0:
								this.direction = 1;
								break;
								case 1:
								this.direction = 0;
								break;
								case 2:
								this.direction = 3;
								break;
								case 3:
								this.direction = 2;
								break;
							}
						}
					}
				}
			}
		}
		switch(this.direction)
		{
			case 0:
			this.position.x += this.speed * deltaTime;
			break;
			case 1:
			this.position.x -= this.speed * deltaTime;
			break;
			case 2:
			this.position.y -= this.speed * deltaTime;
			break;
			case 3:
			this.position.y += this.speed * deltaTime;
			break;
		}
		this.collider.position = new Vector2(this.position.x, this.position.y);
		
		if(this.collider.isTouching(player.collider) && this.isHostile)
		{
			player.health.amount -= 1;
		}
	}
}
