import { Component, ViewChild } from '@angular/core';
import { createGame, setTile, revealTile } from './game';
import {BoardComponent} from './board.component';

import { MODAL_DIRECTIVES, ModalResult, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';



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
  items: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  animationsEnabled: boolean = true;

  @ViewChild('myModal')
  modal: ModalComponent;
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
    this.selectedTile = tile;
    this.tileJson = JSON.stringify(tile.toJSON(), null, 2);
    this.modal.open();
  }

  onClose() {
    this.selected = this.modalSelected;
    this.game = revealTile(setTile(this.game, this.selectedTile.get('id'), this.selected), this.selectedTile.get('id'));
  }

}
