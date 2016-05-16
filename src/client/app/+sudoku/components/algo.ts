import 'underscore';

// board: array of numbers, size of array 81, contains solved sudoku puzzle
function makePuzzle(board: number[]) {
  var puzzle: any[] = [];
  var deduced = makeArray(81, null);
  var order = _.range(81);

  shuffleArray(order);
}

function ratePuzzle() {

}

function checkPuzzle(puzzle: any[], board: number[]) {

}

function solvePuzzle() {

}

function solveBoard() {

}

function solveNext(remembered: any[]) {

}

function deduce(board: number[]) {

}

function figurebits(board: number[]) {
  var needed: number[] = [];
  var allowed = _.map(board, function(val, key) {
    return val == null ? 511 : 0;
  }, []);

  // for three axis
  // x has different meaning depending on the axis,
  // for example, when the axis is row, its means each row
  // when the axis is column, it means each column,
  // when the axis is each block, it means each 9 * 9 block
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var bits = axismissing(board, x, axis);
      needed.push(bits);

      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        allowed[pos] = allowed[pos] & bits;
      }
    }
  }

  return { allowed: allowed, needed: needed };
}



function axismissing(board: number[], x: number, axis: number) {
  var bits = 0;

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

function allowed(board: number[], pos: number) {

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
