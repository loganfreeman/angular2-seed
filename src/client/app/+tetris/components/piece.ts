import {Coordinate} from './coord';

import {GameData} from './game-data';

import {GridService} from './grid';

import {deepCopy} from '../../shared/util';

import {generateUID, withinGridMem, coordToPosMem, posToCoord,
  getBoardWidth, getBoardHeight, ROTATION_MATRIX, PATTERN_COOR, PATTERNS,
  getX, getY
} from './game';

import 'underscore';


export class Piece {

  private static patternCoord2d: any[] = [];
  private static pattern2d: any[] = [];

  public x:number;
  public y:number;
  public rotation:number;
  public patterns: number;
  public id:string;


  constructor(pos: {x:number, y:number}) {
    var position = pos || {
            x: 4,
            y: 0
        };
    this.x = position.x;
    this.y = position.y;
    this.rotation = Math.floor(Math.random() * GameData.rotationLimit);
    this.patterns = Math.floor(Math.random() * GameData.patternLimit);
    this.id = generateUID();
    GridService.resetGhostPiece();
  }

  get Coord(){
    return {
      x: this.x,
      y: this.y
    }
  }

  get Patterns() {
    return this.patterns;
  }

  get Rotation() {
    return this.rotation;
  }

  set Rotation(rotation) {
    this.rotation = rotation;
  }

  get PositionX() {
      return this.x;
  }

  set PositionX(x) {
      this.x = x;
  }

  get PositionY() {
      return this.y;
  }

  set PositionY(y) {
      this.y = y;
  }

  updatePosition(newPosition:{y?:number, x?:number}, cb?: () => void) {
      var isMoveDown = isNaN(newPosition.y) ? false : newPosition.y > this.y;
      var    x = isNaN(newPosition.x) ? this.x : newPosition.x,
      y = isNaN(newPosition.y) ? this.y : newPosition.y,
          isVerified = this.verifyPiece({x: x, y: y});

      if(isVerified) {
          this.x = x;
          this.y = y;
      } else if(!isVerified && isMoveDown) {
          if (_.isFunction(cb)) {
              cb();
          }
      }
      return this;
  }

  getPatternCoord() {
    return PATTERN_COOR[this.patterns][this.rotation];
  }

  getPieceCoordArray(): Coordinate[] {
    return this.convertPatternToCoordinates();
  }

  getShape() {
    return this.patterns;
  }

  restore(rotation:number, patterns:number) {
      this.rotation = rotation;
      this.patterns = patterns;
  }

  getPattern() {
    return PATTERNS[this.patterns][this.rotation];
  }

  rotatePiece() {
      var oldRotation = this.rotation;
      this.rotation = (this.rotation + 1) % GameData.rotationLimit;
      if(!this.verifyPiece()) {
          this.rotation = oldRotation;
      }
      return this;
  }

  verifyPiece(cell?:{x:number, y:number}) {
      var coord = this.convertPatternToCoordinates(cell),
          isOk = true;
      for(var i = 0, len = coord.length; i < len; i++) {
          if(!withinGridMem(coord[i]) || !GridService.isPieceVerify(coord[i])) {
              isOk = false;
              break;
          }
      }
      return isOk;
  }

  withinGrid(coord:Coordinate) {
    return withinGridMem(coord);
  }

  destroy() {
      this.x = null;
      this.y = null;
      this.rotation = null;
      this.patterns = null;
      this.id = null;
      GridService.resetGhostPiece();
  }

  updateCurrentPiece() {
    GridService.resetCurrentPiece();
    let coord = this.convertPatternToCoordinates();
    for(var i = 0, len = coord.length; i < len; i++) {
        GridService.updateCurrentPiece(coord[i], this.getShape());
    }
  }

  updateGhostPiece() {
      var point = this.calculateCollisionPoint(),
          coord = this.convertPatternToCoordinates(point);
      GridService.resetGhostPiece();
      for(var i = 0, len = coord.length; i < len; i++) {
          GridService.updateGhostPiece(coord[i]);
      }
  }

  calculateCollisionPoint() {
      var cell = {
          x: this.x,
          y: this.y
      };
      for(var i = cell.y; i < getBoardHeight(); i++) {
          cell.y = i;
          if(!this.verifyPiece(cell)) {
              break;
          }
      }
      cell.y--;
      return cell;
  }

  convertPatternToCoordinates(cell?: {x:number, y:number}) {
      var coord = deepCopy(this.getPatternCoord()),
          location = cell || {x: this.x, y: this.y};
      _.each(coord, function (ele, index) {
          coord[index].x += location.x;
          coord[index].y += location.y;
      });
      return coord;
  }

  getLeft() {
      return getX(this.PositionX);
  }

  getTop() {
      return getY(this.PositionY);
  }
}
