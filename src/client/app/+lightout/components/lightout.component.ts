import {Component, Input} from '@angular/core';
import {partition} from './util';
import {RowComponent} from './row.component';

@Component({
  selector: 'lightout',
  templateUrl: 'app/+lightout/components/lightout.component.html',
  directives: [RowComponent]
})
export class LightOutComponent {
  @Input() game: any;
  constructor() {

  }

  ngOnChanges(changes){
    // Only update game when game has actually changed
    if(changes.hasOwnProperty('game') && this.game){
      this.updateGame()
    }
  }


  updateGame(updateHistory = true){
    this.rows = partition(this.game.get('cols'), this.game.get('tiles'));
  }

  handleTileClick(tile){
    if(!tile){
      return;
    }
  }
}
