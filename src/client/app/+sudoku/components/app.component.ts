import { Component } from '@angular/core';
import { createGame } from './game';
import {BoardComponent} from './board.component';



@Component({
  selector: 'sd-lightout',
  templateUrl: 'app/+sudoku/components/app.component.html',
  styleUrls: ['app/+sudoku/components/app.component.css'],
  directives: [BoardComponent]
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
    this.game = createGame();
  }


}
