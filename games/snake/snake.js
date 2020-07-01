class Snake{
    constructor(){
        this.tail = new Array();
        this.dirs = new Array();
        localStorage.setItem('score',1);
        this.l = 1;
        this.x =0;
        this.y =0;
        this.xSpeed=1;
        this.ySpeed=0;
    }
    

    update(){
        this.x +=this.xSpeed*scl;
        this.y +=this.ySpeed*scl;

        this.x = constrain(this.x,0,width-scl);
        this.y = constrain(this.y,0,height-scl);
        for(var i=0;i<this.l-1;i++){
            this.tail[i].x += this.dirs[this.l-2-i].x*scl;
            this.tail[i].y += this.dirs[this.l-2-i].y*scl;
        }
        this.dirs.push(createVector(this.xSpeed,this.ySpeed))
        this.dirs.shift();
    }
    dir(a,b){
        this.xSpeed=a;
        this.ySpeed=b;
    }
    bump(){
        var d=0;
        var f= false;
        this.tail.forEach(t => {
            d= dist(this.x,this.y,t.x,t.y);
            if(d<5){
                f=true;
            }
        });
        return f;
    }
    grow(){
        var t = this.tail[this.l-2];
        var d = this.dirs[this.l-2];
        if(t == null){
            t = createVector(this.x,this.y);
            d = createVector(this.xSpeed,this.ySpeed);
        }
        this.tail.push(createVector(t.x -d.x*scl,t.y -d.y*scl));
        this.dirs.unshift(createVector(d.x,d.y));
        this.l++;
        localStorage.score = Number(localStorage.score) + 1;
        updateScore();
    }
    eat(pos){
        var d = dist(this.x,this.y,pos.x*scl,pos.y*scl);
        if(d<5){
            this.grow();
            return true;
        }else{
            return false;
        }

    }

    show(){
        fill(255);
        rect(this.x,this.y,scl,scl);
    }
}