// start slingin' some d3 here.
var body = d3.select("body");
var board = d3.select("#board");
console.log(board);
var enemyLocations = [];
var numEnemies = 10;

//Game board
var boardWidth = 700;
var boardHeight = 470;

for(var i=0; i<numEnemies; i++){
	enemyLocations.push([Math.floor(Math.random()*boardWidth), Math.floor(Math.random()*boardHeight)])
}

var allEnemies = board.selectAll("svg").data(enemyLocations).enter().append('circle');
allEnemies.attr('class', 'enemy').attr('cx', function(d){
	return d[0];	
}).attr('cy', function(d){
	return d[1];
}).attr('r', 10);
