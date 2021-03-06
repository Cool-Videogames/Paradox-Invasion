import Aldeano from "./aldeano.js";
import * as config from "./config.js"

export default class Cantero extends Aldeano {
    constructor(scene, casilla) {
        super(scene, casilla, config.canteros.vida, config.canteros.dmg, 'cantero');
        this.especialidad = 'cantero';
    }

    animation() {
        if (this.dir === 'right') {
            this.play('derechaCantero');
            this.flipX = true;
        }
        else if (this.dir === 'left') {
            this.play('izquierdaCantero');
            this.flipX = false;
        }
        else if (this.dir === 'up') this.play('espaldasCantero');
        else if (this.dir === 'down') this.play('frenteCantero');
    }

    morir() {
        this.barraVida.destroy();
        let index = this.game.canteros.indexOf(this);
        this.game.canteros.splice(index, 1);
        this.casilla.ocupada = false;
        this.destroy();
    }
}