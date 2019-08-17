class Pipe{
    constructor(){
        this.spacing = 100;
        this.top = random(height / 6, 3 / 4 * height);
        this.bottom = height - (this.top + this.spacing);
        this.x = width;
        this.w = 20;
        this.speed = 3;
        this.highlight = false;
    }

    show(){
        if(this.highlight){
            fill(255,0,0);
        }
        else{
            fill(255);
        }
        rect(this.x,0,20,this.top);
        rect(this.x,height - this.bottom,20,this.bottom);;
    }

    offscreen(){
        return this.x <= -this.w;
    }

    update(){
        this.x -= this.speed;
    }

    hits(bird){
        if((bird.y <= this.top || bird.y >= height - this.bottom) && bird.x >= this.x && bird.x <= this.x + this.w){
            this.highlight = true;
            return true;
        }
        else{
            this.highlight = false;
            return false;
        }
    }
}