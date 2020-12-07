import * as config from "./config.js"
import Cell from "./cell.js";
import Vector2D from "./vector2D.js";

export default class Mapa {
    constructor(scene, col, fil, sizeCasilla) {
        this.col = col; this.fil = fil;
        this.mapa = new Array(this.col);
        for (let i = 0; i < col; i++) {
            this.mapa[i] = new Array(this.fil);
        }

        this.nodos = new Array(this.col);
        for (let i = 0; i < col; i++) {
            this.nodos[i] = new Array(this.fil);
        }

        this.game = scene;

        this.sizeCasilla = sizeCasilla;
        this.construyeMatriz(scene, sizeCasilla);
        this.construyeNodos();

        this.algoritmoBusqueda();
    }
    
    construyeNodos() {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.nodos[c][j] = new Nodo(this.mapa[c][j]);
            }
        }
    }

    construyeMatriz(scene, sizeCasilla) {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.mapa[c][j] = new Cell(scene, c * sizeCasilla, j * sizeCasilla, c, j);
                this.movePlayer(this.mapa[c][j], this.mapa[c][j].sprite);
            }
        }
    }

    printMapa() {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.mapa[c][j].printCell(c, j);
            }
        }
    }

    //POSTERIORMENTE HAY QUE CAMBIARLO Y DAR UNA FUNCIÓN COMO PARÁMETRO (EJ: PARA CONSTRUIR AL PULSAR Y QUE NO MUEVA AL JUGADOR)
    movePlayer(nextCell, sprite) {
        sprite.on('pointerup', () => {
            let pos = new Vector2D(nextCell.x + this.sizeCasilla/2, nextCell.y + this.sizeCasilla/1.25);
 
            this.game.jug.casilla.setOcupada(false);

            if(!nextCell.ocupada && !this.game.jug.isMoving){
                this.game.jug.move(pos,nextCell);
                nextCell.setOcupada(true);
            }
        })
    }

    //ALGORITMO BUSQUEDA DE CAMINOS
    algoritmoBusqueda() {
        let inicial = this.nodos[1][1];
        let final = this.nodos[2][1];

        for (let i = 0; i < this.col; i++) {
            for (let c = 0; c < this.fil; c++) {
                this.nodos[i][c].resetear(final);
            }
        }
        final.esFin = true;
        final.valor = 0;

        let lista = [];
        this.addAdyancente(lista, inicial);
        let resultado = this.recursiva(lista);

        console.log(resultado);
    }
    addAdyancente(lista, nodoAct) {
        if (nodoAct.x > 0) {
            this.addNodo(lista, this.nodos[nodoAct.x - 1][nodoAct.y], nodoAct);
        }
        if (nodoAct.x < this.col - 1) {
            this.addNodo(lista, this.nodos[nodoAct.x + 1][nodoAct.y], nodoAct);
        }
        if (nodoAct.y > 0) {
            this.addNodo(lista, this.nodos[nodoAct.x][nodoAct.y - 1], nodoAct);
        }
        if (nodoAct.y < this.fil - 1) {
            this.addNodo(lista, this.nodos[nodoAct.x][nodoAct.y + 1], nodoAct);
        }

    }
    addNodo(lista, nodo, nodoAct) {
        if (!nodo.visitada && !nodo.cellAct.ocupada) {
            nodo.recalcularValor(nodoAct);
            lista.push(nodo);
        }
    }

    recursiva(lista, numVueltas = 0) {
        if (lista.length <= 0) return null;


        if(numVueltas === 1){

        }
        let indice = 0;
        let nodoAct = lista[0];
        for (let i = 0; i < lista.length; i++) {
            if (nodoAct.valor > lista[i].valor) {
                nodoAct = lista[i];
                indice = i;
                
            }
        }

        if (nodoAct.esFin) return nodoAct;
        nodoAct.visitada = true;
        lista.splice(indice, 1);
        this.addAdyancente(lista, nodoAct);

        return this.recursiva(lista, ++numVueltas);
    }
}
class Nodo {
    constructor(celda) {
        this.esFin = false; //bool
        this.visitada = false; //bool
        this.cellAct = celda; //celda

        this.x = celda.indiceX; //int
        this.y = celda.indiceY; //int

        this.distanciaRecorrida = 0; //int
        this.distanciaHastaElFinal = 0; //int
        this.valor = 0; //int

        this.siguiente = null; //Nodo
        this.anterior = null; //Nodo
    }
    recalcularValor(nodoAnt) {
        this.distanciaRecorrida = nodoAnt.distanciaRecorrida + 1;
        this.valor = this.distanciaRecorrida + this.distanciaHastaElFinal;
    }
    resetear(destino) {
        this.visitada = false;
        this.esFin = false;

        this.distanciaRecorrida = 0;
        this.distanciaHastaElFinal = this.distanciaNodos(destino);
        this.valor = this.distanciaHastaElFinal;

        this.siguiente = null;
        this.anterior = null;
    }
    distanciaNodos(otro) {
        let diferenciaX = otro.x - this.x;
        let diferenciaY = otro.y - this.y;
        return Math.abs(diferenciaX) + Math.abs(diferenciaY);
    }
    areEqual(otro) {
        return (this.x == otro.x && this.y == otro.y);
    }
}