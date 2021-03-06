import ChozaMaestra from "./chozaMaestra.js";
import * as config from "./config.js";
import Vector2D from "./vector2D.js";
import Trampa from "./trampa.js";
import Muro from "./muro.js";
import TorreArqueros from "./torreArqueros.js";
import EdificioMina from "./edificioMina.js";
import EdificioGranja from "./edificioGranja.js";
import EdificioCantera from "./edificioCantera.js";
import PuestoVigilancia from "./puestoVigilancia.js";
import CaballoTroya from "./caballoTroya.js";
import EdificioTaberna from "./edificioTaberna.js";
import Bunker from "./bunker.js";
import * as functions from "./functions.js"

export default class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, casilla) {
        super(scene, 0, 0, 'jugador');
        let iniCasilla = scene.mapa.mapa[casilla.x][casilla.y];
        let pos = this.posicionCentrada(iniCasilla);
        this.x = pos.x; this.y = pos.y;

        this.casilla = iniCasilla;
        this.casilla.ocupada = true;
        this.speed = config.playerSpeed;

        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        this.setDepth(config.personasDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.game = scene;

        this.isBuilding = false;
        this.edificio = null; //Edificio que se este construyendo en el momento

        this.isMoving = false;
        this.posDestino = iniCasilla;
        this.nodoDestino = null;
        this.dir = 'none';
        this.stopBuild = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); //tecla para dejar de construir

        this.rangoInteraccion = this.initRangoSprite();

        this.caminoHastaTrono = false;
    }

    initRangoSprite() {
        let sprite = new Phaser.GameObjects.Sprite(this.game, this.x, this.y - config.sizeCasilla / 2, 'rangoInteraccion');
        sprite.setDepth(config.rangosVisionDepth);
        this.game.add.existing(sprite);
        sprite.setOrigin(0.5, 0.5);
        sprite.setScale(config.rangoInteraccion * 0.48, config.rangoInteraccion * 0.48)
        sprite.alpha = 0.35;
        return sprite;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.rangoInteraccion.x = this.x;
        this.rangoInteraccion.y = this.y - config.sizeCasilla / 2;

        if (this.isBuilding && this.rangoInteraccion.scaleX !== config.rangoInteraccion * 0.54) this.rangoInteraccion.setScale(config.rangoInteraccion * 0.54, config.rangoInteraccion * 0.54);
        else if (!this.isBuilding && this.rangoInteraccion.scaleX !== config.rangoInteraccion * 0.48) this.rangoInteraccion.setScale(config.rangoInteraccion * 0.48, config.rangoInteraccion * 0.48)

        if (!this.game.acciones.ataqueEnCurso || this.caminoHastaTrono) {
            if (Phaser.Input.Keyboard.JustDown(this.stopBuild) && this.isBuilding) {
                this.edificio.celdas(this.edificio.posicion).forEach(elem => elem.sprite.tint = elem.tint);
                this.game.casillaPuntero.sprite.tint = 0x41EE7B;
                this.isBuilding = false;
                if (this.edificio.key === 'chozaMaestra') {
                    this.game.interfaz.sprites[this.game.interfaz.names.chozaMaestra].clearTint();
                    this.game.numChozas--;
                }
                this.edificio.destroy();
                this.edificio = null;
            }
            this.compruebaPosicion();
            this.calculaDir();

        } else {
            if (this.x > this.posDestino.x - config.margenPosicion && this.x < this.posDestino.x + config.margenPosicion
                && this.y > this.posDestino.y - config.margenPosicion && this.y < this.posDestino.y + config.margenPosicion) {
                this.body.reset(this.game.trono.x, this.game.trono.y);
                this.isMoving = false;
                this.setVisible(false);
                this.game.trono.setTexture('tronoRey');
            }
        }
    }

    irAlTrono() {
        let camino = this.game.mapa.pathFinding(this.casilla, this.game.mapa.mapa[3][3]);
        if (camino != null) {
            this.caminoHastaTrono = true;
            this.movimientoPathFinding(camino);
        } else {
            console.log("Se supone que se para");
            this.posDestino = this.game.trono;
            this.isMoving = false;
            this.body.reset(this.x, this.y);
            this.game.physics.moveTo(this, this.posDestino.x, this.posDestino.y, this.speed);
            this.setTexture('jugador');
        }
        //this.game.physics.moveTo(this, 0, 0, this.speed);
    }

    bajarDelTrono() {
        this.setVisible(true);
        this.game.trono.setTexture('trono');
        this.caminoHastaTrono = false;
    }

    calculaDir() {
        let iniDir = this.dir;
        if (this.x < this.posDestino.x && this.dir !== 'right') this.dir = 'right';
        else if (this.x > this.posDestino.x && this.dir !== 'left') this.dir = 'left';
        else if (this.y < this.posDestino.y && this.dir !== 'down') this.dir = 'down';
        else if (this.y > this.posDestino.y && this.dir !== 'up') this.dir = 'up';

        if (iniDir !== this.dir || !this.isMoving) this.animation();
    }
    animation() {
        if (this.isMoving) {
            if (this.dir === 'right') {
                this.play('derecha');
                this.flipX = true;
            }
            else if (this.dir === 'left') {
                this.play('izquierda');
                this.flipX = false;
            }
            else if (this.dir === 'up') this.play('espaldas');
            else if (this.dir === 'down') this.play('frente');
        }
        else {
            this.setTexture('jugador');
        }
    }

    inputConstruir(spritename, especialidad, ancho, alto) {
        this.isBuilding = true;
        this.edificio = this.construir(spritename, especialidad, this.game.casillaPuntero, ancho, alto);
    }

    posicionaEdificio(edificio) {
        let pos = { x: 0, y: 0 };
        pos.x = this.game.casillaPuntero.x;
        pos.y = this.game.casillaPuntero.y;
        edificio.setPosition(pos);
    }

    compruebaPosicion() {
        if (this.isMoving) {
            if (this.x > this.posDestino.x - config.margenPosicion && this.x < this.posDestino.x + config.margenPosicion
                && this.y > this.posDestino.y - config.margenPosicion && this.y < this.posDestino.y + config.margenPosicion) {
                this.body.reset(this.posDestino.x, this.posDestino.y);
                this.isMoving = false;

                if (this.nodoDestino.siguiente !== null) {
                    this.game.acciones.movimiento();

                    this.movimientoPathFinding(this.nodoDestino.siguiente);
                } else {
                    if (this.caminoHastaTrono) {
                        this.setVisible(false);
                        this.game.trono.setTexture('tronoRey');
                    }
                }
            }
        }
    }

    posicionCentrada(cell) { //Devuelve un vector2 con la posicion centrada del jugador
        return new Vector2D(cell.x + config.sizeCasilla / 2,
            cell.y + config.sizeCasilla / 1.25);
    }

    movimientoPathFinding(camino) {
        if (!this.game.acciones.ataqueEnCurso || this.caminoHastaTrono) {
            this.nodoDestino = camino;
            this.posDestino = this.posicionCentrada(this.nodoDestino.cell);

            this.casilla.ocupada = false;
            this.casilla = this.nodoDestino.cell;
            this.casilla.ocupada = true;

            this.isMoving = true;
            this.game.physics.moveTo(this, this.posDestino.x, this.posDestino.y, this.speed);
        }
    }

    construir(tipo, especialidad, pos, ancho, alto) {
        let edificio;
        if (tipo === 'recursos') {
            //scene,vida,coste,posicion,aldeanosMax,especialidad, key
            if (especialidad === 'mina') {
                edificio = new EdificioMina(this.game, config.vidaMina, config.costeMina, pos, ancho, alto, config.alMaxMina, especialidad);
            }
            else if (especialidad === 'granja') {
                edificio = new EdificioGranja(this.game, config.vidaGranja, config.costeGranja, pos, ancho, alto, config.alMaxGranja, especialidad);
            }
            else if (especialidad === 'cantera') {
                edificio = new EdificioCantera(this.game, config.vidaCantera, config.costeCantera, pos, ancho, alto, config.alMaxCantera, especialidad);
            }
        }
        else if (tipo === 'social') {
            //scene,vida,coste,posicion,felicidad, key
            if (especialidad === 'taberna') {
                edificio = new EdificioTaberna(this.game, config.vidaTaberna, config.costeCantera, pos, ancho, alto, 0, 10);
            }
        }
        else if (tipo === 'chozaMaestra') {
            //scene,vida,coste,posicion, key
            edificio = new ChozaMaestra(this.game, config.vidaChoza, config.costeChoza, pos, ancho, alto, tipo);
        }
        else if (tipo === 'defensivo') {
            //scene,especialidad,vida,coste,posicion,ancho,alto,aldeanosMax,rango, key
            console.log(especialidad);
            if (especialidad === 'trampaOsos' || especialidad === 'trampaSuelo')
                edificio = new Trampa(this.game, especialidad, config.vidaTrampaOso, config.costeTrampaOso, pos, ancho, alto, 0, 0, especialidad);
            else if (especialidad === 'muralla')
                edificio = new Muro(this.game, especialidad, config.vidaMuro, config.costeMuro, pos, ancho, alto, 0, 0, especialidad);
            else if (especialidad === 'torreArqueros')
                edificio = new TorreArqueros(this.game, especialidad, config.vidaTorreArqueros, config.costeTorreArqueros, pos, ancho, alto, 5, 5, especialidad);
            else if (especialidad === 'puestoVigilancia')
                edificio = new PuestoVigilancia(this.game, especialidad, config.vidaPuestoVigilancia, config.costePuestoVigilancia, pos, ancho, alto, 0, 3, especialidad);
            else if (especialidad === 'caballoTroya') {
                edificio = new CaballoTroya(this.game, especialidad, config.vidaCaballoTroya, config.costeCaballoTroya, pos, ancho, alto, 10, 0, especialidad);
            }
            else if (especialidad === "bunker") {
                edificio = new Bunker(this.game, especialidad, 0, config.costeBunker, pos, ancho, alto, 10, 0, especialidad);
            }
        }
        return edificio;
    };
}
