import {Component, Input} from '@angular/core';

@Component({
  selector: 'tile',
  templateUrl: 'app/+sudoku/components/tile.component.html',
  directives: []
})
export class TileComponent {
  @Input() tile: any;

  isThirdRow():boolean {
    if(this.tile) {
      for(var i of [2, 5, 8]){
        if( this.tile.get('id') >= i*9 && this.tile.get('id') < (i+1)*9 ) {
          return true;
        }
      }
    }
    return false;
  }

  isThirdCol():boolean {
    if(this.tile) {
      for(var i of [2, 5, 8]){
        for(var j = 0; j< 9; j++) {
          if(this.tile.get('id') === j*9 +i) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
