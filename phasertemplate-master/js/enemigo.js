import Persona from "./persona.js";
import Vector2D from "./vector2D.js";
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

        this.attackTime = 1;
        this.t = 0;

        this.isInRange = false;
        this.setOrigin(0.5,0.5);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.isInRange) {
            this.t += dt;
            if (t > this.attackTime) {
                this.ataque();
                this.t = 0;
            }
        } else {
            let distancia = this.distancia(this.objetivo.posicion);

            if (distancia <= this.range + this.objetivo.ancho * config.sizeCasilla) {
                this.isInRange = true;
                this.body.reset(this.x,this.y);
            }
        }
    }

    ataque() {
        this.objetivo.recibirAtaque(this.damage);
    }

    objetivoMasCercano(defensivos) {
        let objectives;
        if (defensivos) {
            objectives = this.game.edificiosDefensivos;
        } else {
            objectives = this.game.edificios;
        }
        let index = -1;
        let value = Infinity;
        for (let i = 0; i < objectives.length; i++) {
            let distancia = this.distancia(objectives[i].posicion);
            if (distancia < value) {
                index = i;
                value = distancia;
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

    move() {
        let obj = { x: 0, y: 0 };
        this.objetivo.getCenter(obj);
        if (this.objetivo != null)
            this.game.physics.moveTo(this, obj.x, obj.y, this.moveSpeed);
    }
}