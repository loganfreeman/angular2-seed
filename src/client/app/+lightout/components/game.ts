import {List,Map,fromJS} from 'immutable';
import {partition, shuffle, repeat, keep, prop} from './util';

function initTiles(rows, cols, mines) {
  return shuffle(repeat(mines, Map({isMine: true, isRevealed: false})).
                 concat(repeat(rows * cols - mines, Map({isRevealed: false})))).
    map(function (tile, idx) {
      return tile.set('id', idx);
    });
}

export function createGame(options:any){
  return fromJS({
    cols: options.cols,
    rows: options.rows,
    playingTime: 0,
    tiles: initTiles(options.rows, options.cols, options.mines)
  });
}

export function isGameOver(game:any){
  return false;
}

export function revealTile(game:any, tile:any){
  return game;
}
