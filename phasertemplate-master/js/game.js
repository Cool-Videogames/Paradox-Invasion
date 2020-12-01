import Jugador from "./Jugador.js";
import Mapa from "./Mapa.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon', "phasertemplate-master/images/favicon.png");
    this.load.image('ground', "phasertemplate-master/images/ground.png");
    this.load.image('jugador', "phasertemplate-master/images/Personaje.png");
    this.load.image('sabana', "phasertemplate-master/images/Sabana.png" )
  }
  
  create() {
    this.sizeCasilla = 32;
    this.xSize = 30;
    this.ySize = 20;
    this.mapa = new Mapa(this,this.xSize,this.ySize, this.sizeCasilla);
    this.jug = new Jugador(this, this.mapa);
    this.mapa.setJugador(this.jug);
    this.recursos={ 
      oro:0, materiales: 0, comida:0, felicidad:0
    }
    this.proxAtaque = 20;
    this.numEdificios =1;
    this.isPaused= false;

  }

  Pause(pause){this.isPaused = pause;}
  End() {
    //Ni idea hulio
  }

  update(time, delta) {}
}
