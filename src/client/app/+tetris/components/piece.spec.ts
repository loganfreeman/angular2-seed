import {Piece} from './piece';
import {Coordinate} from './coord';
export function main() {
  describe('piece', () => {
    var pos = new Coordinate(9, 10);
    var piece = new Piece(pos);
    it('should generatePatternCoord', () => {
      expect(piece.PositionX).toEqual(9);
      expect(piece.PositionY).toEqual(10);
    });
  });
};
