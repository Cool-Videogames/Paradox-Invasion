import EdificioDefensivo from "./edificioDefensivo.js";

export default class CaballoTroya extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.tipoAldeano = scene.exploradores;
        this.game = scene;
        this.posMarcoX = 3;
        this.setScale(2.2, 2.2);
    }
    muestraOpciones(){ //CAMBIAR PARA ADAPTARLO AL MENU DEL CABALLO DE TROYA (SI LO TIENE)
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.done.setVisible(!this.done.visible);
            this.mas.setVisible(!this.mas.visible);
            this.menos.setVisible(!this.menos.visible);
            this.texts[2].text = this.tipoAldeano.length;
            for (let i of this.texts) {
                i.setVisible(!i.visible);
            }
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }
    //Cuando lo destruye el enemigo. Spawnear aldeanos almacenados
    enemyDestruir() {
        for (let i = 0; i < this.numAldeanos; ++i) {
            let sexo = Math.round(Math.random(0, 1));
            if (sexo === 0) sexo = 'aldeano';
            else sexo = 'aldeana';

            let rndX = Math.floor(Math.random() * this.ancho);
            let rndY = Math.floor(Math.random() * this.alto);
            let nextCell = this.game.mapa.mapa[this.posicion.indiceX + rndX][this.posicion.indiceY + rndY];

            let aldeano = new Aldeano(this.game, nextCell, 0, 0, sexo);
            this.game.exploradores.push(aldeano);
        }
        this.destruir();
    }
}
