function mutator(value){
    if(Math.random() < 0.1){
        return value + randomGaussian(0,0.1);
    }
    else{
        return value;
    }
}

class Bird{
    constructor(brain){
        this.y = height/2;
        this.x = 64;
        this.gravity = 0.6;
        this.velocity = 0;
        this.lift = -10;
        this.score = 0;
        if(brain){
            this.brain = brain.copy();
            this.brain.mutate(mutator);
        }
        else{
            this.brain = new NeuralNetwork(5,10,1);
        }
        this.fitness = 0;
    }

    show(){
        fill(255, 100);
        stroke(255);        
        ellipse(this.x,this.y,32,32);
    }

    update(){
        this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;
    }


    offscreen(){
        return (this.y <= 0 || this.y >= height);
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
            let d = (pipes[i].x + pipes[i].w) - this.x;
            if(d <= distanceToNearestPipe && d > 0){
                nearestPipe = pipes[i];
                distanceToNearestPipe = d;
            }
        }

        inputs[0] = this.y / height;
        inputs[1] = nearestPipe.top / height;
        inputs[2] = nearestPipe.bottom / height;
        inputs[3] = nearestPipe.x / width;
        inputs[4] = this.velocity;

        //All the values are normalized to simplify the network
        
        let output = this.brain.feedForward(inputs);
        
        //additional condition is this.velocity >=0 (jump only if not already jumping)
        if(output >= 0.5){
            this.up();
        }

    }

    static copy(bird){
        return new Bird(bird.brain);
    }
}

