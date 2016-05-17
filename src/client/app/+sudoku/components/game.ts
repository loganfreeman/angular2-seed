import {List,Map,fromJS} from 'immutable';
import {partition, shuffle, repeat, keep, prop} from '../../shared/util';
import {zip} from 'underscore';
import {makeSudoku, solveBoard, allowed, solvePuzzle} from './algo';

/**
 * Get a random integer within a range
 *
 * @param {Number} min Minimum number
 * @param {Number} max Maximum range
 * @returns {Number} Random number within the range (Inclusive)
 */
function getRandomInt(min: number, max : number) {
  return Math.floor( Math.random() * ( max + 1 ) ) + min;
}

function makeTiles(board:number[]){
  return board.map(function (value:number, idx:number) {
      var tile:any = Map({isRevealed: value != null});
      tile = tile.set('id', idx);
      tile = tile.set('value', value);
      return tile;
    });
}

function initTiles(rows: number = 9, cols: number = 9){
  var board = makeSudoku();
  return makeTiles(board);

}

export function createGame(rows: number = 9, cols: number = 9){
  return fromJS({
    cols: cols,
    rows: rows,
    playingTime: 0,
    tiles: initTiles(rows, cols)
  });
}

export function isGameOver(game:any){
  return false;
}

export function revealTile(game:any, tile:any){
  const updated = !game.getIn(['tiles', tile]) ?
          game : game.setIn(['tiles', tile, 'isRevealed'], true);
  return updated;
}

export function setTile(game:any, tile:any, value:any){
  const updated = !game.getIn(['tiles', tile]) ?
          game : game.setIn(['tiles', tile, 'value'], value);
  return updated;
}

export function validateTile(tile:any){

}

export function validateMatrix(game:any){

}

export function getAllowed(game:any, pos:number){
  var board:number[] = game.get('tiles').toArray().map(function(tile:any,idx:number){
    return tile.get('value');
  })

  return allowed(board, pos);
}

export function solve(game:any){
  var board:number[] = game.get('tiles').toArray().map(function(tile:any,idx:number){
    return tile.get('value');
  })

  return fromJS({
    cols: 9,
    rows: 9,
    playingTime: 0,
    tiles: makeTiles(solvePuzzle(board))
  });
}
