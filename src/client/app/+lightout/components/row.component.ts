import {Component, Input} from '@angular/core';
import {TileComponent} from './tile.component';

@Component({
  selector: 'row',
  templateUrl: 'app/+lightout/components/row.component.html',
  directives: [TileComponent]
})
export class RowComponent {
  @Input() row: any;
}
