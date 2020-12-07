import * as config from "./config.js";

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {   
        let offSetX = config.sizeCasilla /2;
        let offSetY =config.sizeCasilla/1.25;
        let iniCasilla =scene.mapa.mapa[casilla.x][casilla.y];
        super(scene, iniCasilla.x + offSetX ,iniCasilla.y +offSetY, 'jugador');
        this.casilla = iniCasilla;
        this.casilla.setOcupada(true);
        this.speed= config.playerSpeed;

        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.game = scene;

        this.isMoving = false;
        this.target = iniCasilla;
        this.dir = 'none';
    }
    preUpdate(t,dt){
        this.compruebaPosicion();
        super.preUpdate(t,dt);
    }
    
    compruebaPosicion(){
      if(this.x > this.target.x-1 && this.x < this.target.x+1 &&this.y > this.target.y-1 && this.y < this.target.y+1){
          this.body.reset(this.target.x,this.target.y);
          this.isMoving=false;
      }
    }

    move(pos,casilla){
        this.casilla = casilla;
        this.target = pos;

        //if(this.dir !=='none'){
            this.isMoving=true;
            this.game.physics.moveTo(this,pos.x,pos.y,this.speed);
        //}
      }

    Construir(edificio, pos, tamanyo){
    };
}