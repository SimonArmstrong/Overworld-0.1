var HealthBar = function(name, max)
{
	this.name = name;
	this.max = max;
	this.health = new Stat("Entity Health", max, max);
}