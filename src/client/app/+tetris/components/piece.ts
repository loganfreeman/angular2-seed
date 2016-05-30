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



  public static destroyCustomPiece () {
      Piece.pattern2d = [];
      Piece.patternCoord2d = [];
  }

  public static generatePatternCoord() {
      // set up the first patter coord
      Piece.setPatternToCoord(Piece.pattern2d[0]);

      for(var deg in [90, 180, 270]) {
          // deg is index [0, 1, 2]
          // patternCoor2d has init with orgin coord
          // so index + 1 to move to next rotation
          Piece.getRotatePattern(Piece.patternCoord2d[0], parseInt(deg, 10) + 1);
      }

      Piece.setPatternCoord2d();
  }

  public static generatePatterns(pieces:any[]) {
      var pattern:number[] = [];
      Piece.pattern2d = [];
      Piece.patternCoord2d = [];
      _.each(pieces, function (piece, index) {
          if (piece.isSelected) {
              pattern.push(index);
          }
      });
      Piece.pattern2d.push(pattern);
      Piece.generatePatternCoord();
  }

  public static getPattern(rotation:number) {
      return Piece.pattern2d[rotation];
  }

  public static getPatternCoord(rotation:number) {
      return Piece.patternCoord2d[rotation];
  }

  public static getCustomPiece() {
      return {
          pattern2d: Piece.pattern2d,
          patternCoord2d: Piece.patternCoord2d
      };
  }

  public static setCustomPiece(customPiece: {pattern2d: any[], patternCoord2d: any[]}) {
      Piece.pattern2d = customPiece.pattern2d;
      Piece.patternCoord2d = customPiece.patternCoord2d;
  }

  public static hasCustomPiece() {
      return Piece.pattern2d.length > 0;
  }

  // private methods
  public static getCustomPieceWidth() {
      return GameData.customPieceWidth;
  }

  // private methods
  private static setPatternCoord2d() {
      Piece.patternCoord2d = [];
      _.each(Piece.pattern2d, function (pattern) {
          Piece.setPatternToCoord(pattern);
      });
  }

  // private methods
  private static setPatternToCoord(pattern:any[]) {
      var patternCoord:any[] = [];
      _.each(pattern, function (i) {
          patternCoord.push(posToCoord(i));
      });
      Piece.patternCoord2d.push(patternCoord);
  }

  // private methods
  private static getRotatePattern(matrix:{x:number, y:number}[], deg:number) {
      var pattern:any[] = [],
          rotationArray = ROTATION_MATRIX[deg];
      // [y, x], index 0 is y, 1 is x
      _.each(rotationArray, function (elem, index) {
          var pos = _.chain(matrix)
                  .find(function (obj:{x:number, y:number}, key:number) {
                      return elem[1] === obj.x &&
                              elem[0] === obj.y;
                  })
                  .value();
          if (pos) {
              pattern.push(index);
          }
      });
      Piece.pattern2d.push(pattern);
  }


  constructor(pos: {x:number, y:number}) {
    var position = pos || {
            x: 4,
            y: 0
        },
        patternLimit = Piece.hasCustomPiece() ? GameData.patternLimit + 1 :
                                                        GameData.patternLimit;
    this.x = position.x;
    this.y = position.y;
    this.rotation = Math.floor(Math.random() * GameData.rotationLimit);
    this.patterns = Math.floor(Math.random() * patternLimit);
    this.id = generateUID();
    GridService.resetGhostPiece();
  }

  get Coord(){
    return {
      x: this.x,
      y: this.y
    }
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

  updatePosition(newPosition:{y?:number, x?:number}, cb: () => void) {
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
      if (_.isUndefined(PATTERN_COOR[this.patterns])) {
          return Piece.getPatternCoord(this.rotation);
      } else {
          return PATTERN_COOR[this.patterns][this.rotation];
      }
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
      if (_.isUndefined(PATTERNS[this.patterns])) {
          return Piece.getPattern(this.rotation);
      } else {
          return PATTERNS[this.patterns][this.rotation];
      }
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
