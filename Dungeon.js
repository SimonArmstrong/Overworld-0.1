var Dungeon = function()
{
	this.ROOM_WIDTH = 608;
	this.ROOM_HEIGHT = 448;
	
	this.position = new Vector2((canvas.width / 2) - (this.ROOM_WIDTH / 2), (canvas.height / 2) - (this.ROOM_HEIGHT / 2));
	this.PlayerPositionRelativeTo = new Vector2(this.position.x + player.position.x, this.position.y + player.position.y);
	
	this.wallleft = new Wall(this.position, new Vector2(32, this.ROOM_HEIGHT), "bridge.png");
	this.wallright = new Wall(this.position.add(new Vector2(this.ROOM_WIDTH, 0)), new Vector2(32, this.ROOM_HEIGHT), "bridge.png");
	this.walltop = new Wall(this.position.add(new Vector2(0, 0)), new Vector2(this.ROOM_WIDTH, 32), "bridge.png");
	this.wallbottom = new Wall(this.position.add(new Vector2(0, this.ROOM_HEIGHT)), new Vector2(this.ROOM_WIDTH + 32, 32), "bridge.png");
	
	this.walls = [];
	this.walls.push(this.wallleft);
	this.walls.push(this.wallright);
	this.walls.push(this.walltop);
	this.walls.push(this.wallbottom);
}

Dungeon.prototype.draw = function()
{
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	drawRect("#222", this.position, new Vector2(this.ROOM_WIDTH, this.ROOM_HEIGHT));
	this.position = new Vector2((canvas.width / 2) - (this.ROOM_WIDTH / 2), (canvas.height / 2) - (this.ROOM_HEIGHT / 2));
	this.PlayerPositionRelativeTo = new Vector2(this.position.x + player.position.x, this.position.y);
	//drawRect("#f00", this.PlayerPositionRelativeTo, new Vector2(2, 2));
	
	for(var i = 0; i < this.walls.length; i++)
	{
		this.walls[i].draw();
	}
}

var dungeon = new Dungeon();