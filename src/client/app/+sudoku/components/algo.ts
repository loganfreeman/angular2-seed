import 'underscore';

// board: array of numbers, size of array 81, contains solved sudoku puzzle
function makePuzzle(board:number[]){
  var puzzle:any[]  = [];
	var deduced = makeArray(81, null);
	var order   = _.range(81);

	shuffleArray(order);
}

function ratePuzzle(){

}

function checkPuzzle(puzzle:any[], board:number[]){

}

function solvePuzzle(){

}

function solveBoard(){

}

function solveNext(remembered:any[]){

}

function deduce(board: number[]){

}

function boardMatched(b1:number[], b2:number[]):boolean{
    for(var i=0; i< 81; i++){
      if(b1[i] != b2[i]){
        return false;
      }
    }
    return true;
}

function randomInt(max:number) {
	return Math.floor(Math.random() * (max+1));
}

function shuffleArray(original: number[]){
  for(var i=0; i < original.length; i++){
    var j = i;
    while(j == i){
      j = Math.floor(Math.random() * original.length);
    }
    var contents = original[i];
    original[i] = original[j];
    original[j] = contents;
  }
}


function removeElement(array: number[], from:number, to:number){
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
}


function makeArray(length:number, value:number){
  return _.map(_.range(length), function(val, key){
    return value;
  })
}
