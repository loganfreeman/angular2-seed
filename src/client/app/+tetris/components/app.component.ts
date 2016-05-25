import { Component, ViewChild } from '@angular/core';

import { MODAL_DIRECTIVES, ModalResult, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import {GridService} from './grid'

import {GameData} from './game-data';

import {NgClass, NgStyle} from '@angular/common';

import {Piece} from './piece';

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
  constructor(){
    this.grid = GridService.grid;
    this.pieces =  _.range(16);
    this.gameOn();
  }

  loop:Function = _.throttle(this.gameLoop, this.getGameSpeed(), {
      leading: false,
      trailing: false
  })

  gameOn(){
    window.requestAnimationFrame(() => this.gameOn()); // use arrow functions to lexically capture this
    if(!this.isGamePause() && this.isGameStart()) {
        this.loop();
    }
  }

  isGamePause(){
    return this.isPause;
  }

  isGameStart(){
    return this.isStart;
  }

  toggleGamePause(){
    this.isPause = !this.isPause;
  }

  setGameStart(){
    this.isStart = true;
  }

  gameLoop(){
    this.moveCurrentPiece();
    this.updateGhostPiece();
  }

  moveCurrentPiece(){

  }

  updateGhostPiece(){

  }

  getGameSpeed(){
    return GameData.getGameSpeed();
  }

  startGame(){
    GridService.buildEmptyGameBoard();
    this.createNewPiece();
    this.setGameStart();
  }
  resetGame(){
    GridService.buildEmptyGameBoard();
  }

  createNewPiece(){
    this.currentPiece = new Piece({
        x: 4,
        y: 0
    });
  }
  grid:any[];

  pieces:any[];

  currentPiece:Piece;

  isPieceReady(){
    return '';
  }

  getClassForShape(){
    return '';
  }

  checkPattern(piece:any){
    return '';
  }

  getColor(){
    return {}
  }

  getFilledClass(cell:any) {
      var pieceClass = '';
      if (cell.filled) {
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
      }else{
        return {}
      }
  }
}
