import {coordToPosMem, posToCoord, getBoardWidth, getBoardHeight} from './game';

import {Piece} from './piece';

export class GridService {
  public grid:any[];

  updateGhostPiece(cell:any){
    var pos = coordToPosMem(cell);
    if (pos > 0) {
        this.grid[pos].ghost = true;
    }
  }


  resetGhostPiece() {
      for(var i = 0, len = this.grid.length; i < len; i++) {
          this.grid[i].ghost = false;
      }
  }

  buildEmptyGameBoard() {
      var sizeOfBoard = getBoardWidth() * getBoardHeight();
      for (var i = 0; i < sizeOfBoard; i++) {
          this.grid[i] = {
              filled: false,
              shape: null,
              ghost: false
          };
      }
  }

  movePieceDownLevel(row:number) {
      for(var i = row - 1; i >= 0; i--) {
          for(var j = 0; j < getBoardWidth(); j++) {
              var curPos = coordToPosMem({x: j, y: i}),
                  nextPos = coordToPosMem({x: j, y: i + 1});
              this.grid[nextPos] = _.clone(this.grid[curPos]);
              this.grid[curPos].filled = false;
              this.grid[curPos].shape = null;
          }
      }
      return this;
  }

  clearNthRow(row:number) {
      for(var z = 0; z < getBoardWidth(); z++) {
          var pos = coordToPosMem({x: z, y: row});
          this.grid[pos].filled = false;
          this.grid[pos].shape = null;
      }
      return this;
  }

  checkAndClearFilledRow(cb:Function) {
      for(var i = 0; i < getBoardHeight(); i++) {
          var j = 0;
          for(; j < getBoardWidth(); j++) {
              var pos = coordToPosMem({x: j, y: i});
              if(!this.grid[pos].filled) {
                  break;
              }
          }
          if(j === getBoardWidth()) {
              // clear the row
              this
                  .clearNthRow(i)
                  .movePieceDownLevel(i);
              cb();
          }
      }
  }

  isPieceVerify(coord: { x: number, y:number}) {
      var pos = coordToPosMem(coord);
      if(this.grid[pos].filled) {
          return false;
      }
      return true;
  }

  insertPiece(piece:Piece, gameOver:Function) {
      var coordArray = piece.getPieceCoordArray();
      for (var i = 0; i < coordArray.length; i++) {
          var pos = coordToPosMem(coordArray[i]);
          if (this.grid[pos].filled) {
              gameOver();
          } else {
              this.grid[pos].filled = true;
              this.grid[pos].shape = piece.getShape();
          }
      }
  }
}
