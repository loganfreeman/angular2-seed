import 'underscore';

export function makeSudoku(){
  return makePuzzle(solvePuzzle(makeArray(81, null)));
}

// board: array of numbers, size of array 81, contains solved sudoku puzzle
function makePuzzle(board: number[]) {
  var puzzle: any[] = [];
  var deduced = makeArray(81, null);
  var order = _.range(81);

  shuffleArray(order);

  for (var i = 0; i < order.length; i++) {
    var pos = order[i];

    if (deduced[pos] == null) {
      puzzle.push({ pos: pos, num: board[pos] });
      deduced[pos] = board[pos];
      deduce(deduced);
    }
  }

  shuffleArray(puzzle);

  for (var i = puzzle.length - 1; i >= 0; i--) {
    var e = puzzle[i];
    removeElement(puzzle, i, null);

    var rating = checkPuzzle(boardforentries(puzzle), board);
    if (rating == -1) {
      puzzle.push(e);
    }
  }

  return boardforentries(puzzle);

}

function ratePuzzle() {

}

function boardforentries(entries:any[]) {
	var board = _.map(_.range(81), function(val, key) {
		return null;
	});

	for (var i = 0; i < entries.length; i++) {
		var item = entries[i];
		var pos  = item.pos;
		var num  = item.num;

		board[pos] = num;
	}

	return board;
}

function boardMatches(b1:any[], b2:any[]) {
	for (var i = 0; i < 81; i++) {
		if (b1[i] != b2[i]) {
			return false;
		}
	}

	return true;
}


function checkPuzzle(puzzle: any[], board: number[]) {
  if (board == undefined) {
		board = null;
	}

	var tuple1 = solveBoard(puzzle);
	if (tuple1.answer == null) {
		return -1;
	}

	if (board != null && boardMatches(board, tuple1.answer) == false) {
		return -1;
	}

	var difficulty = tuple1.state.length;
	var tuple2     = solveNext(tuple1.state);

	if (tuple2.answer != null) {
		return -1;
	}

	return difficulty;
}

export function solvePuzzle(board:number[]) {
  return solveBoard(board).answer;
}

export function solveBoard(original:number[]) {
  var board   = [].concat(original);
	var guesses = deduce(board);

	if (guesses == null) {
		return {state:[], answer:board};
	}

	var track = [{guesses:guesses, count:0, board:board}];
	return solveNext(track);
}

function solveNext(remembered: any[]) {
  while (remembered.length > 0) {
    var tuple1 = remembered.pop();

    if (tuple1.count >= tuple1.guesses.length) {
      continue;
    }

    remembered.push({guesses:tuple1.guesses, count:tuple1.count+1, board:tuple1.board});
    var workspace = [].concat(tuple1.board);
    var tuple2    = tuple1.guesses[tuple1.count];

    workspace[tuple2.pos] = tuple2.num;

    var guesses = deduce(workspace);

    if (guesses == null) {
      return {state:remembered, answer:workspace};
    }

    remembered.push({guesses:guesses, count:0, board:workspace});
}

  return {state:[], answer:null};
}

function deduce(board: number[]) {
  while (true) {
    var stuck = true;
    var guess: any[] = null;
    var count = 0;

    // fill in any spots determined by direct conflicts
    var tuple1 = figurebits(board);
    var allowed = tuple1.allowed;
    var needed = tuple1.needed;

    for (var pos = 0; pos < 81; pos++) {
	    	if (board[pos] == null) {
        var numbers = listbits(allowed[pos]);
        if (numbers.length == 0) {
          return [];
        }
        else if (numbers.length == 1) {
          board[pos] = numbers[0];
          stuck = false;
        }
        else if (stuck == true) {
          var t = _.map(numbers, function(val, key) {
            return { pos: pos, num: val };
          });

          var tuple2 = pickbetter(guess, count, t);
          guess = tuple2.guess;
          count = tuple2.count;
        }
	    	}
    }

    if (stuck == false) {
		    var tuple3 = figurebits(board);
		    allowed = tuple3.allowed;
		    needed = tuple3.needed;
    }

    // fill in any spots determined by elimination of other locations
    for (var axis = 0; axis < 3; axis++) {
	    	for (var x = 0; x < 9; x++) {
        var numbers = listbits(needed[axis * 9 + x]);

        for (var i = 0; i < numbers.length; i++) {
          var n = numbers[i];
          var bit = 1 << n;
          var spots: any[] = [];

          for (var y = 0; y < 9; y++) {
            var pos = posfor(x, y, axis);
            if (allowed[pos] & bit) {
              spots.push(pos);
            }
          }

          if (spots.length == 0) {
            return [];
          }
          else if (spots.length == 1) {
            board[spots[0]] = n;
            stuck = false;
          }
          else if (stuck) {
            var t: { pos: number; num: number }[] = _.map(spots, function(val, key) {
              return { pos: val, num: n };
            });

            var tuple4 = pickbetter(guess, count, t);
            guess = tuple4.guess;
            count = tuple4.count;
          }
        }
	    	}
    }

    if (stuck == true) {
    		if (guess != null) {
        shuffleArray(guess);
    		}

    		return guess;
    }
  }
}


//
function pickbetter(b: any[], c: number, t: any[]) {
  if (b == null || t.length < b.length) {
    return { guess: t, count: 1 };
  }
  else if (t.length > b.length) {
    return { guess: b, count: c };
  }
  else if (randomInt(c) == 0) {
    return { guess: t, count: c + 1 };
  }

  return { guess: b, count: c + 1 };
}


function figurebits(board: number[]) {
  var needed: number[] = [];
  var allowed = _.map(board, function(val, key) {
    return val == null ? 511 : 0;
  }, []);

  // for three axis, a total of 27 axis to check
  // x has different meaning depending on the axis,
  // for example, when the axis is row, its means each row
  // when the axis is column, it means each column,
  // when the axis is each block, it means each 9 * 9 block
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var bits = axismissing(board, x, axis);
      needed.push(bits);
      // for all 9 places
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        allowed[pos] = allowed[pos] & bits;
      }
    }
  }

  return { allowed: allowed, needed: needed };
}


// x: a particular number in an axis
// check if a particular axis is missing numbers
function axismissing(board: number[], x: number, axis: number) {
  var bits = 0;
  // for all 9 places
  for (var y = 0; y < 9; y++) {
    var e = board[posfor(x, y, axis)];

    if (e != null) {
      bits |= 1 << e;
    }
  }

  return 511 ^ bits;
}

// three axis
function posfor(x: number, y: number, axis: number) {
  if (axis == undefined) { axis = 0; }

  if (axis == 0) {
    return x * 9 + y;
  }
  else if (axis == 1) {
    return y * 9 + x;
  }

  return ([0, 3, 6, 27, 30, 33, 54, 57, 60][x] + [0, 1, 2, 9, 10, 11, 18, 19, 20][y])
}

// given a number, list its bits,
// for example, 24 is 11000 under base 2. it bits would be at [3, 4]. the rightmost bit index is 0.
// maximum bit index is 9.
// the maximum number in base 10 allowed is 511, which in base 2 is 111111111
function listbits(bits: number) {
  var list: number[] = [];
  for (var y = 0; y < 9; y++) {
    if ((bits & (1 << y)) != 0) {
      list.push(y);
    }
  }

  return list;
}

function axisfor(pos:number, axis:number) {
	if (axis == 0) {
		return Math.floor(pos / 9);
	}
	else if (axis == 1) {
		return pos % 9;
	}

	return Math.floor(pos / 27) * 3 + Math.floor(pos / 3) % 3;
}

export function allowed(board:number[], pos:number):number[] {
	var bits = 511;

	for (var axis = 0; axis < 3; axis++) {
		var x = axisfor(pos, axis);
		bits = bits & axismissing(board, x, axis);
	}

	return listbits(bits);
}


function pickBetter(b: any[], c: number, t: any[]) {
  if (b == null || t.length < b.length) {
    return { guess: t, count: 1 };
  }
  else if (t.length > b.length) {
    return { guess: b, count: c };
  }
  else if (randomInt(c) == 0) {
    return { guess: t, count: c + 1 };
  }

  return { guess: b, count: c + 1 };
}

function boardMatched(b1: number[], b2: number[]): boolean {
  for (var i = 0; i < 81; i++) {
    if (b1[i] != b2[i]) {
      return false;
    }
  }
  return true;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function shuffleArray(original: number[]) {
  for (var i = 0; i < original.length; i++) {
    var j = i;
    while (j == i) {
      j = Math.floor(Math.random() * original.length);
    }
    var contents = original[i];
    original[i] = original[j];
    original[j] = contents;
  }
}


function removeElement(array: number[], from: number, to: number) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
}


function makeArray(length: number, value: number) {
  return _.map(_.range(length), function(val, key) {
    return value;
  })
}
