import {Component, Input} from '@angular/core';

@Component({
  selector: 'tile',
  templateUrl: 'app/+lightout/components/tile.component.html',
  directives: []
})
export class TileComponent {
  @Input() tile: any;
}
