export let filas = 32;
export let columnas = 32;
export let sizeCasilla = 64;
export let winWidth = 1280;
export let winHeight = 720;
export let playerSpeed = sizeCasilla * 2.5;
export let margenPosicion = 3;
export let rangoConstruccion = 6;

export let numObstaculos = 16;
export let zonaColumnas = 8;
export let zonaFilas = 4;

export let cantidadRecursosPorDefecto = 5;
export let rendimientoGeneral = 5;

export let cameraSpeed = 10;
export let cameraLimit = 200;

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
export let hudSprites = 26;
export let numTexts = 10;

//Profundidad de los sprites
export let mapDepth = 0;
export let personasDepth = 2; //No poner 1 y 3 para poder cambiar la de los edificios a playerDepth-1 o playerDepth+1 según si el jugador está por encima o por debajo
export let hudDepth = 4;


//Acciones
export let nuevoAldeano = 15;
export let numeroAccionesIniciales = 20;
export let relacionAcciones = 0.8; //Razón por la cual se multiplica para obtener el número de movimientos para el siguiente ataque
export let numeroAccionesMinimo = 5;
export let numeroCasillasRecorridasParaConsumirUnaAccion = 4;

//Exploracion
export let costeBaseExploracion = 20;
export let costePorExplorador = 5;
export let probabilidadExitoBase = 0.20;
export let probabilidadExitoPorExploradorAdicional = 0.05;
export let maximoRecursosPorRonda = 10;

//Edificios
export let costeMina = 30; export let alMaxMina = 5; export let tamMina = { x: 4, y: 4};
export let costeGranja = 30; export let alMaxGranja = 5; export let tamGranja = { x: 4, y: 4};
export let costeCantera = 30; export let alMaxCantera = 5; export let tamCantera = { x: 4, y: 4};

//Fondo
export let interseccionMontañaMar = 24; //Siempre menor o igual que el numero de columnas del mapa
