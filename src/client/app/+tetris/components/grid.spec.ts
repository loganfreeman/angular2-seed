import {Piece} from './piece';
import {Coordinate} from './coord';
import {GridService} from './grid';
import {GameData} from './game-data';
import {buildEmptyGameBoard, PATTERN_COOR, withinGridMem, coordToPosMem, posToCoord, getBoardHeight, getBoardWidth} from './game';

export function main() {
  describe('game', () => {
    GridService.buildEmptyGameBoard();
    var pos = new Coordinate(4, 10);
    var piece = new Piece(pos);
    var level = 18;
    it('should insert piece', () =>  {
      let fn = jasmine.createSpy('insertPieceCallback');
      GridService.insertPiece(piece, fn);
      expect(fn).not.toHaveBeenCalled();
      let coordArray = piece.getPieceCoordArray();
      for (var i = 0; i < coordArray.length; i++) {
          var pos = coordToPosMem(coordArray[i]);
          expect(GridService.grid[pos].filled).toEqual(true);
          expect(GridService.grid[pos].shape).toEqual(piece.getShape());
      }
      GridService.buildEmptyGameBoard();
    })

    it('should move piece down one level', () => {
      for(var j = 0; j < getBoardWidth(); j++) {
        var curPos = coordToPosMem({x: j, y: level-1});
        GridService.grid[curPos].filled = true;
        GridService.grid[curPos].shape = piece.getShape();
      }
      GridService.movePieceDownLevel(level);
      for(var j = 0; j < getBoardWidth(); j++) {
        var curPos = coordToPosMem({x: j, y: level-1});
        expect(GridService.grid[curPos].filled).toEqual(false);
        expect(GridService.grid[curPos].shape).toEqual(null);
      }
      GridService.buildEmptyGameBoard();
    })
    it('should check and clear filled row', () => {
      for(var j = 0; j < getBoardWidth(); j++) {
        var curPos = coordToPosMem({x: j, y: level-1});
        GridService.grid[curPos].filled = true;
        GridService.grid[curPos].shape = piece.getShape();
      }
      let fn = jasmine.createSpy('checkAndClearFilledRowCallback');
      GridService.checkAndClearFilledRow(fn);
      expect(fn).toHaveBeenCalled();
      for(var j = 0; j < getBoardWidth(); j++) {
        var curPos = coordToPosMem({x: j, y: level-1});
        expect(GridService.grid[curPos].filled).toEqual(false);
        expect(GridService.grid[curPos].shape).toEqual(null);
      }
      GridService.buildEmptyGameBoard();
    })
  })
}
