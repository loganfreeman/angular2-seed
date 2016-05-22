import {GAMESPEED} from './game';
export class GameData {

  private customColorChosen:string;
  public availableColors:number = 5;
  public gameStart:boolean = false;
  public gameEnd:boolean = false;
  public gamePause:boolean = false;
  public score:number = 0;
  public savedGameTime:Date = null;
  public rotationLimit:number = 4;
  public patternLimit:number = 7;
  public cssAnimateTimeout:number = 300; // milliseconds
  public maxCustomPiece:number = 5;
  public customPieceWidth:number = 4;

  get BestScore(){
    return parseInt(localStorage.getItem('game.bestScore'), 10) || 0;
  }
  get Color() {
    return this.customColorChosen;
  }

  set Color(color:string) {
    this.customColorChosen = color
  }

  get GameSpeed(){
    return parseInt(localStorage.getItem('game.speed'), 10) || GAMESPEED['BEGINNER'];
  }

  set GameSpeed(speed:number){
    localStorage.setItem('game.speed', speed.toString());
  }
}
