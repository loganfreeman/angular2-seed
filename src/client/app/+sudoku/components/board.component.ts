import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

import {RowComponent} from './row.component';

import  {List } from 'immutable';

import {partition} from '../../shared/util';

import {isGameOver, revealTile} from './game';

@Component({
  selector: 'sudoku',
  templateUrl: 'app/+sudoku/components/board.component.html',
  directives: [RowComponent]
})
export class BoardComponent implements OnChanges {
  history = List();

  rows:any;

  @Input() game: any;

  @Output() tileClick: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes:any) {
    // Only update game when game has actually changed
    if(changes.hasOwnProperty('game') && this.game) {
      this.updateGame();
    }
  }

  handleTileClick(tile:any) {
    this.tileClick.next(tile);

    if(!tile) {
      return;
    }

    if (isGameOver(this.game)) {
      return;
    }
    const newGame = revealTile(this.game, tile.get('id'));
    if (newGame !== this.game) {
      this.game = newGame;
      this.updateGame();
    }
    if (isGameOver(this.game)) {
      window.alert('GAME OVER!');
    }
  }

  updateGame(updateHistory = true) {
    this.rows = partition(this.game.get('cols'), this.game.get('tiles'));

    if(updateHistory) {
      this.history = this.history.push(this.game);
    }
  }

  undo() {
    if (this.canUndo()) {
      this.history = this.history.pop();
      this.game = this.history.last();

      // Don't update the history so we don't end up with
      // the same game twice in the end of the list
      this.updateGame(false);
    }
  }

  canUndo() {
    return this.history.size > 1;
  }
}
