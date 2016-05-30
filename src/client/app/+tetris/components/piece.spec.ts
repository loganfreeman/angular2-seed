import {Piece} from './piece';
import {Coordinate} from './coord';
import {GridService} from './grid';
import {GameData} from './game-data';
import {PATTERN_COOR, withinGridMem, coordToPosMem, posToCoord, getBoardHeight} from './game';

export function main() {
  describe('piece', () => {
    GridService.buildEmptyGameBoard();
    var pos = new Coordinate(4, 10);
    var piece = new Piece(pos);
    it('should convert pos to coord', () => {
      let pos =  coordToPosMem(piece.Coord);
      let coord = posToCoord(pos);
      expect(coord.x).toEqual(piece.Coord.x);
      expect(coord.y).toEqual(piece.Coord.y);
    })
    it('should test within grid', () => {
      let truth = withinGridMem(piece.Coord);
      expect(truth).toBe(true);
    })
    it('should get pattern coord', () => {
      expect(piece.PositionX).toEqual(pos.x);
      expect(piece.PositionY).toEqual(pos.y);
      expect(piece.patterns < GameData.patternLimit).toBe(true);
      expect(piece.rotation < GameData.rotationLimit).toBe(true);
      let coord = piece.getPatternCoord();
      expect(coord).toEqual(PATTERN_COOR[piece.patterns][piece.rotation]);
      for(var i = 0, len = coord.length; i < len; i++) {
        expect(withinGridMem(coord[i])).toBe(true);
      }
    })
    it('should convert pattern to coordinate', () => {
      let coord = piece.convertPatternToCoordinates({x: pos.x, y: pos.y});
      for(var i = 0, len = coord.length; i < len; i++) {
        expect(withinGridMem(coord[i])).toBe(true);
        expect(GridService.isPieceVerify(coord[i])).toBe(true);
      }
    })
    it('should start with grid unfilled', () => {
      for(var i = 0, len = GridService.grid.length; i < len; i++) {
          expect(GridService.grid[i].filled).toBe(false);
      }
    })
    it('should constructor piece and reset ghost piece', () => {
      for(var i = 0, len = GridService.grid.length; i < len; i++) {
          expect(GridService.grid[i].ghost).toBe(false);
      }
    })
    it('should verify piece', () => {
      let truth = piece.verifyPiece({x: piece.PositionX, y: piece.PositionY + 1});
      expect(truth).toBe(true);
    })
    it('should update position', () =>  {
      let newPos = { y: pos.y + 1};
      let fn = jasmine.createSpy('updatePositionCallback');
      spyOn(piece, 'verifyPiece').and.callThrough();
      piece.updatePosition(newPos, fn);
      expect(piece.verifyPiece).toHaveBeenCalledWith({x: pos.x, y: newPos.y});
      expect(fn).not.toHaveBeenCalled();
      expect(piece.PositionX).toEqual(pos.x);
      expect(piece.PositionY).toEqual(newPos.y);
    })
    it('should update position and call callback if collision happens', () => {
      let cell = piece.calculateCollisionPoint();
      let newPos = {x : cell.x, y: cell.y + 1};
      let oldPos = piece.Coord;
      expect(piece.verifyPiece(cell)).toEqual(true);
      expect(piece.verifyPiece(newPos)).toEqual(false);
      let fn = jasmine.createSpy('updatePositionCallback');
      spyOn(piece, 'verifyPiece').and.callThrough();
      piece.updatePosition(newPos, fn);
      expect(fn).toHaveBeenCalled();
      expect(piece.PositionX).toEqual(oldPos.x);
      expect(piece.PositionY).toEqual(oldPos.y);
    })
    it('should calculate collision point', () => {
      spyOn(piece, 'verifyPiece').and.callThrough();
      let cell = piece.calculateCollisionPoint();
      expect(piece.verifyPiece(cell)).toEqual(true);
      expect(piece.verifyPiece({x : cell.x, y: cell.y + 1})).toEqual(false);
    })

    it('should rotate piece', () => {
      let oldRotation = piece.rotation;
      spyOn(piece, 'verifyPiece').and.callThrough();
      piece.rotatePiece();
      expect(piece.verifyPiece).toHaveBeenCalledWith();
      expect(piece.rotation).toEqual((oldRotation + 1) % GameData.rotationLimit)
    })
    it('should update ghost piece', () => {
      piece.updateGhostPiece();
      let cell = piece.calculateCollisionPoint();
      let coord = piece.convertPatternToCoordinates(cell);
      for(var i = 0, len = coord.length; i < len; i++) {
          let pos = coordToPosMem(coord[i]);
          expect(GridService.grid[pos].ghost).toEqual(true);
      }
    })
  })
}
