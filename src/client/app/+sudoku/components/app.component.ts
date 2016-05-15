import { Component } from '@angular/core';
import { createGame } from './game';
import {BoardComponent} from './board.component';

import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';



@Component({
  selector: 'sd-sudoku',
  templateUrl: 'app/+sudoku/components/app.component.html',
  styleUrls: ['app/+sudoku/components/app.component.css'],
  directives: [BoardComponent, MODAL_DIRECTIVES]
})
export class SudokuAppComponent {
  public game:any;
  public gameJson:any;
  public isShowJson:boolean;
  public tile:any;
  constructor() {

  }

  onInit(){
    this.startNewGame();
  }

  startNewGame(){
    this.game = createGame(9, 9);
    this.gameJson = JSON.stringify(this.game.toJSON(), null, 2);
  }

  toggleShowJson(){
    this.isShowJson = !this.isShowJson;
  }

  handleTileClick(tile:any){
    this.tile = JSON.stringify(tile.toJSON(), null, 2);
  }

}
