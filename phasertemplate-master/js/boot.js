export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
    //Juego

    //Jugador
    this.load.image('jugador', "./phasertemplate-master/images/Rey/Rey.png");
    this.load.spritesheet('jugadorFrente', "./phasertemplate-master/images/Rey/ReyFrente.png", {frameWidth: 32, frameHeight: 38});
    this.load.spritesheet('jugadorLado', "./phasertemplate-master/images/Rey/ReyLado.png", {frameWidth: 32, frameHeight: 38});
    this.load.spritesheet('jugadorEspaldas', "./phasertemplate-master/images/Rey/ReyEspaldas.png", {frameWidth: 32, frameHeight: 38});

    //Aldeano
    this.load.image('aldeano', "./phasertemplate-master/images/Aldeano/Aldeano.png");
    this.load.spritesheet('aldeanoEspaldas', "./phasertemplate-master/images/Aldeano/AldeanoEspaldas.png", {frameWidth: 32, frameHeight: 38});
    this.load.spritesheet('aldeanoLado', "./phasertemplate-master/images/Aldeano/AldeanoLado.png", {frameWidth: 32, frameHeight: 38});
    this.load.spritesheet('aldeanoFrente', "./phasertemplate-master/images/Aldeano/AldeanoFrente.png", {frameWidth: 32, frameHeight: 38});

    //Aldeana
    this.load.image('aldeana', "./phasertemplate-master/images/Aldeana/Aldeana.png");
    this.load.spritesheet('aldeanaEspaldas', "./phasertemplate-master/images/Aldeana/AldeanaEspaldas.png", {frameWidth: 32, frameHeight: 46});
    this.load.spritesheet('aldeanaLado', "./phasertemplate-master/images/Aldeana/AldeanaLado.png", {frameWidth: 32, frameHeight: 46});
    this.load.spritesheet('aldeanaFrente', "./phasertemplate-master/images/Aldeana/AldeanaFrente.png", {frameWidth: 32, frameHeight: 46});

    this.load.image('sabana', "./phasertemplate-master/images/Sabana.png");
    this.load.image('trono', "./phasertemplate-master/images/Throne.png");

    //Edificios defensivos
    this.load.image('trampaOsos', "./phasertemplate-master/images/Estructuras/TrampaOsos/TrampaOsos.png"); 
    this.load.image('arrow', "./phasertemplate-master/images/Estructuras/arrow.png");
    this.load.image('torreArqueros', "./phasertemplate-master/images/Estructuras/TorreArqueros.png");

    //Interfaz
    this.load.image('ajustes', "./phasertemplate-master/images/Interfaz/RuedaAjustes.png");
    this.load.image('hud', "./phasertemplate-master/images/Interfaz/HUDGeneral.png");
    this.load.image('desplegable', "./phasertemplate-master/images/Interfaz/desplegable.png");
    this.load.image('infoAldeanos', "./phasertemplate-master/images/Interfaz/InfoAldeanos.png");
    this.load.image('construir', "./phasertemplate-master/images/Interfaz/Construir.png");
    this.load.image('menuDesplegable', "./phasertemplate-master/images/Interfaz/MenuDesplegable.png");
    this.load.image('info', "./phasertemplate-master/images/Interfaz/Info.png")
    this.load.image('botonConstruir', "./phasertemplate-master/images/Interfaz/BotonConstruir.png");
    this.load.image('flechaIn', "./phasertemplate-master/images/Interfaz/Flecha.png");
    this.load.image('mina', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/Mina.png");
    //this.load.image('granja', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/granja.png");
    this.load.image('cantera', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/cantera.png");
    this.load.image('trampaSuelo', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/trampaSuelo.png");
    this.load.image('trampaOsos', "./phasertemplate-master/images/Estructuras/TrampaOsos/TrampaOsos.png");
    this.load.image('puestoVigilancia', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/puestoVigilancia.png");
    this.load.image('puestoGuardia', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/puestoGuardia.png");
    this.load.image('muralla', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/muralla.png");
    this.load.image('catedral', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/catedral.png");


    this.load.image('done', "./phasertemplate-master/images/Interfaz/Done.png");
    this.load.image('mas', "./phasertemplate-master/images/Interfaz/Mas.png");
    this.load.image('menos', "./phasertemplate-master/images/Interfaz/Menos.png");
    this.load.image('moneda', "./phasertemplate-master/images/Interfaz/MonedaOro.png");
    this.load.image('asignar', "./phasertemplate-master/images/Estructuras/AsignarAldeanos.png");

    //Ajustes
    this.load.image('volveraljuego', "./phasertemplate-master/images/gestion.png");

    //Choza Maestra
    this.load.image('chozaMaestra', "./phasertemplate-master/images/Estructuras/ChozaMaestra/ChozaMaestra.png");
    this.load.image('marco', "./phasertemplate-master/images/Estructuras/ChozaMaestra/marco.png");
    this.load.image('granja', "./phasertemplate-master/images/Estructuras/Granja.png");

    //IGNORAR, SOLO DE PRUEBA
    this.load.image('obstaculo', "./phasertemplate-master/images/Obstaculo.png");
    this.load.image('edificio', "./phasertemplate-master/images/favicon.png");

    //Sonido
    this.load.audio('music', "./phasertemplate-master/sound/MainSound.m4a");
  }

  create() {
    this.scene.start('game');
  }
}