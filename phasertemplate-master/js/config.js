export let filas = 32;
export let columnas = 32;
export let sizeCasilla = 64;
export let winWidth = 1280;
export let winHeight = 720;
export let playerSpeed = sizeCasilla * 2.5;
export let margenPosicion = 3;
export let rangoConstruccion = 3;
export let numAldeanosIniciales = 5;

export let numObstaculos = 16;
export let zonaColumnas = 8;
export let zonaFilas = 4;

export let cantidadRecursosPorDefecto = 5;
export let rendimientoGeneral = 5;

export let cameraSpeed = 10;
export let cameraLimit = 200;
export let cameraPos = {x: 400, y: 100};

export let fontColor = 0xffff00;

export let numEspecialidades = 4;

//Interfaz
export let hudScale = 1.5;

//Texts
export let stroke = '#000000';
export let font = 'Arial Black'
export let fillColor = '#606060';
export let fontSize = 30;

//Sprites
export let edificiosConstruibles = 10;
export let hudSprites = 27;
export let numTexts = 10;

//Profundidad de los sprites
export let mapDepth = 0;
export let rangosVisionDepth = 1;
export let personasDepth = 3; //No poner 2 y 4 para poder cambiar la de los edificios a playerDepth-1 o playerDepth+1 según si el jugador está por encima o por debajo
export let hudDepth = 4;


//Acciones
export let nuevoAldeano = 15;
export let numeroAccionesIniciales = 2;
export let relacionAcciones = 0.8; //Razón por la cual se multiplica para obtener el número de movimientos para el siguiente ataque
export let numeroAccionesMinimo = 5;
export let numeroCasillasRecorridasParaConsumirUnaAccion = 0;

//Exploracion
export let costeBaseExploracion = 20;
export let costePorExplorador = 5;
export let probabilidadExitoBase = 0.20;
export let probabilidadExitoPorExploradorAdicional = 0.05;
export let maximoRecursosPorRonda = 10;

//Edificios
export let costeMina = {oro: 20, materiales: 0, comida: 0, felicidad: 0}; export let alMaxMina = 5; export let tamMina = { x: 5, y: 5};
export let costeGranja = {oro: 20, materiales: 0, comida: 0, felicidad: 0}; export let alMaxGranja = 5; export let tamGranja = { x: 7, y: 5};
export let costeCantera = {oro: 20, materiales: 0, comida: 0, felicidad: 0}; export let alMaxCantera = 5; export let tamCantera = { x: 4, y: 4};
export let recuperacionRecursos = 75; //Porcentaje

//Fondo
export let interseccionMontañaMar = 24; //Siempre menor o igual que el numero de columnas del mapa

//Ajustes
export let limiteDer = 769.1488893499442;
export let limiteIzq = 508;

//Enemigo
export let meleeEnemy = {
    meleeAtackDamage :  5,
    meleeHealth : 20,
    meleeAtackDistance : 5,
    meleeMovementSpeed : 5
}
export let rangedEnemy = {
    meleeAtackDamage :  5,
    meleeHealth : 20,
    meleeAtackDistance : 5,
    meleeMovementSpeed : 5
}