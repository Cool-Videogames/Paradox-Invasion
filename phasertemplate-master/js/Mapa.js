import Cell from "./Cell.js";
import Vector2D from "./Vector2D.js";

export default class Mapa{
    constructor(scene, col, fil, sizeCasilla) {
        this.col = col; this.fil = fil;
        this.mapa = new Array(this.col);
        for (let i = 0; i < col; i++) {
            this.mapa[i] = new Array(this.fil);
        }
        this.game = scene;
        this.sizeCasilla=sizeCasilla;
        this.construyeMatriz(scene, sizeCasilla);
    }
    
    construyeMatriz(scene, sizeCasilla) {
        for (let c = 0; c < this.col; c++) {
            for (let j = 0; j < this.fil; j++) {
                this.mapa[c][j] = new Cell(scene, (c-this.col/2) * sizeCasilla, (j-this.fil/2) * sizeCasilla);
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
        sprite.on('pointerdown', () => {
            let pos = new Vector2D(nextCell.x + this.sizeCasilla/2, nextCell.y + this.sizeCasilla/1.25);

            if(this.game.jug.casilla !== undefined)
            this.game.jug.casilla.setOcupada(false);
         
            this.game.jug.move(pos,nextCell);
            nextCell.setOcupada(!nextCell.estaOcupada);
            //console.clear();
            //this.printMapa();
        })
    }

    //ALGORITMO BUSQUEDA DE CAMINOS
    algoritmoBusqueda() {
        let inicial = this.mapa.mapa[0][0];
        let final = this.mapa.mapa[3][10];
        this.i = 0;
        let a = [];
        a[this.xSize * this.ySize] = -1;
        this.addAdyancente(a, inicial);
    }
    addAdyancente(a, c) {
        if (x > 0 && !this.mapa[c.x - 1][c.y].estaOcupada) {

            this.i++;
        }
    }
    recursiva(a) {
    }
}
class Nodo {
    inicializar(posx, posy, rec, nodoAct, nodoDestino) {
        this.esFin = false; //bool
        this.esPrincipio = false; //bool
        this.visitada = false; //bool
        this.cellAct = cellAct; //celda
        this.x = posx; //int
        this.y = posy; //int
        this.distanciaRecorrida = rec; //int
        this.distanciaHastaElFinal = this.distanciaNodos(nodoDestino); //int
        this.valor = this.distanciaRecorrida + this.distanciaHastaElFinal; //int
    }
    distanciaNodos(otro) {
        let diferenciaX = otro.x - this.x;
        let diferenciaY = otro.y - this.y;
        return Math.abs(diferenciaX) + Math.abs(diferenciaY);
    }
    areEqual(otro){
        return (this.x == otro.x && this.y == otro.y);
    }
}