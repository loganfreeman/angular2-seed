import {List,Map,fromJS} from 'immutable';
import {partition, shuffle, repeat, keep, prop} from './util';

function initTiles(rows, cols, mines) {
  return shuffle(repeat(mines, Map({isMine: true, isRevealed: false})).
                 concat(repeat(rows * cols - mines, Map({isRevealed: false})))).
    map(function (tile, idx) {
      return tile.set('id', idx);
    });
}

function onWEdge(game, tile) {
  return tile % game.get('cols') === 0;
}

function onEEdge(game, tile) {
  return tile % game.get('cols') === game.get('cols') - 1;
}

function idx(game, tile) {
  if (tile < 0) { return null; }
  return game.getIn(['tiles', tile]) ? tile : null;
}

function nw(game, tile) {
  return onWEdge(game, tile) ? null : idx(game, tile - game.get('cols') - 1);
}

function n(game, tile) {
  return idx(game, tile - game.get('cols'));
}

function ne(game, tile) {
  return onEEdge(game, tile) ? null : idx(game, tile - game.get('cols') + 1);
}

function e(game, tile) {
  return onEEdge(game, tile) ? null : idx(game, tile + 1);
}

function se(game, tile) {
  return onEEdge(game, tile) ? null : idx(game, tile + game.get('cols') + 1);
}

function s(game, tile) {
  return idx(game, tile + game.get('cols'));
}

function sw(game, tile) {
  return onWEdge(game, tile) ? null : idx(game, tile + game.get('cols') - 1);
}

function w(game, tile) {
  return onWEdge(game, tile) ? null : idx(game, tile - 1);
}

const directions = [nw, n, ne, e, se, s, sw, w];

function neighbours(game, tile) {
  return keep(directions, function (dir) {
    return game.getIn(['tiles', dir(game, tile)]);
  });
}

function isMine(game, tile) {
  return game.getIn(['tiles', tile, 'isMine']);
}

function toggleMine(game, tile){
  return isMine(game, tile)? game.setIn(['tiles', tile, 'isMine'], false) : game.setIn(['tiles', tile, 'isMine'], true);;
}

function toggleNeighbours(game, tile){
  game = toggleMine(game, tile);
  return keep(directions, function (dir) {
    return dir(game, tile);
  }).reduce(function (game, pos) {
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
