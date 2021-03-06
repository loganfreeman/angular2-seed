import {GridService} from './grid';

import 'underscore';

export const PATTERNS = [
    [[1, 5, 9, 10], [4, 5, 6, 8], [0, 1, 5, 9], [2, 4, 5, 6]], // L
    [[0, 1, 4, 5], [0, 1, 4, 5], [0, 1, 4, 5], [0, 1, 4, 5]], // O
    [[1, 5, 9, 13], [4, 5, 6, 7], [1, 5, 9, 13], [4, 5, 6, 7]], // I
    [[1, 4, 5, 6], [1, 5, 6, 9], [4, 5, 6, 9], [1, 4, 5, 9]], // T
    [[1, 5, 8, 9], [0, 4, 5, 6], [1, 2, 5, 9], [4, 5, 6, 10]], // J
    [[1, 5, 6, 10], [5, 6, 8, 9], [1, 5, 6, 10], [5, 6, 8, 9]], // S
    [[4, 5, 9, 10], [1, 4, 5, 8], [4, 5, 9, 10], [1, 4, 5, 8]] // Z
];

export const PATTERN_COOR = [
    // L
    [[{x: 1, y: 0},{x: 1, y: 1},{x: 1, y: 2},{x: 2, y: 2}], [{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1},{x: 0, y: 2}],
        [{x: 0, y: 0},{x:1 , y: 0},{x: 1, y: 1},{x: 1, y: 2}], [{x: 2, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1}]],
    // O
    [[{x: 0, y: 0},{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1}], [{x: 0, y: 0},{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1}],
        [{x: 0, y: 0},{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1}], [{x: 0, y: 0},{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1}]],
    // I
    [[{x: 1, y: 0},{x: 1, y: 1},{x: 1, y: 2},{x: 1, y: 3}], [{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1},{x: 3, y: 1}],
        [{x: 1, y: 0},{x: 1, y: 1},{x: 1, y: 2},{x: 1, y: 3}], [{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1},{x: 3, y: 1}]],
    // T
    [[{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1}], [{x: 1, y: 0},{x: 1, y: 1},{x: 2, y: 1},{x: 1, y: 2}],
        [{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1},{x: 1, y: 2}], [{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 1, y: 2}]],
    // J
    [[{x: 1, y: 0},{x: 1, y: 1},{x: 0, y: 2},{x: 1, y: 2}], [{x: 0, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1}],
        [{x: 1, y: 0},{x: 2, y: 0},{x: 1, y: 1},{x: 1, y: 2}], [{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1},{x: 2, y: 2}]],
    // S
    [[{x: 1, y: 0},{x: 1, y: 1},{x: 2, y: 1},{x: 2, y: 2}], [{x: 1, y: 1},{x: 2, y: 1},{x: 0, y: 2},{x: 1, y: 2}],
        [{x: 1, y: 0},{x: 1, y: 1},{x: 2, y: 1},{x: 2, y: 2}], [{x: 1, y: 1},{x: 2, y: 1},{x: 0, y: 2},{x: 1, y: 2}]],
    // Z
    [[{x: 0, y: 1},{x: 1, y: 1},{x: 1, y: 2},{x: 2, y: 2}], [{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 0, y: 2}],
        [{x: 0, y: 1},{x: 1, y: 1},{x: 1, y: 2},{x: 2, y: 2}], [{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 0, y: 2}]]
];

export const ROTATION_MATRIX = [
       [
            [0, 0], [0, 1], [0, 2], [0, 3],
            [1, 0], [1, 1], [1, 2], [1, 3],
            [2, 0], [2, 1], [2, 2], [2, 3],
            [3, 0], [3, 1], [3, 2], [3, 3]
        ],
        [ // rotate 90
            [3, 0], [2, 0], [1, 0], [0, 0],
            [3, 1], [2, 1], [1, 1], [0, 1],
            [3, 2], [2, 2], [1, 2], [0, 2],
            [3, 3], [2, 3], [1, 3], [0, 3]
        ],
        [ // rotate 180
            [3, 3], [3, 2], [3, 1], [3, 0],
            [2, 3], [2, 2], [2, 1], [2, 0],
            [1, 3], [1, 2], [1, 1], [1, 0],
            [0, 3], [0, 2], [0, 1], [0, 0]
        ],
        [ // rotate 270
            [0, 3], [1, 3], [2, 3], [3, 3],
            [0, 2], [1, 2], [2, 2], [3, 2],
            [0, 1], [1, 1], [2, 1], [3, 1],
            [0, 0], [1, 0], [2, 0], [3, 0]
        ]
];

export const board = {
    borderWidth: 10,
    pieceWidthInPixel: 25, // match the pixel of piece in grid
    boardWidth: 10,
    boardHeight: 20
};

export const GAMESPEED = {
  'BEGINNER': 800,
  'INTERMEDIATE': 500,
  'ADVANCED': 300,
  'EXPERT': 200,
  'SUPER': 150
};

export function getBoardWidth() {
  return board.boardWidth;
}

export function getBoardHeight() {
  return board.boardHeight;
}

export var coordToPosMem = _.memoize(function (pos: {x : number, y: number}) {
    return (pos.y * getBoardWidth()) + pos.x;
}, function (pos) {
    return '' + pos.x + pos.y;
});

export var posToCoord = _.memoize(function (i:number) {
    var x = i % getBoardWidth(),
        y = (i - x) / getBoardWidth();

    return {
        x: x,
        y: y
    };
});

export var withinGridMem = _.memoize(function (cell:{x:number, y:number}) {
            return cell.x >= 0 && cell.x < getBoardWidth() &&
                cell.y >= 0 && cell.y < getBoardHeight();
        }, function (cell) {
            return '' + cell.x + cell.y;
        });

export function generateUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c === 'x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}

export function buildEmptyGameBoard() {
  var sizeOfBoard = getBoardWidth() * getBoardHeight();
  for (var i = 0; i < sizeOfBoard; i++) {
      GridService.grid[i] = {
          filled: false,
          shape: null,
          ghost: false
      };
  }
}

export var getX = _.memoize(function(x:number) {
  return x * board.pieceWidthInPixel + board.borderWidth;
})

export var getY = _.memoize(function (y:number) {
    return y * board.pieceWidthInPixel;
})
