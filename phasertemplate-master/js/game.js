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
  }
  
  create() {
    let sizeCasilla = 80;
    let mapa = new Mapa(this,3,3, sizeCasilla);
    //let jug = new Jugador(this);
    //mapa.setJugador(jug);
  }
  update(time, delta) {}
}
