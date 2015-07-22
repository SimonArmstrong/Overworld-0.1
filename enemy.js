var Enemy = function(vec_p, vec_s)
{
	this.position = vec_p;
	this.scale = vec_s;
	this.collider = new Collider("", this.position, this.scale);
	
	this.image = document.createElement("img");
	this.image.src = "Dagg.png";
	
	this.direction = 0;
	this.speed = 100;
}

Enemy.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x, this.position.y);
}
var changedir = 1;
Enemy.prototype.update = function(deltaTime)
{
	changedir -= deltaTime;
	if(changedir <= 0)
	{
		this.direction = Math.floor(Math.random() * 4);
		changedir = 1;
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
	this.collider = new Collider("", this.position, this.scale);
}

var dagg = new Enemy(new Vector2(626, 300), new Vector2(58, 28));
