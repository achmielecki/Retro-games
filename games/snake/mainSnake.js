
var food;
var scl=20;
var s;

function setup(){
    var can = createCanvas(400,400);
    can.parent('main');
    can.id('snake');
    s = new Snake();
    var main = document.getElementById("main");
    var div = document.createElement("div");
    div.id = "score";
    
    main.appendChild(div);
    updateScore();
    frameRate(4);
    pickLocation();
}
function updateScore(){
    var div = document.getElementById("score");
    div.innerHTML = "Score: "+localStorage.score;
}
function draw(){
    background(220);
    s.update();
    s.show();
    var main = document.getElementById("main");
    var div = document.createElement("div");
    
    
    if(s.eat(food)){
        pickLocation();
    }
    
    fill(255);
    for(i=0;i<s.l-1;i++){
        rect(s.tail[i].x,s.tail[i].y,scl,scl);
    }

    fill(255,0,100);
    rect(food.x*scl,food.y*scl,scl,scl);
    if(s.bump()){
        reset();
    }
}
function reset(){
    setup();
}
function pickLocation(){
    var cols= floor(width/scl);
    var rows= floor(height/scl);
    food = createVector(floor(random(cols)),floor(random(rows)));
}
function keyPressed(){
    switch(keyCode){
        case UP_ARROW:
            s.dir(0,-1);
            break;
        case DOWN_ARROW:
            s.dir(0,1);
            break;
        case LEFT_ARROW:
            s.dir(-1,0);
            break;
        case RIGHT_ARROW:
            s.dir(1,0);
            break;
    }
}

