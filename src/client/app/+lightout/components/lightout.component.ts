import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {partition} from '../../shared/util';
import {RowComponent} from './row.component';
import  {List } from 'immutable';

import {isGameOver, revealTile} from './game';


@Component({
  selector: 'lightout',
  templateUrl: 'app/+lightout/components/lightout.component.html',
  directives: [RowComponent]
})
export class LightOutComponent implements OnChanges {
  @Input() game: any;

  @Output() tileClick: EventEmitter<any> = new EventEmitter();

  history = List();

  rows:any;

  ngOnChanges(changes:any) {
    // Only update game when game has actually changed
    if(changes.hasOwnProperty('game') && this.game) {
      this.updateGame();
    }
  }


  updateGame(updateHistory = true) {
    this.rows = partition(this.game.get('cols'), this.game.get('tiles'));

    if(updateHistory) {
      this.history = this.history.push(this.game);
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
