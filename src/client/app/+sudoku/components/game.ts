import {List,Map,fromJS} from 'immutable';
import {partition, shuffle, repeat, keep, prop} from '../../shared/util';
import {zip} from 'underscore';
import {makePuzzle, solveBoard} from './algo';

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

function initTiles(rows: number = 9, cols: number = 9){
  return repeat(rows * cols , Map({isRevealed: false})).
    map(function (tile:any, idx:any) {
      return tile.set('id', idx);
    });
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
