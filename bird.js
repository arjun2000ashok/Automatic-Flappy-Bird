class Bird{
    constructor(){
        this.y = height/2;
        this.x = 64;
        this.gravity = 0.6;
        this.velocity = 0;
        this.lift = -10;
    }

    show(){
        fill(255);
        ellipse(this.x,this.y,32,32);
    }

    update(){
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y >= height){
            this.y = height;
            this.velocity = 0;
        }
        else if(this.y <= 0){
            this.y = 0;
            this.velocity = 0;
        }
    }

    up(){
        this.velocity += this.lift;
    }
}