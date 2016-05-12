import {Component, Input} from '@angular/core';

@Component({
  selector: 'lightout',
  template: `
  <div class="board">
  </div>
  `,
})
export class LightOutComponent {
  @Input() game: any;
  constructor() {

  }
}
