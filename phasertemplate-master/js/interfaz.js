import * as config from "./config.js";
import Vector2D from "./vector2D.js";

export default class Interfaz{
  constructor(scene){
    this.game = scene;
    
    //Arrays y enums con la informacion
    this.names = { ajustes: 0, desplegable: 1, hudGeneral: 2, infoAldeanos: 3, construir: 4, menuDesp: 5, info: 6, flechaAb: 7,
    botonConstruir: 8, flechaAr: 9};
    this.tnames = { oro: 0, comida : 1, materiales: 2, felicidad: 3, proxAtaque: 4};

    this.despSprites = new Array(config.despSprites);
    this.sprites = new Array(config.hudSprites);

    this.texts = new Array(config.numHUDTexts);
    this.nombres = new Array(config.hudSprites);
    this.posiciones = new Array(config.hudSprites);

    this.creaInterfaz();
  }
  creaInterfaz(){
    this.intiNames(); this.initPos(); this.initTexts(); //inicia los arrays de informacion

    for(let i = 0;i<config.hudSprites;i++){
      this.sprites[i] = this.game.creaSprite(this.posiciones[i].x, this.posiciones[i].y, this.nombres[i], this.game, config.hudDepth+1);
      this.sprites[i].setScale(this.sprites[i].scaleX/1.5 ,this.sprites[i].scaleY/1.5);
      this.sprites[i].setScrollFactor(0);
    }
    //Sprite comienza no visibles
    this.sprites[this.names.info].setVisible(false);
    this.sprites[this.names.botonConstruir].setVisible(false);
    this.sprites[this.names.menuDesp].setVisible(false);
    this.sprites[this.names.infoAldeanos].setVisible(false);
    this.sprites[this.names.construir].setVisible(false);
    this.sprites[this.names.flechaAb].setVisible(false);
    this.sprites[this.names.flechaAr].setVisible(false);
    this.sprites[this.names.flechaAr].setFlip(false,true);

    this.sprites[this.names.hudGeneral].setDepth(config.hudDepth);

    //Inputs (implementar con callbacks)
    this.clickEnAjustes(this.sprites[this.names.ajustes]);
    this.clickEnDesplegable(this.sprites[this.names.desplegable]);
    this.clickEnInfo(this.sprites[this.names.info]);
    this.clickEnConstruccion(this.sprites[this.names.botonConstruir]);
    this.clickFlechaAbajo(this.sprites[this.names.flechaAb]);
    this.clickFlechaArriba(this.sprites[this.names.flechaAr]);
  }

  //ARRAYS CON LA INFORMACION
  //NOMBRES DE LOS SPRITES
  intiNames(){
    this.nombres[this.names.ajustes] = 'ajustes'; this.nombres[this.names.desplegable] = 'desplegable'; 
    this.nombres[this.names.hudGeneral] = 'hud'; this.nombres[this.names.infoAldeanos] = 'infoAldeanos';
    this.nombres[this.names.construir] = 'construir'; this.nombres[this.names.menuDesp] = 'menuDesplegable';
    this.nombres[this.names.info] = 'info'; this.nombres[this.names.flechaAb] = 'flecha';
    this.nombres[this.names.botonConstruir] = 'info'; this.nombres[this.names.flechaAr] = 'flecha';
  }

  //TEXTOS DE LA INTERFAZ (PENSAR ALGO PARA LOS NUMEROS SUELTOS)
  initTexts(){
    let posRec = this.posiciones[this.names.hudGeneral];
    let a = this.tnames; let OffSet = 110;

    this.texts[a.oro] = this.game.add.text(posRec.x+OffSet, posRec.y+OffSet, this.game.recursos.oro, this.game);
    this.texts[a.comida] = this.game.add.text(posRec.x+OffSet+100, posRec.y+OffSet, this.game.recursos.comida, this.game);
    this.texts[a.materiales] = this.game.add.text(posRec.x+OffSet, posRec.y+50, this.game.recursos.materiales, this.game);
    this.texts[a.felicidad] = this.game.add.text(posRec.x+OffSet+100, posRec.y+50, this.game.recursos.felicidad, this.game);
    this.texts[a.proxAtaque] = this.game.add.text(this.game.xSize/2, posRec.y+50, this.game.proxAtaque, this.game);

    for(let i of this.texts){
      i.setFont(config.font);
      i.setStroke(config.stroke, 5);
      i.setFill(config.fillColor);
      i.setFontSize(config.fontSize);
      i.setScrollFactor(0);
      i.setDepth(config.hudDepth+1);
    }
    this.texts[a.proxAtaque].setFontSize(config.fontSize+40);
  }

  //(PENSAR ALGO PARA LOS NUMEROS SUELTOS)
  initPos(){ 
    let yOffSet = 30; let xOffSet = 126; let nE = this.names;
    this.posiciones[nE.ajustes] = new Vector2D(this.game.xSize/2+xOffSet*2+30,config.alturaHUD+yOffSet+20);
    this.posiciones[nE.desplegable] = new Vector2D(this.game.xSize/2+xOffSet,config.alturaHUD+yOffSet);
    this.posiciones[nE.hudGeneral] = new Vector2D(this.game.xSize/4.5,config.alturaHUD);

    //Desplegable
    this.posiciones[nE.infoAldeanos] = new Vector2D(this.game.xSize/1.4-11,config.alturaHUD-98);
    this.posiciones[nE.construir] = new Vector2D(this.game.xSize/2+270, config.alturaHUD-300);
    this.posiciones[nE.info] = new Vector2D(this.posiciones[nE.desplegable].x+25, this.posiciones[nE.desplegable].y-105);
    this.posiciones[nE.botonConstruir] = new Vector2D(this.posiciones[nE.desplegable].x+25, this.posiciones[nE.desplegable].y-225);
    this.posiciones[nE.menuDesp] = new Vector2D(this.posiciones[nE.desplegable].x-23, this.posiciones[nE.desplegable].y-247);
    this.posiciones[nE.flechaAb] = new Vector2D(this.posiciones[nE.desplegable].x+200, this.posiciones[nE.desplegable].y-90);
    this.posiciones[nE.flechaAr] = new Vector2D(this.posiciones[nE.desplegable].x+200, this.posiciones[nE.desplegable].y-340);

  }

  //INPUT SOBRE LOS SPRITES (MIRAR CALLBACKS)
  clickEnAjustes(ajustesSprite){
    ajustesSprite.on('pointerdown', pointer => {
      this.game.scene.switch('settings');
      this.game.pauseGame();
    })
  }
  clickEnDesplegable(desplegableSprite){
    desplegableSprite.on('pointerdown', pointer => {
      if(!this.sprites[this.names.menuDesp].visible){
        this.sprites[this.names.menuDesp].setVisible(true);
        this.sprites[this.names.info].setVisible(true);
        this.sprites[this.names.botonConstruir].setVisible(true);
      }
      else{
        this.sprites[this.names.menuDesp].setVisible(false);
        this.sprites[this.names.info].setVisible(false);
        this.sprites[this.names.infoAldeanos].setVisible(false);
        this.sprites[this.names.botonConstruir].setVisible(false);
        this.sprites[this.names.construir].setVisible(false);
        this.sprites[this.names.flechaAb].setVisible(false);
        this.sprites[this.names.flechaAr].setVisible(false);
      }
    })
  }
  clickEnInfo(infoAl){
    infoAl.on('pointerdown', pointer => {
      this.sprites[this.names.infoAldeanos].setVisible(!this.sprites[this.names.infoAldeanos].visible);
      this.sprites[this.names.construir].setVisible(false);
      this.sprites[this.names.flechaAb].setVisible(false);
      this.sprites[this.names.flechaAr].setVisible(false);
    })
  }
  clickEnConstruccion(construccion){
    construccion.on('pointerdown', pointer =>{
      this.sprites[this.names.construir].setVisible(!this.sprites[this.names.construir].visible);
      this.sprites[this.names.flechaAb].setVisible(!this.sprites[this.names.flechaAb].visible);
      this.sprites[this.names.flechaAr].setVisible(!this.sprites[this.names.flechaAr].visible);
      this.sprites[this.names.infoAldeanos].setVisible(false);
    })
  }
  clickFlechaArriba(flechaAr){
    flechaAr.on('pointerdown', pointer =>{
      console.log("ARRIBA");
    })
  }
  clickFlechaAbajo(flechaAb){
    flechaAb.on('pointerdown', pointer =>{
      console.log("ABAJO");
    })
  }

  //ACTUALIZAR TEXTOS
  actualizaOro(oro){
    this.texts[this.tnames.oro].text = oro;
  }
  actualizaComida(comida){
    this.texts[this.tnames.comida].text = comida;
  }
  actualizaMateriales(materiales){
    this.texts[this.tnames.materiales].text = materiales;
  }
  actualizaFelicidad(felicidad){
    this.texts[this.tnames.felicidad].text = felicidad;
  }
  actualizaProxAtaque(pA){
    this.texts[this.tnames.proxAtaque].text = pA;
  }
}