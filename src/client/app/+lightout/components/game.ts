import {List,Map,fromJS} from 'immutable';
import {partition, shuffle, repeat, keep, prop} from '../../shared/util';

function initTiles(rows:any, cols:any, mines:any) {
  return shuffle(repeat(mines, Map({isMine: true, isRevealed: false})).
                 concat(repeat(rows * cols - mines, Map({isRevealed: false})))).
    map(function (tile:any, idx:any) {
      return tile.set('id', idx);
    });
}

function onWEdge(game:any, tile:any) {
  return tile % game.get('cols') === 0;
}

function onEEdge(game:any, tile:any) {
  return tile % game.get('cols') === game.get('cols') - 1;
}

function idx(game:any, tile:any) {
  if (tile < 0) { return null; }
  return game.getIn(['tiles', tile]) ? tile : null;
}

function nw(game:any, tile:any) {
  return onWEdge(game, tile) ? null : idx(game, tile - game.get('cols') - 1);
}

function n(game:any, tile:any) {
  return idx(game, tile - game.get('cols'));
}

function ne(game:any, tile:any) {
  return onEEdge(game, tile) ? null : idx(game, tile - game.get('cols') + 1);
}

function e(game:any, tile:any) {
  return onEEdge(game, tile) ? null : idx(game, tile + 1);
}

function se(game:any, tile:any) {
  return onEEdge(game, tile) ? null : idx(game, tile + game.get('cols') + 1);
}

function s(game:any, tile:any) {
  return idx(game, tile + game.get('cols'));
}

function sw(game:any, tile:any) {
  return onWEdge(game, tile) ? null : idx(game, tile + game.get('cols') - 1);
}

function w(game:any, tile:any) {
  return onWEdge(game, tile) ? null : idx(game, tile - 1);
}

const directions = [nw, n, ne, e, se, s, sw, w];

function neighbours(game:any, tile:any) {
  return keep(directions, function (dir:any) {
    return game.getIn(['tiles', dir(game, tile)]);
  });
}

function isMine(game:any, tile:any) {
  return game.getIn(['tiles', tile, 'isMine']);
}

function toggleMine(game:any, tile:any) {
  return isMine(game, tile)? game.setIn(['tiles', tile, 'isMine'], false) : game.setIn(['tiles', tile, 'isMine'], true);;
}

function toggleNeighbours(game:any, tile:any) {
  game = toggleMine(game, tile);
  return keep(directions, function (dir:any) {
    return dir(game, tile);
  }).reduce(function (game:any, pos:any) {
    return toggleMine(game, pos) ;
  }, game);
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
  const updated = !game.getIn(['tiles', tile]) ?
          game : toggleNeighbours(game, tile);
  return updated;
}
