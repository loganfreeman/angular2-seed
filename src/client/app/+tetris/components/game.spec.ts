import {Piece} from './piece';
import {Coordinate} from './coord';
import {GridService} from './grid';
import {GameData} from './game-data';
import {buildEmptyGameBoard, PATTERN_COOR, withinGridMem, coordToPosMem, posToCoord, getBoardHeight, getBoardWidth} from './game';

export function main() {
  describe('game', () => {
    it('should build empty board', () =>  {
      let board = buildEmptyGameBoard();
      expect(GridService.grid.length).toEqual(getBoardWidth() * getBoardHeight());
    })
  })
}
