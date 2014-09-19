// start slingin' some d3 here.
var body = d3.select("body");

var getNewEnemyLocations = function(numEnemies){
	//Create all enemy (starting) locations
	var enemyLocations = [];
	for(var i=0; i<numEnemies; i++){
		enemyLocations.push([Math.floor(Math.random()*boardWidth), Math.floor(Math.random()*boardHeight)])
	}
	return enemyLocations;
}

var createEnemies = function(){
	//Create and append the enemies to the Game Board
	var enemyLocations = getNewEnemyLocations(10);
	var allEnemies = board.selectAll("svg").data(enemyLocations).enter().append('circle');
	allEnemies.attr('class', 'enemy').attr('cx', function(d){
		return d[0];	
	}).attr('cy', function(d){
		return d[1];
	}).attr('r', 10);
}

var moveEnemies = function(){
	var enemyLocations = getNewEnemyLocations(10);
	var allEnemies = board.selectAll('circle').data(enemyLocations).transition().duration(1500).attr('cx', function(d){
		return d[0];	
	}).attr('cy', function(d){
		return d[1];
	}).attr('r', 10);
}

//Game board
var board = d3.select("#board");
var boardWidth = 700;
var boardHeight = 470;


//Start Positions
createEnemies(getNewEnemyLocations(10));

//Move Enemies
var moveEnemiesInterval = setInterval(function(){moveEnemies(10);}, 1500);

