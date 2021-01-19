import Persona from "./persona.js";
import * as config from "./config.js";

export default class Enemigo extends Persona {
    constructor(scene, pos, vida, fuerza, key) {
        super(scene, pos, vida, fuerza, key);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.objetivo = null;
        this.game = scene;
        this.moveSpeed = 5;
        this.range = 5;
        this.damage = 10;
        this.attackTime = 1;
        this.body.setSize(this.width / 2, this.height / 4);
        this.body.setOffset(this.width / 4, this.height - this.body.height / 2);

        this.esMelee = true;
        this.t = 0;

        this.isInRange = false;
        this.setOrigin(0.5, 0.5);
        this.setDepth(config.hudDepth - 1);

        this.posAnterior = null;
    }

    preUpdate(t, dt) {
        this.barraVida.x = this.x-this.barraVida.width/4;
        this.barraVida.y = this.y+this.height;
        if (this.isInRange) {
            this.t += dt / 1000;

            if (this.objetivo.destruido) {
                this.isInRange = false;
                this.move()
            } else
                if (this.t > this.attackTime) {
                    if (this.ataque()) {
                        this.isInRange = false;
                        this.move();
                    }
                    this.t = 0;
                }
        } else {
            if (this.objetivo === null) return;

            let distancia = this.distanciaObjetivo();
            let rango = this.range + this.objetivo.ancho / 2 * config.sizeCasilla;
            if (distancia <= rango) {
                this.isInRange = true;
                this.body.reset(this.x, this.y);
                this.posAnterior = null;
            }
        }
    }

    ataque() {
        return this.objetivo.recibirAtaque(this.damage);
    }

    objetivoMasCercano(defensivos) {
        let objectives;
        defensivos = false;
        if (defensivos) {
            objectives = this.game.edificiosDefensivos;
        } else {
            objectives = this.game.edificios;
        }
        let index = -1;
        let value = Infinity;
        for (let i = 0; i < objectives.length; i++) {
            if (objectives[i].key !== 'bunker' && objectives[i].key !== 'trampaSuelo' && objectives[i].key !== 'trampaOsos') {
                let distancia = this.distancia(objectives[i].posicion);
                if (distancia < value) {
                    index = i;
                    value = distancia;
                }
            }
        }
        if (index >= 0) return objectives[index];
        if (defensivos) return this.objetivoMasCercano(false);
        return null;
    }

    distancia(destino) {
        let x = this.x - destino.x;
        let y = this.y - destino.y;
        let result = Math.sqrt(x * x + y * y);
        return result;
    }
    distanciaObjetivo() {
        if (this.objetivo === null) return;
        let obj = { x: 0, y: 0 };
        this.objetivo.getCenter(obj);

        let x = this.x - obj.x;
        let y = this.y - obj.y;
        let result = Math.sqrt(x * x + y * y);
        return result;
    }

    distanciaPosAnterior(destino) {
        let x = this.posAnterior.x - destino.x;
        let y = this.posAnterior.y - destino.y;
        let result = Math.sqrt(x * x + y * y);
        return result;
    }

    move() {
        this.objetivo = this.objetivoMasCercano(this.esMelee);
        if (this.objetivo !== null) {
            let obj = { x: 0, y: 0 };
            this.objetivo.getCenter(obj);
            if (this.objetivo !== null)
                this.game.physics.moveTo(this, obj.x, obj.y, this.moveSpeed);
        }
    }

    morir() {
        let index = this.game.oleadasEnemigos.currentWave.indexOf(this);
        this.game.oleadasEnemigos.currentWave.splice(index, 1);
        if (this.game.oleadasEnemigos.currentWave.length <= 0)this.game.acciones.nuevaRonda();
            this.destroy();
    }
}