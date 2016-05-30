import { Component, ViewChild } from '@angular/core';

import { MODAL_DIRECTIVES, ModalResult, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import {GridService} from './grid';

import {GameData} from './game-data';

import {NgClass, NgStyle} from '@angular/common';

import {Piece} from './piece';

import{getBoardWidth} from './game';

import 'underscore';


@Component({
  selector: 'sd-tetris',
  templateUrl: 'app/+tetris/components/app.component.html',
  styleUrls: ['app/+tetris/components/app.component.css'],
  directives: [MODAL_DIRECTIVES]
})
export class TetrisComponent {

  isPause:boolean = false;
  isStart:boolean = false;
  grid:any[];

  pieces:any[];

  currentPiece:Piece;
  loop:Function = _.throttle(this.gameLoop, this.getGameSpeed(), {
      leading: false,
      trailing: false
  });
  constructor() {
    this.grid = GridService.grid;
    this.pieces =  _.range(16);
    this.gameOn();
  }

  gameOn() {
    window.requestAnimationFrame(() => this.gameOn()); // use arrow functions to lexically capture this
    if(!this.isGamePause() && this.isGameStart()) {
        this.loop();
    }
  }

  isGamePause() {
    return this.isPause;
  }

  isGameStart() {
    return this.isStart;
  }

  toggleGamePause() {
    this.isPause = !this.isPause;
  }

  setGameStart() {
    this.isStart = true;
  }

  gameLoop() {
    this.moveCurrentPiece();
    this.updateCurrentPiece();
    this.updateGhostPiece();
  }

  gameOver() {
    this.isStart = false;
    this.isPause = false;
  }

  getPositionX() {
      return this.currentPiece.PositionX;
  }

  getPositionY() {
      return this.currentPiece.PositionY;
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  rotatePiece(direction:number) {
    var oldRotation = this.currentPiece.Rotation,
        newRotation = oldRotation + direction;
    this.currentPiece.Rotation = newRotation < 0 ? newRotation + GameData.rotationLimit : newRotation % GameData.rotationLimit;
    let coord = this.currentPiece.convertPatternToCoordinates();
    for(var i = 0, len = coord.length; i < len; i++) {
        if (!this.currentPiece.withinGrid(coord[i])) {
            if (coord[i].x < 0) {
                this.movePieceInLevel('right');
                break;
            }
            if (coord[i].x >= getBoardWidth() ) {
                this.movePieceInLevel('left');
                if (this.currentPiece.patterns === 2) {
                    if (coord[i+1] && coord[i+1].x >= getBoardWidth()) {
                        this.moveCustomInLevel(-2);
                    }
                    break;
                } else {
                    break;
                }
            }
            if(!this.currentPiece.verifyPiece()) {
                this.currentPiece.Rotation = oldRotation;
                break;
            }
        }
    }
  }

  moveCustomInLevel(velocity:number) {
    var speedX = this.currentPiece.PositionX + velocity;
    this.currentPiece.updatePosition({
        x: speedX
    });
  }

  movePieceInLevel(direction:string) {
    let velocity = (direction === 'left') ? -1 : 1;
    let  speedX = this.currentPiece.PositionX + velocity;
    this.currentPiece.updatePosition({
        x: speedX
    });
  }

  hardDrop() {
      var cell = this.currentPiece.calculateCollisionPoint();
      this.currentPiece.updatePosition(cell, () => this.insertAndClearRow());
  }

  move(key:string) {
    var rotateRight = 1,
        rotateLeft = -1;
    switch (key) {
        case 'up':
            this.rotatePiece(rotateRight);
            break;
        case 'left':
            this.movePieceInLevel('left');
            break;
        case 'right':
            this.movePieceInLevel('right');
            break;
        case 'down':
            this.rotatePiece(rotateLeft);
            break;
        case 'space':
            this.hardDrop();
            break;
        case 'p':
        case 'esc':
            this.toggleGamePause();
            break;
        default:
            break;
    }
    this.updateGhostPiece();
  }

  moveCurrentPiece() {
    var speedY = this.getPositionY() + 1;
    this.currentPiece.updatePosition({
        y: speedY
    }, () => this.insertAndClearRow());
  }

  updateCurrentPiece() {
    if(this.currentPiece) {
      this.currentPiece.updateCurrentPiece();
    }
  }

  insertAndClearRow() {
    this.insertPiece();
    GridService.checkAndClearFilledRow(function() {
        GameData.score += 100;
    });
  }

  insertPiece() {
    GridService.insertPiece(this.currentPiece, () => this.gameOver());
    this.currentPiece.destroy();
    this.currentPiece = null;
    this.createNewPiece();
  }

  updateGhostPiece() {
    if (this.currentPiece) {
        this.currentPiece.updateGhostPiece();
    }
  }

  getGameSpeed() {
    return GameData.getGameSpeed();
  }

  startGame() {
    GridService.buildEmptyGameBoard();
    this.createNewPiece();
    this.setGameStart();
  }
  resetGame() {
    GridService.buildEmptyGameBoard();
  }

  createNewPiece() {
    this.currentPiece = new Piece({
        x: 4,
        y: 0
    });
    let collisionPoint = this.currentPiece.calculateCollisionPoint();
    if(collisionPoint.y <= this.currentPiece.PositionY) {
      this.gameOver();
      this.currentPiece = null;
    }
  }


  isPieceReady() {
    return '';
  }

  getClassForShape() {
    if (!this.isGameStart() ||
        !this.getCurrentPiece()) {
        return '';
    }
    var pieceClass = '';
    switch(this.getCurrentPiece().getShape()) {
        case 0: pieceClass = 'dy-L';
            break;
        case 1: pieceClass = 'dy-O';
            break;
        case 2: pieceClass = 'dy-I';
            break;
        case 3: pieceClass = 'dy-T';
            break;
        case 4: pieceClass = 'dy-J';
            break;
        case 5: pieceClass = 'dy-S';
            break;
        case 6: pieceClass = 'dy-Z';
            break;
        default: pieceClass = 'dy-X';
            break;
    }
    return pieceClass;
  }

  checkPattern(piece:any) {
    return '';
  }

  getColor() {
    return {};
  }

  getFilledClass(cell:any) {
      var pieceClass = '';
      if (cell.filled || cell.current) {
          switch(cell.shape) {
              case 0: pieceClass = 'dy-L-filled';
                  break;
              case 1: pieceClass = 'dy-O-filled';
                  break;
              case 2: pieceClass = 'dy-I-filled';
                  break;
              case 3: pieceClass = 'dy-T-filled';
                  break;
              case 4: pieceClass = 'dy-J-filled';
                  break;
              case 5: pieceClass = 'dy-S-filled';
                  break;
              case 6: pieceClass = 'dy-Z-filled';
                  break;
              default: pieceClass = 'dy-X-filled';
                  break;
          }
      }
      if (cell.ghost) {
          pieceClass += (pieceClass.length > 0) ? ' dy-ghost-piece' : 'dy-ghost-piece';
      }
      return pieceClass;
  }

  getFilledCustomColor(cell:any):any {
      if (cell.filled && cell.shape === 7) {
          return {
              'background-color': GameData.getColor()
          };
      }else {
        return {};
      }
  }
}
