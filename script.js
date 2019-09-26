let canvas = document.getElementById("tela");
let ctx = canvas.getContext("2d");


//Personagem
const imagem = new Image();
imagem.src = "characterTeste.png";

let direcao = 1;

const largura  = 16;
const altura = 32;

let estado = 0;
let walkx = 18;
let walky = 18;
let mudar = 0;
var andar = 0;


//Mapa
const mapa = new Image();
mapa.src = "Overworld.png";
const TILE = 16;
const WIDTH = canvas.getAttribute("width");
const HEIGHT = canvas.getAttribute("height");
const NUM_TILES_W = Math.floor(WIDTH / TILE);
const NUM_TILES_H = Math.floor(WIDTH / TILE);

let colisao = {
    ladoEsquerdo: 122,
    ladoDeCima: 110,
    ladoDireito: 172,
    ladoDeBaixo: 160
};

mapa.onload = function(){
    for(var i = 0; i < HEIGHT; i += TILE ){
        for(var j = 0; j < WIDTH; j += TILE){
            ctx.drawImage(mapa, 0, 0, TILE, TILE, i, j, NUM_TILES_W, NUM_TILES_H);
            if((j == 0 || j == WIDTH - TILE ) || (i == 0 || i == HEIGHT - TILE) ){
                ctx.drawImage(mapa, 69, 26, 25, 21, i, j, 25, 21);
            }
        }
    }
        ctx.drawImage(mapa, 497, 54, 31, 26, 130, 130, 50, 50);
 }

//Monstro
const monstro = new Image();
monstro.src = "monster.png";
const larguraMonstro = 22;
const alturaMonstro = 32;
let walkxMonster = WIDTH - 2*(2*TILE);
let walkyMonster = HEIGHT - 2*(2*TILE);
let estadoMonstro = 0;
let direcaoMonstro = 0;
const velocidadeMonstro = 2;
let velocidadeMax = 4;


//Jogo
function draw(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    mapa.onload();
    ctx.drawImage(imagem, estado * largura, mudar + (direcao * altura), largura, altura, walkx, walky, largura, altura);
    ctx.drawImage(monstro, estadoMonstro * larguraMonstro, direcaoMonstro * alturaMonstro, larguraMonstro, alturaMonstro, walkxMonster, walkyMonster, larguraMonstro, alturaMonstro);
    ctx.drawImage(mapa, 179, 0, 74, 80, WIDTH - 5 * TILE, HEIGHT - 5 * TILE, 74, 80, 50, 50);
    //Tratamento de movimentação
    if(direcao == 0) walky += andar;
    if(direcao == 1) walkx += andar;
    if(direcao == 2) walky -= andar;
    if(direcao == 3) walkx -= andar;
    
    //Tratamento de colisão com as paredes
    if(andar == 0) estado = 1;
    
    if(walkx == WIDTH - (TILE * 2)){
        walkx -= andar;
        estado = 0;
    }

    if(walkx == 0 + TILE){
        walkx += andar;
        estado = 0;
    }

    if(walky == HEIGHT - (TILE * 2.5)){
        walky -= andar;
        estado = 0;
    }

    if(walky == 0){
        walky += andar;
        estado = 0;
    }
    
    //Tratamento de colisão com a arvore
    if((walky > colisao.ladoDeCima && walky < colisao.ladoDeBaixo) && walkx == colisao.ladoEsquerdo){
        walkx -= andar;
    }

    if((walkx > colisao.ladoEsquerdo && walkx < colisao.ladoDireito) && walky == colisao.ladoDeCima){
        walky -= andar;
    }

   if((walky > colisao.ladoDeCima && walky < colisao.ladoDeBaixo) && walkx == colisao.ladoDireito){
       walkx += andar;
   }

   if((walkx > colisao.ladoEsquerdo && walkx < colisao.ladoDireito) && walky == colisao.ladoDeBaixo){
       walky += andar;
   }

    //Atualização do frame
    estado ++;

    if(estado == 4){
        estado = 0;
    }
   

    /*MONSTRO*/
    //Correndo atras do personag
    let flagPosição = 0;

    if(walkxMonster > walkx){
        walkxMonster -= velocidadeMonstro;
        direcaoMonstro = 3;
        flagPosição = 1;
    }else if(walkxMonster < walkx){
        walkxMonster += velocidadeMonstro;
        direcaoMonstro = 2;
        flagPosição = 1;
    }else if( walkyMonster > walky){
        walkyMonster -= velocidadeMonstro;
        direcaoMonstro = 1;
    }else if( walkyMonster < walky){
        walkyMonster += velocidadeMonstro;
        direcaoMonstro = 0;
        
    }

    
    //Identificando colisão do cenario
    if(walkyMonster == HEIGHT - (TILE *2.5)){
        walkyMonster -= velocidadeMonstro;
        direcaoMonstro = Math.floor(Math.random()*4);
    }
    if(walkxMonster == WIDTH - (TILE*2)){
        walkxMonster -= velocidadeMonstro;
        direcaoMonstro = Math.floor(Math.random()*4);
    }
    if(walkyMonster == 18){
        walkyMonster += velocidadeMonstro;
        direcaoMonstro = Math.floor(Math.random()*4);
    }
    if(walkxMonster == 18){
        walkxMonster += velocidadeMonstro;
        direcaoMonstro = Math.floor(Math.random()*4);
    }

    if((walkyMonster > colisao.ladoDeCima && walkyMonster < colisao.ladoDeBaixo) && walkxMonster == colisao.ladoEsquerdo){
        walkxMonster -= velocidadeMonstro;
        direcaoMonstro = Math.floor(Math.random()*4);
    }

    if((walkxMonster > colisao.ladoEsquerdo && walkxMonster < colisao.ladoDireito) && walkyMonster == colisao.ladoDeCima){
        walkyMonster -= velocidadeMonstro;
        direcaoMonstro = Math.floor(Math.random()*4);
    }

   if((walkyMonster > colisao.ladoDeCima && walkyMonster < colisao.ladoDeBaixo) && walkxMonster == colisao.ladoDireito){
       walkxMonster += velocidadeMonstro;
       direcaoMonstro = Math.floor(Math.random()*4);
   }

   if((walkxMonster > colisao.ladoEsquerdo && walkxMonster < colisao.ladoDireito) && walkyMonster == colisao.ladoDeBaixo){
       walkyMonster += velocidadeMonstro;
       direcaoMonstro = Math.floor(Math.random()*4);
   }

    estadoMonstro ++;

    if(estadoMonstro == 4){
        estadoMonstro = 0;
    }

    if(walkxMonster == walkx && walkyMonster == walky){
        alert("Perdeu");
    }

    if((walky > HEIGHT - 4* TILE && walky < HEIGHT - 2*TILE) && (walkx > WIDTH - 4* TILE && walkx < WIDTH - 2*TILE)){
        alert("Venceu");
    }
}
let rungame = setInterval(draw, 60);

document.addEventListener("keydown", movimentar);

function movimentar(event){

    //Movimentar normal

    if(event.keyCode == 37){
        //esquerda
        andar = 2;
        direcao = 3;
    }else if(event.keyCode == 38){
        //cima
        andar = 2;
        direcao = 2;
    }else if(event.keyCode == 39){
        //direita
        andar = 2;
        direcao = 1;
    }else if(event.keyCode == 40){
        //baixo
        andar = 2;
        direcao = 0;
    }
}

document.addEventListener("keydown", atacar);

function atacar(event){
    
    //Realizar um ataque em uma determinada direcao

    if((event.keyCode == 65) && (direcao == 3)){
        mudar = 133;
    }
    
    if((event.keyCode == 65) && (direcao == 2)){
        mudar = 133;
    }

    if((event.keyCode == 65) && (direcao == 1)){
        mudar = 133;
    }

    if((event.keyCode == 65) && (direcao == 0)){
        mudar = 133;
    }
}

document.addEventListener("keyup", parar);

function parar(event){
    
    //Faz com que ele so de um passo naquela direção
    
    if(event.keyCode == 37){
        andar = 0;
    }else if(event.keyCode == 38){
        andar = 0;
    }else if(event.keyCode == 39){
        andar = 0;
    }else if(event.keyCode == 40){
        andar = 0;
    }else if(event.keyCode == 32){
        andar = 0;
    }
}

document.addEventListener("keyup", naoAtacar);

function naoAtacar(event){
    
    //Faz com que ele so ataque 1 vez

    if((event.keyCode == 65) && (direcao == 3)){
        mudar = 0;
    }
    else if((event.keyCode == 65) && (direcao == 2)){
        mudar = 0;
    }
    else if((event.keyCode == 65) && (direcao == 1)){
        mudar = 0;
    }
    else if((event.keyCode == 65) && (direcao == 0)){
        mudar = 0;
    }
}

document.addEventListener("keypress", correr);

function correr(event){
    if(event.keyCode == 32){
        andar = 4;
    }
}