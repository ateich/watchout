// start slingin' some d3 here.
var body = d3.select("body");
var score = 0;
var scoreNode = body.select('#score');
var highScore = 0;
var highScoreNode = body.select('#highScore');

var didCollide = function(node1, node2){
	// console.log(node1, node2);
	// console.log('checking for collision');

	if(Array.isArray(node1)){
		var x1 = node1[0];
		var y1 = node1[1];
	} else {
		var x1 = node1.attr('cx');
		var y1 = node1.attr('cx');
	}

	var x2 = parseFloat(node2.attr('cx'));
	var y2 = parseFloat(node2.attr('cy'));
	var radius = 10;

	// console.log(x1, x2, y1, y2);

	//Pseudocode - have not verified key value pairs
	if(x1 >= x2 && x1 <= x2 + radius
		|| x2 >= x1 && x2 <= x1 + radius)
	{
		//X-Axis Collision
		// console.log('X COLLISION');

		if(y1 >= y2 && y1 <= y2 + radius
		|| y2 >= y1 && y2 <= y1 + radius){
			//X&Y-Axis Collision
			// console.log('Y COLLISION');
			return true;
		}
	}
	return false;
}

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
	var enemyLocations = getNewEnemyLocations(numEnemies);
	var allEnemies = board.selectAll("svg").data(enemyLocations).enter().append('circle');
	allEnemies.attr('class', 'enemy').attr('cx', function(d){
		return d[0];	
	}).attr('cy', function(d){
		return d[1];
	}).attr('r', circleRadius);

	return board.selectAll('.enemy');
	moveEnemies();
}

var moveEnemies = function(){
	var enemyLocations = getNewEnemyLocations(numEnemies);
	var allEnemies = enemies.data(enemyLocations).transition().duration(1500).attr('cx', function(d){
		return d[0];	
	}).attr('cy', function(d){
		return d[1];
	}).attr('fill', function(){
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	});
}

var circleRadius = 10;

//Game board
var board = d3.select("#board");
var boardWidth = 700;
var boardHeight = 470;

//Player
var pX = boardWidth/2 - 8;
var pY = boardHeight/2 -8;
var player = board.selectAll("svg").data([[pX, pY]]).enter().append('circle');
player.attr('class', 'player').attr('cx', function(d){
	return d[0];
}).attr('cy', function(d){
	return d[1];
}).attr('r', circleRadius).attr('fill', 'blue');
// console.log(player);
// console.log(board.selectAll('.player'));
player = board.selectAll('.player');

//Enemies
var numEnemies = 10;
var enemies = createEnemies(getNewEnemyLocations(numEnemies));
moveEnemies();

//Move Enemies every n ms
var moveEvery = 1500;
var moveEnemiesInterval = setInterval(function(){moveEnemies();}, moveEvery);

//Drag
var drag = d3.behavior.drag().on('dragstart', function(){
	// console.log('dragstart');
}).on('drag', function(d){
	var x = d3.event.x;
	var y = d3.event.y;
	d3.select(this).attr('cx', x).attr('cy', y);
}).on('dragend', function(){
	// console.log('dragend');
});
player.call(drag);

var test = function(){
	return player.attr("cx");
};

// Check for Collisions
var checkForCollisionsInterval = setInterval(function(){
	enemies.each(function(d){
		if(didCollide(d, player)){
			// reset score
			console.log("Player Collision");
			if(score > highScore){
				highScore = score;
				highScoreNode.text(highScore);
			}
			score = 0;
		}
	});
}, 1);

var scoreUpdater = setInterval(function(){
	score++;
	scoreNode.text(score);
}, 1000);

