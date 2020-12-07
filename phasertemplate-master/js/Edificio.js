export default class Edificio extends Phaser.GameObjects{
    constructor(scene,vida,coste,posicion,mapa){
        super(scene,"edificio");
        this.vida= vida;
        this.coste= coste;
        this.posicion = posicion;
        this.mapa = mapa;
    }

    construir(){
        //recursos del jugador -= coste;
        this.mapa[this.posicion.y][this.posicion.x] = this;
    }

    destruir(){
        //recursos del jugador += coste * 0.75;
        this.mapa[this.posicion.y][this.posicion.x] = libre;
    }
}