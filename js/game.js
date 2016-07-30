//VARIABLES QUE ALMACENAN LA INFORMACIÓN DEL ANCHO Y ALTO DE LA PANTALLA QUE EL USUARIO TIENE
var width = screen.width;
console.log(width)
var height = screen.height;
console.log(height)


//SE DECLARA EL JUEGO CON LA INICIALIZACIÓN DE LA LIBRERÍA
var game = new Phaser.Game(width,height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render});

function preload() {
    game.load.image('backdrop', 'assets/HD-Game-Wallpaper-HD-Wallpapers_ndjuLSA.jpg');
    game.load.image("point", "assets/points.png");
}

var cont = 0; //CONTADOR PARA EL SCORE
var ScoreText = "";
var sprite1;
var sprite2;
var sprite3;

function create() {
    game.world.setBounds(0, 0, 1920, 1200);
    game.add.sprite(0, 0, 'backdrop');
    
    var canvas = window.document.getElementsByTagName('canvas')[0],
        prevX = 0, prevY = 0, mouseDown = false;
    
    canvas.addEventListener('touchstart',function(e){
    	prevX = e.changedTouches[0].screenX;
        prevY = e.changedTouches[0].screenY;
    });
    
    canvas.addEventListener('mousedown',function(e){
    	mouseDown = true;
    	prevX = e.screenX;
        prevY = e.screenY;
    });
    
    canvas.addEventListener('touchmove',function(e){
    	e.preventDefault();
    	game.camera.x+= prevX - e.changedTouches[0].screenX;
    	prevX = e.changedTouches[0].screenX;
        game.camera.y+= prevY - e.changedTouches[0].screenY;
        prevY = e.changedTouches[0].screenY;
    });
    
    canvas.addEventListener('mousemove',function(e){
    	if(mouseDown){
	    	e.preventDefault();
	    	game.camera.x+= prevX - e.screenX;
	    	prevX = e.screenX;
	        game.camera.y+= prevY - e.screenY;
	        prevY = e.screenY;
	    }
    });
    
    canvas.addEventListener('mouseup',function(e){
    	mouseDown = false;
    });
    
    canvas.addEventListener('mouseleave',function(e){
    	mouseDown = false;
    });
    
    
    
    ScoreText = game.add.text((width/2),50,"PUNTUACIÓN: "+cont,{ font: "32px Arial", fill: "#f26c4f", align: "left" });
    ScoreText.fixedToCamera = true; //SE MUEVE JUNTO A LA CÁMARA
    ScoreText.cameraOffset.setTo((width/2),50); //SE QUEDA FIJA EN ESA POSICIÓN DE LA PANTALLA
    
    //AGREGANDO LOS POINTS
    sprite1 = game.add.sprite(game.world.randomX,game.world.randomY,"point",ClickPoint);
    sprite2 = game.add.sprite(game.world.randomX,game.world.randomY,"point",ClickPoint);
    sprite3 = game.add.sprite(game.world.randomX,game.world.randomY,"point",ClickPoint);
    
    sprite1.inputEnabled = true;
    sprite2.inputEnabled = true;
    sprite3.inputEnabled = true;
    
    sprite1.input.useHandCursor = true;
    sprite2.input.useHandCursor = true;
    sprite3.input.useHandCursor = true;
    
    //ACTIVANDO LA FUNCIÓN ClickPoint cuando se de click sobre los sprites
    sprite1.events.onInputDown.add(ClickPoint,this);
    sprite2.events.onInputDown.add(ClickPoint,this);
    sprite3.events.onInputDown.add(ClickPoint,this);
    
}

function update(){
    //cont++;
    //ScoreText.text = "PUNTUACIÓN "+cont; //SE ACTUALIZA EL SCORE
}


function ClickPoint(sprite){
    cont++;
    ScoreText.text = "PUNTUACIÓN "+cont;
    //document.getElementById("modal").style.display = "block";
     $("#myModal").modal();
}

function CerrarModal(){
    document.getElementById("modal").style.display = "none"; //SE CIERRA EL MODAL
}


function render(){
     game.debug.cameraInfo(game.camera, 32, 32);
}

//FUNCIÓN PARA CAMBIAR EL TAMAÑO DE LA PANTALLA
