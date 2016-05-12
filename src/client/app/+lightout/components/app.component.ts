import { Component } from '@angular/core';
import { createGame } from './game';
import {LightOutComponent} from './lightout.component';

@Component({
  selector: 'sd-lightout',
  templateUrl: 'app/+lightout/components/app.component.html',
  styleUrls: ['app/+lightout/components/app.component.css'],
  directives: [LightOutComponent]
})
export class LightOutAppComponent {
  public game;
  constructor() {

  }

  onInit(){
    this.startNewGame();
  }

  startNewGame(){
    this.game = createGame({cols: 16, rows: 16});
  }
}
