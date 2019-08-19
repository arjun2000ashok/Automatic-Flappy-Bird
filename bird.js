class Bird{
    constructor(){
        this.y = height/2;
        this.x = 64;
        this.gravity = 0.6;
        this.velocity = 0;
        this.lift = -10;

        this.brain = new NeuralNetwork(4,4,1);
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

    think(pipes){
        let inputs = [];
        /*The four inputs to the neural network are:
        1. The bird's current y position
        2. The nearest pipe's top
        3. The nearest pipe's bottom
        4. The nearest pipe's x position*/
        
        let nearestPipe = null;
        let distanceToNearestPipe = Infinity;

        for(let i=0;i<pipes.length;i++){
            let d = pipes[i].x - this.x;
            if(d <= distanceToNearestPipe && d > 0){
                nearestPipe = pipes[i];
                distanceToNearestPipe = d;
            }
        }

        inputs[0] = this.y / height;
        inputs[1] = nearestPipe.top / height;
        inputs[2] = nearestPipe.bottom / height;
        inputs[3] = nearestPipe.x / width;


        //All the values are normalized to simplify the network
        
        let output = this.brain.feedForward(inputs);
        
        if(output >= 0.5){
            this.up();
        }

    }
}