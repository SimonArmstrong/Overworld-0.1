var DIR_LEFT  = 0;
var DIR_UP    = 1;
var DIR_RIGHT = 2;
var DIR_DOWN  = 3;

//Image loads
var imageRight = document.createElement("img");
imageRight.src = "player_right.png";

var imageLeft = document.createElement("img");
imageLeft.src = "player.png";

//Animations
var IDLE_LEFT = 0;
var IDLE_RIGHT = 1;
var WALK_LEFT = 2;
var WALK_RIGHT = 3;
var ATTACK_LEFT = 4;
var ATTACK_RIGHT = 5;
 
//Animation States
var IDLE = 0;
var MOVING = 1;
var ATTACKING = 2;
var HIT = 3;
var ROLLING = 4;

var Player = function()
{
	//Transform details
	this.scale = new Vector2(32, 32);
	this.position = new Vector2(CENTER.x - (this.scale.x / 2), CENTER.y - (this.scale.y / 2), this);
	this.collider = new Collider("player", this.position, this.scale);
	this.direction = DIR_LEFT;
	this.moving = false;
	this.ObjectType = "Entity";
	this.attacking = false;
	this.atkCooldown = 0.5;
	this.detectionRadius = new Collider("player", new Vector2(this.position.x - 128, this.position.y - 128), new Vector2(288, 288));
	
	//Direction Check Collision
	this.ABOVE = new Collider("player", new Vector2(this.position.x, this.position.y - 32), new Vector2(6,32), this);
	this.BELOW = new Collider("player", new Vector2(this.position.x, this.position.y + 32), new Vector2(6, 32), this);
	this.LEFT = new Collider("player", new Vector2 (this.position.x - 32, this.position.y), new Vector2(32, 6), this);
	this.RIGHT = new Collider("player", new Vector2(this.position.x + 32, this.position.y), new Vector2(32, 6), this);
	
	//Player Image
	this.sprite = new Sprite("player_anim.png");
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, [1,2,3,2,1]);
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, [5,6,7,6,5]);
	
	this.lsprite = new Sprite("player_anim_lower.png");
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, [1,2,3,2,1]);
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, [5,6,7,6,5]);
								
	//player Sword
	this.sSprite = new Sprite("player_anim_sword_Dark Sword.png");
	this.sSprite.buildAnimation(4, 4, 32, 32, 0.1, [0]);
	this.sSprite.buildAnimation(4, 4, 32, 32, 0.1, [4]);
	this.sSprite.buildAnimation(4, 4, 32, 32, 0.1, [1,2,3,2,1]);
	this.sSprite.buildAnimation(4, 4, 32, 32, 0.1, [5,6,7,6,5]);
	this.sSprite.buildAnimation(4, 4, 32, 32, 0.1, [10, 11]);
	this.sSprite.buildAnimation(4, 4, 32, 32, 0.1, [14, 15]);
								
	//player Shield
	this.shSprite = new Sprite("player_anim_shield_Iron Shield.png");
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, [1,2,3,2,1]);
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, [5,6,7,6,5]);
	
	//Animation Offsets
	for(var i = 0; i < 6; i++)
	{
		this.sprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
		this.sSprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
		this.shSprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
		this.lsprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
	}
	this.animState = IDLE;
	
	//Equipment
	this.equipment = new Equipment();
	this.hotbar = new Hotbar();
	this.craft = new Crafting();
	
	//Stats
	this.inventory = new Inventory(5, 5, "I N V E N T O R Y");
	this.isDead = false;
	
	//Base
	this.strength = new Stat("STR", 5, 200);
	this.dexterity = new Stat("DEX", 5, 200);
	this.intelligence = new Stat("INT", 5, 200);
	this.luck = new Stat("LUK", 5, 200);
	
	//Vitals
	this.health = new Stat("Health", 100, 100);
	this.mana = new Stat("Mana", 100, 100);
	this.attack = new Stat("Attack", 1, 200);
	this.defence = new Stat("Defence", 1, 200);
	this.mAttack = new Stat("Magic Attack", 1, 200);
	this.accuracy = new Stat("Accuracy", 1, 200);
	this.speed = new Stat("Speed", 180, 250);
	
	//Level
	this.experience = new Stat("Exp", 0, 100);
	this.level = new Stat("Level", 1, 300)
	
	//Stat arrays
	this.Stats = [];
	this.bStats = [];
}

Player.prototype.input = function()
{
	if(player.isDead === false)					//Only take input for the player if they're not dead.
	{
		if(Input.KeyDown(Input.KEY_UP))
		{
			this.moving = true;
			this.direction = DIR_UP;
		}
		else if(Input.KeyDown(Input.KEY_DOWN))
		{
			this.moving = true;
			this.direction = DIR_DOWN;
		}
		else if(Input.KeyDown(Input.KEY_LEFT))
		{
			this.moving = true;
			this.direction = DIR_LEFT;
		}
		else if(Input.KeyDown(Input.KEY_RIGHT))
		{
			this.moving = true;
			this.direction = DIR_RIGHT;
		}
		else
		{
			this.moving = false;
		}
	}
	else	//Stop moving if no movement inputs are current
	{
		this.moving = false;
	}
		
	if(Input.keys[Input.I] === true && this.inventory.open === false)	//Opens the inventory if it's currently closed when I is pressed.
	{
		this.inventory.open = true;
	}
	else if(Input.keys[Input.I] === true && this.inventory.open === true)	//Closes the inventory if it's currently open when I is pressed.
	{
		this.inventory.open = false;
	}
	
	if(Input.keys[Input.E] === true && this.equipment.open === false)	//Opens the eqp inventory if it's currently closed when E is pressed.
	{
		this.equipment.open = true;
	}
	else if(Input.keys[Input.E] === true && this.equipment.open === true)	//Closes the eqp inventory if it's currently open when E is pressed.
	{
		this.equipment.open = false;
	}
	
	if(Input.keys[Input.Q] === true && this.craft.open === false)	//Opens the craft inventory if it's currently closed when Q is pressed.
	{
		this.craft.open = true;
	}
	else if(Input.keys[Input.Q] === true && this.craft.open === true)	//Closes the craft inventory if it's currently open when Q is pressed.
	{	
		this.craft.open = false;
	}
}

Player.prototype.update = function(deltaTime)
{
	this.collider.position = new Vector2(this.position.x - 10, this.position.y + 6);
	this.collider.scale = new Vector2(20, 10);
	
	this.ABOVE.position = new Vector2(this.position.x - 3, this.position.y - 24);
	this.BELOW.position = new Vector2(this.position.x - 3, this.position.y + 14);
	this.LEFT.position = new Vector2 (this.position.x - 40, this.position.y + 8);
	this.RIGHT.position = new Vector2(this.position.x + 8, this.position.y + 8);
	
	this.lsprite.update(deltaTime);
	this.sprite.update(deltaTime);
	this.sSprite.update(deltaTime);
	this.shSprite.update(deltaTime);
	
	for(var i = 0; i < colliders.length; i++)
	{
		if(colliders[i].tag != "player" && colliders[i].tag != "enemy")
		{
			if(this.ABOVE.isTouching(colliders[i]) && this.collider.isTouching(colliders[i]))
			{
				this.position.y += this.speed.maximum * deltaTime;
			}
			else if(this.BELOW.isTouching(colliders[i]) && this.collider.isTouching(colliders[i]))
			{
				this.position.y -= this.speed.maximum * deltaTime;
			}
			else if(this.LEFT.isTouching(colliders[i]) && this.collider.isTouching(colliders[i]))
			{
				this.position.x += this.speed.maximum * deltaTime;
			}
			else if(this.RIGHT.isTouching(colliders[i]) && this.collider.isTouching(colliders[i]))
			{
				this.position.x -= this.speed.maximum * deltaTime;
			}
		}
	}
	
	this.detectionRadius = new Collider("player", new Vector2(this.position.x - 144, this.position.y - 132), new Vector2(288, 288));
	
	if(this.equipment.righthand != "undefined")
	{
		this.sSprite.image.src = "player_anim_sword_" + this.equipment.righthand.name + ".png";
	}
	if(this.equipment.lefthand != "undefined")
	{
		this.shSprite.image.src = "player_anim_shield_" + this.equipment.lefthand.name + ".png";
	}
	
	if(Input.keys[Input.M] === true && this.atkCooldown <= 0)
	{
		this.attacking = true;
		this.atkCooldown = 0.5;
	}
	
	if(this.attacking && this.direction === DIR_LEFT)
	{
		if(this.atkCooldown >= 0)
		{
			this.sSprite.setAnimation(ATTACK_LEFT);
			this.sprite.setAnimation(WALK_LEFT);
		}
		else
		{
			this.attacking = false;
		}
	}
	else if(this.attacking && this.direction === DIR_RIGHT)
	{
		if(this.atkCooldown >= 0)
		{
			this.sSprite.setAnimation(ATTACK_RIGHT);
			this.sprite.setAnimation(WALK_RIGHT);
		}
		else
		{
			this.attacking = false;
		}
	}
	else
	{
		this.atkCooldown -= deltaTime;
		
		if(this.moving)
		{
			this.animState = MOVING;
		}
		
		if(this.animState === MOVING)
		{
			if(this.direction === DIR_UP && this.moving)
			{
				this.position.y -= this.speed.maximum * deltaTime;
			}
			if(this.direction === DIR_DOWN && this.moving)
			{
				this.position.y += this.speed.maximum * deltaTime;
			}
			
			if(this.direction === DIR_LEFT && this.moving)
			{
				this.position.x -= this.speed.maximum * deltaTime;
				
				if(this.sprite.currentFrame === this.sprite.animations.length)
				{
					this.sprite.currentFrame = 0;
				}
				if(this.sprite.currentFrame === 0)
				{
					this.sprite.setAnimation(WALK_LEFT);
					this.sSprite.setAnimation(WALK_LEFT);
					this.shSprite.setAnimation(WALK_LEFT);
					this.lsprite.setAnimation(WALK_LEFT);
				}
			}
			else if(this.direction === DIR_LEFT)
			{
				this.sprite.setAnimation(IDLE_LEFT); 
				this.sSprite.setAnimation(IDLE_LEFT);
				this.shSprite.setAnimation(IDLE_LEFT);
				this.lsprite.setAnimation(IDLE_LEFT);
			}
			
			if(this.direction === DIR_RIGHT && this.moving)
			{
				if(this.sprite.currentFrame === this.sprite.animations.length)
				{
					this.sprite.currentFrame = 0;
				}
				if(this.sprite.currentFrame === 0)
				{
					this.sprite.setAnimation(WALK_RIGHT);
					this.sSprite.setAnimation(WALK_RIGHT);
					this.shSprite.setAnimation(WALK_RIGHT);
					this.lsprite.setAnimation(WALK_RIGHT);
				}
				this.position.x += this.speed.maximum * deltaTime;
			}
			else if(this.direction === DIR_RIGHT)
			{
				this.sprite.setAnimation(IDLE_RIGHT); 
				this.sSprite.setAnimation(IDLE_RIGHT);
				this.shSprite.setAnimation(IDLE_RIGHT);
				this.lsprite.setAnimation(IDLE_RIGHT);
			}
		}
		else if(this.animState === ATTACKING)
		{
			
		}
	}

	
	this.Stats.push(this.level);
	this.Stats.push(this.experience);
	this.Stats.push(this.health);
	this.Stats.push(this.mana);
	this.Stats.push(this.attack);
	this.Stats.push(this.mAttack);
	this.Stats.push(this.accuracy);
	this.Stats.push(this.defence);
	this.Stats.push(this.speed);
	
	this.bStats.push(this.strength);
	this.bStats.push(this.dexterity);
	this.bStats.push(this.intelligence);
	this.bStats.push(this.luck);
	
	for(var i = 0; i < this.Stats.length; i++)
	{
		if(this.Stats[i].amount > this.Stats[i].maximum)
		{
			if(this.Stats[i].name === "Exp")
			{
				this.level.amount++;
				this.Stats[i].maximum = this.Stats[i].maximum + (this.Stats[i].maximum / 4);
				this.Stats[i].amount = 0;
				this.LevelUp();
			}
			else
			{
				this.Stats[i].amount = this.Stats[i].maximum;
			}
		}
		if(this.Stats[i].amount <= 0)
		{
			this.Stats[i].amount = 0;
		}
	}
}

Player.prototype.LevelUp = function()
{
	player.health.maximum += player.health.maximum / 2;
	player.mana.maximum += player.mana.maximum / 2;
}

Player.prototype.draw = function()
{
	if(player.isDead === false)
	{
		context.drawImage(shadowImage, this.position.x - 16, this.position.y - 14);
	
		this.lsprite.draw(context, this.position.x, this.position.y);
		this.sprite.draw(context, this.position.x, this.position.y);
		if(this.equipment.rightHandSlot.items[0] != "undefined")
		{
			this.sSprite.draw(context, this.position.x, this.position.y);
		}
		if(this.equipment.leftHandSlot.items[0] != "undefined")
		{
			this.shSprite.draw(context, this.position.x, this.position.y);
		}
	}
}

Player.prototype.drawUI = function()
{
	var UIposition = new Vector2(canvas.width / 4, 8);
	
	context.fillStyle = "#fff";
	context.font = "24px Trebuchet MS";
	context.fillText("LV. " + this.level.amount, UIposition.x - 128, UIposition.y + 24);
	drawRect("#333", new Vector2(UIposition.x - 20, UIposition.y), new Vector2(196, 32));
	context.font = "8px Verdana";
	
	context.fillStyle = "#fff";
	context.fillText("HP:", UIposition.x - 16, UIposition.y + 9);
	drawRect("#000", new Vector2(UIposition.x, UIposition.y + 2), new Vector2(128, 8));
	drawRect("#f00", new Vector2(UIposition.x + 2, UIposition.y + 4), new Vector2((this.health.amount / this.health.maximum) * 124, 5));
	context.fillStyle = "#fff";
	context.fillText(Math.floor(this.health.amount) + "/" + Math.floor(this.health.maximum), UIposition.x + 130, UIposition.y + 9);
	
	context.fillText("MP:", UIposition.x - 16, UIposition.y + 19);
	drawRect("#000", new Vector2(UIposition.x, UIposition.y + 12), new Vector2(128, 8));
	drawRect("#00f", new Vector2(UIposition.x + 1, UIposition.y + 14), new Vector2((this.mana.amount / this.mana.maximum) * 124 + 1, 5));
	context.fillStyle = "#fff";
	context.fillText(Math.floor(this.mana.amount) + "/" + Math.floor(this.mana.maximum), UIposition.x + 130, UIposition.y + 19);
	
	context.fillText("XP:", UIposition.x - 16, UIposition.y + 29);
	drawRect("#000", new Vector2(UIposition.x, UIposition.y + 22), new Vector2(128, 8));
	drawRect("#ff0", new Vector2(UIposition.x + 2, UIposition.y + 24), new Vector2((this.experience.amount / this.experience.maximum) * 124, 5));
	context.fillStyle = "#fff";
	context.fillText(Math.floor(this.experience.amount) + "/" + Math.floor(this.experience.maximum), UIposition.x + 130, UIposition.y + 29);
	
	player.hotbar.draw();
}

var player = new Player();