import * as config from "./config.js"

export default class Obstaculo extends Phaser.GameObjects.Sprite{
    constructor(scene,coste,posicion){
        let offSetX = config.sizeCasilla /2;
        let offSetY =config.sizeCasilla/1.25;
       
        super(scene, posicion.x + offSetX ,posicion.y + offSetY, 'obstaculo');
        this.coste= coste;
        this.posicion = posicion;
        this.destruible = true;

        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
    }
}