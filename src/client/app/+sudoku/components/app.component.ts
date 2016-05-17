import { Component, ViewChild } from '@angular/core';
import { createGame, setTile, revealTile, getAllowed, solve } from './game';
import {BoardComponent} from './board.component';

import { MODAL_DIRECTIVES, ModalResult, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import { contains } from 'underscore';



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
  public selectedTile:any;
  tileJson: string;
  modalSelected: number;
  selected: number;
  items: number[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  animationsEnabled: boolean = true;

  @ViewChild('myModal')
  modal: ModalComponent;


  @ViewChild('alertModal')
  alert: ModalComponent;

  constructor() {

  }

  onInit(){
    this.startNewGame();
  }

  startNewGame(){
    this.game = createGame(9, 9);
    this.gameJson = JSON.stringify(this.game.toJSON(), null, 2);
  }

  solvePuzzle(){
    this.game = solve(this.game);
  }

  toggleShowJson(){
    this.isShowJson = !this.isShowJson;
  }

  handleTileClick(tile:any){
    this.selectedTile = tile;
    this.tileJson = JSON.stringify(tile.toJSON(), null, 2);
    this.modal.open();
  }

  onClose() {
    var allowed = getAllowed(this.game, this.selectedTile.get('id'));
    if(!contains(allowed, this.modalSelected)){
      this.alert.open();
    }else{
      this.selected = this.modalSelected;
      this.game = revealTile(setTile(this.game, this.selectedTile.get('id'), this.selected), this.selectedTile.get('id'));
    }
  }

}
