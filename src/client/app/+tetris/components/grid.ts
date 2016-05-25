import {coordToPosMem, posToCoord, getBoardWidth, getBoardHeight} from './game';

import {Piece} from './piece';

import { Injectable } from '@angular/core';

@Injectable()
export class GridService {
  public static grid:any[] = [];

  public static updateGhostPiece(cell:any){
    var pos = coordToPosMem(cell);
    if (pos > 0) {
        GridService.grid[pos].ghost = true;
    }
  }


  public static resetGhostPiece() {
      for(var i = 0, len = GridService.grid.length; i < len; i++) {
          GridService.grid[i].ghost = false;
      }
  }

  public static buildEmptyGameBoard() {
      var sizeOfBoard = getBoardWidth() * getBoardHeight();
      for (var i = 0; i < sizeOfBoard; i++) {
          GridService.grid[i] = {
              filled: false,
              shape: null,
              ghost: false
          };
      }
  }

  public static movePieceDownLevel(row:number) {
      for(var i = row - 1; i >= 0; i--) {
          for(var j = 0; j < getBoardWidth(); j++) {
              var curPos = coordToPosMem({x: j, y: i}),
                  nextPos = coordToPosMem({x: j, y: i + 1});
              GridService.grid[nextPos] = _.clone(GridService.grid[curPos]);
              GridService.grid[curPos].filled = false;
              GridService.grid[curPos].shape = null;
          }
      }
      return GridService;
  }

  public static clearNthRow(row:number) {
      for(var z = 0; z < getBoardWidth(); z++) {
          var pos = coordToPosMem({x: z, y: row});
          GridService.grid[pos].filled = false;
          GridService.grid[pos].shape = null;
      }
      return GridService;
  }

  public static checkAndClearFilledRow(cb:Function) {
      for(var i = 0; i < getBoardHeight(); i++) {
          var j = 0;
          for(; j < getBoardWidth(); j++) {
              var pos = coordToPosMem({x: j, y: i});
              if(!GridService.grid[pos].filled) {
                  break;
              }
          }
          if(j === getBoardWidth()) {
              // clear the row
              GridService
                  .clearNthRow(i)
                  .movePieceDownLevel(i);
              cb();
          }
      }
  }

  public static isPieceVerify(coord: { x: number, y:number}) {
      var pos = coordToPosMem(coord);
      if(GridService.grid[pos].filled) {
          return false;
      }
      return true;
  }

  public static insertPiece(piece:Piece, gameOver:() => void) {
      var coordArray = piece.getPieceCoordArray();
      for (var i = 0; i < coordArray.length; i++) {
          var pos = coordToPosMem(coordArray[i]);
          if (GridService.grid[pos].filled) {
              gameOver();
          } else {
              GridService.grid[pos].filled = true;
              GridService.grid[pos].shape = piece.getShape();
          }
      }
  }
}
