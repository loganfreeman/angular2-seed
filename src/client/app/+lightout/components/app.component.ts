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
  public game:any;
  public gameJson:any;
  public isShowJson:boolean;
  public tile:any;
  constructor() {

  }

  onInit(){
    this.startNewGame();
  }

  startNewGame(){
    this.game = createGame({cols: 16, rows: 16, mines: 48});
    this.gameJson = JSON.stringify(this.game.toJSON(), null, 2);
  }

  toggleShowJson(){
    this.isShowJson = !this.isShowJson;
  }

  handleTileClick(tile:any){
    this.tile = JSON.stringify(tile.toJSON(), null, 2);
  }
}
