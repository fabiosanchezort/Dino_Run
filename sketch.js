var trex, dinot;
var fondo, desierto;
var piso_invisible;
var puntaje = 0;
var cloud, nube;
var cactus, cactos;
var cactus2, cactos2;
var gruponubes;
var grpocactus;
var trexlose, trexasustado;
var etapa = 1;
var final = 0;
var jump;
var checkpoint;
var die;
var game, over;
var restart, lose;

function preload() {
  dinot = loadAnimation("adinotrex1.png", "l0_a.Trex41 12.png");

  desierto = loadImage("DinoDesierto.jpeg");
  nube = loadImage("Acloud_0.png");
  cactos = loadImage("A1cactus_0.png");
  cactos2 = loadImage("A2cactus_0.png");
  trexasustado = loadImage("trexlose0.png");
  lose = loadImage("restart.png");
  over = loadImage("game.png");

  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  createCanvas(620, 350);
  fondo = createSprite(0, height / 2);
  fondo.addImage("desierto", desierto);
  fondo.scale = 1.689;
  fondo.velocityX = -5.2;

  piso_invisible = createSprite(28, 310, 50, 3);
  piso_invisible.visible = false;

  trex = createSprite(50, 309);
  trex.addAnimation("trex1", dinot);
  trex.scale = 0.7;
  //se establece un escudo de choque y debug lo muestra
  trex.setCollider("circle", 0, -23, 48);
  trex.debug = false;
  trex.visible = true;
  trexlose = createSprite(50, 300);
  trexlose.addImage("trexlose", trexasustado);
  trexlose.scale = 0.7;
  trexlose.visible = false;

  game = createSprite(width / 2, height / 3);
  game.addImage("game", over);
  game.scale = 0.4;
  game.visible = false;

  restart = createSprite(width / 2, height / 2);
  restart.addImage("restart", lose);
  restart.scale = 0.8;
  restart.visible = false;

  gruponubes = new Group();
  grupocactus = new Group();
}

function draw() {
  background(220);
  drawSprites();
  if (etapa == 1) {
    marcador();
    sky();
    plantas();

    if (fondo.x < 0) fondo.x = width / 2;

    if (trex.collide(piso_invisible)) {
      if (keyDown("space")) {
        jump.play();
        trex.velocityY = -14.5;
      }
    }
    trex.velocityY = trex.velocityY + 0.7;
    if (grupocactus.isTouching(trex)) {
      etapa = 2;
    }
  }

  //Etapa 2
  if (etapa == 2) {
    //  game.depth = gruponubes.depth;
    //   game.depth = +1;
    gruponubes.setDepthEach(1);
    game.visible = true;
    restart.visible = true;

    fondo.velocityX = 0;

    grupocactus.setVelocityXEach(0);
    gruponubes.setVelocityXEach(0);
    grupocactus.setLifetimeEach(-1);
    gruponubes.setLifetimeEach(-1);

    trex.velocityX = 0;
    trexlose.x = trex.x;
    trexlose.y = trex.y;
    trexlose.visible = true;
    trex.visible = false;
    trex.velocityY = 0;

    final = puntaje;

    fill("black");
    textSize(16);
    textFont("Spectral");
    text("Score", 550, 30);
    text(final, 560, 50);

    // die.play();

    //Segunda Etapa 1
    if (mousePressedOver(restart) || keyDown("space")) {
      etapa = 1;
      puntaje = 0;

      grupocactus.destroyEach();
      gruponubes.destroyEach();

      game.visible = false;
      restart.visible = false;
      trexlose.visible = false;
      trex.visible = true;

      fondo.velocityX = -5.2;
    }
  }

  trex.collide(piso_invisible);

  console.log();
}
function marcador() {
  puntaje = puntaje + Math.round(getFrameRate() / 60);
  if (puntaje % 120 === 0 && puntaje > 0) {
    checkpoint.play();
  }
  fill("black");
  textSize(16);
  textFont("Spectral");
  text("Score", 550, 30);
  text(puntaje, 560, 50);
}
function sky() {
  if (frameCount % 140 === 0) {
    cloud = createSprite(619, random(20, 150));
    cloud.addImage("nube", nube);
    cloud.velocityX = -2;
    cloud.lifetime = 400;
    gruponubes.add(cloud);
  }
}
function plantas() {
  var tipo_de_obstaculo;
  tipo_de_obstaculo = Math.round(random(1, 2));
  if (frameCount % 210 === 0) {
    cactus = createSprite(619, random(275, 280));
    cactus.velocityX = -(5.2 + puntaje / 120);
    fondo.velocityX = cactus.velocityX;
    cactus.scale = 1.3;
    switch (tipo_de_obstaculo) {
      case 1:
        cactus.addImage("cactos", cactos);
        break;
      case 2:
        cactus.addImage("cactos2", cactos2);
        break;
    }
    cactus.lifetime = 200;
    grupocactus.add(cactus);
  }
}
