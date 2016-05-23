import {GAMESPEED} from './game';
export class GameData {

  private static customColorChosen:string;
  public static availableColors:number = 5;
  public static gameStart:boolean = false;
  public static gameEnd:boolean = false;
  public static gamePause:boolean = false;
  public static score:number = 0;
  public static savedGameTime:Date = null;
  public static rotationLimit:number = 4;
  public static patternLimit:number = 7;
  public static cssAnimateTimeout:number = 300; // milliseconds
  public static maxCustomPiece:number = 5;
  public static customPieceWidth:number = 4;

  public static getBestScore(){
    return parseInt(localStorage.getItem('game.bestScore'), 10) || 0;
  }
  public static getColor() {
    return GameData.customColorChosen;
  }

  public static  setColor(color:string) {
    GameData.customColorChosen = color
  }

  public static getGameSpeed(){
    return parseInt(localStorage.getItem('game.speed'), 10) || GAMESPEED['BEGINNER'];
  }

  public static setGameSpeed(speed:number){
    localStorage.setItem('game.speed', speed.toString());
  }
}
