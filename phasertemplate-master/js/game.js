import * as config from "./config.js";
import Jugador from "./jugador.js";
import Mapa from "./mapa.js";
import Vector2D from "./vector2D.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  create() {
    this.setFuncionesGlobales();

    this.mapa = new Mapa(this,config.columnas,config.filas, config.sizeCasilla);
    let iniJugador = new Vector2D(config.columnas/2,config.filas/2);
    this.jug = new Jugador(this,iniJugador);

    this.numEdificios =0;
    this.isPaused= false;

    this.cameras.main.centerOn(0,0)
    //this.SuperponerEscenas('interfaz');
  }

  update(time, delta) {

  }


  pause(pause){this.isPaused = pause;}

  end() {
    //Metodo para pausar el juego
  }

  superponerEscenas(key){
    this.scene.launch(key);
  }

  //Lo mas parecido a un singleton que he encontrado
  setFuncionesGlobales(){
    Game.global= {
      test: function(){
        console.log('Hola');
      },
      creaSprite: function(x,y,key,scene){
        let sprite = new Phaser.GameObjects.Sprite(scene, x, y, key);
        sprite.setOrigin(0,0);
        sprite.setInteractive();
        scene.add.existing(sprite);
        return sprite;
      },
      recursos: {
        oro:0, materiales: 0, comida:0, felicidad:0
      },
      proximoAtaque: 20,      
    }
  }
}
